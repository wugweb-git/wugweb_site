#!/usr/bin/env node
/**
 * Fix case study data: delete empty short-slug docs, enrich long-slug docs with CSV+writeup content.
 *
 * SANITY_TOKEN=sk... node scripts/fix-case-studies.mjs
 */
import { createClient } from '@sanity/client';
import fs from 'fs';

const token = process.env.SANITY_TOKEN;
if (!token) { process.exit(1); }
const client = createClient({ projectId:'splvhmk1', dataset:'production', apiVersion:'2026-07-28', token, useCdn:false });

// ── Load CSV ──
function parseCSVLine(line) { const r=[];let c='',q=false;for(let i=0;i<line.length;i++){const ch=line[i];if(ch==='"'){if(q&&line[i+1]==='"'){c+='"';i++;}else q=!q;}else if(ch===','&&!q){r.push(c);c='';}else c+=ch;}r.push(c);return r; }
const lines = fs.readFileSync('/Users/abcom/Downloads/Case study - full columns.csv','utf8').split('\n').filter(l=>l.trim());
const headers = parseCSVLine(lines[0]);
const csvRows = [];
for(let i=1;i<lines.length;i++){const row=parseCSVLine(lines[i]);const o={};headers.forEach((h,idx)=>o[h]=row[idx]||'');csvRows.push(o);}

