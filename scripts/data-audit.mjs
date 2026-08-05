import { createClient } from '@sanity/client';
import pg from 'pg';
import { readdir, stat } from 'fs/promises';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';

const { Client } = pg;
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────
const NEON_URL = process.env.DATABASE_URL;
const SANITY_TOKEN = process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN;
if (!NEON_URL || !SANITY_TOKEN) {
  console.error('Missing DATABASE_URL or SANITY_TOKEN/SANITY_API_TOKEN in environment');
  process.exit(1);
}
const ASSETS_DIR = join(__dirname, '../public/assets');
const REPORT_PATH = join(__dirname, 'AUDIT_REPORT.md');

const sanity = createClient({
  projectId: 'splvhmk1',
  dataset: 'production',
  apiVersion: '2026-07-28',
  token: SANITY_TOKEN,
  useCdn: false,
});

const pgClient = new Client({ connectionString: NEON_URL, connectionTimeoutMillis: 15000, query_timeout: 60000 });

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function formatDate(d) {
  if (!d) return '—';
  try { return new Date(d).toISOString(); } catch { return String(d); }
}

function isExternalUrl(path) {
  if (!path || typeof path !== 'string') return false;
  const lower = path.toLowerCase();
  return lower.includes('framerusercontent') ||
    lower.includes('notionusercontent') ||
    lower.includes('blob:') ||
    /^https?:\/\//.test(path) ||
    lower.includes('cdn.') ||
    lower.includes('images.unsplash') ||
    lower.includes('s3.amazonaws') ||
    lower.includes('cloudinary') ||
    lower.includes('imgur');
}

async function* walkDir(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        yield* walkDir(fullPath);
      } else {
        yield fullPath;
      }
    }
  } catch (err) {
    // Directory might not exist
  }
}

async function getDiskAssets() {
  const files = [];
  for await (const f of walkDir(ASSETS_DIR)) {
    files.push(relative(ASSETS_DIR, f).replace(/\\/g, '/'));
  }
  return files;
}

