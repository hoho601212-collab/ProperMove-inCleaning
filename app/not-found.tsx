import Link from "next/link";
import { INQUIRY_URL } from "@/lib/inquiry";

export default function NotFound() {
  return (
    <section className="notFoundPage">
      <div className="shell notFoundCard">
        <span className="notFoundCode">404</span>
        <span className="eyebrow">PAGE NOT FOUND</span>
        <h1>찾으시는 페이지가 없어요.</h1>
        <p>주소가 변경되었거나 삭제된 페이지입니다.<br />지역별 청소 정보나 준비 가이드에서 필요한 내용을 다시 찾아보세요.</p>
        <div className="notFoundActions">
          <Link href="/" className="button">홈으로 돌아가기</Link>
          <Link href="/cleaning" className="outlineButton">지역별 청소 보기</Link>
          <a href={INQUIRY_URL} className="textLink">견적문의 →</a>
        </div>
      </div>
    </section>
  );
}
