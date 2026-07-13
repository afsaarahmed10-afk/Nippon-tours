import { createFileRoute } from "@tanstack/react-router";
import { CategoryLanding } from "@/components/site/CategoryLanding";
import kyotoImgAsset from "@/assets/dest-kyoto.jpg";
const kyotoImg = kyotoImgAsset;
export const Route = createFileRoute("/group-tours")({
  head: () => ({
    meta: [
      { title: "Small Group Japan Tours (Max 12 Guests) | Nippon Tours" },
      { name: "description", content: "Small group Japan tours capped at 12 guests — expert guides, honest prices, and travel companions worth keeping. Kyoto, food tours, Hiroshima and more." },
      { property: "og:title", content: "Small Group Japan Tours | Nippon Tours" },
      { property: "og:description", content: "Capped at 12 guests. Expert guides, honest prices, great company." },
      { property: "og:url", content: "/group-tours" },
    ],
    links: [{ rel: "canonical", href: "/group-tours" }],
  }),
  component: () => (
    <CategoryLanding
      category="Group"
      title="Small groups. Big days."
      intro="Capped at 12 guests, our group tours keep the intimacy of private travel at a friendlier price — with fellow travellers who often leave as friends."
      image={kyotoImg}
      benefits={[
        { title: "Never a bus crowd", desc: "Twelve guests maximum means real conversations with your guide and no flag-following through temples." },
        { title: "Best value per wow", desc: "Shared guiding and logistics bring expert-led travel to a price solo and couple travellers love." },
        { title: "Instant travel companions", desc: "Dinner recommendations are better shared. Many of our groups still have active group chats years later." },
      ]}
      faqs={[
        { q: "What is the maximum group size?", a: "Twelve guests on most tours, ten on food tours — small enough for every restaurant, teahouse and workshop we love." },
        { q: "I'm travelling solo. Will I fit in?", a: "Around 40% of our group guests are solo travellers. The small format makes joining in effortless." },
        { q: "Are departures guaranteed?", a: "Once a tour has four confirmed guests it's guaranteed to run — and we tell you the status before you pay anything." },
      ]}
    />
  ),
});
