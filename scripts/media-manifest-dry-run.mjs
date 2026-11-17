#!/usr/bin/env node
// Case-study media manifest, dry run (wugweb-work Part 2, step 3). Read-only.
//
//   node scripts/media-manifest-dry-run.mjs [--out docs/research/media-manifest-<date>.md] [--concurrency 4]
//
// Reads: Sanity public query API (caseStudy bodies and the asset registry,
// which is the folder listing: R2 has no read-only list command here), and the
// R2 public URLs (HEAD + ranged GET of header bytes). Writes: the markdown
// report, plus two gitignored files under scripts/data/ (the measurement cache
// and the full manifest JSON). Never writes Sanity, Notion or R2.

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import {
  R2_BASE, BUDGET, toUrl, keyToUrl, keyOf, fileName, folderOf, bodyMedia, resolveOwnFolder, slugFolder, tokens,
  collectEntries, markDuplicates, suspectFor, createFetcher, measure, openCache, posterUrlFor, mb,
} from './lib/media-manifest.mjs';
import { shapeOf } from './lib/image-dims.mjs';
import { parseCaseBody } from '../src/lib/case-body.ts';

const CMS = 'https://splvhmk1.apicdn.sanity.io/v2024-01-01/data/query/production';
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const DATE = opt('--date', new Date().toISOString().slice(0, 10));
const OUT = opt('--out', `docs/research/media-manifest-${DATE}.md`);
const CACHE = 'scripts/data/media-manifest-cache.json';
const JSON_OUT = `scripts/data/media-manifest-${DATE}.json`;
const f = createFetcher({ concurrency: +opt('--concurrency', 4) });

let cmsRequests = 0;
async function cms(q) {
  cmsRequests++;
  const r = await fetch(`${CMS}?query=${encodeURIComponent(q)}`);
  if (!r.ok) throw new Error(`Sanity ${r.status}`);
  return (await r.json()).result;
}

// Words in short titles that name no one brand (kept out of the wrong-client check).
const GENERIC_BRAND = new Set(['bank', 'care', 'fund', 'play', 'group', 'sales', 'navigator', 'kits', 'capital', 'transit', 'pms', 'hrms', 'unified', 'xsafe', 'xstream']);

