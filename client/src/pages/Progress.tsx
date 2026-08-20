/* JIBON premium progress: all totals are derived from real local reading state, not seeded activity. */
import { PremiumBookCard } from "@/components/PremiumBookCard";
import { useReader } from "@/contexts/ReaderContext";
import { bookDefinitions, bookIds } from "@/data/books";
import { getBookProgress, getCompletedChapterCount, getEstimatedPagesRead, getReadingStreak } from "@/lib/reading";
import { BarChart3, BookOpenCheck, CalendarDays, ChartNoAxesCombined, Flame, Goal } from "lucide-react";
import { Link } from "wouter";

const dateKey = (daysAgo: number) => { const date = new Date(); date.setDate(date.getDate() - daysAgo); return date.toISOString().slice(0, 10); };
const weekday = (daysAgo: number) => new Intl.DateTimeFormat("bn-BD", { weekday: "short" }).format(new Date(`${dateKey(daysAgo)}T12:00:00`));

export default function Progress() {
  const { progress, activityMinutesByDate, readingGoalMinutes, lastChapterByBook } = useReader();
  const books = bookIds.map((id) => bookDefinitions[id]);
  const completed = bookIds.reduce((sum, id) => sum + getCompletedChapterCount(id, progress), 0);
  const pagesRead = bookIds.reduce((sum, id) => sum + getEstimatedPagesRead(id, progress), 0);
  const totalMinutes = Object.values(activityMinutesByDate).reduce((sum, minutes) => sum + minutes, 0);
  const todayMinutes = activityMinutesByDate[dateKey(0)] || 0;
  const currentBook = books.find((book) => getBookProgress(book.id, progress) > 0) || books[0];
  const week = Array.from({ length: 7 }, (_, index) => { const daysAgo = 6 - index; return { label: weekday(daysAgo), minutes: activityMinutesByDate[dateKey(daysAgo)] || 0, key: dateKey(daysAgo) }; });
  const highest = Math.max(readingGoalMinutes, ...week.map((day) => day.minutes));
  const currentChapterId = lastChapterByBook[currentBook.id] || currentBook.chapters[0].id;
  return <section className="jibon-surface jibon-progress"><header className="jibon-page-heading"><div><span className="jibon-kicker"><BarChart3 className="size-4" /> নিজের ছন্দ</span><h1>পাঠের অগ্রগতি</h1><p>এখানে দেখানো সবকিছু তোমার এই ডিভাইসে সংরক্ষিত পড়ার তথ্য থেকে তৈরি হয়।</p></div><Link href="/profile" className="jibon-heading-action"><Goal className="size-4" /> লক্ষ্য বদলাও</Link></header><section className="jibon-reading-loop jibon-reading-loop--progress" aria-label="আজকের পাঠের অগ্রগতি"><div><span>১ · বর্তমান অবস্থান</span><strong>{currentBook.title}</strong></div><div><span>২ · অগ্রগতির thread</span><strong>{todayMinutes.toLocaleString("bn-BD")} / {readingGoalMinutes.toLocaleString("bn-BD")} মিনিট</strong></div><Link href={`/book/${currentBook.id}/chapter/${currentChapterId}`}>৩ · আজকের প্রয়োগ <BookOpenCheck className="size-4" /></Link></section><section className="jibon-progress__summary"><article><span><Flame className="size-4" /> ধারাবাহিকতা</span><strong>{getReadingStreak(activityMinutesByDate).toLocaleString("bn-BD")}</strong><small>দিন</small></article><article><span><BookOpenCheck className="size-4" /> শেষ করা অধ্যায়</span><strong>{completed.toLocaleString("bn-BD")}</strong><small>অধ্যায়</small></article><article><span><ChartNoAxesCombined className="size-4" /> পড়া হয়েছে</span><strong>{pagesRead.toLocaleString("bn-BD")}</strong><small>পৃষ্ঠা</small></article><article><span><CalendarDays className="size-4" /> পাঠের সময়</span><strong>{totalMinutes.toLocaleString("bn-BD")}</strong><small>মিনিট</small></article></section><section className="jibon-activity-card"><header><div><span className="jibon-kicker">শেষ ৭ দিন</span><h2>পড়ার ছন্দ</h2></div><p>প্রতিদিনের লক্ষ্য: <b>{readingGoalMinutes.toLocaleString("bn-BD")} মিনিট</b></p></header><div className="jibon-activity-chart" aria-label="শেষ সাত দিনের reading activity">{week.map((day) => <div key={day.key} className={day.minutes ? "has-activity" : ""}><span style={{ height: `${Math.max(day.minutes ? 9 : 3, Math.round(day.minutes / highest * 100))}%` }} title={`${day.label}: ${day.minutes.toLocaleString("bn-BD")} মিনিট`} /><small>{day.label}</small><b>{day.minutes ? day.minutes.toLocaleString("bn-BD") : "–"}</b></div>)}</div>{!week.some((day) => day.minutes) && <p className="jibon-activity-card__empty">তুমি পড়া শুরু করলে এখানে দিনের পর দিন ছন্দ দেখা যাবে।</p>}</section><section className="jibon-progress__books"><header className="jibon-section-heading"><div><span className="jibon-kicker">বই অনুযায়ী</span><h2>তোমার পাঠের তাক</h2></div><Link href="/library">লাইব্রেরিতে যাই</Link></header><div className="premium-book-grid">{books.map((book) => <PremiumBookCard key={book.id} book={book} progress={getBookProgress(book.id, progress)} chapterId={lastChapterByBook[book.id]} />)}</div></section></section>;
}
