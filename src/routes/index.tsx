import { seo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Star, ShieldCheck, Clock, MessageCircle, MapPin, Play } from "lucide-react";
import heroFujiAsset from "@/assets/hero-fuji.jpg";
const heroFuji = heroFujiAsset;
import guideTeamAsset from "@/assets/guide-team.jpg";
const guideTeam = guideTeamAsset;
import voyageOneLogoAsset from "@/assets/voyage-one-dmc-logo.png";
const voyageOneLogo = voyageOneLogoAsset;
import { DESTINATIONS, localizeDestination } from "@/data/destinations";
import { STATS, STATS_JA, TRUST_POINTS, TRUST_POINTS_JA, SITE } from "@/data/site";
import { Reveal, CountUp } from "@/components/site/Reveal";
import { TourCard } from "@/components/site/TourCard";
import { SectionHeading, CTABand } from "@/components/site/PageHero";
import { FAQList, faqJsonLd } from "@/components/site/FAQList";
import { InquiryForm } from "@/components/site/InquiryForm";
import { LocaleLink } from "@/components/site/LocaleLink";
import { toursQueryOptions, faqsQueryOptions, testimonialsQueryOptions } from "@/lib/queries";
import { useCommon, type Locale } from "@/i18n";

const COPY: Record<Locale, {
  eyebrow: string;
  heroTitle: string;
  heroAccent: string;
  heroBody: string;
  googleReviews: string;
  licensedOperator: string;
  repliesUnder1h: string;
  destinationsLabel: string;
  destinationsTitle: string;
  destinationsSubtitle: string;
  storyLabel: string;
  storyTitle: string;
  storyBody1: string;
  storyBody2: string;
  meetTeam: string;
  readReviews: string;
  signatureLabel: string;
  signatureTitle: string;
  signatureSubtitle: string;
  trustLabel: string;
  trustTitle: string;
  guestStoriesLabel: string;
  guestStoriesTitle: string;
  guestStoriesSubtitle: string;
  consultLabel: string;
  consultTitle: string;
  consultBody: string;
  replyLine: string;
  noDepositLine: string;
  preferChat: string;
  messageUs: string;
  faqLabel: string;
  faqTitle: string;
}> = {
  en: {
    eyebrow: "Licensed local experts · Since 2014",
    heroTitle: "Japan, crafted",
    heroAccent: " around you.",
    heroBody:
      "Private guides, hidden temples, steaming onsen and streets that smell of grilled soy. We design journeys you'll retell for the rest of your life — and handle every detail while you live them.",
    googleReviews: "Google Reviews",
    licensedOperator: "Licensed Japanese operator",
    repliesUnder1h: "Replies in under 1 hour",
    destinationsLabel: "Destinations",
    destinationsTitle: "Where will Japan take you?",
    destinationsSubtitle: "Six regions, six personalities — from neon Tokyo to snow-country villages.",
    storyLabel: "Why we exist",
    storyTitle: "We don't sell tours. We choreograph the best days of your life.",
    storyBody1:
      "A trip to Japan happens once, maybe twice, in a lifetime. So we treat every itinerary like a theatre production: the sushi counter with six seats, the temple gate at the exact minute the crowds leave, the ryokan window that frames Mount Fuji at sunrise.",
    storyBody2:
      "Your guides have walked these routes hundreds of times — but they know these days are your only ones here. That's the difference you feel.",
    meetTeam: "Meet the team",
    readReviews: "Read 1,900+ reviews",
    signatureLabel: "Signature journeys",
    signatureTitle: "Tours our guests never stop talking about",
    signatureSubtitle: "Private, small group, luxury and seasonal — every one refined over hundreds of departures.",
    trustLabel: "Travel with confidence",
    trustTitle: "Booked with us, you're never on your own",
    guestStoriesLabel: "Guest stories",
    guestStoriesTitle: "Rated 4.9/5 across Google & Tripadvisor",
    guestStoriesSubtitle: "Real words from travellers who trusted us with their once-in-a-lifetime trip.",
    consultLabel: "Free consultation",
    consultTitle: "Get a personalised Japan itinerary — free, within 48 hours",
    consultBody:
      "Tell us your dates, interests and budget. A real human (probably Mei) replies with a draft plan, honest pricing, and zero pressure.",
    replyLine: "Average first reply: under 1 hour",
    noDepositLine: "No deposit until you approve every detail",
    preferChat: "Prefer chat?",
    messageUs: "Message us on WhatsApp",
    faqLabel: "Questions",
    faqTitle: "Frequently asked questions",
  },
  ja: {
    eyebrow: "現地に精通した認可事業者 · 2014年創業",
    heroTitle: "日本を、あなたのために",
    heroAccent: "デザインする。",
    heroBody:
      "専属ガイド、隠れた古寺、湯けむり立つ温泉、香ばしい醤油の香り漂う路地。一生語り継ぎたくなる旅を私たちがデザインし、細部まで丁寧にお世話します。",
    googleReviews: "件のGoogleクチコミ",
    licensedOperator: "日本政府認可の旅行会社",
    repliesUnder1h: "1時間以内に返信",
    destinationsLabel: "目的地",
    destinationsTitle: "日本のどこへ旅しますか？",
    destinationsSubtitle: "六つの地方、六つの個性——ネオン輝く東京から、雪深い里の村まで。",
    storyLabel: "私たちが大切にしていること",
    storyTitle: "私たちが売るのはツアーではなく、人生最高の一日です。",
    storyBody1:
      "日本旅行は一生に一度、あるいは二度あるかどうかの体験です。だからこそ私たちは、すべての旅程を舞台演出のようにデザインします。6席しかない寿司カウンター、人が去った瞬間の寺院の門、朝日に富士山が浮かぶ旅館の窓辺。",
    storyBody2:
      "私たちのガイドはこの道を何百回と歩いてきましたが、あなたにとってはこの日々がかけがえのない一度きりであることを、誰よりも理解しています。その違いを、きっと感じていただけるはずです。",
    meetTeam: "チームを紹介",
    readReviews: "1,900件以上のレビューを見る",
    signatureLabel: "人気の旅程",
    signatureTitle: "お客様が何度も語りたくなるツアー",
    signatureSubtitle: "プライベート、少人数グループ、ラグジュアリー、季節限定——数百回の催行を経て磨き上げられた旅程です。",
    trustLabel: "安心の旅を",
    trustTitle: "私たちと旅すれば、ひとりで悩むことはありません",
    guestStoriesLabel: "お客様の声",
    guestStoriesTitle: "GoogleとTripadvisorで評価4.9/5",
    guestStoriesSubtitle: "一生に一度の旅を私たちに託してくださった旅行者の、生の声をお届けします。",
    consultLabel: "無料相談",
    consultTitle: "48時間以内に、あなただけの日本旅程を無料でお届け",
    consultBody: "ご希望の日程、興味のあること、ご予算をお聞かせください。実際のスタッフ（おそらくMei）が草案プランと明朗な料金をご案内します。しつこい勧誘は一切ありません。",
    replyLine: "平均初回返信時間：1時間以内",
    noDepositLine: "全ての内容にご納得いただくまでデポジット不要",
    preferChat: "チャットの方がお好みですか？",
    messageUs: "WhatsAppでメッセージを送る",
    faqLabel: "よくある質問",
    faqTitle: "よくあるご質問",
  },
};

