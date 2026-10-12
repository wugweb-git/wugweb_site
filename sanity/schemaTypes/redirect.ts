import { defineType, defineField } from 'sanity';

/**
 * Redirect Manager — old URL → new URL with 301/302 status.
 * Applied by src/middleware.ts (matcher: src/lib/redirects.ts), and only when
 * the path is not a live page, so a rule can never shadow a real route.
 */

// Keep in step with src/lib/redirects.ts (normalizePath / isReservedPath).
const norm = (v: unknown) => {
  let p = String(v ?? '').trim().split(/[?#]/)[0].toLowerCase();
  if (!p.startsWith('/')) p = `/${p}`;
  p = p.replace(/\/{2,}/g, '/');
  return p.length > 1 ? p.replace(/\/+$/, '') : p;
};
const RESERVED = ['/api', '/assets', '/_astro'];
const RESERVED_EXACT = ['/sitemap.xml', '/robots.txt'];
const isReserved = (p: string) => RESERVED_EXACT.includes(p) || RESERVED.some((r) => p === r || p.startsWith(`${r}/`));
const folderPrefix = (v: string) => (v.trim().endsWith('/*') ? norm(v.trim().slice(0, -2) || '/') : null);

async function validateSource(value: any, ctx: any): Promise<true | string> {
  const v = String(value ?? '').trim();
  if (!v) return true; // required() reports this
  if (!v.startsWith('/')) return 'Must be a path starting with /, e.g. /old-page';
  if (v.includes('?') || v.includes('#')) return 'Leave out the query string — it is carried over automatically.';
  const star = v.indexOf('*');
  if (star !== -1 && !(v.endsWith('/*') && star === v.length - 1)) return 'Use * only as a trailing /*, e.g. /old-blog/*';
  const key = folderPrefix(v) ?? norm(v);
  if (isReserved(key)) return `${key} is reserved (API, assets, build files, sitemap, robots) and cannot be redirected.`;
  const client = ctx.getClient({ apiVersion: '2026-01-01' });
  const id = String(ctx.document?._id ?? '').replace(/^drafts\./, '');
  const others: string[] = await client.fetch(
    `*[_type == "redirect" && !(_id in path("drafts.**")) && _id != $id].source`, { id },
  );
  const mine = (folderPrefix(v) ? '*' : '') + key;
  const clash = others.find((o) => (folderPrefix(o) ? '*' : '') + (folderPrefix(o) ?? norm(o)) === mine);
  return clash ? `Another redirect already uses this source (${clash}). Edit that one instead.` : true;
}

function validateDestination(value: any, ctx: any): true | string {
  const v = String(value ?? '').trim();
  if (!v) return true; // required() reports this
  if (!v.startsWith('/') && !/^https?:\/\//i.test(v)) return 'Use a path starting with / or a full https:// URL.';
  const src = String(ctx.document?.source ?? '').trim();
  if (!src || /^https?:/i.test(v)) return true;
  const srcKey = folderPrefix(src) ?? norm(src);
  const destKey = folderPrefix(v) ?? norm(v);
  if (srcKey === destKey) return 'This points back at its own source, so it would loop. Pick a different destination.';
  return true;
}
export default defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  groups: [
    { name: 'rules', title: 'Rules' },
    { name: 'stats', title: 'Stats' },
  ],
  fields: [
    defineField({ name: 'source', type: 'string', title: 'Old URL path', description: 'e.g. /old-page or /blog/old-post. For a whole folder use /old-blog/* (only as a trailing /*). Case and trailing slash do not matter.', validation: (r) => r.required().custom(validateSource), group: 'rules' }),
    defineField({ name: 'destination', type: 'string', title: 'New URL path', description: 'e.g. /services or /blog/new-post. With a folder source, /new-blog/* keeps the rest of the path.', validation: (r) => r.required().custom(validateDestination), group: 'rules' }),
    defineField({
      name: 'statusCode',
      type: 'number',
      title: 'Status code',
      options: { list: [{ title: '301 Moved Permanently', value: 301 }, { title: '302 Found (temporary)', value: 302 }] },
      initialValue: 301,
      validation: (r) => r.required(),
      group: 'rules',
    }),
    defineField({ name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: true, group: 'rules' }),
    defineField({ name: 'note', type: 'string', title: 'Note', description: 'Why this redirect exists', group: 'rules' }),

    // ── Stats ── NOT tracked. Counting hits would cost one Sanity write per
    // redirect followed, which breaks governance Rule 1. Kept read-only.
    defineField({ name: 'hits', type: 'number', title: 'Hits', readOnly: true, description: 'Not tracked — counting would cost a Sanity write per visit (free-tier rule).', group: 'stats' }),
    defineField({ name: 'lastUsedAt', type: 'datetime', title: 'Last used', readOnly: true, group: 'stats' }),

    // ── Sync ──
    defineField({ name: 'neonSynced', type: 'boolean', readOnly: true, hidden: true, initialValue: false }),
    defineField({ name: 'neonSyncedAt', type: 'datetime', readOnly: true, hidden: true }),
  ],
  orderings: [
    { name: 'sourceAsc', title: 'Source A-Z', by: [{ field: 'source', direction: 'asc' }] },
    { name: 'hitsDesc', title: 'Most hit', by: [{ field: 'hits', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'source', subtitle: 'destination', statusCode: 'statusCode', enabled: 'enabled', hits: 'hits' },
    prepare: ({ title, subtitle, statusCode, enabled }: any) => {
      // Row title reads as the rule itself: "/old → /new · 301".
      return {
        title: `${title || '?'} → ${subtitle || '?'} · ${statusCode || 301}`,
        subtitle: enabled === false ? 'Disabled' : undefined,
      };
    },
  },
});
