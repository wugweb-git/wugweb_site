#!/usr/bin/env node
// One command for every Wugweb skill. No packages, Node 18 or later.
//
//   node scripts/skills.mjs check      what each skill folder holds, and whether it builds and passes its tests
//   node scripts/skills.mjs build      run each skill's own build (AGENTS.md, export, adapters)
//   node scripts/skills.mjs link       make .agents/skills/<name> point at each master folder (Codex and
//                                      other agents that read the Agent Skills layout)
//   node scripts/skills.mjs manifest   write the plugin marketplace file from each skill's own metadata
//   node scripts/skills.mjs package    zip each skill from the last commit into dist-skills/, with an index
//                                      of versions and checksums (commit the result)
//   node scripts/skills.mjs sync       bring this checkout in step: pull main when it is safe, report skill
//                                      edits sitting in other worktrees or branches, then build, link,
//                                      manifest and check. Add --home to link the skills for every project
//                                      on this machine (~/.agents/skills)
//   node scripts/skills.mjs all        build, link, manifest, check, package
//
// The master copy of a skill is .claude/skills/<name>/. Nothing here copies a
// skill's content to a second place: other agents reach the same folder through
// a link, and the zips are built from git, so there is one source and no drift.
// This script writes only generated files and links. It never edits a skill's
// rules, and it runs no sync and touches no content store.

import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, writeFileSync, mkdirSync, lstatSync, readlinkSync, symlinkSync, rmSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKILLS = join(ROOT, '.claude', 'skills');
const AGENTS = join(ROOT, '.agents', 'skills');
const DIST = join(ROOT, 'dist-skills');
const cmd = process.argv[2] || 'check';

const names = readdirSync(SKILLS, { withFileTypes: true }).filter((d) => d.isDirectory() && existsSync(join(SKILLS, d.name, 'SKILL.md'))).map((d) => d.name).sort();

/** The parts of a complete, portable skill. `need` parts fail the check; the rest are reported. */
const PARTS = [
  { path: 'SKILL.md', need: true, why: 'the skill itself' },
  { path: 'README.md', need: true, why: 'what it does, install, contents' },
  { path: 'CHANGELOG.md', need: true, why: 'what changed, by version' },
  { path: 'LICENSE', need: true, why: 'the terms it is shared under' },
  { path: 'metadata.json', need: true, why: 'version, abstract, status, related skills' },
  { path: 'AGENTS.md', need: true, why: 'the whole skill in one file for any agent' },
  { path: 'LESSONS.md', need: true, why: 'what the skill has learned from use' },
  { path: 'references', need: true, why: 'detail loaded only when needed' },
  { path: 'evals', need: true, why: 'test prompts with expectations' },
  { path: 'scripts/build.mjs', need: true, why: 'generates the files below' },
  { path: 'scripts/test.mjs', need: true, why: 'self-test' },
  { path: 'export', need: true, why: 'one file to paste into any model' },
  { path: 'adapters/cursor', need: true, why: 'Cursor rule' },
  { path: 'adapters/chatgpt', need: true, why: 'custom GPT or project instructions' },
  { path: 'agents/openai.yaml', need: true, why: 'display settings for Codex' },
  { path: 'scripts/validate.mjs', need: true, why: 'structure check' },
  { path: 'examples', need: true, why: 'worked examples' },
];

function frontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const out = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\s*)([A-Za-z-]+):\s*(.*)$/);
    if (!kv) continue;
    const v = kv[3].trim().replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"');
    if (kv[1] === '') out[kv[2]] = v; else if (kv[2] === 'version') out.version = v; else if (kv[2] === 'author') out.author = v;
  }
  return out;
}

function read(name) {
  const dir = join(SKILLS, name);
  const fm = frontmatter(readFileSync(join(dir, 'SKILL.md'), 'utf8'));
  let meta = {};
  try { meta = JSON.parse(readFileSync(join(dir, 'metadata.json'), 'utf8')); } catch { /* reported by check */ }
  const body = readFileSync(join(dir, 'SKILL.md'), 'utf8').replace(/^---\n[\s\S]*?\n---/, '');
  return { name, dir, fm, meta, words: body.split(/\s+/).filter(Boolean).length };
}

