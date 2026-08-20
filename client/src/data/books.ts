import {
  chapterLoaders,
  chapters,
  totalReadingMinutes,
  workbookExercises,
  type BookChapter,
  type ChapterMeta,
  type WorkbookExercise,
} from "./book";
import {
  darkChapterLoaders,
  darkChapters,
  darkTotalReadingMinutes,
  darkWorkbookExercises,
} from "./dark-book";
import {
  thinkingChapterLoaders,
  thinkingChapters,
  thinkingTotalReadingMinutes,
  thinkingWorkbookExercises,
} from "./thinking-book";
import {
  wealthChapterLoaders,
  wealthChapters,
  wealthTotalReadingMinutes,
  wealthWorkbookExercises,
} from "./wealth-book";
import {
  habitChapterLoaders,
  habitChapters,
  habitTotalReadingMinutes,
  habitWorkbookExercises,
} from "./habit-book";
import {
  presenceExpandedMeta as presenceChapters,
  presenceExpandedLoaders as presenceChapterLoaders,
  presenceExpandedTotalReadingMinutes as presenceTotalReadingMinutes,
  presenceExpandedExercises as presenceWorkbookExercises,
} from "./presence-book-expanded";
import {
  brainChapters,
  brainChapterLoaders,
  brainTotalReadingMinutes,
  brainWorkbookExercises,
} from "./brain-book";
import {
  communicationChaptersMeta as communicationChapters,
  communicationChapterLoaders,
  communicationTotalReadingMinutes,
  communicationWorkbookExercises,
} from "./communication-book";
import {
  futureChapters,
  futureChapterLoaders,
  futureTotalReadingMinutes,
  futureWorkbookExercises,
} from "./future-book";
import {
  returnAllahChapters,
  returnAllahChapterLoaders,
  returnAllahTotalReadingMinutes,
  returnAllahWorkbookExercises,
} from "./return-allah-book";
import {
  mistakesChapters,
  mistakesChapterLoaders,
  mistakesTotalReadingMinutes,
  mistakesWorkbookExercises,
} from "./mistakes-book";
import {
  intelligenceCodeChapters,
  intelligenceCodeChapterLoaders,
  intelligenceCodeTotalReadingMinutes,
  intelligenceCodeWorkbookExercises,
} from "./intelligence-code-book";
import {
  winningMindChaptersMeta as winningMindChapters,
  winningMindChapterLoaders,
  winningMindTotalReadingMinutes,
  winningMindWorkbookExercises,
} from "./winning-mind-book";
import {
  aiMasteryWealthChapters,
  aiMasteryWealthChapterLoaders,
  aiMasteryWealthTotalReadingMinutes,
  aiMasteryWealthWorkbookExercises,
} from "./ai-mastery-wealth-book";
import {
  houseRememberedChapters,
  houseRememberedChapterLoaders,
  houseRememberedBookMeta,
  houseRememberedAllWorkbookExercises,
  houseRememberedTotalReadingMinutes,
} from "./house-remembered-book";
import {
  hardTruthChapters,
  hardTruthChapterLoaders,
  hardTruthTotalReadingMinutes,
  hardTruthWorkbookExercises,
} from "./hard-truth-book";
import {
  lawEveryoneShouldKnowChapters,
  lawEveryoneShouldKnowChapterLoaders,
  lawEveryoneShouldKnowBookMeta,
  lawEveryoneShouldKnowAllWorkbookExercises,
} from "./law-everyone-should-know-book";
import {
  lastWordsChapters,
  lastWordsChapterLoaders,
  lastWordsTotalReadingMinutes,
  lastWordsWorkbookExercises,
} from "./last-words-book";
import {
  secondTimerChapters,
  secondTimerChapterLoaders,
  secondTimerBookMeta,
  secondTimerAllWorkbookExercises,
} from "./second-timer-book";
import {
  seerahChapters,
  seerahChapterLoaders,
  seerahTotalReadingMinutes,
  seerahWorkbookExercises,
} from "./seerah-book";

export const bookIds = ["life", "dark", "thinking", "presence", "habit", "brain", "wealth", "communication", "future", "return-allah", "mistakes-cost-lives", "intelligence", "winning-mind", "ai-mastery-wealth", "house-remembered", "hard-truth", "law-everyone-should-know", "last-words", "second-timer", "seerah"] as const;
export type BookId = (typeof bookIds)[number];
export type BookCategory = "জীবনচর্চা" | "মনোবিজ্ঞান" | "চিন্তা ও সিদ্ধান্ত" | "আচরণ ও জীবনযাপন" | "মস্তিষ্ক ও শেখা" | "অর্থ ও সম্পদ" | "বিজ্ঞান ও ভবিষ্যৎ" | "ইসলাম ও আত্মশুদ্ধি";

