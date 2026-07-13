import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { DESTINATIONS } from "@/data/destinations";
import { TOURS } from "@/data/tours";
import { GUIDES } from "@/data/guides";
import { POSTS } from "@/data/posts";
import { SERVICES } from "@/data/services";

const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/destinations", changefreq: "weekly", priority: "0.9" },
          { path: "/tours", changefreq: "weekly", priority: "0.9" },
          { path: "/services", changefreq: "monthly", priority: "0.9" },
          { path: "/private-tours", changefreq: "monthly", priority: "0.8" },
          { path: "/group-tours", changefreq: "monthly", priority: "0.8" },
          { path: "/luxury-tours", changefreq: "monthly", priority: "0.8" },
          { path: "/seasonal-experiences", changefreq: "monthly", priority: "0.8" },
          { path: "/plan-my-trip", changefreq: "monthly", priority: "0.9" },
          { path: "/travel-guides", changefreq: "weekly", priority: "0.8" },
          { path: "/blog", changefreq: "weekly", priority: "0.7" },
          { path: "/about", changefreq: "monthly", priority: "0.6" },
          { path: "/reviews", changefreq: "monthly", priority: "0.7" },
          { path: "/faqs", changefreq: "monthly", priority: "0.6" },
          { path: "/contact", changefreq: "monthly", priority: "0.8" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
          ...SERVICES.map((s) => ({ path: `/services/${s.slug}`, changefreq: "monthly" as const, priority: "0.7" })),
          ...DESTINATIONS.map((d) => ({ path: `/destinations/${d.slug}`, changefreq: "monthly" as const, priority: "0.8" })),
          ...TOURS.map((t) => ({ path: `/tours/${t.slug}`, changefreq: "monthly" as const, priority: "0.8" })),
          ...GUIDES.map((g) => ({ path: `/travel-guides/${g.slug}`, changefreq: "monthly" as const, priority: "0.7" })),
          ...POSTS.map((p) => ({ path: `/blog/${p.slug}`, changefreq: "monthly" as const, priority: "0.6" })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
