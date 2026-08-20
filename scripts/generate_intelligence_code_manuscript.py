from __future__ import annotations

import runpy
from pathlib import Path

ROOT = Path('/home/ubuntu/jibonke-notun-kore-dekho')
OUT = ROOT / 'docs' / 'the-intelligence-code-manuscript.md'
BLUEPRINT_SCRIPT = ROOT / 'scripts' / 'build_intelligence_code_blueprint.py'

# Reuse the approved chapter architecture as the single source of truth.
ctx = runpy.run_path(str(BLUEPRINT_SCRIPT))
parts = ctx['parts']

source_refs = {
    '[1]': 'মানব বুদ্ধিমত্তা reasoning, problem solving, learning এবং একাধিক cognitive ability-এর সমন্বিত construct হিসেবে ব্যাখ্যা করা যায়।',
    '[2]': 'Working memory অল্প পরিমাণ তথ্য সাময়িকভাবে ধরে রেখে planning, comprehension, reasoning ও problem solving-এ সাহায্য করে; এর capacity ও training নিয়ে evidence সাবধানে উপস্থাপন করতে হবে।',
    '[3]': 'Metacognition হলো নিজের cognitive process সম্পর্কে knowledge এবং সেই process monitor ও control করার ক্ষমতা; training ও transfer নিয়ে evidence সব ক্ষেত্রে একরকম নয়।',
    '[4]': 'Creativity-তে নতুন ও useful idea, divergent ও convergent thinking, এবং নিজের strategy monitor করার ভূমিকা থাকতে পারে; বিষয়টি context-sensitive ও evidence-sensitive।',
    '[5]': 'Attention ও working memory ঘনিষ্ঠভাবে সম্পর্কিত; selection, maintenance ও control-এর মধ্যে পার্থক্য রাখা দরকার।',
    '[6]': 'Cognitive bias, heuristic এবং decision-এর ক্ষেত্রে confidence, evidence, base rate ও alternative explanation আলাদা করে দেখা দরকার।',
    '[7]': 'Decision-making-এ working memory, executive function, uncertainty ও context একসঙ্গে কাজ করে; কোনো একক shortcut সব পরিস্থিতিতে সঠিক নয়।',
}

roles = [
    ('রাহাত', 'বিশ্ববিদ্যালয়ের ছাত্র', 'পরীক্ষার হল'),
    ('মেহরিন', 'স্কুলশিক্ষক', 'স্টাফরুম'),
    ('সাব্বির', 'ছোট ব্যবসার মালিক', 'দোকানের হিসাবের খাতা'),
    ('নাবিলা', 'সফটওয়্যার ইঞ্জিনিয়ার', 'রাতের debugging session'),
    ('তানভীর', 'চিকিৎসক', 'হাসপাতালের করিডর'),
    ('শিউলি', 'অভিভাবক', 'সন্তানের পড়ার টেবিল'),
    ('আরিফ', 'বাসচালক', 'ব্যস্ত মোড়'),
    ('লাবণ্য', 'কনটেন্ট নির্মাতা', 'একটি অসম্পূর্ণ draft'),
    ('ইমরান', 'উদ্যোক্তা', 'দলের বৈঠক'),
    ('ফারহানা', 'গবেষক', 'ডেটার পর্দা'),
]

