import { defineType, defineField } from 'sanity';

/**
 * Redirect Manager — old URL → new URL with 301/302 status.
 * Consumed by the Cloudflare Worker redirect handler.
 */
export default defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  groups: [
    { name: 'rules', title: 'Rules' },
    { name: 'stats', title: 'Stats' },
  ],
  fields: [
    defineField({ name: 'source', type: 'string', title: 'Old URL path', description: 'e.g. /old-page or /blog/old-post', validation: (r) => r.required(), group: 'rules' }),
    defineField({ name: 'destination', type: 'string', title: 'New URL path', description: 'e.g. /services or /blog/new-post', validation: (r) => r.required(), group: 'rules' }),
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

    // ── Stats (auto-managed by the worker) ──
    defineField({ name: 'hits', type: 'number', title: 'Hits', readOnly: true, description: 'Times this redirect was followed', group: 'stats' }),
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
    prepare: ({ title, subtitle, statusCode, enabled, hits }: any) => {
      const icon = enabled ? '↪' : '⏸';
      return {
        title: `${icon} ${title || 'Untitled'}`,
        subtitle: `${subtitle || '→ ?'} · ${statusCode || 301}${hits ? ` · ${hits} hits` : ''}`,
      };
    },
  },
});
