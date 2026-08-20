/* জীবন-ড্যাশবোর্ড storefront: paper-led reading workspace, visible progress thread and practical next actions. */
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { bookDefinitions, chapterStorageKey, darkPdfUrl, type BookId } from "@/data/books";
import { useReader } from "@/contexts/ReaderContext";
import { ArrowDownToLine, ArrowRight, BookMarked, BookOpen, Bookmark, ChartNoAxesCombined, CircleCheckBig, Clock3, FileText, LibraryBig, MessageSquareText, ShieldCheck, StickyNote } from "lucide-react";
import { Link } from "wouter";

const assets = {
  firstCover: "/manus-storage/jibon-cover_c88ed0da.png",
  darkCover: "/manus-storage/dark-psychology-cover_7f27c9b4.png",
  firstPdf: "https://github.com/sheikhrashel47-stack/jibonke-notun-kore-dekho/releases/download/store-assets-v1/jibonke_notun_kore_dekho_ebook.pdf",
  darkPdf: darkPdfUrl,
};

const books = [
  { id: "life" as const, title: "জীবনকে নতুন করে দেখো", subtitle: "নিজের সঙ্গে নতুন করে পরিচয়ের একটি পাঠযাত্রা", description: "চিন্তা, সম্পর্ক, মনোযোগ, সিদ্ধান্ত ও অর্থপূর্ণ জীবনের জন্য ১৫ অধ্যায়ের বাংলা companion।", meta: "৩১৬ পৃষ্ঠা · ১৫ অধ্যায়", cover: assets.firstCover, tone: "sage" },
  { id: "dark" as const, title: "Dark Psychology", subtitle: "মানসিক প্রভাব বুঝে নিজের সীমা রক্ষার ব্যবহারিক guide", description: "৫০ অধ্যায়ের নৈতিক self-defense e-book—manipulation চিনতে, শান্ত থাকতে ও নিরাপদ সিদ্ধান্ত নিতে সাহায্য করবে।", meta: "৫০০ পৃষ্ঠা · ৫০ অধ্যায়", cover: assets.darkCover, tone: "navy" },
] as const;

