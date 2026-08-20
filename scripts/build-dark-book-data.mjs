import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const sourceDirectory = "/home/ubuntu/book_project/dark_psychology_chapters";
const outputDirectory = path.join(projectRoot, "client/src/data/dark-chapters");

const chapterMetadata = [
  ["01", "মানুষ কেন অন্যের কথা শোনে?", "বিশ্বাস, কর্তৃত্ব, পুরস্কার ও belonging চিনে স্বাধীন সিদ্ধান্ত নেওয়া"],
  ["02", "মস্তিষ্কের Shortcut", "heuristic, automatic thinking ও bias check"],
  ["03", "ভয়, ইচ্ছা ও পুরস্কার", "emotional trigger চিনে সিদ্ধান্তে বিরতি নেওয়া"],
  ["04", "সবাই করছে—তাই আমিও?", "social proof, conformity ও peer pressure দেখা"],
  ["05", "Scarcity ও FOMO", "‘এখনই’ কথাটির পেছনের কারণ যাচাই"],
  ["06", "আমি তো তোমার জন্য এত কিছু করলাম", "কৃতজ্ঞ থেকেও স্বাধীন থাকার অনুশীলন"],
  ["07", "একবার হ্যাঁ বলার পর...", "commitment ও sunk cost চিনে থামার অনুমতি"],
  ["08", "আমি এমনই একজন মানুষ", "পরিচয়কে judgement-এর বিকল্প না বানানো"],
  ["09", "Authority-এর ছায়া", "সম্মান রেখে প্রশ্ন করা ও প্রমাণ দেখা"],
  ["10", "মানুষ কখন ‘না’ বলতে পারে না?", "guilt, fear ও dependency বুঝে প্রথম boundary script"],
  ["11", "কথার আড়ালে উদ্দেশ্য", "mind-reading নয়, evidence-ভিত্তিক hypothesis তৈরি"],
  ["12", "কথা নয়—Pattern দেখো", "repeat হওয়া আচরণ ও নির্ভরযোগ্যতা নথিভুক্ত করা"],
  ["13", "Validation-এর ক্ষুধা", "approval ও attention-এর প্রয়োজন চিনে নেওয়া"],
  ["14", "অহংকারের আড়ালে কী থাকে?", "label ছাড়াই conflict-এ impact প্রকাশ করা"],
  ["15", "Status Game", "status display ও বাস্তব দক্ষতা আলাদা করে দেখা"],
  ["16", "Jealousy ও Envy", "তুলনাকে পরিচয় নয়, তথ্য হিসেবে দেখা"],
  ["17", "Victim Playing", "সত্যিকারের ক্ষতি ও দায় এড়ানো গুলিয়ে না ফেলা"],
  ["18", "Guilt ও Shame", "healthy guilt ও weaponized guilt আলাদা করা"],
  ["19", "Gaslighting", "self-doubt কমাতে ঘটনা লেখা ও second perspective নেওয়া"],
  ["20", "Love Bombing ও Emotional Dependency", "গতি কমিয়ে support circle ধরে রাখা"],
  ["21", "Persuasion বনাম Manipulation", "সম্মতি, স্বচ্ছতা ও autonomy দিয়ে influence বিচার"],
  ["22", "Framing", "একই তথ্যের বিকল্প frame খোঁজা"],
  ["23", "Anchoring", "প্রথম দাবি বা সংখ্যাকে সাময়িক data হিসেবে দেখা"],
  ["24", "Emotion as Influence", "আবেগের নাম বলে তারপর সিদ্ধান্ত নেওয়া"],
  ["25", "False Urgency", "time pressure চিনে slow-down checklist ব্যবহার"],
  ["26", "Social Pressure", "ally খুঁজে private decision নেওয়া"],
  ["27", "Flattery", "প্রশংসা শুনেও বিষয়টি যাচাই করা"],
  ["28", "The Reciprocity Trap", "সৌজন্য রেখে implied debt decline করা"],
  ["29", "Commitment Trap", "stop-rule ও review point ঠিক করা"],
  ["30", "Information Control", "source, context ও incentive check করা"],
  ["31", "Toxic Friendship", "friendship audit ও safe distance"],
  ["32", "Manipulative Relationship", "safety-first relationship check"],
  ["33", "Workplace Politics", "documentation ও professional boundary"],
  ["34", "Negotiation", "BATNA, objective criteria ও fair trade-off"],
  ["35", "Bullying ও Intimidation", "support, record, report ও exit framework"],
  ["36", "Social Media Manipulation", "feed friction ও attention boundary"],
  ["37", "Advertising Psychology", "consumer pause card দিয়ে প্রয়োজন যাচাই"],
  ["38", "Rumor ও Misinformation", "verify-before-share routine"],
  ["39", "Cult-like Influence", "warning signs ও trusted outside contact"],
  ["40", "Reputation Attack", "reputation defense system"],
  ["41", "৫০টি Manipulation Red Flag", "warning sign ও pattern cluster নথিভুক্ত করা"],
  ["42", "না বলার বিজ্ঞান", "refusal, delay ও clarity-র Bengali response library"],
  ["43", "Boundary System", "identify, communicate, maintain, enforce"],
  ["44", "Emotional Detachment", "pause–name–check routine"],
  ["45", "Difficult People", "পরিস্থিতি অনুযায়ী distance ও response বেছে নেওয়া"],
  ["46", "Difficult Conversation Framework", "observe, clarify, state, offer, exit flow"],
  ["47", "Psychological Self-Defense", "verification, documentation, support ও boundaries"],
  ["48", "Decision Immunity", "চাপের মধ্যেও স্বাধীন judgement"],
  ["49", "Ethical Influence", "listening, honest framing ও consent"],
  ["50", "The Human Mind Field Guide", "red flag, model ও script দিয়ে ব্যক্তিগত field guide"],
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
    if (/^[-*+]\s+/.test(line) || /^\d+[.)]\s+/.test(line)) {
      flush();
      paragraphs.push(`• ${line.replace(/^[-*+]\s+|^\d+[.)]\s+/, "")}`);
      continue;
    }
    if (/^\|/.test(line)) {
      flush();
      continue;
    }
    buffer.push(line);
  }
  flush();
  return paragraphs;
};

