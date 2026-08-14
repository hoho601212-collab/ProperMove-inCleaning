import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "올바른청소",
    short_name: "올바른청소",
    description: "입주청소 범위와 지역별 작업 조건을 확인하는 청소 준비 가이드",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b2b3c",
    lang: "ko-KR",
  };
}
