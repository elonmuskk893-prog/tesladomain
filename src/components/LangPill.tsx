import { useEffect, useMemo, useState } from "react";
import { ChevronUp, Loader2, Search, X } from "lucide-react";
import { LANGUAGES } from "@/lib/languages";
import { useLanguage } from "@/components/LanguageProvider";

export function LangPill() {
  const { lang, setLang, busy } = useLanguage();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const active = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LANGUAGES;
    return LANGUAGES.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.native.toLowerCase().includes(q) ||
        l.code.includes(q),
    );
  }, [query]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="pointer-events-none fixed bottom-5 left-4 z-40" data-no-translate>
        <button
          onClick={() => setOpen(true)}
          aria-label="Change language"
          className="pointer-events-auto flex items-center gap-2 rounded-2xl bg-card px-3 py-2 shadow-toast ring-1 ring-border transition-transform hover:-translate-y-0.5 active:scale-95"
        >
          <span className="text-lg leading-none">{active.flag}</span>
          <span className="text-sm font-semibold uppercase text-ink">{active.code}</span>
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin text-brand" />
          ) : (
            <ChevronUp className="h-4 w-4 text-ink-soft" />
          )}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center" data-no-translate>
          <button
            aria-label="Close language menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
          />
          <div className="animate-rise relative flex max-h-[80vh] w-full flex-col overflow-hidden rounded-t-3xl bg-card shadow-toast ring-1 ring-border sm:max-w-md sm:rounded-3xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <div className="font-display text-lg font-extrabold text-ink">Select language</div>
                <p className="text-xs text-ink-soft">The whole site switches instantly</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-full p-2 text-ink-soft hover:bg-secondary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="border-b border-border px-4 py-3">
              <div className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2">
                <Search className="h-4 w-4 text-ink-soft" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search languages"
                  className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft"
                />
              </div>
            </div>

            <div className="grid gap-1 overflow-y-auto p-3 sm:grid-cols-2">
              {results.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    l.code === lang ? "bg-brand-soft text-brand" : "text-ink hover:bg-secondary"
                  }`}
                >
                  <span className="text-lg leading-none">{l.flag}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{l.native}</span>
                    <span className="block truncate text-xs text-ink-soft">{l.name}</span>
                  </span>
                </button>
              ))}
              {!results.length && (
                <p className="col-span-full px-3 py-6 text-center text-sm text-ink-soft">
                  No languages found.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
