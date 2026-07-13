import { createFileRoute } from "@tanstack/react-router";
import { CategoryLanding } from "@/components/site/CategoryLanding";
import tokyoImgAsset from "@/assets/dest-tokyo.jpg";
const tokyoImg = tokyoImgAsset;
export const Route = createFileRoute("/private-tours")({
  head: () => ({
    meta: [
      { title: "Private Japan Tours with Licensed Local Guides | Nippon Tours" },
      { name: "description", content: "Private Japan tours built around you — dedicated licensed guides, flexible pacing, skip-the-line access. Tokyo, Kyoto, Osaka and beyond." },
      { property: "og:title", content: "Private Japan Tours | Nippon Tours" },
      { property: "og:description", content: "Your guide, your pace, your Japan. Private tours across Tokyo, Kyoto, Osaka and beyond." },
      { property: "og:url", content: "/private-tours" },
    ],
    links: [{ rel: "canonical", href: "/private-tours" }],
  }),
  component: () => (
    <CategoryLanding
      category="Private"
      title="Your guide. Your pace. Your Japan."
      intro="A dedicated licensed guide, a route built around your interests, and days that flex when curiosity strikes. This is Japan without compromise."
      image={tokyoImg}
      benefits={[
        { title: "Completely flexible", desc: "Linger at the temple you love, skip the shop you don't. Private means the schedule serves you." },
        { title: "Doors that open privately", desc: "Maiko dinners, tea masters, closed-door workshops — access that group tours simply can't arrange." },
        { title: "Perfect for milestones", desc: "Honeymoons, anniversaries, multi-generation family trips — occasions deserve undivided attention." },
      ]}
      faqs={[
        { q: "How much does a private tour of Japan cost?", a: "Full-day private guiding starts at $180, and complete multi-day private packages from about $350 per person per day including 4-star hotels, rail and guiding. Every quote is itemised." },
        { q: "Can the itinerary change mid-trip?", a: "Yes — that's the point of private. Weather, energy levels, sudden obsessions with Japanese bakeries: your guide adapts in real time." },
        { q: "Are private tours suitable for families?", a: "They're our most popular family format. Guides adjust pace for children and grandparents alike, and we build in breaks, playgrounds and kid-approved food." },
      ]}
    />
  ),
});
