/* JIBON premium book detail: clear context, ownership and a simple path into reading. */
import { Button } from "@/components/ui/button";
import { useReader } from "@/contexts/ReaderContext";
import { getBookDefinition } from "@/data/books";
import { getBookProgress, getCurrentChapter } from "@/lib/reading";
import { ArrowLeft, BookMarked, BookOpen, Check, Map, Timer } from "lucide-react";
import { Link, useParams } from "wouter";

export default function BookDetail() {
  const { bookId } = useParams<{ bookId?: string }>();
  const book = getBookDefinition(bookId);
  const { progress, lastChapterByBook, libraryBookIds, setLibraryBook } = useReader();
  const percentage = getBookProgress(book.id, progress);
  const chapterId = getCurrentChapter(book.id, lastChapterByBook);
  const inLibrary = libraryBookIds.includes(book.id);
  return <section className="jibon-surface jibon-book-detail" style={{ "--book-accent": book.accent, "--book-accent-soft": book.accentSoft } as React.CSSProperties}>
    <Link href="/store" className="jibon-back-link"><ArrowLeft className="size-4" /> স্টোরে ফিরে যাই</Link>
    <header className="jibon-book-detail__hero"><div className="jibon-book-detail__cover"><img src={book.cover} alt={`${book.title} বইয়ের cover`} /></div><div className="jibon-book-detail__copy"><span className="jibon-kicker">{book.category}</span><h1>{book.title}</h1><p className="jibon-book-detail__subtitle">{book.subtitle}</p><p>{book.longDescription}</p><dl className="jibon-book-facts"><div><dt>অধ্যায়</dt><dd>{book.chapters.length.toLocaleString("bn-BD")}</dd></div><div><dt>পৃষ্ঠা</dt><dd>{book.pdfPageCount.toLocaleString("bn-BD")}</dd></div><div><dt>সময়</dt><dd>প্রায় {book.totalReadingMinutes.toLocaleString("bn-BD")} মিনিট</dd></div></dl><div className="jibon-book-detail__actions"><Button asChild><Link href={`/book/${book.id}/chapter/${chapterId}`}><BookOpen className="size-4" /> {percentage ? "পড়া চালাও" : "পড়া শুরু"}</Link></Button><Button variant="outline" asChild><Link href={`/book/${book.id}/map`}><Map className="size-4" /> বইয়ের মানচিত্র</Link></Button><button type="button" className="jibon-detail-save" onClick={() => setLibraryBook(book.id, !inLibrary)}>{inLibrary ? <><Check className="size-4" /> লাইব্রেরিতে আছে</> : <><BookMarked className="size-4" /> লাইব্রেরিতে রাখি</>}</button></div></div></header>
    <section className="jibon-book-detail__body"><article><span className="jibon-kicker">কেন পড়বে</span><h2>এই বইটি তোমাকে সাহায্য করবে—</h2><ul className="jibon-learning-outcomes">{book.learningOutcomes.map((item) => <li key={item}><Check className="size-4" /> {item}</li>)}</ul></article><aside className="jibon-book-detail__reading-state"><span><Timer className="size-4" /> তোমার অগ্রগতি</span><strong>{percentage.toLocaleString("bn-BD")}%</strong><div><i style={{ width: `${percentage}%` }} /></div><p>{percentage ? `তুমি ${book.chapters.filter((chapter) => (progress[`${book.id}:${chapter.id}`] || 0) >= 95).length.toLocaleString("bn-BD")}টি অধ্যায় শেষ করেছ।` : "প্রথম অধ্যায় দিয়েই নিজের পড়ার পথ শুরু করতে পারো।"}</p><Link href={`/book/${book.id}/chapter/${chapterId}`}>{percentage ? "যেখান থেকে থেমেছিলে" : "প্রথম অধ্যায়ে যাই"} <ArrowLeft className="size-3.5" /></Link></aside></section>
  </section>;
}
