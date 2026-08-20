/* জীবন-ড্যাশবোর্ড: দৃশ্যদর্শন — ৩০০টি চিত্র-চিন্তা metadata and lazy reader modules. */
import type { BookChapter, ChapterMeta, WorkbookExercise } from "./book";

export const visualPhilosophiesChapters: ChapterMeta[] = [
  {
    "id": "01",
    "number": 1,
    "title": "প্রথম দেখা",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 1,
    "pageEnd": 10
  },
  {
    "id": "02",
    "number": 2,
    "title": "সময়",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 11,
    "pageEnd": 20
  },
  {
    "id": "03",
    "number": 3,
    "title": "আয়না",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 21,
    "pageEnd": 30
  },
  {
    "id": "04",
    "number": 4,
    "title": "অনিশ্চয়তা",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 31,
    "pageEnd": 40
  },
  {
    "id": "05",
    "number": 5,
    "title": "অভ্যাস",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 41,
    "pageEnd": 50
  },
  {
    "id": "06",
    "number": 6,
    "title": "নির্বাচন",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 51,
    "pageEnd": 60
  },
  {
    "id": "07",
    "number": 7,
    "title": "প্রশ্ন",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 61,
    "pageEnd": 70
  },
  {
    "id": "08",
    "number": 8,
    "title": "নীরবতা",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 71,
    "pageEnd": 80
  },
  {
    "id": "09",
    "number": 9,
    "title": "ভয়",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 81,
    "pageEnd": 90
  },
  {
    "id": "10",
    "number": 10,
    "title": "আকাঙ্ক্ষা",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 91,
    "pageEnd": 100
  },
  {
    "id": "11",
    "number": 11,
    "title": "সীমানা",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 101,
    "pageEnd": 110
  },
  {
    "id": "12",
    "number": 12,
    "title": "সম্পর্ক",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 111,
    "pageEnd": 120
  },
  {
    "id": "13",
    "number": 13,
    "title": "তুলনা",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 121,
    "pageEnd": 130
  },
  {
    "id": "14",
    "number": 14,
    "title": "ভুল",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 131,
    "pageEnd": 140
  },
  {
    "id": "15",
    "number": 15,
    "title": "অপেক্ষা",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 141,
    "pageEnd": 150
  },
  {
    "id": "16",
    "number": 16,
    "title": "কৃতজ্ঞতা",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 151,
    "pageEnd": 160
  },
  {
    "id": "17",
    "number": 17,
    "title": "শরীর",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 161,
    "pageEnd": 170
  },
  {
    "id": "18",
    "number": 18,
    "title": "মনোযোগ",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 171,
    "pageEnd": 180
  },
  {
    "id": "19",
    "number": 19,
    "title": "অসমাপ্ততা",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 181,
    "pageEnd": 190
  },
  {
    "id": "20",
    "number": 20,
    "title": "ক্ষণিকতা",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 191,
    "pageEnd": 200
  },
  {
    "id": "21",
    "number": 21,
    "title": "পরিবর্তন",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 201,
    "pageEnd": 210
  },
  {
    "id": "22",
    "number": 22,
    "title": "ক্ষতি",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 211,
    "pageEnd": 220
  },
  {
    "id": "23",
    "number": 23,
    "title": "সাহস",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 221,
    "pageEnd": 230
  },
  {
    "id": "24",
    "number": 24,
    "title": "দৃষ্টিভঙ্গি",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 231,
    "pageEnd": 240
  },
  {
    "id": "25",
    "number": 25,
    "title": "মমতা",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 241,
    "pageEnd": 250
  },
  {
    "id": "26",
    "number": 26,
    "title": "স্বাধীনতা",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 251,
    "pageEnd": 260
  },
  {
    "id": "27",
    "number": 27,
    "title": "সিদ্ধান্ত",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 261,
    "pageEnd": 270
  },
  {
    "id": "28",
    "number": 28,
    "title": "ঘর",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 271,
    "pageEnd": 280
  },
  {
    "id": "29",
    "number": 29,
    "title": "অন্তর্যাত্রা",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 281,
    "pageEnd": 290
  },
  {
    "id": "30",
    "number": 30,
    "title": "নতুন করে দেখা",
    "subtitle": "দেখা · থামা · নতুন প্রশ্ন",
    "readingMinutes": 10,
    "pageStart": 291,
    "pageEnd": 300
  }
];

export const visualPhilosophiesChapterLoaders: Record<string, () => Promise<{ default: BookChapter }>> = {
  "01": () => import("./visual-philosophies-chapters/chapter-01"),
  "02": () => import("./visual-philosophies-chapters/chapter-02"),
  "03": () => import("./visual-philosophies-chapters/chapter-03"),
  "04": () => import("./visual-philosophies-chapters/chapter-04"),
  "05": () => import("./visual-philosophies-chapters/chapter-05"),
  "06": () => import("./visual-philosophies-chapters/chapter-06"),
  "07": () => import("./visual-philosophies-chapters/chapter-07"),
  "08": () => import("./visual-philosophies-chapters/chapter-08"),
  "09": () => import("./visual-philosophies-chapters/chapter-09"),
  "10": () => import("./visual-philosophies-chapters/chapter-10"),
  "11": () => import("./visual-philosophies-chapters/chapter-11"),
  "12": () => import("./visual-philosophies-chapters/chapter-12"),
  "13": () => import("./visual-philosophies-chapters/chapter-13"),
  "14": () => import("./visual-philosophies-chapters/chapter-14"),
  "15": () => import("./visual-philosophies-chapters/chapter-15"),
  "16": () => import("./visual-philosophies-chapters/chapter-16"),
  "17": () => import("./visual-philosophies-chapters/chapter-17"),
  "18": () => import("./visual-philosophies-chapters/chapter-18"),
  "19": () => import("./visual-philosophies-chapters/chapter-19"),
  "20": () => import("./visual-philosophies-chapters/chapter-20"),
  "21": () => import("./visual-philosophies-chapters/chapter-21"),
  "22": () => import("./visual-philosophies-chapters/chapter-22"),
  "23": () => import("./visual-philosophies-chapters/chapter-23"),
  "24": () => import("./visual-philosophies-chapters/chapter-24"),
  "25": () => import("./visual-philosophies-chapters/chapter-25"),
  "26": () => import("./visual-philosophies-chapters/chapter-26"),
  "27": () => import("./visual-philosophies-chapters/chapter-27"),
  "28": () => import("./visual-philosophies-chapters/chapter-28"),
  "29": () => import("./visual-philosophies-chapters/chapter-29"),
  "30": () => import("./visual-philosophies-chapters/chapter-30"),
};

export const visualPhilosophiesWorkbookExercises: WorkbookExercise[] = [
  { title: "আজকের দেখা", prompt: "দিনের একটি পরিচিত দৃশ্য নতুন চোখে দেখো এবং দুই লাইনে কী বদলালে তা লেখো।" },
  { title: "থামো ও ভাবো", prompt: "আজকের একটি প্রশ্ন বেছে নাও। উত্তর দেওয়ার আগে কী জানো, কী অনুমান করছ এবং পরের ছোট পদক্ষেপ কী—লিখে রাখো।" },
  { title: "ফিরে দেখা", prompt: "দিনের শেষে একটি ছোট মুহূর্ত বেছে নাও, যেখানে তুমি একটু বেশি উপস্থিত ছিলে।" }
];

export const visualPhilosophiesTotalReadingMinutes = 300;
