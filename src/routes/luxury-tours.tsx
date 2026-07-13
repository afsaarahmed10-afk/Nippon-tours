import { createFileRoute } from "@tanstack/react-router";
import { CategoryLanding } from "@/components/site/CategoryLanding";
import ryokanImgAsset from "@/assets/tour-ryokan.jpg";
const ryokanImg = ryokanImgAsset;
export const Route = createFileRoute("/luxury-tours")({
  head: () => ({
    meta: [
      { title: "Luxury Japan Tours: Private Onsen, Ryokan & Drivers | Nippon Tours" },
      { name: "description", content: "Luxury Japan tours — hand-picked ryokan with private onsen, kaiseki dining, private drivers and experiences money can't usually buy." },
      { property: "og:title", content: "Luxury Japan Tours | Nippon Tours" },
      { property: "og:description", content: "Hand-picked ryokan, private onsen, kaiseki dining and private drivers." },
      { property: "og:url", content: "/luxury-tours" },
    ],
    links: [{ rel: "canonical", href: "/luxury-tours" }],
  }),
  component: () => (
    <CategoryLanding
      category="Luxury"
      title="Japan at its most exquisite"
      intro="Ryokan we've slept in, chefs we know by name, drivers who appear exactly when needed. Luxury here isn't marble — it's flawless, invisible care."
      image={ryokanImg}
      benefits={[
        { title: "Inspected, not Googled", desc: "Every property we book has been visited by our team. If the second-floor rooms hear the road, we know — and you won't be in them." },
        { title: "Access beyond money", desc: "Private geiko performances, closed temple gardens, counter seats that never reach booking sites. Relationships built over a decade." },
        { title: "Invisible logistics", desc: "Luggage travels separately. Cars idle exactly where needed. You experience Japan; we choreograph it." },
      ]}
      faqs={[
        { q: "What does a luxury Japan trip cost?", a: "Meaningful luxury starts around $800 per person per day, with top-tier ryokan and private guiding throughout from $1,200. We'll show you precisely what each tier buys." },
        { q: "Ryokan or five-star hotel?", a: "Both, ideally — international five-stars in the cities, legendary ryokan in Hakone and Kyoto. The contrast is the luxury." },
        { q: "Can you arrange truly private experiences?", a: "Yes — private tea ceremonies, after-hours temple visits, kaiseki chefs cooking in your villa. Tell us the dream; we've probably done stranger." },
      ]}
    />
  ),
});
