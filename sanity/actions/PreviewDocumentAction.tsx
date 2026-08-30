import React from 'react';
import { DocumentActionDescription, DocumentActionProps } from 'sanity';
import { LaunchIcon } from '@sanity/icons';

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
    const pageId = doc.pageId || '';
    if (pageId === 'home') return `${baseUrl}/`;
    return `${baseUrl}/${pageId}`;
  }
  if (type === 'person') {
    return `${baseUrl}/about`;
  }
  return null;
}

export function PreviewDocumentAction(props: DocumentActionProps): DocumentActionDescription | null {
  const { published, draft, type } = props;
  const doc = draft || published;

  if (!['post', 'caseStudy', 'service', 'singletonPage', 'person'].includes(type)) {
    return null;
  }

  const url = getLiveUrl(doc, type);
  if (!url) return null;

  return {
    label: 'View on Site',
    icon: LaunchIcon,
    title: 'Open this document on the live website (opens in a new tab)',
    onHandle: () => {
      window.open(url, '_blank', 'noopener,noreferrer');
    },
  };
}
