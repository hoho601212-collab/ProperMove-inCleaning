import styles from "./RegionalReviewMarquee.module.css";

const reviews = [
  {
    no: "01",
    meta: "임** · 경기도 · 이사청소 · 2026년 7월",
    content: "예약했던 시간보다 조금 일찍 도착해주셔서 전체 진행도 빠르고 깔끔하게 마무리되어서 만족합니다!",
  },
  {
    no: "02",
    meta: "김** · 경기도 · 이사청소 · 2026년 7월",
    content: "화장실이랑 주방 오염이 많았는데 전체적으로 꼼꼼하게 청소해주셔서 정말 만족합니다!",
  },
  {
    no: "03",
    meta: "박** · 서울 · 이사청소 · 2026년 5월",
    content: "신축 분진 때문에 걱정이 많았는데 창틀이랑 바닥까지 깨끗하게 정리해주셨어요 감사합니다 :)",
  },
  {
    no: "04",
    meta: "최** · 부산 · 이사청소 · 2026년 5월",
    content: "혼자 하기 힘들었던 베란다랑 욕실까지 세심하게 작업해주셔서 너무 만족스러웠어요!",
  },
] as const;

function ReviewTrack() {
  return (
    <div className={styles.track} aria-hidden="true">
      {reviews.map((review) => (
        <article className={styles.card} key={review.no}>
          <div className={styles.cardTop}>
            <div className={styles.avatar}>😊</div>
            <div>
              <strong>실제 고객 후기</strong>
              <span>{review.meta}</span>
            </div>
            <small>이용 확인</small>
          </div>
          <p>{review.content}</p>
          <div className={styles.photos}>
            {["01", "02", "03"].map((image) => (
              <div
                className={styles.photo}
                key={image}
                style={{ backgroundImage: `url(/images/reviews/review-${review.no}/${image}.webp)` }}
                role="img"
                aria-label={`후기 ${review.no} 작업 사진 ${image}`}
              >
                <span>사진 {image}</span>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export default function RegionalReviewMarquee() {
  return (
    <section className={styles.section} aria-label="실제 고객 후기">
      <div className={styles.heading}>
        <span>CUSTOMER REVIEW</span>
        <h2>실제 이용 고객 후기</h2>
        <p>실제 이용이 확인된 후기와 작업 사진을 한눈에 확인하세요.</p>
      </div>
      <div className={styles.viewport}>
        <div className={styles.marquee}>
          <ReviewTrack />
          <ReviewTrack />
        </div>
      </div>
      <p className={styles.notice}>고객 동의를 받은 후기만 개인정보를 가린 후 게시합니다.</p>
    </section>
  );
}
