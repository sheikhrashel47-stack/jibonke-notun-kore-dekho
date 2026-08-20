/* JIBON premium state: lossless local-first reading memory and calm reader preferences. */
import { bookIds, type BookId } from "@/data/books";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type FontSize = "small" | "medium" | "large" | "xlarge";
export type ReaderTheme = "ivory" | "dark" | "sepia" | "focus";
export type ReaderFont = "serif" | "sans";
export type ReaderLineHeight = "compact" | "comfort" | "relaxed";
export type ReaderMode = "chapter" | "scroll" | "page" | "swipe";
export type HighlightColor = "yellow" | "green" | "blue" | "pink";

export type ReadingPosition = {
  chapterId: string;
  mode: ReaderMode;
  page?: number;
  offset?: number;
  updatedAt: number;
};

export type Highlight = {
  id: string;
  bookId: BookId;
  chapterId: string;
  text: string;
  color: HighlightColor;
  createdAt: number;
};

export type BookmarkDetail = {
  chapterKey: string;
  bookId: BookId;
  chapterId: string;
  preview?: string;
  createdAt: number;
};

export type JournalEntry = {
  date: string;
  value: string;
  updatedAt: number;
};

type ReaderState = {
  progress: Record<string, number>;
  bookmarks: string[];
  bookmarkDetails: Record<string, BookmarkDetail>;
  highlights: Highlight[];
  notes: Record<string, string>;
  journal: Record<string, JournalEntry>;
  completedExercises: Record<string, boolean>;
  fontSize: FontSize;
  readerTheme: ReaderTheme;
  readerFont: ReaderFont;
  readerLineHeight: ReaderLineHeight;
  readingGoalMinutes: number;
  activityMinutesByDate: Record<string, number>;
  activeBookId: BookId;
  activeChapterId: string;
  lastChapterByBook: Record<BookId, string>;
  lastPositionByBook: Partial<Record<BookId, ReadingPosition>>;
  libraryBookIds: BookId[];
};

type ReaderContextValue = ReaderState & {
  setProgress: (chapterKey: string, value: number) => void;
  toggleBookmark: (chapterKey: string, detail?: Omit<BookmarkDetail, "chapterKey" | "createdAt"> & { preview?: string }) => void;
  saveNote: (noteKey: string, value: string) => void;
  saveJournal: (date: string, value: string) => void;
  addHighlight: (highlight: Omit<Highlight, "id" | "createdAt">) => void;
  removeHighlight: (highlightId: string) => void;
  toggleExercise: (exerciseKey: string) => void;
  setFontSize: (size: FontSize) => void;
  setReaderTheme: (theme: ReaderTheme) => void;
  setReaderFont: (font: ReaderFont) => void;
  setReaderLineHeight: (lineHeight: ReaderLineHeight) => void;
  setReadingGoalMinutes: (minutes: number) => void;
  recordReadingMinutes: (minutes: number, date?: string) => void;
  saveReadingPosition: (bookId: BookId, position: Omit<ReadingPosition, "updatedAt">) => void;
  setLibraryBook: (bookId: BookId, shouldInclude: boolean) => void;
  setActiveChapter: (bookId: BookId, chapterId: string) => void;
};

const STORAGE_KEY = "jibon-notun-kore-dekho-reader-v3";
const LEGACY_STORAGE_KEYS = ["jibon-notun-kore-dekho-reader-v2", "jibon-notun-kore-dekho-reader-v1"];
const FONT_SCALE_MIGRATION_KEY = "jibon-notun-kore-dekho-large-font-v1";
const REMOVED_BOOK_ID = "visual-philosophies";
const isRemovedBookDataKey = (key: string) => key.includes(REMOVED_BOOK_ID);
const defaultState: ReaderState = {
  progress: {},
  bookmarks: [],
  bookmarkDetails: {},
  highlights: [],
  notes: {},
  journal: {},
  completedExercises: {},
  fontSize: "large",
  readerTheme: "ivory",
  readerFont: "serif",
  readerLineHeight: "comfort",
  readingGoalMinutes: 10,
  activityMinutesByDate: {},
  activeBookId: "life",
  activeChapterId: "01",
  lastChapterByBook: { life: "01", dark: "01", thinking: "01", presence: "01", habit: "01", brain: "01", wealth: "01", communication: "001", future: "01", "return-allah": "001", intelligence: "01", "winning-mind": "001", "ai-mastery-wealth": "001", "house-remembered": "001", "hard-truth": "01", "law-everyone-should-know": "001", "last-words": "01", "second-timer": "001" },
  lastPositionByBook: {},
  libraryBookIds: ["life"],
};

const ReaderContext = createContext<ReaderContextValue | undefined>(undefined);
const isBookId = (value: unknown): value is BookId => typeof value === "string" && bookIds.includes(value as BookId);
const namespaceProgressKey = (key: string) => /^\d{2}$/.test(key) ? `life:${key}` : key;
const namespaceBookmarkKey = (key: string) => /^\d{2}$/.test(key) ? `life:${key}` : key;
const namespaceExerciseKey = (key: string) => /^((?:\d{2})|workbook)-exercise-(\d+)$/.test(key) ? `life:${key}` : key;
const namespaceNoteKey = (key: string) => {
  const chapter = key.match(/^chapter-(\d{2})$/);
  if (chapter) return `note:life:${chapter[1]}`;
  return key === "weekly-reflection" ? "reflection:life" : key;
};
const getStoredState = () => localStorage.getItem(STORAGE_KEY) || LEGACY_STORAGE_KEYS.map((key) => localStorage.getItem(key)).find(Boolean);

