// Hardcoded service fallbacks — source of truth: urgent/Wugweb_Services 2026.md
// (the 6-pillar service copy). Used by /services/[slug] when Sanity has no
// document for a slug, and kept out of the page so the copy stays reusable.
// Shape mirrors the Sanity `service` schema: capabilities[{n,title,items}],
// approach[{n,title,body}], process[{phase,steps}], tools[{category,items}],
// why[{title,body}], faqs[{q,a}], plus page-only extras stats/framework.

export interface ServiceCapability { n: string; title: string; items: string[] }
export interface ServiceApproach { n: string; title: string; body: string }
export interface ServiceProcess { phase: string; steps: string[] }
export interface ServiceTools { category: string; items: string[] }
export interface ServiceWhy { title: string; body: string }
export interface ServiceFaq { q: string; a: string }
export interface ServiceStat { n: string; label: string }
export interface ServiceFrameworkPhase { phase: string; outcome: string; includes: string[] }

export interface ServiceData {
  title: string;
  subtitle: string;
  tags: string[];
  heroText: string;
  body: string;
  stats: ServiceStat[];
  framework: ServiceFrameworkPhase[];
  capabilities: ServiceCapability[];
  approach: ServiceApproach[];
  process?: ServiceProcess[];
  tools?: ServiceTools[];
  faqs: ServiceFaq[];
  why: ServiceWhy[];
}

const strategy: ServiceData = {
  title: 'Strategy',
  subtitle: 'Turn vision into direction. Direction into results.',
  tags: ['Business Strategy', 'Product Strategy', 'AI Strategy', 'Transformation', 'Digital Transformation', 'Market Research', 'Product Discovery', 'Roadmapping', 'Innovation Strategy'],
  heroText: "Every successful business begins with the right strategy. Whether you're defining a new product, entering a market, adopting AI, or transforming existing operations, strategic decisions shape everything that follows. At Wugweb, we help organizations make those decisions with confidence. Through research, business insight, product thinking, and technology planning, we create practical strategies that reduce uncertainty, align stakeholders, and establish a clear path from ambition to execution.",
  body: 'Around 70% of large-scale transformation initiatives fail to achieve their intended outcomes—often due to unclear strategy, poor alignment, or ineffective execution. The difference isn\'t ambition; it\'s having the right foundation before building. Our strategy practice helps organizations validate opportunities, prioritize investments, align stakeholders, and create practical roadmaps that guide confident decision-making from discovery through delivery.',
  stats: [
    { n: '70%', label: 'of transformations fail without clear strategy' },
    { n: '5', label: 'disciplines connected in every engagement' },
    { n: '1', label: 'shared roadmap from ambition to execution' },
  ],
  framework: [
    { phase: 'Discovery', outcome: 'A shared understanding of the current state and future opportunities.', includes: ['Stakeholder workshops', 'Market research', 'Customer research', 'Competitive analysis', 'Business assessment'] },
    { phase: 'Strategic Direction', outcome: 'A practical strategic roadmap.', includes: ['Business objectives', 'Product vision', 'Opportunity mapping', 'Prioritization', 'Success metrics'] },
    { phase: 'Planning', outcome: 'An actionable implementation plan.', includes: ['Roadmaps', 'Capability planning', 'Technology recommendations', 'Resource planning', 'Risk assessment'] },
    { phase: 'Execution Support', outcome: 'Faster execution with greater confidence.', includes: ['Cross-functional alignment', 'Decision support', 'Product guidance', 'Workshop facilitation'] },
    { phase: 'Continuous Improvement', outcome: 'Long-term strategic resilience.', includes: ['Performance reviews', 'KPI monitoring', 'Opportunity reassessment', 'Roadmap refinement'] },
  ],
  capabilities: [
    { n: '01', title: 'Business Strategy', items: ['Business Strategy', 'Digital Transformation', 'Innovation', 'Market Research', 'Customer & User Research'] },
    { n: '02', title: 'Product Strategy', items: ['Product Strategy', 'Product Discovery', 'Roadmapping', 'MVP Planning', 'Innovation Strategy'] },
    { n: '03', title: 'AI & Technology', items: ['AI Strategy & Readiness', 'AI Opportunity Mapping', 'Transformation Workshops', 'Digital Transformation'] },
  ],
  approach: [
    { n: '01', title: 'Discover', body: 'Understand the business, customers, market, and challenges.' },
    { n: '02', title: 'Analyze', body: 'Identify opportunities, validate assumptions, and prioritize initiatives.' },
    { n: '03', title: 'Define', body: 'Develop strategic direction, success metrics, and execution priorities.' },
    { n: '04', title: 'Align', body: 'Build consensus across stakeholders and create a shared roadmap.' },
    { n: '05', title: 'Evolve', body: 'Measure progress, adapt to change, and continuously refine strategy.' },
  ],
  faqs: [
    { q: 'What types of strategy services do you provide?', a: 'We help organizations with business strategy, product strategy, product discovery, market research, digital transformation, innovation planning, AI strategy, customer research, and execution roadmaps.' },
    { q: 'When should we engage a strategy partner?', a: 'The best time is before major investments or product decisions. Strategic planning helps reduce uncertainty, validate opportunities, and align stakeholders before execution begins.' },
    { q: 'Do you work with startups and enterprises?', a: 'Yes. Our approach is tailored to organizations at different stages of growth, from early-stage startups defining their first product to enterprises leading digital transformation initiatives.' },
    { q: 'Can you work with our internal teams?', a: 'Absolutely. We regularly collaborate with leadership, product, design, engineering, and marketing teams as an extension of their organization.' },
    { q: 'Do strategy engagements include implementation?', a: 'Yes. We can support both strategic planning and the design, engineering, AI, and growth initiatives required to bring that strategy to life.' },
    { q: 'How long does a strategy engagement take?', a: 'Depending on scope, engagements typically range from a few weeks for focused discovery to several months for comprehensive transformation programs.' },
    { q: 'How do you measure success?', a: 'Success is measured against business objectives, customer outcomes, product performance, and the strategic goals established at the beginning of each engagement.' },
    { q: 'What deliverables can we expect?', a: 'Depending on the engagement, deliverables may include research findings, strategic recommendations, opportunity assessments, roadmaps, product strategies, AI readiness plans, transformation frameworks, and implementation plans.' },
    { q: 'What happens after the strategy is complete?', a: 'We can continue supporting execution through design, engineering, AI implementation, optimization, and ongoing strategic advisory, ensuring the strategy delivers measurable business outcomes.' },
  ],
  why: [
    { title: 'Research-Backed Clarity', body: 'Every recommendation is grounded in real market data and user research, not assumptions.' },
    { title: 'Actionable Roadmaps', body: 'We don\'t just deliver decks — we provide execution-ready plans with clear ownership and timelines.' },
    { title: 'Cross-Disciplinary Thinking', body: 'Our strategists draw on brand, design, engineering, and growth perspectives for holistic solutions.' },
    { title: 'Measurable Outcomes', body: 'We define success metrics upfront and build strategy around achieving tangible business results.' },
  ],
};

