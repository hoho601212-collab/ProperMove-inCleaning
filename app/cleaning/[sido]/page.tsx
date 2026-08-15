import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { regionList } from "@/lib/regions";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ sido: string }> };
const sidoSlugs = [...new Set(regionList.map(region => region.slug.split("/")[0]))];

export function generateStaticParams() { return sidoSlugs.map(sido => ({ sido })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sido } = await params; const items = regionList.filter(region => region.slug.startsWith(`${sido}/`)); if (!items.length) return {};
  const city = items[0].city; const title = `${city} 지역별 입주청소 가이드`;
  return { title, description: `${city}의 주요 시·구와 생활권별 주거 형태, 청소 범위, 출입·주차 조건을 비교하세요.`, alternates: { canonical: `/cleaning/${sido}` }, openGraph: { title, description: `${city} 주요 지역의 입주청소 준비사항을 생활권별로 확인하세요.` } };
}

export default async function SidoPage({ params }: Props) {
  const { sido } = await params; const items = regionList.filter(region => region.slug.startsWith(`${sido}/`)); if (!items.length) notFound(); const city = items[0].city;
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "지역별 입주청소", item: `${SITE_URL}/cleaning` }, { "@type": "ListItem", position: 3, name: city, item: `${SITE_URL}/cleaning/${sido}` }] };
  const collectionSchema = { "@context": "https://schema.org", "@type": "CollectionPage", name: `${city} 지역별 입주청소 가이드`, url: `${SITE_URL}/cleaning/${sido}`, inLanguage: "ko-KR", mainEntity: { "@type": "ItemList", numberOfItems: items.length, itemListElement: items.map((region, index) => ({ "@type": "ListItem", position: index + 1, name: `${region.district} 입주청소`, url: `${SITE_URL}/cleaning/${region.slug}` })) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} /><section className="pageHero"><div className="shell"><nav className="breadcrumbs" aria-label="현재 위치"><Link href="/">홈</Link><span>›</span><Link href="/cleaning">지역별 입주청소</Link><span>›</span><b>{city}</b></nav><span className="eyebrow">{sido.toUpperCase()} LOCAL HUB</span><h1>{city} 지역별 입주청소</h1><p>{city}에서 공개된 지역과 대표 생활권을 한곳에서 확인하세요.</p></div></section><section className="section shell"><div className="hubIntro"><h2>{city} 주요 지역을<br/>생활권부터 비교하세요.</h2><p>지역명만으로 가격을 단정하지 않고 공동주택·오피스텔·저층 주거와 출입·주차 조건을 구분합니다. 실제 주소와 건물 상태를 기준으로 최종 범위를 확인하세요.</p></div><div className="sidoRegionGrid">{items.map(region => <article key={region.slug}><span>{region.city}</span><h2>{region.district} 입주청소</h2><p>{region.description}</p><div className="sidoZones" aria-label={`${region.district} 주요 생활권`}>{region.zones.map(zone => <span key={zone.name}>{zone.name}</span>)}</div><Link href={`/cleaning/${region.slug}`}>상세 지역 가이드 →</Link></article>)}</div><div className="nearby allRegions"><b>다른 시·도도 보기</b><Link href="/cleaning">전국 지역 목록 →</Link></div></section></>;
}