const safelyReadState = (): ReaderState => {
  try {
    const stored = getStoredState();
    if (!stored) return defaultState;
    const parsed = JSON.parse(stored) as Partial<ReaderState>;
    const activeBookId = isBookId(parsed.activeBookId) ? parsed.activeBookId : "life";
    const libraryBookIds = Array.isArray(parsed.libraryBookIds)
      ? parsed.libraryBookIds.filter(isBookId)
      : defaultState.libraryBookIds;
    const bookmarkDetails = Object.fromEntries(
      Object.entries(parsed.bookmarkDetails || {}).filter(([, value]) => value && isBookId(value.bookId)),
    ) as Record<string, BookmarkDetail>;
    const migrated: ReaderState = {
      ...defaultState,
      ...parsed,
      progress: Object.fromEntries(
        Object.entries(parsed.progress || {})
          .map(([key, value]) => [namespaceProgressKey(key), value] as const)
          .filter(([key]) => !isRemovedBookDataKey(key)),
      ),
      bookmarks: (parsed.bookmarks || []).map(namespaceBookmarkKey).filter((key) => !isRemovedBookDataKey(key)),
      bookmarkDetails,
      highlights: Array.isArray(parsed.highlights) ? parsed.highlights.filter((item): item is Highlight => Boolean(item && isBookId(item.bookId) && item.text)) : [],
      notes: Object.fromEntries(
        Object.entries(parsed.notes || {})
          .map(([key, value]) => [namespaceNoteKey(key), value] as const)
          .filter(([key]) => !isRemovedBookDataKey(key)),
      ),
      completedExercises: Object.fromEntries(
        Object.entries(parsed.completedExercises || {})
          .map(([key, value]) => [namespaceExerciseKey(key), value] as const)
          .filter(([key]) => !isRemovedBookDataKey(key)),
      ),
      activeBookId,
      lastChapterByBook: {
        ...defaultState.lastChapterByBook,
        ...Object.fromEntries(Object.entries(parsed.lastChapterByBook || {}).filter(([bookId]) => isBookId(bookId))),
      } as Record<BookId, string>,
      lastPositionByBook: Object.fromEntries(
        Object.entries(parsed.lastPositionByBook || {}).filter(([bookId]) => isBookId(bookId)),
      ) as Partial<Record<BookId, ReadingPosition>>,
      libraryBookIds: Array.from(new Set([...libraryBookIds, activeBookId])),
      readerTheme: ["ivory", "dark", "sepia", "focus"].includes(parsed.readerTheme || "") ? parsed.readerTheme as ReaderTheme : defaultState.readerTheme,
      readerFont: ["serif", "sans"].includes(parsed.readerFont || "") ? parsed.readerFont as ReaderFont : defaultState.readerFont,
      readerLineHeight: ["compact", "comfort", "relaxed"].includes(parsed.readerLineHeight || "") ? parsed.readerLineHeight as ReaderLineHeight : defaultState.readerLineHeight,
      fontSize: ["small", "medium", "large", "xlarge"].includes(parsed.fontSize || "") ? parsed.fontSize as FontSize : defaultState.fontSize,
    };
    if (!localStorage.getItem(FONT_SCALE_MIGRATION_KEY)) {
      localStorage.setItem(FONT_SCALE_MIGRATION_KEY, "done");
      return { ...migrated, fontSize: "large" };
    }
    return migrated;
  } catch {
    return defaultState;
  }
};

