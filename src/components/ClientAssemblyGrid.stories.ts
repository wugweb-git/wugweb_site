import type { Meta, StoryObj } from '@storybook-astro/framework';
import ClientAssemblyGrid, { type ClientLogo } from './ClientAssemblyGrid.astro';

/**
 * Full-viewport client-logo grid — scatters, converges, holds, disperses on
 * scroll (`data-scroll="assemble"`, handled generically by
 * `src/lib/scroll-animations.ts`, no component-level wiring needed). Full
 * spec: `kits_design_system/docs/blocks/client-assembly-grid.md`.
 *
 * Interaction to check in the canvas: scroll the story past the grid — tiles
 * should converge into rows, hold, then scatter back out as it leaves.
 */
const meta: Meta<typeof ClientAssemblyGrid> = {
  title: 'Blocks/Client Assembly Grid',
  component: ClientAssemblyGrid,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof ClientAssemblyGrid>;

const logos: ClientLogo[] = [
  { name: 'Axis Bank', src: '/assets/logos/client-logo-d64b.png' },
  { name: 'Bankco', src: '/assets/logos/client-logo-qhmv.png' },
  { name: 'Cartier', src: '/assets/logos/client-logo-jrot.png' },
  { name: 'Gratifi', src: '/assets/logos/client-logo-5nzb.png' },
  { name: 'IndusInd Bank', src: '/assets/logos/client-logo-k5hy.png' },
  { name: 'Inkompass', src: '/assets/logos/client-logo-9fd5.png' },
  { name: 'Kia', src: '/assets/logos/client-logo-5nkj.png' },
  { name: 'NTUC', src: '/assets/logos/client-logo-grfk.png' },
  { name: 'Plufo', src: '/assets/logos/client-logo-6djh.png' },
  { name: 'RideEV', src: '/assets/logos/client-logo-1gbn.png' },
  { name: 'Valyu', src: '/assets/logos/client-logo-jj6k.png' },
];

export const Default: Story = { args: { logos } };

export const CustomHeading: Story = {
  args: { logos, heading: 'Backed by', headingAccent: 'ambitious teams' },
};

export const SmallSet: Story = {
  name: 'Small set (heavier padding)',
  args: { logos: logos.slice(0, 3) },
};
