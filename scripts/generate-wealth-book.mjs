import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = path.resolve(new URL("..", import.meta.url).pathname);
const sourceBlueprint = "/home/ubuntu/upload/pasted_content.txt";
const outputDir = path.join(projectRoot, "client/src/data/wealth-chapters");
const chapterPlanPath = path.join(projectRoot, "client/src/data/wealth-chapter-plan.json");
const model = "gpt-5-mini";
const apiBase = process.env.OPENAI_API_BASE;
const apiKey = process.env.OPENAI_API_KEY;
const workers = Number(process.env.WEALTH_WORKERS || 4);
const limit = Number(process.env.WEALTH_LIMIT || 0);

if (!apiBase || !apiKey) throw new Error("OPENAI_API_BASE অথবা OPENAI_API_KEY পাওয়া যায়নি।");

const partNotes = {
  1: "টাকার সঙ্গে মানুষের আবেগ, বিশ্বাস, পরিচয় এবং আচরণকে একসঙ্গে দেখাও।",
  2: "wealth-কে value, skill, capital, ownership ও time-এর ফল হিসেবে ব্যাখ্যা করো; এটি literal formula নয়।",
  3: "active, scalable ও asset-based income-এর পার্থক্য দেখাও; passive income নিয়ে অতিরঞ্জন কোরো না।",
  4: "দক্ষতা কীভাবে value, demand এবং earning power-এ রূপ নেয়—বাস্তব শেখার পথসহ দেখাও।",
  5: "job, career, human capital, reputation এবং network-এর দীর্ঘমেয়াদি compounding বোঝাও।",
  6: "problem থেকে solution, customer value, revenue এবং profit—ব্যবসার বাস্তব যুক্তি দেখাও।",
  7: "idea নয়, market validation, unit economics, risk এবং ছোট পরীক্ষার গুরুত্ব বোঝাও।",
  8: "cash flow, budget, emergency fund, debt এবং financial safety-কে আগে রাখো।",
  9: "saving rate, lifestyle inflation এবং capital formation নিয়ে সংখ্যাসহ ব্যবহারিক ব্যাখ্যা দাও।",
  10: "saving ও investing-এর পার্থক্য, risk-return, asset classes, diversification ও দীর্ঘমেয়াদি discipline ব্যাখ্যা করো।",
  11: "stock মানে ownership; revenue, profit, valuation ও অনিশ্চয়তা নিয়ে stock tips দিও না।",
  12: "bonds, mutual funds, index funds, REITs এবং asset allocation-এর ধারণাগত পার্থক্য দেখাও; বর্তমান product recommendation নয়।",
  13: "real estate, land, gold ও physical assets-এর liquidity, ownership, maintenance ও concentration risk বোঝাও।",
  14: "compound interest, time, consistency এবং skill/capital compounding-এর illustrative math দেখাও; return guarantee নয়।",
  15: "risk, diversification, insurance, emergency planning এবং financial ruin এড়ানোর safety-first thinking শেখাও।",
  16: "inflation, purchasing power, interest, tax এবং real return-এর ধারণা বোঝাও; current rules-এর জন্য official sources দেখতে বলো।",
  17: "একটি শক্তিশালী income engine থেকে ধীরে ধীরে multiple income ও asset system তৈরি করার logic দেখাও।",
  18: "lifestyle inflation, consumer debt, scams, get-rich-quick claims এবং emotional investing-এর traps চেনাও।",
  19: "financial dashboard, monthly system, automation, investment routine এবং annual review-এর মতো repeatable system তৈরি করো।",
  20: "প্রথম সঞ্চয় থেকে দীর্ঘমেয়াদি wealth journey, preservation, choice, time ও responsibility-এর দিকে সমাপ্তি টানো।",
};

const sectionTitles = [
  "একটি পরিচিত দৃশ্য",
  "বড় প্রশ্নটি",
  "সহজ করে বোঝা",
  "একটি illustrative case study",
  "আজকের প্রয়োগ",
  "এক মিনিটের wealth lesson",
];

