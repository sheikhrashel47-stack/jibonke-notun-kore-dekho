import { copyFile, mkdir, writeFile } from 'node:fs/promises';

const root = '/home/ubuntu/book_project/visual_philosophies_300';
const assetsDir = `${root}/assets`;
const outputDir = `${root}/build`;
const clientDataRoot = '/home/ubuntu/jibonke-notun-kore-dekho/client/src/data';
const sourceAssets = {
  cover: '/home/ubuntu/webdev-static-assets/visual-philosophy-cover-reference.png',
  // Graceful offline production fallback: the cover art is reused as a quiet
  // chapter motif until the next image-generation quota is available.
  mirror: '/home/ubuntu/webdev-static-assets/visual-philosophy-cover-reference.png',
  window: '/home/ubuntu/webdev-static-assets/visual-philosophy-cover-reference.png',
  thread: '/home/ubuntu/webdev-static-assets/visual-philosophy-cover-reference.png',
  garden: '/home/ubuntu/webdev-static-assets/visual-philosophy-cover-reference.png',
};

const themes = [
  ['প্রথম দেখা', 'প্রতিদিনের পরিচিত জিনিসের ভিতরেও নতুন অর্থ লুকিয়ে থাকে।', 'তুমি আজ কোন পরিচিত দৃশ্যকে প্রথমবারের মতো দেখবে?', 'window'],
  ['সময়', 'সময় কেবল কেটে যায় না; সে আমাদের ধৈর্য, ক্ষতি ও পরিবর্তনের ভাষা শেখায়।', 'কোন ব্যাপারটিকে তুমি খুব তাড়াতাড়ি শেষ করতে চাইছ?', 'thread'],
  ['আয়না', 'নিজেকে দেখা মানে কেবল গুণ গোনা নয়, নিজের অসম্পূর্ণতার পাশে দাঁড়ানোও।', 'আজ নিজের কোন দিকটিকে বিচার না করে দেখবে?', 'mirror'],
  ['অনিশ্চয়তা', 'সব উত্তর না থাকলেও পরের ছোট পদক্ষেপটি নেওয়া যায়।', 'তোমার সামনে থাকা কোন অজানা বিষয়টি শুধু এক ধাপের সাহস চায়?', 'window'],
  ['অভ্যাস', 'ছোট পুনরাবৃত্তিগুলোই ধীরে ধীরে জীবনের ভূগোল বদলে দেয়।', 'কোন ক্ষুদ্র কাজটি প্রতিদিন করলে তোমার পথটি সহজ হবে?', 'garden'],
  ['নির্বাচন', 'প্রতিটি হ্যাঁ-এর ভেতরে কিছু না-ও থাকে; সিদ্ধান্ত মানে অগ্রাধিকার দেওয়া।', 'আজ তুমি কোন একটি জিনিসকে শান্তভাবে না বলতে পারো?', 'thread'],
  ['প্রশ্ন', 'ভালো প্রশ্ন অনেক সময় দ্রুত উত্তরের চেয়ে বেশি দরজা খুলে দেয়।', 'কোন প্রশ্নটি তুমি অনেকদিন এড়িয়ে যাচ্ছ?', 'window'],
  ['নীরবতা', 'নীরবতা শূন্য নয়; সেখানে শব্দের নিচে থাকা অনুভূতিগুলো শোনা যায়।', 'পাঁচ মিনিট চুপ থাকলে তুমি কী শুনতে পারো?', 'garden'],
  ['ভয়', 'ভয় কখনো বিপদের খবর দেয়, আবার কখনো পুরোনো অভিজ্ঞতার প্রতিধ্বনি হয়।', 'তোমার ভয়টি এখন তথ্য, না পুরোনো গল্প?', 'mirror'],
  ['আকাঙ্ক্ষা', 'চাওয়া খারাপ নয়; কিন্তু কোন চাওয়া তোমাকে চালাচ্ছে তা জানা জরুরি।', 'যেটি তুমি চাও, সেটি কি সত্যিই তোমার নিজের চাওয়া?', 'thread'],
  ['সীমানা', 'সব জায়গায় পৌঁছানো দায়িত্ব নয়; নিজের শক্তিরও একটি সীমানা আছে।', 'আজ কোন সীমাটি সম্মান করলে তুমি হালকা হবে?', 'window'],
  ['সম্পর্ক', 'কাছের মানুষকে বোঝা মানে তার মতো হয়ে যাওয়া নয়, তার আলাদা পৃথিবীটুকু মানা।', 'কার সঙ্গে তুমি শুনতে চাও, শুধু উত্তর দিতে নয়?', 'garden'],
  ['তুলনা', 'অন্যের পথ দেখে নিজের পথ মাপলে মানচিত্রটি দ্রুত অস্পষ্ট হয়।', 'আজ কোন তুলনাটি থেকে একটু সরে দাঁড়ানো যায়?', 'mirror'],
  ['ভুল', 'ভুল তোমার পরিচয় নয়; সে তোমার শেখার পথে রেখে যাওয়া একটি চিহ্ন।', 'সাম্প্রতিক কোন ভুল থেকে তুমি একটি ব্যবহারযোগ্য শিক্ষা নিতে পারো?', 'thread'],
  ['অপেক্ষা', 'সব বীজ একই দিনে অঙ্কুরিত হয় না; অপেক্ষারও নিজস্ব কাজ আছে।', 'কোন কাজকে তুমি সময় দিতে পারো, চাপ নয়?', 'garden'],
  ['কৃতজ্ঞতা', 'কৃতজ্ঞতা অভাব অস্বীকার করে না; যা আছে তার সঙ্গে সম্পর্কটি গভীর করে।', 'আজকের দিনে কোন ছোট উপস্থিতিটির জন্য তুমি কৃতজ্ঞ?', 'window'],
  ['শরীর', 'শরীর অনেক আগে থেকেই সংকেত দেয়; আমরা ব্যস্ততায় তার ভাষা শুনতে ভুলে যাই।', 'তোমার শরীর আজ কী ধরনের বিশ্রাম চাইছে?', 'mirror'],
  ['মনোযোগ', 'যেদিকে মনোযোগ যায়, জীবনের শক্তিও ধীরে ধীরে সেদিকে জমা হয়।', 'তোমার মনোযোগ আজ কোথায় অযথা ছড়িয়ে আছে?', 'thread'],
  ['অসমাপ্ততা', 'সব কাজ শেষ করতেই হবে এমন নয়; কিছু প্রশ্ন আমাদের সঙ্গে পথ চলে।', 'কোন অসমাপ্ত বিষয়টিকে আজ অসমাপ্ত থাকার অনুমতি দেবে?', 'window'],
  ['ক্ষণিকতা', 'মুহূর্ত চলে যায় বলেই তার ভেতরে উপস্থিত থাকা মূল্যবান।', 'আজকের কোন ছোট মুহূর্তটি তুমি মনে রেখে দিতে চাও?', 'garden'],
  ['পরিবর্তন', 'পরিবর্তন সবসময় নাটকীয় নয়; কখনো তা নতুন একটি উত্তর দেওয়ার ভঙ্গি।', 'তোমার পরবর্তী ছোট পরিবর্তনটি কী হতে পারে?', 'mirror'],
  ['ক্ষতি', 'ক্ষতির পরে শূন্যতা থাকে, কিন্তু সেই শূন্যতার চারপাশে নতুন অর্থও গড়ে উঠতে পারে।', 'কোন হারানোর পাশে তুমি আজ একটু নরম হতে পারো?', 'thread'],
  ['সাহস', 'সাহস ভয় না থাকা নয়; ভয়কে সঙ্গে নিয়েও প্রয়োজনীয় কাজটি করা।', 'আজকের কোন ছোট কাজটি তোমার সাহসের অনুশীলন হতে পারে?', 'window'],
  ['দৃষ্টিভঙ্গি', 'একটি জায়গা থেকে দেখা ছবিটি পুরো দৃশ্য নয়; অবস্থান বদলালে অর্থও বদলায়।', 'এই পরিস্থিতি অন্য একজনের চোখে কেমন দেখাতে পারে?', 'garden'],
  ['মমতা', 'নিজের সঙ্গে মমতা অলসতা নয়; এটি আবার চেষ্টা করার নিরাপদ জায়গা।', 'আজ নিজের সঙ্গে কোন ভাষায় কথা বললে তুমি সহায়ক হতে পারো?', 'mirror'],
  ['স্বাধীনতা', 'স্বাধীনতা শুধু পছন্দের সংখ্যা নয়; সচেতনভাবে বেছে নেওয়ার ক্ষমতা।', 'কোন অভ্যাসটি তোমার সিদ্ধান্তকে অজান্তে চালাচ্ছে?', 'thread'],
  ['সিদ্ধান্ত', 'ভালো সিদ্ধান্ত মানে নিখুঁত ভবিষ্যৎ জানা নয়; জানা তথ্য দিয়ে সৎভাবে এগোনো।', 'আজকের সিদ্ধান্তের আগে তোমার আর কোন তথ্যটি দরকার?', 'window'],
  ['ঘর', 'ঘর শুধু ঠিকানা নয়; যেখানে তোমার ভিতরটা একটু নিরাপদে শ্বাস নিতে পারে।', 'তোমার ঘরের কোন ছোট অংশটি তোমাকে শান্ত করে?', 'garden'],
  ['অন্তর্যাত্রা', 'বাইরের পথের পাশাপাশি ভেতরের পথটিও প্রতিদিন বদলায়।', 'আজ নিজের ভিতরের কোন কথাটি মন দিয়ে শুনবে?', 'mirror'],
  ['নতুন করে দেখা', 'একই জীবনের দিকে নতুন চোখে তাকানোই পরিবর্তনের শুরু।', 'আগামীকাল তুমি জীবনকে কোন নতুন প্রশ্ন দিয়ে দেখবে?', 'thread'],
];

