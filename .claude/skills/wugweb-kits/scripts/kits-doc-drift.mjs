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
// Tier values: every declaration of a shell token, in file order (base, then 768, then 1200),
// against the doc's Breakpoints table. Values are resolved and rem is read as 16px.
const all = new Map()
for (const m of css.matchAll(/(?<![\w-])(--[a-z0-9-]+)\s*:\s*([^;{}]+);/g)) all.set(m[1], [...(all.get(m[1]) || []), m[2].trim()])
const px = (v) => { const r = resolve(v); if (/^[\d.]+px$/.test(r || '')) return parseFloat(r); if (/^[\d.]+rem$/.test(r || '')) return parseFloat(r) * 16; return NaN }
const tiers = { '--shell-gutter': [16, 32, 48], '--grid-gap': [16, 24, 32], '--header-pad-block': [16, 20], '--space-section-xl': [48, 70, 96] }
for (const [k, want] of Object.entries(tiers)) {
  const got = (all.get(k) || []).map(px)
  if (got.join(' ') !== want.join(' ')) findings.push(`HIGH     ${CSS}: ${k} steps ${got.join(' / ') || 'none'}, doc says ${want.join(' / ')}`)
}
const bar = px(declared.get('--control-size')) + 2 * px(declared.get('--nav-bar-pad'))
if (bar !== 68) findings.push(`HIGH     ${CSS}: nav bar computes to ${bar}, doc says 68`)
for (const [pad, h] of [[16, 100], [20, 108]]) if (bar + 2 * pad !== h) findings.push(`HIGH     ${CSS}: header with pad ${pad} computes to ${bar + 2 * pad}, doc says ${h}`)
console.log(`${declared.size} declarations read`)
for (const f of findings) console.log(f)
console.log(`${findings.length} finding(s)`)
process.exit(findings.length ? 1 : 0)
