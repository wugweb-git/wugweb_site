#!/usr/bin/env node
/**
 * Update services to 6-pillar framework + import sub-services + remap asset paths
 *
 * SANITY_TOKEN=sk... node scripts/update-services-and-assets.mjs
 */
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const token = process.env.SANITY_TOKEN;
if (!token) { process.exit(1); }

const client = createClient({ projectId:'splvhmk1', dataset:'production', apiVersion:'2026-07-28', token, useCdn:false });

// ── 6-Pillar Service Framework ──
const SERVICES = [
  { id: 'strategy',     title: 'Strategy',     subtitle: 'Define business, product and AI strategies that align vision with measurable outcomes.', capabilities: [{ n:'01', title:'Business', items:['Business Strategy','Business Model Design','Digital Transformation','Innovation Strategy','Market Research','Competitive Analysis'] }, { n:'02', title:'Product', items:['Product Strategy','Product Discovery','Product Roadmapping','MVP Planning'] }, { n:'03', title:'AI', items:['AI Strategy','AI Readiness Assessment','AI Opportunity Mapping','Transformation Workshops'] }], approach: [{ n:'01', title:'Discovery & Research', body:'Understand your business, market, and users.' }, { n:'02', title:'Strategic Framing', body:'Define vision, positioning, and roadmap.' }, { n:'03', title:'Validation', body:'Test strategy through data and feedback.' }], order:1 },
  { id: 'brand',        title: 'Brand',        subtitle: 'Build memorable brands through strategy, identity and storytelling.', capabilities: [{ n:'01', title:'Strategy', items:['Brand Strategy','Brand Positioning','Brand Narrative'] }, { n:'02', title:'Identity', items:['Brand Identity Systems','Naming & Nomenclature','Messaging Framework','Voice & Tone'] }, { n:'03', title:'Activation', items:['Employer Branding','Brand Guidelines','Brand Activation'] }], approach: [{ n:'01', title:'Discovery', body:'Research market, audience, and competition.' }, { n:'02', title:'Strategy', body:'Define brand platform and positioning.' }, { n:'03', title:'Design', body:'Create visual and verbal identity.' }], order:2 },
  { id: 'experience',   title: 'Experience',  subtitle: 'Design intuitive digital experiences that people love using.', capabilities: [{ n:'01', title:'Research', items:['UX Research','Service Design','Information Architecture'] }, { n:'02', title:'Design', items:['UX Design','UI Design','Design Systems','Accessibility Design'] }, { n:'03', title:'Validation', items:['Interactive Prototyping','User Testing','Journey Mapping'] }], approach: [{ n:'01', title:'Research', body:'Understand user needs and behaviours.' }, { n:'02', title:'Design', body:'Create intuitive interfaces and flows.' }, { n:'03', title:'Validate', body:'Test and refine with real users.' }], order:3 },
  { id: 'engineering',  title: 'Engineering', subtitle: 'Engineer scalable digital products, platforms and intelligent systems.', capabilities: [{ n:'01', title:'Applications', items:['Website Development','Web App Development','Mobile App Development','SaaS Development','Ecommerce Development'] }, { n:'02', title:'Platforms', items:['CMS Development','API Development','System Integrations','Database Engineering','Authentication Systems'] }, { n:'03', title:'Infrastructure', items:['Cloud Infrastructure','DevOps Engineering','CI/CD Pipelines','Performance Engineering','Security Engineering'] }, { n:'04', title:'Modern Dev', items:['AI Applications','AI Agents','No-Code Development','Low-Code Development','Internal Tools'] }], approach: [{ n:'01', title:'Plan', body:'Architect the system for scale.' }, { n:'02', title:'Build', body:'Develop with clean, maintainable code.' }, { n:'03', title:'Ship', body:'Deploy and monitor continuously.' }], order:4 },
  { id: 'growth',       title: 'Growth',      subtitle: 'Acquire, convert and retain customers through data-driven growth systems.', capabilities: [{ n:'01', title:'Marketing', items:['SEO','Performance Marketing','Content Strategy','Social Media Marketing','Campaign Management'] }, { n:'02', title:'Martech', items:['CRM Implementation','Marketing Automation','Email Automation','Customer Journey Automation','Personalization'] }, { n:'03', title:'Intelligence', items:['Analytics & Dashboards','Attribution Modeling','CRO','Experimentation (A/B Testing)','AI Marketing','Customer Insights'] }], approach: [{ n:'01', title:'Audit', body:'Analyze current performance and gaps.' }, { n:'02', title:'Strategize', body:'Define growth channels and tactics.' }, { n:'03', title:'Execute', body:'Implement and optimize continuously.' }], order:5 },
  { id: 'operations',   title: 'Operations',  subtitle: 'Operate, secure and continuously improve digital products.', capabilities: [{ n:'01', title:'Reliability', items:['Quality Assurance','Test Automation','Performance Testing','Security Testing','Accessibility Audits'] }, { n:'02', title:'Support', items:['Maintenance','Monitoring & Observability','Release Management','SLA Support','Incident Response'] }, { n:'03', title:'Improvement', items:['Product Optimization','UX Audits','Technical Audits','Feature Evolution','Performance Optimization'] }], approach: [{ n:'01', title:'Assess', body:'Evaluate current state.' }, { n:'02', title:'Improve', body:'Implement changes.' }, { n:'03', title:'Monitor', body:'Track and optimize continuously.' }], order:6 },
];

