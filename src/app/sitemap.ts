import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://vidiosa.com",
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
