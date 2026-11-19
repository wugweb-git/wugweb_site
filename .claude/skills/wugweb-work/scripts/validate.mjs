#!/usr/bin/env node
// Checks this skill against its own rules. No packages. Exit 1 on any error.
//
//   node validate.mjs [--json]

import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { dirname, join, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { BANNED } from './case-audit.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => readFileSync(join(root, p), 'utf8')
const EXTERNAL = new Set(['layout-shell.md', 'pending.md', 'governance.md', 'design.md'])
const results = []
const check = (name, ok, detail = '', level = 'error') => results.push({ name, ok: !!ok, detail, level })

const skill = read('SKILL.md')
const front = skill.match(/^---\n([\s\S]*?)\n---\n/)
check('SKILL.md has frontmatter', front)
const fm = front ? front[1] : ''
const body = front ? skill.slice(front[0].length) : skill
const name = fm.match(/^name:\s*(\S+)\s*$/m)?.[1]
let description = ''
try { description = JSON.parse(fm.match(/^description:\s*(".*")\s*$/m)?.[1] ?? '""') } catch { /* reported below */ }
const version = fm.match(/^\s+version:\s*"?([\d.]+)"?\s*$/m)?.[1]
const meta = JSON.parse(read('metadata.json'))

check('name is lowercase letters, digits and hyphens, 64 characters or fewer', name && /^[a-z0-9-]{1,64}$/.test(name), name)
check('folder name matches the skill name', basename(root) === name, `${basename(root)} vs ${name}`, 'warning')
check('description is double-quoted, third person, 1,024 characters or fewer', description && description.length <= 1024 && /^This skill should be used/.test(description), `${description.length} chars`)
check('description has no angle brackets', !/[<>]/.test(description))
check('frontmatter keys are allowed', fm.split('\n').filter((l) => /^[a-z-]+:/.test(l)).every((l) => /^(name|description|license|metadata|compatibility|allowed-tools):/.test(l)))
check('version matches metadata.json', version && version === meta.version, `${version} vs ${meta.version}`)
check('CHANGELOG.md has an entry for this version', read('CHANGELOG.md').includes(`## ${meta.version}`))

const words = (body.match(/[A-Za-z0-9][\w'’.-]*/g) || []).length
check('SKILL.md body is 1,500 to 2,000 words', words >= 1500 && words <= 2000, `${words} words`)
check('SKILL.md is under 500 lines', skill.split('\n').length < 500, `${skill.split('\n').length} lines`)

const listMd = (dir, base = '') => readdirSync(join(dir, base), { withFileTypes: true }).flatMap((e) => e.isDirectory() ? listMd(dir, `${base}${e.name}/`) : e.name.endsWith('.md') ? [`${base}${e.name}`] : [])
const refs = listMd(join(root, 'references')).sort()
const topRefs = refs.filter((f) => !f.includes('/'))
const nested = refs.filter((f) => f.includes('/'))
const mentioned = new Set([...body.matchAll(/`references\/([a-z0-9\/-]+\.md)`/g)].map((m) => m[1]))
check('every top-level reference file is indexed in SKILL.md', topRefs.every((f) => mentioned.has(f)), topRefs.filter((f) => !mentioned.has(f)).join(', '))
const formsIndex = existsSync(join(root, 'references/forms.md')) ? read('references/forms.md') : ''
check('every file in references/forms/ is listed in references/forms.md', nested.every((f) => formsIndex.includes('`' + f + '`')), nested.filter((f) => !formsIndex.includes('`' + f + '`')).join(', '))
const rel = []
for (const f of refs) for (const m of read(`references/${f}`).matchAll(/`((?:forms\/)?[a-z0-9-]+\.md)`/g)) { const t = m[1]; const here = dirname(f) === '.' ? '' : dirname(f) + '/'; if (!refs.includes(t) && !refs.includes(here + t) && !existsSync(join(root, t)) && !EXTERNAL.has(t)) rel.push(`${f} → ${t}`) }
check('every relative pointer between reference files resolves', !rel.length, rel.join('; '))
check('every reference named in SKILL.md exists', [...mentioned].every((f) => refs.includes(f)), [...mentioned].filter((f) => !refs.includes(f)).join(', '))
const allMd = ['SKILL.md', 'README.md', ...refs.map((f) => `references/${f}`)]
const broken = []
for (const f of allMd) for (const m of read(f).matchAll(/`((?:references|scripts|examples|evals)\/[A-Za-z0-9._\/-]+\.[a-z]+)`/g)) if (!existsSync(join(root, m[1]))) broken.push(`${f} → ${m[1]}`)
check('every file pointer resolves', !broken.length, broken.join('; '))
for (const f of refs) { const n = read(`references/${f}`).split('\n').length; if (n > 300) check(`references/${f} over 300 lines has a contents list`, /^## Contents/m.test(read(`references/${f}`)), `${n} lines`) }

const prose = ['SKILL.md', 'README.md', 'CHANGELOG.md', ...refs.map((f) => `references/${f}`)]
const dashes = prose.flatMap((f) => read(f).split('\n').map((l, i) => (/[–—]/.test(l) ? `${f}:${i + 1}` : null)).filter(Boolean))
check('no em or en dash in SKILL.md, README, CHANGELOG or references', !dashes.length, dashes.slice(0, 5).join(', '))
// One banned-word list: scripts/case-audit.mjs holds it, references/copy-and-seo.md prints it, and this file reads both.
const printed = (read('references/copy-and-seo.md').match(/^## Banned words[^\n]*\n\n([^\n]+)\n/m)?.[1] || '').replace(/\.$/, '').split(',').map((w) => w.trim()).filter(Boolean)
check('banned-word list is the same in copy-and-seo.md and case-audit.mjs', printed.length === BANNED.length && printed.every((w) => BANNED.includes(w)), `${printed.length} printed vs ${BANNED.length} in the script; differing: ${[...printed.filter((w) => !BANNED.includes(w)), ...BANNED.filter((w) => !printed.includes(w))].join(', ')}`)
const stops = ['SKILL.md', 'references/qa-checklist.md', 'references/own-content.md'].map((f) => read(f).match(/an unsourced factual claim[^\n]*/)?.[0].replace(/\.$/, '') || `none in ${f}`)
check('hard stops are the same list in SKILL.md, qa-checklist.md and own-content.md', stops.every((s) => s === stops[0]), stops.join(' | '))
const bannedHits = prose.filter((f) => !/copy-and-seo|CHANGELOG/.test(f)).flatMap((f) => BANNED.filter((w) => new RegExp(`\\b${w}`, 'i').test(read(f).replace(/No filler[^\n]*/g, ''))).map((w) => `${f}: ${w}`))
check('no banned words outside the list that defines them', !bannedHits.length, bannedHits.join(', '))
const US = /\b(color|organization|optimize|centralized|behavior|analyze|customize)\b/
const usHits = prose.filter((f) => !/copy-and-seo/.test(f)).filter((f) => US.test(read(f).replace(/`[^`]*`/g, '').replace(/```[\s\S]*?```/g, '')))
check('British spelling in prose', !usHits.length, usHits.join(', '), 'warning')

const VENDOR = /\b(Notion|Sanity|Cloudflare|R2|Postiz)\b/
const vendorHits = ['SKILL.md', ...refs.filter((f) => !/ops-cycle|skill-map|standing-rules/.test(f)).map((f) => `references/${f}`)].filter((f) => VENDOR.test(read(f).replace(/only `references\/ops-cycle\.md` names[^\n]*/i, '')))
check('CMS, host and scheduling tool are named only in ops-cycle.md and skill-map.md', !vendorHits.length, vendorHits.join(', '))
const agentHits = refs.filter((f) => !/ops-cycle|skill-map|standing-rules/.test(f)).filter((f) => /\bClaude\b/.test(read(`references/${f}`)))
check('references are agent-neutral (no "Claude" outside ops-cycle.md and skill-map.md)', !agentHits.length, agentHits.join(', '))

let evals = null
if (existsSync(join(root, 'evals/evals.json'))) { try { evals = JSON.parse(read('evals/evals.json')) } catch (e) { check('evals/evals.json parses', false, e.message) } } else console.log('note: evals/evals.json is not in this copy; skipped')
if (evals) {
  check('evals.json skill_name matches', evals.skill_name === name, `${evals.skill_name} vs ${name}`)
  const ids = evals.evals.map((e) => e.id)
  check('eval ids are unique', new Set(ids).size === ids.length)
  check('every eval has a prompt, expected_output and expectations', evals.evals.every((e) => e.prompt && e.expected_output && e.expectations?.length))
  const missing = evals.evals.flatMap((e) => (e.files || []).filter((f) => !existsSync(join(root, f))))
  check('every eval file exists', !missing.length, missing.join(', '))
}

for (const s of readdirSync(join(root, 'scripts')).filter((f) => f.endsWith('.mjs'))) {
  try { execFileSync(process.execPath, ['--check', join(root, 'scripts', s)], { stdio: 'pipe' }); check(`scripts/${s} parses`, true) } catch (e) { check(`scripts/${s} parses`, false, String(e.stderr).split('\n')[0]) }
}
try { execFileSync(process.execPath, [join(root, 'scripts/build.mjs'), '--check'], { stdio: 'pipe' }); check('generated files are fresh (AGENTS.md, adapters)', true) } catch { check('generated files are fresh (AGENTS.md, adapters)', false, 'run node scripts/build.mjs') }

const errors = results.filter((r) => !r.ok && r.level === 'error')
const warnings = results.filter((r) => !r.ok && r.level === 'warning')
if (process.argv.includes('--json')) console.log(JSON.stringify({ name, version, results }, null, 2))
else {
  for (const r of results) console.log(`${r.ok ? 'ok   ' : r.level === 'warning' ? 'WARN ' : 'FAIL '} ${r.name}${r.detail && !r.ok ? `  (${r.detail})` : ''}`)
  console.log(`\n${name} ${version}: ${results.length} checks, ${errors.length} errors, ${warnings.length} warnings. Body ${words} words, ${refs.length} references.`)
}
process.exit(errors.length ? 1 : 0)
