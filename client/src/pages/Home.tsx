/* JIBON premium home: one personal reading command center, built from real local reading state. */
import { PremiumBookCard } from "@/components/PremiumBookCard";
import { Button } from "@/components/ui/button";
import { useReader } from "@/contexts/ReaderContext";
import { bookDefinitions, bookIds } from "@/data/books";
import { formatMinutes, getBookProgress, getCurrentChapter, getEstimatedPagesRead, getReadingStreak } from "@/lib/reading";
import { ArrowRight, BookOpen, ChartNoAxesCombined, CircleCheckBig, Flame, Goal, LibraryBig, Sparkles } from "lucide-react";
import { Link } from "wouter";

const greeting = () => { const hour = new Date().getHours(); return hour < 12 ? "শুভ সকাল" : hour < 18 ? "শুভ বিকেল" : "শুভ সন্ধ্যা"; };

export default function Home() {
  const { activeBookId, lastChapterByBook, progress, activityMinutesByDate, readingGoalMinutes, libraryBookIds } = useReader();
  const activeBook = bookDefinitions[activeBookId];
  const currentChapterId = getCurrentChapter(activeBookId, lastChapterByBook);
  const currentChapter = activeBook.chapters.find((chapter) => chapter.id === currentChapterId) || activeBook.chapters[0];
  const today = new Date().toISOString().slice(0, 10);
  const todayMinutes = activityMinutesByDate[today] || 0;
  const goalPercent = Math.min(100, Math.round(todayMinutes / readingGoalMinutes * 100));
  const totalPages = bookIds.reduce((sum, id) => sum + getEstimatedPagesRead(id, progress), 0);
  const totalCompleted = bookIds.reduce((sum, id) => sum + bookDefinitions[id].chapters.filter((chapter) => (progress[`${id}:${chapter.id}`] || 0) >= 95).length, 0);
  const libraryBooks = libraryBookIds.map((id) => bookDefinitions[id]).filter(Boolean);
  const recommendations = bookIds.filter((id) => id !== activeBookId).map((id) => bookDefinitions[id]);
  return <section className="jibon-surface jibon-home">
    <header className="jibon-home__welcome"><div><span className="jibon-kicker"><Sparkles className="size-4" /> তোমার পাঠের জায়গা</span><h1>{greeting()}।<br />আজকের পাঠটা এগিয়ে নাও।</h1><p>তুমি যেখানে থেমেছিলে সেখান থেকে শুরু করো, ছন্দটা দেখো, তারপর একটি ভাবনা সঙ্গে রাখো।</p></div><Link href="/profile" className="jibon-home__profile-mini"><span>তোমার লক্ষ্য</span><strong>{readingGoalMinutes.toLocaleString("bn-BD")} মিনিট</strong><ArrowRight className="size-4" /></Link></header>
    <section className="jibon-continue-card" style={{ "--book-accent": activeBook.accent, "--book-accent-soft": activeBook.accentSoft } as React.CSSProperties}><img src={activeBook.cover} alt="" /><div><span>১ · বর্তমান অবস্থান</span><h2>{activeBook.title}</h2><p>অধ্যায় {currentChapter.number.toLocaleString("bn-BD")} · {currentChapter.title}</p><div className="jibon-continue-card__meter"><i style={{ width: `${getBookProgress(activeBook.id, progress)}%` }} /></div><small>২ · অগ্রগতির thread: {getBookProgress(activeBook.id, progress).toLocaleString("bn-BD")}% পড়া হয়েছে</small></div><Button asChild><Link href={`/book/${activeBook.id}/chapter/${currentChapterId}`}><BookOpen className="size-4" /> পড়া চালাও</Link></Button></section>
    <section className="jibon-home__grid"><article className="jibon-goal-card"><header><span><Goal className="size-4" /> অগ্রগতির thread</span><strong>{todayMinutes.toLocaleString("bn-BD")} / {readingGoalMinutes.toLocaleString("bn-BD")} মিনিট</strong></header><div className="jibon-goal-card__ring" style={{ "--goal-progress": `${goalPercent * 3.6}deg` } as React.CSSProperties}><div><b>{goalPercent.toLocaleString("bn-BD")}%</b><small>আজ</small></div></div><p>{todayMinutes ? "আজকের পাঠের সময় localভাবে হিসাব রাখা হয়েছে।" : "আজকের জন্য ছোট একটি পাঠের সময় ঠিক করো।"}</p><Link href="/profile">লক্ষ্য ঠিক করি <ArrowRight className="size-3.5" /></Link></article><article className="jibon-insight-card"><span className="jibon-kicker">৩ · আজকের প্রয়োগ</span><h2>প্রমাণ আর অনুমানকে আলাদা করে দেখো।</h2><p>একটি ভাবনা সত্য মনে হলেই সেটি তথ্য হয় না। আজ কোনো সিদ্ধান্তের আগে একবার প্রমাণ খুঁজে দেখো।</p><Link href="/book/thinking/chapter/01">ভাবনাটি পড়ি <ArrowRight className="size-3.5" /></Link></article><article className="jibon-stats-card"><span>তোমার পাঠচিত্র</span><dl><div><dt><Flame className="size-4" /> ধারাবাহিকতা</dt><dd>{getReadingStreak(activityMinutesByDate).toLocaleString("bn-BD")} দিন</dd></div><div><dt><CircleCheckBig className="size-4" /> অধ্যায়</dt><dd>{totalCompleted.toLocaleString("bn-BD")}</dd></div><div><dt><ChartNoAxesCombined className="size-4" /> পৃষ্ঠা</dt><dd>{totalPages.toLocaleString("bn-BD")}</dd></div></dl><Link href="/progress">অগ্রগতি দেখি <ArrowRight className="size-3.5" /></Link></article></section>
    <section className="jibon-home__shelf"><header className="jibon-section-heading"><div><span className="jibon-kicker">আমার shelf</span><h2>লাইব্রেরিতে যা আছে</h2></div><Link href="/library">সব বই <LibraryBig className="size-4" /></Link></header><div className="premium-book-grid">{libraryBooks.map((book) => <PremiumBookCard key={book.id} book={book} compact progress={getBookProgress(book.id, progress)} chapterId={getCurrentChapter(book.id, lastChapterByBook)} />)}</div>{!libraryBooks.length && <Link className="jibon-shelf-empty" href="/store">তোমার প্রথম বই বেছে নাও <ArrowRight className="size-4" /></Link>}</section>
    <section className="jibon-home__recommendations"><header className="jibon-section-heading"><div><span className="jibon-kicker">এরপরের সম্ভাবনা</span><h2>আরও পড়তে পারো</h2></div><Link href="/store">স্টোরে যাই <ArrowRight className="size-4" /></Link></header><div>{recommendations.map((book) => <Link key={book.id} href={`/store/book/${book.id}`} className="jibon-mini-recommendation" style={{ "--book-accent": book.accent, "--book-accent-soft": book.accentSoft } as React.CSSProperties}><img src={book.cover} alt="" /><span>{book.category}</span><strong>{book.title}</strong><small>{book.subtitle}</small><ArrowRight className="size-4" /></Link>)}</div></section>
  </section>;
}
