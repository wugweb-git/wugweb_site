// Builds AGENTS.md and export/wugweb-strategy.md from the skill files and the home standing-rules file.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const home = path.resolve(dir, '../../../docs/skills/STANDING-RULES.md');
const read = (p) => fs.readFileSync(p, 'utf8');
const version = /version:\s*"?([\d.]+)"?/.exec(read(path.join(dir, 'SKILL.md')))[1];
const body = read(path.join(dir, 'SKILL.md')).replace(/^---\n[\s\S]*?\n---\n/, '').trim();
const order = ['strategy','topics-and-calendar','brief-format','piece-structures','editorial-standards','content-models','proof-map','refresh-retire','campaigns-and-repurposing','performance-review','skill-map','ops'];
const refs = order.map((r) => `\n\n---\n\n<!-- references/${r}.md -->\n\n${read(path.join(dir, 'references', r + '.md')).trim()}\n`).join('');
const rules = read(home).replace(/^# .*\n/, '').trim();
export const rulesBlock = rules;
const agents = `# wugweb-strategy (single-file export for other tools, v${version})\n\nBuilt from the files in this folder. Rebuild whenever the skill or \`docs/skills/STANDING-RULES.md\` changes. Read the skill first, then the reference a mode names.\n\n## Owner's standing rules\n\nCopied from \`docs/skills/STANDING-RULES.md\`. That file is the source; if this block differs, that file wins.\n\n${rules}\n\n---\n\n${body}\n${refs}`;
const exp = `# wugweb-strategy (single-file export, v${version})\n\nBuilt from the skill folder. Rebuild whenever the skill changes. Read the skill first, then the reference a mode names.\n\n${body}\n${refs}`;
fs.writeFileSync(path.join(dir, 'AGENTS.md'), agents);
fs.writeFileSync(path.join(dir, 'export', 'wugweb-strategy.md'), exp);
console.log('built v' + version);
