// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';

export default defineConfig({
  // Default rendering is server (SSR on Workers). Mark individual pages
  // as `export const prerender = true` to bake them at build time instead —
  // do this for services/work/blog pages that don't need per-request logic.
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough',
    platformProxy: { enabled: true }, // lets `astro dev` see wrangler bindings locally
  }),
  integrations: [react()],
});
