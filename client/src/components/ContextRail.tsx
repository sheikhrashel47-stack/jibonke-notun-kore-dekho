/* জীবন-ড্যাশবোর্ড: persistent but quiet context rail for current reading decisions. */
import type { BookChapter } from "@/data/book";
import { useReader } from "@/contexts/ReaderContext";
import { BookmarkButton } from "@/components/BookmarkButton";
import { NotePanel } from "@/components/NotePanel";
import { Button } from "@/components/ui/button";
import { BarChart3, ChevronRight, Clock3, NotebookTabs, Sparkles } from "lucide-react";
import { Link } from "wouter";

export function ContextRail({ chapter }: { chapter: BookChapter }) {
  const { progress, fontSize, setFontSize } = useReader();
  const percentage = progress[chapter.id] || 0;

  return (
    <aside className="context-rail" aria-label="পাঠের নিয়ন্ত্রণ">
      <section className="rail-card rail-card--progress">
        <p className="eyebrow"><BarChart3 className="size-3.5" /> পাঠের অগ্রগতি</p>
        <div className="progress-stat">
          <strong>{percentage}%</strong>
          <span>এই অধ্যায়</span>
        </div>
        <div className="progress-meter" aria-label={`${percentage}% সম্পন্ন`}><span style={{ width: `${percentage}%` }} /></div>
        <div className="rail-card__meta"><span><Clock3 className="size-3.5" /> প্রায় {chapter.readingMinutes || 18} মিনিট</span><span>{chapter.wordCount.toLocaleString("bn-BD")} শব্দ</span></div>
      </section>

      <section className="rail-card rail-card--actions">
        <p className="eyebrow">পাঠের সরঞ্জাম</p>
        <BookmarkButton chapterId={chapter.id} />
        <div className="font-control" aria-label="লেখার আকার">
          <span>লেখার আকার</span>
          <div>
            {(["small", "medium", "large"] as const).map((size) => (
              <button key={size} type="button" className={fontSize === size ? "is-active" : ""} onClick={() => setFontSize(size)} aria-pressed={fontSize === size}>
                {size === "small" ? "অ" : size === "medium" ? "অ" : "অ"}
              </button>
            ))}
          </div>
        </div>
      </section>

      <NotePanel noteKey={`chapter-${chapter.id}`} />

      <a href="#chapter-practice" className="rail-today-action"><Sparkles className="size-4" /><span><b>আজকের প্রয়োগ</b><small>একটি অনুশীলন বেছে নাও</small></span><ChevronRight className="size-4" /></a>

      <Link href="/workbook" className="rail-workbook-link">
        <span><NotebookTabs className="size-4" /> Workbook</span>
        <ChevronRight className="size-4" />
      </Link>
    </aside>
  );
}
