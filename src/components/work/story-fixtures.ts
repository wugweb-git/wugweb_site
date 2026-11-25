/**
 * Shared sample data for the case-study stories. Images and videos are files
 * that already live in R2 (the Work grid posters and clips); nothing here is
 * uploaded. Copy is sample text, not a real client's.
 */
import type { Media, Tile, Result, Milestone } from '../../lib/case-body';
import type { RelatedDoc, ScreenItem } from '../../lib/case-layout';

const R2 = 'https://pub-39ad1d03baec440faf48303be95c3782.r2.dev/assets/work';

export const poster = {
  kia: `${R2}/accelerating-loyalty-designing-kias-intuitive-customer-dashboard/kia-thumb-poster.webp`,
  adtech: `${R2}/adtech-and-imedia-sculpting-the-visual-identity-of-global-martech-summits/adtech-thumb-poster.webp`,
  xsafe: `${R2}/airtel-xsafe/xsafe-about-poster.webp`,
  xstream: `${R2}/airtel-xstream-play/Xstream-thumb-poster.webp`,
  cartier: `${R2}/cartier-careers/cartier-thumb-poster.webp`,
  adneto: `${R2}/crafting-digital-authority-the-adneto-website-showcase/adneto-thumb-poster.webp`,
  tot: `${R2}/crafting-digital-elegance-the-tot-bridal-launch-story/tot-thumb-poster.webp`,
  abc: `${R2}/demystifying-finance-crafting-the-ux-for-aditya-birla-capital-s-credit-score-tool/abc-thumb-poster.webp`,
  gratifi: `${R2}/gratify-the-intelligent-rewards-and-feedback-platform/gratifi-thumb-poster.webp`,
  indusninja: `${R2}/indusninja-your-ai-powered-financial-ninja/indusninja-thumb-poster.webp`,
  inkompass: `${R2}/inkompass/inkompass-thumb-poster.webp`,
  metcred: `${R2}/metcred/metcred-thumb-poster.webp`,
};

export const clip = {
  kia: `${R2}/accelerating-loyalty-designing-kias-intuitive-customer-dashboard/kia-thumb.mp4`,
  adtech: `${R2}/adtech-and-imedia-sculpting-the-visual-identity-of-global-martech-summits/adtech-thumb.mp4`,
};

export const image = (url: string, label = 'Screen', kind: Media['kind'] = 'screen'): Media => ({
  label,
  url,
  video: false,
  kind,
  caption: label,
});

export const video = (url: string, label = 'Walkthrough'): Media => ({
  label,
  url,
  video: true,
  kind: 'video',
  caption: label,
});

export const six: Media[] = [
  image(poster.kia, 'Dashboard'),
  image(poster.adtech, 'Summit identity', 'application'),
  image(poster.xsafe, 'Safety flow'),
  image(poster.xstream, 'Streaming home'),
  image(poster.cartier, 'Careers page', 'web'),
  image(poster.adneto, 'Website', 'web'),
];

export const tiles: Tile[] = [
  { group: 'Challenge', title: 'Too many paths', text: 'Members reached the same task through five different screens, and most gave up before the last one.' },
  { group: 'Approach', title: 'One path, tested early', text: 'We cut the flow to a single route and tested it with real members in the first two weeks.' },
  { group: 'Outcome', title: 'Fewer steps', text: 'The shortest route to the task went from nine steps to four.' },
];

export const results: Result[] = [
  { value: '4 steps', what: 'to complete the main task, down from 9', source: 'Product analytics', asOf: 'Q3 2026' },
  { value: '38%', what: 'more members finishing the flow', source: 'Product analytics', asOf: 'Q3 2026' },
  { value: '12 weeks', what: 'from kickoff to launch' },
];

export const milestones: Milestone[] = [
  { date: 'Week 1', text: 'Discovery and a review of the existing flow.' },
  { date: 'Week 4', text: 'First prototype tested with members.' },
  { date: 'Week 9', text: 'Build handed to engineering.' },
  { date: 'Week 12', text: 'Launch.' },
];

export const related: RelatedDoc[] = [
  { slug: 'airtel-xsafe', title: 'Airtel Xsafe: making home safety simple', shortTitle: 'Airtel Xsafe', thumbnailPath: poster.xsafe, industry: 'Telecom' },
  { slug: 'metcred', title: 'Metcred: a credit product built around trust', shortTitle: 'Metcred', thumbnailPath: poster.metcred, industry: 'Fintech' },
  { slug: 'inkompass', title: 'Inkompass: a clearer way to find your next step', shortTitle: 'Inkompass', thumbnailPath: poster.inkompass, industry: 'Careers' },
];

export const screens = (urls: string[], label: string): ScreenItem[] =>
  urls.map((url, i) => ({ ...image(url, `${label} ${i + 1}`), width: 900, height: 1800, alt: `${label} ${i + 1}` }));
