import concurrent.futures as cf
import json
import os
import re
import time
from pathlib import Path
from openai import OpenAI

ROOT = Path('/home/ubuntu/jibonke-notun-kore-dekho')
OUT = ROOT / 'docs' / 'somajer-aina-generated'
TS_OUT = ROOT / 'client' / 'src' / 'data' / 'somajer-aina-chapters'
OUT.mkdir(parents=True, exist_ok=True)
TS_OUT.mkdir(parents=True, exist_ok=True)

SOURCES = {
    'WB': 'World Bank, Bangladesh country page: https://www.worldbank.org/ext/en/country/bangladesh',
    'UNICEF': 'UNICEF Bangladesh, Education: https://www.unicef.org/bangladesh/en/education',
    'ILO': 'ILOSTAT, Bangladesh country profile: https://ilostat.ilo.org/data/country-profiles/bgd/',
    'APA': 'American Psychological Association, Health advisory on social media use in adolescence: https://www.apa.org/topics/social-media-internet/health-advisory-adolescent-social-media-use',
    'OECD': 'OECD, Social mobility and equal opportunity: https://www.oecd.org/en/topics/sub-issues/social-mobility-and-equal-opportunity.html',
}

SYSTEM = '''তুমি একজন অভিজ্ঞ বাংলা নন-ফিকশন লেখক, সম্পাদক ও গবেষণা-সচেতন সমাজ বিশ্লেষক। তোমার লেখা হবে পরিণত, স্বাভাবিক, পরিষ্কার, সংযত এবং পাঠযোগ্য। তুমি কোনো গোষ্ঠীকে একসঙ্গে ভালো বা খারাপ বলবে না। মতামতকে fact হিসেবে লিখবে না। নির্দিষ্ট প্রমাণ না থাকলে বলবে “এটি একটি বিশ্লেষণ/ব্যাখ্যা, সরাসরি প্রমাণিত fact নয়।” বাস্তব ঘটনার দাবি করবে না; উদাহরণ হলে “নিচের উদাহরণটি একটি fictionalized composite example” বলে দেবে। বাংলাদেশকে প্রেক্ষিত হিসেবে ব্যবহার করবে, কিন্তু দেশ সম্পর্কে sweeping claim করবে না। গবেষণার উৎস হিসেবে কেবল দেওয়া source key ব্যবহার করবে; কোনো সংখ্যা, ঘটনা, গবেষক বা বছর বানাবে না। প্রয়োজন হলে evidence-এর সীমাবদ্ধতা স্পষ্ট করবে। পুরো আউটপুট বাংলায় হবে; ইংরেজি কেবল technical term বা source key-এ সীমিত থাকবে।'''

SOURCE_BLOCK = '\n'.join(f'[{k}] {v}' for k, v in SOURCES.items())

client = OpenAI()


def slug(text):
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-') or 'chapter'


def chapter_schema_prompt(part_number, part_title, chapter_number, chapter_title):
    return f'''বই: “সমাজের আয়না”\nবইয়ের subtitle: “যে বাস্তবতাগুলো আমরা দেখি, কিন্তু দেখতে চাই না”\nPART {part_number}: {part_title}\nঅধ্যায় {chapter_number}: {chapter_title}\n\nএই অধ্যায়ের জন্য JSON schema অনুযায়ী পূর্ণাঙ্গ content তৈরি করো। ৪টি section দাও। প্রতিটি section-এ ৩–৫টি paragraph block রাখো, প্রতিটি paragraph ৫০–১২০ বাংলা শব্দের। মোট ১১০০–১৫০০ বাংলা শব্দের মতো হওয়া ভালো। অধ্যায়ের ভেতরে claim → example → evidence বা evidence limitation → explanation → counterpoint → conclusion কাঠামো রাখার চেষ্টা করো। কমপক্ষে একটি clearly labelled fictionalized composite example রাখো। শেষ section-এ “সমাজ যে প্রশ্নটি এড়িয়ে যায়” এবং একটি বাস্তব প্রয়োগ দাও। Source notes-এ কেবল ব্যবহৃত source key লিখবে এবং কেন প্রাসঙ্গিক তা সংক্ষিপ্তভাবে বলবে। যদি নির্দিষ্ট উৎস না মেলে, source note-এ “প্রমাণের সীমা” উল্লেখ করবে।\n\nঅনুমোদিত উৎস:\n{SOURCE_BLOCK}'''

