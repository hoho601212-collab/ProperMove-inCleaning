import Link from "next/link";
import { guideDetails, guides } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

const title = "입주청소 가이드 | 비용·범위·체크리스트·검수 정보";
const description = "입주청소를 준비할 때 필요한 청소 범위, 비용이 달라지는 조건, 평수 확인, 신축 공사분진, 작업 전 체크리스트와 청소 후 검수 방법을 한곳에서 확인하세요.";

export const metadata = { title, description, alternates: { canonical: "/guide" }, openGraph: { title, description } };

export default function Page() {
  const items = Object.entries(guides);
  const collectionSchema = { "@context": "https://schema.org", "@type": "CollectionPage", name: title, url: `${SITE_URL}/guide`, description, mainEntity: { "@type": "ItemList", numberOfItems: items.length, itemListElement: items.map(([slug, guideTitle], index) => ({ "@type": "ListItem", position: index + 1, name: guideTitle, url: `${SITE_URL}/guide/${slug}` })) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} /><section className="pageHero"><div className="shell"><span className="eyebrow">GUIDE</span><h1>입주청소 준비 가이드</h1><p>비용과 범위 확인부터 작업 전 준비, 신축 분진과 청소 후 검수까지 필요한 정보를 주제별로 정리했습니다.</p></div></section><section className="section shell contentGrid">{items.map(([slug, guideTitle], i) => <Link className="contentCard" href={`/guide/${slug}`} key={slug}><span className="eyebrow">GUIDE {String(i + 1).padStart(2, "0")}</span><h2>{guideTitle}</h2><p>{guideDetails[slug as keyof typeof guideDetails].lead}</p><b>읽어보기 →</b></Link>)}</section></>;
}
