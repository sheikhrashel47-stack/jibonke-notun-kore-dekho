/* জীবন-ড্যাশবোর্ড: quiet workspace navigation; browser history থাকলে পিছিয়ে যায়, না থাকলে নিরাপদ app fallback দেয়। */
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

type BackButtonProps = {
  fallback: string;
  label?: string;
  compact?: boolean;
  className?: string;
};

export function BackButton({ fallback, label = "পেছনে", compact = false, className = "" }: BackButtonProps) {
  const [, setLocation] = useLocation();
  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else setLocation(fallback);
  };
  return <button type="button" className={`jibon-back-button${compact ? " is-compact" : ""} ${className}`.trim()} onClick={goBack} aria-label={label}>
    <ArrowLeft className="size-4" aria-hidden="true" />
    <span>{label}</span>
  </button>;
}
