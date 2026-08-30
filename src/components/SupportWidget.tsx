import { useEffect, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { store, subscribe, type Conversation } from "@/lib/admin-store";

export function SupportWidget() {
  const [settings, setSettings] = useState(store.getSettings);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [convo, setConvo] = useState<Conversation | null>(null);

  useEffect(() => subscribe(() => setSettings(store.getSettings())), []);
  useEffect(() => {
    if (!name) return;
    const sync = () => setConvo(store.listChats().find((c) => c.name === name) ?? null);
    sync();
    return subscribe(sync);
  }, [name]);

  if (settings.supportMode === "none") return null;

  if (settings.supportMode === "external") {
    return (
      <a
        href={settings.supportLink || "#"}
        target="_blank"
        rel="noreferrer"
        className="fixed right-4 bottom-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-brand text-primary-foreground shadow-toast transition-transform hover:scale-105"
        aria-label="Support"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    );
  }

  const send = () => {
    const who = name.trim() || "Visitor";
    if (!text.trim()) return;
    setName(who);
    store.addVisitorMessage(who, text.trim());
    setText("");
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Live chat"
        className="fixed right-4 bottom-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-brand text-primary-foreground shadow-toast transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
      {open && (
        <div className="fixed right-4 bottom-24 z-40 flex max-h-[70vh] w-[min(22rem,calc(100vw-2rem))] animate-rise flex-col overflow-hidden rounded-3xl bg-card shadow-toast ring-1 ring-border">
          <div className="bg-shell px-4 py-3 text-shell-fg">
            <p className="font-bold">Emmy Autos Support</p>
            <p className="text-xs text-shell-muted">We usually reply in a few minutes</p>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {!convo && (
              <p className="rounded-2xl bg-secondary px-3 py-2 text-sm text-ink-soft">
                Hi 👋 Ask us anything about your Emmy Autos claim.
              </p>
            )}
            {convo?.messages.map((m) => (
              <p
                key={m.id}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  m.from === "admin"
                    ? "bg-secondary text-ink"
                    : "ml-auto bg-brand text-primary-foreground"
                }`}
              >
                {m.text}
              </p>
            ))}
          </div>
          <div className="border-t border-border p-3">
            {!name && (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mb-2 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            )}
            <div className="flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Type a message…"
                className="flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={send}
                aria-label="Send"
                className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-primary-foreground hover:bg-brand-strong"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