export const homeHead = (locale: Locale = "en") =>
  seo(
    locale === "ja"
      ? {
          title: "個人・グループ・ラグジュアリーな日本ツアー | Nippon Tours",
          description:
            "現地に精通した認可ガイドと巡る日本旅行。プライベートツアー、ラグジュアリー旅行、桜の季節ツアー、富士山・京都・大阪・東京、完全オーダーメイドの旅程まで。",
          path: "/",
          image: "/og-home.jpg",
          locale: "ja",
        }
      : {
          title: "Private Japan Tours | Luxury & Custom Japan Trips | Nippon Tours",
          description:
            "Explore Japan with licensed local experts. Private tours, luxury holidays, cherry blossom tours, Mount Fuji, Kyoto, Osaka, Tokyo and fully customized itineraries.",
          path: "/",
          image: "/og-home.jpg",
          locale: "en",
        },
  );

export const homeLoader = ({ context, locale = "en" as Locale }: { context: { queryClient: import("@tanstack/react-query").QueryClient }; locale?: Locale }) => {
  context.queryClient.ensureQueryData(toursQueryOptions(locale));
  context.queryClient.ensureQueryData(faqsQueryOptions());
  context.queryClient.ensureQueryData(testimonialsQueryOptions());
};

export const Route = createFileRoute("/")({
  loader: ({ context }) => homeLoader({ context, locale: "en" }),
  head: () => homeHead("en"),
  component: () => <HomePage locale="en" />,
});

