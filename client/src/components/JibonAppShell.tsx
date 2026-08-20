/* জীবন-ড্যাশবোর্ড: quiet editorial app shell; personal dashboard routes-এ persistent, safe Back navigation রাখে। */
import { BackButton } from "@/components/BackButton";
import { BrandMark } from "@/components/BrandMark";
import { OfflineNotice } from "@/components/OfflineNotice";
import { SearchModal } from "@/components/SearchModal";
import { useReader } from "@/contexts/ReaderContext";
import { getCurrentChapter } from "@/lib/reading";
import { BarChart3, BookOpen, CircleUserRound, Home, LibraryBig, Store, type LucideIcon } from "lucide-react";
import { Link, useLocation } from "wouter";

type NavItem = { href: string; label: string; icon: LucideIcon };
const navItems: NavItem[] = [
  { href: "/", label: "হোম", icon: Home },
  { href: "/library", label: "লাইব্রেরি", icon: LibraryBig },
  { href: "/store", label: "স্টোর", icon: Store },
  { href: "/progress", label: "অগ্রগতি", icon: BarChart3 },
  { href: "/profile", label: "প্রোফাইল", icon: CircleUserRound },
];

function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function JibonAppShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { activeBookId, lastChapterByBook } = useReader();
  const chapterId = getCurrentChapter(activeBookId, lastChapterByBook);
  return <div className="jibon-app-shell">
    <header className="jibon-app-header">
      <div className="jibon-app-header__inner">
        <BrandMark />
        <nav className="jibon-app-header__nav" aria-label="JIBON প্রধান navigation">
          {navItems.map(({ href, label }) => <Link key={href} href={href} className={isCurrent(location, href) ? "is-active" : ""}>{label}</Link>)}
        </nav>
        <div className="jibon-app-header__actions">
          <SearchModal />
          {location !== "/" && <BackButton compact fallback="/" label="পেছনে" className="jibon-shell-back" />}
          <Link className="jibon-continue-pill" href={`/book/${activeBookId}/chapter/${chapterId}`}><BookOpen className="size-4" /> <span>পাঠে ফিরি</span></Link>
        </div>
      </div>
    </header>
    <main className="jibon-app-main">{children}</main>
    <OfflineNotice />
    <nav className="jibon-bottom-nav" aria-label="JIBON mobile navigation">
      {navItems.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={isCurrent(location, href) ? "is-active" : ""}><Icon className="size-[19px]" /><span>{label}</span></Link>)}
    </nav>
  </div>;
}