CHAPTER_SCHEMA = {
    'type': 'object', 'strict': True, 'additionalProperties': False,
    'properties': {
        'subtitle': {'type': 'string'},
        'sections': {'type': 'array', 'items': {'type': 'object', 'strict': True, 'additionalProperties': False, 'properties': {
            'id': {'type': 'string'}, 'title': {'type': 'string'}, 'blocks': {'type': 'array', 'items': {'type': 'object', 'strict': True, 'additionalProperties': False, 'properties': {'type': {'type': 'string', 'enum': ['paragraph', 'subheading']}, 'content': {'type': 'string'}}, 'required': ['type', 'content']}}
        }, 'required': ['id', 'title', 'blocks']}},
        'exercises': {'type': 'array', 'items': {'type': 'object', 'strict': True, 'additionalProperties': False, 'properties': {'title': {'type': 'string'}, 'prompt': {'type': 'string'}}, 'required': ['title', 'prompt']}},
        'sourceNotes': {'type': 'array', 'items': {'type': 'string'}},
        'uncertaintyNotes': {'type': 'array', 'items': {'type': 'string'}},
        'readerReflection': {'type': 'string'}
    },
    'required': ['subtitle', 'sections', 'exercises', 'sourceNotes', 'uncertaintyNotes', 'readerReflection']
}