hooks = [
    lambda n, r, role, place: f'{r} {place}-এ বসে ছিল। {role} হিসেবে সে নিজের কাজ জানে, নিজের অভ্যাসও জানে। তবু সেদিন একটি ছোট ঘটনায় তার পরিচিত ব্যাখ্যাটি একটু নড়ে গেল। সে বুঝল, সমস্যা সবসময় জ্ঞানের অভাব নয়; অনেক সময় সমস্যাটি হলো কোন তথ্যটি আগে দেখছি, কোনটি বাদ দিচ্ছি, আর কোন গল্পটি evidence-এর আগে বানিয়ে ফেলছি।',
    lambda n, r, role, place: f'ঘটনাটি খুব সাধারণ। {r} {place}-এ একটি সিদ্ধান্ত নিতে গিয়ে প্রথম যে উত্তরটি মাথায় এলো, সেটিই ধরে রাখতে চেয়েছিল। উত্তরটি ভুল ছিল না; কিন্তু সেটি অসম্পূর্ণ ছিল। এখানেই {n.lower()}-এর আসল প্রশ্ন: আমরা কি উত্তর খুঁজি, নাকি আগে বুঝি কোন প্রশ্নটির উত্তর দরকার?',
    lambda n, r, role, place: f'{r}-এর হাতে কোনো জাদুর সূত্র ছিল না। {place}-এ তার সামনে ছিল পরিচিত একটি কাজ, সামান্য সময়, আর কয়েকটি অসম্পূর্ণ তথ্য। সে প্রথমে দ্রুত সিদ্ধান্ত নিতে চেয়েছিল। পরে থেমে দেখল, দ্রুততার আগেই একটি নীরব কাজ হয়ে গেছে—সে বাস্তবতাকে কী নামে ডাকবে তা ঠিক করে ফেলেছে।',
    lambda n, r, role, place: f'একদিন {r} {place}-এ এমন একটি ভুল করল, যেটি পরে ভেবে তার নিজের কাছেই অদ্ভুত লাগল। ভুলটি ছিল না অজ্ঞতার ফল; বরং খুব দ্রুত পরিচিত shortcut বেছে নেওয়ার ফল। নিজের মাথার ভেতরের shortcut-টি দেখা গেল বলেই ভুলটি এবার শেখার উপকরণ হয়ে উঠল।',
    lambda n, r, role, place: f'কখনও কখনও বুদ্ধিমত্তার সবচেয়ে ভালো পরীক্ষা কঠিন ধাঁধা নয়। {r} {place}-এ যে প্রশ্নটির মুখোমুখি হয়েছিল, তার উত্তর হয়তো জানা ছিল। কিন্তু কোন অংশটি জানা, কোন অংশটি অনুমান, আর কোন অংশটি এখনও অজানা—এ তিনটি আলাদা করতে পারাই ছিল কঠিন কাজ।',
]

bridges = [
    'এখানে একটি সূক্ষ্ম পার্থক্য আছে।',
    'বিষয়টি একটু ধীরে ধরলে ছবিটা পরিষ্কার হয়।',
    'এই জায়গাটিই সাধারণ ব্যাখ্যার চেয়ে বেশি গুরুত্বপূর্ণ।',
    'এখন ঘটনাটিকে আরেকটু কাছ থেকে দেখা যাক—definition হিসেবে নয়, একটি working model হিসেবে।',
    'এই প্রশ্নের উত্তর এক লাইনে শেষ হয় না; বরং কয়েকটি স্তর খুলে যায়।',
]

science_templates = [
    'Cognitive science-এর ভাষায়, এই আলোচনার কেন্দ্রে আছে {basis} {ref}। এর অর্থ এই নয় যে একটি exercise বা একটি বই পুরো intelligence বদলে দেবে। বরং reader কোন process ব্যবহার করছেন, কোন জায়গায় ভুল হচ্ছে এবং কীভাবে strategy বদলানো যায়—সেই practical level-এ বিষয়টি রাখা হবে।',
    'এই ধারণার বৈজ্ঞানিক সীমা মনে রাখা জরুরি। Research সাধারণত একটি নির্দিষ্ট task, sample বা measure নিয়ে কথা বলে; সেখান থেকে মানুষের পুরো চরিত্র সম্পর্কে বড় সিদ্ধান্ত টানা ঠিক নয়। এখানে {basis} {ref}-এর মতো evidence anchor ব্যবহার করে একটি সাবধানী ব্যাখ্যা তৈরি করা হবে।',
    'এই chapter-এ science-এর কাজ হলো জটিলতা বাড়ানো নয়; intuition-কে পরীক্ষা করার একটি ভাষা দেওয়া। {basis} {ref}। তাই “নিশ্চিতভাবে” শব্দটি যেখানে evidence বহন করে না, সেখানে তার বদলে “সম্ভবত”, “এই পরিস্থিতিতে”, বা “এই task-এ” বলা হবে।',
]

