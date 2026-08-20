from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "client" / "src" / "data"
CHAPTER_DIR = DATA_DIR / "brain-chapters"
CHAPTER_DIR.mkdir(parents=True, exist_ok=True)

levels = [
    ("Brain Reset", "মস্তিষ্ককে বোঝা, মনোযোগের জায়গা তৈরি করা এবং brain training-এর বাস্তব সীমা জানা", ["তোমার Brain আসলে কী করে?", "Attention কী?", "Mental Energy", "Cognitive Load", "Brain Training-এর সত্য-মিথ্যা"]),
    ("Attention Training", "মনোযোগকে ইচ্ছাশক্তির পরীক্ষা না বানিয়ে একটি নকশা ও অনুশীলন হিসেবে দেখা", ["মনোযোগ কেন পালিয়ে যায়?", "Selective Attention", "Distraction Control", "Deep Focus", "Attention Boss Challenge"]),
    ("Observation", "দেখা আর লক্ষ্য করার পার্থক্য, detail এবং everyday pattern ধরা", ["দেখা বনাম লক্ষ্য করা", "Detail Detection", "Pattern in Everyday Life", "Observation Memory", "Master Observation Challenge"]),
    ("Working Memory", "মাথায় তথ্য ধরে রাখা, বদলানো এবং chunk করে ব্যবহার করা", ["Working Memory কী?", "Information ধরে রাখা", "Information manipulate করা", "Chunking", "Working Memory Challenge"]),
    ("Recall", "তথ্য দেখা নয়, প্রয়োজনের সময়ে তুলে আনার দক্ষতা তৈরি করা", ["মনে রাখা বনাম Recall", "Active Recall", "Association", "Memory Structure", "Recall Challenge"]),
    ("Processing Speed", "দ্রুততা, নির্ভুলতা এবং গুরুত্বপূর্ণ তথ্য বেছে নেওয়ার ভারসাম্য", ["দ্রুত চিন্তা মানেই ভালো চিন্তা?", "Mental Calculation", "Information Filtering", "Speed বনাম Accuracy", "Processing Challenge"]),
    ("Pattern Recognition", "সংখ্যা, দৃশ্য ও ঘটনার ভেতরের পুনরাবৃত্তি এবং ব্যতিক্রম শনাক্ত করা", ["Pattern কী?", "Number Pattern", "Visual Pattern", "Hidden Pattern", "Pattern Boss"]),
    ("Logical Thinking", "দাবি, কারণ, শর্ত এবং সিদ্ধান্তকে নিয়ম মেনে পরীক্ষা করা", ["Logic কী?", "Deduction", "Induction", "Conditional Reasoning", "Logic Master Challenge"]),
    ("Critical Thinking", "তথ্য, মতামত, assumption ও bias আলাদা করে দেখা", ["সব তথ্য সত্য নয়", "Fact বনাম Opinion", "Assumption", "Bias Detection", "Critical Thinking Boss"]),
    ("Problem Solving", "সমস্যাকে সংজ্ঞায়িত, ভাঙা এবং বিকল্প সমাধান তৈরি করা", ["সমস্যাকে সংজ্ঞায়িত করা", "Problem Breakdown", "Root Cause", "Alternative Solutions", "Ultimate Problem-Solving Challenge"]),
    ("Mental Models", "First principles, inversion, opportunity cost এবং second-order thinking ব্যবহার করা", ["First Principles", "Inversion", "Opportunity Cost", "Second-Order Thinking", "Mental Model Challenge"]),
    ("Cognitive Flexibility", "একই সমস্যায় একাধিক পথ, perspective এবং strategy বদলানোর ক্ষমতা", ["একটি সমস্যার একাধিক পথ", "Perspective Switching", "Changing Strategy", "Thinking Outside the Pattern", "Flexibility Challenge"]),
    ("Numerical Intelligence", "সংখ্যাকে অনুভব করা, অনুমান করা, probability বোঝা এবং mental math করা", ["Number Sense", "Estimation", "Probability Basics", "Mental Math", "Numerical Boss"]),
    ("Verbal Intelligence", "শব্দের সম্পর্ক, analogy, ভাষার pattern এবং verbal reasoning", ["Word Relationships", "Analogies", "Verbal Logic", "Language Patterns", "Verbal Reasoning Challenge"]),
    ("Spatial Intelligence", "মনে ছবি তৈরি, ঘোরানো, রূপান্তর এবং spatial pattern দেখা", ["Mental Visualization", "Rotation", "Shape Transformation", "Spatial Patterns", "Spatial Boss"]),
    ("Creativity", "একটি প্রশ্নে বেশি সম্ভাব্য উত্তর, নতুন combination এবং idea তৈরি করা", ["Creativity আসলে কী?", "Divergent Thinking", "Alternative Uses", "Idea Combination", "Creative Thinking Challenge"]),
    ("Decision Intelligence", "ঝুঁকি, probability, trade-off এবং সিদ্ধান্তের পরিণতি দেখা", ["Decision কীভাবে কাজ করে?", "Risk", "Probability", "Trade-off", "Decision Challenge"]),
    ("Learning Intelligence", "দ্রুত শেখা নয়, গভীরভাবে বোঝা, recall এবং spaced practice করা", ["কীভাবে দ্রুত শেখা যায়?", "Deep Understanding", "Active Recall", "Spaced Practice", "Learning Challenge"]),
    ("Advanced Brain Training", "বিভিন্ন cognitive skill একসঙ্গে ব্যবহার করে mixed reasoning করা", ["Mixed Reasoning", "Memory + Logic", "Attention + Problem Solving", "Creativity + Reasoning", "Advanced Brain Boss"]),
    ("Cognitive Mastery", "জটিলতা, একাধিক constraint এবং নিজের thinking system একসঙ্গে পরিচালনা করা", ["Integrated Thinking", "Complex Problem Solving", "Multiple Constraints", "The Ultimate Brain Challenge", "Your Cognitive Mastery Test"]),
]

