/* জীবন-ড্যাশবোর্ড: warm-paper, one-page-at-a-time swipe workspace with a visible progress thread. */
import { AppHeader } from "@/components/AppHeader";
import { ChapterSidebar } from "@/components/ChapterSidebar";
import { ContextRail } from "@/components/ContextRail";
import { PdfPageCanvas } from "@/components/PdfPageCanvas";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import type { BookChapter } from "@/data/book";
import { chapterStorageKey, getBookDefinition } from "@/data/books";
import { useReader } from "@/contexts/ReaderContext";
import { ArrowLeft, ArrowRight, BookOpen, FileText, Hand, PanelsTopLeft } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "wouter";

function pageLabel(page: number, pageCount: number) {
  return `পৃষ্ঠা ${page.toLocaleString("bn-BD")} / ${pageCount.toLocaleString("bn-BD")}`;
}

export default function SwipePageReader() {
  const { bookId, page: routePage } = useParams<{ bookId?: string; page?: string }>();
  const book = getBookDefinition(bookId);
  const [, setLocation] = useLocation();
  const { setActiveChapter, setProgress } = useReader();
  const parsedPage = Number(routePage);
  const page = Number.isInteger(parsedPage) ? Math.max(1, Math.min(book.pdfPageCount, parsedPage)) : 1;
  const [api, setApi] = useState<CarouselApi>();
  const [currentChapter, setCurrentChapter] = useState<BookChapter | null>(null);
  const options = useMemo(() => ({ align: "center" as const, startIndex: page - 1, loop: false, duration: 24 }), [page]);
  const pageNumbers = useMemo(() => Array.from({ length: book.pdfPageCount }, (_, index) => index + 1), [book.pdfPageCount]);
  const progress = Math.max(1, Math.round((page / book.pdfPageCount) * 100));
  const firstChapterId = book.chapters[0]?.id || "01";
  const currentChapterMeta = useMemo(() => {
    const mapped = book.chapters.find((chapter) => chapter.pageStart && chapter.pageEnd && page >= chapter.pageStart && page <= chapter.pageEnd);
    if (mapped) return mapped;
    const index = Math.min(book.chapters.length - 1, Math.floor(((page - 1) / book.pdfPageCount) * book.chapters.length));
    return book.chapters[index] || book.chapters[0];
  }, [book, page]);

  const goTo = useCallback((targetPage: number) => {
    const safePage = Math.max(1, Math.min(book.pdfPageCount, targetPage));
    if (safePage !== page) setLocation(`/book/${book.id}/swipe/${safePage}`);
  }, [book.id, book.pdfPageCount, page, setLocation]);

  useEffect(() => {
    if (!api) return;
    api.scrollTo(page - 1, true);
    const syncRoute = () => goTo(api.selectedScrollSnap() + 1);
    api.on("select", syncRoute);
    return () => { api.off("select", syncRoute); };
  }, [api, goTo, page]);

  useEffect(() => {
    if (!currentChapterMeta) return;
    let cancelled = false;
    const pageStart = currentChapterMeta.pageStart ?? Math.floor(((currentChapterMeta.number - 1) / book.chapters.length) * book.pdfPageCount) + 1;
    const pageEnd = currentChapterMeta.pageEnd ?? Math.floor((currentChapterMeta.number / book.chapters.length) * book.pdfPageCount);
    const chapterProgress = Math.max(4, Math.min(100, Math.round(((page - pageStart + 1) / Math.max(1, pageEnd - pageStart + 1)) * 100)));
    setActiveChapter(book.id, currentChapterMeta.id);
    setProgress(chapterStorageKey(book.id, currentChapterMeta.id), chapterProgress);
    setCurrentChapter(null);
    const loader = book.chapterLoaders[currentChapterMeta.id];
    if (!loader) return;
    void loader().then((module) => {
      if (!cancelled) setCurrentChapter(module.default);
    }).catch(() => {
      if (!cancelled) setCurrentChapter(null);
    });
    return () => { cancelled = true; };
  }, [book, currentChapterMeta, page, setActiveChapter, setProgress]);

  return <div className="page-shell swipe-reader-page"><AppHeader /><div className="swipe-reader-layout"><ChapterSidebar bookId={book.id} currentChapterId={currentChapterMeta?.id} mode="swipe" /><main className="swipe-reader">
    <header className="swipe-reader__header"><div><span className="store-eyebrow"><Hand className="size-4" /> পাতা উল্টে পাঠ · একবারে একটি পৃষ্ঠা</span><h1>{book.title}</h1><p>ডানে বা বাঁয়ে টানুন। প্রতিটি নড়াচড়ায় বইয়ের একটি পৃষ্ঠা বদলাবে।</p></div><div className="swipe-reader__mode-links"><Link href={`/book/${book.id}/page/${page}`}><FileText className="size-4" /> পৃষ্ঠা বেছে পড়া</Link><Link href={`/book/${book.id}/chapter/${firstChapterId}`}><BookOpen className="size-4" /> অধ্যায়ভিত্তিক পাঠ</Link></div></header>

    <section className="swipe-reader__status" aria-label="বর্তমান পাতা-উল্টে পাঠের অবস্থা"><div><span>এখন দেখছ</span><strong>{pageLabel(page, book.pdfPageCount)}</strong><small>{currentChapterMeta ? `অধ্যায় ${String(currentChapterMeta.number).padStart(2, "0")} · ${currentChapterMeta.title}` : "পাঠের অবস্থান নির্ধারণ হচ্ছে"}</small></div><div className="swipe-reader__thread" aria-label={`${progress.toLocaleString("bn-BD")} শতাংশ দেখা হয়েছে`}><span style={{ width: `${progress}%` }} /></div><small>{progress.toLocaleString("bn-BD")}% পথ এগিয়েছে</small></section>

    <section className="swipe-reader__workspace" aria-label="Swipe করে PDF পৃষ্ঠা পড়ুন"><Carousel setApi={setApi} opts={options} className="swipe-reader__carousel"><CarouselContent className="swipe-reader__track">{pageNumbers.map((slidePage) => <CarouselItem key={slidePage} className="swipe-reader__slide"><div className="swipe-reader__paper" aria-label={pageLabel(slidePage, book.pdfPageCount)}>{Math.abs(slidePage - page) <= 1 ? <PdfPageCanvas source={book.pdfUrl} page={slidePage} /> : <div className="swipe-reader__placeholder" aria-hidden="true"><PanelsTopLeft className="size-5" /><span>পৃষ্ঠা {slidePage.toLocaleString("bn-BD")}</span></div>}</div></CarouselItem>)}</CarouselContent></Carousel></section>

    <nav className="swipe-reader__controls" aria-label="পৃষ্ঠা বদলান"><Button variant="outline" onClick={() => goTo(page - 1)} disabled={page === 1}><ArrowLeft className="size-4" /> আগের পৃষ্ঠা</Button><span><b>{page.toLocaleString("bn-BD")}</b> / {book.pdfPageCount.toLocaleString("bn-BD")}</span><Button onClick={() => goTo(page + 1)} disabled={page === book.pdfPageCount}>পরের পৃষ্ঠা <ArrowRight className="size-4" /></Button></nav>
    <p className="swipe-reader__hint">টিপ: মোবাইলে পৃষ্ঠাটির ওপর আঙুল রেখে ডানে বা বাঁয়ে টানলেই পরের বা আগের পৃষ্ঠায় যাবে। ডান পাশের <b>আজকের প্রয়োগ</b> থেকে পড়ার একটি ছোট কাজ বেছে নাও।</p>
  </main>{currentChapter ? <ContextRail bookId={book.id} chapter={currentChapter} practiceAnchor={`/book/${book.id}/workbook`} /> : <aside className="swipe-reader__context-wait" aria-label="পাঠের প্রেক্ষিত"><span>আজকের প্রয়োগ</span><strong>এই পাতার ভাবনাটি নিজের জীবনের একটি ঘটনার সঙ্গে মিলিয়ে দেখো।</strong><Link href={`/book/${book.id}/workbook`}>অনুশীলনে যাও</Link></aside>}</div></div>;
}
