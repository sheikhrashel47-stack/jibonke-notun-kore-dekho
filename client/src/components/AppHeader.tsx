/* জীবন-ড্যাশবোর্ড: reader header-এ সব mode-এর দৃশ্যমান পথ ও নিরাপদ Back control রাখে। */
import { BackButton } from "@/components/BackButton";
import { BrandMark } from "@/components/BrandMark";
import { SearchModal } from "@/components/SearchModal";
import { Button } from "@/components/ui/button";
import { useReader } from "@/contexts/ReaderContext";
import { useTheme } from "@/contexts/ThemeContext";
import { BookOpen, FileText, Hand, Moon, ScrollText, Sun } from "lucide-react";
import { Link } from "wouter";

export function AppHeader() {
  const { theme, toggleTheme } = useTheme();
  const { activeBookId, activeChapterId, lastChapterByBook } = useReader();
  const activeChapter = lastChapterByBook[activeBookId] || activeChapterId || "01";
  return <header className="app-header store-header"><div className="app-header__inner"><BrandMark /><nav className="app-header__nav" aria-label="প্রধান navigation"><Link href="/#library">বইঘর</Link><Link href={`/book/${activeBookId}/chapter/${activeChapter}`}><BookOpen className="size-4" /> পড়া</Link><Link href={`/book/${activeBookId}/scroll#chapter-${activeChapter}`}><ScrollText className="size-4" /> একটানা</Link><Link href={`/book/${activeBookId}/swipe/1`}><Hand className="size-4" /> পাতা উল্টে</Link><Link href={`/book/${activeBookId}/page/1`}><FileText className="size-4" /> পৃষ্ঠা</Link><Link href={`/book/${activeBookId}/workbook`}>অনুশীলন</Link></nav><div className="app-header__actions"><BackButton compact fallback="/" label="পেছনে" className="app-header__back" /><SearchModal /><Button type="button" variant="ghost" size="icon" className="theme-toggle" onClick={toggleTheme} aria-label={theme === "light" ? "ডার্ক মোড চালু করুন" : "লাইট মোড চালু করুন"}>{theme === "light" ? <Moon className="size-4.5" /> : <Sun className="size-4.5" />}</Button></div></div><div className="app-header__mobile-modes" aria-label="পড়ার ধরন"><Link href={`/book/${activeBookId}/chapter/${activeChapter}`}><BookOpen className="size-4" /> অধ্যায়</Link><Link className="is-primary" href={`/book/${activeBookId}/swipe/1`}><Hand className="size-4" /> পাতা উল্টে পড়া</Link><Link href={`/book/${activeBookId}/scroll#chapter-${activeChapter}`}><ScrollText className="size-4" /> একটানা</Link></div></header>;
}
