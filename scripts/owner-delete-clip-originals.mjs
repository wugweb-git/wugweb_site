// Run by the OWNER. Deletes the 20 original spare clips that were copied into service slot files
// on 2026-10-14 (list: backups/r2-delete-clip-originals-2026-10-14.csv). Before each delete it
// re-checks that the slot copy still exists with the same etag (MD5) + size; otherwise it skips.
// If nothing was skipped or failed, it then deletes their 20 Sanity asset records
// (backup: backups/unsorted-clip-originals-records-2026-10-14.json).
//   node scripts/owner-delete-clip-originals.mjs           dry run
//   APPLY=1 node scripts/owner-delete-clip-originals.mjs   delete for real
import fs from 'node:fs';
import { createClient } from '@sanity/client';
const env = Object.fromEntries(fs.readFileSync('.env','utf8').split('\n').filter(l=>/^[A-Z_]+=/.test(l)).map(l=>{const i=l.indexOf('=');return [l.slice(0,i),l.slice(i+1).replace(/^["']|["']$/g,'')]}));
const apply = process.env.APPLY === '1';
const H = { Authorization: 'Bearer ' + env.CLOUDFLARE_API_TOKEN };
const acc = (await (await fetch('https://api.cloudflare.com/client/v4/accounts',{headers:H})).json()).result[0].id;
const base = `https://api.cloudflare.com/client/v4/accounts/${acc}/r2/buckets/wugweb-assets/objects`;
const live = new Map(); let cur = '';
do { const j = await (await fetch(`${base}?per_page=1000${cur?'&cursor='+encodeURIComponent(cur):''}`,{headers:H})).json();
  j.result.forEach(o=>live.set(o.key,{size:o.size,etag:(o.etag||'').replace(/"/g,'')})); cur = j.result_info?.is_truncated ? j.result_info.cursor : ''; } while (cur);
const rows = fs.readFileSync('backups/r2-delete-clip-originals-2026-10-14.csv','utf8').trim().split('\n').slice(1).map(l=>l.match(/"((?:[^"]|"")*)"/g).map(s=>s.slice(1,-1).replace(/""/g,'"')));
let del=0, gone=0, skip=0, fail=0;
for (const [key, twin] of rows) {
  const a = live.get(key), b = live.get(twin);
  if (!a) { gone++; continue; }
  if (!b || a.etag !== b.etag || a.size !== b.size) { skip++; console.log('skip (slot copy differs or missing)', key); continue; }
  if (!apply) { del++; continue; }
  const r = await fetch(`${base}/${encodeURIComponent(key)}`, { method:'DELETE', headers:H });
  r.ok ? del++ : (fail++, console.log('FAILED', key, r.status));
}
console.log(apply ? { deleted:del, alreadyGone:gone, skipped:skip, failed:fail } : { wouldDelete:del, alreadyGone:gone, skipped:skip });
const ids = ["asset-more-service-service-message-mp4", "asset-site-home-home-mp4", "asset-unsorted-assets-used-previously-bb-51934a9c-7df1-4f3c-9495-1bf1b09fa5fb-1-mp4", "asset-unsorted-assets-used-previously-import-61062f609bbca5-75871787-fppreview-mp4", "asset-unsorted-assets-used-previously-import-61b5850a7ec0c7-76911762-fppreview-mp4", "asset-unsorted-assets-used-previously-scrolling-654fd46a-mp4", "asset-unsorted-mapped-assets-data-2026-16392053-uhd-2560-1440-24fps-mp4", "asset-unsorted-mapped-assets-data-2026-3q0z9n9vbgdaadwc-mp4", "asset-unsorted-mapped-assets-data-2026-cpkrrkuw0jpac4klxdzwxi0su-mp4", "asset-unsorted-mapped-assets-data-2026-crzwamfbz4vrdepw-mp4", "asset-unsorted-mapped-assets-data-2026-dkxzafhymzhfnt9-mp4", "asset-unsorted-mapped-assets-data-2026-fff-mp4", "asset-unsorted-mapped-assets-data-2026-ggt3onry2bwahsvu-mp4", "asset-unsorted-mapped-assets-data-2026-mypoues2kopvxzs6-mp4", "asset-unsorted-mapped-assets-data-2026-ojikhf70qqrgq4lo-mp4", "asset-unsorted-mapped-assets-data-2026-vity-9ohbd-a1m55-mp4", "asset-unsorted-mapped-assets-data-2026-vu3hgw9v5vlipyoy-mp4", "asset-unsorted-mapped-assets-data-2026-ygdnoe8g15ofa26p-mp4", "asset-unsorted-mapped-assets-data-2026-ykzlk1opkokkrkxm-mp4", "asset-unsorted-mapped-assets-data-2026-zlaifj99sdgz1btc-mp4"];
if (apply && !skip && !fail) {
  const c = createClient({ projectId:'splvhmk1', dataset:'production', apiVersion:'2026-01-01', token: env.SANITY_TOKEN || env.SANITY_API_TOKEN, useCdn:false });
  const tx = c.transaction(); ids.forEach(id => { tx.delete(id); tx.delete('drafts.' + id); }); await tx.commit();
  console.log('deleted', ids.length, 'Sanity asset records');
} else if (apply) console.log('Sanity asset records NOT deleted (rows skipped/failed); re-check first.');
else console.log('would delete', ids.length, 'Sanity asset records');
