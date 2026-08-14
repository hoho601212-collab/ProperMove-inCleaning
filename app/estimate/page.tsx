import { redirect } from "next/navigation";
import { INQUIRY_URL } from "@/lib/inquiry";

// 기존 내부 견적 폼은 외부 문의 연동 기간 동안 임시로 주석 처리합니다.
// import EstimateForm from "@/components/EstimateForm";
// export const metadata = { title: "무료 비교견적", description: "청소 종류, 지역, 면적과 추가 조건을 단계별로 정리해 비교견적을 준비하세요." };
// export default function LegacyEstimatePage(){return <><section className="pageHero"><div className="shell"><span className="eyebrow">FREE ESTIMATE</span><h1>무료 비교견적</h1><p>가격만 묻기 전에 작업 범위를 같은 기준으로 정리해 보세요.</p></div></section><section className="section shell"><EstimateForm/></section></>}

export default function EstimatePage() {
  redirect(INQUIRY_URL);
}
