"use client";

import { useMemo, useState } from "react";
import { INQUIRY_URL } from "@/lib/inquiry";

const scopeItems = ["방 바닥", "거실", "주방", "싱크대 내부", "수납장 내부", "욕실", "베란다", "창틀", "샷시", "붙박이장", "신축 분진", "스티커", "보호필름", "곰팡이"];

export default function HomeTools() {
  const [m2, setM2] = useState("84");
  const [selected, setSelected] = useState<string[]>(["방 바닥", "거실", "주방", "욕실", "창틀"]);
  const pyeong = useMemo(() => Number(m2) > 0 ? (Number(m2) / 3.3058).toFixed(1) : "0.0", [m2]);
  const toggle = (item: string) => setSelected(s => s.includes(item) ? s.filter(x => x !== item) : [...s, item]);
  return <section className="section shell toolsSection"><div className="toolTabs"><span className="active">평수 계산</span><span>청소 범위 체크</span><span>검수 준비</span></div><div className="toolsGrid">
    <div className="calculator"><span className="eyebrow">AREA CALCULATOR</span><h2>우리 집은 몇 평일까요?</h2><p>전용면적을 입력하면 참고용 평수로 환산합니다.</p><label>면적 입력<div className="inputWrap"><input type="number" min="0" value={m2} onChange={e => setM2(e.target.value)} aria-label="제곱미터 면적"/><b>㎡</b></div></label><div className="result"><span>계산 결과</span><strong>약 <em>{pyeong}</em>평</strong></div><small>전용면적과 공급면적은 다를 수 있습니다. 견적 업체가 어떤 면적을 기준으로 하는지 확인하세요.</small></div>
    <div className="scope"><div className="scopeHead"><div><span className="eyebrow">CLEANING SCOPE</span><h2>필요한 청소 범위를 체크하세요</h2></div><strong>{selected.length}<small>개 선택</small></strong></div><div className="checkGrid">{scopeItems.map(item => <button type="button" onClick={() => toggle(item)} className={selected.includes(item) ? "checked" : ""} key={item}><i>{selected.includes(item) ? "✓" : ""}</i>{item}</button>)}</div>{/* 기존 내부 견적 링크 임시 보존: /estimate */}<a href={INQUIRY_URL} className="button wide">선택한 조건으로 견적 문의하기 →</a></div>
  </div></section>;
}
