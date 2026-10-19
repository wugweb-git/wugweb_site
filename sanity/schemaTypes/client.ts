import { defineType, defineField } from 'sanity';
import { ownerField } from './ownerField';

export default defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  groups: [
    { name: 'details', title: 'Details' },
    { name: 'branding', title: 'Branding' },
    { name: 'relations', title: 'Relations' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required(), group: 'details' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required(), group: 'details' }),
    { ...ownerField, group: 'details' },
    defineField({ name: 'industry', type: 'reference', to: [{ type: 'industry' }], group: 'details' }),
    defineField({ name: 'website', type: 'url', group: 'details' }),
    defineField({ name: 'description', type: 'text', rows: 3, group: 'details' }),
    defineField({ name: 'logo', type: 'image', options: { hotspot: true }, group: 'branding' }),
    defineField({ name: 'logoLight', type: 'image', title: 'Logo (light background variant)', options: { hotspot: true }, group: 'branding' }),
    defineField({ name: 'showInLogoBand', title: 'Show in homepage logo band', type: 'boolean', initialValue: false, description: 'Tick to show this client logo in the "Trusted by" band on the homepage. Needs a logo path.', group: 'branding' }),
    defineField({ name: 'logoPath', type: 'string', description: 'R2/local logo path e.g. /assets/logos/client-logo-….png', group: 'branding' }),
    defineField({ name: 'bandLogoPath', title: 'Logo band image', type: 'string', description: 'R2 path of the greyscale logo used only in the homepage "Trusted by" band, e.g. /assets/logos/band/acko.png. Falls back to Logo path when empty.', group: 'branding' }),
    defineField({ name: 'bandOrder', title: 'Logo band order', type: 'number', description: 'Position in the homepage band, 1 first. Unnumbered clients sort A-Z after the numbered ones.', group: 'branding' }),
    defineField({ name: 'engagementType', type: 'string', options: { list: ['ongoing', 'project', 'consultancy', 'retainer'] }, group: 'relations' }),
    defineField({ name: 'engagements', type: 'array', of: [{ type: 'reference', to: [{ type: 'engagement' }] }], group: 'relations' }),
    defineField({ name: 'caseStudies', type: 'array', of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }], group: 'relations' }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, group: 'details' }),
    defineField({ name: 'order', type: 'number', group: 'details' }),

    // ── SEO ──
    defineField({ name: 'seoTitle', type: 'string', description: 'Client page title for SEO', group: 'seo' }),
    defineField({ name: 'seoDescription', type: 'text', rows: 2, description: 'Meta description for client page', group: 'seo' }),

    // ── Sync (hidden, auto-managed) ──
    defineField({ name: 'neonSynced', type: 'boolean', readOnly: true, hidden: true, initialValue: false }),
    defineField({ name: 'neonSyncedAt', type: 'datetime', readOnly: true, hidden: true }),
  ],
  orderings: [
    { name: 'nameAsc', title: 'Name A-Z', by: [{ field: 'name', direction: 'asc' }] },
    { name: 'createdAtDesc', title: 'Recently added', by: [{ field: '_createdAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'engagementType', media: 'logo', industry: 'industry', caseStudies: 'caseStudies', seoDesc: 'seoDescription' },
    prepare: ({ title, subtitle, media, industry, caseStudies, seoDesc }: any) => {
      const parts = [];
      if (subtitle) parts.push(String(subtitle).replace(/&/g, 'and'));
      if (industry && industry.name) parts.push(industry.name);
      if (caseStudies && caseStudies.length) parts.push(`${caseStudies.length} case studies`);
      let health = '✅';
      if (!seoDesc) health = '⚠️ SEO';
      return {
        title: title || 'Unnamed Client',
        subtitle: parts.join(' · ') || health,
        media,
      };
    },
  },
});
