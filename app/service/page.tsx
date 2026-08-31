import Link from "next/link";
import { services } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "청소 종류 | 입주·이사·원룸·아파트 청소 범위 안내",
  description: "입주청소, 이사청소, 거주청소, 원룸청소, 아파트청소, 사무실·상가청소까지 상황별 기본 범위와 견적 전 확인사항을 비교하세요.",
  alternates: { canonical: "/service" },
  openGraph: {
    title: "청소 종류 | 입주·이사·원룸·아파트 청소 범위 안내",
    description: "주거형태와 작업 상황에 따라 달라지는 청소 범위와 견적 전 확인사항을 청소 종류별로 살펴보세요.",
  },
};

export default function Page() {
  const items = Object.entries(services);
  const collectionSchema = { "@context": "https://schema.org", "@type": "CollectionPage", name: "청소 종류별 범위와 준비 가이드", url: `${SITE_URL}/service`, description: "입주·이사·거주·원룸·아파트·사무실·상가청소의 작업 범위와 견적 전 확인사항", mainEntity: { "@type": "ItemList", numberOfItems: items.length, itemListElement: items.map(([slug, service], index) => ({ "@type": "ListItem", position: index + 1, name: service.name, url: `${SITE_URL}/service/${slug}` })) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} /><section className="pageHero"><div className="shell"><span className="eyebrow">SERVICE</span><h1>청소 종류별 범위 안내</h1><p>입주·이사·거주·원룸·아파트 등 상황에 따라 달라지는 작업 범위를 먼저 확인하세요.</p></div></section><section className="section shell contentGrid">{items.map(([slug, service]) => <Link className="contentCard" href={`/service/${slug}`} key={slug}><h2>{service.name}</h2><p>{service.lead}</p><b>범위 확인하기 →</b></Link>)}</section></>;
}
