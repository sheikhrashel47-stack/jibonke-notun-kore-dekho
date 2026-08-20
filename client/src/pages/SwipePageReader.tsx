/* জীবন-ড্যাশবোর্ড: an immersive one-page reader; the page fills the mobile stage and only deliberate horizontal swipes turn pages. */
import { AppHeader } from "@/components/AppHeader";
import { ChapterSidebar } from "@/components/ChapterSidebar";
import { ContextRail } from "@/components/ContextRail";
import { BackButton } from "@/components/BackButton";
import { PdfPageCanvas, prefetchPdfPages } from "@/components/PdfPageCanvas";
import { Button } from "@/components/ui/button";
import type { BookChapter } from "@/data/book";
import { chapterStorageKey, getBookDefinition } from "@/data/books";
import { useReader } from "@/contexts/ReaderContext";
import { ArrowLeft, ArrowRight, BookOpen, FileText, Hand } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type TouchEvent } from "react";
import { Link, useLocation, useParams } from "wouter";

function pageLabel(page: number, pageCount: number) { return `পৃষ্ঠা ${page.toLocaleString("bn-BD")} / ${pageCount.toLocaleString("bn-BD")}`; }

export default function SwipePageReader() {
  const { bookId, page: routePage } = useParams<{ bookId?: string; page?: string }>();
  const book = getBookDefinition(bookId);
  const [, setLocation] = useLocation();
  const { setActiveChapter, setProgress } = useReader();
  const parsedPage = Number(routePage);
  const page = Number.isInteger(parsedPage) ? Math.max(1, Math.min(book.pdfPageCount, parsedPage)) : 1;
  const [currentChapter, setCurrentChapter] = useState<BookChapter | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const progress = Math.max(1, Math.round((page / book.pdfPageCount) * 100));
  const firstChapterId = book.chapters[0]?.id || "01";
  const currentChapterMeta = useMemo(() => {
    const mapped = book.chapters.find((chapter) => chapter.pageStart && chapter.pageEnd && page >= chapter.pageStart && page <= chapter.pageEnd);
    if (mapped) return mapped;
    return book.chapters[Math.min(book.chapters.length - 1, Math.floor(((page - 1) / book.pdfPageCount) * book.chapters.length))] || book.chapters[0];
  }, [book, page]);
  const goTo = useCallback((targetPage: number) => {
    const safePage = Math.max(1, Math.min(book.pdfPageCount, targetPage));
    if (safePage !== page) setLocation(`/book/${book.id}/swipe/${safePage}`);
  }, [book.id, book.pdfPageCount, page, setLocation]);

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    const touch = event.changedTouches[0];
    touchStart.current = null;
    if (!start || !touch) return;
    const x = touch.clientX - start.x;
    const y = touch.clientY - start.y;
    if (Math.abs(x) > 54 && Math.abs(x) > Math.abs(y)) goTo(x < 0 ? page + 1 : page - 1);
  };

  useEffect(() => { prefetchPdfPages(book.pdfUrl, [page - 1, page + 1].filter((item) => item >= 1 && item <= book.pdfPageCount)); }, [book.pdfPageCount, book.pdfUrl, page]);
  useEffect(() => {
    if (!currentChapterMeta) return;
    let cancelled = false;
    const start = currentChapterMeta.pageStart ?? 1;
    const end = currentChapterMeta.pageEnd ?? book.pdfPageCount;
    setActiveChapter(book.id, currentChapterMeta.id);
    setProgress(chapterStorageKey(book.id, currentChapterMeta.id), Math.max(4, Math.min(100, Math.round(((page - start + 1) / Math.max(1, end - start + 1)) * 100))));
    setCurrentChapter(null);
    void book.chapterLoaders[currentChapterMeta.id]?.().then((module) => { if (!cancelled) setCurrentChapter(module.default); }).catch(() => { if (!cancelled) setCurrentChapter(null); });
    return () => { cancelled = true; };
  }, [book, currentChapterMeta, page, setActiveChapter, setProgress]);

  useEffect(() => {
    document.documentElement.classList.add("immersive-swipe-active");
    document.body.classList.add("immersive-swipe-active");
    return () => {
      document.documentElement.classList.remove("immersive-swipe-active");
      document.body.classList.remove("immersive-swipe-active");
    };
  }, []);

  return <div className="page-shell swipe-reader-page"><AppHeader /><div className="swipe-reader-layout"><ChapterSidebar bookId={book.id} currentChapterId={currentChapterMeta?.id} mode="swipe" /><main className="swipe-reader">
    <div className="swipe-reader__immersive-bar" aria-label="পাঠের নিয়ন্ত্রণ">
      <BackButton fallback={`/book/${book.id}`} label="ফিরুন" compact />
      <div><strong>{page.toLocaleString("bn-BD")} / {book.pdfPageCount.toLocaleString("bn-BD")}</strong><span>{currentChapterMeta ? currentChapterMeta.title : book.title}</span></div>
      <Link href={`/book/${book.id}/page/${page}`} aria-label="নির্দিষ্ট পৃষ্ঠা বেছে পড়ুন"><FileText className="size-4" /></Link>
    </div>
    <header className="swipe-reader__header"><div><span className="store-eyebrow"><Hand className="size-4" /> পাতা উল্টে পাঠ · একবারে একটি পৃষ্ঠা</span><h1>{book.title}</h1><p>পাতা বদলাতে ডানে বা বাঁয়ে টানো। এই mode-এ উপরে-নিচে scrolling বন্ধ।</p></div><div className="swipe-reader__mode-links"><Link href={`/book/${book.id}/page/${page}`}><FileText className="size-4" /> পৃষ্ঠা বেছে পড়া</Link><Link href={`/book/${book.id}/chapter/${firstChapterId}`}><BookOpen className="size-4" /> অধ্যায়ভিত্তিক পাঠ</Link></div></header>
    <section className="swipe-reader__status" aria-label="বর্তমান পাতা-উল্টে পাঠের অবস্থা"><div><span>এখন দেখছ</span><strong>{pageLabel(page, book.pdfPageCount)}</strong><small>{currentChapterMeta ? `অধ্যায় ${String(currentChapterMeta.number).padStart(2, "0")} · ${currentChapterMeta.title}` : "পাঠের অবস্থান নির্ধারণ হচ্ছে"}</small></div><div className="swipe-reader__thread"><span style={{ width: `${progress}%` }} /></div><small>{progress.toLocaleString("bn-BD")}% পথ এগিয়েছে</small></section>
    <section className="swipe-reader__workspace" aria-label="PDF পৃষ্ঠা পড়ুন"><div className="swipe-reader__paper" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}><PdfPageCanvas source={book.pdfUrl} page={page} fit="contain" /><span className="swipe-reader__page-cue">ডানে বা বাঁয়ে টেনে পাতা বদলাও</span></div></section>
    <nav className="swipe-reader__controls" aria-label="পৃষ্ঠা বদলান"><Button variant="outline" onClick={() => goTo(page - 1)} disabled={page === 1}><ArrowLeft className="size-4" /> আগের পৃষ্ঠা</Button><span><b>{page.toLocaleString("bn-BD")}</b> / {book.pdfPageCount.toLocaleString("bn-BD")}</span><Button onClick={() => goTo(page + 1)} disabled={page === book.pdfPageCount}>পরের পৃষ্ঠা <ArrowRight className="size-4" /></Button></nav>
    <p className="swipe-reader__hint">টিপ: শুধু এখনকার পাতা ও পাশের দুই পাতা আগে থেকে তৈরি হয়—তাই আগের চেয়ে দ্রুত পড়তে পারবে।</p>
  </main>{currentChapter ? <ContextRail bookId={book.id} chapter={currentChapter} practiceAnchor={`/book/${book.id}/workbook`} /> : <aside className="swipe-reader__context-wait"><span>আজকের প্রয়োগ</span><strong>এই পাতার ভাবনাটি নিজের জীবনের একটি ঘটনার সঙ্গে মিলিয়ে দেখো।</strong><Link href={`/book/${book.id}/workbook`}>অনুশীলনে যাও</Link></aside>}</div></div>;
}
