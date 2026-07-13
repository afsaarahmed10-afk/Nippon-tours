import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { GUIDES } from "@/data/guides";
import { PageHero, CTABand } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import takayamaImgAsset from "@/assets/dest-takayama.jpg";
const takayamaImg = takayamaImgAsset;
export const Route = createFileRoute("/travel-guides/")({
  head: () => ({
    meta: [
      { title: "Japan Travel Guides: Visa, JR Pass, Itineraries | Nippon Tours" },
      { name: "description", content: "Free expert Japan travel guides — best time to visit, visa requirements, JR Pass advice, budgets and the perfect 7-day itinerary." },
      { property: "og:title", content: "Japan Travel Guides | Nippon Tours" },
      { property: "og:description", content: "Best time to visit, visas, JR Pass, budgets and itineraries — free expert guides." },
      { property: "og:url", content: "/travel-guides" },
    ],
    links: [{ rel: "canonical", href: "/travel-guides" }],
  }),
  component: GuidesPage,
});

function GuidesPage() {
  return (
    <>
      <PageHero
        label="Travel guides"
        title="Everything you need to know before Japan"
        subtitle="Written by our guides, updated constantly, free forever. The same advice we give paying guests."
        image={takayamaImg}
      />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((g, i) => (
            <Reveal key={g.slug} delay={(i % 3) * 90}>
              <Link
                to="/travel-guides/$slug"
                params={{ slug: g.slug }}
                className="card-lift img-zoom group flex h-full flex-col overflow-hidden rounded-3xl bg-card"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={g.image} alt={g.title} width={1024} height={576} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-lg font-semibold leading-snug group-hover:text-accent">{g.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{g.description}</p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {g.readTime}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CTABand title="Rather have a human answer?" subtitle="Skip the research rabbit hole — a free consultation answers everything in one conversation." />
    </>
  );
}
