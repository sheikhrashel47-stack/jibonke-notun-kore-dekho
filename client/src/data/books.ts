/* JIBON premium catalog: every surface reads one stable, book-aware registry. */
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

export const bookIds = ["life", "dark", "thinking"] as const;
export type BookId = (typeof bookIds)[number];
export type BookCategory = "জীবনচর্চা" | "মনোবিজ্ঞান" | "চিন্তা ও সিদ্ধান্ত";

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
    cover: "/manus-storage/jibon-cover_c88ed0da.png",
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
    cover: "/manus-storage/dark-psychology-cover_7f27c9b4.png",
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
    cover: "/manus-storage/the-art-of-thinking-cover_e106186c.png",
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
};

export function getBookDefinition(bookId?: string): BookDefinition {
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

export function getDarkChapterForPdfPage(page: number) {
  return bookDefinitions.dark.chapters.find((chapter) => {
    const range = getDarkChapterPageRange(chapter.number);
    return range ? page >= range.pageStart && page <= range.pageEnd : false;
  });
}