challenge_bank = {
1: [
("তিনটি বাক্য পড়ো: ‘আমি এখন ক্লান্ত’, ‘এই কাজটি আজ করা সম্ভব নয়’, ‘পাঁচ মিনিট শুরু করলে কী হয় দেখি’। কোনটি fact, কোনটি interpretation, কোনটি experiment?", "ক্লান্তি অনুভূতি/তথ্য হতে পারে; কাজটি সম্ভব নয় interpretation; পাঁচ মিনিটের শুরু experiment।", "মস্তিষ্ক অনুভূতি ও সিদ্ধান্তকে এক করে ফেললে দরজা বন্ধ মনে হয়। আলাদা করে লিখলে choice দেখা যায়."),
("এক মিনিটে তোমার মাথায় আসা পাঁচটি চিন্তা লিখে পাশে দাও—শরীর, কাজ, ভয়, পরিকল্পনা বা অন্য।", "এটি চিন্তার শ্রেণিবিন্যাস; কোনো উত্তর ‘ভালো’ বা ‘খারাপ’ নয়।", "মনের ভেতরের চলাচলকে নাম দিলে observer mode সক্রিয় হয়; চিন্তা আর তুমি এক জিনিস থাকো না."),
("শক্তি কম থাকা দিনে ২০ মিনিটের কাজকে ২ মিনিটের প্রথম পদক্ষেপে নামাও।", "ফাইল খোলা, শিরোনাম লেখা বা বইয়ের পৃষ্ঠা চিহ্নিত করাই যথেষ্ট প্রথম পদক্ষেপ।", "আমরা প্রায়ই কাজের পুরো পাহাড় দেখে শুরু করতে চাই; ছোট দরজা খুললে resistance কমে."),
("একটি কাজ বেছে নাও এবং বলো—এটি না করার সবচেয়ে বড় immediate cost কী, আর করার সবচেয়ে ছোট immediate reward কী?", "Cost ও reward লিখে দৃশ্যমান করাই সমাধান।", "দূরের ফল মস্তিষ্ক কম অনুভব করে; কাছের ফল নকশা না করলে ভালো কাজ দুর্বল লাগে."),
("Brain training নিয়ে দুটি দাবি: ‘প্রতিদিন অনুশীলনে তুমি নিশ্চিতভাবে ৩০ IQ point বাড়াবে’ এবং ‘অনুশীলনে নির্দিষ্ট skill-এ দক্ষতা বাড়তে পারে’। কোনটি দায়িত্বশীল?", "দ্বিতীয়টি; প্রথমটি অতিরঞ্জিত ও নির্দিষ্ট নিশ্চয়তা দেয়।", "একটি puzzle score পুরো intelligence নয়; performance ও transfer আলাদা করে ভাবতে হয়."),
],
2: [
("একটি paragraph পড়ার সময় প্রতি বার phone notification দেখলে কোন attention cost তৈরি হয়—সময়, context নাকি দুটোই?", "দুটোই; context ফিরে পেতে সময় ও mental effort লাগে।", "মনোযোগ সুইচ করাকে মস্তিষ্ক বিনামূল্যে করে না; switching-এর friction থাকে."),
("একটি ঘরে লাল জিনিস গুনতে গিয়ে নীল জিনিস কীভাবে চোখ এড়িয়ে যেতে পারে?", "লক্ষ্য আগে থেকেই নির্ধারিত filter বানায়; নীল জিনিস দেখা গেলেও report নাও হতে পারে।", "Selective attention তথ্যকে মুছে দেয় না; report করার পথে অগ্রাধিকার দেয়."),
("তোমার distraction log-এ trigger হিসেবে notification, boredom, কঠিন বাক্য ও ক্লান্তি আছে। কোনটি আগে বদলাবে?", "যেটি সবচেয়ে ঘন ঘন এবং সহজে বদলানো যায়—যেমন notification mute।", "সব সমস্যা একসঙ্গে সমাধান করতে গেলে system ভেঙে পড়ে; leverage point বেছে নেওয়া দরকার."),
("২৫ মিনিট focus block-এ প্রথম পাঁচ মিনিট শুধু outline করা কি ‘গভীর কাজ’ না ‘সময় নষ্ট’?", "উদ্দেশ্য যদি জটিল কাজের mental map তৈরি করা হয়, তবে এটি গভীর কাজের অংশ।", "Focus মানে শুধু চুপচাপ বসা নয়; লক্ষ্যপূর্ণ cognitive effort."),
("Attention boss: একটি ১০ লাইনের খবর থেকে তিনটি claim, দুটি evidence এবং একটি unanswered question চিহ্নিত করো।", "Claim, evidence ও প্রশ্ন আলাদা করে লিখলেই challenge সম্পন্ন।", "মনোযোগ শুধু তাকিয়ে থাকা নয়; তথ্যের কাঠামো ধরাও attention-এর উচ্চতর ব্যবহার."),
],
3: [
("একটি টেবিল দেখে ৩০ সেকেন্ড পর তার ওপর থাকা পাঁচটি বস্তু লিখো। তারপর আসল তালিকার সঙ্গে মিলাও।", "মিলের সংখ্যা নয়, ভুলের ধরন নোট করো—বস্তু বাদ, স্থান বদল, নাকি নতুন বস্তু যোগ।", "Observation memory প্রায়ই gist ধরে রাখে, exact detail নয়."),
("একটি পরিচিত রাস্তার দিকে তাকিয়ে তিনটি detail লিখো যা তুমি সাধারণত খেয়াল করো না।", "signboard, রঙ, দরজার সংখ্যা বা শব্দের উৎসের মতো detail বেছে নাও।", "পরিচিতি চোখকে prediction-এ ভরসা করায়; deliberate scan prediction ভাঙে."),
("সকালের তিনটি ঘটনা লিখে দেখো কোনটির আগে একই trigger ছিল।", "সময়, স্থান বা মানুষের আচরণের পুনরাবৃত্তি খুঁজে বের করো।", "Pattern খোঁজা মানে জোর করে মিল বানানো নয়; repetition-এর সঙ্গে exception-ও লেখা."),
("একটি ছবির দিকে ২০ সেকেন্ড তাকিয়ে চোখ বন্ধ করে foreground, background ও movement-এর তিন স্তর বর্ণনা করো।", "তিন স্তরের প্রতিটিতে অন্তত একটি সঠিক detail থাকলেই ভালো।", "দেখার সময় label না দিলে পরে retrieval কঠিন হয়; পর্যবেক্ষণকে ভাষায় বাঁধা সাহায্য করে."),
("Observation boss: একটি বাজারের দৃশ্য থেকে ১০টি detail লেখো, কিন্তু ‘ভালো/খারাপ’ বিচার নয়—শুধু observable তথ্য।", "রঙ, সংখ্যা, অবস্থান, শব্দ, দিক বা আচরণ লিখবে; অনুমান নয়।", "মস্তিষ্ক স্বাভাবিকভাবে gap পূরণ করে; observation training fact ও inference আলাদা করে."),
],
4: [
("সংখ্যা 7-2-9-4-1 একবার দেখে উল্টো করে বলো।", "1-4-9-2-7।", "Working memory-তে ধরে রাখা এবং manipulate করা আলাদা কাজ; উল্টো বলা দ্বিতীয় কাজটি যোগ করে."),
("একটি ফোন নম্বর 01712345678-কে 01712-345-678 বা 01-712-345-678—কোন grouping সহজ?", "দুই grouping-ই চেষ্টা করে যেটি তোমার rhythm-এ সহজ সেটিই কার্যকর।", "Chunking তথ্য কমায় না; meaningful group বানিয়ে load কম অনুভব করায়."),
("৩৮-কে ৪ যোগ, ২ দিয়ে গুণ, ৬ বিয়োগ করলে ফল কত?", "(38+4)×2−6 = 78।", "মাঝের ফল ধরে রাখতে হয়; working memory-তে step order না রাখলে arithmetic ভুল হয়."),
("একটি নির্দেশে তিনটি কাজ থাকলে তা মনে রাখার জন্য কী করবে?", "কাজগুলো verb দিয়ে তিনটি chunk বানিয়ে নিজের ভাষায় repeat করবে।", "নিজের ভাষায় পুনর্গঠন rehearsal ও encoding দুটোই শক্ত করে."),
("Working-memory boss: 4-1-8-3-6 ক্রমটি মনে রেখে দ্বিতীয় ও চতুর্থ সংখ্যার যোগফলকে প্রথম সংখ্যার সঙ্গে গুণ করো।", "(1+3)×4 = 16।", "তথ্য ধরে রাখা, index করা এবং transform—তিনটি ধাপ একসঙ্গে কাজ করেছে."),
],
5: [
("একটি chapter পড়ার ১০ মিনিট পরে বই বন্ধ করে পাঁচটি key idea লিখো।", "যা মনে আছে তা আগে লিখবে; বই খুলে পরে correction করবে।", "Recall-এর কঠিন অংশটাই শেখার signal; rereading-এর স্বস্তি সবসময় learning নয়."),
("একটি নতুন শব্দের সঙ্গে পরিচিত জায়গা, ছবি ও ছোট গল্প জুড়ে দাও।", "তিনটি cue-ই পরে শব্দটি তুলে আনতে ব্যবহার করবে।", "Association cue যত আলাদা হয়, retrieval path তত বেশি হয়."),
("একটি ধারণা ‘সংজ্ঞা–উদাহরণ–বিপরীত উদাহরণ–প্রয়োগ’ এই চার ঘরে লেখো।", "চার ঘর পূরণ করলে concept-এর structure তৈরি হয়।", "শুধু সংজ্ঞা মনে রাখলে concept ভঙ্গুর থাকে; বিভিন্ন context-এ ব্যবহার দরকার."),
("গতকাল শেখা জিনিস থেকে বই না দেখে দুটি প্রশ্ন তৈরি করো এবং নিজেই উত্তর দাও।", "প্রশ্ন এমন হবে যার উত্তর এক লাইনে নয়; কারণ বা প্রয়োগ চাইবে।", "Retrieval cue তৈরি করা memory-কে শক্ত করে, শুধু answer পড়া নয়."),
("Recall boss: আজকের দিনটি উল্টো ক্রমে বলো—শেষ গুরুত্বপূর্ণ ঘটনা থেকে সকাল পর্যন্ত।", "ঘটনার সঙ্গে স্থান বা অনুভূতির cue যোগ করলে ক্রম সহজ হবে।", "সাধারণ chronological story-র বদলে reverse retrieval বেশি effort চায়; ভুলের জায়গা শেখার data."),
],
6: [
("দ্রুত উত্তর আর সঠিক উত্তর দুটির মধ্যে কাজের ধরন অনুযায়ী কোনটি আগে?", "ঝুঁকিপূর্ণ বা জটিল কাজে accuracy আগে; routine কাজে speed বাড়ানো যায়।", "Speed একটি লক্ষ্য নয়; task-এর cost অনুযায়ী speed-accuracy trade-off বদলায়."),
("মনে মনে 48×5 হিসাব করো।", "48×10÷2 = 240।", "Known transformation দিয়ে calculation সহজ হয়; direct multiplication সবসময় দ্রুত নয়."),
("একটি দীর্ঘ email থেকে action, context এবং courtesy—এই তিন ধরনের বাক্য আলাদা করো।", "Action আগে mark করবে; context পরে, courtesy আলাদা।", "Information filtering relevance-এর ওপর নির্ভর করে, বাক্যের দৈর্ঘ্যের ওপর নয়."),
("এক মিনিটে ২০টি সহজ যোগের মধ্যে ১৮টি ঠিক, অন্যজন ২৪টি করেছে কিন্তু ৬টি ভুল। কে কোন কাজে এগিয়ে?", "Accuracy-sensitive কাজে প্রথমজন; high-volume routine-এ দ্বিতীয়জনের speed উন্নত করা যায়।", "একটি score একা performance-এর অর্থ বলে না."),
("Processing boss: একটি খবরের headline, supporting fact, emotional wording ও missing information চিহ্নিত করো।", "চারটি আলাদা label ব্যবহার করলেই সমাধান।", "দ্রুত পড়ার অর্থ দ্রুত বিশ্বাস করা নয়; দ্রুত structure ধরা."),
],
7: [
("2, 4, 8, 16, ?", "32; প্রতিবার 2 দিয়ে গুণ।", "Pattern-এর rule একবার দেখলেই হবে না; অন্তত পরের দুই ধাপে যাচাই করো."),
("3, 6, 11, 18, 27, ?", "38; যোগ হচ্ছে 3, 5, 7, 9, তাই পরের যোগ 11।", "শুধু সংখ্যাগুলোর দিকে না তাকিয়ে gap বা difference দেখলে hidden rule ধরা পড়ে."),
("একটি নকশায় কালো-সাদা-সাদা-কালো-সাদা-সাদা চললে 11তম ঘরের রঙ কী?", "কালো; তিন ঘরের cycle পুনরাবৃত্তি হচ্ছে।", "Visual pattern-এ unit বা repeating block চিহ্নিত করা প্রথম কাজ."),
("একটি দোকানের ভিড় প্রতি শুক্রবার বাড়ে, কিন্তু বৃষ্টির শুক্রবারে কমে। pattern-এর সঙ্গে exception কীভাবে রাখবে?", "মূল pattern: শুক্রবারে ভিড় বাড়ে; modifier: বৃষ্টি হলে pattern দুর্বল হয়।", "ভালো pattern rigid rule নয়; boundary condition-ও থাকে."),
("Pattern boss: 1, 4, 9, 16, 25 ধারার rule বলো এবং 8ম পদ দাও।", "বর্গসংখ্যা n²; 8ম পদ 64।", "একাধিক data point দিয়ে rule তৈরি করে নতুন point-এ prediction করতে হয়."),
],
8: [
("সব A হলো B; কিছু B হলো C। এখান থেকে কি সব A হলো C বলা যায়?", "না; কিছু B-এর C হওয়া A-দের ক্ষেত্রেও সত্য নাও হতে পারে।", "দুই premise-এর overlap কোথায় তা না আঁকলে brain দ্রুত অতিরিক্ত conclusion নেয়."),
("যদি বৃষ্টি হয়, রাস্তা ভেজে। রাস্তা ভেজা—তাহলে কি বৃষ্টি হয়েছিল?", "অবশ্যই নয়; পাইপ বা পরিষ্কার করার কারণও হতে পারে।", "Converse ভুল: ফল দেখে একমাত্র কারণ ধরে নেওয়া ঠিক নয়."),
("চারটি sample-এ নিয়ম দেখা গেল। সেই নিয়ম সব ক্ষেত্রে সত্য বলার আগে কী চাই?", "আরও evidence, alternative explanation এবং boundary test।", "Induction সম্ভাব্য rule দেয়, certainty নয়."),
("‘যদি তুমি পড়ো, তাহলে test ভালো হবে’—এই বাক্যের hidden assumption কী?", "পড়া যথেষ্ট মানসম্পন্ন, test material-এর সঙ্গে মেলে এবং অন্য factor বাধা দিচ্ছে না।", "Conditional reasoning-এ condition-এর অর্থ ও scope পরিষ্কার করা দরকার."),
("Logic boss: তিন বন্ধুর মধ্যে একজন সবসময় সত্য, একজন সবসময় মিথ্যা, একজন কখনও সত্য কখনও মিথ্যা। এক প্রশ্নে নিশ্চিত হতে কী ধরনের question করবে?", "তাদের আচরণ/উত্তরের rule জানতে meta-question বানাতে হবে; প্রথমে কে কোন ধরনের তা নির্ধারণের তথ্য দরকার।", "যুক্তির challenge-এ প্রশ্নের ভাষা নয়, তথ্যের পর্যাপ্ততাও যাচাই করতে হয়."),
],
9: [
("‘অনেক মানুষ এই app ব্যবহার করে, তাই এটি সবার জন্য ভালো।’ এখানে evidence আর conclusion আলাদা করো।", "Evidence: অনেক মানুষ ব্যবহার করে; conclusion: সবার জন্য ভালো—যা প্রমাণিত নয়।", "Popularity quality-এর proxy হতে পারে, proof নয়."),
("‘আমি আজ ভুল করেছি, তাই আমি ব্যর্থ।’ বাক্যটির assumption কী?", "একটি ঘটনা পুরো পরিচয় ও ভবিষ্যৎকে নির্ধারণ করে।", "একটি data point-কে identity verdict বানানো common cognitive shortcut."),
("Fact: ‘আজ ৩ ঘণ্টা পড়েছি।’ Opinion: ‘আজকের পড়া একদম অসাধারণ।’ কেন?", "প্রথমটি যাচাইযোগ্য সময়; দ্বিতীয়টি মূল্যায়ন।", "Opinion ভুল নয়; শুধু fact-এর মতো উপস্থাপন করা উচিত নয়."),
("একটি বিজ্ঞাপনে শুধু সফল customer-এর গল্প আছে। কোন bias খুঁজবে?", "Selection বা survivorship bias; ব্যর্থ বা বাদ পড়া cases দেখা হয়নি।", "যে data দেখা যাচ্ছে না, সেটিও decision-এর অংশ."),
("Critical-thinking boss: একটি viral claim দেখে তিনটি প্রশ্ন করো—কে বলেছে, evidence কী, কী তথ্য বাদ আছে?", "Source, evidence ও missing context—এই তিনটি প্রশ্নই minimum filter।", "সন্দেহপ্রবণ হওয়া লক্ষ্য নয়; proportionate confidence তৈরি করা লক্ষ্য."),
],
10: [
("‘আমার সময় নেই’ সমস্যাটিকে কীভাবে measurable করে লিখবে?", "কোন কাজ, কোন সময়, কত মিনিট, কোন বাধায় আটকে—এই চারটি নির্দিষ্ট করো।", "Vague problem-এর solution vague হয়; definition solution-এর প্রথম অংশ."),
("একটি বড় project-কে outcome, milestone, next action—এই তিন স্তরে ভাঙো।", "Outcome হলো ফল, milestone হলো যাচাইযোগ্য ধাপ, next action হলো এখনকার কাজ।", "Planning-এ abstraction বদলানো না গেলে কাজ শুরু হয় না."),
("লক্ষণ: প্রতিদিন deadline miss। সম্ভাব্য root cause: unclear scope, overcommitment, late start—কীভাবে আলাদা করবে?", "প্রতিটি hypothesis-এর জন্য এক সপ্তাহের data বা ছোট test নাও।", "Root cause অনুমান করে ঘোষণা নয়; test করে সংকুচিত করতে হয়."),
("একটি সমস্যার তিনটি সমাধান লেখো—দ্রুত, সস্তা, দীর্ঘমেয়াদি।", "তিনটির cost, risk ও benefit পাশাপাশি তুলনা করো।", "একটি perfect answer খোঁজার বদলে option space তৈরি করা সমস্যা সমাধানকে নমনীয় করে."),
("Ultimate challenge: একটি সপ্তাহে পড়া, কাজ, বিশ্রাম ও যাতায়াত মেলাতে হলে প্রথমে কোন constraint লিখবে?", "অপরিবর্তনীয় সময় আগে, তারপর priority block, তারপর buffer।", "Constraint না লিখে schedule করলে plan কাগজে ভালো দেখায়, বাস্তবে নয়."),
],
11: [
("একটি service-এর ‘মূল সমস্যা’ জানতে পাঁচবার কেন প্রশ্ন করো।", "প্রতি উত্তরের ওপর আবার কেন প্রশ্ন; symptom থেকে system cause-এর দিকে যাও।", "First principles মানে সবসময় শূন্য থেকে শুরু নয়; layer খুলে দেখা."),
("‘ভুল কমাতে চাই’ লক্ষ্যটিকে inversion-এ লেখো: কী করলে ভুল নিশ্চিত বাড়বে?", "শেষ মুহূর্তে কাজ, checklist না রাখা, feedback এড়িয়ে যাওয়া—এসব উল্টো পথ।", "কীভাবে ব্যর্থ হব না ভাবা নতুন protective action দেখায়."),
("দুই ঘণ্টা free time: course, sleep, friend—একটি বেছে নিলে opportunity cost কী?", "যা বেছে নাওনি, তার সবচেয়ে মূল্যবান অংশটি opportunity cost।", "Cost শুধু টাকা নয়; time, energy, relationship ও future option-ও cost."),
("আজকের সিদ্ধান্তের দ্বিতীয়-ক্রমের ফল কীভাবে খুঁজবে?", "‘এর পরে কী হবে?’ প্রশ্নটি অন্তত দুইবার করো।", "Immediate benefit ভবিষ্যৎ friction তৈরি করতে পারে; second-order thinking সেই delay দেখে."),
("Mental-model boss: নতুন skill শেখার plan-এ first principles, inversion ও opportunity cost তিনটি একসঙ্গে বসাও।", "মূল skill, failure mode এবং trade-off লিখে plan বানাও।", "একটি model সবসময় যথেষ্ট নয়; model stack করলে blind spot কমে."),
],
12: [
("একটি লক্ষ্য অর্জনের তিনটি পথ লেখো—সময় কম, টাকা কম, skill কম—প্রতিটি constraint-এ কোন পথ বদলায়?", "Constraint বদলালে strategy বদলাবে; একটি পথকে absolute ভাববে না।", "Flexibility মানে মতহীনতা নয়; context অনুযায়ী method বদলানো."),
("একজন customer-এর অভিযোগকে owner, customer এবং observer—তিন perspective-এ এক বাক্যে বলো।", "প্রতিটি perspective আলাদা concern ও evidence সামনে আনে।", "Perspective switch blame কমিয়ে information বাড়ায়."),
("একটি strategy তিন দিন কাজ না করলে কোন data দেখে বদলাবে?", "ফল, adherence, friction এবং external change—এই চারটি দেখো।", "Strategy বদলানো failure নয়; evidence অনুযায়ী update না করাই সমস্যা."),
("একটি familiar puzzle-এ ইচ্ছাকৃতভাবে নিয়ম বদলে নতুন rule বানাও।", "যেমন যোগের বদলে alternating multiply-add ব্যবহার করা।", "Pattern থেকে বেরোতে pattern-এর assumption বদলাতে হয়."),
("Flexibility boss: একই সমস্যার solution verbal, visual ও numerical—তিন format-এ দাও।", "তিনটি format-এ core relation একই আছে কি না যাচাই করো।", "Representation বদলালে নতুন route দেখা যায়, কিন্তু মূল তথ্য অক্ষুণ্ণ রাখতে হয়."),
],
13: [
("৩৬, ৪৯, ৬৪-এর মধ্যে কোনটি ৮০-এর কাছাকাছি?", "৬৪; distance ১৬, ৪৯-এর distance ৩১।", "Number sense exact calculation ছাড়াই relative size অনুভব করে."),
("৪৮ জনের ২৫% আনুমানিক কত?", "প্রায় ১২ জন।", "10% ও 5% ভেঙে estimate করলে দ্রুত mental benchmark তৈরি হয়."),
("একটি fair coin তিন বার toss-এ অন্তত একবার head আসার সম্ভাবনা কত?", "1 − (1/2)^3 = 7/8।", "‘কতবার head’ না গুনে complement event ব্যবহার করলে হিসাব সহজ হয়."),
("১৯×২১ দ্রুত হিসাব করো।", "(20−1)(20+1)=400−1=399।", "নিকটবর্তী round number ব্যবহার করে mental math shortcut পাওয়া যায়."),
("Numerical boss: ১০০০ টাকার ১৫% discount-এর পর ৫% tax হলে আনুমানিক final price কত?", "850×1.05 = 892.5 টাকা।", "Percent sequential হলে শুধু 10% বাদ দিয়ে থামা যাবে না; order ও base বদলায়."),
],
14: [
("‘গরম’ ও ‘ঠান্ডা’ সম্পর্কটি যেমন, ‘উঁচু’ ও কোন শব্দ?", "নিচু; বিপরীত সম্পর্ক।", "Word relationship-এ শব্দ নয়, relation-এর ধরন ধরতে হয়."),
("Book : Read :: Music : ?", "শোনা বা listen।", "Analogy-তে noun-to-action relation বজায় রাখতে হবে."),
("‘সব ভালো লেখক নিয়মিত পড়ে; রিমা নিয়মিত পড়ে; তাই রিমা ভালো লেখক।’ ভুলটি কোথায়?", "Converse reasoning; নিয়মিত পড়া ভালো লেখকের প্রয়োজনীয় হতে পারে, যথেষ্ট প্রমাণ নয়।", "শর্তের দিক উল্টে দিলে যুক্তি বদলে যায়."),
("‘শুধু সফল মানুষই পরিশ্রমী’ বাক্যে language pattern কী সমস্যা তৈরি করছে?", "শুধু শব্দটি overgeneralization; ব্যর্থ বা অদৃশ্য effort বাদ পড়ছে।", "ভাষার quantifier (‘সব’, ‘শুধু’, ‘কখনও’) reasoning-কে বদলে দেয়."),
("Verbal boss: একটি জটিল idea ২০ শব্দে এবং ৫ শব্দে বলো।", "প্রথমে পূর্ণ অর্থ, পরে core relation রেখে compression।", "সংক্ষিপ্ততা মানে গুরুত্বপূর্ণ qualifier বাদ দেওয়া নয়; অর্থের কাঠামো বাঁচিয়ে লেখা."),
],
15: [
("চোখ বন্ধ করে নিজের ঘরের দরজা থেকে জানালা পর্যন্ত mental route আঁকো।", "বাম/ডান turn, distance ও landmark-সহ route বলো।", "Spatial imagery শুধু ছবি নয়; relation ও orientation-ও ধরে."),
("একটি L-shaped block ৯০° ঘোরালে কোন বাহু ওপরের দিকে যাবে তা আগে predict করো।", "ঘোরানোর কেন্দ্র স্থির রেখে প্রতিটি বাহুর relative position বদলাও।", "মনে ঘোরাতে গেলে object-এর অংশ নয়, পুরো coordinate relation ধরে রাখতে হয়."),
("একটি triangle-কে মাঝখান দিয়ে কেটে দুইটি shape বানালে area কীভাবে বদলাবে?", "দুটি অংশের area যোগ করলে original area-ই থাকবে।", "Transformation-এ বাহ্যিক চেহারা বদলালেও conserved quantity খোঁজা যায়."),
("একটি grid-এ প্রতি ধাপে shape এক ঘর ডানে এবং ১৮০° ঘোরে। চতুর্থ ধাপে অবস্থান ও orientation কী?", "তিনবার shift এবং তিনবার rotation-এর ফল লিখে predict করো।", "Spatial pattern-এ movement ও orientation আলাদা variable হিসেবে track করো."),
("Spatial boss: কাগজ না দেখে একটি cube-এর opposite faces ১-৬ নির্ধারণ করে বলো, ১-এর বিপরীত কোনটি?", "যদি net বা rule না দেওয়া থাকে, নির্দিষ্ট উত্তর অসম্ভব; আগে structure দরকার।", "Spatial reasoning-এ missing information স্বীকার করাও দক্ষতা."),
],
16: [
("একটি কলমের ১০টি non-writing use লেখো।", "Bookmark, plant support, phone stand, label holder ইত্যাদি—শর্ত: ব্যবহারযোগ্য হতে হবে।", "Creativity-তে quantity আগে; evaluation পরে."),
("‘বৃষ্টির দিন’ নিয়ে একটি usual idea এবং তিনটি unusual idea লেখো।", "যেমন indoor walking map, window sound journal, rainwater experiment।", "Divergent thinking প্রথমে possibility space বাড়ায়."),
("চামচ ও কাগজের clip একসঙ্গে ব্যবহার করে তিনটি নতুন object concept বানাও।", "একটি physical function, একটি social function, একটি playful function দাও।", "Idea combination পুরোনো অংশের function নতুন relation-এ বসায়."),
("একটি product-এর একটি feature বাদ দিলে কী opportunity তৈরি হয়?", "কম feature মানে কম friction, lower price বা clearer use হতে পারে।", "Creative thinking শুধু যোগ করা নয়; বাদ দেওয়া ও constraint-ও ব্যবহার করে."),
("Creative boss: একই সমস্যার ৫টি উত্তর দাও—একটি সস্তা, একটি দ্রুত, একটি সুন্দর, একটি মজার, একটি উল্টো।", "প্রতিটি উত্তর আলাদা constraint পূরণ করবে।", "Constraint creativity-কে বন্ধ না করে direction দেয়."),
],
17: [
("একটি সিদ্ধান্তে objective, option, constraint ও next step আলাদা করে লেখো।", "চারটি ঘর পূরণ করলে decision fog কমে।", "দ্বিধা প্রায়ই option বেশি নয়; decision frame অস্পষ্ট হওয়ার ফল."),
("ছাতা না নেওয়ার risk ও ছাতা নেওয়ার inconvenience—কোনটি বেশি গুরুত্বপূর্ণ তা কীভাবে নির্ধারণ করবে?", "Probability × impact এবং inconvenience তুলনা করো।", "Risk শুধু ঘটনার chance নয়; impact-ও দরকার."),
("১০% chance-এ ১০০০ টাকা পাওয়া, নাকি ৫০ টাকা নিশ্চিত—তুলনা করার আগে কী জানতে হবে?", "Utility, loss tolerance, timing ও বিকল্প ব্যবহার।", "Expected value একা মানুষের preference ও context বোঝায় না."),
("দুটি চাকরির মধ্যে salary বেশি কিন্তু commute দীর্ঘ—trade-off table বানাও।", "টাকা, সময়, শেখা, স্বাস্থ্য ও flexibility আলাদা score দাও।", "একটি metric দিয়ে বহু-মাত্রিক সিদ্ধান্ত চাপা দেওয়া ঠিক নয়."),
("Decision boss: একটি সিদ্ধান্তে reversible, irreversible এবং testable অংশ আলাদা করো।", "যা ছোট experiment-এ পরীক্ষা করা যায় তা আগে test করো; irreversible অংশে বেশি evidence নাও।", "সব সিদ্ধান্তের জন্য একই deliberation দরকার হয় না."),
],
18: [
("নতুন topic শেখার আগে ‘আমি কী জানি’ এবং ‘আমি কী জানতে চাই’ দুই কলাম লেখো।", "আগের knowledge-কে প্রশ্নের সঙ্গে জুড়ো।", "Prior knowledge নতুন তথ্যের hook তৈরি করে."),
("একটি concept শিশুকে বোঝানোর মতো সহজ করে বলো, কিন্তু গুরুত্বপূর্ণ exception বাদ দিও না।", "সহজ ভাষা + boundary condition রাখাই গভীর বোঝার পরীক্ষা।", "Feynman-style explanation gap ধরতে সাহায্য করে; মুখস্থ নয়."),
("বই বন্ধ করে তিনটি প্রশ্নের উত্তর দেওয়া rereading-এর চেয়ে কখন বেশি কার্যকর?", "যখন লক্ষ্য retrieval ও application; শুধু পরিচিতি তৈরি নয়।", "Active recall effortful হলেও durable learning-এর signal দেয়."),
("আজ শেখা বিষয়টি কাল, তিন দিন পরে এবং সাত দিন পরে review করার schedule বানাও।", "প্রতিবার ছোট recall test রাখো; শুধু আবার পড়ো না।", "Spacing forgetting-এর আগে cue ফিরিয়ে আনে এবং interval ধীরে বাড়ানো যায়."),
("Learning boss: একটি skill-এর জন্য concept, example, practice, feedback ও review—এই পাঁচ ধাপের plan লেখো।", "প্রতিটি ধাপের সময় ও evidence নির্ধারণ করো।", "শেখা outcome নয়; feedback loop-সহ একটি system."),
],
19: [
("একটি number pattern দেখে verbal rule, equation এবং visual diagram—তিনভাবে ব্যাখ্যা করো।", "তিন format একই relation দেখাবে।", "Mixed reasoning-এ representation বদলালেও consistency check দরকার."),
("একটি sequence মনে রেখে তার মধ্যে কোন item logical নয় তা শনাক্ত করো।", "আগে recall, পরে rule test; memory ও logic আলাদা ধাপে করো।", "একসঙ্গে সব কাজ করলে ভুলের উৎস বোঝা যায় না; stage করে কাজ করো."),
("একটি দীর্ঘ problem-এ কোন তথ্য relevant, কোনটি distractor, তারপর next action—এই ক্রমে লিখো।", "Filter → define → act; সব তথ্য সমান নয়।", "Attention problem solving-এর gatekeeper; distractor filter না হলে strategy ভেঙে পড়ে."),
("একটি everyday object নিয়ে পাঁচটি নতুন use লিখে প্রতিটির feasibility test দাও।", "Idea count এবং constraint test পাশাপাশি রাখো।", "Creativity-এর সঙ্গে reasoning যোগ হলে novelty ও usefulness দুটোই মাপা হয়."),
("Advanced boss: একটি schedule-এ memory cue, logic rule, time constraint এবং backup plan একসঙ্গে বসাও।", "প্রথমে constraint list, পরে sequence, শেষে failure plan।", "উচ্চতর thinking মানে একসঙ্গে বেশি ভাবা নয়; layers ও checkpoints সাজানো."),
],
20: [
("একটি complex goal-এর skill, resource, risk, people ও time—পাঁচটি dimension map করো।", "প্রতিটি dimension-এর বর্তমান অবস্থা ও next action লিখো।", "Integrated thinking আলাদা অংশকে একই system map-এ আনে."),
("সমস্যায় তিনটি constraint ও দুইটি competing goal থাকলে কোনটি আগে লিখবে?", "Non-negotiable constraint ও decision criteria আগে।", "Constraint লুকিয়ে রেখে solution খোঁজা cognitive overload বাড়ায়."),
("একটি ultimate challenge-এ যদি তথ্য অসম্পূর্ণ থাকে, কীভাবে এগোবে?", "Known, unknown, assumption এবং smallest useful test আলাদা করো।", "Uncertainty সরানো সবসময় সম্ভব নয়; uncertainty পরিচালনা করা যায়."),
("নিজের brain-training journey-র scorecard বানাও—attention, memory, logic, flexibility, verbal, numerical, spatial, creativity।", "প্রতিটি skill-এ baseline, evidence এবং next experiment লিখো।", "Score identity নয়; performance indicator. নিজের আগের baseline-এর সঙ্গে তুলনা করো."),
("Cognitive mastery test: একটি বাস্তব সমস্যা নিয়ে observe → ask → hypothesize → predict → test → analyze → update ধাপ পূরণ করো।", "প্রতিটি ধাপে লিখিত evidence রাখলে test সম্পূর্ণ।", "Mastery মানে সবসময় সঠিক হওয়া নয়; ভুল থেকে দ্রুত ও পরিষ্কারভাবে update করা."),
],
}

