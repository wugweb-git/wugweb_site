import { type StructureBuilder, type StructureResolver } from 'sanity/structure';
import {
  // Section/nav icons
  DashboardIcon, ThListIcon, SearchIcon, ImageIcon, ImagesIcon,
  // Content types
  ComposeIcon, CaseIcon, RocketIcon, DocumentsIcon, DocumentIcon, DocumentTextIcon, EditIcon,
  // Business
  UsersIcon, UserIcon, LeaveIcon, StarIcon, CommentIcon,
  // Navigation & Settings
  MenuIcon, LinkIcon, EarthAmericasIcon, PlugIcon, ArchiveIcon,
  // System / health
  BellIcon, WarningFilledIcon, ClockIcon, CalendarIcon, LaunchIcon,
  // Brand & Media
  TagIcon, OlistIcon,
  // Industry & Taxonomy
  PackageIcon, PinIcon, BookIcon, CogIcon, ControlsIcon,
  // Singleton pages
  HomeIcon, InfoOutlineIcon, EnvelopeIcon, LockIcon, BillIcon, HeartIcon, SortIcon,
} from '@sanity/icons';
import { DocumentListPane } from '../components/DocumentListPane';

export const deskStructure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Wugweb Studio')
    .items([

      // ── ✎ Content ────────────────────────────────────────────────
      sectionItem(S, 'Content', ComposeIcon, [
        pane(S, 'post',      'Blog Posts',   'Blog Posts',   ComposeIcon, 'post'),
        pane(S, 'caseStudy', 'Case Studies', 'Case Studies', CaseIcon,    'caseStudy'),
        pane(S, 'service',   'Services',     'Services',     RocketIcon,  'service'),
        singletonPages(S),
        globalSections(S),
      ]),

      S.divider(),

      // ── 🎨 Brand & Assets ─────────────────────────────────────────
      sectionItem(S, 'Brand & Assets', ImagesIcon, [
        pane(S, 'asset', 'Media Library', 'Media Library', ImageIcon, 'asset'),
      ]),

      S.divider(),

      // ── ⚡ Marketing ──────────────────────────────────────────────
      sectionItem(S, 'Marketing', LaunchIcon, [
        pane(S, 'navigationMenu', 'Navigation Menus', 'All Menus', MenuIcon, 'navigationMenu'),
        S.listItem()
          .title('Header Main Menu')
          .icon(MenuIcon)
          .child(
            S.documentList()
              .title('Header Main Menu')
              .filter('_type == "navigationMenu" && menuId == "header-main"')
          ),
        S.listItem()
          .title('Footer Links')
          .icon(LinkIcon)
          .child(
            S.documentList()
              .title('Footer Links')
              .filter('_type == "navigationMenu" && (menuId == "footer-services" || menuId == "footer-sitemap" || menuId == "footer-legal")')
          ),
        pane(S, 'redirect', 'Redirects', 'Redirects', LinkIcon, 'redirect'),
      ]),

      S.divider(),

      // ── 🏢 Business ────────────────────────────────────────────────
      sectionItem(S, 'Business', UsersIcon, [
        pane(S, 'client',      'Clients',      'Clients',          EarthAmericasIcon, 'client'),
        pane(S, 'engagement',  'Engagements',  'Engagements',       ArchiveIcon,       'engagement'),
        pane(S, 'person',      'Team',          'Team / People',    UserIcon,          'person'),
        pane(S, 'testimonial', 'Testimonials', 'Testimonials',     StarIcon,          'testimonial'),
        pane(S, 'platformProfile', 'Presence & Social', 'Presence', PlugIcon,         'platformProfile'),
      ]),

      S.divider(),

      // ── ⚙ Settings ────────────────────────────────────────────────
      sectionItem(S, 'Settings', CogIcon, [
        quickDoc(S, 'Site Settings', 'siteSettings', 'siteSettings', ControlsIcon),
        pane(S, 'siteScript', 'Tracking & Scripts', 'Scripts & Code', PlugIcon, 'siteScript'),
        S.divider(),
        vocabList(S, 'Platforms',        'platform',        PlugIcon),
        vocabList(S, 'Tools / Tech',     'tech-stack',      OlistIcon),
        vocabList(S, 'Tags',             'tag',             TagIcon),
        vocabList(S, 'Asset types',      'asset-type',      PackageIcon),
        vocabList(S, 'Content types',    'content-type',    DocumentsIcon),
        vocabList(S, 'Departments',      'team-department', UsersIcon),
        vocabList(S, 'Countries',        'country',         EarthAmericasIcon),
        pane(S, 'sector',   'Sectors',    'Sector master',    PinIcon,  'sector'),
        pane(S, 'industry', 'Industries', 'Industry master',  PinIcon,  'industry'),
        pane(S, 'taxonomy', 'All taxonomy', 'All taxonomy',   BookIcon, 'taxonomy'),
      ]),

      S.divider(),

      // ── 🔴 System (health / ops — for admins) ─────────────────────
      sectionItem(S, 'System', BellIcon, [
        S.listItem()
          .title('Drafts Needing Review')
          .icon(EditIcon)
          .child(
            S.documentList()
              .title('Draft Documents')
              .filter('_id in path("drafts.**")')
              .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
          ),
        S.listItem()
          .title('Missing SEO Meta')
          .icon(WarningFilledIcon)
          .child(
            S.documentList()
              .title('Missing SEO Description')
              .filter('(_type in ["post", "caseStudy", "service", "singletonPage"]) && !defined(seoDescription)')
              .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
          ),
        S.listItem()
          .title('Missing Cover Images')
          .icon(ImageIcon)
          .child(
            S.documentList()
              .title('Missing Cover Media')
              .filter('(_type in ["post", "caseStudy"]) && !defined(coverImage) && !defined(coverPath)')
              .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
          ),
        S.listItem()
          .title('Scheduled Content')
          .icon(ClockIcon)
          .child(
            S.documentList()
              .title('Future Scheduled Posts')
              .filter('_type == "post" && dateTime(publishedAt) > dateTime(now())')
              .defaultOrdering([{ field: 'publishedAt', direction: 'asc' }])
          ),
        S.divider(),
        pane(S, 'syncStatus',        'Sync Status',          'Sync Status',        CalendarIcon, 'syncStatus'),
        pane(S, 'contactSubmission', 'Contact Submissions',  'Contact Submissions', EnvelopeIcon, 'contactSubmission'),
      ]),

    ]);

