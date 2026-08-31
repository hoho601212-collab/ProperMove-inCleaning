import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { serviceDetails, services } from "@/lib/content";
import { INQUIRY_URL } from "@/lib/inquiry";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
const relatedGuides = [["입주청소 체크리스트", "/guide/move-in-cleaning-checklist"], ["기본 청소 범위 확인", "/guide/cleaning-scope"], ["청소 비용이 달라지는 이유", "/guide/cleaning-price"]];

const serviceMeta: Record<string, { title: string; description: string }> = {
  "move-in-cleaning": { title: "입주청소 | 신축 분진·수납·창호 청소 범위 확인", description: "입주청소 전 공사 분진, 붙박이장·팬트리 수납공간, 창틀·베란다, 보호필름과 입주 동선을 확인하세요. 업체 견적을 비교할 때 필요한 기본 범위를 정리했습니다." },
  "moving-cleaning": { title: "이사청소 | 주방·욕실·생활오염 청소 범위 확인", description: "이사청소 전 주방 기름때, 욕실 물때, 창틀·배수구, 남은 짐과 가전 내부의 포함 여부를 확인하세요. 퇴거와 새 입주 일정에 맞춘 검수 항목도 안내합니다." },
  "residential-cleaning": { title: "거주청소 | 가구·생활용품 있는 집 청소 범위 안내", description: "거주청소는 가구와 생활용품이 있는 상태에서 진행됩니다. 가구 이동, 우선 청소구역, 세정제 사용과 작업 동선을 미리 협의할 수 있도록 확인사항을 정리했습니다." },
  "studio-cleaning": { title: "원룸청소 | 복층·옵션가전·주방·욕실 청소 체크", description: "원룸청소는 작은 평수라도 복층 여부, 옵션 가전, 주방 기름때, 욕실·창틀 상태에 따라 작업량이 달라집니다. 주차와 계단 등 건물 접근조건까지 확인하세요." },
  "apartment-cleaning": { title: "아파트청소 | 평수·창호·베란다·수납 청소 범위", description: "아파트청소 전 전용·공급면적 기준, 단지 출입, 베란다와 창호, 붙박이장·팬트리, 신축·구축 상태를 구분해 확인하세요. 입주 일정과 검수 준비도 안내합니다." },
  "office-cleaning": { title: "사무실청소 | 바닥·유리·집기·작업시간 범위 확인", description: "사무실청소 전 업무구역, 바닥 재질, 유리 파티션, 집기·전산장비, 보안 출입과 작업 가능 시간을 확인하세요. 일회성 청소와 정기관리 범위도 구분해 안내합니다." },
  "commercial-cleaning": { title: "상가청소 | 업종별 오염·주방·바닥 청소 범위 확인", description: "상가청소 전 업종별 오염, 주방·배기설비, 쇼윈도·간판, 바닥과 집기, 인테리어 공사 잔여물의 포함 여부를 확인하세요. 오픈 일정 전 검수 준비도 안내합니다." },
};

function getServiceMeta(slug: string, name: string, lead: string) {
  return serviceMeta[slug] ?? { title: `${name} | 청소 범위와 준비사항 확인`, description: lead };
}

export function generateStaticParams() { return Object.keys(services).map(slug => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const item = services[slug as keyof typeof services]; if (!item) return {};
  const meta = getServiceMeta(slug, item.name, item.lead);
  return { title: meta.title, description: meta.description, alternates: { canonical: `/service/${slug}` }, openGraph: { title: meta.title, description: meta.description } };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params; const key = slug as keyof typeof services; const item = services[key]; if (!item) notFound(); const detail = serviceDetails[key]; const meta = getServiceMeta(slug, item.name, item.lead);
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "청소 종류", item: `${SITE_URL}/service` }, { "@type": "ListItem", position: 3, name: item.name, item: `${SITE_URL}/service/${slug}` }] };
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: meta.title, description: meta.description, inLanguage: "ko-KR", mainEntityOfPage: `${SITE_URL}/service/${slug}`, author: { "@type": "Organization", name: "올바른청소", url: SITE_URL } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} /><section className="pageHero"><div className="shell"><nav className="breadcrumbs" aria-label="현재 위치"><Link href="/">홈</Link><span>›</span><Link href="/service">청소 종류</Link><span>›</span><b>{item.name}</b></nav><span className="eyebrow">CLEANING SERVICE</span><h1>{item.name}</h1><p>{item.lead}</p></div></section><section className="section shell"><div className="contentGrid">{detail.items.map((detailItem, index) => <article className="contentCard" key={detailItem.title}><span className="eyebrow">CHECK {index + 1}</span><h2>{detailItem.title}</h2><p>{detailItem.body}</p></article>)}</div><p className="guideNotice">{detail.note}</p><div className="relatedLinks"><div><span className="eyebrow">NEXT GUIDE</span><h2>{item.name} 문의 전에 함께 보세요</h2></div><div>{relatedGuides.map(([label, href]) => <Link href={href} key={href}>{label}<span>→</span></Link>)}<Link href="/cleaning">내 지역 작업조건 찾기<span>→</span></Link></div></div><div className="areaBox" style={{ marginTop: 40 }}><div><h2>같은 조건으로 문의하세요</h2><p>작업인원, 예상 시간, 기본 범위와 추가요금 기준을 함께 확인하면 가격 차이를 이해하기 쉽습니다.</p></div>{/* 기존 내부 견적 링크 임시 보존: /estimate */}<a className="button" href={INQUIRY_URL}>견적문의 →</a></div></section></>;
}
