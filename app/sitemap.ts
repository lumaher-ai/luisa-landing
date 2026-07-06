import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://luisahernandez.dev",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
