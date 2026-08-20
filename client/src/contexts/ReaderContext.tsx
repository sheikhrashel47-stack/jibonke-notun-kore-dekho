/* জীবন-ড্যাশবোর্ড: local-first state, namespaced per book so both reading paths stay independent. */
import { bookIds, type BookId } from "@/data/books";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type FontSize = "small" | "medium" | "large";

type ReaderState = {
  progress: Record<string, number>;
  bookmarks: string[];
  notes: Record<string, string>;
  completedExercises: Record<string, boolean>;
  fontSize: FontSize;
  activeBookId: BookId;
  activeChapterId: string;
  lastChapterByBook: Record<BookId, string>;
};

type ReaderContextValue = ReaderState & {
  setProgress: (chapterKey: string, value: number) => void;
  toggleBookmark: (chapterKey: string) => void;
  saveNote: (noteKey: string, value: string) => void;
  toggleExercise: (exerciseKey: string) => void;
  setFontSize: (size: FontSize) => void;
  setActiveChapter: (bookId: BookId, chapterId: string) => void;
};

const STORAGE_KEY = "jibon-notun-kore-dekho-reader-v2";
const LEGACY_STORAGE_KEY = "jibon-notun-kore-dekho-reader-v1";
const FONT_SCALE_MIGRATION_KEY = "jibon-notun-kore-dekho-large-font-v1";
const defaultState: ReaderState = {
  progress: {},
  bookmarks: [],
  notes: {},
  completedExercises: {},
  fontSize: "large",
  activeBookId: "life",
  activeChapterId: "01",
  lastChapterByBook: { life: "01", dark: "01", thinking: "01" },
};

const ReaderContext = createContext<ReaderContextValue | undefined>(undefined);
const namespaceProgressKey = (key: string) => /^\d{2}$/.test(key) ? `life:${key}` : key;
const namespaceBookmarkKey = (key: string) => /^\d{2}$/.test(key) ? `life:${key}` : key;
const namespaceExerciseKey = (key: string) => /^((?:\d{2})|workbook)-exercise-(\d+)$/.test(key) ? `life:${key}` : key;
const namespaceNoteKey = (key: string) => {
  const chapter = key.match(/^chapter-(\d{2})$/);
  if (chapter) return `note:life:${chapter[1]}`;
  return key === "weekly-reflection" ? "reflection:life" : key;
};

const safelyReadState = (): ReaderState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!stored) return defaultState;
    const parsed = JSON.parse(stored) as Partial<ReaderState>;
    const migrated: ReaderState = {
      ...defaultState,
      ...parsed,
      progress: Object.fromEntries(Object.entries(parsed.progress || {}).map(([key, value]) => [namespaceProgressKey(key), value])),
      bookmarks: (parsed.bookmarks || []).map(namespaceBookmarkKey),
      notes: Object.fromEntries(Object.entries(parsed.notes || {}).map(([key, value]) => [namespaceNoteKey(key), value])),
      completedExercises: Object.fromEntries(Object.entries(parsed.completedExercises || {}).map(([key, value]) => [namespaceExerciseKey(key), value])),
      activeBookId: bookIds.includes(parsed.activeBookId as BookId) ? parsed.activeBookId as BookId : "life",
      lastChapterByBook: { ...defaultState.lastChapterByBook, ...(parsed.lastChapterByBook || {}) },
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

export function ReaderProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ReaderState>(safelyReadState);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }, [state]);
  const setProgress = useCallback((chapterKey: string, value: number) => {
    setState((current) => {
      const next = Math.max(current.progress[chapterKey] || 0, Math.min(100, Math.round(value)));
      return current.progress[chapterKey] === next ? current : { ...current, progress: { ...current.progress, [chapterKey]: next } };
    });
  }, []);
  const toggleBookmark = useCallback((chapterKey: string) => {
    setState((current) => ({ ...current, bookmarks: current.bookmarks.includes(chapterKey) ? current.bookmarks.filter((id) => id !== chapterKey) : [...current.bookmarks, chapterKey] }));
  }, []);
  const saveNote = useCallback((noteKey: string, value: string) => {
    setState((current) => current.notes[noteKey] === value ? current : { ...current, notes: { ...current.notes, [noteKey]: value } });
  }, []);
  const toggleExercise = useCallback((exerciseKey: string) => {
    setState((current) => ({ ...current, completedExercises: { ...current.completedExercises, [exerciseKey]: !current.completedExercises[exerciseKey] } }));
  }, []);
  const setFontSize = useCallback((fontSize: FontSize) => {
    setState((current) => current.fontSize === fontSize ? current : { ...current, fontSize });
  }, []);
  const setActiveChapter = useCallback((activeBookId: BookId, activeChapterId: string) => {
    setState((current) => current.activeBookId === activeBookId && current.activeChapterId === activeChapterId ? current : {
      ...current,
      activeBookId,
      activeChapterId,
      lastChapterByBook: { ...current.lastChapterByBook, [activeBookId]: activeChapterId },
    });
  }, []);
  const value = useMemo<ReaderContextValue>(() => ({ ...state, setProgress, toggleBookmark, saveNote, toggleExercise, setFontSize, setActiveChapter }), [state, setProgress, toggleBookmark, saveNote, toggleExercise, setFontSize, setActiveChapter]);
  return <ReaderContext.Provider value={value}>{children}</ReaderContext.Provider>;
}

export function useReader() {
  const context = useContext(ReaderContext);
  if (!context) throw new Error("useReader must be used within ReaderProvider");
  return context;
}
