import { seo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import guideTeamAsset from "@/assets/guide-team.jpg";
const guideTeam = guideTeamAsset;
import { TEAM, TEAM_JA, STATS, STATS_JA } from "@/data/site";
import { PageHero, CTABand, SectionHeading } from "@/components/site/PageHero";
import { Reveal, CountUp } from "@/components/site/Reveal";
import type { Locale } from "@/i18n";

const COPY: Record<Locale, {
  label: string;
  title: string;
  subtitle: string;
  pledgeLabel: string;
  pledgeTitle: string;
  pledgeBody1: string;
  pledgeBody2: string;
  meetTeamLabel: string;
  meetTeamTitle: string;
  ctaTitle: string;
}> = {
  en: {
    label: "About us",
    title: "We're locals. That changes everything.",
    subtitle:
      "Nippon Tours is a licensed Japanese travel operator — a small team of guides, designers and fixers who treat your only days in Japan like the performance of a lifetime.",
    pledgeLabel: "Our pledge",
    pledgeTitle: "Travel with passion — it's a promise, not a slogan",
    pledgeBody1:
      "Our guides have walked these routes hundreds of times. But we never forget that the days you travel are your only days here. So, like a theatre production, we make sure every one is the best day ever — the right temple at the right minute, the counter seat that never reaches booking sites, the story that makes a shrine unforgettable.",
    pledgeBody2:
      "It's about more than ticking boxes on a bucket list. It's about giving every guest a feeling, an experience, and memories that outlive the photos.",
    meetTeamLabel: "Meet the team",
    meetTeamTitle: "The people who'll plan (and save) your trip",
    ctaTitle: "Come see our Japan",
  },
  ja: {
    label: "会社概要",
    title: "私たちは、現地のプロフェッショナルです。",
    subtitle:
      "Nippon Toursは日本政府認可の旅行会社です。ガイド、旅程デザイナー、手配のプロからなる少人数のチームが、日本で過ごすかけがえのない日々を、人生最高の舞台のように演出します。",
    pledgeLabel: "私たちの約束",
    pledgeTitle: "情熱を持って旅をつくる——それはスローガンではなく約束です",
    pledgeBody1:
      "私たちのガイドはこの道を何百回と歩いてきました。それでも、あなたが日本で過ごす日々はかけがえのない一度きりであることを、決して忘れません。だからこそ、まるで舞台演出のように、すべての瞬間を最高の一日にします——ちょうどよい時間に訪れる寺院、予約サイトには載らないカウンター席、神社を忘れられないものにする物語。",
    pledgeBody2:
      "それは単なるバケットリストの達成ではありません。すべてのお客様に、写真以上に残る感動と経験、そして思い出をお届けすることです。",
    meetTeamLabel: "チーム紹介",
    meetTeamTitle: "あなたの旅を計画し（そして助けて）くれる人々",
    ctaTitle: "日本を見に来てください",
  },
};

export const aboutHead = (locale: Locale = "en") =>
  seo(
    locale === "ja"
      ? {
          title: "Nippon Toursについて | 日本旅行の現地エキスパート",
          description:
            "Nippon Toursの経験豊かな現地ガイドと、忘れられないプライベート・ラグジュアリーな日本旅行への情熱について。",
          path: "/about",
          locale: "ja",
        }
      : {
          title: "About Nippon Tours | Local Japan Travel Experts",
          description:
            "Learn about Nippon Tours, our experienced local guides, and our passion for creating unforgettable private and luxury Japan tours.",
          path: "/about",
          locale: "en",
        },
  );

export const Route = createFileRoute("/about")({
  head: () => aboutHead("en"),
  component: () => <AboutPage locale="en" />,
});

export function AboutPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const team = locale === "ja" ? TEAM_JA : TEAM;
  const stats = locale === "ja" ? STATS_JA : STATS;
  return (
    <>
      <PageHero label={c.label} title={c.title} subtitle={c.subtitle} image={guideTeam} />

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2">
        <Reveal>
          <p className="section-label">{c.pledgeLabel}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold">{c.pledgeTitle}</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.pledgeBody1}</p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{c.pledgeBody2}</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-6 self-center">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="rounded-3xl bg-card p-6 text-center shadow-sm">
              <p className="font-display text-3xl font-semibold"><CountUp end={s.value} suffix={s.suffix} /></p>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading label={c.meetTeamLabel} title={c.meetTeamTitle} />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 100} className="card-lift rounded-3xl bg-card p-7">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-primary font-display text-lg font-semibold text-primary-foreground" aria-hidden="true">
                  {m.initials}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold">{m.name}</h3>
                <p className="text-sm font-bold text-accent">{m.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand title={c.ctaTitle} />
    </>
  );
}
