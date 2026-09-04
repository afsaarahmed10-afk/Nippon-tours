import { seo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { CategoryLanding } from "@/components/site/CategoryLanding";
import type { Locale } from "@/i18n";
import tokyoImgAsset from "@/assets/dest-tokyo.jpg";
const tokyoImg = tokyoImgAsset;

const COPY: Record<Locale, { seoTitle: string; seoDescription: string; title: string; intro: string; benefits: { title: string; desc: string }[]; faqs: { q: string; a: string }[] }> = {
  en: {
    seoTitle: "Private Japan Tours with Licensed Local Guides | Nippon Tours",
    seoDescription: "Private Japan tours built around you — dedicated licensed guides, flexible pacing, skip-the-line access. Tokyo, Kyoto, Osaka and beyond.",
    title: "Your guide. Your pace. Your Japan.",
    intro: "A dedicated licensed guide, a route built around your interests, and days that flex when curiosity strikes. This is Japan without compromise.",
    benefits: [
      { title: "Completely flexible", desc: "Linger at the temple you love, skip the shop you don't. Private means the schedule serves you." },
      { title: "Doors that open privately", desc: "Maiko dinners, tea masters, closed-door workshops — access that group tours simply can't arrange." },
      { title: "Perfect for milestones", desc: "Honeymoons, anniversaries, multi-generation family trips — occasions deserve undivided attention." },
    ],
    faqs: [
      { q: "How much does a private tour of Japan cost?", a: "Full-day private guiding starts at $180, and complete multi-day private packages from about $350 per person per day including 4-star hotels, rail and guiding. Every quote is itemised." },
      { q: "Can the itinerary change mid-trip?", a: "Yes — that's the point of private. Weather, energy levels, sudden obsessions with Japanese bakeries: your guide adapts in real time." },
      { q: "Are private tours suitable for families?", a: "They're our most popular family format. Guides adjust pace for children and grandparents alike, and we build in breaks, playgrounds and kid-approved food." },
    ],
  },
  ja: {
    seoTitle: "国家資格ガイドと巡るプライベート日本ツアー | Nippon Tours",
    seoDescription: "あなただけのために組み立てるプライベート日本ツアー——専属の国家資格ガイド、柔軟なペース配分、優先入場。東京・京都・大阪など全国対応。",
    title: "あなたのガイドと、あなたのペースで巡る日本。",
    intro: "専属の国家資格ガイド、興味に合わせて組み立てたルート、そして好奇心が動いたその瞬間に対応できる柔軟な一日。妥協のない日本旅行がここにあります。",
    benefits: [
      { title: "完全に自由なスケジュール", desc: "好きな寺院ではゆっくりと、興味のないお店はスキップ。プライベートだからこそ、旅程はあなたのために存在します。" },
      { title: "プライベートだから開く扉", desc: "舞妓とのディナー、茶道の師匠、非公開のワークショップ——グループツアーでは手配できない特別な体験を。" },
      { title: "特別な節目にふさわしい旅", desc: "ハネムーン、記念日、三世代での家族旅行——大切な機会には、行き届いたおもてなしを。" },
    ],
    faqs: [
      { q: "日本のプライベートツアーの費用はどれくらいですか？", a: "1日ガイドは180ドルから、4つ星ホテル・鉄道・ガイド込みの複数日パッケージは1名あたり1日約350ドルからご案内しています。すべての見積もりは内訳を明示いたします。" },
      { q: "旅行中に旅程を変更できますか？", a: "はい——それがプライベートツアーの醍醐味です。天候、体調、突然のパン屋巡りへの興味——ガイドがその場で柔軟に対応します。" },
      { q: "家族旅行にも向いていますか？", a: "最も人気のある家族向け旅行形態です。お子様からご高齢の方まで、それぞれのペースに合わせてガイドが調整し、休憩や遊び場、お子様向けの食事も旅程に組み込みます。" },
    ],
  },
};

export function PrivateToursPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <CategoryLanding
      category="Private"
      title={c.title}
      intro={c.intro}
      image={tokyoImg}
      benefits={c.benefits}
      faqs={c.faqs}
    />
  );
}

export const privateToursHead = (locale: Locale = "en") =>
  seo({ title: COPY[locale].seoTitle, description: COPY[locale].seoDescription, path: "/private-tours", locale });

export const Route = createFileRoute("/private-tours")({
  head: () => privateToursHead("en"),
  component: () => <PrivateToursPage locale="en" />,
});