const run = (script, args = []) => {
  try { execFileSync(process.execPath, [script, ...args], { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] }); return true; } catch { return false; }
};

function build() {
  for (const n of names) {
    const ok = run(join(SKILLS, n, 'scripts', 'build.mjs'));
    console.log(`${ok ? 'built ' : 'FAILED'} ${n}`);
    if (!ok) process.exitCode = 1;
  }
}

function link() {
  mkdirSync(AGENTS, { recursive: true });
  for (const n of names) {
    const at = join(AGENTS, n);
    const target = relative(AGENTS, join(SKILLS, n));
    let state = 'linked';
    let st = null; try { st = lstatSync(at); } catch { /* absent */ }
    if (st && st.isSymbolicLink() && readlinkSync(at) === target) state = 'ok';
    else if (st && !st.isSymbolicLink()) { console.log(`SKIPPED ${n}: .agents/skills/${n} is a real folder, not a link. A second copy would drift; remove it by hand if it is stale.`); process.exitCode = 1; continue; }
    else { if (st) rmSync(at); symlinkSync(target, at, 'dir'); }
    console.log(`${state.padEnd(6)} .agents/skills/${n} -> ${target}`);
  }
}

function manifest() {
  const plugins = names.map((n) => {
    const s = read(n);
    return {
      name: n,
      // Each skill folder is its own plugin: a folder with SKILL.md at its root loads as one
      // skill, and only that folder is copied when someone installs it.
      source: `./.claude/skills/${n}`,
      description: (s.meta.abstract || s.fm.description || '').replace(/\s+/g, ' ').trim().slice(0, 300),
      version: s.fm.version || s.meta.version,
      author: { name: 'Wugweb' },
      license: s.fm.license || 'MIT',
      category: 'productivity',
    };
  });
  const out = {
    name: 'wugweb-skills',
    owner: { name: 'Wugweb' },
    description: 'The Wugweb skill system: one skill per job, each usable alone.',
    plugins,
  };
  mkdirSync(join(ROOT, '.claude-plugin'), { recursive: true });
  writeFileSync(join(ROOT, '.claude-plugin', 'marketplace.json'), JSON.stringify(out, null, 2) + '\n');
  console.log(`wrote  .claude-plugin/marketplace.json (${plugins.length} plugins)`);
}

