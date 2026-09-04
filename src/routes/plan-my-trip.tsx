import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Check, ChevronLeft, ChevronRight, CheckCircle2, MessageCircle, Car } from "lucide-react";
import { DESTINATIONS, localizeDestination } from "@/data/destinations";
import { SITE } from "@/data/site";
import { supabase } from "@/integrations/supabase/client";
import { vehiclesQueryOptions } from "@/lib/queries";
import { LocaleLink } from "@/components/site/LocaleLink";
import { seo } from "@/lib/seo";
import type { Locale } from "@/i18n";
import { toast } from "sonner";

const COPY: Record<Locale, {
  freeNoObligation: string;
  heading: string;
  subheading: string;
  stepLabels: string[];
  stepOf: (step: number) => string;
  styles: string[];
  interests: string[];
  budgets: string[];
  serviceTypes: string[];
  step1Legend: string;
  step1Sub: string;
  step2StyleLegend: string;
  step2InterestsLegend: string;
  step2BudgetLegend: string;
  addCarRental: string;
  carRentalNote: string;
  serviceTypeLabel: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  passengers: string;
  luggageBags: string;
  specialRequirements: string;
  specialRequirementsPlaceholder: string;
  step4Heading: string;
  yourName: string;
  country: string;
  emailAddress: string;
  phoneWhatsapp: string;
  anythingElse: string;
  anythingElsePlaceholder: string;
  yourPicks: string;
  destinationsChoice: string;
  styleOpen: string;
  interestsSurprise: string;
  budgetFlexible: string;
  plusCarRental: string;
  back: string;
  continue: string;
  sending: string;
  getMyFreeItinerary: string;
  noSpam: string;
  whatsappUs: string;
  orBookACall: string;
  doneHeading: string;
  doneBody: (firstName: string) => string;
  chatNow: string;
  readGuides: string;
  errName: string;
  errEmail: string;
  errPickup: string;
  errDropoff: string;
  errPickupDate: string;
  errReturnDate: string;
  pickupLocationPlaceholder: string;
  dropoffLocationPlaceholder: string;
  phonePlaceholder: string;
}> = {
  en: {
    freeNoObligation: "Free — no obligation",
    heading: "Plan my trip",
    subheading: "Four quick steps. A real travel designer replies with a personalised itinerary within 48 hours.",
    stepLabels: ["Where", "How", "Car rental (optional)", "You"],
    stepOf: (step) => `Step ${step} of 4`,
    styles: ["Private guided", "Small group", "Luxury", "Self-guided with support"],
    interests: ["Food & drink", "Temples & culture", "Nature & onsen", "Cities & nightlife", "Anime & pop culture", "Cherry blossoms / foliage"],
    budgets: ["Under ¥300,000 pp", "¥300,000–600,000 pp", "¥600,000–1,000,000 pp", "¥1,000,000+ pp"],
    serviceTypes: ["Self drive", "Chauffeur service", "Airport pickup", "Airport drop"],
    step1Legend: "Where is Japan calling you?",
    step1Sub: "Pick as many as you like — or leave it to us.",
    step2StyleLegend: "What's your travel style?",
    step2InterestsLegend: "What lights you up?",
    step2BudgetLegend: "Rough budget per person?",
    addCarRental: "Add car rental / driver service",
    carRentalNote: "Optional — skip if you're happy with trains. We work with vetted rental partners across Japan.",
    serviceTypeLabel: "Service type",
    pickupLocation: "Pickup location",
    dropoffLocation: "Drop-off location",
    pickupDate: "Pickup date",
    pickupTime: "Pickup time",
    returnDate: "Return date",
    returnTime: "Return time",
    passengers: "Passengers",
    luggageBags: "Luggage bags",
    specialRequirements: "Special requirements",
    specialRequirementsPlaceholder: "Child seats, English GPS, ETC card, snow tyres…",
    step4Heading: "Where should we send your itinerary?",
    yourName: "Your name",
    country: "Country",
    emailAddress: "Email address",
    phoneWhatsapp: "Phone / WhatsApp",
    anythingElse: "Anything else?",
    anythingElsePlaceholder: "Dates, group size, occasions, dietary needs — anything helpful (optional)",
    yourPicks: "Your picks",
    destinationsChoice: "Destinations: designer's choice",
    styleOpen: "Style: open",
    interestsSurprise: "Interests: surprise us",
    budgetFlexible: "Budget: flexible",
    plusCarRental: " · + Car rental",
    back: "Back",
    continue: "Continue",
    sending: "Sending…",
    getMyFreeItinerary: "Get my free itinerary",
    noSpam: "No spam, no obligation, no payment details. Prefer to talk?",
    whatsappUs: "WhatsApp us",
    orBookACall: "book a call",
    doneHeading: "Your trip request is in!",
    doneBody: (firstName) =>
      `Thank you, ${firstName}. A travel designer is already looking at your answers — expect a personalised draft itinerary within 48 hours (usually much sooner).`,
    chatNow: "Chat now on WhatsApp",
    readGuides: "Read our travel guides",
    errName: "Please tell us your name",
    errEmail: "Please enter a valid email",
    errPickup: "Pickup location required",
    errDropoff: "Drop-off location required",
    errPickupDate: "Pickup date required",
    errReturnDate: "Return date required",
    pickupLocationPlaceholder: "e.g. Narita Airport",
    dropoffLocationPlaceholder: "e.g. Kyoto Station",
    phonePlaceholder: "+1…",
  },
  ja: {
    freeNoObligation: "無料・お約束不要",
    heading: "旅行プランを立てる",
    subheading: "簡単4ステップ。実際の旅行デザイナーが48時間以内にオリジナル旅程をお届けします。",
    stepLabels: ["行き先", "スタイル", "レンタカー（任意）", "ご連絡先"],
    stepOf: (step) => `ステップ ${step} / 4`,
    styles: ["プライベートガイド", "少人数グループ", "ラグジュアリー", "サポート付き自由旅行"],
    interests: ["グルメ・お酒", "寺院・文化", "自然・温泉", "都市・ナイトライフ", "アニメ・ポップカルチャー", "桜・紅葉"],
    budgets: ["30万円未満／名", "30万〜60万円／名", "60万〜100万円／名", "100万円以上／名"],
    serviceTypes: ["セルフドライブ", "ショーファーサービス", "空港お迎え", "空港お見送り"],
    step1Legend: "日本のどこへ行きたいですか？",
    step1Sub: "気になる場所をいくつでも選んでください——お任せいただいてもOKです。",
    step2StyleLegend: "ご希望の旅のスタイルは？",
    step2InterestsLegend: "何に心惹かれますか？",
    step2BudgetLegend: "おおよそのご予算（お一人あたり）は？",
    addCarRental: "レンタカー／運転手付きサービスを追加",
    carRentalNote: "任意項目です——電車での移動で問題なければスキップしてください。日本全国の信頼できるレンタルパートナーと提携しています。",
    serviceTypeLabel: "サービスの種類",
    pickupLocation: "受け取り場所",
    dropoffLocation: "返却場所",
    pickupDate: "受け取り日",
    pickupTime: "受け取り時間",
    returnDate: "返却日",
    returnTime: "返却時間",
    passengers: "乗車人数",
    luggageBags: "荷物の数",
    specialRequirements: "特別なご要望",
    specialRequirementsPlaceholder: "チャイルドシート、英語対応カーナビ、ETCカード、スタッドレスタイヤなど…",
    step4Heading: "旅程はどちらにお送りしましょうか？",
    yourName: "お名前",
    country: "国籍",
    emailAddress: "メールアドレス",
    phoneWhatsapp: "電話番号／WhatsApp",
    anythingElse: "その他のご要望はありますか？",
    anythingElsePlaceholder: "日程、人数、記念日、食事制限など——お役立ていただける情報（任意）",
    yourPicks: "選択内容の確認",
    destinationsChoice: "行き先：デザイナーにお任せ",
    styleOpen: "スタイル：特に指定なし",
    interestsSurprise: "興味：サプライズにお任せ",
    budgetFlexible: "予算：相談可能",
    plusCarRental: " ・ ＋レンタカー",
    back: "戻る",
    continue: "次へ",
    sending: "送信中…",
    getMyFreeItinerary: "無料の旅程を受け取る",
    noSpam: "スパムメールや強引な勧誘、お支払い情報の入力は一切ありません。お電話でのご相談をご希望ですか？",
    whatsappUs: "WhatsAppでご連絡",
    orBookACall: "無料相談を予約",
    doneHeading: "旅行のご相談を受け付けました！",
    doneBody: (firstName) =>
      `${firstName}様、ありがとうございます。旅行デザイナーが早速ご回答内容を確認しています——48時間以内（多くの場合はもっと早く）にオリジナル旅程の草案をお届けします。`,
    chatNow: "WhatsAppで今すぐチャット",
    readGuides: "旅行ガイドを読む",
    errName: "お名前をご入力ください",
    errEmail: "有効なメールアドレスを入力してください",
    errPickup: "受け取り場所を入力してください",
    errDropoff: "返却場所を入力してください",
    errPickupDate: "受け取り日を入力してください",
    errReturnDate: "返却日を入力してください",
    pickupLocationPlaceholder: "例：成田空港",
    dropoffLocationPlaceholder: "例：京都駅",
    phonePlaceholder: "+81…",
  },
};

