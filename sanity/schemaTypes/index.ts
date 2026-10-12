import { withVoice } from '../lib/voiceFields';
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

// withVoice: appends brand-voice WARNING rules to the target fields of
// post, caseStudy, singletonPage and service (sanity/lib/voiceFields.tsx).
export const schemaTypes = withVoice([
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
