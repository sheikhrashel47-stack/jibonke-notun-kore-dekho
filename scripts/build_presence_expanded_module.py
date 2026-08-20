import json
from pathlib import Path

ROOT = Path('/home/ubuntu/jibonke-notun-kore-dekho')
OUT = ROOT / 'client/src/data/presence-book-expanded.ts'

names = ['রাফি', 'মেহরিন', 'তানভীর', 'সায়মা', 'নাবিল', 'ইশরাত', 'আরমান', 'নিশাত']

groups = {
    'identity': {
        'label': 'পরিচয় ও আত্মসম্মান',
        'lens': 'নিজেকে একটি স্থির label দিয়ে আটকে না রেখে আচরণ, মূল্যবোধ ও শেখার ক্ষমতার সমষ্টি হিসেবে দেখা',
        'scene': 'একটি presentation-এর আগে সে নিজের পুরোনো ব্যর্থতার কথা মনে করে গুটিয়ে যাচ্ছিল। কিন্তু এবার সে ভয়কে verdict না বানিয়ে একটি ছোট প্রশ্ন লিখল: “আমি এখন কী করতে পারি?” প্রশ্নটি তাকে perfect হওয়ার চাপ থেকে বাস্তব প্রস্তুতির দিকে ফিরিয়ে দিল।',
        'dialogue': [('বন্ধু', 'তুমি কি সত্যিই অযোগ্য, নাকি এই মুহূর্তে অপ্রস্তুত?'), ('সে', 'দুটোকে আলাদা করা কঠিন লাগছে।'), ('বন্ধু', 'তাহলে observable fact লেখো—কী জানো, কী জানো না, আর কী practice করা যায়?'), ('সে', 'তাহলে আমার পরিচয় নয়, আমার next action-টাই আগে ঠিক করা দরকার।')],
        'practice': ['নিজের সম্পর্কে তিনটি স্থায়ী label কেটে তার বদলে আচরণভিত্তিক বাক্য লেখো।', 'একটি পুরোনো গল্পের পাশে বর্তমানের একটি বিপরীত প্রমাণ যোগ করো।', 'আগামী সাত দিনে এমন একটি ছোট কাজ বেছে নাও যা তোমার নতুন self-image-এর প্রমাণ হবে.'],
        'caution': 'Self-respect মানে নিজের সব আচরণকে সঠিক বলা নয়। আবার আত্মসমালোচনাও উন্নতির একমাত্র পথ নয়। লক্ষ্য হলো দায়বদ্ধতা ও মানবিকতার মধ্যে ভারসাম্য রাখা।'
    },
    'emotion': {
        'label': 'আবেগ ও স্থিরতা',
        'lens': 'emotion-কে শত্রু বা চূড়ান্ত সত্য না বানিয়ে signal হিসেবে পড়া, pause নেওয়া এবং ইচ্ছাকৃত response বেছে নেওয়া',
        'scene': 'একটি message-এর উত্তর না পেয়ে তার ভেতর দ্রুত গল্প তৈরি হচ্ছিল—“ও নিশ্চয়ই আমাকে অপছন্দ করে।” সে ফোন নামিয়ে তিনটি আলাদা সম্ভাবনা লিখল। কিছুক্ষণ পর বুঝল, তার অনুভূতি সত্যি হলেও তার ব্যাখ্যাটি নিশ্চিত সত্য নয়। এই সামান্য দূরত্বই তাকে impulsive reply থেকে বাঁচাল।',
        'dialogue': [('সহকর্মী', 'তুমি এখন রেগে আছ—এখনই উত্তর দেবে?'), ('সে', 'আমি উত্তর দিতে চাই, কিন্তু tone ঠিক হবে কি না জানি না।'), ('সহকর্মী', 'তাহলে প্রথমে শরীরকে calm করো, তারপর facts আর story আলাদা করো।'), ('সে', 'রাগকে চাপা নয়; রাগের হাতে steering না দেওয়াই কাজ।')],
        'practice': ['Trigger, শরীরের সংকেত, প্রথম ব্যাখ্যা এবং পছন্দের response—চারটি কলাম বানাও।', 'গুরুত্বপূর্ণ উত্তর দেওয়ার আগে একটি নির্দিষ্ট pause sentence ব্যবহার করো।', 'একটি কঠিন অনুভূতিকে নাম দাও এবং তার প্রয়োজনটি আলাদা করে লেখো.'],
        'caution': 'Calm থাকা মানে অন্যায় মেনে নেওয়া নয়। কখনো নিরাপত্তা, boundary বা support-এর জন্য দ্রুত পদক্ষেপ দরকার হয়। আবেগ নিয়ন্ত্রণের অনুশীলন clinical treatment-এর বিকল্প নয়।'
    },
    'presence': {
        'label': 'উপস্থিতি ও যোগাযোগ',
        'lens': 'presence-কে অভিনয় নয়, attention, শরীর, voice, timing এবং listening-এর সমন্বিত অভ্যাস হিসেবে বোঝা',
        'scene': 'একটি নতুন ঘরে ঢুকে সে সাধারণত খুব দ্রুত কথা বলা শুরু করত। এবার দরজার কাছে এক মুহূর্ত থেমে room-এর rhythm দেখল, দুজনকে greeting করল, তারপর একটি সহজ প্রশ্ন করল। কম কথা বলেও সে বেশি connected অনুভব করল, কারণ তার attention সত্যিই ঘরে ছিল।',
        'dialogue': [('সহকর্মী', 'তোমার voice আজ অনেক স্থির শোনাচ্ছে। কী বদলেছ?'), ('সে', 'আমি impress করার চেষ্টা কমিয়ে শুনতে শুরু করেছি।'), ('সহকর্মী', 'তাহলে presence মানে বেশি শব্দ নয়?'), ('সে', 'না, যে মুহূর্তে আছি সেটাকে পুরোপুরি নেওয়া।')],
        'practice': ['একটি conversation-এ কথা বলার গতি দশ শতাংশ কমাও।', 'উত্তর দেওয়ার আগে অপর ব্যক্তির শেষ বাক্যের একটি অংশ paraphrase করো।', 'শরীরের posture, চোখ, হাত ও voice—চারটির মধ্যে একটিতে সচেতন focus রাখো.'],
        'caution': 'Eye contact, posture বা voice-এর কোনো একটি কৌশল দিয়ে charisma বানানো যায় না। সাংস্কৃতিক পার্থক্য, neurodiversity এবং ব্যক্তিগত comfort সম্মান করা জরুরি।'
    },
    'boundary': {
        'label': 'Boundary ও assertiveness',
        'lens': 'নিজের সময়, energy, privacy ও values রক্ষা করে অন্যের agency-ও সম্মান করা',
        'scene': 'একজন পরিচিত নিয়মিত শেষ মুহূর্তে সাহায্য চাইত, আর সে না বলতে না পেরে নিজের কাজ পিছিয়ে দিত। এবার সে দীর্ঘ justification না দিয়ে বলল, “আজ পারছি না; আগেভাগে জানালে অন্যভাবে plan করতে পারব।” কথাটি ছোট, কিন্তু তার সময়ের প্রতি নিজের সম্মান স্পষ্ট।',
        'dialogue': [('পরিচিত', 'তুমি তো সবসময় help করো, আজ না বলছ কেন?'), ('সে', 'আজ আমার capacity নেই। আমি তোমাকে reject করছি না; এই request-টি নিতে পারছি না।'), ('পরিচিত', 'তাহলে কবে পারবে?'), ('সে', 'আমি নিশ্চিত না হলে প্রতিশ্রুতি দেব না। প্রয়োজন হলে কাল জানাব।')],
        'practice': ['সময়, ব্যক্তিগত তথ্য, tone এবং commitment—এই চার জায়গায় নিজের সীমা লিখে ফেলো।', 'একটি “না” বাক্য তৈরি করো যেখানে ছোট, সত্যি ও respectful ভাষা থাকবে।', 'Boundary ভাঙলে consequence কী হবে তা আগে ঠিক করো, হুমকি নয়, বাস্তব পদক্ষেপ হিসেবে.'],
        'caution': 'Boundary অন্যকে নিয়ন্ত্রণ করার ভাষা নয়। অপর পক্ষের পছন্দ বদলাবে—এমন নিশ্চয়তা না দিয়ে তুমি নিজের অংশটুকু পরিষ্কার করো। নিরাপত্তা-ঝুঁকির ক্ষেত্রে একা confrontation না করে support নাও।'
    },
    'observation': {
        'label': 'মানুষ ও context পড়া',
        'lens': 'মানুষকে এক ঝলকে পড়ে ফেলার দাবি না করে আচরণ, context, incentive ও নিজের bias আলাদা করে দেখা',
        'scene': 'একটি meeting-এ একজন মানুষ খুব চুপ ছিল। সে প্রথমে ধরে নিয়েছিল লোকটি uninterested। পরে জানতে পারল, আলোচনার ভাষা তার জন্য নতুন এবং সে ভুল বলার ভয় পাচ্ছে। এই অভিজ্ঞতা তাকে মনে করিয়ে দিল—নীরবতার একাধিক অর্থ থাকতে পারে।',
        'dialogue': [('সহকর্মী', 'ও কিছু বলছে না, নিশ্চয়ই রাজি?'), ('সে', 'হতে পারে, আবার unsure বা uncomfortable-ও হতে পারে।'), ('সহকর্মী', 'তাহলে কীভাবে জানব?'), ('সে', 'একটি open question করব, কিন্তু উত্তর চাপিয়ে দেব না।')],
        'practice': ['Person, context, visible behavior, possible interpretation—চারটি আলাদা কলাম লেখো।', 'কোনো অনুমানকে fact হিসেবে বলার আগে একটি follow-up question তৈরি করো।', 'নিজের bias-এর একটি উদাহরণ লিখে তার বিপরীত ব্যাখ্যাও বিবেচনা করো.'],
        'caution': 'Body language বা আচরণ দেখে diagnosis, motive বা character verdict দেওয়া ঠিক নয়। Observation হলো প্রশ্ন তৈরির উপায়, অন্যকে label করার license নয়।'
    },
    'discipline': {
        'label': 'Discipline ও reliability',
        'lens': 'ইচ্ছাশক্তির ওপর একমাত্র নির্ভর না করে environment, routine, ছোট প্রতিশ্রুতি ও recovery দিয়ে consistent হওয়া',
        'scene': 'সে নতুন routine বানিয়ে প্রথম তিন দিন খুব উৎসাহে চলল, চতুর্থ দিনে ভেঙে গেল। এবার সে লক্ষ্য ছোট করল: প্রতিদিন দশ মিনিট, একই cue, এবং miss হলে পরের slot-এ ফিরে আসা। ধারাবাহিকতা এবার perfect streak নয়, দ্রুত ফিরে আসার ক্ষমতা হয়ে উঠল।',
        'dialogue': [('বন্ধু', 'তুমি কি motivation-এর অপেক্ষা করছ?'), ('সে', 'হ্যাঁ, motivation না থাকলে শুরু করতে পারি না।'), ('বন্ধু', 'তাহলে এমন ব্যবস্থা বানাও যেখানে শুরু করতে motivation কম লাগে।'), ('সে', 'ছোট কাজ, নির্দিষ্ট সময় আর আগেই প্রস্তুত রাখা—এটাই আমার system হবে।')],
        'practice': ['একটি identity goal-কে ১০ মিনিটের repeatable action-এ নামাও।', 'Cue, routine, reward এবং recovery plan লিখে রাখো।', 'সপ্তাহ শেষে streak নয়, কতবার ফিরে এসেছ সেটিও হিসাব করো.'],
        'caution': 'Discipline দিয়ে বিশ্রাম, অসুস্থতা বা বাস্তব সীমাকে অস্বীকার করা উচিত নয়। কাজের মান ও জীবনের ভারসাম্য নষ্ট হলে routine পুনরায় design করতে হবে।'
    },
    'charisma': {
        'label': 'Warmth ও influence',
        'lens': 'charisma-কে attention কাড়ার খেলা নয়, warmth, clarity, confidence ও অন্যকে space দেওয়ার সমন্বয় হিসেবে দেখা',
        'scene': 'একটি gathering-এ সে সবচেয়ে interesting মানুষ হওয়ার চেষ্টা করছিল। পরে সে একজন নতুন অতিথির কথা মন দিয়ে শুনল, একটি follow-up প্রশ্ন করল এবং নিজের একটি ছোট গল্প ভাগ করল। রাত শেষে সবাই তাকে সবচেয়ে loud নয়, সবচেয়ে present মানুষ হিসেবে মনে রাখল।',
        'dialogue': [('বন্ধু', 'তুমি আজ খুব সহজে মানুষের সঙ্গে connect করলে।'), ('সে', 'আমি conversation-কে performance না বানিয়ে curiosity হিসেবে নিয়েছি।'), ('বন্ধু', 'নিজের কথাও বলেছ, শুধু শুনোনি।'), ('সে', 'Warmth মানে নিজেকে মুছে ফেলা নয়; give-and-take রাখা।')],
        'practice': ['একটি conversation-এ একটি genuine follow-up question করো।', 'নিজের একটি ছোট, honest story তিন বাক্যে বলার অনুশীলন করো।', 'Attention চাওয়ার বদলে অন্যের contribution visible করার চেষ্টা করো.'],
        'caution': 'Influence মানে মানুষকে manipulate করা নয়। কোনো কৌশল ব্যবহার করে consent, privacy বা অন্যের স্বাধীনতা অতিক্রম করা যাবে না।'
    },
    'resilience': {
        'label': 'আঘাত, ব্যর্থতা ও emotional maturity',
        'lens': 'ব্যর্থতা বা criticism-কে identity verdict না বানিয়ে facts, responsibility, repair এবং next experiment-এর মধ্যে ভাগ করা',
        'scene': 'একটি public mistake-এর পরে সে কয়েক দিন মানুষ এড়িয়ে চলল। পরে সে ভুলটির তিনটি অংশ আলাদা করল—কী ঘটেছে, তার দায়িত্ব কোথায়, এবং কোন গল্পটি সে নিজে যোগ করেছে। ক্ষমা চাওয়া ও নতুন practice-এর পর shame ধীরে ধীরে learning-এ বদলাল।',
        'dialogue': [('সহকর্মী', 'তুমি কি feedback নিতে প্রস্তুত?'), ('সে', 'শুনলে খারাপ লাগবে, কিন্তু না শুনলে একই ভুল থাকবে।'), ('সহকর্মী', 'তাহলে ব্যক্তিগত আক্রমণ আর usable information আলাদা করো।'), ('সে', 'আমি impact-এর জন্য দায় নেব, কিন্তু নিজের মূল্য পুরোটা feedback-এর হাতে দেব না।')],
        'practice': ['ঘটনা, impact, responsibility, repair এবং next experiment—এই পাঁচ ভাগে setback লিখো।', 'একটি criticism থেকে একটি actionable sentence বের করো।', 'নিজেকে punish না করে একটি repair action নির্ধারণ করো.'],
        'caution': 'Resilience মানে সব কষ্ট একা সহ্য করা নয়। অপমান, নির্যাতন বা দীর্ঘস্থায়ী মানসিক কষ্টের ক্ষেত্রে নিরাপদ support এবং professional help গুরুত্বপূর্ণ।'
    },
    'integration': {
        'label': 'Integrity ও দীর্ঘমেয়াদি transformation',
        'lens': 'ব্যক্তিত্বকে quick makeover না বানিয়ে values, daily practice, relationship repair এবং দীর্ঘমেয়াদি evidence-এর মাধ্যমে গড়ে তোলা',
        'scene': 'নব্বই দিনের plan-এর শেষ সপ্তাহে সে বুঝল, সবচেয়ে বড় পরিবর্তনটি তার public image নয়—সে এখন নিজের কথার সঙ্গে নিজের কাজ মিলিয়ে দেখতে পারে। এখনও ভয় আছে, কিন্তু ভয়কে লুকিয়ে নয়, values-এর পাশে রেখে সিদ্ধান্ত নেয়।',
        'dialogue': [('বন্ধু', 'তোমার কী সবচেয়ে বেশি বদলেছে?'), ('সে', 'আমি এখন প্রতিটি room-এ নতুন মানুষ সাজতে চাই না।'), ('বন্ধু', 'তাহলে presence কী?'), ('সে', 'আমি যেখানে আছি, সেখানে সত্যি থাকা; আর ভুল হলে ফিরে আসা।')],
        'practice': ['নিজের তিনটি core value এবং প্রতিটির observable behavior লিখো।', '৩০, ৬০ ও ৯০ দিনের evidence plan বানাও।', 'একটি relationship বা commitment বেছে নিয়ে integrity-এর ছোট repair করো.'],
        'caution': 'Transformation-এর কোনো final certificate নেই। অন্যের approval, perfect confidence বা constant productivity-কে endpoint বানালে পুরোনো pressure ফিরে আসতে পারে।'
    },
}

