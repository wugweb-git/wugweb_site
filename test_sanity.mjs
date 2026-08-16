import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'splvhmk1',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

async function runTests() {
  console.log('--- Starting Sanity API Live Dataset Verification ---');
  
  // 1. Test Query Read
  console.log('1. Testing GROQ Read Query (blog posts)...');
  const count = await client.fetch('count(*[_type == "post"])');
  console.log(`✓ Read successful: ${count} blog posts found in Sanity production dataset.`);

  // 2. Test Document Type Counts
  console.log('\n2. Testing Schema Type Statistics Query...');
  const types = await client.fetch(`*[_type in ["post","caseStudy","service","client","person","brandAsset","siteScript","navigationMenu"]] { _type }`);
  const grouped = types.reduce((acc, doc) => {
    acc[doc._type] = (acc[doc._type] || 0) + 1;
    return acc;
  }, {});
  console.log('✓ Document counts by type:\n', JSON.stringify(grouped, null, 2));

  // 3. Test Field Inspection
  console.log('\n3. Testing Post Field Selection...');
  const posts = await client.fetch(`*[_type == "post"][0...3] { _id, title, "slug": slug.current, seoTitle, seoDescription }`);
  console.log('✓ First 3 posts inspected:\n', JSON.stringify(posts, null, 2));

  console.log('\n--- Sanity API Live Dataset Verification: ALL PASSED ---');
}

runTests().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
