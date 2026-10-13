#!/usr/bin/env node
/**
 * Notion Blogs → Sanity post sync (2026-10-13). Notion is the source of truth for blog posts.
 *
 *   node scripts/sync-notion-blogs.mjs           dry run: prints what would change
 *   WRITE=1 node scripts/sync-notion-blogs.mjs   backs up every post, then writes
 *
 * Matched posts (Notion "Sanity ID", else slug): sets title, slug, excerpt, seoTitle, seoDescription,
 * canonicalUrl, featured, readingTime, publishedAt, coverPath + ogImagePath (full R2 URLs) and body
 * (Notion blocks → Portable Text; images become mediaUrl blocks). Empty Notion values never clear Sanity.
 * topic / topicSlug: the Notion Category name and its Slug (blog filter).
 * category: Notion's Category (relation) mapped onto Sanity's list via CATEGORY_MAP (owner-approved 2026-10-13).
 * author (Notion Author → person by name) and tags (Notion Tags names) on every post; empty in
 * Notion, or an author with no matching person, leaves Sanity's value alone.
 * No "last updated" on posts (owner decision 2026-10-13). relatedPosts from Notion "Related Posts" (by Slug);
 * mediaUrl images get width/height; a leading body heading that repeats the title is dropped.
 * New Notion posts are created as post-<slug>. Posts that exist only in Sanity are NOT deleted here;
 * they are listed, and their delete goes in an owner-run script.
 */
