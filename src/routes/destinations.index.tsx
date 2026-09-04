import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { DESTINATIONS, localizeDestination } from "@/data/destinations";
import { PageHero, CTABand } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { LocaleLink } from "@/components/site/LocaleLink";
import { seo } from "@/lib/seo";
import { type Locale } from "@/i18n";
import kyotoImgAsset from "@/assets/dest-kyoto.jpg";
const kyotoImg = kyotoImgAsset;

const COPY: Record<Locale, {
  label: string;
  title: string;
  subtitle: string;
  exploreCta: (name: string) => string;
  ctaTitle: string;
  ctaSubtitle: string;
}> = {
  en: {
    label: "Destinations",
    title: "Six Japans, waiting for you",
    subtitle: "Every region has its own light, food and rhythm. Start where your curiosity points — we'll connect the dots.",
    exploreCta: (name) => `Explore ${name} →`,
    ctaTitle: "Can't decide where to start?",
    ctaSubtitle: "Tell us what excites you and we'll design the perfect route between them.",
  },
  ja: {
    label: "目的地",
    title: "6つの日本が、あなたを待っています",
    subtitle: "地域ごとに異なる光、食、そして時間の流れがあります。心惹かれる場所から始めましょう——あとは私たちが旅程をつなぎます。",
    exploreCta: (name) => `${name}を見る →`,
    ctaTitle: "どこから始めるか迷っていますか？",
    ctaSubtitle: "興味のあることを教えてください。ぴったりのルートをデザインします。",
  },
};

export const destinationsIndexHead = (locale: Locale = "en") =>
  seo(
    locale === "ja"
      ? {
          title: "日本の目的地：東京・京都・大阪など | Nippon Tours",
          description: "東京、京都、大阪、箱根、広島、日本アルプスなど——現地専門ガイドと巡る日本の目的地をご紹介します。",
          path: "/destinations",
          locale: "ja",
        }
      : {
          title: "Japan Destinations: Tokyo, Kyoto, Osaka & More | Nippon Tours",
          description: "Explore Japan's best destinations — Tokyo, Kyoto, Osaka, Hakone, Hiroshima and the Japanese Alps — with local expert guides.",
          path: "/destinations",
          locale: "en",
        },
  );

export const Route = createFileRoute("/destinations/")({
  head: () => destinationsIndexHead("en"),
  component: () => <DestinationsPage locale="en" />,
});

export function DestinationsPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const destinations = DESTINATIONS.map((d) => localizeDestination(d, locale));

  return (
    <>
      <PageHero label={c.label} title={c.title} subtitle={c.subtitle} image={kyotoImg} />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {destinations.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 2) * 100}>
              <LocaleLink
                to="/destinations/$slug"
                params={{ slug: d.slug }}
                className="card-lift img-zoom group grid overflow-hidden rounded-3xl bg-card sm:grid-cols-[minmax(0,1fr)_auto]"
              >
                <div className="order-2 flex flex-col justify-center p-7 sm:order-1">
                  <p className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-accent">
                    <MapPin className="h-3.5 w-3.5" /> {d.region}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold group-hover:text-accent">{d.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.tagline}</p>
                  <p className="mt-4 text-sm font-bold text-accent">{c.exploreCta(d.name)}</p>
                </div>
                <div className="order-1 aspect-[4/3] overflow-hidden sm:order-2 sm:h-full sm:w-56 lg:w-72">
                  <img src={d.image} alt={`${d.name}, Japan`} width={1024} height={768} loading="lazy" className="h-full w-full object-cover" />
                </div>
              </LocaleLink>
            </Reveal>
          ))}
        </div>
      </section>
      <CTABand title={c.ctaTitle} subtitle={c.ctaSubtitle} />
    </>
  );
}
