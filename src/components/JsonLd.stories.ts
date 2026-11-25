import type { Meta, StoryObj } from '@storybook-astro/framework';
import JsonLd from './JsonLd.astro';

/**
 * Structured data for search and AI answers: one script with one @graph.
 * It renders no visible UI, so the canvas stays empty. Open the Docs tab or
 * inspect the iframe's head to read the JSON. Empty values are dropped.
 */
const meta: Meta<typeof JsonLd> = {
  title: 'Components/JSON-LD',
  component: JsonLd,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof JsonLd>;

export const Organization: Story = {
  args: {
    graph: [
      { '@type': 'Organization', '@id': 'https://www.wugweb.com/#organization', name: 'Wugweb', url: 'https://www.wugweb.com/' },
      { '@type': 'WebSite', '@id': 'https://www.wugweb.com/#website', url: 'https://www.wugweb.com/', name: 'Wugweb', publisher: { '@id': 'https://www.wugweb.com/#organization' } },
    ],
  },
};
