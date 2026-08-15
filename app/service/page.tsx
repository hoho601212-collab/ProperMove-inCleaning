import Link from "next/link";
import { services } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const metadata = { title: "청소 종류", description: "입주청소, 이사청소, 거주청소 등 공간과 상황에 맞는 청소 범위를 확인하세요.", alternates: { canonical: "/service" } };

export default function Page() {
  const items = Object.entries(services);
  const collectionSchema = { "@context": "https://schema.org", "@type": "CollectionPage", name: "청소 종류", url: `${SITE_URL}/service`, description: "공간과 상황에 맞는 청소 종류와 확인 범위", mainEntity: { "@type": "ItemList", numberOfItems: items.length, itemListElement: items.map(([slug, service], index) => ({ "@type": "ListItem", position: index + 1, name: service.name, url: `${SITE_URL}/service/${slug}` })) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} /><section className="pageHero"><div className="shell"><span className="eyebrow">SERVICE</span><h1>청소 종류</h1><p>이름이 같아도 업체마다 포함 범위가 다를 수 있습니다.</p></div></section><section className="section shell contentGrid">{items.map(([slug, service]) => <Link className="contentCard" href={`/service/${slug}`} key={slug}><h2>{service.name}</h2><p>{service.lead}</p><b>범위 확인하기 →</b></Link>)}</section></>;
}
