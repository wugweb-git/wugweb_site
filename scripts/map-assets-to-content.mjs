#!/usr/bin/env node
/**
 * Map R2 / public assets → Sanity content (case studies, clients, pages, services, blog).
 *
 * Path convention (unchanged):
 *   relativePath: work/axis-bank/axis-thumb.mp4
 *   sitePath:     /assets/work/axis-bank/axis-thumb.mp4
 *   r2Key:        assets/work/axis-bank/axis-thumb.mp4
 *
 * Does NOT upload bytes to Sanity CDN (free-tier safe). Writes path fields only.
 *
 * Usage:
 *   DRY_RUN=1 node scripts/map-assets-to-content.mjs
 *   node scripts/map-assets-to-content.mjs
 */
import { createClient } from '@sanity/client';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DRY_RUN = process.env.DRY_RUN === '1';
const R2_PUBLIC_BASE =
  process.env.PUBLIC_R2_ASSETS_BASE ||
  'https://pub-39ad1d03baec440faf48303be95c3782.r2.dev';

const token = process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN;
if (!token) {
  console.error('Missing SANITY_TOKEN / SANITY_API_TOKEN');
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
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '');

function sitePathFromRel(rel) {
  return `/assets/${rel.replace(/^\/+/, '')}`;
}

function r2KeyFromRel(rel) {
  return `assets/${rel.replace(/^\/+/, '')}`;
}

function publicUrlFromRel(rel) {
  return `${R2_PUBLIC_BASE.replace(/\/$/, '')}/${r2KeyFromRel(rel)}`;
}

function mediaTypeFromExt(ext) {
  const e = ext.toLowerCase();
  if (['.mp4', '.webm', '.mov'].includes(e)) return 'Video';
  if (['.svg'].includes(e)) return 'SVG';
  if (['.mp3', '.wav'].includes(e)) return 'Audio';
  return 'Image';
}

function usageFromFileName(fileName) {
  const n = fileName.toLowerCase();
  if (n.includes('thumb')) return 'Thumbnail';
  if (n.includes('cover')) return 'Cover';
  if (n.includes('logo')) return 'Logo';
  if (n.includes('about')) return 'About';
  if (n.includes('hero') || n === 'home.mp4') return 'Hero';
  if (n.includes('challenge')) return 'Challenge';
  if (n.includes('solution')) return 'Solution';
  if (n.includes('conclusion')) return 'Conclusion';
  if (n.includes('client-logo')) return 'Logo';
  return 'Gallery';
}

/** Explicit client-name → logo file (homepage curated set). */
const CLIENT_LOGO_MAP = {
  'Aditya Birla Capital': 'logos/client-logo-te1y.png',
  Airtel: 'logos/client-logo-c6rj.png',
  'Axis Bank': 'logos/client-logo-d64b.png',
  Bankco: 'logos/client-logo-qhmv.png',
  Cartier: 'logos/client-logo-jrot.png',
  Gratifi: 'logos/client-logo-5nzb.png',
  'IndusInd Bank': 'logos/client-logo-k5hy.png',
  Inkompass: 'logos/client-logo-9fd5.png',
  Kia: 'logos/client-logo-5nkj.png',
  NTUC: 'logos/client-logo-grfk.png',
  Plufo: 'logos/client-logo-6djh.png',
  RideEV: 'logos/client-logo-1gbn.png',
  Valyu: 'logos/client-logo-jj6k.png',
  Adneto: 'logos/client-logo-enb1.png',
  'Airtel XSafe': 'logos/client-logo-c6rj.png',
  'Airtel Xstream': 'logos/client-logo-c6rj.png',
  Metcred: 'logos/client-logo-q4ee.png',
  Sadhan: 'logos/client-logo-u2rd.png',
  Visione: 'logos/client-logo-zqsr.png',
  Rideev: 'logos/client-logo-1gbn.png',
};

