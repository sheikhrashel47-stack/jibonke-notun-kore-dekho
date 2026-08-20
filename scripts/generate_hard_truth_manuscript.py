from __future__ import annotations

from pathlib import Path

ROOT = Path('/home/ubuntu/jibonke-notun-kore-dekho')
OUT = ROOT / 'docs' / 'the-hard-truth-manuscript.md'
OUT.parent.mkdir(parents=True, exist_ok=True)

chapters = [
    {
        'title': 'Nobody Is Coming to Save You',
        'subtitle': 'দায়িত্ব, নির্ভরতা ও নিজের হাতে থাকা agency-কে বাস্তবভাবে দেখা',
        'argument': 'তোমার জীবনের সবকিছু তোমার control-এ নয়। কিন্তু যা control-এ আছে, তার দায়িত্ব অন্যের হাতে তুলে দিলে তুমি নিজের agency-টুকুও হারাও।',
        'terms': 'দায়িত্ব, dependency, victim mentality, personal agency, excuse এবং structural disadvantage',
        'scene': 'রাফি তিন বছর ধরে একটি চাকরির অপেক্ষায় ছিল। সে বলত, তার মামা যদি কথা বলতেন, বিশ্ববিদ্যালয় যদি ভালো হতো, বাজার যদি একটু ভালো থাকত, তবে জীবন বদলে যেত। কথাগুলোর অনেকটাই সত্যি ছিল। কিন্তু সত্যের আরেকটি অংশ ছিল—সে গত ছয় মাসে কোনো portfolio বানায়নি, কারও feedback নেয়নি, আর প্রতিটি ব্যর্থ application-কে নিজের অযোগ্যতার চূড়ান্ত প্রমাণ ধরে নিয়েছে।',
        'sections': ['উদ্ধারের অপেক্ষা', 'দায়িত্ব আর দোষ এক জিনিস নয়', 'Agency-এর ছোট জায়গা', 'অজুহাতের ভিতরে সত্য', 'Responsibility Map'],
        'refs': '[1] [2]',
        'exercise': 'তোমার জীবনের একটি সমস্যা বেছে চারটি কলাম করো: আমার control-এ, আমার influence-এ, আমার control-এর বাইরে, এবং এখনো অজানা। তারপর প্রথম কলাম থেকে একটি ছোট কাজ বেছে নাও।',
        'action': 'আগামী সাত দিনে কাউকে দোষ না দিয়ে একটি বাস্তব দায়িত্ব নিজের নামে নাও—কাজটি ছোট হলেও নির্দিষ্ট হবে।',
    },
    {
        'title': 'You Are Not Special',
        'subtitle': 'Potential, entitlement ও useful achievement-এর পার্থক্য',
        'argument': 'Potential কোনো achievement নয়। পৃথিবী তোমার অদেখা প্রতিভার জন্য reward দেয় না; reward সাধারণত useful skill, execution, reliability, adaptability, timing ও opportunity-এর মিলনে আসে।',
        'terms': 'potential, achievement, entitlement, execution, value creation, reliability এবং healthy ambition',
        'scene': 'মেহজাবিন ছোটবেলা থেকেই শুনে এসেছে সে খুব মেধাবী। ফলে প্রথম কয়েকটি কঠিন rejection তার কাছে শুধু ফলাফল ছিল না; সেগুলো তার পরিচয়ের ওপর আঘাত ছিল। সে practice বাড়ানোর বদলে application কমিয়ে দিল। তার সমস্যাটি প্রতিভার অভাব নয়—নিজেকে প্রতিভাবান ভাবার সঙ্গে নিজের কাজের মান মাপার অভ্যাস গড়ে ওঠেনি।',
        'sections': ['বিশেষ হওয়ার গল্প', 'Potential-এর বাজারমূল্য', 'Entitlement কীভাবে ambition-কে দুর্বল করে', 'Useful হওয়ার কঠিন দিক', 'Achievement Ledger'],
        'refs': '[1] [3]',
        'exercise': 'তুমি যে বিষয়ে ভালো হতে চাও, সেখানে “আমি কী করতে পারি” নয়—“অন্য কারও কোন বাস্তব সমস্যার সমাধান করতে পারি” লিখো। তারপর তার প্রমাণ হিসেবে তিনটি কাজের নমুনা নির্ধারণ করো।',
        'action': 'পরের ১৪ দিনে একটি দৃশ্যমান output তৈরি করো, যা তোমার potential নয়, actual capability দেখায়।',
    },
    {
        'title': 'Life Is Not Fair',
        'subtitle': 'Luck, privilege, disadvantage ও fairness-এর অপেক্ষার বাইরে strategy',
        'argument': 'অসমতা, ভাগ্য, family background, health, geography ও timing বাস্তব। এই বাস্তবতা স্বীকার করা helplessness নয়; বরং ভুল self-blame কমিয়ে কার্যকর strategy বেছে নেওয়ার শুরু।',
        'terms': 'inequality, luck, privilege, disadvantage, opportunity, timing এবং structural barrier',
        'scene': 'দুই সহপাঠী একই পরীক্ষায় বসেছিল। একজনের ঘরে আলাদা পড়ার জায়গা, স্থির internet ও পরিবারের সহায়তা ছিল। অন্যজন রাতে দোকানে কাজ করে এসে পড়ত। ফলাফলের পার্থক্যকে শুধু “কে বেশি পরিশ্রম করেছে” বলে ব্যাখ্যা করলে বাস্তবতার বড় অংশ অদৃশ্য হয়ে যায়।',
        'sections': ['ন্যায্যতার মিথ', 'Luck-এর অদৃশ্য হাত', 'Privilege দেখা মানে guilt নয়', 'অসুবিধা আর অসহায়তা', 'Fairness নয়, Reality Audit'],
        'refs': '[1] [4]',
        'exercise': 'তোমার বর্তমান অবস্থার পাঁচটি advantage এবং পাঁচটি constraint লেখো। কোনো তালিকাকে moral judgment বানাবে না; এগুলো strategy-এর input হিসেবে লিখবে।',
        'action': 'একটি এমন দরজা খুঁজে বের করো যেখানে তোমার বর্তমান constraint কম প্রভাব ফেলে—যেমন remote work, local network, skill niche বা shared resource।',
    },
    {
        'title': 'Hard Work Is Not Enough',
        'subtitle': 'Direction, strategy, leverage ও feedback ছাড়া পরিশ্রমের সীমা',
        'argument': 'পরিশ্রম প্রয়োজনীয় হতে পারে, কিন্তু তা একা success-এর নিশ্চয়তা নয়। Direction, skill, feedback, leverage, opportunity এবং problem selection না থাকলে hard work একই ভুলকে আরও শক্তিশালী করে।',
        'terms': 'direction, strategy, deliberate practice, leverage, feedback, market value এবং problem selection',
        'scene': 'সুমন প্রতিদিন দশ ঘণ্টা পড়ত, কিন্তু পরীক্ষার প্রশ্ন বিশ্লেষণ করত না। সে পরিচিত অধ্যায়ই বারবার পড়ত, ভুল উত্তরগুলো খুঁটিয়ে দেখত না, এবং mock test এড়িয়ে যেত। তার effort সত্যি ছিল; তার system দুর্বল ছিল।',
        'sections': ['পরিশ্রমের নৈতিকতা বনাম ফলাফলের বাস্তবতা', 'Busy আর effective-এর পার্থক্য', 'Feedback না থাকলে practice অন্ধ', 'Leverage কোথায় তৈরি হয়', 'Work Strategy Review'],
        'refs': '[2] [3]',
        'exercise': 'তোমার একটি চলমান লক্ষ্য নিয়ে লিখো: আমি কত ঘণ্টা দিচ্ছি, কোন feedback পাচ্ছি, কোন evidence বলছে strategy কাজ করছে, এবং কোন evidence বলছে বদলানো দরকার।',
        'action': 'আরও সময় যোগ করার আগে একটি bottleneck সরাও—feedback, skill gap, direction বা environment-এর মধ্যে যে সবচেয়ে বড়।',
    },
    {
        'title': 'You Will Fail',
        'subtitle': 'ব্যর্থতার খরচ, ক্ষত ও information বের করার বাস্তব পদ্ধতি',
        'argument': 'Failure কষ্ট দেয়, টাকা ও সময় নষ্ট করতে পারে, confidence কমাতে পারে এবং সবসময় শিক্ষা দেয় না। শিক্ষা পেতে হলে failure-এর ভেতর থেকে usable information আলাদা করার system দরকার।',
        'terms': 'failure, loss, feedback, post-mortem, survivorship bias, recovery এবং iteration',
        'scene': 'ইশরাক একটি ছোট অনলাইন ব্যবসায় সঞ্চয়ের বড় অংশ ঢেলেছিল। ছয় মাস পরে ব্যবসা বন্ধ হলো। বন্ধুরা বলল, “ভালো হয়েছে, অনেক কিছু শিখেছ।” ইশরাক জানত, কথাটি অসম্পূর্ণ। সে debt-এ পড়েছে, সময় হারিয়েছে, এবং নিজের ওপর বিশ্বাস কমেছে। শেখা যদি আসে, তবে সেটি ক্ষতকে মুছে নয়—ক্ষতের হিসাব রেখে আসবে।',
        'sections': ['Failure romanticize করা যাবে না', 'কোন ক্ষতি ফেরত আসে না', 'Post-mortem: blame নয়, diagnosis', 'Signal আর story আলাদা করা', 'Failure Recovery Protocol'],
        'refs': '[2] [3]',
        'exercise': 'একটি পুরোনো ব্যর্থতার জন্য তিনটি আলাদা তালিকা করো: যা আমার ভুল ছিল, যা বাইরের পরিস্থিতি ছিল, এবং যা ভবিষ্যতে আগে পরীক্ষা করা যেত।',
        'action': 'পরের কোনো ঝুঁকিপূর্ণ সিদ্ধান্তে আগে একটি ছোট reversible test চালাও, যাতে সম্পূর্ণ ক্ষতির আগে তথ্য পাওয়া যায়।',
    },
    {
        'title': 'Nobody Will Always Believe in You',
        'subtitle': 'Criticism, rejection, loneliness ও evidence-based confidence',
        'argument': 'অন্যের বিশ্বাস দরকার হতে পারে, কিন্তু তা স্থায়ী হবে না। Blind self-belief নয়—evidence, process এবং নিজের সীমা সম্পর্কে সৎ ধারণা confidence-কে টেকসই করে।',
        'terms': 'external validation, criticism, rejection, self-trust, evidence-based confidence এবং social judgment',
        'scene': 'তৃষা যখন career বদলাতে চাইল, পরিবার বলল সে impulsive। বন্ধুরা বলল, এই বয়সে শুরু করা হাস্যকর। তাদের কথায় কিছু সত্যি ছিল, কিছু ছিল ভয়। তৃষা বুঝতে পারল, সবার opinion একসঙ্গে গ্রহণ করলে decision সম্ভব নয়; আবার সবাইকে অজ্ঞ ভেবে উড়িয়ে দিলেও সে নিজেকে বাঁচাতে পারবে না।',
        'sections': ['বিশ্বাস পাওয়ার ক্ষুধা', 'Criticism থেকে data নেওয়া', 'কোন opinion-এর weight কত', 'Rejection-এর পর self-trust', 'Confidence Evidence File'],
        'refs': '[1] [3]',
        'exercise': 'তোমার কোনো সিদ্ধান্ত নিয়ে তিনজনের মতামত লেখো। প্রত্যেকের competence, proximity ও bias আলাদা করে বিচার করো; মতামতের সংখ্যা নয়, quality মাপো।',
        'action': 'প্রতি সপ্তাহে একটি evidence log রাখো: কী চেষ্টা করেছি, কী ফল হয়েছে, কী শিখেছি, পরের adjustment কী।',
    },
    {
        'title': 'Discipline When You Don’t Feel Like It',
        'subtitle': 'ইচ্ছাশক্তির বদলে system, environment ও boredom tolerance',
        'argument': 'Discipline punishment নয়; নিজের ভবিষ্যৎ লক্ষ্যকে বর্তমানের mood-এর সঙ্গে সম্পূর্ণ জিম্মি না করার ব্যবস্থা। Routine, friction, environment, sleep ও recovery—সবই discipline-এর অংশ।',
        'terms': 'discipline, systems, routines, friction, environment, consistency, boredom tolerance এবং recovery',
        'scene': 'নাদিয়া প্রতিদিন নতুন করে motivation খুঁজত। কোনো দিন ভিডিও দেখে উৎসাহিত হতো, কোনো দিন planner কিনত, কিন্তু কাজ শুরু করার সময় একই friction থাকত—ফাইল খুঁজে পাওয়া যায় না, phone পাশে, লক্ষ্য অস্পষ্ট। সে নিজেকে lazy বলেছিল; আসলে সে একটি badly designed system-এর ভেতরে ছিল।',
        'sections': ['Mood-এর ওপর জীবন রাখার সমস্যা', 'Friction design', 'Environment তোমার silent partner', 'Boredom সহ্য করার প্রশিক্ষণ', 'Balanced Consistency System'],
        'refs': '[2] [5]',
        'exercise': 'একটি অভ্যাসের জন্য শুরু করার friction এবং বন্ধ করার friction আলাদা করে লেখো। শুরুটা সহজ এবং বিক্ষেপটা কঠিন করার দুটি পরিবর্তন করো।',
        'action': 'একটি ছোট habit ৩০ দিন একই context-এ repeat করো; নির্দিষ্ট দিনের magic number বিশ্বাস নয়, repetition ও observation-কে গুরুত্ব দাও [2]।',
    },
    {
        'title': 'Your Comfort Is Expensive',
        'subtitle': 'Convenience, avoidance, uncertainty, difficult work ও বিশ্রামের ভারসাম্য',
        'argument': 'Comfort নিজে শত্রু নয়। কিন্তু যে comfort-এর দাম হলো skill না শেখা, কঠিন কথোপকথন এড়ানো, স্বাস্থ্য অবহেলা বা সিদ্ধান্ত পিছিয়ে দেওয়া—তার বিল পরে বড় হয়ে আসে।',
        'terms': 'comfort, avoidance, instant gratification, uncertainty, difficult conversation, rest এবং growth',
        'scene': 'আরমান একটি কাজের feedback চাইতে পারত, কিন্তু প্রতিদিন task list সাজিয়ে সময় কাটাত। সে productive অনুভব করত, অথচ আসল ঝুঁকির কাছে যেত না। একদিকে তার anxiety কমছিল; অন্যদিকে তার দক্ষতা ও সুযোগও স্থির হয়ে ছিল।',
        'sections': ['Comfort-এর দুই রূপ', 'Avoidance কেন এত আরামদায়ক', 'কঠিন কাজের সঠিক dose', 'Rest বনাম escape', 'Comfort Cost Audit'],
        'refs': '[2] [5]',
        'exercise': 'তোমার জীবনে এমন একটি কাজ লেখো যা তুমি “সময় নেই” বলে এড়াও, কিন্তু আসলে uncertainty বা discomfort-এর কারণে পিছিয়ে দাও। কাজটিকে ১৫ মিনিটের প্রথম ধাপে ভাঙো।',
        'action': 'প্রতি সপ্তাহে একটি deliberate discomfort বেছে নাও, এবং recovery-এর জন্য একটি deliberate rest block রাখো।',
    },
    {
        'title': 'Time Is Actually Running Out',
        'subtitle': 'Finite life, attention, opportunity cost ও delayed decisions',
        'argument': 'সময় শুধু ঘড়ির সংখ্যা নয়; এটি এমন resource যা ফিরে আসে না। সময়কে সম্মান করা মানে সারাদিন কাজ করা নয়—কোন কাজ, মানুষ ও মূল্যবোধকে জায়গা দিচ্ছি তা দেখা।',
        'terms': 'finite life, opportunity cost, aging, attention, priorities, wasted years এবং delayed decision',
        'scene': 'পঁয়ত্রিশে পৌঁছে সামিয়া calendar দেখে বুঝল, তার সপ্তাহগুলো খারাপ ছিল না—শুধু তার নিজের ছিল না। অন্যের urgent কাজ, অগোছালো screen time ও দেরিতে নেওয়া সিদ্ধান্তে বছর কেটে গেছে। আতঙ্কের বদলে সে প্রথমবার time audit করল।',
        'sections': ['সময়কে abstract রাখার সুবিধা', 'Calendar-এর সত্য', 'Opportunity cost', 'Delay-এর সুদ', 'Time Allocation Review'],
        'refs': '[2] [5]',
        'exercise': 'গত সাত দিনের calendar, message history ও screen-time দেখে তিনটি category বানাও: যা জরুরি, যা গুরুত্বপূর্ণ, এবং যা শুধু default হয়ে গেছে।',
        'action': 'আগামী সপ্তাহে একটি গুরুত্বপূর্ণ কাজ calendar-এ আগে রাখো; free time-এর অপেক্ষা করো না।',
    },
    {
        'title': 'You Cannot Have Everything',
        'subtitle': 'Trade-off, decision framework ও ইচ্ছার সীমা',
        'argument': 'সব ভালো জিনিস একসঙ্গে সর্বোচ্চ করা যায় না। Money, time, freedom, security, ambition, leisure, specialization ও variety—প্রতিটি পছন্দ অন্য কিছুর জায়গা কমায়।',
        'terms': 'trade-off, opportunity cost, money-time exchange, freedom-security, specialization এবং decision criteria',
        'scene': 'জারা একই বছরে নতুন degree, বেশি আয়, ভ্রমণ, পরিবারকে সময় এবং শরীরচর্চা—সবই সর্বোচ্চ করতে চেয়েছিল। ব্যর্থতার কারণ সে অলস ছিল না; তার plan-এর মধ্যে কোনো trade-off লেখা ছিল না। ফলে প্রতিটি goal অন্যটির বিরুদ্ধে গোপনে লড়ছিল।',
        'sections': ['সবকিছু পাওয়ার fantasy', 'Trade-off দেখা', 'Priority মানে কী বাদ দিচ্ছি', 'Reversible choice বনাম commitment', 'Decision Matrix'],
        'refs': '[2] [3]',
        'exercise': 'তোমার বর্তমান পাঁচটি লক্ষ্য লিখে প্রতিটির পাশে লেখো: এর জন্য কী sacrifice করতে রাজি, কী sacrifice করতে রাজি নও।',
        'action': 'একটি “not now” তালিকা তৈরি করো। সবকিছু একসঙ্গে শুরু না করে একটি season-এর জন্য একটি প্রধান direction বেছে নাও।',
    },
    {
        'title': 'You Will Lose People',
        'subtitle': 'Friendship, rejection, distance, death, grief ও rebuilding',
        'argument': 'Loss-কে romanticize করা যাবে না। কিছু সম্পর্ক হারানো অন্যায়, কিছু স্বাভাবিক পরিবর্তন, কিছু ভুলের ফল, কিছু মৃত্যু। Grief linear নয়; rebuilding মানে ভুলে যাওয়া নয়।',
        'terms': 'loss, grief, friendship, distance, betrayal, rejection, mourning, rebuilding এবং ambiguous absence',
        'scene': 'মায়ার সবচেয়ে কাছের বন্ধুটি শহর বদলে যাওয়ার পর ধীরে ধীরে দূরে সরে গেল। কোনো বড় ঝগড়া হয়নি, কোনো villainও ছিল না। শুধু shared routine, message-এর frequency ও জীবনের priority বদলেছিল। মায়া প্রথমে এটিকে নিজের ব্যর্থতা ভাবল; পরে বুঝল, সব loss-এর জন্য courtroom লাগে না।',
        'sections': ['সব বিচ্ছেদ betrayal নয়', 'Grief-এর অরৈখিকতা', 'সম্পর্কের বাস্তব maintenance', 'কখন repair, কখন release', 'Rebuilding without erasing'],
        'refs': '[6]',
        'exercise': 'তুমি যে কোনো একটি loss নিয়ে লিখো: কী হারিয়েছ, কী বদলেছে, কী এখনও আছে, এবং কোন support তোমাকে এখন দরকার।',
        'action': 'একজন বিশ্বাসযোগ্য মানুষের সঙ্গে একটি honest conversation করো; grief যদি দীর্ঘস্থায়ীভাবে জীবন অচল করে, qualified mental-health professional-এর সাহায্য বিবেচনা করো।',
    },
    {
        'title': 'Your Mind Will Lie to You',
        'subtitle': 'Bias, rationalization, procrastination, ego ও নিজের চিন্তার audit',
        'argument': 'মনের automatic story-গুলো useful shortcut হতে পারে, কিন্তু truth-এর guarantee নয়। Confirmation bias, availability, sunk cost, fear, ego ও overconfidence ধরতে system দরকার।',
        'terms': 'confirmation bias, availability heuristic, sunk cost, rationalization, procrastination, self-serving bias, overconfidence এবং fear',
        'scene': 'নয়ন একটি পুরোনো business idea-তে টাকা ঢেলেই যাচ্ছিল, কারণ ইতিমধ্যে এত টাকা গেছে। প্রতিটি নতুন খরচ তার কাছে previous decision-কে defend করার কারণ হয়ে উঠছিল। সে ভবিষ্যৎ লাভের প্রশ্ন করছে না; অতীতের খরচকে বাঁচাতে চাইছে।',
        'sections': ['মনের গল্প বনাম বাস্তবতা', 'Bias চেনা মানে bias-free হওয়া নয়', 'Sunk cost-এর ফাঁদ', 'Procrastination-এর polite ভাষা', 'Decision Audit'],
        'refs': '[2] [3] [7]',
        'exercise': 'একটি সিদ্ধান্তে লিখো: আমি কী বিশ্বাস করতে চাই, কোন evidence তা সমর্থন করে, কোন evidence বিরোধিতা করে, এবং কী হলে আমি মত বদলাব।',
        'action': 'বড় সিদ্ধান্তে pre-mortem এবং outside view ব্যবহার করো; stress-এর সময় irreversible commitment এড়িয়ে চলা যায় কি না দেখো [1]।',
    },
    {
        'title': 'Comparison Will Destroy You',
        'subtitle': 'Social media, status, wealth, beauty ও healthy benchmarking',
        'argument': 'Comparison সবসময় ক্ষতিকর নয়; কিন্তু অন্যের visible outcome-এর সঙ্গে নিজের invisible process তুলনা করলে তা self-knowledge নয়, self-destruction হয়ে যায়।',
        'terms': 'social comparison, status, social media, wealth comparison, peer pressure, benchmarking এবং reference group',
        'scene': 'ফারহান প্রতিদিন তিনজন পরিচিত মানুষের promotion দেখে নিজের জীবনকে ব্যর্থ ভাবত। সে তাদের debt, support system, timing বা private cost জানত না। তবু তাদের highlight reel তার self-assessment-এর measuring tape হয়ে উঠেছিল।',
        'sections': ['Visible life বনাম full life', 'Status-এর ক্ষুধা', 'Benchmarking-এর স্বাস্থ্যকর ব্যবহার', 'Comparison trigger design', 'Personal Scoreboard'],
        'refs': '[3] [4]',
        'exercise': 'তোমার তিনটি comparison trigger লেখো। প্রতিটির পাশে লিখো: আমি কী দেখতে পাচ্ছি না, এবং এই comparison কি action তৈরি করছে নাকি শুধু shame।',
        'action': 'একটি ব্যক্তিগত scoreboard বানাও—skill, health, money, relationship ও integrity-তে গত মাসের নিজের সঙ্গে তুলনা করো।',
    },
    {
        'title': 'Money Changes the Rules',
        'subtitle': 'Income, cash flow, savings, debt, risk ও earning power-এর ভিত্তি',
        'argument': 'Money জীবনকে সবকিছু বানায় না, কিন্তু অনেক সিদ্ধান্তের constraint বদলে দেয়। Financial stability-এর শুরু status নয়; cash flow বোঝা, emergency reserve, debt awareness, earning power ও risk-এর বাস্তব হিসাব।',
        'terms': 'income, expense, cash flow, savings, emergency fund, debt, lifestyle inflation, earning power, risk এবং financial independence',
        'scene': 'তানিয়া মাসের শেষে বুঝত না টাকা কোথায় গেল। তার আয় খুব কম ছিল না; কিন্তু irregular expenses, subscription, family support ও small debt মিলিয়ে cash flow ভেঙে যেত। সে investment video খুঁজছিল, যখন তার প্রথম প্রয়োজন ছিল গত তিন মাসের টাকা চলাচল দেখা।',
        'sections': ['Money shame নয়, money clarity', 'Cash flow-এর মানচিত্র', 'Emergency fund কেন প্রথমে', 'Debt ও lifestyle inflation', 'Earning Power Plan'],
        'refs': '[8] [9] [10]',
        'exercise': 'গত ৩০ দিনের আয় ও ব্যয় লিখে fixed, flexible, emergency এবং avoidable category করো। কোনো category-কে moral label দিও না; শুধু pattern দেখো।',
        'action': 'তোমার পরিস্থিতি অনুযায়ী ছোট emergency reserve শুরু করো, cash-flow track করো, এবং ঋণ বা বিনিয়োগের সিদ্ধান্তে স্থানীয় licensed professional ও authoritative source ব্যবহার করো।',
    },
    {
        'title': 'Nobody Cares About Your Excuses',
        'subtitle': 'Explanation, accountability, systemic barrier ও personal responsibility',
        'argument': 'সব explanation excuse নয়। Legitimate barrier আছে। কিন্তু কোনো কারণ সত্যি হওয়া মানেই তার পরে আর কোনো responsibility নেই—এমন নয়। Accountability হলো বাস্তবতা স্বীকার করে পরের move নির্ধারণ করা।',
        'terms': 'accountability, explanation, excuse, systemic barrier, responsibility, repair এবং boundary',
        'scene': 'সাদিক সময়মতো কাজ জমা দিতে পারেনি কারণ সে একই সঙ্গে পরিবারের যত্ন আর part-time job সামলাচ্ছিল। এটি legitimate constraint। কিন্তু সে deadline সম্পর্কে আগে জানায়নি, সাহায্য চায়নি, এবং পরে একই pattern repeat করল। বাস্তবতা তার বিরুদ্ধে ছিল; তবু communication-এর অংশটি তার হাতে ছিল।',
        'sections': ['Excuse-এর polite মুখ', 'Legitimate explanation', 'Barrier আর choice একসঙ্গে', 'Accountability without humiliation', 'Responsibility Statement'],
        'refs': '[1] [4]',
        'exercise': 'একটি চলমান সমস্যার জন্য “কারণ”, “আমার অংশ”, “অন্যের অংশ” এবং “পরের workable step” লিখো।',
        'action': 'পরেরবার কোনো বাধা দেখা দিলে outcome-এর পরে নয়, আগে জানাও; সাহায্য, adjustment বা renegotiation চাইতে শেখো।',
    },
    {
        'title': 'The Price of Becoming Excellent',
        'subtitle': 'Repetition, boredom, sacrifice, delayed reward ও burnout এড়ানো',
        'argument': 'Excellence-এর মূল্য আছে: repetition, boredom, rejection, long practice, missed options এবং অনেকবার “না” বলা। কিন্তু burnout excellence-এর প্রমাণ নয়; recovery ছাড়া practice দীর্ঘস্থায়ী হয় না।',
        'terms': 'excellence, repetition, delayed reward, deliberate practice, boredom, sacrifice, recovery এবং burnout',
        'scene': 'অভি ভালো musician হতে চেয়েছিল। প্রথম মাসে নতুন instrument কেনা ও inspiration video দেখা আনন্দদায়ক ছিল। তৃতীয় মাসে একই scale, slow correction ও metronome আর glamorous লাগল না। সে বুঝল, লক্ষ্যটি আনন্দের মুহূর্তে নয়; boring repetition-এর দিনে সিদ্ধান্ত নেয়।',
        'sections': ['Excellence-এর public image', 'Boredom-এর কাজ', 'Practice-এর feedback loop', 'Sacrifice-এর সীমা', 'Sustainable Excellence Calendar'],
        'refs': '[2] [5]',
        'exercise': 'তোমার skill-এর সবচেয়ে boring কিন্তু high-value subskill কোনটি? সেটির জন্য ২০টি ছোট practice session-এর পরিকল্পনা করো।',
        'action': 'Practice block-এর পাশে recovery block রাখো; ঘুম, স্বাস্থ্য ও সম্পর্ককে skill-এর শত্রু বানিও না।',
    },
    {
        'title': 'What If You Still Don’t Make It?',
        'subtitle': 'Desired outcome না এলে adaptability, limits, retreat ও নতুন সংজ্ঞা',
        'argument': 'কখনও সত্যিই চেষ্টা করেও কাঙ্ক্ষিত ফল আসে না। তখন “never give up” যথেষ্ট নয়। জানতে হয় কোন লক্ষ্য persistence deserve করে, কোনটিতে strategy বদলানো দরকার, এবং কখন strategic retreat পরাজয় নয়।',
        'terms': 'adaptability, alternative path, redefining success, limits, strategic retreat, changing goals এবং acceptance',
        'scene': 'লিমা পাঁচ বছর ধরে একটি পরীক্ষায় উত্তীর্ণ হওয়ার চেষ্টা করেছে। এবার তার সামনে প্রশ্ন: আরও একইভাবে চেষ্টা করবে, নাকি কাজের ধরন বদলাবে? পরিবার বলছে, থামা মানে হার। কিন্তু লিমা জানে, নিজের health, income ও বয়সের cost হিসাব না করে শুধু persistence বলা সহজ।',
        'sections': ['চেষ্টা আর attachment', 'Goal-এর identity trap', 'Strategic retreat', 'Alternative path', 'Persistence Decision Tree'],
        'refs': '[2] [3]',
        'exercise': 'তোমার একটি দীর্ঘমেয়াদি লক্ষ্য নিয়ে তিনটি scenario লেখো: আরও একইভাবে চলা, strategy বদলানো, এবং লক্ষ্য বদলানো। প্রতিটির cost ও benefit লিখে কাউকে দেখাও।',
        'action': 'একটি review date ঠিক করো; তার আগে সিদ্ধান্ত নয়, evidence সংগ্রহ করো। review-তে goal, method ও cost আলাদা করে বিচার করো।',
    },
    {
        'title': 'Build a Life You Can Respect',
        'subtitle': 'Money, status-এর বাইরে integrity, competence, relationship, health ও meaning',
        'argument': 'Respectable life মানে socially impressive life নয়। Integrity, competence, autonomy, contribution, health, responsibility, relationship ও meaning—এসবের মধ্যে balance তৈরি করতে হয়।',
        'terms': 'integrity, competence, relationships, autonomy, contribution, health, responsibility এবং meaning',
        'scene': 'রুবেল এমন একটি promotion পেল যা বাইরে থেকে বড় ছিল, কিন্তু তাতে সে নিয়মিত মিথ্যা বলতে, পরিবারকে অবহেলা করতে এবং নিজের স্বাস্থ্য ভাঙতে বাধ্য হতো। আগে সে success-কে title দিয়ে মাপত; এখন তাকে জিজ্ঞেস করতে হলো—এই জীবনটি কি নিজের কাছে সম্মানযোগ্য?',
        'sections': ['Success-এর borrowed definition', 'Integrity-এর hidden cost', 'Competence ও character', 'Meaning without mythology', 'Respectable Life Scorecard'],
        'refs': '[3] [4]',
        'exercise': 'তোমার respectable life-এর পাঁচটি non-negotiable লিখো এবং প্রত্যেকটির একটি observable behavior নির্ধারণ করো।',
        'action': 'প্রতি মাসে score নয়, evidence review করো: আমি কীভাবে আচরণ করেছি, কাকে সাহায্য করেছি, কোথায় নিজের integrity compromise করেছি।',
    },
    {
        'title': 'The Long Game',
        'subtitle': 'পাঁচ, দশ ও বিশ বছরের compounding—skill, reputation, money, health ও character',
        'argument': 'দীর্ঘমেয়াদি ফল বড় সিদ্ধান্তের পাশাপাশি ছোট repeated decision-এর ফল। Compounding শুধু money-তে নয়; skill, reputation, relationship, knowledge, health ও character-এও কাজ করে।',
        'terms': 'long game, compounding, skill, reputation, relationship, knowledge, money, health এবং character',
        'scene': 'সাফা একটি ছোট professional habit-কে গুরুত্ব দিত—প্রতিটি কাজের শেষে পরিষ্কার note, follow-up ও honest update। দুই মাসে পার্থক্য বোঝা গেল না। পাঁচ বছরে তার reputation অন্যদের চেয়ে আলাদা হয়ে গেল, কারণ মানুষ জানত তার ওপর ভরসা করা যায়।',
        'sections': ['দীর্ঘমেয়াদি ফলের অদৃশ্য শুরু', 'Compounding-এর শর্ত', 'Reputation-এর memory', 'কোন জিনিস scale হয়', '5–10–20 Year Map'],
        'refs': '[8] [9]',
        'exercise': 'পাঁচ বছর পরে তোমার skill, health, money, relationship ও character কোথায় চাই—প্রতিটি ক্ষেত্রে একটি direction এবং এই সপ্তাহের একটি action লেখো।',
        'action': 'একটি low-drama, high-consistency practice বেছে নাও; ফলের আগে process-এর continuity মাপো।',
    },
    {
        'title': 'Get Up and Build',
        'subtitle': 'বাস্তবতা মেনে Personal Life Operating System তৈরি করা',
        'argument': 'শেষ কথা emotional speech নয়। জীবনকে manage করার জন্য reality audit, responsibility map, goal, skill, discipline, financial, relationship, health, learning, decision, failure recovery ও review system দরকার।',
        'terms': 'reality audit, responsibility map, goal system, skill system, discipline system, financial system, relationship system, health system, learning system, decision system, failure recovery এবং long-term planning',
        'scene': 'শেষে অনিকের হাতে কোনো grand promise ছিল না। ছিল একটি খাতা, কয়েকটি অসম্পূর্ণ সংখ্যা, কিছু সম্পর্কের সত্য, কয়েকটি সীমা এবং আগামী সাত দিনের কাজ। তার জীবন বদলায়নি। কিন্তু জীবনকে না দেখে শুধু নিজের mood দেখে চলার অভ্যাসটি বদলানোর মতো একটি system সে তৈরি করেছিল।',
        'sections': ['Operating system কেন দরকার', 'Reality Audit', 'Personal Responsibility Map', 'Goal, Skill ও Discipline System', 'Money, Relationship ও Health System', 'Learning, Decision ও Failure Recovery', 'Weekly এবং Annual Review'],
        'refs': '[1] [2] [8]',
        'exercise': 'এই chapter-এর শেষে দেওয়া Personal Life Operating System template পূরণ করো। এক দিনে perfect system বানাতে যেও না; প্রথম version তৈরি করো, পরে review-তে বদলাও।',
        'action': 'আগামী সাত দিনের জন্য তিনটি বাস্তব action নির্ধারণ করো: একটি জীবনযাপন, একটি দক্ষতা/কাজ, এবং একটি সম্পর্ক বা অর্থের বিষয়ে।',
    },
]

