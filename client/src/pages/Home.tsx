/* জীবন-ড্যাশবোর্ড: asymmetric landing page frames the book as a personal reading companion. */
import { AppHeader } from "@/components/AppHeader";
import { chapters } from "@/data/book";
import { useReader } from "@/contexts/ReaderContext";
import { ArrowRight, Bookmark, BookOpenText, CheckCircle2, Compass, NotebookPen, Play, Sparkles } from "lucide-react";
import { Link } from "wouter";

const coverImage = "/manus-storage/jibon-cover_f6a3eb29.png";
const heroImage = "/manus-storage/jibon-hero-reading_85e1d2b2.png";

export default function Home() {
  const { activeChapterId, bookmarks, completedExercises, notes, progress } = useReader();
  const activeChapter = chapters.find((chapter) => chapter.id === activeChapterId) || chapters[0];
  const completeChapters = Object.values(progress).filter((value) => value >= 95).length;
  const overallProgress = Math.round((Object.values(progress).reduce((total, value) => total + value, 0) / chapters.length) || 0);
  const completedPractice = Object.values(completedExercises).filter(Boolean).length;
  const noteCount = Object.values(notes).filter((note) => note.trim().length > 0).length;
  const activeProgress = progress[activeChapter.id] || 0;

  return (
    <div className="page-shell home-page">
      <AppHeader />
      <main>
        <section className="home-hero">
          <div className="home-hero__copy">
            <p className="eyebrow"><Sparkles className="size-4" /> একটি বাংলা reading companion</p>
            <h1>নিজেকে বোঝার<br /><em>একটি শান্ত জায়গা</em></h1>
            <p className="home-hero__lead">“জীবনকে নতুন করে দেখো” শুধু পড়ার বই নয়। এখানে তুমি চিন্তার জায়গাগুলোতে থামতে পারবে, নিজের ভাষায় লিখতে পারবে, আর ছোট কাজ দিয়ে বদল শুরু করতে পারবে।</p>
            <div className="home-hero__actions">
              <Link href={`/chapter/${activeChapter.id}`} className="primary-cta"><Play className="size-4" fill="currentColor" /> {progress[activeChapter.id] ? "পড়া চালিয়ে যাও" : "বই পড়া শুরু করো"}</Link>
              <Link href="/workbook" className="text-cta">Workbook খোলো <ArrowRight className="size-4" /></Link>
            </div>
            <div className="home-hero__cred"><span>১৫টি অধ্যায়</span><i /><span>প্রায় ৩০০ পৃষ্ঠার পাঠ</span><i /><span>নিজের নোট সেভ রাখো</span></div>
          </div>
          <section className="hero-system" aria-label="তোমার reading dashboard">
            <div className="hero-system__heading"><span className="system-badge"><Compass className="size-3.5" /> তোমার reading dashboard</span><span>আজ</span></div>
            <div className="hero-system__chapter">
              <div className="hero-system__index">{String(activeChapter.number).padStart(2, "0")}</div>
              <div><p>এখন পড়ছ</p><h2>{activeChapter.title}</h2><span>{activeChapter.subtitle}</span></div>
              <strong>{activeProgress}%</strong>
            </div>
            <div className="hero-system__track"><span style={{ width: `${activeProgress}%` }} /></div>
            <div className="hero-system__next">
              <div><p className="eyebrow"><Sparkles className="size-3.5" /> আজকের প্রয়োগ</p><h3>পড়া শেষ না হলেও, একটি ভাবনা লিখে রাখো।</h3><p>একটি ছোট বাক্যই পরের পরিবর্তনের শুরু হতে পারে।</p></div>
              <Link href="/workbook">এখন লিখি <ArrowRight className="size-4" /></Link>
            </div>
            <div className="hero-system__stats"><span><Bookmark className="size-4" /><b>{bookmarks.length.toLocaleString("bn-BD")}</b> বুকমার্ক</span><span><NotebookPen className="size-4" /><b>{noteCount.toLocaleString("bn-BD")}</b> নোট</span><span><CheckCircle2 className="size-4" /><b>{completedPractice.toLocaleString("bn-BD")}</b> কাজ</span></div>
            <div className="hero-system__atmosphere"><img src={heroImage} alt="খোলা বই থেকে শুরু হওয়া শান্ত পথের ইলাস্ট্রেশন" /><div className="hero-system__cover"><img src={coverImage} alt="জীবনকে নতুন করে দেখো বইয়ের কভার" /></div></div>
          </section>
        </section>

        <section className="reading-snapshot">
          <div className="snapshot-intro"><p className="eyebrow">তোমার পাঠের হিসাব</p><h2>ছোট অগ্রগতিও অগ্রগতি।</h2><p>তুমি যেখানে থেমেছিলে, সেখান থেকেই আবার শুরু করতে পারো।</p></div>
          <div className="snapshot-progress"><div className="snapshot-progress__number">{overallProgress}%</div><div><p>পুরো বই পড়া হয়েছে</p><div className="progress-meter"><span style={{ width: `${overallProgress}%` }} /></div><span>{completeChapters.toLocaleString("bn-BD")}টি অধ্যায় সম্পন্ন</span></div></div>
          <div className="snapshot-counters"><span><Bookmark className="size-4" /><strong>{bookmarks.length.toLocaleString("bn-BD")}</strong> বুকমার্ক</span><span><CheckCircle2 className="size-4" /><strong>{completedPractice.toLocaleString("bn-BD")}</strong> অনুশীলন</span><span><NotebookPen className="size-4" /> নোট সেভ থাকে</span></div>
        </section>

        <section className="chapter-roadmap">
          <div className="section-heading"><div><p className="eyebrow">বইয়ের পথনকশা</p><h2>তোমার নিজের গতিতে এগোও</h2></div><Link href={`/chapter/${activeChapter.id}`} className="section-heading__link">এখন পড়ো <ArrowRight className="size-4" /></Link></div>
          <div className="chapter-roadmap__list">
            {chapters.map((chapter) => {
              const chapterProgress = progress[chapter.id] || 0;
              return <Link href={`/chapter/${chapter.id}`} key={chapter.id} className={`roadmap-card ${chapter.id === activeChapter.id ? "roadmap-card--current" : ""}`}>
                <span className="roadmap-card__index">{String(chapter.number).padStart(2, "0")}</span>
                <div><h3>{chapter.title}</h3><p>{chapter.subtitle}</p></div>
                <div className="roadmap-card__status"><span>{chapterProgress ? `${chapterProgress}%` : "শুরু"}</span><div><i style={{ width: `${chapterProgress}%` }} /></div></div>
                <ArrowRight className="roadmap-card__arrow size-4" />
              </Link>;
            })}
          </div>
        </section>

        <section className="home-closing">
          <div><p className="eyebrow"><BookOpenText className="size-4" /> আজকের জন্য</p><h2>সব উত্তর একদিনে লাগে না।<br />একটি ভালো প্রশ্নই যথেষ্ট।</h2></div>
          <Link href={`/chapter/${activeChapter.id}`} className="primary-cta">{activeChapter.title} পড়ো <ArrowRight className="size-4" /></Link>
        </section>
      </main>
    </div>
  );
}
