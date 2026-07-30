import { createClient } from '@sanity/client';
import fs from 'fs';

const sanity = createClient({
  projectId: 'splvhmk1',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

const csvPath = '/Users/abcom/Documents/VS/wugweb artworks/Blog Posts.csv';
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const lines = csvContent.split('\n').filter(line => line.trim());
const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));

const records = [];
for (let i = 1; i < lines.length; i++) {
  const values = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
  const record = {};
  headers.forEach((header, index) => {
    record[header] = values[index]?.replace(/^"|"$/g, '').trim() || '';
  });
  records.push(record);
}

const statuses = ['draft', 'published'];

for (const record of records) {
  try {
    const slug = record.Slug?.trim();
    if (!slug) continue;

    const post = {
      _type: 'post',
      title: record.Title?.trim() || 'Untitled',
      slug: {
        _type: 'slug',
        current: slug,
      },
      excerpt: record.Excerpt?.trim() || '',
      body: record.Content?.trim() || '',
      publishedAt: record['Publish Date'] ? new Date(record['Publish Date']).toISOString() : new Date().toISOString(),
      readingTime: record['Read Time']?.trim() || '5 mins read',
      category: record['Primary Category']?.trim() || 'Design',
      tags: record.Tags?.split(',').map(t => t.trim()).filter(Boolean) || [],
      featured: record.Featured?.toLowerCase() === 'true',
      author: {
        _type: 'reference',
        _ref: 'person-vedanshu-srivastava',
      },
    };

    await sanity.create(post);
    console.log(`✓ Created: ${slug}`);
  } catch (error) {
    console.error(`✗ Failed: ${record.Slug}`, error.message);
  }
}

console.log(`\nImported ${records.length} blog posts`);