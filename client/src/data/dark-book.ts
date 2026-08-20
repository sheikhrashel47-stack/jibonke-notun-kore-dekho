/* জীবন-ড্যাশবোর্ড: Dark Psychology ethical self-defense book metadata and lazy loaders. */
import type { BookChapter, ChapterMeta, WorkbookExercise } from "./book";

export const darkChapters: ChapterMeta[] = [
  {
    "id": "01",
    "number": 1,
    "title": "মানুষ কেন অন্যের কথা শোনে?",
    "subtitle": "বিশ্বাস, কর্তৃত্ব, পুরস্কার ও belonging চিনে স্বাধীন সিদ্ধান্ত নেওয়া",
    "readingMinutes": 0
  },
  {
    "id": "02",
    "number": 2,
    "title": "মস্তিষ্কের Shortcut",
    "subtitle": "heuristic, automatic thinking ও bias check",
    "readingMinutes": 0
  },
  {
    "id": "03",
    "number": 3,
    "title": "ভয়, ইচ্ছা ও পুরস্কার",
    "subtitle": "emotional trigger চিনে সিদ্ধান্তে বিরতি নেওয়া",
    "readingMinutes": 0
  },
  {
    "id": "04",
    "number": 4,
    "title": "সবাই করছে—তাই আমিও?",
    "subtitle": "social proof, conformity ও peer pressure দেখা",
    "readingMinutes": 0
  },
  {
    "id": "05",
    "number": 5,
    "title": "Scarcity ও FOMO",
    "subtitle": "‘এখনই’ কথাটির পেছনের কারণ যাচাই",
    "readingMinutes": 0
  },
  {
    "id": "06",
    "number": 6,
    "title": "আমি তো তোমার জন্য এত কিছু করলাম",
    "subtitle": "কৃতজ্ঞ থেকেও স্বাধীন থাকার অনুশীলন",
    "readingMinutes": 0
  },
  {
    "id": "07",
    "number": 7,
    "title": "একবার হ্যাঁ বলার পর...",
    "subtitle": "commitment ও sunk cost চিনে থামার অনুমতি",
    "readingMinutes": 0
  },
  {
    "id": "08",
    "number": 8,
    "title": "আমি এমনই একজন মানুষ",
    "subtitle": "পরিচয়কে judgement-এর বিকল্প না বানানো",
    "readingMinutes": 0
  },
  {
    "id": "09",
    "number": 9,
    "title": "Authority-এর ছায়া",
    "subtitle": "সম্মান রেখে প্রশ্ন করা ও প্রমাণ দেখা",
    "readingMinutes": 0
  },
  {
    "id": "10",
    "number": 10,
    "title": "মানুষ কখন ‘না’ বলতে পারে না?",
    "subtitle": "guilt, fear ও dependency বুঝে প্রথম boundary script",
    "readingMinutes": 0
  },
  {
    "id": "11",
    "number": 11,
    "title": "কথার আড়ালে উদ্দেশ্য",
    "subtitle": "mind-reading নয়, evidence-ভিত্তিক hypothesis তৈরি",
    "readingMinutes": 0
  },
  {
    "id": "12",
    "number": 12,
    "title": "কথা নয়—Pattern দেখো",
    "subtitle": "repeat হওয়া আচরণ ও নির্ভরযোগ্যতা নথিভুক্ত করা",
    "readingMinutes": 0
  },
  {
    "id": "13",
    "number": 13,
    "title": "Validation-এর ক্ষুধা",
    "subtitle": "approval ও attention-এর প্রয়োজন চিনে নেওয়া",
    "readingMinutes": 0
  },
  {
    "id": "14",
    "number": 14,
    "title": "অহংকারের আড়ালে কী থাকে?",
    "subtitle": "label ছাড়াই conflict-এ impact প্রকাশ করা",
    "readingMinutes": 0
  },
  {
    "id": "15",
    "number": 15,
    "title": "Status Game",
    "subtitle": "status display ও বাস্তব দক্ষতা আলাদা করে দেখা",
    "readingMinutes": 0
  },
  {
    "id": "16",
    "number": 16,
    "title": "Jealousy ও Envy",
    "subtitle": "তুলনাকে পরিচয় নয়, তথ্য হিসেবে দেখা",
    "readingMinutes": 0
  },
  {
    "id": "17",
    "number": 17,
    "title": "Victim Playing",
    "subtitle": "সত্যিকারের ক্ষতি ও দায় এড়ানো গুলিয়ে না ফেলা",
    "readingMinutes": 0
  },
  {
    "id": "18",
    "number": 18,
    "title": "Guilt ও Shame",
    "subtitle": "healthy guilt ও weaponized guilt আলাদা করা",
    "readingMinutes": 0
  },
  {
    "id": "19",
    "number": 19,
    "title": "Gaslighting",
    "subtitle": "self-doubt কমাতে ঘটনা লেখা ও second perspective নেওয়া",
    "readingMinutes": 0
  },
  {
    "id": "20",
    "number": 20,
    "title": "Love Bombing ও Emotional Dependency",
    "subtitle": "গতি কমিয়ে support circle ধরে রাখা",
    "readingMinutes": 0
  },
  {
    "id": "21",
    "number": 21,
    "title": "Persuasion বনাম Manipulation",
    "subtitle": "সম্মতি, স্বচ্ছতা ও autonomy দিয়ে influence বিচার",
    "readingMinutes": 0
  },
  {
    "id": "22",
    "number": 22,
    "title": "Framing",
    "subtitle": "একই তথ্যের বিকল্প frame খোঁজা",
    "readingMinutes": 0
  },
  {
    "id": "23",
    "number": 23,
    "title": "Anchoring",
    "subtitle": "প্রথম দাবি বা সংখ্যাকে সাময়িক data হিসেবে দেখা",
    "readingMinutes": 0
  },
  {
    "id": "24",
    "number": 24,
    "title": "Emotion as Influence",
    "subtitle": "আবেগের নাম বলে তারপর সিদ্ধান্ত নেওয়া",
    "readingMinutes": 0
  },
  {
    "id": "25",
    "number": 25,
    "title": "False Urgency",
    "subtitle": "time pressure চিনে slow-down checklist ব্যবহার",
    "readingMinutes": 0
  },
  {
    "id": "26",
    "number": 26,
    "title": "Social Pressure",
    "subtitle": "ally খুঁজে private decision নেওয়া",
    "readingMinutes": 0
  },
  {
    "id": "27",
    "number": 27,
    "title": "Flattery",
    "subtitle": "প্রশংসা শুনেও বিষয়টি যাচাই করা",
    "readingMinutes": 0
  },
  {
    "id": "28",
    "number": 28,
    "title": "The Reciprocity Trap",
    "subtitle": "সৌজন্য রেখে implied debt decline করা",
    "readingMinutes": 0
  },
  {
    "id": "29",
    "number": 29,
    "title": "Commitment Trap",
    "subtitle": "stop-rule ও review point ঠিক করা",
    "readingMinutes": 0
  },
  {
    "id": "30",
    "number": 30,
    "title": "Information Control",
    "subtitle": "source, context ও incentive check করা",
    "readingMinutes": 0
  },
  {
    "id": "31",
    "number": 31,
    "title": "Toxic Friendship",
    "subtitle": "friendship audit ও safe distance",
    "readingMinutes": 0
  },
  {
    "id": "32",
    "number": 32,
    "title": "Manipulative Relationship",
    "subtitle": "safety-first relationship check",
    "readingMinutes": 0
  },
  {
    "id": "33",
    "number": 33,
    "title": "Workplace Politics",
    "subtitle": "documentation ও professional boundary",
    "readingMinutes": 0
  },
  {
    "id": "34",
    "number": 34,
    "title": "Negotiation",
    "subtitle": "BATNA, objective criteria ও fair trade-off",
    "readingMinutes": 0
  },
  {
    "id": "35",
    "number": 35,
    "title": "Bullying ও Intimidation",
    "subtitle": "support, record, report ও exit framework",
    "readingMinutes": 0
  },
  {
    "id": "36",
    "number": 36,
    "title": "Social Media Manipulation",
    "subtitle": "feed friction ও attention boundary",
    "readingMinutes": 0
  },
  {
    "id": "37",
    "number": 37,
    "title": "Advertising Psychology",
    "subtitle": "consumer pause card দিয়ে প্রয়োজন যাচাই",
    "readingMinutes": 0
  },
  {
    "id": "38",
    "number": 38,
    "title": "Rumor ও Misinformation",
    "subtitle": "verify-before-share routine",
    "readingMinutes": 0
  },
  {
    "id": "39",
    "number": 39,
    "title": "Cult-like Influence",
    "subtitle": "warning signs ও trusted outside contact",
    "readingMinutes": 0
  },
  {
    "id": "40",
    "number": 40,
    "title": "Reputation Attack",
    "subtitle": "reputation defense system",
    "readingMinutes": 0
  },
  {
    "id": "41",
    "number": 41,
    "title": "৫০টি Manipulation Red Flag",
    "subtitle": "warning sign ও pattern cluster নথিভুক্ত করা",
    "readingMinutes": 0
  },
  {
    "id": "42",
    "number": 42,
    "title": "না বলার বিজ্ঞান",
    "subtitle": "refusal, delay ও clarity-র Bengali response library",
    "readingMinutes": 0
  },
  {
    "id": "43",
    "number": 43,
    "title": "Boundary System",
    "subtitle": "identify, communicate, maintain, enforce",
    "readingMinutes": 0
  },
  {
    "id": "44",
    "number": 44,
    "title": "Emotional Detachment",
    "subtitle": "pause–name–check routine",
    "readingMinutes": 0
  },
  {
    "id": "45",
    "number": 45,
    "title": "Difficult People",
    "subtitle": "পরিস্থিতি অনুযায়ী distance ও response বেছে নেওয়া",
    "readingMinutes": 0
  },
  {
    "id": "46",
    "number": 46,
    "title": "Difficult Conversation Framework",
    "subtitle": "observe, clarify, state, offer, exit flow",
    "readingMinutes": 0
  },
  {
    "id": "47",
    "number": 47,
    "title": "Psychological Self-Defense",
    "subtitle": "verification, documentation, support ও boundaries",
    "readingMinutes": 0
  },
  {
    "id": "48",
    "number": 48,
    "title": "Decision Immunity",
    "subtitle": "চাপের মধ্যেও স্বাধীন judgement",
    "readingMinutes": 0
  },
  {
    "id": "49",
    "number": 49,
    "title": "Ethical Influence",
    "subtitle": "listening, honest framing ও consent",
    "readingMinutes": 0
  },
  {
    "id": "50",
    "number": 50,
    "title": "The Human Mind Field Guide",
    "subtitle": "red flag, model ও script দিয়ে ব্যক্তিগত field guide",
    "readingMinutes": 0
  }
];

