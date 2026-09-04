import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading, CTABand } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { LocaleLink } from "@/components/site/LocaleLink";
import { SERVICES_BY_CATEGORY, CATEGORY_LABEL, localizeService } from "@/data/services";
import { seo } from "@/lib/seo";
import { type Locale } from "@/i18n";
import heroFujiAsset from "@/assets/hero-fuji.jpg";

const COPY: Record<Locale, {
  label: string;
  title: string;
  subtitle: string;
  learnMore: string;
}> = {
  en: {
    label: "Services",
    title: "Every service, one accountable partner",
    subtitle: "From an airport transfer to a 2,000-delegate incentive, we handle Japan end-to-end — with the same team and the same standards.",
    learnMore: "Learn more →",
  },
  ja: {
    label: "サービス",
    title: "すべてのサービスを、ひとつの信頼できるパートナーで",
    subtitle: "空港送迎から2,000名規模の報奨旅行まで、同じチーム・同じ基準で日本での旅を一貫してサポートします。",
    learnMore: "詳しく見る →",
  },
};

export const servicesIndexHead = (locale: Locale = "en") =>
  seo(
    locale === "ja"
      ? {
          title: "日本の旅行サービス一覧：DMC・MICE・送迎・コンシェルジュ | Nippon Tours",
          description: "日本国内でのフルサービス展開——FIT、MICE、法人出張、教育旅行、専属ドライバー、レンタカー、ホテル・レストランのコンシェルジュ手配まで。",
          path: "/services",
          locale: "ja",
        }
      : {
          title: "Japan Travel Services — DMC, MICE, Transport, Concierge | Nippon Tours",
          description: "Full destination management services in Japan: FIT, MICE, corporate travel, educational tours, chauffeur, car rental, hotel and restaurant concierge.",
          path: "/services",
          locale: "en",
        },
  );

export const Route = createFileRoute("/services/")({
  head: () => servicesIndexHead("en"),
  component: () => <ServicesIndex locale="en" />,
});

const CATEGORY_ORDER = ["Travel", "Business", "Transport", "Concierge"] as const;

export function ServicesIndex({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <>
      <PageHero
        label={c.label}
        title={c.title}
        subtitle={c.subtitle}
        image={heroFujiAsset}
      />
      {CATEGORY_ORDER.map((cat) => {
        const items = (SERVICES_BY_CATEGORY[cat] ?? []).map((s) => localizeService(s, locale));
        if (items.length === 0) return null;
        const catLabel = CATEGORY_LABEL[locale][cat];
        return (
          <section key={cat} className="mx-auto max-w-7xl px-6 py-14">
            <SectionHeading label={catLabel} title={locale === "ja" ? `${catLabel}サービス` : `${catLabel} services`} />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((s, i) => (
                <Reveal key={s.slug} delay={(i % 3) * 80}>
                  <LocaleLink
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="group block h-full rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-accent">
                      {s.name}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {s.intro}
                    </p>
                    <span className="mt-5 inline-block text-sm font-semibold text-accent">
                      {c.learnMore}
                    </span>
                  </LocaleLink>
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}
      <CTABand />
    </>
  );
}
