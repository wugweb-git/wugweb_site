#!/usr/bin/env node
/**
 * Comprehensive extraction from the Uncode/VC Wugweb site DB
 * (vedanshu_design/u544169507_U0koD.sql):
 *  - All published blog posts (13) + portfolio/case studies (18)
 *  - Full post_content (Uncode/VC HTML)
 *  - Media refs: inline upload paths + postmeta (_thumbnail_id,
 *    _uncode_featured_media, _uncode_specific_media, _uncode_gallery_media)
 *  - Attachment id → guid/file map
 *  - Category terms for each post
 * Output: notion-data/uncode-extract.json
 */
import fs from 'fs';

const SQL = '/Users/abcom/Documents/GitHub/vedanshu_design/u544169507_U0koD.sql';
const OUT = '/Users/abcom/Documents/GitHub/wugweb_site/notion-data/uncode-extract.json';
const sql = fs.readFileSync(SQL, 'utf8');

function getInsertBlocks(table) {
  const blocks = [];
  const re = new RegExp(`INSERT INTO \\\`${table}\\\`[^\\n]*VALUES\\s*`, 'g');
  for (const m of sql.matchAll(re)) {
    let i = m.index + m[0].length;
    while (i < sql.length) {
      const c = sql[i];
      if (c === '\\') { i += 2; continue; }
      if (c === "'") {
        i += 1;
        while (i < sql.length) {
          if (sql[i] === '\\') { i += 2; continue; }
          if (sql[i] === "'") { if (sql[i + 1] === "'") { i += 2; continue; } break; }
          i += 1;
        }
      } else if (c === ')') {
        if (sql.slice(i, i + 2) === ');') { blocks.push(sql.slice(m.index, i + 2)); break; }
      }
      i += 1;
    }
  }
  return blocks;
}

function splitRows(vals) {
  const rows = [];
  let depth = 0, start = null, i = 0;
  while (i < vals.length) {
    const c = vals[i];
    if (c === '\\') { i += 2; continue; }
    if (c === "'") {
      i += 1;
      while (i < vals.length) {
        if (vals[i] === '\\') { i += 2; continue; }
        if (vals[i] === "'") { if (vals[i + 1] === "'") { i += 2; continue; } break; }
        i += 1;
      }
    } else if (c === '(') { if (depth === 0) start = i; depth += 1; }
    else if (c === ')') { depth -= 1; if (depth === 0 && start !== null) { rows.push(vals.slice(start, i + 1)); start = null; } }
    i += 1;
  }
  return rows;
}

function parseRow(row) {
  const vals = [];
  let depth = 0, cur = '', i = 0;
  const inner = row.slice(1, -1);
  while (i < inner.length) {
    const c = inner[i];
    if (c === '\\') { cur += c + inner[i + 1]; i += 2; continue; }
    if (c === "'") {
      let s = "'"; i += 1;
      while (i < inner.length) {
        if (inner[i] === '\\') { s += inner[i] + inner[i + 1]; i += 2; continue; }
        s += inner[i];
        if (inner[i] === "'") { if (inner[i + 1] === "'") { s += "'"; i += 2; continue; } break; }
        i += 1;
      }
      cur += s; i += 1; continue;
    }
    if (c === ',' && depth === 0) { vals.push(cur.trim()); cur = ''; i += 1; continue; }
    if (c === '(') depth += 1;
    if (c === ')') depth -= 1;
    cur += c; i += 1;
  }
  if (cur.trim()) vals.push(cur.trim());
  return vals;
}

const clean = (v) => v.replace(/^'|'$/g, '').replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\');

function colsOf(table) {
  const m = sql.match(new RegExp(`INSERT INTO \\\`${table}\\\` \\(([^)]+)\\) VALUES`));
  return m ? m[1].split(',').map((c) => c.trim().replace(/^`|`$/g, '')) : [];
}

// ── wp_posts ──
const PCOLS = colsOf('wp_posts');
const PI = { id: PCOLS.indexOf('ID'), type: PCOLS.indexOf('post_type'), status: PCOLS.indexOf('post_status'), title: PCOLS.indexOf('post_title'), name: PCOLS.indexOf('post_name'), date: PCOLS.indexOf('post_date'), content: PCOLS.indexOf('post_content'), excerpt: PCOLS.indexOf('post_excerpt'), parent: PCOLS.indexOf('post_parent'), mime: PCOLS.indexOf('post_mime_type'), guid: PCOLS.indexOf('guid') };

