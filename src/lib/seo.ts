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

export function seo({
  title,
  description,
  image,
  path,
}: {
  title: string;
  description: string;
  image?: string;
  path?: string;
}) {
  const url = absoluteUrl(path || "");

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
    ],
  };
}