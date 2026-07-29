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
                ),
            ])
        ),

      S.listItem()
        .title('Site Settings')
        .icon(() => '⚙️')
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings'),
        ),
      S.divider(),

      // ── Pages ──
      S.listItem()
        .title('Pages')
        .icon(() => '📄')
        .child(
          S.list()
            .title('Pages')
            .items([
              singletonPageItem(S, 'Home', 'home', '🏠'),
              singletonPageItem(S, 'Services', 'services', '🛠️'),
              singletonPageItem(S, 'About', 'about', '👋'),
              singletonPageItem(S, 'Work', 'work', '💼'),
              singletonPageItem(S, 'Blog', 'blog', '✍️'),
              singletonPageItem(S, 'FAQ', 'faq', '❓'),
              singletonPageItem(S, 'Contact', 'contact', '📬'),
              singletonPageItem(S, 'Privacy Policy', 'privacy-policy', '🔒'),
              singletonPageItem(S, 'Terms of Use', 'terms-of-use', '📋'),
              singletonPageItem(S, 'Refund Policy', 'refund-policy', '💰'),
              singletonPageItem(S, 'Impact', 'impact', '🌍'),
              singletonPageItem(S, 'Subscription', 'subscription', '📨'),
              singletonPageItem(S, 'Sitemap', 'sitemap', '🗺️'),
            ]),
        ),
      S.divider(),

      // ── Content Collections ──
      S.documentTypeListItem('caseStudy').title('Case Studies').icon(() => '💼'),
      S.documentTypeListItem('post').title('Blog Posts').icon(() => '✍️'),
      S.documentTypeListItem('service').title('Services').icon(() => '🛠️'),
      S.divider(),

      // ── Taxonomy ──
      S.listItem()
        .title('Taxonomy')
        .icon(() => '🏷️')
        .child(
          S.list()
            .title('Taxonomy')
            .items([
              S.documentTypeListItem('industry').title('Industries').icon(() => '🏭'),
              S.documentTypeListItem('taxonomy').title('Taxonomy Terms').icon(() => '📋'),
            ])
        ),

      // ── CRM ──
      S.listItem()
        .title('CRM')
        .icon(() => '🤝')
        .child(
          S.list()
            .title('CRM')
            .items([
              S.documentTypeListItem('client').title('Clients').icon(() => '🏢'),
              S.documentTypeListItem('engagement').title('Engagements').icon(() => '📋'),
              S.documentTypeListItem('person').title('Team / People').icon(() => '👥'),
            ])
        ),

      S.divider(),
      S.documentTypeListItem('contactSubmission').title('Contact Submissions').icon(() => '📬'),

      // ── Assets ──
      S.documentTypeListItem('asset').title('Assets').icon(() => '🖼️'),
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
