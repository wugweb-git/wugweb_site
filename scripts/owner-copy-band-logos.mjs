// Copies the 28 homepage-band logos to assets/logos/band/<slug>.png: the colour original (padding trimmed, 600px wide)
// where one exists, else assets/logos/grey/<slug>-300w|150w.png as is.
// Never overwrites, never deletes. Dry run unless APPLY=1 (needs CLOUDFLARE_API_TOKEN with R2 write).
import sharp from 'sharp';
import { BAND, PUB, UA, pickSource } from './lib-logo-band.mjs';
const APPLY = !!process.env.APPLY;
const T = process.env.CLOUDFLARE_API_TOKEN;
if (APPLY && !T) { console.error('APPLY=1 needs CLOUDFLARE_API_TOKEN'); process.exit(1); }
const H = { Authorization: 'Bearer ' + T };
let base;
if (APPLY) {
  const acc = (await (await fetch('https://api.cloudflare.com/client/v4/accounts', { headers: H })).json()).result?.[0]?.id;
  if (!acc) { console.error('token rejected by Cloudflare'); process.exit(1); }
  base = `https://api.cloudflare.com/client/v4/accounts/${acc}/r2/buckets/wugweb-assets/objects/`;
}
let ok = 0, skip = 0, bad = 0;
for (const b of BAND) {
  const src = await pickSource(b.slug);
  if (!src) { console.log('MISSING SOURCE', b.slug); bad++; continue; }
  let body = Buffer.from(await (await fetch(PUB + encodeURI(src.key), { headers: UA })).arrayBuffer());
  if (src.w === 'colour') body = await sharp(body).trim().resize({ width: 600, withoutEnlargement: true }).png({ compressionLevel: 9 }).toBuffer();
  if (!APPLY) { console.log(`would copy ${src.key} (${body.length}B) -> ${b.dest}`); ok++; continue; }
  const url = base + encodeURIComponent(b.dest);
  const ex = await fetch(url, { headers: H });
  if (ex.status === 200) {
    const cur = Buffer.from(await ex.arrayBuffer());
    if (Buffer.compare(cur, body) === 0) { console.log('same, skip', b.dest); skip++; } else { console.log('DIFFERENT EXISTS, refuse', b.dest); bad++; }
    continue;
  }
  const r = await fetch(url, { method: 'PUT', headers: { ...H, 'Content-Type': 'image/png' }, body });
  const g = Buffer.from(await (await fetch(url, { headers: H })).arrayBuffer());
  const same = Buffer.compare(g, body) === 0;
  console.log(r.status, same ? 'verified' : 'MISMATCH', src.w, b.dest);
  same ? ok++ : bad++;
}
console.log({ ok, skip, bad, mode: APPLY ? 'APPLY' : 'dry run' });