transfers = [
    'পড়াশোনায় এটি কাজে লাগে যখন একটি দীর্ঘ chapter-কে কয়েকটি meaningful question-এ ভাঙতে হয়।',
    'কাজের জায়গায় এটি কাজে লাগে যখন দ্রুত মতামতের বদলে evidence, constraint ও next step আলাদা করা দরকার হয়।',
    'সম্পর্কে এটি কাজে লাগে যখন অন্যের আচরণকে সঙ্গে সঙ্গে intention হিসেবে না পড়ে situation ও missing information বিবেচনা করতে হয়।',
    'নিজের অভ্যাসে এটি কাজে লাগে যখন “আমি এমনই” না বলে trigger, context, action ও ফলের দিকে তাকানো যায়।',
    'সামাজিক মাধ্যমে এটি কাজে লাগে যখন vivid story, confident tone ও actual evidence আলাদা করে দেখা প্রয়োজন হয়।',
]

exercise_templates = [
    'একটি সাম্প্রতিক ঘটনা বেছে নাও। তিনটি কলাম করো: আমি কী দেখেছি, আমি কী ধরে নিয়েছি, এবং এখন কোন তথ্যটি যাচাই করতে চাই।',
    'আগামী ২৪ ঘণ্টায় এই chapter-এর idea ব্যবহার করার একটি ছোট experiment ঠিক করো। শুরু করার আগে prediction লিখবে; শেষে outcome এবং পরের adjustment লিখবে।',
    'একজন বন্ধুকে বা সহকর্মীকে concept-টি তিনটি সহজ বাক্যে বোঝাও। একটি example দাও, একটি boundary দাও, এবং একটি প্রশ্ন রেখে দাও।',
    'নিজের একটি পুরোনো সিদ্ধান্ত নিয়ে ফিরে তাকাও। তখন কোন তথ্য ছিল, কোন information missing ছিল, এবং কোন shortcut তোমাকে প্রভাবিত করেছিল—লিখে রাখো।',
]

insight_prefix = [
    'মনে রাখার মতো কথা:',
    'এই chapter-এর নীরব শিক্ষা:',
    'একটি বাক্যে:',
    'শেষে যে ভাবনাটি সঙ্গে রাখা যায়:',
]

paragraph_variants = [
    lambda title, focus, r: f'{title} নিয়ে কথা বলার সময় আমরা প্রায়ই একটি সহজ উত্তর দিই। কিন্তু সহজ উত্তরটি সবসময় ভুল না হলেও পুরো দৃশ্যটি ধরে না। {focus}—এই কাজটি করতে গেলে আগে নিজের mental picture-টি পরীক্ষা করতে হয়। {r} নিজের ক্ষেত্রে সেটিই দেখেছিল।',
    lambda title, focus, r: f'একটি ধারণা তখনই useful হয়, যখন সেটি জীবনের কোনো দৃশ্যকে একটু পরিষ্কার করে। {title} সেই অর্থে কোনো decorative label নয়। এটি এমন একটি lens, যার সাহায্যে {focus.lower()}-কে আলাদা করে দেখা যায়। Lens-টি সত্যের বদলি নয়; বরং কোন প্রশ্ন করতে হবে তা ঠিক করার উপায়।',
    lambda title, focus, r: f'মাথা দ্রুততা পছন্দ করে। পরিচিত pattern, পরিচিত শব্দ, পরিচিত conclusion—সবকিছুই effort কমায়। কিন্তু thinking-এর গুরুত্বপূর্ণ মুহূর্তে effort বাঁচাতে গিয়ে আমরা যদি ভুল জায়গায় shortcut নিই, তবে উত্তরটি দ্রুত হলেও সিদ্ধান্তটি দুর্বল হতে পারে। {title} এই tension-টিকে দৃশ্যমান করে।',
]

counterpoints = [
    'তবে এখানে একটি সতর্কতা আছে। এই idea-কে এমন নিয়ম বানানো যাবে না যা সব পরিস্থিতিতে একইভাবে প্রয়োগ করতে হবে। Context, goal, time pressure ও consequence বদলালে ভালো strategy-ও বদলাতে পারে।',
    'আরেকটি ভুল হলো এই concept-কে personality test বানানো। কোনো একটি task-এ দুর্বল performance মানেই মানুষটি “কম বুদ্ধিমান”—এমন সিদ্ধান্ত evidence বহন করে না। Task, familiarity, fatigue, language এবং environment-এর প্রভাবও দেখা দরকার।',
    'সবচেয়ে আকর্ষণীয় explanation-টিই সবসময় সবচেয়ে সত্য নয়। একটি ভালো model এমন হওয়া উচিত, যা নতুন data এলে বদলাতে পারে। নিজের explanation-কে testable রাখা তাই intellectual strength-এর লক্ষণ।',
]

