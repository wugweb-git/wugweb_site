import React from 'react';
import { DocumentActionDescription, DocumentActionProps } from 'sanity';
import { LaunchIcon } from '@sanity/icons/Launch';

/**
 * pageId -> route. Must match src/pages: several pages live under /footer/,
 * and contact / terms use their own slugs. A pageId missing here gets no button
 * rather than a guessed URL that 404s.
 */
const PAGE_PATHS: Record<string, string> = {
  home: '/',
  about: '/about',
  services: '/services',
  work: '/work',
  blog: '/blog',
  faq: '/faq',
  contact: '/contact-us',
  'privacy-policy': '/privacy-policy',
  'terms-of-use': '/termsofuse',
  'refund-policy': '/refund-policy',
  'cookie-policy': '/footer/cookie-policy',
  impact: '/footer/impact',
  industries: '/footer/industries',
  reviews: '/footer/reviews',
  sitemap: '/footer/sitemap',
  subscription: '/footer/subscription',
  kits: '/kits',
  '404': '/404',
  'contact-error': '/contact-error',
  offline: '/offline',
  'thank-you': '/thank-you',
};

function getLiveUrl(doc: any, type: string): string | null {
  if (!doc) return null;
  const baseUrl = 'https://wugweb.pages.dev';

  if (type === 'post' && doc.slug?.current) {
    return `${baseUrl}/blog/${doc.slug.current}`;
  }
  if (type === 'caseStudy' && doc.slug?.current) {
    return `${baseUrl}/work/${doc.slug.current}`;
  }
  if (type === 'service' && doc.slug?.current) {
    return `${baseUrl}/services/${doc.slug.current}`;
  }
  if (type === 'singletonPage') {
    // The page's own `route` field is the source; the map covers pages without one.
    const pageId = String(doc.pageId || doc._id || '').replace(/^drafts\./, '');
    const route = typeof doc.route === 'string' && doc.route.startsWith('/') ? doc.route : '';
    const path = route || PAGE_PATHS[pageId];
    return path ? `${baseUrl}${path}` : null;
  }
  if (type === 'person') {
    return `${baseUrl}/about`;
  }
  return null;
}

export function PreviewDocumentAction(props: DocumentActionProps): DocumentActionDescription | null {
  const { published, type } = props;

  if (!['post', 'caseStudy', 'service', 'singletonPage', 'person'].includes(type)) {
    return null;
  }

  // The live site shows the PUBLISHED version, so the URL comes from it. A
  // draft-only doc (or an unpublished slug change) has nothing live to open.
  if (!published) {
    return { label: 'View on Site', icon: LaunchIcon, disabled: true, title: 'Not published yet, so there is nothing live to open', onHandle: () => {} };
  }
  const url = getLiveUrl(published, type);
  if (!url) return null;

  return {
    label: 'View on Site',
    icon: LaunchIcon,
    title: 'Open the published version on the website (opens in a new tab)',
    onHandle: () => {
      window.open(url, '_blank', 'noopener,noreferrer');
    },
  };
}
