import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'relations', title: 'Relations' },
  ],
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required(), group: 'content' }),
    defineField({ name: 'role', type: 'string', description: 'e.g. Product Manager, Done By None', group: 'content' }),
    defineField({ name: 'company', type: 'string', group: 'content' }),
    defineField({ name: 'quote', type: 'text', rows: 5, validation: (r) => r.required(), group: 'content' }),
    defineField({ name: 'photo', type: 'image', options: { hotspot: true }, group: 'content' }),
    defineField({ name: 'photoPath', type: 'string', description: 'R2/local photo path', group: 'content' }),
    defineField({ name: 'rating', type: 'number', validation: (r) => r.min(1).max(5), group: 'content' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false, group: 'content' }),
    defineField({ name: 'order', type: 'number', group: 'content' }),
    // Source: imported from the Uncode/vedanshu.design WordPress site testimonials page
    // Provenance. The agency-platform values matter: a review collected through
    // Wugweb's own Clutch / DesignRush / GoodFirms account is a Wugweb review,
    // which is what /footer/reviews renders. LinkedIn recommendations are
    // personal to Vedanshu and are never shown on this site.
    defineField({
      name: 'source', type: 'string', group: 'relations',
      options: { list: ['linkedin', 'vedanshu-design', 'wugweb', 'clutch', 'designrush', 'goodfirms', 'manual'] },
      initialValue: 'linkedin',
    }),
    // Subject: who the testimonial is about (Vedanshu personally vs Wugweb the agency)
    defineField({ name: 'subject', type: 'string', options: { list: ['vedanshu', 'wugweb', 'both'] }, initialValue: 'vedanshu', description: 'Vedanshu personal (LinkedIn) vs Wugweb agency. Only wugweb/both render on wugweb.com — vedanshu-subject testimonials belong to his own site and are pushed there via Neon.', group: 'relations' }),
  ],
  orderings: [
    { name: 'orderAsc', title: 'Display order', by: [{ field: 'order', direction: 'asc' }] },
    { name: 'nameAsc', title: 'Name A-Z', by: [{ field: 'name', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'company', media: 'photo', rating: 'rating' },
    prepare: ({ title, subtitle, media, rating }: any) => ({
      title: title || 'Unnamed',
      subtitle: `${subtitle ? String(subtitle).replace(/&/g, 'and') : ''}${rating ? ` · ${rating}/5` : ''}`.trim(),
      media,
    }),
  },
});
