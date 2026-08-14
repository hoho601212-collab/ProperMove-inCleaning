import Link from "next/link";import {services} from "@/lib/content";
export const metadata={title:"청소 종류",description:"입주청소, 이사청소, 거주청소 등 공간과 상황에 맞는 청소 범위를 확인하세요."};
export default function Page(){return <><section className="pageHero"><div className="shell"><span className="eyebrow">SERVICE</span><h1>청소 종류</h1><p>이름이 같아도 업체마다 포함 범위가 다를 수 있습니다.</p></div></section><section className="section shell contentGrid">{Object.entries(services).map(([slug,s])=><Link className="contentCard" href={`/service/${slug}`} key={slug}><h2>{s.name}</h2><p>{s.lead}</p><b>범위 확인하기 →</b></Link>)}</section></>}
