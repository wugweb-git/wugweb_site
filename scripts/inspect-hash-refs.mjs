#!/usr/bin/env node
/**
 * Inspect what references the empty hash-ID blog posts (sHwg, tiq3, sBGz)
 * so we can re-point them before deletion. REPORT-ONLY.
 */
import { createClient } from '@sanity/client';

const token = process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN;
if (!token) { console.error('Missing SANITY_TOKEN'); process.exit(1); }
const c = createClient({ projectId:'splvhmk1', dataset:'production', apiVersion:'2026-07-28', token, useCdn:false });

async function main() {
  // All published posts
  const posts = await c.fetch(`*[_type == "post"] { _id, title, "slug": slug.current, body }`);
  const published = posts.filter(d => !d._id.startsWith('drafts.'));
  console.log('Total posts (incl drafts):', posts.length);

  // Hash-ID published posts (empty bodies)
  const hashIds = published.filter(d => !d._id.startsWith('post-')).map(d => d._id);
  console.log('Hash-ID published posts:', hashIds.length);
  console.log(hashIds.join('\n'));

  // Find which fields reference each hash ID
  console.log('\n=== REFERENCES TO HASH POSTS ===');
  for (const id of hashIds) {
    const refs = await c.fetch(`*[references($id)] { _id, _type, title, slug }`, { id });
    for (const r of refs) {
      console.log(`${id}  <-  referenced by ${r._type} ${r._id} | "${r.title}"`);
    }
  }

  // Show what the keeper post-* docs look like (to plan re-point)
  console.log('\n=== KEEPERS (post-* with same slug as a hash) — sample ===');
  const keepers = published.filter(d => d._id.startsWith('post-'));
  for (const k of keepers.slice(0, 5)) {
    console.log(`${k._id} | slug=${k.slug} | bodyWords=${Array.isArray(k.body)?k.body.length:0}`);
  }
}

main().catch(e => { console.error('ERR', e.message); process.exit(1); });