"use client";
import { useState } from "react";

const steps = [
  {title:"어떤 청소가 필요한가요?",key:"청소 종류",options:["입주청소","이사청소","거주청소","원룸청소"]},
  {title:"청소할 지역을 선택하세요",key:"지역",options:["서울","경기","인천","부산","대구","기타 지역"]},
  {title:"건물 유형을 알려주세요",key:"건물 유형",options:["아파트","오피스텔","빌라·주택","원룸","상가·사무실"]},
  {title:"추가 확인이 필요한 조건이 있나요?",key:"추가 조건",options:["신축 분진","스티커·보호필름","곰팡이","심한 오염","가구 있음","해당 없음"]},
];
export default function EstimateForm(){const [step,setStep]=useState(0);const [values,setValues]=useState<Record<string,string>>({});const current=steps[step];const done=step===steps.length;return <div className="steps"><b>STEP {Math.min(step+1,steps.length)} / {steps.length}</b><div className="progress"><i style={{width:`${Math.min((step+1)/steps.length*100,100)}%`}}/></div><div className="stepBox">{!done?<><span className="eyebrow">{current.key}</span><h2>{current.title}</h2><div className="choiceGrid">{current.options.map(o=><button type="button" className={values[current.key]===o?"selected":""} onClick={()=>setValues({...values,[current.key]:o})} key={o}>{o}</button>)}</div><div className="stepActions"><button className="plainButton" disabled={step===0} onClick={()=>setStep(step-1)}>← 이전</button><button className="button" disabled={!values[current.key]} onClick={()=>setStep(step+1)}>다음 →</button></div></>:<><span className="eyebrow">확인 및 신청</span><h2>선택한 조건을 확인하세요</h2>{Object.entries(values).map(([k,v])=><p key={k}><b>{k}</b> · {v}</p>)}<div className="legal">실제 연락처 제출과 업체 전달 기능은 개인정보 처리방침 및 제3자 제공 범위가 확정된 뒤 안전하게 연결됩니다. 현재는 견적 조건 정리 기능만 제공합니다.</div><div className="stepActions"><button className="plainButton" onClick={()=>setStep(step-1)}>← 수정하기</button><button className="button" onClick={()=>alert("조건이 정리되었습니다. 운영 정보 확정 후 신청 기능이 연결됩니다.")}>조건 저장하기</button></div></>}</div></div>}
