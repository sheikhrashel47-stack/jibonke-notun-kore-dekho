/* জীবন-ড্যাশবোর্ড: selected book-এর chapter progress, tools ও practice path এক context rail-এ রাখে। */
import type { BookChapter } from "@/data/book";
import { chapterNoteStorageKey, chapterStorageKey, type BookId } from "@/data/books";
import { useReader } from "@/contexts/ReaderContext";
import { BookmarkButton } from "@/components/BookmarkButton";
import { NotePanel } from "@/components/NotePanel";
import { BarChart3, ChevronRight, Clock3, NotebookTabs, Sparkles } from "lucide-react";
import { Link } from "wouter";

export function ContextRail({ bookId, chapter }: { bookId: BookId; chapter: BookChapter }) {
  const { progress, fontSize, setFontSize } = useReader();
  const chapterKey = chapterStorageKey(bookId, chapter.id);
  const percentage = progress[chapterKey] || 0;
  return <aside className="context-rail" aria-label="পাঠের নিয়ন্ত্রণ">
    <section className="rail-card rail-card--progress"><p className="eyebrow"><BarChart3 className="size-3.5" /> পাঠের অগ্রগতি</p><div className="progress-stat"><strong>{percentage}%</strong><span>এই অধ্যায়</span></div><div className="progress-meter" aria-label={`${percentage}% সম্পন্ন`}><span style={{ width: `${percentage}%` }} /></div><div className="rail-card__meta"><span><Clock3 className="size-3.5" /> প্রায় {chapter.readingMinutes || 18} মিনিট</span><span>{chapter.wordCount.toLocaleString("bn-BD")} শব্দ</span></div></section>
    <section className="rail-card rail-card--actions"><p className="eyebrow">পাঠের সরঞ্জাম</p><BookmarkButton chapterId={chapterKey} /><div className="font-control" aria-label="লেখার আকার"><span>লেখার আকার</span><div>{(["small", "medium", "large"] as const).map((size) => <button key={size} type="button" className={fontSize === size ? "is-active" : ""} onClick={() => setFontSize(size)} aria-pressed={fontSize === size}>অ</button>)}</div></div></section>
    <NotePanel noteKey={chapterNoteStorageKey(bookId, chapter.id)} />
    <a href="#chapter-practice" className="rail-today-action"><Sparkles className="size-4" /><span><b>আজকের প্রয়োগ</b><small>একটি অনুশীলন বেছে নাও</small></span><ChevronRight className="size-4" /></a>
    <Link href={`/book/${bookId}/workbook`} className="rail-workbook-link"><span><NotebookTabs className="size-4" /> Workbook</span><ChevronRight className="size-4" /></Link>
  </aside>;
}
