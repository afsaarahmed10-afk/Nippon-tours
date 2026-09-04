import { seo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { CategoryLanding } from "@/components/site/CategoryLanding";
import type { Locale } from "@/i18n";
import kyotoImgAsset from "@/assets/dest-kyoto.jpg";
const kyotoImg = kyotoImgAsset;

const COPY: Record<Locale, { seoTitle: string; seoDescription: string; title: string; intro: string; benefits: { title: string; desc: string }[]; faqs: { q: string; a: string }[] }> = {
  en: {
    seoTitle: "Japan Group Tours | Small Group Holidays",
    seoDescription: "Join expertly guided small group tours across Japan featuring Tokyo, Kyoto, Osaka, Mount Fuji and more.",
    title: "Small groups. Big days.",
    intro: "Capped at 12 guests, our group tours keep the intimacy of private travel at a friendlier price — with fellow travellers who often leave as friends.",
    benefits: [
      { title: "Never a bus crowd", desc: "Twelve guests maximum means real conversations with your guide and no flag-following through temples." },
      { title: "Best value per wow", desc: "Shared guiding and logistics bring expert-led travel to a price solo and couple travellers love." },
      { title: "Instant travel companions", desc: "Dinner recommendations are better shared. Many of our groups still have active group chats years later." },
    ],
    faqs: [
      { q: "What is the maximum group size?", a: "Twelve guests on most tours, ten on food tours — small enough for every restaurant, teahouse and workshop we love." },
      { q: "I'm travelling solo. Will I fit in?", a: "Around 40% of our group guests are solo travellers. The small format makes joining in effortless." },
      { q: "Are departures guaranteed?", a: "Once a tour has four confirmed guests it's guaranteed to run — and we tell you the status before you pay anything." },
    ],
  },
  ja: {
    seoTitle: "日本の少人数グループツアー | Nippon Tours",
    seoDescription: "東京・京都・大阪・富士山など、日本各地を巡る少人数制の熟練ガイド付きグループツアーにご参加ください。",
    title: "少人数だからこそ、忘れられない一日に。",
    intro: "最大12名までの少人数制グループツアーは、プライベート旅行のような親密さをより手頃な価格で。旅の終わりには友人になっている、そんな出会いも。",
    benefits: [
      { title: "バスツアーの窮屈さとは無縁", desc: "最大12名だからこそ、ガイドとの本当の会話が生まれ、旗について歩くだけの寺院巡りにはなりません。" },
      { title: "満足度に見合った価格", desc: "ガイドや移動をシェアすることで、専門家同行の旅を、おひとり様やカップルにも嬉しい価格で。" },
      { title: "旅の仲間ができる", desc: "ディナーのおすすめは、誰かと分かち合う方が楽しいもの。数年経っても連絡を取り合うグループも少なくありません。" },
    ],
    faqs: [
      { q: "最大人数は何名ですか？", a: "ほとんどのツアーで12名まで、フードツアーは10名までとしています。お気に入りのレストラン、茶室、工房を全員でゆったり楽しめる規模です。" },
      { q: "ひとり旅ですが参加しても大丈夫ですか？", a: "グループツアーのお客様の約40%はおひとり様です。少人数制だからこそ、自然に打ち解けていただけます。" },
      { q: "催行は確実に行われますか？", a: "4名の予約が確定した時点で催行確定となります。お支払い前に催行状況を必ずお伝えします。" },
    ],
  },
};

export function GroupToursPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <CategoryLanding
      category="Group"
      title={c.title}
      intro={c.intro}
      image={kyotoImg}
      benefits={c.benefits}
      faqs={c.faqs}
    />
  );
}

export const groupToursHead = (locale: Locale = "en") =>
  seo({ title: COPY[locale].seoTitle, description: COPY[locale].seoDescription, path: "/group-tours", locale });

export const Route = createFileRoute("/group-tours")({
  head: () => groupToursHead("en"),
  component: () => <GroupToursPage locale="en" />,
});
