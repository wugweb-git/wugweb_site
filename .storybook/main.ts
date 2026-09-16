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
    '@storybook/addon-vitest'
  ],
};

export default config;
