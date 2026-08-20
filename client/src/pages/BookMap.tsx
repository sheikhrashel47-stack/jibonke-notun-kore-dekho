/* JIBON premium book map: a calm chapter trail with visible, local progress at every stop. */
import { Button } from "@/components/ui/button";
import { useReader } from "@/contexts/ReaderContext";
import { chapterStorageKey, getBookDefinition } from "@/data/books";
import { getBookProgress, getCurrentChapter } from "@/lib/reading";
import { ArrowLeft, BookOpen, Check, ChevronRight, Circle, Map } from "lucide-react";
import { Link, useParams } from "wouter";

export default function BookMap() {
  const { bookId } = useParams<{ bookId?: string }>();
  const book = getBookDefinition(bookId);
  const { progress, lastChapterByBook } = useReader();
  const currentChapterId = getCurrentChapter(book.id, lastChapterByBook);
  const percentage = getBookProgress(book.id, progress);
  return <section className="jibon-surface jibon-book-map" style={{ "--book-accent": book.accent, "--book-accent-soft": book.accentSoft } as React.CSSProperties}>
    <Link href={`/store/book/${book.id}`} className="jibon-back-link"><ArrowLeft className="size-4" /> বইয়ের পাতায় ফিরে যাই</Link>
    <header className="jibon-book-map__hero"><div><span className="jibon-kicker"><Map className="size-4" /> পাঠের পথ</span><h1>{book.title}</h1><p>একবারে শেষ করার তাড়া নেই। একটি অধ্যায়, একটি ভাবনা, তারপর নিজের জীবনে একটু জায়গা।</p></div><aside><span>মোট অগ্রগতি</span><strong>{percentage.toLocaleString("bn-BD")}%</strong><div><i style={{ width: `${percentage}%` }} /></div><Link href={`/book/${book.id}/chapter/${currentChapterId}`}>পাঠে ফিরি <BookOpen className="size-4" /></Link></aside></header>
    <ol className="jibon-map-trail">{book.chapters.map((chapter) => { const chapterProgress = progress[chapterStorageKey(book.id, chapter.id)] || 0; const completed = chapterProgress >= 95; const active = chapter.id === currentChapterId; return <li key={chapter.id} className={completed ? "is-complete" : active ? "is-current" : ""}><span className="jibon-map-trail__node">{completed ? <Check className="size-4" /> : active ? <Circle className="size-3.5" fill="currentColor" /> : chapter.number.toLocaleString("bn-BD")}</span><article><div><span>অধ্যায় {chapter.number.toLocaleString("bn-BD")}</span>{completed && <small>পড়া হয়েছে</small>}</div><h2>{chapter.title}</h2><p>{chapter.subtitle}</p><footer><div><i style={{ width: `${chapterProgress}%` }} /></div><Link href={`/book/${book.id}/chapter/${chapter.id}`}>{active ? "পড়া চালাও" : completed ? "আবার পড়ি" : "অধ্যায় খুলুন"} <ChevronRight className="size-3.5" /></Link></footer></article></li>; })}</ol>
    <div className="jibon-map-trail__finish"><span>শেষ প্রান্ত</span><h2>এবার থামো, লিখো, আর প্রয়োগ করো।</h2><p>প্রতিটি বইয়ের workbook অংশে নিজের মতো করে ভাবনাগুলো ধরে রাখতে পারো।</p><Button asChild variant="outline"><Link href={`/book/${book.id}/workbook`}>Workbook খুলুন</Link></Button></div>
  </section>;
}
