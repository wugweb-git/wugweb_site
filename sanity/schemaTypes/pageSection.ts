import { defineType, defineField } from 'sanity';

/**
 * Section tier of the four-tier content model: site → page → SECTION → component.
 *
 * These are the *global* sections — the chrome BaseLayout renders around every
 * page's own content. One document per section, hence the singleton guard on
 * `sectionId`. Sections that belong to a single page are not modelled here;
 * they live in that page's template.
 *
 * Today every one of these is hardcoded: the industries copy and the whole
 * cookie-consent banner + modal sit inline in BaseLayout.astro, and the final
 * CTA / insights headings are component defaults. This type is the place they
 * move to. Nothing reads it yet — wiring is tracked in pending.md.
 *
 * Scope boundary: nav and footer link structure already live in
 * `navigationMenu`; do not duplicate them here.
 */
export default defineType({
  name: 'pageSection',
  title: 'Global Section',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'placement', title: 'Placement' },
  ],
  fields: [
    defineField({
      name: 'sectionId',
      title: 'Section',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Industries strip', value: 'industries' },
          { title: 'Insights teaser', value: 'insights' },
          { title: 'Final CTA', value: 'final-cta' },
          { title: 'Cookie consent', value: 'cookie-consent' },
          { title: 'Trust badges', value: 'trust-badges' },
        ],
      },
      validation: (r) => r.required().custom(async (value: any, ctx: any) => {
        if (!value) return true;
        const client = ctx.getClient({ apiVersion: '2026-01-01' });
        const id = ctx.document?._id?.replace('drafts.', '') ?? '';
        const count = await client.fetch(
          `count(*[_type == "pageSection" && sectionId == $sectionId && _id != $id && !(_id in path("drafts.**"))])`,
          { sectionId: value, id },
        );
        return count === 0 || `A "${value}" section already exists. Edit that document instead.`;
      }),
    }),
    defineField({
      name: 'enabled',
      type: 'boolean',
      initialValue: true,
      group: 'placement',
      description: 'Off hides the section everywhere. Trust badges are currently off — the component is intact, it is just not rendered.',
    }),

    // ── Content ──
    // Field names match the props the components already accept, so wiring is
    // a pass-through rather than a rename.
    defineField({ name: 'eyebrow', type: 'string', group: 'content' }),
    defineField({ name: 'title', type: 'string', group: 'content', description: 'Section heading (H2).' }),
    defineField({ name: 'subtitle', type: 'text', rows: 3, group: 'content' }),
    defineField({ name: 'ctaLabel', type: 'string', group: 'content', description: 'e.g. "More about us". Leave empty for no button.' }),
    defineField({
      name: 'ctaHref', type: 'string', group: 'content',
      description: 'Path, starting with a slash.',
      validation: (r) => r.custom((v: any) => !v || String(v).startsWith('/') || 'Must start with /'),
    }),
    defineField({
      name: 'items',
      type: 'array',
      group: 'content',
      description: 'Sub-blocks. Used by cookie-consent for the consent categories (necessary / functional / analytics), where each needs its own name and explanation.',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string' },
          { name: 'text', type: 'text', rows: 2 },
        ],
        preview: { select: { title: 'title', subtitle: 'text' } },
      }],
    }),

    // ── Placement ──
    // Replaces the hideGlobalSections / hideGlobalIndustries / hideGlobalBlog
    // props, which put an editorial decision — which pages show which global
    // section — in .astro frontmatter, one level up from the copy being in code.
    defineField({
      name: 'excludeRoutes',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'placement',
      description: 'Routes that suppress this section, e.g. /footer/industries. Current behaviour to preserve: industries is hidden on / and /footer/industries; insights on /; and all four are hidden on every LegalLayout page (/privacy-policy, /termsofuse, /refund-policy, /footer/cookie-policy).',
    }),
    defineField({
      name: 'includeOnlyRoutes',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'placement',
      description: 'Inverse of the above — when set, the section renders ONLY on these routes and excludeRoutes is ignored.',
    }),
    defineField({
      name: 'conditionalNote',
      type: 'string',
      readOnly: true,
      group: 'placement',
      description: 'Not every rule is a route list. /services/[slug] hides the insights teaser only when that service already has related posts — a data condition, not a path, so it stays in the template. Recorded here so it is not silently lost when the route lists are filled in.',
    }),

    // ── Sync (hidden, auto-managed) ──
    defineField({ name: 'neonSynced', type: 'boolean', readOnly: true, hidden: true, initialValue: false }),
    defineField({ name: 'neonSyncedAt', type: 'datetime', readOnly: true, hidden: true }),
  ],
  preview: {
    select: { title: 'sectionId', subtitle: 'title', enabled: 'enabled' },
    prepare({ title, subtitle, enabled }: any) {
      return { title, subtitle: `${enabled === false ? '○ off — ' : ''}${subtitle || ''}` };
    },
  },
});
