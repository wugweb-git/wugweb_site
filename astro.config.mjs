// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sanity from '@sanity/astro';

export default defineConfig({
  // Default rendering is server (SSR on Workers). Mark individual pages
  // as `export const prerender = true` to bake them at build time instead —
  // do this for services/work/blog pages that don't need per-request logic.
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough',
    platformProxy: { enabled: true }, // lets `astro dev` see wrangler bindings locally
  }),
  integrations: [
    // Embedded Studio at /admin (noindex, robots-disallowed, not in sitemap).
    sanity({
      projectId: 'splvhmk1',
      dataset: 'production',
      apiVersion: '2026-01-01',
      useCdn: true,
      studioBasePath: '/admin',
    }),
    react(),
  ],
  vite: {
    resolve: { dedupe: ['react', 'react-dom', 'styled-components', 'sanity'] },
  },
});