const schema = {
  type: "object",
  properties: {
    sections: {
      type: "array",
      minItems: 5,
      maxItems: 6,
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          paragraphs: { type: "array", minItems: 1, maxItems: 5, items: { type: "string" } },
        },
        required: ["title", "paragraphs"],
        additionalProperties: false,
      },
    },
    exercise: {
      type: "object",
      properties: { title: { type: "string" }, prompt: { type: "string" } },
      required: ["title", "prompt"],
      additionalProperties: false,
    },
    oneMinute: { type: "string" },
  },
  required: ["sections", "exercise", "oneMinute"],
  additionalProperties: false,
};

function parseBlueprint(text) {
  const lines = text.replace(/\r/g, "").split("\n");
  const chapters = [];
  let currentPart = 0;
  let currentPartTitle = "";
  for (let i = 0; i < lines.length; i += 1) {
    const partMatch = lines[i].trim().match(/^PART\s+(\d+)$/i);
    if (partMatch && lines[i + 1]) {
      currentPart = Number(partMatch[1]);
      currentPartTitle = lines[i + 1].trim();
    }
    const chapterMatch = lines[i].trim().match(/^CHAPTER\s+(\d+)$/i);
    if (chapterMatch && lines[i + 1]) {
      const number = Number(chapterMatch[1]);
      chapters.push({
        id: String(number).padStart(2, "0"),
        number,
        title: lines[i + 1].trim(),
        part: currentPart,
        partTitle: currentPartTitle,
        focus: partNotes[currentPart] || "বিষয়টি সহজ ভাষায়, সংখ্যাসহ ও বাস্তব জীবনের সিদ্ধান্তের সঙ্গে যুক্ত করে বোঝাও।",
      });
    }
  }
  return chapters.filter((chapter, index, all) => all.findIndex((item) => item.number === chapter.number) === index).sort((a, b) => a.number - b.number);
}

function cleanText(value) {
  return String(value || "").replace(/^\s+|\s+$/g, "").replace(/\n{3,}/g, "\n\n");
}

function wordCount(chapter) {
  return chapter.sections.flatMap((section) => section.blocks.map((block) => block.content)).join(" ").split(/\s+/).filter(Boolean).length;
}

