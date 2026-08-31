import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const regionsPath = path.join(root, "lib", "regions.ts");
const pagePath = path.join(root, "app", "cleaning", "[sido]", "[sigungu]", "page.tsx");

const regionsSource = fs.readFileSync(regionsPath, "utf8");
const pageSource = fs.readFileSync(pagePath, "utf8");

const regionBlockPattern = /"([a-z0-9-]+\/[a-z0-9-]+)"\s*:\s*\{[\s\S]*?slug\s*:\s*"\1"[\s\S]*?city\s*:\s*"([^"]+)"[\s\S]*?district\s*:\s*"([^"]+)"[\s\S]*?title\s*:\s*"([^"]+)"[\s\S]*?description\s*:\s*"([^"]+)"/g;
const mapEntryPattern = /"([a-z0-9-]+\/[a-z0-9-]+)"\s*:\s*"([^"]+)"/g;

const regions = [];
for (const match of regionsSource.matchAll(regionBlockPattern)) {
  regions.push({ slug: match[1], city: match[2], district: match[3], title: match[4], description: match[5] });
}

function extractMap(startMarker, endMarker) {
  const start = pageSource.indexOf(startMarker);
  const end = pageSource.indexOf(endMarker, start);
  const source = start >= 0 && end > start ? pageSource.slice(start, end) : "";
  const map = new Map();
  for (const match of source.matchAll(mapEntryPattern)) map.set(match[1], match[2]);
  return map;
}

const seoSuffixes = extractMap("const seoTitleSuffixes", "function getMetaDescription");
const apartmentKeywords = extractMap("const representativeApartmentKeywords", "const seoTitleSuffixes");

function duplicates(items, valueGetter) {
  const groups = new Map();
  for (const item of items) {
    const value = valueGetter(item).trim();
    if (!groups.has(value)) groups.set(value, []);
    groups.get(value).push(item.slug);
  }
  return [...groups.entries()].filter(([, slugs]) => slugs.length > 1);
}

function getSeoTitle(region) {
  const suffix = seoSuffixes.get(region.slug);
  if (suffix) return `${region.city} ${region.district} 입주청소 | ${suffix}`;
  const parts = region.title.split(/[｜|]/).map(part => part.trim()).filter(Boolean);
  const fallback = parts.length > 1 ? parts.slice(1).join(" · ") : "지역별 청소 범위와 견적 안내";
  return `${region.city} ${region.district} 입주청소 | ${fallback}`;
}

function getMetaDescription(region) {
  const apartmentKeyword = apartmentKeywords.get(region.slug);
  return apartmentKeyword ? `${region.description} ${apartmentKeyword}` : region.description;
}

const missingSeoTitles = regions.filter(region => !seoSuffixes.has(region.slug));
const duplicateSourceDescriptions = duplicates(regions, region => region.description);
const duplicateSourceTitles = duplicates(regions, region => region.title);
const finalSeoRecords = regions.map(region => ({ ...region, seoTitle: getSeoTitle(region), metaDescription: getMetaDescription(region) }));
const duplicateFinalTitles = duplicates(finalSeoRecords, region => region.seoTitle);
const duplicateFinalDescriptions = duplicates(finalSeoRecords, region => region.metaDescription);
const shortDescriptions = finalSeoRecords.filter(region => region.metaDescription.replace(/\s/g, "").length < 30);
const longDescriptions = finalSeoRecords.filter(region => region.metaDescription.length > 160);
const longTitles = finalSeoRecords.filter(region => region.seoTitle.length > 65);
const unknownSeoKeys = [...seoSuffixes.keys()].filter(slug => !regions.some(region => region.slug === slug));
const unknownApartmentKeys = [...apartmentKeywords.keys()].filter(slug => !regions.some(region => region.slug === slug));
const apartmentCoverage = finalSeoRecords.filter(region => apartmentKeywords.has(region.slug));

console.log("\n=== 올바른청소 지역 SEO 점검 ===");
console.log(`지역 페이지: ${regions.length}`);
console.log(`개별 SEO 제목 적용: ${regions.length - missingSeoTitles.length}/${regions.length}`);
console.log(`대표 아파트 키워드 적용: ${apartmentCoverage.length}/${regions.length}`);
console.log(`최종 SEO title 중복: ${duplicateFinalTitles.length}개 그룹`);
console.log(`최종 meta description 중복: ${duplicateFinalDescriptions.length}개 그룹`);
console.log(`30자 미만 meta description: ${shortDescriptions.length}개`);
console.log(`160자 초과 meta description: ${longDescriptions.length}개`);
console.log(`65자 초과 SEO title: ${longTitles.length}개`);
console.log(`원본 title 중복: ${duplicateSourceTitles.length}개 그룹`);
console.log(`원본 description 중복: ${duplicateSourceDescriptions.length}개 그룹`);
console.log(`존재하지 않는 SEO slug: ${unknownSeoKeys.length}개`);
console.log(`존재하지 않는 아파트 slug: ${unknownApartmentKeys.length}개`);

function printItems(label, items, formatter) {
  if (!items.length) return;
  console.log(`\n[${label}]`);
  for (const item of items) console.log(formatter(item));
}

printItems("개별 SEO 제목 누락", missingSeoTitles, region => `- ${region.slug} (${region.city} ${region.district})`);
printItems("최종 SEO title 중복", duplicateFinalTitles, ([value, slugs]) => `- ${slugs.join(", ")}\n  ${value}`);
printItems("최종 meta description 중복", duplicateFinalDescriptions, ([value, slugs]) => `- ${slugs.join(", ")}\n  ${value}`);
printItems("30자 미만 meta description", shortDescriptions, region => `- ${region.slug}: ${region.metaDescription}`);
printItems("160자 초과 meta description", longDescriptions, region => `- ${region.slug} (${region.metaDescription.length}자): ${region.metaDescription}`);
printItems("65자 초과 SEO title", longTitles, region => `- ${region.slug} (${region.seoTitle.length}자): ${region.seoTitle}`);
printItems("존재하지 않는 SEO slug", unknownSeoKeys, slug => `- ${slug}`);
printItems("존재하지 않는 아파트 slug", unknownApartmentKeys, slug => `- ${slug}`);

console.log("\n점검 완료. 실제 검색 노출용 title·description을 기준으로 중복·길이·누락을 확인했습니다.\n");
