/* জীবন-ড্যাশবোর্ড: three-rail chapter workspace prioritizes uninterrupted Bengali reading. */
import { AppHeader } from "@/components/AppHeader";
import { ChapterSidebar } from "@/components/ChapterSidebar";
import { ContextRail } from "@/components/ContextRail";
import { ReadingCanvas } from "@/components/ReadingCanvas";
import { Button } from "@/components/ui/button";
import { chapterLoaders, chapters, type BookChapter } from "@/data/book";
import { useReader } from "@/contexts/ReaderContext";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";

export default function ChapterPage() {
  const params = useParams<{ id?: string }>();
  const requestedId = params.id || "01";
  const chapterId = chapters.some((chapter) => chapter.id === requestedId) ? requestedId : "01";
  const [chapter, setChapter] = useState<BookChapter | null>(null);
  const { setActiveChapter } = useReader();

  useEffect(() => {
    let active = true;
    setChapter(null);
    setActiveChapter(chapterId);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    chapterLoaders[chapterId]().then((module) => {
      if (active) setChapter(module.default);
    });
    return () => {
      active = false;
    };
  }, [chapterId, setActiveChapter]);

  if (!chapter) {
    return (
      <div className="page-shell">
        <AppHeader />
        <main className="chapter-loading"><Loader2 className="size-5 animate-spin" /> <span>অধ্যায়টি খুলছে…</span></main>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <AppHeader />
      <div className="reader-layout">
        <ChapterSidebar currentChapterId={chapter.id} />
        <ReadingCanvas chapter={chapter} />
        <ContextRail chapter={chapter} />
      </div>
      <Link href="/" className="reader-home-fab"><ArrowLeft className="size-4" /> বইয়ের শুরুতে</Link>
    </div>
  );
}