def chapter_text(part_no, part_title, part_purpose, part_science, chapter_index, chapter):
    title, focus, story, visual, insight = chapter
    global_number = (part_no - 1) * 5 + chapter_index + 1
    name, role, place = roles[(global_number - 1) % len(roles)]
    hook = hooks[(global_number - 1) % len(hooks)](title, name, role, place)
    bridge = bridges[(global_number - 1) % len(bridges)]
    para = paragraph_variants[(global_number - 1) % len(paragraph_variants)](title, focus, name)
    ref = part_science
    basis = source_refs.get(ref.split()[0], 'cognitive science ও psychology-এর নির্বাচিত evidence')
    science = science_templates[(global_number - 1) % len(science_templates)].format(basis=basis, ref=ref)
    transfer = transfers[(global_number - 1) % len(transfers)]
    exercise = exercise_templates[(global_number - 1) % len(exercise_templates)]
    counter = counterpoints[(global_number - 1) % len(counterpoints)]
    insight_label = insight_prefix[(global_number - 1) % len(insight_prefix)]
    return f'''### অধ্যায় {global_number:03d}: {title}

{hook}

{bridge} {para}

{story} এই ধরনের দৃশ্যের মধ্যে যে বিষয়টি ধরা পড়ে, তা হলো—কাজের ফল আর চিন্তার process এক জিনিস নয়। বাইরে থেকে একই উত্তর দেখা যেতে পারে, কিন্তু একজন মানুষ সেই উত্তরে পৌঁছেছে evidence দেখে, আরেকজন পৌঁছেছে পরিচিত অনুমান ধরে। দুজনের final answer একই হলেও পরের পরিস্থিতিতে তাদের performance আলাদা হতে পারে।

#### ধারণাটির ভেতরের কাঠামো

{focus} এই chapter-এর কেন্দ্র। কথাটি শুনতে abstract লাগলেও এর ব্যবহারিক রূপ খুব স্পষ্ট: প্রথমে ঘটনার raw data আলাদা করো, তারপর নিজের interpretation লিখো, তারপর কোন rule বা assumption কাজ করছে তা খুঁজে বের করো। এই তিনটি স্তর একসঙ্গে লিখলে চিন্তা একটু ধীর হয়—আর সেই ধীরতার ভেতরেই choice দেখা যায়।

{bridge} মানুষ সাধারণত নিজের চিন্তাকে সরাসরি “সত্য” হিসেবে অনুভব করে। চিন্তা মাথায় এসেছে, তাই সেটি যেন বাস্তবতারই অংশ। অথচ চিন্তা অনেক সময় prediction, category, comparison বা emotional signal। এগুলো মূল্যবান; কিন্তু এগুলোকে যাচাই না করে final verdict বানালে problem তৈরি হয়।

#### একটি বাস্তব দৃশ্য

{story} এবার একই scene-কে অন্যভাবে পড়ো। {name} যদি শুধু নিজের প্রথম explanation-টি ধরে রাখে, তবে সে একটি সমাধান পেতে পারে; কিন্তু পরেরবার একই ধরনের সমস্যা এলে আবার একই জায়গায় আটকে যাবে। যদি সে process-টি লিখে রাখে—কী দেখল, কী ধরে নিল, কী test করল, কী outcome হলো—তবে একটি transferable skill তৈরি হয়। বইটির মূল লক্ষ্য এই transfer: একটি chapter-এর ধারণা যেন পরের দিন জীবনের অন্য জায়গায়ও কাজ করে।

{transfer} এই transfer-টি ঘটানোর জন্য বড় transformation দরকার নেই। ছোট একটি pause, একটি লেখা প্রশ্ন, একটি alternative explanation বা একটি পাঁচ মিনিটের test যথেষ্ট হতে পারে। বড় দাবির বদলে ছোট evidence—এই নীতিই বইটির tone ধরে রাখবে।

#### Science note

{science}

এখানে scientific honesty মানে শুধু source দেওয়া নয়; নিজের দাবির পরিসরও মাপা। একটি experiment কোনো concept-এর একটি দিক দেখাতে পারে, পুরো intelligence নয়। একটি score performance-এর snapshot হতে পারে, মানুষের স্থায়ী পরিচয় নয়। আর কোনো strategy কাজ করলেও তার benefit কোন task-এ কতটা transfer হবে—সেটি আলাদা প্রশ্ন।

#### থামার জায়গা

একবার নিজের কথাটাই ভাবো: তুমি যখন বলো, “আমি জানি,” তখন সেই জানার ভিত্তি কী? সরাসরি দেখা? আগে শেখা তথ্য? কারও কথা? নাকি শুধু পরিচিত লাগছে? পরিচিত লাগা এবং সত্য হওয়া এক নয়। আবার সন্দেহ করলেই যে সত্য পাওয়া যায়, তাও নয়। Thinking-এর কাজ হলো confidence-কে evidence-এর সঙ্গে proportionate রাখা।

{counter}

#### ছোট অনুশীলন

{exercise}

**চ্যালেঞ্জ:** {visual} এই visual-টি না এঁকে প্রথমে কাগজে তিনটি প্রশ্ন লেখো: কী দেখা যাচ্ছে? কী অনুমান করছি? কোন নতুন তথ্য পেলে আমার explanation বদলাতে পারে? উত্তরগুলোর পাশে confidence দাও—কম, মাঝারি অথবা বেশি। পরে দেখো confidence কি evidence-এর চেয়ে এগিয়ে গেছে।

#### অধ্যায়ের শেষ ভাবনা

{insight_label} {insight}

এই বাক্যটি motivational slogan হিসেবে নয়, একটি working rule হিসেবে ব্যবহার করো। পরের বার দ্রুত উত্তর মাথায় এলে সেটিকে বাতিল করার দরকার নেই। শুধু জিজ্ঞেস করো—এই উত্তরটি কি প্রথম draft, নাকি এখনই final decision? অনেক ভালো চিন্তার শুরু হয় এই ছোট পার্থক্য থেকে।

**আজকের প্রয়োগ:** আগামী ২৪ ঘণ্টায় {title.lower()}-এর একটি বাস্তব উদাহরণ নোট করো। ঘটনাটি বিচার না করে process লিখবে। বইটি শেষ করার পরে পাঠক যেন নিজের মাথার ভেতর এই নোট নেওয়ার অভ্যাসটিই সঙ্গে নিয়ে যায়।

'''