export const darkChapterLoaders: Record<string, () => Promise<{ default: BookChapter }>> = {
  "01": () => import("./dark-chapters/chapter-01"),
  "02": () => import("./dark-chapters/chapter-02"),
  "03": () => import("./dark-chapters/chapter-03"),
  "04": () => import("./dark-chapters/chapter-04"),
  "05": () => import("./dark-chapters/chapter-05"),
  "06": () => import("./dark-chapters/chapter-06"),
  "07": () => import("./dark-chapters/chapter-07"),
  "08": () => import("./dark-chapters/chapter-08"),
  "09": () => import("./dark-chapters/chapter-09"),
  "10": () => import("./dark-chapters/chapter-10"),
  "11": () => import("./dark-chapters/chapter-11"),
  "12": () => import("./dark-chapters/chapter-12"),
  "13": () => import("./dark-chapters/chapter-13"),
  "14": () => import("./dark-chapters/chapter-14"),
  "15": () => import("./dark-chapters/chapter-15"),
  "16": () => import("./dark-chapters/chapter-16"),
  "17": () => import("./dark-chapters/chapter-17"),
  "18": () => import("./dark-chapters/chapter-18"),
  "19": () => import("./dark-chapters/chapter-19"),
  "20": () => import("./dark-chapters/chapter-20"),
  "21": () => import("./dark-chapters/chapter-21"),
  "22": () => import("./dark-chapters/chapter-22"),
  "23": () => import("./dark-chapters/chapter-23"),
  "24": () => import("./dark-chapters/chapter-24"),
  "25": () => import("./dark-chapters/chapter-25"),
  "26": () => import("./dark-chapters/chapter-26"),
  "27": () => import("./dark-chapters/chapter-27"),
  "28": () => import("./dark-chapters/chapter-28"),
  "29": () => import("./dark-chapters/chapter-29"),
  "30": () => import("./dark-chapters/chapter-30"),
  "31": () => import("./dark-chapters/chapter-31"),
  "32": () => import("./dark-chapters/chapter-32"),
  "33": () => import("./dark-chapters/chapter-33"),
  "34": () => import("./dark-chapters/chapter-34"),
  "35": () => import("./dark-chapters/chapter-35"),
  "36": () => import("./dark-chapters/chapter-36"),
  "37": () => import("./dark-chapters/chapter-37"),
  "38": () => import("./dark-chapters/chapter-38"),
  "39": () => import("./dark-chapters/chapter-39"),
  "40": () => import("./dark-chapters/chapter-40"),
  "41": () => import("./dark-chapters/chapter-41"),
  "42": () => import("./dark-chapters/chapter-42"),
  "43": () => import("./dark-chapters/chapter-43"),
  "44": () => import("./dark-chapters/chapter-44"),
  "45": () => import("./dark-chapters/chapter-45"),
  "46": () => import("./dark-chapters/chapter-46"),
  "47": () => import("./dark-chapters/chapter-47"),
  "48": () => import("./dark-chapters/chapter-48"),
  "49": () => import("./dark-chapters/chapter-49"),
  "50": () => import("./dark-chapters/chapter-50"),
};

export const darkWorkbookExercises: WorkbookExercise[] = [
  { title: "নিজের Red Flag Ledger", prompt: "আজকের একটি চাপের কথোপকথনে কী বলা হয়েছিল, কী বারবার ঘটছে, কোন সীমাটি দরকার এবং কাকে সহায়তার জন্য জানাতে পারো—লিখে রাখো।" },
  { title: "Pause–Name–Check", prompt: "একটি সিদ্ধান্তের আগে থামো, অনুভূতির নাম দাও, তথ্য ও context যাচাই করো, তারপর পরের ছোট পদক্ষেপ নির্ধারণ করো।" },
  { title: "সীমানার বাক্য", prompt: "নিজের ভাষায় তিনটি ছোট বাক্য লেখো: সময় চাওয়া, না বলা এবং অন্যের সহায়তা নেওয়ার জন্য।" }
];

export const darkTotalReadingMinutes = 600;
