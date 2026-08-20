import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const bookRoot = "/home/ubuntu/book_project";
const outputDirectory = path.join(projectRoot, "client/src/data/chapters");

const chapterMetadata = [
  ["01", "নিজেকে বোঝা", "পরিচয়, মূল্যবোধ ও নিজের গল্পের দিকে সৎভাবে তাকানো"],
  ["02", "মস্তিষ্ক তোমার সঙ্গে যে খেলাগুলো খেলে", "চিন্তার শর্টকাট, পক্ষপাত ও সচেতন সিদ্ধান্তের অনুশীলন"],
  ["03", "ভালোভাবে চিন্তা করা", "ভালো প্রশ্ন, প্রমাণ ও অনিশ্চয়তার সঙ্গে কাজ করা"],
  ["04", "শেখা শেখা", "জ্ঞানকে দক্ষতায় বদলানোর বাস্তব কৌশল"],
  ["05", "আত্মনিয়ন্ত্রণ: ইচ্ছাশক্তির বাইরে", "পরিবেশ, অভ্যাস ও ছোট ব্যবস্থার শক্তি"],
  ["06", "মনোযোগ: যে সম্পদ চুপচাপ হারাচ্ছ", "বিক্ষেপ কমিয়ে গভীর কাজে ফিরে আসা"],
  ["07", "মানুষকে বোঝা", "আচরণের আড়ালে থাকা চাহিদা ও প্রেক্ষাপট দেখা"],
  ["08", "যোগাযোগ: কথা বলার চেয়েও বেশি", "শোনা, বলা ও বোঝাপড়ার শিল্প"],
  ["09", "সম্পর্ক: কাছাকাছি থেকেও নিজের থাকা", "সীমারেখা, আস্থা ও সম্পর্কের দায়িত্ব"],
  ["10", "ক্যারিয়ার: কাজ, দক্ষতা ও অর্থপূর্ণতা", "কাজকে নিজের দীর্ঘমেয়াদি জীবনের সঙ্গে মিলিয়ে দেখা"],
  ["11", "টাকা: স্বাধীনতা, ভয় ও ভবিষ্যৎ", "অর্থকে সিদ্ধান্ত ও স্বাধীনতার হাতিয়ার হিসেবে বোঝা"],
  ["12", "আবেগ: অনুভূতি শত্রু নয়", "আবেগকে দমন নয়, পড়া ও ব্যবহার করা"],
  ["13", "কঠিন সময়: ভেঙে পড়া থেকে ফিরে আসা", "বিপর্যয়ের মধ্যে নিজের প্রতি সহানুভূতিশীল থাকা"],
  ["14", "সিদ্ধান্ত: নিশ্চিততার অপেক্ষা না করে", "অসম্পূর্ণ তথ্যেও পরের ভালো পদক্ষেপ নেওয়া"],
  ["15", "তোমার Life Operating System", "জীবনের জন্য নিজের ব্যবস্থাপনা ও দীর্ঘমেয়াদি দিকনির্দেশ"],
];

const normalize = (value) => value.replace(/\r/g, "").trim();
const compactParagraphs = (lines) => {
  const paragraphs = [];
  let buffer = [];
  const flush = () => {
    const text = normalize(buffer.join(" "));
    if (text) paragraphs.push(text);
    buffer = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flush();
      continue;
    }
    if (/^[-*+]\s+/.test(line)) {
      flush();
      paragraphs.push(`• ${line.replace(/^[-*+]\s+/, "")}`);
      continue;
    }
    if (/^\d+[.)]\s+/.test(line)) {
      flush();
      paragraphs.push(`• ${line.replace(/^\d+[.)]\s+/, "")}`);
      continue;
    }
    buffer.push(line);
  }
  flush();
  return paragraphs;
};

