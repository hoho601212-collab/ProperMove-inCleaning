import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const regionsPath = path.join(root, "lib", "regions.ts");
const detailPagePath = path.join(root, "app", "cleaning", "[sido]", "[sigungu]", "page.tsx");
const sidoPagePath = path.join(root, "app", "cleaning", "[sido]", "page.tsx");
const cleaningHubPath = path.join(root, "app", "cleaning", "page.tsx");

const regionsSource = fs.readFileSync(regionsPath, "utf8");
const detailPageSource = fs.readFileSync(detailPagePath, "utf8");
const sidoPageSource = fs.readFileSync(sidoPagePath, "utf8");
const cleaningHubSource = fs.readFileSync(cleaningHubPath, "utf8");

const regionBlockPattern = /"([a-z0-9-]+\/[a-z0-9-]+)"\s*:\s*\{[\s\S]*?slug\s*:\s*"\1"[\s\S]*?city\s*:\s*"([^"]+)"[\s\S]*?district\s*:\s*"([^"]+)"[\s\S]*?title\s*:\s*"([^"]+)"[\s\S]*?description\s*:\s*"([^"]+)"/g;
const mapEntryPattern = /"([a-z0-9-]+\/[a-z0-9-]+)"\s*:\s*"([^"]+)"/g;
const sidoMetaPattern = /([a-z0-9-]+)\s*:\s*\{\s*title:\s*"([^"]+)",\s*description:\s*"([^"]+)"\s*\}/g;

const regions = [];
for (const match of regionsSource.matchAll(regionBlockPattern)) {
  regions.push({ slug: match[1], city: match[2], district: match[3], title: match[4], description: match[5] });
}

function extractMap(startMarker, endMarker) {
  const start = detailPageSource.indexOf(startMarker);
  const end = detailPageSource.indexOf(endMarker, start);
  const source = start >= 0 && end > start ? detailPageSource.slice(start, end) : "";
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
  if (!apartmentKeyword) return region.description;
  const apartmentName = apartmentKeyword.replace(/\s*입주청소$/, "");
  return `${region.description} ${apartmentName} 등 지역 단지의 입주청소 조건도 함께 확인하세요.`;
}

function extractConst(source, name) {
  const match = source.match(new RegExp(`const\\s+${name}\\s*=\\s*"([^"]+)"`));
  return match?.[1] ?? "";
}

const sidoRecords = [];
const sidoStart = sidoPageSource.indexOf("const sidoMeta");
const sidoEnd = sidoPageSource.indexOf("function getSidoMeta", sidoStart);
const sidoBlock = sidoStart >= 0 && sidoEnd > sidoStart ? sidoPageSource.slice(sidoStart, sidoEnd) : "";
for (const match of sidoBlock.matchAll(sidoMetaPattern)) {
  sidoRecords.push({ slug: `hub/${match[1]}`, title: match[2], description: match[3], level: "시도 허브" });
}

const cleaningHubTitle = extractConst(cleaningHubSource, "hubTitle");
const cleaningHubDescription = extractConst(cleaningHubSource, "hubDescription");
const cleaningHubRecord = cleaningHubTitle && cleaningHubDescription ? [{ slug: "hub/cleaning", title: cleaningHubTitle, description: cleaningHubDescription, level: "전국 허브" }] : [];

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

const hierarchyRecords = [
  ...cleaningHubRecord,
  ...sidoRecords,
  ...finalSeoRecords.map(region => ({ slug: `detail/${region.slug}`, title: region.seoTitle, description: region.metaDescription, level: "세부지역" })),
];
const hierarchyTitleDuplicates = duplicates(hierarchyRecords, item => item.title);
const hierarchyDescriptionDuplicates = duplicates(hierarchyRecords, item => item.description);
const hierarchyLongTitles = hierarchyRecords.filter(item => item.title.length > 65);
const hierarchyShortDescriptions = hierarchyRecords.filter(item => item.description.replace(/\s/g, "").length < 30);
const hierarchyLongDescriptions = hierarchyRecords.filter(item => item.description.length > 160);
const expectedSidoSlugs = [...new Set(regions.map(region => region.slug.split("/")[0]))];
const actualSidoSlugs = new Set(sidoRecords.map(item => item.slug.replace("hub/", "")));
const missingSidoMeta = expectedSidoSlugs.filter(slug => !actualSidoSlugs.has(slug));

console.log("\n=== 올바른청소 지역 SEO 점검 ===");
console.log(`지역 페이지: ${regions.length}`);
console.log(`개별 SEO 제목 적용: ${regions.length - missingSeoTitles.length}/${regions.length}`);
console.log(`대표 아파트 키워드 적용: ${apartmentCoverage.length}/${regions.length}`);
console.log(`시도 허브 메타 적용: ${sidoRecords.length}/${expectedSidoSlugs.length}`);
console.log(`전국 허브 메타 확인: ${cleaningHubRecord.length ? "정상" : "누락"}`);
console.log(`최종 SEO title 중복: ${duplicateFinalTitles.length}개 그룹`);
console.log(`최종 meta description 중복: ${duplicateFinalDescriptions.length}개 그룹`);
console.log(`전체 계층 title 중복: ${hierarchyTitleDuplicates.length}개 그룹`);
console.log(`전체 계층 description 중복: ${hierarchyDescriptionDuplicates.length}개 그룹`);
console.log(`30자 미만 meta description: ${shortDescriptions.length}개`);
console.log(`160자 초과 meta description: ${longDescriptions.length}개`);
console.log(`65자 초과 SEO title: ${longTitles.length}개`);
console.log(`원본 title 중복: ${duplicateSourceTitles.length}개 그룹`);
console.log(`원본 description 중복: ${duplicateSourceDescriptions.length}개 그룹`);
console.log(`존재하지 않는 SEO slug: ${unknownSeoKeys.length}개`);
console.log(`존재하지 않는 아파트 slug: ${unknownApartmentKeys.length}개`);
console.log(`시도 허브 메타 누락: ${missingSidoMeta.length}개`);

function printItems(label, items, formatter) {
  if (!items.length) return;
  console.log(`\n[${label}]`);
  for (const item of items) console.log(formatter(item));
}

printItems("개별 SEO 제목 누락", missingSeoTitles, region => `- ${region.slug} (${region.city} ${region.district})`);
printItems("최종 SEO title 중복", duplicateFinalTitles, ([value, slugs]) => `- ${slugs.join(", ")}\n  ${value}`);
printItems("최종 meta description 중복", duplicateFinalDescriptions, ([value, slugs]) => `- ${slugs.join(", ")}\n  ${value}`);
printItems("전체 계층 SEO title 중복", hierarchyTitleDuplicates, ([value, slugs]) => `- ${slugs.join(", ")}\n  ${value}`);
printItems("전체 계층 meta description 중복", hierarchyDescriptionDuplicates, ([value, slugs]) => `- ${slugs.join(", ")}\n  ${value}`);
printItems("30자 미만 meta description", shortDescriptions, region => `- ${region.slug}: ${region.metaDescription}`);
printItems("160자 초과 meta description", longDescriptions, region => `- ${region.slug} (${region.metaDescription.length}자): ${region.metaDescription}`);
printItems("65자 초과 SEO title", longTitles, region => `- ${region.slug} (${region.seoTitle.length}자): ${region.seoTitle}`);
printItems("전체 계층 30자 미만 description", hierarchyShortDescriptions, item => `- ${item.slug}: ${item.description}`);
printItems("전체 계층 160자 초과 description", hierarchyLongDescriptions, item => `- ${item.slug} (${item.description.length}자): ${item.description}`);
printItems("전체 계층 65자 초과 title", hierarchyLongTitles, item => `- ${item.slug} (${item.title.length}자): ${item.title}`);
printItems("존재하지 않는 SEO slug", unknownSeoKeys, slug => `- ${slug}`);
printItems("존재하지 않는 아파트 slug", unknownApartmentKeys, slug => `- ${slug}`);
printItems("시도 허브 메타 누락", missingSidoMeta, slug => `- ${slug}`);

console.log("\n점검 완료. 전국 허브 → 시도 허브 → 세부지역의 검색 title·description 계층까지 함께 확인했습니다.\n");
