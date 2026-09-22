import type { Meta, StoryObj } from '@storybook-astro/framework';
import ServiceTagField from './ServiceTagField.astro';
import { SERVICE_TAGS } from '../lib/service-tags-data';

/**
 * "What we do" draggable tag field — six pastel pills, one per service
 * pillar. Full spec: `kits_design_system/docs/blocks/service-tag-field.md`.
 * Behaviour: `src/lib/draggable-tags.ts` (GSAP Draggable + InertiaPlugin +
 * Flip + ScrollTrigger).
 *
 * Interaction to check in the canvas: drag any tag — it should move freely
 * with momentum, leave a fading trail, and come to the front; click a tag's
 * face to expand it in place (media → title → copy → "Learn more"); click
 * "Learn more" to watch it grow to fill the viewport before navigating.
 */
const meta: Meta<typeof ServiceTagField> = {
  title: 'Blocks/Service Tag Field',
  component: ServiceTagField,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof ServiceTagField>;

export const Default: Story = {
  args: { tags: SERVICE_TAGS },
};

export const ThreeTags: Story = {
  name: 'Fewer tags',
  args: { tags: SERVICE_TAGS.slice(0, 3) },
};
