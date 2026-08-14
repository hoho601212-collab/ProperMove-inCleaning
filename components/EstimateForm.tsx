"use client";

import { useMemo, useState } from "react";

type EstimateValues = Record<string, string>;
type EstimateStep = {
  key: string;
  title: string;
  type?: "date" | "area" | "contact" | "review";
  options?: readonly string[];
};

const optionSteps: readonly EstimateStep[] = [
  { key: "청소 종류", title: "어떤 청소가 필요한가요?", options: ["입주청소", "이사청소", "거주청소", "원룸청소"] },
  { key: "지역", title: "청소할 지역을 선택하세요", options: ["서울", "경기", "인천", "부산", "대구", "기타 지역"] },
  { key: "청소 예정일", title: "청소 예정일을 알려주세요", type: "date" },
  { key: "건물 유형", title: "건물 유형을 알려주세요", options: ["아파트", "오피스텔", "빌라·주택", "원룸", "상가·사무실"] },
  { key: "면적", title: "청소할 면적을 입력하세요", type: "area" },
  { key: "추가 조건", title: "가장 먼저 확인할 추가 조건은 무엇인가요?", options: ["신축 분진", "스티커·보호필름", "곰팡이", "심한 오염", "가구 있음", "해당 없음"] },
  { key: "연락처", title: "견적 확인을 위한 정보를 입력하세요", type: "contact" },
  { key: "확인", title: "입력한 조건을 확인하세요", type: "review" },
] as const;

export default function EstimateForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<EstimateValues>({});
  const current = optionSteps[step];
  const pyeong = useMemo(() => {
    const area = Number(values["면적"]);
    return area > 0 ? (area / 3.3058).toFixed(1) : "0.0";
  }, [values]);

  const setValue = (key: string, value: string) => setValues(previous => ({ ...previous, [key]: value }));
  const canContinue = current.type === "review" || Boolean(values[current.key]);
  const next = () => setStep(previous => Math.min(previous + 1, optionSteps.length - 1));
  const previous = () => setStep(currentStep => Math.max(currentStep - 1, 0));

  return <div className="steps">
    <div className="stepMeta"><b>STEP {step + 1}</b><span>{step + 1} / {optionSteps.length}</span></div>
    <div className="progress" aria-label={`견적 입력 ${step + 1}단계`}><i style={{ width: `${((step + 1) / optionSteps.length) * 100}%` }} /></div>
    <div className="stepBox">
      <span className="eyebrow">{current.key}</span>
      <h2>{current.title}</h2>
      {current.options ? <div className="choiceGrid">{current.options.map(option => <button type="button" className={values[current.key] === option ? "selected" : ""} onClick={() => setValue(current.key, option)} key={option}>{option}</button>)}</div> : null}
      {current.type === "date" ? <label className="field">청소 예정일<input type="date" min={new Date().toISOString().slice(0, 10)} value={values[current.key] || ""} onChange={event => setValue(current.key, event.target.value)} /></label> : null}
      {current.type === "area" ? <div className="areaField"><label className="field">면적(㎡)<input type="number" inputMode="decimal" min="1" placeholder="예: 84" value={values[current.key] || ""} onChange={event => setValue(current.key, event.target.value)} /></label><div className="areaPreview"><small>참고용 환산</small><strong>약 {pyeong}평</strong></div><p>전용면적과 공급면적이 다를 수 있으므로 업체가 사용하는 면적 기준을 확인하세요.</p></div> : null}
      {current.type === "contact" ? <div className="contactFields"><label className="field">이름<input autoComplete="name" placeholder="이름" value={values["이름"] || ""} onChange={event => setValue("이름", event.target.value)} /></label><label className="field">전화번호<input type="tel" inputMode="tel" autoComplete="tel" placeholder="010-0000-0000" value={values["연락처"] || ""} onChange={event => setValue("연락처", event.target.value)} /></label><p className="legal">현재 입력 내용은 이 기기에만 표시되며 서버로 전송하거나 저장하지 않습니다. 실제 신청 기능은 개인정보 처리방침과 제3자 제공 범위 확정 후 연결됩니다.</p></div> : null}
      {current.type === "review" ? <div className="reviewList">{Object.entries(values).filter(([key]) => key !== "이름").map(([key, value]) => <div key={key}><span>{key}</span><b>{key === "면적" ? `${value}㎡ · 약 ${pyeong}평` : value}</b></div>)}<div><span>이름</span><b>{values["이름"] || "미입력"}</b></div><p className="legal">업체별로 가격뿐 아니라 작업인원, 예상 작업시간, 기본 범위, 추가 작업과 추가요금 기준을 같은 조건으로 비교하세요.</p></div> : null}
      <div className="stepActions"><button type="button" className="plainButton" disabled={step === 0} onClick={previous}>← 이전</button>{current.type === "review" ? <button type="button" className="button" onClick={() => window.print()}>조건 인쇄·저장</button> : <button type="button" className="button" disabled={!canContinue || (current.type === "contact" && !values["이름"])} onClick={next}>다음 →</button>}</div>
    </div>
  </div>;
}