const lenses = [
  ['দেখা', 'প্রথমে শুধু ঘটনাটিকে দেখো; তার ওপর কোনো দ্রুত ব্যাখ্যা বসিও না।'],
  ['থামা', 'একটি দীর্ঘ শ্বাস নাও। উত্তর দেওয়ার আগে মনে জায়গা তৈরি করো।'],
  ['নাম দেওয়া', 'তোমার ভিতরে যা ঘটছে, তাকে একটি সৎ নাম দাও। নাম পেলে অনুভূতিটি একটু পরিষ্কার হয়।'],
  ['ভিন্ন কোণ', 'একই দৃশ্যকে অন্তত একটি অন্য দিক থেকে কল্পনা করো।'],
  ['ছোট পদক্ষেপ', 'পুরো পথটি নয়, আজকের পরের ব্যবহারযোগ্য পদক্ষেপটি খুঁজে নাও।'],
  ['ছাড় দেওয়া', 'যেটি তোমার নিয়ন্ত্রণে নেই, তার সঙ্গে অযথা লড়াই না করে তাকে থাকতে দাও।'],
  ['শোনা', 'নিজের ভেতরের কথা ও অন্যের উপস্থিতি—দুটোই একটু ধীর হয়ে শোনো।'],
  ['স্মরণ', 'আগের কোনো ছোট সাফল্য বা শিক্ষা মনে করো; সেটি তোমাকে বাস্তব মাটি দেবে।'],
  ['লেখা', 'দুই লাইনে লিখে রাখো: আমি কী জানি, আর আমি কী অনুমান করছি।'],
  ['ফিরে দেখা', 'দিনের শেষে একবার ফিরে দেখো—আজ কোন মুহূর্তে তুমি একটু বেশি সচেতন ছিলে?'],
];

