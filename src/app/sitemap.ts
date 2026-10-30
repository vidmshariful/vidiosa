import type { MetadataRoute } from "next";

import { ROLES } from "@/content/careers";

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
    ...ROLES.map((role) => ({
      url: `${SITE}/careers/${role.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
