#!/usr/bin/env node
/**
 * Re-import Notion Asset Sheet into Sanity asset documents.
 * Batched to avoid timeouts.
 * SANITY_TOKEN=sk... node scripts/import-assets-batched.mjs
 */
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const token = process.env.SANITY_TOKEN;
if (!token) { console.error('Missing SANITY_TOKEN'); process.exit(1); }

const client = createClient({ projectId:'splvhmk1', dataset:'production', apiVersion:'2026-07-28', token, useCdn:false });

const DIR = path.resolve(import.meta.dirname, '..');
const assets = JSON.parse(fs.readFileSync(path.join(DIR, 'notion-data/asset-sheet.json'), 'utf8'));
const active = assets.filter(a => a['Status'] !== 'Reserved' && a['Relative Path'] && a['Relative Path'] !== '—');

function normalize(p) { return p.toLowerCase().replace(/[_-]/g, '').replace(/.*\//, '/'); }

function findLocal(notionPath) {
  const n = normalize(notionPath);
  const base = path.join(DIR, 'public/assets');
  function walk(d) {
    const entries = fs.readdirSync(d, {withFileTypes:true});
    for(const e of entries) {
      const p = d+'/'+e.name;
      if(e.isDirectory()) { const r = walk(p); if(r) return r; }
      else if(normalize(p.replace(base+'/', '')) === n) return p.replace(base+'/', '');
    }
    return null;
  }
  return walk(base);
}

// Seed only — creates missing assets, never overwrites existing ones. Notion
// is a seed source (CLAUDE.md); this was a createOrReplace, which reset every
// asset to the old sheet values and wiped Studio edits on each run.
async function seed(doc) {
  try { await client.createIfNotExists(doc); return true; }
  catch(e) { console.error(`  ❌ ${doc._id}: ${e.message.substring(0,80)}`); return false; }
}

async function main() {
  console.log(`📋 ${active.length} assets...\n`);
  let ok = 0, batch = 0;

  for (let i = 0; i < active.length; i++) {
    const a = active[i];
    const slug = a['Slug'] || ('ast-' + (a['Asset ID'] || '').toLowerCase());
    const localPath = findLocal(a['Relative Path']);

    const doc = {
      _id: `asset-${slug}`,
      _type: 'asset',
      name: a['Asset Name'] || a['Asset ID'] || slug,
      slug: { _type: 'slug', current: slug },
      displayName: a['Display Name'] || '',
      assetType: a['Asset Type'] || '',
      mediaType: a['Media Type'] || '',
      mimeType: a['MIME Type'] || '',
      assetGroup: a['Asset Group'] || '',
      usage: a['Usage'] || '',
      status: a['Status'] || 'Active',
      folder: a['Folder'] || '',
      relativePath: a['Relative Path'] || '',
      fileName: a['File Name'] || '',
      extension: a['Extension'] || '',
      ownerType: a['Owner Type'] || '',
      ownerId: a['Owner ID'] || '',
      localExists: !!localPath,
    };

    const result = await seed(doc);
    if (result) ok++;

    // Progress every 20
    if ((i+1) % 20 === 0) { batch += 20; console.log(`  ${batch}/${active.length}...`); }
  }

  console.log(`\n✅ ${ok}/${active.length} assets imported`);
  console.log(`   ${active.filter(a => findLocal(a['Relative Path'])).length} have local files`);
  await client.createOrReplace({
    _id: 'sync-assets-final',
    _type: 'syncStatus', source: 'notion', target: 'sanity',
    status: ok === active.length ? 'synced' : 'pending',
    entityType: 'asset', entityCount: active.length,
    lastSyncedAt: new Date().toISOString(),
    notes: `${ok} imported, ${active.filter(a => findLocal(a['Relative Path'])).length} with local files`,
    localExists: active.filter(a => findLocal(a['Relative Path'])).length,
  });
}

main().catch(e => console.error('\n❌', e.message));