function check() {
  let failed = 0;
  const rows = [];
  for (const n of names) {
    const s = read(n);
    const problems = [];
    const notes = [];
    for (const p of PARTS) {
      if (existsSync(join(s.dir, p.path))) continue;
      (p.need ? problems : notes).push(`no ${p.path} (${p.why})`);
    }
    if (s.fm.name !== n) problems.push(`frontmatter name "${s.fm.name}" is not the folder name`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(n) || n.length > 64) problems.push('name must be lowercase letters, digits and hyphens, 64 characters or fewer');
    const desc = s.fm.description || '';
    if (!desc) problems.push('no description'); else if (desc.length > 1024) problems.push(`description is ${desc.length} characters, over 1,024`);
    if (!/should be used when|use (it|this) (when|for)/i.test(desc)) notes.push('description does not say when to use the skill');
    if (!s.fm.license) problems.push('no licence line in the frontmatter');
    if (!s.fm.version) problems.push('no version in the frontmatter');
    if (s.meta.version && s.fm.version && s.meta.version !== s.fm.version) problems.push(`version differs: SKILL.md ${s.fm.version}, metadata.json ${s.meta.version}`);
    const log = existsSync(join(s.dir, 'CHANGELOG.md')) ? readFileSync(join(s.dir, 'CHANGELOG.md'), 'utf8') : '';
    if (s.fm.version && !log.includes(s.fm.version)) problems.push(`CHANGELOG.md has no entry for ${s.fm.version}`);
    const readme = existsSync(join(s.dir, 'README.md')) ? readFileSync(join(s.dir, 'README.md'), 'utf8') : '';
    for (const h of ['What it does', 'What is in the package', 'Install', 'Run', 'Licence']) if (!new RegExp(`^## ${h}`, 'mi').test(readme)) notes.push(`README has no "${h}" section`);
    if (s.words > 5000) problems.push(`SKILL.md body is ${s.words} words, over 5,000`);
    const lines = readFileSync(join(s.dir, 'SKILL.md'), 'utf8').split('\n').length;
    if (lines > 500) notes.push(`SKILL.md is ${lines} lines; the Agent Skills guidance is under 500`);
    const at = join(AGENTS, n);
    let linked = false; try { linked = lstatSync(at).isSymbolicLink() && existsSync(join(at, 'SKILL.md')); } catch { /* absent */ }
    if (!linked) problems.push('no .agents/skills link (run: node scripts/skills.mjs link)');
    const fresh = existsSync(join(s.dir, 'scripts/build.mjs')) ? run(join(s.dir, 'scripts/build.mjs'), ['--check']) : false;
    if (!fresh) problems.push('generated files are stale or the build failed (run its build)');
    const valid = existsSync(join(s.dir, 'scripts/validate.mjs')) ? run(join(s.dir, 'scripts/validate.mjs')) : null;
    if (valid === false) problems.push('its validator fails');
    const tested = existsSync(join(s.dir, 'scripts/test.mjs')) ? run(join(s.dir, 'scripts/test.mjs')) : false;
    if (!tested) problems.push('its tests fail');
    const refs = existsSync(join(s.dir, 'references')) ? readdirSync(join(s.dir, 'references'), { recursive: true }).filter((f) => String(f).endsWith('.md')).length : 0;
    rows.push({ n, v: s.fm.version || '?', words: s.words, refs, problems, notes });
    if (problems.length) failed++;
  }
  console.log('| Skill | Version | SKILL.md words | Reference files | Result |');
  console.log('|---|---|---|---|---|');
  for (const r of rows) console.log(`| ${r.n} | ${r.v} | ${r.words} | ${r.refs} | ${r.problems.length ? `${r.problems.length} to fix` : 'complete'}${r.notes.length ? `, ${r.notes.length} notes` : ''} |`);
  for (const r of rows) {
    if (!r.problems.length && !r.notes.length) continue;
    console.log(`\n${r.n}`);
    for (const p of r.problems) console.log(`  FIX   ${p}`);
    for (const p of r.notes) console.log(`  note  ${p}`);
  }
  const mp = join(ROOT, '.claude-plugin', 'marketplace.json');
  if (!existsSync(mp)) { console.log('\nFIX   no .claude-plugin/marketplace.json (run: node scripts/skills.mjs manifest)'); failed++; }
  else {
    const listed = JSON.parse(readFileSync(mp, 'utf8')).plugins.map((p) => `${p.name}@${p.version}`).sort().join(' ');
    const actual = rows.map((r) => `${r.n}@${r.v}`).sort().join(' ');
    if (listed !== actual) { console.log('\nFIX   the marketplace file does not match the skills (run: node scripts/skills.mjs manifest)'); failed++; }
  }
  console.log(`\n${rows.length} skills, ${rows.length - rows.filter((r) => r.problems.length).length} complete.`);
  if (failed) process.exitCode = 1;
}