const posts = [];
const attachments = {}; // id -> {guid, title, mime}
for (const ins of getInsertBlocks('wp_posts')) {
  const valsM = ins.match(/VALUES\s*([\s\S]*)$/);
  if (!valsM) continue;
  for (const row of splitRows(valsM[1])) {
    const v = parseRow(row);
    if (v.length < 22) continue;
    const type = clean(v[PI.type]);
    const status = clean(v[PI.status]);
    if (type === 'post' && status === 'publish') {
      posts.push({
        id: clean(v[PI.id]), type: 'blog',
        title: clean(v[PI.title]), slug: clean(v[PI.name]),
        date: clean(v[PI.date]), excerpt: clean(v[PI.excerpt]),
        bodyHtml: clean(v[PI.content]),
      });
    } else if (type === 'portfolio' && status === 'publish') {
      posts.push({
        id: clean(v[PI.id]), type: 'caseStudy',
        title: clean(v[PI.title]), slug: clean(v[PI.name]),
        date: clean(v[PI.date]), excerpt: clean(v[PI.excerpt]),
        bodyHtml: clean(v[PI.content]),
      });
    } else if (type === 'attachment') {
      attachments[clean(v[PI.id])] = {
        guid: clean(v[PI.guid]), title: clean(v[PI.title]), mime: clean(v[PI.mime]), parent: clean(v[PI.parent]),
      };
    }
  }
}

// ── wp_postmeta (media refs + seo) ──
const MCOLS = colsOf('wp_postmeta');
const metaByPost = {};
for (const ins of getInsertBlocks('wp_postmeta')) {
  const valsM = ins.match(/VALUES\s*([\s\S]*)$/);
  if (!valsM) continue;
  for (const row of splitRows(valsM[1])) {
    const v = parseRow(row);
    if (v.length < 4) continue;
    const pid = clean(v[1]);
    const key = clean(v[2]);
    const val = clean(v[3]);
    if (key.startsWith('_') || key.includes('seo') || key.includes('meta') || key.includes('title') || key.includes('description')) {
      metaByPost[pid] = metaByPost[pid] || {};
      metaByPost[pid][key] = val;
    }
  }
}

// ── terms / categories ──
const terms = {}; // term_id -> name
if (colsOf('wp_terms').length) {
  const TCOLS = colsOf('wp_terms');
  const ti = { id: TCOLS.indexOf('term_id'), name: TCOLS.indexOf('name'), slug: TCOLS.indexOf('slug') };
  for (const ins of getInsertBlocks('wp_terms')) {
    const valsM = ins.match(/VALUES\s*([\s\S]*)$/);
    if (!valsM) continue;
    for (const row of splitRows(valsM[1])) {
      const v = parseRow(row);
      if (v.length >= 3) terms[clean(v[ti.id])] = clean(v[ti.name]);
    }
  }
}
// term relationships
const rels = {}; // post_id -> [term_id]
if (colsOf('wp_term_relationships').length) {
  for (const ins of getInsertBlocks('wp_term_relationships')) {
    const valsM = ins.match(/VALUES\s*([\s\S]*)$/);
    if (!valsM) continue;
    for (const row of splitRows(valsM[1])) {
      const v = parseRow(row);
      if (v.length >= 2) {
        const pid = clean(v[0]);
        rels[pid] = rels[pid] || [];
        rels[pid].push(clean(v[1]));
      }
    }
  }
}

// ── enrich posts with media + categories ──
for (const p of posts) {
  const meta = metaByPost[p.id] || {};
  // inline media
  const inline = [...new Set(p.bodyHtml.match(/wp-content\/uploads\/[0-9]+\/[0-9]+\/[A-Za-z0-9_.-]+\.(?:png|jpe?g|webp|gif|mp4)/g) || [])];
  // attachment-id media from meta
  const attachIds = [];
  for (const key of ['_thumbnail_id', '_uncode_featured_media', '_uncode_specific_media', '_uncode_gallery_media', '_uncode_secondary_thumbnail_id']) {
    const val = meta[key];
    if (!val) continue;
    // can be a single id or serialized array
    const ids = val.match(/\d+/g) || [];
    attachIds.push(...ids);
  }
  const attachMedia = [...new Set(attachIds)]
    .map((id) => attachments[id] ? { id, guid: attachments[id].guid, title: attachments[id].title } : null)
    .filter(Boolean);
  p.media = { inline, attachments: attachMedia };
  p.categories = (rels[p.id] || []).map((tid) => terms[tid]).filter(Boolean);
  p.meta = Object.fromEntries(Object.entries(meta).filter(([k]) => !k.startsWith('_')));
}

fs.writeFileSync(OUT, JSON.stringify({ posts, attachments: Object.entries(attachments).map(([id, a]) => ({ id, ...a })) }, null, 2));
console.log(`Extracted ${posts.length} posts (${posts.filter(p => p.type === 'blog').length} blogs, ${posts.filter(p => p.type === 'caseStudy').length} case studies)`);
for (const p of posts) {
  console.log(`  [${p.type}] ${p.title.slice(0, 55)} | media: ${p.media.inline.length} inline + ${p.media.attachments.length} attached | cats: ${p.categories.join(',') || '-'}`);
}
console.log(`Attachments: ${Object.keys(attachments).length}`);