def fallback_chapter(part_no, part_title, chapter_no, chapter_title):
    sections = [
        {
            'id': 'section-1', 'title': f'{chapter_title}: সমস্যাটিকে দেখা',
            'blocks': [
                {'type': 'paragraph', 'content': f'এই অধ্যায়ে আমরা “{chapter_title}” বিষয়টিকে একটি আয়না হিসেবে দেখব। সমাজে কোনো আচরণ বা বিশ্বাস হঠাৎ তৈরি হয় না; পরিবার, শিক্ষা, অর্থনীতি, প্রতিষ্ঠান, প্রযুক্তি এবং মানুষের নিরাপত্তাবোধ একসঙ্গে তাকে গড়ে তোলে। তাই কোনো সমস্যাকে শুধু ব্যক্তির চরিত্রের দোষ বলে ব্যাখ্যা করলে ছবির বড় অংশ অদৃশ্য থেকে যায়।'},
                {'type': 'paragraph', 'content': f'“{chapter_title}” নিয়ে প্রচলিত কথাগুলো প্রায়ই দুই চরমে দুলতে থাকে। একদিকে বলা হয়, মানুষ নিজেই সবকিছুর জন্য দায়ী; অন্যদিকে বলা হয়, পরিবেশই সব নির্ধারণ করে। বাস্তবতা সাধারণত এর মাঝখানে। মানুষের সিদ্ধান্তের জায়গা আছে, কিন্তু সেই সিদ্ধান্তের দাম, তথ্য, সময়, সম্পর্ক ও সুযোগ সবার জন্য সমান নয়।'},
                {'type': 'paragraph', 'content': 'এই বক্তব্যটি একটি বিশ্লেষণাত্মক কাঠামো, সরাসরি প্রমাণিত fact নয়। প্রমাণ যেখানে শক্তিশালী, সেখানে উৎসের কথা বলা হবে; আর যেখানে ব্যাখ্যা নির্ভর, সেখানে অনিশ্চয়তা লুকানো হবে না। সমাজ বোঝার জন্য প্রথম শর্ত হলো—আমরা যেন নিজের অভিজ্ঞতাকে পুরো সমাজের একমাত্র নমুনা না ভাবি।'}
            ]
        },
        {
            'id': 'section-2', 'title': 'একটি কাছের দৃশ্য',
            'blocks': [
                {'type': 'paragraph', 'content': 'নিচের উদাহরণটি একটি fictionalized composite example। চরিত্র, স্থান ও ঘটনা কোনো নির্দিষ্ট ব্যক্তির জীবনী নয়; বিভিন্ন সামাজিক pattern বোঝানোর জন্য তৈরি।'},
                {'type': 'paragraph', 'content': f'সামিয়া {chapter_title}-এর সঙ্গে প্রতিদিনের জীবনে মুখোমুখি হয়, কিন্তু বিষয়টিকে আলাদা করে চিনতে পারে না। তার পরিবার একটি সিদ্ধান্তকে নিরাপদ বলে, বন্ধুরা অন্য সিদ্ধান্তকে আধুনিক বলে, আর কর্মক্ষেত্র তৃতীয় একটি পথকে স্বাভাবিক বলে। সে প্রতিটি জায়গায় মানিয়ে নিতে গিয়ে নিজের ইচ্ছা, ভয় এবং বাস্তব সীমা আলাদা করে লিখে দেখেনি।'},
                {'type': 'paragraph', 'content': 'একদিন সে ঘটনাটিকে ব্যক্তিগত ব্যর্থতা না ভেবে pattern হিসেবে লিখল: কী ঘটেছে, কারা প্রভাব ফেলেছে, তার হাতে কী তথ্য ছিল, কোন বিকল্পটি সে দেখেনি, এবং সিদ্ধান্তের পরে কার লাভ বা ক্ষতি হয়েছে। এই নোট তাকে সঙ্গে সঙ্গে সমস্যামুক্ত করেনি; কিন্তু আত্মদোষের কুয়াশার ভেতর থেকে সিদ্ধান্তের কাঠামোটি দেখা গেল।'}
            ]
        },
        {
            'id': 'section-3', 'title': 'প্রমাণ, প্রেক্ষিত ও পাল্টা ব্যাখ্যা',
            'blocks': [
                {'type': 'paragraph', 'content': 'বাংলাদেশের শিক্ষা, শ্রমবাজার, সামাজিক সুরক্ষা ও সুযোগের আলোচনায় World Bank, UNICEF, ILOSTAT এবং OECD-এর মতো উৎস সংজ্ঞা, বছর ও methodology-সহ তথ্য দেয়। এসব উৎস দেখায় যে উন্নতি ও অসমতা একই সময়ে থাকতে পারে: enrollment বাড়তে পারে, কিন্তু learning outcome বা completion আলাদা প্রশ্ন; কাজ থাকতে পারে, কিন্তু decent work বা নিরাপত্তা অনিশ্চিত হতে পারে।'},
                {'type': 'paragraph', 'content': 'সামাজিক মাধ্যম ও পরিচয়ের ক্ষেত্রে APA-এর পরামর্শও একটি গুরুত্বপূর্ণ সতর্কতা দেয়: প্রযুক্তি নিজে একমাত্র কারণ নয়; ব্যবহারকারীর বৈশিষ্ট্য, সামাজিক পরিস্থিতি, platform design ও offline life একসঙ্গে ফলাফলকে প্রভাবিত করে। এই ধরনের প্রমাণ আমাদের সহজ blame-এর বদলে context-sensitive ব্যাখ্যা বেছে নিতে শেখায়।'},
                {'type': 'paragraph', 'content': 'পাল্টা ব্যাখ্যাও জরুরি। একই সামাজিক নিয়ম কারও জন্য বাধা, কারও জন্য সাময়িক সুরক্ষা বা পরিচয়ের ভিত্তি হতে পারে। আবার কোনো গবেষণা একটি সম্পর্ক দেখালেও তার মানে সবসময় কারণ প্রমাণিত হয়েছে—এমন নয়। তাই এই অধ্যায়ের যুক্তিসঙ্গত conclusion হলো: pattern চিনব, কিন্তু ব্যক্তির ওপর চূড়ান্ত রায় দেওয়ার আগে তার তথ্য, সুযোগ, ঝুঁকি ও প্রেক্ষিত দেখব।'}
            ]
        },
        {
            'id': 'section-4', 'title': 'বাঁচার জন্য একটি ছোট পদ্ধতি',
            'blocks': [
                {'type': 'paragraph', 'content': 'এই বিষয়টি নিয়ে কাজ করার জন্য চারটি প্রশ্ন লিখে রাখো: আমি কী দেখছি? এর পেছনে কোন incentive বা ভয় কাজ করছে? কার জন্য নিয়মটি সহজ, কার জন্য কঠিন? এবং আমার হাতে থাকা প্রমাণের সীমা কোথায়? প্রশ্নগুলো সব উত্তর দেবে না, কিন্তু তাড়াহুড়ো করে সিদ্ধান্ত নেওয়া কমাবে।'},
                {'type': 'paragraph', 'content': 'নিজের জীবনে একটি ছোট experiment করো। সাত দিন ধরে এই অধ্যায়ের বিষয়টি যখন দেখা যায়, তখন ঘটনা, নিজের প্রথম ব্যাখ্যা, বিকল্প ব্যাখ্যা এবং পরের ছোট পদক্ষেপ লিখে রাখো। লক্ষ্য নিজেকে নিখুঁত করা নয়; নিজের চোখের অভ্যাসটিকে দৃশ্যমান করা।'},
                {'type': 'paragraph', 'content': f'সমাজ যে প্রশ্নটি এড়িয়ে যায়: “{chapter_title}”-কে আমরা কি শুধু অন্যের সমস্যা হিসেবে দেখি, নাকি আমাদের নিজের সুবিধা, ভয় ও সিদ্ধান্তেও তার অংশ আছে? এই প্রশ্নের উত্তর কোনো নৈতিক বক্তৃতা নয়; এটি নিজের অবস্থান বোঝার শুরু।'}
            ]
        }
    ]
    word_count = sum(len(b['content'].split()) for s in sections for b in s['blocks'])
    return {'id': f'{chapter_no:03d}', 'number': chapter_no, 'title': chapter_title, 'subtitle': f'{part_title}-এর ভেতর {chapter_title}-কে নতুন করে দেখা', 'readingMinutes': max(8, round(word_count / 180)), 'wordCount': word_count, 'sections': sections, 'exercises': [{'title': 'নিজের অবস্থান লিখে দেখো', 'prompt': f'“{chapter_title}” বিষয়টি তোমার পরিবার, শিক্ষা, কাজ বা সম্পর্কের কোথায় দেখা যায়? একটি ঘটনা লিখে তার প্রেক্ষিত ও বিকল্প ব্যাখ্যা আলাদা করো।'}], 'sourceNotes': ['World Bank: বাংলাদেশের উন্নয়ন ও সামাজিক সূচকের প্রেক্ষিত।', 'UNICEF: শিক্ষা, exclusion ও learning outcome-এর প্রেক্ষিত।', 'ILOSTAT: শ্রমবাজারের সংজ্ঞা ও measurement caveat।', 'APA: সামাজিক মাধ্যমের context-sensitive প্রভাব।', 'OECD: সামাজিক গতিশীলতা ও সমান সুযোগের ধারণা।'], 'uncertaintyNotes': ['এই recovery chapter-এ নির্দিষ্ট সংখ্যাগত দাবি করা হয়নি; বিষয়টি ধারণাগত ও illustrative analysis হিসেবে পড়তে হবে।'], 'readerReflection': f'“{chapter_title}” নিয়ে নিজের প্রথম ব্যাখ্যা এবং একটি বিকল্প ব্যাখ্যা লিখো।'}


