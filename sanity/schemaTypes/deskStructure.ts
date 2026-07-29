import { type StructureBuilder, type StructureResolver } from 'sanity/structure';

export const deskStructure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Wugweb Admin')
    .items([
      // ── Dashboard ──
      dashboardItem(S),
      S.divider(),

      // ── Content ──
      sectionItem(S, '✍ Content', '📝', [
        S.listItem()
          .title('Pages')
          .icon(() => '📄')
          .child(
            S.list()
              .title('Pages')
              .items([
                singletonPageItem(S, 'Home', 'home', '🏠'),
                singletonPageItem(S, 'About', 'about', '👋'),
                singletonPageItem(S, 'Services', 'services', '🛠️'),
                singletonPageItem(S, 'Work', 'work', '💼'),
                singletonPageItem(S, 'Blog', 'blog', '✍️'),
                singletonPageItem(S, 'FAQ', 'faq', '❓'),
                singletonPageItem(S, 'Contact', 'contact', '📬'),
                S.divider(),
                singletonPageItem(S, 'Privacy', 'privacy-policy', '🔒'),
                singletonPageItem(S, 'Terms', 'terms-of-use', '📋'),
                singletonPageItem(S, 'Refund', 'refund-policy', '💰'),
                S.divider(),
                singletonPageItem(S, 'Impact', 'impact', '🌍'),
                singletonPageItem(S, 'Subscription', 'subscription', '📨'),
                singletonPageItem(S, 'Sitemap', 'sitemap', '🗺️'),
              ])
          ),
        S.documentTypeListItem('caseStudy').title('Case Studies').icon(() => '💼'),
        S.documentTypeListItem('post').title('Blog Posts').icon(() => '✍️'),
        S.documentTypeListItem('service').title('Services').icon(() => '🛠️'),
      ]),
      S.divider(),

      // ── Business ──
      sectionItem(S, '💼 Business', '🏢', [
        S.documentTypeListItem('client').title('Clients').icon(() => '🏢'),
        S.documentTypeListItem('engagement').title('Engagements').icon(() => '🤝'),
        S.documentTypeListItem('industry').title('Industries').icon(() => '🏭'),
        S.documentTypeListItem('person').title('Team / People').icon(() => '👥'),
      ]),
      S.divider(),

      // ── Brand & Media ──
      sectionItem(S, '🎨 Brand & Media', '🖼️', [
        S.documentTypeListItem('asset').title('Assets').icon(() => '🖼️'),
      ]),
      S.divider(),

      // ── Knowledge ──
      sectionItem(S, '🧠 Knowledge', '📚', [
        S.documentTypeListItem('taxonomy').title('Taxonomy Terms').icon(() => '🏷️'),
      ]),
      S.divider(),

      // ── System ──
      sectionItem(S, '⚙ System', '🔧', [
        S.listItem()
          .title('Site Settings')
          .icon(() => '⚙️')
          .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
        S.documentTypeListItem('syncStatus').title('Sync Status').icon(() => '🔄'),
        S.documentTypeListItem('contactSubmission').title('Contact Submissions').icon(() => '📬'),
      ]),
    ]);

/** Dashboard with recent edits, drafts, and quick stats */
function dashboardItem(S: StructureBuilder) {
  return S.listItem()
    .title('Dashboard')
    .icon(() => '📊')
    .child(
      S.list()
        .title('Dashboard')
        .items([
          S.listItem()
            .title('Recently Edited')
            .icon(() => '🕐')
            .child(
              S.documentList()
                .title('Recently Edited')
                .filter('_updatedAt > now() - 7')
                .order([{ field: '_updatedAt', direction: 'desc' }])
                .apiVersion('v2022-03-07')
            ),
          S.listItem()
            .title('All Drafts')
            .icon(() => '📝')
            .child(
              S.documentList()
                .title('Drafts')
                .filter('_id in path("drafts.**")')
                .order([{ field: '_updatedAt', direction: 'desc' }])
            ),
          S.divider(),
          S.documentTypeListItem('syncStatus').title('Sync Status').icon(() => '🔄'),
          S.listItem()
            .title('Site Settings')
            .icon(() => '⚙️')
            .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
        ])
    );
}

/** Collapsible section with emoji icon */
function sectionItem(S: StructureBuilder, title: string, icon: string, items: any[]) {
  return S.listItem()
    .title(title)
    .icon(() => icon)
    .child(S.list().title(title).items(items));
}

function singletonPageItem(S: StructureBuilder, label: string, pageId: string, icon: string) {
  return S.listItem()
    .title(label)
    .icon(() => icon)
    .child(S.document().schemaType('singletonPage').documentId(pageId).title(label));
}
