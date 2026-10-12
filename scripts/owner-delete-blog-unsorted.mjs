// Run by the OWNER, not Claude. Deletes the R2 keys in backups/r2-delete-blog-unsorted-2026-10-13.csv
// (unsorted/ + unsorted/misc/ sources already copied into blog/<slug>/, banner duplicates, the crop
// variants and 18.png you asked to drop, and the 0063 og.png), then their 51 Sanity asset records
// (backup: backups/blog-unsorted-asset-records-2026-10-13.json). Before each delete that has a copy,
// it re-lists the bucket and checks the copy still exists with the same etag (MD5) + size; otherwise skips.
//   node scripts/owner-delete-blog-unsorted.mjs           dry run
//   APPLY=1 node scripts/owner-delete-blog-unsorted.mjs   delete for real
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
const rows = fs.readFileSync('backups/r2-delete-blog-unsorted-2026-10-13.csv','utf8').trim().split('\n').slice(1).map(l=>l.match(/"((?:[^"]|"")*)"/g).map(s=>s.slice(1,-1).replace(/""/g,'"')));
let del=0, skip=0, fail=0;
for (const [key, twin, reason] of rows) {
  const a = live.get(key), b = twin && live.get(twin);
  if (!a || (twin && (!b || a.etag !== b.etag || a.size !== b.size))) { skip++; console.log('skip', key); continue; }
  if (!apply) { del++; continue; }
  const r = await fetch(`${base}/${encodeURIComponent(key)}`, { method:'DELETE', headers:H });
  r.ok ? (del++, console.log('deleted', key)) : (fail++, console.log('FAILED', key, r.status));
}
console.log(apply ? { deleted:del, skipped:skip, failed:fail } : { wouldDelete:del, skipped:skip, note:'dry run - set APPLY=1 to delete' });
const ids = ["asset-unsorted-mapped-assets-vsb-brand-design-2-png", "asset-unsorted-mapped-assets-vsb-design-proicess-1-png", "asset-unsorted-mapped-assets-vsb-vbb-17-png", "asset-unsorted-mapped-assets-vsb-vbb-7-png", "asset-unsorted-mapped-assets-vsb-vbb-16-png", "asset-unsorted-mapped-assets-vsb-main-banner-png", "asset-unsorted-mapped-assets-vsb-banner-5-png", "asset-unsorted-mapped-assets-vsb-banner-7-png", "asset-unsorted-mapped-assets-vsb-group-2668-png", "asset-unsorted-mapped-assets-vsb-ux-design-2-png", "asset-unsorted-mapped-assets-vsb-vbb-14-png", "asset-unsorted-mapped-assets-vsb-vbb-18-png", "asset-unsorted-mapped-assets-vsb-vbb-19-png", "asset-unsorted-mapped-assets-vsb-vbb-4-png", "asset-unsorted-mapped-assets-vsb-vbb-13-png", "asset-unsorted-mapped-assets-vsb-banner-1-png", "asset-unsorted-mapped-assets-vsb-vbb-21-png", "asset-unsorted-mapped-assets-vsb-vbb-15-png", "asset-unsorted-mapped-assets-vsb-vbb-5-png", "asset-unsorted-mapped-assets-vsb-vbb-8-png", "asset-unsorted-assets-used-previously-blog2-png", "asset-unsorted-assets-used-previously-f0a2f4aa-4a75-40bc-a723-271ac94942af-png", "asset-unsorted-mapped-assets-vsb-banner-png", "asset-unsorted-mapped-assets-vsb-brand-design-1-png", "asset-unsorted-mapped-assets-vsb-banner-8-png", "asset-unsorted-mapped-assets-vsb-design-resources-1-png", "asset-unsorted-mapped-assets-vsb-banner-6-png", "asset-unsorted-mapped-assets-vsb-brand-design-png", "asset-unsorted-mapped-assets-vsb-design-proicess-png", "asset-unsorted-mapped-assets-vsb-banner-35-png", "asset-unsorted-mapped-assets-vsb-design-proicess-2-png", "asset-unsorted-mapped-assets-vsb-design-resources-2-png", "asset-unsorted-mapped-assets-vsb-banner-4-png", "asset-unsorted-mapped-assets-vsb-vbb-11-png", "asset-unsorted-mapped-assets-vsb-vbb-2-png", "asset-unsorted-mapped-assets-vsb-vbb-3-png", "asset-unsorted-mapped-assets-vsb-vbb-6-png", "asset-unsorted-mapped-assets-vsb-vbb-10-png", "asset-unsorted-mapped-assets-vsb-design-resources-png", "asset-unsorted-mapped-assets-vsb-vbb-1-png", "asset-unsorted-mapped-assets-vsb-ux-design-png", "asset-unsorted-mapped-assets-vsb-digital-design-png", "asset-unsorted-mapped-assets-vsb-vbb-20-png", "asset-unsorted-mapped-assets-vsb-digital-design-2-png", "asset-unsorted-mapped-assets-vsb-digital-design-1-png", "asset-unsorted-mapped-assets-vsb-lifestyle-2-png", "asset-unsorted-mapped-assets-vsb-lifestyle-png", "asset-unsorted-mapped-assets-vsb-lifestyle-1-png", "asset-unsorted-mapped-assets-vsb-ux-design-1-png", "asset-unsorted-mapped-assets-vsb-vbb-12-png", "asset-unsorted-mapped-assets-vsb-vbb-9-png"];
if (apply && !fail && !skip) {
  const c = createClient({ projectId:'splvhmk1', dataset:'production', apiVersion:'2026-01-01', token: env.SANITY_TOKEN || env.SANITY_API_TOKEN, useCdn:false });
  const tx = c.transaction(); ids.forEach(id => { tx.delete(id); tx.delete('drafts.' + id); });
  await tx.commit(); console.log('deleted', ids.length, 'Sanity asset records');
} else if (apply) console.log('Sanity records NOT deleted because some R2 rows were skipped/failed; re-check first.');
else console.log('would delete', ids.length, 'Sanity asset records');
