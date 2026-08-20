/* জীবন-ড্যাশবোর্ড: each book has its own practical reflection rhythm, notes and completion state. */
import { AppHeader } from "@/components/AppHeader";
import { ExerciseCard } from "@/components/ExerciseCard";
import { NotePanel } from "@/components/NotePanel";
import { getBookDefinition, workbookNoteStorageKey } from "@/data/books";
import { useReader } from "@/contexts/ReaderContext";
import { ArrowRight, BookMarked, CheckCircle2, ClipboardPenLine, Compass, NotebookPen, TimerReset } from "lucide-react";
import { Link, useParams } from "wouter";

const workbookImage = "/manus-storage/jibon-workbook_1315620c.png";

export default function Workbook() {
  const params = useParams<{ bookId?: string }>();
  const book = getBookDefinition(params.bookId);
  const { activeBookId, activeChapterId, completedExercises, lastChapterByBook } = useReader();
  const completedCount = Object.entries(completedExercises).filter(([key, completed]) => completed && key.startsWith(`${book.id}:`)).length;
  const activeId = activeBookId === book.id ? activeChapterId : lastChapterByBook[book.id];
  const activeChapter = book.chapters.find((chapter) => chapter.id === activeId) || book.chapters[0];
  const currentExercise = book.workbookExercises[completedCount % book.workbookExercises.length];
  const totalExercises = book.workbookExercises.length;
  return <div className="page-shell workbook-page"><AppHeader /><main><section className="workbook-hero"><div className="workbook-hero__copy"><p className="eyebrow"><ClipboardPenLine className="size-4" /> {book.title} · চিন্তা থেকে অনুশীলনে</p><h1>পড়ার পরেই বদল আসে না।<br />ছোট কাজ থেকে শুরু হয়।</h1><p>এই জায়গাটি তোমার নিজের। ধীরে ধীরে করো, নিজের ভাষায় লেখো, আর যেটুকু পারো সেটুকুকেই গুরুত্ব দাও।</p><div className="workbook-hero__stats"><span><CheckCircle2 className="size-4" /> {completedCount.toLocaleString("bn-BD")}টি কাজ সম্পন্ন</span><span><TimerReset className="size-4" /> সপ্তাহে একবার ফিরে দেখো</span></div></div><aside className="workbook-hero__board" aria-label="আজকের অনুশীলন dashboard"><div className="workbook-board__head"><span><Compass className="size-4" /> আজকের প্রয়োগ</span><span>নিজের গতিতে</span></div><div className="workbook-board__active"><div className="workbook-board__number">{String(completedCount + 1).padStart(2, "0")}</div><div><p>এখনের ছোট কাজ</p><h2>{currentExercise.title}</h2><span>একটি কাজ বেছে নাও, তারপর নিজের ভাষায় লিখো।</span></div></div><div className="workbook-board__thread"><span style={{ width: `${Math.min(100, (completedCount / totalExercises) * 100)}%` }} /></div><div className="workbook-board__status"><span><NotebookPen className="size-4" /> ফিরে দেখা</span><strong>{completedCount.toLocaleString("bn-BD")} / {totalExercises.toLocaleString("bn-BD")}</strong></div><div className="workbook-hero__scene"><img src={workbookImage} alt="নোটবুক ও কলমের ইলাস্ট্রেশন" /></div></aside></section><section className="workbook-section"><div className="section-heading"><div><p className="eyebrow">শুরু করার জায়গা</p><h2>নিজের জন্য কাজগুলো বেছে নাও</h2></div><span className="section-heading__note">একটি শেষ করলেই যথেষ্ট</span></div><div className="workbook-exercises">{book.workbookExercises.map((exercise, index) => <ExerciseCard key={exercise.title} chapterId={`${book.id}:workbook`} index={index} {...exercise} />)}</div></section><section className="reflection-grid"><NotePanel noteKey={workbookNoteStorageKey(book.id)} title="এই সপ্তাহের ফিরে দেখা" placeholder="কী ভালো হয়েছে? কোথায় আটকে গেছ? পরের সপ্তাহে শুধু কোন ছোট বিষয়টি বদলাতে চাও?" /><article className="reflection-next"><BookMarked className="size-5" /><p className="eyebrow">এখন পড়তে পারো</p><h2>অধ্যায় {activeChapter.number.toLocaleString("bn-BD")} — {activeChapter.title}</h2><p>{activeChapter.subtitle}</p><Link href={`/book/${book.id}/chapter/${activeChapter.id}`}>পড়ায় ফিরে যাও <ArrowRight className="size-4" /></Link></article></section></main></div>;
}
