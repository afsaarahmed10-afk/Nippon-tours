import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Clock } from "lucide-react";
import { PageHero, CTABand } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { LocaleLink } from "@/components/site/LocaleLink";
import { blogPostsQueryOptions } from "@/lib/queries";
import { seo } from "@/lib/seo";
import { type Locale } from "@/i18n";
import heroOsaka from "@/assets/dest-osaka.jpg";

const HERO = heroOsaka;

const COPY: Record<Locale, {
  label: string;
  title: string;
  subtitle: string;
  allCategory: string;
  filterAria: string;
  emptyState: string;
  dateLocale: string;
}> = {
  en: {
    label: "Blog",
    title: "From our guides' notebooks",
    subtitle: "The etiquette, the ramen, the festivals, the places we don't put on postcards.",
    allCategory: "All",
    filterAria: "Filter posts by category",
    emptyState: "No posts published in this category yet.",
    dateLocale: "en-US",
  },
  ja: {
    label: "ブログ",
    title: "現地ガイドのノートより",
    subtitle: "マナー、ラーメン、お祭り、そして絵葉書には載らない場所の話。",
    allCategory: "すべて",
    filterAria: "カテゴリーで記事を絞り込む",
    emptyState: "このカテゴリーにはまだ記事が公開されていません。",
    dateLocale: "ja-JP",
  },
};

export const blogIndexHead = (locale: Locale = "en") =>
  seo(
    locale === "ja"
      ? {
          title: "日本旅行ブログ：文化・グルメ・穴場スポット | Nippon Tours",
          description: "現地ガイドによる体験談と実用的な知恵——日本文化、グルメ、お祭り、穴場スポット、季節ごとの旅行のコツをお届けします。",
          path: "/blog",
          locale: "ja",
        }
      : {
          title: "Japan Travel Blog: Culture, Food & Hidden Gems | Nippon Tours",
          description: "Stories and practical wisdom from our guides — Japanese culture, food, festivals, hidden gems and seasonal travel tips.",
          path: "/blog",
          locale: "en",
        },
  );

export const blogIndexLoader = ({ context, locale = "en" as Locale }: { context: { queryClient: import("@tanstack/react-query").QueryClient }; locale?: Locale }) => {
  context.queryClient.ensureQueryData(blogPostsQueryOptions(locale));
};

export const Route = createFileRoute("/blog/")({
  loader: ({ context }) => blogIndexLoader({ context, locale: "en" }),
  head: () => blogIndexHead("en"),
  component: () => <BlogPage locale="en" />,
});

export function BlogPage({ locale }: { locale: Locale }) {
  const { data: posts } = useSuspenseQuery(blogPostsQueryOptions(locale));
  const c = COPY[locale];
  const [cat, setCat] = useState<string>(c.allCategory);

  const cats = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.category && set.add(p.category));
    return [c.allCategory, ...Array.from(set)];
  }, [posts, c.allCategory]);

  const filtered = cat === c.allCategory ? posts : posts.filter((p) => p.category === cat);

  return (
    <>
      <PageHero label={c.label} title={c.title} subtitle={c.subtitle} image={HERO} />
      <section className="mx-auto max-w-7xl px-6 py-14">
        {cats.length > 1 && (
          <div className="flex flex-wrap gap-2" role="tablist" aria-label={c.filterAria}>
            {cats.map((cName) => (
              <button
                key={cName}
                role="tab"
                aria-selected={cat === cName}
                onClick={() => setCat(cName)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                  cat === cName ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-muted"
                }`}
              >
                {cName}
              </button>
            ))}
          </div>
        )}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 90}>
              <LocaleLink
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
                      ? new Date(p.published_at).toLocaleDateString(c.dateLocale, { month: "short", day: "numeric", year: "numeric" })
                      : ""}
                  </p>
                </div>
              </LocaleLink>
            </Reveal>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">{c.emptyState}</p>
        )}
      </section>
      <CTABand />
    </>
  );
}
