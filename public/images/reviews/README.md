# 고객 후기 이미지 업로드 경로

후기별 작업 사진은 WebP, 가로형 4:3 비율을 권장합니다.

- `review-01/01.webp`, `review-01/02.webp`, `review-01/03.webp`
- `review-02/01.webp`, `review-02/02.webp`, `review-02/03.webp`
- `review-03/01.webp`, `review-03/02.webp`, `review-03/03.webp`
- `review-04/01.webp`, `review-04/02.webp`, `review-04/03.webp`

업로드 기준 경로: `public/images/reviews/review-{번호}/{사진번호}.webp`

고객 얼굴, 차량번호, 공동현관 정보 등 개인정보는 업로드 전에 가림 처리합니다.
