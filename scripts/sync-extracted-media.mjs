#!/usr/bin/env node
/**
 * Sync extracted website/client media → public/assets + Sanity path fields.
 *
 * Sources:
 *   1. assets/assets/client/<slug>/*  → public/assets/work/<slug>/  (case study thumbs)
 *   2. Framer blog post pages         → public/assets/blog/<slug>.ext (covers)
 *   3. First framerusercontent image in Sanity post body (fallback cover)
 *
 * Then patches Sanity coverPath / thumbnailPath / galleryPaths.
 * Does NOT upload to Sanity CDN. Optional R2 upload of new files only.
 *
 *   DRY_RUN=1 node scripts/sync-extracted-media.mjs
 *   node scripts/sync-extracted-media.mjs
 *   UPLOAD_R2=1 node scripts/sync-extracted-media.mjs
 */
import { createClient } from '@sanity/client';
import { createWriteStream, promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DRY_RUN = process.env.DRY_RUN === '1';
const UPLOAD_R2 = process.env.UPLOAD_R2 === '1';
const R2_PUBLIC_BASE =
  process.env.PUBLIC_R2_ASSETS_BASE ||
  'https://pub-39ad1d03baec440faf48303be95c3782.r2.dev';
const FRAMER_BLOG_BASE = 'https://lucky-subtasks-379995.framer.app';
const SEARCH_INDEX =
  'https://framerusercontent.com/sites/7u1QWQMRdBLSHDp9wRi3ke/searchIndex-FeuG7T5mQIvQ.json';

const token = process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN;
if (!token) {
  console.error('Missing SANITY_TOKEN');
  process.exit(1);
}

const client = createClient({
  projectId: 'splvhmk1',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

const norm = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');

const ICON_BLOCKLIST = [
  'yJuYg2lrJmWntF3zHlL9zyg8sdM', // favicon
  'eyKzVpdm2A4IB87tYf4LkVIM9mM', // apple touch
  'IWvx9mdykYeolQRht7v9HL18URM', // default og
  'pUaBiWtlEyjqxwNTP0ilrHfAVSA', // site og
];

function sitePath(rel) {
  return `/assets/${rel.replace(/^\/+/, '')}`;
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function copyFile(src, dest) {
  await ensureDir(path.dirname(dest));
  if (DRY_RUN) return;
  await fs.copyFile(src, dest);
}

async function download(url, dest) {
  await ensureDir(path.dirname(dest));
  if (DRY_RUN) return true;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 wugweb-media-sync' } });
  if (!res.ok) throw new Error(`GET ${url} → ${res.status}`);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
  return true;
}

function cleanImageUrl(u) {
  if (!u) return null;
  // strip srcset junk / query params for storage key, keep clean CDN URL for download
  const base = u.split('?')[0].replace(/&amp;/g, '&');
  if (!/^https:\/\/framerusercontent\.com\/(images|assets)\//.test(base)) return null;
  if (ICON_BLOCKLIST.some((id) => base.includes(id))) return null;
  return base;
}

function pickCoverFromHtml(html) {
  const all = [...html.matchAll(/https:\/\/framerusercontent\.com\/(?:images|assets)\/[A-Za-z0-9]+[^"'\\\s]*/g)].map(
    (m) => m[0],
  );
  const cleaned = [];
  for (const raw of all) {
    const u = cleanImageUrl(raw);
    if (u && !cleaned.includes(u)) cleaned.push(u);
  }
  // Prefer landscape-ish content images referenced with height=600 in nearby query
  const preferred = cleaned.filter((u) => {
    const idx = html.indexOf(u.replace('https://framerusercontent.com/', ''));
    const window = html.slice(Math.max(0, idx - 50), idx + 200);
    return /height=600|width=1200/.test(window) || /1200x600|cover/i.test(window);
  });
  return preferred[0] || cleaned[0] || null;
}

function firstBodyImage(body) {
  const raw = JSON.stringify(body || '');
  const matches = [...raw.matchAll(/https:\/\/framerusercontent\.com\/(?:images|assets)\/[^"'\\]+\.(?:jpg|jpeg|png|webp)/gi)].map(
    (m) => cleanImageUrl(m[0]),
  );
  return matches.find(Boolean) || null;
}

function extFromUrl(url) {
  const m = url.toLowerCase().match(/\.(png|jpe?g|webp|gif|mp4)(?:$|\?)/);
  return m ? `.${m[1].replace('jpeg', 'jpg')}` : '.png';
}

async function syncClientWorkMedia(report) {
  const srcRoot = path.join(ROOT, 'assets', 'assets', 'client');
  const destRoot = path.join(ROOT, 'public', 'assets', 'work');
  let entries;
  try {
    entries = await fs.readdir(srcRoot, { withFileTypes: true });
  } catch {
    report.gaps.push({ type: 'clientMedia', reason: 'assets/assets/client missing' });
    return;
  }

  const ALIAS = {
    sbs: 'sbs-transit',
    tot: 'tot',
    gratifi: 'gratifi',
    'indusind-bank': 'indusind-bank',
  };

  for (const ent of entries) {
    if (!ent.isDirectory()) continue;
    const folder = ALIAS[ent.name] || ent.name;
    const fromDir = path.join(srcRoot, ent.name);
    const toDir = path.join(destRoot, folder);
    const files = await fs.readdir(fromDir);
    for (const file of files) {
      if (file.startsWith('.')) continue;
      const src = path.join(fromDir, file);
      // normalize: lowercase, underscores → hyphens for consistency with existing public paths
      const destName = file.replace(/_/g, '-');
      // keep known public naming where already present (axis-thumb vs axis_thumb)
      const dest = path.join(toDir, destName);
      const st = await fs.stat(src);
      if (!st.isFile()) continue;
      let exists = false;
      try {
        await fs.access(dest);
        exists = true;
      } catch {}
      // also check case-insensitive existing thumb in dest
      let skip = exists;
      if (!skip) {
        try {
          const existing = await fs.readdir(toDir);
          if (existing.some((e) => e.toLowerCase() === destName.toLowerCase())) skip = true;
        } catch {}
      }
      if (skip) {
        report.clientMedia.skipped.push(`${folder}/${destName}`);
        continue;
      }
      await copyFile(src, dest);
      report.clientMedia.copied.push(`work/${folder}/${destName}`);
      report.newFiles.push(path.join('public', 'assets', 'work', folder, destName));
    }
  }
}

async function syncBlogCovers(report, posts) {
  const destRoot = path.join(ROOT, 'public', 'assets', 'blog');
  await ensureDir(destRoot);

  // Framer search index paths
  let framerPaths = [];
  try {
    const idx = await fetch(SEARCH_INDEX).then((r) => r.json());
    framerPaths = Object.keys(idx).filter((k) => k.startsWith('/blog/') && k !== '/blog');
  } catch (e) {
    report.gaps.push({ type: 'blog', reason: `search index failed: ${e.message}` });
  }

  const bySlug = new Map();

  // 0) Framer listing card covers (highest quality for cards)
  try {
    const listing = JSON.parse(
      await fs.readFile(path.join(ROOT, 'docs', 'framer-blog-listing-covers.json'), 'utf8'),
    );
    for (const [slug, url] of Object.entries(listing)) {
      const cleaned = cleanImageUrl(url);
      if (cleaned) bySlug.set(slug, { url: cleaned, source: 'framer-listing' });
    }
  } catch {}

  // 1) body images from Sanity (fill gaps)
  for (const p of posts) {
    if (bySlug.has(p.slug)) continue;
    const img = firstBodyImage(p.body);
    if (img) bySlug.set(p.slug, { url: img, source: 'sanity-body' });
  }

  // 2) Framer post pages (fill remaining)
  for (const pathKey of framerPaths) {
    const slug = pathKey.replace(/^\/blog\//, '');
    if (bySlug.has(slug)) continue;
    try {
      const html = await fetch(`${FRAMER_BLOG_BASE}${pathKey}`, {
        headers: { 'User-Agent': 'Mozilla/5.0 wugweb-media-sync' },
      }).then((r) => r.text());
      const img = pickCoverFromHtml(html);
      if (img) bySlug.set(slug, { url: img, source: 'framer-page' });
      await new Promise((r) => setTimeout(r, 120));
    } catch (e) {
      report.gaps.push({ type: 'blog', slug, reason: e.message });
    }
  }

  report.blog.discovered = [...bySlug.entries()].map(([slug, v]) => ({ slug, ...v }));

  for (const [slug, { url }] of bySlug) {
    const ext = extFromUrl(url);
    const rel = `blog/${slug}${ext}`;
    const dest = path.join(ROOT, 'public', 'assets', rel);
    try {
      await fs.access(dest);
      report.blog.skipped.push(rel);
    } catch {
      try {
        await download(url, dest);
        report.blog.downloaded.push(rel);
        report.newFiles.push(path.join('public', 'assets', rel));
      } catch (e) {
        report.gaps.push({ type: 'blogDownload', slug, reason: e.message, url });
        continue;
      }
    }

    // patch matching Sanity posts (exact slug, or startsWith)
    const matches = posts.filter((p) => p.slug === slug || norm(p.slug) === norm(slug));
    for (const p of matches) {
      if (p.coverPath === sitePath(rel)) continue;
      if (!DRY_RUN) await client.patch(p._id).set({ coverPath: sitePath(rel) }).commit();
      report.blog.patched.push({ id: p._id, slug: p.slug, coverPath: sitePath(rel) });
    }
  }
}

function findThumbRel(workFolder, files) {
  const prefix = `work/${workFolder}/`;
  const thumbs = files.filter((r) => r.startsWith(prefix) && /thumb/i.test(r));
  // prefer *-thumb.mp4
  thumbs.sort((a, b) => a.length - b.length);
  return thumbs[0] || null;
}

async function walk(dir, base = dir) {
  const out = [];
  let ents;
  try {
    ents = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of ents) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full, base)));
    else if (e.isFile() && !e.name.startsWith('.')) out.push(path.relative(base, full).split(path.sep).join('/'));
  }
  return out;
}

async function remapCaseStudies(report) {
  const workRoot = path.join(ROOT, 'public', 'assets', 'work');
  const framerRoot = path.join(ROOT, 'public', 'assets', 'framer');
  const files = await walk(path.join(ROOT, 'public', 'assets'));
  const workDirs = (await fs.readdir(workRoot, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
  let framerDirs = [];
  try {
    framerDirs = (await fs.readdir(framerRoot, { withFileTypes: true }))
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch {}

  const caseStudies = await client.fetch(
    `*[_type=="caseStudy"]{_id, title, client, "slug": slug.current, thumbnailPath, coverPath, galleryPaths}`,
  );

  const WORK_ALIASES = {
    'aditya-birla-capital': ['adityabirlacapital', 'adityabirla', 'abc'],
    adneto: ['adneto'],
    adtech: ['adtech'],
    'airtel-xsafe': ['airtelxsafe', 'xsafe'],
    'airtel-xstream': ['airtelxstream', 'xstream'],
    'axis-bank': ['axisbank', 'axis'],
    bankco: ['bankco'],
    cartier: ['cartier'],
    gratifi: ['gratifi', 'gratify'],
    'indusind-bank': ['indusind', 'indusninja', 'indus'],
    inkompass: ['inkompass'],
    'itc-citadel': ['itccitadel', 'citadel'],
    kia: ['kia'],
    metcred: ['metcred'],
    ntuc: ['ntuc'],
    plufo: ['plufo'],
    rideev: ['rideev'],
    sadhan: ['sadhan'],
    'sbs-transit': ['sbstransit', 'sbs'],
    tot: ['tot', 'totbridal', 'bridal'],
    valyu: ['valyu'],
    visione: ['visione', 'visione'],
  };

  function bestWorkFolder(cs) {
    const slugN = norm(cs.slug);
    const clientN = norm(cs.client);
    let best = null;
    let bestScore = 0;
    for (const dir of workDirs) {
      const dirN = norm(dir);
      let score = 0;
      if (dirN.length >= 5 && slugN.includes(dirN)) score = Math.max(score, 100);
      if (slugN === dirN) score = 110;
      if (clientN && clientN === dirN) score = Math.max(score, 95);
      for (const a of WORK_ALIASES[dir] || [dirN]) {
        const aliasScore = 40 + Math.min(50, a.length * 2);
        if (slugN.includes(a)) score = Math.max(score, aliasScore + 10);
        if (clientN && clientN.includes(a) && a.length >= 6) score = Math.max(score, aliasScore);
      }
      if (score > bestScore || (score === bestScore && score >= 70 && best && dirN.length > norm(best).length)) {
        bestScore = score;
        best = dir;
      }
    }
    return bestScore >= 70 ? best : null;
  }

  function bestFramer(cs) {
    let best = null;
    let bestScore = 0;
    const slugN = norm(cs.slug);
    for (const d of framerDirs) {
      const f = norm(d);
      let score = 0;
      if (slugN === f) score = 100;
      else if (slugN.startsWith(f) || f.startsWith(slugN)) score = 80;
      else {
        let i = 0;
        while (i < slugN.length && i < f.length && slugN[i] === f[i]) i++;
        if (i >= 16) score = 60;
      }
      if (score > bestScore) {
        bestScore = score;
        best = d;
      }
    }
    return bestScore >= 60 ? best : null;
  }

  for (const cs of caseStudies) {
    const workFolder = bestWorkFolder(cs);
    const framerFolder = bestFramer(cs);
    const thumbRel = workFolder ? findThumbRel(workFolder, files) : null;
    const coverRel = framerFolder
      ? files.find((r) => r.startsWith(`framer/${framerFolder}/`) && /cover/i.test(path.basename(r)))
      : null;
    const galleryRels = framerFolder
      ? files.filter((r) => r.startsWith(`framer/${framerFolder}/`) && !/client-logo/i.test(r)).sort()
      : [];

    // about/dp as supplemental gallery from work folder
    const workGallery = workFolder
      ? files.filter((r) => r.startsWith(`work/${workFolder}/`) && !/thumb/i.test(r)).sort()
      : [];

    const set = {};
    if (thumbRel) set.thumbnailPath = sitePath(thumbRel);
    if (coverRel) set.coverPath = sitePath(coverRel);
    const gallery = [...(coverRel ? [coverRel] : []), ...galleryRels.filter((r) => r !== coverRel), ...workGallery];
    const uniq = [...new Set(gallery)];
    if (uniq.length) set.galleryPaths = uniq.map(sitePath);

    if (!Object.keys(set).length) {
      report.caseStudies.unmapped.push({ slug: cs.slug, client: cs.client });
      continue;
    }

    const changed =
      (set.thumbnailPath && set.thumbnailPath !== cs.thumbnailPath) ||
      (set.coverPath && set.coverPath !== cs.coverPath) ||
      (set.galleryPaths && JSON.stringify(set.galleryPaths) !== JSON.stringify(cs.galleryPaths || []));

    if (changed) {
      if (!DRY_RUN) await client.patch(cs._id).set(set).commit();
      report.caseStudies.patched.push({ id: cs._id, slug: cs.slug, ...set, workFolder, framerFolder });
    } else {
      report.caseStudies.unchanged.push(cs.slug);
    }
  }
}

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] });
    let stderr = '';
    child.stderr.on('data', (d) => (stderr += d));
    child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(stderr || String(code)))));
  });
}