export const planMyTripHead = (locale: Locale = "en") =>
  seo(
    locale === "ja"
      ? {
          title: "日本旅行プランを立てる — 無料オーダーメイド旅程 | Nippon Tours",
          description: "4つの簡単なステップで理想の日本旅行を——行き先、スタイル、任意のレンタカー、ご連絡先。48時間以内に無料のオリジナル旅程をお届けします。",
          path: "/plan-my-trip",
          locale: "ja",
        }
      : {
          title: "Plan My Japan Trip — Free Custom Itinerary | Nippon Tours",
          description:
            "Build your dream Japan trip in 4 easy steps — destinations, style, optional car rental, contact. Free personalised itinerary within 48 hours.",
          path: "/plan-my-trip",
          locale: "en",
        },
  );

export const Route = createFileRoute("/plan-my-trip")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(vehiclesQueryOptions());
  },
  head: () => planMyTripHead("en"),
  component: () => <PlannerPage locale="en" />,
});

export function PlannerPage({ locale }: { locale: Locale }) {
  useSuspenseQuery(vehiclesQueryOptions());
  const c = COPY[locale];
  const destinations = DESTINATIONS.map((d) => localizeDestination(d, locale));
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

  const contactSchema = z.object({
    name: z.string().trim().min(1, c.errName).max(120),
    email: z.string().trim().email(c.errEmail).max(255),
  });

  const carSchema = z.object({
    pickup_location: z.string().trim().min(1, c.errPickup).max(200),
    dropoff_location: z.string().trim().min(1, c.errDropoff).max(200),
    pickup_date: z.string().min(1, c.errPickupDate),
    return_date: z.string().min(1, c.errReturnDate),
  });

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
      const parsedContact = contactSchema.safeParse({ name, email });
      if (!parsedContact.success) throw new Error(parsedContact.error.issues[0].message);

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
          source: locale === "ja" ? "plan-my-trip-ja" : "plan-my-trip",
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
        <h1 className="mt-6 font-display text-3xl font-semibold">{c.doneHeading}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{c.doneBody(name.split(" ")[0])}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-accent">
            <MessageCircle className="h-4 w-4" /> {c.chatNow}
          </a>
          <LocaleLink to="/travel-guides" className="btn-outline">{c.readGuides}</LocaleLink>
        </div>
      </div>
    );
  }

  const stepLabel = c.stepLabels[step - 1];

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <p className="section-label text-center">{c.freeNoObligation}</p>
      <h1 className="mt-3 text-center font-display text-3xl font-semibold sm:text-4xl">{c.heading}</h1>
      <p className="mx-auto mt-3 max-w-md text-center text-muted-foreground">{c.subheading}</p>

      <div className="mx-auto mt-10 flex max-w-lg items-center gap-2" aria-label={c.stepOf(step)}>
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
        {c.stepOf(step)} · {stepLabel}
      </p>

      <div className="mt-10 rounded-3xl bg-card p-7 shadow-lg sm:p-10">
        {step === 1 && (
          <fieldset>
            <legend className="font-display text-xl font-semibold">{c.step1Legend}</legend>
            <p className="mt-1 text-sm text-muted-foreground">{c.step1Sub}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {destinations.map((d) => (
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
              <legend className="font-display text-xl font-semibold">{c.step2StyleLegend}</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.styles.map((s) => (
                  <button key={s} type="button" className={chip(style === s)} onClick={() => setStyle(s)} aria-pressed={style === s}>
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="font-display text-xl font-semibold">{c.step2InterestsLegend}</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.interests.map((s) => (
                  <button key={s} type="button" className={chip(interests.includes(s))} onClick={() => toggle(interests, setInterests, s)} aria-pressed={interests.includes(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="font-display text-xl font-semibold">{c.step2BudgetLegend}</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.budgets.map((s) => (
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
                  <Car className="h-5 w-5 text-accent" /> {c.addCarRental}
                </span>
              </label>
              <p className="mt-2 text-xs text-muted-foreground">{c.carRentalNote}</p>
            </div>

            {needsCar && (
              <div className="space-y-5 rounded-2xl bg-secondary/40 p-5">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">{c.serviceTypeLabel}</label>
                  <div className="flex flex-wrap gap-2">
                    {c.serviceTypes.map((s) => (
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
                  <TextField label={c.pickupLocation} value={car.pickup_location} onChange={(v) => setCar({ ...car, pickup_location: v })} placeholder={c.pickupLocationPlaceholder} />
                  <TextField label={c.dropoffLocation} value={car.dropoff_location} onChange={(v) => setCar({ ...car, dropoff_location: v })} placeholder={c.dropoffLocationPlaceholder} />
                  <TextField label={c.pickupDate} type="date" value={car.pickup_date} onChange={(v) => setCar({ ...car, pickup_date: v })} />
                  <TextField label={c.pickupTime} type="time" value={car.pickup_time} onChange={(v) => setCar({ ...car, pickup_time: v })} />
                  <TextField label={c.returnDate} type="date" value={car.return_date} onChange={(v) => setCar({ ...car, return_date: v })} />
                  <TextField label={c.returnTime} type="time" value={car.return_time} onChange={(v) => setCar({ ...car, return_time: v })} />
                  <TextField label={c.passengers} type="number" value={String(car.passengers)} onChange={(v) => setCar({ ...car, passengers: Number(v) || 1 })} />
                  <TextField label={c.luggageBags} type="number" value={String(car.luggage)} onChange={(v) => setCar({ ...car, luggage: Number(v) || 0 })} />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">{c.specialRequirements}</label>
                  <textarea
                    rows={3}
                    maxLength={1000}
                    value={car.special_requirements}
                    onChange={(e) => setCar({ ...car, special_requirements: e.target.value })}
                    placeholder={c.specialRequirementsPlaceholder}
                    className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-semibold">{c.step4Heading}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField label={c.yourName} value={name} onChange={setName} required />
              <TextField label={c.country} value={country} onChange={setCountry} />
              <TextField label={c.emailAddress} type="email" value={email} onChange={setEmail} required />
              <TextField label={c.phoneWhatsapp} value={phone} onChange={setPhone} placeholder={c.phonePlaceholder} />
            </div>
            {(errors.name || errors.email) && (
              <p className="text-xs font-semibold text-destructive">{errors.name || errors.email}</p>
            )}
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">{c.anythingElse}</label>
              <textarea
                rows={3}
                maxLength={1500}
                className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30"
                placeholder={c.anythingElsePlaceholder}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div className="rounded-2xl bg-secondary p-4 text-xs text-muted-foreground">
              <p className="font-bold text-foreground">{c.yourPicks}</p>
              <p className="mt-1">
                {dests.length ? dests.join(", ") : c.destinationsChoice} · {style || c.styleOpen} ·{" "}
                {interests.length ? interests.join(", ") : c.interestsSurprise} · {budget || c.budgetFlexible}
                {needsCar && c.plusCarRental}
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          {step > 1 ? (
            <button type="button" className="btn-outline" onClick={() => setStep(step - 1)}>
              <ChevronLeft className="h-4 w-4" /> {c.back}
            </button>
          ) : (
            <span />
          )}
          {step < 4 ? (
            <button type="button" className="btn-accent" onClick={() => setStep(step + 1)}>
              {c.continue} <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              className="btn-accent"
              disabled={submit.isPending}
              onClick={() => submit.mutate()}
            >
              {submit.isPending ? c.sending : c.getMyFreeItinerary} <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        {c.noSpam}{" "}
        <a className="font-bold text-accent underline" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
          {c.whatsappUs}
        </a>{" "}
        {locale === "en" ? "or " : "または "}<LocaleLink to="/contact" className="font-bold text-accent underline">{c.orBookACall}</LocaleLink>.
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
