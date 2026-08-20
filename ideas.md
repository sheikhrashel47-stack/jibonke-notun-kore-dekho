# ডিজাইন ভাবনা: জীবনকে নতুন করে দেখো

## সম্ভাব্য তিনটি দিক

### Theme Name: বনপথ পাঠাগার

**Very Brief Intro:** উষ্ণ কাগজ, গাঢ় সবুজ এবং বুকমার্কের অনুভূতিতে তৈরি শান্ত ডিজিটাল পাঠাগার। দীর্ঘসময় পড়ার সময় চোখ ও মনকে স্থির রাখবে।

**Probability:** 0.07

### Theme Name: জীবন-ড্যাশবোর্ড

**Very Brief Intro:** বইকে শুধু পৃষ্ঠা নয়, ব্যক্তিগত উন্নতির একটি ব্যবহারযোগ্য সিস্টেম হিসেবে দেখায়। পাঠ, অনুশীলন, নোট ও অগ্রগতি একসঙ্গে দৃশ্যমান থাকবে।

**Probability:** 0.04

### Theme Name: শিউলি সকালের নোটবুক

**Very Brief Intro:** হাতে লেখা নোট, সকালের আলো ও হালকা জলরঙের আবহে ব্যক্তিগত আত্ম-পর্যবেক্ষণের অভিজ্ঞতা। আবেগময়, নরম ও ধীর গতির পাঠের জন্য উপযোগী।

**Probability:** 0.09

## নির্বাচিত দিক: জীবন-ড্যাশবোর্ড

### Design Movement

**Quiet productivity** এবং **editorial dashboard**—প্রিমিয়াম reading app-এর স্বচ্ছতা ও ব্যক্তিগত reflection journal-এর উষ্ণতা একসঙ্গে।

### Core Principles

1. বই পড়া শুধু স্ক্রল নয়; প্রতিটি অধ্যায় থেকে ছোট প্রয়োগ নেওয়া যায়।
2. প্রধান পাঠ কখনও controls বা decoration-এর নিচে চাপা পড়বে না।
3. navigation, progress ও notes সবসময় শান্ত কিন্তু হাতের কাছে থাকবে।
4. প্রতিটি visual element-এর কাজ থাকবে—পাঠ, বোঝা, অনুশীলন বা ফিরে আসা সহজ করা।

### Color Philosophy

উষ্ণ ivory পটভূমি কাগজের মতো আরাম দেবে; গভীর forest green মনোযোগ ও স্থিরতার anchor; muted gold হবে অগ্রগতি ও গুরুত্বপূর্ণ insight-এর সংকেত; soft sage হবে exercise ও reflection card-এর শান্ত surface। উজ্জ্বল gradient বা neon ব্যবহার করা হবে না।

### Layout Paradigm

Desktop-এ একটি স্থির, slim chapter rail; মাঝখানে প্রশস্ত reading canvas; ডানদিকে context rail-এ progress, bookmark, notes ও অধ্যায়ের action। মোবাইলে rail-গুলো bottom sheet এবং compact action bar-এ রূপ নেবে। এটি কেন্দ্রভিত্তিক landing page নয়; এটি পাঠের workspace।

### Signature Elements

1. প্রতিটি অধ্যায়ের জন্য পাতার বাম পাশে সরু রঙিন progress thread।
2. গোলাকৃতি নয়, সামান্য চৌকো এবং নরম 10–16px radius-এর paper card।
3. ‘আজকের প্রয়োগ’ নামে muted gold indicator সহ ছোট action card।

### Interaction Philosophy

সব interaction দ্রুত, শান্ত ও অর্থপূর্ণ হবে। Bookmark, theme, font-size, note, chapter jump ও exercise complete করলে ছোট feedback দেওয়া হবে; অপ্রয়োজনীয় animation থাকবে না।

### Animation

Panel ও note sheet 180–240ms-এর snappy ease-out motion-এ খুলবে। Chapter switch-এ content সামান্য opacity/translate transition নেবে। Reduced motion পছন্দ করলে animation বন্ধ থাকবে।

### Typography System

শিরোনামে **Noto Serif Bengali** (700/800) বইয়ের গাম্ভীর্য তৈরি করবে; UI label ও button-এ **Noto Sans Bengali** (500/700) স্পষ্টতা দেবে; body-তে **Noto Serif Bengali** 18px desktop ও 17px mobile, line-height 1.9 থাকবে।

### Brand Essence

**জীবনকে নতুন করে দেখো** হলো নিজের চিন্তা, কাজ ও সম্পর্ককে বুঝে ছোট বাস্তব পরিবর্তন আনার বাংলা reading companion।

Personality: **স্থির, সহানুভূতিশীল, বাস্তববাদী**।

### Brand Voice

Headline হবে সংক্ষিপ্ত, উষ্ণ ও সৎ; CTA হবে কাজের দিকে ডাকবে, চাপ তৈরি করবে না; microcopy হবে ব্যক্তিগত কিন্তু অতিনাটকীয় নয়।

উদাহরণ: “আজ শুধু একটি জিনিস লক্ষ্য করো।”

উদাহরণ: “এই ভাবনাটা তোমার জীবনে কোথায় মেলে?”

### Wordmark & Logo

লোগো হবে একটি খোলা বইয়ের দুই পাতার মাঝে উপরে ওঠা অর্ধবৃত্তাকার পথ—নিজেকে ও জীবনকে নতুন দিক থেকে দেখার প্রতীক। Text wordmark-এ custom Bengali serif ব্যবহার হবে, default font নয়।

### Signature Brand Color

**নতুন সবুজ — `#1B4332`**

## Style Decisions

- Hero এবং app shell-এ নির্বাচিত জীবন-ড্যাশবোর্ড নকশাই বজায় থাকবে।
- কোনো generic purple gradient, অতিরিক্ত গোলাকার card বা Inter font ব্যবহার করা হবে না।
- বইয়ের content, navigation ও personal progress হবে visual hierarchy-এর মূল কেন্দ্র।
- প্রথম screen-এ current chapter, progress, next action এবং personal state illustration-এর চেয়ে বেশি গুরুত্ব পাবে।
- Muted-gold progress thread ও “আজকের প্রয়োগ” marker home, reader এবং workbook-এ নিয়মিত ফিরে আসবে।
- Scenic image কেবল উষ্ণ atmosphere তৈরি করবে; paper surface, margin note, rail ও reflection card আগে quiet productivity প্রকাশ করবে।
- Header-এ open-book/path mark-এর সঙ্গে সম্পূর্ণ Bengali serif wordmark সবসময় স্পষ্ট থাকবে; এটি শুধু utility logo হবে না।
- সব reading mode-এ মূল দৃশ্যগত loop হবে: বর্তমান অবস্থান → progress thread → আজকের প্রয়োগ।
- Product UI copy Bengali-first, স্থির ও বাস্তববাদী companion voice-এ লেখা হবে; ইংরেজি শব্দ কেবল বইয়ের source content হলে থাকবে।
