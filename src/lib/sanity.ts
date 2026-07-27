import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.SANITY_PROJECT_ID || 'splvhmk1';
const dataset = import.meta.env.SANITY_DATASET ?? 'production';
const apiVersion = '2026-01-01';

// Build-time client — always CDN. Pages that need draft/preview should
// create a request-scoped client using locals.runtime.env instead.
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// Create a preview-aware client. Call with a token from the request
// context (e.g. locals.runtime.env.SANITY_PREVIEW_TOKEN).
export function getPreviewClient(token?: string) {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: token || undefined,
    perspective: token ? 'previewDrafts' : 'published',
  });
}

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: any) => builder.image(source);