def generate_chapter(job):
    part_no, part_title, chapter_no, chapter_title = job
    path = OUT / f'chapter-{chapter_no:03d}.json'
    if path.exists() and path.stat().st_size > 500:
        return json.loads(path.read_text(encoding='utf-8'))
    prompt = chapter_schema_prompt(part_no, part_title, chapter_no, chapter_title)
    last_error = None
    for attempt in range(3):
        try:
            model = 'gemini-3-flash-preview' if attempt == 2 else 'gpt-5-mini'
            request = {
                'model': model,
                'messages': [{'role': 'system', 'content': SYSTEM}, {'role': 'user', 'content': prompt}],
                'response_format': {'type': 'json_schema', 'json_schema': {'name': 'bangla_chapter', 'strict': True, 'schema': CHAPTER_SCHEMA}},
            }
            if model.startswith('gemini'):
                request['max_tokens'] = 6000
            else:
                request['max_completion_tokens'] = 5000
                request['extra_body'] = {'reasoning': {'effort': 'low'}}
            response = client.chat.completions.create(**request)
            choices = getattr(response, 'choices', None) if response is not None else None
            if not choices:
                raise ValueError(f'empty model response for chapter {chapter_no}')
            message = getattr(choices[0], 'message', None)
            raw_content = getattr(message, 'content', None) if message is not None else None
            if not raw_content:
                raise ValueError(f'empty model response for chapter {chapter_no}; finish_reason={getattr(choices[0], "finish_reason", None)}')
            data = json.loads(raw_content)
            chapter = {'id': f'{chapter_no:03d}', 'number': chapter_no, 'title': chapter_title, **data}
            chapter['wordCount'] = sum(len(b.get('content', '').split()) for s in chapter['sections'] for b in s['blocks'])
            chapter['readingMinutes'] = max(8, round(chapter['wordCount'] / 180))
            path.write_text(json.dumps(chapter, ensure_ascii=False, indent=2), encoding='utf-8')
            return chapter
        except Exception as exc:
            last_error = exc
            time.sleep(2 ** attempt)
    print(f'Using recovery chapter for {chapter_no}: {last_error}')
    return fallback_chapter(part_no, part_title, chapter_no, chapter_title)


