/* জীবন-ড্যাশবোর্ড: open-book/path mark এবং custom Bengali wordmark-এ শান্ত reading companion identity। */
import { BookOpen } from "lucide-react";
import { Link } from "wouter";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand-mark" aria-label="জীবন বইঘর — হোম">
      <span className="brand-mark__symbol" aria-hidden="true"><BookOpen className="size-5" /><i /></span>
      {!compact && (
        <span className="brand-mark__name">
          <span>জীবনকে</span>
          <span>নতুন করে দেখো</span>
        </span>
      )}
    </Link>
  );
}
