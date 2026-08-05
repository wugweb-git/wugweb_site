import type { APIRoute } from 'astro';
import { connect, connectionStringFrom } from '../../lib/db';

/**
 * POST /api/sync
 *
 * Syncs a Sanity document to Neon. Called by:
 *   1. A Sanity document-level action button ("Publish to Site")
 *   2. The Sanity sync dashboard tool (bulk sync)
 *   3. A Sanity webhook on document publish
 *
 * Body: { doc: SanityDocument }
 * Auth: X-Sync-Token header matching SANITY_SYNC_TOKEN env var
 */

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  // Auth
  const syncToken = request.headers.get('X-Sync-Token');
  const expectedToken = locals.runtime.env.SANITY_SYNC_TOKEN;
  if (expectedToken && syncToken !== expectedToken) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  let body: { doc?: Record<string, unknown>; docs?: Record<string, unknown>[] };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const docs = body.docs ?? (body.doc ? [body.doc] : []);
  if (!docs.length) {
    return new Response(JSON.stringify({ error: 'No docs provided' }), { status: 400 });
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

    for (const doc of docs) {
      try {
        const type = doc._type as string;
        const id = (doc._id as string) || (doc.slug as string) || (doc.pageId as string);

        // Map Sanity types to Neon content_type values
        const typeMap: Record<string, string> = {
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
        const contentType = typeMap[type] || type;
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
                ).catch(() => { /* skip bad refs */ });
              }
            }
          }
        }

        successCount++;
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        errorMessage += `${doc._id || doc._type}: ${msg}\n`;
      }
    }

    // Update sync log
    await client.query(
      `update sync_log set status = $1, entity_count = $2, error_message = $3, completed_at = now()
       where id = $4`,
      [errorMessage ? 'failed' : 'completed', successCount, errorMessage || null, logId]
    );

    return new Response(JSON.stringify({
      synced: successCount,
      total: docs.length,
      errors: errorMessage || null,
    }), { status: 200 });
  } finally {
    await client.end();
  }
};
