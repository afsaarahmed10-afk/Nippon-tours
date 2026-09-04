export const SITE = {
  name: "Nippon Tours",
  url: "https://nippon-tours.com",
  description:
    "Private, luxury and custom Japan tours designed by local experts.",

  defaultImage: "/favicon.png",

  twitter: "@nippon_tours",
};

export function absoluteUrl(path = "") {
  return `${SITE.url}${path}`;
}

/**
 * `path` is always the canonical English path (e.g. "/tours/kyoto-day-tour"),
 * regardless of `locale` — this mirrors how <LocaleLink> takes canonical paths.
 * The function derives the locale-specific URL and hreflang alternates from it.
 */
export function seo({
  title,
  description,
  image,
  path = "",
  locale = "en",
}: {
  title: string;
  description: string;
  image?: string;
  path?: string;
  locale?: "en" | "ja";
}) {
  const enPath = path;
  const jaPath = enPath === "/" ? "/ja" : `/ja${enPath}`;
  const localizedPath = locale === "ja" ? jaPath : enPath;
  const url = absoluteUrl(localizedPath);

  return {
    title,
    meta: [
      {
        name: "description",
        content: description,
      },

      {
        property: "og:title",
        content: title,
      },

      {
        property: "og:description",
        content: description,
      },

      {
        property: "og:image",
        content: image || SITE.defaultImage,
      },

      {
        property: "og:url",
        content: url,
      },

      {
        property: "og:type",
        content: "website",
      },

      {
        name: "twitter:card",
        content: "summary_large_image",
      },

      {
        name: "twitter:title",
        content: title,
      },

      {
        name: "twitter:description",
        content: description,
      },

      {
        name: "twitter:image",
        content: image || SITE.defaultImage,
      },
    ],

    links: [
      {
        rel: "canonical",
        href: url,
      },
      {
        rel: "alternate",
        hrefLang: "en",
        href: absoluteUrl(enPath),
      },
      {
        rel: "alternate",
        hrefLang: "ja",
        href: absoluteUrl(jaPath),
      },
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: absoluteUrl(enPath),
      },
    ],
  };
}