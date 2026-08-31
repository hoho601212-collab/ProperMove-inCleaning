import fs from "node:fs";

const source = fs.readFileSync(new URL("../lib/regions.ts", import.meta.url), "utf8");
const requiredKeys = ["title", "description", "intro", "searchNeeds", "zones", "newBuild", "oldBuild", "access", "checklist", "faq", "sources"];
const regionMatches = [...source.matchAll(/\n\s*"([a-z-]+\/[a-z-]+)":\s*\{/g)];
const regionBlocks = regionMatches.map((match, index) => ({ slug: match[1], text: source.slice(match.index, regionMatches[index + 1]?.index ?? source.lastIndexOf("\n};")) }));
const regionSlugs = new Set(regionBlocks.map(region => region.slug));
const errors = [];
const warnings = [];
const seen = new Map();

for (const region of regionBlocks) {
  for (const key of requiredKeys) if (!new RegExp(`\\b${key}:`).test(region.text)) errors.push(`${region.slug}: ${key} 누락`);
  for (const key of ["title", "description"]) {
    const value = region.text.match(new RegExp(`${key}:\\s*"([^"]+)"`))?.[1];
    if (!value) continue;
    const signature = `${key}:${value}`;
    if (seen.has(signature)) errors.push(`${region.slug}: ${key} 중복 (${seen.get(signature)})`);
    seen.set(signature, region.slug);
  }
  const intro = region.text.match(/intro:\s*\[([\s\S]*?)\],\n\s*searchNeeds/)?.[1] ?? "";
  if (intro.length < 180) errors.push(`${region.slug}: 지역 소개가 너무 짧음`);
  const zoneCount = (region.text.match(/\{ name:/g) ?? []).length;
  if (zoneCount < 4) errors.push(`${region.slug}: 생활권 4개 미만`);

  const nearbySource = region.text.match(/nearby:\s*\[([\s\S]*?)\],\n\s*sources/)?.[1] ?? "";
  const nearbyLinks = [...nearbySource.matchAll(/href:\s*"\/cleaning\/([a-z-]+\/[a-z-]+)"/g)].map(match => match[1]);
  const currentSido = region.slug.split("/")[0];
  const sameSidoLinks = nearbyLinks.filter(slug => slug.split("/")[0] === currentSido);
  const crossSidoLinks = nearbyLinks.filter(slug => slug.split("/")[0] !== currentSido);

  if (!nearbySource) warnings.push(`${region.slug}: 함께 보는 지역 링크 없음`);
  if (nearbyLinks.length && nearbyLinks.length < 2) warnings.push(`${region.slug}: 함께 보는 지역 링크가 2개 미만`);
  if (nearbyLinks.length >= 2 && sameSidoLinks.length === 0) warnings.push(`${region.slug}: 같은 시·도 내부의 함께 보는 지역 링크가 없음`);
  if (nearbyLinks.length >= 3 && crossSidoLinks.length === nearbyLinks.length) warnings.push(`${region.slug}: 모든 함께 보는 지역 링크가 다른 시·도임`);

  const duplicateNearby = nearbyLinks.filter((slug, index) => nearbyLinks.indexOf(slug) !== index);
  if (duplicateNearby.length) errors.push(`${region.slug}: 함께 보는 지역 링크 중복 (${[...new Set(duplicateNearby)].join(", ")})`);

  for (const linkedSlug of nearbyLinks) {
    if (!regionSlugs.has(linkedSlug)) errors.push(`${region.slug}: 존재하지 않는 함께 보는 지역 링크 /cleaning/${linkedSlug}`);
    if (linkedSlug === region.slug) errors.push(`${region.slug}: 자기 자신을 함께 보는 지역으로 연결`);
  }
}

if (regionBlocks.length === 0) errors.push("지역 데이터 없음");
if (warnings.length) {
  console.warn("[지역 내부링크 권장사항]");
  console.warn(warnings.join("\n"));
}
if (errors.length) {
  console.error("[지역 데이터 검증 실패]");
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`지역 ${regionBlocks.length}곳 검증 완료: 필수 콘텐츠·제목·설명·소개·생활권·내부링크 통과`);
