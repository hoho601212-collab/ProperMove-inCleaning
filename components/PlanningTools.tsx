"use client";

import { useMemo, useState } from "react";

const inspectionItems = ["문틀 위쪽과 몰딩에 먼지가 남았는가?", "창틀 모서리와 배수구를 닦았는가?", "수납장 선반 위·아래와 서랍 내부를 확인했는가?", "싱크대 하부장과 걸레받이 주변을 닦았는가?", "욕실 환풍구 주변과 배수구를 확인했는가?", "베란다 배수구와 문 뒤쪽을 확인했는가?", "붙박이장 모서리와 선반을 닦았는가?"];
const quoteItems = ["부가세·출장비를 포함한 최종 금액", "작업 인원과 예상 작업시간", "창틀·수납장·베란다 기본 범위", "외창·가전·곰팡이 등 제외 항목", "현장 추가요금이 생기는 조건", "작업 후 검수와 보완 요청 기준"];
const schedule = [[-14, "업체 비교", "청소 종류와 현장 조건을 정리합니다."], [-7, "범위 확정", "기본·선택·별도 작업을 견적서에 표시합니다."], [-3, "출입 확인", "관리사무소, 주차와 엘리베이터를 확인합니다."], [-1, "빈집 확인", "작업 동선과 수도·전기를 확인합니다."], [0, "청소·검수", "작업 직후 놓치기 쉬운 위치까지 확인합니다."]] as const;

function formatKoreanDate(date: Date) { return new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric", weekday: "short" }).format(date); }

export default function PlanningTools() {
  const [moveInDate, setMoveInDate] = useState("");
  const [checked, setChecked] = useState<string[]>([]);
  const [quoteChecked, setQuoteChecked] = useState<string[]>([]);
  const timeline = useMemo(() => {
    if (!moveInDate) return [];
    const base = new Date(`${moveInDate}T12:00:00`);
    return schedule.map(([offset, title, description]) => { const date = new Date(base); date.setDate(base.getDate() + offset); return { offset, title, description, label: formatKoreanDate(date) }; });
  }, [moveInDate]);
  const toggle = (item: string) => setChecked(previous => previous.includes(item) ? previous.filter(value => value !== item) : [...previous, item]);
  const toggleQuote = (item: string) => setQuoteChecked(previous => previous.includes(item) ? previous.filter(value => value !== item) : [...previous, item]);

  return <section className="planningSection"><div className="shell"><div className="sectionHead"><div><span className="eyebrow">MOVE-IN PLAN</span><h2>청소 일정과 현장 검수를 한 번에 준비하세요</h2></div><span className="sectionNote">입주일 기준 참고 일정</span></div><div className="planningGrid">
    <article className="datePlanner"><h3>입주청소 날짜 계산</h3><p>입주예정일을 입력하면 준비 일정을 역산합니다.</p><label className="field">입주예정일<input type="date" min={new Date().toISOString().slice(0, 10)} value={moveInDate} onChange={event => setMoveInDate(event.target.value)} /></label>{timeline.length > 0 ? <div className="timeline">{timeline.map(item => <div key={item.offset}><b>{item.offset === 0 ? "청소일" : `D${item.offset}`}</b><span><strong>{item.title}</strong><small>{item.label} · {item.description}</small></span></div>)}</div> : <div className="emptyPlan">입주예정일을 선택하면 D-14부터 청소일까지 표시됩니다.</div>}</article>
    <article className="inspection"><div className="inspectionHead"><div><h3>청소 후 현장 검수</h3><p>스마트폰으로 하나씩 확인하세요.</p></div><strong>{checked.length}/{inspectionItems.length}</strong></div><div className="inspectionList">{inspectionItems.map(item => <button type="button" className={checked.includes(item) ? "checked" : ""} onClick={() => toggle(item)} key={item}><i>{checked.includes(item) ? "✓" : ""}</i><span>{item}</span></button>)}</div><div className="completionBar"><i style={{ width: `${(checked.length / inspectionItems.length) * 100}%` }} /></div></article>
    <article className="quoteCompare"><div className="inspectionHead"><div><span className="eyebrow">QUOTE COMPARISON</span><h3>업체마다 같은 6가지를 확인하세요</h3><p>금액만 적지 말고 조건을 모두 받아야 견적 차이를 이해하기 쉽습니다.</p></div><strong>{quoteChecked.length}/{quoteItems.length}</strong></div><div className="quoteCheckGrid">{quoteItems.map(item => <button type="button" className={quoteChecked.includes(item) ? "checked" : ""} onClick={() => toggleQuote(item)} key={item}><i>{quoteChecked.includes(item) ? "✓" : ""}</i><span>{item}</span></button>)}</div><div className="completionBar"><i style={{ width: `${(quoteChecked.length / quoteItems.length) * 100}%` }} /></div>{quoteChecked.length === quoteItems.length && <p className="compareComplete" role="status">비교 준비가 끝났습니다. 같은 조건으로 2곳 이상에 문의해 보세요.</p>}</article>
  </div></div></section>;
}
