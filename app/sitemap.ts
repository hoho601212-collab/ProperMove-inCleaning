import type { MetadataRoute } from "next";
import { services, guides } from "@/lib/content";
import { regionList } from "@/lib/regions";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://proper-move-in-cleaning.vercel.app";
  const fixed = ["", "/estimate", "/service", "/cleaning", "/guide", "/privacy", "/terms"];
  const service = Object.keys(services).map((slug) => `/service/${slug}`);
  const guide = Object.keys(guides).map((slug) => `/guide/${slug}`);
  const regionPages = regionList.map((region) => `/cleaning/${region.slug}`);

  return [...fixed, ...service, ...guide, ...regionPages].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.7 : 1,
  }));
}
