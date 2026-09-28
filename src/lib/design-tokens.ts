/**
 * Design-token data — the single source both `/kits` (the production-facing
 * showcase page) and the `TokenGallery` Storybook stories read from, so the
 * two catalogs can't drift apart. Values mirror `src/styles/global.css` and
 * `kits_design_system/docs/tokens/*.md`; when a token changes there, update
 * it here too.
 */

export const secondaryColors = [
  { name: 'Peach (Error / Action)', hex: '#E54F30', token: '--color-peach' },
  { name: 'Green (Success / Growth)', hex: '#3ED219', token: '--color-green' },
  { name: 'Blue (Accent / Engineering)', hex: '#2368D7', token: '--color-blue' },
  { name: 'Aqua (Experience / Vibrant)', hex: '#09E2C0', token: '--color-aqua' },
  { name: 'Primary Yellow (Brand Accent ≤10%)', hex: '#FFBE1A', token: '--color-yellow' },
  { name: 'Grey (Subtle Text)', hex: '#C9C9C9', token: '--color-grey' },
  { name: 'Ash (Surface Elevated)', hex: '#191919', token: '--color-ash' },
];

export const neutrals = [
  { name: 'Neutral 0 (Pure White)', hex: '#FFFFFF', token: '--neutral-0' },
  { name: 'Neutral 1 (Soft White)', hex: '#F4F4F4', token: '--neutral-1' },
  { name: 'Neutral 2 (Light Grey)', hex: '#DFDFDF', token: '--neutral-2' },
  { name: 'Neutral 3 (Muted Text)', hex: '#BABABA', token: '--neutral-3' },
  { name: 'Neutral 4 (Subtle Text)', hex: '#A3A3A3', token: '--neutral-4' },
  { name: 'Neutral 5 (Border Strong)', hex: '#7D7D7D', token: '--neutral-5' },
  { name: 'Neutral 6 (Medium Surface)', hex: '#444444', token: '--neutral-6' },
  { name: 'Neutral 7 (Elevated Surface)', hex: '#2B2B2B', token: '--neutral-7' },
  { name: 'Neutral 8 (Dark Surface)', hex: '#1A1A1A', token: '--neutral-8' },
  { name: 'Neutral 9 (Page Background)', hex: '#050505', token: '--neutral-9' },
  { name: 'Neutral 10 (Pure Black)', hex: '#000000', token: '--neutral-10' },
];

export const pillars = [
  { id: 'strategy', name: 'Strategy', baseHex: '#FA4108', darkHex: '#A22A05', lightHex: '#FF8F66', gradient: 'linear-gradient(135deg, #FA4108 0%, #FF8F66 100%)', desc: 'Product, Brand & Growth Architecture' },
  { id: 'brand', name: 'Brand', baseHex: '#E6309F', darkHex: '#951F67', lightHex: '#F17CC3', gradient: 'linear-gradient(135deg, #E6309F 0%, #F17CC3 100%)', desc: 'Identity Systems & Narrative Design' },
  { id: 'experience', name: 'Experience', baseHex: '#09E2C0', darkHex: '#05927C', lightHex: '#6EF0DC', gradient: 'linear-gradient(135deg, #09E2C0 0%, #6EF0DC 100%)', desc: 'UI/UX, Digital Platforms & Design Systems' },
  { id: 'engineering', name: 'Engineering', baseHex: '#2167E9', darkHex: '#143F8F', lightHex: '#7FA8F3', gradient: 'linear-gradient(135deg, #2167E9 0%, #7FA8F3 100%)', desc: 'Web, Mobile App & Platform Modernization' },
  { id: 'growth', name: 'Growth', baseHex: '#3ED219', darkHex: '#21870F', lightHex: '#9BE97F', gradient: 'linear-gradient(135deg, #3ED219 0%, #9BE97F 100%)', desc: 'Martech, CRO & Performance Engineering' },
  { id: 'operations', name: 'Operations', baseHex: '#7A4DFF', darkHex: '#4F32A5', lightHex: '#B49CFF', gradient: 'linear-gradient(135deg, #7A4DFF 0%, #B49CFF 100%)', desc: 'Managed Application Support & Reliability' },
];