/** Work-folder aliases → client name fragments for matching. */
const WORK_FOLDER_ALIASES = {
  'aditya-birla-capital': ['adityabirlacapital', 'adityabirla'],
  adneto: ['adneto'],
  adtech: ['adtech'],
  'airtel-xsafe': ['airtelxsafe', 'xsafe', 'airtel'],
  'airtel-xstream': ['airtelxstream', 'xstream', 'airtel'],
  'axis-bank': ['axisbank', 'axis'],
  bankco: ['bankco'],
  cartier: ['cartier'],
  gratifi: ['gratifi', 'gratify'],
  'indusind-bank': ['indusind', 'indusninja', 'indus'],
  inkompass: ['inkompass'],
  'itc-citadel': ['itc', 'citadel'],
  kia: ['kia'],
  metcred: ['metcred'],
  ntuc: ['ntuc'],
  plufo: ['plufo'],
  rideev: ['rideev', 'ride'],
  sadhan: ['sadhan'],
  'sbs-transit': ['sbstransit', 'sbs'],
  valyu: ['valyu'],
  visione: ['visione'],
};

async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...(await walk(full)));
    else if (ent.isFile() && !ent.name.startsWith('.')) out.push(full);
  }
  return out;
}

function scoreSlugMatch(slug, folder) {
  const s = norm(slug);
  const f = norm(folder);
  if (!s || !f) return 0;
  if (s === f) return 100;
  if (s.startsWith(f) || f.startsWith(s)) return 80;
  // shared token prefix length
  let i = 0;
  while (i < s.length && i < f.length && s[i] === f[i]) i++;
  if (i >= 12) return 50 + Math.min(20, i / 4);
  return 0;
}

function pickBestCaseStudy(folder, caseStudies) {
  let best = null;
  let bestScore = 0;
  for (const cs of caseStudies) {
    const score = scoreSlugMatch(cs.slug, folder);
    if (score > bestScore) {
      bestScore = score;
      best = cs;
    }
  }
  return bestScore >= 50 ? best : null;
}

function findWorkFolderForCaseStudy(cs, workDirs) {
  const slugN = norm(cs.slug);
  const clientN = norm(cs.client);
  let best = null;
  let bestScore = 0;
  for (const dir of workDirs) {
    const dirN = norm(dir);
    let score = 0;
    // Strongest: slug contains full work folder name (airtel-xstream-play → airtel-xstream)
    if (dirN.length >= 5 && slugN.includes(dirN)) score = Math.max(score, 100);
    if (slugN === dirN) score = 110;
    // Client slug equals folder
    if (clientN && clientN === dirN) score = Math.max(score, 95);
    const aliases = WORK_FOLDER_ALIASES[dir] || [dirN];
    for (const a of aliases) {
      if (!a) continue;
      // Prefer longer aliases so "airtelxsafe" beats bare "airtel"
      const aliasScore = 40 + Math.min(50, a.length * 2);
      if (slugN.includes(a)) score = Math.max(score, aliasScore + 10);
      if (clientN && clientN.includes(a) && a.length >= 8) score = Math.max(score, aliasScore);
      if (clientN && clientN === a) score = Math.max(score, 90);
    }
    if (score > bestScore || (score === bestScore && score >= 70 && best && dirN.length > norm(best).length)) {
      bestScore = score;
      best = dir;
    }
  }
  return bestScore >= 70 ? best : null;
}

function findThumbInWork(workDir, filesByRel) {
  const prefix = `work/${workDir}/`;
  const candidates = [...filesByRel.keys()].filter((r) => r.startsWith(prefix) && /thumb/i.test(r));
  return candidates.sort()[0] || null;
}

function findCoverInFramer(folder, filesByRel) {
  const prefix = `framer/${folder}/`;
  const covers = [...filesByRel.keys()].filter((r) => r.startsWith(prefix) && /cover/i.test(path.basename(r)));
  return covers.sort()[0] || null;
}

function galleryInFramer(folder, filesByRel) {
  const prefix = `framer/${folder}/`;
  return [...filesByRel.keys()]
    .filter((r) => r.startsWith(prefix) && !/client-logo/i.test(path.basename(r)))
    .sort();
}

