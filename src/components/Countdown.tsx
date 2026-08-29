import { useEffect, useState } from "react";
import { Clock, Users } from "lucide-react";

const KEY = "tg_countdown_end";
function getEnd() {
  if (typeof window === "undefined") return Date.now() + 12 * 3600 * 1000;
  const raw = window.localStorage.getItem(KEY);
  if (raw) {
    const n = Number(raw);
    if (n - Date.now() > 60_000) return n;
  }
  const next = Date.now() + 12 * 3600 * 1000;
  window.localStorage.setItem(KEY, String(next));
  return next;
}

export function Countdown() {
  const [end] = useState(getEnd);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, end - now);
  const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
  const m = String(Math.floor((diff / 60000) % 60)).padStart(2, "0");
  const s = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

  return (
    <div className="mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft">
      <div className="flex items-center gap-2 text-sm font-semibold text-brand">
        <Clock className="h-5 w-5" />
        <span>Event ends in:</span>
      </div>
      <div className="flex items-center gap-1 text-ink">
        {[
          [h, "HRS"],
          [m, "MIN"],
          [s, "SEC"],
        ].map(([v, l], i) => (
          <div key={l} className="flex items-center">
            {i > 0 && <span className="px-1 text-2xl font-black text-brand">:</span>}
            <div className="text-center">
              <div className="text-2xl font-black leading-none">{v}</div>
              <div className="text-[10px] font-semibold tracking-widest text-ink-soft">{l}</div>
            </div>
          </div>
        ))}
      </div>
      <Users className="h-5 w-5 text-ink-soft" />
    </div>
  );
}
