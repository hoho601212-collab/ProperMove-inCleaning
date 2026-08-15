import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { serviceDetails, services } from "@/lib/content";
import { INQUIRY_URL } from "@/lib/inquiry";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
const relatedGuides = [["입주청소 체크리스트", "/guide/move-in-cleaning-checklist"], ["기본 청소 범위 확인", "/guide/cleaning-scope"], ["청소 비용이 달라지는 이유", "/guide/cleaning-price"]];

export function generateStaticParams() { return Object.keys(services).map(slug => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const item = services[slug as keyof typeof services]; return item ? { title: item.name, description: item.lead, alternates: { canonical: `/service/${slug}` }, openGraph: { title: item.name, description: item.lead } } : {}; }

export default async function ServicePage({ params }: Props) {
  const { slug } = await params; const key = slug as keyof typeof services; const item = services[key]; if (!item) notFound(); const detail = serviceDetails[key];
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "청소 종류", item: `${SITE_URL}/service` }, { "@type": "ListItem", position: 3, name: item.name, item: `${SITE_URL}/service/${slug}` }] };
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: item.name, description: item.lead, inLanguage: "ko-KR", mainEntityOfPage: `${SITE_URL}/service/${slug}`, author: { "@type": "Organization", name: "올바른청소", url: SITE_URL } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} /><section className="pageHero"><div className="shell"><nav className="breadcrumbs" aria-label="현재 위치"><Link href="/">홈</Link><span>›</span><Link href="/service">청소 종류</Link><span>›</span><b>{item.name}</b></nav><span className="eyebrow">CLEANING SERVICE</span><h1>{item.name}</h1><p>{item.lead}</p></div></section><section className="section shell"><div className="contentGrid">{detail.items.map((detailItem, index) => <article className="contentCard" key={detailItem.title}><span className="eyebrow">CHECK {index + 1}</span><h2>{detailItem.title}</h2><p>{detailItem.body}</p></article>)}</div><p className="guideNotice">{detail.note}</p><div className="relatedLinks"><div><span className="eyebrow">NEXT GUIDE</span><h2>{item.name} 문의 전에 함께 보세요</h2></div><div>{relatedGuides.map(([label, href]) => <Link href={href} key={href}>{label}<span>→</span></Link>)}<Link href="/cleaning">내 지역 작업조건 찾기<span>→</span></Link></div></div><div className="areaBox" style={{ marginTop: 40 }}><div><h2>같은 조건으로 문의하세요</h2><p>작업인원, 예상 시간, 기본 범위와 추가요금 기준을 함께 확인하면 가격 차이를 이해하기 쉽습니다.</p></div>{/* 기존 내부 견적 링크 임시 보존: /estimate */}<a className="button" href={INQUIRY_URL}>견적문의 →</a></div></section></>;
}