async function patchDoc(id, setFields) {
  if (DRY_RUN) return;
  await client.patch(id).set(setFields).commit();
}

async function createOrReplaceAsset(doc) {
  if (DRY_RUN) return doc._id;
  await client.createOrReplace(doc);
  return doc._id;
}

async function main() {
  const assetsRoot = path.join(ROOT, 'public', 'assets');
  const localFiles = await walk(assetsRoot);
  const filesByRel = new Map();
  for (const f of localFiles) {
    const rel = path.relative(assetsRoot, f).split(path.sep).join('/');
    filesByRel.set(rel, f);
  }

  let r2Keys = new Set();
  try {
    const manifest = JSON.parse(await fs.readFile(path.join(ROOT, 'docs', 'r2-asset-map.json'), 'utf8'));
    for (const o of manifest.objects || []) {
      if (o.r2Key?.startsWith('assets/')) r2Keys.add(o.r2Key.slice('assets/'.length));
      else if (o.r2Key) r2Keys.add(o.r2Key);
    }
  } catch {
    console.warn('No docs/r2-asset-map.json — marking r2Synced only when path exists locally');
    r2Keys = new Set(filesByRel.keys());
  }

  const [caseStudies, clients, posts, pages, services, existingAssets] = await Promise.all([
    client.fetch(`*[_type=="caseStudy"]{_id, title, client, "slug": slug.current}`),
    client.fetch(`*[_type=="client"]{_id, name, "slug": slug.current}`),
    client.fetch(`*[_type=="post"]{_id, title, "slug": slug.current, category}`),
    client.fetch(`*[_type=="singletonPage"]{_id, pageId, title}`),
    client.fetch(`*[_type=="service"]{_id, title, "slug": slug.current}`),
    client.fetch(`*[_type=="asset"]{_id, relativePath, name, usage, ownerId}`),
  ]);

  const assetByPath = new Map();
  for (const a of existingAssets) {
    if (a.relativePath) assetByPath.set(a.relativePath.replace(/^\/+/, ''), a);
  }

  const framerDirs = (await fs.readdir(path.join(assetsRoot, 'framer'), { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
  const workDirs = (await fs.readdir(path.join(assetsRoot, 'work'), { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const report = {
    generatedAt: new Date().toISOString(),
    dryRun: DRY_RUN,
    pathMapping: {
      relativePath: '<path>',
      sitePath: '/assets/<path>',
      r2Key: 'assets/<path>',
      publicUrl: `${R2_PUBLIC_BASE}/assets/<path>`,
    },
    caseStudies: [],
    clients: [],
    pages: [],
    services: [],
    blog: [],
    assetsPatched: 0,
    assetsCreated: 0,
    gaps: [],
  };

  // ── Case studies: framer cover + work thumb + gallery ──
  const claimedFramer = new Set();
  for (const cs of caseStudies) {
    const framerFolder =
      framerDirs.find((d) => norm(d) === norm(cs.slug)) ||
      (() => {
        let best = null;
        let bestScore = 0;
        for (const d of framerDirs) {
          const s = scoreSlugMatch(cs.slug, d);
          if (s > bestScore) {
            bestScore = s;
            best = d;
          }
        }
        return bestScore >= 70 ? best : null;
      })();

    const workFolder = findWorkFolderForCaseStudy(cs, workDirs);
    const thumbRel = workFolder ? findThumbInWork(workFolder, filesByRel) : null;
    const coverRel = framerFolder ? findCoverInFramer(framerFolder, filesByRel) : null;
    const galleryRels = framerFolder ? galleryInFramer(framerFolder, filesByRel) : [];

    if (framerFolder) claimedFramer.add(framerFolder);

    const setFields = {};
    if (thumbRel) setFields.thumbnailPath = sitePathFromRel(thumbRel);
    if (coverRel) setFields.coverPath = sitePathFromRel(coverRel);
    if (galleryRels.length) setFields.galleryPaths = galleryRels.map(sitePathFromRel);

    if (Object.keys(setFields).length) {
      await patchDoc(cs._id, setFields);
      // Clear stale thumb if work folder has no media but an old path remains
      if (!DRY_RUN && !thumbRel && workFolder) {
        await client.patch(cs._id).unset(['thumbnailPath']).commit().catch(() => {});
      }
      report.caseStudies.push({
        id: cs._id,
        slug: cs.slug,
        client: cs.client,
        ...setFields,
        framerFolder,
        workFolder,
      });
    } else {
      report.gaps.push({ type: 'caseStudy', slug: cs.slug, reason: 'no thumb/cover/gallery match' });
    }

    // Link / upsert asset docs for thumb + cover + gallery
    const linkTargets = [
      ...(thumbRel ? [{ rel: thumbRel, usage: 'Thumbnail' }] : []),
      ...(coverRel ? [{ rel: coverRel, usage: 'Cover' }] : []),
      ...galleryRels.filter((r) => r !== coverRel).map((rel) => ({ rel, usage: usageFromFileName(path.basename(rel)) })),
    ];

    for (const { rel, usage } of linkTargets) {
      const existing = assetByPath.get(rel);
      const ext = path.extname(rel);
      const base = {
        relativePath: rel,
        sitePath: sitePathFromRel(rel),
        r2Key: r2KeyFromRel(rel),
        publicUrl: publicUrlFromRel(rel),
        fileName: path.basename(rel),
        extension: ext.replace('.', ''),
        folder: path.dirname(rel),
        localExists: filesByRel.has(rel),
        r2Synced: r2Keys.has(rel),
        usage,
        status: 'Active',
        mediaType: mediaTypeFromExt(ext),
        linkedCaseStudy: { _type: 'reference', _ref: cs._id },
        assetGroup: rel.startsWith('framer/') ? 'Framer' : 'Work',
        assetType: 'Client Asset',
      };
      if (existing) {
        await patchDoc(existing._id, base);
        report.assetsPatched++;
      } else {
        const slug = rel.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
        const id = `asset-${slug}`.slice(0, 128);
        await createOrReplaceAsset({
          _id: id,
          _type: 'asset',
          name: path.basename(rel),
          slug: { _type: 'slug', current: slug.slice(0, 96) },
          displayName: `${cs.client || cs.slug} · ${usage}`,
          ...base,
        });
        assetByPath.set(rel, { _id: id, relativePath: rel });
        report.assetsCreated++;
      }
    }
  }

  // Unclaimed framer folders
  for (const d of framerDirs) {
    if (!claimedFramer.has(d)) {
      report.gaps.push({ type: 'framerFolder', folder: d, reason: 'no case study slug match ≥70' });
    }
  }

  // ── Clients: logos ──
  for (const clientDoc of clients) {
    let logoRel = CLIENT_LOGO_MAP[clientDoc.name] || null;
    if (!logoRel) {
      // try slug match against work/*/ client-logo in framer
      const slugN = norm(clientDoc.slug || clientDoc.name);
      for (const [rel] of filesByRel) {
        if (!rel.startsWith('framer/') || !/client-logo/i.test(rel)) continue;
        const folder = rel.split('/')[1] || '';
        if (scoreSlugMatch(clientDoc.slug || clientDoc.name, folder) >= 70) {
          logoRel = rel;
          break;
        }
      }
      // curated logos folder — only if name loosely matches known map keys
      if (!logoRel) {
        for (const [name, rel] of Object.entries(CLIENT_LOGO_MAP)) {
          if (norm(name) === slugN || slugN.includes(norm(name)) || norm(name).includes(slugN)) {
            logoRel = rel;
            break;
          }
        }
      }
    }

    if (!logoRel || !filesByRel.has(logoRel)) {
      // skip most clients without logos — only record if we expected one
      if (CLIENT_LOGO_MAP[clientDoc.name]) {
        report.gaps.push({ type: 'client', name: clientDoc.name, reason: 'mapped logo missing on disk' });
      }
      continue;
    }

    await patchDoc(clientDoc._id, { logoPath: sitePathFromRel(logoRel) });
    report.clients.push({ id: clientDoc._id, name: clientDoc.name, logoPath: sitePathFromRel(logoRel) });

    const existing = assetByPath.get(logoRel);
    const base = {
      relativePath: logoRel,
      sitePath: sitePathFromRel(logoRel),
      r2Key: r2KeyFromRel(logoRel),
      publicUrl: publicUrlFromRel(logoRel),
      fileName: path.basename(logoRel),
      extension: path.extname(logoRel).replace('.', ''),
      folder: path.dirname(logoRel),
      localExists: true,
      r2Synced: r2Keys.has(logoRel),
      usage: 'Logo',
      status: 'Active',
      mediaType: 'Image',
      assetGroup: 'Brand',
      assetType: 'Brand Asset',
      linkedClient: { _type: 'reference', _ref: clientDoc._id },
    };
    if (existing) {
      await patchDoc(existing._id, base);
      report.assetsPatched++;
    } else {
      const slug = `logo-${norm(clientDoc.slug || clientDoc.name)}`.slice(0, 96);
      await createOrReplaceAsset({
        _id: `asset-${slug}`,
        _type: 'asset',
        name: `${clientDoc.name} Logo`,
        slug: { _type: 'slug', current: slug },
        displayName: `${clientDoc.name} Logo`,
        ...base,
      });
      report.assetsCreated++;
    }
  }

  // ── Pages: home / about / services ──
  const pageMedia = {
    home: {
      hero: 'more/home/home.mp4',
      media: [
        'more/home/brand-strategy.mp4',
        'more/home/experience-design.mp4',
        'more/home/martech-genai.mp4',
        'more/home/web-app-development.mp4',
      ],
    },
    about: {
      hero: 'more/about/about-message.mp4',
      media: ['more/about/about_7.mp4', 'more/about/about_5.webp', 'more/about/about_message.mp4'],
    },
    services: {
      hero: null,
      media: [...filesByRel.keys()].filter((r) => r.startsWith('services/')).sort(),
    },
  };

  for (const page of pages) {
    const cfg = pageMedia[page.pageId];
    if (!cfg) continue;
    const setFields = {};
    if (cfg.hero && filesByRel.has(cfg.hero)) setFields.heroPath = sitePathFromRel(cfg.hero);
    const media = (cfg.media || []).filter((r) => filesByRel.has(r)).map(sitePathFromRel);
    if (media.length) setFields.mediaPaths = media;
    if (!Object.keys(setFields).length) {
      report.gaps.push({ type: 'page', pageId: page.pageId, reason: 'no media files found' });
      continue;
    }
    await patchDoc(page._id, setFields);
    report.pages.push({ id: page._id, pageId: page.pageId, ...setFields });

    const allRels = [...(cfg.hero ? [cfg.hero] : []), ...(cfg.media || [])].filter((r) => filesByRel.has(r));
    for (const rel of allRels) {
      const existing = assetByPath.get(rel);
      const base = {
        relativePath: rel,
        sitePath: sitePathFromRel(rel),
        r2Key: r2KeyFromRel(rel),
        publicUrl: publicUrlFromRel(rel),
        fileName: path.basename(rel),
        extension: path.extname(rel).replace('.', ''),
        folder: path.dirname(rel),
        localExists: true,
        r2Synced: r2Keys.has(rel),
        usage: rel === cfg.hero ? 'Hero' : usageFromFileName(path.basename(rel)),
        status: 'Active',
        mediaType: mediaTypeFromExt(path.extname(rel)),
        assetGroup: 'More',
        assetType: 'Page Asset',
        linkedPageId: page.pageId,
      };
      if (existing) {
        await patchDoc(existing._id, base);
        report.assetsPatched++;
      } else {
        const slug = rel.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase().slice(0, 96);
        await createOrReplaceAsset({
          _id: `asset-${slug}`,
          _type: 'asset',
          name: path.basename(rel),
          slug: { _type: 'slug', current: slug },
          displayName: `${page.pageId} · ${path.basename(rel)}`,
          ...base,
        });
        report.assetsCreated++;
      }
    }
  }

  // ── Services: map folder media by slug / title ──
  const serviceFolderMap = {
    brand: 'services/brand-strategy',
    'brand-strategy': 'services/brand-strategy',
    experience: 'services/Experience Design',
    'experience-design': 'services/Experience Design',
    engineering: 'services/Web & App Development',
    'web-app-development': 'services/Web & App Development',
    growth: 'services/martech-genai',
    'martech-genai': 'services/martech-genai',
    strategy: 'services/martech-genai',
    operations: 'services/martech-genai',
  };

  const seenServiceIds = new Set();
  for (const svc of services) {
    // Prefer 6-pillar docs; skip duplicates by taking first match per slug+folder
    const folder = serviceFolderMap[svc.slug];
    if (!folder) {
      report.gaps.push({ type: 'service', slug: svc.slug, reason: 'no folder map' });
      continue;
    }
    if (seenServiceIds.has(`${svc.slug}:${folder}`)) continue;
    seenServiceIds.add(`${svc.slug}:${folder}`);

    const gallery = [...filesByRel.keys()].filter((r) => r.startsWith(folder + '/') || r.startsWith(folder.replace(/ /g, '%20'))).sort();
    // also try without encoding
    const gallery2 = [...filesByRel.keys()].filter((r) => r.startsWith(folder + '/')).sort();
    const g = gallery2.length ? gallery2 : gallery;
    if (!g.length) {
      report.gaps.push({ type: 'service', slug: svc.slug, reason: `empty folder ${folder}` });
      continue;
    }
    const coverRel = g.find((r) => /\.mp4$/i.test(r)) || g[0];
    await patchDoc(svc._id, {
      coverPath: sitePathFromRel(coverRel),
      galleryPaths: g.map(sitePathFromRel),
    });
    report.services.push({
      id: svc._id,
      slug: svc.slug,
      coverPath: sitePathFromRel(coverRel),
      galleryCount: g.length,
    });
  }

  // ── Blog: no dedicated media tree yet — record gap ──
  const postsMissing = posts.filter(() => true);
  report.blog.push({
    note: 'No blog media folder in public/assets. coverPath left unset. Category accent fallbacks remain on frontend.',
    postsTotal: posts.length,
    postsWithCoverPath: 0,
  });
  if (postsMissing.length) {
    report.gaps.push({
      type: 'blog',
      reason: `all ${posts.length} posts lack source cover assets under public/assets`,
    });
  }

  // ── Patch remaining existing assets with R2 fields ──
  for (const a of existingAssets) {
    const rel = (a.relativePath || '').replace(/^\/+/, '');
    if (!rel) continue;
    await patchDoc(a._id, {
      sitePath: sitePathFromRel(rel),
      r2Key: r2KeyFromRel(rel),
      publicUrl: publicUrlFromRel(rel),
      localExists: filesByRel.has(rel),
      r2Synced: r2Keys.has(rel),
    });
    report.assetsPatched++;
  }

  await fs.mkdir(path.join(ROOT, 'docs'), { recursive: true });
  const outPath = path.join(ROOT, 'docs', 'content-asset-map.json');
  await fs.writeFile(outPath, JSON.stringify(report, null, 2) + '\n');

  console.log(
    JSON.stringify(
      {
        dryRun: DRY_RUN,
        caseStudiesMapped: report.caseStudies.length,
        clientsMapped: report.clients.length,
        pagesMapped: report.pages.length,
        servicesMapped: report.services.length,
        assetsPatched: report.assetsPatched,
        assetsCreated: report.assetsCreated,
        gaps: report.gaps.length,
        outPath,
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
