import { seo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Star, ShieldCheck, Clock, MessageCircle, MapPin, Play } from "lucide-react";
import heroFujiAsset from "@/assets/hero-fuji.jpg";
const heroFuji = heroFujiAsset;
import guideTeamAsset from "@/assets/guide-team.jpg";
const guideTeam = guideTeamAsset;
import voyageOneLogoAsset from "@/assets/voyage-one-dmc-logo.png";
const voyageOneLogo = voyageOneLogoAsset;
import { DESTINATIONS } from "@/data/destinations";
import { STATS, TRUST_POINTS, SITE } from "@/data/site";
import { Reveal, CountUp } from "@/components/site/Reveal";
import { TourCard } from "@/components/site/TourCard";
import { SectionHeading, CTABand } from "@/components/site/PageHero";
import { FAQList, faqJsonLd } from "@/components/site/FAQList";
import { InquiryForm } from "@/components/site/InquiryForm";
import { toursQueryOptions, faqsQueryOptions, testimonialsQueryOptions } from "@/lib/queries";

export const Route = createFileRoute("/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(toursQueryOptions());
    context.queryClient.ensureQueryData(faqsQueryOptions());
    context.queryClient.ensureQueryData(testimonialsQueryOptions());
  },
 head: () =>
  seo({
    title: "Private Japan Tours | Luxury & Custom Japan Trips | Nippon Tours",
    description:
      "Explore Japan with licensed local experts. Private tours, luxury holidays, cherry blossom tours, Mount Fuji, Kyoto, Osaka, Tokyo and fully customized itineraries.",
    path: "/",
    image: "/og-home.jpg",
  }),

  component: HomePage,
});

function HomePage() {
  const { data: tours } = useSuspenseQuery(toursQueryOptions());
  const { data: faqs } = useSuspenseQuery(faqsQueryOptions());
  const { data: testimonials } = useSuspenseQuery(testimonialsQueryOptions());
  const featured = tours.filter((t) => t.featured).slice(0, 6);
  const faqsList = faqs.slice(0, 5).map((f) => ({ q: f.question, a: f.answer }));


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
          <p className="section-label animate-hero-1 !text-white/90">Licensed local experts · Since 2014</p>
          <h1 className="animate-hero-2 mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-white sm:text-6xl">
            Japan, crafted
            <span className="text-accent"> around you.</span>
          </h1>
          <p className="animate-hero-3 mt-6 max-w-xl text-lg leading-relaxed text-white/85">
            Private guides, hidden temples, steaming onsen and streets that smell of grilled soy.
            We design journeys you'll retell for the rest of your life — and handle every detail while you live them.
          </p>
          <div className="animate-hero-3 mt-8 flex flex-wrap items-center gap-3">
            <Link to="/plan-my-trip" className="btn-accent">Plan My Trip — Free</Link>
            <Link to="/contact" className="btn-light">Book a Consultation</Link>
            <Link to="/tours" className="btn-light !border-transparent !bg-transparent">
              <Play className="h-4 w-4" /> Explore Tours
            </Link>
          </div>

          <div className="animate-hero-3 mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/85">
            <span className="inline-flex items-center gap-2">
              <span className="flex text-gold" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </span>
              <strong>4.9</strong> Google Reviews
            </span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Licensed Japanese operator</span>
            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> Replies in under 1 hour</span>
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
          {STATS.map((s, i) => (
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
          <SectionHeading
            label="Destinations"
            title="Where will Japan take you?"
            subtitle="Six regions, six personalities — from neon Tokyo to snow-country villages."
          />
          <Reveal>
            <Link to="/destinations" className="btn-outline">All destinations</Link>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 3) * 100}>
              <Link
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
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STORY / EXPERIENCE */}
      <section className="bg-ink py-20 text-ink-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <Reveal>
            <p className="section-label">Why we exist</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              We don't sell tours. We choreograph the best days of your life.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-foreground/75">
              A trip to Japan happens once, maybe twice, in a lifetime. So we treat every itinerary like a theatre
              production: the sushi counter with six seats, the temple gate at the exact minute the crowds leave,
              the ryokan window that frames Mount Fuji at sunrise.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-foreground/75">
              Your guides have walked these routes hundreds of times — but they know these days are your only ones here.
              That's the difference you feel.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about" className="btn-light">Meet the team</Link>
              <Link to="/reviews" className="btn-light !border-transparent !bg-white/10">Read 1,900+ reviews</Link>
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
          <SectionHeading
            label="Signature journeys"
            title="Tours our guests never stop talking about"
            subtitle="Private, small group, luxury and seasonal — every one refined over hundreds of departures."
          />
          <Reveal>
            <Link to="/tours" className="btn-outline">View all tours</Link>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((t, i) => (
            <Reveal key={t.slug} delay={(i % 3) * 100}>
              <TourCard tour={t} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading center label="Travel with confidence" title="Booked with us, you're never on your own" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_POINTS.map((t, i) => (
              <Reveal key={t.title} delay={i * 90} className="rounded-3xl bg-card p-6 shadow-sm">
                <ShieldCheck className="h-8 w-8 text-accent" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          center
          label="Guest stories"
          title="Rated 4.9/5 across Google & Tripadvisor"
          subtitle="Real words from travellers who trusted us with their once-in-a-lifetime trip."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 6).map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 100} className="card-lift flex flex-col rounded-3xl bg-card p-6">
              <div className="flex text-gold" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-5 border-t border-border pt-4 text-sm">
                <p className="font-bold">{t.name}</p>
                <p className="text-muted-foreground">{[t.country, t.tour, t.source].filter(Boolean).join(" · ")}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link to="/reviews" className="btn-outline">Read all reviews</Link>
        </Reveal>
      </section>

      {/* LEAD FORM */}
      <section className="bg-ink py-20 text-ink-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <Reveal>
            <p className="section-label">Free consultation</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Get a personalised Japan itinerary — free, within 48 hours
            </h2>
            <p className="mt-4 text-lg text-ink-foreground/75">
              Tell us your dates, interests and budget. A real human (probably Mei) replies with a draft plan,
              honest pricing, and zero pressure.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink-foreground/80">
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-accent" /> Average first reply: under 1 hour</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> No deposit until you approve every detail</li>
              <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-accent" /> Prefer chat? <a className="underline hover:text-accent" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a></li>
            </ul>
          </Reveal>
          <Reveal delay={150} className="rounded-3xl bg-white/5 p-8 backdrop-blur">
            <InquiryForm dark context="home" />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <SectionHeading center label="Questions" title="Frequently asked questions" />
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
          <Link to="/faqs" className="btn-outline">See all FAQs</Link>
        </Reveal>
      </section>

      <CTABand />
    </>
  );
}
