/* জীবন-ড্যাশবোর্ড: a calm action card that turns an insight into a finished practice. */
import { Button } from "@/components/ui/button";
import { useReader } from "@/contexts/ReaderContext";
import { Check, Circle, Sparkles } from "lucide-react";

export function ExerciseCard({ chapterId, index, title, prompt }: { chapterId: string; index: number; title: string; prompt: string }) {
  const { completedExercises, toggleExercise } = useReader();
  const exerciseKey = `${chapterId}-exercise-${index}`;
  const complete = Boolean(completedExercises[exerciseKey]);

  return (
    <article className={`exercise-card ${complete ? "exercise-card--complete" : ""}`}>
      <div className="exercise-card__number">{String(index + 1).padStart(2, "0")}</div>
      <div className="exercise-card__content">
        <p className="eyebrow"><Sparkles className="size-3.5" /> আজকের প্রয়োগ</p>
        <h3>{title}</h3>
        <p>{prompt}</p>
        <Button type="button" variant="ghost" size="sm" className="exercise-card__action" onClick={() => toggleExercise(exerciseKey)}>
          {complete ? <Check className="size-4" /> : <Circle className="size-4" />}
          {complete ? "করা হয়েছে" : "কাজটি শেষ করেছি"}
        </Button>
      </div>
    </article>
  );
}
