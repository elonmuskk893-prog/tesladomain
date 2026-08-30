import { useEffect, useState } from "react";
import { Check } from "lucide-react";

export function SubscribeButton({ channel }: { channel: string }) {
  const key = `emmy-subscribed:${channel}`;
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    try {
      setSubscribed(window.localStorage.getItem(key) === "1");
    } catch {
      /* storage unavailable */
    }
  }, [key]);

  const subscribe = () => {
    if (subscribed) return;
    setSubscribed(true);
    try {
      window.localStorage.setItem(key, "1");
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <button
      type="button"
      onClick={subscribe}
      aria-pressed={subscribed}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-5 py-2 text-sm font-bold transition-all active:scale-95 ${
        subscribed
          ? "bg-shell-line text-shell-fg"
          : "bg-brand text-primary-foreground hover:bg-brand-strong"
      }`}
    >
      {subscribed && <Check className="h-4 w-4 animate-rise" />}
      {subscribed ? "Subscribed" : "Subscribe"}
    </button>
  );
}
