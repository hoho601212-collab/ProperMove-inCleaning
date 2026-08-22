import styles from "./SpecialReasons.module.css";

const reasons = [
  {
    no: "01",
    title: "친환경 세제",
    description: "공간과 오염 상태에 맞춘 세제 사용",
    image: "/images/features/eco-detergent.webp",
  },
  {
    no: "02",
    title: "구역별 도구 분리",
    description: "주방·욕실·거실 청소 도구 구분",
    image: "/images/features/separated-tools.webp",
  },
  {
    no: "03",
    title: "스팀 살균 케어",
    description: "오염 취약 구역을 꼼꼼하게 관리",
    image: "/images/features/steam-care.webp",
  },
  {
    no: "04",
    title: "피톤치드 마감",
    description: "청소 후 쾌적한 실내 마무리",
    image: "/images/features/phytoncide-care.webp",
  },
  {
    no: "05",
    title: "사후 점검 안내",
    description: "작업 완료 후 현장 확인 절차",
    image: "/images/features/after-service.webp",
  },
  {
    no: "06",
    title: "투명한 견적 안내",
    description: "추가 작업과 비용을 사전에 확인",
    image: "/images/features/transparent-estimate.webp",
  },
] as const;

export default function SpecialReasons() {
  return (
    <section className={styles.section} aria-labelledby="special-reasons-title">
      <div className="shell">
        <div className={styles.heading}>
          <span>고객을 위한 6가지 서비스</span>
          <h2 id="special-reasons-title">특별한 이유</h2>
          <p>청소 과정부터 마무리 확인까지, 안심할 수 있는 기준을 지킵니다.</p>
        </div>

        <div className={styles.grid}>
          {reasons.map((reason) => (
            <article className={styles.card} key={reason.no}>
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${reason.image})` }}
                role="img"
                aria-label={`${reason.title} 서비스 이미지`}
              >
                <span>{reason.no}</span>
              </div>
              <div className={styles.copy}>
                <small>{reason.no}</small>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
