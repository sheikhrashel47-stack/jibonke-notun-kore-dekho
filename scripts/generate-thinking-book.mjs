import { mkdir, writeFile, readFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const outputDir = '/home/ubuntu/book_project/the_art_of_thinking_300_chapters';
const model = 'gpt-5';
const apiBase = process.env.OPENAI_API_BASE;
const apiKey = process.env.OPENAI_API_KEY;

if (!apiBase || !apiKey) {
  throw new Error('OPENAI_API_BASE অথবা OPENAI_API_KEY পাওয়া যায়নি।');
}

const chapters = [
  ['I', 'নিজের চিন্তাকে দেখা', '01', 'তুমি যা ভাবছো, সব কি সত্যি?', 'reality, perception, interpretation, assumption, belief ও perspective'],
  ['I', 'নিজের চিন্তাকে দেখা', '02', 'মস্তিষ্ক তোমার জন্য Shortcut নেয়', 'heuristics, automatic thinking, deliberate thinking, System 1 ও System 2'],
  ['I', 'নিজের চিন্তাকে দেখা', '03', 'Emotion যখন চিন্তার Steering Wheel ধরে', 'fear, anger, excitement, anxiety, desire ও emotional reasoning'],
  ['I', 'নিজের চিন্তাকে দেখা', '04', 'তোমার মস্তিষ্ক তোমাকেই কীভাবে ভুল বোঝায়', 'confirmation bias, availability, anchoring, overconfidence ও self-serving bias'],
  ['I', 'নিজের চিন্তাকে দেখা', '05', 'Pause — চিন্তার প্রথম শক্তি', 'থামা, পর্যবেক্ষণ, প্রশ্ন, চিন্তা ও সিদ্ধান্তের Thinking Pause System'],
  ['II', 'সত্যকে পরিষ্কারভাবে দেখা', '06', 'Fact, Opinion নাকি Assumption?', 'fact, opinion, assumption ও interpretation; social-media argument'],
  ['II', 'সত্যকে পরিষ্কারভাবে দেখা', '07', 'প্রমাণ কোথায়?', 'evidence, source, reliability, anecdote, data ও expert opinion'],
  ['II', 'সত্যকে পরিষ্কারভাবে দেখা', '08', 'একটা ঘটনা কি সত্যিই আরেকটার কারণ?', 'correlation, causation, coincidence ও confounding variables'],
  ['II', 'সত্যকে পরিষ্কারভাবে দেখা', '09', 'একটা গল্প দিয়ে কি সত্য প্রমাণ হয়?', 'anecdotal thinking, survivorship bias, selection bias ও emotional evidence'],
  ['II', 'সত্যকে পরিষ্কারভাবে দেখা', '10', 'আমি কীভাবে ভুল হতে পারি?', 'intellectual humility, uncertainty, evidence ও belief updating'],
  ['III', 'Logic & Argument', '11', 'একটি ভালো Argument কীভাবে তৈরি হয়?', 'claim, evidence, reasoning ও conclusion'],
  ['III', 'Logic & Argument', '12', 'Logical Fallacy-এর অদৃশ্য ফাঁদ', 'ad hominem, strawman, false dilemma, slippery slope, circular reasoning ও appeal to authority'],
  ['III', 'Logic & Argument', '13', '“তুমি তো এটা বলোনি!”', 'strawman; original argument ও distorted version-এর dialogue'],
  ['III', 'Logic & Argument', '14', 'দুইটা option দেখলেই কি দুইটাই option?', 'false dilemma ও তৃতীয় বিকল্প খোঁজা'],
  ['III', 'Logic & Argument', '15', 'কথার জোর বনাম যুক্তির জোর', 'confidence, charisma, authority, persuasion ও evidence'],
  ['IV', 'গভীর চিন্তা', '16', 'First Principles Thinking', 'assumption ভেঙে fundamental truth-এ নামা; study, career, business ও everyday problem'],
  ['IV', 'গভীর চিন্তা', '17', 'Second-Order Thinking', 'first, second ও third consequence; এরপর কী হবে?'],
  ['IV', 'গভীর চিন্তা', '18', 'Inversion', 'success লক্ষ্য থেকে failure prevention-এর দিকে উল্টো চিন্তা'],
  ['IV', 'গভীর চিন্তা', '19', 'Mental Models', 'opportunity cost, incentives, compounding, margin of safety, feedback loops ও diminishing returns'],
  ['IV', 'গভীর চিন্তা', '20', 'বড় সমস্যাকে ছোট করো', 'define, break down, root cause, options, test ও improve'],
  ['V', 'সিদ্ধান্ত নেওয়ার শিল্প', '21', 'সঠিক সিদ্ধান্ত বনাম ভালো ফল', 'decision quality, outcome, luck, uncertainty ও process'],
  ['V', 'সিদ্ধান্ত নেওয়ার শিল্প', '22', 'Opportunity Cost', 'প্রতিটি yes-এর ভেতরের no; study, career, money, time ও relationship'],
  ['V', 'সিদ্ধান্ত নেওয়ার শিল্প', '23', 'Sunk Cost Trap', 'past cost বনাম future value'],
  ['V', 'সিদ্ধান্ত নেওয়ার শিল্প', '24', 'Risk, Probability & Uncertainty', 'risk, probability, uncertainty, expected value, base rate ও best/worst case'],
  ['V', 'সিদ্ধান্ত নেওয়ার শিল্প', '25', 'The Decision Framework', 'define, gather, question, options, consequences, trade-off, decide ও review'],
  ['VI', 'ব্যতিক্রমী চিন্তক হওয়া', '26', 'নিজের Belief-কে আদালতে দাঁড় করাও', 'belief audit, evidence, counter-evidence ও assumption'],
  ['VI', 'ব্যতিক্রমী চিন্তক হওয়া', '27', 'Strong Opinion, Loosely Held', 'strong reasoning, intellectual flexibility ও belief updating'],
  ['VI', 'ব্যতিক্রমী চিন্তক হওয়া', '28', 'চাপের মধ্যে কীভাবে চিন্তা করবে', 'exam, money, relationship, career, conflict ও pressure thinking system'],
  ['VI', 'ব্যতিক্রমী চিন্তক হওয়া', '29', 'The Thinking Toolkit', 'bias detector, evidence checker, decision matrix, assumption tester, inversion, pre-mortem ও post-mortem'],
  ['VI', 'ব্যতিক্রমী চিন্তক হওয়া', '30', 'The Thinking Mind', 'প্রথম প্রশ্নে ফিরে যাওয়া; নিজের মনকে প্রশ্ন করা ও শান্ত, সাহিত্যিক সমাপ্তি'],
];

const sourceGuardrails = `
গবেষণা-সতর্কতা: cognitive bias, critical thinking বা judgement নিয়ে সার্বজনীন দাবি করবে না। "মানুষ সবসময়" লিখবে না; "অনেক পরিস্থিতিতে", "প্রায়ই", বা "গবেষণায় এমন প্রবণতা দেখা যায়" লিখবে। এই বইয়ের composite গল্পগুলো কাল্পনিক কিন্তু বাস্তবসম্মত—তাকে গবেষণার ফল বলে চালাবে না। চিকিৎসা, আইন, কর বা বিনিয়োগে ব্যক্তিগত prescription দেবে না।

বইয়ের বাস্তব গবেষণা নোট: cognitive bias সিদ্ধান্তে systematic error আনতে পারে, প্রভাব situation-ভেদে বদলায় (Berthet, 2022); expertise bias-শূন্যতার নিশ্চয়তা নয় (APA); critical thinking মানে assumption প্রশ্ন, evidence মূল্যায়ন ও বিকল্প ব্যাখ্যা বিবেচনা (Gómez et al.); active open-mindedness fallacy detection-এর সঙ্গে সম্পর্কিত, তবে এটি বুদ্ধিমত্তার একমাত্র মাপকাঠি নয় (PMC 2024)।
`;

function chapterPrompt([part, partTitle, number, title, topics]) {
  return `তুমি “THE ART OF THINKING — সঠিকভাবে ভাবার শিল্প” নামের একটি premium Bengali narrative nonfiction বই লিখছো। এটি chapter ${number}: “${title}”; Part ${part}: “${partTitle}”।

এই অধ্যায়ের intellectual focus: ${topics}।

একটি সম্পূর্ণ, প্রকাশযোগ্য Bengali Markdown chapter লেখো (প্রায় 1,100–1,500 বাংলা শব্দ)। ভাষা সহজ, প্রাঞ্জল, সাহিত্যিক, শান্ত ও পর্যবেক্ষণশীল হবে—অনুবাদ-ঘেঁষা বা textbook-এর মতো নয়। শুরু হবে একটি নতুন, বাস্তবসম্মত composite scene বা সংলাপ দিয়ে; তারপর surprise/question, তারপর concept, counterexample, প্রয়োগ এবং একটি memorable closing। গল্পটি যেন সত্যিই concept বোঝায়। হালকা, সূক্ষ্ম humour সর্বোচ্চ একবার ব্যবহার করা যায়।

অবশ্যই বৈচিত্র্যপূর্ণভাবে এই অংশগুলো দেবে: (১) গল্প/scene, (২) অন্তত দুইটি explanatory subheading, (৩) “💭 THINK” বা “🪤 THINKING TRAP” নামে একটি মূল্যবান box, (৪) “🛠️ THINKING TOOL” নামে 2–5 মিনিটের ব্যবহারযোগ্য পদ্ধতি, (৫) “💡 LIFE INSIGHT” নামে সংক্ষিপ্ত literary observation। প্রয়োজনে একটি ছোট ASCII flow ব্যবহার করা যায়, কিন্তু table নয়। Chapter 05 হলে অবশ্যই STOP → OBSERVE → QUESTION → THINK → DECIDE system দেবে। Chapter 07-এ Evidence Ladder, Chapter 11-এ claim→evidence→reasoning→conclusion, Chapter 17-এ consequence chain, Chapter 20-এ problem-solving system, Chapter 25-এ decision framework, Chapter 28-এ pressure thinking system, Chapter 29-এ compact toolkit দেবে। Chapter 30-এ আগের chapters list করবে না; প্রথম chapter-এর question-এ ফিরে শান্ত ও original conclusion দেবে।

কোনো fabricated study, statistic, quote, researcher বা bibliography লিখবে না। নিজেকে লেখক বা AI বলবে না। "আজকের এই ব্যস্ত জীবনে", "চলুন জেনে নিই", "এখানে মূল বিষয় হলো"—এসব cliché ব্যবহার করবে না। একই বাক্য/রূপক পুনরাবৃত্তি করবে না।
${sourceGuardrails}
Markdown ছাড়া কোনো preface বা commentary দেবে না।`;
}

async function callModel(prompt) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(`${apiBase.replace(/\/$/, '')}/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: 'You are a careful Bengali literary nonfiction author and fact-aware editor. Return only the requested Markdown.' },
            { role: 'user', content: prompt },
          ],
          max_completion_tokens: 6500,
          extra_body: { reasoning: { effort: 'low' } },
        }),
      });
      if (!response.ok) throw new Error(`${response.status}: ${await response.text()}`);
      const payload = await response.json();
      const text = payload?.choices?.[0]?.message?.content?.trim();
      if (!text || text.length < 2400) throw new Error('Output অসম্পূর্ণ বা খুব ছোট হয়েছে।');
      return text;
    } catch (error) {
      lastError = error;
      await new Promise(resolve => setTimeout(resolve, attempt * 1500));
    }
  }
  throw lastError;
}

async function oneChapter(data) {
  const [, , number, title] = data;
  const filename = `chapter-${number}.md`;
  const target = join(outputDir, filename);
  try {
    await access(target);
    const existing = await readFile(target, 'utf8');
    if (existing.length > 5000) {
      console.log(`skip ${number} — existing manuscript retained`);
      return;
    }
  } catch {}
  console.log(`writing ${number}: ${title}`);
  const content = `# অধ্যায় ${number}\n\n## ${title}\n\n${await callModel(chapterPrompt(data))}\n`;
  await writeFile(target, content, 'utf8');
  console.log(`done ${number}`);
}

await mkdir(outputDir, { recursive: true });
await writeFile(join(outputDir, 'chapter-plan.json'), JSON.stringify(chapters.map(([part, partTitle, number, title, topics]) => ({ part, partTitle, number, title, topics })), null, 2));

const workers = 3;
for (let i = 0; i < chapters.length; i += workers) {
  await Promise.all(chapters.slice(i, i + workers).map(oneChapter));
}

console.log('All chapter manuscripts are ready.');
