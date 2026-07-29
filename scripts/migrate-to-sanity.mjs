#!/usr/bin/env node
/**
 * Sanity Migration Script
 *
 * Pushes all hardcoded content (case studies, blog posts, team members,
 * site settings) from the Astro frontend into the Sanity dataset.
 *
 * Usage:
 *   SANITY_TOKEN=your-write-token node scripts/migrate-to-sanity.mjs
 *
 * Get a write token: sanity.io/manage → project splvhmk1 → API → Tokens
 */

import { createClient } from '@sanity/client';

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error('Missing SANITY_TOKEN env var');
  process.exit(1);
}

const client = createClient({
  projectId: 'splvhmk1',
  dataset: 'production',
  apiVersion: '2026-07-28',
  token,
  useCdn: false,
});

// Helper: upload a local file asset to Sanity and return its asset ID
async function uploadAsset(filePath) {
  try {
    const { readFileSync, existsSync } = await import('fs');
    const { resolve } = await import('path');
    const fullPath = resolve(process.cwd(), 'public', filePath.replace(/^\//, ''));
    if (!existsSync(fullPath)) {
      console.warn(`  ⚠️  Asset not found: ${fullPath}`);
      return null;
    }
    const buffer = readFileSync(fullPath);
    const asset = await client.assets.upload('file', buffer, {
      filename: filePath.split('/').pop(),
    });
    console.log(`  ✅ Uploaded asset: ${filePath} → ${asset._id}`);
    return asset._id;
  } catch (e) {
    console.warn(`  ⚠️  Could not upload ${filePath}: ${e.message}`);
    return null;
  }
}

// Helper: create or replace a document by ID
async function upsert(doc) {
  try {
    await client.createOrReplace(doc);
    console.log(`  ✅ ${doc._type} "${doc._id}"`);
  } catch (e) {
    console.error(`  ❌ ${doc._type} "${doc._id}": ${e.message}`);
  }
}

// ── STEP 1: Site Settings ──────────────────────────────────────
async function migrateSiteSettings() {
  console.log('\n📋 Site Settings');
  await upsert({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteTitle: 'Wugweb — Digital Experience Agency',
    seoDescription: 'Wugweb is a digital experience agency crafting brand strategy, UX design, martech, AI, and web development for ambitious teams.',
    language: 'en-GB',
    copyright: 'Copyright 2020-2025 © Wugweb®',
    contactEmail: 'hello@wugweb.com',
    companyName: 'Wugweb',
    socialLinks: [
      { platform: 'Twitter/X', url: 'https://x.com/wugweb' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/company/wugweb' },
      { platform: 'Instagram', url: 'https://instagram.com/wugweb' },
    ],
  });
}

// ── STEP 2: Singleton Pages ────────────────────────────────────
async function migratePages() {
  console.log('\n📋 Singleton Pages');

  const pages = [
    {
      _id: 'home', _type: 'singletonPage', pageId: 'home',
      title: 'Where Vision Meets Velocity',
      subtitle: 'A world-class digital experience agency',
    },
    {
      _id: 'about', _type: 'singletonPage', pageId: 'about',
      title: 'Wugweb is evolving in the digital landscape and has rapidly moved forward, with our services expanding to digital marketing, emerging tech innovation & production.',
    },
    {
      _id: 'services', _type: 'singletonPage', pageId: 'services',
      title: 'What We Do',
      subtitle: 'Crafting UI, UX, and Brand Systems that drive meaning',
    },
    {
      _id: 'work', _type: 'singletonPage', pageId: 'work',
      title: 'We create digital solutions that are as functional as they are beautiful.',
    },
    {
      _id: 'blog', _type: 'singletonPage', pageId: 'blog',
      title: 'We create digital solutions that are as functional as they are beautiful.',
    },
    {
      _id: 'faq', _type: 'singletonPage', pageId: 'faq',
      title: 'Frequently Asked Questions',
    },
    {
      _id: 'contact', _type: 'singletonPage', pageId: 'contact',
      title: 'Are you ready to build something that matters?',
      subtitle: "We're always looking for passionate clients and talented professionals to join us in creating impactful work.",
    },
    {
      _id: 'privacy-policy', _type: 'singletonPage', pageId: 'privacy-policy',
      title: 'Privacy Policy',
    },
    {
      _id: 'terms-of-use', _type: 'singletonPage', pageId: 'terms-of-use',
      title: 'Terms of Use',
    },
    {
      _id: 'refund-policy', _type: 'singletonPage', pageId: 'refund-policy',
      title: 'Refund Policy',
    },
    {
      _id: 'impact', _type: 'singletonPage', pageId: 'impact',
      title: 'Impact',
    },
    {
      _id: 'subscription', _type: 'singletonPage', pageId: 'subscription',
      title: 'Subscription',
    },
    {
      _id: 'sitemap', _type: 'singletonPage', pageId: 'sitemap',
      title: 'Sitemap',
    },
  ];

  for (const page of pages) {
    await upsert(page);
  }
}

// ── STEP 3: Case Studies ───────────────────────────────────────
const caseStudiesData = [
  {
    slug: 'the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform',
    title: 'The Architecture of Loyalty: Designing the Axis Bank Savings Account Platform',
    client: 'Axis Bank',
    disciplines: ['Strategy', 'UX Design'],
    team: ['Axis Bank', 'Wugweb'],
    industry: 'Fintech',
    timeline: '2022',
    summary: "Transforming Axis Bank's savings account platform into a modern, intuitive digital journey that drives customer loyalty and acquisition.",
    about: 'Axis Bank partnered with Wugweb to redesign their savings account platform, transforming the traditional banking experience into a modern, intuitive digital journey that drives customer loyalty and acquisition.',
    challenges: [
      { title: 'Complex Financial Ecosystem', body: 'The platform needed to integrate multiple account types, interest structures, and banking regulations into a seamless user experience.' },
      { title: 'User Trust in Digital Banking', body: 'Building confidence in fully digital account opening and management required transparent design and clear security signals.' },
      { title: 'Competitive Differentiation', body: 'Standing out in a crowded fintech market required a unique value proposition and memorable brand experience.' },
    ],
    solutions: [
      { title: 'Human-Centered Information Architecture', body: 'We restructured the platform navigation around user goals rather than banking products, making complex financial concepts accessible.' },
      { title: 'Trust-Building Visual Design', body: 'Clean typography, consistent security badges, and transparent progress indicators established confidence at every step.' },
      { title: 'Streamlined Onboarding Flow', body: 'A multi-step guided journey reduced cognitive load while collecting all necessary information, with clear progress indicators and smart defaults.' },
    ],
    impact: [
      { title: 'Increased Account Openings', body: 'The streamlined digital onboarding process led to a significant increase in completed account applications.' },
      { title: 'Improved User Trust', body: 'Post-launch surveys showed higher confidence in digital banking services among users of the new platform.' },
      { title: 'Brand Differentiation', body: 'The modern design language set Axis Bank apart from traditional competitors in the digital banking space.' },
    ],
    tags: ['Fintech', 'Banking', 'UX Strategy'],
    video: '/assets/work/axis-bank/axis-about.mp4',
    coverImagePath: null,
  },
  {
    slug: 'redesigning-inkompass-cultivating-global-talent-for-a-smoke-free-future',
    title: 'Redesigning Inkompass – Cultivating Global Talent for a Smoke-Free Future',
    client: 'Philip Morris International',
    disciplines: ['UX Design'],
    team: ['PMI', 'Wugweb'],
    industry: 'Enterprise',
    timeline: '2022',
    summary: 'Redesigning PMIs global talent management platform to support their vision of a smoke-free future through empowered employees.',
    about: 'Philip Morris International partnered with Wugweb to redesign Inkompass, their global talent management platform, creating an intuitive experience that supports their vision of a smoke-free future through empowered employees.',
    challenges: [
      { title: 'Global Scale', body: 'The platform needed to serve thousands of employees across multiple countries with diverse cultural contexts and languages.' },
      { title: 'Complex Talent Workflows', body: 'Managing performance reviews, career development, and succession planning required a sophisticated yet intuitive interface.' },
      { title: 'Change Management', body: 'Transitioning from legacy systems to a modern platform required careful UX to ensure user adoption across all levels.' },
    ],
    solutions: [
      { title: 'Unified Dashboard Experience', body: 'A personalized dashboard gave employees and managers at-a-glance access to their most important tasks and metrics.' },
      { title: 'Simplified Performance Reviews', body: 'We redesigned the review process with guided steps, smart templates, and real-time feedback to reduce administrative burden.' },
      { title: 'Career Development Pathways', body: 'Visual career mapping tools helped employees understand growth opportunities and the skills needed to advance.' },
    ],
    impact: [
      { title: 'Higher Engagement', body: 'User adoption rates increased significantly post-launch, with employees spending more time on development activities.' },
      { title: 'Reduced Admin Time', body: 'Managers reported spending less time on administrative tasks and more on meaningful development conversations.' },
      { title: 'Global Standardization', body: 'The unified platform ensured consistent talent processes across all regions while allowing for local flexibility.' },
    ],
    tags: ['Enterprise', 'Talent Management', 'UX Design'],
    video: '/assets/work/inkompass/inkompass-about.mp4',
    coverImagePath: null,
  },
  {
    slug: 'the-avant-garde-of-banking-designing-the-metcred-zero-fee-mobile-experience',
    title: 'The Avant-Garde of Banking: Designing the METCRED Zero-Fee Mobile Experience',
    client: 'METCRED',
    disciplines: ['UX Design', 'Strategy'],
    team: ['METCRED', 'Wugweb'],
    industry: 'Fintech',
    timeline: '2022',
    summary: 'Designing a zero-fee mobile banking experience that challenges traditional banking conventions.',
    about: 'METCRED, a pioneering neobank, partnered with Wugweb to design their zero-fee mobile banking experience — creating an avant-garde financial platform that challenges traditional banking conventions.',
    challenges: [
      { title: 'Zero-Fee Value Proposition', body: 'Communicating the value of a fee-free banking model while ensuring sustainable revenue through premium features.' },
      { title: 'First-Time Banking Users', body: 'The platform needed to serve users new to digital banking with an intuitive, educational onboarding experience.' },
      { title: 'Regulatory Compliance', body: 'Navigating financial regulations while maintaining a sleek, modern user experience required careful design decisions.' },
    ],
    solutions: [
      { title: 'Conversational Onboarding', body: 'A chat-like onboarding flow guided users through account setup with natural language and contextual help.' },
      { title: 'Transparent Fee Dashboard', body: 'A real-time dashboard showed users exactly what they were saving compared to traditional banks, reinforcing the value proposition.' },
      { title: 'Smart Spending Insights', body: 'AI-powered spending categorization and personalized financial insights helped users make better money decisions.' },
    ],
    impact: [
      { title: 'Rapid User Growth', body: 'The intuitive onboarding and compelling value proposition drove rapid user acquisition in the competitive neobank market.' },
      { title: 'High Retention Rates', body: 'Users cited the transparent fee structure and smart insights as key reasons for staying with METCRED.' },
      { title: 'Industry Recognition', body: 'The innovative design approach earned METCRED recognition as a disruptor in digital banking.' },
    ],
    tags: ['Fintech', 'Neobank', 'Mobile UX'],
    video: '/assets/work/metcred/metcred-about.mp4',
    coverImagePath: null,
  },
  {
    slug: 'airtel-xsafe-securing-homes-with-intuitive-digital-experiences',
    title: 'Airtel Xsafe – Securing Homes with Intuitive Digital Experiences',
    client: 'Airtel',
    disciplines: ['UX Design'],
    team: ['Airtel', 'Wugweb'],
    industry: 'Telecommunications',
    timeline: '2022',
    summary: 'Designing a smart home security platform that makes protecting your home as intuitive as it is effective.',
    about: 'Airtel partnered with Wugweb to design Xsafe, a smart home security platform that makes protecting your home as intuitive as it is effective — combining IoT technology with human-centered design.',
    challenges: [
      { title: 'IoT Complexity', body: 'Connecting multiple device types (cameras, sensors, alarms) into a single cohesive experience required careful information architecture.' },
      { title: 'Real-Time Reliability', body: 'The platform needed to deliver real-time notifications and live video streams with minimal latency, demanding performance-optimized design.' },
      { title: 'User Trust and Privacy', body: 'Home security involves sensitive data — earning user trust through transparent privacy controls was essential.' },
    ],
    solutions: [
      { title: 'Unified Device Hub', body: 'A single dashboard managed all connected devices with intuitive controls for arming, monitoring, and configuring the security system.' },
      { title: 'Smart Alert System', body: 'Contextual notifications with video previews helped users quickly assess and respond to events without opening the app.' },
      { title: 'Privacy-First Design', body: 'Granular privacy settings and clear camera indicators ensured users always knew when and what was being recorded.' },
    ],
    impact: [
      { title: 'Market Leadership', body: 'Xsafe quickly became one of the leading smart home security solutions in the Indian market.' },
      { title: 'High User Satisfaction', body: 'The intuitive interface and reliable performance earned high ratings and positive user reviews.' },
      { title: 'Reduced Support Calls', body: 'The self-explanatory design significantly reduced customer support inquiries related to setup and daily use.' },
    ],
    tags: ['IoT', 'Smart Home', 'Telecommunications'],
    video: '/assets/work/airtel-xsafe/xsafe-about.mp4',
    coverImagePath: null,
  },
  {
    slug: 'demystifying-finance-crafting-the-ux-for-aditya-birla-capital-s-credit-score-tool',
    title: "Demystifying Finance: Crafting the UX for Aditya Birla Capital's Credit Score Tool",
    client: 'Aditya Birla Capital',
    disciplines: ['UX Design'],
    team: ['Aditya Birla Capital', 'Experian', 'Wugweb'],
    industry: 'Fintech',
    timeline: '2022',
    summary: 'Building a consumer-facing digital tool for instant credit score checking and comprehensive financial literacy.',
    about: 'Aditya Birla Capital, in partnership with Experian, undertook a project to develop a consumer-facing digital tool for instant credit score checking and comprehensive financial literacy. The platform was designed to transform the traditionally complex process of credit reporting into an accessible, confidence-inspiring consumer journey.',
    challenges: [
      { title: 'Trust and Transparency', body: 'The UX needed to establish immediate credibility, given the high-stakes nature and sensitivity of personal credit scores and financial data.' },
      { title: 'Translating Technical Complexity', body: 'The primary hurdle was simplifying the intricate logic of a credit report (score factors, debt loads) into easily digestible, actionable language for the average user.' },
      { title: 'Seamless Integration', body: 'Ensuring that the design seamlessly integrated the complex, raw technical data provided by Experian into a clean, easy-to-understand consumer format.' },
    ],
    solutions: [
      { title: 'Intuitive Multi-Step Guided Flow', body: 'Designed a clear, multi-screen input process for data submission to minimize user confusion and drop-off, complete with best-in-class error handling.' },
      { title: 'Visual Trustworthy Score Presentation', body: 'The final credit score was prominently displayed with a clean, high-trust visual hierarchy, providing users with their key information immediately upon completion.' },
      { title: 'Layered Credit Literacy', body: 'Implemented an expandable Card View system where complex credit factors were summarized first, allowing users to drill down for educational context only when they chose to.' },
      { title: 'Actionable Insights', body: 'The result screens moved beyond reporting data by focusing on clear, personalized recommendations for next steps, enhancing the tool value as a true financial guide.' },
    ],
    impact: [
      { title: 'Increased Consumer Trust', body: 'The clear, guided flow and visual presentation of sensitive data fostered immediate trust, leading to higher rates of data submission and journey completion.' },
      { title: 'Improved Financial Literacy', body: 'The Progressive Disclosure model successfully delivered complex educational content in a palatable format, empowering consumers to understand and improve their scores.' },
      { title: 'High Value Utility Positioning', body: 'The tool was established as a continuous financial guidance utility, increasing repeat engagement with the Aditya Birla Capital brand.' },
    ],
    tags: ['Fintech', 'Credit Scoring', 'Financial Literacy'],
    video: '/assets/work/aditya-birla-capital/abc-about.mp4',
    coverImagePath: null,
  },
  {
    slug: 'visione-empowering-workforce-development-with-competency-based-assessments',
    title: 'VisiONE – Empowering Workforce Development with Competency-Based Assessments',
    client: 'VisiONE',
    disciplines: ['UX Design', 'Development'],
    team: ['VisiONE', 'Wugweb'],
    industry: 'Enterprise',
    timeline: '2023',
    summary: 'Building a comprehensive workforce development platform with competency-based assessments.',
    about: 'VisiONE partnered with Wugweb to build a comprehensive workforce development platform that uses competency-based assessments to help organizations identify, develop, and retain top talent.',
    challenges: [
      { title: 'Complex Assessment Logic', body: 'Building a sophisticated assessment engine that could handle varied competency frameworks and scoring models.' },
      { title: 'Multi-Stakeholder Experience', body: 'The platform needed to serve HR administrators, managers, and employees with tailored interfaces for each role.' },
    ],
    solutions: [
      { title: 'Modular Assessment Builder', body: 'A drag-and-drop assessment builder gave HR teams the flexibility to create custom competency evaluations.' },
      { title: 'Role-Based Dashboards', body: 'Each stakeholder type received a personalized dashboard with relevant metrics and actions.' },
    ],
    impact: [
      { title: 'Streamlined Assessments', body: 'Organizations reported significant time savings in conducting and scoring competency assessments.' },
      { title: 'Better Talent Insights', body: 'Data-rich reports helped HR teams make informed decisions about training and development investments.' },
    ],
    tags: ['Enterprise', 'HR Tech', 'Workforce Development'],
    video: '/assets/work/visione/visione-about.mp4',
    coverImagePath: null,
  },
  {
    slug: 'indusninja-your-ai-powered-financial-ninja',
    title: 'IndusNinja – Your AI-Powered Financial Ninja',
    client: 'IndusInd Bank',
    disciplines: ['UX Design'],
    team: ['IndusInd Bank', 'Wugweb'],
    industry: 'Fintech',
    timeline: '2023',
    summary: 'Creating an AI-powered financial assistant that helps users manage their finances with intelligence and precision.',
    about: 'IndusInd Bank partnered with Wugweb to create IndusNinja, an AI-powered financial assistant that helps users manage their finances with intelligence, speed, and precision — like having a financial ninja in your pocket.',
    challenges: [
      { title: 'AI Integration', body: 'Seamlessly integrating AI capabilities into a banking app while maintaining reliability and user trust.' },
      { title: 'Conversational UX', body: 'Designing natural language interactions that feel helpful rather than gimmicky.' },
    ],
    solutions: [
      { title: 'Conversational Finance Assistant', body: 'A chat-based interface that understands natural language queries about balances, transactions, and financial goals.' },
      { title: 'Predictive Insights', body: 'AI-powered spending predictions and savings recommendations personalized to each users financial patterns.' },
    ],
    impact: [
      { title: 'Increased Engagement', body: 'Users interacted with IndusNinja significantly more than traditional banking interfaces.' },
      { title: 'Improved Financial Wellness', body: 'Users reported better understanding of their spending habits and achieved savings goals faster.' },
    ],
    tags: ['Fintech', 'AI', 'Conversational UX'],
    video: '/assets/work/indusind-bank/indusninja-about.mp4',
    coverImagePath: null,
  },
  {
    slug: 'sadhan-streamlining-driver-onboarding-lead-management',
    title: 'Sadhan – Streamlining Driver Onboarding & Lead Management',
    client: 'Sadhan',
    disciplines: ['UX Design', 'Strategy'],
    team: ['Sadhan', 'Wugweb'],
    industry: 'Logistics',
    timeline: '2023',
    summary: 'Streamlining driver onboarding and lead management processes with a digital platform.',
    about: 'Sadhan partnered with Wugweb to streamline their driver onboarding and lead management processes, creating a digital platform that reduces friction and accelerates time-to-productivity for new drivers.',
    challenges: [
      { title: 'Paper-Based Processes', body: 'Legacy onboarding relied on manual paperwork, causing delays and errors in driver verification.' },
      { title: 'Lead Tracking Fragmentation', body: 'Multiple disconnected systems made it difficult to track leads through the pipeline.' },
    ],
    solutions: [
      { title: 'Digital Onboarding Portal', body: 'A self-service portal where drivers could upload documents, complete training modules, and track their onboarding status.' },
      { title: 'Unified Lead Management', body: 'A centralized CRM-style dashboard gave the sales team full visibility into lead status and follow-up actions.' },
    ],
    impact: [
      { title: 'Faster Onboarding', body: 'Driver onboarding time was reduced significantly with digital document submission and automated verification.' },
      { title: 'Improved Lead Conversion', body: 'The unified lead management system helped the sales team prioritize and convert leads more effectively.' },
    ],
    tags: ['Logistics', 'Onboarding', 'CRM'],
    video: '/assets/work/sadhan/sadhan-about.mp4',
    coverImagePath: null,
  },
];

async function migrateCaseStudies() {
  console.log('\n📋 Case Studies');
  for (const cs of caseStudiesData) {
    const doc = {
      _id: `caseStudy-${cs.slug}`,
      _type: 'caseStudy',
      title: cs.title,
      slug: { _type: 'slug', current: cs.slug },
      client: cs.client,
      disciplines: cs.disciplines,
      team: cs.team,
      industry: cs.industry,
      timeline: cs.timeline,
      summary: cs.summary,
      about: cs.about,
      tags: cs.tags,
      challenges: cs.challenges.map(c => ({ _key: c.title.toLowerCase().replace(/\s+/g, '-'), title: c.title, body: c.body })),
      solutions: cs.solutions.map(s => ({ _key: s.title.toLowerCase().replace(/\s+/g, '-'), title: s.title, body: s.body })),
      impact: cs.impact.map(i => ({ _key: i.title.toLowerCase().replace(/\s+/g, '-'), title: i.title, body: i.body })),
      publishedAt: cs.timeline === '2022' ? '2022-06-15T00:00:00Z' : '2023-06-15T00:00:00Z',
      featured: cs.client === 'Axis Bank' || cs.client === 'Aditya Birla Capital' || cs.client === 'METCRED',
    };

    // Upload cover video as Sanity asset
    if (cs.video) {
      const assetId = await uploadAsset(cs.video);
      if (assetId) {
        doc.coverImage = { _type: 'image', asset: { _type: 'reference', _ref: assetId } };
      }
    }

    await upsert(doc);
  }
}

// ── STEP 4: Team / People ──────────────────────────────────────
const teamData = [
  { name: 'Vedanshu Srivastava', role: 'Founder', email: '', social: [] },
  { name: 'Praneet Verma', role: 'Business', email: '', social: ['LinkedIn'] },
  { name: 'Vaibhav Shukla', role: 'System Architect', email: '', social: [] },
  { name: 'Shreya Khot', role: 'MarTech', email: '', social: [] },
  { name: 'Satish Kumar', role: 'UI Engineer', email: '', social: [] },
  { name: 'Kartik Chaturvedi', role: 'Business Operations', email: '', social: ['LinkedIn'] },
  { name: 'Swarndeep Singh', role: 'Business Operations', email: '', social: [] },
  { name: 'Sunil Thapa', role: 'Design', email: '', social: [] },
  { name: 'Divyanshu Pundir', role: 'UX/UI', email: '', social: [] },
  { name: 'Ojaswa Verma', role: 'Project Manager', email: '', social: ['LinkedIn'] },
];

async function migrateTeam() {
  console.log('\n📋 Team Members');
  for (let i = 0; i < teamData.length; i++) {
    const t = teamData[i];
    await upsert({
      _id: `person-${t.name.toLowerCase().replace(/\s+/g, '-')}`,
      _type: 'person',
      name: t.name,
      slug: { _type: 'slug', current: t.name.toLowerCase().replace(/\s+/g, '-') },
      role: t.role,
      order: i + 1,
      bio: '',
    });
  }
}

// ── STEP 5: Blog Posts ─────────────────────────────────────────
const blogAuthors = {
  'Anastasia Solovyova': 'person-anastasia-solovyova',
  'Wugweb': 'person-vedanshu-srivastava',
};

// Ensure author person documents exist before posts reference them
async function ensureAuthors() {
  const authorNames = [...new Set(postsData.map(p => p.authorName))];
  for (const name of authorNames) {
    const ref = blogAuthors[name];
    if (!ref) continue;
    try {
      await client.createIfNotExists({
        _id: ref, _type: 'person',
        name: name,
        slug: { _type: 'slug', current: name.toLowerCase().replace(/\s+/g, '-') },
        role: 'Author',
        order: 100,
      });
      console.log(`  ✅ Author ensured: ${name} → ${ref}`);
    } catch (e) {
      // Might already exist, that's fine
      if (!e.message?.includes('already exists')) {
        console.warn(`  ⚠️  Author ${name}: ${e.message}`);
      }
    }
  }
}

const postsData = [
  {
    slug: 'when-ux-meets-cx-designing-seamless-experiences',
    title: 'When UX Meets CX: Designing Seamless Experiences',
    category: 'Design',
    authorName: 'Wugweb',
    date: '2021-08-15T00:00:00Z',
    readTime: 6,
    tags: ['UX', 'CX', 'Strategy'],
    excerpt: 'The line between user experience (UX) and customer experience (CX) is blurring. Heres how to design for both.',
    sections: [
      { h: 'Understanding the difference', body: 'UX focuses on the interaction with a specific product or interface. CX encompasses the entire journey with a brand across all touchpoints.' },
      { h: 'Why they must converge', body: 'A great product UX means little if the overall brand experience is fragmented. Aligning UX and CX creates cohesive, memorable experiences.' },
      { h: 'How to bridge the gap', body: 'Map the full customer journey, identify handoff points, and ensure consistency across marketing, sales, product, and support.' },
    ],
  },
  {
    slug: '10-hacks-for-illustrating-and-drawing-in-figma',
    title: '10 Hacks for Illustrating and Drawing in Figma',
    category: 'Design',
    authorName: 'Wugweb',
    date: '2021-01-15T00:00:00Z',
    readTime: 4,
    tags: ['Figma', 'Design'],
    excerpt: 'Figma is a powerful tool for illustration, not just UI design. Here are 10 hacks to level up your illustration workflow.',
    sections: [
      { h: '1. Use the pen tool like a pro', body: 'Master vector networks and the bend tool to create smooth curves with fewer points.' },
      { h: '2. Boolean operations for complex shapes', body: 'Combine basic shapes with Union, Subtract, Intersect, and Exclude to build complex illustrations.' },
      { h: '3. Auto-layout for illustrations', body: 'Use auto-layout to maintain spacing consistency across illustration elements.' },
      { h: '4. Components for reusable elements', body: 'Turn frequently used illustration elements into components for consistency and quick iteration.' },
      { h: '5. Plugins save hours', body: 'Plugins like Vector Path and Remove Background can speed up your illustration workflow dramatically.' },
    ],
  },
  {
    slug: '10-key-takeaways-from-googles-material-design-guidelines',
    title: "10 Key Takeaways from Google's Material Design Guidelines",
    category: 'Design', authorName: 'Wugweb',
    date: '2021-02-20T00:00:00Z', readTime: 5,
    tags: ['Material Design', 'Design'],
    excerpt: "Google's Material Design guidelines offer a comprehensive framework for building cohesive digital experiences.",
    sections: [
      { h: '1. Material is the metaphor', body: 'Material design is inspired by the physical world — surfaces, edges, and realistic lighting create familiar interfaces.' },
      { h: '2. Bold, graphic, intentional', body: 'Use typography, color, and imagery to create hierarchy and meaning.' },
      { h: '3. Motion provides meaning', body: 'Motion should be responsive, natural, and help users understand spatial relationships.' },
      { h: '4. Adaptive design', body: 'Design for all screen sizes with responsive grids, breakpoints, and reflowable layouts.' },
      { h: '5. Depth and elevation', body: 'Use shadows and elevation to create visual hierarchy and indicate interactivity.' },
    ],
  },
  {
    slug: '10-principles-for-typography-in-ui-design',
    title: '10 Principles for Typography in UI Design',
    category: 'Design', authorName: 'Wugweb',
    date: '2021-03-05T00:00:00Z', readTime: 4,
    tags: ['Typography', 'UI Design'],
    excerpt: 'Typography is the backbone of UI design. These principles will help you create readable, accessible, and beautiful interfaces.',
    sections: [
      { h: '1. Establish a type scale', body: 'Use a modular scale to create consistent sizing across headings and body text.' },
      { h: '2. Limit typefaces', body: 'Stick to two typefaces maximum — one for headings, one for body text.' },
      { h: '3. Mind your line-height', body: 'Body text should have a line-height of 1.5-1.6 for optimal readability.' },
      { h: '4. Measure matters', body: 'Keep line length between 45-75 characters for comfortable reading.' },
      { h: '5. Hierarchy is key', body: 'Use weight, size, and color to establish clear visual hierarchy.' },
    ],
  },
  {
    slug: 'top-10-design-systems-for-uxui-in-2026',
    title: 'Top 10 Design Systems for UX/UI in 2026',
    category: 'Design', authorName: 'Wugweb',
    date: '2026-01-01T00:00:00Z', readTime: 7,
    tags: ['Design Systems', 'UI Design'],
    excerpt: 'Design systems have become essential for scaling consistent user experiences. Here are the top 10 to watch in 2026.',
    sections: [
      { h: '1. Material Design 3', body: 'Googles latest evolution with dynamic color, adaptive layouts, and accessibility built in.' },
      { h: '2. Radix UI', body: 'An open-source component library with unstyled primitives for complete design control.' },
      { h: '3. Shadcn/UI', body: 'A collection of beautifully designed components that you copy and paste into your apps.' },
      { h: '4. Polaris', body: 'Shopifys design system for building commerce experiences at scale.' },
      { h: '5. Spectrum', body: "Adobe's design system that powers their entire product ecosystem." },
    ],
  },
  {
    slug: '10-rules-of-thumb-in-ui-design',
    title: '10 Rules of Thumb in UI Design',
    category: 'Design', authorName: 'Anastasia Solovyova',
    date: '2019-02-02T00:00:00Z', readTime: 8,
    tags: ['UI Design'],
    excerpt: 'When in doubt, here is a list of standard practices to follow in UI design. None of these are set in stone.',
    sections: [
      { h: '1. Design for density, not pixels', body: 'Design for the pixel density of the device, not raw pixels.' },
      { h: '2. Use 8dp increments', body: 'Spacing in increments of 8 creates consistency across devices.' },
      { h: '3. Remove lines and boxes', body: 'Boxes and lines dividing content could often be replaced with margin.' },
      { h: '4. Pay attention to contrast', body: 'Contrast draws the users eye and improves accessibility.' },
      { h: '5. Familiarity is good', body: 'Be creative only within the confines of current design norms.' },
      { h: '6. Use color weight to establish hierarchy', body: 'Assign different levels of importance to elements using color weight.' },
      { h: '7. Avoid using more than two typefaces', body: 'Two typefaces (with families) is usually enough.' },
      { h: '8. Recognition, not recall', body: 'Minimize the users memory load by making objects and actions visible.' },
      { h: "9. Don't slow me down", body: 'Be purposeful with animations; do not add unnecessary delay.' },
      { h: '10. Less is more', body: 'Every added element competes with the relevant information on a page.' },
    ],
  },
  {
    slug: '10-essential-skills-for-the-modern-ui-ux-designer',
    title: '10 Essential Skills for the Modern UI & UX Designer',
    category: 'Design', authorName: 'Wugweb',
    date: '2021-04-15T00:00:00Z', readTime: 6,
    tags: ['Career', 'Design'],
    excerpt: 'The role of a UI/UX designer has evolved dramatically. Here are the essential skills you need to stay relevant.',
    sections: [
      { h: '1. User Research', body: 'Understanding user needs through interviews, surveys, and usability testing.' },
      { h: '2. Visual Design', body: 'Master typography, color theory, layout, and visual hierarchy.' },
      { h: '3. Interaction Design', body: 'Design meaningful micro-interactions, transitions, and animations.' },
      { h: '4. Prototyping', body: 'Rapidly create interactive prototypes to test and validate ideas.' },
      { h: '5. Design Systems', body: 'Build and maintain scalable design systems for consistency across products.' },
      { h: '6. Accessibility', body: 'Design inclusively for users of all abilities following WCAG guidelines.' },
      { h: '7. Collaboration', body: 'Work effectively with developers, product managers, and stakeholders.' },
      { h: '8. Business Thinking', body: 'Understand business goals and how design drives measurable outcomes.' },
    ],
  },
  {
    slug: '10-figma-tricks-i-wish-i-knew-earlier',
    title: '10 Figma Tricks I Wish I Knew Earlier',
    category: 'Design', authorName: 'Wugweb',
    date: '2021-05-10T00:00:00Z', readTime: 4,
    tags: ['Figma', 'Design'],
    excerpt: 'After years of using Figma, here are the tricks I wish someone had shown me on day one.',
    sections: [
      { h: '1. Use auto-layout for everything', body: 'Auto-layout makes responsive design effortless — use it for buttons, cards, lists, and entire pages.' },
      { h: '2. Component variants', body: 'Organize button states, input variations, and icon sizes using component variant sets.' },
      { h: '3. Interactive components', body: 'Create clickable prototypes directly within component sets without extra wiring.' },
      { h: '4. Plugins for speed', body: 'Plugins like Autoflow, Content Reel, and Remove BG save hours of repetitive work.' },
    ],
  },
  {
    slug: '10-a-hole-design-patterns',
    title: '10 A**hole Design Patterns',
    category: 'Design', authorName: 'Anastasia Solovyova',
    date: '2020-04-06T00:00:00Z', readTime: 5,
    tags: ['Design'],
    excerpt: 'Dark patterns companies use to persuade users to make decisions that favor the company rather than the individual.',
    sections: [
      { h: '1. Shrinkflation', body: 'Companies use this tactic to discreetly sell less of a product at the same price.' },
      { h: '2. Planned Obsolescence', body: 'Products designed to be used for a finite amount of time, then become useless.' },
      { h: '3. Lethal Enforcers', body: 'Require the user to take the action the company wants before proceeding.' },
      { h: '4. Loaded Question', body: 'Loaded questions take advantage of our good nature.' },
      { h: '5. Bait and Switch', body: 'Luring someone in with one intent, then delivering something else.' },
      { h: '6. Throttling', body: 'Intentionally downgrading service to push upgrades.' },
      { h: '7. Guilt Tripping', body: 'Playing on emotions to invoke a particular action.' },
      { h: '8. Monopoly', body: 'Forcing purchase of proprietary currency or products.' },
      { h: '9. Free Real Estate', body: 'Turning every available space into a display ad.' },
      { h: '10. Decoy', body: 'Changing terminology to describe something with a negative connotation.' },
    ],
  },
  {
    slug: '10-ways-to-design-more-inclusive-products',
    title: '10 Ways to Design More Inclusive Products',
    category: 'Design', authorName: 'Wugweb',
    date: '2021-06-20T00:00:00Z', readTime: 5,
    tags: ['Accessibility', 'Inclusive Design'],
    excerpt: 'Inclusive design is not just about accessibility — it is about creating products that work for everyone.',
    sections: [
      { h: '1. Use clear language', body: 'Write at a reading level accessible to the widest possible audience.' },
      { h: '2. Provide alt text', body: 'Every meaningful image needs descriptive alt text for screen readers.' },
      { h: '3. Color is not the only indicator', body: 'Never rely solely on color to convey information.' },
      { h: '4. Support keyboard navigation', body: 'Ensure all functionality is accessible via keyboard alone.' },
      { h: '5. Test with real users', body: 'Include people with diverse abilities in your user testing sessions.' },
    ],
  },
  {
    slug: '10-confessions-of-a-product-designer',
    title: '10 Confessions of a Product Designer',
    category: 'Design', authorName: 'Wugweb',
    date: '2021-07-05T00:00:00Z', readTime: 4,
    tags: ['Product Design', 'Career'],
    excerpt: 'Honest confessions from a product designer about the realities of the craft.',
    sections: [
      { h: '1. We do not have all the answers', body: 'Good design is iterative. We learn what works by testing, failing, and refining.' },
      { h: '2. Imposter syndrome is real', body: 'Every designer feels it sometimes. The key is to keep learning and growing.' },
      { h: '3. Perfect is the enemy of shipped', body: 'Done is better than perfect. Ship, measure, iterate.' },
      { h: '4. Design is not just making things pretty', body: 'It is about solving problems, communicating ideas, and driving business outcomes.' },
      { h: '5. Feedback is a gift', body: 'Even when it stings, honest feedback makes you and your work better.' },
    ],
  },
  {
    slug: '6-strategies-that-got-my-side-project-its-first-1-000-users',
    title: '6 Strategies That Got My Side Project Its First 1,000 Users',
    category: 'Martech', authorName: 'Anastasia Solovyova',
    date: '2020-03-10T00:00:00Z', readTime: 6,
    tags: ['Marketing', 'Growth'],
    excerpt: 'Getting your first 1,000 users is the hardest milestone for any side project.',
    sections: [
      { h: '1. Build in public', body: 'Share your progress, struggles, and lessons on social media.' },
      { h: '2. Find your niche communities', body: 'Go deep into specific communities where your target users gather.' },
      { h: '3. Offer value before asking', body: 'Create free tools, guides, or templates related to your product.' },
      { h: '4. Leverage existing platforms', body: 'Product Hunt, Hacker News, and Indie Hackers can drive significant traffic.' },
      { h: '5. Personal outreach', body: 'Manually reach out to potential users with personalized messages.' },
      { h: '6. Iterate on feedback', body: 'Your first 100 users will tell you what is broken. Fix it fast.' },
    ],
  },
  {
    slug: 'is-augmented-reality-the-future-of-ux',
    title: 'Is Augmented Reality the future of UX?',
    category: 'Tech', authorName: 'Anastasia Solovyova',
    date: '2019-07-17T00:00:00Z', readTime: 8,
    tags: ['AR', 'UX'],
    excerpt: 'AR has a more immediate application than VR since it only requires a smartphone.',
    sections: [
      { h: 'AR in retail', body: 'AR lets customers try before they buy, reducing churn and enhancing physical and online shopping alike.' },
      { h: 'AR for utility', body: 'Beyond retail, AR apps like measuring tools and location-aware guides have broad utility use cases.' },
      { h: 'The bottom line', body: 'AR should stay in service of the customer journeys that matter, not novelty for its own sake.' },
    ],
  },
];

async function migratePosts() {
  console.log('\n📋 Blog Posts');
  for (const post of postsData) {
    // Build a blockContent body: intro as block, then each section
    const body = [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        children: [{ _type: 'span', _key: 'intro-span', text: post.excerpt, marks: [] }],
        markDefs: [],
      },
      ...post.sections.map((s, i) => ({
        _type: 'block',
        _key: `section-h-${i}`,
        style: 'h2',
        children: [{ _type: 'span', _key: `section-h-${i}-span`, text: s.h || '', marks: [] }],
        markDefs: [],
      })),
      ...post.sections.map((s, i) => ({
        _type: 'block',
        _key: `section-p-${i}`,
        style: 'normal',
        children: [{ _type: 'span', _key: `section-p-${i}-span`, text: s.body, marks: [] }],
        markDefs: [],
      })),
    ];

    await upsert({
      _id: `post-${post.slug}`,
      _type: 'post',
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      category: post.category,
      author: { _type: 'reference', _ref: blogAuthors[post.authorName] || 'person-vedanshu-srivastava' },
      excerpt: post.excerpt,
      readTime: post.readTime,
      tags: post.tags,
      publishedAt: post.date,
      featured: post.category === 'Design' && post.date.startsWith('2021'),
      body,
    });
  }
}

// ── RUN ─────────────────────────────────────────────────────────
async function main() {
  console.log('🚀 Sanity Migration Script');
  console.log(`Project: splvhmk1 / production`);

  await migrateSiteSettings();
  await migratePages();
  await migrateTeam();
  await ensureAuthors();
  await migrateCaseStudies();
  await migratePosts();

  console.log('\n✅ Migration complete!');
}

main().catch((e) => {
  console.error('\n❌ Migration failed:', e);
  process.exit(1);
});
