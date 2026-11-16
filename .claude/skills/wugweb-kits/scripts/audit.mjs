#!/usr/bin/env node
/**
 * Phase 0 inventory. Counts what is actually in the codebase so the token scale
 * is designed from observation rather than invention.
 *
 *   node scripts/audit.mjs src/
 *   node scripts/audit.mjs src/ --findings   # also list raw values as file:line
 *
 * Measures, never proposes. The gap between "distinct" and "top 5 cover" is the
 * argument for the whole exercise — see rules/map-count-before-you-propose.md.
 */
import { readdir, readFile } from 'node:fs/promises'
import { join, extname } from 'node:path'

const root = process.argv[2]
const withFindings = process.argv.includes('--findings')
if (!root) {
  console.error('usage: node scripts/audit.mjs <dir> [--findings]')
  process.exit(2)
}

const EXTS = new Set(['.css', '.scss', '.less', '.ts', '.tsx', '.js', '.jsx', '.vue', '.svelte'])
const SKIP = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'out', 'coverage'])

const DIMENSIONS = [
  { name: 'Color', re: /#[0-9a-fA-F]{3,8}\b|\brgba?\([^)]*\)|\bhsla?\([^)]*\)/g, norm: (v) => v.toLowerCase() },
  { name: 'Spacing / size', re: /\b\d+(?:\.\d+)?(?:px|rem|em)\b/g },
  // Matches both CSS (`font-size:`) and JSX style objects (`fontSize:`).
  { name: 'Font size', re: /\b(?:font-size|fontSize)\s*:\s*['"]?([^;}\n,'"]+)/g, capture: 1 },
  { name: 'Font weight', re: /\b(?:font-weight|fontWeight)\s*:\s*['"]?([^;}\n,'"]+)/g, capture: 1 },
  { name: 'Radius', re: /\b(?:border-radius|borderRadius)\s*:\s*['"]?([^;}\n,'"]+)/g, capture: 1 },
  { name: 'Shadow', re: /\b(?:box-shadow|boxShadow)\s*:\s*['"]?([^;}\n,'"]+)/g, capture: 1 },
]

// Values that are structural rather than design decisions.
const EXEMPT = /^(0(px|rem|em)?|1px|100%|auto|inherit|initial|unset|none|normal)$/i

const counts = DIMENSIONS.map(() => new Map())
const findings = DIMENSIONS.map(() => [])
const declared = new Map() // --token -> first file:line
const used = new Set()
let fileCount = 0

async function walk(dir) {
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const e of entries) {
    if (e.name.startsWith('.') && e.name !== '.storybook') continue
    const p = join(dir, e.name)
    if (e.isDirectory()) {
      if (!SKIP.has(e.name)) await walk(p)
    } else if (EXTS.has(extname(e.name))) {
      await scan(p)
    }
  }
}

async function scan(file) {
  const text = await readFile(file, 'utf8').catch(() => null)
  if (text === null) return
  fileCount++
  const lines = text.split('\n')

  lines.forEach((line, i) => {
    // Token declarations and usages
    for (const m of line.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gi)) {
      if (!declared.has(m[1])) declared.set(m[1], `${file}:${i + 1}`)
    }
    for (const m of line.matchAll(/var\(\s*(--[a-z0-9-]+)/gi)) used.add(m[1])

    // A line that declares a token is where raw values belong — skip it.
    if (/^\s*--[a-z0-9-]+\s*:/.test(line)) return

    DIMENSIONS.forEach((d, di) => {
      for (const m of line.matchAll(d.re)) {
        let value = (d.capture ? m[d.capture] : m[0]).trim()
        if (d.norm) value = d.norm(value)
        if (EXEMPT.test(value) || value.includes('var(')) continue
        counts[di].set(value, (counts[di].get(value) ?? 0) + 1)
        if (withFindings) findings[di].push(`${file}:${i + 1}  ${d.name}: ${value}`)
      }
    })
  })
}

await walk(root)

const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0)

console.log(`\nPhase 0 inventory — ${fileCount} files under ${root}\n`)
console.log('| Dimension | Distinct | Total uses | Top 5 cover |')
console.log('|---|---|---|---|')
for (const [i, d] of DIMENSIONS.entries()) {
  const entries = [...counts[i]].sort((a, b) => b[1] - a[1])
  const total = entries.reduce((s, [, n]) => s + n, 0)
  const top5 = entries.slice(0, 5).reduce((s, [, n]) => s + n, 0)
  console.log(`| ${d.name} | ${entries.length} | ${total} | ${pct(top5, total)}% |`)
}

console.log('\nMost frequent raw values (candidates for the surviving scale):')
for (const [i, d] of DIMENSIONS.entries()) {
  const top = [...counts[i]].sort((a, b) => b[1] - a[1]).slice(0, 8)
  if (!top.length) continue
  console.log(`\n  ${d.name}`)
  for (const [v, n] of top) console.log(`    ${String(n).padStart(5)}  ${v}`)
}

const orphans = [...declared.keys()].filter((t) => !used.has(t))
console.log(`\nTokens declared: ${declared.size} · referenced: ${used.size} · orphaned: ${orphans.length}`)
for (const t of orphans.slice(0, 40)) console.log(`  ORPHAN  ${t}  (${declared.get(t)})`)
if (orphans.length > 40) console.log(`  … and ${orphans.length - 40} more`)

const undeclared = [...used].filter((t) => !declared.has(t))
if (undeclared.length) {
  console.log(`\nReferenced but never declared here (${undeclared.length}) — external theme or typo:`)
  for (const t of undeclared.slice(0, 20)) console.log(`  UNDECLARED  ${t}`)
}

if (withFindings) {
  console.log('\nRaw values, file:line')
  const all = findings.flat().sort()
  for (const f of all) console.log(`  BLOCKER  ${f}   token-no-raw-values-in-components`)
}

console.log(
  '\nThese are measurements, not recommendations. Design the scale from what survives;' +
    '\nsee rules/map-count-before-you-propose.md.',
)
