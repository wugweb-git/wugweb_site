import { withSeoDuplicateWarnings } from '../lib/seoFieldRules';
import service from './service';
import caseStudy from './caseStudy';
import post from './post';
import person from './person';
import singletonPage from './singletonPage';
import pageSection from './pageSection';
import siteSettings from './siteSettings';
import contactSubmission from './contactSubmission';
import syncStatus from './syncStatus';
import client from './client';
import industry from './industry';
import sector from './sector';
import engagement from './engagement';
import taxonomy from './taxonomy';
import asset from './asset';
import platformProfile from './platformProfile';
import testimonial from './testimonial';
import redirect from './redirect';
import brandAsset from './brandAsset';
import siteScript from './siteScript';
import navigationMenu from './navigationMenu';
import experiment from './experiment';
import {
  blockContent,
  cta,
  stats,
  accordion,
  logoCloud,
  video,
  mediaUrl,
  codeBlock,
  twoColumns,
  callout,
  quoteBlock,
  comparisonTable,
} from './blockContent';

// withSeoDuplicateWarnings: live duplicate seoTitle/seoDescription warnings
// (sanity/lib/seoFieldRules.ts). Both wrappers keep every existing rule.
export const schemaTypes = withSeoDuplicateWarnings([
  service,
  caseStudy,
  post,
  person,
  singletonPage,
  pageSection,
  siteSettings,
  contactSubmission,
  syncStatus,
  client,
  industry,
  sector,
  engagement,
  taxonomy,
  asset,
  platformProfile,
  testimonial,
  redirect,
  brandAsset,
  siteScript,
  navigationMenu,
  experiment,
  blockContent,
  cta,
  stats,
  accordion,
  logoCloud,
  video,
  mediaUrl,
  codeBlock,
  twoColumns,
  callout,
  quoteBlock,
  comparisonTable,
]);
