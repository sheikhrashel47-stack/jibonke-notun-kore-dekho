/* বইঘর নকশা: text-led wordmark, extra image dependency ছাড়াই ছোট screen-এ পরিষ্কার থাকে। */
import { BookHeart } from "lucide-react";
import { Link } from "wouter";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand-mark" aria-label="জীবন বইঘর — হোম">
      <span className="brand-mark__symbol" aria-hidden="true"><BookHeart className="size-5" /></span>
      {!compact && (
        <span className="brand-mark__name">
          <span>জীবন</span>
          <span>বইঘর</span>
        </span>
      )}
    </Link>
  );
}
