# 지역 상세페이지 이미지 업로드 규칙

## 경로

`public/images/regions/{sido-slug}/{region-slug}.webp`

페이지 슬러그와 이미지 경로를 동일하게 유지합니다.

- `/cleaning/busan/busanjin` → `public/images/regions/busan/busanjin.webp`
- `/cleaning/incheon/songdo` → `public/images/regions/incheon/songdo.webp`
- `/cleaning/gyeonggi/suwon` → `public/images/regions/gyeonggi/suwon.webp`

## 파일 규격

- 형식: WebP
- 권장 크기: 1600 × 900px (16:9)
- 권장 용량: 파일당 250KB 이하
- 색상 공간: sRGB
- 파일명: 영문 소문자, 숫자와 하이픈만 사용
- 금지: 한글, 공백, 괄호, 중복 확장자
- 이미지 안에 전화번호·가격·과도한 문구를 넣지 않음

전체 147개 업로드 경로는 `region-image-manifest.csv`를 기준으로 합니다.

