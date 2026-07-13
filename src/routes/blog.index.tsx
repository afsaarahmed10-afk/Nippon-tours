import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Clock } from "lucide-react";
import { PageHero, CTABand } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { blogPostsQueryOptions } from "@/lib/queries";
import heroOsaka from "@/assets/dest-osaka.jpg";

const HERO = heroOsaka;

export const Route = createFileRoute("/blog/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(blogPostsQueryOptions());
  },
  head: () => ({
    meta: [
      { title: "Japan Travel Blog: Culture, Food & Hidden Gems | Nippon Tours" },
      { name: "description", content: "Stories and practical wisdom from our guides — Japanese culture, food, festivals, hidden gems and seasonal travel tips." },
      { property: "og:title", content: "Japan Travel Blog | Nippon Tours" },
      { property: "og:description", content: "Culture, food, festivals and hidden gems — from our guides' notebooks." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { data: posts } = useSuspenseQuery(blogPostsQueryOptions());
  const [cat, setCat] = useState<string>("All");

  const cats = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.category && set.add(p.category));
    return ["All", ...Array.from(set)];
  }, [posts]);

  const filtered = cat === "All" ? posts : posts.filter((p) => p.category === cat);

  return (
    <>
      <PageHero
        label="Blog"
        title="From our guides' notebooks"
        subtitle="The etiquette, the ramen, the festivals, the places we don't put on postcards."
        image={HERO}
      />
      <section className="mx-auto max-w-7xl px-6 py-14">
        {cats.length > 1 && (
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter posts by category">
            {cats.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                  cat === c ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 90}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="card-lift img-zoom group flex h-full flex-col overflow-hidden rounded-3xl bg-card"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  {p.cover_image && (
                    <img src={p.cover_image} alt={p.title} width={1024} height={576} loading="lazy" className="h-full w-full object-cover" />
                  )}
                  {p.category && (
                    <span className="absolute left-4 top-4 rounded-full bg-card/90 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur">
                      {p.category}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-lg font-semibold leading-snug group-hover:text-accent">{p.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />{" "}
                    {p.published_at
                      ? new Date(p.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                      : ""}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">No posts published in this category yet.</p>
        )}
      </section>
      <CTABand />
    </>
  );
}
