/* জীবন-ড্যাশবোর্ড: action-oriented workbook turns reflection into a visible weekly rhythm. */
import { AppHeader } from "@/components/AppHeader";
import { ExerciseCard } from "@/components/ExerciseCard";
import { NotePanel } from "@/components/NotePanel";
import { chapters, workbookExercises } from "@/data/book";
import { useReader } from "@/contexts/ReaderContext";
import { ArrowRight, BookMarked, CheckCircle2, ClipboardPenLine, Compass, NotebookPen, TimerReset } from "lucide-react";
import { Link } from "wouter";

const workbookImage = "/manus-storage/jibon-workbook_1315620c.png";

export default function Workbook() {
  const { activeChapterId, completedExercises } = useReader();
  const completedCount = Object.values(completedExercises).filter(Boolean).length;
  const activeChapter = chapters.find((chapter) => chapter.id === activeChapterId) || chapters[0];

  return (
    <div className="page-shell workbook-page">
      <AppHeader />
      <main>
        <section className="workbook-hero">
          <div className="workbook-hero__copy">
            <p className="eyebrow"><ClipboardPenLine className="size-4" /> চিন্তা থেকে অনুশীলনে</p>
            <h1>পড়ার পরেই জীবন বদলায় না।<br />ছোট কাজ থেকে বদল শুরু হয়।</h1>
            <p>এই জায়গাটি তোমার নিজের। ধীরে ধীরে করো, নিজের ভাষায় লেখো, আর যেটুকু পারো সেটুকুকেই গুরুত্ব দাও।</p>
            <div className="workbook-hero__stats">
              <span><CheckCircle2 className="size-4" /> {completedCount.toLocaleString("bn-BD")}টি কাজ সম্পন্ন</span>
              <span><TimerReset className="size-4" /> সপ্তাহে একবার ফিরে দেখো</span>
            </div>
          </div>
          <aside className="workbook-hero__board" aria-label="আজকের অনুশীলন dashboard">
            <div className="workbook-board__head"><span><Compass className="size-4" /> আজকের প্রয়োগ</span><span>নিজের গতিতে</span></div>
            <div className="workbook-board__active"><div className="workbook-board__number">{String(completedCount + 1).padStart(2, "0")}</div><div><p>এখনের ছোট কাজ</p><h2>{workbookExercises[completedCount % workbookExercises.length].title}</h2><span>একটি কাজ বেছে নাও, তারপর নিজের ভাষায় লিখো।</span></div></div>
            <div className="workbook-board__thread"><span style={{ width: `${Math.min(100, completedCount * 25)}%` }} /></div>
            <div className="workbook-board__status"><span><NotebookPen className="size-4" /> ফিরে দেখা</span><strong>{completedCount.toLocaleString("bn-BD")} / ৪</strong></div>
            <div className="workbook-hero__scene"><img src={workbookImage} alt="নোটবুক ও কলমের ইলাস্ট্রেশন" /></div>
          </aside>
        </section>

        <section className="workbook-section">
          <div className="section-heading"><div><p className="eyebrow">শুরু করার চারটি জায়গা</p><h2>নিজের জন্য কাজগুলো বেছে নাও</h2></div><span className="section-heading__note">একটি শেষ করলেই যথেষ্ট</span></div>
          <div className="workbook-exercises">
            {workbookExercises.map((exercise, index) => <ExerciseCard key={exercise.title} chapterId="workbook" index={index} {...exercise} />)}
          </div>
        </section>

        <section className="reflection-grid">
          <NotePanel noteKey="weekly-reflection" title="এই সপ্তাহের ফিরে দেখা" placeholder="কী ভালো হয়েছে? কোথায় আটকে গেছ? পরের সপ্তাহে শুধু কোন ছোট বিষয়টি বদলাতে চাও?" />
          <article className="reflection-next">
            <BookMarked className="size-5" />
            <p className="eyebrow">এখন পড়তে পারো</p>
            <h2>অধ্যায় {activeChapter.number.toLocaleString("bn-BD")} — {activeChapter.title}</h2>
            <p>{activeChapter.subtitle}</p>
            <Link href={`/chapter/${activeChapter.id}`}>পড়ায় ফিরে যাও <ArrowRight className="size-4" /></Link>
          </article>
        </section>
      </main>
    </div>
  );
}
