import Link from "next/link";
import RegionDirectory from "@/components/RegionDirectory";
import { regionList } from "@/lib/regions";

export const metadata = { title: "전국 지역별 입주청소", description: "공식 지역 자료와 생활권별 주거·접근 조건을 바탕으로 만든 독립적인 입주청소 지역 가이드입니다.", alternates: { canonical: "/cleaning" } };

export default function CleaningHub() {
  const cityHubs = [...new Map(regionList.map(region => [region.slug.split("/")[0], region.city])).entries()];
  return <><section className="pageHero"><div className="shell"><span className="eyebrow">LOCAL CLEANING GUIDE</span><h1>전국 지역별 입주청소</h1><p>지역명만 바꾼 정보가 아니라 생활권·건물·작업 동선을 조사한 지역부터 공개합니다.</p></div></section><section className="section shell"><div className="hubIntro"><h2>검증된 지역부터<br/>하나씩 깊게 만듭니다.</h2><p>지역 가격을 임의로 만들지 않습니다. 공동주택, 오피스텔, 저층 주거의 차이와 주차·엘리베이터·골목 접근처럼 실제 견적에 필요한 조건을 정리합니다.</p></div><nav className="cityHubLinks" aria-label="시·도별 입주청소 가이드">{cityHubs.map(([slug, city]) => <Link href={`/cleaning/${slug}`} key={slug}>{city}<span>→</span></Link>)}</nav><RegionDirectory regions={regionList.map(({ slug, city, district, description }) => ({ slug, city, district, description }))} /></section></>;
}
