// Run by the OWNER, not Claude. Deletes the 22 assets/blog/<slug>/body-NN.* originals listed in
// backups/r2-delete-assets-blog-body22-2026-10-13.csv after re-checking that each renamed copy under
// blog/<slug>/ still exists with the same etag (MD5) + size; then, if nothing was skipped or failed,
// deletes their 22 Sanity asset records (backup: backups/body22-asset-records-2026-10-13.json).
//   node scripts/owner-delete-blog-body22.mjs           dry run
//   APPLY=1 node scripts/owner-delete-blog-body22.mjs   delete for real
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
const rows = fs.readFileSync('backups/r2-delete-assets-blog-body22-2026-10-13.csv','utf8').trim().split('\n').slice(1).map(l=>l.match(/"((?:[^"]|"")*)"/g).map(s=>s.slice(1,-1).replace(/""/g,'"')));
let del=0, gone=0, skip=0, fail=0;
for (const [key, twin] of rows) {
  const a = live.get(key), b = live.get(twin);
  if (!a) { gone++; continue; }
  if (!b || a.etag !== b.etag || a.size !== b.size) { skip++; console.log('skip', key); continue; }
  if (!apply) { del++; continue; }
  const r = await fetch(`${base}/${encodeURIComponent(key)}`, { method:'DELETE', headers:H });
  r.ok ? del++ : (fail++, console.log('FAILED', key, r.status));
}
console.log(apply ? { deleted:del, alreadyGone:gone, skipped:skip, failed:fail } : { wouldDelete:del, alreadyGone:gone, skipped:skip });
const ids = ["asset-unsorted-mapped-assets-vsb-screenshot-2023-03-16-at-1-51-16-pm-png", "asset-unsorted-mapped-assets-vsb-screenshot-2023-03-16-at-1-57-51-pm-png", "asset-unsorted-mapped-assets-vsb-screenshot-2023-03-16-at-1-54-33-pm-png", "asset-unsorted-mapped-assets-vsb-screenshot-2023-03-16-at-1-58-29-pm-png", "asset-unsorted-mapped-assets-data-2026-g-sxkyhw4aad4ls-jpeg", "asset-unsorted-mapped-assets-vsb-developers-png", "asset-unsorted-mapped-assets-vsb-html-png", "asset-unsorted-mapped-assets-vsb-technologystack-png", "asset-unsorted-assets-used-previously-original-cd4542dbd27451aaad52fdda3f3563cd-webp", "asset-unsorted-mapped-assets-vsb-01-png", "asset-unsorted-mapped-assets-vsb-screenshot-2023-03-16-at-1-55-02-pm-png", "asset-unsorted-mapped-assets-vsb-components-png", "asset-unsorted-assets-used-previously-original-e7ab39489fd54ac227a03ccf98064559-webp", "asset-unsorted-assets-used-previously-original-f7b7184cf9fee1ea5140e1e6f4baaa61-webp", "asset-unsorted-assets-used-previously-ui-ux-design-png", "asset-unsorted-assets-used-previously-original-c48decaa4c9f70367a2fe31904d9df63-webp", "asset-unsorted-mapped-assets-data-2026-g-rnjzbxsaa2bog-jpeg", "asset-unsorted-mapped-assets-vsb-screenshot-2023-03-16-at-2-00-45-pm-png", "asset-unsorted-mapped-assets-vsb-screenshot-2023-03-16-at-2-02-37-pm-png", "asset-unsorted-mapped-assets-vsb-screenshot-2023-03-16-at-1-59-11-pm-png", "asset-unsorted-mapped-assets-vsb-theme-for-espresso-png", "asset-unsorted-mapped-assets-vsb-screenshot-2023-03-16-at-1-57-11-pm-png"];
if (apply && !skip && !fail) {
  const c = createClient({ projectId:'splvhmk1', dataset:'production', apiVersion:'2026-01-01', token: env.SANITY_TOKEN || env.SANITY_API_TOKEN, useCdn:false });
  const tx = c.transaction(); ids.forEach(id => { tx.delete(id); tx.delete('drafts.' + id); }); await tx.commit();
  console.log('deleted', ids.length, 'Sanity asset records');
} else if (apply) console.log('Sanity asset records NOT deleted (rows skipped/failed); re-check first.');
else console.log('would delete', ids.length, 'Sanity asset records');
