import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "app/page.tsx",
  "app/cleaning/page.tsx",
  "app/cleaning/[sido]/page.tsx",
  "app/cleaning/[sido]/[sigungu]/page.tsx",
  "app/service/page.tsx",
  "app/service/[slug]/page.tsx",
  "app/guide/page.tsx",
  "app/guide/[slug]/page.tsx",
  "app/privacy/page.tsx",
  "app/terms/page.tsx",
  "app/sitemap.ts",
  "app/robots.ts",
  "app/layout.tsx",
];

const failures = [];
const warnings = [];

function read(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    failures.push(`${relativePath}: 파일 없음`);
    return "";
  }
  return fs.readFileSync(fullPath, "utf8");
}

const sources = new Map(requiredFiles.map(file => [file, read(file)]));
const pageFiles = requiredFiles.filter(file => file.endsWith("page.tsx"));

for (const file of pageFiles) {
  const source = sources.get(file) ?? "";
  if (!source.includes("canonical")) failures.push(`${file}: canonical 선언 없음`);
}

const layout = sources.get("app/layout.tsx") ?? "";
if (!layout.includes("metadataBase: new URL(SITE_URL)")) failures.push("app/layout.tsx: metadataBase가 SITE_URL 기준이 아님");
if (!layout.includes("robots: { index: true, follow: true }")) warnings.push("app/layout.tsx: 기본 index/follow 설정 확인 필요");

const robots = sources.get("app/robots.ts") ?? "";
if (!robots.includes("sitemap: `${SITE_URL}/sitemap.xml`")) failures.push("app/robots.ts: sitemap URL 연결 없음");
if (!robots.includes('allow: "/"')) failures.push("app/robots.ts: 전체 공개 페이지 allow 규칙 확인 필요");

const sitemap = sources.get("app/sitemap.ts") ?? "";
for (const marker of ["fixedPages", "servicePages", "guidePages", "sidoPages", "regionPages"]) {
  if (!sitemap.includes(marker)) failures.push(`app/sitemap.ts: ${marker} 구성 없음`);
}
if (sitemap.includes("const now = new Date()")) warnings.push("app/sitemap.ts: 요청 시각 기반 lastModified 사용 중");

const site = read("lib/site.ts");
if (!site.includes("NEXT_PUBLIC_SITE_URL") || !site.includes("https://올바른청소.kr")) failures.push("lib/site.ts: 운영 도메인 기본값 확인 필요");

console.log("\n=== 올바른청소 검색 수집 구조 점검 ===");
console.log(`canonical 점검 페이지 유형: ${pageFiles.length}개`);
console.log(`오류: ${failures.length}개`);
console.log(`주의: ${warnings.length}개`);

if (failures.length) {
  console.log("\n[오류]");
  for (const item of failures) console.log(`- ${item}`);
}
if (warnings.length) {
  console.log("\n[주의]");
  for (const item of warnings) console.log(`- ${item}`);
}

if (failures.length) {
  console.error("\n검색 수집 구조 점검 실패. 위 오류를 수정한 뒤 다시 빌드하세요.\n");
  process.exit(1);
}

console.log("\ncanonical·sitemap·robots 기본 연결이 정상입니다.\n");
