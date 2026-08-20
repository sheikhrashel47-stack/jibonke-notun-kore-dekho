/* JIBON reader preferences: persistent, low-distraction controls shared by desktop and mobile readers. */
import { useReader, type ReaderFont, type ReaderLineHeight, type ReaderTheme } from "@/contexts/ReaderContext";
import { Check, MoonStar, SunMedium, TreePine } from "lucide-react";

const themes: { id: ReaderTheme; label: string; icon: typeof SunMedium; hint: string }[] = [
  { id: "ivory", label: "দিন", icon: SunMedium, hint: "উজ্জ্বল কাগজ" },
  { id: "dark", label: "রাত", icon: MoonStar, hint: "কম আলোতে" },
  { id: "sepia", label: "সেপিয়া", icon: SunMedium, hint: "নরম উষ্ণতা" },
  { id: "focus", label: "বন", icon: TreePine, hint: "গভীর মনোযোগ" },
];
const fontSizes = [{ id: "small", label: "ছোট" }, { id: "medium", label: "মাঝারি" }, { id: "large", label: "বড়" }, { id: "xlarge", label: "খুব বড়" }] as const;
const fontFamilies: { id: ReaderFont; label: string }[] = [{ id: "serif", label: "বইয়ের" }, { id: "sans", label: "সাদামাটা" }];
const lineHeights: { id: ReaderLineHeight; label: string }[] = [{ id: "compact", label: "ঘন" }, { id: "comfort", label: "স্বাভাবিক" }, { id: "relaxed", label: "খোলা" }];

export function ReaderPreferences({ compact = false }: { compact?: boolean }) {
  const { readerTheme, readerFont, readerLineHeight, fontSize, setReaderTheme, setReaderFont, setReaderLineHeight, setFontSize } = useReader();
  return <section className={`reader-preferences ${compact ? "reader-preferences--compact" : ""}`} aria-label="পড়ার পছন্দ">
    <div className="reader-preferences__heading"><span>পড়ার পরিবেশ</span><small>সব বইয়ে মনে থাকবে</small></div>
    <div className="reader-theme-picker" role="radiogroup" aria-label="পড়ার থিম">{themes.map(({ id, label, icon: Icon, hint }) => <button key={id} type="button" className={`reader-theme-choice reader-theme-choice--${id} ${readerTheme === id ? "is-active" : ""}`} onClick={() => setReaderTheme(id)} role="radio" aria-checked={readerTheme === id} title={hint}><Icon className="size-3.5" /><span>{label}</span>{readerTheme === id && <Check className="reader-theme-choice__check size-3" />}</button>)}</div>
    {!compact && <><div className="reader-preferences__row"><span>লেখার আকার</span><div className="reader-segmented-control">{fontSizes.map(({ id, label }) => <button key={id} type="button" className={fontSize === id ? "is-active" : ""} onClick={() => setFontSize(id)} aria-pressed={fontSize === id}>{label}</button>)}</div></div><div className="reader-preferences__row"><span>লেখার ধরন</span><div className="reader-segmented-control">{fontFamilies.map(({ id, label }) => <button key={id} type="button" className={readerFont === id ? "is-active" : ""} onClick={() => setReaderFont(id)} aria-pressed={readerFont === id}>{label}</button>)}</div></div><div className="reader-preferences__row"><span>লাইনের ফাঁক</span><div className="reader-segmented-control">{lineHeights.map(({ id, label }) => <button key={id} type="button" className={readerLineHeight === id ? "is-active" : ""} onClick={() => setReaderLineHeight(id)} aria-pressed={readerLineHeight === id}>{label}</button>)}</div></div></>}
  </section>;
}