function fallbackContent(chapter) {
  return {
    sections: [
      { title: sectionTitles[0], paragraphs: [`একদিন সন্ধ্যায় ${chapter.title} নিয়ে ভাবতে বসেছিল নীলা। তার সামনে একই সঙ্গে অনেক পথ—কিছু দ্রুত, কিছু নিরাপদ, কিছু কেবল চকচকে। সে বুঝল, টাকার সিদ্ধান্ত আসলে শুধু টাকা নিয়ে নয়; সিদ্ধান্তটি তার সময়, মনোযোগ, ঝুঁকি ও ভবিষ্যৎ পছন্দকে বদলে দেবে।`] },
      { title: sectionTitles[1], paragraphs: [`${chapter.title} বুঝতে গেলে প্রথম প্রশ্ন হওয়া উচিত: এই ধারণাটি আমার আয়, খরচ, সঞ্চয়, দক্ষতা বা সম্পদের কোন জায়গায় প্রভাব ফেলছে? উত্তরটি এক লাইনে না এলে তাড়াহুড়ো না করে সমস্যাটিকে ছোট করো।`] },
      { title: sectionTitles[2], paragraphs: [`${partNotes[chapter.part] || "বিষয়টি ধীরে ও বাস্তব উদাহরণে বোঝো।"} কোনো ধারণা শুনলেই সেটিকে সত্য, সহজ বা সবার জন্য প্রযোজ্য ধরে নেওয়া ঠিক নয়। নিজের পরিস্থিতি, সময়সীমা, ঝুঁকি সহ্যক্ষমতা এবং বিকল্প পথ লিখে তারপর সিদ্ধান্ত নাও।`] },
      { title: sectionTitles[3], paragraphs: [`ILLUSTRATIVE CASE STUDY: আরিফ মাসে ৪০,০০০ টাকা আয় করে। সে প্রথমে খরচের তালিকা করে, জরুরি সঞ্চয়ের লক্ষ্য ঠিক করে এবং ${chapter.title}-এর সঙ্গে সম্পর্কিত একটি ছোট পদক্ষেপ নেয়। এক মাসের ফলকে চূড়ান্ত সাফল্য না ধরে সে তিন মাস পর পর নিজের ব্যবস্থা পর্যালোচনা করে।`] },
      { title: sectionTitles[4], paragraphs: [`আজ ১৫ মিনিটে একটি পাতায় লিখো: এখন কোথায় আছ, কী ঝুঁকি আছে, কোন তথ্য এখনও জানো না, এবং আগামী সাত দিনে কোন ছোট পদক্ষেপ নেওয়া যায়। ব্যক্তিগত আর্থিক সিদ্ধান্তের ক্ষেত্রে প্রয়োজন হলে যোগ্য পেশাদার ও official source-এর সহায়তা নাও।`] },
      { title: sectionTitles[5], paragraphs: [`IF YOU REMEMBER ONLY ONE THING: ${chapter.title} কোনো magic formula নয়; এটি নিজের বাস্তবতা বুঝে ছোট, যাচাইযোগ্য ও ঝুঁকি-সচেতন পদক্ষেপ নেওয়ার অনুশীলন।`] },
    ],
    exercise: { title: "নিজের wealth note", prompt: `আজ ${chapter.title} নিয়ে নিজের বর্তমান অবস্থার তিনটি সত্য, দুটি প্রশ্ন এবং একটি পরের পদক্ষেপ লিখো।` },
    oneMinute: `${chapter.title} বুঝতে হলে নিজের সংখ্যা, সময় ও ঝুঁকিকে একই পাতায় আনো।`,
  };
}

function buildPrompt(chapter) {
  return `তুমি “THE WEALTH CODE — শূন্য থেকে সম্পদ গড়ার বিজ্ঞান” নামের একটি premium practical Bengali financial-education e-book লিখছো। এটি Part ${String(chapter.part).padStart(2, "0")}: “${chapter.partTitle}”, Chapter ${chapter.id}: “${chapter.title}”।

এই অধ্যায়ের editorial direction: ${chapter.focus}

একটি সম্পূর্ণ, প্রকাশযোগ্য, সংক্ষিপ্ত কিন্তু গভীর বাংলা chapter lesson লেখো। ভাষা হবে স্বাভাবিক, উষ্ণ, পরিষ্কার এবং story-driven; অনুবাদ-ঘেঁষা, motivational speech বা bank brochure-এর মতো হবে না। অধ্যায়টি প্রায় 650–900 বাংলা শব্দের হবে, কিন্তু অপ্রয়োজনীয় পুনরাবৃত্তি করবে না। Output JSON schema অনুযায়ী শুধু JSON দেবে।

প্রতিটি section-এর paragraphs-এ সাধারণ মানুষের বাস্তব composite scene, সহজ ব্যাখ্যা, একটি counterexample বা trade-off, এবং প্রয়োজন হলে ছোট illustrative number দাও। Illustrative case study স্পষ্টভাবে কাল্পনিক হিসেবে label করো। কোনো stock tip, guaranteed return, market timing, crypto hype, MLM, gambling বা ব্যক্তিগত financial advice দেবে না। Current tax, inflation, interest rate বা regulation-এর নির্দিষ্ট সংখ্যা দেবে না; কেবল official source যাচাই করার কথা বলবে। Financial education disclaimer-এর ভাব বজায় রাখবে: ফলাফল income, behavior, risk, time ও circumstances-এর উপর নির্ভর করে।

খুব সতর্ক থেকো: “সবসময়”, “নিশ্চিতভাবে ধনী”, “zero risk”, “দ্রুত দ্বিগুণ” ধরনের দাবি লিখবে না। Formula বা সংখ্যা দিলে assumption স্পষ্ট করো এবং return guarantee নয়—এটি বলো। শেষ section-এ “IF YOU REMEMBER ONLY ONE THING:” দিয়ে একটি স্মরণযোগ্য বাক্য দাও। Exercise-টি যেন 10–15 মিনিটে করা যায়।`;
}

