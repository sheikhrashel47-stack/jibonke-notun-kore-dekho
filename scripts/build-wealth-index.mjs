import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = path.resolve(new URL("..", import.meta.url).pathname);
const planPath = path.join(projectRoot, "client/src/data/wealth-chapter-plan.json");
const outputPath = path.join(projectRoot, "client/src/data/wealth-book.ts");

const chapters = JSON.parse(await fs.readFile(planPath, "utf8"));
const metadata = chapters.map((chapter) => ({
  id: chapter.id,
  number: chapter.number,
  title: chapter.title,
  subtitle: `Part ${String(chapter.part).padStart(2, "0")} · ${chapter.partTitle}`,
  readingMinutes: 8,
}));
const loaders = chapters.map((chapter) => `  "${chapter.id}": () => import("./wealth-chapters/chapter-${chapter.id}"),`).join("\n");
const output = `/* THE WEALTH CODE — 100-chapter Bengali financial education reader index. */
import type { BookChapter, ChapterMeta, WorkbookExercise } from "./book";

export const wealthChapters: ChapterMeta[] = ${JSON.stringify(metadata, null, 2)};

export const wealthChapterLoaders: Record<string, () => Promise<{ default: BookChapter }>> = {
${loaders}
};

export const wealthWorkbookExercises: WorkbookExercise[] = [
  { title: "আমার wealth dashboard", prompt: "এক পাতায় বর্তমান আয়, মাসিক খরচ, সঞ্চয়, ঋণ, সম্পদ এবং আনুমানিক net worth লিখে ফেলো। যেটি জানো না, সেটিকে অনুমান না করে ‘জানা নেই’ লিখো।" },
  { title: "৩০ দিনের money reset", prompt: "পরবর্তী ৩০ দিনে খরচ track, একটি savings target, একটি skill action এবং একটি debt review—এই চারটি ছোট কাজের calendar বানাও।" },
  { title: "ঝুঁকি-সচেতন সিদ্ধান্ত", prompt: "যে কোনো financial opportunity-র আগে return নয়, loss কীভাবে হতে পারে, liquidity কতটা, এবং official information কোথায়—এই তিনটি প্রশ্নের উত্তর লেখো।" },
  { title: "১০ বছরের wealth map", prompt: "আগামী ১, ৩, ৫ ও ১০ বছরের জন্য skill, income, capital, ownership, protection ও giving—প্রতিটি ক্ষেত্রে একটি করে বাস্তব milestone লিখো।" }
];

export const wealthTotalReadingMinutes = wealthChapters.length * 8;
`;
await fs.writeFile(outputPath, output, "utf8");
console.log(`Built ${chapters.length} chapter metadata entries and lazy loaders.`);
