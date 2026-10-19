import type { Meta, StoryObj } from '@storybook-astro/framework';
import SectorShowcase from './SectorShowcase.astro';
import type { ShowcaseSector } from '../lib/sectors';

/**
 * The one sectors section, sitewide (BaseLayout's global instance and the
 * homepage's). Spec: `kits_design_system/docs/blocks/sector-showcase.md`.
 *
 * Every UI change to this section is made in SectorShowcase.astro and checked
 * here; pages only pass copy. Live data comes from Notion Table 25 / Table 3
 * via Sanity — these stories use fixtures with real sector names.
 *
 * Interaction to check in the canvas: hover a card (fine pointer only) — the
 * surface steps up, the shadow grows, the icon turns yellow; Tab through — one
 * stop per card, focus ring on the whole card; press — the card steps down and
 * scales to 0.98.
 */
const meta: Meta<typeof SectorShowcase> = {
  title: 'Blocks/Sector Showcase',
  component: SectorShowcase,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof SectorShowcase>;

const s = (n: number, name: string, icon: string | undefined, industries: string[]): ShowcaseSector =>
  ({ _id: `sector-SEC-${n}`, name, slug: name.toLowerCase().replace(/&/g, '').replace(/[^a-z0-9]+/g, '-'), icon, industries });

const eight: ShowcaseSector[] = [
  s(15, 'Fintech', 'wallet', ['Digital Finance', 'Neobanking']),
  s(2, 'Consumer & Retail', 'shopping-bag', ['eCommerce', 'D2C']),
  s(3, 'Media & Entertainment', 'clapperboard', ['Media', 'Music']),
  s(10, 'Automotive & Mobility', 'car', ['Automotive', 'Electric Vehicles']),
  s(6, 'Healthcare', 'heart-pulse', ['Mental Health', 'Pharma']),
  s(5, 'Travel & Hospitality', 'plane', ['Aviation', 'Hotels & Restaurants']),
  s(7, 'Technology', 'cpu', ['SaaS', 'AI/ML']),
  s(13, 'Public Sector', 'landmark', ['Government']),
];

const globalCopy = {
  heading: 'Industries We Empower',
  intro: 'From local businesses to international corporations, our clients all share one common understanding when it comes to building authentic brands: the power of research, strategy, creativity, and design.',
  ctaLabel: 'More about us',
  ctaHref: '/about',
};

export const EightCards: Story = { name: '8 cards (global copy)', args: { sectors: eight, ...globalCopy } };

export const SixCards: Story = { name: '6 cards', args: { sectors: eight.slice(0, 6), ...globalCopy } };

export const Homepage: Story = {
  name: 'Homepage copy',
  args: {
    sectors: eight,
    heading: 'We understand the context behind the product.',
    intro: 'From regulated sectors to fast-moving consumer markets, our experience spans industries that demand precision and creativity in equal measure.',
    ctaLabel: 'Explore All Industries',
    ctaHref: '/footer/industries',
  },
};

export const DefaultCopy: Story = { name: 'No copy from CMS (component defaults)', args: { sectors: eight } };

export const FewCards: Story = { name: '1–3 sectors (no stretching)', args: { sectors: eight.slice(0, 3), ...globalCopy } };

export const OddCount: Story = { name: 'Odd count (partial last row)', args: { sectors: eight.slice(0, 7), ...globalCopy } };

export const EdgeCards: Story = {
  name: 'Edge cards: no industries, missing icon, long name',
  args: {
    ...globalCopy,
    sectors: [
      s(16, 'Professional Services', 'briefcase', []),
      s(11, 'Social Services', undefined, ['Non-Profit']),
      s(9, 'Energy & Industrial', 'not-a-lucide-icon', ['Manufacturing', 'Renewable Energy']),
      s(17, 'Real Estate, Construction & Infrastructure Development', 'building-2', ['Real Estate', 'Architecture & Interiors']),
    ],
  },
};

export const Empty: Story = { name: '0 sectors (section not rendered)', args: { sectors: [], ...globalCopy } };

export const Interaction: Story = {
  name: 'Interaction: hover, focus, press',
  args: { sectors: eight.slice(0, 4), ...globalCopy },
  parameters: {
    docs: { description: { story: 'Hover with a mouse, Tab through with the keyboard, and press a card. States are pure CSS (pseudo-classes and media queries) in SectorShowcase.astro.' } },
  },
};