function pack() {
  mkdirSync(DIST, { recursive: true });
  const dirty = execFileSync('git', ['status', '--porcelain', '--', '.claude/skills'], { cwd: ROOT, encoding: 'utf8' }).trim();
  if (dirty) { console.error('Not packaged: .claude/skills has uncommitted changes. The zips are built from the last commit, so commit first.'); process.exit(1); }
  mkdirSync(DIST, { recursive: true });
  // The commit that last changed the skills: the packages are a build of exactly that state.
  const sha = execFileSync('git', ['log', '-1', '--format=%h', '--', '.claude/skills'], { cwd: ROOT, encoding: 'utf8' }).trim();
  const sum = (f) => createHash('sha256').update(readFileSync(f)).digest('hex');
  const rows = [];
  for (const f of readdirSync(DIST)) if (/\.(zip|skill)$/.test(f)) rmSync(join(DIST, f));
  for (const n of names) {
    const v = read(n).fm.version || '0.0.0';
    const full = join(DIST, `${n}-${v}.zip`);
    execFileSync('git', ['archive', '--format=zip', `--prefix=${n}/`, '-o', full, `${sha}:.claude/skills/${n}`], { cwd: ROOT });
    // The .skill file is what the Claude app takes: the same folder without the evals.
    const tmp = join(DIST, `.tmp-${n}`);
    rmSync(tmp, { recursive: true, force: true }); mkdirSync(tmp, { recursive: true });
    execFileSync('unzip', ['-q', full, '-d', tmp]);
    rmSync(join(tmp, n, 'evals'), { recursive: true, force: true });
    const skill = join(DIST, `${n}.skill`);
    rmSync(skill, { force: true });
    execFileSync('zip', ['-qr', skill, n], { cwd: tmp });
    rmSync(tmp, { recursive: true, force: true });
    console.log(`packed ${n} ${v} (${sha}): ${(statSync(full).size / 1024).toFixed(0)} KB zip, ${(statSync(skill).size / 1024).toFixed(0)} KB .skill`);
    rows.push({ n, v, zip: `${n}-${v}.zip`, zipSum: sum(full), skill: `${n}.skill`, skillSum: sum(skill) });
  }
  const index = ['# Packaged skills', '', `Built by \`node scripts/skills.mjs package\` from commit \`${sha}\`, the last commit that changed a skill. Do not edit these files: change the skill in \`.claude/skills/<name>/\`, commit, and run the command again.`, '',
    '| Skill | Version | Full package | For the Claude app |', '|---|---|---|---|',
    ...rows.map((r) => `| ${r.n} | ${r.v} | \`${r.zip}\` | \`${r.skill}\` |`), '',
    '- **Full package**: the whole skill folder, with its evals, references, scripts, examples, adapters and exports. Unzip it into the skills folder of any agent (see `docs/skills/README.md`).',
    '- **For the Claude app**: the same folder without the evals. Upload it under Settings, Plugins.', '',
    '## Checksums (SHA-256)', '', '```', ...rows.flatMap((r) => [`${r.zipSum}  ${r.zip}`, `${r.skillSum}  ${r.skill}`]), '```', ''].join('\n');
  writeFileSync(join(DIST, 'README.md'), index);
  writeFileSync(join(DIST, 'index.json'), JSON.stringify({ builtFrom: sha, skills: rows.map((r) => ({ name: r.n, version: r.v, package: r.zip, packageSha256: r.zipSum, claudeApp: r.skill, claudeAppSha256: r.skillSum })) }, null, 2) + '\n');
  console.log(`In ${relative(ROOT, DIST)}/ with README.md and index.json. Commit them.`);
}

const git = (args, cwd = ROOT) => { try { return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim(); } catch { return null; } };
const SKILL_PATHS = ['.claude/skills', 'docs/skills'];

/**
 * Sessions edit skills while they work, in their own worktrees and branches. Sync makes
 * sure nothing learned there is lost and nothing here is stale. It never merges or
 * overwrites anything on its own: where two places differ it says so and gives the
 * command, because choosing between two versions of a rule is the owner's call.
 */
