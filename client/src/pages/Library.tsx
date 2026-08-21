/* JIBON premium library: a personal, searchable bookshelf rather than a generic product grid. */
import { PremiumBookCard } from "@/components/PremiumBookCard";
import { Button } from "@/components/ui/button";
import { useReader } from "@/contexts/ReaderContext";
import { bookDefinitions, bookIds, type BookId } from "@/data/books";
import { getBookProgress, getBookStatus, getCurrentChapter } from "@/lib/reading";
import { BookOpen, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";

type Filter = "all" | "reading" | "completed" | "saved";
type Sort = "recent" | "title" | "progress";

export default function Library() {
  const { activeBookId, libraryBookIds, progress, bookmarks, lastChapterByBook, setLibraryBook } = useReader();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("recent");
  const books = useMemo(() => libraryBookIds.map((id) => bookDefinitions[id]).filter(Boolean).filter((book) => {
    const search = `${book.title} ${book.subtitle} ${book.category}`.toLowerCase();
    const value = query.trim().toLowerCase();
    const percentage = getBookProgress(book.id, progress);
    const hasSaved = bookmarks.some((key) => key.startsWith(`${book.id}:`));
    return (!value || search.includes(value)) && (filter === "all" || filter === "reading" && percentage > 0 && percentage < 95 || filter === "completed" && percentage >= 95 || filter === "saved" && hasSaved);
  }).sort((a, b) => sort === "title" ? a.title.localeCompare(b.title, "bn") : sort === "progress" ? getBookProgress(b.id, progress) - getBookProgress(a.id, progress) : libraryBookIds.indexOf(b.id) - libraryBookIds.indexOf(a.id)), [bookmarks, filter, libraryBookIds, progress, query, sort]);
  return <section className="jibon-surface jibon-library">
    <header className="jibon-page-heading"><div><span className="jibon-kicker">তোমার personal shelf</span><h1>আমার লাইব্রেরি</h1><p>যে বইগুলো তোমার চিন্তার সঙ্গে এখন কাজ করছে, সেগুলো এখানে গুছিয়ে রাখো।</p></div><Link className="jibon-heading-action" href="/store"><BookOpen className="size-4" /> বই খুঁজি</Link></header>
    <section className="jibon-library__toolbar" aria-label="লাইব্রেরি খোঁজার ও সাজানোর control"><label className="jibon-search-field"><Search className="size-4" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="বই, বিষয় বা ভাবনা খুঁজুন" aria-label="লাইব্রেরিতে বই খুঁজুন" /></label><div className="jibon-filter-row" role="group" aria-label="বই filter">{([{ id: "all", label: "সব" }, { id: "reading", label: "পড়ছি" }, { id: "completed", label: "শেষ" }, { id: "saved", label: "সংরক্ষিত" }] as const).map((item) => <button key={item.id} type="button" className={filter === item.id ? "is-active" : ""} onClick={() => setFilter(item.id)}>{item.label}</button>)}</div><label className="jibon-sort-select"><SlidersHorizontal className="size-4" /><span className="sr-only">সাজানোর ধরন</span><select value={sort} onChange={(event) => setSort(event.target.value as Sort)}><option value="recent">সাম্প্রতিক</option><option value="progress">অগ্রগতি</option><option value="title">নাম</option></select></label></section>
    <section className="jibon-reading-loop jibon-reading-loop--library" aria-label="লাইব্রেরিতে পাঠের পরবর্তী পদক্ষেপ"><div><span>বর্তমান অবস্থান</span><strong>{bookDefinitions[activeBookId].title}</strong></div><div><span>অগ্রগতির thread</span><strong>{getBookProgress(activeBookId, progress).toLocaleString("bn-BD")}% পড়া হয়েছে</strong></div><Link href={`/book/${activeBookId}/chapter/${getCurrentChapter(activeBookId, lastChapterByBook)}`}>আজকের প্রয়োগ <BookOpen className="size-4" /></Link></section>
    {books.length ? <div className="premium-book-grid">{books.map((book) => <PremiumBookCard key={book.id} book={book} progress={getBookProgress(book.id, progress)} chapterId={getCurrentChapter(book.id, lastChapterByBook)} inLibrary onLibraryToggle={() => setLibraryBook(book.id, false)} onRemove={() => setLibraryBook(book.id, false)} />)}</div> : <div className="jibon-empty-state"><span>তোমার bookshelf এখান থেকেই তৈরি হবে।</span><p>একটি বই লাইব্রেরিতে রাখো, তারপর প্রথম অধ্যায় থেকে আজকের জন্য একটি ভাবনা তুলে নাও।</p><Button asChild><Link href="/store">স্টোর দেখো</Link></Button></div>}
    <aside className="jibon-library__status-note">{bookIds.filter((id) => libraryBookIds.includes(id)).map((id) => <span key={id}>{bookDefinitions[id].title} · {getBookStatus(bookDefinitions[id], progress)}</span>)}</aside>
  </section>;
}
