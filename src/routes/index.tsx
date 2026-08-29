import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Zap,
  Star,
  Globe,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Download,
  ChevronDown,
  Heart,
  Repeat2,
  MessageCircle,
  BadgeCheck,
  CheckCircle2,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { LiveToast } from "@/components/LiveToast";
import { LangPill } from "@/components/LangPill";
import { Countdown } from "@/components/Countdown";
import { SupportWidget } from "@/components/SupportWidget";
import {
  BADGE_STYLES,
  CARS,
  COMMENTS,
  HOW_STEPS,
  LIVE_DELIVERIES,
  SOCIALS,
  TESTIMONIALS,
  THEME_STYLES,
  TRUST_ITEMS,
} from "@/lib/site-data";
import ceo from "@/assets/ceo.jpg";
import model3 from "@/assets/model3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Win a Brand New Tesla Electric Car — Global Giveaway" },
      {
        name: "description",
        content:
          "Tesla is giving away brand new 2025 electric cars worldwide. Choose your Model 3, Model Y, Model S, Model X or Cybertruck and just cover the one-time delivery fee.",
      },
      { property: "og:title", content: "Win a Brand New Tesla Electric Car — Global Giveaway" },
      {
        property: "og:description",
        content:
          "Claim a brand new 2025 Tesla. 10,000+ cars already delivered worldwide — only the one-time delivery fee applies.",
      },
    ],
  }),
  component: Home,
});

/* ---------- helpers ---------- */

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0]!;
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={seen ? "animate-rise" : "opacity-0"}
    >
      {children}
    </div>
  );
}

function SectionTitle({ pre, hi, post, sub }: { pre?: string; hi: string; post?: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-xl px-5 text-center">
      <h2 className="text-4xl font-black leading-[1.08] text-ink sm:text-5xl">
        {pre} <span className="text-brand">{hi}</span> {post}
      </h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-ink-soft">{sub}</p>}
    </div>
  );
}

/* ---------- page ---------- */

function Home() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <TrustBar />
      <SiteHeader />
      <LiveToast />
      <LangPill />
      <SupportWidget />

      <Hero />
      <CarPicker />
      <Announcement />
      <CeoSection />
      <Testimonials />
      <SocialSection />
      <HowToClaim />
      <ModelCatalog />
      <FutureBanner />
      <LiveDeliveries />
      <SiteFooter />
    </div>
  );
}

