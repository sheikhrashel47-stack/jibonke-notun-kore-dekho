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

export const bookIds = ["life", "dark"] as const;
export type BookId = (typeof bookIds)[number];

export type BookDefinition = {
  id: BookId;
  title: string;
  chapters: ChapterMeta[];
  chapterLoaders: Record<string, () => Promise<{ default: BookChapter }>>;
  workbookExercises: WorkbookExercise[];
  totalReadingMinutes: number;
};

export const bookDefinitions: Record<BookId, BookDefinition> = {
  life: {
    id: "life",
    title: "জীবনকে নতুন করে দেখো",
    chapters,
    chapterLoaders,
    workbookExercises,
    totalReadingMinutes,
  },
  dark: {
    id: "dark",
    title: "Dark Psychology",
    chapters: darkChapters,
    chapterLoaders: darkChapterLoaders,
    workbookExercises: darkWorkbookExercises,
    totalReadingMinutes: darkTotalReadingMinutes,
  },
};

export function getBookDefinition(bookId?: string): BookDefinition {
  return bookId === "dark" ? bookDefinitions.dark : bookDefinitions.life;
}

export const chapterStorageKey = (bookId: BookId, chapterId: string) => `${bookId}:${chapterId}`;
export const chapterNoteStorageKey = (bookId: BookId, chapterId: string) => `note:${bookId}:${chapterId}`;
export const workbookNoteStorageKey = (bookId: BookId) => `reflection:${bookId}`;
