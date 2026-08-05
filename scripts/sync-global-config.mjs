#!/usr/bin/env node
/**
 * Sync Global Settings masters + Presence from Notion JSON.
 *
 * Masters (taxonomy vocabularies):
 *   platform, tech-stack, tag, asset-type, content-type, team-department, country
 *
 * Presence (platformProfile):
 *   DP1 profiles + DP2 credentials (merged by Profile ID)
 *   Platform catalog fields from DP3 enrich taxonomy vocabulary "platform"
 *   (DP3 Notion columns are mislabeled: Slug=name, Platform Name=PF-id, Platform ID=CRD-id)
 *
 * Usage:
 *   SANITY_API_TOKEN=... node scripts/sync-global-config.mjs
 *   DRY_RUN=1 node scripts/sync-global-config.mjs
 */
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'notion-data');
const DRY_RUN = process.env.DRY_RUN === '1';

const token = process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN;
if (!token) {
  console.error('Missing SANITY_TOKEN / SANITY_API_TOKEN');
  process.exit(1);
}

const client = createClient({
  projectId: 'splvhmk1',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

function load(name) {
  const p = path.join(DATA, name);
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'unnamed';
}

function pickOwner(profileUrl, username, platform) {
  const hay = `${profileUrl || ''} ${username || ''} ${platform || ''}`.toLowerCase();
  if (hay.includes('vedanshu')) return 'vedanshu';
  return 'wugweb';
}

async function upsert(doc) {
  if (DRY_RUN) return true;
  try {
    await client.createOrReplace(doc);
    return true;
  } catch (e) {
    console.error(`  ❌ ${doc._type} ${doc._id}: ${e.message.slice(0, 120)}`);
    return false;
  }
}

async function main() {
  console.log(`🚀 Sync global config${DRY_RUN ? ' (DRY RUN)' : ''}\n`);
  const counts = {};

  // ── Platforms: master list + unique DP1 platforms, enriched by DP3 ──
  console.log('📡 Platforms...');
  const masterPlatforms = load('master-platform-list.json');
  const dp1 = load('digital-presence-1.json');
  const dp3 = load('digital-presence-3.json');

  /** @type {Map<string, any>} */
  const platforms = new Map();

  for (const row of masterPlatforms) {
    const name = row['Name (Title)']?.trim();
    if (!name) continue;
    const slug = slugify(name);
    platforms.set(slug, {
      name,
      slug,
      vocabulary: 'platform',
      category: row['Tag Category'] || undefined,
      externalId: row['Platform ID'] || undefined,
      description: row['Text'] || undefined,
    });
  }

  for (const row of dp1) {
    const name = (row.Platform || '').trim();
    const id = (row.ID || '').trim();
    if (!name || !id || id === 'Links') continue;
    const slug = slugify(name);
    if (!platforms.has(slug)) {
      platforms.set(slug, {
        name,
        slug,
        vocabulary: 'platform',
        category: row.Category || undefined,
      });
    } else {
      const cur = platforms.get(slug);
      if (!cur.category && row.Category) cur.category = row.Category;
    }
  }

  // DP3 field remap: Slug = platform name, Platform Name = PF-id, Platform ID = CRD-id
  for (const row of dp3) {
    const name = (row.Slug || '').trim();
    if (!name) continue;
    const slug = slugify(name);
    const enrich = {
      name,
      slug,
      vocabulary: 'platform',
      website: row['Official Website'] || undefined,
      category: row.Category || undefined,
      status: row.Active ? 'Active' : undefined,
      description: row.Description || undefined,
      externalId: row['Platform ID'] || undefined,
      meta: JSON.stringify({
        profileIdHint: row['Platform Name'] || null,
        domainAuthority: row['Domain Authority'] || null,
        seoValue: row['SEO Value'] || null,
        trafficPotential: row['Traffic Potential'] || null,
        authorityScore: row['Authority Score'] ?? null,
        backlinkType: row['Backlink Type'] || null,
        supportsApi: row['Supports API'] || null,
        supportsOAuth: row['Supports OAuth Login'] || null,
        supportsRss: row['Supports RSS'] || null,
        supportsWebhooks: row['Supports Webhooks'] || null,
        requiresLogin: row['Requires Login'] || null,
        subCategory: row['Sub Category'] || null,
        businessObjective: row['Business Objective'] || null,
        postingFrequency: row['Posting Frequency'] || null,
        supportedAssetTypes: row['Supported Asset Types'] || null,
        supportedContentTypes: row['Supported Content Types'] || null,
        defaultAssetSizes: row['Default Asset Sizes'] || null,
        notes: row.Notes || null,
      }),
    };
    const cur = platforms.get(slug) || {};
    platforms.set(slug, {
      ...cur,
      ...enrich,
      category: enrich.category || cur.category,
      description: enrich.description || cur.description,
    });
  }

  let platformCount = 0;
  for (const p of platforms.values()) {
    const doc = {
      _id: `platform-${p.slug}`,
      _type: 'taxonomy',
      name: p.name,
      slug: { _type: 'slug', current: p.slug },
      vocabulary: 'platform',
      category: p.category || undefined,
      status: p.status || undefined,
      website: p.website || undefined,
      description: p.description || undefined,
      externalId: p.externalId || undefined,
      meta: p.meta || undefined,
      iconPath: p.iconPath || undefined,
    };
    if (await upsert(doc)) platformCount++;
  }
  counts.platform = platformCount;
  console.log(`  ✅ ${platformCount} platforms`);

  // ── Tech stack ──
  console.log('\n🛠️  Tech stack...');
  const tech = load('master-tech-stack.json').length
    ? load('master-tech-stack.json')
    : load('tech-stack.json');
  let techCount = 0;
  for (const t of tech) {
    const name = t.Tool || t['Name (Title)'];
    if (!name) continue;
    const slug = slugify(name);
    const services = Array.isArray(t.Services) ? t.Services.join(', ') : '';
    const doc = {
      _id: `tech-${slug}`,
      _type: 'taxonomy',
      name,
      slug: { _type: 'slug', current: slug },
      vocabulary: 'tech-stack',
      category: t.Category || undefined,
      status: t.Status || undefined,
      description: [t.Type, t.Category, services].filter(Boolean).join(' — ') || undefined,
      meta: JSON.stringify({
        type: t.Type || null,
        services: t.Services || [],
        notes: t.Notes || null,
      }),
    };
    if (await upsert(doc)) techCount++;
  }
  counts.tech = techCount;
  console.log(`  ✅ ${techCount} tools`);

  // ── Simple vocab masters ──
  async function importSimple({ file, nameKeys, vocab, idPrefix, noteKey = 'Notes', idKey }) {
    console.log(`\n📋 ${vocab}...`);
    const rows = load(file);
    let n = 0;
    for (const row of rows) {
      let name;
      for (const k of nameKeys) {
        if (row[k]) {
          name = String(row[k]).trim();
          break;
        }
      }
      if (!name) continue;
      const slug = slugify(name);
      const doc = {
        _id: `${idPrefix}-${slug}`,
        _type: 'taxonomy',
        name,
        slug: { _type: 'slug', current: slug },
        vocabulary: vocab,
        description: row[noteKey] || undefined,
        externalId: idKey ? row[idKey] || undefined : undefined,
      };
      if (await upsert(doc)) n++;
    }
    counts[vocab] = n;
    console.log(`  ✅ ${n}`);
  }

  await importSimple({
    file: 'tags.json',
    nameKeys: ['Name (Title)', 'Name'],
    vocab: 'tag',
    idPrefix: 'tag',
  });
  await importSimple({
    file: 'asset-type.json',
    nameKeys: ['Name'],
    vocab: 'asset-type',
    idPrefix: 'asset-type',
    idKey: 'Asset Type ID',
  });
  await importSimple({
    file: 'content-type.json',
    nameKeys: ['Name'],
    vocab: 'content-type',
    idPrefix: 'content-type',
    idKey: 'Content Type ID',
  });
  await importSimple({
    file: 'team-department.json',
    nameKeys: ['Name'],
    vocab: 'team-department',
    idPrefix: 'dept',
    idKey: 'Dept ID',
  });
  await importSimple({
    file: 'country.json',
    nameKeys: ['Name (Title)', 'Name'],
    vocab: 'country',
    idPrefix: 'country',
  });

  // ── Presence: DP1 + DP2 credentials ──
  console.log('\n🔗 Presence (profiles + credentials)...');
  const dp2 = load('digital-presence-2.json');
  const credByProfile = new Map();
  for (const c of dp2) {
    const pid = (c['Profile ID'] || '').trim();
    if (pid) credByProfile.set(pid, c);
  }

  let presenceCount = 0;
  const seenProfileIds = new Set();

  for (const p of dp1) {
    const profileId = (p.ID || '').trim();
    const platform = (p.Platform || '').trim();
    if (!profileId || profileId === 'Links' || !platform) continue;
    seenProfileIds.add(profileId);

    let profileUrl = p['Profile URL'] || undefined;
    let username = p['Username / Handle'] || undefined;
    let owner = pickOwner(profileUrl, username, platform);

    // Canonical Behance → vedanshu
    if (/behance/i.test(platform)) {
      profileUrl = 'https://www.behance.net/vedanshu';
      username = '@vedanshu';
      owner = 'vedanshu';
    }
    if (/dribbble/i.test(platform) && profileUrl) {
      owner = 'wugweb';
    }

    const slug = slugify(platform);
    const platformRefId = platforms.has(slug) ? `platform-${slug}` : undefined;
    const cred = credByProfile.get(profileId);

    const doc = {
      _id: `platformProfile-${profileId}`,
      _type: 'platformProfile',
      profileId,
      platform,
      platformRef: platformRefId
        ? { _type: 'reference', _ref: platformRefId }
        : undefined,
      profileUrl: profileUrl || undefined,
      category: p.Category || undefined,
      profileStatus: p['Profile Status'] || undefined,
      username: username || undefined,
      bio: p.Bio || undefined,
      owner,
      notes: [p.Notes, cred?.Notes].filter(Boolean).join('\n') || undefined,
      // credentials
      credentialId: cred?.['Credential ID'] || undefined,
      loginEmail: cred?.['Login Email / Username'] || undefined,
      password: cred?.Password || undefined,
      apiKey: cred?.['API Key'] || undefined,
      loginMethod: cred?.['Login Method'] || undefined,
      twoFactor: cred?.['2FA'] || undefined,
      recoveryEmail: cred?.['Recovery Email'] || undefined,
      recoveryPhone: cred?.['Recovery Phone'] || undefined,
      backupCodes: cred?.['Backup Codes'] || undefined,
      accessLevel: cred?.['Access Level'] || undefined,
      accountType: cred?.['Account Type'] || undefined,
      credentialStatus: cred?.Status || undefined,
    };

    if (await upsert(doc)) presenceCount++;
  }
  counts.presence = presenceCount;
  console.log(`  ✅ ${presenceCount} presence rows`);

  // Delete legacy create()-imported profiles without stable ids (optional cleanup)
  if (!DRY_RUN) {
    const orphans = await client.fetch(
      `*[_type=="platformProfile" && !(_id in path("drafts.**")) && !(profileId in $ids)]._id`,
      { ids: [...seenProfileIds] }
    );
    // Also delete if _id doesn't start with platformProfile-
    const allLegacy = await client.fetch(
      `*[_type=="platformProfile" && !(_id match "platformProfile-*")]._id`
    );
    const toDelete = [...new Set([...orphans, ...allLegacy])];
    if (toDelete.length) {
      console.log(`\n🧹 Deleting ${toDelete.length} legacy presence docs...`);
      const tx = client.transaction();
      for (const id of toDelete) tx.delete(id);
      await tx.commit();
    }
  }

  await upsert({
    _id: 'sync-global-config',
    _type: 'syncStatus',
    source: 'notion',
    target: 'sanity',
    status: 'synced',
    entityType: 'global-config',
    entityCount: Object.values(counts).reduce((a, b) => a + b, 0),
    lastSyncedAt: new Date().toISOString(),
    notes: JSON.stringify(counts),
  });

  console.log('\n✅ Counts:', counts);
}

main().catch((e) => {
  console.error('\n❌', e.message);
  process.exit(1);
});
