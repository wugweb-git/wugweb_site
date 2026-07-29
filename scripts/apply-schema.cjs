const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const url = 'postgresql://neondb_owner:npg_ZOYC0QvHs3rp@ep-fancy-darkness-anw1klbu-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function run() {
  const client = new Client({ connectionString: url });
  await client.connect();
  console.log('✅ Connected to Neon');

  // Drop and recreate entities to fix partial schema state
  await client.query(`DROP TABLE IF EXISTS content_relations CASCADE`);
  await client.query(`DROP TABLE IF EXISTS content_items CASCADE`);
  await client.query(`DROP TABLE IF EXISTS entities CASCADE`);
  console.log('✅ Dropped partial tables');

  // Now run the full schema fresh
  const sql = fs.readFileSync(path.resolve(__dirname, '../neon/schema.sql'), 'utf8');
  await client.query(sql);
  console.log('✅ Full schema applied');

  // Verify
  const tables = await client.query(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`
  );
  const tableList = tables.rows.map(r => r.table_name).join(', ');
  console.log('📋 Tables:', tableList);

  const ents = await client.query(`SELECT id, name, entity_type, email FROM entities`);
  ents.rows.forEach(r => console.log(`  👤 ${r.id}: ${r.name} (${r.entity_type}) ${r.email ? '📧 '+r.email : ''}`));

  await client.end();
  console.log('✅ Done');
}

run().catch(e => { console.error('❌', e.message); process.exit(1); });