export type BookDefinition = {
  id: BookId;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: BookCategory;
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

export const bookDefinitions: Record<BookId, BookDefinition> = {
  life: {
    id: "life",
    title: "জীবনকে নতুন করে দেখো",
    subtitle: "নিজের সঙ্গে নতুন করে পরিচয়ের একটি পাঠযাত্রা",
    description: "চিন্তা, সম্পর্ক, মনোযোগ ও অর্থপূর্ণ জীবন নিয়ে একটি বাংলা reading companion।",
    longDescription: "ছোট ছোট অধ্যায়ে নিজের অভ্যাস, সিদ্ধান্ত এবং সম্পর্ককে নতুন দৃষ্টিতে দেখার জন্য সাজানো শান্ত পাঠ। প্রতিটি অংশে বোঝার সঙ্গে বাস্তব জীবনে প্রয়োগের জায়গা রাখা হয়েছে।",
    category: "জীবনচর্চা",
    creator: "JIBON Editorial",
    cover: "https://github.com/sheikhrashel47-stack/jibonke-notun-kore-dekho/releases/download/store-assets-v1/jibon-cover.webp",
    accent: "#1B5E45",
    accentSoft: "#E6F0E8",
    chapters,
    chapterLoaders,
    workbookExercises,
    totalReadingMinutes,
    pdfUrl: "https://raw.githubusercontent.com/sheikhrashel47-stack/jibonke-notun-kore-dekho/pdf-assets/pdf/jibonke_notun_kore_dekho_ebook.pdf",
    pdfPageCount: 300,
    learningOutcomes: ["নিজের চিন্তার ধরন লক্ষ করা", "সম্পর্কে স্বাস্থ্যকর সীমা তৈরি করা", "ছোট অভ্যাসকে বাস্তব পরিবর্তনে নেওয়া"],
  },
  dark: {
    id: "dark",
    title: "Dark Psychology",
    subtitle: "মানসিক প্রভাব বুঝে নিজের সীমা রক্ষার ব্যবহারিক guide",
    description: "Manipulation চিনতে, শান্ত থাকতে ও নিরাপদ সিদ্ধান্ত নিতে সাহায্য করে এমন নৈতিক self-defense পাঠ।",
    longDescription: "প্রভাব, চাপ ও প্ররোচনার কৌশল বুঝে সচেতন থাকা শেখায় এই বই। লক্ষ্য অন্যকে নিয়ন্ত্রণ করা নয়; নিজের সীমা ও সিদ্ধান্তকে সুরক্ষিত রাখা।",
    category: "মনোবিজ্ঞান",
    creator: "JIBON Editorial",
    cover: "https://github.com/sheikhrashel47-stack/jibonke-notun-kore-dekho/releases/download/store-assets-v1/dark-psychology-cover.webp",
    accent: "#17395A",
    accentSoft: "#E7EEF6",
    chapters: darkChapters,
    chapterLoaders: darkChapterLoaders,
    workbookExercises: darkWorkbookExercises,
    totalReadingMinutes: darkTotalReadingMinutes,
    pdfUrl: "https://raw.githubusercontent.com/sheikhrashel47-stack/jibonke-notun-kore-dekho/pdf-assets/pdf/dark_psychology_500.pdf",
    pdfPageCount: 500,
    learningOutcomes: ["চাপ ও প্রভাবের pattern চেনা", "নিজের সীমা স্পষ্ট করা", "আবেগের মুহূর্তে স্থির সিদ্ধান্ত নেওয়া"],
  },
  thinking: {
    id: "thinking",
    title: "The Art of Thinking",
    subtitle: "সঠিকভাবে ভাবার শিল্প",
    description: "তথ্য, অনুমান, যুক্তি, সিদ্ধান্ত ও মানসিক মডেল নিয়ে ব্যবহারিক বাংলা পাঠ।",
    longDescription: "তথ্যের ভিড়ে থেমে ভাবা, অনুমানকে যাচাই করা ও সিদ্ধান্তের ভিত্তি পরিষ্কার করার জন্য সাজানো অধ্যায়ভিত্তিক বই।",
    category: "চিন্তা ও সিদ্ধান্ত",
    creator: "JIBON Editorial",
    cover: "https://github.com/sheikhrashel47-stack/jibonke-notun-kore-dekho/releases/download/store-assets-v1/the-art-of-thinking-cover.webp",
    accent: "#56447A",
    accentSoft: "#EEEAF5",
    chapters: thinkingChapters,
    chapterLoaders: thinkingChapterLoaders,
    workbookExercises: thinkingWorkbookExercises,
    totalReadingMinutes: thinkingTotalReadingMinutes,
    pdfUrl: "https://raw.githubusercontent.com/sheikhrashel47-stack/jibonke-notun-kore-dekho/pdf-assets/pdf/the_art_of_thinking_300.pdf",
    pdfPageCount: 300,
    learningOutcomes: ["অনুমান ও তথ্য আলাদা করা", "কঠিন সিদ্ধান্ত ধাপে ভাবা", "নিজের চিন্তার ভুল ধরতে শেখা"],
  },
  presence: {
    id: "presence",
    title: "The Presence Code",
    subtitle: "নিজের উপস্থিতি, আত্মবিশ্বাস ও প্রভাব গড়ে তোলার সহজ পাঠ",
    description: "আত্মবিশ্বাস, body language, boundaries ও মানুষের সঙ্গে স্বাভাবিকভাবে connect করার ব্যবহারিক বাংলা guide।",
    longDescription: "নিজেকে অন্য কারও মতো বানানো নয়—নিজের ভেতরের স্থিরতা, স্পষ্টতা ও উষ্ণতাকে এমনভাবে প্রকাশ করা, যাতে মানুষ তোমাকে সহজে বুঝতে পারে এবং তুমি নিজেকেও হারিয়ে না ফেলো।",
    category: "মনোবিজ্ঞান",
    creator: "JIBON Editorial",
    cover: "https://raw.githubusercontent.com/sheikhrashel47-stack/jibonke-notun-kore-dekho/main/public/presence-code-cover.png",
    accent: "#8A4B2A",
    accentSoft: "#F6E9DF",
    chapters: presenceChapters,
    chapterLoaders: presenceChapterLoaders,
    workbookExercises: presenceWorkbookExercises,
    totalReadingMinutes: presenceTotalReadingMinutes,
    pdfUrl: "https://raw.githubusercontent.com/sheikhrashel47-stack/jibonke-notun-kore-dekho/main/public/the_presence_code_ebook.pdf",
    pdfPageCount: 305,
    learningOutcomes: ["নিজের উপস্থিতি ও body language সচেতনভাবে ব্যবহার করা", "স্বাস্থ্যকর boundary ও assertive communication গড়ে তোলা", "চাপের মধ্যেও স্থির, উষ্ণ ও স্পষ্ট থাকা"],
  },
  habit: {
    id: "habit",
    title: "The Habit Architect",
    subtitle: "নিজের আচরণ, পরিবেশ ও জীবনকে এমনভাবে ডিজাইন করার বিজ্ঞান",
    description: "আচরণ, identity, environment, attention ও recovery নিয়ে ৬০ অধ্যায়ের বাংলা practical workbook।",
    longDescription: "শুধু motivation-এর উপর নির্ভর না করে নিজের আচরণের system দেখা, ছোট experiment চালানো এবং দীর্ঘমেয়াদি habit architecture বানানোর জন্য সাজানো মৌলিক বাংলা পাঠ।",
    category: "আচরণ ও জীবনযাপন",
    creator: "JIBON Editorial",
    cover: `${import.meta.env.BASE_URL}habit-architect-cover.png`,
    accent: "#2A6B4F",
    accentSoft: "#E6F1E9",
    chapters: habitChapters,
    chapterLoaders: habitChapterLoaders,
    workbookExercises: habitWorkbookExercises,
    totalReadingMinutes: habitTotalReadingMinutes,
    pdfUrl: `${import.meta.env.BASE_URL}habit-architect.pdf`,
    pdfPageCount: 300,
    learningOutcomes: ["নিজের আচরণের trigger ও reward map করা", "পরিবেশ ও starting friction redesign করা", "failure-এর পর recovery system বানানো", "৩০, ৬০ ও ৯০ দিনের personal habit experiment চালানো"],
  },
  brain: {
    id: "brain",
    title: "BRAIN BOOST",
    subtitle: "মস্তিষ্ককে শাণিত করার বিজ্ঞান",
    description: "মনোযোগ, স্মৃতি, যুক্তি, সমস্যা সমাধান ও cognitive flexibility নিয়ে ২০ level-এর বাংলা Brain Training Journey।",
    longDescription: "শুধু puzzle সমাধান নয়—সহজ concept, কঠিন challenge, mistake analysis, daily mission এবং progress scorecard-সহ নিজের thinking skill অনুশীলনের একটি পূর্ণাঙ্গ পাঠযাত্রা।",
    category: "মস্তিষ্ক ও শেখা",
    creator: "শেখ রাসেল",
    cover: `${import.meta.env.BASE_URL}brain-boost-cover.png`,
    accent: "#D5A83C",
    accentSoft: "#F5EED7",
    chapters: brainChapters,
    chapterLoaders: brainChapterLoaders,
    workbookExercises: brainWorkbookExercises,
    totalReadingMinutes: brainTotalReadingMinutes,
    pdfUrl: `${import.meta.env.BASE_URL}brain-boost.pdf`,
    pdfPageCount: 289,
    learningOutcomes: ["মনোযোগ ও working memory অনুশীলন করা", "recall, pattern ও logical reasoning উন্নত করা", "সমস্যাকে ভেঙে root cause ও alternatives দেখা", "নিজের training performance আগের baseline-এর সঙ্গে তুলনা করা"],
  },
  wealth: {
    id: "wealth",
    title: "THE WEALTH CODE",
    subtitle: "শূন্য থেকে সম্পদ গড়ার বিজ্ঞান",
    description: "আয়, সঞ্চয়, দক্ষতা, সম্পদ ও দীর্ঘমেয়াদি সিদ্ধান্ত নিয়ে ১০০ অধ্যায়ের বাংলা practical wealth-building পাঠ।",
    longDescription: "দ্রুত ধনী হওয়ার প্রতিশ্রুতি নয়—নিজের earning power, cash flow, capital, ownership এবং risk-aware financial system গড়ে তোলার জন্য সাজানো একটি text-first digital edition।",
    category: "অর্থ ও সম্পদ",
    creator: "JIBON Editorial",
    cover: "https://github.com/sheikhrashel47-stack/jibonke-notun-kore-dekho/releases/download/store-assets-v1/the-wealth-code-cover.webp",
    accent: "#0B5B4B",
    accentSoft: "#E8F2ED",
    chapters: wealthChapters,
    chapterLoaders: wealthChapterLoaders,
    workbookExercises: wealthWorkbookExercises,
    totalReadingMinutes: wealthTotalReadingMinutes,
    pdfUrl: "https://github.com/sheikhrashel47-stack/jibonke-notun-kore-dekho/releases/download/store-assets-v1/the-wealth-code-500.pdf",
    pdfPageCount: 500,
    learningOutcomes: ["আয় ও cash flow-এর ভিত্তি পরিষ্কার করা", "সঞ্চয়, capital ও asset-এর সম্পর্ক বোঝা", "ঝুঁকি-সচেতন দীর্ঘমেয়াদি wealth system তৈরি করা"],
  },
  communication: {
    id: "communication",
    title: "কথার শিল্প",
    subtitle: "মানুষের সঙ্গে কথা বলা, মানুষকে বোঝা এবং নিজেকে প্রকাশ করার সম্পূর্ণ শিল্প",
    description: "Active listening, psychology, storytelling, difficult conversations ও ethical influence নিয়ে ১০০টি বাংলা topic-এর premium communication guide।",
    longDescription: "কথা বলা আর সত্যিকারের যোগাযোগের পার্থক্য, শোনা, body language, conflict, boundaries, negotiation, public speaking এবং গল্প বলার ব্যবহারিক অনুশীলন নিয়ে সাজানো একটি দীর্ঘ পাঠযাত্রা। প্রতিটি অংশে realistic dialogue, Conversation Lab, mental rehearsal এবং প্রয়োগযোগ্য technique রাখা হয়েছে।",
    category: "চিন্তা ও সিদ্ধান্ত",
    creator: "JIBON Editorial",
    cover: `${import.meta.env.BASE_URL}kothar-shilpo-cover.png`,
    accent: "#7A3040",
    accentSoft: "#F5E9E4",
    chapters: communicationChapters,
    chapterLoaders: communicationChapterLoaders,
    workbookExercises: communicationWorkbookExercises,
    totalReadingMinutes: communicationTotalReadingMinutes,
    pdfUrl: `${import.meta.env.BASE_URL}the-art-of-communication.pdf`,
    pdfPageCount: 500,
    learningOutcomes: ["শোনা, প্রশ্ন করা ও message পরিষ্কার করা", "কঠিন কথোপকথনে assertive ও ethical থাকা", "গল্প, body language ও public speaking উন্নত করা", "conflict, negotiation ও boundary conversation অনুশীলন করা"],
  },
  future: {
    id: "future",
    title: "আগামী পৃথিবী",
    subtitle: "AI, মহাকাশ, মানুষের শরীর ও প্রযুক্তির বদলে যাওয়া পৃথিবী",
    description: "বিজ্ঞান, প্রযুক্তি, মানবতা ও সম্ভাব্য future scenario-র মধ্য দিয়ে 300-পৃষ্ঠার একটি cinematic Bengali non-fiction journey।",
    longDescription: "AI, robotics, jobs, human body, longevity, brain interfaces, energy, climate, cities, space, biotechnology, digital reality ও power—বর্তমান evidence এবং অনিশ্চিত সম্ভাবনার সীমা আলাদা রেখে লেখা একটি বই।",
    category: "বিজ্ঞান ও ভবিষ্যৎ",
    creator: "Zayan",
    cover: `${import.meta.env.BASE_URL}the-future-cover.png`,
    accent: "#0B5D66",
    accentSoft: "#E4F1F2",
    chapters: futureChapters,
    chapterLoaders: futureChapterLoaders,
    workbookExercises: futureWorkbookExercises,
    totalReadingMinutes: futureTotalReadingMinutes,
    pdfUrl: `${import.meta.env.BASE_URL}the-future.pdf`,
    pdfPageCount: 300,
    learningOutcomes: ["KNOWN, EMERGING, PLAUSIBLE, SPECULATIVE ও UNCERTAIN আলাদা করে ভবিষ্যৎ ভাবা", "AI, robotics, biotechnology ও space technology সহজ ভাষায় বোঝা", "প্রযুক্তির মানবিক consequence—কাজ, পরিবার, privacy ও inequality—দেখা", "একটি নির্দিষ্ট ভবিষ্যৎ নয়, একাধিক সম্ভাব্য scenario নিয়ে চিন্তা করা"],
  },
  "return-allah": {
    id: "return-allah",
    title: "THE RETURN TO ALLAH",
    subtitle: "আল্লাহর দিকে ফিরে আসার এক পূর্ণাঙ্গ যাত্রা",
    description: "ঈমান, ইবাদত, আত্মশুদ্ধি, তাওবা, চরিত্র ও জীবনব্যাপী আল্লাহর দিকে ফিরে আসার একটি বাংলা educational journey।",
    longDescription: "২০টি chapter-এ সৃষ্টির উদ্দেশ্য, আল্লাহকে চেনা, ঈমান, সালাত, কুরআন, দু‘আ, তাওবা, নফস, সবর, শুকর, তাওয়াক্কুল, চরিত্র, পরিবার, অর্থ, আখিরাত এবং ৯০ দিনের renewal system নিয়ে সাজানো একটি source-safe, emotionally honest পাঠযাত্রা।",
    category: "ইসলাম ও আত্মশুদ্ধি",
    creator: "Zayan",
    cover: `${import.meta.env.BASE_URL}return-to-allah-cover.png`,
    accent: "#153B4A",
    accentSoft: "#E8F1F2",
    chapters: returnAllahChapters,
    chapterLoaders: returnAllahChapterLoaders,
    workbookExercises: returnAllahWorkbookExercises,
    totalReadingMinutes: returnAllahTotalReadingMinutes,
    pdfUrl: `${import.meta.env.BASE_URL}return-to-allah.pdf`,
    pdfPageCount: 28,
    learningOutcomes: ["সৃষ্টির উদ্দেশ্য ও তাওহীদের আলোকে জীবনের কেন্দ্র পরিষ্কার করা", "সালাত, কুরআন, দু‘আ ও তাওবার ধারাবাহিক system গড়া", "নফস, গুনাহ, সবর, শুকর ও তাওয়াক্কুলকে ব্যবহারিকভাবে অনুশীলন করা", "সম্পর্ক, অর্থ ও আখিরাতের দায়িত্বকে ঈমানের সঙ্গে যুক্ত করা"],
  },
  "mistakes-cost-lives": {
    id: "mistakes-cost-lives",
    title: "THE MISTAKES THAT COST US OUR LIVES",
    subtitle: "মানুষের করা সাধারণ ভুল, যেগুলো ধীরে ধীরে তার জীবনকে পিছিয়ে দেয়",
    description: "সিদ্ধান্ত, অভ্যাস, অর্থ, সম্পর্ক, ক্যারিয়ার, মন ও সময়ের ভুলকে behaviour → psychology → consequence → correction framework-এ বিশ্লেষণ করা 120-chapter Bengali self-development book।",
    longDescription: "বাস্তব জীবনের pattern, স্পষ্টভাবে labelled fictionalized composite cases, evidence-safe psychology, decision analysis, 100 self-reflection questions, 30-day Error Reset, 50 Expensive Life Mistakes এবং Personal Error-Correction System—সব মিলিয়ে একটি intellectually honest life-strategy পাঠযাত্রা।",
    category: "চিন্তা ও সিদ্ধান্ত",
    creator: "Zayan",
    cover: `${import.meta.env.BASE_URL}mistakes-cost-lives-cover.png`,
    accent: "#183F4B",
    accentSoft: "#F2E7DE",
    chapters: mistakesChapters,
    chapterLoaders: mistakesChapterLoaders,
    workbookExercises: mistakesWorkbookExercises,
    totalReadingMinutes: mistakesTotalReadingMinutes,
    pdfUrl: `${import.meta.env.BASE_URL}mistakes-cost-lives.pdf`,
    pdfPageCount: 523,
    learningOutcomes: ["নিজের ভুলকে shame নয়, behaviour–psychology–consequence framework-এ দেখা", "সময়, মনোযোগ, অভ্যাস, career, money, relationship ও decision pattern শনাক্ত করা", "100 প্রশ্ন, 30-day Error Reset ও Personal Operating System দিয়ে course-correction করা", "toxic positivity, victim blaming ও false certainty এড়িয়ে controllable factor উন্নত করা"],
  },
  intelligence: {
    id: "intelligence",
    title: "THE INTELLIGENCE CODE",
    subtitle: "বুদ্ধিমত্তার কোড",
    description: "কীভাবে আরও পরিষ্কার, দ্রুত, গভীর ও শক্তিশালীভাবে চিন্তা করা যায়—একটি সহজ কিন্তু গভীর বাংলা thinking journey।",
    longDescription: "IQ score-এর প্রতিশ্রুতি নয়; attention, memory, logic, probability, creativity, decision-making এবং metacognition-এর সাহায্যে নিজের চিন্তার process দেখতে শেখার পূর্ণাঙ্গ ২০-Part, ১০০-Chapter বই।",
    category: "চিন্তা ও সিদ্ধান্ত",
    creator: "Zayan",
    cover: `${import.meta.env.BASE_URL}intelligence-code-cover.png`,
    accent: "#6B4E9B",
    accentSoft: "#EEE8F8",
    chapters: intelligenceCodeChapters,
    chapterLoaders: intelligenceCodeChapterLoaders,
    workbookExercises: intelligenceCodeWorkbookExercises,
    totalReadingMinutes: intelligenceCodeTotalReadingMinutes,
    pdfUrl: `${import.meta.env.BASE_URL}intelligence-code.pdf`,
    pdfPageCount: 357,
    learningOutcomes: ["তথ্য, interpretation ও assumption আলাদা করা", "logic, pattern ও probability দিয়ে reasoning করা", "complex problem ভেঙে better question তৈরি করা", "নিজের confidence, bias ও thinking strategy monitor করা"],
  },
  "winning-mind": {
    id: "winning-mind",
    title: "THE WINNING MIND",
    subtitle: "নিজেকে গড়ো • জীবনকে গড়ো • নিজের পথে জয়ী হও",
    description: "Self-awareness, চিন্তা, শৃঙ্খলা, সাহস, কাজ, সম্পর্ক ও অর্থপূর্ণ সাফল্য নিয়ে ২৫ অধ্যায়ের বাংলা self-development পাঠ।",
    longDescription: "নিজের বর্তমান জীবনকে দেখা থেকে শুরু করে মনোযোগ, অভ্যাস, কাজ, ব্যর্থতা, সম্পর্ক, যোগাযোগ, টাকা এবং নিজের পরের অধ্যায়—এই বইটি দ্রুত উত্তেজনা নয়, বরং ধারাবাহিক ছোট সিদ্ধান্তের মাধ্যমে জীবন গড়ার একটি শান্ত ও বাস্তব পাঠযাত্রা।",
    category: "জীবনচর্চা",
    creator: "JIBON Editorial",
    cover: `${import.meta.env.BASE_URL}winning-mind-cover.png`,
    accent: "#102A43",
    accentSoft: "#E8F0F7",
    chapters: winningMindChapters,
    chapterLoaders: winningMindChapterLoaders,
    workbookExercises: winningMindWorkbookExercises,
    totalReadingMinutes: winningMindTotalReadingMinutes,
    pdfUrl: `${import.meta.env.BASE_URL}the-winning-mind.pdf`,
    pdfPageCount: 300,
    learningOutcomes: ["নিজের জীবন ও চিন্তার pattern সচেতনভাবে দেখা", "শৃঙ্খলা, attention ও ছোট অভ্যাসের system তৈরি করা", "ব্যর্থতা ও ভয়কে feedback হিসেবে ব্যবহার করা", "সম্পর্ক, টাকা ও সাফল্যের মধ্যে নিজের মূল্যবোধ রক্ষা করা"],
  },
  "ai-mastery-wealth": {
    id: "ai-mastery-wealth",
    title: "AI MASTERY + WEALTH BUILDING",
    subtitle: "AI শেখো • দক্ষতা গড়ো • মূল্য তৈরি করো • সম্পদ নির্মাণ করো",
    description: "AI-এর ভিত্তি থেকে prompt, workflow, automation, agents, business, income, ownership ও compounding—২০০ lesson-এর সম্পূর্ণ বাংলা course-book।",
    longDescription: "AI কী, কীভাবে power user হওয়া যায়, কাজ ও business-এ workflow বানানো, automation ও agents ব্যবহার, real-world project তৈরি, AI-powered career গড়া এবং skill থেকে value, income, ownership ও long-term wealth system নির্মাণ—এই বইটি একটি সম্পূর্ণ practical learning journey।",
    category: "অর্থ ও সম্পদ",
    creator: "JIBON Editorial",
    cover: `${import.meta.env.BASE_URL}ai-mastery-wealth-cover.png`,
    accent: "#C8942E",
    accentSoft: "#F4EDDC",
    chapters: aiMasteryWealthChapters,
    chapterLoaders: aiMasteryWealthChapterLoaders,
    workbookExercises: aiMasteryWealthWorkbookExercises,
    totalReadingMinutes: aiMasteryWealthTotalReadingMinutes,
    pdfUrl: `${import.meta.env.BASE_URL}ai-mastery-wealth-building.pdf`,
    pdfPageCount: 500,
    learningOutcomes: ["AI concepts, prompting, context, verification ও responsible use বোঝা", "AI দিয়ে productivity, research, content, automation ও agents workflow তৈরি করা", "AI-powered service, business, career ও real-world project prototype করা", "Skill → Value → Income → Ownership → Scale → Compounding wealth system গড়া"],
  },
  "house-remembered": {
    id: "house-remembered",
    title: "THE HOUSE THAT REMEMBERED",
    subtitle: "যে বাড়ি মনে রাখত — ১০টি সম্পূর্ণ বাংলা dark crime ও psychological thriller case",
    description: "দশটি মৌলিক বাংলা crime ও psychological thriller case, প্রতিটির শেষে Case Breakdown এবং শেষে Crime & Thriller Masterclass।",
    longDescription: "রায়বাড়ির অদৃশ্য স্মৃতি থেকে শুরু করে হারিয়ে যাওয়া রেকর্ড, নীরব প্রত্যক্ষদর্শী, অসম্ভব সময়রেখা ও মানুষের মনে থাকা অপরাধ—এই পূর্ণাঙ্গ collection পাঠককে fair-play clue, চরিত্রের motive, evidence এবং নৈতিক ambiguity-এর ভিতর দিয়ে নিয়ে যায়।",
    category: "মনোবিজ্ঞান",
    creator: "JIBON Editorial",
    cover: `${import.meta.env.BASE_URL}house-that-remembered-cover.png`,
    accent: "#2B1D2E",
    accentSoft: "#F1E9F0",
    chapters: houseRememberedChapters,
    chapterLoaders: houseRememberedChapterLoaders,
    workbookExercises: houseRememberedAllWorkbookExercises,
    totalReadingMinutes: houseRememberedTotalReadingMinutes,
    pdfUrl: `${import.meta.env.BASE_URL}the-house-that-remembered.pdf`,
    pdfPageCount: houseRememberedBookMeta.pages,
    learningOutcomes: ["ঘটনা, evidence, inference ও সন্দেহ আলাদা করে পড়া", "motive, opportunity, timeline ও contradiction বিশ্লেষণ করা", "fair-play mystery-র clue map তৈরি করা", "crime fiction-এর নৈতিক ambiguity ও psychological consequence বোঝা"],
  },
  "hard-truth": {
    id: "hard-truth",
    title: "THE HARD TRUTH",
    subtitle: "জীবন, ব্যর্থতা, উচ্চাকাঙ্ক্ষা ও নিজেকে গড়ে তোলার একটি বাস্তববাদী নির্দেশিকা",
    description: "বাস্তবতার সামনে টিকে থাকা motivation, responsibility, failure, money, relationships ও long-term life strategy নিয়ে একটি গভীর বাংলা non-fiction journey।",
    longDescription: "সবাই একই সুযোগ নিয়ে জন্মায় না, hard work সবসময় success guarantee করে না, এবং লক্ষ্য বদলানো সবসময় failure নয়—এই কঠিন সত্যগুলোকে অস্বীকার না করে Reality → Acceptance → Strategy → Action framework-এর মাধ্যমে জীবনকে সম্মানযোগ্যভাবে গড়ার ২০ অধ্যায়ের বই।",
    category: "চিন্তা ও সিদ্ধান্ত",
    creator: "Zayan",
    cover: `${import.meta.env.BASE_URL}hard-truth-cover.png`,
    accent: "#9B3E22",
    accentSoft: "#F3E5DD",
    chapters: hardTruthChapters,
    chapterLoaders: hardTruthChapterLoaders,
    workbookExercises: hardTruthWorkbookExercises,
    totalReadingMinutes: hardTruthTotalReadingMinutes,
    pdfUrl: `${import.meta.env.BASE_URL}hard-truth.pdf`,
    pdfPageCount: 343,
    learningOutcomes: ["বাস্তব constraint, agency ও responsibility আলাদা করে দেখা", "failure, criticism, comparison ও uncertainty-র মধ্যে strategy তৈরি করা", "time, trade-off, money ও relationships নিয়ে পরিষ্কার সিদ্ধান্ত নেওয়া", "নিজের Personal Life Operating System তৈরি ও review করা"],
  },
  "law-everyone-should-know": {
    id: "law-everyone-should-know",
    title: "⚖️ THE LAW EVERYONE SHOULD KNOW",
    subtitle: "বাংলাদেশে একজন সাধারণ মানুষের জন্য Practical Legal Knowledge & Everyday Law Handbook",
    description: "বাংলাদেশের সাধারণ নাগরিকের জন্য ৫০ Part, ১০০ scenario এবং প্রায় ৮০০ পৃষ্ঠার ব্যবহারিক বাংলা legal knowledge handbook।",
    longDescription: "সংবিধান, police ও court process, contract, employment, business, banking, consumer rights, cyber safety, property, family, health, tax এবং everyday legal documentation—সবকিছু সহজ ভাষায়, source-aware disclaimer ও practical decision framework-সহ সাজানো হয়েছে।",
    category: "জীবনচর্চা",
    creator: "JIBON Editorial",
    cover: `${import.meta.env.BASE_URL}law-everyone-should-know-cover.png`,
    accent: "#0B1F2A",
    accentSoft: "#E7EEF2",
    chapters: lawEveryoneShouldKnowChapters,
    chapterLoaders: lawEveryoneShouldKnowChapterLoaders,
    workbookExercises: lawEveryoneShouldKnowAllWorkbookExercises,
    totalReadingMinutes: lawEveryoneShouldKnowBookMeta.totalReadingMinutes,
    pdfUrl: `${import.meta.env.BASE_URL}the-law-everyone-should-know.pdf`,
    pdfPageCount: 823,
    learningOutcomes: ["আইনি issue, facts, evidence ও uncertainty আলাদা করে দেখা", "সঠিক authority ও legal route যাচাই করা", "নিরাপদভাবে document, notice, complaint ও digital evidence সংরক্ষণ করা", "বাংলাদেশের পরিবর্তনশীল আইনে official source ও qualified legal advice-এর গুরুত্ব বোঝা"],
  },
  "last-words": {
    id: "last-words",
    title: "শেষ কথাটাও বলা হলো না",
    subtitle: "একটি বাংলা literary tragedy",
    description: "আরিয়ান ও মেহরিনের বন্ধুত্ব, ভালোবাসা, ভুল বোঝাবুঝি, নীরবতা, বিচ্ছেদ ও বহু বছর পরের পুনর্মিলনের সংযত বাংলা literary novel।",
    longDescription: "এটি শুধু প্রেমের গল্প নয়; এটি মানুষের ছোট ভুল, ego, fear, family pressure, social expectation ও না-বলা কথার সমষ্টিতে কীভাবে একটি মূল্যবান সম্পর্ক হারিয়ে যায়—তার dialogue-driven contemporary Bangladesh story।",
    category: "জীবনচর্চা",
    creator: "Zayan",
    cover: `${import.meta.env.BASE_URL}last-words-cover.png`,
    accent: "#6E5A78",
    accentSoft: "#EEE8F1",
    chapters: lastWordsChapters,
    chapterLoaders: lastWordsChapterLoaders,
    workbookExercises: lastWordsWorkbookExercises,
    totalReadingMinutes: lastWordsTotalReadingMinutes,
    pdfUrl: `${import.meta.env.BASE_URL}last-words.pdf`,
    pdfPageCount: 488,
    learningOutcomes: ["সংলাপের subtext ও নীরবতার emotional meaning বুঝতে শেখা", "ভালোবাসা, attachment, ego ও self-respect-এর পার্থক্য দেখা", "ভুল assumption, communication failure ও timing-এর consequence অনুভব করা", "ক্ষমা, acceptance ও letting go-কে সম্পর্কের বাস্তবতার ভেতর দেখা"],
  },
  "second-timer": {
    id: "second-timer",
    title: "SECOND TIMER",
    subtitle: "সেকেন্ড টাইমারের ভর্তি যুদ্ধ — ফিরে আসার পূর্ণ সিস্টেম",
    description: "দ্বিতীয়বার ভর্তি পরীক্ষার্থীর জন্য ৫০ অধ্যায়ের বাংলা admission-survival handbook—diagnosis, strategy, study system, exam execution ও comeback plan-সহ।",
    longDescription: "ফল খারাপ হওয়ার পর guilt-এ আটকে না থেকে data, target, resource, active recall, timed practice, Error Log, mock analysis এবং exam-day execution-এর একটি পূর্ণ system তৈরি করার জন্য সাজানো হয়েছে। বইটিতে ২০টি myth-versus-reality, ১০টি common mistake, ১২টি ready-to-use template এবং final emergency plan রয়েছে।",
    category: "মস্তিষ্ক ও শেখা",
    creator: "JIBON Editorial",
    cover: `${import.meta.env.BASE_URL}second-timer-cover.png`,
    accent: "#B47A2C",
    accentSoft: "#F5EBD9",
    chapters: secondTimerChapters,
    chapterLoaders: secondTimerChapterLoaders,
    workbookExercises: secondTimerAllWorkbookExercises,
    totalReadingMinutes: secondTimerBookMeta.totalReadingMinutes,
    pdfUrl: `${import.meta.env.BASE_URL}second-timer.pdf`,
    pdfPageCount: 105,
    learningOutcomes: ["নিজের ভর্তি-প্রস্তুতির data-based diagnosis তৈরি করা", "target, priority, resource ও realistic routine নির্ধারণ করা", "active recall, spaced revision, timed practice ও Error Log ব্যবহার করা", "mock analysis, exam-day decision এবং final comeback plan তৈরি করা"],
    },
  seerah: {
    id: "seerah",
    title: "মুহাম্মদ ﷺ",
    subtitle: "একটি পূর্ণাঙ্গ সীরাত — সংক্ষিপ্ত গবেষণাভিত্তিক সংস্করণ",
    description: "কুরআন, হাদিস ও প্রাথমিক সীরাত ঐতিহ্যের source-aware পাঠে রাসূলুল্লাহ ﷺ-এর জীবন, দাওয়াহ ও সমাজ নির্মাণের ৫০ অধ্যায়ের বাংলা সংক্ষিপ্ত সংস্করণ।",
    longDescription: "এই সংস্করণে মক্কার সমাজ, জন্ম ও শৈশব, প্রথম ওহি, মক্কার সংগ্রাম, হিজরত, মদিনার সমাজ, যুদ্ধ ও সন্ধি, বিদায় হজ এবং ওফাত—সবগুলো পর্যায়কে সংযত ও শ্রদ্ধাপূর্ণ ভাষায় সাজানো হয়েছে। প্রতিষ্ঠিত বর্ণনা, দীর্ঘ সীরাত-ঐতিহ্য এবং অনিশ্চিত report-কে একসঙ্গে মিশিয়ে না দিয়ে source status আলাদা রাখা হয়েছে। এটি devotional reflection ও historical reading-এর সহায়ক; ফিকহি ফতোয়া বা কোনো রাজনৈতিক প্রচারপত্র নয়।",
    category: "ইসলাম ও আত্মশুদ্ধি",
    creator: "JIBON Editorial",
    cover: `${import.meta.env.BASE_URL}seerah-cover.svg`,
    accent: "#174A46",
    accentSoft: "#E8F2EF",
    chapters: seerahChapters,
    chapterLoaders: seerahChapterLoaders,
    workbookExercises: seerahWorkbookExercises,
    totalReadingMinutes: seerahTotalReadingMinutes,
    pdfUrl: `${import.meta.env.BASE_URL}seerah-concise.pdf`,
    pdfPageCount: 55,
    learningOutcomes: ["সীরাতের প্রধান পর্যায়গুলো কালানুক্রমে বোঝা", "কুরআন, হাদিস ও সীরাতের source status আলাদা করে পড়া", "মক্কা-মদিনার সামাজিক ও রাজনৈতিক প্রেক্ষাপট বুঝতে শেখা", "ঐতিহাসিক অনিশ্চয়তার সঙ্গে সতর্কভাবে কাজ করা"],
  },
};
export function getBookDefinition(bookId?: string) {
  return bookId && bookId in bookDefinitions ? bookDefinitions[bookId as BookId] : bookDefinitions.life;
}

export const chapterStorageKey = (bookId: BookId, chapterId: string) => `${bookId}:${chapterId}`;
export const chapterNoteStorageKey = (bookId: BookId, chapterId: string) => `note:${bookId}:${chapterId}`;
export const workbookNoteStorageKey = (bookId: BookId) => `reflection:${bookId}`;

export const darkPdfUrl = bookDefinitions.dark.pdfUrl;
export const darkPdfPageCount = bookDefinitions.dark.pdfPageCount;

export function getDarkChapterPageRange(chapterNumber: number) {
  if (chapterNumber >= 1 && chapterNumber <= 10) {
    const pageStart = 18 + (chapterNumber - 1) * 9;
    return { pageStart, pageEnd: pageStart + 8 };
  }
  if (chapterNumber >= 11 && chapterNumber <= 20) {
    const pageStart = 111 + (chapterNumber - 11) * 9;
    return { pageStart, pageEnd: pageStart + 8 };
  }
  if (chapterNumber >= 21 && chapterNumber <= 30) {
    const pageStart = 204 + (chapterNumber - 21) * 8;
    return { pageStart, pageEnd: pageStart + 7 };
  }
  if (chapterNumber >= 31 && chapterNumber <= 40) {
    const pageStart = 287 + (chapterNumber - 31) * 8;
    return { pageStart, pageEnd: pageStart + 7 };
  }
  if (chapterNumber >= 41 && chapterNumber <= 50) {
    const pageStart = 370 + (chapterNumber - 41) * 9;
    return { pageStart, pageEnd: pageStart + 8 };
  }
  return null;
}

export function getHabitChapterForPdfPage(page: number) {
  return bookDefinitions.habit.chapters.find((chapter) => {
    const pageStart = chapter.pageStart || 1;
    const pageEnd = chapter.pageEnd || pageStart + 3;
    return page >= pageStart && page <= pageEnd;
  });
}

export function getDarkChapterForPdfPage(page: number) {
  return bookDefinitions.dark.chapters.find((chapter) => {
    const range = getDarkChapterPageRange(chapter.number);
    return range ? page >= range.pageStart && page <= range.pageEnd : false;
  });
}