export const typographySpecimens = [
  { token: '--fluid-display', weight: '800', role: 'Display Hero', sample: 'Digital Experience & Platform Engineering', px: '48px → 80px', line: '1.2' },
  { token: '--fluid-h1', weight: '700', role: 'Heading 1', sample: 'Architecting High-Performance Digital Systems', px: '36px → 48px', line: '1.2' },
  { token: '--fluid-h2', weight: '600', role: 'Heading 2', sample: 'Modular Design Tokens & Enterprise Architecture', px: '30px → 36px', line: '1.375' },
  { token: '--fluid-h3', weight: '600', role: 'Heading 3', sample: 'Fluid Clamp Typography & Surface System', px: '21px → 24px', line: '1.375' },
  { token: '--fluid-h4', weight: '600', role: 'Heading 4', sample: 'Accessible Viewport Scaling & Dynamic Layouts', px: '18px → 20px', line: '1.5' },
  { token: '--fluid-h5', weight: '600', role: 'Heading 5', sample: 'Section Label & Card Heading', px: '16px → 20px', line: '1.375' },
  { token: '--fluid-body-lg', weight: '400', role: 'Body Large', sample: 'Every token is carefully calibrated for responsive viewports using native CSS clamp expressions.', px: '16px → 18px', line: '1.625' },
  { token: '--fluid-body-md', weight: '400', role: 'Body Medium', sample: 'Standard body copy font size used across marketing, blog, and service documentation.', px: '14px → 16px', line: '1.5' },
  { token: '--fluid-body-sm', weight: '400', role: 'Body Small', sample: 'Secondary metadata, captions, and supplementary micro-copy details.', px: '13px → 14px', line: '1.5' },
  { token: '--fluid-label', weight: '500', role: 'Label / Eyebrow', sample: 'DESIGN SYSTEM TOKENS & PRIMITIVES', px: '16px', tracking: '0.08em', line: '1.2' },
  { token: '--fluid-caption', weight: '400', role: 'Caption / Micro', sample: 'Updated: Kits Design System v4.2 · Single Source of Truth', px: '12px → 14px', line: '1.5' },
  { token: '--fluid-nano', weight: '400', role: 'Nano / micro-label', sample: 'UPPERCASE MONO TAG', px: '10px', line: '1.375' },
];

export const spacingRamp = [
  { token: '--s-1', px: '4px' },
  { token: '--s-2', px: '8px' },
  { token: '--s-3', px: '12px' },
  { token: '--s-4', px: '16px' },
  { token: '--s-6', px: '24px' },
  { token: '--s-8', px: '32px' },
  { token: '--s-10', px: '40px' },
  { token: '--s-12', px: '48px' },
];

export const radiusRamp = [
  { token: '--r-0 / --radius-none', val: '0px' },
  { token: '--r-1 / --radius-xs', val: '4px' },
  { token: '--r-2 / --radius-sm', val: '8px' },
  { token: '--r-3 / --radius-md', val: '12px' },
  { token: '--r-4 / --radius-lg', val: '16px' },
  { token: '--r-6 / --radius-2xl', val: '24px' },
  { token: '--r-full / --radius-full', val: '9999px' },
];

export const opacityRamp = [
  { token: '--opacity-10', val: '10%' },
  { token: '--opacity-20', val: '20%' },
  { token: '--opacity-40 (disabled)', val: '40%' },
  { token: '--opacity-60', val: '60%' },
  { token: '--opacity-80', val: '80%' },
  { token: '--opacity-100', val: '100%' },
];

export const motionEasings = [
  { name: 'Standard (in-out)', token: '--easing-standard', cubic: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  { name: 'Spring', token: '--easing-spring', cubic: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
  { name: 'Smooth', token: '--easing-smooth', cubic: 'cubic-bezier(0.22, 1, 0.36, 1)' },
  { name: 'Editorial', token: '--easing-editorial', cubic: 'cubic-bezier(0.16, 1, 0.3, 1)' },
];

export const faqs = [
  { q: 'What is the Kits Design System?', a: 'Kits is Wugweb’s single source of truth design token & component framework. It enforces fluid clamp typography, strict weight hierarchies, surface elevation tiers, and 6-pillar color systems across all digital properties.' },
  { q: 'How does fluid typography work in Kits?', a: 'Fluid typography uses CSS clamp() functions (e.g. clamp(2.5rem, 5.5vw + 0.5rem, 5rem)) to seamlessly scale font size between mobile devices and ultra-wide desktop displays without jarring breakpoint jumps.' },
  { q: 'What are the 6 service pillar themes?', a: 'The 6 service pillars are Strategy, Brand, Experience, Engineering, Growth, and Operations. Each pillar owns a distinct color accent, theme gradient, and capability matrix.' },
  { q: 'How are design tokens integrated into Astro & Sanity?', a: 'Tokens are defined in global.css as native CSS custom properties. Sanity Studio models manage content, while Astro components consume variables directly for 100% theme consistency.' },
];
