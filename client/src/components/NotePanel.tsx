/* জীবন-ড্যাশবোর্ড: distraction-free note card with automatic local persistence. */
import { Textarea } from "@/components/ui/textarea";
import { useReader } from "@/contexts/ReaderContext";
import { NotebookPen } from "lucide-react";

export function NotePanel({ noteKey, title = "আমার নোট", placeholder = "এই অধ্যায় থেকে কী মনে রাখতে চাও?" }: { noteKey: string; title?: string; placeholder?: string }) {
  const { notes, saveNote } = useReader();

  return (
    <section className="note-panel" aria-label={title}>
      <div className="note-panel__heading">
        <span className="note-panel__icon"><NotebookPen className="size-4" /></span>
        <div>
          <h3>{title}</h3>
          <p>নিজে থেকেই সেভ হবে</p>
        </div>
      </div>
      <Textarea
        value={notes[noteKey] || ""}
        onChange={(event) => saveNote(noteKey, event.target.value)}
        placeholder={placeholder}
        className="note-panel__input"
      />
    </section>
  );
}
