import { ImageResponse } from "next/og";

export const alt = "올바른청소 - 입주청소 비교견적과 준비 가이드";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        color: "#102f3d",
        background: "linear-gradient(135deg, #f4fbfa 0%, #ffffff 55%, #dff7f1 100%)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 34, fontWeight: 800 }}>
        <span
          style={{
            width: 58,
            height: 58,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "18px 18px 18px 6px",
            color: "#063e3b",
            background: "#28c6b0",
          }}
        >
          <span style={{ width: 25, height: 13, borderLeft: "6px solid #063e3b", borderBottom: "6px solid #063e3b", transform: "rotate(-45deg) translateY(-2px)" }} />
        </span>
        올바른청소
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ color: "#148c91", fontSize: 25, fontWeight: 700, letterSpacing: 3 }}>
          전국 입주청소 비교 가이드
        </span>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 24, fontSize: 62, fontWeight: 850, lineHeight: 1.22 }}>
          <span>가격만 보지 말고</span>
          <span style={{ color: "#0b8d92" }}>청소 범위와 작업조건까지</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 28, color: "#527078", fontSize: 22 }}>
        <span>청소 범위 확인</span>
        <span>지역별 작업조건</span>
        <span>견적 비교 준비</span>
      </div>
    </div>,
    size,
  );
}