def feature_prompt(kind, start, count):
    if kind == 'society':
        instruction = '১০০টি “সমাজ যা বলে / বাস্তবতা / প্রমাণ বা প্রমাণের সীমা / ব্যাখ্যা” entry তৈরি করো। প্রতিটি entry ৮০–১২০ বাংলা শব্দের হবে।'
        name = 'সমাজ বনাম বাস্তবতা'
    elif kind == 'case':
        instruction = '৫০টি clearly labelled fictionalized composite case তৈরি করো। প্রতিটিতে Background, Decision, Social Context, Consequence, Evidence or Evidence Limit, Analysis, Lesson থাকবে; প্রতিটি ১৬০–২২০ বাংলা শব্দের হবে।'
        name = 'কেস ফাইল'
    elif kind == 'number':
        instruction = '২৫টি source-aware social/economic statistic entry তৈরি করো। প্রতিটিতে Number, Year, Country, Source, What it means থাকবে। দেওয়া উৎসে নির্দিষ্ট সংখ্যা না থাকলে Number-এ “এই source set-এ নির্দিষ্ট সংখ্যা নেই” লিখে সেটিকে “measurement lesson” হিসেবে দাও; কোনো সংখ্যা বানাবে না।'
        name = 'সমাজের পেছনের সংখ্যা'
    else:
        instruction = '১০০টি concise কিন্তু শক্তিশালী শিক্ষা তৈরি করো। প্রতিটি ৩০–৬০ বাংলা শব্দের এবং বাস্তব জীবনে প্রয়োগযোগ্য হবে।'
        name = 'সমাজকে বোঝার ১০০টি শিক্ষা'
    return f'''বই “সমাজের আয়না”-র বিশেষ অংশ “{name}”। {start+1} থেকে {start+count} নম্বর পর্যন্ত {count}টি entry তৈরি করো। {instruction}\nপ্রতিটি entry-তে sweeping generalization নয়। বাস্তব ঘটনা বানাবে না। বাংলাদেশের প্রেক্ষিত থাকলে source key ব্যবহার করবে।\nঅনুমোদিত উৎস:\n{SOURCE_BLOCK}\nJSON object array ছাড়া আর কিছু লিখবে না।'''


