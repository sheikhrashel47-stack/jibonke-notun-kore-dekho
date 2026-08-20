/* জীবন-ড্যাশবোর্ড: a compact symbol-first brand mark for persistent navigation. */
import { Link } from "wouter";

const brandSymbol = "/manus-storage/jibon-brand-symbol_97a85699.png";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand-mark" aria-label="জীবনকে নতুন করে দেখো — হোম">
      <img src={brandSymbol} alt="জীবনকে নতুন করে দেখো" className="brand-mark__symbol" />
      {!compact && (
        <span className="brand-mark__name">
          <span>জীবনকে</span>
          <span>নতুন করে দেখো</span>
        </span>
      )}
    </Link>
  );
}

export { brandSymbol };
