// Checks: body words 1,500 to 2,000 (shared method), no dashes in the skill files,
// the standing-rules block in AGENTS.md equals the home file, and the version in
// README.md and metadata.json equals the one in SKILL.md.
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
const files = ['SKILL.md', 'AGENTS.md', 'README.md', 'CHANGELOG.md', 'export/wugweb-strategy.md', ...['references', 'examples'].flatMap((d) => fs.readdirSync(path.join(dir, d)).map((f) => d + '/' + f))];
for (const f of files) check(!/[–—]/.test(read(path.join(dir, f))), `no dashes in ${f}`);
const agents = read(path.join(dir, 'AGENTS.md'));
const start = agents.indexOf("## Owner's standing rules");
const block = agents.slice(agents.indexOf('\n\n', agents.indexOf('Copied from', start)) + 2, agents.indexOf('\n\n---\n\n', start)).trim();
const rules = read(home).replace(/^# .*\n/, '').trim();
check(block === rules, 'standing-rules block in AGENTS.md equals docs/skills/STANDING-RULES.md');
const version = /version:\s*"?([\d.]+)"?/.exec(skill)[1];
check(agents.includes('v' + version) && read(path.join(dir, 'export/wugweb-strategy.md')).includes('v' + version), `exports carry v${version}`);
const meta = JSON.parse(read(path.join(dir, 'metadata.json')));
check(meta.version === version, `metadata.json version ${meta.version} equals SKILL.md ${version}`);
const readmeVersions = [...read(path.join(dir, 'README.md')).matchAll(/\bversion (\d+\.\d+\.\d+)/gi)].map((m) => m[1]);
check(readmeVersions.length > 0 && readmeVersions.every((v) => v === version), `README.md version lines (${readmeVersions.join(', ') || 'none'}) equal SKILL.md ${version}`);
console.log(fail ? `${fail} check(s) failed` : 'all checks passed');
process.exit(fail ? 1 : 0);
