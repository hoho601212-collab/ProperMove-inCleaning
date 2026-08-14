import type { MetadataRoute } from "next";
import { services, guides } from "@/lib/content";
import { regionList } from "@/lib/regions";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // 기존 내부 견적 페이지는 외부 문의 연동 기간 동안 사이트맵에서 임시 제외합니다.
  // const legacyEstimatePath = "/estimate";
  const fixed = ["", "/service", "/cleaning", "/guide", "/privacy", "/terms"];
  const service = Object.keys(services).map((slug) => `/service/${slug}`);
  const guide = Object.keys(guides).map((slug) => `/guide/${slug}`);
  const regionPages = regionList.map((region) => `/cleaning/${region.slug}`);

  return [...fixed, ...service, ...guide, ...regionPages].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.7 : 1,
  }));
}
