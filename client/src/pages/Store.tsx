/* JIBON premium store: an editorial collection that explains why each book is worth opening. */
import { PremiumBookCard } from "@/components/PremiumBookCard";
import { Button } from "@/components/ui/button";
import { useReader } from "@/contexts/ReaderContext";
import { bookDefinitions, bookIds } from "@/data/books";
import { getBookProgress, getCurrentChapter } from "@/lib/reading";
import { ArrowRight, BookOpen, LibraryBig, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function Store() {
  const { activeBookId, progress, lastChapterByBook, libraryBookIds, setLibraryBook } = useReader();
  const featured = bookDefinitions.life;
  const activeBook = bookDefinitions[activeBookId];
  const activeChapterId = getCurrentChapter(activeBookId, lastChapterByBook);
  return <section className="jibon-surface jibon-store">
    <header className="jibon-store__hero"><div className="jibon-store__hero-copy"><span className="jibon-kicker"><Sparkles className="size-4" /> JIBON প্রকাশনা</span><h1>ভাবনাকে<br />আরও প্রশস্ত করো।</h1><p>নতুন বই বেছে নেওয়ার আগে তোমার চলতি পাঠ, তার অগ্রগতি আর আজকের ছোট প্রয়োগটি একবার দেখে নাও।</p><div className="jibon-store__hero-actions"><Button asChild><Link href={`/store/book/${featured.id}`}>বইটি দেখি <ArrowRight className="size-4" /></Link></Button><Link href="/library"><LibraryBig className="size-4" /> আমার লাইব্রেরি</Link></div></div><article className="jibon-featured-book" style={{ "--book-accent": featured.accent, "--book-accent-soft": featured.accentSoft } as React.CSSProperties}><img src={featured.cover} alt={`${featured.title} বইয়ের cover`} /><div><span>নির্বাচিত পাঠ</span><h2>{featured.title}</h2><p>{featured.description}</p><dl><div><dt>পৃষ্ঠা</dt><dd>{featured.pdfPageCount.toLocaleString("bn-BD")}</dd></div><div><dt>অধ্যায়</dt><dd>{featured.chapters.length.toLocaleString("bn-BD")}</dd></div><div><dt>পাঠসময়</dt><dd>প্রায় {featured.totalReadingMinutes.toLocaleString("bn-BD")} মি</dd></div></dl><Link href={`/book/${featured.id}/chapter/01`}>এখনই পড়ি <BookOpen className="size-4" /></Link></div></article></header>
    <section className="jibon-reading-loop" aria-label="তোমার বর্তমান পাঠের পথ"><div><span>১ · বর্তমান অবস্থান</span><strong>{activeBook.title} · অধ্যায় {activeChapterId.replace(/^0/, "") || "১"}</strong></div><div><span>২ · অগ্রগতির thread</span><strong>{getBookProgress(activeBookId, progress).toLocaleString("bn-BD")}% সম্পন্ন</strong></div><Link href={`/book/${activeBookId}/chapter/${activeChapterId}`}>৩ · আজকের প্রয়োগ: একটি পৃষ্ঠা পড়ি <ArrowRight className="size-4" /></Link></section>
    <section className="jibon-store__collection"><header><span className="jibon-kicker">পছন্দ করে পড়ো</span><h2>আজ কোন দিকে মন যাচ্ছে?</h2><p>প্রতিটি বই নিজের মতো করে শুরু করা যায়। তোমার বর্তমান প্রশ্নটাকেই পথ দেখাতে দাও।</p></header><div className="jibon-category-row" aria-label="বিষয়"><span>মন</span><span>জীবন</span><span>ব্যক্তিগত উন্নতি</span><span>মনোবিজ্ঞান</span><span>চিন্তা</span><span>অর্থ ও সম্পদ</span></div><div className="premium-book-grid">{bookIds.map((id) => { const book = bookDefinitions[id]; return <PremiumBookCard key={id} book={book} progress={getBookProgress(id, progress)} chapterId={getCurrentChapter(id, lastChapterByBook)} inLibrary={libraryBookIds.includes(id)} onLibraryToggle={() => setLibraryBook(id, !libraryBookIds.includes(id))} />; })}</div></section>
  </section>;
}