// ── Sub-Services ──
const subServicesData = [
  { id:'business-strategy', parent:'strategy', name:'Business Strategy', desc:'Define long-term business direction and competitive advantage.' },
  { id:'business-model-design', parent:'strategy', name:'Business Model Design', desc:'Design sustainable business and revenue models.' },
  { id:'digital-transformation', parent:'strategy', name:'Digital Transformation', desc:'Modernize organizations through digital initiatives.' },
  { id:'innovation-strategy', parent:'strategy', name:'Innovation Strategy', desc:'Identify future opportunities and innovation pathways.' },
  { id:'market-research', parent:'strategy', name:'Market Research', desc:'Research customers, markets and competitors.' },
  { id:'competitive-analysis', parent:'strategy', name:'Competitive Analysis', desc:'Benchmark products and market positioning.' },
  { id:'product-strategy', parent:'strategy', name:'Product Strategy', desc:'Define product vision and business objectives.' },
  { id:'product-discovery', parent:'strategy', name:'Product Discovery', desc:'Validate ideas before development.' },
  { id:'product-roadmapping', parent:'strategy', name:'Product Roadmapping', desc:'Prioritize initiatives and releases.' },
  { id:'mvp-planning', parent:'strategy', name:'MVP Planning', desc:'Define lean product scope for launch.' },
  { id:'ai-strategy', parent:'strategy', name:'AI Strategy', desc:'Plan enterprise AI adoption.' },
  { id:'ai-readiness', parent:'strategy', name:'AI Readiness Assessment', desc:'Assess AI maturity and readiness.' },
  { id:'ai-opportunity-mapping', parent:'strategy', name:'AI Opportunity Mapping', desc:'Identify AI use cases across the business.' },
  { id:'transformation-workshops', parent:'strategy', name:'Transformation Workshops', desc:'Facilitate executive strategy workshops.' },
  { id:'brand-strategy', parent:'brand', name:'Brand Strategy', desc:'Define brand purpose and vision.' },
  { id:'brand-positioning', parent:'brand', name:'Brand Positioning', desc:'Differentiate the brand in the market.' },
  { id:'brand-identity-systems', parent:'brand', name:'Brand Identity Systems', desc:'Create scalable visual identities.' },
  { id:'brand-narrative', parent:'brand', name:'Brand Narrative', desc:'Develop compelling storytelling frameworks.' },
  { id:'naming', parent:'brand', name:'Naming & Nomenclature', desc:'Create memorable brand and product names.' },
  { id:'messaging-framework', parent:'brand', name:'Messaging Framework', desc:'Develop clear messaging architecture.' },
  { id:'voice-tone', parent:'brand', name:'Voice & Tone', desc:'Define verbal identity guidelines.' },
  { id:'employer-branding', parent:'brand', name:'Employer Branding', desc:'Strengthen employer perception.' },
  { id:'brand-guidelines', parent:'brand', name:'Brand Guidelines', desc:'Create comprehensive brand standards.' },
  { id:'brand-activation', parent:'brand', name:'Brand Activation', desc:'Launch brands across channels.' },
  { id:'ux-research', parent:'experience', name:'UX Research', desc:'Understand user needs and behaviours.' },
  { id:'service-design', parent:'experience', name:'Service Design', desc:'Design end-to-end customer services.' },
  { id:'information-architecture', parent:'experience', name:'Information Architecture', desc:'Structure content and navigation.' },
  { id:'ux-design', parent:'experience', name:'UX Design', desc:'Design intuitive user experiences.' },
  { id:'ui-design', parent:'experience', name:'UI Design', desc:'Design engaging user interfaces.' },
  { id:'design-systems', parent:'experience', name:'Design Systems', desc:'Build scalable design systems.' },
  { id:'accessibility-design', parent:'experience', name:'Accessibility Design', desc:'Design inclusive digital experiences.' },
  { id:'prototyping', parent:'experience', name:'Interactive Prototyping', desc:'Validate ideas through prototypes.' },
  { id:'user-testing', parent:'experience', name:'User Testing', desc:'Validate products with users.' },
  { id:'journey-mapping', parent:'experience', name:'Journey Mapping', desc:'Map customer journeys and touchpoints.' },
  { id:'website-development', parent:'engineering', name:'Website Development', desc:'Build modern websites.' },
  { id:'web-application-development', parent:'engineering', name:'Web Application Development', desc:'Develop browser-based applications.' },
  { id:'mobile-application-development', parent:'engineering', name:'Mobile Application Development', desc:'Build mobile apps.' },
  { id:'saas-development', parent:'engineering', name:'SaaS Development', desc:'Develop SaaS platforms.' },
  { id:'ecommerce-development', parent:'engineering', name:'Ecommerce Development', desc:'Build ecommerce platforms.' },
  { id:'cms-development', parent:'engineering', name:'CMS Development', desc:'Develop content management systems.' },
  { id:'api-development', parent:'engineering', name:'API Development', desc:'Build secure APIs.' },
  { id:'system-integrations', parent:'engineering', name:'System Integrations', desc:'Integrate third-party platforms.' },
  { id:'database-engineering', parent:'engineering', name:'Database Engineering', desc:'Design scalable databases.' },
  { id:'authentication', parent:'engineering', name:'Authentication Systems', desc:'Implement authentication and authorization.' },
  { id:'cloud-infrastructure', parent:'engineering', name:'Cloud Infrastructure', desc:'Build scalable cloud infrastructure.' },
  { id:'devops', parent:'engineering', name:'DevOps Engineering', desc:'Automate deployment pipelines.' },
  { id:'ci-cd', parent:'engineering', name:'CI/CD Pipelines', desc:'Implement continuous delivery pipelines.' },
  { id:'performance-engineering', parent:'engineering', name:'Performance Engineering', desc:'Optimize application performance.' },
  { id:'security-engineering', parent:'engineering', name:'Security Engineering', desc:'Build secure systems.' },
  { id:'ai-applications', parent:'engineering', name:'AI Applications', desc:'Develop AI-powered software.' },
  { id:'ai-agents', parent:'engineering', name:'AI Agents', desc:'Build autonomous AI agents.' },
  { id:'no-code-development', parent:'engineering', name:'No-Code Development', desc:'Deliver solutions using visual platforms.' },
  { id:'low-code-development', parent:'engineering', name:'Low-Code Development', desc:'Accelerate development using low-code.' },
  { id:'internal-tools', parent:'engineering', name:'Internal Tools', desc:'Build internal business applications.' },
  { id:'seo', parent:'growth', name:'SEO', desc:'Improve organic search visibility.' },
  { id:'performance-marketing', parent:'growth', name:'Performance Marketing', desc:'Execute measurable paid campaigns.' },
  { id:'content-strategy', parent:'growth', name:'Content Strategy', desc:'Plan strategic content initiatives.' },
  { id:'social-media', parent:'growth', name:'Social Media Marketing', desc:'Build and manage social presence.' },
  { id:'campaign-management', parent:'growth', name:'Campaign Management', desc:'Plan and execute marketing campaigns.' },
  { id:'crm', parent:'growth', name:'CRM Implementation', desc:'Implement customer relationship systems.' },
  { id:'marketing-automation', parent:'growth', name:'Marketing Automation', desc:'Automate marketing workflows.' },
  { id:'email-automation', parent:'growth', name:'Email Automation', desc:'Automate email journeys.' },
  { id:'customer-journey-automation', parent:'growth', name:'Customer Journey Automation', desc:'Automate omnichannel journeys.' },
  { id:'personalization', parent:'growth', name:'Personalization', desc:'Deliver personalized customer experiences.' },
  { id:'analytics', parent:'growth', name:'Analytics & Dashboards', desc:'Measure business performance.' },
  { id:'attribution', parent:'growth', name:'Attribution Modeling', desc:'Measure channel effectiveness.' },
  { id:'cro', parent:'growth', name:'Conversion Rate Optimization', desc:'Improve conversion performance.' },
  { id:'experimentation', parent:'growth', name:'Experimentation (A/B Testing)', desc:'Validate growth hypotheses.' },
  { id:'ai-marketing', parent:'growth', name:'AI Marketing', desc:'Apply AI to marketing operations.' },
  { id:'customer-insights', parent:'growth', name:'Customer Insights', desc:'Generate actionable customer intelligence.' },
  { id:'quality-assurance', parent:'operations', name:'Quality Assurance', desc:'Validate application quality.' },
  { id:'test-automation', parent:'operations', name:'Test Automation', desc:'Automate software testing.' },
  { id:'performance-testing', parent:'operations', name:'Performance Testing', desc:'Test application scalability.' },
  { id:'security-testing', parent:'operations', name:'Security Testing', desc:'Identify security vulnerabilities.' },
  { id:'accessibility-audits', parent:'operations', name:'Accessibility Audits', desc:'Audit accessibility compliance.' },
  { id:'maintenance', parent:'operations', name:'Maintenance', desc:'Maintain production systems.' },
  { id:'monitoring', parent:'operations', name:'Monitoring & Observability', desc:'Monitor uptime and health.' },
  { id:'release-management', parent:'operations', name:'Release Management', desc:'Manage releases and deployments.' },
  { id:'sla-support', parent:'operations', name:'SLA Support', desc:'Deliver ongoing managed support.' },
  { id:'incident-response', parent:'operations', name:'Incident Response', desc:'Respond to production incidents.' },
  { id:'product-optimization', parent:'operations', name:'Product Optimization', desc:'Improve products using analytics.' },
  { id:'ux-audits', parent:'operations', name:'UX Audits', desc:'Review and improve user experience.' },
  { id:'technical-audits', parent:'operations', name:'Technical Audits', desc:'Assess technical architecture and code quality.' },
  { id:'feature-evolution', parent:'operations', name:'Feature Evolution', desc:'Continuously enhance products.' },
  { id:'performance-optimization', parent:'operations', name:'Performance Optimization', desc:'Continuously improve application performance.' },
];

