import fs from "node:fs";

const source = fs.readFileSync(new URL("../lib/regions.ts", import.meta.url), "utf8");
const requiredKeys = ["title", "description", "intro", "searchNeeds", "zones", "newBuild", "oldBuild", "access", "checklist", "faq", "sources"];
const regionMatches = [...source.matchAll(/\n\s*"([a-z-]+\/[a-z-]+)":\s*\{/g)];
const regionBlocks = regionMatches.map((match, index) => ({ slug: match[1], text: source.slice(match.index, regionMatches[index + 1]?.index ?? source.lastIndexOf("\n};")) }));
const errors = [];
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
}

if (regionBlocks.length === 0) errors.push("지역 데이터 없음");
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`지역 ${regionBlocks.length}곳 검증 완료: 필수 콘텐츠·제목·설명·소개·생활권 통과`);
