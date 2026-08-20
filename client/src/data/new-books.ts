import type { BookChapter, ChapterMeta, WorkbookExercise } from "./book";

const releaseBase = "https://github.com/sheikhrashel47-stack/jibonke-notun-kore-dekho/releases/download/store-assets-six-books-v1";

type PublishedBook = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: "জীবনচর্চা" | "মনোবিজ্ঞান" | "চিন্তা ও সিদ্ধান্ত";
  creator: string;
  cover: string;
  accent: string;
  accentSoft: string;
  chapters: ChapterMeta[];
  chapterLoaders: Record<string, () => Promise<{ default: BookChapter }>>;
  workbookExercises: WorkbookExercise[];
  totalReadingMinutes: number;
  pdfUrl: string;
  pdfPageCount: number;
  learningOutcomes: string[];
};

const exercises = (title: string, prompt: string): WorkbookExercise[] => [{ title, prompt }];
const chapterMeta = (id: string, number: number, title: string, subtitle: string): ChapterMeta => ({ id, number, title, subtitle, readingMinutes: 12 });
const chapter = (id: string, number: number, title: string, subtitle: string, sections: BookChapter["sections"], exercise: WorkbookExercise): BookChapter => ({ id, number, title, subtitle, readingMinutes: 12, wordCount: sections.reduce((sum, section) => sum + section.blocks.reduce((inner, block) => inner + block.content.length, 0), 0), sections, exercises: [exercise] });
const para = (content: string) => ({ type: "paragraph" as const, content });
const sub = (content: string) => ({ type: "subheading" as const, content });
const image = (content: string, alt: string) => ({ type: "image" as const, content, alt });

const visualEntries = [
  ["মুখোশের আড়ালে", "আমরা সমাজকে খুশি করতে গিয়ে নিজের আসল রূপ লুকিয়ে ফেলি।", "book1_001.webp", "তুমি কি নিজের অনুভূতিকে লুকিয়ে হাসিমুখের মুখোশ পরে আছো?"],
  ["আয়নার ওপাশে", "নিজের ভুলের মুখোমুখি হওয়াই পরিবর্তনের প্রথম শর্ত।", "book1_002.webp", "তুমি কি নিজের সর্বশেষ ভুলটির দায় স্বীকার করেছো?"],
  ["নিজের ছায়া", "অতীতকে ভয় না পেয়ে তাকে নিজের অংশ হিসেবে গ্রহণ করতে হয়।", "book1_003.webp", "তোমার অতীতের কোন ছায়া এখনো তোমাকে অনুসরণ করে?"],
  ["ভাঙা মূর্তি", "অপূর্ণতাই অনেক সময় মানুষের সবচেয়ে অনন্য সৌন্দর্য।", "book1_004.webp", "তোমার কোন ক্ষতচিহ্ন তোমাকে আজকের মানুষ করেছে?"],
  ["শূন্য খাঁচা", "খাঁচার দরজা খোলা থাকলেও ভয় আমাদের বন্দি রাখে।", "book1_005.webp", "তোমার জীবনের কোন খাঁচার দরজা আসলে খোলা?"],
  ["সুতোর টান", "অন্যের ইচ্ছায় বাঁচলে নিজের জীবনের গল্প লেখা যায় না।", "book1_006.webp", "তোমার কোন সিদ্ধান্ত অন্যের অদৃশ্য সুতোর টানে নেওয়া?"],
  ["অন্ধকারের আলো", "কঠিন সময়ের ভেতরেই নিজের শক্তি দেখা যায়।", "book1_007.webp", "তোমার অন্ধকার সময় তোমাকে কী শিখিয়েছে?"],
  ["হারিয়ে যাওয়া শিশু", "বড় হওয়ার সঙ্গে সঙ্গে ভেতরের শিশুটিকে হারিয়ে ফেলো না।", "book1_008.webp", "শেষ কবে কোনো কারণ ছাড়াই আনন্দ পেয়েছিলে?"],
  ["প্রতিধ্বনি", "চারপাশের কোলাহল থেকে দূরে না গেলে নিজের কথা শোনা যায় না।", "book1_009.webp", "তুমি শেষ কবে নীরবে নিজের মনের কথা শুনেছিলে?"],
  ["নিজের সাথে পরিচয়", "নিজেকে চেনা একটি চলমান যাত্রা, কোনো চূড়ান্ত উত্তর নয়।", "book1_010.webp", "গত এক বছরে নিজের সম্পর্কে নতুন কী জেনেছো?"],
] as const;