const parseChapter = (source, metadata) => {
  const [, fallbackTitle, subtitle] = metadata;
  const lines = source.split("\n");
  const sections = [];
  let current = null;
  let body = [];

  const closeSection = () => {
    if (!current) return;
    const paragraphs = compactParagraphs(body);
    current.blocks.push(...paragraphs.map((content) => ({ type: "paragraph", content })));
    if (current.blocks.length) sections.push(current);
    current = null;
    body = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (/^#\s+/.test(line)) continue;
    if (/^##\s+/.test(line)) {
      const heading = line.replace(/^##\s+/, "").trim();
      if (/^references$/i.test(heading)) {
        closeSection();
        break;
      }
      closeSection();
      current = { id: `section-${sections.length + 1}`, title: heading, blocks: [] };
      continue;
    }
    if (/^###\s+/.test(line)) {
      if (!current) current = { id: `section-${sections.length + 1}`, title: fallbackTitle, blocks: [] };
      const paragraphs = compactParagraphs(body);
      current.blocks.push(...paragraphs.map((content) => ({ type: "paragraph", content })));
      body = [];
      current.blocks.push({ type: "subheading", content: line.replace(/^###\s+/, "").trim() });
      continue;
    }
    if (!current && line) current = { id: `section-${sections.length + 1}`, title: fallbackTitle, blocks: [] };
    body.push(rawLine);
  }
  closeSection();

  const text = sections.flatMap((section) => section.blocks.map((block) => block.content)).join(" ");
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const exercises = sections
    .filter((section) => /অনুশীলন|প্রয়োগ|চ্যালেঞ্জ|পরীক্ষা|রুটিন|পরিকল্পনা|মানচিত্র|ক্যানভাস/i.test(section.title))
    .slice(0, 5)
    .map((section) => ({ title: section.title, prompt: section.blocks.filter((block) => block.type === "paragraph").slice(0, 2).map((block) => block.content).join(" ") }));

  return {
    id: metadata[0],
    number: Number(metadata[0]),
    title: fallbackTitle,
    subtitle,
    readingMinutes: Math.max(7, Math.round(wordCount / 185)),
    wordCount,
    sections,
    exercises,
  };
};

fs.mkdirSync(outputDirectory, { recursive: true });
for (const metadata of chapterMetadata) {
  const [id] = metadata;
  const filename = `chapter_${id}_draft_bn.md`;
  const source = fs.readFileSync(path.join(bookRoot, filename), "utf8");
  const chapter = parseChapter(source, metadata);
  const output = `/* জীবন-ড্যাশবোর্ড: lazy-loaded Bengali book content module. */\nimport type { BookChapter } from "../book";\n\nconst chapter: BookChapter = ${JSON.stringify(chapter, null, 2)};\n\nexport default chapter;\n`;
  fs.writeFileSync(path.join(outputDirectory, `chapter-${id}.ts`), output, "utf8");
}

const bookIndex = `/* জীবন-ড্যাশবোর্ড: app-wide chapter metadata and lazy loaders. */\n\nexport type BookBlock = { type: "paragraph" | "subheading"; content: string };\nexport type BookSection = { id: string; title: string; blocks: BookBlock[] };\nexport type WorkbookExercise = { title: string; prompt: string };\nexport type BookChapter = {\n  id: string;\n  number: number;\n  title: string;\n  subtitle: string;\n  readingMinutes: number;\n  wordCount: number;\n  sections: BookSection[];\n  exercises: WorkbookExercise[];\n};\n\nexport type ChapterMeta = Pick<BookChapter, "id" | "number" | "title" | "subtitle" | "readingMinutes">;\n\nexport const chapters: ChapterMeta[] = ${JSON.stringify(chapterMetadata.map(([id, title, subtitle]) => ({ id, number: Number(id), title, subtitle, readingMinutes: 0 })), null, 2)};\n\nexport const chapterLoaders: Record<string, () => Promise<{ default: BookChapter }>> = {\n${chapterMetadata.map(([id]) => `  "${id}": () => import("./chapters/chapter-${id}"),`).join("\n")}\n};\n\nexport const workbookExercises: WorkbookExercise[] = [\n  { title: "৩০ দিনের ছোট পরিবর্তন", prompt: "আজ থেকে ৩০ দিনের জন্য এমন একটি ছোট আচরণ বেছে নাও, যা তোমার জীবনে সবচেয়ে বেশি পার্থক্য আনতে পারে। প্রতিদিন কখন, কোথায় এবং কীভাবে করবে—লিখে রাখো।" },\n  { title: "সাপ্তাহিক ফিরে দেখা", prompt: "গত সাত দিনে কোন সিদ্ধান্ত বা কথোপকথন তোমাকে ভাবিয়েছে? ঘটনা, অনুভূতি, শেখা এবং পরের পদক্ষেপ—এই চারটি বাক্যে লিখো।" },\n  { title: "Life OS ক্যানভাস", prompt: "স্বাস্থ্য, কাজ, সম্পর্ক, টাকা, শেখা ও বিশ্রাম—প্রতিটি ক্ষেত্রকে ১ থেকে ১০-এর মধ্যে নম্বর দাও। সবচেয়ে জরুরি একটি ক্ষেত্র বেছে ছোট পরবর্তী পদক্ষেপ ঠিক করো।" },\n  { title: "নিজের সঙ্গে চুক্তি", prompt: "এই বই থেকে পাওয়া একটি ভাবনা নিয়ে নিজের কাছে এক বাক্যের একটি বাস্তব চুক্তি লেখো। চুক্তিটি ছোট, নির্দিষ্ট ও পরের সাত দিনের মধ্যে করা যায় এমন হওয়া দরকার।" }\n];\n\nexport const totalReadingMinutes = 300;\n`;
fs.mkdirSync(path.join(projectRoot, "client/src/data"), { recursive: true });
fs.writeFileSync(path.join(projectRoot, "client/src/data/book.ts"), bookIndex, "utf8");

console.log(`Generated ${chapterMetadata.length} lazy-loaded chapter modules.`);
