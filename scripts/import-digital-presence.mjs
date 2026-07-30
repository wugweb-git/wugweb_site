#!/usr/bin/env node
/**
 * Import digital presence data from Notion JSON to Sanity
 */
import { createClient } from '@sanity/client';
import fs from 'fs';

const sanity = createClient({
  projectId: 'splvhmk1',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

const dir = '/Users/abcom/Documents/GitHub/wugweb_site/notion-data';

// Combine all 4 digital presence databases
const files = [
  'digital-presence-1.json',
  'digital-presence-2.json',
  'digital-presence-3.json',
  'digital-presence-4.json',
];

let allProfiles = [];
for (const file of files) {
  const data = JSON.parse(fs.readFileSync(`${dir}/${file}`, 'utf-8'));
  allProfiles = allProfiles.concat(data);
}

console.log(`Total profiles: ${allProfiles.length}`);

// Deduplicate by ID
const seen = new Set();
const unique = [];
for (const p of allProfiles) {
  const id = p['ID'];
  if (id && !seen.has(id)) {
    seen.add(id);
    unique.push(p);
  }
}

console.log(`Unique profiles: ${unique.length}`);

// Import to Sanity
let imported = 0;
let errors = 0;

for (const p of unique) {
  try {
    const doc = {
      _type: 'platformProfile',
      profileId: p['ID'] || '',
      platform: p['Platform'] || 'Unknown',
      profileUrl: p['Profile URL'] || undefined,
      category: p['Category'] || undefined,
      profileStatus: p['Profile Status'] || undefined,
      username: p['Username / Handle'] || undefined,
      bio: p['Bio'] || undefined,
      assetType: p['Asset Type'] || undefined,
      fileUrl: p['File URL / Storage Path'] || undefined,
      notes: p['Notes'] || undefined,
      attachment: p['Attachment'] || undefined,
    };

    await sanity.create(doc);
    imported++;
    if (imported % 10 === 0) console.log(`  Imported ${imported}...`);
  } catch (e) {
    errors++;
    if (errors <= 3) console.error(`  Error: ${e.message.substring(0, 100)}`);
  }
}

console.log(`\n✅ Imported: ${imported}`);
console.log(`❌ Errors: ${errors}`);