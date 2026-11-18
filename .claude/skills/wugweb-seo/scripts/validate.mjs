#!/usr/bin/env node
// Checks this skill against the Agent Skills format and the house format.
// No packages. Exit 1 on any error.
//
//   node validate.mjs [--json]

import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, basename } from 'node:path'
import { execFileSync } from 'node:child_process'
import { SKILL_DIR as root, proseOf } from './lib.mjs'

const read = (p) => readFileSync(join(root, p), 'utf8')
const results = []
const check = (name, ok, detail = '', level = 'error') => results.push({ name, ok: !!ok, detail: String(detail ?? ''), level })
const mdIn = (dir) => readdirSync(join(root, dir)).filter((f) => f.endsWith('.md')).sort()

// 1. Frontmatter, against agentskills.io/specification.
const skill = read('SKILL.md')
const front = skill.match(/^---\n([\s\S]*?)\n---\n/)
check('SKILL.md has frontmatter', front)
const fm = front ? front[1] : ''
const body = front ? skill.slice(front[0].length) : skill
const name = fm.match(/^name:\s*(\S+)\s*$/m)?.[1]
let description = ''
try { description = JSON.parse(fm.match(/^description:\s*(".*")\s*$/m)?.[1] ?? '""') } catch { /* reported below */ }
let compatibility = ''
try { compatibility = JSON.parse(fm.match(/^compatibility:\s*(".*")\s*$/m)?.[1] ?? '""') } catch { /* reported below */ }
const version = fm.match(/^\s+version:\s*"([\d.]+)"\s*$/m)?.[1]
const meta = JSON.parse(read('metadata.json'))

