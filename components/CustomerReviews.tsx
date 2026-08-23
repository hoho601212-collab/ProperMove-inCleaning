import styles from "./CustomerReviews.module.css";

const reviewSlots = [
  {
    no: "01",
    images: ["01", "02", "03"],
    content: "예약했던 시간보다 조금 일찍 도착해주셔서 전체 진행도 빠르고 깔끔하게 마무리되어서 만족합니다!",
  },
  { no: "02", images: ["01", "02", "03"] },
  { no: "03", images: ["01", "02", "03"] },
  { no: "04", images: ["01", "02", "03"] },
] as const;

export default function CustomerReviews() {
  return (
    <section className={styles.section} aria-labelledby="customer-review-title">
      <div className="shell">
        <div className={styles.heading}>
          <span>CUSTOMER REVIEW</span>
          <h2 id="customer-review-title">청소 후 고객이 직접 남긴 후기</h2>
          <p>실제 이용이 확인된 후기와 작업 현장 사진만 정직하게 공개합니다.</p>
        </div>

        <div className={styles.trustBar} aria-label="후기 공개 원칙">
          <span><b>01</b> 실제 이용 확인</span>
          <span><b>02</b> 고객 동의 후 공개</span>
          <span><b>03</b> 개인정보 보호</span>
        </div>

        <div className={styles.grid}>
          {reviewSlots.map((review) => (
            <article className={styles.card} key={review.no}>
              <div className={styles.cardTop}>
                <div className={styles.avatar} aria-hidden="true">✓</div>
                <div>
                  <strong>실제 고객 후기 등록 위치</strong>
                  <span>고객명 · 작업 지역 · 청소 종류 · 작업일</span>
                </div>
                <small>이용 확인</small>
              </div>
              <p className={styles.placeholder}>
                {"content" in review
                  ? review.content
                  : "고객이 작성한 후기 원문을 등록하면 이 영역에 표시됩니다. 임의로 작성한 후기는 사용하지 않습니다."}
              </p>
              <div className={styles.photos} aria-label={`후기 ${review.no} 작업 사진 업로드 위치`}>
                {review.images.map((image) => (
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

        <p className={styles.notice}>고객 동의를 받은 후기만 개인정보를 가린 후 게시합니다.</p>
      </div>
    </section>
  );
}
