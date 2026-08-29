import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Upload, CheckCircle2 } from "lucide-react";
import { store, type Submission } from "@/lib/admin-store";

type Search = { id?: string };

export const Route = createFileRoute("/pay")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    id: typeof s.id === "string" ? s.id : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Confirm Your Tesla Delivery Payment" },
      {
        name: "description",
        content:
          "Upload your payment proof and confirm your one-time Tesla delivery fee to release your vehicle for dispatch.",
      },
      { property: "og:title", content: "Confirm Your Tesla Delivery Payment" },
      {
        property: "og:description",
        content: "Final step — confirm your delivery fee payment and your Tesla ships to your door.",
      },
    ],
  }),
  component: PayPage,
});

function PayPage() {
  const { id } = Route.useSearch();
  const [sub, setSub] = useState<Submission | null>(null);
  const [proof, setProof] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setSub(store.listSubmissions().find((s) => s.id === id) ?? null);
  }, [id]);

  if (!sub) {
    return (
      <div className="grid min-h-screen place-items-center bg-shell px-6 text-center text-shell-fg">
        <div>
          <h1 className="text-2xl font-black">No claim found</h1>
          <p className="mt-2 text-shell-muted">Start a new claim to continue.</p>
          <Link
            to="/claim"
            className="mt-6 inline-block rounded-xl bg-brand px-5 py-3 font-bold text-primary-foreground"
          >
            Start a claim
          </Link>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="grid min-h-screen place-items-center bg-shell px-6 text-center text-shell-fg">
        <div className="max-w-sm animate-rise">
          <CheckCircle2 className="mx-auto h-16 w-16 text-success" />
          <h1 className="mt-6 text-3xl font-black">Order confirmed 🎉</h1>
          <p className="mt-3 text-shell-muted">
            Your {sub.car} is queued for dispatch. Tesla logistics will email {sub.email} with your
            tracking number within 24 hours.
          </p>
          <Link
            to="/"
            className="mt-8 inline-block rounded-xl bg-brand px-6 py-3.5 font-bold text-primary-foreground"
          >
            Back to giveaway
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-shell pb-16 text-shell-fg">
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-white/10 bg-shell/95 px-4 py-4 backdrop-blur">
        <Link to="/claim" aria-label="Back" className="rounded-md p-1 hover:bg-white/10">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-card text-sm font-black text-brand">
          T
        </span>
        <h1 className="text-lg font-bold">Pay ${sub.fee.toFixed(2)}</h1>
      </header>

      <main className="mx-auto max-w-xl space-y-5 px-4 py-6">
        <p className="rounded-2xl bg-success/15 px-4 py-3 text-sm font-semibold text-success">
          ✅ Delivering: {sub.car} to {sub.city}, {sub.country}
        </p>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="font-bold">Deliver to</h2>
          <p className="mt-2 font-semibold">{sub.fullName}</p>
          <p className="text-sm text-shell-muted">
            {sub.address} {sub.postal && `· ${sub.postal}`}
          </p>
          <p className="text-sm text-shell-muted">
            {sub.city}, {sub.country}
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="font-bold">Select Payment Method</h2>
          <p className="mt-2 text-sm text-shell-muted">
            No payment method is available yet. Please check back shortly.
          </p>
        </section>

        <section className="rounded-2xl border border-dashed border-warning/60 bg-warning/[0.06] p-5">
          <h2 className="flex items-center gap-2 font-bold text-warning">
            <Upload className="h-4 w-4" /> Upload Payment Proof
          </h2>
          <label className="mt-4 grid cursor-pointer place-items-center gap-2 rounded-2xl border border-dashed border-warning/60 py-10 text-center text-sm text-shell-muted transition-colors hover:bg-warning/10">
            <Upload className="h-6 w-6 text-warning" />
            {proof ? <span className="font-semibold text-shell-fg">{proof}</span> : "Tap to upload proof"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setProof(e.target.files?.[0]?.name ?? null)}
            />
          </label>
        </section>

        <button
          onClick={() => {
            store.updateSubmission(sub.id, { paid: true });
            setDone(true);
          }}
          className="w-full rounded-2xl bg-brand py-4 text-lg font-bold text-primary-foreground transition-transform hover:bg-brand-strong active:scale-[0.98]"
        >
          I've Paid — Confirm My Order ✓
        </button>
      </main>
    </div>
  );
}
