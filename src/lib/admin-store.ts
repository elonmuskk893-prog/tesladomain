// LocalStorage-backed admin state. Keeps this project self-contained.
export type Submission = {
  id: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
  car: string;
  fee: number;
  delivery: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal: string;
  country: string;
  paid: boolean;
};

export type ChatMessage = {
  id: string;
  from: "visitor" | "admin";
  name: string;
  text: string;
  at: string;
};

export type Conversation = {
  id: string;
  name: string;
  last: string;
  updatedAt: string;
  messages: ChatMessage[];
};

export type AdminSettings = {
  heroImageUrl: string;
  chatWidgetCode: string;
  supportMode: "none" | "live" | "external";
  supportLink: string;
  brand: string;
};

const KEYS = {
  subs: "tg_submissions",
  convos: "tg_chats",
  settings: "tg_settings",
  auth: "tg_admin_auth",
};

export const ADMIN_EMAIL = "admin@teslagiveaway.com";
export const ADMIN_PASSWORD = "tesla2025";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, val: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(val));
  window.dispatchEvent(new CustomEvent("tg-store", { detail: key }));
}

export const defaultSettings: AdminSettings = {
  heroImageUrl: "",
  chatWidgetCode: "",
  supportMode: "live",
  supportLink: "",
  brand: "#e11d48",
};

export const store = {
  listSubmissions: () => read<Submission[]>(KEYS.subs, []),
  addSubmission: (s: Submission) => {
    const all = store.listSubmissions();
    write(KEYS.subs, [s, ...all]);
  },
  updateSubmission: (id: string, patch: Partial<Submission>) => {
    const all = store.listSubmissions().map((s) => (s.id === id ? { ...s, ...patch } : s));
    write(KEYS.subs, all);
  },
  removeSubmission: (id: string) => {
    write(KEYS.subs, store.listSubmissions().filter((s) => s.id !== id));
  },
  listChats: () => read<Conversation[]>(KEYS.convos, []),
  addVisitorMessage: (name: string, text: string) => {
    const all = store.listChats();
    const now = new Date().toISOString();
    const existing = all.find((c) => c.name === name);
    if (existing) {
      existing.messages.push({ id: crypto.randomUUID(), from: "visitor", name, text, at: now });
      existing.last = text;
      existing.updatedAt = now;
    } else {
      all.unshift({
        id: crypto.randomUUID(),
        name,
        last: text,
        updatedAt: now,
        messages: [{ id: crypto.randomUUID(), from: "visitor", name, text, at: now }],
      });
    }
    write(KEYS.convos, all);
  },
  addAdminReply: (convoId: string, text: string) => {
    const all = store.listChats();
    const c = all.find((x) => x.id === convoId);
    if (!c) return;
    c.messages.push({ id: crypto.randomUUID(), from: "admin", name: "Admin", text, at: new Date().toISOString() });
    c.last = text;
    c.updatedAt = new Date().toISOString();
    write(KEYS.convos, all);
  },
  getSettings: (): AdminSettings => ({ ...defaultSettings, ...read<Partial<AdminSettings>>(KEYS.settings, {}) }),
  saveSettings: (s: AdminSettings) => write(KEYS.settings, s),
  isAuthed: () => read<boolean>(KEYS.auth, false),
  signIn: (email: string, pw: string) => {
    if (email.trim().toLowerCase() === ADMIN_EMAIL && pw === ADMIN_PASSWORD) {
      write(KEYS.auth, true);
      return true;
    }
    return false;
  },
  signOut: () => write(KEYS.auth, false),
};

export function subscribe(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const h = () => cb();
  window.addEventListener("tg-store", h);
  window.addEventListener("storage", h);
  return () => {
    window.removeEventListener("tg-store", h);
    window.removeEventListener("storage", h);
  };
}
