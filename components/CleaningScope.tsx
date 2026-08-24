import Image from "next/image";
import styles from "./CleaningScope.module.css";

const scopeItems = [
  {
    title: "공통 청소",
    description: "천장·벽·바닥, 조명, 창문·창틀, 문, 스위치와 콘센트까지 꼼꼼하게 정리합니다.",
  },
  {
    title: "주방",
    description: "싱크대 걸레받이, 상·하부장, 가스레인지와 후드 주변의 기름때를 제거합니다.",
  },
  {
    title: "화장실",
    description: "세면대, 욕조·샤워부스, 변기, 수전, 환풍구와 수납장까지 세척합니다.",
  },
  {
    title: "현관",
    description: "현관문과 바닥의 먼지를 제거하고 신발장 안쪽까지 깔끔하게 정리합니다.",
  },
  {
    title: "베란다·다용도실",
    description: "바닥과 창틀의 분진을 제거하고 배수구, 수전 주변을 꼼꼼하게 세척합니다.",
  },
  {
    title: "방",
    description: "바닥, 몰딩과 문틀의 잔여 먼지를 제거하고 붙박이장 안쪽까지 청소합니다.",
  },
] as const;

const roomLabels = ["현관", "거실", "주방", "화장실", "침실", "베란다"];

export default function CleaningScope() {
  return (
    <section className={styles.section} aria-labelledby="cleaning-scope-title">
      <div className="shell">
        <div className={styles.intro}>
          <div className={styles.copy}>
            <span className={styles.eyebrow}>CLEANING SCOPE</span>
            <h2 id="cleaning-scope-title">
              모두의클린<br />
              <em>이사·입주청소 범위</em>
            </h2>
            <strong>우리 집에 꼭 맞는 맞춤형 청소</strong>
            <p>
              집 구조와 오염 상태를 먼저 확인한 뒤 필요한 공간을 빠짐없이
              청소합니다.
            </p>
            <ul>
              <li>외창을 제외한 실내 공간을 기준으로 안내합니다.</li>
              <li>심한 오염과 특수 작업은 현장 확인 후 사전에 안내합니다.</li>
            </ul>
          </div>

          <div className={styles.visual}>
            <Image
              src="/images/home/cleaning-scope-apartment.webp"
              alt="현관, 거실, 주방, 화장실, 침실과 베란다가 보이는 아파트 입체 평면도"
              width={1536}
              height={1024}
              sizes="(max-width: 760px) 100vw, 56vw"
            />
            <div className={styles.roomLabels} aria-hidden="true">
              {roomLabels.map((label) => <span key={label}>{label}</span>)}
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {scopeItems.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