chapter_group = {}
for n in range(1, 21): chapter_group[n] = 'identity'
for n in range(21, 25): chapter_group[n] = 'emotion'
for n in range(25, 33): chapter_group[n] = 'presence'
for n in range(33, 37): chapter_group[n] = 'boundary'
for n in range(37, 41): chapter_group[n] = 'observation'
for n in range(41, 45): chapter_group[n] = 'discipline'
for n in range(45, 49): chapter_group[n] = 'charisma'
for n in range(49, 57): chapter_group[n] = 'resilience'
for n in range(57, 61): chapter_group[n] = 'integration'


def q(s):
    return json.dumps(s, ensure_ascii=False)

entries = []
for n in range(1, 61):
    g = groups[chapter_group[n]]
    person = names[(n - 1) % len(names)]
    dialogue = '\\n'.join(f'{role}: {line}' for role, line in g['dialogue'])
    steps = '\\n'.join(f'{i+1}. {step}' for i, step in enumerate(g['practice']))
    title_line = f'এই অধ্যায়ের কেন্দ্রীয় প্রশ্ন হলো: “{n:02d} নম্বর অধ্যায়ের বিষয়টি {g["label"]}-এর বৃহত্তর ছবিতে কোথায় দাঁড়ায়?” উত্তরটি কোনো magic formula নয়; এটি লক্ষ্য করার, চেষ্টা করার এবং ফল দেখে আবার adjust করার একটি পথ।'
    sections = [
        {'id': 'expansion-scene', 'title': 'একটি বাস্তব দৃশ্য', 'blocks': [
            f'{person} {g["scene"]}',
            title_line,
            'এই দৃশ্যের গুরুত্বপূর্ণ জায়গাটি হলো পরিবর্তনটি বাইরে থেকে dramatic দেখায়নি। একটি pause, একটি সৎ বাক্য, বা একটি ছোট follow-through—এগুলোই পরে আত্মবিশ্বাসের evidence তৈরি করে। পাঠক হিসেবে তোমার কাজ অন্যের গল্প copy করা নয়; নিজের জীবনে একই ধরনের মুহূর্ত শনাক্ত করা।'
        ]},
        {'id': 'expansion-lens', 'title': 'বিষয়টিকে গভীরে দেখা', 'blocks': [
            f'{g["lens"]}। {g["lens"].capitalize()} মানে নিজের আচরণকে একেবারে নিখুঁত করা নয়; বরং যে জায়গায় automatic reaction আসে, সেখানে সামান্য choice তৈরি করা।',
            'প্রথমে লক্ষ্য করো—কোন পরিস্থিতিতে এই বিষয়টি সবচেয়ে বেশি সক্রিয় হয়। তারপর নিজের শরীর, চিন্তা, ভাষা ও পরের কাজ—এই চারটি স্তর আলাদা করে দেখো। অনেক সময় আমরা শুধু ফলাফল দেখি, কিন্তু তার আগে থাকা cue বা interpretation দেখতে পাই না। সেখানেই অনুশীলনের সবচেয়ে কার্যকর জায়গা।',
            'একটি useful distinction মনে রাখো: intention এবং impact এক জিনিস নয়; feeling এবং fact এক জিনিস নয়; confidence এবং certainty এক জিনিস নয়। এই পার্থক্যগুলো তোমাকে কঠিন পরিস্থিতিতেও বেশি ন্যায্য, স্থির ও স্পষ্ট থাকতে সাহায্য করবে।'
        ]},
        {'id': 'expansion-dialogue', 'title': 'একটি কথোপকথন', 'blocks': [dialogue, 'কথোপকথনের লক্ষ্য কাউকে জিতিয়ে দেওয়া নয়। লক্ষ্য হলো এমন ভাষা খুঁজে নেওয়া যেখানে সত্য, সীমা, দায়িত্ব এবং সম্পর্ক—চারটিই যতটা সম্ভব জায়গা পায়। প্রয়োজনে বাক্য ছোট করো; ছোট বাক্য অনেক সময় nervous over-explaining-এর বদলে clarity আনে।', 'নিজের জন্য একটি alternative line লিখে রাখো। কঠিন মুহূর্তে improvisation কঠিন হয়; আগে থেকে তৈরি করা respectful language তোমাকে অন্যকে আঘাত না করে নিজের অবস্থান জানাতে সাহায্য করতে পারে।']},
        {'id': 'expansion-practice', 'title': 'ধাপে ধাপে প্রয়োগ', 'blocks': [steps, 'এই অনুশীলনটি এক দিনে শেষ করার project নয়। প্রথম দিন শুধু লক্ষ্য করো, দ্বিতীয় দিন একটি ছোট বাক্য বা action চেষ্টা করো, তৃতীয় দিন ফলাফল লিখে দেখো। যদি কাজ না করে, নিজের চরিত্রকে দোষ না দিয়ে intensity কমাও, context বদলাও বা support নাও।', 'Practice-এর শেষে তিনটি প্রশ্নের উত্তর দাও: কী লক্ষ্য করলাম? কী বেছে নিলাম? পরেরবার এক ধাপ কীভাবে সহজ করব? এই তিন প্রশ্ন progress-কে vague feeling থেকে observable evidence-এ নিয়ে আসে।']},
        {'id': 'expansion-caution', 'title': 'কোথায় সাবধান থাকবে', 'blocks': [g['caution'], 'কেউ তোমার boundary মানছে না, কোনো সম্পর্ক unsafe, বা নিজের কষ্ট দীর্ঘস্থায়ী—এমন হলে শুধু communication trick দিয়ে সমাধান করার চেষ্টা করো না। বাস্তব নিরাপত্তা, trusted support এবং প্রয়োজন হলে qualified professional-এর সাহায্য আগে।', 'এই বইয়ের framework-গুলো self-reflection ও everyday communication-এর জন্য। এগুলো অন্যকে diagnose, control বা manipulate করার shortcut নয়। মানুষের agency, consent, privacy এবং সাংস্কৃতিক পার্থক্য সবসময় সম্মান করতে হবে।']},
        {'id': 'expansion-reflection', 'title': 'Reflection Lab', 'blocks': [
            'আজকের journal-এ একটি নির্দিষ্ট ঘটনা লেখো। তারপর ঘটনা, তোমার অনুভূতি, তোমার interpretation, তোমার প্রয়োজন এবং তোমার next action—এই পাঁচটি আলাদা করো। আলাদা করে লিখলে মাথার ভেতরের জটিলতা কিছুটা বাইরে আসে এবং কোন জায়গায় choice আছে তা বোঝা যায়।',
            'একজন trusted মানুষের কাছে জিজ্ঞেস করতে পারো: “আমার এই আচরণে কী শক্তি দেখো, আর কোথায় আমি আরও clear হতে পারি?” Feedback চাওয়ার আগে বলো তুমি কোন ধরনের feedback চাও। এতে অপর পক্ষও বেশি নির্দিষ্ট হতে পারে এবং কথাটি judgment-এর বদলে learning-এর দিকে যায়।',
            f'Takeaway: {g["label"]}-এ উন্নতি মানে অন্যদের ওপর প্রভাব বিস্তার নয়; নিজের আচরণ, ভাষা ও values-এর মধ্যে বেশি সামঞ্জস্য তৈরি করা। আগামী সাত দিনে একটি ছোট প্রমাণ তৈরি করো এবং সেটি লিখে রাখো।'
        ]},
    ]
    entries.append((n, sections))

