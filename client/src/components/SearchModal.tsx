/* জীবন-ড্যাশবোর্ড: modal search that loads chapter text only when the reader asks. */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { chapterLoaders, chapters, type BookChapter } from "@/data/book";
import { Command, Loader2, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";

type SearchResult = { chapter: BookChapter; sectionTitle: string; excerpt: string };

export function SearchModal() {
  const [, setLocation] = useLocation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [library, setLibrary] = useState<BookChapter[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || library.length) return;
    setLoading(true);
    Promise.all(chapters.map((chapter) => chapterLoaders[chapter.id]().then((module) => module.default)))
      .then(setLibrary)
      .finally(() => setLoading(false));
  }, [library.length, open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (event.key === "/" && !target?.matches("input, textarea, [contenteditable=true]")) {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo<SearchResult[]>(() => {
    const search = query.trim().toLocaleLowerCase();
    if (!search || search.length < 2) return [];
    return library.flatMap((chapter) => chapter.sections.flatMap((section) => {
      const fullText = section.blocks.map((block) => block.content).join(" ");
      if (!`${chapter.title} ${section.title} ${fullText}`.toLocaleLowerCase().includes(search)) return [];
      const location = fullText.toLocaleLowerCase().indexOf(search);
      const start = Math.max(0, location - 64);
      return [{ chapter, sectionTitle: section.title, excerpt: `${start ? "…" : ""}${fullText.slice(start, start + 185)}${fullText.length > start + 185 ? "…" : ""}` }];
    })).slice(0, 12);
  }, [library, query]);

  const openResult = (result: SearchResult) => {
    setOpen(false);
    setQuery("");
    setLocation(`/chapter/${result.chapter.id}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button type="button" variant="ghost" className="header-search-trigger" onClick={() => setOpen(true)} aria-label="বইয়ে খুঁজুন">
        <Search className="size-4" /><span>বইয়ে খুঁজুন</span><kbd><Command className="size-3" /> /</kbd>
      </Button>
      <DialogContent className="search-dialog">
        <DialogHeader><DialogTitle>বইয়ের মধ্যে খুঁজুন</DialogTitle><DialogDescription>কোনো ধারণা, শব্দ বা অধ্যায়ের বিষয় লিখুন।</DialogDescription></DialogHeader>
        <div className="search-input-wrap"><Search className="size-5" /><Input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="যেমন: আত্মনিয়ন্ত্রণ, সম্পর্ক, সিদ্ধান্ত" /><button type="button" onClick={() => setQuery("")} aria-label="লেখা মুছুন"><X className="size-4" /></button></div>
        <div className="search-results" aria-live="polite">
          {loading && <p className="search-status"><Loader2 className="size-4 animate-spin" /> বইয়ের ভেতর খোঁজার জন্য প্রস্তুত করছি…</p>}
          {!loading && query.trim().length > 0 && query.trim().length < 2 && <p className="search-status">কমপক্ষে দুই অক্ষর লিখুন।</p>}
          {!loading && query.trim().length >= 2 && !results.length && <p className="search-status">এই শব্দটি মেলেনি। অন্যভাবে লিখে দেখো।</p>}
          {results.map((result) => <button type="button" className="search-result" key={`${result.chapter.id}-${result.sectionTitle}`} onClick={() => openResult(result)}><span>অধ্যায় {result.chapter.number.toLocaleString("bn-BD")} · {result.chapter.title}</span><strong>{result.sectionTitle}</strong><p>{result.excerpt}</p></button>)}
        </div>
      </DialogContent>
    </Dialog>
  );
}
