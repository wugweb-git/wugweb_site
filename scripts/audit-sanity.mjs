import { createClient } from '@sanity/client';

const token = process.env.SANITY_TOKEN;
const c = createClient({projectId:'splvhmk1',dataset:'production',apiVersion:'2026-07-28',token,useCdn:false});

async function main() {
  const types = ['caseStudy','post','person','client','industry','service','singletonPage','siteSettings','syncStatus','asset','taxonomy','engagement','contactSubmission'];
  for(const t of types){
    const count = await c.fetch('count(*[_type == $type])',{type:t});
    console.log(t+': '+count);
  }
  
  // Sample assets
  const assets = await c.fetch('*[_type == "asset"]{name,assetGroup,mediaType,relativePath,localExists}[0..5]');
  console.log('\nSample assets:');
  for(const a of assets) console.log('  -',a.name||'(unnamed)','|',a.assetGroup||'-','|',a.mediaType||'-','| local:',a.localExists);
  
  // Asset groups
  const groups = await c.fetch('*[_type == "asset"]{assetGroup}');
  const gc = {};
  for(const g of groups){const k=g.assetGroup||'none';gc[k]=(gc[k]||0)+1;}
  console.log('\nAsset groups:',JSON.stringify(gc));
  
  // Check taxonomy terms
  const taxVocabs = await c.fetch('*[_type == "taxonomy"]{vocabulary}');
  const vc = {};
  for(const t of taxVocabs){const k=t.vocabulary||'none';vc[k]=(vc[k]||0)+1;}
  console.log('\nTaxonomy vocabularies:',JSON.stringify(vc));
  
  // Sync status check
  const syncs = await c.fetch('*[_type == "syncStatus"]{_id,entityType,status,notes}');
  console.log('\nSync statuses:');
  for(const s of syncs) console.log('  '+s._id+': '+s.status+' — '+(s.notes||'').substring(0,60));
}
main().catch(e => console.error(e.message.substring(0,200)));
