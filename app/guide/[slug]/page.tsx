import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guideDetails, guides } from "@/lib/content";
import { INQUIRY_URL } from "@/lib/inquiry";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

const guideMeta: Record<string, { title: string; description: string }> = {
  "move-in-cleaning-checklist": { title: "입주청소 체크리스트 | 청소 전 준비부터 완료 검수까지", description: "입주청소 전에 전달할 집 정보와 출입·주차 조건부터 작업 범위 확인, 청소 완료 후 창틀·수납장·배수구 검수까지 순서대로 확인하세요." },
  "cleaning-scope": { title: "입주청소 범위 | 기본 청소와 추가 작업 구분하기", description: "입주청소 기본 범위에 포함되는 바닥·주방·욕실·창틀·수납공간과 외부유리, 가전 내부, 스티커 제거 등 별도 확인이 필요한 작업을 구분합니다." },
  "cleaning-price": { title: "입주청소 비용이 달라지는 이유 | 면적·오염·추가작업 확인", description: "입주청소 비용은 평수만으로 정해지지 않습니다. 창호와 수납량, 오염 상태, 복층 여부, 주차·엘리베이터와 추가 작업 등 견적 차이를 만드는 조건을 확인하세요." },
  "new-apartment-dust": { title: "신축 아파트 공사 분진 청소 | 창틀·수납·몰딩 확인", description: "신축 아파트 입주 전 남기 쉬운 공사 분진을 창틀·문틀·몰딩·붙박이장·주방 수납 등 위치별로 확인하고 청소 후 재확인할 부분을 안내합니다." },
  "after-cleaning-inspection": { title: "입주청소 후 검수 체크리스트 | 놓치기 쉬운 곳 확인", description: "입주청소가 끝난 뒤 문틀 위, 창틀 모서리, 수납장 안쪽, 주방·욕실과 배수구 등 놓치기 쉬운 부분을 밝은 상태에서 확인하는 검수 순서를 정리했습니다." },
  "cleaning-before-moving": { title: "입주 전 청소 준비 | 이삿짐 반입 전 확인할 사항", description: "입주청소와 이삿짐 반입 일정이 겹치지 않도록 작업시간과 검수시간을 확보하고 관리사무소 출입, 주차, 엘리베이터와 현장 준비사항을 확인하세요." },
  "area-calculator": { title: "입주청소 평수 계산 | 전용면적·공급면적 확인 방법", description: "입주청소 견적 전에 전용면적과 공급면적의 차이를 확인하고 제곱미터와 평 단위를 구분하세요. 업체에 같은 면적 기준을 전달해 견적 조건을 비교하는 방법을 안내합니다." },
  "new-house-air-quality": { title: "신축 주택 실내공기질 | 입주 전 환기와 오염원 확인", description: "신축 주택 입주 전 실내공기질과 환기 시 확인할 기본 정보를 정리했습니다. 청소로 해결되는 먼지·오염과 별도로 환기와 자재에서 발생할 수 있는 오염원을 구분하세요." },
};

function getGuideMeta(slug: string, title: string, lead: string) {
  return guideMeta[slug] ?? { title: `${title} | 입주청소 준비 가이드`, description: lead };
}

export function generateStaticParams() { return Object.keys(guides).map(slug => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const key = slug as keyof typeof guides; const title = guides[key]; if (!title) return {}; const meta = getGuideMeta(slug, title, guideDetails[key].lead); return { title: meta.title, description: meta.description, alternates: { canonical: `/guide/${slug}` }, openGraph: { title: meta.title, description: meta.description, type: "article" } }; }

export default async function GuidePage({ params }: Props) {
  const { slug } = await params; const key = slug as keyof typeof guides; const title = guides[key]; if (!title) notFound(); const detail = guideDetails[key]; const meta = getGuideMeta(slug, title, detail.lead); const related = Object.entries(guides).filter(([key]) => key !== slug).slice(0, 3);
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "청소 가이드", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: title, item: `${SITE_URL}/guide/${slug}` }] };
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: meta.title, description: meta.description, inLanguage: "ko-KR", mainEntityOfPage: `${SITE_URL}/guide/${slug}`, author: { "@type": "Organization", name: "올바른청소", url: SITE_URL }, publisher: { "@type": "Organization", name: "올바른청소", url: SITE_URL } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} /><section className="pageHero"><div className="shell"><nav className="breadcrumbs" aria-label="현재 위치"><Link href="/">홈</Link><span>›</span><Link href="/guide">청소 가이드</Link><span>›</span><b>{title}</b></nav><span className="eyebrow">PRACTICAL GUIDE</span><h1>{title}</h1><p>{detail.lead}</p></div></section><section className="section shell"><div className="contentGrid">{detail.items.map((item, index) => <article className="contentCard" key={item.title}><span className="eyebrow">CHECK {index + 1}</span><h2>{item.title}</h2><p>{item.body}</p></article>)}</div><p className="guideNotice">{detail.note}</p><div className="relatedLinks"><div><span className="eyebrow">KEEP READING</span><h2>다음 준비 가이드</h2></div><div>{related.map(([key, label]) => <Link href={`/guide/${key}`} key={key}>{label}<span>→</span></Link>)}<Link href="/service">청소 종류 비교하기<span>→</span></Link></div></div><div className="areaBox" style={{ marginTop: 40 }}><div><h2>확인한 조건으로 견적문의</h2><p>가격, 인원, 작업시간, 포함 범위와 추가요금 기준을 같은 기준으로 문의하세요.</p></div>{/* 기존 내부 견적 링크 임시 보존: /estimate */}<a className="button" href={INQUIRY_URL}>견적문의 →</a></div></section></>;
}