async function callModel(prompt) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(`${apiBase.replace(/\/$/, "")}/chat/completions`, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: "You are a careful Bengali narrative nonfiction author and fact-aware financial education editor. Return only valid JSON matching the schema." },
            { role: "user", content: prompt },
          ],
          response_format: { type: "json_schema", json_schema: { name: "wealth_chapter", strict: true, schema } },
          max_completion_tokens: 5000,
        }),
      });
      if (!response.ok) throw new Error(`${response.status}: ${await response.text()}`);
      const payload = await response.json();
      const raw = payload?.choices?.[0]?.message?.content;
      if (!raw) throw new Error("Model returned empty content");
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed.sections) || parsed.sections.length < 5) throw new Error("Chapter sections are incomplete");
      return parsed;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
    }
  }
  throw lastError;
}

function toModule(chapter, content) {
  const sections = content.sections.map((section, index) => ({
    id: `section-${index + 1}`,
    title: cleanText(section.title),
    blocks: (section.paragraphs || []).map((paragraph) => ({ type: "paragraph", content: cleanText(paragraph) })).filter((block) => block.content),
  })).filter((section) => section.blocks.length);
  const exercises = [{ title: cleanText(content.exercise?.title || "নিজের wealth note"), prompt: cleanText(content.exercise?.prompt || `আজ ${chapter.title} নিয়ে নিজের একটি ছোট পদক্ষেপ লিখো।`) }];
  const data = {
    id: chapter.id,
    number: chapter.number,
    title: chapter.title,
    subtitle: `Part ${String(chapter.part).padStart(2, "0")} · ${chapter.partTitle}`,
    readingMinutes: 8,
    wordCount: 0,
    sections,
    exercises,
  };
  data.wordCount = wordCount(data);
  data.readingMinutes = Math.max(5, Math.round(data.wordCount / 170));
  return `/* THE WEALTH CODE — generated from the user's Bengali book blueprint. */\nimport type { BookChapter } from "../book";\n\nconst chapter: BookChapter = ${JSON.stringify(data, null, 2)};\n\nexport default chapter;\n`;
}

async function main() {
  const blueprint = await fs.readFile(sourceBlueprint, "utf8");
  const chapters = parseBlueprint(blueprint);
  if (chapters.length !== 100) throw new Error(`Expected 100 chapters, found ${chapters.length}`);
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(chapterPlanPath, JSON.stringify(chapters, null, 2), "utf8");
  const selected = limit > 0 ? chapters.slice(0, limit) : chapters;
  let cursor = 0;
  async function worker() {
    while (true) {
      const chapter = selected[cursor++];
      if (!chapter) return;
      const target = path.join(outputDir, `chapter-${chapter.id}.ts`);
      try {
        const existing = await fs.readFile(target, "utf8");
        if (existing.length > 1800) {
          console.log(`skip ${chapter.id} — existing module retained`);
          continue;
        }
      } catch {}
      console.log(`writing ${chapter.id}: ${chapter.title}`);
      let content;
      try {
        content = await callModel(buildPrompt(chapter));
      } catch (error) {
        console.error(`fallback ${chapter.id}: ${error.message}`);
        content = fallbackContent(chapter);
      }
      await fs.writeFile(target, toModule(chapter, content), "utf8");
      console.log(`done ${chapter.id}`);
    }
  }
  await Promise.all(Array.from({ length: Math.max(1, workers) }, worker));
  console.log(`Generated or retained ${selected.length} wealth chapters.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
