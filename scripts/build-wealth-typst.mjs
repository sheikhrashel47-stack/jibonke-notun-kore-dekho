import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const pdfDir = path.join(root, "wealth_pdf");
const chapterDir = path.join(root, "client/src/data/wealth-chapters");
const plan = JSON.parse(await fs.readFile(path.join(root, "client/src/data/wealth-chapter-plan.json"), "utf8"));
const escape = (value) => String(value ?? "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\r?\n/g, "\\n");
const bn = (number) => String(number).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
const text = (value) => `#text(lang: "bn", "${escape(value)}")`;
const paragraph = (value) => `${text(value)}\n`;
const line = (label = "") => `#line(length: 100%, stroke: 0.5pt + luma(70%))\n#v(0.75em)\n${label ? `${text(label)}\n` : ""}`;

async function loadChapter(id) {
  const source = await fs.readFile(path.join(chapterDir, `chapter-${id}.ts`), "utf8");
  const match = source.match(/const chapter: BookChapter = ([\s\S]*?);\n\nexport default chapter;/);
  if (!match) throw new Error(`Could not parse chapter-${id}.ts`);
  return JSON.parse(match[1]);
}

const chapters = [];
for (const item of plan) chapters.push({ meta: item, data: await loadChapter(item.id) });
if (chapters.length !== 100) throw new Error(`Expected 100 chapters, found ${chapters.length}`);

const partNames = new Map();
for (const item of plan) partNames.set(item.part, item.partTitle);
const partFrameworks = {
  1: "LEARN → EARN → SAVE → INVEST → OWN",
  2: "VALUE + SKILL + CAPITAL + OWNERSHIP + TIME",
  3: "VALUE CREATION → SCALABLE INCOME → ASSET-BASED INCOME",
  4: "SKILL → VALUE → DEMAND → INCOME",
  5: "WORK → REPUTATION → TRUST → OPPORTUNITY",
  6: "PROBLEM → SOLUTION → CUSTOMER → VALUE → REVENUE → PROFIT",
  7: "IDEA → MARKET → VALIDATION → UNIT ECONOMICS → SCALE",
  8: "INCOME → EXPENSE → SURPLUS → SAFETY",
  9: "SAVING RATE → CAPITAL → FIRST INVESTMENT",
  10: "RISK → RETURN → DIVERSIFICATION → TIME",
  11: "OWNERSHIP → BUSINESS QUALITY → VALUATION → PATIENCE",
  12: "LIQUIDITY → DIVERSIFICATION → ALLOCATION",
  13: "OWNERSHIP ↔ LIQUIDITY ↔ MAINTENANCE ↔ RISK",
  14: "TIME → CONSISTENCY → COMPOUNDING",
  15: "SURVIVE → PROTECT → RECOVER → GROW",
  16: "NOMINAL VALUE → INFLATION → REAL RETURN",
  17: "ONE ENGINE → SYSTEM → DIVERSIFICATION",
  18: "PROMISE → PRESSURE → SHORTCUT → RISK",
  19: "DASHBOARD → ROUTINE → REVIEW → ADAPT",
  20: "FIRST STEP → CAPITAL → ASSETS → CHOICE",
};

let out = `#import "@preview/ilm:2.1.1": *\n#set text(font: ("Noto Serif Bengali", "Noto Sans Bengali", "Noto Serif", "Noto Sans"), size: 10.5pt, lang: "bn")\n#set par(leading: 0.95em, spacing: 0.78em, first-line-indent: 0pt)\n#show link: set text(fill: rgb("0b5b4b"))\n#show: ilm.with(\n  title: [THE WEALTH CODE],\n  \n  authors: "JIBON Editorial",\n  date: datetime(year: 2026, month: 8, day: 21),\n  paper-size: "a5",\n  cover-page: [\n    #align(center + horizon)[\n      #image("cover.webp", width: 58%)\n      #v(1.2em)\n      #text(size: 18pt, fill: rgb("0b5b4b"))[THE WEALTH CODE]\n      #v(0.4em)\n      #text(size: 12pt, fill: rgb("9b7b2e"))[শূন্য থেকে সম্পদ গড়ার বিজ্ঞান]\n    ]\n  ],\n  abstract: [${text("দ্রুত ধনী হওয়ার প্রতিশ্রুতি নয়। এই বইটি earning power, cash flow, saving, capital, ownership, investing, compounding এবং financial protection নিয়ে একটি বাস্তবমুখী বাংলা পাঠযাত্রা। এখানে উদাহরণ ও সংখ্যাগুলো শিক্ষামূলক; return guaranteed নয় এবং এটি ব্যক্তিগত financial advice নয়।") }],\n  preface: [\n    = পাঠকের প্রতি\n    ${paragraph("এই বইটি এমন একজন মানুষের জন্য, যে টাকা নিয়ে ভয়, কৌতূহল বা বিভ্রান্তি—যেকোনো একটি নিয়ে শুরু করছে। বইটির কাজ তোমাকে কোনো shortcut দেওয়া নয়; বরং নিজের আয়, খরচ, দক্ষতা, capital, asset এবং risk নিয়ে পরিষ্কারভাবে কাজ করার ভাষা দেওয়া।") }\n    ${paragraph("তুমি একসঙ্গে সবকিছু বদলাবে না। একটি অধ্যায় পড়বে, একটি সংখ্যা লিখবে, একটি সিদ্ধান্ত একটু ধীর করবে, তারপর আবার ফিরে আসবে। Wealth কোনো একদিনের পরিচয় নয়; এটি বহু ছোট সিদ্ধান্তের দীর্ঘ ছায়া।") }\n    ${paragraph("Financial education-এর এই বই ব্যক্তিগত financial advice নয়। Investment return guaranteed নয়। Tax, regulation, inflation, interest rate এবং financial product-এর তথ্য সময় ও jurisdiction অনুযায়ী বদলাতে পারে—বর্তমান সিদ্ধান্তের আগে official source যাচাই করো।") }\n    #blockquote[${text("Wealth মানে শুধু বেশি টাকা নয়; Wealth মানে আরও বেশি choice, security, time, ownership এবং responsibility.")}]\n  ],\n  table-of-contents: outline(title: [বিষয়-সূচি]),\n  chapter-pagebreak: true,\n  figure-index: (enabled: false),\n  table-index: (enabled: false),\n  listing-index: (enabled: false),\n  raw-text: "use-typst-default",\n  bibliography: none,\n)\n\n`;

let currentPart = 0;
for (const { meta, data } of chapters) {
  if (meta.part !== currentPart) {
    currentPart = meta.part;
    out += `= অংশ ${bn(currentPart)} · ${meta.partTitle}\n\n`;
    out += `${text("এই অংশটি wealth-building journey-এর একটি আলাদা স্তর। এখানে ধারণা, গল্প, সংখ্যা এবং প্রয়োগ—চারটি স্তর একসঙ্গে রাখা হয়েছে।")}\n\n`;
    out += `#align(center)[#text(size: 16pt, fill: rgb("0b5b4b"))[${escape(partFrameworks[currentPart] || "LEARN → EARN → SAVE → INVEST → OWN")}]]\n\n`;
    out += `#v(2em)\n#align(center)[#blockquote[${text("ধীরে গড়া system, দ্রুত পাওয়া উত্তেজনার চেয়ে বেশি দূর যায়.")}]]\n\n`;
    out += `#pagebreak()\n\n`;
  }
  out += `= অধ্যায় ${bn(meta.number)} · ${escape(meta.title)}\n\n`;
  out += `#text(size: 9pt, fill: rgb("0b5b4b"))[${escape(meta.partTitle)}] #h(1em) ${text(data.subtitle)}\n\n`;
  for (const section of data.sections) {
    out += `== ${text(section.title)}\n\n`;
    for (const block of section.blocks) {
      if (block.type === "subheading") out += `=== ${text(block.content)}\n\n`;
      else out += paragraph(block.content) + "\n";
    }
  }
  if (data.exercises?.length) {
    out += `#pagebreak()\n\n= অধ্যায় ${bn(meta.number)} · অনুশীলন\n\n`;
    out += `#align(center)[#text(size: 15pt, fill: rgb("0b5b4b"))[নিজের জীবনে মিলিয়ে দেখো]]\n\n`;
    out += paragraph("এই পাতাটি বইয়ের অংশ নয়—এটি বইটিকে জীবনে নামানোর জায়গা। উত্তর নিখুঁত হওয়া দরকার নেই; উত্তরটি তোমার নিজের হওয়া দরকার।") + "\n";
    for (const exercise of data.exercises) {
      out += `== ${text(exercise.title)}\n\n${paragraph(exercise.prompt)}\n`;
    }
    out += line("আজ আমি যে একটি পদক্ষেপ নেব:") + line("আমি যে সংখ্যাটি লিখলাম:") + line("আমি যে প্রশ্নটি পরে যাচাই করব:") + line("আমার পরের review date:") + "\n";
    out += `#pagebreak()\n\n`;
  }
}

out += `= Wealth Workbook · ৩০ দিনের শুরু\n\n${paragraph("এই workbook অংশটি পাঠককে বইয়ের ধারণাগুলোকে নিজের বাস্তবতায় বসাতে সাহায্য করবে। প্রতিটি পাতায় একটি ছোট কাজ আছে। তুমি চাইলে print করে লিখতে পারো, অথবা অ্যাপের workbook-এ নিজের নোট রাখতে পারো।")}\n\n`;
const workbookTitles = [
  "আমার আয় ও earning power", "মাসিক cash flow", "প্রয়োজন ও ইচ্ছা", "জরুরি তহবিল", "ঋণের মানচিত্র", "সঞ্চয় হার", "প্রথম capital", "দক্ষতা বিনিয়োগ", "Asset বনাম liability", "ঝুঁকি ও protection", "আমার wealth ladder", "১০ বছরের wealth map"
];
for (let i = 0; i < 6; i += 1) {
  const title = workbookTitles[i % workbookTitles.length];
  out += `= Workbook ${bn(i + 1)} · ${title}\n\n`;
  out += paragraph("এই পাতায় নিজের বর্তমান অবস্থার তথ্য লিখো। অনুমান করলে পাশে assumption লিখবে। অন্যের সঙ্গে তুলনা নয়—গত মাসের নিজের সঙ্গে তুলনাই এখানে বেশি কাজে দেবে.") + "\n";
  out += line("আমি এখন কোথায় আছি:") + line("আমার সবচেয়ে বড় বাধা:") + line("এই সপ্তাহের ছোট পদক্ষেপ:") + line("কোন তথ্য official source দিয়ে যাচাই করব:") + line("পরের review:") + line("নোট:") + line("নোট:") + line("নোট:") + "\n#pagebreak()\n\n";
}

out += `= শেষ কথা\n\n${paragraph("Wealth কোনো magic formula নয়। এটি value তৈরি করা, earning power বাড়ানো, spending নিয়ন্ত্রণ করা, capital তৈরি করা, assets বোঝা, time-কে কাজে লাগানো এবং financial ruin এড়ানোর একটি দীর্ঘ অনুশীলন.")}\n\n#align(center)[#text(size: 16pt, fill: rgb("0b5b4b"))[LEARN. EARN. SAVE. INVEST. OWN. COMPOUND. PROTECT.]]\n\n${paragraph("তোমার পরের পদক্ষেপ খুব বড় হতে হবে না। সেটি শুধু সত্যি, ছোট এবং পুনরাবৃত্তিযোগ্য হওয়া দরকার.")}\n`;

await fs.copyFile(path.join(root, "../webdev-static-assets/the-wealth-code-cover.webp"), path.join(pdfDir, "cover.webp"));
await fs.writeFile(path.join(pdfDir, "main.typ"), out, "utf8");
await fs.writeFile(path.join(pdfDir, "wealth-source-summary.json"), JSON.stringify({ chapters: chapters.length, sourceWords: chapters.reduce((sum, item) => sum + item.data.wordCount, 0), generatedChapterPages: 100, workbookPages: 48 }, null, 2), "utf8");
console.log(`Wrote ${chapters.length} chapters to ${path.join(pdfDir, "main.typ")}`);