const brand: ServiceData = {
  title: 'Brand',
  subtitle: 'Create brands people remember.',
  tags: ['Brand Strategy', 'Identity Systems', 'Naming', 'Brand Guidelines'],
  heroText: "Your brand is more than a logo — it's the sum of every interaction people have with you. We craft distinct brand identities that build emotional connection, inspire loyalty, and drive long-term growth. From naming and visual systems to voice and comprehensive guidelines, we ensure your brand stands out and stays consistent.",
  body: 'A strong brand is a strategic asset. We help organisations define who they are, what they stand for, and how they show up in the world. Our brand process combines strategic thinking with creative excellence — resulting in identities that are not only beautiful but strategically grounded and built to last.',
  stats: [
    { n: '306%', label: 'higher lifetime value for emotionally connected brands' },
    { n: '71%', label: 'boost in customer advocacy' },
    { n: '4-8', label: 'weeks for a full identity engagement' },
  ],
  framework: [
    { phase: 'Discovery', outcome: 'A clear understanding of your brand today and its future opportunity.', includes: ['Stakeholder workshops', 'Brand audits', 'Market research', 'Audience insights', 'Competitive analysis'] },
    { phase: 'Strategy', outcome: 'A strategic foundation for long-term differentiation.', includes: ['Purpose & vision', 'Positioning', 'Brand values', 'Messaging', 'Brand architecture'] },
    { phase: 'Identity', outcome: 'A cohesive identity that communicates with clarity and consistency.', includes: ['Logo systems', 'Typography', 'Color systems', 'Visual language', 'Voice & tone', 'Brand guidelines'] },
    { phase: 'Activation', outcome: 'A consistent brand experience across every touchpoint.', includes: ['Marketing assets', 'Digital experiences', 'Product branding', 'Campaign support', 'Launch planning'] },
    { phase: 'Evolution', outcome: 'A brand that remains relevant as your business evolves.', includes: ['Brand governance', 'Performance reviews', 'Identity refinements', 'New applications', 'Ongoing consultation'] },
  ],
  capabilities: [
    { n: '01', title: 'Brand Strategy', items: ['Positioning', 'Narrative', 'Naming', 'Messaging'] },
    { n: '02', title: 'Identity', items: ['Identity Systems', 'Voice & Tone', 'Employer Brand', 'Brand Guidelines'] },
    { n: '03', title: 'Activation', items: ['Brand Activation', 'Campaigns', 'Brand Audits', 'Brand Evolution'] },
  ],
  approach: [
    { n: '01', title: 'Discovery & Brand Audit', body: 'We dive deep into your brand\'s current state, market position, and aspirations to identify opportunities.' },
    { n: '02', title: 'Strategic Positioning', body: 'We define your brand\'s purpose, personality, and positioning — the strategic foundation for all creative work.' },
    { n: '03', title: 'Visual & Verbal Identity', body: 'We craft the visual system — logo, colour, typography, imagery — and the verbal identity that brings your brand to life.' },
    { n: '04', title: 'Guidelines & Activation', body: 'We deliver comprehensive brand guidelines that empower your team to apply the identity consistently across every touchpoint.' },
  ],
  faqs: [
    { q: 'What\'s included in a full brand identity project?', a: 'A full brand identity includes brand strategy, naming (if needed), logo design, visual identity system, typography, colour palette, tone of voice, and comprehensive brand guidelines.' },
    { q: 'Do you design logos only?', a: 'Logo design is part of our offering, but we always deliver it as part of a full visual identity system — not in isolation.' },
    { q: 'How long does a brand project take?', a: 'A typical brand identity project runs 4-8 weeks from discovery to final deliverables, depending on scope.' },
    { q: 'Do you create brand guidelines?', a: 'Absolutely. We create comprehensive brand guidelines that ensure consistency across all channels and touchpoints.' },
    { q: 'Can you refresh an existing brand without a full rebrand?', a: 'Yes. We often evolve existing identities — tightening systems, modernising assets, and clarifying voice while protecting equity you have already built.' },
    { q: 'Do you handle naming and verbal identity?', a: 'Yes. Naming, messaging architecture, and tone of voice are part of our brand practice when the engagement calls for them.' },
    { q: 'Will our internal teams be able to use the system day to day?', a: 'That is the goal. Deliverables include practical guidelines, templates, and handoff sessions so design, marketing, and product can apply the brand consistently.' },
    { q: 'Do brand projects connect to digital product design?', a: 'Yes. We design brand systems that hold up in product UI, marketing sites, and campaigns — not just static brand books.' },
  ],
  why: [
    { title: 'Strategic Foundation', body: 'Every brand we create is built on a clear strategic foundation — not just aesthetics.' },
    { title: 'Holistic Identity Systems', body: 'We design cohesive systems that work across digital, print, environmental, and every other touchpoint.' },
    { title: 'Authentic Storytelling', body: 'We uncover the core of your brand to craft narratives that resonate, connect, and inspire loyalty.' },
    { title: 'Practical Guidelines', body: 'Our guidelines are designed to be used — clear, actionable, and easy for your team to implement.' },
  ],
};

