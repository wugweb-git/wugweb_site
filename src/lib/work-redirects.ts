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
  "airtel-xsafe-securing-homes-with-intuitive-digital-experiences": "/work/airtel-xsafe",
  "airtel-xstream-play-showcasing-indias-unified-digital-entertainment": "/work/airtel-xstream-play",
  "audiofolio-reinventing-audio-discovery-through-ai": "/work/audiofolio",
  "bankco-engineering-the-ultimate-banking-super-app-ecosystem": "/work/bankco",
  "plufo-crafting-an-immersive-edtech-ecosystem-for-young-learners": "/work/plufo",
  "redesigning-cartiers-career-website-where-passion-meets-excellence": "/work/cartier-careers",
  "redesigning-inkompass-cultivating-global-talent-for-a-smoke-free-future": "/work/inkompass",
  "rideev-powering-the-phygital-ev-revolution-in-india": "/work/rideev",
  "sadhan-streamlining-driver-onboarding-lead-management": "/work/sadhan",
  "spark-logistics-building-a-unified-logistics-intelligence-platform": "/work/spark-logistics",
  "the-avant-garde-of-banking-designing-the-metcred-zero-fee-mobile-experience": "/work/metcred",
  "thebizgift-reimagining-corporate-gifting-through-intelligent-commerce": "/work/thebizgift",
  "visione-empowering-workforce-development-with-competency-based-assessments": "/work/visione",
};
