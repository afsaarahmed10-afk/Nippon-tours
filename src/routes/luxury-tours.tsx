import { seo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { CategoryLanding } from "@/components/site/CategoryLanding";
import type { Locale } from "@/i18n";
import ryokanImgAsset from "@/assets/tour-ryokan.jpg";
const ryokanImg = ryokanImgAsset;

const COPY: Record<Locale, { seoTitle: string; seoDescription: string; title: string; intro: string; benefits: { title: string; desc: string }[]; faqs: { q: string; a: string }[] }> = {
  en: {
    seoTitle: "Luxury Japan Tours | Premium Travel Experiences",
    seoDescription: "Experience Japan with luxury hotels, private transport, exclusive dining and personalized itineraries.",
    title: "Japan at its most exquisite",
    intro: "Ryokan we've slept in, chefs we know by name, drivers who appear exactly when needed. Luxury here isn't marble — it's flawless, invisible care.",
    benefits: [
      { title: "Inspected, not Googled", desc: "Every property we book has been visited by our team. If the second-floor rooms hear the road, we know — and you won't be in them." },
      { title: "Access beyond money", desc: "Private geiko performances, closed temple gardens, counter seats that never reach booking sites. Relationships built over a decade." },
      { title: "Invisible logistics", desc: "Luggage travels separately. Cars idle exactly where needed. You experience Japan; we choreograph it." },
    ],
    faqs: [
      { q: "What does a luxury Japan trip cost?", a: "Meaningful luxury starts around $800 per person per day, with top-tier ryokan and private guiding throughout from $1,200. We'll show you precisely what each tier buys." },
      { q: "Ryokan or five-star hotel?", a: "Both, ideally — international five-stars in the cities, legendary ryokan in Hakone and Kyoto. The contrast is the luxury." },
      { q: "Can you arrange truly private experiences?", a: "Yes — private tea ceremonies, after-hours temple visits, kaiseki chefs cooking in your villa. Tell us the dream; we've probably done stranger." },
    ],
  },
  ja: {
    seoTitle: "ラグジュアリー日本ツアー | プレミアムな旅行体験",
    seoDescription: "高級ホテル、専属車での移動、特別な食体験、そしてパーソナライズされた旅程で味わう極上の日本旅行。",
    title: "日本を、最も贅沢な形で",
    intro: "私たちが実際に泊まった旅館、名前で呼び合うシェフ、必要な瞬間に必ず現れるドライバー。ここでいう贅沢とは大理石の装飾ではなく、完璧で目立たない気配りです。",
    benefits: [
      { title: "検索ではなく、実際に確かめた宿", desc: "手配する施設はすべて私たちのチームが直接訪問しています。2階の部屋が道路の音を拾うなら、私たちはそれを知っています——お客様をそこにはご案内しません。" },
      { title: "お金だけでは得られないアクセス", desc: "貸切の芸妓の舞、非公開の寺院庭園、予約サイトには決して載らないカウンター席。10年かけて築いた信頼関係だからこそ叶う体験です。" },
      { title: "見えない部分にこそ贅を尽くす", desc: "荷物は別便で移動し、車は必要な場所に必要なタイミングで待機。あなたは日本を味わうだけ——段取りはすべて私たちが。" },
    ],
    faqs: [
      { q: "ラグジュアリーな日本旅行の費用はどれくらいですか？", a: "本格的なラグジュアリー体験は1名1日あたり約800ドルから、最上級の旅館とプライベートガイドを通した旅程は1,200ドルからご案内しています。各グレードで何が得られるか、正確にご説明します。" },
      { q: "旅館と五つ星ホテル、どちらがいいですか？", a: "理想は両方です——都市部では国際的な五つ星ホテル、箱根や京都では伝説的な旅館。そのコントラストこそが贅沢の醍醐味です。" },
      { q: "本当にプライベートな体験も手配できますか？", a: "はい——貸切の茶道体験、閉門後の寺院拝観、専用邸宅での懐石シェフによる料理など。どんな夢でもお聞かせください。これまで数多くの特別なご要望にお応えしてきました。" },
    ],
  },
};

export function LuxuryToursPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <CategoryLanding
      category="Luxury"
      title={c.title}
      intro={c.intro}
      image={ryokanImg}
      benefits={c.benefits}
      faqs={c.faqs}
    />
  );
}

export const luxuryToursHead = (locale: Locale = "en") =>
  seo({ title: COPY[locale].seoTitle, description: COPY[locale].seoDescription, path: "/luxury-tours", locale });

export const Route = createFileRoute("/luxury-tours")({
  head: () => luxuryToursHead("en"),
  component: () => <LuxuryToursPage locale="en" />,
});
