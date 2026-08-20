/* জীবন-ড্যাশবোর্ড: app-wide chapter metadata and lazy loaders. */

export type BookBlock = { type: "paragraph" | "subheading"; content: string };
export type BookSection = { id: string; title: string; blocks: BookBlock[] };
export type WorkbookExercise = { title: string; prompt: string };
export type BookChapter = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  readingMinutes: number;
  wordCount: number;
  sections: BookSection[];
  exercises: WorkbookExercise[];
  pageStart?: number;
  pageEnd?: number;
};

export type ChapterMeta = Pick<BookChapter, "id" | "number" | "title" | "subtitle" | "readingMinutes"> & {
  pageStart?: number;
  pageEnd?: number;
};

export const chapters: ChapterMeta[] = [
  {
    "id": "01",
    "number": 1,
    "title": "নিজেকে বোঝা",
    "subtitle": "পরিচয়, মূল্যবোধ ও নিজের গল্পের দিকে সৎভাবে তাকানো",
    "readingMinutes": 0
  },
  {
    "id": "02",
    "number": 2,
    "title": "মস্তিষ্ক তোমার সঙ্গে যে খেলাগুলো খেলে",
    "subtitle": "চিন্তার শর্টকাট, পক্ষপাত ও সচেতন সিদ্ধান্তের অনুশীলন",
    "readingMinutes": 0
  },
  {
    "id": "03",
    "number": 3,
    "title": "ভালোভাবে চিন্তা করা",
    "subtitle": "ভালো প্রশ্ন, প্রমাণ ও অনিশ্চয়তার সঙ্গে কাজ করা",
    "readingMinutes": 0
  },
  {
    "id": "04",
    "number": 4,
    "title": "শেখা শেখা",
    "subtitle": "জ্ঞানকে দক্ষতায় বদলানোর বাস্তব কৌশল",
    "readingMinutes": 0
  },
  {
    "id": "05",
    "number": 5,
    "title": "আত্মনিয়ন্ত্রণ: ইচ্ছাশক্তির বাইরে",
    "subtitle": "পরিবেশ, অভ্যাস ও ছোট ব্যবস্থার শক্তি",
    "readingMinutes": 0
  },
  {
    "id": "06",
    "number": 6,
    "title": "মনোযোগ: যে সম্পদ চুপচাপ হারাচ্ছ",
    "subtitle": "বিক্ষেপ কমিয়ে গভীর কাজে ফিরে আসা",
    "readingMinutes": 0
  },
  {
    "id": "07",
    "number": 7,
    "title": "মানুষকে বোঝা",
    "subtitle": "আচরণের আড়ালে থাকা চাহিদা ও প্রেক্ষাপট দেখা",
    "readingMinutes": 0
  },
  {
    "id": "08",
    "number": 8,
    "title": "যোগাযোগ: কথা বলার চেয়েও বেশি",
    "subtitle": "শোনা, বলা ও বোঝাপড়ার শিল্প",
    "readingMinutes": 0
  },
  {
    "id": "09",
    "number": 9,
    "title": "সম্পর্ক: কাছাকাছি থেকেও নিজের থাকা",
    "subtitle": "সীমারেখা, আস্থা ও সম্পর্কের দায়িত্ব",
    "readingMinutes": 0
  },
  {
    "id": "10",
    "number": 10,
    "title": "ক্যারিয়ার: কাজ, দক্ষতা ও অর্থপূর্ণতা",
    "subtitle": "কাজকে নিজের দীর্ঘমেয়াদি জীবনের সঙ্গে মিলিয়ে দেখা",
    "readingMinutes": 0
  },
  {
    "id": "11",
    "number": 11,
    "title": "টাকা: স্বাধীনতা, ভয় ও ভবিষ্যৎ",
    "subtitle": "অর্থকে সিদ্ধান্ত ও স্বাধীনতার হাতিয়ার হিসেবে বোঝা",
    "readingMinutes": 0
  },
  {
    "id": "12",
    "number": 12,
    "title": "আবেগ: অনুভূতি শত্রু নয়",
    "subtitle": "আবেগকে দমন নয়, পড়া ও ব্যবহার করা",
    "readingMinutes": 0
  },
  {
    "id": "13",
    "number": 13,
    "title": "কঠিন সময়: ভেঙে পড়া থেকে ফিরে আসা",
    "subtitle": "বিপর্যয়ের মধ্যে নিজের প্রতি সহানুভূতিশীল থাকা",
    "readingMinutes": 0
  },
  {
    "id": "14",
    "number": 14,
    "title": "সিদ্ধান্ত: নিশ্চিততার অপেক্ষা না করে",
    "subtitle": "অসম্পূর্ণ তথ্যেও পরের ভালো পদক্ষেপ নেওয়া",
    "readingMinutes": 0
  },
  {
    "id": "15",
    "number": 15,
    "title": "তোমার Life Operating System",
    "subtitle": "জীবনের জন্য নিজের ব্যবস্থাপনা ও দীর্ঘমেয়াদি দিকনির্দেশ",
    "readingMinutes": 0
  }
];

export const chapterLoaders: Record<string, () => Promise<{ default: BookChapter }>> = {
  "01": () => import("./chapters/chapter-01"),
  "02": () => import("./chapters/chapter-02"),
  "03": () => import("./chapters/chapter-03"),
  "04": () => import("./chapters/chapter-04"),
  "05": () => import("./chapters/chapter-05"),
  "06": () => import("./chapters/chapter-06"),
  "07": () => import("./chapters/chapter-07"),
  "08": () => import("./chapters/chapter-08"),
  "09": () => import("./chapters/chapter-09"),
  "10": () => import("./chapters/chapter-10"),
  "11": () => import("./chapters/chapter-11"),
  "12": () => import("./chapters/chapter-12"),
  "13": () => import("./chapters/chapter-13"),
  "14": () => import("./chapters/chapter-14"),
  "15": () => import("./chapters/chapter-15"),
};

export const workbookExercises: WorkbookExercise[] = [
  { title: "৩০ দিনের ছোট পরিবর্তন", prompt: "আজ থেকে ৩০ দিনের জন্য এমন একটি ছোট আচরণ বেছে নাও, যা তোমার জীবনে সবচেয়ে বেশি পার্থক্য আনতে পারে। প্রতিদিন কখন, কোথায় এবং কীভাবে করবে—লিখে রাখো।" },
  { title: "সাপ্তাহিক ফিরে দেখা", prompt: "গত সাত দিনে কোন সিদ্ধান্ত বা কথোপকথন তোমাকে ভাবিয়েছে? ঘটনা, অনুভূতি, শেখা এবং পরের পদক্ষেপ—এই চারটি বাক্যে লিখো।" },
  { title: "Life OS ক্যানভাস", prompt: "স্বাস্থ্য, কাজ, সম্পর্ক, টাকা, শেখা ও বিশ্রাম—প্রতিটি ক্ষেত্রকে ১ থেকে ১০-এর মধ্যে নম্বর দাও। সবচেয়ে জরুরি একটি ক্ষেত্র বেছে ছোট পরবর্তী পদক্ষেপ ঠিক করো।" },
  { title: "নিজের সঙ্গে চুক্তি", prompt: "এই বই থেকে পাওয়া একটি ভাবনা নিয়ে নিজের কাছে এক বাক্যের একটি বাস্তব চুক্তি লেখো। চুক্তিটি ছোট, নির্দিষ্ট ও পরের সাত দিনের মধ্যে করা যায় এমন হওয়া দরকার।" }
];

export const totalReadingMinutes = 300;
