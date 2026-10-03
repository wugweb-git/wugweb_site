#!/usr/bin/env node
/**
 * Import Notion Asset Sheet into Sanity asset documents.
 * Matches against local files where possible.
 * SANITY_TOKEN=sk... node scripts/import-assets-to-sanity.mjs
 */
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const token = process.env.SANITY_TOKEN;
if (!token) { process.exit(1); }

const client = createClient({ projectId:'splvhmk1', dataset:'production', apiVersion:'2026-07-28', token, useCdn:false });

const DIR = path.resolve(import.meta.dirname, '..');
const assets = JSON.parse(fs.readFileSync(path.join(DIR, 'notion-data/asset-sheet.json'), 'utf8'));
const active = assets.filter(a => a['Status'] !== 'Reserved' && a['Relative Path'] && a['Relative Path'] !== '—');

// Map local files (normalize for matching)
function getLocalFiles(dir) {
  const files = new Set();
  function walk(d) {
    const entries = fs.readdirSync(d, {withFileTypes:true});
    for(const e of entries) {
      const p = d+'/'+e.name;
      if(e.isDirectory()) walk(p);
      else files.add(p.replace(dir+'/', ''));
    }
  }
  walk(dir);
  return files;
}
const localFiles = getLocalFiles(path.join(DIR, 'public/assets'));

function normalize(p) { return p.toLowerCase().replace(/[_-]/g, '').replace(/.*\//, '/'); }

function findLocalMatch(notionPath) {
  const n = normalize(notionPath);
  for(const lf of localFiles) {
    if(normalize(lf) === n) return lf;
  }
  return null;
}

console.log(`📋 ${active.length} assets to import\n`);
let count = 0, matched = 0;

for (const a of active) {
  const name = a['Asset Name'] || a['Asset ID'];
  const slug = a['Slug'] || a['Asset ID']?.toLowerCase() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const localPath = findLocalMatch(a['Relative Path']);

  const doc = {
    _id: `asset-${slug}`,
    _type: 'asset',
    name,
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
    neonSynced: false,
  };

  try {
    // createIfNotExists: Notion is a seed source only (CLAUDE.md). A replace
    // here reset every asset to the old sheet values on each run — wiping
    // Studio edits and everything Sanity has gained since the import.
    await client.createIfNotExists(doc);
    count++;
    if (localPath) matched++;
  } catch (e) {
    console.error(`  ❌ ${slug}: ${e.message.substring(0,80)}`);
  }
}

console.log(`\n✅ ${count} assets imported (${matched} with local files)`);
