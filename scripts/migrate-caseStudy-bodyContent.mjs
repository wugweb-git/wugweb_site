#!/usr/bin/env node
/**
 * Migrate legacy caseStudy fields (about, challenges, solutions, impact, designPhilosophy, galleryPaths)
 * into a single bodyContent blockContent array.
 *
 * Safety: idempotent — skips docs that already have bodyContent with content.
 * Run: SANITY_TOKEN=sk... node scripts/migrate-caseStudy-bodyContent.mjs
 *      SANITY_TOKEN=sk... node scripts/migrate-caseStudy-bodyContent.mjs --apply
 */
import { createClient } from '@sanity/client';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const token = process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN;
if (!token) { console.error('Missing SANITY_TOKEN'); process.exit(1); }
const c = createClient({ projectId:'splvhmk1', dataset:'production', apiVersion:'2026-07-28', token, useCdn:false });
const APPLY = process.argv.includes('--apply');
const OUT_PATH = join(dirname(fileURLToPath(import.meta.url)), '../docs/caseStudy-bodyContent-migration.json');

const normalize = (s = '') => String(s).toLowerCase().replace(/[^a-z0-9]/g, '').trim();

function blockFromText(text, { style = 'normal', key = 'block' } = {}) {
  const normalized = String(text || '').trim();
  if (!normalized) return null;
  return {
    _key: key,
    _type: 'block',
    style,
    markDefs: [],
    children: [{ _key: `${key}-child`, _type: 'span', text: normalized }],
  };
}

function countBodyWords(body) {
  if (!Array.isArray(body)) return 0;
  return body
    .filter(b => b?._type === 'block')
    .flatMap(b => (b.children || []).map(ch => String(ch?.text || '').split(/\s+/).filter(Boolean)))
    .flat().length;
}

// Build a single bodyContent block from about text
function buildAboutBlock(aboutText) {
  if (!aboutText || aboutText.trim().length < 10) return null;
  const text = aboutText.trim().replace(/\n\s*/g, ' ').substring(0, 3000);
  return blockFromText(text, { key: aboutKey() });
}

function buildSectionHeading(title, key) {
  return blockFromText(title, { style: 'h2', key });
}

// Build challenge/impact/solution blocks
function buildSectionBlocks(items, sectionTitle, headingTitle) {
  if (!items || items.length === 0) return [];
  const blocks = [];
  const heading = buildSectionHeading(headingTitle, `${sectionTitle}-heading`);
  if (heading) blocks.push(heading);
  items.forEach((item, i) => {
    const title = item.title || `Item ${i + 1}`;
    const body = item.body || '';
    if (title) blocks.push(blockFromText(title, { style: 'h3', key: sectionTitleChildKey(sectionTitle, i) }));
    if (body) blocks.push(blockFromText(body, { key: sectionBodyChildKey(sectionTitle, i) }));
  });
  return blocks.filter(Boolean);
}

function buildGalleryBlocks(galleryPaths) {
  if (!galleryPaths || galleryPaths.length === 0) return [];
  const blocks = [];
  const heading = buildSectionHeading('Gallery', 'gallery-heading');
  if (heading) blocks.push(heading);
  galleryPaths.forEach((path, i) => {
    if (!path) return;
    blocks.push({
      _key: galleryKey(i),
      _type: 'mediaUrl',
      url: path,
      caption: '',
      alt: '',
    });
  });
  return blocks;
}

// Helper key generators (deterministic per doc)
function aboutKey() { return 'about'; }
function sectionKey(section, i) { return `${section}-${i}`; }
function sectionTitleChildKey(section, i) { return `${section}-title-${i}`; }
function sectionBodyChildKey(section, i) { return `${section}-body-${i}`; }
function galleryKey(i) { return `gal-${i}`; }