parts = [
    'import type { BookChapter, ChapterMeta, WorkbookExercise } from "./book";\n',
    'import { presenceChapters as phase1, presenceChapterLoaders as phase1Loaders, presenceTotalReadingMinutes as phase1Minutes, presenceWorkbookExercises as phase1Exercises } from "./presence-book";\n',
    'import { presencePhase2Chapters as phase2, presencePhase2Loaders as phase2Loaders, presencePhase2Exercises as phase2Exercises } from "./presence-book-phase2";\n',
    'import { presencePhase3Chapters as phase3, presencePhase3Loaders as phase3Loaders, presencePhase3Exercises as phase3Exercises } from "./presence-book-phase3";\n\n',
    'type Expansion = { id: string; title: string; blocks: string[] }[];\n',
    'const expansions: Record<number, Expansion> = {\n'
]
for n, sections in entries:
    parts.append(f'  {n}: {q(sections)},\n')
parts.append('};\n\n')
parts.extend([
    'const baseChapters: BookChapter[] = [...phase1, ...phase2, ...phase3];\n',
    'const expand = (chapter: BookChapter): BookChapter => {\n',
    '  const extra = expansions[chapter.number] ?? [];\n',
    '  const addedSections = extra.map((section) => ({ id: section.id, title: section.title, blocks: section.blocks.map((content) => ({ type: "paragraph" as const, content })) }));\n',
    '  const wordCount = [...chapter.sections, ...addedSections].reduce((sum, section) => sum + section.blocks.map((block) => block.content).join(" ").split(/\\s+/).length, 0);\n',
    '  return { ...chapter, readingMinutes: Math.max(chapter.readingMinutes, Math.ceil(wordCount / 190)), wordCount, sections: [...chapter.sections, ...addedSections] };\n',
    '};\n\n',
    'export const presenceExpandedChapters: BookChapter[] = baseChapters.map(expand);\n',
    'export const presenceExpandedMeta: ChapterMeta[] = presenceExpandedChapters.map(({ id, number, title, subtitle, readingMinutes }) => ({ id, number, title, subtitle, readingMinutes }));\n',
    'export const presenceExpandedLoaders: Record<string, () => Promise<{ default: BookChapter }>> = Object.fromEntries(presenceExpandedChapters.map((chapter) => [chapter.id, async () => ({ default: chapter })])) as Record<string, () => Promise<{ default: BookChapter }>>;\n',
    'export const presenceExpandedExercises: WorkbookExercise[] = [...phase1Exercises, ...phase2Exercises, ...phase3Exercises, ...presenceExpandedChapters.map((chapter) => ({ title: `অধ্যায় ${chapter.number}: Reflection Lab`, prompt: `অধ্যায় ${chapter.number} থেকে একটি বাস্তব ঘটনা লিখে ঘটনা, অনুভূতি, interpretation, প্রয়োজন ও next action আলাদা করো।` }))];\n',
    'export const presenceExpandedTotalReadingMinutes = presenceExpandedMeta.reduce((sum, chapter) => sum + chapter.readingMinutes, 0);\n',
])
OUT.write_text(''.join(parts), encoding='utf-8')
print(f'Wrote {OUT} with {len(entries)} chapter expansions')
