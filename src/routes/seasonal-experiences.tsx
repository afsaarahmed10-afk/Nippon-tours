import { createFileRoute } from "@tanstack/react-router";
import { CategoryLanding } from "@/components/site/CategoryLanding";
import sakuraImgAsset from "@/assets/tour-sakura.jpg";
const sakuraImg = sakuraImgAsset;
export const Route = createFileRoute("/seasonal-experiences")({
  head: () => ({
    meta: [
      { title: "Cherry Blossom & Autumn Leaves Tours in Japan | Nippon Tours" },
      { name: "description", content: "Seasonal Japan tours timed to perfection — cherry blossom tours with daily bloom tracking and autumn foliage journeys through Kyoto and the Alps." },
      { property: "og:title", content: "Seasonal Japan Experiences | Nippon Tours" },
      { property: "og:description", content: "Cherry blossoms and autumn fire — seasonal tours timed to perfection." },
      { property: "og:url", content: "/seasonal-experiences" },
    ],
    links: [{ rel: "canonical", href: "/seasonal-experiences" }],
  }),
  component: () => (
    <CategoryLanding
      category="Seasonal"
      title="Japan's fleeting masterpieces, timed to perfection"
      intro="Peak sakura lasts a week. Autumn's best light, a fortnight. Our seasonal tours track the forecasts daily and adjust routing so you're standing in the right place at the right hour."
      image={sakuraImg}
      benefits={[
        { title: "Forecast-driven routing", desc: "We track the blossom and foliage fronts every morning and quietly re-sequence your days to hit the peak." },
        { title: "Booked before the surge", desc: "We hold peak-season hotel allotments a year out — rooms you simply can't get in February for April." },
        { title: "The night versions", desc: "Illuminated sakura over castle moats, maple gardens lit after dark — seasonal Japan is best twice a day." },
      ]}
      faqs={[
        { q: "When exactly do cherry blossoms bloom?", a: "Tokyo and Kyoto typically peak late March to early April, but it shifts yearly. Our tours build in flexible days so a shifted forecast doesn't cost you the moment." },
        { q: "Is autumn as good as spring?", a: "Many of our guides prefer it — Kyoto's maple gardens in late November are extraordinary, crowds are gentler, and the light is warmer." },
        { q: "How early must I book?", a: "For sakura: 6–10 months ahead. For autumn: 4–6 months. Later is sometimes possible — ask, we occasionally have held allotments." },
      ]}
    />
  ),
});