const visualChapters: ChapterMeta[] = visualEntries.map((entry, index) => chapterMeta(String(index + 1).padStart(2, "0"), index + 1, entry[0], entry[1]));
const visualLoaders = Object.fromEntries(visualEntries.map((entry, index) => {
  const id = String(index + 1).padStart(2, "0");
  const [title, message, file, reflection] = entry;
  return [id, async () => {
    return { default: chapter(id, index + 1, title, "একটি ছবি দেখে থেমে নিজের জীবনের দিকে তাকানোর visual philosophy পাঠ", [
      { id: "visual", title: "ছবিটি আগে দেখো", blocks: [image(`${releaseBase}/${file}`, `${title} — visual philosophy illustration`), para(message)] },
      { id: "meaning", title: "ছবিটির গভীর অর্থ", blocks: [para(`${title} আমাদের মনে করিয়ে দেয় যে নিজের জীবনকে বাইরে থেকে দেখা যত সহজ, নিজের ভেতরের সত্যকে দেখা তত সহজ নয়। এই ছবির প্রতীকটি একটি নির্দিষ্ট উত্তর চাপিয়ে দেয় না; বরং তোমাকে নিজের অভিজ্ঞতা, ভয়, অভ্যাস ও সিদ্ধান্তের সঙ্গে মিলিয়ে ভাবতে আহ্বান জানায়। মানুষের জীবনে একই দৃশ্য ভিন্ন সময়ে ভিন্ন অর্থ বহন করতে পারে। আজ যে বিষয়টি দুর্বলতা মনে হচ্ছে, কিছুদিন পরে সেটিই হয়তো শেখার প্রমাণ হয়ে দাঁড়াবে। তাই ছবিটির সৌন্দর্যে থেমে থেকো না—নিজের জীবনে এর বাস্তব প্রতিধ্বনি খুঁজে দেখো।`)] },
      { id: "life", title: "বাস্তব জীবনে", blocks: [para(`একজন শিক্ষার্থী অন্যের ফলাফল দেখে নিজেকে ছোট ভাবতে পারে; আবার একজন চাকরিজীবী নিজের ইচ্ছার বদলে চারপাশের প্রত্যাশা পূরণ করতে পারে। দুটো ক্ষেত্রেই প্রশ্নটি একই: আমি কি নিজের সিদ্ধান্তটি বুঝে নিচ্ছি, নাকি কোনো অদৃশ্য চাপ আমাকে চালাচ্ছে?`), sub("একটু নিজের দিকে তাকাও"), para(reflection)] },
      { id: "action", title: "আজকের ছোট কাজ", blocks: [para("আজ দশ মিনিট ফোন দূরে রেখে এই ছবির সঙ্গে সম্পর্কিত নিজের একটি সত্য লিখে ফেলো। লেখাটি কাউকে দেখাতে হবে না; সত্যি হওয়াটাই যথেষ্ট।"), sub("মূল শিক্ষা"), para(message)] },
    ], { title: "নিজের জীবনের একটি সত্য লিখি", prompt: `আজ “${title}” ভাবনাটির সঙ্গে মিলে যায় এমন নিজের জীবনের একটি ঘটনা লিখো।` }) };
  }] as const;
}));

