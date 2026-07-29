#!/usr/bin/env node
/**
 * Sync Sanity → Neon
 *
 * Fetches ALL documents from Sanity and upserts them into Neon's
 * content_items table.
 *
 * Usage: SANITY_TOKEN=sk... DATABASE_URL=postgresql://... node scripts/sync-sanity-to-neon.mjs
 */

import pg from 'pg';
import { createClient } from '@sanity/client';

const { Client } = pg;

const SANITY_TOKEN = process.env.SANITY_TOKEN;
const DATABASE_URL = process.env.DATABASE_URL;
if (!SANITY_TOKEN || !DATABASE_URL) {
  console.error('Missing SANITY_TOKEN or DATABASE_URL env vars');
  process.exit(1);
}

const sanity = createClient({
  projectId: 'splvhmk1', dataset: 'production', apiVersion: '2026-07-28',
  token: SANITY_TOKEN, useCdn: false,
});

const TYPE_MAP = {
  service: 'service', caseStudy: 'caseStudy', post: 'post',
  person: 'person', siteSettings: 'siteSettings', singletonPage: 'page',
  client: 'client', industry: 'industry', engagement: 'engagement',
  taxonomy: 'taxonomy', contactSubmission: 'contactSubmission',
};

async function main() {
  const pg = new Client({ connectionString: DATABASE_URL });
  await pg.connect();
  console.log('✅ Connected to Neon\n');

  const types = Object.keys(TYPE_MAP);
  let total = 0;

  for (const type of types) {
    const docs = await sanity.fetch(`*[_type == $type]`, { type });
    if (docs.length === 0) { console.log(`  ${type}: 0 docs`); continue; }

    const contentType = TYPE_MAP[type];
    let synced = 0;

    for (const doc of docs) {
      const { _id, _type, _rev, _createdAt, _updatedAt, ...cleanData } = doc;
      const id = _id;
      const owner = 'vedanshu';

      try {
        await pg.query(
          `INSERT INTO content_items (id, content_type, status, owner, data, updated_at)
           VALUES ($1, $2, 'published', $3, $4::jsonb, now())
           ON CONFLICT (id) DO UPDATE SET
             content_type = excluded.content_type, status = 'published',
             data = excluded.data, updated_at = now()`,
          [id, contentType, owner, JSON.stringify(cleanData)]
        );
        synced++;
      } catch (e) {
        console.error(`  ❌ ${id}: ${e.message}`);
      }
    }

    console.log(`  ${type}: ${synced}/${docs.length} synced`);
    total += synced;
  }

  // Record sync log
  await pg.query(
    `INSERT INTO sync_log (source, target, status, entity_type, entity_count, started_at, completed_at)
     VALUES ('sanity', 'neon', 'completed', 'all', $1, now() - interval '1 second', now())`,
    [total]
  );

  console.log(`\n✅ ${total} total documents synced to Neon`);
  await pg.end();
}

main().catch(e => { console.error('\n❌', e.message); process.exit(1); });