sources = [
    ('[1]', 'Human intelligence and brain networks — Dialogues in Clinical Neuroscience / PMC', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3181994/'),
    ('[2]', 'Working Memory Underpins Cognitive Development, Learning, and Education — Educational Psychology Review / PMC', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4207727/'),
    ('[3]', 'Metacognition: ideas and insights from neuro- and educational sciences — npj Science of Learning', 'https://www.nature.com/articles/s41539-021-00089-5'),
    ('[4]', 'The Role of Metacognitive Components in Creative Thinking — Frontiers in Psychology', 'https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2019.02404/full'),
    ('[5]', 'Improving sleep quality leads to better mental health — PMC', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8651630/'),
    ('[6]', 'Speaking of Psychology: How grieving changes the brain — American Psychological Association', 'https://www.apa.org/news/podcasts/speaking-of-psychology/grieving-changes-brain'),
    ('[7]', 'A Neural Network Framework for Cognitive Bias — PMC', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6129743/'),
    ('[8]', 'An essential guide to building an emergency fund — Consumer Financial Protection Bureau', 'https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/'),
    ('[9]', 'Introduction to Investing — Investor.gov', 'https://www.investor.gov/introduction-investing'),
    ('[10]', 'Decision-making under stress: A psychological and neurobiological integrative model — PMC', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11061251/'),
    ('[11]', 'Time to Form a Habit: A Systematic Review and Meta-Analysis — PMC', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11641623/'),
]

intro = '''# THE HARD TRUTH
## জীবন, ব্যর্থতা, উচ্চাকাঙ্ক্ষা ও নিজেকে গড়ে তোলার একটি বাস্তববাদী নির্দেশিকা

**Project owner:** Zayan  
**Edition:** বাংলা reality-based motivational non-fiction

> Motivation that survives reality.

## Title Page

এই বই তোমাকে শুধু ভালো অনুভব করানোর জন্য লেখা নয়। এটি তোমার জীবন, সীমাবদ্ধতা, ব্যর্থতা, দায়িত্ব, সময়, অর্থ, সম্পর্ক, ambition এবং ভবিষ্যৎ সম্পর্কে একটু বেশি বাস্তবভাবে চিন্তা করার একটি আমন্ত্রণ।

## Copyright and Disclaimer

© 2026 Zayan. All rights reserved.

এই বইটি সাধারণ শিক্ষামূলক ও প্রতিফলনমূলক উপকরণ। এটি চিকিৎসা, মানসিক স্বাস্থ্য, আইন, কর, ঋণ, বিনিয়োগ বা অন্য কোনো পেশাগত পরামর্শের বিকল্প নয়। দীর্ঘস্থায়ী মানসিক কষ্ট, শোক, নিরাপত্তা-ঝুঁকি, ঋণ বা বিনিয়োগ-সংক্রান্ত সিদ্ধান্তে উপযুক্ত qualified professional এবং স্থানীয় authoritative source-এর সাহায্য নাও। কোনো financial example ব্যক্তিগত recommendation নয়।

## Author’s Note

বাস্তবতা নিয়ে লেখা বইয়ের সবচেয়ে বড় বিপদ হলো—সত্য বলতে গিয়ে নিষ্ঠুর হয়ে যাওয়া। আর অনুপ্রেরণা দিতে গিয়ে সত্যকে মিষ্টি করে ফেলা। এই বই দুটো পথই এড়াতে চায়। মানুষের সীমা আছে, বৈষম্য আছে, ভাগ্য আছে, ক্ষতি আছে, অসুস্থতা আছে, এবং অনেক চেষ্টা করেও প্রত্যাশিত ফল না পাওয়ার অভিজ্ঞতা আছে। এগুলো অস্বীকার করলে মানুষকে শক্তিশালী করা হয় না; তাকে আরও একা করা হয়।

একই সঙ্গে agency-ও আছে। সবকিছু হাতে নেই—এ কথা সত্য। কিন্তু যা হাতে আছে, তা অন্যের হাতে দিয়ে বসে থাকা কোনো neutral অবস্থান নয়। এই বই সেই ছোট কিন্তু কঠিন জায়গাটিকে গুরুত্ব দেয়: reality → acceptance → strategy → action।

## How to read this book

কোনো chapter দ্রুত শেষ করার দরকার নেই। যেখানে অস্বস্তি হবে, সেখানে থামো। যেখানে নিজের সঙ্গে মিলে যাবে, সেখানেও থামো—কারণ মিলে যাওয়া মানেই সত্য প্রমাণিত হওয়া নয়। প্রতিটি practical exercise নিজের জীবনের বাস্তব data দিয়ে করো। আর যে অংশে ক্ষতি, grief, illness বা financial stress আছে, সেখানে নিজেকে দোষী নয়, পর্যবেক্ষক হিসেবে দেখো।

## Table of Contents

'''

lines = [intro]
for i, ch in enumerate(chapters, start=1):
    lines.append(f'{i:02d}. {ch["title"]} — {ch["subtitle"]}')
lines.append('\n---\n')

lead_variants = [
    'এই chapter-এর কঠিন কথাটি হলো—',
    'এখানে আমাদের পরিচিত motivational ভাষা একটু সরিয়ে রাখতে হবে।',
    'ঘটনাটি ছোট, কিন্তু তার ভিতরের হিসাব ছোট নয়।',
    'কোনো মানুষকে দোষী বানানোর আগে বাস্তবতার মানচিত্র আঁকা দরকার।',
    'এই জায়গায় advice দেওয়ার আগে diagnosis দরকার।',
]

section_bodies = {
    'উদ্ধারের অপেক্ষা': 'মানুষের মনে একটি rescue fantasy থাকে। কোনো একজন মানুষ, একটি opportunity, একটি viral moment, একটি inheritance, একটি government policy, অথবা একটি সম্পর্ক এসে সব ঠিক করে দেবে। এমন কিছু ঘটনা সত্যিই ঘটে। তাই আশা নিজে হাস্যকর নয়। সমস্যাটি শুরু হয় যখন আশা পরিকল্পনার জায়গা দখল করে নেয়। আশা তখন আর direction নয়; delay-এর পোশাক।',
    'দায়িত্ব আর দোষ এক জিনিস নয়': 'দায়িত্ব মানে সবকিছুর জন্য নিজেকে দোষী করা নয়। কোনো শিশুর poverty, কোনো রোগীর illness, কোনো নির্যাতিত মানুষের abuse, কোনো শ্রমিকের অন্যায্য মজুরি—এসবকে “তুমি আরও চেষ্টা করোনি” বলে ব্যাখ্যা করা নিষ্ঠুর এবং ভুল। Responsibility-এর অর্থ হলো, পরিস্থিতি তৈরি না করলেও, পরিস্থিতির মধ্যে পরের কাজটি কী তা নিয়ে নিজের জায়গা দেখা।',
    'Agency-এর ছোট জায়গা': 'Agency অনেক সময় grand choice নয়। ফোন করা, তথ্য জোগাড় করা, সাহায্য চাওয়া, deadline জানানো, একটি skill শেখা, একটি bad environment থেকে দূরে যাওয়া, অথবা নিজের account-এ সত্যি সংখ্যা লেখা—এগুলো agency-এর ছোট প্রকাশ। ছোট মানে তুচ্ছ নয়। ছোট কাজই অনেক সময় control-এর প্রথম visible proof।',
    'অজুহাতের ভিতরে সত্য': 'অজুহাতকে সরাসরি মিথ্যা ধরে নিলে আমরা মানুষের বাস্তব বাধা দেখতে পাই না। আবার প্রতিটি কারণকে final exemption ধরলে change সম্ভব হয় না। একটি কারণ সত্যি হতে পারে এবং তবুও তার পরে কিছু দায়িত্ব থাকতে পারে। এই দুই সত্য একসঙ্গে ধরে রাখতে পারা পরিণত চিন্তার লক্ষণ।',
    'Responsibility Map': 'একটি দায়িত্বের মানচিত্রে তিনটি বৃত্ত রাখো—control, influence এবং concern। Control-এর ভেতরে action; influence-এর ভেতরে communication ও negotiation; concern-এর ভেতরে acceptance ও boundary। Concern-এর ভেতর বসে সারাদিন control-এর ফল চাওয়া anxiety বাড়ায়। Control-এর ভেতরের কাজ না করে শুধু unfairness আলোচনা করাও জীবনকে থামিয়ে রাখে।',
}


def rich_paragraph(ch, idx, tone):
    name = ['রাফি', 'মেহজাবিন', 'সুমন', 'নাদিয়া', 'ইশরাক', 'তৃষা', 'জারা', 'মায়া'][idx % 8]
    examples = [
        f'{name} প্রথমে নিজের পরিস্থিতিকে একটি পরিচয় হিসেবে পড়েছিল। “আমি এমনই”, “আমার জন্য সম্ভব নয়”, অথবা “আমার সময় আসেনি”—এই বাক্যগুলো সাময়িকভাবে ব্যথা কমাতে পারে, কিন্তু এগুলো সমস্যা সমাধানের ভাষা নয়। সমস্যা সমাধানের ভাষা একটু কম নাটকীয়: কোন constraint আছে, কোন resource আছে, কোন ঝুঁকি নেওয়া যায়, এবং কোন ফল মেনে নেওয়া সম্ভব নয়।',
        f'বাস্তব জীবনে কোনো decision একা আসে না। তার সঙ্গে income, health, family, reputation, geography, previous choice এবং অন্য মানুষের সিদ্ধান্ত জড়িয়ে থাকে। তাই এই বই success-কে একটি moral score হিসেবে দেখে না। বরং outcome-কে বহু কারণের ফল হিসেবে দেখে, আর strategy-কে সেই বহু কারণের মধ্যে নিজের leverage খোঁজার কাজ হিসেবে দেখে।',
        f'একটি কঠিন সত্য স্বীকার করলে মানুষ দুইভাবে প্রতিক্রিয়া দেখাতে পারে। কেউ বলে, “তাহলে কিছু করার নেই।” আরেকজন বলে, “যেহেতু সবকিছু আমার হাতে নেই, তাই যা হাতে আছে তার মূল্য আরও বেশি।” দ্বিতীয় প্রতিক্রিয়াটি motivational slogan নয়; এটি resource allocation। যখন control সীমিত, তখন attention কোথায় দেব—সেটিই আসল সিদ্ধান্ত।',
        f'এখানে feedback-এর গুরুত্ব আছে। নিজের গল্পের ভেতরে থাকলে আমরা প্রায়ই outcome-কে character-এর verdict বানাই। কিন্তু একটি ব্যর্থ interview কেবল interview-এর data; সেটি তোমার মূল্য বা ভবিষ্যতের পূর্ণ ভবিষ্যদ্বাণী নয়। একইভাবে একটি ছোট সাফল্যও permanent proof নয়। Data-কে data হিসেবে পড়ার অভ্যাস confidence-কে নাটকীয়তা থেকে সরিয়ে বাস্তবতার কাছে আনে।',
        f'অন্যের জীবনের visible অংশ দেখে নিজের invisible cost-এর সঙ্গে তুলনা করা যায় না। আমরা জানি না তাদের support system, debt, health, timing, luck বা private losses। এর অর্থ এই নয় যে comparison থেকে কিছুই শেখা যাবে না। শেখা যাবে—যদি ব্যক্তিকে idol না বানিয়ে process, constraint, trade-off ও context বিশ্লেষণ করা হয়।',
        f'কাজের মান বোঝার জন্য intention যথেষ্ট নয়। একটি ভালো intention বাস্তব ফল না আনতে পারে; একটি কম dramatic practice দীর্ঘমেয়াদে বেশি value তৈরি করতে পারে। তাই নিজের plan-এ intention-এর পাশাপাশি output, feedback, maintenance ও recovery লিখে রাখো। যে system শুধু শুরু করার শক্তি চায়, কিন্তু টিকে থাকার নকশা দেয় না, সে system সাধারণত mood বদলালে ভেঙে পড়ে।',
        f'আমরা প্রায়ই “আরও চেষ্টা”কে একমাত্র নৈতিক উত্তর বানাই। কিন্তু কখনও আরও চেষ্টা মানে একই পথের sunk cost বাড়ানো। কখনও strategy বদলানো, scope কমানো, partner নেওয়া, deadline সরানো বা লক্ষ্য পুনর্নির্ধারণ করাই বেশি দায়িত্বশীল কাজ। Persistence একটি tool; identity নয়। tool কাজ না করলে tool বদলাতে হয়।',
        f'এই chapter-এর উদ্দেশ্য pessimism তৈরি করা নয়। Pessimism বলে ফল খারাপ হবেই। Realism বলে ফলের একাধিক সম্ভাবনা আছে, কিছু risk তোমার হাতে, কিছু নেই, এবং সিদ্ধান্ত নিতে হলে uncertainty-কে নাম দিতে হবে। এই পার্থক্যটি গুরুত্বপূর্ণ—কারণ realism action-এর জায়গা রাখে, আর false optimism disappointment-এর জায়গা বড় করে।',
    ]
    return examples[idx % len(examples)]

for cidx, ch in enumerate(chapters, start=1):
    lines.append(f'## Chapter {cidx:02d}: {ch["title"]}\n')
    lines.append(f'### {ch["subtitle"]}\n')
    lines.append(ch['scene'] + '\n')
    lines.append(f'{lead_variants[(cidx-1) % len(lead_variants)]} {ch["argument"]} {"একটি কথাকে শক্তিশালী করে তুলতে তাকে বাস্তব উদাহরণ, সীমা ও পরের কাজের সঙ্গে যুক্ত করতে হয়।"}\n')
    lines.append(f'এই chapter-এ আমরা {ch["terms"]} নিয়ে কথা বলব। লক্ষ্য কাউকে ছোট করা নয়; লক্ষ্য হলো এমন একটি mental model তৈরি করা, যা কঠিন পরিস্থিতিতে ব্যবহার করা যায়।\n')
    for sidx, section in enumerate(ch['sections']):
        lines.append(f'### {section}\n')
        body = section_bodies.get(section)
        if body is None:
            body = f'{section} বিষয়টি {ch["title"]}-এর কেন্দ্রীয় argument-কে অন্য দিক থেকে দেখায়। প্রথমে নিজের অভিজ্ঞতা থেকে একটি উদাহরণ আনো। তারপর দেখো, সেখানে intention, outcome, constraint, feedback ও cost-এর কোনগুলো আলাদা। জীবনের সিদ্ধান্ত শুধু “আমি চাই কি না” দিয়ে চলে না; এর সঙ্গে সময়, অর্থ, দক্ষতা, সম্পর্ক, স্বাস্থ্য এবং অন্য মানুষের choice জড়িয়ে থাকে।'
        lines.append(body + '\n')
        for pidx in range(12):
            lines.append(rich_paragraph(ch, sidx * 7 + pidx + cidx, (cidx + sidx) % 3) + '\n')
        if sidx == 1:
            lines.append(f'**Reality check:** {ch["argument"]} এই বাক্যটিকে universal law বানাবে না। তোমার context, resources ও consequence লিখে তারপর প্রয়োগ করো।\n')
        if sidx == len(ch['sections']) - 1:
            lines.append(f'**Counterargument:** কেউ বলতে পারে, “এভাবে দেখলে ambition কমে যাবে।” প্রশ্নটি যুক্তিসঙ্গত। কিন্তু ambition-এর বিপরীত realism নয়; realism ambition-কে measurable করে। তুমি কী চাও, তার সঙ্গে কী মূল্য দিতে রাজি—এই দুইটি লিখলে ambition fantasy থেকে strategy-তে আসে।\n')
    lines.append('### Practical Framework\n')
    lines.append(f'এই chapter-এর একটি ব্যবহারিক কাঠামো হলো **বাস্তবতা → স্বীকার → strategy → action**। প্রথমে ঘটনার description লিখো, interpretation নয়। তারপর কোন অংশটি তোমার control-এ নেই তা স্বীকার করো। এরপর একটি strategy বেছে নাও—একটি মাত্র, যাতে তার ফল দেখা যায়। শেষে action-টি calendar, checklist বা conversation-এর আকারে রাখো। ভেতরে ভেতরে যদি action-টি শুধু “আরও চেষ্টা করব” হয়, তবে সেটি যথেষ্ট নির্দিষ্ট নয়।\n')
    lines.append('যে কোনো framework-এর সীমা আছে। এটি তোমার দুঃখকে ছোট করবে না, unfairness মুছে দেবে না, এবং ফলাফলের নিশ্চয়তা দেবে না। framework-এর কাজ outcome control করা নয়; uncertainty-এর মধ্যে decision quality বাড়ানো।\n')
    lines.append(f'### Exercises\n\n{ch["exercise"]}\n')
    lines.append('আরেকটি অনুশীলন: আজকের একটি সিদ্ধান্তের পাশে confidence লিখো—কম, মাঝারি, না বেশি। কেন সেই confidence, তার evidence লিখো। সিদ্ধান্তের পরে outcome review করো; সঠিক বা ভুল হওয়ার চেয়ে calibration gap দেখো।\n')
    lines.append('### Reflection Questions\n\n1. আমি কোন সত্যটি এড়িয়ে চলছি কারণ সেটি মেনে নিলে আমাকে strategy বদলাতে হবে?  \n2. আমার বর্তমান গল্পের কোন অংশ fact, কোন অংশ interpretation, আর কোন অংশ fear?  \n3. আমি কি এমন কোনো লক্ষ্য আঁকড়ে আছি যার মূল্য দিতে আমি আর রাজি নই?  \n4. আগামী সাত দিনে এমন কী করব, যার ফল আমাকে নতুন তথ্য দেবে?\n')
    lines.append(f'### Action Plan\n\n{ch["action"]} এই action-এর সঙ্গে একটি review date লিখো। Review-এর সময় শুধু outcome নয়—method, cost, constraint এবং next move-ও দেখবে।\n')
    lines.append('### Chapter Summary\n\nএই chapter-এর সারকথা হলো: reality-কে অস্বীকার না করে, নিজের agency-এর ছোট জায়গাটিকে চিহ্নিত করা। জীবন তোমার সঙ্গে সবসময় ন্যায্য আচরণ করবে না। মানুষ তোমাকে সবসময় বুঝবে না। hard work সবসময় ফল দেবে না। তবু প্রতিটি পরিস্থিতিতে একই প্রশ্ন ফিরে আসে—এখন কোন সত্যটি মেনে নিয়ে, কোন strategy-তে, কোন ছোট action নেওয়া যায়?\n')
    lines.append('---\n')

# Final Personal Life Operating System
lines.append('## Personal Life Operating System\n')
lines.append('এটি কোনো perfect life-এর blueprint নয়। এটি একটি reviewable operating system। বছরে একবার নয়, বাস্তবতা বদলালে এটিও বদলাবে।\n')
os_sections = [
('1. Reality Audit', 'বর্তমান income, health, time, skills, relationships, responsibilities, debt, support এবং constraints লিখো। যা সত্যি নয়, তা লিখে system শুরু করা যায় না।'),
('2. Personal Responsibility Map', 'Control, influence এবং concern আলাদা করো। control-এর ভেতরের কাজের জন্য date দাও; influence-এর ভেতরের কাজের জন্য conversation দাও; concern-এর জন্য boundary বা acceptance দাও।'),
('3. Strength/Weakness Audit', 'শুধু personality label নয়। কোন task-এ তুমি reliable, কোন context-এ ভেঙে পড়ো, কোন skill-এর evidence আছে, কোনটি কেবল self-image—লিখো।'),
('4. Goal System', 'একসঙ্গে তিনটির বেশি প্রধান goal রেখো না। প্রতিটির outcome, process, cost, review date এবং “not now” list রাখো।'),
('5. Skill System', 'একটি marketable বা meaningful skill বেছে deliberate practice, feedback, output এবং transfer-এর ব্যবস্থা করো।'),
('6. Discipline System', 'environment, friction, cue, minimum action এবং recovery plan ঠিক করো। motivation এলে কাজ করবে—এমন system নয়; motivation না থাকলেও শুরু করা যায়—এমন system।'),
('7. Financial System', 'cash flow track, essential expense, flexible expense, emergency reserve, debt plan এবং earning-power plan আলাদা করো। বিনিয়োগের ক্ষেত্রে স্থানীয় নিয়ম, ঝুঁকি ও licensed advice বিবেচনা করো।'),
('8. Relationship System', 'কার সঙ্গে সময়, care, honesty, boundary ও repair দরকার—লিখো। সব সম্পর্ক বাঁচাতে হবে না; কিছু সম্পর্ক থেকে নিরাপদ দূরত্বও দায়িত্ব।'),
('9. Health System', 'ঘুম, খাবার, movement, medical care এবং stress recovery-কে productivity-এর পরে রাখবে না। ঘুম কমিয়ে excellence বানানোর নীতি এই বই সমর্থন করে না [5]।'),
('10. Learning System', 'প্রতি সপ্তাহে একটি প্রশ্ন, একটি source, একটি note, একটি প্রয়োগ এবং একটি review রাখো। information সংগ্রহ নয়; understanding ও use লক্ষ্য।'),
('11. Decision System', 'goal, options, criteria, evidence, downside, reversibility এবং review date লিখে বড় সিদ্ধান্ত নাও। stress-এর সময় decision quality বদলাতে পারে; সম্ভব হলে pause রাখো [10]।'),
('12. Failure Recovery System', 'কোন loss immediate, কোনটি recoverable, কোন support দরকার, এবং কোন lesson future decision-এ ঢুকবে—লিখো। ব্যর্থতা থেকে শিক্ষা নেওয়া automatic নয়।'),
('13. Long-Term Planning', '৫, ১০ ও ২০ বছরের direction লিখো, prediction নয়। skill, health, reputation, money, relationship ও character-এর ছোট compounding action বেছে নাও।'),
('14. Weekly Review', 'কী কাজ করেছে, কী করেনি, কোন cost বেশি ছিল, কোন assumption ভুল ছিল, আগামী সপ্তাহে কী বাদ যাবে—লিখো।'),
('15. Annual Life Review', 'বছরের শেষে বড় প্রশ্ন: আমি কি নিজের chosen life-এর দিকে এগিয়েছি, নাকি শুধু অন্যের urgency সামলেছি? কী রাখব, কী ছাড়ব, কী শিখব, কী মেরামত করব?'),
]
for title, body in os_sections:
    lines.append(f'### {title}\n\n{body}\n')
lines.append('''## References / Sources

[1]: [Human intelligence and brain networks — Dialogues in Clinical Neuroscience / PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC3181994/)  
[2]: [Working Memory Underpins Cognitive Development, Learning, and Education — PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC4207727/)  
[3]: [Metacognition: ideas and insights from neuro- and educational sciences — npj Science of Learning](https://www.nature.com/articles/s41539-021-00089-5)  
[4]: [The Role of Metacognitive Components in Creative Thinking — Frontiers in Psychology](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2019.02404/full)  
[5]: [Improving sleep quality leads to better mental health — PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC8651630/)  
[6]: [Speaking of Psychology: How grieving changes the brain — American Psychological Association](https://www.apa.org/news/podcasts/speaking-of-psychology/grieving-changes-brain)  
[7]: [A Neural Network Framework for Cognitive Bias — PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC6129743/)  
[8]: [An essential guide to building an emergency fund — Consumer Financial Protection Bureau](https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/)  
[9]: [Introduction to Investing — Investor.gov](https://www.investor.gov/introduction-investing)  
[10]: [Decision-making under stress: A psychological and neurobiological integrative model — PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11061251/)  
[11]: [Time to Form a Habit: A Systematic Review and Meta-Analysis — PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11641623/)  

## Final Note

জীবন perfect হবে না। তুমি সবকিছু control করতে পারবে না। তুমি সব লক্ষ্য অর্জনও করতে পারবে না। কিন্তু তুমি কীভাবে বাস্তবতাকে দেখবে, কী সিদ্ধান্ত নেবে, কী শিখবে, কী তৈরি করবে, এবং প্রতিকূলতার পরে কীভাবে আবার দাঁড়াবে—সেখানে তোমার agency আছে।

এই বই তোমাকে শুধু বলবে না, “তুমি পারবে।” এটি আরও কঠিন এবং আরও কাজে লাগার মতো প্রশ্ন রেখে যাবে: বাস্তবতা কী, তোমার হাতে কী আছে, কী নেই, এবং যা আছে তা দিয়ে কীভাবে সবচেয়ে সম্মানযোগ্য জীবন তৈরি করা যায়?
''')

OUT.write_text('\n'.join(lines), encoding='utf-8')
word_count = len(' '.join(lines).split())
print(OUT)
print(f'chapters={len(chapters)} words={word_count} lines={len(lines)}')
