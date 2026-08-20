/* জীবন-ড্যাশবোর্ড: single registry keeps every reader surface aware of the selected book. */
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

export type BookDefinition = {
  id: BookId;
  title: string;
  chapters: ChapterMeta[];
  chapterLoaders: Record<string, () => Promise<{ default: BookChapter }>>;
  workbookExercises: WorkbookExercise[];
  totalReadingMinutes: number;
  pdfUrl: string;
  pdfPageCount: number;
};

export const bookDefinitions: Record<BookId, BookDefinition> = {
  life: {
    id: "life",
    title: "জীবনকে নতুন করে দেখো",
    chapters,
    chapterLoaders,
    workbookExercises,
    totalReadingMinutes,
    pdfUrl: "/manus-storage/jibonke_notun_kore_dekho_ebook_a2073b56.pdf",
    pdfPageCount: 300,
  },
  dark: {
    id: "dark",
    title: "Dark Psychology",
    chapters: darkChapters,
    chapterLoaders: darkChapterLoaders,
    workbookExercises: darkWorkbookExercises,
    totalReadingMinutes: darkTotalReadingMinutes,
    pdfUrl: "/manus-storage/main_3d8d46da.pdf",
    pdfPageCount: 500,
  },
  thinking: {
    id: "thinking",
    title: "The Art of Thinking",
    chapters: thinkingChapters,
    chapterLoaders: thinkingChapterLoaders,
    workbookExercises: thinkingWorkbookExercises,
    totalReadingMinutes: thinkingTotalReadingMinutes,
    pdfUrl: "/manus-storage/the_art_of_thinking_300_ac95d94c.pdf",
    pdfPageCount: 300,
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
