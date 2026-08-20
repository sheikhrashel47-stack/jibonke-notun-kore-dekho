/* জীবন-ড্যাশবোর্ড: chapter reader-এ web text, verified PDF range এবং স্পষ্ট next/previous reading flow দেখায়। */
import type { BookChapter } from "@/data/book";
import { chapterNoteStorageKey, chapterStorageKey, getBookDefinition, type BookId } from "@/data/books";
import { useReader } from "@/contexts/ReaderContext";
import { BookmarkButton } from "@/components/BookmarkButton";
import { ExerciseCard } from "@/components/ExerciseCard";
import { NotePanel } from "@/components/NotePanel";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, FileText, Quote, ScrollText } from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";

export function ReadingCanvas({ bookId, chapter }: { bookId: BookId; chapter: BookChapter }) {
  const { fontSize, setFontSize, setProgress } = useReader();
  const chapterKey = chapterStorageKey(bookId, chapter.id);
  const book = getBookDefinition(bookId);
  const chapterIndex = book.chapters.findIndex((item) => item.id === chapter.id);
  const previousChapter = chapterIndex > 0 ? book.chapters[chapterIndex - 1] : undefined;
  const nextChapter = chapterIndex >= 0 ? book.chapters[chapterIndex + 1] : undefined;
  const pageRange = book.chapters[chapterIndex];
  useEffect(() => {
    const recordProgress = () => {
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      if (maximum <= 0) return;
      setProgress(chapterKey, (window.scrollY / maximum) * 100);
    };
    window.addEventListener("scroll", recordProgress, { passive: true });
    recordProgress();
    return () => window.removeEventListener("scroll", recordProgress);
  }, [chapterKey, setProgress]);
  return <main className={`reading-canvas reading-canvas--${fontSize}`}>
    <header className="reading-canvas__hero"><div className="reading-canvas__eyebrow">অধ্যায় {chapter.number.toLocaleString("bn-BD").padStart(2, "০")}</div><h1>{chapter.title}</h1><p>{chapter.subtitle}</p><div className="reading-canvas__meta"><span><Clock3 className="size-4" /> প্রায় {chapter.readingMinutes || 18} মিনিট</span><BookmarkButton chapterId={chapterKey} label={false} />{pageRange?.pageStart && <Link className="reading-canvas__pdf-page" href={`/book/${bookId}/page/${pageRange.pageStart}`}><FileText className="size-4" /> PDF পৃষ্ঠা {pageRange.pageStart.toLocaleString("bn-BD")}–{pageRange.pageEnd?.toLocaleString("bn-BD")}</Link>}<Link className="reading-canvas__scroll-link" href={`/book/${bookId}/scroll#chapter-${chapter.id}`}><ScrollText className="size-4" /> একটানা স্ক্রল</Link></div><div className="chapter-thread" aria-hidden="true"><span /></div></header>
    <article className="reading-canvas__article">{chapter.sections.map((section, sectionIndex) => <section className="reading-section" key={section.id}><div className="reading-section__marker">{String(sectionIndex + 1).padStart(2, "0")}</div><div className="reading-section__content"><h2>{section.title}</h2>{section.blocks.map((block, index) => block.type === "subheading" ? <h3 key={`${block.content}-${index}`}>{block.content}</h3> : block.content.startsWith("• ") ? <p className="reading-list-item" key={`${block.content}-${index}`}>{block.content}</p> : <p key={`${block.content.slice(0, 30)}-${index}`}>{block.content}</p>)}</div></section>)}{chapter.exercises.length > 0 && <section className="chapter-exercises" id="chapter-practice"><div className="chapter-exercises__intro"><Quote className="size-5" /><div><p className="eyebrow">পড়ার পরের বিরতি</p><h2>নিজের জীবনে মিলিয়ে দেখো</h2></div></div><div className="chapter-exercises__grid">{chapter.exercises.map((exercise, index) => <ExerciseCard key={`${exercise.title}-${index}`} chapterId={chapterKey} index={index} {...exercise} />)}</div></section>}</article>
    <section className="reading-canvas__end-nav" aria-label="পাঠের শেষে navigation">
      <div className="reading-canvas__end-marker"><span aria-hidden="true"><CheckCircle2 className="size-4" /></span><div><p>পৃষ্ঠা শেষ</p><h2>এই পাঠটি শেষ হয়েছে</h2><small>এখন আগের পাঠে ফিরুন অথবা পরের পাঠে যান</small></div></div>
      <div className="reading-canvas__end-thread" aria-hidden="true"><span /></div>
      <nav className="reading-canvas__pager" aria-label="পূর্ববর্তী ও পরবর্তী পৃষ্ঠা">
        {previousChapter ? <Link className="reader-page-link" href={`/book/${bookId}/chapter/${previousChapter.id}`}><ArrowLeft className="size-4" /><span><small>পূর্ববর্তী পৃষ্ঠা</small><strong>{previousChapter.title}</strong></span></Link> : <span className="reader-page-link reader-page-link--disabled" aria-disabled="true"><ArrowLeft className="size-4" /><span><small>পূর্ববর্তী পৃষ্ঠা</small><strong>এটি বইয়ের শুরু</strong></span></span>}
        {nextChapter ? <Link className="reader-page-link reader-page-link--next" href={`/book/${bookId}/chapter/${nextChapter.id}`}><span><small>পরবর্তী পৃষ্ঠা</small><strong>{nextChapter.title}</strong></span><ArrowRight className="size-4" /></Link> : <Link className="reader-page-link reader-page-link--next" href="/"><span><small>বই শেষ</small><strong>বইঘরে ফিরে যাও</strong></span><CheckCircle2 className="size-4" /></Link>}
      </nav>
    </section>
    <div className="reading-canvas__mobile-tools" aria-label="মোবাইল reading control"><BookmarkButton chapterId={chapterKey} /><div className="font-control"><span>লেখার আকার</span><div>{(["small", "medium", "large"] as const).map((size) => <button key={size} type="button" className={fontSize === size ? "is-active" : ""} onClick={() => setFontSize(size)} aria-label={`${size === "small" ? "ছোট" : size === "medium" ? "মাঝারি" : "বড়"} লেখা`} aria-pressed={fontSize === size}>অ</button>)}</div></div></div>
    <div className="reading-canvas__mobile-note"><NotePanel noteKey={chapterNoteStorageKey(bookId, chapter.id)} /></div><footer className="reading-canvas__footer">পাঠের জায়গা ও অগ্রগতি স্বয়ংক্রিয়ভাবে সেভ হচ্ছে</footer>
  </main>;
}
