# পরিবর্তনের checklist

- [x] GitHub repository-টি public করা
- [x] Public visibility ও repository link নিশ্চিত করা
- [x] GitHub Pages-এর জন্য base path ও client-side routing প্রস্তুত করা
- [x] GitHub Actions deployment workflow যোগ করে Pages চালু করা
- [x] Live GitHub Pages website link যাচাই করা

## GitHub Pages deployment

সফল deployment run: `32343933925`  
লাইভ website: `https://sheikhrashel47-stack.github.io/jibonke-notun-kore-dekho/`

যাচাই: home page এবং `/chapter/01` direct link—দুটিই সফলভাবে load হয়েছে।

## Mobile reading mode

- [x] Mobile browser viewport-এ pinch zoom বন্ধ করা
- [x] মোবাইলে body text, heading ও line-height উল্লেখযোগ্যভাবে বড় করা
- [x] Desktop rail বাদ দিয়ে স্থির single-column mobile reading canvas করা
- [x] GitHub Pages-এ update প্রকাশ করে mobile screen যাচাই করা

সফল mobile update deployment run: `32344663432`  
যাচাই: live GitHub Pages-এর `/chapter/01` পড়ার page সফলভাবে load হয়েছে।

## নতুন ‘Dark Psychology’ e-book ও book store

- [x] ‘Dark Psychology’ master outline ও ethical self-defense guideline তৈরি করা
- [x] ৫০ অধ্যায়ের বাংলা manuscript লেখা, সম্পাদনা ও fact-check করা
- [x] Cover ও interactive premium e-book PDF তৈরি করা
- [x] Existing reading app-কে দুই-বইয়ের mobile-first book store করা
- [x] নতুন বইয়ের preview ও PDF store-এ প্রকাশ করা
- [x] Mobile design ও GitHub Pages deployment যাচাই করা

## নতুন ৫০০-পৃষ্ঠার Dark Psychology পুনর্নির্মাণ

- [x] ব্যবহারকারীর দেওয়া master prompt পুরোটা পড়ে বাধ্যতামূলক লেখা, নকশা ও ethical self-defense শর্ত তালিকাভুক্ত করা
- [x] ৫০ অধ্যায়, ৫ অংশ এবং প্রায় ৫০০ design page-এর page budget ও chapter-level content plan তৈরি করা
- [x] প্রতিটি chapter-এর জন্য গল্প, concept, warning sign, response ও ethical application কাঠামো নির্ধারণ করা
- [x] ৫০ অধ্যায়ের পূর্ণাঙ্গ বাংলা manuscript লেখা, সম্পাদনা ও পুনরাবৃত্তি যাচাই করা
- [x] Part I ও Part II-এর chapter 01–20 manual editorial review, safety check ও completion করা
- [x] Part III ও Part IV-এর chapter 21–40 manual editorial review, safety check ও completion করা
- [x] Part V-এর chapter 41–50, 50 Red Flags index ও final practice guide manual editorial review-সহ completion করা
- [x] সব chapter-এ গল্প, concept, safe response, practical exercise, language consistency ও duplicate-content review করা
- [x] clickable contents, chapter links, worksheet ও page numbering-সহ প্রায় ৫০০-পৃষ্ঠার premium PDF e-book তৈরি করা
- [x] ওয়েব রিডারে বই-২-এর নতুন content, chapter picker, page selector এবং নির্দিষ্ট page-এ যাওয়ার navigation যোগ করা
- [x] mobile reader যাচাই, production build, GitHub Pages প্রকাশ ও live links পরীক্ষা করা

## পৃষ্ঠা শেষ ও পরবর্তী/পূর্ববর্তী navigation

- [x] দুই বইয়ের chapter reader-এর নিচে দৃশ্যমান “পৃষ্ঠা শেষ” marker যোগ করা
- [x] বর্তমান chapter-এর আগে ও পরে যাওয়ার জন্য বড় পূর্ববর্তী/পরবর্তী navigation button যোগ করা
- [x] প্রথম ও শেষ chapter-এর edge state, mobile layout এবং keyboard accessibility যাচাই করা
- [x] build, checkpoint এবং GitHub Pages update প্রকাশ করা

## একটানা স্ক্রল reading mode

