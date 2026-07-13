import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Check, ChevronLeft, ChevronRight, CheckCircle2, MessageCircle, Car } from "lucide-react";
import { DESTINATIONS } from "@/data/destinations";
import { SITE } from "@/data/site";
import { supabase } from "@/integrations/supabase/client";
import { vehiclesQueryOptions } from "@/lib/queries";
import { toast } from "sonner";

export const Route = createFileRoute("/plan-my-trip")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(vehiclesQueryOptions());
  },
  head: () => ({
    meta: [
      { title: "Plan My Japan Trip — Free Custom Itinerary | Nippon Tours" },
      { name: "description", content: "Build your dream Japan trip in 4 easy steps — destinations, style, optional car rental, contact. Free personalised itinerary within 48 hours." },
      { property: "og:title", content: "Plan My Japan Trip — Free Custom Itinerary" },
      { property: "og:description", content: "4 steps. 2 minutes. A free personalised Japan itinerary within 48 hours." },
      { property: "og:url", content: "/plan-my-trip" },
    ],
    links: [{ rel: "canonical", href: "/plan-my-trip" }],
  }),
  component: PlannerPage,
});

const STYLES = ["Private guided", "Small group", "Luxury", "Self-guided with support"];
const INTERESTS = ["Food & drink", "Temples & culture", "Nature & onsen", "Cities & nightlife", "Anime & pop culture", "Cherry blossoms / foliage"];
const BUDGETS = ["Under ¥300,000 pp", "¥300,000–600,000 pp", "¥600,000–1,000,000 pp", "¥1,000,000+ pp"];
const SERVICE_TYPES = ["Self drive", "Chauffeur service", "Airport pickup", "Airport drop"];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please tell us your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(255),
});

const carSchema = z.object({
  pickup_location: z.string().trim().min(1, "Pickup location required").max(200),
  dropoff_location: z.string().trim().min(1, "Drop-off location required").max(200),
  pickup_date: z.string().min(1, "Pickup date required"),
  return_date: z.string().min(1, "Return date required"),
});

