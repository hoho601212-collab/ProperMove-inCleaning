import Link from "next/link";
import RegionDirectory from "@/components/RegionDirectory";
import { regionList } from "@/lib/regions";
import { SITE_URL } from "@/lib/site";

const hubTitle = "전국 입주청소 | 서울·부산·경기 등 지역별 청소 가이드";
const hubDescription = "서울·부산·대구·인천·경기 등 전국 주요 지역의 입주청소 정보를 한곳에서 확인하세요. 아파트·오피스텔·저층주거의 청소 범위와 창호·수납·분진, 출입·주차 조건을 지역별로 비교할 수 있습니다.";

export const metadata = {
  title: hubTitle,
  description: hubDescription,
  alternates: { canonical: "/cleaning" },
  openGraph: { title: hubTitle, description: hubDescription },
};

export default function CleaningHub() {
  const cityHubs = [...new Map(regionList.map(region => [region.slug.split("/")[0], region.city])).entries()];
  const collectionSchema = { "@context": "https://schema.org", "@type": "CollectionPage", name: hubTitle, url: `${SITE_URL}/cleaning`, description: hubDescription, inLanguage: "ko-KR", mainEntity: { "@type": "ItemList", numberOfItems: regionList.length, itemListElement: regionList.map((region, index) => ({ "@type": "ListItem", position: index + 1, name: `${region.city} ${region.district} 입주청소`, url: `${SITE_URL}/cleaning/${region.slug}` })) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} /><section className="pageHero"><div className="shell"><span className="eyebrow">LOCAL CLEANING GUIDE</span><h1>전국 입주청소 지역별 가이드</h1><p>서울·부산·경기 등 주요 시·도부터 구·군과 생활권까지, 실제 주거 형태와 현장 조건에 맞춰 입주청소 정보를 비교할 수 있습니다.</p></div></section><section className="section shell"><div className="hubIntro"><h2>지역마다 다른 주거 형태와<br/>청소 조건을 비교하세요.</h2><p>공동주택, 오피스텔, 저층 주거의 차이와 신축 분진·창호·수납, 구축 생활오염, 주차·엘리베이터·골목 접근처럼 실제 견적에 필요한 조건을 지역별로 정리했습니다.</p></div><nav className="cityHubLinks" aria-label="시·도별 입주청소 가이드">{cityHubs.map(([slug, city]) => <Link href={`/cleaning/${slug}`} key={slug}>{city} 입주청소<span>→</span></Link>)}</nav><RegionDirectory regions={regionList.map(({ slug, city, district, description }) => ({ slug, city, district, description }))} /></section></>;
}
