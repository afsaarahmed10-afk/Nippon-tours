import { seo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { CategoryLanding } from "@/components/site/CategoryLanding";
import type { Locale } from "@/i18n";
import sakuraImgAsset from "@/assets/tour-sakura.jpg";
const sakuraImg = sakuraImgAsset;

const COPY: Record<Locale, { seoTitle: string; seoDescription: string; title: string; intro: string; benefits: { title: string; desc: string }[]; faqs: { q: string; a: string }[] }> = {
  en: {
    seoTitle: "Cherry Blossom & Autumn Leaves Tours in Japan | Nippon Tours",
    seoDescription: "Seasonal Japan tours timed to perfection — cherry blossom tours with daily bloom tracking and autumn foliage journeys through Kyoto and the Alps.",
    title: "Japan's fleeting masterpieces, timed to perfection",
    intro: "Peak sakura lasts a week. Autumn's best light, a fortnight. Our seasonal tours track the forecasts daily and adjust routing so you're standing in the right place at the right hour.",
    benefits: [
      { title: "Forecast-driven routing", desc: "We track the blossom and foliage fronts every morning and quietly re-sequence your days to hit the peak." },
      { title: "Booked before the surge", desc: "We hold peak-season hotel allotments a year out — rooms you simply can't get in February for April." },
      { title: "The night versions", desc: "Illuminated sakura over castle moats, maple gardens lit after dark — seasonal Japan is best twice a day." },
    ],
    faqs: [
      { q: "When exactly do cherry blossoms bloom?", a: "Tokyo and Kyoto typically peak late March to early April, but it shifts yearly. Our tours build in flexible days so a shifted forecast doesn't cost you the moment." },
      { q: "Is autumn as good as spring?", a: "Many of our guides prefer it — Kyoto's maple gardens in late November are extraordinary, crowds are gentler, and the light is warmer." },
      { q: "How early must I book?", a: "For sakura: 6–10 months ahead. For autumn: 4–6 months. Later is sometimes possible — ask, we occasionally have held allotments." },
    ],
  },
  ja: {
    seoTitle: "日本の桜・紅葉ツアー | Nippon Tours",
    seoDescription: "完璧なタイミングで巡る日本の季節ツアー——毎日の開花状況を追跡する桜ツアーと、京都・アルプスを巡る紅葉の旅。",
    title: "一瞬だけ咲く日本の傑作を、最高のタイミングで",
    intro: "桜の見頃はわずか1週間。紅葉の最高の輝きも2週間ほどです。私たちの季節限定ツアーは毎日予報を追跡し、あなたが最適な瞬間に最適な場所に立てるようルートを調整します。",
    benefits: [
      { title: "予報に基づくルート調整", desc: "毎朝、開花・紅葉前線を追跡し、旅程を静かに組み替えて見頃のピークに合わせます。" },
      { title: "混雑前の先手予約", desc: "繁忙期のホテルは1年前から確保——2月になってから4月の部屋を取ることはまず不可能です。" },
      { title: "昼と夜、二つの顔", desc: "お城のお堀に映るライトアップされた桜、日没後に浮かび上がる紅葉庭園——季節の日本は一日に二度楽しめます。" },
    ],
    faqs: [
      { q: "桜は正確にいつ咲きますか？", a: "東京・京都では例年3月下旬から4月上旬が見頃ですが、年によって変動します。私たちのツアーは予報の変動に対応できるよう柔軟な日程を組み込んでいます。" },
      { q: "紅葉は桜と同じくらい良いものですか？", a: "多くのガイドはむしろ紅葉派です——11月下旬の京都の紅葉庭園は格別で、混雑も比較的穏やかで、光も温かみがあります。" },
      { q: "どのくらい前に予約すべきですか？", a: "桜は6〜10ヶ月前、紅葉は4〜6ヶ月前が目安です。それより直前でも空きがある場合がありますので、ぜひお問い合わせください。" },
    ],
  },
};

export function SeasonalExperiencesPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <CategoryLanding
      category="Seasonal"
      title={c.title}
      intro={c.intro}
      image={sakuraImg}
      benefits={c.benefits}
      faqs={c.faqs}
    />
  );
}

export const seasonalExperiencesHead = (locale: Locale = "en") =>
  seo({ title: COPY[locale].seoTitle, description: COPY[locale].seoDescription, path: "/seasonal-experiences", locale });

export const Route = createFileRoute("/seasonal-experiences")({
  head: () => seasonalExperiencesHead("en"),
  component: () => <SeasonalExperiencesPage locale="en" />,
});