const parseChapter = (source, metadata) => {
  const [id, fallbackTitle, subtitle] = metadata;
  const lines = source.split("\n");
  const sections = [];
  let current = null;
  let body = [];

  const closeSection = () => {
    if (!current) return;
    current.blocks.push(...compactParagraphs(body).map((content) => ({ type: "paragraph", content })));
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
      current.blocks.push(...compactParagraphs(body).map((content) => ({ type: "paragraph", content })));
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
    .filter((section) => /অনুশীলন|প্রয়োগ|চ্যালেঞ্জ|পরীক্ষা|রুটিন|পরিকল্পনা|মানচিত্র|ক্যানভাস|ঢাল|script/i.test(section.title))
    .slice(0, 5)
    .map((section) => ({
      title: section.title,
      prompt: section.blocks.filter((block) => block.type === "paragraph").slice(0, 2).map((block) => block.content).join(" "),
    }));

  return { id, number: Number(id), title: fallbackTitle, subtitle, readingMinutes: Math.max(7, Math.round(wordCount / 185)), wordCount, sections, exercises };
};

fs.mkdirSync(outputDirectory, { recursive: true });
for (const metadata of chapterMetadata) {
  const [id] = metadata;
  const source = fs.readFileSync(path.join(sourceDirectory, `chapter_${id}_draft_bn.md`), "utf8");
  const chapter = parseChapter(source, metadata);
  const output = `/* জীবন-ড্যাশবোর্ড: Dark Psychology-এর lazy-loaded ethical self-defense module. */\nimport type { BookChapter } from "../book";\n\nconst chapter: BookChapter = ${JSON.stringify(chapter, null, 2)};\n\nexport default chapter;\n`;
  fs.writeFileSync(path.join(outputDirectory, `chapter-${id}.ts`), output, "utf8");
}

const indexOutput = `/* জীবন-ড্যাশবোর্ড: Dark Psychology ethical self-defense book metadata and lazy loaders. */\nimport type { BookChapter, ChapterMeta, WorkbookExercise } from "./book";\n\nexport const darkChapters: ChapterMeta[] = ${JSON.stringify(chapterMetadata.map(([id, title, subtitle]) => ({ id, number: Number(id), title, subtitle, readingMinutes: 0 })), null, 2)};\n\nexport const darkChapterLoaders: Record<string, () => Promise<{ default: BookChapter }>> = {\n${chapterMetadata.map(([id]) => `  "${id}": () => import("./dark-chapters/chapter-${id}"),`).join("\n")}\n};\n\nexport const darkWorkbookExercises: WorkbookExercise[] = [\n  { title: "নিজের Red Flag Ledger", prompt: "আজকের একটি চাপের কথোপকথনে কী বলা হয়েছিল, কী বারবার ঘটছে, কোন সীমাটি দরকার এবং কাকে সহায়তার জন্য জানাতে পারো—লিখে রাখো।" },\n  { title: "Pause–Name–Check", prompt: "একটি সিদ্ধান্তের আগে থামো, অনুভূতির নাম দাও, তথ্য ও context যাচাই করো, তারপর পরের ছোট পদক্ষেপ নির্ধারণ করো।" },\n  { title: "সীমানার বাক্য", prompt: "নিজের ভাষায় তিনটি ছোট বাক্য লেখো: সময় চাওয়া, না বলা এবং অন্যের সহায়তা নেওয়ার জন্য।" }\n];\n\nexport const darkTotalReadingMinutes = 600;\n`;
fs.writeFileSync(path.join(projectRoot, "client/src/data/dark-book.ts"), indexOutput, "utf8");

console.log(`Generated ${chapterMetadata.length} Dark Psychology lazy-loaded chapter modules.`);
