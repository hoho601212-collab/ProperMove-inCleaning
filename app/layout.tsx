import type { Metadata } from "next";
import Link from "next/link";
import { INQUIRY_URL } from "@/lib/inquiry";
import { SITE_DOMAIN, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";
import "./tools.css";
import "./regions.css";
import "./branding.css";
import "./apartments.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} | 입주청소 비교견적과 준비 가이드`, template: `%s | ${SITE_NAME}` },
  description: "입주청소 범위와 현장 조건을 확인하고 여러 업체의 견적을 같은 기준으로 비교하세요.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: ["입주청소", "이사청소", "입주청소 업체", "입주청소 견적", "지역별 입주청소"],
  verification: {
    google: "3Ii25IWHCY8PmajIqdpKHiTIaqYA2PLKTO2isPTS7rM",
    other: { "naver-site-verification": "d3938d9a7aa034c2f33c2e9b6d2f811d8a280846" },
  },
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | 입주청소 비교견적과 준비 가이드`,
    description: "입주청소 범위와 현장 조건을 확인하고 업체 견적을 같은 기준으로 비교하세요.",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: "입주청소 범위와 지역별 작업 조건을 확인하세요." },
  robots: { index: true, follow: true },
};

const nav = [["청소 종류", "/service"], ["지역별 입주청소", "/cleaning"], ["청소 가이드", "/guide"]];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: [SITE_DOMAIN, `${SITE_NAME}.kr`],
    url: SITE_URL,
    identifier: SITE_DOMAIN,
    inLanguage: "ko-KR",
    description: "입주청소 범위와 지역별 작업 조건을 확인하는 청소 준비 가이드",
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: SITE_DOMAIN,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
  };
  return <html lang="ko"><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
    <header className="siteHeader"><div className="shell navWrap">
      <Link href="/" className="brand siteLogoLink" aria-label={`${SITE_NAME} 홈`}><img className="siteLogo siteLogoHeader" src="/images/logo.png" alt={SITE_NAME} /></Link>
      <nav aria-label="주요 메뉴">{nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
      <a href={INQUIRY_URL} className="button buttonSmall">견적문의</a>
    </div></header>
    <main>{children}</main>
    <a className="floatingInquiry" href={INQUIRY_URL} aria-label="무료 견적문의 페이지로 이동"><span>무료 견적문의</span><b aria-hidden="true">→</b></a>
    <footer><div className="shell footerGrid"><div><Link href="/" className="brand brandLight siteLogoLink footerLogoLink" aria-label={`${SITE_NAME} 홈`}><img className="siteLogo siteLogoFooter" src="/images/logo.png" alt={SITE_NAME} /></Link><p>비교 분석 전문 플랫폼 올바른(모두클린)<br/>대표: 심준보 l 사업자등록번호: 236-81-01081<br/>주소: 인천광역시 연수구 함박뫼로 50번길 95, 5층<br/>제휴 문의 <a href="mailto:c0810@naver.com">c0810@naver.com</a></p></div><div><strong>서비스</strong><Link href="/service/move-in-cleaning">입주청소</Link><Link href="/service/moving-cleaning">이사청소</Link><Link href="/service/studio-cleaning">원룸청소</Link></div><div><strong>도움말</strong><Link href="/cleaning">지역별 입주청소</Link><Link href="/guide">입주청소 가이드</Link><a href={INQUIRY_URL}>견적문의</a></div><div><strong>안내</strong><Link href="/privacy">개인정보처리방침</Link><Link href="/terms">이용약관</Link><a href="mailto:c0810@naver.com">제휴 문의</a></div></div><div className="shell copyright">© {SITE_NAME}. 실제 청소 범위와 추가 비용은 업체별 현장 조건에 따라 달라질 수 있습니다.</div></footer>
  </body></html>;
}
