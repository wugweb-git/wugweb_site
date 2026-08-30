import { defineType, defineField } from 'sanity';
import { ownerField } from './ownerField';

const uniqueSlugValidation = (rule: any) =>
  rule.required().custom(async (slug: { current?: string } | undefined, context: any) => {
    if (!slug?.current) return true;
    const client = context.getClient({ apiVersion: '2026-01-01' });
    const id = String(context.document?._id || '').replace(/^drafts\./, '');
    const duplicateCount = await client.fetch(
      'count(*[_type == "caseStudy" && slug.current == $slug && _id != $id && _id != $draftId])',
      { slug: slug.current, id, draftId: `drafts.${id}` },
    );
    return duplicateCount === 0 || 'This case study slug is already used by another case study.';
  });

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: [
    { name: 'overview', title: 'Overview', default: true },
    { name: 'content', title: 'Content' },
    { name: 'results', title: 'Results' },
    { name: 'seo', title: 'SEO' },
    { name: 'relations', title: 'Relations' },
  ],
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required(), group: 'overview' }),
    defineField({ name: 'subtitle', type: 'string', description: 'Short tagline shown on case study cards', group: 'overview' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title', maxLength: 120 }, validation: uniqueSlugValidation, group: 'overview' }),
    { ...ownerField, group: 'overview' },
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true }, description: 'Hero image for the case study detail page.', group: 'overview' }),
    defineField({ name: 'thumbnailPath', type: 'string', description: 'Legacy R2/local listing thumbnail path. Migrate to Sanity assets before removal.', deprecated: { reason: 'Legacy media path; prefer Sanity assets.' }, group: 'overview' }),
    defineField({ name: 'coverPath', type: 'string', description: 'Legacy R2/local detail cover path. Migrate to coverImage before removal.', deprecated: { reason: 'Legacy media path; prefer Sanity coverImage.' }, group: 'overview' }),
    defineField({ name: 'client', type: 'string', description: 'Legacy display text. Prefer Client ref below.', group: 'overview' }),
    defineField({ name: 'clientRef', title: 'Client', type: 'reference', to: [{ type: 'client' }], description: 'Linked client document.', group: 'relations' }),
    defineField({ name: 'industryRef', title: 'Industry', type: 'reference', to: [{ type: 'industry' }], description: 'Linked industry document.', group: 'relations' }),
    defineField({ name: 'assets', title: 'Assets', type: 'array', of: [{ type: 'reference', to: [{ type: 'asset' }] }], description: 'Optional explicit asset links.', group: 'relations' }),
    defineField({ name: 'summary', type: 'text', rows: 2, description: 'Short description for work listing cards. 1-2 sentences.', group: 'overview' }),
    defineField({ name: 'disciplines', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, group: 'overview' }),
    defineField({ name: 'industry', type: 'string', description: 'Legacy text industry — prefer Industry ref', group: 'overview' }),
    defineField({ name: 'timeline', type: 'string', description: 'e.g. "2022" or "Q3 2023"', group: 'overview' }),
    defineField({ name: 'partner', type: 'string', description: 'Partner agency or organisation (if any)', group: 'overview' }),
    defineField({ name: 'team', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, description: 'People or organisations involved', group: 'overview' }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, group: 'overview' }),
    defineField({ name: 'services', title: 'Related Services', type: 'array', of: [{ type: 'reference', to: [{ type: 'service' }] }], group: 'relations' }),
    defineField({ name: 'bodyContent', title: 'Body Content', type: 'blockContent', description: 'Merged narrative and embedded gallery media.', group: 'content' }),
    defineField({ name: 'results', type: 'array', of: [{ type: 'object', fields: [
      { name: 'metric', type: 'string', description: 'e.g. "150%"' },
      { name: 'label', type: 'string', description: 'e.g. "Increase in conversions"' },
    ] }], group: 'results' }),
    defineField({ name: 'publishedAt', type: 'datetime', group: 'results' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false, description: 'Featured case studies appear first in listings', group: 'results' }),
    defineField({ name: 'language', type: 'string', options: { list: ['en-GB', 'en-US'] }, initialValue: 'en-GB', group: 'overview' }),
    defineField({ name: 'seoTitle', type: 'string', description: 'Overrides the <title> tag', group: 'seo' }),
    defineField({ name: 'seoDescription', type: 'text', rows: 2, group: 'seo' }),
    defineField({ name: 'ogImage', type: 'image', description: 'Social sharing preview image', group: 'seo' }),
    defineField({ name: 'relatedCaseStudies', type: 'array', of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }], description: 'Other case studies readers should see', group: 'relations' }),
    defineField({ name: 'relatedPosts', type: 'array', of: [{ type: 'reference', to: [{ type: 'post' }] }], description: 'Blog posts related to this case study', group: 'relations' }),
    defineField({ name: 'neonSynced', type: 'boolean', readOnly: true, hidden: true, initialValue: false }),
    defineField({ name: 'neonSyncedAt', type: 'datetime', readOnly: true, hidden: true }),
  ],
  orderings: [
    { name: 'publishedAtDesc', title: 'Publish date', by: [{ field: 'publishedAt', direction: 'desc' }] },
    { name: 'titleAsc', title: 'Title A-Z', by: [{ field: 'title', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'client', media: 'coverImage', featured: 'featured', industry: 'industry', disciplines: 'disciplines', seoDesc: 'seoDescription', clientRef: 'clientRef->name', industryRef: 'industryRef->name' },
    prepare: ({ title, subtitle, media, featured, industry, disciplines, seoDesc, clientRef, industryRef }: any) => {
      const badge = featured ? ' ⭐' : '';
      const parts = [];
      if (clientRef || subtitle) parts.push(clientRef || subtitle);
      if (industryRef || industry) parts.push(industryRef || industry);
      if (disciplines && disciplines.length) parts.push(disciplines.slice(0, 2).join(', '));
      let health = 'OK';
      if (!media) health = 'Cover missing';
      else if (!seoDesc) health = 'SEO metadata missing';
      return { title: (title || 'Untitled') + badge, subtitle: parts.join(' · ') || health, media };
    },
  },
});
