import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// NOTE: this reads from build-time env (import.meta.env, from a local
// .env file), NOT from the Cloudflare runtime. The `[vars]` block in
// wrangler.toml only becomes available via `Astro.locals.runtime.env`
// at *request* time — it does not feed astro build's import.meta.env.
// So: put SANITY_PROJECT_ID / SANITY_DATASET in your CI build's .env
// (or CI secrets) too, not just wrangler.toml, or the build will bake
// in an empty projectId. If you later need a request-scoped client
// (e.g. draft-mode with a per-request token), build one inline in the
// page/API route using locals.runtime.env instead of this module.

const projectId = import.meta.env.SANITY_PROJECT_ID || 'splvhmk1';

export const sanityClient = createClient({
  projectId,
  dataset: import.meta.env.SANITY_DATASET ?? 'production',
  apiVersion: '2026-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: any) => builder.image(source);