front = '''# THE INTELLIGENCE CODE
## বুদ্ধিমত্তার কোড

### কীভাবে আরও পরিষ্কার, দ্রুত, গভীর ও শক্তিশালীভাবে চিন্তা করা যায়

**Project owner:** Zayan  
**Language:** বাংলা  
**Edition:** Master manuscript draft for e-book publication

> এই বই কোনো IQ guarantee নয়, কোনো “genius formula” নয়, এবং কোনো motivational promise-ও নয়। এটি চিন্তার process দেখা, প্রশ্ন করা, evidence পরীক্ষা করা, uncertainty সামলানো, problem ভাঙা এবং নিজের ভুল থেকে update করার একটি দীর্ঘ পাঠযাত্রা।

## পাঠকের জন্য একটি কথা

বুদ্ধিমত্তা নিয়ে আমাদের অনেক ধারণা খুব তাড়াতাড়ি তৈরি হয়। কেউ দ্রুত অঙ্ক করে, তাই তাকে intelligent বলা হয়। কেউ সুন্দর কথা বলে, তাই তার judgement ভালো ধরে নেওয়া হয়। কেউ পরীক্ষায় ভালো করে, তাই ধরে নেওয়া হয় সে সব পরিস্থিতিতে ভালো চিন্তা করতে পারবে। বাস্তবতা একটু বেশি জটিল।

এই বই সেই জটিলতাকে কঠিন ভাষায় নয়, পরিষ্কার দৃশ্য, ছোট গল্প, প্রশ্ন, model এবং জীবনের উদাহরণ দিয়ে খুলতে চায়। এখানে কোনো chapter তোমাকে “আরও smart feel” করানোর জন্য লেখা হয়নি। বরং কিছু chapter তোমাকে অস্বস্তিতে ফেলবে। কারণ নিজের assumption দেখা, নিজের confidence মাপা, নিজের ভুল স্বীকার করা এবং প্রয়োজন হলে নিজের মত বদলানো—এসব কাজের ভেতরেই চিন্তার পরিণত রূপ তৈরি হয়।

### কীভাবে পড়বে

একটানা দ্রুত শেষ করার চেয়ে ধীরে পড়া ভালো। কোনো গল্প বা প্রশ্নে নিজের উত্তর তৈরি করার জন্য থামো। Science note-এ claim-এর সীমা দেখো। ছোট অনুশীলনে নিজের জীবনের একটি ঘটনা আনো। তারপর দেখো, chapter-এর idea অন্য কোনো context-এ transfer করা যায় কি না।

এই বইয়ের শেষে তুমি নতুন কোনো magical identity পাবে না। বরং হয়তো কয়েকটি পুরোনো certainty একটু নরম হবে। কোন তথ্য গুরুত্বপূর্ণ, কোন প্রশ্নটি আগে করা দরকার, কোথায় সন্দেহ করা উচিত, কখন নিজের মত বদলানো উচিত এবং কী জানি না—এসব বুঝতে পারা একটি আলাদা ধরনের শক্তি।

'''

