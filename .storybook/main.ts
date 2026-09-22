import type { StorybookConfig } from '@storybook-astro/framework';

/**
 * Maps out the wugweb.com block/component library. Stories live next to
 * their `.astro` source as `*.stories.ts` — see `kits_design_system/docs/`
 * for the written spec each block should match.
 *
 * `@storybook-astro/framework` renders `.astro` components through Astro's
 * Container API (SSR), so tokens, scoped styles and markup are the real
 * production output. See `.storybook/preview.ts` for why interactive
 * behaviour (GSAP, accordions, the process-map springs) needs an explicit
 * decorator instead of the component's own inline `<script>`.
 */
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  framework: {
    name: '@storybook-astro/framework',
    options: {},
  },
  addons: [
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
    // '@storybook/addon-vitest' removed 2026-09-23 — permanently incompatible
    // with @storybook-astro/framework, not a config gap. Its CLI hard-codes a
    // 12-entry framework allowlist (react-vite, vue3-vite, svelte-vite, …) in
    // AddonVitestService.constants.ts and rejects anything outside it before
    // any vitest.config wiring is even reached — see
    // node_modules/storybook/dist/_node-chunks/chunk-XGT335GY.js,
    // validateCompatibility(). No Astro entry exists or is planned.
  ],
};

export default config;
