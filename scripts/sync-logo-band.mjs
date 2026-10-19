// Points the homepage "Trusted by" band at the 28 logos in assets/logos/band/ and maps each to its Sanity client.
//  - existing client: sets bandLogoPath, bandOrder, showInLogoBand=true (logoPath is NOT touched: work pages still use it)
//  - missing client: creates it (name + slug + the three band fields)
//  - every other client currently flagged showInLogoBand: set to false
//  - asset record for each band key (usage Logo), so the R2 index stays complete
// Dry run unless APPLY=1. Refuses to apply if any band key is not live in R2. Backup: backups/sanity-pre-logo-band.json
import fs from 'fs';
import { BAND, PUB, UA } from './lib-logo-band.mjs';
const T = process.env.SANITY_API_TOKEN || process.env.SANITY_TOKEN;
if (!T) { console.error('no SANITY token in env'); process.exit(1); }
const H = { Authorization: 'Bearer ' + T };
const API = 'https://splvhmk1.api.sanity.io/v2024-01-01/data/';
const q = async (g) => (await (await fetch(API + 'query/production?query=' + encodeURIComponent(g), { headers: H })).json()).result;
const clients = await q('*[_type=="client" && !(_id in path("drafts.**"))]{_id,name,logoPath,showInLogoBand,bandLogoPath,bandOrder}');
const byName = new Map(clients.map((c) => [c.name.toLowerCase(), c]));
const assets = new Set(await q('*[_type=="asset" && r2Key match "assets/logos/band/*"].r2Key'));
const muts = [], log = [];
for (const b of BAND) {
  const c = byName.get(b.name.toLowerCase());
  const path = '/' + b.dest;
  if (c) { muts.push({ patch: { id: c._id, set: { showInLogoBand: true, bandLogoPath: path, bandOrder: b.order } } }); log.push(`patch  ${b.name}`); }
  else {
    muts.push({ create: { _id: 'client-' + b.slug, _type: 'client', name: b.name, slug: { _type: 'slug', current: b.slug }, showInLogoBand: true, bandLogoPath: path, bandOrder: b.order } });
    log.push(`CREATE ${b.name}`);
  }
  if (!assets.has(b.dest)) {
    muts.push({ createIfNotExists: { _id: `asset-logos-band-${b.slug}-png`, _type: 'asset', name: `${b.name} Logo (band)`, displayName: `${b.name} Logo (band)`, fileName: `${b.slug}.png`, extension: 'png', folder: 'logos/band', mediaType: 'Image', mimeType: 'image/png', assetGroup: 'Brand', assetType: 'Brand Asset', usage: 'Logo', status: 'Active', alt: `${b.name} logo`, r2Key: b.dest, relativePath: b.dest.replace(/^assets\//, ''), sitePath: path, publicUrl: PUB + b.dest, r2Synced: true, slug: { _type: 'slug', current: `logos-band-${b.slug}-png` } } });
  }
}
const inBand = new Set(BAND.map((b) => b.name.toLowerCase()));
const unflag = clients.filter((c) => c.showInLogoBand && !inBand.has(c.name.toLowerCase()));
unflag.forEach((c) => { muts.push({ patch: { id: c._id, set: { showInLogoBand: false } } }); log.push(`unflag ${c.name}`); });
console.log(log.join('\n')); console.log({ mutations: muts.length, create: log.filter((l) => l.startsWith('CREATE')).length, unflag: unflag.length });
fs.writeFileSync('backups/sanity-pre-logo-band.json', JSON.stringify(clients.filter((c) => c.showInLogoBand || inBand.has(c.name.toLowerCase())), null, 1));
if (!process.env.APPLY) { console.log('dry run — APPLY=1 to write'); process.exit(0); }
for (const b of BAND) { const r = await fetch(PUB + b.dest, { method: 'HEAD', headers: UA }); if (r.status !== 200) { console.error('NOT IN R2 YET:', b.dest, r.status); process.exit(1); } }
const r = await fetch(API + 'mutate/production', { method: 'POST', headers: { ...H, 'Content-Type': 'application/json' }, body: JSON.stringify({ mutations: muts }) });
console.log('mutate', r.status, (await r.text()).slice(0, 200));