- [x] দুই বইয়ের সব অধ্যায়ের text একটানা lazy-load করে দেখানোর scroll reader তৈরি করা
- [x] বর্তমান দৃশ্যমান chapter tracking ও chapter-mode-এ ফেরার navigation যোগ করা
- [x] catalogue ও chapter reader-এ scroll-mode entry point যোগ করা
- [x] mobile ও desktop layout, TypeScript build এবং GitHub Pages update যাচাই করা

## বই ১ প্রথম পৃষ্ঠা bug fix

- [x] বই ১-এর প্রথম chapter ও প্রথম PDF page route-এ সমস্যা পুনরুৎপাদন ও কারণ শনাক্ত করা
- [x] প্রথম পৃষ্ঠা navigation এবং initial scroll position সংশোধন করা
- [x] desktop ও mobile-এ fix যাচাই করে GitHub Pages update প্রকাশ করা

## Swipe reader ও তৃতীয় e-book

- [x] প্রতি PDF পৃষ্ঠা swipe করে পড়ার mobile-first reader mode তৈরি করা
- [x] বই ১ ও বই ২-এর page reader-এ swipe mode navigation যোগ করা
- [x] “The Art of Thinking — সঠিকভাবে ভাবার শিল্প” বইয়ের ৩০ অধ্যায়ের manuscript ও ৩০০-পৃষ্ঠার PDF তৈরি করা
- [x] নতুন বইয়ের cover, reader modules, PDF page mapping ও store catalogue integration যোগ করা
- [x] সব বইয়ের build, swipe behaviour এবং responsive view যাচাই করে GitHub Pages-এ প্রকাশ করা

## JIBON premium platform redesign

- [ ] বর্তমান pages, routes, reader, data model, responsive behavior ও risks-এর audit তৈরি করা
- [ ] reusable user-data model, reading preference, position memory ও local persistence foundation তৈরি করা
- [ ] premium app shell, home dashboard, library, store, book detail ও book map navigation তৈরি করা
- [ ] four-theme reader, font/line-height settings, bookmarks, highlights, notes, glossary ও journal tools তৈরি করা
- [ ] progress, activity heatmap, goals, profile, local recommendations ও reading stats তৈরি করা
- [ ] PWA manifest, service worker, offline fallback, accessibility ও performance safeguards যোগ করা
- [ ] সব existing ও নতুন route, mobile/tablet/desktop responsive behavior এবং refresh persistence যাচাই করে প্রকাশ করা

## জরুরি page-turn reader fix

- [ ] page-turn mode-এ PDF app-এর ভিতরে না খোলার কারণ শনাক্ত করা
- [ ] দ্রুত canvas-based page render, prefetch এবং touch-friendly navigation চালু করা
- [ ] mobile ও desktop-এ page visibility, দ্রুত পড়া এবং fallback behavior যাচাই করা

## Swipe mode visibility repair

- [x] chapter, page ও dashboard surface-এ “পাতা উল্টে পড়া” entry point দৃশ্যমান আছে কি না audit করা
- [x] mobile-first swipe entry CTA ও mode switcher স্পষ্ট করে যোগ করা
- [x] live page-turn route, touch gesture ও PDF fallback যাচাই করে প্রকাশ করা

## Global back navigation

- [x] browser history ও safe fallback সমর্থনকারী reusable Back button তৈরি করা
- [x] reader, book detail, book map, library, store, progress ও profile surface-এ back navigation বসানো
- [x] mobile ও desktop-এ direct-link, normal browsing এবং first-page fallback behavior যাচাই করা

## Cover delivery ও immersive swipe reader

- [x] তিনটি existing book cover-এর source, caching ও error fallback audit করা
- [x] cover asset-কে reliable local managed storage-তে এনে instant visible fallback যোগ করা
- [x] swipe reader থেকে boxed layout, vertical scroll ও ছোট page rendering সরিয়ে full-screen page stage তৈরি করা
- [x] PDF page viewport, controls, swipe gesture ও mobile safe-area বড়-পাঠের জন্য যাচাই করা

## ‘দৃশ্যদর্শন’ বই অপসারণ

- [x] catalogue, library, store ও generic reader route থেকে চতুর্থ বইয়ের entry বাদ দেওয়া
- [x] ৩০টি lazy-loaded chapter module, metadata, source index ও generator file মুছে দেওয়া
- [x] browser-এর পুরোনো local reading state থেকে চতুর্থ বইয়ের data স্বয়ংক্রিয়ভাবে বাদ দেওয়া
- [ ] production build, mobile UI ও GitHub Pages প্রকাশ যাচাই করা
