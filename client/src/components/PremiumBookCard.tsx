/* JIBON premium catalog card: a readable book identity plus one unmistakable next action. */
import { Button } from "@/components/ui/button";
import type { BookDefinition } from "@/data/books";
import { ArrowRight, BookOpen, Check, Plus } from "lucide-react";
import { Link } from "wouter";

type PremiumBookCardProps = {
  book: BookDefinition;
  progress: number;
  chapterId: string;
  inLibrary?: boolean;
  onLibraryToggle?: () => void;
  compact?: boolean;
};

export function PremiumBookCard({ book, progress, chapterId, inLibrary, onLibraryToggle, compact = false }: PremiumBookCardProps) {
  return <article className={`premium-book-card ${compact ? "premium-book-card--compact" : ""}`} style={{ "--book-accent": book.accent, "--book-accent-soft": book.accentSoft } as React.CSSProperties}>
    <Link href={`/store/book/${book.id}`} className="premium-book-card__cover-link" aria-label={`${book.title} বইয়ের বিস্তারিত দেখুন`}><img src={book.cover} alt={`${book.title} বইয়ের cover`} className="premium-book-card__cover" loading="eager" decoding="async" fetchPriority="high" /></Link>
    <div className="premium-book-card__body">
      <div className="premium-book-card__meta"><span>{book.category}</span><span>{book.pdfPageCount.toLocaleString("bn-BD")} পৃষ্ঠা</span></div>
      <h3><Link href={`/store/book/${book.id}`}>{book.title}</Link></h3>
      <p>{book.subtitle}</p>
      <div className="premium-book-card__progress" aria-label={`${book.title} ${progress}% পড়া`}><span style={{ width: `${progress}%` }} /></div>
      <div className="premium-book-card__footer"><small>{progress ? `${progress.toLocaleString("bn-BD")}% পড়া` : "শুরু করার অপেক্ষায়"}</small><Link href={`/book/${book.id}/chapter/${chapterId}`}>{progress ? "পড়া চালাও" : "পড়া শুরু"} <ArrowRight className="size-3.5" /></Link></div>
      {!compact && <div className="premium-book-card__actions"><Button asChild size="sm"><Link href={`/book/${book.id}/chapter/${chapterId}`}><BookOpen className="size-3.5" /> পড়ি</Link></Button>{onLibraryToggle && <button type="button" className="premium-book-card__library-toggle" onClick={onLibraryToggle}>{inLibrary ? <><Check className="size-3.5" /> লাইব্রেরিতে আছে</> : <><Plus className="size-3.5" /> লাইব্রেরিতে রাখি</>}</button>}</div>}
    </div>
  </article>;
}
