import styles from "./SpaceCleaningServices.module.css";

const spaces = [
  {
    no: "01",
    title: "현관 및 거실",
    description: "먼지와 잔여 오염을 세밀하게 정리",
    tags: ["벽·바닥", "신발장", "창틀·문틀", "조명·가구"],
    image: "/images/spaces/living-room.webp",
  },
  {
    no: "02",
    title: "화장실",
    description: "수전과 타일의 물때·분진 집중 관리",
    tags: ["타일·줄눈", "변기·세면대", "수전", "실리콘 곰팡이"],
    image: "/images/spaces/bathroom.webp",
  },
  {
    no: "03",
    title: "주방 및 싱크대",
    description: "수납장 안쪽과 조리 공간 오염 제거",
    tags: ["싱크대 내부", "벽 타일", "렌지후드", "주방 수납장"],
    image: "/images/spaces/kitchen.webp",
  },
  {
    no: "04",
    title: "방 청소",
    description: "모서리와 문틀까지 꼼꼼하게 정리",
    tags: ["벽·바닥", "콘센트", "문틀", "붙박이장"],
    image: "/images/spaces/bedroom.webp",
  },
  {
    no: "05",
    title: "베란다·다용도실",
    description: "분진과 배수구 주변 오염 집중 관리",
    tags: ["바닥·타일", "샷시·유리", "창틀", "배수구"],
    image: "/images/spaces/balcony.webp",
  },
  {
    no: "06",
    title: "피톤치드 마감",
    description: "청소 후 실내를 쾌적하게 마무리",
    tags: ["실내 공간", "현관", "주방", "수납장"],
    image: "/images/spaces/phytoncide-finish.webp",
  },
] as const;

export default function SpaceCleaningServices() {
  return (
    <section className={styles.section} aria-labelledby="space-cleaning-title">
      <div className="shell">
        <div className={styles.heading}>
          <span>SPACE CLEANING</span>
          <h2 id="space-cleaning-title">공간별 <em>맞춤 청소</em> 서비스</h2>
          <p>눈에 보이는 곳부터 놓치기 쉬운 안쪽까지 공간별 기준으로 관리합니다.</p>
        </div>

        <div className={styles.grid}>
          {spaces.map((space) => (
            <article className={styles.card} key={space.no}>
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${space.image})` }}
                role="img"
                aria-label={`${space.title} 청소 이미지`}
              >
                <span>{space.no}</span>
              </div>
              <div className={styles.content}>
                <h3>{space.title}</h3>
                <p>{space.description}</p>
                <div className={styles.tags} aria-label={`${space.title} 청소 범위`}>
                  {space.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