const simpleBook = (config: Omit<PublishedBook, "chapters" | "chapterLoaders" | "workbookExercises"> & { chapterData: Array<[string, string, string]> }): PublishedBook => {
  const chapters = config.chapterData.map((item, index) => chapterMeta(String(index + 1).padStart(2, "0"), index + 1, item[0], item[1]));
  const chapterLoaders = Object.fromEntries(config.chapterData.map((item, index) => {
    const id = String(index + 1).padStart(2, "0");
    return [id, async () => {
      return { default: chapter(id, index + 1, item[0], item[1], [
        { id: "opening", title: "একটি বাস্তব দৃশ্য", blocks: [para(item[2])] },
        { id: "framework", title: "ভাবনাটি খুলে দেখি", blocks: [para(`এই অধ্যায়ের বিষয়টি কোনো জাদুর সূত্র নয়। এটি নিজের আচরণ, সিদ্ধান্ত এবং সম্পর্ককে একটু বেশি সচেতনভাবে দেখার একটি ব্যবহারিক কাঠামো। ধারণাটি কাজে লাগাতে হলে প্রথমে নিজের বর্তমান অবস্থাকে নিরপেক্ষভাবে দেখতে হবে, তারপর একটি ছোট পরীক্ষা বেছে নিতে হবে। বড় পরিবর্তনের প্রতিশ্রুতির বদলে ছোট, মাপা যায় এমন পদক্ষেপ নাও এবং কয়েক দিন পরে কী বদলেছে তা নোট করো।`), sub("বাস্তবে প্রয়োগ"), para("আজকের একটি পরিস্থিতি বেছে নাও। কী ঘটেছে, তুমি কী ভেবেছো, কী করেছো এবং ফল কী হয়েছে—এই চারটি বাক্যে লিখে ফেলো।")] },
        { id: "reflection", title: "নিজের জীবনে মিলিয়ে দেখো", blocks: [para("নিজেকে দোষী বানানোর আগে পরিস্থিতির নকশাটি দেখো। কোথায় পরিবেশ, অভ্যাস, ভয় বা ভুল অনুমান তোমার সিদ্ধান্তকে প্রভাবিত করেছে? উত্তরটি নিখুঁত হতে হবে না; পরিষ্কার হলেই পরের পদক্ষেপ দেখা যায়।")] },
      ], { title: "আজকের প্রয়োগ", prompt: `“${item[0]}” বিষয়টি নিয়ে আজ একটি ছোট, নির্দিষ্ট পরীক্ষা নাও এবং ফল লিখে রাখো।` }) };
    }] as const;
  }));
  return { ...config, chapters, chapterLoaders, workbookExercises: exercises("সাপ্তাহিক ফিরে দেখা", "এই বইয়ের আজকের ধারণাটি আগামী সাত দিনে কোথায় প্রয়োগ করা যায় তা লিখে রাখো।") };
};