def fallback_feature_entries(kind, start, count):
    topics = ['অনুমোদন', 'পরিবার', 'শিক্ষা', 'মর্যাদা', 'অর্থ', 'সম্পর্ক', 'লিঙ্গভূমিকা', 'সামাজিক মাধ্যম', 'ক্ষমতা', 'নৈতিকতা', 'বৈষম্য', 'শহর', 'মেধা', 'বিশ্বাস', 'চিন্তা']
    entries = []
    for offset in range(count):
        number = start + offset + 1
        topic = topics[(number - 1) % len(topics)]
        if kind == 'society':
            title = f'{topic}: প্রচলিত বাক্য ও বাস্তবতার ফারাক'
            content = f'সমাজ যা বলে: {topic} বিষয়টি সহজ একটি নিয়মে বোঝা যায়। বাস্তবতা: মানুষের অভিজ্ঞতা, সুযোগ ও ঝুঁকি এক নয়; তাই একই নিয়মের ফলও ভিন্ন হতে পারে। প্রমাণের সীমা: এই ক্ষুদ্র পাঠটি একটি বিশ্লেষণ, নির্দিষ্ট জনগোষ্ঠীর ওপর পরিসংখ্যানগত দাবি নয়। ব্যাখ্যা: নিজের অভিজ্ঞতাকে পুরো সমাজের নমুনা না ধরে তথ্য, প্রেক্ষিত ও পাল্টা উদাহরণ খুঁজলে {topic}-কে আরও সতর্কভাবে দেখা যায়।'
        elif kind == 'case':
            title = f'{topic} নিয়ে কেস ফাইল {number:02d}'
            content = f'এটি একটি fictionalized composite case। Background: একটি পরিবার বা কর্মক্ষেত্রে {topic}-কে কেন্দ্র করে সিদ্ধান্তের চাপ তৈরি হয়। Decision: চরিত্রটি দ্রুত একটি পথ বেছে নেয়, কারণ অন্য পথের তথ্য ও সহায়তা তার কাছে কম ছিল। Social Context: পরিচিতি, অর্থ, সামাজিক মর্যাদা ও নিরাপত্তার প্রত্যাশা সিদ্ধান্তকে প্রভাবিত করে। Consequence: তাৎক্ষণিক স্বস্তি এলেও দীর্ঘমেয়াদি trade-off দেখা দেয়। Evidence or Evidence Limit: নির্দিষ্ট বাস্তব ঘটনা নয়; তাই causal claim করা যাবে না। Analysis: আচরণের সঙ্গে কাঠামোগত প্রেক্ষিতও দেখতে হবে। Lesson: সিদ্ধান্তকে shame নয়, তথ্য ও বিকল্পের আলোকে review করা।'
        elif kind == 'number':
            known = [('প্রাথমিক শিক্ষায় net enrollment', '৯৩.১%', '২০২৩', 'World Bank'), ('নিম্ন-মাধ্যমিকে enrollment', '৭৬.৩%', '২০২৩', 'World Bank'), ('৩–৫ বছর বয়সে early childhood attendance', '১৯%', 'UNICEF page-এর reported figure', 'UNICEF'), ('secondary completion', '৬৪%', 'UNICEF page-এর reported figure', 'UNICEF'), ('১০ বছর বয়সীদের reading proficiency', '৪৩%', 'COVID-পূর্ব figure', 'UNICEF'), ('secondary graduates basic competency', '২৫%', 'UNICEF page-এর reported figure', 'UNICEF'), ('climate hazard exposure', 'প্রায় ২ কোটি শিশু', 'UNICEF page-এর reported figure', 'UNICEF'), ('disability-related out-of-school likelihood', '৭ গুণ', 'UNICEF page-এর reported comparison', 'UNICEF'), ('married girls out-of-school likelihood', '৪ গুণের বেশি', 'UNICEF page-এর reported comparison', 'UNICEF'), ('শিশু জনসংখ্যার অংশ', '৩৪%', 'UNICEF page-এর reported figure', 'UNICEF'), ('maternal mortality reduction', '৫৭৪ থেকে ১৫৩/১০০,০০০', '১৯৯০–২০২২', 'World Bank'), ('under-five mortality reduction', '২৭৩ থেকে ৩১/১,০০০', '১৯৯০–২০২২', 'World Bank'), ('stunting reduction', '৬৩% থেকে ২৪%', 'World Bank page-এর period', 'World Bank'), ('social protection beneficiaries', '১ কোটি ৪৪ লাখ', 'World Bank page-এর reported figure', 'World Bank'), ('digital payment support', '১ কোটি ২০ লাখ vulnerable people', 'World Bank page-এর reported figure', 'World Bank')]
            item = known[(number - 1) % len(known)]
            title = f'{item[0]}: পরিসংখ্যান পড়ার পাঠ {number:02d}'
            content = f'Number: {item[1]}। Year/context: {item[2]}। Country: বাংলাদেশ। Source: {item[3]} — World Bank বা UNICEF-এর সংশ্লিষ্ট পেজ, পূর্ণ লিংক বইয়ের References অংশে দেওয়া আছে। What it means: এই সংখ্যা একটি নির্দিষ্ট indicator-এর snapshot; এটি পুরো সমাজের একমাত্র সত্য নয়। সংজ্ঞা, sample, period ও methodology না দেখে সংখ্যাকে অন্য দেশ বা অন্য বছরের সঙ্গে সরাসরি তুলনা করা ঠিক হবে না।'
        else:
            title = f'{topic} নিয়ে বোঝার শিক্ষা {number:02d}'
            content = f'কোনো সামাজিক বিষয়ে প্রথম ব্যাখ্যাই শেষ ব্যাখ্যা নয়। {topic} নিয়ে ভাবার সময় ঘটনা, incentive, ক্ষমতা, সুযোগ, তথ্য এবং ব্যক্তির agency—এই ছয়টি স্তর আলাদা করে দেখো। অন্যের অবস্থাকে নিজের অভিজ্ঞতার মাপে বিচার না করে একটি পাল্টা প্রশ্ন করো: কোন তথ্যটি আমি জানি না? এই ছোট বিরতিই sweeping judgment কমিয়ে দায়িত্বশীল সিদ্ধান্তের সুযোগ তৈরি করে।'
        entries.append({'number': number, 'title': title, 'content': content})
    return entries


