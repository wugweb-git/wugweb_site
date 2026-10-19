import { defineType, defineField } from 'sanity';

/**
 * Sector master (Notion Table 25: Sector → `sector-SEC-n`). Groups industries
 * (`industry.sectorRef`) and drives the sitewide Sectors showcase
 * (src/components/SectorShowcase.astro). Notion is the source: edit there and
 * sync with scripts/sync-notion-sectors.mjs.
 */
export default defineType({
  name: 'sector',
  title: 'Sector',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'order', type: 'number' }),
    defineField({ name: 'externalId', title: 'Notion Sector ID', type: 'string', readOnly: true }),
    defineField({ name: 'showcase', title: 'Show in Sectors section', type: 'boolean', description: 'From Notion "Show in Sectors Section".' }),
    defineField({ name: 'showcaseOrder', title: 'Sectors section order', type: 'number', description: 'From Notion "Sectors Section Order". 1 first.' }),
    defineField({ name: 'icon', type: 'string', description: 'Lucide icon name, e.g. "landmark" (lucide.dev/icons). From Notion "Icon".' }),
  ],
  orderings: [
    { name: 'orderAsc', title: 'Custom order', by: [{ field: 'order', direction: 'asc' }] },
    { name: 'showcaseAsc', title: 'Sectors section order', by: [{ field: 'showcaseOrder', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', showcase: 'showcase', showcaseOrder: 'showcaseOrder', icon: 'icon' },
    prepare: ({ title, showcase, showcaseOrder, icon }: any) => ({
      title: title || 'Unnamed Sector',
      subtitle: [showcase ? `Showcase #${showcaseOrder ?? '–'}` : null, icon || null].filter(Boolean).join(' · '),
    }),
  },
});
