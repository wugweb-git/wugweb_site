const fs = require('fs');
const env = fs.readFileSync('/Users/abcom/Documents/GitHub/wugweb_site/.env', 'utf8');
for (const line of env.split('\n')) {
  const m = line.match(/^([^#=]+)=(.*)$/);
  if (m) process.env[m[1].trim()] = m[2].trim();
}
const { createClient } = require('@sanity/client');
const c = createClient({ projectId: 'splvhmk1', dataset: 'production', apiVersion: '2024-01-01', token: process.env.SANITY_TOKEN, useCdn: false });
const docx = JSON.parse(fs.readFileSync('/Users/abcom/Documents/GitHub/wugweb_site/notion-data/blog-docx-summary.json', 'utf8'));
c.fetch('*[_type=="post"]{title, body}').then((rows) => {
  for (const [num, r] of Object.entries(docx)) {
    const kw = r.title.split('_')[0].replace(/[^a-z0-9]+/gi, ' ').toLowerCase().slice(0, 30);
    const words = kw.split(' ').filter(Boolean).slice(0, 3);
    const hit = rows.find((p) => words.every((w) => p.title.toLowerCase().includes(w)));
    if (hit) {
      const chars = (hit.body || []).reduce((s, b) => s + (b.children || []).map((ch) => ch.text || '').join('').length, 0);
      const ok = chars >= r.chars * 0.5;
      console.log(num + ': docx=' + r.chars + 'ch | sanity="' + hit.title.slice(0, 30) + '" ' + chars + 'ch | ' + (ok ? 'OK' : 'GAP'));
    } else {
      console.log(num + ': docx=' + r.chars + 'ch | NO SANITY MATCH');
    }
  }
}).catch((e) => console.error('ERR', e.message));
