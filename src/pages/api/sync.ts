import type { APIRoute } from 'astro';
import { connect } from '../../lib/db';
import { safeEqual } from '../../lib/indexnow';
import { MIN_TOKEN_LENGTH } from '../../lib/bearer';

/**
 * POST /api/sync
 *
 * Syncs a Sanity document to Neon. Called by:
 *   1. A Sanity document-level action button ("Publish to Site")
 *   2. The Sanity sync dashboard tool (bulk sync)
 *   3. A Sanity webhook on document publish
 *
 * Body: { doc: SanityDocument }
 * Auth: X-Sync-Token header matching the NEON_SYNC_SECRET env var.
 *
 * NEON_SYNC_SECRET is its own random secret (32+ chars). It is deliberately
 * NOT the Sanity editor token: whoever calls this route should not also hold
 * Sanity write access. Fails closed: no secret configured, no sync.
 */

export const prerender = false;

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

/** Largest request body accepted (bytes). A full bulk sync is well under this. */
const MAX_BODY_BYTES = 2 * 1024 * 1024;
const MAX_DOCS = 500;

// Map Sanity types to Neon content_type values. Anything not listed is refused.
const TYPE_MAP: Record<string, string> = {
  service: 'service',
  caseStudy: 'caseStudy',
  post: 'post',
  person: 'person',
  siteSettings: 'siteSettings',
  singletonPage: 'page',
  client: 'client',
  industry: 'industry',
  engagement: 'engagement',
  taxonomy: 'taxonomy',
  contactSubmission: 'contactSubmission',
  asset: 'asset',
  platformProfile: 'platformProfile',
  syncStatus: 'syncStatus',
};

export const POST: APIRoute = async ({ request, locals }) => {
  const expected = locals.runtime.env.NEON_SYNC_SECRET;
  if (typeof expected !== 'string' || expected.length < MIN_TOKEN_LENGTH) {
    return json({ error: 'Sync is not configured' }, 503);
  }
  if (!safeEqual(request.headers.get('X-Sync-Token') ?? '', expected)) {
    return json({ error: 'Unauthorized' }, 401);
  }

  const declared = Number(request.headers.get('Content-Length') || 0);
  if (declared > MAX_BODY_BYTES) return json({ error: 'Payload too large' }, 413);
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json({ error: 'Payload too large' }, 413);

  let body: { doc?: Record<string, unknown>; docs?: Record<string, unknown>[] };
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const docs = Array.isArray(body?.docs) ? body.docs : body?.doc ? [body.doc] : [];
  if (!docs.length) return json({ error: 'No docs provided' }, 400);
  if (docs.length > MAX_DOCS) return json({ error: `At most ${MAX_DOCS} docs per call` }, 413);

  // Validate every doc before touching the database: known type, plain
  // published id. Drafts never reach Neon, because Neon marks rows published.
  for (const d of docs) {
    const id = d && typeof d === 'object' ? d._id : undefined;
    if (typeof id !== 'string' || !/^[A-Za-z0-9_][A-Za-z0-9_.-]{0,127}$/.test(id) || id.startsWith('drafts.') || id.startsWith('versions.')) {
      return json({ error: 'Every doc needs a published _id' }, 400);
    }
    if (typeof d._type !== 'string' || !(d._type in TYPE_MAP)) {
      return json({ error: `Unsupported _type on ${id}` }, 400);
    }
  }

  const client = await connect(locals.runtime.env);

  try {
    // Map Sanity content type → Neon content_type.
    // Governance: owner comes from the doc (vedanshu|wugweb|both);
    // fall back to `wugweb` (agency default) — never assume vedanshu.
    const docOwner = (d: Record<string, unknown>): string => {
      const o = String(d.owner || '').toLowerCase();
      if (o === 'vedanshu' || o === 'wugweb' || o === 'both') return o;
      return 'wugweb';
    };

    // Start sync log entry
    const logResult = await client.query(
      `insert into sync_log (source, target, status, entity_type, entity_count, started_at)
       values ('sanity', 'neon', 'running', $1, $2, now())
       returning id`,
      [docs[0]._type as string, docs.length]
    );
    const logId = logResult.rows[0]?.id;
    let successCount = 0;
    let errorMessage = '';
    let relationErrors = 0;

    for (const doc of docs) {
      try {
        const type = doc._type as string;
        const id = doc._id as string;
        const contentType = TYPE_MAP[type];
        const owner = docOwner(doc);

        // Media fields (images) — store as references, not raw data.
        // Actual files stay in Sanity CDN or get copied to R2 separately.
        // The data field stores the full document minus internal Sanity metadata.
        const { _id, _type, _rev, _createdAt, _updatedAt, ...cleanData } = doc;

        // Clean references: replace {_ref: "xxx"} with just the ref string
        // so Neon stores clean data
        const data = JSON.parse(JSON.stringify(cleanData));

        await client.query(
          `insert into content_items (id, content_type, status, owner, data, updated_at)
           values ($1, $2, 'published', $3, $4::jsonb, now())
           on conflict (id) do update set
             content_type = excluded.content_type,
             status = 'published',
             owner = excluded.owner,
             data = excluded.data,
             updated_at = now()`,
          [id, contentType, owner, JSON.stringify(data)]
        );

        // Handle relations
        // For references in the doc (e.g. services[] on caseStudy), create content_relations
        for (const [field, value] of Object.entries(cleanData)) {
          if (Array.isArray(value)) {
            for (const item of value) {
              if (item?._ref) {
                const relationType = `${type}→${field}`;
                await client.query(
                  `insert into content_relations (source_id, target_id, relation_type, owner)
                   values ($1, $2, $3, $4)
                   on conflict (source_id, target_id, relation_type) do nothing`,
                  [id, item._ref, relationType, owner]
                ).catch((e: unknown) => {
                  relationErrors++;
                  console.error(`sync: relation ${id} -> ${item._ref} failed`, e);
                });
              }
            }
          }
        }

        successCount++;
      } catch (e: unknown) {
        // Full error goes to the log and sync_log; the response stays generic.
        const msg = e instanceof Error ? e.message : String(e);
        console.error(`sync: ${doc._id} failed`, e);
        errorMessage += `${doc._id}: ${msg}\n`;
      }
    }

    // Update sync log
    await client.query(
      `update sync_log set status = $1, entity_count = $2, error_message = $3, completed_at = now()
       where id = $4`,
      [errorMessage ? 'failed' : 'completed', successCount, errorMessage || null, logId]
    );

    return json({
      synced: successCount,
      total: docs.length,
      failed: docs.length - successCount,
      relationErrors,
    }, 200);
  } finally {
    client.release();
  }
};
