const token = process.env.NOTION_TOKEN;
if (!token) { console.error('Missing NOTION_TOKEN env var'); process.exit(1); }
import fs from 'fs';

async function queryAll(dbId) {
  const results = [];
  let cursor = null;
  let hasMore = true;

  while (hasMore) {
    const body = { page_size: 100 };
    if (cursor) body.start_cursor = cursor;

    const res = await fetch('https://api.notion.com/v1/databases/' + dbId + '/query', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    results.push(...data.results);
    hasMore = data.has_more;
    cursor = data.next_cursor;
    console.log(`  Fetched ${results.length}...`);
  }

  return results;
}

function simplifyRow(page) {
  const props = page.properties || {};
  const out = { id: page.id };
  for (const [key, val] of Object.entries(props)) {
    switch (val.type) {
      case 'title': out[key] = val.title?.[0]?.plain_text || ''; break;
      case 'rich_text': out[key] = val.rich_text?.[0]?.plain_text || ''; break;
      case 'select': out[key] = val.select?.name || null; break;
      case 'multi_select': out[key] = val.multi_select?.map(s => s.name) || []; break;
      case 'number': out[key] = val.number; break;
      case 'date': out[key] = val.date?.start || null; break;
      case 'url': out[key] = val.url || ''; break;
      case 'checkbox': out[key] = val.checkbox; break;
      case 'relation': out[key] = val.relation?.map(r => r.id) || []; break;
      case 'email': out[key] = val.email || ''; break;
      case 'phone_number': out[key] = val.phone_number || ''; break;
      case 'status': out[key] = val.status?.name || null; break;
      default: out[key] = JSON.stringify(val); break;
    }
  }
  return out;
}

async function main() {
  const dbs = {
    'case-studies': '395bb710-b9ab-80b1-8344-f1d746cd3d7a',
    'clients': '395bb710-b9ab-80cb-aa2f-c7e0d766a024',
    'blog-master': '3a3bb710-b9ab-8036-835b-d773e1c98472',
    'content-relationships': '3a3bb710-b9ab-805f-a915-e5b1e7db2c16',
    'industry': '33cbb710-b9ab-8083-862e-c62ea1dd5ac1',
    'service-sub-group': 'c1831707-c41f-4589-bde9-db4c06e5b490',
  };

  for (const [name, id] of Object.entries(dbs)) {
    console.log(`\n📋 Fetching ${name}...`);
    try {
      const rows = await queryAll(id);
      const simplified = rows.map(simplifyRow);
      const filePath = `/Users/abcom/Documents/GitHub/wugweb_site/notion-data/${name}.json`;
      fs.mkdirSync('/Users/abcom/Documents/GitHub/wugweb_site/notion-data', { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify(simplified, null, 2));
      console.log(`  ✅ ${name}: ${simplified.length} rows saved`);
    } catch (e) {
      console.log(`  ❌ ${name}: ${e.message}`);
    }
  }

  console.log('\n✅ Done');
}

main().catch(e => console.error(e.message));
