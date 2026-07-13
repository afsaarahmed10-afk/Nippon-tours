import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Clock } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { CTABand } from "@/components/site/PageHero";
import { InquiryForm } from "@/components/site/InquiryForm";
import { blogPostBySlugQueryOptions, blogPostsQueryOptions } from "@/lib/queries";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params, context }) => {
    const post = await context.queryClient.ensureQueryData(blogPostBySlugQueryOptions(params.slug));
    if (!post) throw notFound();
    context.queryClient.prefetchQuery(blogPostsQueryOptions());
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Post not found — Nippon Tours" }, { name: "robots", content: "noindex" }] };
    }
    const { post } = loaderData;
    const title = post.seo_title || `${post.title} | Nippon Tours Blog`;
    const description =
      post.seo_description ||
      post.excerpt ||
      `${post.title} — from the Nippon Tours travel blog.`;
    const url = `/blog/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(post.cover_image ? [{ property: "og:image", content: post.cover_image }] : []),
        ...(post.published_at ? [{ property: "article:published_time", content: post.published_at }] : []),
        ...(post.category ? [{ property: "article:section", content: post.category }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        ...(post.cover_image ? [{ name: "twitter:image", content: post.cover_image }] : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description,
            image: post.cover_image,
            datePublished: post.published_at,
            author: { "@type": "Organization", name: post.author || "Nippon Tours" },
            publisher: { "@type": "Organization", name: "Nippon Tours" },
            articleSection: post.category ?? undefined,
            keywords: post.tags?.length ? post.tags.join(", ") : undefined,
            mainEntityOfPage: url,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "/blog" },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-40 text-center">
      <h1 className="font-display text-3xl font-semibold">Post not found</h1>
      <Link to="/blog" className="btn-accent mt-6">Back to the blog</Link>
    </div>
  ),
  component: PostPage,
});

// Very small markdown-ish renderer: handles ## headings and paragraphs.
function renderBody(md: string) {
  const blocks = md.split(/\n{2,}/);
  return blocks.map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="mt-8 font-display text-2xl font-semibold text-foreground">
          {block.slice(3)}
        </h2>
      );
    }
    if (block.startsWith("### ")) {
      return (
        <h3 key={i} className="mt-6 font-display text-xl font-semibold text-foreground">
          {block.slice(4)}
        </h3>
      );
    }
    return (
      <p key={i} className="mt-4 leading-relaxed text-muted-foreground">
        {block}
      </p>
    );
  });
}

function PostPage() {
  const { slug } = Route.useParams();
  const { data: post } = useSuspenseQuery(blogPostBySlugQueryOptions(slug));
  const { data: allPosts } = useSuspenseQuery(blogPostsQueryOptions());
  if (!post) return null;
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <section className="relative flex min-h-[46vh] items-end overflow-hidden bg-ink pt-28 pb-14">
        {post.cover_image && (
          <img src={post.cover_image} alt={post.title} width={1920} height={1080} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        )}
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-4xl px-6">
          <nav aria-label="Breadcrumb" className="animate-hero-1 text-sm text-white/70">
            <Link to="/" className="hover:text-white">Home</Link> / <Link to="/blog" className="hover:text-white">Blog</Link>
            {post.category && <> / <span className="text-white">{post.category}</span></>}
          </nav>
          <h1 className="animate-hero-2 mt-4 font-display text-3xl font-semibold text-white sm:text-5xl">{post.title}</h1>
          {post.published_at && (
            <p className="animate-hero-3 mt-4 inline-flex items-center gap-1.5 text-sm text-white/80">
              <Clock className="h-4 w-4" />{" "}
              {new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          )}
        </div>
      </section>

      <article className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="prose-travel max-w-none">
          <Reveal>{renderBody(post.body || "")}</Reveal>
        </div>
        <aside className="space-y-4 self-start lg:sticky lg:top-28">
          <Reveal className="rounded-3xl bg-ink p-7 text-ink-foreground">
            <p className="font-display text-lg font-semibold">Experience this yourself</p>
            <p className="mt-2 text-sm text-ink-foreground/70">Free consultation with a Japan travel designer.</p>
            <div className="mt-4">
              <InquiryForm compact dark context={`blog-${post.slug}`} />
            </div>
          </Reveal>
        </aside>
      </article>

      {related.length > 0 && (
        <section className="bg-secondary py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-display text-2xl font-semibold">Keep reading</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 90}>
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="card-lift img-zoom group block overflow-hidden rounded-3xl bg-card">
                    <div className="aspect-[16/9] overflow-hidden bg-muted">
                      {p.cover_image && (
                        <img src={p.cover_image} alt={p.title} width={1024} height={576} loading="lazy" className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="p-5">
                      {p.category && <p className="text-xs font-bold uppercase tracking-wider text-accent">{p.category}</p>}
                      <h3 className="mt-1 font-display text-base font-semibold leading-snug group-hover:text-accent">{p.title}</h3>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