level_intro = {
1: "মস্তিষ্ককে শক্তিশালী করার আগে তাকে বোঝা দরকার। এই level-এ তুমি নিজের চিন্তা, মনোযোগ, energy ও training claim-এর সীমা আলাদা করে দেখবে।",
2: "মনোযোগ কোনো জাদুর switch নয়। এটি environment, লক্ষ্য, energy এবং practice-এর ফল—তাই একে নকশা করা যায়।",
3: "চোখে পড়া আর সত্যিই লক্ষ্য করা এক নয়। Observation হলো prediction-এর বাইরে গিয়ে detail-কে data হিসেবে দেখা।",
4: "Working memory হলো মাথার অস্থায়ী workbench। ছোট, পরিষ্কার ধাপে তথ্য ধরে রেখে তার ওপর কাজ করতে শেখাই এই level-এর লক্ষ্য।",
5: "মনে রাখা মানে শুধু পরিচিত লাগা নয়। Recall-এর চেষ্টা, cue এবং spacing-এর মাধ্যমে শেখা আরও দৃঢ় হয়।",
6: "দ্রুততা তখনই কাজে লাগে যখন তা সঠিক লক্ষ্যকে সেবা করে। এই level-এ speed, filtering এবং accuracy একসঙ্গে অনুশীলন করবে।",
7: "Pattern তোমাকে prediction করতে সাহায্য করে, কিন্তু অতিরিক্ত pattern তোমাকে ভুল certainty-তেও নিতে পারে। Rule এবং exception দুটোই দেখো।",
8: "Logic হলো কথাকে ঠান্ডা করে দেখা: premise কী, শর্ত কী, conclusion কি সত্যিই follow করছে?",
9: "Critical thinking-এর লক্ষ্য সবকিছু সন্দেহ করা নয়; evidence-এর পরিমাণ অনুযায়ী confidence ঠিক করা।",
10: "সমস্যা সমাধান শুরু হয় সুন্দর উত্তর দিয়ে নয়—সঠিক সমস্যা লিখে। তারপর breakdown, root cause ও alternatives আসে।",
11: "Mental model হলো ভাবার হাতিয়ার। কোনো একটিকে সত্যের শেষ কথা না বানিয়ে context অনুযায়ী ব্যবহার করো।",
12: "একটি পথ কাজ না করলে নিজের intelligence নিয়ে verdict দিও না; representation, perspective বা strategy বদলাও।",
13: "সংখ্যা শুধু হিসাবের বিষয় নয়; size, relation, uncertainty ও approximation অনুভব করার ভাষা।",
14: "শব্দের অর্থের পাশাপাশি relation, scope ও qualifier ধরতে পারলে verbal reasoning পরিষ্কার হয়।",
15: "মনে space তৈরি করা একটি trainable skill। position, direction, rotation ও transformation আলাদা করে দেখো।",
16: "Creativity মানে হঠাৎ lightning নয়। বেশি possibility তৈরি, constraint ব্যবহার এবং useful idea বেছে নেওয়ার অভ্যাস।",
17: "ভালো সিদ্ধান্ত ভবিষ্যৎ নিশ্চিত করে না; uncertainty, risk, trade-off ও next action পরিষ্কার করে।",
18: "দ্রুত শেখার সবচেয়ে নির্ভরযোগ্য পথ হলো বুঝে নেওয়া, চেষ্টা করা, ভুল থেকে feedback নেওয়া এবং সময় দিয়ে ফিরে আসা।",
19: "বাস্তব সমস্যা এক skill মানে না। Mixed reasoning-এ মনোযোগ, স্মৃতি, যুক্তি ও creativity-কে ধাপে ধাপে জোড়া লাগাও।",
20: "Mastery কোনো magic score নয়। নিজের thinking process দেখা, পরীক্ষা করা এবং evidence অনুযায়ী update করাই cognitive mastery।",
}

