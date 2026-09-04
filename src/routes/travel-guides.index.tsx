import { createFileRoute } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { GUIDES, localizeGuide } from "@/data/guides";
import { PageHero, CTABand } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { LocaleLink } from "@/components/site/LocaleLink";
import { seo } from "@/lib/seo";
import { type Locale } from "@/i18n";
import takayamaImgAsset from "@/assets/dest-takayama.jpg";
const takayamaImg = takayamaImgAsset;

const COPY: Record<Locale, {
  label: string;
  title: string;
  subtitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
}> = {
  en: {
    label: "Travel guides",
    title: "Everything you need to know before Japan",
    subtitle: "Written by our guides, updated constantly, free forever. The same advice we give paying guests.",
    ctaTitle: "Rather have a human answer?",
    ctaSubtitle: "Skip the research rabbit hole — a free consultation answers everything in one conversation.",
  },
  ja: {
    label: "旅行ガイド",
    title: "日本旅行の前に知っておきたいすべてのこと",
    subtitle: "現地ガイドが執筆し、常に最新の情報に更新される、永久に無料のガイドです。有料のお客様にお伝えしているのと同じアドバイスをお届けします。",
    ctaTitle: "人に直接聞きたい方へ",
    ctaSubtitle: "調べる手間を省いて、無料相談ですべての疑問を一度の会話で解決しましょう。",
  },
};

export const guidesIndexHead = (locale: Locale = "en") =>
  seo(
    locale === "ja"
      ? {
          title: "日本旅行ガイド：ビザ・JRパス・モデルコース | Nippon Tours",
          description: "日本旅行の無料専門ガイド——ベストシーズン、ビザの必要条件、JRパスのアドバイス、予算、そして理想の7日間モデルコースまで。",
          path: "/travel-guides",
          locale: "ja",
        }
      : {
          title: "Japan Travel Guides: Visa, JR Pass, Itineraries | Nippon Tours",
          description: "Free expert Japan travel guides — best time to visit, visa requirements, JR Pass advice, budgets and the perfect 7-day itinerary.",
          path: "/travel-guides",
          locale: "en",
        },
  );

export const Route = createFileRoute("/travel-guides/")({
  head: () => guidesIndexHead("en"),
  component: () => <GuidesPage locale="en" />,
});

export function GuidesPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const guides = GUIDES.map((g) => localizeGuide(g, locale));

  return (
    <>
      <PageHero label={c.label} title={c.title} subtitle={c.subtitle} image={takayamaImg} />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g, i) => (
            <Reveal key={g.slug} delay={(i % 3) * 90}>
              <LocaleLink
                to="/travel-guides/$slug"
                params={{ slug: g.slug }}
                className="card-lift img-zoom group flex h-full flex-col overflow-hidden rounded-3xl bg-card"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={g.image} alt={g.title} width={1024} height={576} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-lg font-semibold leading-snug group-hover:text-accent">{g.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{g.description}</p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {g.readTime}
                  </p>
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
