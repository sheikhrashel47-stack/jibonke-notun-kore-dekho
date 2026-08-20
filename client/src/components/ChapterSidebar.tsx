/* জীবন-ড্যাশবোর্ড: selected book-এর সব অধ্যায় ও progress এক rail-এ দৃশ্যমান রাখে। */
import { chapterStorageKey, getBookDefinition, type BookId } from "@/data/books";
import { useReader } from "@/contexts/ReaderContext";
import { BookOpen, Check } from "lucide-react";
import { useLocation } from "wouter";

export function ChapterSidebar({ bookId, currentChapterId }: { bookId: BookId; currentChapterId?: string }) {
  const [, setLocation] = useLocation();
  const { progress, setActiveChapter } = useReader();
  const book = getBookDefinition(bookId);

  const openChapter = (id: string) => {
    setActiveChapter(bookId, id);
    setLocation(`/book/${bookId}/chapter/${id}`);
  };

  return (
    <aside className="chapter-sidebar" aria-label={`${book.title} অধ্যায় তালিকা`}>
      <div className="chapter-sidebar__heading"><BookOpen className="size-4" /><span>{book.chapters.length} অধ্যায়ের পথ</span></div>
      <nav>{book.chapters.map((chapter) => {
        const percentage = progress[chapterStorageKey(bookId, chapter.id)] || 0;
        const active = chapter.id === currentChapterId;
        return <button key={chapter.id} type="button" className={`chapter-link ${active ? "chapter-link--active" : ""}`} onClick={() => openChapter(chapter.id)} aria-current={active ? "page" : undefined}>
          <span className="chapter-link__number">{String(chapter.number).padStart(2, "0")}</span>
          <span className="chapter-link__copy"><span>{chapter.title}</span><span className="chapter-link__track"><span style={{ width: `${percentage}%` }} /></span></span>
          {percentage >= 95 && <Check className="chapter-link__done size-3.5" />}
        </button>;
      })}</nav>
    </aside>
  );
}