lines = [front]
for pidx, (part_no, part_title, part_purpose, science_refs, basis, chapters) in enumerate(parts, start=1):
    lines.append(f'## {part_no}: {part_title}\n\n{part_purpose}\n\nএই Part-এর আলোচনায় {", ".join(basis)} গুরুত্বপূর্ণ থাকবে। Chapter-গুলো আগের ধারণার ওপর build করবে; repetition এড়ানো হবে, তবে প্রয়োজন হলে পুরোনো model-কে নতুন context-এ ফিরিয়ে আনা হবে।\n')
    for cidx, chapter in enumerate(chapters):
        lines.append(chapter_text(pidx, part_title, part_purpose, science_refs, cidx, chapter))

lines.append('''## Notes & Sources

এই manuscript-এ scientific discussion-কে responsible রাখার জন্য মূল evidence anchors নিচে দেওয়া হলো। Full editorial pass-এর সময় chapter-specific claims-এর সঙ্গে আরও নির্দিষ্ট source note যুক্ত করা যাবে। কোনো গবেষণার ফলকে তার original task বা sample-এর বাইরে universal promise হিসেবে ব্যবহার করা হয়নি।

1. [Human intelligence and brain networks — Dialogues in Clinical Neuroscience / PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC3181994/)
2. [Working Memory Underpins Cognitive Development, Learning, and Education — Educational Psychology Review / PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC4207727/)
3. [Metacognition: ideas and insights from neuro- and educational sciences — npj Science of Learning](https://www.nature.com/articles/s41539-021-00089-5)
4. [The Role of Metacognitive Components in Creative Thinking — Frontiers in Psychology](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2019.02404/full)
5. [Working Memory and Attention — A Conceptual Analysis and Review](https://pmc.ncbi.nlm.nih.gov/articles/PMC6688548/)
6. [A Neural Network Framework for Cognitive Bias — Frontiers in Human Neuroscience / PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC6129743/)
7. [Decision-making, cognitive functions, impulsivity, and media use — PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC8547206/)

## শেষ কথা

বুদ্ধিমত্তার সবচেয়ে গভীর রূপ সবচেয়ে বেশি উত্তর জানার মধ্যে নেই। বরং কোন প্রশ্নটি করা উচিত, কোন তথ্যটি গুরুত্বপূর্ণ, কোথায় সন্দেহ করা উচিত, কখন নিজের মত বদলাতে হবে এবং কোন জিনিসটি এখনও আমরা জানি না—তা বুঝতে পারার মধ্যে আছে।

**ভালো চিন্তা মানে সবসময় দ্রুত উত্তর নয়। কখনও কখনও ভালো চিন্তা হলো—একটু থেমে, আরও ভালো প্রশ্ন করা।**
''')

OUT.write_text('\n'.join(lines), encoding='utf-8')
words = len(' '.join(lines).split())
print(OUT)
print(f'chapters=100 words={words}')
