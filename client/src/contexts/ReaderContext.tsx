/* জীবন-ড্যাশবোর্ড: local-first reader state for progress, notes and bookmarks. */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type FontSize = "small" | "medium" | "large";

type ReaderState = {
  progress: Record<string, number>;
  bookmarks: string[];
  notes: Record<string, string>;
  completedExercises: Record<string, boolean>;
  fontSize: FontSize;
  activeChapterId: string;
};

type ReaderContextValue = ReaderState & {
  setProgress: (chapterId: string, value: number) => void;
  toggleBookmark: (chapterId: string) => void;
  saveNote: (noteKey: string, value: string) => void;
  toggleExercise: (exerciseKey: string) => void;
  setFontSize: (size: FontSize) => void;
  setActiveChapter: (chapterId: string) => void;
};

const STORAGE_KEY = "jibon-notun-kore-dekho-reader-v1";
const defaultState: ReaderState = {
  progress: {},
  bookmarks: [],
  notes: {},
  completedExercises: {},
  fontSize: "medium",
  activeChapterId: "01",
};

const ReaderContext = createContext<ReaderContextValue | undefined>(undefined);

const safelyReadState = (): ReaderState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultState;
    return { ...defaultState, ...JSON.parse(stored) };
  } catch {
    return defaultState;
  }
};

export function ReaderProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ReaderState>(safelyReadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setProgress = useCallback((chapterId: string, value: number) => {
    setState((current) => {
      const next = Math.max(current.progress[chapterId] || 0, Math.min(100, Math.round(value)));
      if (current.progress[chapterId] === next) return current;
      return { ...current, progress: { ...current.progress, [chapterId]: next } };
    });
  }, []);

  const toggleBookmark = useCallback((chapterId: string) => {
    setState((current) => ({ ...current, bookmarks: current.bookmarks.includes(chapterId) ? current.bookmarks.filter((id) => id !== chapterId) : [...current.bookmarks, chapterId] }));
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

  const setActiveChapter = useCallback((activeChapterId: string) => {
    setState((current) => current.activeChapterId === activeChapterId ? current : { ...current, activeChapterId });
  }, []);

  const value = useMemo<ReaderContextValue>(() => ({ ...state, setProgress, toggleBookmark, saveNote, toggleExercise, setFontSize, setActiveChapter }), [state, setProgress, toggleBookmark, saveNote, toggleExercise, setFontSize, setActiveChapter]);

  return <ReaderContext.Provider value={value}>{children}</ReaderContext.Provider>;
}

export function useReader() {
  const context = useContext(ReaderContext);
  if (!context) throw new Error("useReader must be used within ReaderProvider");
  return context;
}
