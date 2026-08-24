import type { MetadataRoute } from "next";
import { services, guides } from "@/lib/content";
import { regionList } from "@/lib/regions";
import { SITE_URL } from "@/lib/site";

/**
 * 올바른청소 XML Sitemap
 *
 * Next.js App Router가 이 파일을 /sitemap.xml 로 자동 노출합니다.
 * 지역/서비스/가이드 데이터가 추가되면 사이트맵에도 자동 반영됩니다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const fixedPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/cleaning`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/service`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/guide`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = Object.keys(services).map((slug) => ({
    url: `${SITE_URL}/service/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const guidePages: MetadataRoute.Sitemap = Object.keys(guides).map((slug) => ({
    url: `${SITE_URL}/guide/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // 시·도 허브 페이지: /cleaning/seoul, /cleaning/busan ...
  const sidoSlugs = [...new Set(regionList.map((region) => region.slug.split("/")[0]))];
  const sidoPages: MetadataRoute.Sitemap = sidoSlugs.map((slug) => ({
    url: `${SITE_URL}/cleaning/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 모든 지역 상세 페이지: lib/regions.ts에 등록된 지역을 자동 포함
  const regionPages: MetadataRoute.Sitemap = regionList.map((region) => ({
    url: `${SITE_URL}/cleaning/${region.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // URL 중복을 방지한 뒤 최종 사이트맵 반환
  const allPages = [
    ...fixedPages,
    ...servicePages,
    ...guidePages,
    ...sidoPages,
    ...regionPages,
  ];

  return Array.from(new Map(allPages.map((page) => [page.url, page])).values());
}
