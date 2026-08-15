import Link from "next/link";
import { guideDetails, guides } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const metadata = { title: "입주청소 가이드", description: "청소 전 준비부터 범위, 면적, 신축 분진과 청소 후 검수까지 확인하세요.", alternates: { canonical: "/guide" } };

export default function Page() {
  const items = Object.entries(guides);
  const collectionSchema = { "@context": "https://schema.org", "@type": "CollectionPage", name: "입주청소 가이드", url: `${SITE_URL}/guide`, description: "청소 전 준비부터 범위, 면적, 신축 분진과 청소 후 검수까지 확인하는 실용 가이드", mainEntity: { "@type": "ItemList", numberOfItems: items.length, itemListElement: items.map(([slug, title], index) => ({ "@type": "ListItem", position: index + 1, name: title, url: `${SITE_URL}/guide/${slug}` })) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} /><section className="pageHero"><div className="shell"><span className="eyebrow">GUIDE</span><h1>입주청소 가이드</h1><p>맡기기 전부터 청소 직후 검수까지, 실제 현장에서 필요한 내용을 정리했습니다.</p></div></section><section className="section shell contentGrid">{items.map(([slug, title], i) => <Link className="contentCard" href={`/guide/${slug}`} key={slug}><span className="eyebrow">GUIDE {String(i + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{guideDetails[slug as keyof typeof guideDetails].lead}</p><b>읽어보기 →</b></Link>)}</section></>;
}
