#!/usr/bin/env node
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
    const data = await res.json();
    results.push(...data.results);
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
      case 'multi_select': out[key] = val.multi_select?.map(s => s.name) || []; break;
      case 'number': out[key] = val.number; break;
      case 'relation': out[key] = val.relation?.map(r => r.id) || []; break;
      case 'checkbox': out[key] = val.checkbox; break;
      case 'url': out[key] = val.url || ''; break;
      default: break;
    }
  }
  return out;
}

async function main() {
  const dir = '/Users/abcom/Documents/GitHub/wugweb_site/notion-data';
  fs.mkdirSync(dir, { recursive: true });

  for (const [name, id] of [
    ['services-atomic', '395bb710-b9ab-806b-9fb9-d7762cc96ae7'],
    ['services', '395bb710-b9ab-8090-a14f-f9189c91768e'],
    ['sub-services', '395bb710-b9ab-80be-8647-f623200bf74f'],
    ['service-sub-group', 'c1831707-c41f-4589-bde9-db4c06e5b490'],
  ]) {
    console.log(`\n📋 ${name}...`);
    const rows = await queryAll(id, name);
    const simplified = rows.map(r => simplify(r.properties));
    fs.writeFileSync(`${dir}/${name}.json`, JSON.stringify(simplified, null, 2));
    console.log(`  ✅ Saved ${simplified.length} rows`);
  }
  console.log('\n✅ Done');
}
main().catch(e => console.error(e.message));
