import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import "./tools.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://proper-move-in-cleaning.vercel.app"),
  title: { default: "올바른청소 | 입주청소 비교견적과 준비 가이드", template: "%s | 올바른청소" },
  description: "입주청소 범위와 현장 조건을 확인하고 여러 업체의 견적을 같은 기준으로 비교하세요.",
};

const nav = [["청소 종류", "/service"], ["지역별 입주청소", "/cleaning"], ["청소 가이드", "/guide"]];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>
    <header className="siteHeader"><div className="shell navWrap">
      <Link href="/" className="brand" aria-label="올바른청소 홈"><span className="brandMark">✓</span>올바른청소</Link>
      <nav aria-label="주요 메뉴">{nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
      <Link href="/estimate" className="button buttonSmall">무료 비교견적</Link>
    </div></header>
    <main>{children}</main>
    <footer><div className="shell footerGrid"><div><Link href="/" className="brand brandLight"><span className="brandMark">✓</span>올바른청소</Link><p>가격뿐 아니라 청소 범위와 작업 조건까지<br/>같은 기준으로 비교하도록 돕습니다.</p></div><div><strong>서비스</strong><Link href="/service/move-in-cleaning">입주청소</Link><Link href="/service/moving-cleaning">이사청소</Link><Link href="/service/studio-cleaning">원룸청소</Link></div><div><strong>도움말</strong><Link href="/cleaning">지역별 입주청소</Link><Link href="/guide">입주청소 가이드</Link><Link href="/estimate">무료 비교견적</Link></div><div><strong>안내</strong><Link href="/privacy">개인정보처리방침</Link><Link href="/terms">이용약관</Link></div></div><div className="shell copyright">© 올바른청소. 실제 청소 범위와 추가 비용은 업체별 현장 조건에 따라 달라질 수 있습니다.</div></footer>
  </body></html>;
}
