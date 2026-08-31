import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { regionList } from "@/lib/regions";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ sido: string }> };
const sidoSlugs = [...new Set(regionList.map(region => region.slug.split("/")[0]))];

const sidoMeta: Record<string, { title: string; description: string }> = {
  seoul: { title: "서울 입주청소 | 강남·송파·마포 등 지역별 청소 가이드", description: "서울 입주청소를 강남·송파·마포 등 주요 지역별로 비교하세요. 아파트·오피스텔·다세대의 창호, 수납, 공사분진과 출입·주차 조건까지 확인할 수 있습니다." },
  busan: { title: "부산 입주청소 | 해운대·수영·동래 등 지역별 청소 가이드", description: "부산 입주청소를 해운대·수영·동래 등 주요 생활권별로 안내합니다. 고층 아파트, 구축주거, 신도시의 창호·베란다·생활오염과 현장 접근조건을 확인하세요." },
  daegu: { title: "대구 입주청소 | 수성·달서·동구 등 지역별 청소 가이드", description: "대구 입주청소를 수성·달서·동구 등 주요 지역별로 살펴보세요. 대단지 아파트와 신축·구축 주거의 공사분진, 창틀, 수납 청소 범위와 현장 조건을 안내합니다." },
  incheon: { title: "인천 입주청소 | 송도·청라·연수 등 지역별 청소 가이드", description: "인천 입주청소를 송도·청라·연수 등 주요 생활권별로 비교하세요. 고층 공동주택과 아파트·오피스텔의 창호, 수납, 출입·주차 조건을 지역별로 확인할 수 있습니다." },
  gyeonggi: { title: "경기 입주청소 | 수원·성남·용인 등 지역별 청소 가이드", description: "경기 입주청소를 수원·성남·용인·고양 등 주요 도시별로 안내합니다. 신도시와 대단지 아파트의 분진, 창호, 수납 청소 범위와 작업 전 확인사항을 비교하세요." },
  sejong: { title: "세종 입주청소 | 아름·보람·종촌 등 생활권별 청소 가이드", description: "세종 입주청소를 아름·보람·종촌·다정 등 주요 생활권별로 확인하세요. 대단지 공동주택과 신축·준신축 아파트의 분진, 창호, 수납 청소 조건을 안내합니다." },
  daejeon: { title: "대전 입주청소 | 유성·둔산·도안 등 지역별 청소 가이드", description: "대전 입주청소를 유성·둔산·도안 등 주요 생활권별로 비교하세요. 신도시와 대단지 아파트, 기존 주거의 창틀·수납·생활오염 청소 조건을 확인할 수 있습니다." },
  gwangju: { title: "광주 입주청소 | 수완·첨단·봉선 등 지역별 청소 가이드", description: "광주 입주청소를 수완·첨단·봉선 등 주요 생활권별로 안내합니다. 신축 아파트와 대단지 공동주택의 분진, 창호, 수납 청소 범위와 검수 포인트를 확인하세요." },
  ulsan: { title: "울산 입주청소 | 남구·북구·송정 등 지역별 청소 가이드", description: "울산 입주청소를 남구·북구·송정 등 주요 지역별로 살펴보세요. 아파트·주상복합과 신축 대단지의 창호, 수납, 공사분진 및 작업 동선 조건을 안내합니다." },
  chungbuk: { title: "충북 입주청소 | 청주·충주·진천 등 지역별 청소 가이드", description: "충북 입주청소를 청주·충주·진천 등 주요 지역별로 비교하세요. 대단지 아파트와 혁신도시, 읍면권 공동주택의 창호·수납 청소 및 접근조건을 확인하세요." },
  chungnam: { title: "충남 입주청소 | 천안·아산·당진 등 지역별 청소 가이드", description: "충남 입주청소를 천안·아산·당진 등 주요 도시별로 안내합니다. 신축 대단지와 기존 아파트의 공사분진, 창호, 수납 청소 범위와 현장 조건을 확인하세요." },
  jeonbuk: { title: "전북 입주청소 | 전주·익산·군산 등 지역별 청소 가이드", description: "전북 입주청소를 전주·익산·군산 등 주요 지역별로 살펴보세요. 신축 공동주택과 기존 아파트, 저층주거의 창틀·수납·생활오염 청소 조건을 안내합니다." },
  gyeongnam: { title: "경남 입주청소 | 창원·김해·양산 등 지역별 청소 가이드", description: "경남 입주청소를 창원·김해·양산 등 주요 도시별로 비교하세요. 신도시와 대단지 아파트, 공동주택의 분진·창호·수납 청소 범위와 접근조건을 확인하세요." },
  gyeongbuk: { title: "경북 입주청소 | 포항·구미·경산 등 지역별 청소 가이드", description: "경북 입주청소를 포항·구미·경산 등 주요 도시별로 안내합니다. 신축·기존 아파트와 공동주택의 창호, 수납, 생활오염 청소 범위 및 작업 조건을 확인하세요." },
};

