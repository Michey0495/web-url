import type { MetadataRoute } from "next";
import { SCHEMA_TYPES } from "@/lib/schema-types";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://schema.ezoai.jp";

  const schemaPages = SCHEMA_TYPES.map((type) => ({
    url: `${baseUrl}/generate/${type.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/types`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...schemaPages,
    {
      url: `${baseUrl}/guides/llmo`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/aeo`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