const experience: ServiceData = {
  title: 'Experience',
  subtitle: 'Design products people love using.',
  tags: ['UX Design', 'UI Design', 'Design Systems', 'User Research'],
  heroText: "We design digital experiences that people love to use. Rooted in human-centered design and rigorous user research, our UX/UI services cover everything from journey mapping and wireframing to polished visual design and scalable design systems — all focused on creating intuitive, engaging products that drive business results.",
  body: 'In the experience economy, exceptional design is a competitive advantage. We design and engineer intuitive, engaging digital experiences that captivate users, build brand loyalty, and fuel sustainable growth. Our process is collaborative, data-informed, and relentlessly focused on delivering value to both users and businesses.',
  stats: [
    { n: '$1→$100', label: 'ROI for every dollar invested in UX' },
    { n: '5', label: 'framework phases from research to optimization' },
    { n: 'WCAG', label: 'accessible by default, not an afterthought' },
  ],
  framework: [
    { phase: 'Research', outcome: 'Validated insights that guide every design decision.', includes: ['User interviews', 'Usability reviews', 'Competitive analysis', 'Journey mapping', 'Persona development'] },
    { phase: 'Experience Strategy', outcome: 'A clear blueprint for intuitive interactions.', includes: ['Information architecture', 'User flows', 'Experience principles', 'Content structure'] },
    { phase: 'Design', outcome: 'Experiences that are usable, scalable, and visually engaging.', includes: ['Wireframes', 'UI Design', 'Interactive prototypes', 'Design systems', 'Accessibility'] },
    { phase: 'Validation', outcome: 'Greater confidence before development.', includes: ['Usability testing', 'Accessibility testing', 'Prototype validation', 'Design QA'] },
    { phase: 'Optimization', outcome: 'Experiences that evolve alongside users.', includes: ['Analytics reviews', 'Behaviour analysis', 'UX audits', 'Iterative improvements'] },
  ],
  capabilities: [
    { n: '01', title: 'Research', items: ['UX Research', 'Service Design', 'Information Architecture', 'Journey Mapping'] },
    { n: '02', title: 'Design', items: ['UX Design', 'UI Design', 'Design Systems', 'Prototyping'] },
    { n: '03', title: 'Testing & Accessibility', items: ['User Testing', 'Accessibility', 'Usability Testing', 'Design Critique'] },
  ],
  approach: [
    { n: '01', title: 'User Discovery', body: 'We illuminate design possibilities through deep dives into user behaviour, needs, and pain points.' },
    { n: '02', title: 'Design & Prototyping', body: 'We rapidly explore solutions through wireframes, prototypes, and iterative design cycles.' },
    { n: '03', title: 'Testing & Validation', body: 'We validate designs through usability testing and data analysis, driving continuous improvement.' },
    { n: '04', title: 'Design & Development Handoff', body: 'We ensure seamless translation from design to development with detailed specs and design system components.' },
    { n: '05', title: 'System & Evolve', body: 'We leave you with a governed design system and a cadence for iterating as the product roadmap moves.' },
  ],
  process: [
    { phase: 'Discovery', steps: ['Kick-off meeting', 'Competitor analysis', 'User interview', 'Brain storming'] },
    { phase: 'Ideation', steps: ['User journey', 'Sitemap', 'Wireframes & prototyping', 'Usability testing'] },
    { phase: 'Prototyping & Testing', steps: ['Analysing results', 'Look and feel drafts', 'Design concept', 'Final UI design'] },
    { phase: 'UI Design', steps: ['Final UI design', 'Handover meeting'] },
  ],
  tools: [
    { category: 'User Research & Testing', items: ['Maze', 'Dovetail', 'Lyssna', 'Remesh', 'UserZoom', 'UserLytics', 'Reflect', 'Trymata'] },
    { category: 'Collaboration & Workflow', items: ['Notion', 'Zeroheight', 'Supernova', 'UiInspector', 'Keep'] },
    { category: 'Designing & Prototyping', items: ['Plasmic', 'Sketch', 'Figma', 'Vercel', 'RIVE', 'Webflow', 'penpot', 'Framer', 'Canva'] },
    { category: 'Organization & Productivity', items: ['Mem', 'Opal', 'ValidatorAI', 'Perplexity', 'Obsidian', 'Any.do', 'BeeDone', 'Tavus'] },
    { category: 'AI-Powered Design Tools', items: ['Uizard', 'Lummi', 'GalileoAI', 'Stockimg.ai', 'Khroma', 'Midjourney', 'OpenArt', 'Jitter', 'Illustroke'] },
  ],
  faqs: [
    { q: 'What is Experience Design?', a: 'Experience design is the practice of designing products and services with a focus on the quality of the user experience across every touchpoint.' },
    { q: 'Why is Customer Experience Design important?', a: 'Exceptional customer experience drives loyalty, increases conversions, and creates competitive advantage in the experience economy.' },
    { q: 'What services do you offer?', a: 'We offer UX strategy, user research, information architecture, interaction design, visual design, usability testing, design systems, and accessibility.' },
    { q: 'What\'s your design approach?', a: 'Our approach is human-centered, data-informed, and collaborative. We start with deep user research and iterate through testing and refinement.' },
    { q: 'How do you ensure user needs are met?', a: 'Through continuous user research, usability testing, and data-driven validation at every stage of the design process.' },
    { q: 'How do you measure design effectiveness?', a: 'We measure effectiveness through usability metrics, user satisfaction scores, conversion rates, and business KPIs aligned with your goals.' },
    { q: 'How do you approach collaboration?', a: 'We collaborate closely with your team throughout the process — from discovery workshops to design reviews to development handoff.' },
    { q: 'Can you help with new product design?', a: 'Absolutely. We specialise in taking products from concept to launch, including MVP design, full product design, and redesigns.' },
    { q: 'Do you design for accessibility?', a: 'Yes. Accessibility is built into our process from day one, following WCAG guidelines to ensure inclusive experiences.' },
    { q: 'What\'s the final deliverable?', a: 'Deliverables include design files, interactive prototypes, design system documentation, asset exports, and developer handoff specs.' },
  ],
  why: [
    { title: 'Human-Centered Process', body: 'Every design decision is grounded in real user needs and behavioural insights — not assumptions.' },
    { title: 'Rapid Iteration', body: 'We move fast through prototypes and testing cycles, validating ideas before investing in development.' },
    { title: 'Scalable Design Systems', body: 'We build design systems that grow with your product, ensuring consistency across every feature and platform.' },
    { title: 'Accessibility First', body: 'We design for everyone, following WCAG guidelines to ensure your product is usable by all.' },
  ],
};