// ── Helpers ─────────────────────────────────────────────────────────────────

function sectionItem(S: StructureBuilder, title: string, icon: any, items: any[]) {
  return S.listItem().title(title).icon(icon).child(S.list().title(title).items(items));
}

function quickDoc(
  S: StructureBuilder,
  title: string,
  schemaType: string,
  documentId: string,
  icon: any
) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(S.document().schemaType(schemaType).documentId(documentId).title(title));
}

function pane(
  S: StructureBuilder,
  key: string,
  title: string,
  label: string,
  icon: any,
  schemaType: string
) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.component(DocumentListPane)
        .id(key)
        .title(label)
        .options({ schemaType, tableKey: key })
    );
}

function singletonPages(S: StructureBuilder) {
  const pages: [string, string, any][] = [
    ['Home',           'home',           HomeIcon],
    ['About',          'about',          InfoOutlineIcon],
    ['Services',       'services',       RocketIcon],
    ['Work',           'work',           CaseIcon],
    ['Blog',           'blog',           ComposeIcon],
    ['FAQ',            'faq',            CommentIcon],
    ['Contact',        'contact',        EnvelopeIcon],
    ['Privacy Policy', 'privacy-policy', LockIcon],
    ['Terms of Use',   'terms-of-use',   DocumentTextIcon],
    ['Refund Policy',  'refund-policy',  BillIcon],
    ['Cookie Policy',  'cookie-policy',  DocumentTextIcon],
    ['Impact',         'impact',         HeartIcon],
    ['Industries',     'industries',     EarthAmericasIcon],
    ['Subscription',   'subscription',   EnvelopeIcon],
    ['Reviews',        'reviews',        HeartIcon],
    ['Sitemap',        'sitemap',        SortIcon],
    ['Kits Showcase',  'kits',           ControlsIcon],
  ];
  return S.listItem()
    .title('Pages')
    .icon(DocumentsIcon)
    .child(
      S.list()
        .title('Pages')
        .items([
          pane(S, 'pages', 'All Pages', 'All Pages', DocumentsIcon, 'singletonPage'),
          S.divider(),
          ...pages.map(([label, pageId, icon]) =>
            quickDoc(S, label, 'singletonPage', pageId, icon)
          ),
        ])
    );
}

/**
 * Section tier. Document ids are `section-<sectionId>`, NOT the bare sectionId.
 *
 * The bare form collides with singletonPage, which uses `_id === pageId`:
 * `industries` is both a pageId and a sectionId, so a pageSection created at
 * `_id: 'industries'` would land on top of the industries *page* document.
 * That is not theoretical — it happened on 2026-09-24 and overwrote that page's
 * title before it was caught and repaired. The prefix keeps both namespaces
 * open-by-fixed-id without either being able to clobber the other.
 */
function globalSections(S: StructureBuilder) {
  const sections: [string, string, any][] = [
    ['Industries strip', 'industries',     EarthAmericasIcon],
    ['Insights teaser',  'insights',       ComposeIcon],
    ['Final CTA',        'final-cta',      RocketIcon],
    ['Cookie consent',   'cookie-consent', LockIcon],
    ['Trust badges',     'trust-badges',   HeartIcon],
  ];
  return S.listItem()
    .title('Global Sections')
    .icon(ControlsIcon)
    .child(
      S.list()
        .title('Global Sections')
        .items([
          pane(S, 'globalSections', 'All Sections', 'All Sections', DocumentsIcon, 'pageSection'),
          S.divider(),
          ...sections.map(([label, sectionId, icon]) =>
            quickDoc(S, label, 'pageSection', `section-${sectionId}`, icon)
          ),
        ])
    );
}

function vocabList(S: StructureBuilder, title: string, vocabulary: string, icon: any) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.documentList()
        .title(title)
        .filter('_type == "taxonomy" && vocabulary == $vocabulary')
        .params({ vocabulary })
        .defaultOrdering([{ field: 'order', direction: 'asc' }, { field: 'name', direction: 'asc' }])
    );
}