def esc(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)

def words(s: str) -> int:
    return max(1, len(re.findall(r"\S+", s)))

def make_chapter(level_no: int, lesson_no: int, level_title: str, focus: str, title: str, challenge: tuple[str, str, str]) -> dict:
    prompt, answer, mistake = challenge
    position = (lesson_no - 1) % 5
    subtitle_variants = [
        f"{focus}—একটি ছোট কিন্তু গভীর অনুশীলন",
        f"{focus} বুঝে কাজে লাগানোর পথ",
        f"{focus} নিয়ে একটি পরিষ্কার mental model",
        f"{focus} থেকে practice-এ যাওয়ার ধাপ",
        f"{focus} একসঙ্গে ব্যবহার করার challenge",
    ]
    hooks = [
        f"{title} শুনলে প্রথমে মনে হতে পারে এটি শুধু বইয়ের একটি concept। আসলে প্রতিদিন তুমি এর ভেতর দিয়ে যাও—কখনও বুঝে, কখনও অজান্তে। আজ আমরা বিষয়টিকে ছোট একটি পরীক্ষার মতো দেখব।",
        f"ঠিক আছে, এবার brain-এর জন্য একটু দুষ্টু প্রশ্ন আছে। {title} নিয়ে দ্রুত উত্তর দেওয়ার আগে থামো: তুমি কী দেখছ, কী ধরে নিচ্ছ, আর কোন অংশটি এখনও অজানা?",
        f"এই lesson-এর লক্ষ্য তোমাকে সবসময় ঠিক বানানো নয়। লক্ষ্য হলো ভুল হলে কোথায় ভুলটি জন্ম নিল তা এত পরিষ্কার দেখা, যাতে পরেরবার নতুন strategy বেছে নিতে পারো।",
        f"তুমি যদি {title}-কে শুধু সংজ্ঞা হিসেবে পড়ো, lesson-এর অর্ধেকই হারাবে। তাই concept-এর সঙ্গে একটি বাস্তব scene, একটি practice এবং একটি challenge রাখছি।",
        f"শেষ পর্যন্ত এই lesson থেকে একটি বাক্য, একটি পদ্ধতি এবং একটি ছোট experiment নিয়ে বের হবে। এগুলোই পরে তোমার personal brain-training system-এর building block হবে।",
    ][position]
    core = [
        f"সহজ ভাষায়, {title} হলো {focus.lower()}। এটি কোনো স্থির পরিচয় নয়; পরিস্থিতি, energy, পূর্বের অভিজ্ঞতা এবং practice অনুযায়ী এর performance বদলাতে পারে। তাই আজকের ফলকে নিজের intelligence-এর final verdict বানিও না।",
        f"এখানে একটি দরকারি distinction আছে: {focus.lower()} আর {title.lower()} এক নয়। প্রথমটি capacity বা information-এর দিক বোঝায়, দ্বিতীয়টি সেই capacity ব্যবহার করার strategy বোঝায়। strategy বদলানো যায়—এটাই encouraging অংশ।",
        "প্রথমে ঘটনার raw data লিখো। তারপর তোমার interpretation, emotion এবং next action আলাদা করো। এই চারটি স্তর একসঙ্গে মিশে গেলে brain shortcut নেয়; আলাদা করলে experiment-এর জায়গা তৈরি হয়।",
    ]
    demo = [
        f"একটি উদাহরণ: তুমি {title}-এর একটি কঠিন কাজ শুরু করলে মাথা বলল, ‘এটা আমার দ্বারা হবে না।’ বাক্যটি fact নয়; এটি একটি দ্রুত prediction। Prediction-এর পাশে লিখতে পারো—‘প্রথম পাঁচ মিনিট চেষ্টা করে data নেব।’",
        f"আরেকটি উদাহরণ: একই তথ্য দুইভাবে সাজালে একবার কঠিন, আরেকবার সহজ লাগতে পারে। তথ্য বদলায়নি; representation বদলেছে। Brain training-এর গুরুত্বপূর্ণ অংশ হলো কখন representation বদলাতে হবে তা চিনতে শেখা।",
        f"নিজের জীবনের একটি scene বেছে নাও—পড়া, কাজ, কথোপকথন বা সিদ্ধান্ত। সেখানে {title} কোথায় কাজ করেছে, কোথায় বাধা দিয়েছে, এবং কোন ছোট change করলে ফল বদলাতে পারত—এই তিনটি প্রশ্ন লেখো।",
    ]
    practice = [
        "Practice-এর নিয়ম: প্রথম attempt-এ সময় নাও, দ্বিতীয় attempt-এ নিজের ভুলের ধরন লেখো, তৃতীয় attempt-এ একটি মাত্র strategy বদলাও। একসঙ্গে সব বদলালে কোন পরিবর্তন কাজ করেছে বোঝা যায় না।",
        "Practice-এ score রাখো, কিন্তু score-কে identity বানিও না। Accuracy, time, confidence এবং ভুলের ধরন—এই চারটি metric-এর মধ্যে অন্তত দুটো লিখে রাখলেই progress দেখা যাবে।",
        "তোমার লক্ষ্য flawless হওয়া নয়; feedback loop তৈরি করা। চেষ্টা → ফল → বিশ্লেষণ → retry—এই চক্র যত পরিষ্কার হবে, training তত meaningful হবে।",
    ][position % 3]
    mission = [
        f"আজকের mini mission: {title} নিয়ে ৫ মিনিটের একটি বাস্তব experiment করো। শুরু করার আগে prediction লেখো, শেষে result ও next adjustment লেখো।",
        f"আজকের mini mission: দিনের একটি ঘটনায় {title}-এর evidence খুঁজে বের করো। শুধু ‘ভালো/খারাপ’ লিখবে না; observable detail এবং তোমার inference আলাদা করবে।",
        f"আজকের mini mission: কাউকে বোঝানোর মতো সহজ বাংলায় {title} ব্যাখ্যা করো। ব্যাখ্যার শেষে একটি example এবং একটি সীমা যোগ করো।",
    ][position % 3]
    sections = [
        {"id": "01", "title": "শুরু করার আগে", "blocks": [{"type": "paragraph", "content": hooks}, {"type": "paragraph", "content": core[0]}]},
        {"id": "02", "title": "Concept ও demonstration", "blocks": [{"type": "subheading", "content": f"LEARN → THINK → TEST → UPDATE"}, {"type": "paragraph", "content": core[1]}, {"type": "paragraph", "content": demo[position % len(demo)]}]},
        {"id": "03", "title": "Practice lab", "blocks": [{"type": "paragraph", "content": practice}, {"type": "subheading", "content": "HARD CHALLENGE"}, {"type": "paragraph", "content": prompt}, {"type": "subheading", "content": "SOLUTION"}, {"type": "paragraph", "content": answer}, {"type": "subheading", "content": "WHY DID YOUR BRAIN TRICK YOU?"}, {"type": "paragraph", "content": mistake}]},
        {"id": "04", "title": "বাস্তব জীবনে ব্যবহার", "blocks": [{"type": "paragraph", "content": f"এই skill-টি পড়াশোনা, কাজ, সম্পর্ক বা decision-এর একটি জায়গায় ব্যবহার করো। Situation বদলালেও method একই থাকবে: observe, প্রশ্ন করো, একটি ছোট পদক্ষেপ নাও, তারপর outcome দেখে update করো। {mission}"}, {"type": "subheading", "content": "মনে রাখার বাক্য"}, {"type": "paragraph", "content": f"একটি puzzle score পুরো intelligence নয়। আমি আমার performance দেখি, ভুল বিশ্লেষণ করি এবং evidence অনুযায়ী পরের চেষ্টা বদলাই—{title} শেখার এটাই স্বাস্থ্যকর পথ।"}]},
    ]
    all_text = " ".join(block["content"] for section in sections for block in section["blocks"])
    return {
        "id": f"{lesson_no:02d}", "number": lesson_no, "title": title,
        "subtitle": subtitle_variants[position], "readingMinutes": max(4, min(9, round(words(all_text) / 95))),
        "wordCount": words(all_text), "sections": sections,
        "exercises": [
            {"title": "Brain Log", "prompt": f"আজ {title} অনুশীলনের আগে তোমার prediction, পরে outcome এবং শেষে একটি adjustment লিখে রাখো।"},
            {"title": "Real-life transfer", "prompt": f"আগামী ২৪ ঘণ্টায় {title} ব্যবহার করার একটি নির্দিষ্ট সময়, স্থান ও situation ঠিক করো।"},
        ],
    }

