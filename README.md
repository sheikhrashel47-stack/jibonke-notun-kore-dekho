# জীবনকে নতুন করে দেখো

**জীবনকে নতুন করে দেখো** বইয়ের জন্য তৈরি একটি বাংলা, responsive এবং app-style reading companion। এটি শুধু বই পড়ার interface নয়; অধ্যায়, অগ্রগতি, অনুশীলন, বুকমার্ক ও ব্যক্তিগত নোট—সবকিছু এক জায়গায় রাখে।

## কী কী আছে

- ১৫টি অধ্যায়ের lazy-loaded বাংলা বইয়ের কনটেন্ট
- desktop-এ chapter rail, reading canvas ও context rail-সহ তিন-কলামের reading workspace
- mobile-friendly compact reading layout
- light ও dark theme
- font size নিয়ন্ত্রণ
- reading progress tracking
- bookmark, personal note এবং workbook exercise completion
- বইয়ের মধ্যে দ্রুত search
- browser-এর `localStorage`-এ ব্যক্তিগত progress, bookmark, note ও exercise state সংরক্ষণ

## প্রযুক্তি

| বিষয় | ব্যবহার করা হয়েছে |
| --- | --- |
| UI | React 19 ও TypeScript |
| Styling | Tailwind CSS 4 |
| Routing | Wouter |
| Animation | Framer Motion |
| Storage | Browser localStorage |

## লোকালভাবে চালানোর নিয়ম

প্রথমে dependency install করো, তারপর development server চালাও।

```bash
pnpm install
pnpm dev
```

Production build যাচাই করার জন্য:

```bash
pnpm check
pnpm build
```

## গুরুত্বপূর্ণ তথ্য

এটি একটি frontend-only app। তাই আলাদা account বা server ছাড়াই ব্যক্তিগত reading state একই browser-এ থাকে। Browser-এর data মুছে দিলে bookmark, note ও progress-ও মুছে যাবে।

## বই

লেখক: **শেখ রাসেল**  
বই: **জীবনকে নতুন করে দেখো**
