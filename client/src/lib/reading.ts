/* JIBON premium library: small, deterministic reading calculations shared across product surfaces. */
import { bookDefinitions, chapterStorageKey, type BookDefinition, type BookId } from "@/data/books";

export function getBookProgress(bookId: BookId, progress: Record<string, number>) {
  const book = bookDefinitions[bookId];
  const total = book.chapters.reduce((sum, chapter) => sum + (progress[chapterStorageKey(bookId, chapter.id)] || 0), 0);
  return Math.min(100, Math.round(total / Math.max(1, book.chapters.length)));
}

export function getCompletedChapterCount(bookId: BookId, progress: Record<string, number>) {
  return bookDefinitions[bookId].chapters.filter((chapter) => (progress[chapterStorageKey(bookId, chapter.id)] || 0) >= 95).length;
}

export function getEstimatedPagesRead(bookId: BookId, progress: Record<string, number>) {
  return Math.round(bookDefinitions[bookId].pdfPageCount * getBookProgress(bookId, progress) / 100);
}

export function getBookStatus(book: BookDefinition, progress: Record<string, number>) {
  const percentage = getBookProgress(book.id, progress);
  if (percentage >= 95) return "সম্পূর্ণ";
  if (percentage > 0) return "পাঠ চলছে";
  return "শুরু করা হয়নি";
}

export function getCurrentChapter(bookId: BookId, lastChapterByBook: Record<BookId, string>, fallback = "01") {
  const candidate = lastChapterByBook[bookId] || fallback;
  return bookDefinitions[bookId].chapters.some((chapter) => chapter.id === candidate) ? candidate : bookDefinitions[bookId].chapters[0]?.id || fallback;
}

export function getReadingStreak(activity: Record<string, number>) {
  let streak = 0;
  const cursor = new Date();
  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    if (!activity[key]) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function formatMinutes(minutes: number) {
  if (minutes < 60) return `${minutes.toLocaleString("bn-BD")} মিনিট`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder ? `${hours.toLocaleString("bn-BD")} ঘ ${remainder.toLocaleString("bn-BD")} মি` : `${hours.toLocaleString("bn-BD")} ঘ`;
}
