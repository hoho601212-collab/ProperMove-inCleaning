import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { regions } from "@/lib/regions";
import { INQUIRY_URL } from "@/lib/inquiry";

type Props = { params: Promise<{ sido: string; sigungu: string }> };

export function generateStaticParams() { return Object.keys(regions).map(key => { const [sido, sigungu] = key.split("/"); return { sido, sigungu }; }); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sido, sigungu } = await params; const region = regions[`${sido}/${sigungu}`];
  if (!region) return {};
  return { title: region.title, description: region.description, alternates: { canonical: `/cleaning/${region.slug}` }, openGraph: { title: region.title, description: region.description, type: "article" } };
}

export default async function RegionPage({ params }: Props) {
  const { sido, sigungu } = await params; const region = regions[`${sido}/${sigungu}`]; if (!region) notFound();
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: region.faq.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: "/" }, { "@type": "ListItem", position: 2, name: "지역별 입주청소", item: "/cleaning" }, { "@type": "ListItem", position: 3, name: region.city, item: `/cleaning/${sido}` }, { "@type": "ListItem", position: 4, name: `${region.city} ${region.district}` }] };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <section className="regionHero"><div className="shell"><nav className="breadcrumbs" aria-label="현재 위치"><Link href="/">홈</Link><span>›</span><Link href="/cleaning">지역별 입주청소</Link><span>›</span><Link href={`/cleaning/${sido}`}>{region.city}</Link><span>›</span><b>{region.district}</b></nav><div className="regionHeroGrid"><div><span className="eyebrow">{region.eyebrow}</span><h1>{region.title}</h1><p>{region.description}</p><div className="regionActions">{/* 기존 내부 견적 링크 임시 보존: /estimate */}<a className="button" href={INQUIRY_URL}>견적문의 →</a><a className="textLink" href="#local-check">지역 체크포인트 보기 ↓</a></div></div><div className="regionPlaceholder" role="img" aria-label={`${region.city} ${region.district} 지역 대표 이미지 준비 중`}><span>{region.city}</span><b>{region.district}</b><small>지역 대표 이미지 준비 중</small></div></div></div></section>
    <nav className="areaJump" aria-label={`${region.district} 주요 생활권 바로가기`}><div className="shell"><b>{region.district} 주요 생활권</b><div>{region.zones.map((zone, index) => <a href={`#area-${index + 1}`} key={zone.name}>{zone.name}<span>↓</span></a>)}</div></div></nav>
    <section className="regionSection shell"><div className="regionIntro"><div><span className="eyebrow">LOCAL FINGERPRINT</span><h2>{region.district}에서는<br/>이 조건부터 보세요</h2></div><div>{region.intro.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></div><div className="intentGrid">{region.searchNeeds.map((need, index) => <div key={need}><span>0{index + 1}</span><b>{need}</b></div>)}</div></section>
    <section className="regionSection regionSoft"><div className="shell"><div className="sectionHead"><div><span className="eyebrow">MAIN LIVING AREAS</span><h2>{region.district} 주요 지역별 청소 포인트</h2></div><span className="sectionNote">동 이름보다 실제 건물 조건이 우선입니다</span></div><div className="zoneDetailGrid">{region.zones.map((zone, index) => <article id={`area-${index + 1}`} key={zone.name}><div className="zoneNumber">{String(index + 1).padStart(2, "0")}</div><div className="zoneDetailBody"><span className="zoneHousing">{zone.housing}</span><h3>{zone.name}</h3><p>{zone.cleaning}</p><div className="zoneQuote"><b>견적 문의에 함께 적기</b><ul>{region.checklist.slice(index % 3, index % 3 + 3).map(item => <li key={item}>{item}</li>)}</ul></div></div></article>)}</div></div></section>
    <section className="regionSection shell"><div className="buildCompare"><article><span className="compareLabel new">신축·준신축</span><h2>공사 잔여물을 따로 확인</h2><ul>{region.newBuild.map(item => <li key={item}>{item}</li>)}</ul></article><article><span className="compareLabel old">기존·구축</span><h2>생활 오염과 접근 조건 확인</h2><ul>{region.oldBuild.map(item => <li key={item}>{item}</li>)}</ul></article></div><p className="infoNotice">신축 청소가 실내공기질 개선이나 의학적 효과를 보장하지는 않습니다. 청소, 환기, 실내공기질 측정은 서로 다른 영역입니다.</p></section>
    <section className="regionSection accessSection"><div className="shell accessGrid"><div><span className="eyebrow">ACCESS & PARKING</span><h2>작업 전 출입·주차 확인</h2><p>청소 품질뿐 아니라 작업자가 집까지 장비를 옮길 수 있는 조건도 예상 인원과 시간에 영향을 줄 수 있습니다.</p></div><ol>{region.access.map((item, index) => <li key={item}><b>{index + 1}</b><span>{item}</span></li>)}</ol></div></section>
    <section id="local-check" className="regionSection shell"><div className="sectionHead"><div><span className="eyebrow">LOCAL CHECKLIST</span><h2>{region.district} 입주청소 견적 체크</h2></div><Link href="/guide/move-in-cleaning-checklist" className="textLink">전체 준비 가이드 →</Link></div><div className="localChecklist">{region.checklist.map(item => <div key={item}><i>✓</i><span>{item}</span></div>)}</div></section>
    <section className="regionSection regionSoft"><div className="shell faqLayout"><div><span className="eyebrow">LOCAL FAQ</span><h2>{region.district}에서 자주 묻는 질문</h2><p>업체마다 기본 범위와 추가요금 기준이 다를 수 있으므로 최종 견적서에서 다시 확인하세요.</p></div><div className="faqList">{region.faq.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></div></section>
    <section className="regionSection shell"><div className="sourceBox"><div><span className="eyebrow">FACT CHECK</span><h2>지역 정보 확인 자료</h2><p>지역의 행정구역과 주거 특징은 공식 자료를 우선 참고했습니다. 가격이나 특정 업체의 품질을 의미하지 않습니다.</p></div><div>{region.sources.map(source => <a href={source.href} target="_blank" rel="noreferrer" key={source.href}>{source.label}<span>↗</span></a>)}</div></div><div className="nearby"><b>함께 보는 지역</b>{region.nearby.map(item => <Link href={item.href} key={item.href}>{item.label} →</Link>)}</div></section>
    <section className="finalCta"><div className="shell"><span>{region.city} {region.district} 청소 조건을 정리했다면</span><h2>같은 작업 범위를 기준으로<br/>견적문의를 시작하세요.</h2>{/* 기존 내부 견적 링크 임시 보존: /estimate */}<a href={INQUIRY_URL} className="button buttonWhite">견적문의 시작하기 →</a></div></section>
  </>;
}
