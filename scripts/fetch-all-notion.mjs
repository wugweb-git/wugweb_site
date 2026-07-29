#!/usr/bin/env node
/**
 * Full Notion data fetch: asset-sheet + remaining DBs
 */
const token = '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';
import fs from 'fs';

async function queryAll(dbId, label) {
  const results = []; let cursor = null, hasMore = true;
  while (hasMore) {
    const body = { page_size: 100 };
    if (cursor) body.start_cursor = cursor;
    const res = await fetch('https://api.notion.com/v1/databases/' + dbId + '/query', {
      method: 'POST', headers: { 'Authorization': 'Bearer ' + token, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json(); results.push(...data.results);
    hasMore = data.has_more; cursor = data.next_cursor;
    console.log(`  ${label}: ${results.length}`);
  }
  return results;
}

function simplify(props) {
  const out = {};
  for (const [key, val] of Object.entries(props)) {
    switch (val.type) {
      case 'title': out[key] = val.title?.[0]?.plain_text || ''; break;
      case 'rich_text': out[key] = val.rich_text?.[0]?.plain_text || ''; break;
      case 'select': out[key] = val.select?.name || null; break;
      case 'status': out[key] = val.status?.name || null; break;
      case 'multi_select': out[key] = val.multi_select?.map(s => s.name) || []; break;
      case 'number': out[key] = val.number; break;
      case 'date': out[key] = val.date?.start || null; break;
      case 'url': out[key] = val.url || ''; break;
      case 'email': out[key] = val.email || ''; break;
      case 'checkbox': out[key] = val.checkbox; break;
      case 'relation': out[key] = val.relation?.map(r => r.id) || []; break;
      case 'files': out[key] = val.files?.map(f => f.name || f.url) || []; break;
      case 'phone_number': out[key] = val.phone_number || ''; break;
      default: break;
    }
  }
  return out;
}

const dir = '/Users/abcom/Documents/GitHub/wugweb_site/notion-data';
fs.mkdirSync(dir, { recursive: true });

const dbs = [
  ['asset-sheet', '3a3bb710-b9ab-8067-a3ca-e63d38040711'],
  ['blog-master', '3a3bb710-b9ab-8036-835b-d773e1c98472'],
  ['case-studies', '395bb710-b9ab-80b1-8344-f1d746cd3d7a'],
  ['clients', '395bb710-b9ab-80cb-aa2f-c7e0d766a024'],
  ['content-relationships', '3a3bb710-b9ab-805f-a915-e5b1e7db2c16'],
  ['industry', '33cbb710-b9ab-8083-862e-c62ea1dd5ac1'],
  ['services', '395bb710-b9ab-8090-a14f-f9189c91768e'],
  ['sub-services', '395bb710-b9ab-80be-8647-f623200bf74f'],
  ['services-atomic', '395bb710-b9ab-806b-9fb9-d7762cc96ae7'],
  ['service-sub-group', 'c1831707-c41f-4589-bde9-db4c06e5b490'],
  ['tags', 'a99eca78-b0b5-439e-9868-b67f12ec8e42'],
  ['authors', 'f00b202a-70d4-454a-a211-b3d57241be13'],
  ['tech-stack', 'fc314d4b-40d3-4180-9943-ca1c5e699f92'],
  ['content-type', '272d0c5e-00e6-4372-a786-1ee4b879341a'],
  ['country', 'c9455be6-04e8-4e27-a7f3-b2985dad2ea5'],
];

async function main() {
  for (const [name, id] of dbs) {
    console.log(`\n📋 ${name}...`);
    try {
      const rows = await queryAll(id, name);
      const simplified = rows.map(r => simplify(r.properties));
      fs.writeFileSync(`${dir}/${name}.json`, JSON.stringify(simplified, null, 2));
      console.log(`  ✅ Saved ${simplified.length} rows`);
    } catch(e) {
      console.log(`  ❌ ${e.message.substring(0,100)}`);
    }
  }
  console.log('\n✅ Done');
}
main().catch(e => console.error(e.message));