all_chapters = {}
meta = []
all_exercises = []
for level_no, (level_title, focus, lesson_titles) in enumerate(levels, start=1):
    for idx, title in enumerate(lesson_titles):
        lesson_no = (level_no - 1) * 5 + idx + 1
        chapter = make_chapter(level_no, lesson_no, level_title, focus, title, challenge_bank[level_no][idx])
        all_chapters[chapter["id"]] = chapter
        meta.append({"id": chapter["id"], "number": chapter["number"], "title": chapter["title"], "subtitle": chapter["subtitle"], "readingMinutes": chapter["readingMinutes"]})
        all_exercises.extend(chapter["exercises"])

# Write a single readable TS source; the app's existing loader pattern can import it directly.
source = "import type { BookChapter, ChapterMeta, WorkbookExercise } from \"./book\";\n\n"
source += "export const brainChapterData: Record<string, BookChapter> = " + json.dumps(all_chapters, ensure_ascii=False, indent=2) + ";\n\n"
source += "export const brainChapters: ChapterMeta[] = " + json.dumps(meta, ensure_ascii=False, indent=2) + ";\n\n"
source += "export const brainChapterLoaders: Record<string, () => Promise<{ default: BookChapter }>> = Object.fromEntries(Object.keys(brainChapterData).map((id) => [id, async () => ({ default: brainChapterData[id] })]));\n\n"
source += "export const brainWorkbookExercises: WorkbookExercise[] = " + json.dumps(all_exercises, ensure_ascii=False, indent=2) + ";\n\n"
source += "export const brainTotalReadingMinutes = brainChapters.reduce((sum, chapter) => sum + chapter.readingMinutes, 0);\n"
(DATA_DIR / "brain-book.ts").write_text(source, encoding="utf-8")

