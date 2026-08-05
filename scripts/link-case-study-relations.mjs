#!/usr/bin/env node
/**
 * Backfill caseStudy.clientRef / industryRef from text fields → Sanity references.
 * Free-tier safe: batched patches, no CDN uploads.
 *
 *   DRY_RUN=1 node scripts/link-case-study-relations.mjs
 *   node scripts/link-case-study-relations.mjs
 */
import { createClient } from '@sanity/client';

const DRY_RUN = process.env.DRY_RUN === '1';
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

const norm = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');

async function main() {
  const [caseStudies, clients, industries] = await Promise.all([
    client.fetch(`*[_type=="caseStudy"]{_id, client, industry, clientRef, industryRef}`),
    client.fetch(`*[_type=="client"]{_id, name, "slug": slug.current}`),
    client.fetch(`*[_type=="industry"]{_id, name, "slug": slug.current}`),
  ]);

  let linkedClient = 0;
  let linkedIndustry = 0;
  let skipped = 0;

  for (const cs of caseStudies) {
    const patch = {};

    if (!cs.clientRef?._ref && cs.client) {
      const n = norm(cs.client);
      const match =
        clients.find((c) => norm(c.name) === n) ||
        clients.find((c) => norm(c.slug) === n) ||
        clients.find((c) => n.includes(norm(c.name)) || norm(c.name).includes(n));
      if (match) {
        patch.clientRef = { _type: 'reference', _ref: match._id };
        linkedClient++;
      }
    }

    if (!cs.industryRef?._ref && cs.industry) {
      const n = norm(cs.industry);
      const match =
        industries.find((i) => norm(i.name) === n) ||
        industries.find((i) => n.includes(norm(i.name)) || norm(i.name).includes(n));
      if (match) {
        patch.industryRef = { _type: 'reference', _ref: match._id };
        linkedIndustry++;
      }
    }

    if (!Object.keys(patch).length) {
      skipped++;
      continue;
    }

    console.log(cs._id, patch.clientRef?._ref || '', patch.industryRef?._ref || '');
    if (!DRY_RUN) {
      await client.patch(cs._id).set(patch).commit();
    }
  }

  console.log(JSON.stringify({ dryRun: DRY_RUN, linkedClient, linkedIndustry, skipped, total: caseStudies.length }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