export const publishedBooks: Record<string, PublishedBook> = {
  visual: {
    id: "visual", title: "জীবনকে নতুন করে দেখা", subtitle: "300 Visual Philosophies — একটি ছবি, একটি থামা, একটি নতুন দৃষ্টি", description: "প্রতিটি visual metaphor পাঠককে নিজের জীবন, সিদ্ধান্ত ও পরিচয়ের দিকে নতুন করে তাকাতে আমন্ত্রণ জানায়।", longDescription: "এই visual philosophy edition দ্রুত শেষ করার জন্য নয়। একটি ছবি দেখে থামো, নিজের অভিজ্ঞতার সঙ্গে মিল খুঁজে দেখো, তারপর ছোট একটি উপলব্ধি নিয়ে এগিয়ে যাও।", category: "জীবনচর্চা", creator: "Zayan · JIBON Editorial", cover: `${releaseBase}/book1_001.webp`, accent: "#1B4332", accentSoft: "#E8F1E8", chapters: visualChapters, chapterLoaders: visualLoaders, workbookExercises: exercises("ছবির সঙ্গে নিজের গল্প", "যে visual ভাবনাটি আজ তোমাকে থামিয়েছে, তার সঙ্গে মিলে যায় এমন নিজের জীবনের একটি ঘটনা লিখে রাখো।"), totalReadingMinutes: 180, pdfUrl: "", pdfPageCount: 10, learningOutcomes: ["ছবির ভেতর layered meaning খুঁজে দেখা", "নিজের অভিজ্ঞতার সঙ্গে ভাবনার যোগ তৈরি করা", "reflection থেকে ছোট বাস্তব পদক্ষেপ নেওয়া"]
  },
  presence: simpleBook({ id: "presence", title: "THE PRESENCE CODE", subtitle: "নিজের ব্যক্তিত্ব, আত্মবিশ্বাস ও উপস্থিতিকে শক্তিশালী করার ব্যবহারিক বিজ্ঞান", description: "Self-respect, confidence, emotional control, assertiveness ও social intelligence নিয়ে ব্যবহারিক পাঠ।", longDescription: "শক্ত personality মানে loud personality নয়। এই বইটি নিজের ভিত্তি, standards, communication এবং integrity দিয়ে পরিণত presence তৈরি করার পথে নিয়ে যায়।", category: "মনোবিজ্ঞান", creator: "JIBON Editorial", cover: `${releaseBase}/book2_cover.webp`, accent: "#2F5D50", accentSoft: "#E7F1EC", totalReadingMinutes: 120, pdfUrl: "", pdfPageCount: 4, learningOutcomes: ["নিজের self-concept দেখা", "confidence ও arrogance আলাদা করা", "assertive ভাষা অনুশীলন"], chapterData: [["তুমি আসলে নিজেকে কীভাবে দেখো?", "Self-concept ও ভেতরের কণ্ঠস্বর", "তুমি একা থাকলে নিজের সঙ্গে কীভাবে কথা বলো? আত্মবিশ্বাসের শুরু বাইরের ভঙ্গিতে নয়, নিজের প্রতি ব্যবহার করা ভাষায়। ছোট ভুলকে চরিত্রের রায় না বানিয়ে শেখার তথ্য হিসেবে দেখা—এটাই ভিত গড়ে।"], ["Self-Concept কীভাবে তৈরি হয়?", "অতীতের feedback থেকে বর্তমানের পরিচয়", "শৈশবের প্রশংসা, সমালোচনা ও তুলনা আমাদের নিজের সম্পর্কে ধারণা তৈরি করে; কিন্তু নতুন অভিজ্ঞতা ও ছোট সাফল্য দিয়ে সেই ধারণা বদলানো যায়।"], ["অন্যের Opinion-এর হাতে নিজের মূল্য তুলে দেওয়া", "Approval-seeking থেকে self-respect", "প্রশংসা ভালো লাগতে পারে, কিন্তু সেটি নিজের মূল্যের একমাত্র মাপকাঠি হলে সিদ্ধান্তের চাবি অন্যের হাতে চলে যায়। নিজের মূল্যবোধের দিকে ফিরে তাকাও।"], ["নিজের Personal Standards তৈরি করা", "যে নিয়মগুলো তোমাকে নিজের কাছে সৎ রাখে", "নিজের standards মানে অন্যকে ছোট করা নয়; কোন আচরণ তুমি গ্রহণ করবে, কোন কাজের জন্য নিজের কাছে দায়বদ্ধ থাকবে—তা স্পষ্ট করা।"]] }),
  habit: simpleBook({ id: "habit", title: "THE HABIT ARCHITECT", subtitle: "নিজের আচরণ, পরিবেশ ও জীবনকে ডিজাইন করার বিজ্ঞান", description: "Behavior loop, trigger, environment, identity, energy ও attention নিয়ে একটি ব্যবহারিক আচরণ-পরিবর্তন যাত্রা।", longDescription: "শুধু willpower নয়—যে system আচরণ তৈরি করে, সেটিকে বুঝে redesign করার জন্য সাজানো বই।", category: "জীবনচর্চা", creator: "JIBON Editorial", cover: `${releaseBase}/book3_cover.webp`, accent: "#6A4C3B", accentSoft: "#F3EAE4", totalReadingMinutes: 120, pdfUrl: "", pdfPageCount: 4, learningOutcomes: ["automatic behavior চিনতে শেখা", "environment ও friction redesign করা", "failure-এর পর ফিরে আসা"], chapterData: [["তুমি সবসময় নিজের আচরণ নিয়ন্ত্রণ করো না", "Automatic behavior-এর দরজা", "তুমি পড়তে বসে ফোন হাতে নিলে সেটি সবসময় চরিত্রের দুর্বলতা নয়। কখন trigger এসেছে, কী অনুভূতি উঠেছে, আর কোন সহজ reward তোমাকে টেনেছে—সিস্টেমটি দেখো।"], ["Automatic Behavior কী?", "না ভেবেই করা কাজের নকশা", "ব্রেন বারবার করা কাজকে স্বয়ংক্রিয় করে শক্তি বাঁচায়। তাই আচরণ বদলাতে হলে শুধু নিষেধ নয়, cue ও context বদলানোও জরুরি।"], ["Brain কেন shortcut ব্যবহার করে?", "কম শক্তিতে বেশি কাজ", "নতুন কাজ সচেতন মন চায়, পুরোনো কাজ shortcut-এ চলে। এই shortcut ভালো না খারাপ তা ব্রেন নিজে বিচার করে না; immediate consequence আচরণকে শেখায়।"], ["Conscious vs Automatic Action", "ইচ্ছা ও অভ্যাসের পার্থক্য", "সচেতন সিদ্ধান্তের ব্যাটারি সীমিত। তাই ভালো কাজকে সহজ এবং অনাকাঙ্ক্ষিত কাজকে একটু কঠিন করে এমন পরিবেশ তৈরি করো।"]] }),
  wealth: simpleBook({ id: "wealth", title: "THE WEALTH CODE", subtitle: "শূন্য থেকে সম্পদ গড়ার বিজ্ঞান", description: "Learn, earn, save, invest, own, compound, protect—দীর্ঘমেয়াদি সম্পদ তৈরির বাস্তব পথ।", longDescription: "দ্রুত ধনী হওয়ার প্রতিশ্রুতি নয়; earning power, cash flow, capital, risk এবং দীর্ঘমেয়াদি ownership বোঝার জন্য সহজ বাংলা পাঠ।", category: "জীবনচর্চা", creator: "JIBON Editorial", cover: `${releaseBase}/book4_cover.webp`, accent: "#8A5A16", accentSoft: "#FBF2DC", totalReadingMinutes: 150, pdfUrl: "", pdfPageCount: 5, learningOutcomes: ["income ও wealth-এর পার্থক্য বোঝা", "cash flow ও capital-এর ভিত্তি তৈরি", "ঝুঁকি ও অনিশ্চয়তা নিয়ে সৎ থাকা"], chapterData: [["টাকা আসলে কী?", "টাকাকে হাতিয়ার হিসেবে দেখা", "টাকা কেবল নোট নয়; এটি সময়, দক্ষতা ও value creation-এর বিনিময়ের একটি মাধ্যম। টাকা ভালো বা খারাপ নয়—ব্যবহারকারীর সিদ্ধান্ত তাকে অর্থপূর্ণ বা ক্ষতিকর করে।"], ["মানুষ টাকা নিয়ে এত emotional কেন?", "নিরাপত্তা, পরিচয় ও ভয়", "টাকার সঙ্গে আমাদের স্মৃতি, পরিবারের শিক্ষা ও নিরাপত্তার অনুভূতি জড়িয়ে থাকে। আবেগকে অস্বীকার নয়; সিদ্ধান্তের আগে আবেগ ও হিসাব আলাদা করে দেখা দরকার।"], ["Rich বনাম Wealthy", "আয়, সম্পদ ও সময়ের স্বাধীনতা", "উচ্চ আয় থাকলেই সম্পদ তৈরি হয় না। আয় ধরে রাখা, asset তৈরি করা এবং নিজের সময়ের ওপর নিয়ন্ত্রণ—এই তিনটি পার্থক্য বুঝতে হবে।"], ["Money beliefs", "মনের অদৃশ্য আর্থিক দেয়াল", "টাকা নিয়ে inherited belief তোমার আচরণকে প্রভাবিত করতে পারে। কোন বিশ্বাস সত্য, কোনটি ভয় বা অসম্পূর্ণ অভিজ্ঞতা—লিখে আলাদা করো।"], ["নিজের financial identity", "আমি কি টাকাকে নিয়ন্ত্রণ করি?", "নিজেকে ‘আমি টাকা সামলাতে পারি না’ বলে সংজ্ঞায়িত করলে সেই আচরণই শক্ত হয়। পরিচয় বদলায় নিয়মিত প্রমাণে: ছোট সঞ্চয়, পরিষ্কার হিসাব, সচেতন সিদ্ধান্ত।"]] }),
  communication: simpleBook({ id: "communication", title: "THE ART OF COMMUNICATION", subtitle: "কথার শিল্প", description: "মানুষের সঙ্গে কথা বলা, মানুষকে বোঝা এবং নিজেকে প্রকাশ করার সম্পূর্ণ শিল্প।", longDescription: "কথা বলা, শোনা, প্রশ্ন, emotional safety, clarity, humour ও কঠিন কথোপকথনের মধ্য দিয়ে communication mastery journey।", category: "মনোবিজ্ঞান", creator: "JIBON Editorial", cover: `${releaseBase}/book5_cover.webp`, accent: "#5D536B", accentSoft: "#F0EDF5", totalReadingMinutes: 150, pdfUrl: "", pdfPageCount: 5, learningOutcomes: ["শোনা ও কথা বলার পার্থক্য দেখা", "কথার tone, timing ও context বোঝা", "ভুল বোঝাবুঝি কমাতে প্রশ্ন করা"], chapterData: [["কথা বলা আর যোগাযোগ করা এক জিনিস নয়", "শব্দের বাইরে বোঝাপড়া", "শুধু নিজের কথা বলা communication নয়। যোগাযোগ হলো এমন একটি দ্বিমুখী প্রক্রিয়া যেখানে তুমি বলো, শোনো এবং অন্যজনকে বোঝাও যে তার কথার জায়গা আছে।"], ["তুমি কী বলছো বনাম মানুষ কী শুনছে", "একই বাক্যের ভিন্ন অর্থ", "তোমার intention আর শ্রোতার experience আলাদা হতে পারে। তার mood, context ও আগের অভিজ্ঞতা বিবেচনায় নিলে ভুল বোঝাবুঝি কমে।"], ["Communication-এর চারটি স্তর", "সাধারণ কথা থেকে অনুভূতি", "Cliché, fact, opinion ও feeling—এই স্তরগুলো বুঝলে কখন হালকা থাকব, কখন গভীর হব এবং কখন ব্যক্তিগত সীমা সম্মান করব তা পরিষ্কার হয়।"], ["Words, Tone, Timing & Context", "কীভাবে বলছো, সেটিও বার্তা", "একই শব্দ আলাদা tone-এ আলাদা অর্থ দেয়। তাই বক্তব্যের পাশাপাশি সময়, পরিস্থিতি ও শ্রোতার মানসিক অবস্থাও খেয়াল করো।"], ["কেন মানুষ একে অপরকে ভুল বোঝে", "অনুমান, ego ও অসম্পূর্ণ শোনা", "উত্তর দেওয়ার জন্য শোনা আর বোঝার জন্য শোনা এক নয়। অনুমান না করে ‘আমি কি ঠিক বুঝলাম?’ জিজ্ঞেস করা অনেক বড় দ্বন্দ্ব ঠেকাতে পারে।"]] }),
  brain: simpleBook({ id: "brain", title: "BRAIN BOOST", subtitle: "মস্তিষ্ককে শাণিত করার বিজ্ঞান", description: "মনোযোগ, স্মৃতি, যুক্তি, সমস্যা সমাধান ও শেখার দক্ষতা নিয়ে ধাপে ধাপে brain training journey।", longDescription: "কঠিন challenge, সহজ explanation এবং retry culture—এই বই cognitive performance-এর trainable skill নিয়ে কাজ করে; নির্দিষ্ট IQ বৃদ্ধির দাবি করে না।", category: "চিন্তা ও সিদ্ধান্ত", creator: "JIBON Editorial", cover: `${releaseBase}/book6_cover.webp`, accent: "#3E5C76", accentSoft: "#E8F0F7", totalReadingMinutes: 150, pdfUrl: "", pdfPageCount: 5, learningOutcomes: ["মনোযোগের spotlight বোঝা", "mental energy ও cognitive load দেখা", "চর্চা ও retry-এর মাধ্যমে চিন্তার দক্ষতা বাড়ানো"], chapterData: [["তোমার Brain আসলে কী করে?", "বাঁচিয়ে রাখা, shortcut ও শেখা", "ব্রেন সবসময় এনার্জি বাঁচাতে চায়। তাই নতুন কাজ কঠিন মনে হয়, কিন্তু নিয়মিত চর্চায় তা সহজ pathway হয়ে যায়। এই বইয়ের লক্ষ্য রাতারাতি IQ বদল নয়; চিন্তার দক্ষতা ও অভ্যাসকে অনুশীলনযোগ্য করা।"], ["Attention কী?", "ব্রেনের স্পটলাইট", "মনোযোগ হলো একটি টর্চলাইটের মতো। চারপাশে তথ্য অনেক, কিন্তু স্পটলাইট একসঙ্গে সীমিত জায়গায় পড়ে। মনোযোগ মানে সেই আলোটি ইচ্ছেমতো ফেরাতে শেখা।"], ["Mental Energy", "সিদ্ধান্তের ব্যাটারি", "সারাদিনের ছোট সিদ্ধান্তগুলোও মানসিক শক্তি খরচ করে। গুরুত্বপূর্ণ কাজের জন্য শক্তি জমাতে অপ্রয়োজনীয় সিদ্ধান্ত কমাও এবং বিশ্রামকে কাজের অংশ হিসেবে দেখো।"], ["Cognitive Load", "একসঙ্গে কত তথ্য সামলাতে পারো", "একসঙ্গে অনেক task ধরলে working memory চাপে পড়ে। কাজকে ধাপে ভেঙে, তথ্য লিখে এবং এক সময়ে একটি সমস্যা ধরে cognitive load সামলাও।"], ["Brain Training-এর সত্য-মিথ্যা", "চর্চা, সীমা ও সৎ প্রত্যাশা", "পাজল বা exercise নির্দিষ্ট IQ point বাড়ানোর গ্যারান্টি নয়। তবে মনোযোগ, recall, reasoning ও problem-solving-এর মতো trainable skill নিয়মিত চর্চায় উন্নত হতে পারে।"]] })
};

export type ExtraBookId = keyof typeof publishedBooks;
