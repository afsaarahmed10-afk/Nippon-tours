import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { DESTINATIONS } from "@/data/destinations";
import { PageHero, CTABand } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import kyotoImgAsset from "@/assets/dest-kyoto.jpg";
const kyotoImg = kyotoImgAsset;
export const Route = createFileRoute("/destinations/")({
  head: () => ({
    meta: [
      { title: "Japan Destinations: Tokyo, Kyoto, Osaka & More | Nippon Tours" },
      { name: "description", content: "Explore Japan's best destinations — Tokyo, Kyoto, Osaka, Hakone, Hiroshima and the Japanese Alps — with local expert guides." },
      { property: "og:title", content: "Japan Destinations | Nippon Tours" },
      { property: "og:description", content: "Tokyo, Kyoto, Osaka, Hakone, Hiroshima and the Japanese Alps — explored with local experts." },
      { property: "og:url", content: "/destinations" },
    ],
    links: [{ rel: "canonical", href: "/destinations" }],
  }),
  component: DestinationsPage,
});

function DestinationsPage() {
  return (
    <>
      <PageHero
        label="Destinations"
        title="Six Japans, waiting for you"
        subtitle="Every region has its own light, food and rhythm. Start where your curiosity points — we'll connect the dots."
        image={kyotoImg}
      />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {DESTINATIONS.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 2) * 100}>
              <Link
                to="/destinations/$slug"
                params={{ slug: d.slug }}
                className="card-lift img-zoom group grid overflow-hidden rounded-3xl bg-card sm:grid-cols-[minmax(0,1fr)_auto]"
              >
                <div className="order-2 flex flex-col justify-center p-7 sm:order-1">
                  <p className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-accent">
                    <MapPin className="h-3.5 w-3.5" /> {d.region}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold group-hover:text-accent">{d.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.tagline}</p>
                  <p className="mt-4 text-sm font-bold text-accent">Explore {d.name} →</p>
                </div>
                <div className="order-1 aspect-[4/3] overflow-hidden sm:order-2 sm:h-full sm:w-56 lg:w-72">
                  <img src={d.image} alt={`${d.name}, Japan`} width={1024} height={768} loading="lazy" className="h-full w-full object-cover" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CTABand title="Can't decide where to start?" subtitle="Tell us what excites you and we'll design the perfect route between them." />
    </>
  );
}
