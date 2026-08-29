import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { translateTexts } from "@/lib/translate.functions";
import { LANGUAGES, RTL_LANGS } from "@/lib/languages";

type Ctx = {
  lang: string;
  setLang: (code: string) => void;
  busy: boolean;
};

const LanguageContext = createContext<Ctx>({ lang: "en", setLang: () => {}, busy: false });

export const useLanguage = () => useContext(LanguageContext);

const STORAGE_KEY = "tg_lang";
const cacheKey = (lang: string) => `tg_lang_cache_${lang}`;
const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "IFRAME", "CODE", "PRE", "TEXTAREA"]);

function isTranslatable(text: string) {
  const t = text.trim();
  if (t.length < 2) return false;
  // Skip pure numbers / symbols / currency
  return /[\p{L}]{2,}/u.test(t);
}

function collectNodes(root: Node) {
  const out: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = (node as Text).parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
      if (parent.closest("[data-no-translate]")) return NodeFilter.FILTER_REJECT;
      if (!isTranslatable(node.nodeValue ?? "")) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  let n = walker.nextNode();
  while (n) {
    out.push(n as Text);
    n = walker.nextNode();
  }
  return out;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState("en");
  const [busy, setBusy] = useState(false);
  const translate = useServerFn(translateTexts);
  const originals = useRef(new WeakMap<Text, string>());
  const dict = useRef<Record<string, string>>({});
  const langRef = useRef("en");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved !== "en" && LANGUAGES.some((l) => l.code === saved)) {
      setLangState(saved);
    }
  }, []);

  // load cache + document direction for the active language
  useEffect(() => {
    langRef.current = lang;
    if (lang === "en") {
      dict.current = {};
    } else {
      try {
        dict.current = JSON.parse(localStorage.getItem(cacheKey(lang)) || "{}");
      } catch {
        dict.current = {};
      }
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL_LANGS.has(lang) ? "rtl" : "ltr";
  }, [lang]);

  const applyDict = useCallback((nodes: Text[]) => {
    for (const node of nodes) {
      const original = originals.current.get(node) ?? node.nodeValue ?? "";
      const key = original.trim();
      const translated = dict.current[key];
      if (translated) {
        originals.current.set(node, original);
        const leading = original.match(/^\s*/)?.[0] ?? "";
        const trailing = original.match(/\s*$/)?.[0] ?? "";
        node.nodeValue = `${leading}${translated}${trailing}`;
      }
    }
  }, []);

  const restore = useCallback(() => {
    for (const node of collectNodes(document.body)) {
      const original = originals.current.get(node);
      if (original !== undefined) node.nodeValue = original;
    }
  }, []);

  const runTranslation = useCallback(
    async (targetLang: string) => {
      if (targetLang === "en") return;
      const nodes = collectNodes(document.body);
      // register originals before mutating anything
      for (const node of nodes) {
        if (!originals.current.has(node)) originals.current.set(node, node.nodeValue ?? "");
      }
      applyDict(nodes);

      const missing = Array.from(
        new Set(
          nodes
            .map((n) => (originals.current.get(n) ?? "").trim())
            .filter((t) => t && !dict.current[t]),
        ),
      );
      if (!missing.length) return;

      const langName = LANGUAGES.find((l) => l.code === targetLang)?.name ?? targetLang;
      setBusy(true);
      try {
        for (let i = 0; i < missing.length; i += 60) {
          const batch = missing.slice(i, i + 60);
          const res = await translate({ data: { lang: langName, texts: batch } });
          if (langRef.current !== targetLang) return;
          batch.forEach((text, idx) => {
            const value = res.translations[idx];
            if (value) dict.current[text] = value;
          });
          try {
            localStorage.setItem(cacheKey(targetLang), JSON.stringify(dict.current));
          } catch {
            // cache full — ignore
          }
          applyDict(collectNodes(document.body));
        }
      } catch {
        // network failure — keep English
      } finally {
        setBusy(false);
      }
    },
    [applyDict, translate],
  );

  // translate on language change
  useEffect(() => {
    if (lang === "en") {
      restore();
      return;
    }
    void runTranslation(lang);
  }, [lang, restore, runTranslation]);

  // keep newly rendered content translated (route changes, toasts, modals)
  useEffect(() => {
    if (lang === "en") return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => void runTranslation(lang), 350);
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [lang, runTranslation]);

  const setLang = useCallback((code: string) => {
    localStorage.setItem(STORAGE_KEY, code);
    setLangState(code);
  }, []);

  const value = useMemo(() => ({ lang, setLang, busy }), [lang, setLang, busy]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
