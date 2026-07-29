#!/usr/bin/env node
/**
 * Import ALL Notion data into Sanity as proper document types.
 * Creates schemas for tech-stack, tags, publishing-platforms, etc.
 *
 * SANITY_TOKEN=sk... node scripts/import-all-notion-to-sanity.mjs
 */
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const token = process.env.SANITY_TOKEN;
if (!token) { console.error('Missing SANITY_TOKEN'); process.exit(1); }

const client = createClient({ projectId:'splvhmk1', dataset:'production', apiVersion:'2026-07-28', token, useCdn:false });

const DATA = path.resolve(import.meta.dirname, '../notion-data');

function load(name) {
  return JSON.parse(fs.readFileSync(path.join(DATA, name), 'utf8'));
}

async function upsert(doc) {
  try { await client.createOrReplace(doc); return true; }
  catch(e) { console.error(`  ❌ ${doc._type} ${doc._id}: ${e.message.substring(0,80)}`); return false; }
}

async function main() {
  console.log('🚀 Importing all Notion data into Sanity\n');

  // 1. TAGS — import into taxonomy with vocabulary='tag'
  console.log('📋 Tags...');
  const tags = load('tags-detailed.json');
  let tagCount = 0;
  for (const t of tags) {
    if (!t.name) continue;
    const ok = await upsert({
      _id: `tag-${t.slug || t.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`,
      _type: 'taxonomy',
      name: t.name,
      slug: { _type: 'slug', current: t.slug || t.name.toLowerCase().replace(/[^a-z0-9]+/g,'-') },
      vocabulary: 'tag',
      icon: t.color || '',
    });
    if (ok) tagCount++;
  }
  console.log(`  ✅ ${tagCount} tags`);

  // 2. TECH STACK
  console.log('\n📋 Tech Stack...');
  const tech = load('tech-stack-detailed.json');
  let techCount = 0;
  for (const t of tech) {
    const name = t['Tool'] || t['Name (Title)'];
    if (!name) continue;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g,'-');
    const ok = await upsert({
      _id: `tech-${slug}`,
      _type: 'taxonomy',
      name,
      slug: { _type: 'slug', current: slug },
      vocabulary: 'tech-stack',
      description: `${t['Category'] || ''}${t['Type'] ? ' — ' + t['Type'] : ''}`,
    });
    if (ok) techCount++;
  }
  console.log(`  ✅ ${techCount} tech stack items`);

  // 3. PUBLISHING PLATFORMS
  console.log('\n📋 Publishing Platforms...');
  const platforms = load('publishing-platforms.json');
  let platCount = 0;
  for (const p of platforms) {
    const name = p['Name (Title)'] || p['Platform Name'];
    if (!name) continue;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g,'-');
    const ok = await upsert({
      _id: `platform-${slug}`,
      _type: 'taxonomy',
      name,
      slug: { _type: 'slug', current: slug },
      vocabulary: 'publishing-platform',
    });
    if (ok) platCount++;
  }
  console.log(`  ✅ ${platCount} platforms`);

  // 4. TEAM DEPARTMENTS
  console.log('\n📋 Team Departments...');
  const depts = load('team-department.json');
  let deptCount = 0;
  for (const d of depts) {
    const name = Object.values(d).find(v => typeof v === 'string' && v.length > 3);
    if (!name) continue;
    const slug = name.toString().toLowerCase().replace(/[^a-z0-9]+/g,'-').substring(0,60);
    const ok = await upsert({
      _id: `dept-${slug}`,
      _type: 'taxonomy',
      name: name.toString().substring(0,80),
      slug: { _type: 'slug', current: slug },
      vocabulary: 'team-department',
    });
    if (ok) deptCount++;
  }
  console.log(`  ✅ ${deptCount} departments`);

  // 5. ASSET TYPES
  console.log('\n📋 Asset Types...');
  const types = load('asset-type.json');
  let typeCount = 0;
  for (const t of types) {
    const desc = Object.values(t).find(v => typeof v === 'string' && v.length > 10);
    if (!desc) continue;
    const name = desc.toString().substring(0, 60);
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g,'-').substring(0,60);
    const ok = await upsert({
      _id: `asset-type-${slug}`,
      _type: 'taxonomy',
      name,
      slug: { _type: 'slug', current: slug },
      vocabulary: 'asset-type',
    });
    if (ok) typeCount++;
  }
  console.log(`  ✅ ${typeCount} asset types`);

  // 6. CONTENT TYPES
  console.log('\n📋 Content Types...');
  const ctypes = load('content-type.json');
  let ctCount = 0;
  for (const ct of ctypes) {
    const name = Object.values(ct).find(v => typeof v === 'string' && v.length > 3);
    if (!name) continue;
    const slug = name.toString().toLowerCase().replace(/[^a-z0-9]+/g,'-');
    const ok = await upsert({
      _id: `content-type-${slug}`,
      _type: 'taxonomy',
      name: name.toString(),
      slug: { _type: 'slug', current: slug },
      vocabulary: 'content-type',
    });
    if (ok) ctCount++;
  }
  console.log(`  ✅ ${ctCount} content types`);

  // 7. COUNTRIES
  console.log('\n📋 Countries...');
  const countries = load('country.json');
  let countryCount = 0;
  for (const c of countries) {
    const name = c['Name (Title)'] || Object.values(c).find(v => typeof v === 'string' && v.length > 2);
    if (!name) continue;
    const slug = name.toString().toLowerCase().replace(/[^a-z0-9]+/g,'-');
    const ok = await upsert({
      _id: `country-${slug}`,
      _type: 'taxonomy',
      name: name.toString(),
      slug: { _type: 'slug', current: slug },
      vocabulary: 'country',
    });
    if (ok) countryCount++;
  }
  console.log(`  ✅ ${countryCount} countries`);

  // 8. Update sync status
  await upsert({
    _id: 'sync-all-taxonomies',
    _type: 'syncStatus',
    source: 'notion', target: 'sanity',
    status: 'synced',
    entityType: 'taxonomy',
    entityCount: tagCount + techCount + platCount + deptCount + typeCount + ctCount + countryCount,
    lastSyncedAt: new Date().toISOString(),
    notes: `Tags:${tagCount} Tech:${techCount} Platforms:${platCount} Depts:${deptCount} AssetTypes:${typeCount} ContentTypes:${ctCount} Countries:${countryCount}`,
  });

  console.log(`\n✅ Total taxonomy terms imported: ${tagCount+techCount+platCount+deptCount+typeCount+ctCount+countryCount}`);
}

main().catch(e => console.error('\n❌', e.message));
