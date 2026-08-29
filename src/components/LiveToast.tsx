import { useEffect, useState } from "react";
import { TOAST_PEOPLE } from "@/lib/site-data";

const DURATION = 5000;
const FADE = 450;

export function LiveToast() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const enter = setTimeout(() => setShow(true), 900);
    return () => clearTimeout(enter);
  }, []);

  useEffect(() => {
    if (!show) {
      setRun(false);
      return;
    }
    const raf = requestAnimationFrame(() => setRun(true));
    const out = setTimeout(() => setShow(false), DURATION);
    const next = setTimeout(() => {
      setI((n) => (n + 1) % TOAST_PEOPLE.length);
      setShow(true);
    }, DURATION + FADE);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(out);
      clearTimeout(next);
    };
  }, [show, i]);

  const p = TOAST_PEOPLE[i]!;

  return (
    <div className="pointer-events-none fixed bottom-4 left-1/2 z-40 w-[92%] max-w-sm -translate-x-1/2 sm:left-5 sm:translate-x-0">
      <div
        key={i}
        className={`overflow-hidden rounded-2xl bg-card shadow-toast ring-1 ring-border transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          show ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-95 opacity-0"
        }`}
      >
        <div className="flex items-start gap-3 p-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-primary-foreground">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4 10-10" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 text-sm">
              <span className="font-bold text-ink">{p.name}</span>
              <span className="text-base leading-none">{p.flag}</span>
              <span className="text-ink-soft">{p.country}</span>
            </div>
            <div className="mt-0.5 text-sm text-ink-soft">Just paid delivery fee for</div>
            <span className="mt-1.5 inline-block rounded-full bg-brand-soft px-2.5 py-1 text-xs font-bold text-brand">
              {p.car}
            </span>
            <div className="mt-2 text-sm leading-snug font-bold text-success">
              🚗 Car confirmed &amp; dispatched! (${p.fee} fee paid)
            </div>
          </div>
        </div>
        <div className="mx-4 mb-3 h-1.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-brand"
            style={{
              width: run ? "100%" : "0%",
              transition: run ? `width ${DURATION}ms linear` : "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}