export function HomePage({ locale }: { locale: Locale }) {
  const { data: tours } = useSuspenseQuery(toursQueryOptions(locale));
  const { data: faqs } = useSuspenseQuery(faqsQueryOptions());
  const { data: testimonials } = useSuspenseQuery(testimonialsQueryOptions());
  const featured = tours.filter((t) => t.featured).slice(0, 6);
  const faqsList = faqs.slice(0, 5).map((f) => ({ q: f.question, a: f.answer }));
  const c = COPY[locale];
  const t = useCommon();
  const stats = locale === "ja" ? STATS_JA : STATS;
  const trustPoints = locale === "ja" ? TRUST_POINTS_JA : TRUST_POINTS;
  const destinations = DESTINATIONS.map((d) => localizeDestination(d, locale));

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-ink">
        <img
          src={heroFuji}
          alt="Mount Fuji at dawn behind Chureito Pagoda framed by cherry blossoms"
          width={1920}
          height={1080}
          fetchPriority="high"
          className="animate-ken-burns absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pt-28 pb-20">
          <p className="section-label animate-hero-1 !text-white/90">{c.eyebrow}</p>
          <h1 className="animate-hero-2 mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-white sm:text-6xl">
            {c.heroTitle}
            <span className="text-accent">{c.heroAccent}</span>
          </h1>
          <p className="animate-hero-3 mt-6 max-w-xl text-lg leading-relaxed text-white/85">{c.heroBody}</p>
          <div className="animate-hero-3 mt-8 flex flex-wrap items-center gap-3">
            <LocaleLink to="/plan-my-trip" className="btn-accent">{t.common.planMyTripFree}</LocaleLink>
            <LocaleLink to="/contact" className="btn-light">{t.common.bookConsultation}</LocaleLink>
            <LocaleLink to="/tours" className="btn-light !border-transparent !bg-transparent">
              <Play className="h-4 w-4" /> {t.common.exploreTours}
            </LocaleLink>
          </div>

          <div className="animate-hero-3 mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/85">
            <span className="inline-flex items-center gap-2">
              <span className="flex text-gold" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </span>
              <strong>4.9</strong> {c.googleReviews}
            </span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> {c.licensedOperator}</span>
            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> {c.repliesUnder1h}</span>
          </div>
        </div>
      </section>

      {/* PARTNER */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-6 py-8 text-center sm:flex-row sm:gap-4">
          <img
            src={voyageOneLogo}
            alt="Voyage 1 DMC"
            width={1818}
            height={1818}
            loading="lazy"
            decoding="async"
            className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16"
          />
          <a
            href="https://www.voyage-one.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-accent"
          >
            www.voyage-one.com
          </a>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="text-center">
              <p className="font-display text-4xl font-semibold text-foreground">
                <CountUp end={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading label={c.destinationsLabel} title={c.destinationsTitle} subtitle={c.destinationsSubtitle} />
          <Reveal>
            <LocaleLink to="/destinations" className="btn-outline">{t.common.allDestinations}</LocaleLink>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 3) * 100}>
              <LocaleLink
                to="/destinations/$slug"
                params={{ slug: d.slug }}
                className="card-lift img-zoom group relative block aspect-[4/5] overflow-hidden rounded-3xl"
              >
                <img src={d.image} alt={`${d.name} — ${d.tagline}`} width={1024} height={768} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-white/80">
                    <MapPin className="h-3.5 w-3.5" /> {d.region}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold">{d.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-white/85">{d.tagline}</p>
                </div>
              </LocaleLink>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STORY / EXPERIENCE */}
      <section className="bg-ink py-20 text-ink-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <Reveal>
            <p className="section-label">{c.storyLabel}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{c.storyTitle}</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-foreground/75">{c.storyBody1}</p>
            <p className="mt-4 text-lg leading-relaxed text-ink-foreground/75">{c.storyBody2}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LocaleLink to="/about" className="btn-light">{c.meetTeam}</LocaleLink>
              <LocaleLink to="/reviews" className="btn-light !border-transparent !bg-white/10">{c.readReviews}</LocaleLink>
            </div>
          </Reveal>
          <Reveal delay={150} className="img-zoom overflow-hidden rounded-3xl">
            <img
              src={guideTeam}
              alt="Nippon Tours guide sharing stories with travellers at a Kyoto temple"
              width={1024}
              height={768}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* FEATURED TOURS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading label={c.signatureLabel} title={c.signatureTitle} subtitle={c.signatureSubtitle} />
          <Reveal>
            <LocaleLink to="/tours" className="btn-outline">{t.common.viewAllTours}</LocaleLink>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((tour, i) => (
            <Reveal key={tour.slug} delay={(i % 3) * 100}>
              <TourCard tour={tour} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading center label={c.trustLabel} title={c.trustTitle} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((point, i) => (
              <Reveal key={point.title} delay={i * 90} className="rounded-3xl bg-card p-6 shadow-sm">
                <ShieldCheck className="h-8 w-8 text-accent" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{point.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading center label={c.guestStoriesLabel} title={c.guestStoriesTitle} subtitle={c.guestStoriesSubtitle} />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 6).map((tm, i) => (
            <Reveal key={tm.id} delay={(i % 3) * 100} className="card-lift flex flex-col rounded-3xl bg-card p-6">
              <div className="flex text-gold" aria-label={`${tm.rating} out of 5 stars`}>
                {Array.from({ length: tm.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">&ldquo;{tm.quote}&rdquo;</p>
              <div className="mt-5 border-t border-border pt-4 text-sm">
                <p className="font-bold">{tm.name}</p>
                <p className="text-muted-foreground">{[tm.country, tm.tour, tm.source].filter(Boolean).join(" · ")}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <LocaleLink to="/reviews" className="btn-outline">{t.common.readAllReviews}</LocaleLink>
        </Reveal>
      </section>

      {/* LEAD FORM */}
      <section className="bg-ink py-20 text-ink-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <Reveal>
            <p className="section-label">{c.consultLabel}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{c.consultTitle}</h2>
            <p className="mt-4 text-lg text-ink-foreground/75">{c.consultBody}</p>
            <ul className="mt-6 space-y-3 text-sm text-ink-foreground/80">
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-accent" /> {c.replyLine}</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> {c.noDepositLine}</li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-accent" /> {c.preferChat}{" "}
                <a className="underline hover:text-accent" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">{c.messageUs}</a>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={150} className="rounded-3xl bg-white/5 p-8 backdrop-blur">
            <InquiryForm dark context="home" />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <SectionHeading center label={c.faqLabel} title={c.faqTitle} />
        <Reveal className="mt-8">
          {faqsList.length > 0 ? (
            <>
              <FAQList faqs={faqsList} />
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: faqJsonLd(faqsList) }}
              />
            </>
          ) : null}
        </Reveal>
        <Reveal className="mt-8 text-center">
          <LocaleLink to="/faqs" className="btn-outline">{t.common.seeAllFaqs}</LocaleLink>
        </Reveal>
      </section>

      <CTABand />
    </>
  );
}
