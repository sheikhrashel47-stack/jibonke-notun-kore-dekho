/* জীবন-ড্যাশবোর্ড: always-available navigation with a quiet reading-first hierarchy. */
import { BrandMark } from "@/components/BrandMark";
import { SearchModal } from "@/components/SearchModal";
import { Button } from "@/components/ui/button";
import { useReader } from "@/contexts/ReaderContext";
import { useTheme } from "@/contexts/ThemeContext";
import { BookOpen, Moon, Sun } from "lucide-react";
import { Link } from "wouter";

export function AppHeader() {
  const { theme, toggleTheme } = useTheme();
  const { activeChapterId } = useReader();

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <BrandMark />
        <nav className="app-header__nav" aria-label="প্রধান navigation">
          <Link href="/">শুরু</Link>
          <Link href={`/chapter/${activeChapterId}`}><BookOpen className="size-4" /> পড়া</Link>
          <Link href="/workbook">Workbook</Link>
        </nav>
        <div className="app-header__actions">
          <SearchModal />
          <Button type="button" variant="ghost" size="icon" className="theme-toggle" onClick={toggleTheme} aria-label={theme === "light" ? "ডার্ক মোড চালু করুন" : "লাইট মোড চালু করুন"}>
            {theme === "light" ? <Moon className="size-4.5" /> : <Sun className="size-4.5" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