import { createClient } from '@sanity/client';
import sharp from 'sharp';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WRITE = process.env.WRITE === '1';
const env = Object.fromEntries(readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n').filter((l) => /^[A-Z_]+=/.test(l)).map((l) => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const DATA_SOURCE = '3a3bb710-b9ab-8085-901a-000bbfe6129f';
const NH = { Authorization: 'Bearer ' + env.NOTION_TOKEN, 'Notion-Version': '2025-09-03', 'Content-Type': 'application/json' };
const sanity = createClient({ projectId: 'splvhmk1', dataset: 'production', apiVersion: '2026-01-01', token: env.SANITY_TOKEN || env.SANITY_API_TOKEN, useCdn: false });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function notion(url, opt = {}) {
  for (let t = 0; t < 6; t++) {
    const r = await fetch(url, { headers: NH, ...opt });
    if (r.status === 429 || r.status >= 500) { await sleep(1500 * (t + 1)); continue; }
    const j = await r.json();
    if (j.object === 'error') throw new Error(`${url}: ${j.message}`);
    return j;
  }
  throw new Error(`${url}: retries exhausted`);
}
async function children(id) {
  const out = []; let c;
  do {
    const j = await notion(`https://api.notion.com/v1/blocks/${id}/children?page_size=100${c ? '&start_cursor=' + c : ''}`);
    for (const b of j.results) { if (b.has_children && !['child_page', 'child_database'].includes(b.type)) b._children = await children(b.id); out.push(b); }
    c = j.has_more ? j.next_cursor : null;
  } while (c);
  return out;
}
const titleOf = {};
const slugOf = {};
async function pageTitle(id) {
  if (titleOf[id] !== undefined) return titleOf[id];
  const j = await notion('https://api.notion.com/v1/pages/' + id);
  const t = Object.values(j.properties || {}).find((p) => p.type === 'title');
  slugOf[id] = (j.properties?.Slug?.rich_text || []).map((r) => r.plain_text).join('').trim();
  return (titleOf[id] = (t?.title || []).map((r) => r.plain_text).join(''));
}
const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const plain = (p) => (p?.rich_text || p?.title || []).map((r) => r.plain_text).join('').trim();

// ---- Notion blocks → Portable Text --------------------------------------------------------
const key = (...parts) => createHash('sha1').update(parts.join('|')).digest('hex').slice(0, 12);
function spans(rich, bk) {
  const markDefs = []; const kids = [];
  rich.forEach((r, i) => {
    const a = r.annotations || {}; const marks = [];
    if (a.bold) marks.push('strong'); if (a.italic) marks.push('em'); if (a.code) marks.push('code');
    if (a.underline) marks.push('underline'); if (a.strikethrough) marks.push('strike-through');
    const href = r.href || r.text?.link?.url;
    if (href) { const k = key(bk, 'l', i); markDefs.push({ _type: 'link', _key: k, href, blank: !/^https?:\/\/(www\.)?wugweb\.com/.test(href) }); marks.push(k); }
    kids.push({ _type: 'span', _key: key(bk, 's', i), text: r.plain_text, marks });
  });
  if (!kids.length) kids.push({ _type: 'span', _key: key(bk, 's0'), text: '', marks: [] });
  return { children: kids, markDefs };
}
const STYLE = { paragraph: 'normal', heading_1: 'h2', heading_2: 'h2', heading_3: 'h3', heading_4: 'h4', quote: 'blockquote' };
function toPT(blocks, level = 0, out = []) {
  for (const b of blocks) {
    const v = b[b.type] || {}; const bk = b.id;
    if (STYLE[b.type]) {
      const s = spans(v.rich_text || [], bk);
      if (b.type !== 'paragraph' || s.children.some((c) => c.text.trim())) out.push({ _type: 'block', _key: key(bk), style: STYLE[b.type], ...s });
      if (b._children) toPT(b._children, level, out);
    } else if (b.type === 'bulleted_list_item' || b.type === 'numbered_list_item') {
      out.push({ _type: 'block', _key: key(bk), style: 'normal', listItem: b.type === 'bulleted_list_item' ? 'bullet' : 'number', level: level + 1, ...spans(v.rich_text || [], bk) });
      if (b._children) toPT(b._children, level + 1, out);
    } else if (b.type === 'image') {
      const url = v.external?.url || v.file?.url; const caption = (v.caption || []).map((r) => r.plain_text).join('').trim();
      // Notion images have no alt field. A caption starting "Alt:" is alt text only (no visible
      // figcaption); any other caption is shown and doubles as the alt.
      const altOnly = caption.match(/^alt:\s*(.+)$/i);
      if (url) out.push({ _type: 'mediaUrl', _key: key(bk), url, ...(altOnly ? { alt: altOnly[1].trim() } : caption ? { caption, alt: caption } : {}) });
    } else if (b.type === 'table') {
      const rows = (b._children || []).filter((r) => r.type === 'table_row').map((r) => ({ _type: 'tableRow', _key: key(r.id), cells: r.table_row.cells.map((c) => c.map((x) => x.plain_text).join('')) }));
      if (rows.length) out.push({ _type: 'table', _key: key(bk), rows });
    } else if (b.type === 'divider') {
      // no divider block in blockContent
    } else if (b._children) toPT(b._children, level, out);
    else if (v.rich_text) out.push({ _type: 'block', _key: key(bk), style: 'normal', ...spans(v.rich_text, bk) });
  }
  return out;
}

// Intrinsic image size for mediaUrl blocks, so the page can set width/height and the browser
// reserves the box before the image arrives. One fetch per URL per run; failures leave it unset.
const sizeCache = {};
async function imageSize(url) {
  if (url in sizeCache) return sizeCache[url];
  try {
    const r = await fetch(url);
    if (!r.ok) return (sizeCache[url] = null);
    const m = await sharp(Buffer.from(await r.arrayBuffer())).metadata();
    return (sizeCache[url] = m.width && m.height ? { width: m.width, height: m.height } : null);
  } catch { return (sizeCache[url] = null); }
}
async function withSizes(body) {
  for (const b of body) {
    if (b._type !== 'mediaUrl' || /\.(mp4|webm|mov)(\?|$)/i.test(b.url)) continue;
    const s = await imageSize(b.url);
    if (s) Object.assign(b, s);
  }
  return body;
}
// A Notion page that opens with its own title as a heading renders the H1 twice (heading_1 → h2).
const norm = (t) => String(t || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
function dropTitleHeading(body, title) {
  const first = body[0];
  if (first?._type === 'block' && /^h[1-4]$/.test(first.style || '') && norm(first.children?.map((c) => c.text).join('')) === norm(title)) return body.slice(1);
  return body;
}

// Order-independent comparison that ignores _key (Sanity returns object keys in its own order).
const strip = (v) => Array.isArray(v) ? v.map(strip) : v && typeof v === 'object'
  ? Object.fromEntries(Object.keys(v).filter((k) => k !== '_key').sort().map((k) => [k, strip(v[k])])) : v;
const canon = (v) => JSON.stringify(strip(v ?? null));

const CATEGORY_MAP = {
  'UX Design': 'Experience Design', 'Design': 'Experience Design', 'Design Process': 'Experience Design',
  'Product': 'Experience Design', 'Tools': 'Experience Design',
  'AI': 'AI & Automation', 'Martech': 'MarTech', 'Brand & Strategy': 'Brand & Strategy', 'Brand': 'Brand & Strategy',
  'Strategy': 'Digital Transformation', 'Development': 'Web & App Development', 'Tech': 'Web & App Development',
  'Career': 'Misc', 'Lifestyle': 'Misc',
};
const unmappedCategories = new Set();
const topicCount = {}; const noTopic = []; const unknownAuthors = new Set();

// ---- load ---------------------------------------------------------------------------------
const pages = []; let cur;
do {
  const j = await notion(`https://api.notion.com/v1/data_sources/${DATA_SOURCE}/query`, { method: 'POST', body: JSON.stringify({ page_size: 100, ...(cur ? { start_cursor: cur } : {}) }) });
  pages.push(...j.results.filter((p) => !p.in_trash && !p.archived)); cur = j.has_more ? j.next_cursor : null;
} while (cur);
const posts = await sanity.fetch('*[_type == "post"]');
const published = Object.fromEntries(posts.filter((p) => !p._id.startsWith('drafts.')).map((p) => [p._id, p]));
const draftOf = Object.fromEntries(posts.filter((p) => p._id.startsWith('drafts.')).map((p) => [p._id.slice(7), p]));
const bySlug = Object.fromEntries(Object.values(published).map((p) => [p.slug?.current, p._id]));
const people = await sanity.fetch('*[_type == "person"]{_id, name}');
const personByName = Object.fromEntries(people.map((p) => [String(p.name).toLowerCase(), p._id]));

const ops = []; const created = []; const matched = new Set(); const report = [];
for (const p of pages) {
  const P = p.properties;
  const row = {
    postId: plain(P['Post ID']), slug: plain(P['Slug']), sanityId: plain(P['Sanity ID']), title: plain(P['Title']),
    excerpt: plain(P['Excerpt']), seoTitle: plain(P['SEO Title']), seoDescription: plain(P['SEO Description']),
    canonicalUrl: plain(P['Canonical URL']), featured: P['Featured']?.checkbox ?? null, readingTime: P['Read Time (min)']?.number ?? null,
    publishDate: P['Publish Date']?.date?.start || null, cover: P['Cover Image']?.url || '', og: P['OG Image']?.url || '',
  };
  const body = await withSizes(dropTitleHeading(toPT(await children(p.id)), row.title));
  const set = {};
  for (const f of ['title', 'excerpt', 'seoTitle', 'seoDescription', 'canonicalUrl']) if (row[f]) set[f] = row[f];
  if (row.slug) set.slug = { _type: 'slug', current: row.slug };
  if (row.featured !== null) set.featured = row.featured;
  if (row.readingTime) set.readingTime = row.readingTime;
  if (row.publishDate) set.publishedAt = row.publishDate.length === 10 ? `${row.publishDate}T00:00:00Z` : row.publishDate;
  if (row.cover) { set.coverPath = row.cover; set.ogImagePath = row.og || row.cover; }
  if (body.length) set.body = body;
  const catName = P['Category']?.relation?.[0] ? await pageTitle(P['Category'].relation[0].id) : '';
  if (catName) {
    if (CATEGORY_MAP[catName]) set.category = CATEGORY_MAP[catName]; else unmappedCategories.add(catName);
    // topic: the Notion category itself, for the blog filter (?topic=<Notion Slug>)
    set.topic = catName;
    set.topicSlug = slugOf[P['Category'].relation[0].id] || slugify(catName);
    topicCount[catName] = (topicCount[catName] || 0) + 1;
  } else noTopic.push(row.postId);

  const rel = async (arr) => Promise.all((arr || []).map((r) => pageTitle(r.id)));
  const authorName = (await rel(P['Author']?.relation))[0] || '';
  const tags = (await rel(P['Tags']?.relation)).filter(Boolean);
  const personId = personByName[authorName.toLowerCase()];
  if (personId) set.author = { _type: 'reference', _ref: personId };
  else if (authorName) unknownAuthors.add(authorName);
  if (tags.length) set.tags = tags;
  // Related Posts (Notion relation) → relatedPosts references, matched by the related page's Slug.
  const relIds = [];
  for (const r of P['Related Posts']?.relation || []) {
    await pageTitle(r.id);
    const rid = bySlug[slugOf[r.id]];
    if (rid && slugOf[r.id] !== row.slug && !relIds.includes(rid)) relIds.push(rid);
  }
  if (relIds.length) set.relatedPosts = relIds.map((ref) => ({ _type: 'reference', _key: key(p.id, ref), _ref: ref }));
  const id = published[row.sanityId] ? row.sanityId : bySlug[row.slug];
  if (id) {
    matched.add(id);
    const d = published[id];
    const changed = Object.keys(set).filter((k) => canon(d[k]) !== canon(set[k]));
    if (!changed.length) continue;
    const patchSet = Object.fromEntries(changed.map((k) => [k, set[k]]));
    ops.push({ id, rev: d._rev, set: patchSet });
    if (draftOf[id]) ops.push({ id: draftOf[id]._id, rev: draftOf[id]._rev, set: patchSet });
    report.push(`${row.postId} ${id}: ${changed.join(', ')}`);
  } else {
    const _id = `post-${row.slug}`;
    const doc = { _id, _type: 'post', ...set, owner: 'wugweb', language: 'en' };
    created.push(doc);
    report.push(`${row.postId} CREATE ${_id} (${body.length} blocks, author ${authorName || '-'}${personByName[authorName.toLowerCase()] ? '' : ' NOT FOUND'})`);
  }
}
const sanityOnly = Object.values(published).filter((d) => !matched.has(d._id)).map((d) => `${d._id} (${d.slug?.current})`);

console.log(WRITE ? 'WRITE' : 'DRY RUN (WRITE=1 to apply)');
console.log(`Notion posts ${pages.length} | updates ${ops.length} | creates ${created.length} | Sanity-only (not deleted here) ${sanityOnly.length}`);
report.forEach((r) => console.log('  ' + r));
const catCount = {};
for (const o of ops) if (o.set.category && !o.id.startsWith('drafts.')) catCount[o.set.category] = (catCount[o.set.category] || 0) + 1;
for (const d of created) if (d.category) catCount[d.category] = (catCount[d.category] || 0) + 1;
if (Object.keys(catCount).length) console.log('category changes by target:', catCount);
console.log('topics (all Notion posts):', topicCount, '| total', Object.values(topicCount).reduce((a, b) => a + b, 0), '| posts with no Notion category:', noTopic);
if (unknownAuthors.size) console.log('Notion authors with no Sanity person (left unchanged):', [...unknownAuthors]);
if (unmappedCategories.size) console.log('UNMAPPED Notion categories (left unchanged):', [...unmappedCategories]);
console.log('Sanity-only:'); sanityOnly.forEach((s) => console.log('  ' + s));

if (WRITE) {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backup = path.join(ROOT, 'backups', `sanity-pre-notion-blog-sync-${stamp}.json`);
  if (existsSync(backup)) throw new Error('backup exists');
  writeFileSync(backup, JSON.stringify({ takenAt: new Date().toISOString(), docs: posts }, null, 1));
  for (let i = 0; i < ops.length; i += 20) {
    const tx = sanity.transaction();
    ops.slice(i, i + 20).forEach((o) => tx.patch(o.id, (p) => p.ifRevisionId(o.rev).set(o.set)));
    await tx.commit();
  }
  const tx = sanity.transaction(); created.forEach((d) => tx.createIfNotExists(d)); await tx.commit();
  console.log(`Committed ${ops.length} patches and ${created.length} creates. Backup: ${path.relative(ROOT, backup)}`);
}