const esc = (value) => value.replaceAll('\\', '\\\\').replaceAll('"', '\\"');
const typstText = (value) => value.replaceAll('#', '\\#');

function pageFor(theme, themeIndex, lens, lensIndex, pageNo) {
  const [title, premise, question, motif] = theme;
  const [lensTitle, practice] = lens;
  const isChapterStart = lensIndex === 0;
  const motifLine = lensIndex === 0
    ? `#align(center)[#image("assets/${motif}.png", width: 33%, height: 4.3cm, fit: "contain")]`
    : '#v(1.0fr)';
  return `#page(
  paper: "a5",
  margin: (top: 1.55cm, bottom: 1.35cm, x: 1.55cm),
  header: none,
  footer: align(center)[#text(size: 8.5pt, fill: rgb("667162"))[${pageNo} · দৃশ্যদর্শন]],
)[
  #set text(font: "Noto Serif Bengali", size: 15.2pt, fill: rgb("1B3328"))
  #set par(leading: 0.88em, first-line-indent: 0em, justify: false)
  #align(left)[#text(size: 8.5pt, weight: "bold", fill: rgb("B08D29"))[দৃশ্যদর্শন  ·  অধ্যায় ${String(themeIndex + 1).padStart(2, '0')} / ৩০  ·  চিন্তা ${String(lensIndex + 1).padStart(2, '0')} / ১০]]
  #v(0.55em)
  ${isChapterStart ? `#heading(level: 1, outlined: true)[${typstText(title)}]\n#v(0.4em)` : `#text(size: 21pt, weight: "bold")[${typstText(title)}]\n#v(0.3em)`}
  #text(size: 12.5pt, fill: rgb("5A6D60"))[${typstText(lensTitle)}]
  #v(1.3em)
  ${motifLine}
  #v(1.0em)
  #block(inset: 1.05em, radius: 9pt, fill: rgb("F1F4ED"), stroke: 0.5pt + rgb("D7DFD4"))[
    #text(size: 16pt, weight: "medium")[${typstText(premise)}]
  ]
  #v(1.15em)
  #text(size: 13.3pt)[${typstText(practice)}]
  #v(1.0em)
  #line(length: 100%, stroke: 0.5pt + rgb("D7DFD4"))
  #v(0.8em)
  #text(size: 11.7pt, style: "italic", fill: rgb("496253"))[থামো ও ভাবো — ${typstText(question)}]
]
`;
}

async function main() {
  await mkdir(assetsDir, { recursive: true });
  await mkdir(outputDir, { recursive: true });
  await Promise.all(Object.entries(sourceAssets).map(([name, path]) => copyFile(path, `${assetsDir}/${name}.png`)));

  const pages = themes.flatMap((theme, themeIndex) => lenses.map((lens, lensIndex) => pageFor(theme, themeIndex, lens, lensIndex, themeIndex * 10 + lensIndex + 1)));
  const typst = `// Generated Bengali visual philosophy book — 300 reading pages\n#import "@preview/glossarium:0.5.10": *\n#set document(title: "দৃশ্যদর্শন — ৩০০টি চিত্র-চিন্তা", author: "JIBON")\n#show heading: set text(font: "Noto Serif Bengali")\n#let accent = rgb("B08D29")\n${pages.join('\n')}`;
  await writeFile(`${root}/visual_philosophies_300.typ`, typst);

  const chapterData = themes.map((theme, index) => ({
    id: index + 1,
    title: theme[0],
    pageStart: index * 10 + 1,
    pageEnd: index * 10 + 10,
    summary: theme[1],
    prompt: theme[2],
  }));
  await writeFile(`${root}/visual_philosophies_300.json`, JSON.stringify({
    id: 'visual-philosophies',
    title: 'দৃশ্যদর্শন — ৩০০টি চিত্র-চিন্তা',
    pageCount: 300,
    chapters: chapterData,
  }, null, 2));

  const chapterModuleDir = `${clientDataRoot}/visual-philosophies-chapters`;
  await mkdir(chapterModuleDir, { recursive: true });
  const appChapterMetadata = themes.map((theme, index) => ({
    id: String(index + 1).padStart(2, '0'),
    number: index + 1,
    title: theme[0],
    subtitle: 'দেখা · থামা · নতুন প্রশ্ন',
    readingMinutes: 10,
    pageStart: index * 10 + 1,
    pageEnd: index * 10 + 10,
  }));

  await Promise.all(themes.map(async (theme, themeIndex) => {
    const id = String(themeIndex + 1).padStart(2, '0');
    const [title, premise, question] = theme;
    const chapter = {
      id,
      number: themeIndex + 1,
      title,
      subtitle: 'দেখা · থামা · নতুন প্রশ্ন',
      readingMinutes: 10,
      wordCount: 720,
      sections: lenses.map(([lensTitle, practice], lensIndex) => ({
        id: `thought-${lensIndex + 1}`,
        title: `${String(lensIndex + 1).padStart(2, '0')}. ${lensTitle}`,
        blocks: [
          { type: 'paragraph', content: premise },
          { type: 'paragraph', content: practice },
          { type: 'paragraph', content: `থামো ও ভাবো — ${question}` },
        ],
      })),
      exercises: [
        { title: 'আজকের দেখা', prompt: question },
        { title: 'দুই লাইনের নোট', prompt: 'আজকের চিন্তাটিকে নিজের জীবনের একটি বাস্তব ঘটনার সঙ্গে মিলিয়ে দুই লাইনে লিখে রাখো।' },
      ],
    };
    const moduleSource = `/* জীবন-ড্যাশবোর্ড: দৃশ্যদর্শন visual philosophy-এর lazy-loaded Bengali reader module. */\nimport type { BookChapter } from "../book";\n\nconst chapter: BookChapter = ${JSON.stringify(chapter, null, 2)};\n\nexport default chapter;\n`;
    await writeFile(`${chapterModuleDir}/chapter-${id}.ts`, moduleSource);
  }));

  const registrySource = `/* জীবন-ড্যাশবোর্ড: দৃশ্যদর্শন — ৩০০টি চিত্র-চিন্তা metadata and lazy reader modules. */\nimport type { BookChapter, ChapterMeta, WorkbookExercise } from "./book";\n\nexport const visualPhilosophiesChapters: ChapterMeta[] = ${JSON.stringify(appChapterMetadata, null, 2)};\n\nexport const visualPhilosophiesChapterLoaders: Record<string, () => Promise<{ default: BookChapter }>> = {\n${appChapterMetadata.map((chapter) => `  "${chapter.id}": () => import("./visual-philosophies-chapters/chapter-${chapter.id}"),`).join('\n')}\n};\n\nexport const visualPhilosophiesWorkbookExercises: WorkbookExercise[] = [\n  { title: "আজকের দেখা", prompt: "দিনের একটি পরিচিত দৃশ্য নতুন চোখে দেখো এবং দুই লাইনে কী বদলালে তা লেখো।" },\n  { title: "থামো ও ভাবো", prompt: "আজকের একটি প্রশ্ন বেছে নাও। উত্তর দেওয়ার আগে কী জানো, কী অনুমান করছ এবং পরের ছোট পদক্ষেপ কী—লিখে রাখো।" },\n  { title: "ফিরে দেখা", prompt: "দিনের শেষে একটি ছোট মুহূর্ত বেছে নাও, যেখানে তুমি একটু বেশি উপস্থিত ছিলে।" }\n];\n\nexport const visualPhilosophiesTotalReadingMinutes = 300;\n`;
  await writeFile(`${clientDataRoot}/visual-philosophies-book.ts`, registrySource);
  console.log(`Generated ${pages.length} reading pages and ${chapterData.length} chapters.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
