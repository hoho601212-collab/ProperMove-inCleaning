"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type RegionItem = { slug: string; city: string; district: string; description: string };

export default function RegionDirectory({ regions }: { regions: RegionItem[] }) {
  const [query, setQuery] = useState("");
  const [activeCity, setActiveCity] = useState("전체");
  const cities = useMemo(() => ["전체", ...new Set(regions.map((region) => region.city))], [regions]);
  const filteredRegions = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase("ko");
    return regions.filter((region) => (activeCity === "전체" || region.city === activeCity) && (!keyword || `${region.city} ${region.district}`.toLocaleLowerCase("ko").includes(keyword)));
  }, [activeCity, query, regions]);

  return <div className="regionDirectory">
    <div className="regionDirectoryTop">
      <label className="regionSearch"><span className="srOnly">지역명 검색</span><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="예: 강남구, 수원시" autoComplete="off" /></label>
      <p className="regionCount" aria-live="polite"><b>{filteredRegions.length}</b>개 지역 가이드</p>
    </div>
    <div className="regionFilters" aria-label="시·도 선택">{cities.map((city) => <button type="button" className={activeCity === city ? "active" : ""} aria-pressed={activeCity === city} onClick={() => setActiveCity(city)} key={city}>{city}</button>)}</div>
    {filteredRegions.length ? <div className="regionCardGrid">{filteredRegions.map((region) => <Link href={`/cleaning/${region.slug}`} className="regionCard" key={region.slug}><span>{region.city}</span><h2>{region.district} 입주청소</h2><p>{region.description}</p><b>지역 가이드 보기 →</b></Link>)}</div> : <div className="regionEmpty"><b>검색 결과가 없습니다.</b><p>지역명을 다시 입력하거나 ‘전체’를 선택해 주세요.</p></div>}
  </div>;
}
