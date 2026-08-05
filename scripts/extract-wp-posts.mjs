#!/usr/bin/env node
/**
 * Extract ALL published WordPress posts + media + SEO from the wugweb.design
 * SQL dump. Outputs a JSON manifest with full body HTML, image refs, dates,
 * and SEO metadata (from wp_aioseo_posts / rank_math where present).
 */
import fs from 'fs';

const SQL = '/Users/abcom/Documents/GitHub/wugweb_design/u544169507_wugD (1).sql';
const OUT = '/Users/abcom/Documents/GitHub/wugweb_site/notion-data/wp-posts-extract.json';

const sql = fs.readFileSync(SQL, 'utf8');

const colsM = sql.match(/INSERT INTO `wp_posts` \(([^)]+)\) VALUES/);
const cols = colsM[1].split(',').map((c) => c.trim().replace(/^`|`$/g, ''));
const I = {
  id: cols.indexOf('ID'),
  type: cols.indexOf('post_type'),
  status: cols.indexOf('post_status'),
  title: cols.indexOf('post_title'),
  name: cols.indexOf('post_name'),
  date: cols.indexOf('post_date'),
  content: cols.indexOf('post_content'),
  excerpt: cols.indexOf('post_excerpt'),
  parent: cols.indexOf('post_parent'),
  mime: cols.indexOf('post_mime_type'),
};

// Split SQL into INSERT statements (handle content containing ; and quotes)
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
          if (sql[i] === "'") {
            if (sql[i + 1] === "'") { i += 2; continue; }
            break;
          }
          i += 1;
        }
      } else if (c === ')') {
        if (sql.slice(i, i + 2) === ');') {
          blocks.push(sql.slice(m.index, i + 2));
          break;
        }
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
        if (vals[i] === "'") {
          if (vals[i + 1] === "'") { i += 2; continue; }
          break;
        }
        i += 1;
      }
    } else if (c === '(') {
      if (depth === 0) start = i;
      depth += 1;
    } else if (c === ')') {
      depth -= 1;
      if (depth === 0 && start !== null) { rows.push(vals.slice(start, i + 1)); start = null; }
    }
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
        if (inner[i] === "'") {
          if (inner[i + 1] === "'") { s += "'"; i += 2; continue; }
          break;
        }
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

const unescapeSql = (s) => s
  .replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\')
  .replace(/\\n/g, '\n').replace(/\\r/g, '').replace(/\u0000/g, '');

const clean = (v) => unescapeSql(v.replace(/^'|'$/g, ''));

// Parse all post rows
const posts = [];
const attachments = [];
for (const ins of getInsertBlocks('wp_posts')) {
  const valsM = ins.match(/VALUES\s*([\s\S]*)$/);
  if (!valsM) continue;
  for (const row of splitRows(valsM[1])) {
    const v = parseRow(row);
    if (v.length < 22) continue;
    const type = clean(v[I.type]);
    const status = clean(v[I.status]);
    if (type === 'post' && status === 'publish') {
      posts.push({
        id: clean(v[I.id]),
        title: clean(v[I.title]),
        slug: clean(v[I.name]),
        date: clean(v[I.date]),
        excerpt: clean(v[I.excerpt]),
        bodyHtml: clean(v[I.content]),
      });
    } else if (type === 'attachment') {
      attachments.push({
        id: clean(v[I.id]),
        title: clean(v[I.title]),
        slug: clean(v[I.name]),
        mime: clean(v[I.mime]),
        parent: clean(v[I.parent]),
        guid: clean(v[I.guid] ?? ''),
      });
    }
  }
}

// Extract media URLs referenced in each post body
for (const p of posts) {
  const urls = [...new Set(p.bodyHtml.match(/https?:\/\/[^\s"'()<>]+\.(?:png|jpe?g|webp|gif|mp4|svg)/gi) || [])];
  p.mediaUrls = urls;
  // Extract wp-content upload paths
  const paths = [...new Set(p.bodyHtml.match(/wp-content\/uploads\/[0-9]+\/[0-9]+\/[A-Za-z0-9_-]+\.(?:png|jpe?g|webp|gif)/g) || [])];
  p.uploadPaths = paths;
}

// Basic SEO: try aioseo_posts table
const seo = {};
try {
  for (const ins of getInsertBlocks('wp_aioseo_posts')) {
    const valsM = ins.match(/VALUES\s*([\s\S]*)$/);
    if (!valsM) continue;
    // aioseo_posts columns: id, post_id, title, description, ... (find post_id)
    for (const row of splitRows(valsM[1])) {
      const v = parseRow(row);
      if (!v.length) continue;
      // post_id is usually 2nd column
      seo[v[1].replace(/^'|'$/g, '')] = v;
    }
  }
  console.log('aioseo rows:', Object.keys(seo).length);
} catch (e) {
  console.log('no aioseo:', e.message);
}

const out = posts.map((p) => ({ ...p, seo: seo[p.id] || null }));
fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log(`\nExtracted ${out.length} published posts -> ${OUT}`);
for (const p of out) {
  console.log(`  ${p.date.slice(0, 10)}  ${p.title.slice(0, 60)}  (body ${p.bodyHtml.length}ch, ${p.mediaUrls.length} media)`);
}
console.log(`\nAttachments: ${attachments.length}`);
