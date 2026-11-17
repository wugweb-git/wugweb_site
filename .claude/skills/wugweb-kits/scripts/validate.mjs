#!/usr/bin/env node
/**
 * Lint the rule files: structure, frontmatter, section prefix, and the
 * incorrect/correct example pair every rule needs to be pattern-matchable.
 */
import { readRules, readSections, VALID_IMPACTS, SKILL_DIR, standingDrift } from './lib.mjs'
import { readFile, access } from 'node:fs/promises'
import { join } from 'node:path'

const BAD = ['incorrect', 'wrong', 'bad', 'avoid']
const GOOD = ['correct', 'good', 'right', 'do this']

const errors = []
const warnings = []
const fail = (file, message) => errors.push({ file, message })
const warn = (file, message) => warnings.push({ file, message })

const sections = await readSections()
const sectionIds = new Set(sections.map((s) => s.id))
const rules = await readRules()

if (rules.length === 0) fail('rules/', 'No rule files found')

for (const rule of rules) {
  const { file, data, body, examples } = rule

  if (!data || Object.keys(data).length === 0) {
    fail(file, 'Missing or unparseable frontmatter')
    continue
  }
  if (!data.title) fail(file, 'Missing frontmatter: title')
  if (!data.impactDescription) fail(file, 'Missing frontmatter: impactDescription')
  if (!data.tags) warn(file, 'Missing frontmatter: tags')

  if (!data.impact) {
    fail(file, 'Missing frontmatter: impact')
  } else if (!VALID_IMPACTS.includes(data.impact)) {
    fail(file, `Invalid impact "${data.impact}". Must be one of: ${VALID_IMPACTS.join(', ')}`)
  }

  if (!sectionIds.has(rule.section)) {
    fail(
      file,
      `Filename prefix "${rule.section}" is not a section in rules/_sections.md ` +
        `(known: ${[...sectionIds].join(', ')})`,
    )
  }

  const heading = /^##\s+(.+)$/m.exec(body)
  if (!heading) fail(file, 'Missing H2 heading')
  else if (data.title && heading[1].trim() !== data.title.trim()) {
    warn(file, `H2 "${heading[1].trim()}" does not match frontmatter title "${data.title}"`)
  }

  if (rule.explanation.length < 40) {
    fail(file, 'Explanation missing or too short — say why the rule matters before the examples')
  }

  const code = examples.filter((e) => e.code.length > 0)
  const hasBad = code.some((e) => BAD.some((w) => e.label.toLowerCase().includes(w)))
  const hasGood = code.some((e) => GOOD.some((w) => e.label.toLowerCase().includes(w)))

  if (code.length === 0) fail(file, 'No labelled code examples found')
  else if (!hasBad) fail(file, 'Missing an Incorrect example')
  else if (!hasGood) fail(file, 'Missing a Correct example')
}

const bySection = new Map()
for (const r of rules) bySection.set(r.section, (bySection.get(r.section) ?? 0) + 1)
for (const s of sections) {
  if (!bySection.get(s.id)) warn('rules/_sections.md', `Section "${s.id}" has no rules`)
}

// Whole skill checks: SKILL.md names every rule, every file it points to exists,
// and the shell numbers in the reference match the doc when the repo docs are present.
const skill = await readFile(join(SKILL_DIR, 'SKILL.md'), 'utf8')
for (const r of rules) if (!skill.includes('`' + r.id + '`')) fail('SKILL.md', `does not name rule ${r.id}`)
const exists = (p) => access(join(SKILL_DIR, p)).then(() => true, () => false)
for (const m of skill.matchAll(/`((?:references|scripts)\/[A-Za-z0-9._-]+)`/g)) if (!(await exists(m[1]))) fail('SKILL.md', `points to missing file ${m[1]}`)
for (const m of skill.matchAll(/node (scripts\/[A-Za-z0-9._-]+)/g)) if (!(await exists(m[1]))) fail('SKILL.md', `runs missing script ${m[1]}`)
const words = skill.replace(/^---[\s\S]*?\n---\n/, '').replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length
if (words < 1500 || words > 2000) fail('SKILL.md', `body is ${words} words, expected 1500 to 2000`)
if (/[\u2013\u2014]/.test(skill)) fail('SKILL.md', 'contains an em or en dash')
const doc = await readFile(join(SKILL_DIR, '../../../kits_design_system/docs/tokens/layout-shell.md'), 'utf8').catch(() => null)
const ref = await readFile(join(SKILL_DIR, 'references/layout-shell.md'), 'utf8')
if (doc) {
  for (const v of ['48 16 48 16', '70 32 70 32', '96 48 96 48']) if (!ref.includes(v)) fail('references/layout-shell.md', `missing ${v}`)
  for (const v of ['1200', '100', '108', '68']) if (!doc.includes(v)) fail('layout-shell.md', `doc no longer contains ${v}; the skill copy may be stale`)
  const docTable = /## Breakpoints\n\n(\|[\s\S]*?)\n\n/.exec(doc)?.[1]
  const refTable = /<!-- doc-table:breakpoints -->\n([\s\S]*?)\n<!-- end doc-table -->/.exec(ref)?.[1]?.trim()
  if (!docTable || !refTable) fail('references/layout-shell.md', 'breakpoints table missing in the doc or the copy')
  else if (docTable.trim() !== refTable) fail('references/layout-shell.md', 'breakpoints table differs from layout-shell.md; recopy it')
} else warn('layout-shell.md', 'repo docs not found, doc comparison skipped')
const home = await readFile(join(SKILL_DIR, '../../../docs/skills/STANDING-RULES.md'), 'utf8').catch(() => null)
const copy = await readFile(join(SKILL_DIR, 'references/standing-rules.md'), 'utf8')
if (home) for (const p of standingDrift(home, copy, skill)) fail('standing rules', p)
else warn('standing rules', 'home file not found (outside the repo); drift check skipped')
console.log(`SKILL.md body: ${words} words`)

for (const w of warnings) console.log(`  warn   ${w.file}: ${w.message}`)
for (const e of errors) console.error(`  ERROR  ${e.file}: ${e.message}`)

console.log(
  `\n${rules.length} rules across ${sections.length} sections — ` +
    `${errors.length} error(s), ${warnings.length} warning(s)`,
)
process.exit(errors.length ? 1 : 0)
