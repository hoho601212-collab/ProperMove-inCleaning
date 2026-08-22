import Link from "next/link";
import HomeTools from "@/components/HomeTools";
import PlanningTools from "@/components/PlanningTools";
import UpcomingApartments from "@/components/UpcomingApartments";
import SpecialReasons from "@/components/SpecialReasons";
import SpaceCleaningServices from "@/components/SpaceCleaningServices";
import CustomerReviews from "@/components/CustomerReviews";
import { INQUIRY_URL } from "@/lib/inquiry";
import { regionList } from "@/lib/regions";
import brandStyles from "./home-brand-marquee.module.css";

export const metadata = { alternates: { canonical: "/" } };

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
  ["래미안", "RAEMIAN", "raemian"],
  ["푸르지오", "PRUGIO", "prugio"],
  ["e편한세상", "e-PYEONHAN", "epyeon"],
  ["자이", "Xi", "xi"],
  ["더샵", "THE SHARP", "thesharp"],
  ["힐스테이트", "HILLSTATE", "hillstate"],
  ["롯데캐슬", "LOTTE CASTLE", "lotte"],
  ["아이파크", "IPARK", "ipark"],
  ["포레나", "FORENA", "forena"],
  ["SK뷰", "SK VIEW", "skview"],
  ["두산위브", "We've", "weve"],
  ["트리마제", "TRIMAGE", "trimage"],
  ["아크로", "ACRO", "acro"],
  ["디에이치", "THE H", "theh"],
  ["엘크루", "ELCRU", "elcru"],
  ["센트레빌", "CENTREVILLE", "centreville"],
  ["써밋", "SUMMIT", "summit"],
  ["우미린", "Lynn", "lynn"],
  ["금호어울림", "EOULLIM", "eoullim"],
  ["데시앙", "DESIAN", "desian"],
] as const;

function BrandTrack() {
  return <div className={brandStyles.track} aria-hidden="true">
    {apartmentBrands.map(([ko, en, tone]) => <div className={`${brandStyles.brand} ${brandStyles[tone]}`} key={`${ko}-${en}`}>
      <span className={brandStyles.mark}>{en.slice(0, 1)}</span>
      <span className={brandStyles.word}><b>{ko}</b><small>{en}</small></span>
    </div>)}
  </div>;
}

export default function Home() {
  return <>
    <section className="hero"><div className="shell heroGrid"><div>
      <span className="eyebrow">전국 입주청소 비교 가이드</span>
      <h1>입주청소, 가격만 보지 말고<br/><em>청소 범위와 작업조건</em>까지 비교하세요.</h1>
      <p>필요한 청소 범위와 지역 조건을 먼저 확인하면<br/>업체마다 다른 견적을 같은 기준으로 비교할 수 있습니다.</p>
      <div className="actions">{/* 기존 내부 견적 링크 임시 보존: /estimate */}<a href={INQUIRY_URL} className="button">견적문의 바로가기 <span>→</span></a><Link href="/cleaning" className="textLink">내 지역 입주청소 보기 <span>→</span></Link></div>
      <div className="trustRow"><span>✓ 고정가격 단정 없음</span><span>✓ 견적 조건 한눈에</span><span>✓ 무료 신청</span></div>
    </div><div className="heroVisual" aria-label="청소 견적 비교 예시"><div className="visualTop"><span>우리 집 청소 조건</span><b>비교 준비 완료</b></div><div className="condition"><i>84</i><span>㎡ 전용면적<br/><b>약 25.4평</b></span></div><div className="miniGrid"><span><small>공간</small>아파트</span><span><small>상태</small>신축</span><span><small>추가 확인</small>창틀·분진</span><span><small>견적 기준</small>범위 비교</span></div><div className="visualNote">같은 평수라도 창문, 수납공간, 오염도에 따라 달라집니다.</div></div></div></section>

    <section className={brandStyles.marqueeSection} aria-label="국내 대표 아파트 브랜드">
      <div className={`shell ${brandStyles.marqueeShell}`}>
        <div className={brandStyles.marquee}>
          <BrandTrack />
          <BrandTrack />
        </div>
      </div>
    </section>

    <SpecialReasons />

    <SpaceCleaningServices />

    <CustomerReviews />

    <UpcomingApartments />

    <section className="section shell"><div className="sectionHead"><div><span className="eyebrow">CLEANING SERVICE</span><h2>우리 집에 필요한 청소부터 확인하세요</h2></div><Link href="/service" className="textLink">전체 청소 종류 보기 →</Link></div><div className="serviceGrid">{services.map(([title, desc, href, no]) => <Link href={href} className="serviceCard" key={title}><span className="serviceNo">{no}</span><h3>{title}</h3><p>{desc}</p><b>자세히 보기 →</b></Link>)}</div></section>

    <section className="softSection"><div className="shell splitIntro"><div><span className="eyebrow">SMART CHECK</span><h2>견적을 받기 전,<br/>우리 집 조건을 1분만에 정리하세요.</h2><p>면적과 청소 범위를 미리 정리하면 업체마다 다른 포함 항목을 더 정확히 비교할 수 있습니다.</p></div><div className="reasonList"><span><b>01</b><strong>면적</strong><small>㎡와 평 기준 확인</small></span><span><b>02</b><strong>공간</strong><small>방·욕실·베란다</small></span><span><b>03</b><strong>오염</strong><small>분진·곰팡이·기름때</small></span><span><b>04</b><strong>추가작업</strong><small>스티커·보호필름</small></span></div></div></section>

    <HomeTools />

    <PlanningTools />

    <section className="section shell"><div className="sectionHead"><div><span className="eyebrow">CLEANING GUIDE</span><h2>청소 전후, 놓치기 쉬운 것들</h2></div><Link href="/guide" className="textLink">가이드 전체 보기 →</Link></div><div className="guideGrid"><Link href="/guide/cleaning-before-moving" className="guideCard mint"><span>청소 전</span><h3>가구가 들어오기 전<br/>무엇을 준비할까요?</h3><p>수도·전기·출입·주차·엘리베이터를 미리 확인하세요.</p><b>준비 체크리스트 →</b></Link><Link href="/guide/after-cleaning-inspection" className="guideCard navy"><span>청소 후</span><h3>눈높이 아래와 위까지<br/>현장에서 검수하세요.</h3><p>문틀 위, 창틀 모서리, 수납장 안쪽처럼 놓치기 쉬운 곳을 확인합니다.</p><b>검수 체크리스트 →</b></Link></div></section>

    <section className="section shell"><div className="areaBox"><div><span className="eyebrow">LOCAL GUIDE</span><h2>전국 지역별 입주청소</h2><p>주거 형태와 작업 동선은 지역과 건물마다 다릅니다.<br/>내 지역에서 먼저 확인할 조건을 살펴보세요.</p><Link href="/cleaning" className="textLink">{regionList.length}개 지역 전체 보기 →</Link></div><div className="areaLinks">{featuredRegions.map(([label, href]) => <Link href={href} key={href}>{label}<span>→</span></Link>)}</div></div></section>

    <section className="finalCta"><div className="shell"><span>조건이 달라지면 견적도 달라집니다</span><h2>내 청소 조건을 정리하고<br/>견적문의를 시작해 보세요.</h2>{/* 기존 내부 견적 링크 임시 보존: /estimate */}<a href={INQUIRY_URL} className="button buttonWhite">견적문의 시작하기 →</a></div></section>
  </>;
}
