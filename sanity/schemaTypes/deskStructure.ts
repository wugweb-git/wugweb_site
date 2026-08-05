import { type StructureBuilder, type StructureResolver } from 'sanity/structure';

export const deskStructure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Wugweb')
    .items([
      // ── Safe dashboard: static navigation hub only (no live widgets / filters) ──
      S.listItem()
        .title('Dashboard')
        .icon(() => '⌂')
        .child(
          S.list()
            .title('Start here')
            .items([
              S.listItem()
                .title('Editorial')
                .icon(() => '✍')
                .child(
                  S.list()
                    .title('Editorial')
                    .items([
                      S.documentTypeListItem('post').title('Blog Posts'),
                      S.documentTypeListItem('caseStudy').title('Case Studies'),
                      S.documentTypeListItem('service').title('Services'),
                      S.documentTypeListItem('singletonPage').title('Pages'),
                    ])
                ),
              S.listItem()
                .title('Business')
                .icon(() => '💼')
                .child(
                  S.list()
                    .title('Business')
                    .items([
                      S.documentTypeListItem('client').title('Clients'),
                      S.documentTypeListItem('engagement').title('Engagements'),
                      S.documentTypeListItem('person').title('Team'),
                    ])
                ),
              S.documentTypeListItem('asset').title('Assets'),
              S.listItem()
                .title('Site Settings')
                .icon(() => '⚙')
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                    .title('Site Settings')
                ),
              S.documentTypeListItem('syncStatus').title('Sync Status'),
            ])
        ),

      S.divider(),

      // ── Editorial ──
      sectionItem(S, '✍ Editorial', '📝', [
        S.documentTypeListItem('post').title('Blog Posts').icon(() => '✍️'),
        S.documentTypeListItem('caseStudy').title('Case Studies').icon(() => '💼'),
        S.documentTypeListItem('service').title('Services').icon(() => '🛠️'),
        singletonPageItem(S, 'Pages', 'pages', '📄', [
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
          singletonPageItem(S, 'Impact', 'impact', '🌍'),
          singletonPageItem(S, 'Subscription', 'subscription', '📨'),
          singletonPageItem(S, 'Sitemap', 'sitemap', '🗺️'),
        ]),
      ]),

      S.divider(),

      // ── Business ──
      sectionItem(S, '💼 Business', '🏢', [
        S.documentTypeListItem('client').title('Clients').icon(() => '🏢'),
        S.documentTypeListItem('engagement').title('Engagements').icon(() => '🤝'),
        S.documentTypeListItem('person').title('Team / People').icon(() => '👥'),
        S.documentTypeListItem('testimonial').title('Testimonials').icon(() => '💬'),
      ]),

      S.divider(),

      // ── Brand & Media ──
      sectionItem(S, '🎨 Brand & Media', '🖼️', [
        S.documentTypeListItem('asset').title('Assets').icon(() => '🖼️'),
      ]),

      S.divider(),

      // ── Global Settings (master/reference data) ──
      sectionItem(S, '⚙ Global Settings', '🌍', [
        S.listItem().title('Site Settings').icon(() => '⚙️').child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings')),
        vocabList(S, 'Platforms', 'platform', '📡'),
        vocabList(S, 'Tools / Tech stack', 'tech-stack', '🛠️'),
        vocabList(S, 'Tags', 'tag', '🏷️'),
        vocabList(S, 'Asset types', 'asset-type', '🧩'),
        vocabList(S, 'Content types', 'content-type', '📄'),
        vocabList(S, 'Departments', 'team-department', '👥'),
        vocabList(S, 'Countries', 'country', '🌐'),
        S.documentTypeListItem('industry').title('Industry master').icon(() => '🏭'),
        S.documentTypeListItem('platformProfile').title('Presence').icon(() => '🔗'),
        S.documentTypeListItem('taxonomy').title('All taxonomy').icon(() => '📚'),
      ]),

      S.divider(),

      // ── System ──
      sectionItem(S, '🔧 System', '⚡', [
        S.documentTypeListItem('syncStatus').title('Sync Status').icon(() => '🔄'),
        S.documentTypeListItem('contactSubmission').title('Contact Submissions').icon(() => '📬'),
      ]),
    ]);

// ── Helper functions ──

function sectionItem(S: StructureBuilder, title: string, icon: string, items: any[]) {
  return S.listItem()
    .title(title)
    .icon(() => icon)
    .child(S.list().title(title).items(items));
}

function singletonPageItem(S: StructureBuilder, label: string, pageId: string, icon: string, children?: any[]) {
  if (children && children.length > 0) {
    return S.listItem()
      .title(label)
      .icon(() => icon)
      .child(S.list().title(label).items(children));
  }
  return S.listItem()
    .title(label)
    .icon(() => icon)
    .child(S.document().schemaType('singletonPage').documentId(pageId).title(label));
}

function vocabList(S: StructureBuilder, title: string, vocabulary: string, icon: string) {
  return S.listItem()
    .title(title)
    .icon(() => icon)
    .child(
      S.documentList()
        .title(title)
        .filter('_type == "taxonomy" && vocabulary == $vocabulary')
        .params({ vocabulary })
        .defaultOrdering([{ field: 'order', direction: 'asc' }, { field: 'name', direction: 'asc' }])
    );
}