check('name: lowercase letters, digits and single hyphens, 1 to 64 characters', name && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) && name.length <= 64, name)
check('folder name matches the skill name', basename(root) === name, `${basename(root)} vs ${name}`, 'warning')
check('description: double-quoted, 1 to 1,024 characters', description.length >= 1 && description.length <= 1024, `${description.length} characters`)
// House form, shared with the sibling skills: it opens "This skill should be used when" and quotes
// the phrases a user would say. The older "Use when" form still passes.
const quoted = (description.match(/"[^"]+"/g) ?? []).length
const houseForm = /^This skill should be used when\b/.test(description) && quoted >= 3
check('description: third person, says what it does and when to use it', !/^(I|You|We)\b/.test(description) && (houseForm || (!/^This skill\b/.test(description) && /\bUse (when|to|for)\b/.test(description))), houseForm ? '' : `${quoted} quoted phrases`)
check('description has no angle brackets', !/[<>]/.test(description))
check('compatibility is 500 characters or fewer', compatibility.length <= 500, `${compatibility.length} characters`)
const topKeys = fm.split('\n').filter((l) => /^[a-z-]+:/.test(l)).map((l) => l.split(':')[0])
check('frontmatter keys are in the specification', topKeys.every((k) => ['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools'].includes(k)), topKeys.join(', '))
check('version in SKILL.md matches metadata.json', version && version === meta.version, `${version} vs ${meta.version}`)
check('CHANGELOG.md has an entry for this version', read('CHANGELOG.md').includes(`## ${meta.version}`))

// 2. Size. Shared method across the seven skills: drop frontmatter (body is already
// past it), remove fenced code blocks, split on whitespace, count tokens with a letter or digit.
const words = body.replace(/```[\s\S]*?```/g, '').split(/\s+/).filter((t) => /[A-Za-z0-9]/.test(t)).length
check('SKILL.md body is 1,500 to 2,000 words', words >= 1500 && words <= 2000, `${words} words`)
check('SKILL.md is under 500 lines', skill.split('\n').length < 500, `${skill.split('\n').length} lines`)

// 3. References and file pointers.
const refs = mdIn('references')
const mentioned = new Set([...body.matchAll(/`references\/([a-z0-9-]+\.md)`/g)].map((m) => m[1]))
check('every reference file is named in SKILL.md', refs.every((f) => mentioned.has(f)), refs.filter((f) => !mentioned.has(f)).join(', '))
check('every reference named in SKILL.md exists', [...mentioned].every((f) => refs.includes(f)), [...mentioned].filter((f) => !refs.includes(f)).join(', '))
const handMade = ['SKILL.md', 'README.md', 'CHANGELOG.md', ...refs.map((f) => `references/${f}`)]
const broken = []
for (const f of handMade) {
  if (f === 'CHANGELOG.md') continue
  for (const m of read(f).matchAll(/(?:`|\s)((?:references|scripts|examples|evals|adapters|agents)\/[A-Za-z0-9._/-]+)/g)) {
    const target = m[1].replace(/[.,;:)]$/, '')
    if (/[<*]/.test(target)) continue
    if (target.startsWith('evals/') && !existsSync(join(root, 'evals'))) continue
    if (!existsSync(join(root, target))) broken.push(`${f} → ${target}`)
  }
}
check('every file pointer resolves', !broken.length, [...new Set(broken)].join('; '))
for (const f of refs) {
  const n = read(`references/${f}`).split('\n').length
  if (n > 300) check(`references/${f} over 300 lines has a contents list`, /^## Contents/m.test(read(`references/${f}`)), `${n} lines`)
}

// 4. Check ids: every id a script reports is documented, and the reverse.
const scriptIds = new Set()
for (const s of ['check-page.mjs', 'check-robots.mjs']) for (const m of read(`scripts/${s}`).matchAll(/'((?:title|description|h1|robots|schema|img|server|sitemap)-[a-z0-9-]+|canonical)'/g)) scriptIds.add(m[1])
const docIds = new Set([...read('references/audit.md').matchAll(/`((?:title|description|h1|robots|schema|img|server|sitemap)-[a-z0-9-]+|canonical)`/g)].map((m) => m[1]))
check('every check id a script reports is documented in references/audit.md', [...scriptIds].every((id) => docIds.has(id)), [...scriptIds].filter((id) => !docIds.has(id)).join(', '))

// 5. House style.
const dashes = handMade.flatMap((f) => read(f).split('\n').map((l, i) => (/[–—]/.test(l) ? `${f}:${i + 1}` : null)).filter(Boolean))
check('no em or en dash in any hand-written file', !dashes.length, dashes.slice(0, 5).join(', '))
const BANNED = ['pivotal', 'robust', 'seamless', 'meticulous', 'holistic', 'cutting-edge', 'leverage', 'empower', 'unlock', 'world-class']
const bannedHits = handMade.flatMap((f) => BANNED.filter((w) => new RegExp(`\\b${w}`, 'i').test(proseOf(read(f)))).map((w) => `${f}: ${w}`))
check('no filler words', !bannedHits.length, bannedHits.join(', '))
const US = /\b(colors?|gray|organization|optimize[ds]?|optimization|centralized|behaviors?|analyze[ds]?|customize[ds]?|prioritize[ds]?|recognize[ds]?|catalogs?|favor(?:ite)?s?|center(?:ed)?)\b/i
const usHits = handMade.filter((f) => US.test(proseOf(read(f)).replace(/^---\n[\s\S]*?\n---\n/, '')))
check('British spelling in prose', !usHits.length, usHits.join(', '), 'warning')

// 6. Portability.
const neutral = refs.filter((f) => f !== 'standing-rules.md').map((f) => `references/${f}`).filter((f) => /\bClaude\b(?!-)/.test(read(f)))
check('references name no single agent', !neutral.length, neutral.join(', '))
check('relatedSkills in metadata.json are the siblings SKILL.md names', (meta.relatedSkills ?? []).every((s) => body.includes(`\`${s}\``)), (meta.relatedSkills ?? []).filter((s) => !body.includes(`\`${s}\``)).join(', '))

// 7. Evals and examples.
let evals = null
if (!existsSync(join(root, 'evals/evals.json'))) check('evals/evals.json is present', false, 'not shipped in this copy', 'warning')
else try { evals = JSON.parse(read('evals/evals.json')) } catch (e) { check('evals/evals.json parses', false, e.message) }
if (evals) {
  check('evals.json skill_name matches', evals.skill_name === name, `${evals.skill_name} vs ${name}`)
  const ids = evals.evals.map((e) => e.id)
  check('eval ids are unique', new Set(ids).size === ids.length)
  check('every eval has a prompt, an expected_output and expectations', evals.evals.every((e) => e.prompt && e.expected_output && e.expectations?.length))
  const missing = evals.evals.flatMap((e) => (e.files || []).filter((f) => !existsSync(join(root, f))))
  check('every eval file exists', !missing.length, missing.join(', '))
}

// 8. Scripts and generated files.
const run = (args) => execFileSync(process.execPath, args, { stdio: 'pipe' })
for (const s of readdirSync(join(root, 'scripts')).filter((f) => f.endsWith('.mjs'))) {
  try { run(['--check', join(root, 'scripts', s)]); check(`scripts/${s} parses`, true) } catch (e) { check(`scripts/${s} parses`, false, String(e.stderr).split('\n')[0]) }
}
try { run([join(root, 'scripts/build.mjs'), '--check']); check('generated files are fresh (AGENTS.md, adapters, agents, export)', true) } catch { check('generated files are fresh (AGENTS.md, adapters, agents, export)', false, 'run node scripts/build.mjs') }
const gpt = existsSync(join(root, 'adapters/chatgpt/instructions.md')) ? read('adapters/chatgpt/instructions.md').match(/```\n([\s\S]*?)```/)?.[1] ?? '' : ''
check('custom GPT instruction block is 8,000 characters or fewer', gpt.length > 0 && gpt.length <= 8000, `${gpt.length} characters`)

const errors = results.filter((r) => !r.ok && r.level === 'error')
const warnings = results.filter((r) => !r.ok && r.level === 'warning')
if (process.argv.includes('--json')) console.log(JSON.stringify({ name, version, words, results }, null, 2))
else {
  for (const r of results) console.log(`${r.ok ? 'ok   ' : r.level === 'warning' ? 'WARN ' : 'FAIL '} ${r.name}${r.detail && !r.ok ? `  (${r.detail})` : ''}`)
  console.log(`\n${name} ${version}: ${results.length} checks, ${errors.length} ${errors.length === 1 ? 'error' : 'errors'}, ${warnings.length} ${warnings.length === 1 ? 'warning' : 'warnings'}. Body ${words} words, ${refs.length} references.`)
}
process.exit(errors.length ? 1 : 0)
