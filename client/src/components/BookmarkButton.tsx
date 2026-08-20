/* জীবন-ড্যাশবোর্ড: one-click, local-first chapter bookmarking. */
import { Button } from "@/components/ui/button";
import { useReader } from "@/contexts/ReaderContext";
import { Bookmark } from "lucide-react";

export function BookmarkButton({ chapterId, label = true }: { chapterId: string; label?: boolean }) {
  const { bookmarks, toggleBookmark } = useReader();
  const saved = bookmarks.includes(chapterId);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={`reader-icon-button ${saved ? "reader-icon-button--saved" : ""}`}
      onClick={() => toggleBookmark(chapterId)}
      aria-pressed={saved}
      title={saved ? "বুকমার্ক সরাও" : "বুকমার্ক রাখো"}
    >
      <Bookmark className="size-4" fill={saved ? "currentColor" : "none"} />
      {label && <span>{saved ? "সেভ করা" : "বুকমার্ক"}</span>}
    </Button>
  );
}