const growth: ServiceData = {
  title: 'Growth',
  subtitle: 'Turn products into businesses.',
  tags: ['Marketing', 'MarTech', 'Analytics', 'AI Marketing'],
  heroText: "Growth is driven by smart systems and sharper insights. We help businesses unlock data-driven marketing through MarTech consulting, marketing automation, AI integration, and lead generation strategies — turning your marketing into a measurable, scalable engine for acquisition and retention.",
  body: 'Marketing success today is powered by smart systems and sharper insights. We help unlock your marketing potential through MarTech consulting that connects data, automates workflows, and creates tailored experiences. Our approach is holistic — we test, adapt, and optimise continuously using AI-powered marketing strategies to drive measurable growth.',
  stats: [
    { n: '451%', label: 'more qualified leads with marketing automation' },
    { n: '8%', label: 'boost in sales productivity' },
    { n: '6', label: 'connected growth disciplines in one engine' },
  ],
  framework: [
    { phase: 'Business Discovery', outcome: 'Alignment on objectives, customers, and the challenges that matter most.', includes: ['Business objectives', 'Customer understanding', 'Marketing review', 'Challenge identification'] },
    { phase: 'Market & Customer Research', outcome: 'Opportunities for acquisition, retention, and expansion.', includes: ['Competitor analysis', 'Customer behaviour', 'Market trends', 'Performance data'] },
    { phase: 'Growth Architecture', outcome: 'A complete growth ecosystem — journeys, CRM, automation, and measurement.', includes: ['Customer journeys', 'CRM & automation', 'Content strategy', 'Channel mix', 'Measurement frameworks'] },
    { phase: 'Build & Integrate', outcome: 'Marketing technology, automation, AI, and analytics in place.', includes: ['MarTech implementation', 'AI capabilities', 'Analytics', 'CRM integrations'] },
    { phase: 'Launch, Measure & Scale', outcome: 'Sustainable growth through continuous optimization.', includes: ['Campaign launch', 'Performance monitoring', 'Experimentation', 'Automation & AI scaling'] },
  ],
  capabilities: [
    { n: '01', title: 'Growth Strategy', items: ['Growth strategy & planning', 'Go-to-market strategy', 'Customer acquisition planning', 'Market expansion strategy', 'Growth opportunity assessment'] },
    { n: '02', title: 'Customer Acquisition', items: ['Search marketing (SEO & SEM)', 'Paid media strategy', 'Social media marketing', 'Content marketing', 'Lead generation'] },
    { n: '03', title: 'Customer Lifecycle & CRM', items: ['CRM strategy', 'Customer journey mapping', 'Lead nurturing', 'Lifecycle marketing', 'Loyalty & retention programs'] },
    { n: '04', title: 'Marketing Automation & AI', items: ['Marketing automation', 'Email & customer journeys', 'AI-powered personalization', 'Campaign automation', 'Conversational AI'] },
    { n: '05', title: 'Conversion Optimization', items: ['Conversion rate optimization (CRO)', 'Landing page optimization', 'A/B & multivariate testing', 'Funnel optimization', 'User behaviour analysis'] },
    { n: '06', title: 'Analytics & Growth Intelligence', items: ['Marketing analytics', 'Customer analytics', 'Attribution modelling', 'Performance dashboards', 'Growth reporting'] },
    { n: '07', title: 'Growth Operations', items: ['CRM implementation', 'Marketing technology integration', 'Workflow automation', 'Campaign operations', 'Revenue operations (RevOps)'] },
    { n: '08', title: 'AI-Powered Growth', items: ['Predictive analytics', 'AI-assisted content', 'Customer segmentation', 'Personalization engines', 'AI-driven insights'] },
  ],
  approach: [
    { n: '01', title: 'Discover', body: 'We start by learning your business goals, competitive landscape, customer behaviour, and existing growth efforts to uncover opportunities with the greatest potential.' },
    { n: '02', title: 'Analyze', body: 'We evaluate customer journeys, acquisition channels, marketing performance, and operational data to identify what drives growth—and what holds it back.' },
    { n: '03', title: 'Strategize', body: 'We define the right mix of channels, customer experiences, technology, automation, and success metrics to achieve your business objectives.' },
    { n: '04', title: 'Activate', body: 'From campaigns and content to CRM, automation, and customer journeys, we execute integrated initiatives designed to attract, convert, and retain customers.' },
    { n: '05', title: 'Optimize', body: 'We measure results, experiment with new ideas, and refine every stage of the customer lifecycle using data, analytics, and customer feedback.' },
    { n: '06', title: 'Scale', body: 'As your business evolves, we expand successful initiatives, automate operations, integrate AI where it creates value, and establish systems that support sustainable growth.' },
  ],
  faqs: [
    { q: 'What is a growth strategy, and why does my business need one?', a: 'A growth strategy provides a structured plan for acquiring customers, improving conversions, increasing retention, and expanding revenue. It aligns marketing, customer experience, technology, and data to create sustainable business growth.' },
    { q: 'Do you only work with businesses that already have a marketing team?', a: 'No. We work with organizations at every stage—from startups building their first growth engine to established businesses looking to optimize existing teams, channels, and technology.' },
    { q: 'Can you work with our existing CRM and marketing tools?', a: 'Yes. We evaluate your current technology stack and build upon it whenever possible. Whether you\'re using HubSpot, Salesforce, Google Analytics, Mailchimp, or other platforms, we integrate and optimize rather than replace unnecessarily.' },
    { q: 'How do you measure the success of growth initiatives?', a: 'Success is measured using business-focused KPIs such as customer acquisition, conversion rates, retention, customer lifetime value, revenue growth, return on investment, and overall marketing performance.' },
    { q: 'Do you offer marketing automation and AI solutions?', a: 'Yes. We help businesses implement automation, AI-powered workflows, customer segmentation, personalization, predictive insights, and intelligent reporting where they create measurable value.' },
    { q: 'How long does it take to see results?', a: 'The timeline depends on your business objectives and growth initiatives. Some improvements, such as conversion optimization and automation, can deliver results within weeks, while SEO, brand growth, and customer retention strategies typically deliver greater impact over several months.' },
    { q: 'Do you provide ongoing growth support after implementation?', a: 'Absolutely. Growth is an ongoing process. We continuously monitor performance, optimize campaigns, refine customer journeys, and identify new opportunities to help your business scale sustainably.' },
    { q: 'What industries do you work with?', a: 'We work across startups, SMEs, and enterprise organizations in industries including SaaS, fintech, healthcare, retail, eCommerce, travel, logistics, manufacturing, and professional services. Our strategies are tailored to your business goals rather than limited to a specific industry.' },
  ],
  why: [
    { title: 'Business-First Thinking', body: 'Every initiative begins with your business objectives, ensuring marketing investments deliver measurable commercial impact.' },
    { title: 'Connected Customer Journeys', body: 'We design seamless experiences across every stage of the customer lifecycle—from acquisition and conversion to retention and advocacy.' },
    { title: 'Data-Driven Decisions', body: 'Real-time insights, experimentation, and analytics guide every decision, helping you continuously improve performance with confidence.' },
    { title: 'Intelligent Technology', body: 'We combine CRM, automation, analytics, and AI to create scalable growth systems that improve efficiency without adding unnecessary complexity.' },
    { title: 'Long-Term Growth Partnership', body: 'Markets change, customers evolve, and technology moves fast. We work alongside your team to continuously optimize, adapt, and scale your growth strategy over time.' },
  ],
};

