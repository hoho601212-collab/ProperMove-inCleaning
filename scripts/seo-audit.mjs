import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const regionsPath = path.join(root, "lib", "regions.ts");
const pagePath = path.join(root, "app", "cleaning", "[sido]", "[sigungu]", "page.tsx");

const regionsSource = fs.readFileSync(regionsPath, "utf8");
const pageSource = fs.readFileSync(pagePath, "utf8");

const regionBlockPattern = /"([a-z0-9-]+\/[a-z0-9-]+)"\s*:\s*\{[\s\S]*?slug\s*:\s*"\1"[\s\S]*?city\s*:\s*"([^"]+)"[\s\S]*?district\s*:\s*"([^"]+)"[\s\S]*?title\s*:\s*"([^"]+)"[\s\S]*?description\s*:\s*"([^"]+)"/g;
const suffixPattern = /"([a-z0-9-]+\/[a-z0-9-]+)"\s*:\s*"([^"]+)"/g;

const regions = [];
for (const match of regionsSource.matchAll(regionBlockPattern)) {
  regions.push({ slug: match[1], city: match[2], district: match[3], title: match[4], description: match[5] });
}

const seoMapStart = pageSource.indexOf("const seoTitleSuffixes");
const seoMapEnd = pageSource.indexOf("function getMetaDescription", seoMapStart);
const seoMapSource = seoMapStart >= 0 && seoMapEnd > seoMapStart ? pageSource.slice(seoMapStart, seoMapEnd) : "";
const seoSuffixes = new Map();
for (const match of seoMapSource.matchAll(suffixPattern)) seoSuffixes.set(match[1], match[2]);

const apartmentMapStart = pageSource.indexOf("const representativeApartmentKeywords");
const apartmentMapEnd = pageSource.indexOf("const seoTitleSuffixes", apartmentMapStart);
const apartmentMapSource = apartmentMapStart >= 0 && apartmentMapEnd > apartmentMapStart ? pageSource.slice(apartmentMapStart, apartmentMapEnd) : "";
const apartmentKeywords = new Set();
for (const match of apartmentMapSource.matchAll(suffixPattern)) apartmentKeywords.add(match[1]);

function duplicates(items, key) {
  const groups = new Map();
  for (const item of items) {
    const value = item[key].trim();
    if (!groups.has(value)) groups.set(value, []);
    groups.get(value).push(item.slug);
  }
  return [...groups.entries()].filter(([, slugs]) => slugs.length > 1);
}

const missingSeoTitles = regions.filter(region => !seoSuffixes.has(region.slug));
const duplicateDescriptions = duplicates(regions, "description");
const duplicateTitles = duplicates(regions, "title");
const shortDescriptions = regions.filter(region => region.description.replace(/\s/g, "").length < 30);
const apartmentCoverage = regions.filter(region => apartmentKeywords.has(region.slug));

console.log("\n=== 올바른청소 지역 SEO 점검 ===");
console.log(`지역 페이지: ${regions.length}`);
console.log(`개별 SEO 제목 적용: ${regions.length - missingSeoTitles.length}/${regions.length}`);
console.log(`대표 아파트 키워드 적용: ${apartmentCoverage.length}/${regions.length}`);
console.log(`중복 원본 title: ${duplicateTitles.length}개 그룹`);
console.log(`중복 description: ${duplicateDescriptions.length}개 그룹`);
console.log(`30자 미만 description: ${shortDescriptions.length}개`);

if (missingSeoTitles.length) {
  console.log("\n[개별 SEO 제목 누락]");
  for (const region of missingSeoTitles) console.log(`- ${region.slug} (${region.city} ${region.district})`);
}

if (duplicateDescriptions.length) {
  console.log("\n[중복 description]");
  for (const [description, slugs] of duplicateDescriptions) console.log(`- ${slugs.join(", ")}\n  ${description}`);
}

if (duplicateTitles.length) {
  console.log("\n[중복 원본 title]");
  for (const [title, slugs] of duplicateTitles) console.log(`- ${slugs.join(", ")}\n  ${title}`);
}

if (shortDescriptions.length) {
  console.log("\n[짧은 description]");
  for (const region of shortDescriptions) console.log(`- ${region.slug}: ${region.description}`);
}

console.log("\n점검 완료. 누락·중복 항목은 지역 데이터의 실제 생활권/주거형태를 기준으로 개별 수정하세요.\n");
