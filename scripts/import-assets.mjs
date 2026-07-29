#!/usr/bin/env node
/**
 * Import Notion Asset Sheet into Sanity + verify local file existence.
 * SANITY_TOKEN=sk... node scripts/import-assets.mjs
 */
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const token = process.env.SANITY_TOKEN;
if (!token) { process.exit(1); }

const client = createClient({ projectId:'splvhmk1', dataset:'production', apiVersion:'2026-07-28', token, useCdn:false });

const assets = JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, '../notion-data/asset-sheet.json'), 'utf8'));
const active = assets.filter(a => a['Status'] !== 'Reserved' && a['Relative Path'] && a['Relative Path'] !== '—');

console.log(`📋 ${active.length} active assets\n`);

// Check which local files exist
let localExist = 0, localMissing = 0;
for (const a of active) {
  const localPath = path.resolve(import.meta.dirname, '../public/assets', a['Relative Path']);
  if (fs.existsSync(localPath)) localExist++;
  else { if (localMissing < 5) console.log(`  MISSING: public/assets/${a['Relative Path']}`); localMissing++; }
}
console.log(`\nLocal files: ${localExist} existing, ${localMissing} missing`);

// Upload sync status to Sanity
await client.createOrReplace({
  _id: 'sync-assets',
  _type: 'syncStatus',
  source: 'notion', target: 'local',
  status: localMissing === 0 ? 'synced' : 'pending',
  entityType: 'asset',
  entityCount: active.length,
  lastSyncedAt: new Date().toISOString(),
  notes: `${localExist} local, ${localMissing} missing — assets on wugweb.online/Framer CDN not downloaded`,
  data: {
    totalAssets: assets.length,
    activeCount: active.length,
    localExisting: localExist,
    localMissing,
    byGroup: Object.fromEntries(
      [...new Set(active.map(a => a['Asset Group']))].map(g => [g, active.filter(a => a['Asset Group'] === g).length])
    ),
  },
});
console.log('✅ Asset sync status created in Sanity');
