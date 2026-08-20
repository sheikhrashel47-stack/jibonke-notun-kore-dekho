import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const chapterDir = path.join(root, "client/src/data/wealth-chapters");
const files = (await fs.readdir(chapterDir)).filter((name) => /^chapter-\d{2}\.ts$/.test(name)).sort();
const chapters = [];
for (const file of files) {
  const source = await fs.readFile(path.join(chapterDir, file), "utf8");
  const match = source.match(/const chapter: BookChapter = ([\s\S]*?);\n\nexport default chapter;/);
  if (!match) throw new Error(`Could not parse ${file}`);
  const chapter = JSON.parse(match[1]);
  const text = chapter.sections.flatMap((section) => section.blocks.map((block) => block.content)).join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  chapters.push({ id: chapter.id, number: chapter.number, title: chapter.title, sections: chapter.sections.length, words, readingMinutes: chapter.readingMinutes });
}
const totalWords = chapters.reduce((sum, chapter) => sum + chapter.words, 0);
const totalSections = chapters.reduce((sum, chapter) => sum + chapter.sections, 0);
const report = { chapterCount: chapters.length, totalWords, totalSections, averageWords: Math.round(totalWords / Math.max(1, chapters.length)), chapters };
await fs.writeFile(path.join(root, "wealth-manuscript-analysis.json"), JSON.stringify(report, null, 2), "utf8");
console.log(JSON.stringify({ chapterCount: report.chapterCount, totalWords: report.totalWords, totalSections: report.totalSections, averageWords: report.averageWords }, null, 2));