function TrustBar() {
  return (
    <div className="bg-shell px-4 py-3 text-shell-fg">
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-x-6 gap-y-3 text-sm font-semibold sm:grid-cols-4">
        {TRUST_ITEMS.map((t) => (
          <div key={t.label} className="flex items-center gap-2">
            <span className="text-base leading-none">{t.icon}</span>
            <span className="whitespace-nowrap">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const [joined, setJoined] = useState(12848);
  useEffect(() => {
    const t = setInterval(() => setJoined((n) => n + Math.floor(Math.random() * 3) + 1), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="giveaway" className="hero-gradient px-5 pt-16 pb-14">
      <div className="mx-auto max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-success-soft px-4 py-2 text-sm font-bold text-success">
          <span className="h-2.5 w-2.5 animate-pulse-dot rounded-full bg-success" />
          LIVE — {joined.toLocaleString()} joined
        </div>
        <h1 className="mt-8 text-5xl leading-[1.02] font-black text-ink sm:text-6xl">
          Win a <span className="text-brand">Brand New</span> Tesla Electric Car
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          Tesla, the world's leading electric vehicle manufacturer, is giving away brand new electric
          cars to participants worldwide. Claim your car today!
        </p>
        <div className="mt-8 space-y-3">
          <Link
            to="/claim"
            search={{ car: "" }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-4 text-lg font-bold text-primary-foreground shadow-card transition-transform hover:bg-brand-strong active:scale-[0.98]"
          >
            🚗 Claim Your Free Car →
          </Link>
          <a
            href="#participate"
            className="flex w-full items-center justify-center rounded-xl border border-border bg-card px-6 py-4 text-lg font-bold text-ink transition-colors hover:bg-secondary"
          >
            View All Models
          </a>
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-ink-soft">
          <span>🔒 SSL Secured</span>
          <span>✅ Verified</span>
          <span>🌍 Global</span>
        </div>
      </div>
    </section>
  );
}

const PICKER = [
  { id: "model-3", tint: "bg-brand-soft", tag: "Most Popular" },
  { id: "model-y", tint: "bg-sky-50", tag: "Best SUV" },
  { id: "model-s", tint: "bg-slate-50", tag: "Premium" },
  { id: "model-x", tint: "bg-emerald-50", tag: "Eco Pick" },
];

function CarPicker() {
  return (
    <section id="info" className="px-5 py-16">
      <Reveal>
        <SectionTitle
          pre="Available"
          hi="Tesla"
          post="Cars"
          sub="Choose your preferred Tesla electric car. All models are brand new 2024–2025 editions delivered straight to your door."
        />
      </Reveal>
      <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
        {PICKER.map((p, idx) => {
          const car = CARS.find((c) => c.id === p.id)!;
          return (
            <Reveal key={p.id} delay={idx * 70}>
              <div
                className={`relative overflow-hidden rounded-3xl ${p.tint} p-6 text-center shadow-soft transition-transform duration-300 hover:-translate-y-1`}
              >
                <span className="absolute top-4 right-4 rounded-full bg-brand px-3 py-1 text-xs font-bold text-primary-foreground">
                  {p.tag}
                </span>
                <img
                  src={car.image}
                  alt={car.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="mx-auto h-44 w-full rounded-2xl bg-card object-contain p-3"
                />
                <h3 className="mt-5 text-2xl font-black text-ink">{car.name} 2025</h3>
                <p className="mt-1 font-semibold text-brand">{car.category}</p>
                <p className="mt-1 text-sm text-ink-soft">
                  {car.range.replace(" Range", "mi range").replace("mi mi", "mi")} ·{" "}
                  {car.power.split(" ")[0]}hp
                </p>
                <div className="mt-4 rounded-xl bg-card py-3 font-bold text-success">FREE 🎉</div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Announcement() {
  return (
    <section className="bg-shell px-5 py-16 text-shell-fg">
      <Reveal>
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-xs font-bold tracking-widest uppercase text-primary-foreground">
            <span className="h-2 w-2 animate-pulse-dot rounded-full bg-primary-foreground" />
            Official Announcement
          </span>
          <h2 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">
            Tesla's <span className="text-brand">Global Car</span> Giveaway
          </h2>
          <p className="mt-4 leading-relaxed text-shell-muted">
            Watch Tesla's official announcement of their biggest car giveaway for all countries
            worldwide.
          </p>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="mx-auto mt-10 max-w-xl overflow-hidden rounded-3xl bg-black ring-1 ring-shell-line">
          <div className="relative">
            <img
              src={model3}
              alt="Tesla giveaway announcement video still"
              loading="lazy"
              width={1024}
              height={1024}
              className="aspect-video w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-brand/90 text-2xl text-primary-foreground shadow-toast">
                ▶
              </span>
            </div>
            <p className="absolute right-4 bottom-3 max-w-[45%] text-right text-[11px] leading-snug text-white/70">
              covers, which hint at the Tesla Cybertruck.
            </p>
          </div>

          <div className="bg-shell-raised px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-card text-lg font-black text-brand">
                  T
                </span>
                <div>
                  <div className="flex items-center gap-1 text-sm font-bold">
                    Tesla Official <BadgeCheck className="h-4 w-4 text-info" />
                  </div>
                  <div className="text-xs text-shell-muted">28.4M subscribers</div>
                </div>
              </div>
              <button className="rounded-full bg-brand px-5 py-2 text-sm font-bold text-primary-foreground transition-colors hover:bg-brand-strong">
                Subscribe
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-shell-muted">
              <span className="flex items-center gap-1.5">
                <ThumbsUp className="h-4 w-4" /> 1.2M
              </span>
              <ThumbsDown className="h-4 w-4" />
              <span className="flex items-center gap-1.5">
                <Share2 className="h-4 w-4" /> Share
              </span>
              <span className="flex items-center gap-1.5">
                <Download className="h-4 w-4" /> Download
              </span>
            </div>
          </div>

          <CommentsList />
        </div>
      </Reveal>
    </section>
  );
}

function CommentsList() {
  const [expanded, setExpanded] = useState(false);
  const list = expanded ? COMMENTS : COMMENTS.slice(0, 5);
  return (
    <div className="border-t border-shell-line bg-shell-raised px-4 py-5">
      <div className="text-sm font-bold">Comments · 70,842</div>
      <div className="mt-4 space-y-5">
        {list.map((c) => (
          <div key={c.name} className="flex gap-3">
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${c.tone} text-xs font-bold text-white`}
            >
              {c.initials}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 text-xs">
                <span className="font-bold">{c.name}</span>
                <span>{c.flag}</span>
                <span className="text-shell-muted">{c.ago}</span>
                {"pinned" in c && c.pinned && (
                  <span className="text-shell-muted">📌 Pinned</span>
                )}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-shell-fg/90">{c.text}</p>
              <div className="mt-1.5 flex items-center gap-4 text-xs text-shell-muted">
                <span className="flex items-center gap-1">
                  <ThumbsUp className="h-3.5 w-3.5" /> {c.likes}
                </span>
                <ThumbsDown className="h-3.5 w-3.5" />
                <span>Reply</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-5 flex items-center gap-1 text-sm font-semibold text-brand"
      >
        <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
        {expanded ? "Show fewer comments" : "View 70,842 more comments"}
      </button>
    </div>
  );
}

function CeoSection() {
  return (
    <section className="px-5 py-16">
      <Reveal>
        <SectionTitle
          pre="Straight from the"
          hi="CEO"
          sub="Official announcements from Tesla's leadership"
        />
      </Reveal>
      <div className="mx-auto mt-10 max-w-xl space-y-5">
        <Reveal>
          <article className="rounded-3xl border border-border bg-card p-5 shadow-soft">
            <header className="flex items-center gap-3">
              <img
                src={ceo}
                alt="Elon Musk"
                loading="lazy"
                width={512}
                height={512}
                className="h-11 w-11 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-1 font-bold text-ink">
                  Elon Musk <BadgeCheck className="h-4 w-4 text-info" />
                </div>
                <div className="text-sm text-ink-soft">CEO, Tesla, Inc.</div>
              </div>
            </header>
            <p className="mt-4 leading-relaxed text-ink">
              Tesla is committed to accelerating the world's transition to sustainable energy. As part
              of our mission, we're launching a worldwide giveaway of our electric vehicles —
              completely free. Just cover the delivery cost and a brand-new Tesla will be shipped
              directly to your door. 🚗⚡
            </p>
            <footer className="mt-4 flex gap-5 text-sm text-ink-soft">
              <span className="flex items-center gap-1.5">
                <Heart className="h-4 w-4 text-brand" /> 128K
              </span>
              <span className="flex items-center gap-1.5">
                <Repeat2 className="h-4 w-4" /> 47K
              </span>
              <span className="flex items-center gap-1.5">
                <MessageCircle className="h-4 w-4" /> 8.2K
              </span>
            </footer>
          </article>
        </Reveal>
        <Reveal delay={90}>
          <article className="rounded-3xl border border-border bg-card p-5 shadow-soft">
            <header className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-soft text-lg font-black text-brand">
                T
              </span>
              <div>
                <div className="flex items-center gap-1 font-bold text-ink">
                  Tesla Official <BadgeCheck className="h-4 w-4 text-info" />
                </div>
                <div className="text-sm text-ink-soft">@Tesla · Official Account</div>
              </div>
            </header>
            <p className="mt-4 leading-relaxed text-ink">
              🏁 OFFICIAL ANNOUNCEMENT: Our global Tesla car giveaway is NOW LIVE! 🌍 Open to ALL
              countries. No purchase necessary — just cover the one-time delivery fee. Model 3, Model
              Y, Model S, Model X and more available. Don't miss out! 🎁🚗
            </p>
            <footer className="mt-4 flex gap-5 text-sm text-ink-soft">
              <span className="flex items-center gap-1.5">
                <Heart className="h-4 w-4 text-brand" /> 215K
              </span>
              <span className="flex items-center gap-1.5">
                <Repeat2 className="h-4 w-4" /> 89K
              </span>
              <span className="flex items-center gap-1.5">
                <MessageCircle className="h-4 w-4" /> 14K
              </span>
            </footer>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[i]!;
  return (
    <section className="bg-secondary/60 px-5 py-16">
      <Reveal>
        <SectionTitle pre="What" hi="Winners" post="Are Saying" sub="Real testimonials from verified Tesla car recipients" />
      </Reveal>
      <div className="mx-auto mt-10 max-w-xl">
        <article
          key={i}
          className="animate-rise rounded-3xl border border-border bg-card p-6 shadow-card"
        >
          <header className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-soft font-black text-brand">
              {t.initial}
            </span>
            <div>
              <div className="font-bold text-ink">{t.name}</div>
              <div className="text-sm text-ink-soft">
                {t.flag} {t.country}
              </div>
            </div>
          </header>
          <p className="mt-4 text-lg leading-relaxed text-ink">“{t.quote}”</p>
          <div className="mt-5 rounded-xl bg-success-soft px-4 py-3 text-sm font-semibold text-success">
            ✅ Received: {t.received}
          </div>
        </article>
        <div className="mt-6 flex justify-center gap-2">
          {TESTIMONIALS.map((_, n) => (
            <button
              key={n}
              aria-label={`Testimonial ${n + 1}`}
              onClick={() => setI(n)}
              className={`h-2.5 rounded-full transition-all ${
                n === i ? "w-6 bg-brand" : "w-2.5 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialSection() {
  return (
    <section className="px-5 py-16">
      <Reveal>
        <SectionTitle pre="Follow" hi="Tesla" post="Official" sub="Verified official social media accounts of Tesla worldwide." />
      </Reveal>
      <div className="mx-auto mt-10 max-w-xl space-y-4">
        {SOCIALS.map((s, idx) => (
          <Reveal key={s.handle} delay={idx * 70}>
            <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft transition-transform hover:-translate-y-0.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-soft text-lg font-black text-brand">
                T
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 font-bold text-ink">
                  {s.name} <BadgeCheck className="h-4 w-4 text-info" />
                </div>
                <div className="text-sm text-ink-soft">{s.handle}</div>
                <p className="mt-2 text-sm text-ink-soft">{s.label}</p>
                <p className="mt-2 text-xs text-ink-soft">{s.followers}</p>
              </div>
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-lg font-bold ${s.accent}`}>
                {s.icon}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function HowToClaim() {
  return (
    <section id="instruction" className="bg-secondary/60 px-5 py-16">
      <Reveal>
        <SectionTitle
          pre="How to Claim Your"
          hi="Tesla Car"
          sub="Follow these simple steps to receive your brand new Tesla electric car giveaway"
        />
      </Reveal>
      <div className="mx-auto mt-10 max-w-xl space-y-4">
        {HOW_STEPS.map((s, idx) => (
          <Reveal key={s.n} delay={idx * 80}>
            <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand text-lg font-black text-primary-foreground">
                {s.n}
              </span>
              <h3 className="mt-4 text-xl font-black text-ink">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={200}>
        <div className="mx-auto mt-8 max-w-xl">
          <Link
            to="/claim"
            search={{ car: "" }}
            className="flex items-center justify-center gap-2 rounded-2xl bg-brand px-6 py-5 text-center text-lg font-bold text-primary-foreground shadow-card transition-transform hover:bg-brand-strong active:scale-[0.98]"
          >
            🚗 Start Claiming Your Tesla Now →
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

function ModelCatalog() {
  return (
    <section id="participate" className="px-5 py-16">
      <Reveal>
        <div className="text-center">
          <span className="inline-flex rounded-full bg-brand-soft px-4 py-2 text-xs font-bold tracking-widest uppercase text-brand">
            ⭐ Official Tesla Global Giveaway
          </span>
        </div>
      </Reveal>
      <Reveal delay={60}>
        <div className="mt-6">
          <SectionTitle pre="Choose Your" hi="Tesla Electric Car" sub="Tesla is gifting brand new electric vehicles to participants worldwide." />
        </div>
      </Reveal>
      <Reveal delay={120}>
        <div className="mt-8">
          <Countdown />
        </div>
      </Reveal>

      <div className="mx-auto mt-10 grid max-w-5xl gap-8 lg:grid-cols-2">
        {CARS.map((car, idx) => (
          <Reveal key={car.id} delay={(idx % 2) * 80}>
            <article className="overflow-hidden rounded-3xl bg-card shadow-card transition-transform duration-300 hover:-translate-y-1">
              <div className={`${THEME_STYLES[car.theme]} relative px-6 pt-6 pb-8 text-white`}>
                <span
                  className={`absolute top-5 right-5 rounded-full px-3 py-1.5 text-xs font-bold ${BADGE_STYLES[car.badgeTone]}`}
                >
                  {car.badge}
                </span>
                <p className="text-xs font-bold tracking-[0.18em] uppercase text-white/60">
                  {car.kicker}
                </p>
                <h3 className="mt-2 text-3xl font-black">{car.name}</h3>
                <p className="mt-1 text-white/60">{car.year}</p>
                <img
                  src={car.image}
                  alt={car.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="mx-auto mt-6 h-52 w-full max-w-xs rounded-xl bg-white object-contain p-2"
                />
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-3">
                  <Spec icon={<Zap className="h-4 w-4 text-brand" />} label="Power" value={car.power} />
                  <Spec icon={<Star className="h-4 w-4 text-brand" />} label="Range" value={car.range} />
                  <Spec icon={<Globe className="h-4 w-4 text-brand" />} label="Ships To" value="All Countries" />
                  <Spec icon={<Clock className="h-4 w-4 text-brand" />} label="Delivery" value={car.delivery} />
                </div>
                <div className="mt-4 rounded-2xl bg-brand-soft py-5 text-center">
                  <p className="text-sm text-ink-soft">One-Time Delivery Fee</p>
                  <p className="mt-1 text-4xl font-black text-brand">${car.fee}</p>
                  <p className="mt-1 text-xs text-ink-soft">Covers shipping, customs &amp; logistics</p>
                </div>
                <Link
                  to="/claim"
                  search={{ car: car.id }}
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-4 font-bold text-primary-foreground transition-transform hover:bg-brand-strong active:scale-[0.98]"
                >
                  🚗 Claim This Tesla Now →
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2 rounded-xl bg-secondary px-3 py-3">
      <span className="mt-0.5">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-ink-soft">{label}</p>
        <p className="text-sm font-bold text-ink">{value}</p>
      </div>
    </div>
  );
}

function FutureBanner() {
  return (
    <section className="px-5 py-10">
      <Reveal>
        <div className="mx-auto max-w-xl rounded-3xl bg-brand px-6 py-8 text-center text-primary-foreground shadow-card">
          <h3 className="text-2xl font-black leading-snug">⚡ Tesla Electric — Built for the Future</h3>
          <p className="mt-3 leading-relaxed text-primary-foreground/90">
            Tesla is the world's <strong>leading electric vehicle manufacturer</strong>. Each
            participant is eligible for <strong>one vehicle only</strong>.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function LiveDeliveries() {
  const [rows, setRows] = useState(LIVE_DELIVERIES);
  useEffect(() => {
    const t = setInterval(() => setRows((r) => [...r.slice(1), r[0]!]), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="transactions" className="px-5 py-16">
      <Reveal>
        <SectionTitle
          pre="Live"
          hi="Deliveries"
          sub="Real-time updates of Tesla car deliveries happening right now across the world."
        />
      </Reveal>
      <Reveal delay={80}>
        <div className="mx-auto mt-10 max-w-xl overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          <div className="flex items-center justify-between bg-shell px-5 py-4 text-shell-fg">
            <span className="font-bold">Live Delivery Feed</span>
            <span className="flex items-center gap-2 text-sm font-bold">
              <span className="h-2.5 w-2.5 animate-pulse-dot rounded-full bg-success" />
              LIVE
            </span>
          </div>
          <ul className="divide-y divide-border">
            {rows.map((r, idx) => (
              <li key={`${r.name}-${idx}`} className="flex items-start gap-3 px-5 py-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 text-sm">
                    <span className="font-bold text-ink">{r.name}</span>
                    <span>{r.flag}</span>
                    <span className="text-ink-soft">{r.country}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-ink-soft">{r.car}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand">${r.fee}</p>
                  <p className="text-xs text-ink-soft">{r.ago}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-shell px-5 py-14 text-center text-shell-fg">
      <div className="mx-auto max-w-xl">
        <div className="text-3xl font-black">
          <span className="text-brand">Tesla</span> Motors
        </div>
        <nav className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-shell-muted">
          {["Giveaway", "Info", "Instruction", "Participate", "Transactions"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-shell-fg">
              {l}
            </a>
          ))}
        </nav>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-semibold">
          {["🔒 SSL Secured", "🚗 Tesla Certified", "⚡ Electric Vehicle", "✅ 10,000+ Delivered", "🌍 Official Event"].map(
            (b) => (
              <span key={b} className="rounded-full bg-shell-raised px-4 py-2 ring-1 ring-shell-line">
                {b}
              </span>
            ),
          )}
        </div>
        <p className="mt-8 text-sm leading-relaxed text-shell-muted">
          This is an official Tesla Motors global car giveaway event. Tesla is the world's leading
          electric vehicle manufacturer gifting brand new electric vehicles to participants worldwide.
        </p>
        <p className="mt-6 text-xs text-shell-muted">
          © 2026 Tesla Motors Official Giveaway. All rights reserved.
        </p>
        <Link to="/admin" className="mt-4 inline-block text-xs text-shell-muted/70 hover:text-shell-fg">
          Admin
        </Link>
      </div>
    </footer>
  );
}
