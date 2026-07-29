#!/usr/bin/env node
/**
 * Sanity Migration Script — Phase 2: Additional Content
 *
 * Adds 29 new case studies and 2 new blog posts from user-provided
 * markdown files. Run AFTER the initial migration.
 *
 * Usage:
 *   SANITY_TOKEN=sk... node scripts/migrate-sanity-phase2.mjs
 */

import { createClient } from '@sanity/client';

const token = process.env.SANITY_TOKEN;
if (!token) { console.error('Missing SANITY_TOKEN env var'); process.exit(1); }

const client = createClient({
  projectId: 'splvhmk1', dataset: 'production', apiVersion: '2026-07-28',
  token, useCdn: false,
});

async function upsert(doc) {
  try {
    await client.createOrReplace(doc);
    console.log(`  ✅ ${doc._type} "${doc._id}"`);
  } catch (e) {
    console.error(`  ❌ ${doc._type} "${doc._id}": ${e.message}`);
  }
}

// ── CASE STUDIES 9–37 ──────────────────────────────────────────
const caseStudies = [
  {
    slug: 'airtel-xstream-play-showcasing-indias-unified-digital-entertainment',
    title: 'Airtel Xstream Play – Showcasing India\'s Unified Digital Entertainment on the Web',
    client: 'Airtel', disciplines: ['UX Design'], team: ['Vedanshu Srivastava', 'Yuvraj', 'Prerna', 'Divyanshu Pundir', 'Anurag Pandey'],
    industry: 'Telecommunications', timeline: '2022', partner: 'Dentsu Webchutney',
    tags: ['OTT', 'Engagement', 'Content Strategy'],
    summary: 'Consolidating a fragmented streaming landscape into a seamless digital festival.',
    about: 'Airtel Xstream Play consolidates India\'s fragmented digital entertainment landscape, bringing a multitude of streaming partners under one seamless roof. Wugweb\'s role was to design a compelling Airtel Website page for the "Xstream Entertainment Festival."',
    challenges: [
      { title: 'Complex Value Proposition', body: 'Aggregated content benefits were hard to explain.' },
      { title: 'Conversion Pressure', body: 'Users needed a clear path to subscription.' },
      { title: 'Unique Access Models', body: 'Bundled and location-based unlocks needed clarity.' },
    ],
    solutions: [
      { title: 'Clear Value Messaging', body: 'Highlighted benefits and partner platforms upfront.' },
      { title: 'Transparent Subscription Offers', body: 'Explained prepaid-linked access clearly.' },
      { title: 'Design System Alignment', body: 'Maintained consistency with Airtel\'s ecosystem.' },
    ],
    impact: [
      { title: 'Improved Offer Clarity', body: 'Users understood access models quickly.' },
      { title: 'Higher Conversion Potential', body: 'Clear CTAs supported subscription growth.' },
      { title: 'Strong Campaign Asset', body: 'Festival page drove engagement and adoption.' },
    ],
  },
  {
    slug: 'redesigning-cartiers-career-website-where-passion-meets-excellence',
    title: 'Redesigning Cartier\'s Career Website – Where Passion Meets Excellence',
    client: 'Cartier', disciplines: ['Strategy', 'UX Design', 'UI Design', 'Content Strategy'],
    team: ['Vedanshu Srivastava', 'Shruti Shree', 'Anurag Pandey', 'Shobhit Saxena', 'Yatin Gupta'],
    industry: 'Luxury', timeline: '2022', partner: 'Publicis Sapient',
    tags: ['Luxury', 'Talent Brand', 'Interactive Job Posts'],
    summary: 'Blending iconic luxury aesthetics with a modern, mobile-first candidate journey.',
    about: 'Cartier, a French luxury Maison within Richemont, partnered with Wugweb to redesign their career site into a place "where passion meets excellence." The redesign aimed to enhance Cartier\'s talent acquisition efforts with a luxury-aligned digital experience.',
    challenges: [
      { title: 'Dated Digital Presence', body: 'The site lacked luxury and visual impact.' },
      { title: 'Weak Cultural Storytelling', body: 'Work culture and growth paths were unclear.' },
      { title: 'Poor Mobile Experience', body: 'Accessibility was limited on mobile devices.' },
    ],
    solutions: [
      { title: 'Luxury-Aligned Visual Design', body: 'Reflected Cartier\'s prestige and craftsmanship.' },
      { title: 'Mobile-First Optimization', body: 'Ensured seamless browsing and applications.' },
      { title: 'Interactive Job Listings', body: 'Added visuals and context to roles.' },
    ],
    impact: [
      { title: 'Stronger Employer Brand', body: 'Elevated Cartier\'s presence in the luxury sector.' },
      { title: 'Higher Talent Quality', body: 'Attracted more qualified candidates.' },
      { title: 'Improved Candidate Experience', body: 'Engagement and application rates increased.' },
    ],
  },
  {
    slug: 'accelerating-loyalty-designing-kias-intuitive-customer-dashboard',
    title: 'Accelerating Loyalty: Designing Kia\'s Intuitive Customer Dashboard',
    client: 'Kia Motors', disciplines: ['UX Design', 'UI Design', 'CX', 'Frontend Development'],
    team: ['Vedanshu Srivastava', 'Divyanshu Pundir', 'Saloni Parekh'], industry: 'Automobile', timeline: '2023',
    partner: 'Adneto', tags: ['Loyalty Program', 'Dashboard', 'Customer Experience'],
    summary: 'Empowering automotive loyalty through real-time data visualization.',
    about: 'Kia sought to engineer an intuitive and powerful loyalty dashboard to empower Kia with comprehensive, real-time insights into customer behavior, reward program efficacy, and the dynamic flow of loyalty points.',
    challenges: [
      { title: 'Disparate Data Sources', body: 'Loyalty information was scattered across systems.' },
      { title: 'Aggressive Timeline', body: 'Delivery was required within one week.' },
    ],
    solutions: [
      { title: 'Rapid Stakeholder Research', body: 'Identified critical KPIs and data priorities.' },
      { title: 'Data-Driven UI Design', body: 'Presented complex metrics with clarity and speed.' },
      { title: 'Agile CX Execution', body: 'Delivered a scalable system under extreme timelines.' },
    ],
    impact: [
      { title: 'Accelerated Decision-Making', body: 'Real-time insights supported rapid action.' },
      { title: 'Proof of Agile Delivery', body: 'One-week execution validated speed and quality.' },
    ],
  },
  {
    slug: 'crafting-digital-elegance-the-tot-bridal-launch-story',
    title: 'Crafting Digital Elegance: The TOT Bridal Launch Story',
    client: 'TOT Bridal', disciplines: ['Strategy', 'Branding', 'UX Design', 'UI Design', 'Website Development'],
    team: ['Vedanshu Srivastava', 'Divyanshu Pundir', 'Ojaswa Verma'],
    industry: 'Fashion', timeline: '2022', tags: ['Luxury Retail', 'Portfolio', 'Lead Generation'],
    summary: 'Extending luxury bridal service into a seamless, high-touch online experience.',
    about: 'TOT Bridal (Touch of Trend) is a premier Singapore-based bridal studio. Wugweb delivered a complete brand and digital launch experience to transform every bride\'s vision into a breathtaking reality.',
    challenges: [
      { title: 'Undefined Brand Identity', body: 'The brand needed a clear visual and tonal presence.' },
      { title: 'High Emotional Context', body: 'The experience needed to feel personal and premium.' },
    ],
    solutions: [
      { title: 'Distinct Brand Identity', body: 'Defined logo, typography, and visual system.' },
      { title: 'Elegant UX Structure', body: 'Designed intuitive navigation across services and collections.' },
      { title: 'Luxury UI Design', body: 'Created a refined, emotionally resonant interface.' },
    ],
    impact: [
      { title: 'Clear Brand Positioning', body: 'TOT Bridal entered the market with confidence.' },
      { title: 'Accelerated Market Entry', body: 'The platform supported rapid customer acquisition.' },
    ],
  },
  {
    slug: 'crafting-digital-authority-the-adneto-website-showcase',
    title: 'Crafting Digital Authority: The Adneto Website Showcase',
    client: 'Adneto', disciplines: ['Strategy', 'UX Design', 'UI Design', 'Web Development'],
    team: ['Vedanshu Srivastava', 'Divyanshu Pundir', 'Kushal Bhagat'],
    industry: 'FinTech', timeline: '2023', tags: ['FinTech', 'B2B', 'AI Showcase'],
    summary: 'Highlighting AI-driven platforms that bridge banking and lifestyle.',
    about: 'Adneto is a white-labeled, AI-powered platform specializing in loyalty, rewards, and digital commerce. A rapid, high-impact redesign strengthened Adneto\'s digital positioning across 14+ countries.',
    challenges: [
      { title: 'Outdated Brand Expression', body: 'The website underrepresented technical capability.' },
      { title: 'Complex Product Messaging', body: 'AI-driven offerings were difficult to explain.' },
    ],
    solutions: [
      { title: 'Strategic UX Framework', body: 'Simplified navigation across products and audiences.' },
      { title: 'Clear Content Strategy', body: 'Translated complexity into benefit-driven narratives.' },
      { title: 'Product Suite Clarity', body: 'Clearly positioned BANCO, ADLYTIC, and REATL.' },
    ],
    impact: [
      { title: 'Stronger Brand Perception', body: 'Positioned Adneto as a FinTech leader.' },
      { title: 'Improved Product Understanding', body: 'Simplified complex AI solutions.' },
      { title: 'Increased Lead Potential', body: 'Enhanced visibility supported new business.' },
    ],
  },
  {
    slug: 'gratify-the-intelligent-rewards-and-feedback-platform',
    title: 'Gratify – The Intelligent Rewards & Feedback Platform',
    client: 'Gratify', disciplines: ['UX Design', 'UI Design', 'Frontend Development'],
    team: ['Vedanshu Srivastava', 'Saloni Parekh', 'Kushal Bhagat'],
    industry: 'E-commerce', timeline: '2023', partner: 'Adneto',
    tags: ['Social Commerce', 'Rewards', 'Fintech'],
    summary: 'Turning every transaction into a moment of gratitude through digital gifting.',
    about: 'Gratify is Adneto\'s dynamic Rewards & Feedback platform, engineered to empower brands across diverse industries with AI-driven engagement, boosting revenue and customer loyalty.',
    challenges: [
      { title: 'Customer Engagement Friction', body: 'Inconsistent touchpoints reduced participation across channels.' },
      { title: 'Ineffective Loyalty Programs', body: 'Generic rewards failed to influence long-term behavior.' },
    ],
    solutions: [
      { title: 'Smart Rewards Orchestration', body: 'Automated offers and points tailored to customer behavior.' },
      { title: 'Personalized Engagement Hub', body: 'Centralized profiles and dashboards for users and brands.' },
    ],
    impact: [
      { title: 'Revenue Growth', body: 'Increased AOV and customer lifetime value across sectors.' },
      { title: 'Higher Retention Metrics', body: 'Improved CSAT and repeat purchase rates.' },
    ],
  },
  {
    slug: 'bankco-engineering-the-ultimate-banking-super-app-ecosystem',
    title: 'Bankco – Engineering the Ultimate Banking Super App Ecosystem',
    client: 'Adneto', disciplines: ['Strategy', 'Product Design', 'Systems Integration'],
    team: ['Vedanshu Srivastava', 'Saloni Parekh', 'Divyanshu Pundir', 'Kushal Bhagat'],
    industry: 'FinTech', timeline: '2023', tags: ['Super App', 'Micro-Services', 'FinTech Integration'],
    summary: 'Connecting banking, lifestyle, and commerce in one unified digital layer.',
    about: 'Bankco is Adneto\'s flagship "Super App" product, providing a comprehensive, white-labeled platform that seamlessly integrates digital commerce, rewards, and essential banking functionalities.',
    challenges: [
      { title: 'Disjointed Digital Experiences', body: 'Services spread across multiple platforms reduced engagement.' },
      { title: 'Digital Monetization Gaps', body: 'Revenue opportunities from commerce remained underutilized.' },
    ],
    solutions: [
      { title: 'Unified Super App Dashboard', body: 'Centralized access to services, offers, and rewards.' },
      { title: 'AI-Powered Rewards Engine', body: 'Personalized incentives based on spending behavior.' },
    ],
    impact: [
      { title: 'Increased Customer Engagement', body: 'Personalized journeys drove higher usage.' },
      { title: 'New Revenue Streams', body: 'Commerce and offers unlocked incremental growth.' },
    ],
  },
  {
    slug: 'wugweb-kits-the-full-stack-infrastructure-for-multi-platform-design',
    title: 'Wugweb Kits: The Full-Stack Infrastructure for Multi-Platform Design',
    client: 'Wugweb (Internal)', disciplines: ['Product Design', 'Frontend Engineering', 'Systems Architecture'],
    team: ['Vedanshu Srivastava', 'Divyanshu Pundir'],
    industry: 'Design Technology', timeline: '2024', tags: ['Design System', 'SaaS', 'UI Kit', 'Component Library'],
    summary: 'A standardized design-to-code ecosystem built for rapid, high-fidelity deployment.',
    about: 'Wugweb Kits is our proprietary answer to modern design debt, built as a universal, full-stack design system bridging Figma primitives and GitHub codebases through a custom CLI.',
    challenges: [
      { title: 'Human-AI Precision Gap', body: 'Aligning human design intent with AI execution accuracy.' },
      { title: 'Design-Code Drift', body: 'Preventing mismatch between Figma and production code.' },
    ],
    solutions: [
      { title: 'Semantic Design Architecture', body: 'Defined primitives and tokens governing all UI behavior.' },
      { title: 'CLI-Driven Design Pipeline', body: 'Enabled direct Figma-to-GitHub deployment via CLI.' },
      { title: 'Full-Stack Component Library', body: 'Delivered deploy-ready UI blocks for rapid builds.' },
    ],
    impact: [
      { title: 'Zero-Drift Production', body: 'Achieved complete design-code synchronization.' },
      { title: 'Faster Deployment Cycles', body: 'Enabled instant component pulls via CLI.' },
      { title: 'Future-Proof Scaling', body: 'Established an AI-ready system for long-term growth.' },
    ],
  },
  {
    slug: 'sbs-transit-engineering-the-future-of-multimodal-urban-mobility',
    title: 'SBS Transit: Engineering the Future of Multimodal Urban Mobility',
    client: 'SBS Transit', disciplines: ['Product Design', 'Mobility UX', 'Systems Integration'],
    team: ['Vedanshu Srivastava', 'Alwyn Lai', 'Gadar Soe'],
    industry: 'Transportation', timeline: '2023', partner: 'iCube',
    tags: ['Smart City', 'Public Transit', 'IoT', 'Low-Code'],
    summary: 'Consolidating disparate transport services into a single, high-performance super-app.',
    about: 'SBS Transit, a leading public transport operator in Singapore, partnered with Wugweb to overhaul their mobile ecosystem using OutSystems, consolidating bus, train, and cycling services into a single super-app.',
    challenges: [
      { title: 'Data Fragmentation', body: 'Consolidating live data from buses, trains, and cycling systems.' },
      { title: 'Legacy Performance Constraints', body: 'Overcoming latency and accuracy issues in traditional transit apps.' },
    ],
    solutions: [
      { title: 'Unified Multimodal Dashboard', body: 'Designed a single hub for instant access to all transport modes.' },
      { title: 'Live Transit Tracking Engine', body: 'Implemented high-frequency updates for real-time arrival accuracy.' },
      { title: 'Accessibility-First Design', body: 'Added screen-reader support and high-contrast navigation.' },
    ],
    impact: [
      { title: 'Increased Commuter Trust', body: 'Accurate arrival data reduced perceived wait times.' },
      { title: 'Operational Efficiency Gains', body: 'Accelerated feature deployment by 40% post-migration.' },
    ],
  },
  {
    slug: 'itc-dark-fantasy-x-citadel-personalizing-the-spy-experience',
    title: 'ITC Dark Fantasy x Citadel: Personalizing the Spy Experience',
    client: 'ITC', disciplines: ['Strategy', 'Creative Technology', 'Web Development'],
    team: ['Vedanshu Srivastava', 'Satish Kumar', 'Kareem Khan', 'Amitabh Bhatnagar', 'Yatin Gupta'],
    industry: 'Media & Entertainment', timeline: '2023', partner: 'Dentsu Webchutney',
    tags: ['Interactive Marketing', 'Personalization', 'Viral Mechanics'],
    summary: 'Turning viewers into spies through a personalized, high-stakes digital journey.',
    about: 'To celebrate the release of the global spy series Citadel, ITC Sunfeast Dark Fantasy launched a 360-degree promotional campaign. By integrating QR technology on limited-edition cookie packs, fans could "uncover their fantasy" and join Priyanka Chopra\'s elite spy network.',
    challenges: [
      { title: 'Frictionless QR Entry', body: 'Enabling instant access without app downloads.' },
      { title: 'Narrative Immersion', body: 'Making digital participation feel cinematic and personal.' },
    ],
    solutions: [
      { title: 'QR-to-Microsite Bridge', body: 'Built a lightweight, mobile-optimized entry experience.' },
      { title: 'Personalized Spy ID Generator', body: 'Enabled custom visual identities through image processing.' },
      { title: 'Gamified Lead Capture', body: 'Embedded data collection within the narrative flow.' },
    ],
    impact: [
      { title: 'High-Intent Lead Capture', body: 'Generated large volumes of qualified user data.' },
      { title: 'Organic Viral Reach', body: 'User sharing amplified campaign visibility.' },
      { title: 'Retail-to-Digital Success', body: 'Proven FMCG-to-OTT engagement blueprint.' },
    ],
  },
  {
    slug: 'rak-sme-scaling-the-tech-infrastructure-for-ras-al-khaimah-business-ecosystem',
    title: 'RAK SME: Scaling the Tech Infrastructure for Ras Al Khaimah\'s Business Ecosystem',
    client: 'Ras Al Khaimah Government', disciplines: ['Strategy', 'UX Design', 'UI Design', 'Backend Development'],
    team: ['Vedanshu Srivastava', 'Kareem Khan', 'Amitabh Bhatnagar'],
    industry: 'Government', timeline: '2024', tags: ['GovTech', 'SME Ecosystem', 'UAE'],
    summary: 'A centralized portal for small and medium enterprises to access government support.',
    about: 'RAK SME is the dedicated government body empowering small and medium enterprises in Ras Al Khaimah. Wugweb serves as their long-term tech retainer, responsible for the continuous evolution of their digital infrastructure.',
    challenges: [
      { title: 'National Identity Integration', body: 'Securing seamless UAE Pass authentication.' },
      { title: 'Fragmented Member Data', body: 'Unifying applications, payments, and records.' },
    ],
    solutions: [
      { title: 'UAE Pass Authentication Layer', body: 'Enabled secure, standardized national login.' },
      { title: 'Dynamic SME Directory', body: 'Built a searchable ecosystem for member visibility.' },
      { title: 'Unified Payment Gateway', body: 'Automated licensing and fee reconciliation.' },
    ],
    impact: [
      { title: '99.9% Platform Uptime', body: 'Ensured uninterrupted government services.' },
      { title: 'Faster SME Onboarding', body: 'Reduced registration and verification timelines.' },
    ],
  },
  {
    slug: 'eekenlife-redefining-footwear-e-commerce-for-the-next-generation',
    title: 'Eekenlife: Redefining Footwear E-commerce for the Next Generation',
    client: 'Paragon Footwear', disciplines: ['Strategy', 'UX Design', 'UI Design', 'E-commerce Development'],
    team: ['Vedanshu Srivastava'], industry: 'Fashion', timeline: '2023',
    partner: 'Dentsu Webchutney', tags: ['E-commerce', 'Youth Culture', 'Retail Tech'],
    summary: 'Launching a vibrant, high-energy digital storefront for Paragon\'s youth brand.',
    about: 'Eekenlife is a vibrant footwear brand built around youth culture. As the brand migrated to Shopify, Wugweb created a video-first, community-driven digital experience.',
    challenges: [
      { title: 'Legacy Platform Migration', body: 'Moving to Shopify without visual regression.' },
      { title: 'Low Engagement Retention', body: 'Breaking static product-grid behaviors.' },
    ],
    solutions: [
      { title: 'Video-First Homepage', body: 'Delivered instant brand energy via motion-led hero.' },
      { title: 'Custom Shopify Theme', body: 'Built a non-templated, expressive layout.' },
      { title: 'Optimized Checkout Flow', body: 'Reduced friction to conversion.' },
    ],
    impact: [
      { title: 'Gen-Z Brand Alignment', body: 'Increased engagement and session duration.' },
      { title: 'Conversion Rate Uplift', body: 'Reduced cart abandonment significantly.' },
    ],
  },
  {
    slug: 'woodkraft-elevating-indias-largest-corporate-fit-out-legacy',
    title: 'Woodkraft: Elevating India\'s Largest Corporate Fit-Out Legacy',
    client: 'Woodkraft', disciplines: ['Strategy', 'Branding', 'UX/UI Design', 'Web Development'],
    team: ['Vedanshu Srivastava', 'Anurag Pandey'],
    industry: 'Architecture & Interior Design', timeline: '2023', partner: 'Leo Burnett',
    tags: ['Luxury Interiors', 'Corporate Real Estate', 'Portfolio Design'],
    summary: 'A premium digital showcase for excellence in workspace interior solutions.',
    about: 'Woodkraft is a pioneer in India\'s corporate interior landscape with over 75 million sq. ft. of workspace delivered. Wugweb undertook a full-stack redesign to reflect their new premium branding.',
    challenges: [
      { title: 'Legacy vs. Modernity', body: 'Evolving a 40-year legacy brand without losing authority.' },
      { title: 'Content at Extreme Scale', body: 'Structuring 580+ projects across cities and sectors.' },
    ],
    solutions: [
      { title: 'Premium Brand System', body: 'Designed a bold, industrial-grade visual language.' },
      { title: 'High-Performance Portfolio Engine', body: 'Showcased large-scale projects with clarity and speed.' },
      { title: 'Searchable Client Vault', body: 'Established instant social proof through industry-segmented listings.' },
    ],
    impact: [
      { title: 'Authoritative Market Positioning', body: 'Shifted perception from contractor to tech-driven industry leader.' },
      { title: 'Faster Lead Qualification', body: 'Reduced discovery friction for enterprise prospects.' },
    ],
  },
  {
    slug: 'ikan-the-next-generation-corporate-mental-healthcare-platform',
    title: 'iKan: The Next-Generation Corporate Mental Healthcare Platform',
    client: 'iKan', disciplines: ['System Architecture', 'UX/UI Design', 'Full-Stack Development'],
    team: ['Vedanshu Srivastava', 'Divyanshu Pundir', 'Kartik Chandra', 'Vaibhav Shukla'],
    industry: 'HealthTech', timeline: '2024', tags: ['HealthTech', 'PWA', 'AI Logic'],
    summary: 'A sophisticated iCBT ecosystem backed by agentic logic and clinical rigor.',
    about: 'iKan is a measurement-based mental health PWA engineered for the corporate sector, providing a science-backed ecosystem centered on Internet-based Cognitive Behavioral Therapy (iCBT).',
    challenges: [
      { title: 'Clinical Rigor Translation', body: 'Preserving CBT integrity within a consumer-grade UX.' },
      { title: 'Agentic Intelligence Design', body: 'Automating personalized interventions from real-time data.' },
    ],
    solutions: [
      { title: 'Robust PWA Architecture', body: 'Built a scalable, performance-driven mental health platform.' },
      { title: 'Validated Assessment Engine', body: 'Integrated clinically recognized mental health instruments.' },
      { title: 'Structured iCBT Programs', body: 'Delivered self-guided therapeutic modules.' },
    ],
    impact: [
      { title: 'Measurement-Based Care Delivery', body: 'Enabled users to track mental health progress objectively.' },
      { title: 'Improved Workforce Resilience', body: 'Helped prevent burnout before escalation.' },
    ],
  },
  {
    slug: 'global-trade-finance-engineering-an-authority-first-lead-generation-engine',
    title: 'Global Trade Finance: Engineering an Authority-First Lead Generation Engine',
    client: 'Global Trade Finance', disciplines: ['Strategy', 'Content Architecture', 'Web Development'],
    team: ['Vedanshu Srivastava', 'Divyanshu Pundir', 'Praneet Verma'],
    industry: 'Business Finance', timeline: '2024', tags: ['Lead Gen', 'FinTech', 'High-Architecture Content'],
    summary: 'Engineering a high-detail architectural engine for complex cross-border finance.',
    about: 'Global Trade Finance is a specialized financial services firm dedicated to simplifying cross-border trade capital. Wugweb focused on a "content-as-infrastructure" strategy with deeply detailed service pages.',
    challenges: [
      { title: 'Instant Authority Signaling', body: 'Competing with legacy finance incumbents.' },
      { title: 'Depth vs. Conversion Balance', body: 'Supporting high-value decisions without blocking leads.' },
    ],
    solutions: [
      { title: 'High-Architecture Content Model', body: 'Replaced blogs with permanent, technical authority pages.' },
      { title: 'Conversion-Led Visual Branding', body: 'Designed a premium identity signaling trust.' },
      { title: 'Multi-Step Lead Qualification', body: 'Filtered inquiries before sales engagement.' },
    ],
    impact: [
      { title: 'Immediate Market Credibility', body: 'Elevated brand perception against global competitors.' },
      { title: 'Higher Quality Lead Flow', body: 'Improved deal relevance and conversion efficiency.' },
    ],
  },
  {
    slug: 'suzlon-reimagining-global-energy-through-minimalist-technical-excellence',
    title: 'Suzlon: Reimagining Global Energy Through Minimalist Technical Excellence',
    client: 'Suzlon', disciplines: ['Strategy', 'UX/UI Design', 'Content Strategy'],
    team: ['Vedanshu Srivastava', 'Divyanshu Pundir', 'Nirbhay Pawa'],
    industry: 'Renewable Energy', timeline: '2026', partner: 'Dentsu',
    tags: ['Sustainability', 'Renewable Energy'],
    summary: 'Repositioning a wind giant as a future-forward renewable power leader.',
    about: 'Suzlon is a global pioneer in renewable energy solutions. The 2026 website revamp was designed to establish Suzlon as a "Sensitive & Responsive Expert" under a Scandinavian-inspired design ethos.',
    challenges: [
      { title: 'Brand Perception Shift', body: 'Expanding beyond a wind-only identity.' },
      { title: 'Greenwashing Skepticism', body: 'Replacing rhetoric with operational truth.' },
    ],
    solutions: [
      { title: 'Nordic Minimalist Design System', body: 'Reduced noise to convey calm technical confidence.' },
      { title: 'Unified Energy Systems Map', body: 'Presented Wind, Solar, and FDRE as one ecosystem.' },
      { title: 'Fact-Driven Sustainability', body: 'Prioritized metrics over marketing language.' },
    ],
    impact: [
      { title: 'Improved Stakeholder Confidence', body: 'Elevated trust across investor and media audiences.' },
      { title: 'Global Expansion Readiness', body: 'Built a multi-language scalable framework.' },
    ],
  },
  {
    slug: 'wave-group-crafting-a-multi-conglomerate-interactive-experience',
    title: 'Wave Group: Crafting a Multi-Conglomerate Interactive Experience',
    client: 'Wave Group', disciplines: ['Strategy', 'Branding', 'UX/UI Design'],
    team: ['Vedanshu Srivastava', 'Satish Kumar', 'Dinesh Juneja'],
    industry: 'Real Estate', timeline: '2024', partner: 'Emporiom',
    tags: ['Conglomerate', 'Corporate Identity', 'Real Estate'],
    summary: 'Consolidating a multi-industry conglomerate into a unified digital identity.',
    about: 'Wave Group is a multi-billion dollar enterprise with a vast portfolio across Real Estate, Retail, and Manufacturing. Wugweb designed a "liquid" digital experience to house their portfolio under one cohesive visual identity.',
    challenges: [
      { title: 'Multi-Vertical Cohesion', body: 'Unifying unrelated industries under one identity.' },
      { title: 'Content Overload Risk', body: 'Managing large corporate portfolios cleanly.' },
    ],
    solutions: [
      { title: 'Liquid Interaction Framework', body: 'Introduced motion-driven storytelling.' },
      { title: 'Modular Business Architecture', body: 'Allowed vertical autonomy within a shared system.' },
      { title: 'Performance-First Frontend', body: 'Protected Core Web Vitals.' },
    ],
    impact: [
      { title: 'Modernized Brand Image', body: 'Shifted perception to tech-forward conglomerate.' },
      { title: 'Longer Engagement Sessions', body: 'Encouraged exploration over browsing.' },
    ],
  },
  {
    slug: 'adtech-and-imedia-sculpting-the-visual-identity-of-global-martech-summits',
    title: 'ad:tech & iMedia: Sculpting the Visual Identity of Global MarTech Summits',
    client: 'ad:tech / iMedia', disciplines: ['Strategy', 'Branding', 'Environmental Design', 'UX/UI Design'],
    team: ['Vedanshu Srivastava', 'Sunil Thapa', 'Nehar Takkar', 'Jaswant Singh'],
    industry: 'Events & Marketing Technology', timeline: '2023-2025', partner: 'Comexposium',
    tags: ['Event Tech', 'MarTech', 'Multi-Channel Branding'],
    summary: 'Orchestrating a 360-degree brand experience for the world\'s leading MarTech events.',
    about: 'ad:tech and iMedia are premier destinations for marketing and media technology leaders. Over a three-year retainer, Wugweb served as the core creative partner for end-to-end visual narrative of these global summits.',
    challenges: [
      { title: 'Annual Visual Reinvention', body: 'Refreshing themes while maintaining recognition.' },
      { title: 'Cross-Medium Consistency', body: 'Aligning physical and digital brand touchpoints.' },
    ],
    solutions: [
      { title: 'Annual Theme Systems', body: 'Translated complex tech concepts into visual narratives.' },
      { title: 'Exhibition Environment Design', body: 'Engineered sponsor-friendly physical spaces.' },
      { title: 'Strict Brand Governance', body: 'Ensured omnichannel consistency.' },
    ],
    impact: [
      { title: 'Sustained Brand Authority', body: 'Strengthened long-term event equity.' },
      { title: 'Operational Efficiency', body: 'Reduced client coordination overhead.' },
    ],
  },
  {
    slug: 'linkedin-sales-navigator-optimizing-the-social-selling-interface',
    title: 'LinkedIn Sales Navigator: Optimizing the Social Selling Interface',
    client: 'LinkedIn', disciplines: ['Product UI/UX', 'Interaction Design'],
    team: ['Vedanshu Srivastava'], industry: 'SaaS', timeline: '2022',
    partner: 'Dentsu Webchutney', tags: ['SaaS', 'Sales Tech', 'Enterprise UX'],
    summary: 'Streamlining lead discovery and CRM integration for global enterprise teams.',
    about: 'Wugweb partnered on optimizing LinkedIn Sales Navigator\'s interface for enterprise sales teams, streamlining lead discovery, qualification, and CRM integration workflows.',
    challenges: [
      { title: 'Information Density Overload', body: 'Managing large volumes of lead data without cognitive fatigue.' },
      { title: 'Complex Sales Workflows', body: 'Streamlining discovery, qualification, and outreach flows.' },
    ],
    solutions: [
      { title: 'Insight-First Lead Layouts', body: 'Prioritized intent signals like job changes.' },
      { title: 'Native CRM Sync UI', body: 'Integrated Salesforce and HubSpot modules seamlessly.' },
      { title: 'Mobile-Optimized Views', body: 'Adapted complex tables for on-the-go sales usage.' },
    ],
    impact: [
      { title: 'Faster Lead Qualification', body: 'Reduced time-to-action for enterprise sales teams.' },
      { title: 'Higher Feature Utilization', body: 'Improved adoption of premium Sales Navigator tools.' },
    ],
  },
  {
    slug: 'nsl-oilchem-digitizing-the-lifecycle-of-industrial-waste-management',
    title: 'NSL OilChem: Digitizing the Lifecycle of Industrial Waste Management',
    client: 'NSL OilChem Waste Management', disciplines: ['Systems Integration', 'ERP Design', 'UX/UI Design'],
    team: ['Vedanshu Srivastava', 'Alwyn Lai', 'Gadar Soe'],
    industry: 'Environmental Services', timeline: '2023', partner: 'iCube',
    tags: ['Logistics', 'Industrial Tech', 'Environmental Services'],
    summary: 'Streamlining complex vendor management and hazardous waste tracking.',
    about: 'NSL OilChem specializes in treatment and recovery of hazardous industrial wastewater. Wugweb developed a comprehensive operational layer to manage their end-to-end supply chain with regulatory compliance.',
    challenges: [
      { title: 'Regulatory Compliance Complexity', body: 'Managing NEA and MPA documentation requirements.' },
      { title: 'Logistics Coordination', body: 'Orchestrating fleets across industrial and marine zones.' },
    ],
    solutions: [
      { title: 'Centralized Vendor Management', body: 'Unified third-party capacity and operations.' },
      { title: 'Real-Time Logistics Engine', body: 'Optimized routing using live GPS data.' },
      { title: 'End-to-End Waste Tracking', body: 'Digitized cradle-to-grave compliance workflows.' },
    ],
    impact: [
      { title: 'Improved Operational Efficiency', body: 'Reduced idle time and scheduling delays.' },
      { title: 'Full Regulatory Transparency', body: 'Simplified audits with digital traceability.' },
    ],
  },
  {
    slug: 'labelly-immutable-product-verification-via-blockchain-integration',
    title: 'Labelly: Immutable Product Verification via Blockchain Integration',
    client: 'Labelly', disciplines: ['Strategy', 'Branding', 'Visual Identity'],
    team: ['Vedanshu Srivastava'], industry: 'Web3 / Tech', timeline: '2023',
    tags: ['Web3 Branding', 'Visual Identity', 'Trust Design'],
    summary: 'Positioning blockchain as a consumer-friendly standard for product truth.',
    about: 'Labelly solves product counterfeiting by replacing duplicable QR codes with immutable blockchain-based verification that is accessible to non-technical users.',
    challenges: [
      { title: 'Counterfeit Proliferation', body: 'Replacing duplicable QR codes with immutable proof.' },
      { title: 'Web3 Adoption Barriers', body: 'Simplifying blockchain for non-technical users.' },
    ],
    solutions: [
      { title: 'Blockchain Verification Engine', body: 'Implemented Ethereum-based product identity logic.' },
      { title: 'Mobile-First Scanner UX', body: 'Enabled instant verification via camera access.' },
      { title: 'Zero-Knowledge Interface Design', body: 'Abstracted blockchain complexity from users.' },
    ],
    impact: [
      { title: 'Brand Protection at Scale', body: 'Eliminated counterfeit ambiguity.' },
      { title: 'Consumer Confidence Boost', body: 'Increased trust through instant verification.' },
    ],
  },
  {
    slug: 'witty-vegan-democratizing-plant-based-diversity-through-culture',
    title: 'Witty Vegan: Democratizing Plant-Based Diversity Through Culture',
    client: 'Witty Vegan', disciplines: ['Branding', 'Creative Direction', 'UI Design'],
    team: ['Vedanshu Srivastava', 'Kratika Vaid'], industry: 'Food & Beverage', timeline: '2023',
    tags: ['Veganism', 'Sustainable Brand', 'Visual Identity'],
    summary: 'Crafting a playful yet premium visual language for a plant-based future.',
    about: 'Witty Vegan is built on "Inclusion over Advocacy" — highlighting the diversity of plant-based ingredients through a culinary discovery engine that sparks curiosity.',
    challenges: [
      { title: 'Cultural Perception Barriers', body: 'Overcoming stereotypes around plant-based food.' },
      { title: 'Community Engagement Fatigue', body: 'Standing out in food-content saturation.' },
    ],
    solutions: [
      { title: 'Playful Brand Identity', body: 'Built a witty, energetic visual language.' },
      { title: 'Meme-Led Discovery Strategy', body: 'Used humor to dismantle food biases.' },
      { title: 'Community-Centric UX', body: 'Designed low-friction exploration paths.' },
    ],
    impact: [
      { title: 'Cultural Narrative Shift', body: 'Reframed veganism as choice and diversity.' },
      { title: 'Organic Social Growth', body: 'Achieved high engagement through humor.' },
    ],
  },
  {
    slug: 'stayweb-pms-a-next-gen-hospitality-engine-powered-by-ai-and-design-systems',
    title: 'Stayweb PMS: A Next-Gen Hospitality Engine Powered by AI and Design Systems',
    client: 'Stayweb', disciplines: ['Product Design', 'Systems Integration', 'Full-Stack Development'],
    team: ['Vedanshu Srivastava', 'Divyanshu Pundir', 'Vaibhav Shukla', 'Praneet Verma'],
    industry: 'Hospitality', timeline: '2024', tags: ['Hospitality SaaS', 'AI Tech', 'Automation'],
    summary: 'A unified PMS and Channel Manager built for seamless operations.',
    about: 'Stayweb PMS is a next-generation property management system with unified POS integration, AI-driven backend logic, and real-time channel management.',
    challenges: [
      { title: 'Fragmented Hospitality Systems', body: 'Disconnected PMS, POS, and channel managers.' },
      { title: 'Real-Time Sync Complexity', body: 'Preventing overbooking across global OTAs.' },
    ],
    solutions: [
      { title: 'Wugweb Kits UI System', body: 'Applied standardized design system for cross-module consistency.' },
      { title: 'AI-Driven Backend Logic', body: 'Used agentic AI to architect complex billing workflows.' },
      { title: 'Multi-API Middleware Layer', body: 'Integrated payments, printers, and key-card systems.' },
    ],
    impact: [
      { title: '50% Faster Frontend Delivery', body: 'Reduced build time through reusable Kits components.' },
      { title: 'Zero-Downtime Scalability', body: 'Enabled rapid expansion without service disruption.' },
    ],
  },
  {
    slug: 'unified-hrms-redefining-the-employee-lifecycle-through-automation',
    title: 'Unified HRMS: Redefining the Employee Lifecycle Through Automation',
    client: 'Internal Product', disciplines: ['Strategy', 'UX Design', 'UI Design', 'Workflow Automation'],
    team: ['Vedanshu Srivastava', 'Divyanshu Pundir', 'Vaibhav Shukla'],
    industry: 'Enterprise SaaS', timeline: '2024', tags: ['HRTech', 'Automation', 'Employee Engagement'],
    summary: 'An automated self-service portal for onboarding, payroll, and performance.',
    about: 'The Unified HRMS project eliminated administrative friction by building a dynamic Self-Service Hub where employees manage their own journeys from onboarding to performance reviews.',
    challenges: [
      { title: 'Manual HR Bottlenecks', body: 'Time-consuming document and payroll requests.' },
      { title: 'Fragmented Employee Data', body: 'Records scattered across tools and spreadsheets.' },
    ],
    solutions: [
      { title: 'Wugweb Kits Framework', body: 'Delivered a clean, accessible self-service interface.' },
      { title: 'Automated Document Engine', body: 'Enabled on-demand generation of HR documents.' },
      { title: 'Privacy-First Access Control', body: 'Enforced granular role-based permissions.' },
    ],
    impact: [
      { title: '70% Fewer HR Tickets', body: 'Automation eliminated repetitive requests.' },
      { title: 'Higher Employee Engagement', body: 'Increased participation in reviews and activities.' },
    ],
  },
  {
    slug: 'wugweb-revamp-the-living-manifesto-of-digital-perfection',
    title: 'Wugweb Revamp: The Living Manifesto of Digital Perfection',
    client: 'Wugweb (Internal)', disciplines: ['Creative Technology', 'UX/UI Design', 'CMS Architecture'],
    team: ['Vedanshu Srivastava', 'Divyanshu Pundir', 'Shreya Khot'],
    industry: 'Digital Agency', timeline: '2025', tags: ['Immersive UX', 'Framer Motion', 'Design Systems'],
    summary: 'An immersive, highly interactive flagship built on Framer using Wugweb Kits.',
    about: 'The Wugweb website serves as a high-performance demonstration of our technical capabilities. Built on Framer, it showcases the Wugweb Kits ecosystem with a "media-loaded," immersive environment.',
    challenges: [
      { title: 'High-Intensity Motion Design', body: 'Balancing animation richness with performance.' },
      { title: 'Meta Execution Pressure', body: 'Using Wugweb Kits to showcase Wugweb Kits.' },
    ],
    solutions: [
      { title: 'Advanced Framer Motion Logic', body: 'Built state-aware, scroll-driven interactions.' },
      { title: 'Kits-Based Page Architecture', body: 'Maintained consistency across 50+ components.' },
      { title: 'Rigorous Performance Testing', body: 'Stress-tested animations across browsers.' },
    ],
    impact: [
      { title: '3x Higher Session Duration', body: 'Immersive UX increased visitor engagement.' },
      { title: '80% Faster Publishing', body: 'CMS workflows reduced update cycles.' },
    ],
  },
  // New case studies from the writeup that aren't already in the original 8
  {
    slug: 'ntuc-u-care-fund-digital-transformation-for-enhanced-member-support',
    title: 'NTUC U Care Fund – Digital Transformation for Enhanced Member Support',
    client: 'NTUC U Care', disciplines: ['Strategy', 'UX Design', 'UI Design', 'Frontend Development', 'Backend Development', 'Systems Integration'],
    team: ['Vedanshu Srivastava', 'Alwyn Lai', 'Tang Ka Wei', 'Gadar Soe'],
    industry: 'Non-Profit', timeline: '2022', partner: 'iCube',
    tags: ['Social Impact', 'Admin Backend', 'Data Centralization'],
    summary: 'Empowering low-income families through a holistic digital ecosystem.',
    about: 'NTUC U Care is a pivotal initiative by the National Trades Union Congress in Singapore supporting low-income union members. Wugweb delivered a unified digital ecosystem streamlining aid distribution and program management.',
    challenges: [
      { title: 'Outdated Digital Presence', body: 'Legacy interfaces lacked accessibility and mobile responsiveness.' },
      { title: 'Inefficient Program Management', body: 'Manual workflows slowed application processing.' },
    ],
    solutions: [
      { title: 'Modern Responsive Platform', body: 'Built a contemporary, mobile-first interface.' },
      { title: 'Centralized Admin Backend', body: 'Developed dashboards to manage programs and disbursements.' },
      { title: 'Unified Data Management', body: 'Established a single source of truth for programs.' },
    ],
    impact: [
      { title: 'Improved Accessibility & UX', body: 'Members accessed support programs easily across devices.' },
      { title: 'Operational Efficiency Gains', body: 'Centralized systems reduced manual effort and delays.' },
    ],
  },
  {
    slug: 'rideev-powering-the-phygital-ev-revolution-in-india',
    title: 'RideEV – Powering the Phygital EV Revolution in India',
    client: 'RideEV', disciplines: ['Strategy', 'UX Design', 'UI Design', 'Branding'],
    team: ['Vedanshu Srivastava', 'Ritiak Tondon', 'Kushal Bhagat'],
    industry: 'Electric Vehicles', timeline: '2023',
    tags: ['EV', 'Omnichannel', 'Fintech Integration'],
    summary: 'Simplifying the electric scooter journey through an omnichannel purchase platform.',
    about: 'RideEV.in is India\'s pioneering omnichannel platform for electric vehicles, simplifying the electric scooter journey across metros and Tier II-V cities.',
    challenges: [
      { title: 'Establishing Trust', body: 'Digital EV purchasing required credibility in a traditionally offline market.' },
      { title: 'Digital-Physical Integration', body: 'Online flows had to connect with test drives and service centers.' },
    ],
    solutions: [
      { title: 'Intuitive Web Platform', body: 'Designed a clear, visually engaging interface for EV discovery.' },
      { title: 'Distinct Brand Identity', body: 'Built a modern, trustworthy brand system.' },
      { title: 'Phygital Experience Design', body: 'Aligned UX and branding to connect digital with physical services.' },
    ],
    impact: [
      { title: 'Expanded Digital Reach', body: 'A strong online presence enabled nationwide customer acquisition.' },
      { title: 'Stronger Brand Credibility', body: 'Cohesive branding positioned RideEV as a trusted EV platform.' },
    ],
  },
  {
    slug: 'plufo-crafting-an-immersive-edtech-ecosystem-for-young-learners',
    title: 'Plufo – Crafting an Immersive EdTech Ecosystem for Young Learners',
    client: 'Plufo', disciplines: ['Strategy', 'UX Design', 'UI Design', 'Branding', 'Web Development'],
    team: ['Vedanshu Srivastava', 'Devashish Sethia', 'Kumar Gautam', 'Rajatesh Nath', 'Arvind Kumar'],
    industry: 'EdTech', timeline: '2023',
    tags: ['EdTech', 'Gamification', 'Mobile App'],
    summary: 'Transforming passive screen time into an engaging multi-subject learning journey.',
    about: 'Plufo set out to revolutionize children\'s online education for ages 6-14 with a gamified, multi-subject learning platform covering Maths, English, Science, and Coding.',
    challenges: [
      { title: 'Sustaining Student Engagement', body: 'Academic content needed to remain interactive over time.' },
      { title: 'Personalized Learning at Scale', body: 'Individual learning paths had to adapt without manual intervention.' },
    ],
    solutions: [
      { title: 'Gamified Student App', body: 'Built interactive lessons with quizzes, rewards, and progress tracking.' },
      { title: 'Teacher Enablement App', body: 'Designed dashboards for class insights and performance analytics.' },
      { title: 'Cross-Platform UX Consistency', body: 'Unified interaction patterns across all products.' },
    ],
    impact: [
      { title: 'Higher Student Engagement', body: 'Gamified learning increased motivation and participation.' },
      { title: 'Empowered Educators & Parents', body: 'Clear tools enabled better guidance and oversight.' },
    ],
  },
  {
    slug: 'valyu-ai-empowering-indias-workforce-with-on-demand-earned-wages',
    title: 'VALYU.ai – Empowering India\'s Workforce with On-Demand Earned Wages',
    client: 'VALYU.ai', disciplines: ['Strategy', 'Leadership', 'UX Design', 'UI Design', 'Consulting'],
    team: ['Vedanshu Srivastava', 'Rashoo Kane', 'Kashish Chakrawarti', 'Lalit Chaturvedi', 'Gaurav Kumar'],
    industry: 'Fintech', timeline: '2023',
    tags: ['Fintech', 'Earned Wage Access', 'AI'],
    summary: 'Redefining financial health with instant access to accrued earnings.',
    about: 'VALYU.ai provides employees instant access to earned wages directly into their salary accounts, reducing financial stress on the Indian workforce.',
    challenges: [
      { title: 'Secure Digital Access', body: 'Financial onboarding required strong security without compromising usability.' },
      { title: 'Fee Transparency', body: 'Users needed absolute clarity on withdrawals and charges.' },
    ],
    solutions: [
      { title: 'Mobile-First Experience', body: 'Built an intuitive app for wage access and transactions.' },
      { title: 'AI-Powered Insights', body: 'Enabled personalized financial guidance and proactive money management.' },
      { title: 'Digital e-KYC Onboarding', body: 'Delivered paperless verification for fast, compliant access.' },
    ],
    impact: [
      { title: 'Improved Financial Well-being', body: 'Millions gained instant access to earned wages.' },
      { title: 'Expanded Financial Inclusion', body: 'Reduced dependency on high-interest credit alternatives.' },
    ],
  },
];

