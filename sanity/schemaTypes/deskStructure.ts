import { type StructureBuilder, type StructureResolver } from 'sanity/structure';
import { DocumentListPane } from '../components/DocumentListPane';

export const deskStructure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Wugweb')
    .items([
      // ── Overview ──
      sectionItem(S, 'Overview', '◈', [
        S.listItem()
          .title('Start here')
          .icon(() => '⌂')
          .child(
            S.list()
              .title('Start here')
              .items([
                S.documentTypeListItem('syncStatus').title('Sync Status'),
                S.documentTypeListItem('contactSubmission').title('Contact Submissions'),
              ])
          ),
        quickDoc(S, 'Site Settings', 'siteSettings', 'siteSettings', '⚙'),
      ]),

      S.divider(),

      // ── Content ──
      sectionItem(S, 'Content', '✎', [
        pane(S, 'post', 'Blog', 'Blog Posts', '✍', 'post'),
        pane(S, 'caseStudy', 'Case Studies', 'Case Studies', '💼', 'caseStudy'),
        pane(S, 'service', 'Services', 'Services', '🛠', 'service'),
        singletonPages(S),
      ]),

      S.divider(),

      // ── Navigation & Menus ──
      sectionItem(S, 'Navigation & Menus', '🗺', [
        pane(S, 'navigationMenu', 'Navigation Menus', 'All Menus', '🗺', 'navigationMenu'),
        S.listItem()
          .title('Header Main Menu')
          .icon(() => '⚡')
          .child(
            S.documentList()
              .title('Header Main Menu')
              .filter('_type == "navigationMenu" && menuId == "header-main"')
          ),
        S.listItem()
          .title('Footer Links')
          .icon(() => '🦶')
          .child(
            S.documentList()
              .title('Footer Links')
              .filter('_type == "navigationMenu" && (menuId == "footer-services" || menuId == "footer-sitemap" || menuId == "footer-legal")')
          ),
        pane(S, 'platformProfile', 'Presence & Social Links', 'Presence', '🔗', 'platformProfile'),
      ]),

      S.divider(),

      // ── Brand & Assets ──
      sectionItem(S, 'Brand & Assets', '🎨', [
        pane(S, 'brandAsset', 'Brand Assets & Logos', 'Brand & Icons', '🎨', 'brandAsset'),
        pane(S, 'asset', 'Media Library', 'Media Library', '▦', 'asset'),
      ]),

      S.divider(),

      // ── Integrations & Code ──
      sectionItem(S, 'Integrations & Code', '💻', [
        pane(S, 'siteScript', 'Tracking & Custom Scripts', 'Scripts & Code', '💻', 'siteScript'),
        pane(S, 'redirect', 'Redirects', 'Redirects', '↪', 'redirect'),
        S.listItem()
          .title('SEO Audit')
          .icon(() => '🔎')
          .child(
            S.documentList()
              .title('SEO — Pages needing attention')
              .filter('_type == "singletonPage" && !defined(seoDescription)')
              .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
          ),
      ]),

      S.divider(),

      // ── Business ──
      sectionItem(S, 'Business', '🏢', [
        pane(S, 'client', 'Clients', 'Clients', '🏢', 'client'),
        pane(S, 'engagement', 'Engagements', 'Engagements', '🤝', 'engagement'),
        pane(S, 'person', 'Team', 'Team / People', '👥', 'person'),
        pane(S, 'testimonial', 'Testimonials', 'Testimonials', '💬', 'testimonial'),
      ]),

      S.divider(),

      // ── Settings ──
      sectionItem(S, 'Settings', '⚙', [
        quickDoc(S, 'Site Settings', 'siteSettings', 'siteSettings', '⚙'),
        vocabList(S, 'Platforms', 'platform', '📡'),
        vocabList(S, 'Tools / Tech stack', 'tech-stack', '🛠'),
        vocabList(S, 'Tags', 'tag', '🏷'),
        vocabList(S, 'Asset types', 'asset-type', '🧩'),
        vocabList(S, 'Content types', 'content-type', '📄'),
        vocabList(S, 'Departments', 'team-department', '👥'),
        vocabList(S, 'Countries', 'country', '🌐'),
        pane(S, 'industry', 'Industries', 'Industry master', '🏭', 'industry'),
        pane(S, 'taxonomy', 'All taxonomy', 'All taxonomy', '📚', 'taxonomy'),
      ]),
    ]);

// ── Helpers ──

function sectionItem(S: StructureBuilder, title: string, icon: string, items: any[]) {
  return S.listItem().title(title).icon(() => icon).child(S.list().title(title).items(items));
}

function quickDoc(
  S: StructureBuilder,
  title: string,
  schemaType: string,
  documentId: string,
  icon: string
) {
  return S.listItem()
    .title(title)
    .icon(() => icon)
    .child(S.document().schemaType(schemaType).documentId(documentId).title(title));
}

function pane(
  S: StructureBuilder,
  key: string,
  title: string,
  label: string,
  icon: string,
  schemaType: string
) {
  return S.listItem()
    .title(title)
    .icon(() => icon)
    .child(
      S.component(DocumentListPane)
        .id(key)
        .title(label)
        .options({ schemaType, tableKey: key })
    );
}

function singletonPages(S: StructureBuilder) {
  const pages = [
    ['Home', 'home', '🏠'],
    ['About', 'about', '👋'],
    ['Services', 'services', '🛠'],
    ['Work', 'work', '💼'],
    ['Blog', 'blog', '✍'],
    ['FAQ', 'faq', '❓'],
    ['Contact', 'contact', '📬'],
    ['Privacy', 'privacy-policy', '🔒'],
    ['Terms', 'terms-of-use', '📋'],
    ['Refund', 'refund-policy', '💰'],
    ['Impact', 'impact', '🌍'],
    ['Subscription', 'subscription', '📨'],
    ['Sitemap', 'sitemap', '🗺'],
  ] as const;
  return S.listItem()
    .title('Pages')
    .icon(() => '📄')
    .child(
      S.list()
        .title('Pages')
        .items([
          pane(S, 'pages', 'All Pages', 'All Pages', '📄', 'singletonPage'),
          S.divider(),
          ...pages.map(([label, pageId, icon]) =>
            quickDoc(S, label, 'singletonPage', pageId, icon)
          ),
        ])
    );
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