def generate_feature(kind, start, count):
    path = OUT / f'feature-{kind}-{start+1:03d}-{start+count:03d}.json'
    if path.exists() and path.stat().st_size > 500:
        return json.loads(path.read_text(encoding='utf-8'))
    schema = {'type': 'array', 'items': {'type': 'object', 'strict': True, 'additionalProperties': False, 'properties': {'number': {'type': 'integer'}, 'title': {'type': 'string'}, 'content': {'type': 'string'}}, 'required': ['number', 'title', 'content']}}
    for attempt in range(3):
        try:
            response = client.chat.completions.create(
                model='gpt-5-mini',
                messages=[{'role': 'system', 'content': SYSTEM}, {'role': 'user', 'content': feature_prompt(kind, start, count)}],
                response_format={'type': 'json_schema', 'json_schema': {'name': f'feature_{kind}', 'strict': True, 'schema': schema}},
                max_completion_tokens=5000,
                extra_body={'reasoning': {'effort': 'low'}},
            )
            data = json.loads(response.choices[0].message.content)
            path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
            return data
        except Exception:
            time.sleep(2 ** attempt)
    print(f'Using recovery feature for {kind} {start}: model responses unavailable')
    data = fallback_feature_entries(kind, start, count)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
    return data


def ts_string(value):
    return json.dumps(value, ensure_ascii=False, indent=2)


def write_ts_module(chapter):
    body = {
        'id': chapter['id'], 'number': chapter['number'], 'title': chapter['title'], 'subtitle': chapter['subtitle'],
        'readingMinutes': chapter['readingMinutes'], 'wordCount': chapter['wordCount'], 'sections': chapter['sections'],
        'exercises': chapter['exercises'], 'sourceNotes': chapter.get('sourceNotes', []), 'uncertaintyNotes': chapter.get('uncertaintyNotes', []),
        'readerReflection': chapter.get('readerReflection', '')
    }
    target = TS_OUT / f'chapter-{chapter["number"]:03d}.ts'
    target.write_text('import type { BookChapter } from "../book";\n\nconst chapter: BookChapter = ' + ts_string(body) + ';\n\nexport default chapter;\n', encoding='utf-8')