function sync() {
  const branch = git(['rev-parse', '--abbrev-ref', 'HEAD']);
  const fetched = git(['fetch', '--quiet', 'origin']) !== null;
  console.log(fetched ? 'fetched origin' : 'could not reach origin: working from what is here, which may be behind');
  const dirtyHere = git(['status', '--porcelain', '--', ...SKILL_PATHS]) || '';
  const behind = +(git(['rev-list', '--count', 'HEAD..origin/main']) || 0);
  const ahead = +(git(['rev-list', '--count', 'origin/main..HEAD']) || 0);
  let attention = 0;

  if (branch !== 'main') { console.log(`ATTENTION this checkout is on "${branch}", not main. Skills are edited on main.`); attention++; }
  if (behind && branch === 'main' && !git(['status', '--porcelain'])) {
    const ok = git(['merge', '--ff-only', 'origin/main']) !== null;
    console.log(ok ? `pulled ${behind} commit(s) from origin/main` : 'ATTENTION could not fast-forward to origin/main; resolve by hand');
    if (!ok) attention++;
  } else if (behind) { console.log(`ATTENTION ${behind} commit(s) on origin/main are not here, and this checkout has local changes or is not on main. Commit or stash, then run sync again.`); attention++; }
  if (ahead) { console.log(`ATTENTION ${ahead} local commit(s) are not pushed: git push origin main`); attention++; }
  if (dirtyHere) { console.log(`ATTENTION uncommitted skill edits here:\n${dirtyHere.split('\n').map((l) => '  ' + l).join('\n')}\n  Commit them by path so other sessions get them.`); attention++; }

  // Skill edits that exist only in another worktree or branch.
  const trees = (git(['worktree', 'list', '--porcelain']) || '').split('\n\n').map((b) => ({ path: (b.match(/^worktree (.+)$/m) || [])[1], branch: (b.match(/^branch refs\/heads\/(.+)$/m) || [])[1] })).filter((t) => t.path && t.path !== ROOT);
  for (const t of trees) {
    const dirty = git(['status', '--porcelain', '--', ...SKILL_PATHS], t.path) || '';
    const commits = git(['log', '--format=%h %cd %s', '--date=short', 'main..HEAD', '--', ...SKILL_PATHS], t.path) || '';
    if (!dirty && !commits) continue;
    attention++;
    console.log(`ATTENTION skill edits not on main, in ${relative(ROOT, t.path)}${t.branch ? ` (${t.branch})` : ''}:`);
    for (const l of commits.split('\n').filter(Boolean).slice(0, 8)) console.log(`  commit  ${l}`);
    for (const l of dirty.split('\n').filter(Boolean).slice(0, 12)) console.log(`  edit   ${l}`);
    console.log('  Nothing was merged. Review it, then bring it to main by path, or discard it there.');
  }
  const seen = new Set(trees.map((t) => t.branch));
  for (const b of (git(['for-each-ref', '--format=%(refname:short)', 'refs/heads']) || '').split('\n').filter((x) => x && x !== 'main' && !seen.has(x))) {
    const commits = git(['log', '--format=%h %cd %s', '--date=short', `main..${b}`, '--', ...SKILL_PATHS]) || '';
    if (!commits) continue;
    attention++;
    console.log(`ATTENTION branch ${b} holds skill commits not on main:`);
    for (const l of commits.split('\n').slice(0, 8)) console.log(`  commit  ${l}`);
  }
  // A real folder where a link should be is a second copy, and second copies drift.
  for (const n of names) { let st = null; try { st = lstatSync(join(AGENTS, n)); } catch { /* absent */ } if (st && !st.isSymbolicLink()) { attention++; console.log(`ATTENTION .agents/skills/${n} is a copy, not a link.`); } }

  build(); link(); manifest();
  if (process.argv.includes('--home')) {
    const home = join(process.env.HOME || '', '.agents', 'skills');
    mkdirSync(home, { recursive: true });
    for (const n of names) {
      const at = join(home, n); const target = join(SKILLS, n);
      let st = null; try { st = lstatSync(at); } catch { /* absent */ }
      if (st && !st.isSymbolicLink()) { console.log(`SKIPPED ~/.agents/skills/${n}: a real folder is there; not replaced`); attention++; continue; }
      if (st) rmSync(at);
      symlinkSync(target, at, 'dir');
      console.log(`linked ~/.agents/skills/${n} -> ${target}`);
    }
  }
  const generated = git(['status', '--porcelain', '--', '.claude/skills', '.agents', '.claude-plugin']) || '';
  if (generated && !dirtyHere) { console.log(`ATTENTION the build changed generated files; commit them:\n${generated.split('\n').map((l) => '  ' + l).join('\n')}`); attention++; }
  check();
  console.log(attention ? `\nSync finished with ${attention} thing(s) needing attention above.` : '\nIn step: main is current, no skill edit is stranded elsewhere, every skill is complete.');
  if (attention) process.exitCode = 1;
}

if (cmd === 'check') check();
else if (cmd === 'sync') sync();
else if (cmd === 'build') build();
else if (cmd === 'link') link();
else if (cmd === 'manifest') manifest();
else if (cmd === 'package') pack();
else if (cmd === 'all') { build(); link(); manifest(); check(); if (!process.exitCode) pack(); }
else { console.error('Usage: node scripts/skills.mjs check | sync [--home] | build | link | manifest | package | all'); process.exit(2); }
