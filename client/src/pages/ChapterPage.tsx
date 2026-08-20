/* জীবন-ড্যাশবোর্ড: one reader workspace serves either book through the shared lazy-loading contract. */
import { AppHeader } from "@/components/AppHeader";
import { ChapterSidebar } from "@/components/ChapterSidebar";
import { ContextRail } from "@/components/ContextRail";
import { ReadingCanvas } from "@/components/ReadingCanvas";
import type { BookChapter } from "@/data/book";
import { getBookDefinition } from "@/data/books";
import { useReader } from "@/contexts/ReaderContext";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";

export default function ChapterPage() {
  const params = useParams<{ bookId?: string; id?: string }>();
  const book = getBookDefinition(params.bookId);
  const requestedId = params.id || "01";
  const chapterId = book.chapters.some((chapter) => chapter.id === requestedId) ? requestedId : "01";
  const [chapter, setChapter] = useState<BookChapter | null>(null);
  const { setActiveChapter } = useReader();

  useEffect(() => {
    let active = true;
    setChapter(null);
    setActiveChapter(book.id, chapterId);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    book.chapterLoaders[chapterId]().then((module) => { if (active) setChapter(module.default); });
    return () => { active = false; };
  }, [book, chapterId, setActiveChapter]);

  if (!chapter) return <div className="page-shell"><AppHeader /><main className="chapter-loading"><Loader2 className="size-5 animate-spin" /> <span>অধ্যায়টি খুলছে…</span></main></div>;
  return <div className="page-shell"><AppHeader /><div className="reader-layout"><ChapterSidebar bookId={book.id} currentChapterId={chapter.id} /><ReadingCanvas bookId={book.id} chapter={chapter} /><ContextRail bookId={book.id} chapter={chapter} /></div><Link href="/" className="reader-home-fab"><ArrowLeft className="size-4" /> বইঘরে ফিরে যাও</Link></div>;
}