function getSidoMeta(sido: string, city: string) {
  return sidoMeta[sido] ?? { title: `${city} 입주청소 | 지역별 청소 범위와 준비 가이드`, description: `${city} 주요 지역의 입주청소 범위와 주거 형태별 청소 포인트, 출입·주차 조건을 비교하고 실제 주소와 건물 상태에 맞는 준비사항을 확인하세요.` };
}

export function generateStaticParams() { return sidoSlugs.map(sido => ({ sido })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sido } = await params; const items = regionList.filter(region => region.slug.startsWith(`${sido}/`)); if (!items.length) return {};
  const city = items[0].city; const meta = getSidoMeta(sido, city);
  return { title: meta.title, description: meta.description, alternates: { canonical: `/cleaning/${sido}` }, openGraph: { title: meta.title, description: meta.description } };
}

export default async function SidoPage({ params }: Props) {
  const { sido } = await params; const items = regionList.filter(region => region.slug.startsWith(`${sido}/`)); if (!items.length) notFound(); const city = items[0].city; const meta = getSidoMeta(sido, city);
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "지역별 입주청소", item: `${SITE_URL}/cleaning` }, { "@type": "ListItem", position: 3, name: city, item: `${SITE_URL}/cleaning/${sido}` }] };
  const collectionSchema = { "@context": "https://schema.org", "@type": "CollectionPage", name: meta.title, description: meta.description, url: `${SITE_URL}/cleaning/${sido}`, inLanguage: "ko-KR", mainEntity: { "@type": "ItemList", numberOfItems: items.length, itemListElement: items.map((region, index) => ({ "@type": "ListItem", position: index + 1, name: `${region.city} ${region.district} 입주청소`, url: `${SITE_URL}/cleaning/${region.slug}` })) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} /><section className="pageHero"><div className="shell"><nav className="breadcrumbs" aria-label="현재 위치"><Link href="/">홈</Link><span>›</span><Link href="/cleaning">지역별 입주청소</Link><span>›</span><b>{city}</b></nav><span className="eyebrow">{sido.toUpperCase()} LOCAL HUB</span><h1>{city} 입주청소 지역별 가이드</h1><p>{meta.description}</p></div></section><section className="section shell"><div className="hubIntro"><h2>{city} 주요 지역을<br/>생활권부터 비교하세요.</h2><p>{city} 안에서도 주거 형태와 건물 상태, 출입·주차 조건이 다릅니다. 지역명만으로 가격을 단정하지 않고 실제 현장 조건을 기준으로 청소 범위를 확인할 수 있도록 정리했습니다.</p></div><div className="sidoRegionGrid">{items.map(region => <article key={region.slug}><span>{region.city}</span><h2>{region.district} 입주청소</h2><p>{region.description}</p><div className="sidoZones" aria-label={`${region.district} 주요 생활권`}>{region.zones.map(zone => <span key={zone.name}>{zone.name}</span>)}</div><Link href={`/cleaning/${region.slug}`} aria-label={`${region.city} ${region.district} 입주청소 상세 지역 가이드`}>{region.city} {region.district} 입주청소 가이드 →</Link></article>)}</div><div className="nearby allRegions"><b>입주청소 준비 정보</b><Link href="/guide/move-in-cleaning-checklist">입주청소 체크리스트 →</Link><Link href="/guide/cleaning-price">입주청소 비용 조건 →</Link><Link href="/service/move-in-cleaning">입주청소 기본 범위 →</Link><Link href="/cleaning">전국 입주청소 지역 목록 →</Link></div></section></>;
}