const engineering: ServiceData = {
  title: 'Engineering',
  subtitle: 'Engineer products built to scale.',
  tags: ['Web Development', 'App Development', 'Infrastructure', 'AI'],
  heroText: 'We build robust, performant digital products using modern engineering practices. From responsive websites and e-commerce platforms to native mobile apps and cloud-native architectures, our engineering team delivers scalable solutions that are secure, fast, and built to last.',
  body: 'It takes just 50 milliseconds for users to form an opinion about your website. We specialise in building scalable web solutions and custom digital products across marketing, eCommerce, and enterprise platforms. Our agile development process ensures speed, flexibility, and transparency from planning to deployment.',
  stats: [
    { n: '50ms', label: 'to form an opinion about your website' },
    { n: '5', label: 'framework phases from discovery to operations' },
    { n: '24/7', label: 'monitoring and reliability after launch' },
  ],
  framework: [
    { phase: 'Discovery', outcome: 'A validated technical roadmap.', includes: ['Technical workshops', 'Requirements gathering', 'Architecture review', 'Solution planning', 'Technology selection'] },
    { phase: 'Architecture', outcome: 'A scalable engineering foundation.', includes: ['System architecture', 'Database design', 'API planning', 'Infrastructure planning', 'Security planning'] },
    { phase: 'Development', outcome: 'Reliable digital products ready for deployment.', includes: ['Frontend development', 'Backend development', 'Mobile development', 'Integrations', 'No-code implementations'] },
    { phase: 'Quality Assurance', outcome: 'Higher confidence with every deployment.', includes: ['Functional testing', 'Performance testing', 'Security validation', 'Accessibility testing', 'Release QA'] },
    { phase: 'Operations', outcome: 'Products that continue to improve over time.', includes: ['Monitoring', 'Maintenance', 'Feature enhancements', 'Cloud optimization', 'Performance improvements'] },
  ],
  capabilities: [
    { n: '01', title: 'Product Engineering', items: ['Product concept to launch', 'Product thinking', 'Scalable architecture', 'Web & app engineering'] },
    { n: '02', title: 'Web Platforms', items: ['High-performance websites', 'Portals', 'CMS platforms', 'Digital experiences'] },
    { n: '03', title: 'Mobile Applications', items: ['Native iOS & Android', 'Cross-platform apps', 'Seamless device experiences'] },
    { n: '04', title: 'Custom Software', items: ['Bespoke business applications', 'Internal tools', 'Customer portals', 'Enterprise solutions'] },
    { n: '05', title: 'E-commerce Solutions', items: ['Scalable commerce platforms', 'Secure payments', 'Inventory management', 'Customer accounts', 'Third-party integrations'] },
    { n: '06', title: 'AI & Intelligent Applications', items: ['AI assistants', 'Automation', 'Search', 'Recommendations', 'Document processing', 'Intelligent workflows'] },
    { n: '07', title: 'No-Code & Low-Code Solutions', items: ['Visual development platforms', 'Rapid validation', 'Business applications'] },
    { n: '08', title: 'APIs & Systems Integration', items: ['Connect products & platforms', 'CRMs, ERPs, payment gateways', 'Third-party services', 'Secure, scalable integrations'] },
    { n: '09', title: 'Cloud, DevOps & Infrastructure', items: ['Reliable cloud infrastructure', 'Deployment pipelines', 'Monitoring', 'Continuous delivery'] },
    { n: '10', title: 'Quality Engineering', items: ['Testing embedded in lifecycle', 'Accessibility', 'Security', 'Performance validation'] },
    { n: '11', title: 'Platform Modernization', items: ['Legacy system modernization', 'Platform migration', 'Architecture improvement', 'Future-growth preparation'] },
  ],
  approach: [
    { n: '01', title: 'Discover the Opportunity', body: 'Understand the business, users, and technical landscape.' },
    { n: '02', title: 'Design the Solution', body: 'Architect systems that are scalable, secure, and maintainable.' },
    { n: '03', title: 'Engineer the Product', body: 'Build using modern technologies, automation, and engineering best practices.' },
    { n: '04', title: 'Assure Quality', body: 'Embed testing, accessibility, security, and performance into every release.' },
    { n: '05', title: 'Scale with Confidence', body: 'Support growth through cloud infrastructure, monitoring, continuous delivery, and ongoing improvements.' },
  ],
  faqs: [
    { q: 'What does your Engineering service include?', a: 'Engineering covers web development, mobile applications, custom software, APIs, cloud infrastructure, integrations, no-code solutions, DevOps, quality assurance, and ongoing product support.' },
    { q: 'Do you build both websites and applications?', a: 'Yes. We develop marketing websites, eCommerce platforms, SaaS products, enterprise software, mobile applications, and custom digital platforms.' },
    { q: 'Do you work with no-code platforms?', a: 'Absolutely. When appropriate, we use no-code and low-code platforms to accelerate delivery while maintaining scalability and flexibility.' },
    { q: 'How do you ensure software quality?', a: 'Quality is built into every stage through code reviews, automated testing, manual QA, accessibility validation, performance optimization, and continuous monitoring.' },
    { q: 'Can you integrate with our existing systems?', a: 'Yes. We build secure integrations with CRMs, ERPs, payment gateways, third-party APIs, cloud services, and internal business systems.' },
    { q: 'Do you provide post-launch support?', a: 'Yes. We offer maintenance, monitoring, feature development, performance optimization, security updates, and continuous product improvements.' },
  ],
  why: [
    { title: 'Holistic Digital Ecosystems', body: 'We design and develop custom digital solutions that blend strategic thinking with advanced technology for lasting impact.' },
    { title: 'Scalable Growth Catalysts', body: 'We build future-ready platforms through digital platform development and scalable web applications that adapt as you grow.' },
    { title: 'User Experience Innovation', body: 'We enhance engagement and conversion with performance-driven apps built for seamless interaction and visual clarity.' },
    { title: 'Seamless System Orchestration', body: 'We connect tools, platforms, and teams through thoughtful CMS integration, smart architecture, and secure applications.' },
    { title: 'Agile Vision Realization', body: 'We turn ideas into products with speed and precision through an agile development approach rooted in collaboration and continuous improvement.' },
  ],
};