const today = () => new Date().toISOString().slice(0, 10);
const createId = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export function ReaderProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ReaderState>(safelyReadState);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }, [state]);
  const setProgress = useCallback((chapterKey: string, value: number) => {
    setState((current) => {
      const next = Math.max(current.progress[chapterKey] || 0, Math.min(100, Math.round(value)));
      return current.progress[chapterKey] === next ? current : { ...current, progress: { ...current.progress, [chapterKey]: next } };
    });
  }, []);
  const toggleBookmark = useCallback((chapterKey: string, detail?: Omit<BookmarkDetail, "chapterKey" | "createdAt"> & { preview?: string }) => {
    setState((current) => {
      const exists = current.bookmarks.includes(chapterKey);
      if (exists) {
        const { [chapterKey]: _removed, ...bookmarkDetails } = current.bookmarkDetails;
        return { ...current, bookmarks: current.bookmarks.filter((id) => id !== chapterKey), bookmarkDetails };
      }
      const [maybeBook, maybeChapter] = chapterKey.split(":");
      const bookId = detail?.bookId || (isBookId(maybeBook) ? maybeBook : current.activeBookId);
      const chapterId = detail?.chapterId || maybeChapter || current.activeChapterId;
      return {
        ...current,
        bookmarks: [...current.bookmarks, chapterKey],
        bookmarkDetails: {
          ...current.bookmarkDetails,
          [chapterKey]: { chapterKey, bookId, chapterId, preview: detail?.preview, createdAt: Date.now() },
        },
      };
    });
  }, []);
  const saveNote = useCallback((noteKey: string, value: string) => {
    setState((current) => current.notes[noteKey] === value ? current : { ...current, notes: { ...current.notes, [noteKey]: value } });
  }, []);
  const saveJournal = useCallback((date: string, value: string) => {
    setState((current) => ({ ...current, journal: { ...current.journal, [date]: { date, value, updatedAt: Date.now() } } }));
  }, []);
  const addHighlight = useCallback((highlight: Omit<Highlight, "id" | "createdAt">) => {
    setState((current) => ({ ...current, highlights: [...current.highlights, { ...highlight, id: createId(), createdAt: Date.now() }] }));
  }, []);
  const removeHighlight = useCallback((highlightId: string) => {
    setState((current) => ({ ...current, highlights: current.highlights.filter((item) => item.id !== highlightId) }));
  }, []);
  const toggleExercise = useCallback((exerciseKey: string) => {
    setState((current) => ({ ...current, completedExercises: { ...current.completedExercises, [exerciseKey]: !current.completedExercises[exerciseKey] } }));
  }, []);
  const setFontSize = useCallback((fontSize: FontSize) => {
    setState((current) => current.fontSize === fontSize ? current : { ...current, fontSize });
  }, []);
  const setReaderTheme = useCallback((readerTheme: ReaderTheme) => {
    setState((current) => current.readerTheme === readerTheme ? current : { ...current, readerTheme });
  }, []);
  const setReaderFont = useCallback((readerFont: ReaderFont) => {
    setState((current) => current.readerFont === readerFont ? current : { ...current, readerFont });
  }, []);
  const setReaderLineHeight = useCallback((readerLineHeight: ReaderLineHeight) => {
    setState((current) => current.readerLineHeight === readerLineHeight ? current : { ...current, readerLineHeight });
  }, []);
  const setReadingGoalMinutes = useCallback((readingGoalMinutes: number) => {
    const next = Math.max(5, Math.min(120, Math.round(readingGoalMinutes)));
    setState((current) => current.readingGoalMinutes === next ? current : { ...current, readingGoalMinutes: next });
  }, []);
  const recordReadingMinutes = useCallback((minutes: number, date = today()) => {
    const safeMinutes = Math.max(0, Math.min(180, Math.round(minutes)));
    if (!safeMinutes) return;
    setState((current) => ({ ...current, activityMinutesByDate: { ...current.activityMinutesByDate, [date]: (current.activityMinutesByDate[date] || 0) + safeMinutes } }));
  }, []);
  const saveReadingPosition = useCallback((bookId: BookId, position: Omit<ReadingPosition, "updatedAt">) => {
    setState((current) => ({ ...current, lastPositionByBook: { ...current.lastPositionByBook, [bookId]: { ...position, updatedAt: Date.now() } } }));
  }, []);
  const setLibraryBook = useCallback((bookId: BookId, shouldInclude: boolean) => {
    setState((current) => ({ ...current, libraryBookIds: shouldInclude ? Array.from(new Set([...current.libraryBookIds, bookId])) : current.libraryBookIds.filter((id) => id !== bookId) }));
  }, []);
  const setActiveChapter = useCallback((activeBookId: BookId, activeChapterId: string) => {
    setState((current) => current.activeBookId === activeBookId && current.activeChapterId === activeChapterId ? current : {
      ...current,
      activeBookId,
      activeChapterId,
      libraryBookIds: Array.from(new Set([...current.libraryBookIds, activeBookId])),
      lastChapterByBook: { ...current.lastChapterByBook, [activeBookId]: activeChapterId },
      lastPositionByBook: { ...current.lastPositionByBook, [activeBookId]: { chapterId: activeChapterId, mode: "chapter", updatedAt: Date.now() } },
    });
  }, []);
  const value = useMemo<ReaderContextValue>(() => ({
    ...state,
    setProgress,
    toggleBookmark,
    saveNote,
    saveJournal,
    addHighlight,
    removeHighlight,
    toggleExercise,
    setFontSize,
    setReaderTheme,
    setReaderFont,
    setReaderLineHeight,
    setReadingGoalMinutes,
    recordReadingMinutes,
    saveReadingPosition,
    setLibraryBook,
    setActiveChapter,
  }), [state, setProgress, toggleBookmark, saveNote, saveJournal, addHighlight, removeHighlight, toggleExercise, setFontSize, setReaderTheme, setReaderFont, setReaderLineHeight, setReadingGoalMinutes, recordReadingMinutes, saveReadingPosition, setLibraryBook, setActiveChapter]);
  return <ReaderContext.Provider value={value}>{children}</ReaderContext.Provider>;
}

export function useReader() {
  const context = useContext(ReaderContext);
  if (!context) throw new Error("useReader must be used within ReaderProvider");
  return context;
}
