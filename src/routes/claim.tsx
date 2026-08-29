import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, User, MapPin, ChevronsUpDown, Truck, Clock } from "lucide-react";
import { CARS, DELIVERY_OPTIONS } from "@/lib/site-data";
import { store, type Submission } from "@/lib/admin-store";

type Search = { car?: string };

export const Route = createFileRoute("/claim")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    car: typeof s.car === "string" ? s.car : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Claim Your Tesla — Delivery Details" },
      {
        name: "description",
        content:
          "You've been selected. Enter your delivery details, pick your Tesla model and delivery speed, then confirm your one-time delivery fee.",
      },
      { property: "og:title", content: "Claim Your Tesla — Delivery Details" },
      {
        property: "og:description",
        content: "Fill in your delivery details to have your brand new Tesla shipped to your door.",
      },
    ],
  }),
  component: ClaimPage,
});

const field =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-shell-fg placeholder:text-shell-muted/70 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/40";

function ClaimPage() {
  const { car: carParam } = Route.useSearch();
  const navigate = useNavigate();
  const [carId, setCarId] = useState(carParam ?? CARS[0].id);
  const [delivery, setDelivery] = useState(DELIVERY_OPTIONS[0].id);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal: "",
    country: "",
  });
  const [error, setError] = useState("");

  const car = useMemo(() => CARS.find((c) => c.id === carId)!, [carId]);
  const opt = DELIVERY_OPTIONS.find((d) => d.id === delivery)!;
  const total = car.fee + opt.price;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = () => {
    const required: (keyof typeof form)[] = ["fullName", "email", "phone", "address", "city", "country"];
    if (required.some((k) => !form[k].trim())) {
      setError("Please fill in all required fields marked with *");
      return;
    }
    const sub: Submission = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "pending",
      car: car.name,
      fee: total,
      delivery: opt.name,
      paid: false,
      ...form,
    };
    store.addSubmission(sub);
    navigate({ to: "/pay", search: { id: sub.id } });
  };

  return (
    <div className="min-h-screen bg-shell pb-20 text-shell-fg">
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-white/10 bg-shell/95 px-4 py-4 backdrop-blur">
        <Link to="/" aria-label="Back" className="rounded-md p-1 hover:bg-white/10">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-card text-sm font-black text-brand">
          T
        </span>
        <h1 className="text-lg font-bold">Tesla Car Giveaway — Claim Your Car</h1>
      </header>

      <main className="mx-auto max-w-xl space-y-5 px-4 py-6">
        <div className="flex items-center gap-4 rounded-2xl border border-brand/40 bg-brand/10 p-4">
          <img
            src={car.image}
            alt={car.name}
            loading="lazy"
            width={1024}
            height={1024}
            className="h-14 w-16 rounded-lg bg-white object-contain p-1"
          />
          <div>
            <p className="font-bold">🎉 You've been selected!</p>
            <p className="text-sm text-shell-muted">Fill in your delivery details.</p>
          </div>
        </div>

        <Panel icon={<Truck className="h-4 w-4 text-brand" />} title="Choose Your Tesla Car Model">
          <div className="relative">
            <select
              value={carId}
              onChange={(e) => setCarId(e.target.value)}
              className={`${field} appearance-none pr-11`}
            >
              {CARS.map((c) => (
                <option key={c.id} value={c.id} className="bg-shell">
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronsUpDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-shell-muted" />
          </div>
          <div className="mt-3 flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-3 text-sm">
            <span className="text-shell-muted">Delivery fee for this car</span>
            <span className="font-black text-brand">${car.fee}</span>
          </div>
        </Panel>

        <Panel icon={<User className="h-4 w-4 text-brand" />} title="Personal Information">
          <div className="space-y-3">
            <input className={field} placeholder="Full Name *" value={form.fullName} onChange={set("fullName")} />
            <input className={field} placeholder="Email Address *" type="email" value={form.email} onChange={set("email")} />
            <input className={field} placeholder="Phone Number *" value={form.phone} onChange={set("phone")} />
          </div>
        </Panel>

        <Panel icon={<MapPin className="h-4 w-4 text-brand" />} title="Delivery Address">
          <div className="space-y-3">
            <input className={field} placeholder="Street Address *" value={form.address} onChange={set("address")} />
            <div className="grid grid-cols-2 gap-3">
              <input className={field} placeholder="City *" value={form.city} onChange={set("city")} />
              <input className={field} placeholder="ZIP / Postal" value={form.postal} onChange={set("postal")} />
            </div>
            <input className={field} placeholder="Country *" value={form.country} onChange={set("country")} />
          </div>
        </Panel>

        <Panel title="Select Delivery Option">
          <div className="space-y-3">
            {DELIVERY_OPTIONS.map((d) => {
              const active = d.id === delivery;
              return (
                <button
                  key={d.id}
                  onClick={() => setDelivery(d.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                    active ? "border-brand bg-brand/10" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold">{d.name}</span>
                    <span className={`text-sm font-bold ${d.price === 0 ? "text-brand" : "text-shell-fg"}`}>
                      {d.price === 0 ? "Included" : `$${d.price}`}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-shell-muted">{d.blurb}</p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-shell-muted">
                    <Clock className="h-3.5 w-3.5" /> {d.eta}
                  </p>
                </button>
              );
            })}
          </div>
        </Panel>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm">
          <Row label="Car delivery fee" value={`$${car.fee}`} />
          <Row label={`${opt.name} · ${opt.eta}`} value={opt.price === 0 ? "Included" : `$${opt.price}`} />
          <div className="mt-3 flex items-end justify-between border-t border-white/10 pt-3">
            <div>
              <p className="font-bold">Total to pay</p>
              <p className="text-xs text-success">Car Value: FREE</p>
            </div>
            <p className="text-3xl font-black text-brand">${total.toFixed(2)}</p>
          </div>
        </div>

        {error && (
          <p className="rounded-xl bg-brand/15 px-4 py-3 text-sm font-semibold text-brand">{error}</p>
        )}

        <button
          onClick={submit}
          className="w-full rounded-2xl bg-brand py-4 text-lg font-bold text-primary-foreground transition-transform hover:bg-brand-strong active:scale-[0.98]"
        >
          🚗 Pay ${total.toFixed(2)} Now →
        </button>
      </main>
    </div>
  );
}

function Panel({ icon, title, children }: { icon?: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <h2 className="mb-4 flex items-center gap-2 font-bold">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-shell-muted">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