async function upsert(doc) {
  try { await client.createOrReplace(doc); return true; }
  catch(e) { console.error(`  ❌ ${doc._type} ${doc._id}: ${e.message.substring(0,80)}`); return false; }
}

async function main() {
  console.log('🚀 Updating service framework\n');

  // 1. Update 6 parent services
  console.log('📋 Parent services...');
  for (const svc of SERVICES) {
    const ok = await upsert({
      _id: svc.id, _type: 'service',
      title: svc.title, subtitle: svc.subtitle,
      slug: { _type: 'slug', current: svc.id },
      order: svc.order,
      summary: svc.subtitle,
      heroText: svc.subtitle,
      capabilities: svc.capabilities,
      approach: svc.approach,
      tags: [svc.title, svc.capabilities[0]?.title || ''].filter(Boolean),
    });
    if (ok) console.log(`  ✅ ${svc.title}`);
  }

  // 2. Import sub-services as taxonomy terms
  console.log('\n📋 Sub-services...');
  let subCount = 0;
  for (const sub of subServicesData) {
    const ok = await upsert({
      _id: `taxonomy-${sub.id}`,
      _type: 'taxonomy',
      name: sub.name,
      slug: { _type: 'slug', current: sub.id },
      vocabulary: 'sub-service',
      description: sub.desc,
      order: subCount + 1,
    });
    if (ok) subCount++;
  }
  console.log(`  ✅ ${subCount} sub-services`);

  // 3. Update asset doc paths to point to local files
  console.log('\n📋 Updating asset paths...');
  const assetSheet = JSON.parse(fs.readFileSync('notion-data/asset-sheet.json', 'utf8'));
  const active = assetSheet.filter(a => a['Status'] !== 'Reserved' && a['Relative Path'] && a['Relative Path'] !== '—');

  // Check local files
  function findLocal(notionPath) {
    const localPath = 'public/assets/' + notionPath;
    if (fs.existsSync(localPath)) return notionPath;
    // Try framer directory lookup — files are in framer/{caseStudy}/hash.ext
    const framerDir = 'public/assets/framer';
    if (!fs.existsSync(framerDir)) return null;
    return null;
  }

  let assetUpdated = 0;
  for (const a of active) {
    const slug = a['Slug'] || a['Asset ID']?.toLowerCase();
    if (!slug) continue;
    const localExists = !!findLocal(a['Relative Path']);
    try {
      await client.patch(`asset-${slug}`).set({
        relativePath: a['Relative Path'],
        localExists,
        folder: a['Folder'] || '',
        fileName: a['File Name'] || '',
        extension: a['Extension'] || '',
        ownerType: a['Owner Type'] || '',
        ownerId: a['Owner ID'] || '',
      }).commit();
      assetUpdated++;
    } catch {}
  }
  console.log(`  ✅ ${assetUpdated} asset paths updated`);
  console.log(`\n✅ Done`);
}

main().catch(e => console.error('\n❌', e.message));