// ── Load Writeup blocks ──
const writeup = fs.readFileSync('/Users/abcom/Downloads/Case Study Writeup (1).md','utf8');
const blocks = writeup.split(/(?=## \*\*Case Study \d+:)/);
function findBlock(title) {
  if (!title) return null;
  const norm = title.toLowerCase().replace(/[^a-z0-9\s]/g,'').replace(/\s+/g,' ').trim();
  const words = norm.split(' ').filter(w=>w.length>2);
  for (const b of blocks) {
    const bt = b.match(/## \*\*Case Study \d+: (.+?)\*\*/);
    if (!bt) continue;
    const bn = bt[1].toLowerCase().replace(/[^a-z0-9\s]/g,'').replace(/\s+/g,' ').trim();
    const bw = bn.split(' ').filter(w=>w.length>2);
    const overlap = words.filter(w=>bw.includes(w)).length;
    if (Math.min(words.length,bw.length)>0 && overlap/Math.min(words.length,bw.length)>=0.6) return b;
  }
  return blocks[0];
}
function getSection(text, title) {
  const re = new RegExp(`### \\*\\*${title}\\*\\*[\\s\\S]*?(?=### \\*\\*|## \\*\\*Case Study|$)`);
  const m = text.match(re); if(!m) return [];
  const items = [];
  const br = /\d+\.\s+\*\*([^*]+)\*\*[:\s]*([\s\S]*?)(?=\d+\.\s+\*\*|$)/g; let x;
  while((x=br.exec(m[0]))!==null) items.push({title:x[1].trim(),body:x[2].trim().replace(/\n\s*/g,' ')});
  if(!items.length){const sr=/[-*]\s+\*\*([^*]+)\*\*[:\s]*([\s\S]*?)(?=[-*]\s+\*\*|$)/g;while((x=sr.exec(m[0]))!==null)items.push({title:x[1].trim(),body:x[2].trim().replace(/\n\s*/g,' ')});}
  return items;
}
function getAbout(text) {
  const re = /### \*\*About(?: \(Context\))?\*\*[\s\S]*?(?=### \*\*)/;
  const m = text.match(re);
  if(!m) return '';
  return m[0].split('\n').filter(l=>l.trim()&&!l.startsWith('###')).join(' ').trim().replace(/\s+/g,' ').substring(0,2000);
}

// ── Long-slug mapping ──
const SLUG_MAP = {
  'NTUC U Care': 'ntuc-u-care-fund-digital-transformation-for-enhanced-member-support',
  'RideEV': 'rideev-powering-the-phygital-ev-revolution-in-india',
  'Plufo': 'plufo-crafting-an-immersive-edtech-ecosystem-for-young-learners',
  'VALYU.ai': 'valyu-ai-empowering-indias-workforce-with-on-demand-earned-wages',
  'Sadhan': 'sadhan-streamlining-driver-onboarding-lead-management',
  'IndusNinja': 'indusninja-your-ai-powered-financial-ninja',
  'VisiONE': 'visione-empowering-workforce-development-with-competency-based-assessments',
  'Airtel Xsafe': 'airtel-xsafe-securing-homes-with-intuitive-digital-experiences',
  'Airtel Xstream': 'airtel-xstream-play-showcasing-indias-unified-digital-entertainment',
  'Cartier': 'redesigning-cartiers-career-website-where-passion-meets-excellence',
  'Inkompass': 'redesigning-inkompass-cultivating-global-talent-for-a-smoke-free-future',
  'TOT Bridal': 'crafting-digital-elegance-the-tot-bridal-launch-story',
  'Adneto': 'crafting-digital-authority-the-adneto-website-showcase',
  'Gratify': 'gratify-the-intelligent-rewards-and-feedback-platform',
  'Bankco': 'bankco-engineering-the-ultimate-banking-super-app-ecosystem',
  'Aditya Birla': 'demystifying-finance-crafting-the-ux-for-aditya-birla-capital-s-credit-score-tool',
  'Axis Bank': 'the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform',
  'METCRED': 'the-avant-garde-of-banking-designing-the-metcred-zero-fee-mobile-experience',
  'Metcred': 'the-avant-garde-of-banking-designing-the-metcred-zero-fee-mobile-experience',
  'Wugweb Kits': 'wugweb-kits-the-full-stack-infrastructure-for-multi-platform-design',
  'SBS Transit': 'sbs-transit-engineering-the-future-of-multimodal-urban-mobility',
  'ITC Dark': 'itc-dark-fantasy-x-citadel-personalizing-the-spy-experience',
  'RAK SME': 'rak-sme-scaling-the-tech-infrastructure-for-ras-al-khaimah-business-ecosystem',
  'Eekenlife': 'eekenlife-redefining-footwear-e-commerce-for-the-next-generation',
  'Woodkraft': 'woodkraft-elevating-indias-largest-corporate-fit-out-legacy',
  'iKan': 'ikan-the-next-generation-corporate-mental-healthcare-platform',
  'Global Trade': 'global-trade-finance-engineering-an-authority-first-lead-generation-engine',
  'Suzlon': 'suzlon-reimagining-global-energy-through-minimalist-technical-excellence',
  'Wave Group': 'wave-group-crafting-a-multi-conglomerate-interactive-experience',
  'ad:tech': 'adtech-and-imedia-sculpting-the-visual-identity-of-global-martech-summits',
  'LinkedIn': 'linkedin-sales-navigator-optimizing-the-social-selling-interface',
  'NSL OilChem': 'nsl-oilchem-digitizing-the-lifecycle-of-industrial-waste-management',
  'Labelly': 'labelly-immutable-product-verification-via-blockchain-integration',
  'Witty Vegan': 'witty-vegan-democratizing-plant-based-diversity-through-culture',
  'Stayweb': 'stayweb-pms-a-next-gen-hospitality-engine-powered-by-ai-and-design-systems',
  'HRMS': 'unified-hrms-redefining-the-employee-lifecycle-through-automation',
  'Revamp': 'wugweb-revamp-the-living-manifesto-of-digital-perfection',
  'Kia': 'accelerating-loyalty-designing-kias-intuitive-customer-dashboard',
  'Hyatt': 'hyatt-restaurants-elevating-culinary-discovery-through-digital-experiences',
  'TheBizGift': 'thebizgift-reimagining-corporate-gifting-through-intelligent-commerce',
  'Spark': 'spark-logistics-building-a-unified-logistics-intelligence-platform',
  'PharmaDropper': 'pharmadropper-designing-cross-border-digital-healthcare-commerce',
  'AudioFolio': 'audiofolio-reinventing-audio-discovery-through-ai',
  'Eastman': 'eastman-auto-and-power-modernizing-enterprise-manufacturing-experiences',
  'Bodyshop': 'bodyshop-building-a-premium-wellness-commerce-experience',
  'Greenko': 'greenko-designing-digital-infrastructure-for-the-energy-transition',
  'Adneto Merchant': 'adneto-merchant-platform-reimagining-loyalty-commerce',
};

async function main() {
  console.log('🚀 Fix case studies\n');
  let count = 0;

  for (const csv of csvRows) {
    const title = csv['Title'];
    const shortSlug = csv['Slug'];
    if (!title) continue;

    // Find the long slug by matching title prefix
    let longSlug = null;
    for (const [key, val] of Object.entries(SLUG_MAP)) {
      if (title.toLowerCase().includes(key.toLowerCase())) { longSlug = val; break; }
    }
    if (!longSlug) { console.log('  ⚠️ No mapping for:', title.substring(0, 40)); continue; }

    const id = `caseStudy-${longSlug}`;
    const block = findBlock(title);

    const challenges = block ? getSection(block, 'Challenges') : [];
    const solutions = block ? getSection(block, 'Solutions') : [];
    const impact = block ? getSection(block, 'Impact') : [];
    const dp = block ? getSection(block, 'Strategic Insights & Design Philosophy') : [];
    const about = block ? getAbout(block) : '';

    const doc = {
      _id: id, _type: 'caseStudy',
      title, subtitle: csv['Subtitle'] || '',
      slug: { _type: 'slug', current: longSlug },
      client: csv['Client'] || '',
      partner: csv['Partner'] || '',
      industry: (csv['Industry'] || '').split(',').map(s=>s.trim()).filter(Boolean).join(', ') || '',
      disciplines: (csv['Primary Discipline'] ? [csv['Primary Discipline'], ...(csv['Additional Disciplines']||'').split(',').map(s=>s.trim())] : []).filter(Boolean),
      team: (csv['Team']||'').split(',').map(s=>s.trim()).filter(Boolean),
      timeline: csv['Timeline'] || '',
      summary: (csv['Tags']||'').split(',').slice(0,3).join(', ') || '',
      about: about || '',
      tags: (csv['Tags']||'').split(',').map(s=>s.trim()).filter(Boolean),
      challenges: challenges.map((c,i)=>({_key:`ch-${i}`,title:c.title,body:c.body})),
      solutions: solutions.map((s,i)=>({_key:`sol-${i}`,title:s.title,body:s.body})),
      impact: impact.map((im,i)=>({_key:`imp-${i}`,title:im.title,body:im.body})),
      designPhilosophy: dp.map(d=>d.title).join('\n'),
      publishedAt: '2024-06-15T00:00:00Z',
      featured: csv['Featured'] === 'Yes',
      seoTitle: csv['SEO Title'] || '',
      seoDescription: csv['SEO Description'] || '',
      neonSynced: false,
    };

    try {
      await client.createOrReplace(doc);
      console.log(`  ✅ ${longSlug}`);
      count++;
    } catch(e) { console.error(`  ❌ ${longSlug}: ${e.message.substring(0,80)}`); }
  }

  console.log(`\n✅ ${count} case studies updated`);
}

main().catch(e => console.error('\n❌', e.message));
