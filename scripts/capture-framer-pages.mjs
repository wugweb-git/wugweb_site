#!/usr/bin/env node
/**
 * Capture Framer pages into reference/ (HTML + page-linked media).
 * Identity download only — not a full site mirror.
 *
 * Usage: node scripts/capture-framer-pages.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const REF = path.join(ROOT, 'reference');
const BASE = process.env.FRAMER_BASE || 'https://lucky-subtasks-379995.framer.app';

const PAGES = [
  { path: '/', title: 'Home — Wugweb' },
  { path: '/faq', title: 'FAQ — Wugweb' },
  { path: '/work', title: 'Work — Wugweb' },
  { path: '/blog', title: 'Blog — Wugweb' },
  { path: '/services/lead-generation', title: 'Lead Generation Services — Wugweb' },
  { path: '/footer/industries', title: 'Industries — Wugweb' },
  { path: '/footer/subscription', title: 'Subscription — Wugweb' },
];

function safeName(title) {
  return title.replace(/[\/\\?%*:|"<>]/g, '—').trim();
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'wugweb-capture/1.0' },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return { html: await res.text(), finalUrl: res.url };
}

async function fetchBin(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'wugweb-capture/1.0' },
    redirect: 'follow',
  });
  if (!res.ok) return null;
  return Buffer.from(await res.arrayBuffer());
}

function collectAssetUrls(html, pageUrl) {
  const urls = new Set();
  const re = /(?:src|href)=["']([^"']+\.(?:svg|png|jpe?g|webp|gif|mp4|webm|woff2?))(?:\?[^"']*)?["']/gi;
  let m;
  while ((m = re.exec(html))) {
    try {
      const abs = new URL(m[1], pageUrl).href;
      if (/gtm|googletagmanager|google-analytics|hotjar|facebook|doubleclick/i.test(abs)) continue;
      urls.add(abs);
    } catch {
      /* skip */
    }
  }
  // framerusercontent images in srcset
  const re2 = /https:\/\/framerusercontent\.com\/[^"' )\s]+/gi;
  while ((m = re2.exec(html))) {
    const u = m[0].replace(/&amp;/g, '&');
    if (/\.(svg|png|jpe?g|webp|gif|mp4|woff2?)(\?|$)/i.test(u)) urls.add(u.split(' ')[0]);
  }
  return [...urls].slice(0, 120); // soft cap per page (Rule 1)
}

function rewriteLocal(html, filesDirName, urlToLocal) {
  let out = html;
  for (const [remote, localName] of urlToLocal) {
    out = out.split(remote).join(`./${filesDirName}/${localName}`);
    // also without query
    try {
      const bare = remote.split('?')[0];
      if (bare !== remote) out = out.split(bare).join(`./${filesDirName}/${localName}`);
    } catch {
      /* */
    }
  }
  return out;
}

function localFileName(url) {
  const u = new URL(url);
  let base = path.basename(u.pathname) || 'asset';
  base = base.replace(/[^a-zA-Z0-9._-]/g, '_');
  if (base.length > 80) base = base.slice(0, 80);
  const q = u.searchParams.get('width') || u.searchParams.get('scale-down-to') || '';
  if (q) {
    const ext = path.extname(base);
    const stem = path.basename(base, ext);
    base = `${stem}_${q}${ext}`;
  }
  return base;
}

async function capturePage(entry) {
  const { html, finalUrl } = await fetchText(`${BASE}${entry.path}`);
  const title = safeName(entry.title);
  const filesDirName = `${title}_files`;
  const filesDir = path.join(REF, filesDirName);
  fs.mkdirSync(filesDir, { recursive: true });

  const assets = collectAssetUrls(html, finalUrl);
  const urlToLocal = [];
  let saved = 0;
  for (const url of assets) {
    const name = localFileName(url);
    const dest = path.join(filesDir, name);
    if (!fs.existsSync(dest)) {
      const buf = await fetchBin(url);
      if (!buf) continue;
      fs.writeFileSync(dest, buf);
      saved++;
    }
    urlToLocal.push([url, name]);
  }

  const rewritten = rewriteLocal(html, filesDirName, urlToLocal);
  const htmlPath = path.join(REF, `${title}.html`);
  fs.writeFileSync(htmlPath, rewritten);
  return { title, assets: assets.length, saved, htmlPath };
}

async function main() {
  console.log(`📥 Capture Framer pages from ${BASE}\n`);
  const report = [];
  for (const p of PAGES) {
    try {
      const r = await capturePage(p);
      console.log(`✓ ${p.path} → ${r.title}.html (assets linked ${r.assets}, new files ${r.saved})`);
      report.push({ ...p, ...r, ok: true });
    } catch (e) {
      console.error(`✗ ${p.path}: ${e.message}`);
      report.push({ ...p, ok: false, error: e.message });
    }
  }
  fs.writeFileSync(
    path.join(ROOT, 'docs', 'framer-page-capture-report.json'),
    JSON.stringify({ generatedAt: new Date().toISOString(), base: BASE, report }, null, 2)
  );
  console.log('\n✅ Wrote docs/framer-page-capture-report.json');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
