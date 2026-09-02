import Image from "next/image";
import Link from "next/link";
import HomeTools from "@/components/HomeTools";
import PlanningTools from "@/components/PlanningTools";
import CleaningScope from "@/components/CleaningScope";
import SpecialReasons from "@/components/SpecialReasons";
import SpaceCleaningServices from "@/components/SpaceCleaningServices";
import CustomerReviews from "@/components/CustomerReviews";
import UpcomingApartments from "@/components/UpcomingApartments";
import { INQUIRY_URL } from "@/lib/inquiry";
import { regionList } from "@/lib/regions";
import brandStyles from "./home-brand-marquee.module.css";
import "./home-hero.css";
import "./home-region-preview.css";

const homeTitle = "올바른청소 | 입주청소 비교견적·청소 범위·지역별 가이드";
const homeDescription = "올바른청소에서 입주청소 업체를 알아보기 전 청소 범위와 추가 확인사항을 살펴보고 견적을 비교하세요. 아파트·오피스텔·원룸과 서울·부산·경기 등 지역별 입주청소 가이드도 제공합니다.";

export const metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: homeTitle,
    description: "올바른청소에서 입주청소 범위와 현장 조건을 확인하고 같은 기준으로 업체 견적을 비교하세요. 주거형태별·지역별 청소 준비 정보도 함께 확인할 수 있습니다.",
    url: "/",
  },
};

const services = [
  ["입주청소", "신축·공사 분진부터 수납장 안쪽까지", "/service/move-in-cleaning", "01"],
  ["이사청소", "이전 거주 흔적과 생활 오염을 꼼꼼하게", "/service/moving-cleaning", "02"],
  ["원룸청소", "작은 공간도 주방·욕실·창틀 기준으로", "/service/studio-cleaning", "03"],
  ["아파트청소", "평수보다 창호·수납·베란다 조건까지", "/service/apartment-cleaning", "04"],
];

const featuredRegions = [
  ["서울 강남구", "/cleaning/seoul/gangnam"],
  ["서울 송파구", "/cleaning/seoul/songpa"],
  ["경기 수원시", "/cleaning/gyeonggi/suwon"],
  ["인천 연수구", "/cleaning/incheon/yeonsu"],
  ["부산 해운대구", "/cleaning/busan/haeundae"],
  ["대구 수성구", "/cleaning/daegu/suseong"],
  ["대전 유성구", "/cleaning/daejeon/yuseong"],
  ["광주 서구", "/cleaning/gwangju/seo"],
];

const apartmentBrands = [
  ["래미안", "RAEMIAN", "raemian"], ["푸르지오", "PRUGIO", "prugio"], ["e편한세상", "e-PYEONHAN", "epyeon"],
  ["자이", "Xi", "xi"], ["더샵", "THE SHARP", "thesharp"], ["힐스테이트", "HILLSTATE", "hillstate"],
  ["롯데캐슬", "LOTTE CASTLE", "lotte"], ["아이파크", "IPARK", "ipark"], ["포레나", "FORENA", "forena"],
  ["SK뷰", "SK VIEW", "skview"], ["두산위브", "We've", "weve"], ["트리마제", "TRIMAGE", "trimage"],
  ["아크로", "ACRO", "acro"], ["디에이치", "THE H", "theh"], ["엘크루", "ELCRU", "elcru"],
  ["센트레빌", "CENTREVILLE", "centreville"], ["써밋", "SUMMIT", "summit"], ["우미린", "Lynn", "lynn"],
  ["금호어울림", "EOULLIM", "eoullim"], ["데시앙", "DESIAN", "desian"],
] as const;

function BrandTrack() {
  return <div className={brandStyles.track} aria-hidden="true">{apartmentBrands.map(([ko, en, cls]) => <div className={`${brandStyles.item} ${brandStyles[cls]}`} key={`${ko}-${en}`}><b>{ko}</b><span>{en}</span></div>)}</div>;
}

export default function Home() {
  const featured = regionList.filter(region => featuredRegions.some(([, href]) => href.endsWith(region.slug)));
  return <>
    <section className="homeHero"><div className="shell homeHeroGrid"><div><span className="eyebrow">MOVE-IN CLEANING GUIDE</span><h1>입주청소,<br/>같은 기준으로 비교하세요.</h1><p>청소 범위와 현장 조건을 먼저 확인하고, 여러 업체의 견적을 같은 기준으로 비교할 수 있도록 돕습니다.</p><div className="heroActions"><a className="button" href={INQUIRY_URL}>무료 견적문의 →</a><Link className="textLink" href="/guide/move-in-cleaning-checklist">청소 준비 체크리스트 →</Link></div></div><div className="homeHeroImage"><Image src="/images/home/main-cleaning.webp" alt="입주청소 작업 현장에서 전문 장비로 청소하는 모습" width={1200} height={800} priority sizes="(max-width: 720px) 100vw, 52vw" /></div></div></section>
    <section className="brandMarqueeSection" aria-label="주요 아파트 브랜드"><div className={brandStyles.marquee}><BrandTrack/><BrandTrack/></div></section>
    <section className="section shell"><div className="sectionHead"><div><span className="eyebrow">CLEANING SERVICES</span><h2>주거 형태와 상황에 맞는<br/>청소 정보를 확인하세요.</h2></div><Link href="/service" className="textLink">청소 종류 전체보기 →</Link></div><div className="serviceGrid">{services.map(([title, desc, href, number]) => <Link href={href} className="serviceCard" key={href}><span>{number}</span><h3>{title}</h3><p>{desc}</p><b>자세히 보기 →</b></Link>)}</div></section>
    <CleaningScope />
    <SpecialReasons />
    <SpaceCleaningServices />
    <UpcomingApartments />
    <section className="section regionPreview"><div className="shell"><div className="sectionHead"><div><span className="eyebrow">LOCAL CLEANING GUIDE</span><h2>지역별 입주청소 조건도<br/>미리 확인하세요.</h2></div><Link href="/cleaning" className="textLink">전국 지역 가이드 →</Link></div><div className="regionPreviewGrid">{featured.map(region => <Link href={`/cleaning/${region.slug}`} key={region.slug}><span>{region.city}</span><h3>{region.district} 입주청소</h3><p>{region.description}</p><b>지역 가이드</b></Link>)}</div></div></section>
    <CustomerReviews />
    <HomeTools />
    <PlanningTools />
    <section className="finalCta"><div className="shell"><span>청소 범위를 확인했다면</span><h2>같은 기준으로<br/>견적문의를 시작하세요.</h2><a href={INQUIRY_URL} className="button buttonWhite">무료 견적문의 →</a></div></section>
  </>;
}