export default function Home() {
  const { activeBookId, activeChapterId, bookmarks, lastChapterByBook, notes, progress } = useReader();
  const progressFor = (bookId: BookId) => {
    const chapters = bookDefinitions[bookId].chapters;
    return Math.min(100, Math.round(chapters.reduce((total, chapter) => total + (progress[chapterStorageKey(bookId, chapter.id)] || 0), 0) / chapters.length));
  };
  const completedFor = (bookId: BookId) => bookDefinitions[bookId].chapters.filter((chapter) => (progress[chapterStorageKey(bookId, chapter.id)] || 0) >= 95).length;
  const activeChapter = lastChapterByBook[activeBookId] || activeChapterId || "01";
  const activeBook = books.find((book) => book.id === activeBookId) || books[0];
  const activeDefinition = bookDefinitions[activeBookId];
  const activeProgress = progressFor(activeBookId);
  const activeCompleted = completedFor(activeBookId);
  const bookmarkCount = bookmarks.filter((key) => key.startsWith(`${activeBookId}:`)).length;
  const noteCount = Object.entries(notes).filter(([key, value]) => key.includes(`:${activeBookId}`) && value.trim().length > 0).length;

  return <div className="storefront min-h-screen"><AppHeader /><main className="store-dashboard">
    <header className="store-dashboard__intro"><div><span className="store-eyebrow"><LibraryBig className="size-4" /> জীবন বইঘর · তোমার পাঠের জায়গা</span><h1>আজকের পাঠ,<br /><em>নিজের গতিতে।</em></h1></div><p>দুইটি বাংলা e-book, একটি স্থির পাঠের workspace এবং তোমার নিজের রেখে যাওয়া চিন্তার সূত্র।</p></header>

    <section className="store-workspace" aria-labelledby="today-reading-title"><article className="store-today-board"><div className="store-today-board__head"><span><CircleCheckBig className="size-4" /> আজকের প্রয়োগ</span><span>পাঠের ধারাবাহিকতা</span></div><div className="store-today-board__chapter"><div className="store-today-board__cover" aria-hidden="true"><img src={activeBook.cover} alt="" /></div><div><p>{activeBook.title} · অধ্যায় {activeChapter.padStart(2, "0")}</p><h2 id="today-reading-title">অধ্যায়টি খুলে ৭ মিনিট মন দিয়ে পড়ো</h2><span>পড়ার পর একটি বাক্য লিখে রাখো—আজকের জন্য সেটিই যথেষ্ট।</span></div></div><div className="store-today-board__thread" aria-label={`পাঠের অগ্রগতি ${activeProgress}%`}><span style={{ width: `${Math.max(activeProgress, 3)}%` }} /></div><div className="store-today-board__footer"><span><Clock3 className="size-4" /> সংক্ষিপ্ত, স্থির পাঠ</span><strong>{activeProgress}% সম্পন্ন</strong></div><Button asChild className="store-today-board__action"><Link href={`/book/${activeBookId}/chapter/${activeChapter}`}>পাঠে ফিরে যাও <ArrowRight className="size-4" /></Link></Button></article>
      <aside className="store-context-rail" aria-label="তোমার পাঠের প্রেক্ষিত"><section className="store-context-card store-context-card--progress"><span className="store-context-card__label"><ChartNoAxesCombined className="size-4" /> পাঠের অগ্রগতি</span><div className="store-context-card__stat"><strong>{activeProgress}%</strong><span>{activeDefinition.chapters.length.toLocaleString("bn-BD")} অধ্যায়ের মধ্যে</span></div><div className="store-context-card__meter"><span style={{ width: `${Math.max(activeProgress, 3)}%` }} /></div><small>{activeCompleted.toLocaleString("bn-BD")}টি অধ্যায় সম্পূর্ণ হয়েছে</small></section><section className="store-context-card store-context-card--memory"><span className="store-context-card__label"><StickyNote className="size-4" /> তোমার পাঠচিহ্ন</span><div className="store-memory-grid"><span><Bookmark className="size-4" /><b>{bookmarkCount}</b> বুকমার্ক</span><span><MessageSquareText className="size-4" /><b>{noteCount}</b> নোট</span></div><Link className="store-context-card__link" href={`/book/${activeBookId}/chapter/${activeChapter}`}>পাঠচিহ্নে ফিরে যাও <ArrowRight className="size-3.5" /></Link></section><Link className="store-application-card" href={`/book/${activeBookId}/workbook`}><BookMarked className="size-5" /><span><b>আজকের প্রয়োগ</b><small>একটি চিন্তা বেছে worksheet-এ লিখে রাখো</small></span><ArrowRight className="size-4" /></Link></aside>
    </section>

    <section className="store-library" id="library" aria-labelledby="library-title"><header className="store-section-heading"><div><span className="store-eyebrow">তোমার বইয়ের তাক</span><h2 id="library-title">এখন কোন বইটি খুলবে?</h2></div><p>বই দুটি আলাদা পথে হাঁটে, কিন্তু দুটিই তোমাকে নিজের অবস্থান পরিষ্কার করে দেখতে সাহায্য করে।</p></header><div className="book-shelf">{books.map((book) => {
      const bookProgress = progressFor(book.id);
      const bookChapter = lastChapterByBook[book.id] || "01";
      const hasStarted = bookProgress > 0 || activeBookId === book.id;
      return <article className={`store-book-card store-book-card--${book.tone}`} key={book.id}><div className="store-book-card__cover-wrap"><img src={book.cover} alt={`${book.title} বইয়ের cover`} className="store-book-card__cover" loading={book.id === "life" ? "eager" : "lazy"} /><span className="store-book-card__tag">{hasStarted ? "পাঠ চলমান" : "নতুন প্রকাশনা"}</span></div><div className="store-book-card__body"><div className="store-book-card__topline"><p className="store-book-card__meta">{book.meta}</p><span>{bookProgress}% পড়া</span></div><h3>{book.title}</h3><p className="store-book-card__subtitle">{book.subtitle}</p><p className="store-book-card__description">{book.description}</p><div className="store-book-card__thread" aria-label={`${book.title} এর অগ্রগতি`}><span style={{ width: `${Math.max(bookProgress, hasStarted ? 3 : 0)}%` }} /></div><div className="store-book-card__actions"><Button asChild className="store-read-button"><Link href={`/book/${book.id}/chapter/${bookChapter}`}><BookOpen className="size-4" /> {hasStarted ? "পড়া চালিয়ে যাও" : "পড়া শুরু করো"}</Link></Button>{book.id === "dark" && <Link className="store-pdf-link" href="/book/dark/page/1"><FileText className="size-4" /> পৃষ্ঠা বেছে পড়ো</Link>}<a className="store-pdf-link" href={book.id === "life" ? assets.firstPdf : assets.darkPdf} target="_blank" rel="noreferrer"><ArrowDownToLine className="size-4" /> PDF</a></div></div></article>;
    })}</div></section>

    <section className="store-principles" aria-labelledby="principles-title"><div><span className="store-eyebrow"><ShieldCheck className="size-4" /> আমাদের পাঠের দৃষ্টি</span><h2 id="principles-title">জ্ঞান মানে কাউকে নিয়ন্ত্রণ করা নয়—নিজেকে সচেতন করা।</h2></div><div className="store-principles__list"><p><BookOpen className="size-5" /><span><strong>সহজ বাংলা</strong>জটিল বিষয়ও পরিষ্কার ভাষায়</span></p><p><ShieldCheck className="size-5" /><span><strong>নৈতিক দৃষ্টি</strong>সীমা, নিরাপত্তা ও সচেতনতার পক্ষে</span></p><p><CircleCheckBig className="size-5" /><span><strong>নিজের গতি</strong>যেখান থেকে চাইবে, সেখান থেকেই পড়া</span></p></div></section>
  </main><footer className="store-footer"><span>জীবন বইঘর</span><p>মনোযোগ দিয়ে পড়ার জন্য সাজানো বাংলা digital বই।</p></footer></div>;
}
