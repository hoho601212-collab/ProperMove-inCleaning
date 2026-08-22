import {
  apartmentDataUpdatedAt,
  upcomingApartments,
} from "@/lib/upcoming-apartments";

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function UpcomingApartments() {
  return (
    <section className="apartmentSection" aria-labelledby="upcoming-apartments-title">
      <div className="shell">
        <div className="apartmentHeader">
          <div>
            <span className="eyebrow">MOVE-IN CALENDAR</span>
            <h2 id="upcoming-apartments-title">2026년 입주 예정 아파트</h2>
            <p>새 아파트 입주 일정을 확인하고 입주청소 준비 시기를 미리 계획하세요.</p>
          </div>
          <div className="apartmentUpdated">
            <span>자료 확인</span>
            <strong>{dateFormatter.format(new Date(`${apartmentDataUpdatedAt}T00:00:00+09:00`))}</strong>
          </div>
        </div>

        <div className="apartmentList">
          {upcomingApartments.map((apartment) => (
            <article className="apartmentRow" key={`${apartment.month}-${apartment.name}`}>
              <div className="apartmentMonth" aria-label={`${apartment.month}월 입주 예정`}>
                <strong>{apartment.month}</strong>
                <span>월</span>
              </div>
              <div className="apartmentName">
                <h3>{apartment.name}</h3>
                <p>{apartment.location}<span>출처 {apartment.source}</span></p>
              </div>
              <div className="apartmentHouseholds">
                <span>총 세대수</span>
                <strong>{apartment.households.toLocaleString("ko-KR")}세대</strong>
              </div>
              <a
                className="apartmentLink"
                href={apartment.infoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${apartment.name} 분양 정보 새 창에서 보기`}
              >
                분양 정보 바로가기 <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>

        <div className="apartmentNotice">
          <span>일정 안내</span>
          <p>입주 예정일은 공사 및 사업 일정에 따라 변경될 수 있습니다. 계약·예약 전 연결된 단지 정보에서 최신 일정을 확인해 주세요.</p>
          <a href="https://www.applyhome.co.kr/" target="_blank" rel="noopener noreferrer">청약Home 확인 →</a>
        </div>
      </div>
    </section>
  );
}
