// Checks: body words 1,500 to 2,000 (shared method), no dashes in the skill files,
// and the standing-rules block in AGENTS.md equals the home file.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const home = path.resolve(dir, '../../../docs/skills/STANDING-RULES.md');
const read = (p) => fs.readFileSync(p, 'utf8');
let fail = 0;
const check = (ok, msg) => { console.log((ok ? 'PASS ' : 'FAIL ') + msg); if (!ok) fail++; };
const skill = read(path.join(dir, 'SKILL.md'));
const body = skill.replace(/^---\n[\s\S]*?\n---\n/, '');
const words = body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
check(words >= 1500 && words <= 2000, `SKILL.md body ${words} words`);
const files = ['SKILL.md', 'AGENTS.md', 'export/wugweb-strategy.md', ...fs.readdirSync(path.join(dir, 'references')).map((f) => 'references/' + f)];
for (const f of files) check(!/[–—]/.test(read(path.join(dir, f))), `no dashes in ${f}`);
const agents = read(path.join(dir, 'AGENTS.md'));
const start = agents.indexOf("## Owner's standing rules");
const block = agents.slice(agents.indexOf('\n\n', agents.indexOf('Copied from', start)) + 2, agents.indexOf('\n\n---\n\n', start)).trim();
const rules = read(home).replace(/^# .*\n/, '').trim();
check(block === rules, 'standing-rules block in AGENTS.md equals docs/skills/STANDING-RULES.md');
const version = /version:\s*"?([\d.]+)"?/.exec(skill)[1];
check(agents.includes('v' + version) && read(path.join(dir, 'export/wugweb-strategy.md')).includes('v' + version), `exports carry v${version}`);
process.exit(fail ? 1 : 0);
