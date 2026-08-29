import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import teslaLogo from "@/assets/tesla-logo.png.asset.json";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-4">
          <Link to="/" className="flex items-center gap-3">
            <TeslaMark />
            <div className="text-2xl leading-none font-black tracking-tight sm:text-3xl">
              <span className="text-brand">Tesla</span>{" "}
              <span className="text-ink">Motors</span>
            </div>
          </Link>
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="rounded-md p-2 text-ink hover:bg-secondary"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background animate-rise">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-3">
              <TeslaMark />
              <div className="text-2xl font-black">
                <span className="text-brand">Tesla</span> <span className="text-ink">Motors</span>
              </div>
            </div>
            <button aria-label="Close" onClick={() => setOpen(false)} className="rounded-md p-2 hover:bg-secondary">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-5 py-6 text-lg font-semibold">
            {[
              ["Giveaway", "#giveaway"],
              ["Info", "#info"],
              ["Instruction", "#instruction"],
              ["Participate", "#participate"],
              ["Transactions", "#transactions"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-ink hover:bg-secondary"
              >
                {label}
              </a>
            ))}
            <Link
              to="/claim"
              search={{ car: "" }}
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded-xl bg-brand px-4 py-3 font-semibold text-primary-foreground shadow-soft hover:bg-brand-strong"
            >
              Claim Now
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

export function TeslaMark() {
  return (
    <img
      src={teslaLogo.url}
      alt="Tesla logo"
      width={800}
      height={1024}
      className="h-10 w-auto object-contain"
    />
  );
}
