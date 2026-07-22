import { Schema } from "@/components/seo/Schema";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StickyCTA } from "@/components/site/StickyCTA";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-accent">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-accent"
          >
            Try again
          </button>
          <a href="/" className="btn-outline">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nippon Tours — Private & Luxury Japan Tours with Local Experts" },
      {
        name: "description",
        content:
          "Licensed Japan tour operator crafting private tours, small group tours and luxury journeys. Free consultation, custom itineraries, 24/7 support.",
      },
      { name: "author", content: "Nippon Tours" },
      { property: "og:title", content: "Nippon Tours — Private & Luxury Japan Tours" },
      {
        property: "og:description",
        content: "Japan, crafted around you. Private, group and luxury tours with licensed local guides.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Nippon Tours" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..600&family=Karla:wght@400;500;600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["TravelAgency", "LocalBusiness", "Organization"],
          name: "Nippon Tours",
          description: "Licensed Japan tour operator crafting private, group and luxury tours across Japan.",
          url: "https://nippon-tours.com",
          logo: "https://nippon-tours.com/favicon.png",
          image: "https://nippon-tours.com/og-image.jpg",
          areaServed: { "@type": "Country", name: "Japan" },
          telephone: "+81-80-5500-2929",
          email: "info@nippon-tours.com",
          priceRange: "$$-$$$$",
          address: { "@type": "PostalAddress", addressCountry: "JP" },
          sameAs: [
            "https://www.instagram.com/nippontours5/",
            "https://www.facebook.com/people/Nippon-tours/61571228811021/",
          ],
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1900" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Nippon Tours",
          url: "https://nippon-tours.com",
          potentialAction: {
            "@type": "SearchAction",
            target: "/tours?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-VNLVG07VHL"
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VNLVG07VHL');
            `,
          }}
        />
      </head>

      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <main className="pb-16 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <StickyCTA />
    </QueryClientProvider>
  );
}