async function main() {
  const docs = await cms(`*[_type=="caseStudy" && !(_id in path("drafts.**"))]|order(slug.current asc){_id,title,shortTitle,"slug":slug.current,noIndex,coverPath,thumbnailPath,bodyMarkdown,"client":clientRef->name}`);
  const assets = await cms(`*[_type=="asset" && !(_id in path("drafts.**")) && folder match "work*"]{folder,r2Key,publicUrl,fileName}`);
  const registryByFolder = new Map();
  for (const a of assets) {
    const url = a.r2Key ? keyToUrl(a.r2Key) : toUrl(a.publicUrl); if (!url) continue;
    const { folder } = folderOf(url); if (!folder) continue;
    if (!registryByFolder.has(folder)) registryByFolder.set(folder, []);
    registryByFolder.get(folder).push(url);
  }
  const folders = new Set(registryByFolder.keys());
  const registryKeys = new Set([...registryByFolder.values()].flat().map(keyOf));

  // Brand tokens of every case study (all 44, bodies or not).
  const brands = new Map();
  for (const d of docs) for (const t of new Set([...tokens(d.shortTitle), ...tokens(d.client)])) {
    if (GENERIC_BRAND.has(t)) continue;
    brands.set(t, brands.has(t) ? `${brands.get(t)}, ${d.shortTitle}` : d.shortTitle);
  }

  const withBody = docs.filter((d) => d.bodyMarkdown && d.bodyMarkdown.trim());
  const cache = openCache(CACHE);
  const measured = new Map(); // url → promise of measurement (shared across case studies)
  const m = (u) => { if (!measured.has(u)) measured.set(u, measure(u, f, cache)); return measured.get(u); };

  const results = [];
  for (const d of withBody) {
    const body = bodyMedia(d.bodyMarkdown);
    const own = resolveOwnFolder(d, folders, body);
    const entries = collectEntries(d, body, own.folder, registryByFolder);
    await Promise.all(entries.map(async (e) => Object.assign(e, await m(e.url))));
    for (const e of entries) e.shape = shapeOf(e.w, e.h) || undefined;
    markDuplicates(entries);
    const ownTokens = new Set([...tokens(d.slug), ...tokens(d.shortTitle), ...tokens(d.client)]);
    for (const e of entries) { const s = suspectFor(e, own.folder, ownTokens, brands); if (s) e.suspect = s; }
    // Posters: the `<name>-poster.webp` sibling, from the registry or a HEAD.
    await Promise.all(entries.filter((e) => e.type === 'video' && e.status === 200).map(async (e) => {
      const p = posterUrlFor(e.url);
      if (registryKeys.has(keyOf(p)) || entries.some((x) => keyOf(x.url) === keyOf(p))) { e.poster = p; return; }
      const r = await m(p); e.poster = r.status === 200 ? p : null;
    }));
    // What the v2 parser would render with this own folder, plus the record cover.
    const parsed = parseCaseBody(d.bodyMarkdown, own.folder ? { ownFolder: own.folder } : {});
    const rendered = new Set();
    if (parsed) {
      if (parsed.cover) rendered.add(keyOf(toUrl(parsed.cover.url)));
      for (const s of parsed.sections) for (const x of [...s.media, ...s.styles]) rendered.add(keyOf(toUrl(x.url)));
      for (const x of parsed.closing) rendered.add(keyOf(toUrl(x.url)));
    }
    if (d.coverPath) rendered.add(keyOf(toUrl(d.coverPath)));
    let renderedBytes = 0; let renderedCount = 0;
    for (const e of entries) if (rendered.has(keyOf(e.url)) && e.status === 200 && !e.dupOf) { renderedBytes += e.bytes || 0; renderedCount++; }
    results.push({ doc: d, own, entries, renderedBytes, renderedCount });
    process.stderr.write(`${d.slug}: ${entries.length} files, ${f.stats.requests} requests so far\n`);
  }
  cache.save();

  // ------------------------------------------------------------ aggregate
  const claimed = new Set(results.map((r) => r.own.folder).filter(Boolean));
  const unclaimed = [...folders].filter((x) => !claimed.has(x)).sort().map((x) => {
    const owner = docs.find((d) => slugFolder(d.slug, new Set([x])) === x || [d.coverPath, d.thumbnailPath].some((p) => p && folderOf(toUrl(p)).folder === x));
    return { folder: x, files: registryByFolder.get(x).length, owner };
  });
  const all = results.flatMap((r) => r.entries.map((e) => ({ ...e, slug: r.doc.slug })));
  const media = all.filter((e) => e.role !== 'poster');
  const uniq = (arr) => [...new Map(arr.map((e) => [keyOf(e.url), e])).values()];
  const dead = all.filter((e) => e.status !== 200);
  const dups = all.filter((e) => e.dupOf);
  const suspects = all.filter((e) => e.suspect);
  const bigImg = uniq(media.filter((e) => e.status === 200 && e.type !== 'video' && e.bytes > BUDGET.image));
  const bigVid = uniq(media.filter((e) => e.status === 200 && e.type === 'video' && e.bytes > BUDGET.video));
  const vids = uniq(media.filter((e) => e.status === 200 && e.type === 'video'));
  const moovEnd = vids.filter((e) => e.moovAtEnd);
  const noPoster = vids.filter((e) => !e.poster);
  const errs = uniq(all.filter((e) => e.status === 200 && e.measureError));
  const overPage = results.filter((r) => r.renderedBytes > BUDGET.page);
  // Same bytes in two different folders (borrowed copies across case studies).
  const byBytes = new Map();
  for (const e of uniq(media.filter((x) => x.status === 200 && x.bytes && x.folder))) {
    const k = `${e.type}:${e.bytes}`; if (!byBytes.has(k)) byBytes.set(k, []); byBytes.get(k).push(e);
  }
  const crossCopies = [...byBytes.values()].filter((g) => new Set(g.map((e) => e.folder)).size > 1);

  // ---------------------------------------------------------------- report
  const name = (u) => { const { folder, sub } = folderOf(u); return folder ? `${sub ? sub + '/' : ''}${fileName(u)}` : u; };
  const L = [];
  const p = (...s) => L.push(...s);
  const tot = uniq(media.filter((e) => e.status === 200));
  p(`# Case-study media manifest, dry run (${DATE})`, '',
    'Part 2 step 3 of the wugweb-work plan. Read-only: Sanity public query API (case-study bodies and the asset registry) and R2 public URLs (HEAD and ranged GETs of header bytes). Nothing was uploaded, copied, renamed, deleted or written to Sanity or Notion. Every number below is summed by `scripts/media-manifest-dry-run.mjs`, not estimated.', '',
    '**Folder listing.** R2 has no read-only list command in this setup, so the files "in a folder" are the Sanity `asset` registry rows whose path is in that folder. A file in R2 that the registry does not know is not seen here.', '',
    '## Headline numbers', '', '| Measure | Count |', '|---|---|',
    `| Case studies with a body | ${withBody.length} of ${docs.length} |`,
    `| Own folder resolved | ${results.filter((r) => r.own.folder).length} (none for ${results.filter((r) => !r.own.folder).length}: no media and no folder) |`,
    `| Own folder changed by the slug cross-check | ${results.filter((r) => /cross-check/.test(r.own.rule)).length} |`,
    `| Registry folders under assets/work/ | ${folders.size} (${claimed.size} claimed by a body, ${unclaimed.length} not) |`,
    `| Manifest entries (per case study, summed) | ${all.length} (${all.filter((e) => e.source === 'body').length} body, ${all.filter((e) => e.source === 'record').length} record cover/thumbnail, ${all.filter((e) => e.source === 'folder').length} folder only) |`,
    `| Unique media files measured | ${tot.length}, ${mb(tot.reduce((a, e) => a + (e.bytes || 0), 0))} MB |`,
    `| Dead links (status not 200) | ${dead.length} (${dead.filter((e) => e.source !== 'folder').length} linked from a body or record, ${dead.filter((e) => e.source === 'folder').length} registry rows with no file in R2) |`,
    `| Duplicates (dupOf) | ${dups.length} |`,
    `| Suspects (borrowed, other brand, stock?, off-store) | ${suspects.length} entries |`,
    `| Images over 4 MB | ${bigImg.length} |`,
    `| Videos over 10 MB | ${bigVid.length} |`,
    `| Pages over 25 MB rendered (v2 parser with the own folder) | ${overPage.length} |`,
    `| Videos with moov at the end | ${moovEnd.length} of ${vids.length} |`,
    `| Videos without a poster file | ${noPoster.length} of ${vids.length} |`,
    `| Files whose header could not be read | ${errs.length} |`,
    `| Same file in two or more folders | ${crossCopies.length} groups |`,
    `| HTTP requests (this run) | ${f.stats.requests} to R2 (${f.stats.head} HEAD, ${f.stats.range} ranged GET, ${f.stats.retries} retries), ${cmsRequests} to Sanity |`, '');

  const brandSus = suspects.filter((e) => /another client's brand/.test(e.suspect));
  const stockSus = suspects.filter((e) => /stock\?/.test(e.suspect));
  const offStore = suspects.filter((e) => /not on the media store/.test(e.suspect));
  const borrowedN = suspects.filter((e) => /borrowed/.test(e.suspect)).length;
  p('## For the owner to decide', '', 'Nothing below was changed. Each line is a fact from this run and the decision it waits on.', '',
    `1. **Folders no body claims (${unclaimed.length}):** ${unclaimed.map((u) => `${u.folder} (${u.files} files${u.owner ? `, looks like ${u.owner.shortTitle}, ${u.owner.bodyMarkdown ? 'has a body' : 'no body'}` : ', no case study matches'})`).join('; ')}. Attach, leave, or name the case study.`,
    `2. **Dead links in bodies or records (${dead.filter((e) => e.source !== 'folder').length}):** they stay in the source and the page skips them. Fix in Notion or leave.`,
    `3. **Other-brand file names (${brandSus.length}) and stock-style names (${stockSus.length}):** listed, never dropped; the visual read (step 3b) confirms by looking. Off-store media links: ${offStore.length}.`,
    `4. **Borrowed body files (${borrowedN}):** body links into another case study's folder. The v2 parser drops borrowed images (videos are kept); the proposal step takes them out of the body.`,
    `5. **Pages over 25 MB (${overPage.length}):** ${overPage.map((r) => `${r.doc.shortTitle} ${mb(r.renderedBytes)} MB`).join(', ')}. Per the media rule this is met by showing less at first, never by making smaller files.`,
    `6. **Weight, moov and posters:** ${bigImg.length} images over 4 MB, ${bigVid.length} videos over 10 MB, ${moovEnd.length} of ${vids.length} videos with moov at the end (the browser must fetch the end of the file before playing), ${noPoster.length} without a poster file. Facts only: re-encoding or new poster files need the owner's yes.`,
    `7. **Duplicates (${dups.length}):** same bytes, or the same size and name stem in one folder. The page never renders a \`dupOf\` entry; the files stay.`, '');

  p('## Own folders', '', 'Rule order: cover path, thumbnail path, folder named after the slug, majority of body images; then the slug and short-title cross-check.', '',
    '| Case study | Own folder | Decided by | Body files | Folder only | Borrowed | Rendered (v2) |', '|---|---|---|---|---|---|---|');
  for (const r of results) {
    const borrowed = r.entries.filter((e) => /borrowed/.test(e.suspect || '')).length;
    p(`| ${r.doc.shortTitle || r.doc.slug} | ${r.own.folder || ''} | ${r.own.rule}${r.own.note ? `; ${r.own.note}` : ''} | ${r.entries.filter((e) => e.source === 'body').length} | ${r.entries.filter((e) => e.source === 'folder').length} | ${borrowed} | ${r.renderedCount} files, ${mb(r.renderedBytes)} MB |`);
  }
  p('', '## Folders no body claims', '', '| Folder | Registry files | Case study it looks like | That case study has a body |', '|---|---|---|---|');
  for (const u of unclaimed) p(`| ${u.folder} | ${u.files} | ${u.owner ? u.owner.shortTitle : ''} | ${u.owner ? (u.owner.bodyMarkdown ? 'yes' : 'no') : ''} |`);

  const list = (title, rows, head, fmt) => { p('', `## ${title} (${rows.length})`, ''); if (!rows.length) { p('None.'); return; } p(head, head.replace(/[^|]+/g, '---')); for (const e of rows) p(fmt(e)); };
  list('Dead links', dead, '| Case study | File | Source | Status |', (e) => `| ${e.slug} | ${name(e.url)} | ${e.source}${e.label ? `: ${e.label}` : ''} | ${e.status}${e.error ? ` ${e.error}` : ''} |`);
  list('Suspects', suspects, '| Case study | File | Source | Why |', (e) => `| ${e.slug} | ${e.folder ? `${e.folder}/` : ''}${name(e.url)} | ${e.source} | ${e.suspect} |`);
  list('Duplicates', dups, '| Case study | File | Duplicate of | Why |', (e) => `| ${e.slug} | ${name(e.url)} | ${name(e.dupOf)} | ${e.dupWhy} |`);
  list('Images over 4 MB', bigImg.sort((a, b) => b.bytes - a.bytes), '| Folder | File | MB | w×h |', (e) => `| ${e.folder} | ${name(e.url)} | ${mb(e.bytes)} | ${e.w || '?'}×${e.h || '?'} |`);
  list('Videos over 10 MB', bigVid.sort((a, b) => b.bytes - a.bytes), '| Folder | File | MB | Duration |', (e) => `| ${e.folder} | ${name(e.url)} | ${mb(e.bytes)} | ${e.duration ?? '?'} s |`);
  list('Pages over 25 MB rendered', overPage, '| Case study | Files | MB |', (r) => `| ${r.doc.slug} | ${r.renderedCount} | ${mb(r.renderedBytes)} |`);
  list('Videos with moov at the end', moovEnd, '| Folder | File | MB | Duration |', (e) => `| ${e.folder} | ${name(e.url)} | ${mb(e.bytes)} | ${e.duration ?? '?'} s |`);
  list('Videos without a poster file', noPoster, '| Folder | File | Duration | Audio track |', (e) => `| ${e.folder || new URL(e.url).host} | ${name(e.url)} | ${e.duration ?? '?'} s | ${e.audio ? 'yes' : 'no'} |`);
  list('Header not read', errs, '| Folder | File | Content-Type | Error |', (e) => `| ${e.folder} | ${name(e.url)} | ${e.contentType} | ${e.measureError} |`);
  p('', `## Same file in two or more folders (${crossCopies.length})`, '');
  if (!crossCopies.length) p('None.');
  else { p('| Bytes | Copies |', '|---|---|'); for (const g of crossCopies) p(`| ${g[0].bytes} | ${g.map((e) => `${e.folder}/${name(e.url)}`).join('<br>')} |`); }

  p('', '## Per case study', '');
  for (const r of results) {
    const es = r.entries.filter((e) => e.role !== 'poster'); const live = es.filter((e) => e.status === 200);
    const pick = (fn) => es.filter(fn).map((e) => name(e.url)).join(', ') || 'none';
    const shapes = {}; for (const e of live) if (e.shape) shapes[e.shape] = (shapes[e.shape] || 0) + 1;
    const flows = {}; for (const e of es) if (e.flow) flows[e.flow] = (flows[e.flow] || 0) + 1;
    p(`### Media report: ${r.doc.slug}`, '',
      `- Own folder: ${r.own.folder || 'none'} (decided by ${r.own.rule})${r.own.note ? `. Note: ${r.own.note}` : ''}`,
      `- Files: ${es.length} (${es.filter((e) => !/borrowed/.test(e.suspect || '')).length} own, ${es.filter((e) => /borrowed/.test(e.suspect || '')).length} borrowed; ${es.filter((e) => e.source === 'folder').length} folder only), ${mb(live.reduce((a, e) => a + (e.bytes || 0), 0))} MB total (summed)`,
      `- Shapes: ${Object.entries(shapes).map(([k, v]) => `${k} ${v}`).join(', ') || 'none'}; videos ${es.filter((e) => e.type === 'video').length}`,
      `- Folder-only flows: ${Object.entries(flows).map(([k, v]) => `${k} ${v}`).join(', ') || 'none'}`,
      `- Dead: ${pick((e) => e.status !== 200)}`,
      `- Duplicates: ${pick((e) => e.dupOf)}`,
      `- Suspects: ${es.filter((e) => e.suspect).map((e) => `${name(e.url)} (${e.suspect})`).join('; ') || 'none'}`,
      `- Over 4 MB images: ${pick((e) => e.status === 200 && e.type !== 'video' && e.bytes > BUDGET.image)}`,
      `- Over 10 MB videos: ${pick((e) => e.status === 200 && e.type === 'video' && e.bytes > BUDGET.video)}`,
      `- moov at end: ${pick((e) => e.moovAtEnd)}`,
      `- No poster: ${pick((e) => e.type === 'video' && e.status === 200 && !e.poster)}`,
      `- Rendered bytes for the v2 page: ${mb(r.renderedBytes)} MB in ${r.renderedCount} files (budget 25 MB)${r.renderedBytes > BUDGET.page ? ' **over**' : ''}`, '');
  }
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, L.join('\n') + '\n');
  writeFileSync(JSON_OUT, JSON.stringify({ date: DATE, requests: f.stats, cmsRequests,
    caseStudies: results.map((r) => ({ slug: r.doc.slug, ownFolder: r.own, renderedBytes: r.renderedBytes, manifest: r.entries })) }, null, 1));
  console.log(`Report: ${OUT}\nManifest JSON (gitignored): ${JSON_OUT}\nCache (gitignored): ${CACHE} (${cache.size()} entries)\nRequests: R2 ${f.stats.requests} (${f.stats.head} HEAD, ${f.stats.range} range, ${f.stats.retries} retries, ${f.stats.errors} errors), Sanity ${cmsRequests}`);
}

main().catch((e) => { console.error(`media-manifest: ${e.stack || e}`); process.exit(1); });
