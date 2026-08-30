import { defineType, defineField } from 'sanity';
import { ownerField } from './ownerField';
import { R2AssetInput } from '../components/R2AssetInput';

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: [
    { name: 'overview', title: 'Overview', default: true },
    { name: 'narrative', title: 'Narrative (Structured)' },
    { name: 'media', title: 'Media & Gallery' },
    { name: 'customBlocks', title: 'Custom Blocks' },
    { name: 'results', title: 'Results & Impact' },
    { name: 'seo', title: 'SEO' },
    { name: 'relations', title: 'Relations' },
  ],
  fields: [
    // ── Overview ──
    defineField({ name: 'title', type: 'string', validation: (r) => r.required(), group: 'overview' }),
    defineField({ name: 'subtitle', type: 'string', description: 'Short tagline shown on case study cards', group: 'overview' }),
    defineField({
      name: 'slug', type: 'slug', options: { source: 'title', maxLength: 120 }, group: 'overview',
      validation: (r) => r.required().custom(async (value: any, ctx: any) => {
        if (!value?.current) return true;
        const client = ctx.getClient({ apiVersion: '2026-01-01' });
        const id = ctx.document?._id?.replace('drafts.', '') ?? '';
        const count = await client.fetch(
          `count(*[_type == $type && slug.current == $slug && _id != $id && !(_id in path("drafts.**"))])`,
          { type: ctx.document?._type, slug: value.current, id },
        );
        return count === 0 || `Slug "${value.current}" is already used by another published case study`;
      }),
    }),
    { ...ownerField, group: 'overview' },
    defineField({ name: 'summary', type: 'text', rows: 2, description: 'Short description for work listing cards. 1-2 sentences.', group: 'overview',
      validation: (r) => r.warning('Recommended — shown on the work listing page'),
    }),
    defineField({
      name: 'thumbnailPath',
      type: 'string',
      description: 'R2/local path for listing thumb e.g. /assets/work/.../…-thumb.mp4',
      components: { input: R2AssetInput },
      group: 'overview',
    }),
    defineField({
      name: 'coverPath',
      type: 'string',
      description: 'R2/local path for detail cover e.g. /assets/work/.../cover.jpg',
      components: { input: R2AssetInput },
      group: 'overview',
    }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true }, description: 'Hero image (Sanity CDN — prefer coverPath for R2)', group: 'overview' }),
    defineField({ name: 'client', type: 'string', description: 'Display name (legacy text). Prefer Client ref below for relationships.', group: 'overview' }),
    defineField({ name: 'disciplines', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, description: 'e.g. UX Design, Strategy, Development', group: 'overview' }),
    defineField({ name: 'industry', type: 'string', description: 'Legacy text industry — prefer Industry ref', group: 'overview' }),
    defineField({ name: 'timeline', type: 'string', description: 'e.g. "2022" or "Q3 2023"', group: 'overview' }),
    defineField({ name: 'partner', type: 'string', description: 'Partner agency or organisation (if any)', group: 'overview' }),
    defineField({ name: 'team', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, description: 'People or organisations involved', group: 'overview' }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, group: 'overview' }),

    // ── Structured Narrative ──
    defineField({
      name: 'about',
      title: 'About / Project Overview',
      type: 'text',
      rows: 4,
      description: 'Background, client mission, and studio engagement context.',
      group: 'narrative',
    }),
    defineField({
      name: 'challenges',
      title: 'Key Challenges',
      type: 'array',
      group: 'narrative',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Challenge Title' },
            { name: 'body', type: 'text', rows: 2, title: 'Description' },
          ],
          preview: {
            select: { title: 'title', subtitle: 'body' },
          },
        },
      ],
    }),
    defineField({
      name: 'solutions',
      title: 'Strategic Solutions & Execution',
      type: 'array',
      group: 'narrative',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Solution Title' },
            { name: 'body', type: 'text', rows: 2, title: 'Description' },
          ],
          preview: {
            select: { title: 'title', subtitle: 'body' },
          },
        },
      ],
    }),
    defineField({
      name: 'designPhilosophy',
      title: 'Design Philosophy / Core Principles',
      type: 'text',
      rows: 3,
      description: 'Design principles applied during the project (e.g. line-separated or narrative).',
      group: 'narrative',
    }),
    defineField({
      name: 'impact',
      title: 'Business Impact & Outcomes',
      type: 'array',
      group: 'narrative',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Impact Area' },
            { name: 'body', type: 'text', rows: 2, title: 'Outcome / Result' },
          ],
          preview: {
            select: { title: 'title', subtitle: 'body' },
          },
        },
      ],
    }),

    // ── Media & Gallery ──
    defineField({
      name: 'galleryPaths',
      title: 'Gallery Media Paths (R2 / Local)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of R2/local image or video asset paths e.g. /assets/work/…/preview.mp4',
      group: 'media',
    }),

    // ── Custom Blocks (Modular) ──
    defineField({
      name: 'bodyContent',
      title: 'Custom Modular Blocks',
      type: 'blockContent',
      description: 'Optional modular rich blocks (CTAs, stats, code, accordions, two-column layouts).',
      group: 'customBlocks',
    }),

    // ── Results & Metrics ──
    defineField({
      name: 'results',
      title: 'Metrics & KPIs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'metric', type: 'string', title: 'Metric / Number (e.g. "+150%")', validation: (r) => r.required() },
            { name: 'label', type: 'string', title: 'Label / Description (e.g. "Conversion Rate Increase")' },
          ],
          preview: {
            select: { title: 'metric', subtitle: 'label' },
          },
        },
      ],
      group: 'results',
    }),
    defineField({ name: 'publishedAt', type: 'datetime', group: 'results' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false, description: 'Featured case studies appear first in listings', group: 'results' }),
    defineField({ name: 'language', type: 'string', options: { list: ['en-GB', 'en-US'] }, initialValue: 'en-GB', group: 'overview' }),

    // ── SEO ──
    defineField({ name: 'seoTitle', type: 'string', description: 'Overrides the <title> tag', group: 'seo' }),
    defineField({ name: 'seoDescription', type: 'text', rows: 2, group: 'seo' }),
    defineField({ name: 'ogImage', type: 'image', description: 'Social sharing preview image', group: 'seo' }),

    // ── Relations ──
    defineField({
      name: 'clientRef',
      title: 'Client Document',
      type: 'reference',
      to: [{ type: 'client' }],
      description: 'Linked client document — enables relationship queries and Tables joins',
      group: 'relations',
    }),
    defineField({
      name: 'industryRef',
      title: 'Industry Document',
      type: 'reference',
      to: [{ type: 'industry' }],
      description: 'Linked industry document (preferred over plain industry string)',
      group: 'relations',
    }),
    defineField({
      name: 'services',
      title: 'Related Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      group: 'relations',
    }),
    defineField({
      name: 'assets',
      title: 'Assets',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'asset' }] }],
      description: 'Optional explicit asset links',
      group: 'relations',
    }),
    defineField({ name: 'relatedCaseStudies', type: 'array', of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }], description: 'Other case studies readers should see', group: 'relations' }),
    defineField({ name: 'relatedPosts', type: 'array', of: [{ type: 'reference', to: [{ type: 'post' }] }], description: 'Blog posts related to this case study', group: 'relations' }),

    // ── Sync ──
    defineField({ name: 'neonSynced', type: 'boolean', readOnly: true, hidden: true, initialValue: false }),
    defineField({ name: 'neonSyncedAt', type: 'datetime', readOnly: true, hidden: true }),
  ],
  orderings: [
    { name: 'publishedAtDesc', title: 'Publish date', by: [{ field: 'publishedAt', direction: 'desc' }] },
    { name: 'titleAsc', title: 'Title A-Z', by: [{ field: 'title', direction: 'asc' }] },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'coverImage',
      featured: 'featured',
      industry: 'industry',
      disciplines: 'disciplines',
      seoDesc: 'seoDescription',
      clientRef: 'clientRef->name',
      industryRef: 'industryRef->name',
    },
    prepare: ({ title, subtitle, media, featured, industry, disciplines, seoDesc, clientRef, industryRef }: any) => {
      const badge = featured ? ' ⭐' : '';
      const parts = [];
      if (clientRef || subtitle) parts.push(clientRef || subtitle);
      if (industryRef || industry) parts.push(industryRef || industry);
      if (disciplines && disciplines.length) parts.push(disciplines.slice(0, 2).join(', '));
      let health = '✅';
      if (!media) health = '❌ Cover';
      else if (!seoDesc) health = '⚠️ SEO';
      return {
        title: title || 'Untitled' + badge,
        subtitle: parts.join(' · ') || health,
        media,
      };
    },
  },
});