// ─────────────────────────────────────────────────────────────────────────────
// STAGE 1: NEON AUDIT
// ─────────────────────────────────────────────────────────────────────────────
async function auditNeon() {
  const report = { sections: [] };

  // List all tables
  const tablesRes = await pgClient.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name
  `);
  const tables = tablesRes.rows.map(r => r.table_name);
  report.tables = tables;

  const tableDetails = [];
  for (const table of tables) {
    const countRes = await pgClient.query(`SELECT COUNT(*)::int AS count FROM "${table}"`);
    const count = countRes.rows[0].count;

    // Primary key
    const pkRes = await pgClient.query(`
      SELECT kcu.column_name
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
      WHERE tc.table_name = $1 AND tc.constraint_type = 'PRIMARY KEY'
    `, [table]);
    const primaryKey = pkRes.rows.map(r => r.column_name).join(', ') || 'none';

    // Foreign keys
    const fkRes = await pgClient.query(`
      SELECT kcu.column_name, ccu.table_name AS references_table, ccu.column_name AS references_column
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
      JOIN information_schema.constraint_column_usage ccu
        ON tc.constraint_name = ccu.constraint_name
      WHERE tc.table_name = $1 AND tc.constraint_type = 'FOREIGN KEY'
    `, [table]);
    const foreignKeys = fkRes.rows.map(r => `${r.column_name} → ${r.references_table}.${r.references_column}`);

    // Nullable columns
    const nullRes = await pgClient.query(`
      SELECT column_name, is_nullable, data_type
      FROM information_schema.columns
      WHERE table_name = $1
      ORDER BY ordinal_position
    `, [table]);
    const nullableFields = nullRes.rows
      .filter(r => r.is_nullable === 'YES')
      .map(r => r.column_name);

    // Last updated
    let lastUpdated = 'N/A';
    const hasUpdated = nullRes.rows.some(r => r.column_name === 'updated_at');
    if (hasUpdated) {
      const luRes = await pgClient.query(`SELECT MAX(updated_at) AS m FROM "${table}"`);
      lastUpdated = formatDate(luRes.rows[0]?.m);
    }

    tableDetails.push({
      table,
      exists: true,
      count,
      primaryKey,
      foreignKeys,
      nullableFields,
      lastUpdated,
    });
  }
  report.tableDetails = tableDetails;

  // Content items breakdown
  const contentTypeRes = await pgClient.query(`
    SELECT content_type, COUNT(*)::int AS count, MAX(updated_at) AS last_updated
    FROM content_items
    GROUP BY content_type
    ORDER BY content_type
  `);
  report.contentTypeCounts = contentTypeRes.rows;

  // Duplicates in content_items by id
  const dupIdRes = await pgClient.query(`
    SELECT id, COUNT(*)::int AS c
    FROM content_items
    GROUP BY id
    HAVING COUNT(*) > 1
  `);
  report.duplicateContentItemIds = dupIdRes.rows;

  // Missing slugs / titles / media in content_items data JSONB
  const missingRes = await pgClient.query(`
    SELECT
      COUNT(*) FILTER (WHERE data->>'slug' IS NULL OR data->>'slug' = '') AS missing_slug,
      COUNT(*) FILTER (WHERE data->>'title' IS NULL OR data->>'title' = '') AS missing_title,
      COUNT(*) FILTER (WHERE data->>'media' IS NULL AND data->>'coverImage' IS NULL AND data->>'image' IS NULL AND data->>'photo' IS NULL AND data->>'logo' IS NULL) AS missing_media
    FROM content_items
  `);
  report.missingInContentItems = missingRes.rows[0];

  // Orphaned content_relations
  const orphanSourceRes = await pgClient.query(`
    SELECT cr.id, cr.source_id, cr.target_id, cr.relation_type
    FROM content_relations cr
    LEFT JOIN content_items ci ON cr.source_id = ci.id
    WHERE ci.id IS NULL
  `);
  const orphanTargetRes = await pgClient.query(`
    SELECT cr.id, cr.source_id, cr.target_id, cr.relation_type
    FROM content_relations cr
    LEFT JOIN content_items ci ON cr.target_id = ci.id
    WHERE ci.id IS NULL
  `);
  report.orphanedRelations = {
    orphanedSources: orphanSourceRes.rows,
    orphanedTargets: orphanTargetRes.rows,
  };

  // Duplicate content_relations
  const dupRelRes = await pgClient.query(`
    SELECT source_id, target_id, relation_type, COUNT(*)::int AS c
    FROM content_relations
    GROUP BY source_id, target_id, relation_type
    HAVING COUNT(*) > 1
  `);
  report.duplicateRelations = dupRelRes.rows;

  return report;
}

// ─────────────────────────────────────────────────────────────────────────────
// STAGE 2: SANITY AUDIT
// ─────────────────────────────────────────────────────────────────────────────
async function auditSanity() {
  const types = ['asset', 'caseStudy', 'post', 'person', 'client', 'industry', 'service', 'singletonPage', 'siteSettings', 'syncStatus', 'taxonomy', 'engagement', 'contactSubmission'];
  const report = { documentTypes: [] };

  // Get all IDs and types in one go
  const allDocs = await sanity.fetch(`*[] { _id, _type }`);
  report.totalDocuments = allDocs.length;

  const singletonTypes = ['siteSettings', 'singletonPage'];

  for (const type of types) {
    const docs = await sanity.fetch(`*[_type == $type] { _id, _type, _createdAt, _updatedAt, _rev }`, { type });
    const drafts = docs.filter(d => d._id.startsWith('drafts.'));
    const published = docs.filter(d => !d._id.startsWith('drafts.'));

    // Referenced by (documents referencing this type)
    const referencedBy = await sanity.fetch(`count(*[references($type)])`, { type });

    // Singleton flag
    const isSingleton = singletonTypes.includes(type);

    report.documentTypes.push({
      type,
      exists: docs.length > 0,
      count: docs.length,
      published: published.length,
      drafts: drafts.length,
      singleton: isSingleton,
      referencedBy,
    });
  }

  return report;
}

// ─────────────────────────────────────────────────────────────────────────────
// STAGE 3: ASSET AUDIT
// ─────────────────────────────────────────────────────────────────────────────
async function auditAssets() {
  const report = {};

  // Neon assets
  const neonAssetRes = await pgClient.query(`
    SELECT id, content_type, data, updated_at
    FROM content_items
    WHERE content_type = 'asset'
  `);
  report.neonAssetCount = neonAssetRes.rows.length;

  // Sanity assets
  const sanityAssets = await sanity.fetch(`*[_type == "asset"] {
    _id,
    name,
    "slug": slug.current,
    displayName,
    assetType,
    mediaType,
    mimeType,
    assetGroup,
    status,
    folder,
    relativePath,
    fileName,
    extension,
    ownerType,
    ownerId,
    localExists,
    _createdAt,
    _updatedAt
  }`);
  report.sanityAssetCount = sanityAssets.length;

  // Asset type breakdown by mediaType
  const byMediaType = {};
  const byAssetType = {};
  const byAssetGroup = {};
  const externalUrls = [];
  const missingTitle = [];
  const missingSlug = [];
  const missingType = [];
  const missingPath = [];
  const missingStatus = [];

  for (const a of sanityAssets) {
    const mt = a.mediaType || 'Unknown';
    byMediaType[mt] = (byMediaType[mt] || 0) + 1;

    const at = a.assetType || 'Unknown';
    byAssetType[at] = (byAssetType[at] || 0) + 1;

    const ag = a.assetGroup || 'Unknown';
    byAssetGroup[ag] = (byAssetGroup[ag] || 0) + 1;

    if (!a.name && !a.displayName) missingTitle.push(a._id);
    if (!a.slug) missingSlug.push(a._id);
    if (!a.mediaType) missingType.push(a._id);
    if (!a.relativePath) missingPath.push(a._id);
    if (!a.status) missingStatus.push(a._id);

    if (a.relativePath && isExternalUrl(a.relativePath)) {
      externalUrls.push({ id: a._id, name: a.name || a.displayName, path: a.relativePath });
    }
  }

  report.assetBreakdown = {
    byMediaType,
    byAssetType,
    byAssetGroup,
  };
  report.assetValidation = {
    missingTitle: missingTitle.length,
    missingTitleIds: missingTitle,
    missingSlug: missingSlug.length,
    missingSlugIds: missingSlug,
    missingMediaType: missingType.length,
    missingMediaTypeIds: missingType,
    missingPath: missingPath.length,
    missingPathIds: missingPath,
    missingStatus: missingStatus.length,
    missingStatusIds: missingStatus,
  };
  report.externalUrls = externalUrls;

  // Check disk existence
  const diskFiles = await getDiskAssets();
  report.diskAssetCount = diskFiles.length;

  const notOnDisk = [];
  for (const a of sanityAssets) {
    if (a.relativePath && !diskFiles.includes(a.relativePath)) {
      notOnDisk.push({ id: a._id, path: a.relativePath });
    }
  }
  report.assetsNotOnDisk = notOnDisk;

  const referencedPaths = new Set(sanityAssets.map(a => a.relativePath).filter(Boolean));
  const onDiskNotInSanity = diskFiles.filter(f => !referencedPaths.has(f));
  report.diskFilesNotInSanity = onDiskNotInSanity;

  return report;
}

// ─────────────────────────────────────────────────────────────────────────────
// STAGE 4: RELATIONSHIP AUDIT
// ─────────────────────────────────────────────────────────────────────────────
async function auditRelationships() {
  const report = {};

  // Neon relationships
  const neonRels = await pgClient.query(`
    SELECT relation_type, COUNT(*)::int AS count
    FROM content_relations
    GROUP BY relation_type
    ORDER BY relation_type
  `);
  report.neonRelationsByType = neonRels.rows;

  // Total relations
  const totalRelsRes = await pgClient.query(`SELECT COUNT(*)::int AS count FROM content_relations`);
  report.totalNeonRelations = totalRelsRes.rows[0].count;

  // Sanity references — total reference edges via the built-in count
  const refCount = await sanity.fetch(`count(*[count(*[references(^._id)]) > 0])`).catch(() => 0);
  report.totalSanityReferencePaths = refCount;

  // Assets referenced by each type
  const typeRefCounts = {};
  for (const type of ['caseStudy', 'post', 'service', 'client', 'industry', 'person', 'engagement', 'singletonPage']) {
    const count = await sanity.fetch(`count(*[_type == $type && references(*[_type == "asset"]._id)])`, { type }).catch(() => 0);
    typeRefCounts[type] = count;
  }
  report.assetsReferencedByType = typeRefCounts;

  // Orphan assets (not referenced by anything)
  const allAssetIds = await sanity.fetch(`*[_type == "asset"]._id`);
  const referencedAssetIds = await sanity.fetch(`*[_type == "asset" && count(*[references(^._id)]) > 0]._id`);
  const neverReferencedIds = allAssetIds.filter(id => !referencedAssetIds.includes(id));
  report.orphanAssetCount = neverReferencedIds.length;
  report.orphanAssetIds = neverReferencedIds;

  return report;
}

// ─────────────────────────────────────────────────────────────────────────────
// STAGE 5: MEDIA STRUCTURE
// ─────────────────────────────────────────────────────────────────────────────
async function auditMediaStructure() {
  const report = {};

  const expectedDirs = ['work', 'services', 'logos', 'clients', 'team'];
  const actualDirs = [];
  try {
    const entries = await readdir(ASSETS_DIR, { withFileTypes: true });
    actualDirs.push(...entries.filter(e => e.isDirectory()).map(e => e.name));
  } catch {}

  report.expectedDirectories = expectedDirs;
  report.actualDirectories = actualDirs;
  report.missingDirectories = expectedDirs.filter(d => !actualDirs.includes(d));
  report.unexpectedDirectories = actualDirs.filter(d => !expectedDirs.includes(d));

  // Count files per directory
  const counts = {};
  for (const dir of actualDirs) {
    let c = 0;
    for await (const _ of walkDir(join(ASSETS_DIR, dir))) c++;
    counts[dir] = c;
  }
  report.filesPerDirectory = counts;

  return report;
}

// ─────────────────────────────────────────────────────────────────────────────
// STAGE 6: SSOT VALIDATION
// ─────────────────────────────────────────────────────────────────────────────
async function auditSSOT() {
  const report = {};

  // Neon content items by type
  const neonItems = await pgClient.query(`SELECT id, content_type, data FROM content_items`);
  const neonByType = {};
  const neonById = {};
  for (const row of neonItems.rows) {
    neonByType[row.content_type] = neonByType[row.content_type] || [];
    neonByType[row.content_type].push(row);
    neonById[row.id] = row;
  }

  // Sanity documents
  const sanityDocs = await sanity.fetch(`*[!(_id in path("drafts.**"))] { _id, _type, "slug": slug.current, title, name, data }`);
  const sanityByType = {};
  const sanityById = {};
  for (const doc of sanityDocs) {
    sanityByType[doc._type] = sanityByType[doc._type] || [];
    sanityByType[doc._type].push(doc);
    sanityById[doc._id] = doc;
  }

  // Map content_type ↔ _type
  const typeMap = {
    asset: 'asset',
    caseStudy: 'caseStudy',
    post: 'post',
    person: 'person',
    client: 'client',
    industry: 'industry',
    service: 'service',
    singletonPage: 'singletonPage',
    siteSettings: 'siteSettings',
    syncStatus: 'syncStatus',
    taxonomy: 'taxonomy',
    engagement: 'engagement',
    contactSubmission: 'contactSubmission',
    page: 'singletonPage',
  };

  const comparisons = [];
  for (const [neonType, sanityType] of Object.entries(typeMap)) {
    const neonIds = new Set((neonByType[neonType] || []).map(r => r.id));
    const sanityIds = new Set((sanityByType[sanityType] || []).map(d => d._id));

    const inBoth = [...neonIds].filter(id => sanityIds.has(id));
    const onlyNeon = [...neonIds].filter(id => !sanityIds.has(id));
    const onlySanity = [...sanityIds].filter(id => !neonIds.has(id));

    comparisons.push({
      neonType,
      sanityType,
      neonCount: neonIds.size,
      sanityCount: sanityIds.size,
      match: neonIds.size === sanityIds.size && onlyNeon.length === 0 && onlySanity.length === 0,
      inBoth,
      onlyNeon,
      onlySanity,
    });
  }
  report.comparisons = comparisons;

  // Compare slugs where possible
  const slugMismatches = [];
  for (const comp of comparisons) {
    for (const id of comp.inBoth) {
      const neonSlug = neonById[id]?.data?.slug;
      const sanitySlug = sanityById[id]?.slug;
      if (neonSlug && sanitySlug && neonSlug !== sanitySlug) {
        slugMismatches.push({ id, neonSlug, sanitySlug });
      }
    }
  }
  report.slugMismatches = slugMismatches;

  return report;
}

// ─────────────────────────────────────────────────────────────────────────────
// REPORT GENERATION
// ─────────────────────────────────────────────────────────────────────────────
function buildReport(neon, sanity, assets, relationships, media, ssot) {
  const lines = [];
  lines.push('# WUGWEB CONTENT PIPELINE — DATA AUDIT REPORT');
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push('');
  lines.push('---');
  lines.push('');

  // Stage 1
  lines.push('## STAGE 1: NEON AUDIT');
  lines.push('');
  lines.push(`Tables found: ${neon.tables.join(', ')}`);
  lines.push('');
  lines.push('| Table | Exists | Row Count | PK | FK | Nullable Fields | Last Updated |');
  lines.push('|---|---|---|---|---|---|---|');
  for (const t of neon.tableDetails) {
    lines.push(`| ${t.table} | ${t.exists ? '✓' : '✗'} | ${t.count} | ${t.primaryKey} | ${t.foreignKeys.length || '—'} | ${t.nullableFields.join(', ') || '—'} | ${t.lastUpdated} |`);
  }
  lines.push('');

  lines.push('### Content Items by Type');
  lines.push('| Content Type | Count | Last Updated |');
  lines.push('|---|---|---|');
  for (const r of neon.contentTypeCounts) {
    lines.push(`| ${r.content_type} | ${r.count} | ${formatDate(r.last_updated)} |`);
  }
  lines.push('');

  lines.push('### Missing Fields in content_items.data');
  lines.push(`- Missing slug: ${neon.missingInContentItems.missing_slug}`);
  lines.push(`- Missing title: ${neon.missingInContentItems.missing_title}`);
  lines.push(`- Missing media: ${neon.missingInContentItems.missing_media}`);
  lines.push('');

  lines.push('### Duplicate content_item IDs');
  lines.push(neon.duplicateContentItemIds.length
    ? neon.duplicateContentItemIds.map(r => `- ${r.id}: ${r.c} duplicates`).join('\n')
    : '- None');
  lines.push('');

  lines.push('### Orphaned content_relations');
  lines.push(`- Orphan sources: ${neon.orphanedRelations.orphanedSources.length}`);
  lines.push(`- Orphan targets: ${neon.orphanedRelations.orphanedTargets.length}`);
  if (neon.orphanedRelations.orphanedSources.length + neon.orphanedRelations.orphanedTargets.length > 0) {
    lines.push('Details:');
    for (const r of [...neon.orphanedRelations.orphanedSources, ...neon.orphanedRelations.orphanedTargets]) {
      lines.push(`  - relation ${r.id}: ${r.source_id} → ${r.target_id} (${r.relation_type})`);
    }
  }
  lines.push('');

  lines.push('### Duplicate content_relations');
  lines.push(neon.duplicateRelations.length
    ? neon.duplicateRelations.map(r => `- ${r.source_id} → ${r.target_id} (${r.relation_type}): ${r.c}`).join('\n')
    : '- None');
  lines.push('');

  // Stage 2
  lines.push('## STAGE 2: SANITY AUDIT');
  lines.push('');
  lines.push(`Total documents (including drafts): ${sanity.totalDocuments}`);
  lines.push('');
  lines.push('| Type | Exists | Count | Published | Drafts | Singleton | Referenced By |');
  lines.push('|---|---|---|---|---|---|---|');
  for (const t of sanity.documentTypes) {
    lines.push(`| ${t.type} | ${t.exists ? '✓' : '✗'} | ${t.count} | ${t.published} | ${t.drafts} | ${t.singleton ? 'Yes' : 'No'} | ${t.referencedBy} |`);
  }
  lines.push('');

  // Stage 3
  lines.push('## STAGE 3: ASSET AUDIT (HIGHEST PRIORITY)');
  lines.push('');
  lines.push(`- Neon asset records: ${assets.neonAssetCount}`);
  lines.push(`- Sanity asset documents: ${assets.sanityAssetCount}`);
  lines.push(`- Files on disk under public/assets: ${assets.diskAssetCount}`);
  lines.push('');

  lines.push('### Asset Breakdown');
  lines.push('#### By mediaType');
  for (const [k, v] of Object.entries(assets.assetBreakdown.byMediaType)) {
    lines.push(`- ${k}: ${v}`);
  }
  lines.push('');
  lines.push('#### By assetType');
  for (const [k, v] of Object.entries(assets.assetBreakdown.byAssetType)) {
    lines.push(`- ${k}: ${v}`);
  }
  lines.push('');
  lines.push('#### By assetGroup');
  for (const [k, v] of Object.entries(assets.assetBreakdown.byAssetGroup)) {
    lines.push(`- ${k}: ${v}`);
  }
  lines.push('');

  lines.push('### Asset Validation');
  lines.push(`- Missing title/name: ${assets.assetValidation.missingTitle}`);
  lines.push(`- Missing slug: ${assets.assetValidation.missingSlug}`);
  lines.push(`- Missing mediaType: ${assets.assetValidation.missingMediaType}`);
  lines.push(`- Missing relativePath: ${assets.assetValidation.missingPath}`);
  lines.push(`- Missing status: ${assets.assetValidation.missingStatus}`);
  lines.push('');

  lines.push('### External / Temporary URLs in relativePath');
  lines.push(`Flagged: ${assets.externalUrls.length}`);
  for (const u of assets.externalUrls.slice(0, 50)) {
    lines.push(`- ${u.id} | ${u.name || 'unnamed'} | ${u.path}`);
  }
  if (assets.externalUrls.length > 50) lines.push(`- ... and ${assets.externalUrls.length - 50} more`);
  lines.push('');

  lines.push('### Assets Missing on Disk');
  lines.push(`Count: ${assets.assetsNotOnDisk.length}`);
  for (const a of assets.assetsNotOnDisk.slice(0, 30)) {
    lines.push(`- ${a.id}: ${a.path}`);
  }
  if (assets.assetsNotOnDisk.length > 30) lines.push(`- ... and ${assets.assetsNotOnDisk.length - 30} more`);
  lines.push('');

  lines.push('### Files on Disk Not Referenced in Sanity');
  lines.push(`Count: ${assets.diskFilesNotInSanity.length}`);
  for (const f of assets.diskFilesNotInSanity.slice(0, 30)) {
    lines.push(`- ${f}`);
  }
  if (assets.diskFilesNotInSanity.length > 30) lines.push(`- ... and ${assets.diskFilesNotInSanity.length - 30} more`);
  lines.push('');

  // Stage 4
  lines.push('## STAGE 4: RELATIONSHIP AUDIT');
  lines.push('');
  lines.push(`- Total Neon content_relations: ${relationships.totalNeonRelations}`);
  lines.push(`- Total Sanity reference paths: ${relationships.totalSanityReferencePaths}`);
  lines.push('');
  lines.push('### Neon Relations by Type');
  lines.push('| Relation Type | Count |');
  lines.push('|---|---|');
  for (const r of relationships.neonRelationsByType) {
    lines.push(`| ${r.relation_type} | ${r.count} |`);
  }
  lines.push('');
  lines.push('### Assets Referenced by Type');
  lines.push('| Type | Count |');
  lines.push('|---|---|');
  for (const [k, v] of Object.entries(relationships.assetsReferencedByType)) {
    lines.push(`| ${k} | ${v} |`);
  }
  lines.push('');
  lines.push(`### Orphan Assets (never referenced): ${relationships.orphanAssetCount}`);
  if (relationships.orphanAssetCount > 0) {
    for (const id of relationships.orphanAssetIds.slice(0, 30)) {
      lines.push(`- ${id}`);
    }
    if (relationships.orphanAssetIds.length > 30) lines.push(`- ... and ${relationships.orphanAssetIds.length - 30} more`);
  }
  lines.push('');

  // Stage 5
  lines.push('## STAGE 5: MEDIA STRUCTURE');
  lines.push('');
  lines.push(`Expected directories: ${media.expectedDirectories.join(', ')}`);
  lines.push(`Actual directories: ${media.actualDirectories.join(', ')}`);
  lines.push(`Missing directories: ${media.missingDirectories.length ? media.missingDirectories.join(', ') : 'None'}`);
  lines.push(`Unexpected directories: ${media.unexpectedDirectories.length ? media.unexpectedDirectories.join(', ') : 'None'}`);
  lines.push('');
  lines.push('### Files per directory');
  for (const [k, v] of Object.entries(media.filesPerDirectory)) {
    lines.push(`- ${k}: ${v}`);
  }
  lines.push('');

  // Stage 6
  lines.push('## STAGE 6: SSOT VALIDATION');
  lines.push('');
  lines.push('### Neon vs Sanity Record Comparison');
  lines.push('| Neon Type | Sanity Type | Neon | Sanity | Match | In Both | Only Neon | Only Sanity |');
  lines.push('|---|---|---|---|---|---|---|---|');
  for (const c of ssot.comparisons) {
    lines.push(`| ${c.neonType} | ${c.sanityType} | ${c.neonCount} | ${c.sanityCount} | ${c.match ? '✓' : '✗'} | ${c.inBoth} | ${c.onlyNeon.length} | ${c.onlySanity.length} |`);
  }
  lines.push('');

  lines.push('### Records Only in Neon');
  for (const c of ssot.comparisons) {
    if (c.onlyNeon.length) {
      lines.push(`- ${c.neonType}: ${c.onlyNeon.length} (${c.onlyNeon.slice(0, 10).join(', ')}${c.onlyNeon.length > 10 ? '...' : ''})`);
    }
  }
  lines.push('');

  lines.push('### Records Only in Sanity');
  for (const c of ssot.comparisons) {
    if (c.onlySanity.length) {
      lines.push(`- ${c.sanityType}: ${c.onlySanity.length} (${c.onlySanity.slice(0, 10).join(', ')}${c.onlySanity.length > 10 ? '...' : ''})`);
    }
  }
  lines.push('');

  lines.push('### Slug Mismatches');
  lines.push(ssot.slugMismatches.length
    ? ssot.slugMismatches.map(m => `- ${m.id}: Neon "${m.neonSlug}" vs Sanity "${m.sanitySlug}"`).join('\n')
    : '- None');
  lines.push('');

  // Stage 7
  lines.push('## STAGE 7: FINAL MATRIX');
  lines.push('');
  lines.push('| Entity | Neon | Sanity | Match | Issues |');
  lines.push('|---|---|---|---|---|');
  for (const c of ssot.comparisons) {
    const issues = [];
    if (!c.match) issues.push('count mismatch');
    if (c.onlyNeon.length) issues.push(`${c.onlyNeon.length} only in Neon`);
    if (c.onlySanity.length) issues.push(`${c.onlySanity.length} only in Sanity`);
    const issueStr = issues.length ? issues.join('; ') : '—';
    lines.push(`| ${c.neonType} | ${c.neonCount} | ${c.sanityCount} | ${c.match ? '✓' : '✗'} | ${issueStr} |`);
  }
  // Add assets explicitly
  lines.push(`| Assets (file count) | ${assets.neonAssetCount} | ${assets.sanityAssetCount} | ${assets.neonAssetCount === assets.sanityAssetCount ? '✓' : '✗'} | disk: ${assets.diskAssetCount} |`);
  lines.push('');

  // Scores
  const totalContentRows = neon.tableDetails.find(t => t.table === 'content_items')?.count || 0;
  const missingFields = neon.missingInContentItems.missing_slug + neon.missingInContentItems.missing_title + neon.missingInContentItems.missing_media;
  const integrityIssues =
    neon.duplicateContentItemIds.length +
    neon.orphanedRelations.orphanedSources.length +
    neon.orphanedRelations.orphanedTargets.length +
    neon.duplicateRelations.length +
    assets.externalUrls.length +
    assets.assetsNotOnDisk.length +
    assets.assetValidation.missingTitle +
    assets.assetValidation.missingSlug +
    assets.assetValidation.missingMediaType +
    assets.assetValidation.missingPath +
    assets.assetValidation.missingStatus +
    relationships.orphanAssetCount;

  const mismatchedEntities = ssot.comparisons.filter(c => !c.match).length;
  const totalEntities = ssot.comparisons.length;

  const dataIntegrityScore = Math.max(0, 100 - Math.min(100, integrityIssues * 2));
  const ssotComplianceScore = Math.max(0, Math.round(100 * (totalEntities - mismatchedEntities) / totalEntities));
  const launchReadinessScore = Math.max(0, Math.round((dataIntegrityScore + ssotComplianceScore) / 2 - (assets.externalUrls.length > 0 ? 15 : 0)));

  lines.push('## SUMMARY & SCORES');
  lines.push('');
  lines.push('1. **Missing data**: ' + missingFields + ' fields missing across Neon content_items');
  lines.push('2. **Missing relationships**: ' + (neon.orphanedRelations.orphanedSources.length + neon.orphanedRelations.orphanedTargets.length) + ' orphaned relations');
  lines.push('3. **Broken references**: ' + (neon.orphanedRelations.orphanedSources.length + neon.orphanedRelations.orphanedTargets.length));
  lines.push('4. **Duplicate records**: ' + (neon.duplicateContentItemIds.length + neon.duplicateRelations.length));
  lines.push('5. **Orphan records**: ' + relationships.orphanAssetCount + ' assets never referenced');
  lines.push('6. **External media still remaining**: ' + assets.externalUrls.length);
  lines.push('7. **Data integrity score**: ' + dataIntegrityScore + '/100');
  lines.push('8. **SSOT compliance score**: ' + ssotComplianceScore + '/100');
  lines.push('9. **Launch readiness score**: ' + launchReadinessScore + '/100');
  lines.push('');

  lines.push('---');
  lines.push('END OF REPORT');

  return lines.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  await pgClient.connect();
  console.log('Connected to Neon and Sanity. Running audit...');

  const neon = await auditNeon();
  console.log('Stage 1 complete (Neon)');

  const sanity = await auditSanity();
  console.log('Stage 2 complete (Sanity)');

  const assets = await auditAssets();
  console.log('Stage 3 complete (Assets)');

  const relationships = await auditRelationships();
  console.log('Stage 4 complete (Relationships)');

  const media = await auditMediaStructure();
  console.log('Stage 5 complete (Media Structure)');

  const ssot = await auditSSOT();
  console.log('Stage 6 complete (SSOT)');

  const report = buildReport(neon, sanity, assets, relationships, media, ssot);

  // Write report
  const fs = await import('fs');
  fs.writeFileSync(REPORT_PATH, report, 'utf8');

  console.log('\n=== AUDIT COMPLETE ===');
  console.log(`Report written to: ${REPORT_PATH}`);

  await pgClient.end();
}

main().catch(async (err) => {
  console.error('Audit failed:', err);
  try { await pgClient.end(); } catch {}
  process.exit(1);
});
