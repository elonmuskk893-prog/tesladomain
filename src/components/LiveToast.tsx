import { useEffect, useState } from "react";
import { TOAST_PEOPLE } from "@/lib/site-data";

export function LiveToast() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setI((n) => (n + 1) % TOAST_PEOPLE.length);
        setShow(true);
      }, 350);
    }, 5200);
    return () => clearInterval(t);
  }, []);

  const p = TOAST_PEOPLE[i]!;
  return (
    <div className="pointer-events-none fixed top-3 left-1/2 z-50 w-[92%] max-w-sm -translate-x-1/2">
      {show && (
        <div
          key={i}
          className="animate-toast-in rounded-2xl bg-card p-4 shadow-toast ring-1 ring-border"
        >
          <div className="flex items-start gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-primary-foreground">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4 10-10" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-ink">{p.name}</span>
                <span className="text-lg leading-none">{p.flag}</span>
                <span className="text-ink-soft">{p.country}</span>
              </div>
              <div className="mt-0.5 text-xs text-ink-soft">Just paid delivery fee for</div>
              <span className="mt-1 inline-block rounded-md bg-brand-soft px-2 py-0.5 text-xs font-semibold text-brand">
                {p.car}
              </span>
              <div className="mt-2 text-sm font-semibold text-success">
                🚗 Car confirmed &amp; dispatched!
                <div className="text-xs">(${p.fee} fee paid)</div>
              </div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-2/3 rounded-full bg-brand fee-shimmer" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