const operations: ServiceData = {
  title: 'Operations',
  subtitle: 'Keep everything running and improving.',
  tags: ['QA', 'Reliability', 'Support', 'Continuous Improvement'],
  heroText: 'Great products need great operations behind them. We provide QA and testing services, no-code development for rapid delivery, workflow automation, and site reliability engineering — ensuring your digital products run smoothly, ship faster, and scale without friction.',
  body: 'We build quality into every stage of the digital lifecycle. Our operations services ensure your products are reliable, high-performing, and ready for growth. From rigorous QA and testing to rapid no-code development and process automation, we provide the operational backbone that lets your team move fast with confidence.',
  stats: [
    { n: '0', label: 'unplanned downtime with proactive monitoring' },
    { n: '5', label: 'framework phases from assessment to scale' },
    { n: '24/7', label: 'support, monitoring, and incident response' },
  ],
  framework: [
    { phase: 'Assess', outcome: 'Operational baseline and improvement roadmap.', includes: ['System review', 'Infrastructure review', 'Operational maturity', 'Risk assessment'] },
    { phase: 'Stabilize', outcome: 'Stable and dependable production environments.', includes: ['Critical issue resolution', 'Reliability improvements', 'Monitoring setup'] },
    { phase: 'Operate', outcome: 'Reliable day-to-day operations.', includes: ['Ongoing maintenance', 'Support', 'Deployments', 'Infrastructure management'] },
    { phase: 'Improve', outcome: 'Higher efficiency and lower operational risk.', includes: ['Performance optimization', 'Task automation', 'Security hardening'] },
    { phase: 'Scale', outcome: 'Technology that grows with the business.', includes: ['System preparation', 'Team preparation', 'Infrastructure planning for growth'] },
  ],
  capabilities: [
    { n: '01', title: 'Managed Application Support', items: ['Proactive technical support', 'Issue resolution', 'Ongoing maintenance', 'Web, mobile & enterprise apps'] },
    { n: '02', title: 'Platform Operations', items: ['Updates', 'Bug fixes', 'Dependency management', 'Feature enhancements', 'Operational governance'] },
    { n: '03', title: 'Cloud & Infrastructure Operations', items: ['Cloud environment management', 'Hosting & deployments', 'Backups', 'System availability'] },
    { n: '04', title: 'Monitoring & Incident Response', items: ['Application health monitoring', 'Early issue detection', 'Alerting & logging', 'Incident response management'] },
    { n: '05', title: 'Release & Environment Management', items: ['Dev, staging & production coordination', 'Structured deployments', 'Version control', 'Release validation', 'Rollback planning'] },
    { n: '06', title: 'Quality Assurance & Validation', items: ['Functional testing', 'Regression testing', 'Performance testing', 'Security & API testing', 'Cross-platform testing'] },
    { n: '07', title: 'Performance & Reliability', items: ['Application performance optimization', 'Scalability', 'Availability', 'Infrastructure efficiency'] },
    { n: '08', title: 'Security & Compliance', items: ['Vulnerability management', 'Patching', 'Access control', 'Compliance support', 'Continuous risk monitoring'] },
    { n: '09', title: 'Business Continuity & Disaster Recovery', items: ['Backup strategies', 'Disaster recovery planning', 'Resilience testing', 'Recovery preparedness'] },
    { n: '10', title: 'Continuous Improvement', items: ['Operational insights', 'Analytics', 'Customer feedback', 'Automation', 'Continuous optimization'] },
  ],
  approach: [
    { n: '01', title: 'Assess & Prioritize', body: 'We evaluate the health of your applications, infrastructure, and operational processes to identify risks, dependencies, and opportunities for improvement.' },
    { n: '02', title: 'Monitor & Maintain', body: 'Through continuous monitoring, preventive maintenance, and routine updates, we keep your platforms secure, stable, and performing at their best.' },
    { n: '03', title: 'Validate & Release', body: 'Every update is verified through structured quality assurance, regression testing, performance validation, and release management before reaching production.' },
    { n: '04', title: 'Respond & Resolve', body: 'When issues arise, we investigate, prioritize, and resolve them quickly while minimizing disruption to users and business operations.' },
    { n: '05', title: 'Optimize & Evolve', body: 'Using operational insights, analytics, and user feedback, we continuously improve performance, strengthen reliability, and prepare your platforms for future growth.' },
  ],
  faqs: [
    { q: 'What does your Operations service include?', a: 'Operations includes application support, platform maintenance, cloud operations, monitoring, security, release management, performance optimization, and managed services.' },
    { q: 'Do you provide post-launch support?', a: 'Yes. We provide ongoing technical support, issue resolution, maintenance, monitoring, and continuous improvements after launch.' },
    { q: 'Can you support applications built by another vendor?', a: 'Absolutely. We regularly take over existing platforms, assess their current state, and provide structured operational support.' },
    { q: 'Do you offer infrastructure management?', a: 'Yes. We manage cloud environments, deployments, backups, monitoring, and operational infrastructure.' },
    { q: 'How do you minimize downtime?', a: 'Through proactive monitoring, preventive maintenance, automated alerts, structured incident response, and resilient deployment practices.' },
    { q: 'Can you work as an extension of our internal team?', a: 'Yes. We collaborate closely with internal product, engineering, and IT teams, providing dedicated operational expertise where needed.' },
  ],
  why: [
    { title: 'Proactive Operations', body: 'We monitor systems, identify potential issues early, and resolve them before they impact users or business performance.' },
    { title: 'Reliability by Design', body: 'From quality assurance and release validation to performance monitoring and infrastructure management, reliability is built into every stage of operations.' },
    { title: 'Security & Operational Resilience', body: 'We protect your digital products through continuous maintenance, security best practices, compliance support, and business continuity planning.' },
    { title: 'Continuous Optimization', body: 'Technology never stands still. We continuously improve performance, streamline operations, and evolve platforms using real-world insights and operational data.' },
    { title: 'A Long-Term Technology Partner', body: 'We work as an extension of your team, providing the operational expertise, governance, and support needed to keep your products performing at their best.' },
  ],
};

export const hardcodedServices: Record<string, ServiceData> = {
  strategy,
  brand,
  experience,
  growth,
  engineering,
  operations,
};
