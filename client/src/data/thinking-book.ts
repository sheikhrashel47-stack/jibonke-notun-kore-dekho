/* জীবন-ড্যাশবোর্ড: The Art of Thinking metadata and lazy-loaded reader modules. */
import type { BookChapter, ChapterMeta, WorkbookExercise } from "./book";

export const thinkingChapters: ChapterMeta[] = [
  {
    "id": "01",
    "number": 1,
    "title": "তুমি যা ভাবছো, সব কি সত্যি?",
    "subtitle": "বাস্তবতা · উপলব্ধি · ব্যাখ্যা",
    "readingMinutes": 9,
    "pageStart": 20,
    "pageEnd": 28
  },
  {
    "id": "02",
    "number": 2,
    "title": "মস্তিষ্ক তোমার জন্য Shortcut নেয়",
    "subtitle": "heuristic · স্বয়ংক্রিয় চিন্তা",
    "readingMinutes": 9,
    "pageStart": 29,
    "pageEnd": 37
  },
  {
    "id": "03",
    "number": 3,
    "title": "Emotion যখন চিন্তার Steering Wheel ধরে",
    "subtitle": "ভয় · রাগ · আকাঙ্ক্ষা",
    "readingMinutes": 9,
    "pageStart": 38,
    "pageEnd": 46
  },
  {
    "id": "04",
    "number": 4,
    "title": "তোমার মস্তিষ্ক তোমাকেই কীভাবে ভুল বোঝায়",
    "subtitle": "bias · আত্মপ্রবঞ্চনা",
    "readingMinutes": 9,
    "pageStart": 47,
    "pageEnd": 55
  },
  {
    "id": "05",
    "number": 5,
    "title": "Pause — চিন্তার প্রথম শক্তি",
    "subtitle": "থামা · পর্যবেক্ষণ · সিদ্ধান্ত",
    "readingMinutes": 9,
    "pageStart": 56,
    "pageEnd": 64
  },
  {
    "id": "06",
    "number": 6,
    "title": "Fact, Opinion নাকি Assumption?",
    "subtitle": "তথ্য · মতামত · অনুমান",
    "readingMinutes": 9,
    "pageStart": 65,
    "pageEnd": 73
  },
  {
    "id": "07",
    "number": 7,
    "title": "প্রমাণ কোথায়?",
    "subtitle": "evidence · উৎস · নির্ভরযোগ্যতা",
    "readingMinutes": 9,
    "pageStart": 74,
    "pageEnd": 82
  },
  {
    "id": "08",
    "number": 8,
    "title": "একটা ঘটনা কি সত্যিই আরেকটার কারণ?",
    "subtitle": "correlation · causation",
    "readingMinutes": 9,
    "pageStart": 83,
    "pageEnd": 91
  },
  {
    "id": "09",
    "number": 9,
    "title": "একটা গল্প দিয়ে কি সত্য প্রমাণ হয়?",
    "subtitle": "anecdote · selection bias",
    "readingMinutes": 9,
    "pageStart": 92,
    "pageEnd": 100
  },
  {
    "id": "10",
    "number": 10,
    "title": "আমি কীভাবে ভুল হতে পারি?",
    "subtitle": "নম্রতা · belief updating",
    "readingMinutes": 9,
    "pageStart": 101,
    "pageEnd": 109
  },
  {
    "id": "11",
    "number": 11,
    "title": "একটি ভালো Argument কীভাবে তৈরি হয়?",
    "subtitle": "claim · evidence · reasoning",
    "readingMinutes": 9,
    "pageStart": 110,
    "pageEnd": 118
  },
  {
    "id": "12",
    "number": 12,
    "title": "Logical Fallacy-এর অদৃশ্য ফাঁদ",
    "subtitle": "fallacy · যুক্তির ভুল",
    "readingMinutes": 9,
    "pageStart": 119,
    "pageEnd": 127
  },
  {
    "id": "13",
    "number": 13,
    "title": "“তুমি তো এটা বলোনি!”",
    "subtitle": "strawman · বিকৃত যুক্তি",
    "readingMinutes": 9,
    "pageStart": 128,
    "pageEnd": 136
  },
  {
    "id": "14",
    "number": 14,
    "title": "দুইটা option দেখলেই কি দুইটাই option?",
    "subtitle": "false dilemma · বিকল্প",
    "readingMinutes": 9,
    "pageStart": 137,
    "pageEnd": 145
  },
  {
    "id": "15",
    "number": 15,
    "title": "কথার জোর বনাম যুক্তির জোর",
    "subtitle": "charisma · confidence · evidence",
    "readingMinutes": 9,
    "pageStart": 146,
    "pageEnd": 154
  },
  {
    "id": "16",
    "number": 16,
    "title": "First Principles Thinking",
    "subtitle": "মূল সত্য · ভাঙা · পুনর্গঠন",
    "readingMinutes": 9,
    "pageStart": 155,
    "pageEnd": 163
  },
  {
    "id": "17",
    "number": 17,
    "title": "Second-Order Thinking",
    "subtitle": "পরিণতি · এরপর কী",
    "readingMinutes": 9,
    "pageStart": 164,
    "pageEnd": 172
  },
  {
    "id": "18",
    "number": 18,
    "title": "Inversion",
    "subtitle": "উল্টো চিন্তা · ব্যর্থতা প্রতিরোধ",
    "readingMinutes": 9,
    "pageStart": 173,
    "pageEnd": 181
  },
  {
    "id": "19",
    "number": 19,
    "title": "Mental Models",
    "subtitle": "opportunity cost · incentive · feedback",
    "readingMinutes": 9,
    "pageStart": 182,
    "pageEnd": 190
  },
  {
    "id": "20",
    "number": 20,
    "title": "বড় সমস্যাকে ছোট করো",
    "subtitle": "problem solving · root cause",
    "readingMinutes": 9,
    "pageStart": 191,
    "pageEnd": 199
  },
  {
    "id": "21",
    "number": 21,
    "title": "সঠিক সিদ্ধান্ত বনাম ভালো ফল",
    "subtitle": "process · uncertainty · luck",
    "readingMinutes": 9,
    "pageStart": 200,
    "pageEnd": 208
  },
  {
    "id": "22",
    "number": 22,
    "title": "Opportunity Cost",
    "subtitle": "yes-এর ভিতরের no",
    "readingMinutes": 9,
    "pageStart": 209,
    "pageEnd": 217
  },
  {
    "id": "23",
    "number": 23,
    "title": "Sunk Cost Trap",
    "subtitle": "অতীত খরচ · ভবিষ্যৎ মূল্য",
    "readingMinutes": 9,
    "pageStart": 218,
    "pageEnd": 226
  },
  {
    "id": "24",
    "number": 24,
    "title": "Risk, Probability & Uncertainty",
    "subtitle": "সম্ভাবনা · ঝুঁকি · অজানা",
    "readingMinutes": 9,
    "pageStart": 227,
    "pageEnd": 235
  },
  {
    "id": "25",
    "number": 25,
    "title": "The Decision Framework",
    "subtitle": "সিদ্ধান্তের কাঠামো",
    "readingMinutes": 9,
    "pageStart": 236,
    "pageEnd": 244
  },
  {
    "id": "26",
    "number": 26,
    "title": "নিজের Belief-কে আদালতে দাঁড় করাও",
    "subtitle": "belief audit · counter-evidence",
    "readingMinutes": 9,
    "pageStart": 245,
    "pageEnd": 253
  },
  {
    "id": "27",
    "number": 27,
    "title": "Strong Opinion, Loosely Held",
    "subtitle": "দৃঢ়তা · নমনীয়তা",
    "readingMinutes": 9,
    "pageStart": 254,
    "pageEnd": 262
  },
  {
    "id": "28",
    "number": 28,
    "title": "চাপের মধ্যে কীভাবে চিন্তা করবে",
    "subtitle": "pressure thinking · regulation",
    "readingMinutes": 9,
    "pageStart": 263,
    "pageEnd": 271
  },
  {
    "id": "29",
    "number": 29,
    "title": "The Thinking Toolkit",
    "subtitle": "toolkit · practice",
    "readingMinutes": 9,
    "pageStart": 272,
    "pageEnd": 280
  },
  {
    "id": "30",
    "number": 30,
    "title": "The Thinking Mind",
    "subtitle": "চর্চা · জীবন · ফিরে দেখা",
    "readingMinutes": 9,
    "pageStart": 281,
    "pageEnd": 289
  }
];