function PlannerPage() {
  useSuspenseQuery(vehiclesQueryOptions());
  const [step, setStep] = useState(1);
  const [dests, setDests] = useState<string[]>([]);
  const [style, setStyle] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [needsCar, setNeedsCar] = useState(false);
  const [car, setCar] = useState({
    service_type: "",
    pickup_location: "",
    dropoff_location: "",
    pickup_date: "",
    pickup_time: "",
    return_date: "",
    return_time: "",
    passengers: 2,
    luggage: 2,
    special_requirements: "",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2.5 text-sm font-semibold transition-all ${
      active
        ? "border-accent bg-accent text-accent-foreground shadow-md"
        : "border-border bg-card text-foreground hover:border-accent/60"
    }`;

  const submit = useMutation({
    mutationFn: async () => {
      const c = contactSchema.safeParse({ name, email });
      if (!c.success) throw new Error(c.error.issues[0].message);

      if (needsCar) {
        const cr = carSchema.safeParse(car);
        if (!cr.success) throw new Error(cr.error.issues[0].message);
      }

      const { data: sessionData } = await supabase.auth.getSession();
      const currentUserId = sessionData.session?.user.id ?? null;

      const { data: trip, error: tripErr } = await supabase
        .from("trip_requests")
        .insert({
          full_name: name,
          email,
          phone: phone || null,
          country: country || null,
          destinations: dests,
          interests: [...interests, ...(style ? [style] : [])],
          budget: budget || null,
          message: notes || null,
          needs_car_rental: needsCar,
          source: "plan-my-trip",
          user_id: currentUserId,
        })
        .select("id")
        .single();
      if (tripErr) throw tripErr;

      if (needsCar) {
        const { error: carErr } = await supabase.from("car_rental_requests").insert({
          trip_request_id: trip.id,
          full_name: name,
          email,
          phone: phone || null,
          pickup_location: car.pickup_location,
          dropoff_location: car.dropoff_location,
          pickup_date: car.pickup_date,
          pickup_time: car.pickup_time || null,
          return_date: car.return_date,
          return_time: car.return_time || null,
          passengers: Number(car.passengers) || 1,
          luggage: Number(car.luggage) || 0,
          service_type: car.service_type || null,

          special_requirements: car.special_requirements || null,
        });
        if (carErr) throw carErr;
      }
    },
    onSuccess: () => setDone(true),
    onError: (e: Error) => {
      toast.error(e.message);
      const errs: Record<string, string> = {};
      const key = e.message.toLowerCase().includes("email") ? "email" : "name";
      errs[key] = e.message;
      setErrors(errs);
    },
  });

  if (done) {
    return (
      <div className="mx-auto flex min-h-[80vh] max-w-xl flex-col items-center justify-center px-6 py-32 text-center">
        <CheckCircle2 className="h-16 w-16 text-accent" aria-hidden="true" />
        <h1 className="mt-6 font-display text-3xl font-semibold">Your trip request is in!</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Thank you, {name.split(" ")[0]}. A travel designer is already looking at your answers —
          expect a personalised draft itinerary within 48 hours (usually much sooner).
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-accent">
            <MessageCircle className="h-4 w-4" /> Chat now on WhatsApp
          </a>
          <Link to="/travel-guides" className="btn-outline">Read our travel guides</Link>
        </div>
      </div>
    );
  }

  const stepLabel = ["Where", "How", "Car rental (optional)", "You"][step - 1];

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <p className="section-label text-center">Free — no obligation</p>
      <h1 className="mt-3 text-center font-display text-3xl font-semibold sm:text-4xl">Plan my trip</h1>
      <p className="mx-auto mt-3 max-w-md text-center text-muted-foreground">
        Four quick steps. A real travel designer replies with a personalised itinerary within 48 hours.
      </p>

      <div className="mx-auto mt-10 flex max-w-lg items-center gap-2" aria-label={`Step ${step} of 4`}>
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${
                s < step ? "bg-accent text-accent-foreground" : s === step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}
            >
              {s < step ? <Check className="h-4 w-4" /> : s}
            </span>
            {s < 4 && <span className={`h-1 flex-1 rounded-full ${s < step ? "bg-accent" : "bg-secondary"}`} />}
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Step {step} · {stepLabel}
      </p>

      <div className="mt-10 rounded-3xl bg-card p-7 shadow-lg sm:p-10">
        {step === 1 && (
          <fieldset>
            <legend className="font-display text-xl font-semibold">Where is Japan calling you?</legend>
            <p className="mt-1 text-sm text-muted-foreground">Pick as many as you like — or leave it to us.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {DESTINATIONS.map((d) => (
                <button
                  key={d.slug}
                  type="button"
                  onClick={() => toggle(dests, setDests, d.name)}
                  className={`img-zoom relative overflow-hidden rounded-2xl text-left ${dests.includes(d.name) ? "ring-2 ring-accent" : ""}`}
                  aria-pressed={dests.includes(d.name)}
                >
                  <img src={d.image} alt="" width={512} height={256} loading="lazy" className="h-28 w-full object-cover" />
                  <span className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden="true" />
                  <span className="absolute bottom-3 left-4 font-display text-lg font-semibold text-white">{d.name}</span>
                  {dests.includes(d.name) && (
                    <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-accent text-accent-foreground">
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <fieldset>
              <legend className="font-display text-xl font-semibold">What&apos;s your travel style?</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {STYLES.map((s) => (
                  <button key={s} type="button" className={chip(style === s)} onClick={() => setStyle(s)} aria-pressed={style === s}>
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="font-display text-xl font-semibold">What lights you up?</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {INTERESTS.map((s) => (
                  <button key={s} type="button" className={chip(interests.includes(s))} onClick={() => toggle(interests, setInterests, s)} aria-pressed={interests.includes(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="font-display text-xl font-semibold">Rough budget per person?</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {BUDGETS.map((s) => (
                  <button key={s} type="button" className={chip(budget === s)} onClick={() => setBudget(s)} aria-pressed={budget === s}>
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="inline-flex items-center gap-3 rounded-2xl border border-border bg-secondary/40 p-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needsCar}
                  onChange={(e) => setNeedsCar(e.target.checked)}
                  className="h-5 w-5 rounded border-input text-accent focus:ring-accent"
                />
                <span className="flex items-center gap-2 font-display text-lg font-semibold">
                  <Car className="h-5 w-5 text-accent" /> Add car rental / driver service
                </span>
              </label>
              <p className="mt-2 text-xs text-muted-foreground">
                Optional — skip if you&apos;re happy with trains. We work with vetted rental partners across Japan.
              </p>
            </div>

            {needsCar && (
              <div className="space-y-5 rounded-2xl bg-secondary/40 p-5">
                <div>

                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Service type</label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_TYPES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={chip(car.service_type === s)}
                        onClick={() => setCar({ ...car, service_type: s })}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField label="Pickup location" value={car.pickup_location} onChange={(v) => setCar({ ...car, pickup_location: v })} placeholder="e.g. Narita Airport" />
                  <TextField label="Drop-off location" value={car.dropoff_location} onChange={(v) => setCar({ ...car, dropoff_location: v })} placeholder="e.g. Kyoto Station" />
                  <TextField label="Pickup date" type="date" value={car.pickup_date} onChange={(v) => setCar({ ...car, pickup_date: v })} />
                  <TextField label="Pickup time" type="time" value={car.pickup_time} onChange={(v) => setCar({ ...car, pickup_time: v })} />
                  <TextField label="Return date" type="date" value={car.return_date} onChange={(v) => setCar({ ...car, return_date: v })} />
                  <TextField label="Return time" type="time" value={car.return_time} onChange={(v) => setCar({ ...car, return_time: v })} />
                  <TextField label="Passengers" type="number" value={String(car.passengers)} onChange={(v) => setCar({ ...car, passengers: Number(v) || 1 })} />
                  <TextField label="Luggage bags" type="number" value={String(car.luggage)} onChange={(v) => setCar({ ...car, luggage: Number(v) || 0 })} />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Special requirements</label>
                  <textarea
                    rows={3}
                    maxLength={1000}
                    value={car.special_requirements}
                    onChange={(e) => setCar({ ...car, special_requirements: e.target.value })}
                    placeholder="Child seats, English GPS, ETC card, snow tyres…"
                    className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-semibold">Where should we send your itinerary?</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField label="Your name" value={name} onChange={setName} required />
              <TextField label="Country" value={country} onChange={setCountry} />
              <TextField label="Email address" type="email" value={email} onChange={setEmail} required />
              <TextField label="Phone / WhatsApp" value={phone} onChange={setPhone} placeholder="+1…" />
            </div>
            {(errors.name || errors.email) && (
              <p className="text-xs font-semibold text-destructive">{errors.name || errors.email}</p>
            )}
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Anything else?</label>
              <textarea
                rows={3}
                maxLength={1500}
                className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30"
                placeholder="Dates, group size, occasions, dietary needs — anything helpful (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div className="rounded-2xl bg-secondary p-4 text-xs text-muted-foreground">
              <p className="font-bold text-foreground">Your picks</p>
              <p className="mt-1">
                {dests.length ? dests.join(", ") : "Destinations: designer's choice"} · {style || "Style: open"} ·{" "}
                {interests.length ? interests.join(", ") : "Interests: surprise us"} · {budget || "Budget: flexible"}
                {needsCar && ` · + Car rental`}
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          {step > 1 ? (
            <button type="button" className="btn-outline" onClick={() => setStep(step - 1)}>
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
          ) : (
            <span />
          )}
          {step < 4 ? (
            <button type="button" className="btn-accent" onClick={() => setStep(step + 1)}>
              Continue <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              className="btn-accent"
              disabled={submit.isPending}
              onClick={() => submit.mutate()}
            >
              {submit.isPending ? "Sending…" : "Get my free itinerary"} <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        No spam, no obligation, no payment details. Prefer to talk?{" "}
        <a className="font-bold text-accent underline" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
          WhatsApp us
        </a>{" "}
        or <Link to="/contact" className="font-bold text-accent underline">book a call</Link>.
      </p>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30"
      />
    </div>
  );
}
