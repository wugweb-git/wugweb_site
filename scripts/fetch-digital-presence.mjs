#!/usr/bin/env node
/**
 * Fetch 6 new Notion databases:
 * - 4 digital presence databases
 * - 1 master platform list
 * - 1 master tech stack list
 */
const token = process.env.NOTION_TOKEN;
if (!token) { console.error('Missing NOTION_TOKEN env var'); process.exit(1); }
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
      case 'unique_id': out[key] = (val.unique_id?.prefix ? val.unique_id.prefix + '-' : '') + (val.unique_id?.number ?? ''); break;
      default: break;
    }
  }
  return out;
}

const dir = '/Users/abcom/Documents/GitHub/wugweb_site/notion-data';
fs.mkdirSync(dir, { recursive: true });

// 4 digital presence databases + 2 master lists
const dbs = [
  ['digital-presence-1', '395bb710-b9ab-80a7-803a-d25939e39473'],
  ['digital-presence-2', '395bb710-b9ab-80a1-99ed-dee51e171477'],
  ['digital-presence-3', '395bb710-b9ab-8091-9d8c-c0c5ac8f3887'],
  ['digital-presence-4', '395bb710-b9ab-80d8-9f76-d3bfd41e8cd6'],
  ['master-platform-list', 'd415ac43-7f90-4ae4-b0b9-f88d39af510e'],
  ['master-tech-stack', 'fc314d4b-40d3-4180-9943-ca1c5e699f92'],
  ['asset-type', '91318e27-d1e9-40ee-89a2-d12ce29d617b'],
  ['content-type', '272d0c5e-00e6-4372-a786-1ee4b879341a'],
  ['team-department', '61902d18-75da-4a4b-803f-ab9d0ba8bf73'],
  ['tags', 'a99eca78-b0b5-439e-9868-b67f12ec8e42'],
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