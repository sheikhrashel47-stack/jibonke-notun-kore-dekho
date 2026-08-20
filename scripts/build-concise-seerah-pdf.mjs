import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const chapterDir = path.join(root, "client/src/data/seerah-chapters");
const files = (await fs.readdir(chapterDir)).filter(f => f.endsWith(".ts")).sort();
const chapters = [];
for (const file of files) {
  const source = await fs.readFile(path.join(chapterDir, file), "utf8");
  const start = source.indexOf("const chapter: BookChapter = ") + "const chapter: BookChapter = ".length;
  const end = source.lastIndexOf(";\n\nexport default chapter");
  if (start < 0 || end < 0) throw new Error(`Cannot parse ${file}`);
  chapters.push(JSON.parse(source.slice(start, end)));
}
chapters.sort((a, b) => a.number - b.number);
const esc = (s) => String(s).replace(/\\/g, "\\\\").replace(/\n/g, "\n");
const lines = [];
lines.push("% মুহাম্মদ ﷺ — একটি পূর্ণাঙ্গ সীরাত (সংক্ষিপ্ত গবেষণাভিত্তিক সংস্করণ)");
lines.push("");
lines.push("# মুহাম্মদ ﷺ");
lines.push("");
lines.push("## একটি পূর্ণাঙ্গ সীরাত — সংক্ষিপ্ত গবেষণাভিত্তিক সংস্করণ");
lines.push("");
lines.push("**JIBON Editorial**");
lines.push("");
lines.push("> এই সংস্করণটি কুরআন, হাদিস, প্রাথমিক সীরাত ঐতিহ্য এবং আধুনিক source criticism-এর সীমা সচেতনভাবে মেনে লেখা হয়েছে। প্রতিষ্ঠিত report, দীর্ঘ ঐতিহ্যে সংরক্ষিত report এবং অনিশ্চিত detail একসঙ্গে মেশানো হয়নি। এটি devotional reflection ও historical reading-এর সহায়ক; ফিকহি ফতোয়া বা রাজনৈতিক প্রচারপত্র নয়।");
lines.push("");
lines.push("## পাঠ-পদ্ধতি");
lines.push("");
lines.push("সীরাত পাঠের সময় কুরআনের সরাসরি উল্লেখ, সহিহ হাদিসের report, প্রাথমিক biography/maghazi tradition এবং পরবর্তী popular narrative আলাদা করা জরুরি। এই বইয়ে কোনো invented dialogue, cinematic private thought, অপ্রমাণিত exact number বা source-বিহীন অলৌকিক detail ব্যবহার করা হয়নি। মতভেদ থাকলে তা পাঠকের সামনে রাখা হয়েছে।");
lines.push("");
lines.push("---");
lines.push("");
for (const chapter of chapters) {
  lines.push(`# অধ্যায় ${String(chapter.number).padStart(2, "0")}: ${chapter.title}`);
  lines.push("");
  lines.push(`*${chapter.subtitle}*`);
  lines.push("");
  for (const section of chapter.sections) {
    lines.push(`## ${section.title}`);
    lines.push("");
    for (const block of section.blocks) lines.push(block.content, "");
  }
  lines.push("### উৎস-ইঙ্গিত");
  lines.push("");
  for (const note of chapter.sourceNotes) lines.push(`- ${note}`);
  lines.push("");
  lines.push("### অনিশ্চয়তা ও পাঠ-সতর্কতা");
  lines.push("");
  for (const note of chapter.uncertaintyNotes) lines.push(`- ${note}`);
  lines.push("");
  lines.push("### পাঠ-পরবর্তী reflection");
  lines.push("");
  lines.push(chapter.readerReflection, "");
  lines.push("---", "");
}
lines.push("# পরিশিষ্ট: উৎস ও পাঠকের জন্য নোট");
lines.push("");
lines.push("এই বইয়ের source policy তৈরিতে নিম্নলিখিত public sources ব্যবহার করা হয়েছে:");
lines.push("");
lines.push("1. [A Critical and Historical Overview of the Sīrah Genre from the Classical to the Modern Period](https://www.mdpi.com/2077-1444/13/3/196) — সীরাতের genre, transmission ও source criticism-এর scholarly overview।");
lines.push("2. [Primary Sources on the Life of Muhammad](https://pressbooks.ulib.csuohio.edu/premodernmiddleeast/chapter/chapter-2-excerpts-from-the-quran/) — Qur'an, Constitution of Medina এবং primary/secondary source distinction নিয়ে academic teaching chapter।");
lines.push("3. [Biography of the Prophet Muhammad](https://pressbooks.ulib.csuohio.edu/premodernmiddleeast/chapter/chapter-1/) — Ibn Ishaq/Ibn Hisham tradition ও editorial transmission-এর overview।");
lines.push("4. [Sahih al-Bukhari, Book 1: Revelation](https://sunnah.com/bukhari/1) — প্রথম ওহি, খাদিজা রাদিয়াল্লাহু আনহা ও ওয়ারাকার reported narrative।");
lines.push("5. [Qur'an 9:40](https://quran.com/at-tawbah/40) — হিজরত ও গুহার কুরআনিক anchor।");
lines.push("6. [Sahih al-Bukhari 1741](https://sunnah.com/bukhari:1741) — Day of Nahr-এর sermon report ও blood/property sanctity।");
lines.push("");
lines.push("> **দ্রষ্টব্য:** এই সংস্করণটি ইচ্ছাকৃতভাবে সংক্ষিপ্ত। এটিকে ১,০০০-পৃষ্ঠার পূর্ণাঙ্গ scholarly edition হিসেবে দাবি করা হচ্ছে না। দীর্ঘ সংস্করণ তৈরি করতে আরও manuscript research, hadith grading, Arabic edition comparison এবং editorial review প্রয়োজন হবে।");
const md = lines.join("\n");
const mdPath = path.join(root, "seerah-concise.md");
await fs.writeFile(mdPath, md, "utf8");
console.log(`Wrote ${mdPath} with ${chapters.length} chapters and ${md.split(/\s+/).length} words.`);