export const thinkingChapterLoaders: Record<string, () => Promise<{ default: BookChapter }>> = {
  "01": () => import("./thinking-chapters/chapter-01"),
  "02": () => import("./thinking-chapters/chapter-02"),
  "03": () => import("./thinking-chapters/chapter-03"),
  "04": () => import("./thinking-chapters/chapter-04"),
  "05": () => import("./thinking-chapters/chapter-05"),
  "06": () => import("./thinking-chapters/chapter-06"),
  "07": () => import("./thinking-chapters/chapter-07"),
  "08": () => import("./thinking-chapters/chapter-08"),
  "09": () => import("./thinking-chapters/chapter-09"),
  "10": () => import("./thinking-chapters/chapter-10"),
  "11": () => import("./thinking-chapters/chapter-11"),
  "12": () => import("./thinking-chapters/chapter-12"),
  "13": () => import("./thinking-chapters/chapter-13"),
  "14": () => import("./thinking-chapters/chapter-14"),
  "15": () => import("./thinking-chapters/chapter-15"),
  "16": () => import("./thinking-chapters/chapter-16"),
  "17": () => import("./thinking-chapters/chapter-17"),
  "18": () => import("./thinking-chapters/chapter-18"),
  "19": () => import("./thinking-chapters/chapter-19"),
  "20": () => import("./thinking-chapters/chapter-20"),
  "21": () => import("./thinking-chapters/chapter-21"),
  "22": () => import("./thinking-chapters/chapter-22"),
  "23": () => import("./thinking-chapters/chapter-23"),
  "24": () => import("./thinking-chapters/chapter-24"),
  "25": () => import("./thinking-chapters/chapter-25"),
  "26": () => import("./thinking-chapters/chapter-26"),
  "27": () => import("./thinking-chapters/chapter-27"),
  "28": () => import("./thinking-chapters/chapter-28"),
  "29": () => import("./thinking-chapters/chapter-29"),
  "30": () => import("./thinking-chapters/chapter-30"),
};

export const thinkingWorkbookExercises: WorkbookExercise[] = [
  { title: "Thinking Pause", prompt: "আজকের একটি জটিল সিদ্ধান্ত লিখে পাঁচটি ধাপে দেখো: ঘটনা, ব্যাখ্যা, প্রমাণ, বিকল্প ও পরের ছোট পদক্ষেপ।" },
  { title: "প্রমাণের সিঁড়ি", prompt: "একটি বিশ্বাস বেছে নাও। এটি কি অভিজ্ঞতা, মতামত, না যাচাইযোগ্য প্রমাণের উপর দাঁড়িয়ে আছে—লিখে দেখো।" },
  { title: "Decision Review", prompt: "গত সপ্তাহের একটি সিদ্ধান্তে কী জানতাম, কী অনুমান করেছিলাম, কী বাদ পড়েছিল এবং পরের বার কী বদলাব—চার বাক্যে লেখো।" }
];

export const thinkingTotalReadingMinutes = 270;