# Human-readable manuscript for PDF and archival use.
md = ["# BRAIN BOOST", "## মস্তিষ্ককে শাণিত করার বিজ্ঞান", "", "ধাপে ধাপে মনোযোগ, স্মৃতি, যুক্তি, সমস্যা সমাধান, দ্রুত চিন্তা ও বুদ্ধিবৃত্তিক ক্ষমতা উন্নত করার একটি Brain Training Journey", "", "**লেখক:** শেখ রাসেল", "", "> এই বই cognitive skill অনুশীলনের জন্য তৈরি। এটি নির্দিষ্ট IQ point বাড়ানোর নিশ্চয়তা দেয় না; নিজের আগের performance, thinking habits এবং learning strategy-এর উন্নয়নই এখানে লক্ষ্য।", "", "## কীভাবে বইটি ব্যবহার করবে", "প্রতিটি lesson-এ আগে পড়ো, তারপর challenge-এ থামো, নিজের উত্তর লিখো এবং শেষে solution দেখো। ভুল হলে নিজেকে বিচার না করে ভুলের ধরন নোট করো। প্রতি পাঁচটি level শেষে scorecard-এ নিজের baseline-এর সঙ্গে নতুন ফল তুলনা করো।", ""]
for level_no, (level_title, focus, lesson_titles) in enumerate(levels, start=1):
    md += [f"## Level {level_no:02d}: {level_title}", level_intro[level_no], ""]
    for idx, title in enumerate(lesson_titles):
        lesson_no = (level_no - 1) * 5 + idx + 1
        ch = all_chapters[f"{lesson_no:02d}"]
        md += [f"### Lesson {lesson_no:02d}: {title}", ch["subtitle"], ""]
        for section in ch["sections"]:
            md.append(f"#### {section['title']}")
            for block in section["blocks"]:
                md.append(block["content"])
                md.append("")
        md.append("**অনুশীলন**")
        for ex in ch["exercises"]:
            md += [f"- **{ex['title']}:** {ex['prompt']}", ""]

(DATA_DIR / "brain-boost-manuscript.md").write_text("\n".join(md), encoding="utf-8")
print(f"Generated {len(all_chapters)} lessons, {len(all_exercises)} exercises")
print(f"Total reading minutes: {sum(item['readingMinutes'] for item in meta)}")
