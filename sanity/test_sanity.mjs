import { createClient } from 'sanity';

const projectId = process.env.SANITY_PROJECT_ID || 'splvhmk1';
const dataset = process.env.SANITY_DATASET || 'production';
const apiVersion = process.env.SANITY_API_VERSION || '2026-01-01';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

async function runTests() {
  console.log(`--- Starting Sanity API Test Suite (${projectId}/${dataset}) ---`);

  console.log('1. Testing GROQ Read Query...');
  const count = await client.fetch('count(*[_type == "post"])');
  console.log(`✓ Read successful: ${count} blog posts found in Sanity dataset.`);

  console.log('2. Testing Schema Type Statistics Query...');
  const types = await client.fetch(`*[_type in ["post","caseStudy","service","client","person","brandAsset","siteScript","navigationMenu"]] { _type }`);
  const grouped = types.reduce((acc, doc) => {
    acc[doc._type] = (acc[doc._type] || 0) + 1;
    return acc;
  }, {});
  console.log('✓ Document counts by type:\n', JSON.stringify(grouped, null, 2));

  console.log('3. Testing Post Field Selection...');
  const posts = await client.fetch(`*[_type == "post"][0...3] { _id, title, "slug": slug.current, seoTitle, seoDescription }`);
  console.log('✓ First 3 posts inspected:\n', JSON.stringify(posts, null, 2));

  console.log('\n--- Sanity API Test Suite Complete: ALL PASSED ---');
}

runTests().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
