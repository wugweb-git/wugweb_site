/**
 * Retired case-study URLs → the surviving page, served as a 301.
 *
 * 2026-10-04: 13 case studies existed twice — a long headline slug and a short
 * client slug — and the long ones were deleted from Sanity, keeping the short
 * ones. The long URLs were the public ones (the /work grid linked them), so
 * anything indexed or shared under them would otherwise 404.
 *
 * Keys are the old slugs WITHOUT the /work/ prefix. Add to this map instead of
 * deleting a case study whose URL has ever been public.
 */
export const WORK_MOVED: Record<string, string> = {
  "airtel-xstream-play-showcasing-indias-unified-digital-entertainment": "/work/airtel-xstream-play-showcasing-indias-unified-digital-entertainment-on-the-web",
  "audiofolio-reinventing-audio-discovery-through-ai": "/work/musiclinkd-building-the-professional-infrastructure-for-the-music-industry",
  "bankco-engineering-the-ultimate-banking-super-app-ecosystem": "/work/bankco-revolutionizing-financial-engagement-with-a-super-app",
  "redesigning-cartiers-career-website-where-passion-meets-excellence": "/work/cartier-redesigning-the-career-website-where-passion-meets-excellence",
  "redesigning-inkompass-cultivating-global-talent-for-a-smoke-free-future": "/work/inkompass-cultivating-global-talent-for-a-smoke-free-future",
  "sadhan-streamlining-driver-onboarding-lead-management": "/work/sadhan-streamlining-driver-onboarding-and-lead-management",
  "spark-logistics-building-a-unified-logistics-intelligence-platform": "/work/spark-logistics",
  "the-avant-garde-of-banking-designing-the-metcred-zero-fee-mobile-experience": "/work/metcred-the-avant-garde-of-banking-designing-the-zero-fee-mobile-experience",
  "thebizgift-reimagining-corporate-gifting-through-intelligent-commerce": "/work/thebizgift",
};
