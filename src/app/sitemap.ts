import type { MetadataRoute } from "next";

const SITE = "https://vidiosa.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE}/careers`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
