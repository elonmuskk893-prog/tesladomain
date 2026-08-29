import { ChevronUp } from "lucide-react";
export function LangPill() {
  return (
    <div className="pointer-events-none fixed bottom-5 left-4 z-40">
      <div className="pointer-events-auto flex items-center gap-2 rounded-2xl bg-card px-3 py-2 shadow-toast ring-1 ring-border">
        <span className="text-lg leading-none">🇺🇸</span>
        <span className="text-sm font-semibold text-ink">EN</span>
        <ChevronUp className="h-4 w-4 text-ink-soft" />
      </div>
    </div>
  );
}
