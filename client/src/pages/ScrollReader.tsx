/* জীবন-ড্যাশবোর্ড scroll reader: editorial paper rhythm, calm continuous flow, and chapter-aware wayfinding. */
import { AppHeader } from "@/components/AppHeader";
import { BookmarkButton } from "@/components/BookmarkButton";
import { ChapterSidebar } from "@/components/ChapterSidebar";
import { ContextRail } from "@/components/ContextRail";
import { ExerciseCard } from "@/components/ExerciseCard";
import type { BookChapter } from "@/data/book";
import { chapterStorageKey, getBookDefinition } from "@/data/books";
import { useReader } from "@/contexts/ReaderContext";
import { ArrowLeft, BookOpen, CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "wouter";

export default function ScrollReader() {
  const params = useParams<{ bookId?: string }>();
  const book = getBookDefinition(params.bookId);
  const { fontSize, setActiveChapter, setProgress } = useReader();
  const [chapters, setChapters] = useState<BookChapter[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [activeChapterId, setActiveChapterId] = useState(book.chapters[0]?.id || "01");
  const chapterElements = useRef(new Map<string, HTMLElement>());
  const restoredBookId = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setChapters([]);
    setLoadedCount(0);
    setActiveChapterId(book.chapters[0]?.id || "01");
    const loadAllChapters = async () => {
      const resolved: BookChapter[] = [];
      for (const chapter of book.chapters) {
        const module = await book.chapterLoaders[chapter.id]();
        if (cancelled) return;
        resolved.push(module.default);
        setChapters([...resolved]);
        setLoadedCount(resolved.length);
      }
    };
    void loadAllChapters();
    return () => { cancelled = true; };
  }, [book]);

  useEffect(() => {
    if (chapters.length !== book.chapters.length || restoredBookId.current === book.id) return;
    restoredBookId.current = book.id;
    const requestedId = window.location.hash.replace("#chapter-", "");
    if (!book.chapters.some((chapter) => chapter.id === requestedId)) {
      setActiveChapter(book.id, book.chapters[0]?.id || "01");
      return;
    }
    const target = chapterElements.current.get(requestedId);
    if (!target) return;
    const frame = window.requestAnimationFrame(() => {
      setActiveChapterId(requestedId);
      setActiveChapter(book.id, requestedId);
      target.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [book, chapters.length, setActiveChapter]);

  useEffect(() => {
    if (chapters.length === 0) return;
    let animationFrame = 0;
    const updateReadingPosition = () => {
      const anchor = Math.min(190, Math.round(window.innerHeight * 0.29));
      let visibleChapter = book.chapters[0];
      let localProgress = 4;
      for (const chapter of book.chapters) {
        const element = chapterElements.current.get(chapter.id);
        if (!element) continue;
        const bounds = element.getBoundingClientRect();
        if (bounds.top <= anchor) {
          visibleChapter = chapter;
          localProgress = Math.max(4, Math.min(100, ((anchor - bounds.top) / Math.max(bounds.height, 1)) * 100));
        } else {
          break;
        }
      }
      setActiveChapterId((current) => current === visibleChapter.id ? current : visibleChapter.id);
      setActiveChapter(book.id, visibleChapter.id);
      setProgress(chapterStorageKey(book.id, visibleChapter.id), localProgress);
    };
    const onScroll = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        updateReadingPosition();
      });
    };
    const observer = new IntersectionObserver(onScroll, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });
    chapterElements.current.forEach((element) => observer.observe(element));
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [book, chapters.length, setActiveChapter, setProgress]);

  const loading = chapters.length !== book.chapters.length;
  const currentChapter = chapters.find((chapter) => chapter.id === activeChapterId) || chapters[0];

  return <div className="page-shell scroll-reader-page"><AppHeader /><div className="scroll-reader-layout">
    <ChapterSidebar bookId={book.id} currentChapterId={activeChapterId} mode="scroll" />
    <main className={`scroll-reader reading-canvas reading-canvas--${fontSize}`} aria-busy={loading}>
      <header className="scroll-reader__hero"><div><span className="reading-canvas__eyebrow">একটানা পাঠ · {book.chapters.length.toLocaleString("bn-BD")} অধ্যায়</span><h1>{book.title}</h1><p>PDF-এর মতো একটানা নিচে স্ক্রল করে পুরো বই পড়ুন। বাম পাশের অধ্যায় তালিকা থেকে যেকোনো জায়গায় যাওয়া যাবে।</p></div><Link className="scroll-reader__mode-link" href={`/book/${book.id}/chapter/${currentChapter?.id || "01"}`}><BookOpen className="size-4" /> অধ্যায় মোডে যাও</Link></header>
      <div className="scroll-reader__status" aria-live="polite"><span>স্ক্রল reading mode</span><strong>{loading ? `${loadedCount.toLocaleString("bn-BD")} / ${book.chapters.length.toLocaleString("bn-BD")} অধ্যায় প্রস্তুত হচ্ছে` : `অধ্যায় ${activeChapterId} পড়ছ`}</strong><i style={{ width: `${Math.max(2, (loadedCount / book.chapters.length) * 100)}%` }} /></div>
      {chapters.map((chapter) => <article id={`chapter-${chapter.id}`} key={chapter.id} ref={(element) => { if (element) chapterElements.current.set(chapter.id, element); else chapterElements.current.delete(chapter.id); }} className="scroll-reader__chapter">
        <header className="reading-canvas__hero scroll-reader__chapter-hero"><div className="reading-canvas__eyebrow">অধ্যায় {chapter.number.toLocaleString("bn-BD").padStart(2, "০")}</div><h2>{chapter.title}</h2><p>{chapter.subtitle}</p><div className="reading-canvas__meta"><span>প্রায় {chapter.readingMinutes || 18} মিনিট</span><BookmarkButton chapterId={chapterStorageKey(book.id, chapter.id)} label={false} /></div><div className="chapter-thread" aria-hidden="true"><span /></div></header>
        <div className="reading-canvas__article">{chapter.sections.map((section, sectionIndex) => <section className="reading-section" key={section.id}><div className="reading-section__marker">{String(sectionIndex + 1).padStart(2, "0")}</div><div className="reading-section__content"><h3>{section.title}</h3>{section.blocks.map((block, index) => block.type === "image" ? <figure className="reading-visual" key={`${block.content}-${index}`}><img src={block.content} alt={block.alt || "বইয়ের illustration"} loading="lazy" /><figcaption>{block.alt}</figcaption></figure> : block.type === "subheading" ? <h4 key={`${block.content}-${index}`}>{block.content}</h4> : block.content.startsWith("• ") ? <p className="reading-list-item" key={`${block.content}-${index}`}>{block.content}</p> : <p key={`${block.content.slice(0, 30)}-${index}`}>{block.content}</p>)}</div></section>)}{chapter.exercises.length > 0 && <section id={`chapter-practice-${chapter.id}`} className="chapter-exercises"><div className="chapter-exercises__intro"><CheckCircle2 className="size-5" /><div><p className="eyebrow">পড়ার পরের বিরতি</p><h3>নিজের জীবনে মিলিয়ে দেখো</h3></div></div><div className="chapter-exercises__grid">{chapter.exercises.map((exercise, index) => <ExerciseCard key={`${exercise.title}-${index}`} chapterId={chapterStorageKey(book.id, chapter.id)} index={index} {...exercise} />)}</div></section>}</div>
        <div className="scroll-reader__chapter-break" aria-label={`অধ্যায় ${chapter.number} শেষ`}><span /><small>অধ্যায় {chapter.number.toLocaleString("bn-BD")} শেষ</small><span /></div>
      </article>)}
      {loading && <div className="scroll-reader__loading"><Loader2 className="size-5 animate-spin" /><span>পরের অধ্যায়গুলো প্রস্তুত হচ্ছে…</span></div>}
      {!loading && <footer className="scroll-reader__book-end"><CheckCircle2 className="size-5" /><div><p>বই শেষ</p><h2>এই বইয়ের একটানা পাঠ সম্পূর্ণ হয়েছে</h2></div><Link href="/"><ArrowLeft className="size-4" /> বইঘরে ফিরে যাও</Link></footer>}
    </main>
    {currentChapter && <ContextRail bookId={book.id} chapter={currentChapter} practiceAnchor={`#chapter-practice-${currentChapter.id}`} />}
  </div></div>;
}
