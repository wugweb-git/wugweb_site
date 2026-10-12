// Deletes R2 objects listed in the CSV given by LIST (default backups/r2-delete-batch1.csv): byte-identical copies of files
// that live in an organised folder). Run by the OWNER. Dry run by default; APPLY=1 deletes for real.
// Before each delete it re-checks that the identical twin still exists with the same etag + size.
//   node scripts/owner-delete-r2-validated-duplicates.mjs         (dry run)
//   APPLY=1 node scripts/owner-delete-r2-validated-duplicates.mjs
import fs from 'node:fs';
const env = Object.fromEntries(fs.readFileSync('.env','utf8').split('\n').filter(l=>/^[A-Z_]+=/.test(l)).map(l=>{const i=l.indexOf('=');return [l.slice(0,i),l.slice(i+1).replace(/^["']|["']$/g,'')]}));
const H = { Authorization: 'Bearer ' + env.CLOUDFLARE_API_TOKEN };
const acc = (await (await fetch('https://api.cloudflare.com/client/v4/accounts',{headers:H})).json()).result[0].id;
const base = `https://api.cloudflare.com/client/v4/accounts/${acc}/r2/buckets/wugweb-assets/objects`;
const live = new Map(); let cur='';
do { const j = await (await fetch(`${base}?per_page=1000${cur?'&cursor='+encodeURIComponent(cur):''}`,{headers:H})).json();
  j.result.forEach(o=>live.set(o.key,{size:o.size,etag:(o.etag||'').replace(/"/g,'')})); cur=j.result_info?.cursor; if(!j.result.length)break; } while(cur);
const rows = fs.readFileSync(process.env.LIST || 'backups/r2-delete-batch1.csv','utf8').trim().split('\n').slice(1).map(l=>l.match(/"((?:[^"]|"")*)"/g).map(s=>s.slice(1,-1).replace(/""/g,'"')));
let del=0, skip=0, fail=0; const apply = process.env.APPLY==='1';
for (const [key,twin] of rows) {
  const a=live.get(key), b=live.get(twin);
  if (!a || !b || a.etag!==b.etag || a.size!==b.size) { skip++; continue; }
  if (!apply) { del++; continue; }
  const r = await fetch(`${base}/${encodeURIComponent(key)}`,{method:'DELETE',headers:H});
  r.ok ? del++ : fail++;
}
console.log(apply ? {deleted:del,skipped:skip,failed:fail} : {wouldDelete:del,skipped:skip,note:'dry run - set APPLY=1 to delete'});
