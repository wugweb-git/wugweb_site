import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  groups: [
    { name: 'details', title: 'Details' },
    { name: 'branding', title: 'Branding' },
    { name: 'relations', title: 'Relations' },
  ],
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required(), group: 'details' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required(), group: 'details' }),
    defineField({ name: 'industry', type: 'reference', to: [{ type: 'industry' }], group: 'details' }),
    defineField({ name: 'website', type: 'url', group: 'details' }),
    defineField({ name: 'description', type: 'text', rows: 3, group: 'details' }),
    defineField({ name: 'logo', type: 'image', options: { hotspot: true }, group: 'branding' }),
    defineField({ name: 'logoLight', type: 'image', title: 'Logo (light background variant)', options: { hotspot: true }, group: 'branding' }),
    defineField({ name: 'engagementType', type: 'string', options: { list: ['ongoing', 'project', 'consultancy', 'retainer'] }, group: 'relations' }),
    defineField({ name: 'engagements', type: 'array', of: [{ type: 'reference', to: [{ type: 'engagement' }] }], group: 'relations' }),
    defineField({ name: 'caseStudies', type: 'array', of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }], group: 'relations' }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, group: 'details' }),
    defineField({ name: 'order', type: 'number', group: 'details' }),

    // ── Sync (hidden, auto-managed) ──
    defineField({ name: 'neonSynced', type: 'boolean', readOnly: true, hidden: true, initialValue: false }),
    defineField({ name: 'neonSyncedAt', type: 'datetime', readOnly: true, hidden: true }),
  ],
  orderings: [
    { name: 'nameAsc', title: 'Name A-Z', by: [{ field: 'name', direction: 'asc' }] },
    { name: 'createdAtDesc', title: 'Recently added', by: [{ field: '_createdAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'engagementType', media: 'logo', industry: 'industry', caseStudies: 'caseStudies' },
    prepare: ({ title, subtitle, media, industry, caseStudies }: any) => {
      const parts = [];
      if (subtitle) parts.push(String(subtitle).replace(/&/g, 'and'));
      if (industry && industry.name) parts.push(industry.name);
      if (caseStudies && caseStudies.length) parts.push(`${caseStudies.length} case studies`);
      return {
        title: title || 'Unnamed Client',
        subtitle: parts.join(' · ') || 'No engagement type',
        media,
      };
    },
  },
});
