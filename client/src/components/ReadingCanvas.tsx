/* জীবন-ড্যাশবোর্ড: editorial reading canvas with gentle progress capture. */
import type { BookChapter } from "@/data/book";
import { useReader } from "@/contexts/ReaderContext";
import { BookmarkButton } from "@/components/BookmarkButton";
import { ExerciseCard } from "@/components/ExerciseCard";
import { NotePanel } from "@/components/NotePanel";
import { ArrowDown, Clock3, Quote } from "lucide-react";
import { useEffect } from "react";

export function ReadingCanvas({ chapter }: { chapter: BookChapter }) {
  const { fontSize, setFontSize, setProgress } = useReader();

  useEffect(() => {
    const recordProgress = () => {
      const doc = document.documentElement;
      const maximum = doc.scrollHeight - window.innerHeight;
      if (maximum <= 0) return;
      setProgress(chapter.id, (window.scrollY / maximum) * 100);
    };
    window.addEventListener("scroll", recordProgress, { passive: true });
    recordProgress();
    return () => window.removeEventListener("scroll", recordProgress);
  }, [chapter.id, setProgress]);

  return (
    <main className={`reading-canvas reading-canvas--${fontSize}`}>
      <header className="reading-canvas__hero">
        <div className="reading-canvas__eyebrow">অধ্যায় {chapter.number.toLocaleString("bn-BD").padStart(2, "০")}</div>
        <h1>{chapter.title}</h1>
        <p>{chapter.subtitle}</p>
        <div className="reading-canvas__meta">
          <span><Clock3 className="size-4" /> প্রায় {chapter.readingMinutes || 18} মিনিট</span>
          <BookmarkButton chapterId={chapter.id} label={false} />
        </div>
        <div className="chapter-thread" aria-hidden="true"><span /></div>
      </header>

      <article className="reading-canvas__article">
        {chapter.sections.map((section, sectionIndex) => (
          <section className="reading-section" key={section.id}>
            <div className="reading-section__marker">{String(sectionIndex + 1).padStart(2, "0")}</div>
            <div className="reading-section__content">
              <h2>{section.title}</h2>
              {section.blocks.map((block, index) =>
                block.type === "subheading" ? (
                  <h3 key={`${block.content}-${index}`}>{block.content}</h3>
                ) : block.content.startsWith("• ") ? (
                  <p className="reading-list-item" key={`${block.content}-${index}`}>{block.content}</p>
                ) : (
                  <p key={`${block.content.slice(0, 30)}-${index}`}>{block.content}</p>
                ),
              )}
            </div>
          </section>
        ))}

        {chapter.exercises.length > 0 && (
          <section className="chapter-exercises" id="chapter-practice">
            <div className="chapter-exercises__intro"><Quote className="size-5" /><div><p className="eyebrow">পড়ার পরের বিরতি</p><h2>নিজের জীবনে মিলিয়ে দেখো</h2></div></div>
            <div className="chapter-exercises__grid">
              {chapter.exercises.map((exercise, index) => <ExerciseCard key={`${exercise.title}-${index}`} chapterId={chapter.id} index={index} {...exercise} />)}
            </div>
          </section>
        )}
      </article>

      <div className="reading-canvas__mobile-tools">
        <BookmarkButton chapterId={chapter.id} />
        <div className="font-control">
          <span>লেখার আকার</span>
          <div>
            {(["small", "medium", "large"] as const).map((size) => (
              <button key={size} type="button" className={fontSize === size ? "is-active" : ""} onClick={() => setFontSize(size)} aria-pressed={fontSize === size}>অ</button>
            ))}
          </div>
        </div>
      </div>
      <div className="reading-canvas__mobile-note"><NotePanel noteKey={`chapter-${chapter.id}`} /></div>

      <footer className="reading-canvas__footer"><ArrowDown className="size-4" /> নিচে স্ক্রল করলে তোমার অগ্রগতি সেভ হবে</footer>
    </main>
  );
}
