import { type StructureBuilder, type StructureResolver } from 'sanity/structure';

export const deskStructure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // ── Dashboard ──
      S.listItem()
        .title('Dashboard')
        .icon(() => '📊')
        .child(
          S.list()
            .title('Dashboard')
            .items([
              S.listItem()
                .title('Sync Status')
                .icon(() => '🔄')
                .child(
                  S.documentList()
                    .title('Sync Status')
                    .schemaType('syncStatus')
                    .filter('_type == "syncStatus"')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('Site Settings')
                .icon(() => '⚙️')
                .child(
                  S.editor().id('siteSettings').schemaType('siteSettings').documentId('siteSettings'),
                ),
            ])
        ),

      S.divider(),

      // ── Content ──
      S.listItem()
        .title('Content')
        .icon(() => '📝')
        .child(
          S.list()
            .title('Content')
            .items([
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
                      singletonPageItem(S, 'Privacy Policy', 'privacy-policy', '🔒'),
                      singletonPageItem(S, 'Terms of Use', 'terms-of-use', '📋'),
                      singletonPageItem(S, 'Refund Policy', 'refund-policy', '💰'),
                      S.divider(),
                      singletonPageItem(S, 'Impact', 'impact', '🌍'),
                      singletonPageItem(S, 'Subscription', 'subscription', '📨'),
                      singletonPageItem(S, 'Sitemap', 'sitemap', '🗺️'),
                    ])
                ),
              S.documentTypeListItem('caseStudy').title('Case Studies').icon(() => '💼'),
              S.documentTypeListItem('post').title('Blog Posts').icon(() => '✍️'),
              S.documentTypeListItem('service').title('Services').icon(() => '🛠️'),
            ])
        ),

      S.divider(),

      // ── Library ──
      S.listItem()
        .title('Library')
        .icon(() => '📚')
        .child(
          S.list()
            .title('Library')
            .items([
              S.documentTypeListItem('client').title('Clients').icon(() => '🏢'),
              S.documentTypeListItem('industry').title('Industries').icon(() => '🏭'),
              S.documentTypeListItem('person').title('Team / People').icon(() => '👥'),
              S.documentTypeListItem('asset').title('Assets').icon(() => '🖼️'),
              S.documentTypeListItem('taxonomy').title('Taxonomy Terms').icon(() => '🏷️'),
            ])
        ),

      S.divider(),

      // ── Data (secondary) ──
      S.listItem()
        .title('Data')
        .icon(() => '🗃️')
        .child(
          S.list()
            .title('Data')
            .items([
              S.documentTypeListItem('contactSubmission').title('Contact Submissions').icon(() => '📬'),
              S.documentTypeListItem('engagement').title('Engagements').icon(() => '🤝'),
              S.documentTypeListItem('syncStatus').title('Sync Log').icon(() => '🔄'),
            ])
        ),
    ]);

function singletonPageItem(S: StructureBuilder, label: string, pageId: string, icon: string) {
  return S.listItem()
    .title(label)
    .icon(() => icon)
    .child(
      S.document()
        .schemaType('singletonPage')
        .documentId(pageId)
        .title(label),
    );
}