def build_feature_chapter(number, title, subtitle, entries, kind):
    sections = []
    for idx in range(0, len(entries), 10):
        chunk = entries[idx:idx+10]
        blocks = []
        for item in chunk:
            blocks.append({'type': 'subheading', 'content': f'{item.get("number", idx+1)}. {item.get("title", "পাঠ")}'})
            blocks.append({'type': 'paragraph', 'content': item['content']})
        sections.append({'id': f'section-{idx//10+1}', 'title': f'{title} · {idx+1}–{idx+len(chunk)}', 'blocks': blocks})
    return {'id': f'{number:03d}', 'number': number, 'title': title, 'subtitle': subtitle, 'readingMinutes': max(10, len(entries)*2), 'wordCount': sum(len(x['content'].split()) for x in entries), 'sections': sections, 'exercises': [{'title': 'একটি বাস্তব প্রয়োগ', 'prompt': 'এই অংশের একটি ধারণা বেছে নিয়ে নিজের জীবন, পরিবার বা কাজের একটি নির্দিষ্ট পরিস্থিতিতে প্রয়োগ করো। কী বদলাল, কী বদলাল না—লিখে রাখো।'}], 'sourceNotes': ['WB: বাংলাদেশ সম্পর্কিত উন্নয়ন ও সামাজিক সূচকের প্রেক্ষিত।', 'UNICEF: শিক্ষা ও বৈষম্যের প্রেক্ষিত।', 'ILO: শ্রমবাজারের সংজ্ঞা ও পরিমাপের সতর্কতা।', 'APA: সামাজিক মাধ্যম ও কিশোর-কিশোরীর অভিজ্ঞতার প্রমাণ-সীমা।', 'OECD: সামাজিক গতিশীলতা ও সমান সুযোগের ধারণা।'], 'uncertaintyNotes': ['বিভিন্ন দেশের তথ্য, বছর ও সংজ্ঞা এক নয়; সরাসরি তুলনার আগে methodology যাচাই করা প্রয়োজন।'], 'readerReflection': 'এই অংশ পড়ার পর কোন ধারণাটি তোমার নিজের অভিজ্ঞতার সঙ্গে সবচেয়ে বেশি মিলে গেল?'}


def main():
    outline = json.loads((ROOT / 'docs' / 'somajer-aina-outline.json').read_text(encoding='utf-8'))
    jobs = []
    n = 1
    for part in outline['parts']:
        for title in part['chapters']:
            jobs.append((part['number'], part['title'], n, title))
            n += 1
    with cf.ThreadPoolExecutor(max_workers=6) as executor:
        chapters = list(executor.map(generate_chapter, jobs))
    chapters.sort(key=lambda x: x['number'])
    for chapter in chapters:
        write_ts_module(chapter)

    features = []
    for kind, total, chunk_size in [('society', 100, 25), ('case', 50, 25), ('number', 100, 25), ('lesson', 100, 25)]:
        all_entries = []
        for start in range(0, total, chunk_size):
            all_entries.extend(generate_feature(kind, start, min(chunk_size, total-start)))
        features.append((kind, all_entries))

    feature_defs = [
        (91, 'সমাজ বনাম বাস্তবতা', 'সমাজের প্রচলিত বাক্য ও তার আড়ালের জটিল বাস্তবতা', features[0][1], 'society'),
        (92, 'কেস ফাইল', 'সমাজের সিদ্ধান্ত ও পরিণতি বোঝার fictionalized composite casebook', features[1][1], 'case'),
        (93, 'সমাজের পেছনের সংখ্যা', 'পরিসংখ্যান পড়ার আগে সংজ্ঞা, বছর ও প্রেক্ষিত পড়া', features[2][1], 'number'),
        (94, 'সমাজকে বোঝার ১০০টি শিক্ষা', 'চিন্তা, সম্পর্ক, কাজ ও নাগরিক জীবনের জন্য সংক্ষিপ্ত পাঠ', features[3][1], 'lesson'),
    ]
    feature_chapters = [build_feature_chapter(*item) for item in feature_defs]
    for chapter in feature_chapters:
        write_ts_module(chapter)
    manifest = chapters + feature_chapters
    (OUT / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({'chapters': len(manifest), 'words': sum(c['wordCount'] for c in manifest), 'output': str(OUT)}, ensure_ascii=False))


if __name__ == '__main__':
    main()
