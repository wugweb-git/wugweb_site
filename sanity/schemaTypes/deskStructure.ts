import { type StructureBuilder, type StructureResolver } from 'sanity/structure';

export const deskStructure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Singleton pages — each is a single document
      S.listItem()
        .title('Site Settings')
        .icon(() => '⚙️')
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings'),
        ),
      S.divider(),

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

      // Collections
      S.documentTypeListItem('caseStudy').title('Case Studies').icon(() => '💼'),
      S.documentTypeListItem('post').title('Blog Posts').icon(() => '✍️'),
      S.documentTypeListItem('service').title('Services').icon(() => '🛠️'),
      S.documentTypeListItem('person').title('Team').icon(() => '👥'),
      S.divider(),
      S.documentTypeListItem('contactSubmission').title('Contact Submissions').icon(() => '📬'),
    ]);

function singletonPageItem(S: StructureBuilder, label: string, pageId: string, icon: string) {
  return S.listItem()
    .title(label)
    .icon(() => icon)
    .child(
      S.document()
        .schemaType('singletonPage')
        .documentId(pageId)
        .documentTitle(label),
    );
}