async function uploadNewToR2(report) {
  if (!UPLOAD_R2 || !report.newFiles.length) return;
  // free-tier soft check: new files only
  let bytes = 0;
  for (const f of report.newFiles) {
    const st = await fs.stat(path.join(ROOT, f));
    bytes += st.size;
  }
  report.r2 = { files: report.newFiles.length, bytes };
  if (bytes > 9.5 * 1024 ** 3) {
    report.gaps.push({ type: 'r2', reason: 'abort: would exceed soft storage ceiling' });
    return;
  }
  for (const f of report.newFiles) {
    const abs = path.join(ROOT, f);
    const rel = f.replace(/^public\//, ''); // assets/...
    const key = rel; // already assets/...
    const ext = path.extname(rel).toLowerCase();
    const ct =
      {
        '.mp4': 'video/mp4',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml',
      }[ext] || 'application/octet-stream';
    if (DRY_RUN) continue;
    await run('npx', ['wrangler', 'r2', 'object', 'put', `wugweb-assets/${key}`, '--file', abs, '--content-type', ct, '--remote']);
    report.r2.uploaded = (report.r2.uploaded || 0) + 1;
  }
}

async function main() {
  const posts = await client.fetch(`*[_type=="post"]{_id, title, "slug": slug.current, coverPath, body}`);
  const report = {
    generatedAt: new Date().toISOString(),
    dryRun: DRY_RUN,
    clientMedia: { copied: [], skipped: [] },
    blog: { discovered: [], downloaded: [], skipped: [], patched: [] },
    caseStudies: { patched: [], unchanged: [], unmapped: [] },
    newFiles: [],
    gaps: [],
  };

  console.log('1/4 sync client → work…');
  await syncClientWorkMedia(report);
  console.log('   copied', report.clientMedia.copied.length);

  console.log('2/4 blog covers…');
  await syncBlogCovers(report, posts);
  console.log('   downloaded', report.blog.downloaded.length, 'patched', report.blog.patched.length);

  console.log('3/4 remap case studies…');
  await remapCaseStudies(report);
  console.log('   patched', report.caseStudies.patched.length, 'unmapped', report.caseStudies.unmapped.length);

  console.log('4/4 optional R2…');
  await uploadNewToR2(report);

  await ensureDir(path.join(ROOT, 'docs'));
  await fs.writeFile(path.join(ROOT, 'docs', 'extracted-media-sync.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(
    JSON.stringify(
      {
        dryRun: DRY_RUN,
        clientCopied: report.clientMedia.copied.length,
        blogDownloaded: report.blog.downloaded.length,
        blogPatched: report.blog.patched.length,
        casePatched: report.caseStudies.patched.length,
        caseUnmapped: report.caseStudies.unmapped.length,
        newFiles: report.newFiles.length,
        r2: report.r2 || null,
        out: 'docs/extracted-media-sync.json',
      },
      null,
      2,
    ),
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