// ── NEW BLOG POSTS ─────────────────────────────────────────────
const newPosts = [
  {
    slug: 'the-end-of-screen-based-interfaces',
    title: 'The End of Screen-Based Interfaces',
    category: 'Tech',
    authorName: 'Anastasia Solovyova',
    date: '2024-03-15T00:00:00Z',
    readTime: 10,
    tags: ['Zero-UI', 'UX', 'Future of Design'],
    excerpt: 'The zero-UI and why it is crucial to the future of design. For better or worse, much design work is still visual these days. This makes sense since the essential products we interact with have screens.',
    sections: [
      { h: 'What is Zero-UI?', body: 'Zero User Interface, or Zero-UI, is an increasingly popular concept first coined by designer Andy Goodman, formerly at Accenture Interactive\'s agency. It is about getting away from the touchscreen and interfacing with the devices around us more naturally. This includes different fields such as haptics, computer vision, voice control, and even artificial intelligence.' },
      { h: 'Why do we need this transition?', body: 'Today, machines still force us to come to them on their terms, speaking their language. The next step for electronic devices is to finally understand us on our terms, in our own natural words, behaviours, and gestures. This is precisely where Zero-UI appears.' },
      { h: 'Different Types of Zero-UI', body: 'There are various ways to communicate with current technology instead of relying on a visual screen: Voice Recognition and Control (Siri, Amazon Echo), Haptic Feedback (vibration-based feedback in wearables), Ambient devices (bridge between digital and physical space), Gesture-Based User Interfaces (Microsoft Kinect, Nintendo Wii), and Context Awareness (AirPods sensors anticipating needs).' },
      { h: 'Zero-UI will rely on Data and AI', body: 'Whereas interface designers right now live in apps like InDesign and Adobe Illustrator, the non-linear design problems of Zero-UI will require vastly different tools and skill sets. Designers will have to become experts in science, biology, and psychology to create these devices.' },
      { h: 'What\'s after Zero-UI?', body: 'Zero-UI is the ultra-modern version of artificial intelligence. Looking to the future, the next big step will be for the concept of the "device" to disappear. — by Sundar Pichai, Google C.E.O' },
    ],
  },
  {
    slug: 'guarding-against-disposable-design',
    title: 'Guarding Against Disposable Design',
    category: 'Design',
    authorName: 'Anastasia Solovyova',
    date: '2024-06-20T00:00:00Z',
    readTime: 12,
    tags: ['Design', 'Sustainability', 'Web Design'],
    excerpt: 'Longevity takes a different form online, but its value is immeasurable. This piece is about disposable web design and longevity, with steps to find the sweet spot between reinventing the wheel and twiddling thumbs.',
    sections: [
      { h: 'What Is Disposable Design?', body: 'Disposable design in web context includes unpleasant UX, following design fads rather than shaping design around content, broken links, ever-growing navigation drawers with no apparent logic, and quick fixes. These issues stem from an approach that leaves sites needing replacing far sooner than they should.' },
      { h: 'The Causes', body: 'Disposable design is the tip of a lousy practice iceberg. Poor planning, following fads, poor documentation, outsourcing content to third-party platforms, and short-termism all contribute to building sites that do not last.' },
      { h: 'Building To Last', body: 'URL structure, branding, content strategy, design best practice, and accessibility are areas where consistency is essential. Breaking up projects into modular sections frees you up to innovate without rebuilding the whole thing.' },
      { h: 'Resilience', body: 'Making a website\'s design last means solving current problems and future issues. Asking "What happens if…?" can make a huge difference to longevity — if we have 50 items in the navbar, 100 blog posts, very dense tables with 15 columns, or someone navigating with a screen reader.' },
      { h: 'Sustainability Online', body: 'Don\'t just think about next year. Design for accessibility. Think modular. By laying solid foundations, you allow yourself and your successors to focus on improvement rather than fixes.' },
    ],
  },
];

