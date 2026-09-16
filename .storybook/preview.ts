import '../src/styles/global.css';
import RevealDecorator from './decorators/RevealDecorator.astro';

/**
 * Loads the real design tokens (`global.css`) so every story renders with
 * production colours, spacing and type — not Storybook's defaults.
 *
 * Interactivity: `@storybook-astro/framework` renders `.astro` components
 * through Astro's Container API. A component's own inline `<script>` ships
 * inside that rendered HTML, so it runs the same way it does on the live
 * site once the browser parses the preview document — no decorator or play
 * function is needed to "wake it up". Astro decorators themselves are static
 * wrappers only (SSR at render time) and cannot run JS from the decorator
 * function itself — but a decorator *component* can carry its own `<script>`,
 * which is how `RevealDecorator` runs `initScrollAnimations()` globally. See
 * that file for why every story needs it.
 */
const preview = {
  decorators: [RevealDecorator],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'wugweb-dark',
      values: [{ name: 'wugweb-dark', value: '#0b0b0b' }],
    },
  },
};

export default preview;
