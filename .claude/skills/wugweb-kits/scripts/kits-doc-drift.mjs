#!/usr/bin/env node
/**
 * Doc and code drift. The doc is the source; a mismatch is a finding against the code.
 *   node scripts/kits-doc-drift.mjs            (run from the repo root)
 * Checks: every token named in layout-shell.md and sizing.md exists in global.css;
 * layout-shell values match their declarations; retired values do not appear in global.css
 * shell tokens. Report only, never edits either side.
 */
import { readFile } from 'node:fs/promises'
const CSS = 'src/styles/global.css'
const DOCS = ['kits_design_system/docs/tokens/layout-shell.md', 'kits_design_system/docs/tokens/sizing.md']
const css = await readFile(CSS, 'utf8').catch(() => { console.error(`cannot read ${CSS}; run from the repo root`); process.exit(2) })
const declared = new Map([...css.matchAll(/(?<![\w-])(--[a-z0-9-]+)\s*:\s*([^;{}]+);/g)].map((m) => [m[1], m[2].trim()]))
const resolve = (v, d = 0) => { const m = /^var\((--[a-z0-9-]+)\)$/.exec(v || ''); return m && d < 5 ? resolve(declared.get(m[1]), d + 1) : v }
const findings = []
for (const f of DOCS) {
  const doc = await readFile(f, 'utf8')
  const named = new Set([...doc.matchAll(/`(--[a-z0-9-]+)`/g)].map((m) => m[1]))
  for (const t of named) {
    if (/\*$/.test(t) || t === '--space-section-*') continue
    if (!declared.has(t) && !css.includes(t)) findings.push(`HIGH     ${f}: names ${t}, not found in ${CSS}`)
  }
}
const expect = { '--control-size': '44px', '--breakpoint-xl': '1200px', '--duration-spring': '400ms', '--layer-nav': '10', '--nav-bar-pad': '12px', '--nav-logo-height': '2.5rem' }
for (const [k, v] of Object.entries(expect)) {
  let got = resolve(declared.get(k))
  if (got && /^[\d.]+rem$/.test(got) && /px$/.test(v)) got = `${parseFloat(got) * 16}px`
  if (v.endsWith('rem') === false && got === undefined) { findings.push(`HIGH     ${CSS}: ${k} not declared (doc: ${v})`); continue }
  if (got === undefined) findings.push(`HIGH     ${CSS}: ${k} not declared (doc: ${v})`)
  else if (got.replace(/\s/g, '') !== v) findings.push(`HIGH     ${CSS}: ${k} is ${got}, doc says ${v}`)
}
for (const [k, v] of declared) if (/--(shell-gutter|grid-gap|header-height|nav-height|header-pad-block)/.test(k) && /\b(1280px|44px)\b/.test(v) && k !== '--control-size') findings.push(`BLOCKER  ${CSS}: ${k} holds a retired value (${v})`)
console.log(`${declared.size} declarations read`)
for (const f of findings) console.log(f)
console.log(`${findings.length} finding(s)`)
process.exit(findings.length ? 1 : 0)