async function migrateNewPosts() {
  console.log(`\n📋 Adding ${newPosts.length} new blog posts...`);

  // Ensure authors exist
  const authorRefs = { 'Anastasia Solovyova': 'person-anastasia-solovyova', 'Wugweb': 'person-vedanshu-srivastava' };
  for (const name of ['Anastasia Solovyova']) {
    const ref = authorRefs[name];
    try {
      await client.createIfNotExists({
        _id: ref, _type: 'person', name, role: 'Author',
        slug: { _type: 'slug', current: name.toLowerCase().replace(/\s+/g, '-') },
        order: 100,
      });
    } catch (_) {}
  }

  for (const post of newPosts) {
    const body = [
      { _type: 'block', _key: 'intro', style: 'normal', children: [{ _type: 'span', _key: 'intro-span', text: post.excerpt, marks: [] }], markDefs: [] },
      ...post.sections.flatMap((s, i) => [
        { _type: 'block', _key: `h-${i}`, style: 'h2', children: [{ _type: 'span', _key: `hs-${i}`, text: s.h || '', marks: [] }], markDefs: [] },
        { _type: 'block', _key: `p-${i}`, style: 'normal', children: [{ _type: 'span', _key: `ps-${i}`, text: s.body, marks: [] }], markDefs: [] },
      ]),
    ];

    await upsert({
      _id: `post-${post.slug}`,
      _type: 'post',
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      category: post.category,
      author: { _type: 'reference', _ref: authorRefs[post.authorName] },
      excerpt: post.excerpt,
      readTime: post.readTime,
      tags: post.tags,
      publishedAt: post.date,
      featured: false,
      body,
    });
  }
}

async function main() {
  console.log('🚀 Sanity Migration Phase 2');
  console.log(`Project: splvhmk1 / production\n`);

  console.log(`📋 Adding ${caseStudies.length} new case studies...`);
  for (const cs of caseStudies) {
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
      challenges: (cs.challenges || []).map((c, i) => ({ _key: `ch-${i}`, title: c.title, body: c.body })),
      solutions: (cs.solutions || []).map((s, i) => ({ _key: `sol-${i}`, title: s.title, body: s.body })),
      impact: (cs.impact || []).map((im, i) => ({ _key: `imp-${i}`, title: im.title, body: im.body })),
      publishedAt: '2023-06-15T00:00:00Z',
      featured: false,
    };
    await upsert(doc);
  }

  await migrateNewPosts();

  console.log('\n✅ Migration complete!');
}

main().catch((e) => { console.error('\n❌ Migration failed:', e); process.exit(1); });
