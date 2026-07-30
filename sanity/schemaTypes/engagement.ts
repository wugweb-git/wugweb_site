import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'engagement',
  title: 'Engagement',
  type: 'document',
  groups: [
    { name: 'overview', title: 'Overview' },
    { name: 'scope', title: 'Scope & Pricing' },
  ],
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required(), group: 'overview' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required(), group: 'overview' }),
    defineField({ name: 'engagementType', type: 'string', options: {
      list: [
        { title: 'Project', value: 'project' },
        { title: 'Retainer', value: 'retainer' },
        { title: 'Consultancy', value: 'consultancy' },
        { title: 'Strategic Partnership', value: 'partnership' },
      ],
    }, group: 'overview' }),
    defineField({ name: 'client', type: 'reference', to: [{ type: 'client' }], group: 'overview' }),
    defineField({ name: 'description', type: 'text', rows: 3, group: 'overview' }),
    defineField({ name: 'startDate', type: 'date', group: 'overview' }),
    defineField({ name: 'endDate', type: 'date', group: 'overview' }),
    defineField({ name: 'status', type: 'string', options: { list: ['planned', 'active', 'completed', 'on-hold'] }, group: 'overview' }),
    defineField({ name: 'services', type: 'array', of: [{ type: 'reference', to: [{ type: 'service' }] }], group: 'overview' }),

    // Scope & Pricing
    defineField({ name: 'priceLabel', type: 'string', description: 'e.g. "On Request", "₹5L-10L", "$10K-25K"', group: 'scope' }),
    defineField({ name: 'duration', type: 'string', description: 'e.g. "3 months", "Ongoing"', group: 'scope' }),
    defineField({ name: 'scopeItems', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, description: 'Key deliverables or scope items', group: 'scope' }),
    defineField({ name: 'teamSize', type: 'string', description: 'e.g. "4 people", "2-3 FTEs"', group: 'scope' }),

    // ── Sync (hidden, auto-managed) ──
    defineField({ name: 'neonSynced', type: 'boolean', readOnly: true, hidden: true, initialValue: false }),
    defineField({ name: 'neonSyncedAt', type: 'datetime', readOnly: true, hidden: true }),
  ],
  orderings: [
    { name: 'nameAsc', title: 'Name A-Z', by: [{ field: 'name', direction: 'asc' }] },
    { name: 'statusAsc', title: 'By status', by: [{ field: 'status', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'engagementType', status: 'status' },
    prepare: ({ title, subtitle, status }: any) => ({
      title: title || 'Unnamed Engagement',
      subtitle: `${String(subtitle || '').replace(/&/g, 'and')}${status ? ` — ${status}` : ''}`,
    }),
  },
});
