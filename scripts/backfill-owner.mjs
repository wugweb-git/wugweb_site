#!/usr/bin/env node
/**
 * Backfill governance `owner` on client / caseStudy / post / asset.
 * Values: vedanshu | wugweb | both
 *
 * Defaults agency marketing content to `wugweb` (not vedanshu — see governance.md).
 * Personal signals → vedanshu. Shared brand assets → both.
 *
 * Usage: node scripts/backfill-owner.mjs [--dry-run]
 */
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
try {
  const env = fs.readFileSync(path.join(ROOT, '.env'), 'utf8');
  for (const line of env.split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m && !process.env[m[1].trim()]) {
      process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
    }
  }
} catch {}

const DRY = process.argv.includes('--dry-run');
const token = process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN;
if (!token) {
  console.error('Missing SANITY_TOKEN');
  process.exit(1);
}

const client = createClient({
  projectId: 'splvhmk1',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

const OWNERS = new Set(['vedanshu', 'wugweb', 'both']);

function personalName(s) {
  return /vedanshu|srivastava/i.test(String(s || ''));
}

function inferClient(doc) {
  const name = doc.name || '';
  const slug = doc.slug?.current || '';
  if (personalName(name) || personalName(slug)) return 'vedanshu';
  // Self / studio as client under the agency book → shared
  if (/^wugweb$/i.test(name.trim()) || slug === 'wugweb') return 'both';
  return 'wugweb';
}

function inferCaseStudy(doc) {
  // Agency book by default. Do NOT treat team member "Vedanshu" as ownership.
  // Personal portfolio only when slug/title explicitly marks it.
  const slug = String(doc.slug?.current || '');
  const title = String(doc.title || '');
  if (/^personal-|\/personal\/|-portfolio-|vedanshu-/i.test(slug) || /\bpersonal portfolio\b/i.test(title)) {
    return 'vedanshu';
  }
  return 'wugweb';
}

function inferPost(doc) {
  // Agency site blog = wugweb ownership by default; Author stays separate.
  // Only mark personal if explicitly tagged.
  const tags = (doc.tags || []).join(' ').toLowerCase();
  if (/\bpersonal\b|\bvedanshu\b/.test(tags)) return 'vedanshu';
  return 'wugweb';
}

function inferAsset(doc) {
  const pathStr = `${doc.relativePath || ''} ${doc.sitePath || ''} ${doc.assetGroup || ''} ${doc.assetType || ''}`;
  if (personalName(pathStr) || personalName(doc.ownerId)) return 'vedanshu';
  if (/Brand Asset|Shared Asset|\/brand\//i.test(pathStr) || doc.assetGroup === 'Brand') return 'both';
  return 'wugweb';
}

async function backfill(type, infer) {
  const docs = await client.fetch(
    `*[_type == $type]{_id, name, title, client, slug, tags, team, relativePath, sitePath, assetGroup, assetType, ownerId, owner}`,
    { type }
  );
  const counts = { vedanshu: 0, wugweb: 0, both: 0, skipped: 0, patched: 0 };
  const tx = client.transaction();
  let ops = 0;

  for (const doc of docs) {
    const next = infer(doc);
    if (!OWNERS.has(next)) {
      counts.skipped++;
      continue;
    }
    if (doc.owner === next) {
      counts.skipped++;
      counts[next]++;
      continue;
    }
    counts[next]++;
    counts.patched++;
    ops++;
    if (!DRY) tx.patch(doc._id, (p) => p.set({ owner: next }));
  }

  if (!DRY && ops > 0) await tx.commit({ visibility: 'async' });
  return { type, total: docs.length, ...counts, dryRun: DRY };
}

const report = {
  generatedAt: new Date().toISOString(),
  dryRun: DRY,
  results: [],
};

report.results.push(await backfill('client', inferClient));
report.results.push(await backfill('caseStudy', inferCaseStudy));
report.results.push(await backfill('post', inferPost));
report.results.push(await backfill('asset', inferAsset));

fs.writeFileSync(
  path.join(ROOT, 'docs', 'owner-backfill-report.json'),
  JSON.stringify(report, null, 2)
);
console.log(JSON.stringify(report, null, 2));
