// Run by the OWNER, not Claude. After the Notion → Sanity blog sync (2026-10-13):
//   1. deletes the 9 posts that exist only in Sanity (removed from Notion)
//   2. deletes the R2 keys in backups/r2-delete-assets-blog-2026-10-13.csv (assets/blog/ duplicates,
//      owner-listed near-duplicates, cover copies for the 9 deleted posts); rows with a copy are
//      re-checked (same etag/MD5 + size) right before deleting, otherwise skipped
//   3. if no R2 row was skipped or failed, deletes the 70 matching Sanity asset records
// Backup of every post and record: backups/notion-blog-sync-deletes-2026-10-13.json
//   node scripts/owner-delete-notion-blog-sync.mjs           dry run
//   APPLY=1 node scripts/owner-delete-notion-blog-sync.mjs   delete for real
import fs from 'node:fs';
import { createClient } from '@sanity/client';
const env = Object.fromEntries(fs.readFileSync('.env','utf8').split('\n').filter(l=>/^[A-Z_]+=/.test(l)).map(l=>{const i=l.indexOf('=');return [l.slice(0,i),l.slice(i+1).replace(/^["']|["']$/g,'')]}));
const apply = process.env.APPLY === '1';
const sanity = createClient({ projectId:'splvhmk1', dataset:'production', apiVersion:'2026-01-01', token: env.SANITY_TOKEN || env.SANITY_API_TOKEN, useCdn:false });
const POSTS = ["1ldNh76NU0J0b4so5ExTkl", "post-agile-working-in-ux", "post-ai-in-ux-design", "post-balancing-user-needs-and-business-goals", "post-design-work-concentration", "post-html-sitemaps-for-seo-ux", "post-remote-design-work-pros-cons", "post-top-10-design-systems-ux-ui-2026", "post-ux-meets-cx-seamless-experiences"];
const RECORDS = ["asset-blog-agile-working-in-ux-png", "asset-blog-10-principles-for-typography-in-ui-design-webp", "asset-blog-6-strategies-that-got-my-side-project-its-first-1-000-users-png", "asset-blog-wp-2023-07-03-embracing-the-design-journey-remote-working-culture-the-challenges-png", "asset-blog-wp-2023-07-adobe-xd-pioneering-design-evolving-trends-and-the-future-amidst-figm-png", "asset-blog-wp-2023-07-10-how-to-strike-a-balance-between-user-needs-and-your-business-goals-1024x1024-png", "asset-blog-wp-2023-07-11-decoding-ux-jargon-a-simplified-guide-to-understanding-ux-terms-1024x1024-png", "asset-blog-ai-data-17-webp", "asset-blog-wp-2023-07-04-when-ux-meets-cx-creating-seamless-experiences-for-users-and-custo-png", "asset-blog-wp-2023-07-01-future-proofing-your-designs-the-top-10-design-systems-for-ux-ui-designers--f87bfa64ef", "asset-blog-wp-2023-07-05-agile-working-in-ux-unleashing-creativity-collaboration-and-flexib-png", "asset-blog-wp-2023-07-08-supercharge-your-designs-15-must-know-figma-updates-from-config-20-png", "asset-blog-wp-2023-07-06-unlocking-the-design-puzzle-decoding-the-concentration-of-work-in-png", "asset-blog-image-webp", "asset-blog-the-ai-powered-cx-singularity-png", "asset-blog-10-rules-of-thumb-in-ui-design-webp", "asset-blog-10-figma-tricks-i-wish-i-knew-earlier-png", "asset-blog-ux-meets-cx-seamless-experiences-png", "asset-blog-wp-2023-07-11-decoding-ux-jargon-a-simplified-guide-to-understanding-ux-terms-pn-png", "asset-blog-10-features-i-m-loving-in-framer-right-now-png", "asset-blog-10-ways-to-design-more-inclusive-products-webp", "asset-blog-top-10-design-systems-ux-ui-2026-jpg", "asset-blog-wp-2023-07-09-the-future-of-ux-design-enhancing-user-experiences-with-ai-png", "asset-blog-remote-design-work-pros-cons-png", "asset-blog-10-confessions-of-a-product-designer-webp", "asset-blog-wp-2023-07-07-when-and-how-to-use-html-sitemaps-for-seo-and-ux-unleashing-the-po-png", "asset-blog-10-key-takeaways-from-google-s-material-design-guidelines-webp", "asset-blog-ai-in-ux-design-png", "asset-blog-balancing-user-needs-and-business-goals-png", "asset-blog-wp-2023-07-frame-27-1024x512-png", "asset-blog-wp-2023-07-frame-28-1024x512-png", "asset-blog-wp-2023-07-frame-13-1024x519-png", "asset-blog-wp-2023-07-frame-19-1024x512-png", "asset-blog-wp-2023-07-frame-29-1024x512-png", "asset-blog-wp-2023-07-awsamplifydesign-1024x512-png", "asset-blog-wp-2023-07-frame-7-1024x512-png", "asset-blog-wp-2023-07-layer-36-1024x512-png", "asset-blog-wp-2023-07-02-2-1-1024x512-png", "asset-blog-wp-2023-07-frame-16-1024x512-png", "asset-blog-wp-2023-07-frame-24-1024x512-png", "asset-blog-wp-2023-07-frame-32-1024x512-png", "asset-blog-wp-2023-07-googlematerial-1-1024x512-png", "asset-blog-wp-2023-07-02-3-1024x512-png", "asset-blog-wp-2023-07-antdesign-1024x512-png", "asset-blog-wp-2023-07-frame-25-1024x512-png", "asset-blog-wp-2023-07-frame-33-1024x512-png", "asset-blog-wp-2023-07-frame-8-1024x512-png", "asset-blog-wp-2023-07-ibmdesign-1-1024x512-png", "asset-blog-wp-2023-07-microsoftfluentdesign-1024x512-png", "asset-blog-wp-2023-07-frame-22-1024x512-png", "asset-blog-wp-2023-07-frame-23-1024x512-png", "asset-blog-wp-2023-07-salesforcedesign2-1024x512-png", "asset-blog-wp-2023-07-02-4-1024x512-png", "asset-blog-wp-2023-07-atlassiadesign-1024x512-png", "asset-blog-wp-2023-07-audidesign-1024x512-png", "asset-blog-wp-2023-07-frame-17-1024x512-png", "asset-blog-wp-2023-07-group-15-1024x512-png", "asset-blog-wp-2023-07-frame-30-1024x512-png", "asset-blog-wp-2023-07-frame-34-1024x511-png", "asset-blog-wp-2023-07-frame-35-1024x512-png", "asset-blog-wp-2023-07-frame-36-1024x511-png", "asset-blog-wp-2023-07-frame-9-1024x512-png", "asset-blog-wp-2023-07-02-5-1-1024x512-png", "asset-blog-wp-2023-07-mailchimpdesign-1-1024x529-png", "asset-blog-wp-2023-07-shopifydesign-1024x512-png", "asset-blog-is-augmented-reality-the-future-of-ux-png", "asset-blog-10-essential-skills-for-the-modern-ui-ux-designer-webp", "asset-blog-10-hacks-for-illustrating-and-drawing-in-figma-png", "asset-blog-design-work-concentration-png", "asset-blog-html-sitemaps-for-seo-ux-png"];

const found = await sanity.fetch('count(*[_id in $ids])', { ids: [...POSTS, ...POSTS.map(i => 'drafts.' + i)] });
console.log(apply ? '' : '[dry run] ', 'posts to delete:', found);
if (apply) { const tx = sanity.transaction(); POSTS.forEach(id => { tx.delete(id); tx.delete('drafts.' + id); }); await tx.commit(); console.log('deleted', POSTS.length, 'posts'); }

const H = { Authorization: 'Bearer ' + env.CLOUDFLARE_API_TOKEN };
const acc = (await (await fetch('https://api.cloudflare.com/client/v4/accounts',{headers:H})).json()).result[0].id;
const base = `https://api.cloudflare.com/client/v4/accounts/${acc}/r2/buckets/wugweb-assets/objects`;
const live = new Map(); let cur = '';
do { const j = await (await fetch(`${base}?per_page=1000${cur?'&cursor='+encodeURIComponent(cur):''}`,{headers:H})).json();
  j.result.forEach(o=>live.set(o.key,{size:o.size,etag:(o.etag||'').replace(/"/g,'')})); cur = j.result_info?.is_truncated ? j.result_info.cursor : ''; } while (cur);
const rows = fs.readFileSync('backups/r2-delete-assets-blog-2026-10-13.csv','utf8').trim().split('\n').slice(1).map(l=>l.match(/"((?:[^"]|"")*)"/g).map(s=>s.slice(1,-1).replace(/""/g,'"')));
let del=0, gone=0, skip=0, fail=0;
for (const [key, twin] of rows) {
  const a = live.get(key), b = twin && live.get(twin);
  if (!a) { gone++; continue; }
  if (twin && (!b || a.etag !== b.etag || a.size !== b.size)) { skip++; console.log('skip (copy changed or missing)', key); continue; }
  if (!apply) { del++; continue; }
  const r = await fetch(`${base}/${encodeURIComponent(key)}`, { method:'DELETE', headers:H });
  r.ok ? del++ : (fail++, console.log('FAILED', key, r.status));
}
console.log(apply ? { deleted:del, alreadyGone:gone, skipped:skip, failed:fail } : { wouldDelete:del, alreadyGone:gone, skipped:skip });
if (apply && !skip && !fail) {
  const tx = sanity.transaction(); RECORDS.forEach(id => { tx.delete(id); tx.delete('drafts.' + id); }); await tx.commit();
  console.log('deleted', RECORDS.length, 'Sanity asset records');
} else if (apply) console.log('Sanity asset records NOT deleted (R2 rows skipped/failed); re-check first.');
else console.log('would delete', RECORDS.length, 'Sanity asset records');
