/* জীবন-ড্যাশবোর্ড: selected book-এর PDF-কে book-aware, mobile-stable page workspace-এ দেখায়। */
import { AppHeader } from "@/components/AppHeader";
import { PdfPageCanvas } from "@/components/PdfPageCanvas";
import { Button } from "@/components/ui/button";
import { getBookDefinition, getDarkChapterForPdfPage, getDarkChapterPageRange } from "@/data/books";
import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, FileText, Hand, Hash, Search } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "wouter";

function pageLabel(bookId: string, page: number, pageCount: number) {
  if (bookId !== "dark") return page === 1 ? "প্রচ্ছদ ও শুরুর কথা" : `বইয়ের পৃষ্ঠা ${page.toLocaleString("bn-BD")} / ${pageCount.toLocaleString("bn-BD")}`;
  const chapter = getDarkChapterForPdfPage(page);
  if (page <= 15) return "শুরুর কথা ও clickable পাঠসূচি";
  if (chapter) return `অধ্যায় ${chapter.number.toLocaleString("bn-BD").padStart(2, "০")} · ${chapter.title}`;
  if (page <= 460) return "অংশের ভূমিকা বা পাঠ-মানচিত্র";
  if (page <= 497) return "Field Guide Appendix";
  return "শেষের অনুশীলন ও সমাপ্তি";
}

export default function PageReader() {
  const { bookId, page: routePage } = useParams<{ bookId?: string; page?: string }>();
  const book = getBookDefinition(bookId);
  const [, setLocation] = useLocation();
  const parsedPage = Number(routePage);
  const page = Number.isInteger(parsedPage) ? Math.max(1, Math.min(book.pdfPageCount, parsedPage)) : 1;
  const [value, setValue] = useState(String(page));
  const darkChapter = book.id === "dark" ? getDarkChapterForPdfPage(page) : null;
  const pageProgress = Math.max(1, Math.round((page / book.pdfPageCount) * 100));
  const firstChapterId = book.chapters[0]?.id || "01";

  useEffect(() => { setValue(String(page)); window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [page]);

  const goToPage = (event: FormEvent) => {
    event.preventDefault();
    const requested = Number(value);
    if (!Number.isFinite(requested)) return;
    setLocation(`/book/${book.id}/page/${Math.max(1, Math.min(book.pdfPageCount, Math.round(requested)))}`);
  };

  return <div className="page-shell pdf-reader-page"><AppHeader /><main className="pdf-reader">
    <header className="pdf-reader__header"><div><p className="store-eyebrow"><FileText className="size-4" /> {book.title} · {book.pdfPageCount.toLocaleString("bn-BD")} নকশা-পৃষ্ঠা</p><h1>নির্দিষ্ট পৃষ্ঠায় পড়ো</h1><p>নিজের গতিতে পড়ো, খেয়াল করো, তারপর একটি ছোট প্রয়োগ বেছে নাও।</p></div><div className="pdf-reader__mode-links"><Link href={`/book/${book.id}/swipe/${page}`} className="pdf-reader__chapter-link"><Hand className="size-4" /> swipe করে পড়া</Link><Link href={`/book/${book.id}/chapter/${firstChapterId}`} className="pdf-reader__chapter-link"><BookOpen className="size-4" /> অধ্যায়ভিত্তিক পড়া</Link></div></header>
    <section className="pdf-reader__workspace" aria-label="পৃষ্ঠা navigation ও PDF viewer"><aside className="pdf-reader__controls"><div className="pdf-reader__active"><span>এখন দেখছ</span><strong>পৃষ্ঠা {page.toLocaleString("bn-BD")}</strong><p>{pageLabel(book.id, page, book.pdfPageCount)}</p><div className="pdf-reader__thread" aria-label={`বইয়ের ${pageProgress} শতাংশ দেখা হয়েছে`}><span style={{ width: `${pageProgress}%` }} /></div><small>পথের {pageProgress.toLocaleString("bn-BD")}% দেখা হলো</small></div><form onSubmit={goToPage} className="pdf-reader__form"><label htmlFor="page-number"><Hash className="size-4" /> যে পৃষ্ঠায় যেতে চাও</label><div><input id="page-number" inputMode="numeric" min="1" max={book.pdfPageCount} value={value} onChange={(event) => setValue(event.target.value)} aria-label="পৃষ্ঠা নম্বর লিখুন" /><Button type="submit" size="sm"><Search className="size-4" /> যাও</Button></div><small>১ থেকে {book.pdfPageCount.toLocaleString("bn-BD")}-এর মধ্যে লিখুন</small></form><div className="pdf-reader__stepper"><Button asChild variant="outline" disabled={page === 1}><Link href={`/book/${book.id}/page/${page - 1}`}><ArrowLeft className="size-4" /> আগের</Link></Button><Button asChild variant="outline" disabled={page === book.pdfPageCount}><Link href={`/book/${book.id}/page/${page + 1}`}>পরের <ArrowRight className="size-4" /></Link></Button></div><div className="pdf-reader__application"><span>আজকের প্রয়োগ</span><strong>একটি বাক্য চিহ্নিত করো</strong><p>এই পৃষ্ঠায় কোন কথা তোমাকে থামতে, ভাবতে বা নিজের জীবনের সঙ্গে মিলিয়ে দেখতে বলছে—একটি নোটে লিখে রাখো।</p></div>{darkChapter && (() => { const range = getDarkChapterPageRange(darkChapter.number); return <div className="pdf-reader__chapter-card"><span>এই পৃষ্ঠাটি যে অধ্যায়ে</span><strong>{darkChapter.title}</strong><small>পৃষ্ঠা {range?.pageStart.toLocaleString("bn-BD")}–{range?.pageEnd.toLocaleString("bn-BD")}</small><Link href={`/book/dark/chapter/${darkChapter.id}`}>ওয়েব রিডারে অধ্যায়টি পড়ো <ArrowRight className="size-3.5" /></Link></div>; })()}<a className="pdf-reader__open" href={`${book.pdfUrl}#page=${page}`} target="_blank" rel="noreferrer"><ExternalLink className="size-4" /> আলাদা tab-এ খোলো</a></aside><section className="pdf-reader__frame-wrap"><PdfPageCanvas key={`${book.id}-${page}`} source={book.pdfUrl} page={page} /></section></section>
  </main></div>;
}
