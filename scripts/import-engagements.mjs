#!/usr/bin/env node
/**
 * Import Notion Client Engagements into Sanity engagement documents.
 * SANITY_TOKEN=sk... node scripts/import-engagements.mjs
 */
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const token = process.env.SANITY_TOKEN;
if (!token) process.exit(1);

const client = createClient({ projectId:'splvhmk1', dataset:'production', apiVersion:'2026-07-28', token, useCdn:false });
const DATA = path.resolve(import.meta.dirname, '../notion-data');
const engagements = JSON.parse(fs.readFileSync(path.join(DATA, 'client-engagements.json'), 'utf8'));

async function upsert(doc) {
  try { await client.createOrReplace(doc); return true; }
  catch(e) { console.error(`  ❌ ${doc._id}: ${e.message.substring(0,80)}`); return false; }
}

async function main() {
  console.log(`📋 ${engagements.length} client engagements...\n`);
  let ok = 0;

  for (const e of engagements) {
    const name = e['Project Name'] || e['Engagement ID'] || 'Unnamed';
    const slug = (e['Engagement ID'] || name).toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 60);
    const clientName = e['Client Name'] || e['Client ID'] || '';

    const doc = {
      _id: `engagement-${slug}`,
      _type: 'engagement',
      name,
      slug: { _type: 'slug', current: slug },
      engagementType: (e['Engagement Type'] || '').toLowerCase().replace(/\s+/g, '-') || undefined,
      description: e['Notes'] || '',
      startDate: e['Start Date'] || undefined,
      endDate: e['End Date'] || undefined,
      status: (e['Status'] || '').toLowerCase() || undefined,
      services: e['Services'] ? e['Services'].split(',').map(function(s) { return s.trim(); }) : undefined,
      priceLabel: undefined,
      duration: e['Duration'] || undefined,
      scopeItems: undefined,
      teamSize: undefined,
      neonSynced: false,
    };

    const result = await upsert(doc);
    if (result) ok++;
  }

  console.log(`\n✅ ${ok}/${engagements.length} engagements imported`);

  await upsert({
    _id: 'sync-client-engagements',
    _type: 'syncStatus',
    source: 'notion', target: 'sanity',
    status: ok === engagements.length ? 'synced' : 'pending',
    entityType: 'engagement',
    entityCount: ok,
    lastSyncedAt: new Date().toISOString(),
    notes: `${ok} engagements imported from Notion Client Engagements DB`,
  });
}

main().catch(e => console.error('\n❌', e.message));