async function main() {
  console.log(`\n🧬 CaseStudy bodyContent migration  [${APPLY ? 'APPLY' : 'DRY-RUN'}]\n`);

  // 1. Fetch all caseStudy docs (only what we need)
  const docs = await c.fetch(`*[_type == "caseStudy"] { _id, title, summary, about, challenges, solutions, impact, designPhilosophy, galleryPaths, bodyContent }`);
  const total = docs.length;
  console.log(`Found ${total} caseStudy docs`);

  const migrated = [];
  const skipped = [];
  const failed = [];

  for (const doc of docs) {
    // Skip if bodyContent already has content
    if (doc.bodyContent && countBodyWords(doc.bodyContent) > 0) {
      skipped.push(doc._id);
      continue;
    }

    try {
      // Build bodyContent blocks
      const blocks = [];

      // 1) About section
      if (doc.about) blocks.push(buildAboutBlock(doc.about));
      if (!doc.about && doc.summary && countBodyWords([{_type:'block', style:'normal', children:[{_key:'c', _type:'span', text:doc.summary}, {_key:'m', _type:'mark', annotations:[], decorators:[]}]}]) > 0) {
        blocks.push(buildAboutBlock(doc.summary));
      }

      // 2) Challenges section
      if (doc.challenges && doc.challenges.length > 0) {
        blocks.push(...buildSectionBlocks(doc.challenges, 'challenge', 'Challenges'));
      }

      // 3) Solutions section
      if (doc.solutions && doc.solutions.length > 0) {
        blocks.push(...buildSectionBlocks(doc.solutions, 'solution', 'Solutions'));
      }

      // 4) Design Philosophy section
      if (doc.designPhilosophy && doc.designPhilosophy.trim().length > 0) {
        blocks.push(buildSectionHeading('Design Philosophy', 'design-philosophy-heading'));
        blocks.push(blockFromText(doc.designPhilosophy.trim().substring(0, 2000), { key: 'design-philosophy' }));
      }

      // 5) Impact section
      if (doc.impact && doc.impact.length > 0) {
        blocks.push(...buildSectionBlocks(doc.impact, 'impact', 'Impact'));
      }

      // 6) Gallery section
      if (doc.galleryPaths?.length > 0) {
        blocks.push(...buildGalleryBlocks(doc.galleryPaths));
      }

      if (blocks.length === 0) {
        skipped.push(doc._id);
        continue;
      }

      const update = { bodyContent: blocks };
      const legacyFieldsToUnset = ['about', 'challenges', 'solutions', 'impact', 'designPhilosophy', 'galleryPaths'];
      if (APPLY) {
        await c.patch(doc._id).set(update).unset(legacyFieldsToUnset).commit();
        migrated.push(doc._id);
        console.log(`  ✅ migrated ${doc._id} (${blocks.length} blocks, removed legacy fields)`);
      } else {
        migrated.push(doc._id);
        console.log(`  [migrate] ${doc._id} would get ${blocks.length} blocks and unset ${legacyFieldsToUnset.join(', ')}`);
      }
    } catch (e) {
      failed.push({ _id: doc._id, error: e.message?.substring(0, 100) });
      console.error(`  ❌ ${doc._id}: ${e.message?.substring(0, 100)}`);
    }
  }

  const out = {
    mode: APPLY ? 'applied' : 'dry-run',
    generatedAt: new Date().toISOString(),
    stats: {
      total,
      migrated: migrated.length,
      skipped: skipped.length,
      failed: failed.length,
    },
    skippedIds: skipped,
    failedIds: failed.map(f => f._id),
  };
  fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2), 'utf8');

  console.log(`\nMigrated: ${out.stats.migrated}`);
  console.log(`Skipped (already has bodyContent): ${out.stats.skipped}`);
  console.log(`Failed: ${out.stats.failed}`);
  console.log(`\nPlan written to ${OUT_PATH}`);

  if (!APPLY) { console.log('\n⚠️ DRY RUN — nothing changed. Re-run with --apply.'); }
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });