import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guideDetails, guides } from "@/lib/content";
import { INQUIRY_URL } from "@/lib/inquiry";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return Object.keys(guides).map(slug => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const key = slug as keyof typeof guides; const title = guides[key]; const description = title ? guideDetails[key].lead : ""; return title ? { title, description, alternates: { canonical: `/guide/${slug}` }, openGraph: { title, description, type: "article" } } : {}; }

export default async function GuidePage({ params }: Props) {
  const { slug } = await params; const key = slug as keyof typeof guides; const title = guides[key]; if (!title) notFound(); const detail = guideDetails[key]; const related = Object.entries(guides).filter(([key]) => key !== slug).slice(0, 3);
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "청소 가이드", item: `${SITE_URL}/guide` }, { "@type": "ListItem", position: 3, name: title, item: `${SITE_URL}/guide/${slug}` }] };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} /><section className="pageHero"><div className="shell"><nav className="breadcrumbs" aria-label="현재 위치"><Link href="/">홈</Link><span>›</span><Link href="/guide">청소 가이드</Link><span>›</span><b>{title}</b></nav><span className="eyebrow">PRACTICAL GUIDE</span><h1>{title}</h1><p>{detail.lead}</p></div></section><section className="section shell"><div className="contentGrid">{detail.items.map((item, index) => <article className="contentCard" key={item.title}><span className="eyebrow">CHECK {index + 1}</span><h2>{item.title}</h2><p>{item.body}</p></article>)}</div><p className="guideNotice">{detail.note}</p><div className="relatedLinks"><div><span className="eyebrow">KEEP READING</span><h2>다음 준비 가이드</h2></div><div>{related.map(([key, label]) => <Link href={`/guide/${key}`} key={key}>{label}<span>→</span></Link>)}<Link href="/service">청소 종류 비교하기<span>→</span></Link></div></div><div className="areaBox" style={{ marginTop: 40 }}><div><h2>확인한 조건으로 견적문의</h2><p>가격, 인원, 작업시간, 포함 범위와 추가요금 기준을 같은 기준으로 문의하세요.</p></div>{/* 기존 내부 견적 링크 임시 보존: /estimate */}<a className="button" href={INQUIRY_URL}>견적문의 →</a></div></section></>;
}
