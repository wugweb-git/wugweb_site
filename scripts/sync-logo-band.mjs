// Points the homepage "Trusted by" band at the 28 logos already in R2 (colour original or grey copy, see pickSource)
// and maps each to its Sanity client. Nothing is copied or uploaded.
//  - existing client: sets bandLogoPath, bandOrder, showInLogoBand=true (logoPath is NOT touched: work pages still use it)
//  - missing client: creates it (name + slug + the three band fields)
//  - every other client currently flagged showInLogoBand: set to false
//  - asset record for each band key (usage Logo), so the R2 index stays complete
// Dry run unless APPLY=1. Refuses to apply if any band key is not live in R2. Backup: backups/sanity-pre-logo-band.json
import fs from 'fs';
import { BAND, PUB, UA, pickSource } from './lib-logo-band.mjs';
const T = process.env.SANITY_API_TOKEN || process.env.SANITY_TOKEN;
if (!T) { console.error('no SANITY token in env'); process.exit(1); }
const H = { Authorization: 'Bearer ' + T };
const API = 'https://splvhmk1.api.sanity.io/v2024-01-01/data/';
const q = async (g) => (await (await fetch(API + 'query/production?query=' + encodeURIComponent(g), { headers: H })).json()).result;
const clients = await q('*[_type=="client" && !(_id in path("drafts.**"))]{_id,name,logoPath,showInLogoBand,bandLogoPath,bandOrder}');
const byName = new Map(clients.map((c) => [c.name.toLowerCase(), c]));
for (const b of BAND) { const src = await pickSource(b.slug); if (!src) { console.error('NO SOURCE IN R2:', b.slug); process.exit(1); } b.dest = src.key; }
const assets = new Set(await q(`*[_type=="asset" && r2Key in ${JSON.stringify(BAND.map((b) => b.dest))}].r2Key`));
const muts = [], log = [];
for (const b of BAND) {
  const c = byName.get(b.name.toLowerCase());
  const path = '/' + b.dest;
  const fileSlug = b.dest.split('/').pop().replace(/\.png$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  if (c) { muts.push({ patch: { id: c._id, set: { showInLogoBand: true, bandLogoPath: path, bandOrder: b.order } } }); log.push(`patch  ${b.name}`); }
  else {
    muts.push({ create: { _id: 'client-' + b.slug, _type: 'client', name: b.name, slug: { _type: 'slug', current: b.slug }, showInLogoBand: true, bandLogoPath: path, bandOrder: b.order } });
    log.push(`CREATE ${b.name}`);
  }
  if (!assets.has(b.dest)) {
    muts.push({ createIfNotExists: { _id: `asset-logos-${fileSlug}-png`, _type: 'asset', name: `${b.name} Logo`, displayName: `${b.name} Logo`, fileName: b.dest.split('/').pop(), extension: 'png', folder: b.dest.replace(/^assets\//, '').split('/').slice(0, -1).join('/'), mediaType: 'Image', mimeType: 'image/png', assetGroup: 'Brand', assetType: 'Brand Asset', usage: 'Logo', status: 'Active', alt: `${b.name} logo`, r2Key: b.dest, relativePath: b.dest.replace(/^assets\//, ''), sitePath: path, publicUrl: PUB + encodeURI(b.dest), r2Synced: true, slug: { _type: 'slug', current: `logos-${fileSlug}-png` } } });
  }
}
const inBand = new Set(BAND.map((b) => b.name.toLowerCase()));
const unflag = clients.filter((c) => c.showInLogoBand && !inBand.has(c.name.toLowerCase()));
unflag.forEach((c) => { muts.push({ patch: { id: c._id, set: { showInLogoBand: false } } }); log.push(`unflag ${c.name}`); });
console.log(log.join('\n')); console.log({ mutations: muts.length, create: log.filter((l) => l.startsWith('CREATE')).length, unflag: unflag.length });
fs.writeFileSync('backups/sanity-pre-logo-band.json', JSON.stringify(clients.filter((c) => c.showInLogoBand || inBand.has(c.name.toLowerCase())), null, 1));
if (!process.env.APPLY) { console.log('dry run — APPLY=1 to write'); process.exit(0); }
for (const b of BAND) { const r = await fetch(PUB + encodeURI(b.dest), { method: 'HEAD', headers: UA }); if (r.status !== 200) { console.error('NOT IN R2 YET:', b.dest, r.status); process.exit(1); } }
const r = await fetch(API + 'mutate/production', { method: 'POST', headers: { ...H, 'Content-Type': 'application/json' }, body: JSON.stringify({ mutations: muts }) });
console.log('mutate', r.status, (await r.text()).slice(0, 200));
