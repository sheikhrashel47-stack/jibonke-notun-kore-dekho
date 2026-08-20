/* জীবন-ড্যাশবোর্ড: slim navigation rail keeps the book's full structure visible. */
import { chapters } from "@/data/book";
import { useReader } from "@/contexts/ReaderContext";
import { BookOpen, Check } from "lucide-react";
import { useLocation } from "wouter";

export function ChapterSidebar({ currentChapterId }: { currentChapterId?: string }) {
  const [, setLocation] = useLocation();
  const { progress, setActiveChapter } = useReader();

  const openChapter = (id: string) => {
    setActiveChapter(id);
    setLocation(`/chapter/${id}`);
  };

  return (
    <aside className="chapter-sidebar" aria-label="অধ্যায় তালিকা">
      <div className="chapter-sidebar__heading">
        <BookOpen className="size-4" />
        <span>বইয়ের পথ</span>
      </div>
      <nav>
        {chapters.map((chapter) => {
          const percentage = progress[chapter.id] || 0;
          const active = chapter.id === currentChapterId;
          return (
            <button
              key={chapter.id}
              type="button"
              className={`chapter-link ${active ? "chapter-link--active" : ""}`}
              onClick={() => openChapter(chapter.id)}
              aria-current={active ? "page" : undefined}
            >
              <span className="chapter-link__number">{String(chapter.number).padStart(2, "0")}</span>
              <span className="chapter-link__copy">
                <span>{chapter.title}</span>
                <span className="chapter-link__track"><span style={{ width: `${percentage}%` }} /></span>
              </span>
              {percentage >= 95 && <Check className="chapter-link__done size-3.5" />}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
