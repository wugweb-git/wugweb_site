#!/usr/bin/env node
/**
 * Lint the rule files: structure, frontmatter, section prefix, and the
 * incorrect/correct example pair every rule needs to be pattern-matchable.
 */
import { readRules, readSections, VALID_IMPACTS } from './lib.mjs'

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

for (const w of warnings) console.log(`  warn   ${w.file}: ${w.message}`)
for (const e of errors) console.error(`  ERROR  ${e.file}: ${e.message}`)

console.log(
  `\n${rules.length} rules across ${sections.length} sections — ` +
    `${errors.length} error(s), ${warnings.length} warning(s)`,
)
process.exit(errors.length ? 1 : 0)
