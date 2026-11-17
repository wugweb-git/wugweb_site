#!/usr/bin/env node
// Self-test of the two working scripts on the synthetic fixtures. No network.
//
//   node test.mjs

import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const run = (script, args) => {
  try { return { code: 0, out: execFileSync(process.execPath, [join(root, 'scripts', script), ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }) } }
  catch (e) { return { code: e.status ?? 1, out: String(e.stdout || '') } }
}
let failed = 0
const expect = (name, ok, detail = '') => { console.log(`${ok ? 'ok   ' : 'FAIL '} ${name}${ok ? '' : `  (${detail})`}`); if (!ok) failed++ }

// case-audit on the v1 thin fixture
const a = JSON.parse(run('case-audit.mjs', [join(root, 'examples/fixture-v1-thin-body.md'), '--json']).out)
const types = new Set(a.flags.map((f) => f.type))
expect('audit: tab-indented headings still parse into 3 chapters', a.sections.length === 3, a.sections.length)
expect('audit: two-line item gets its text', a.sections[1].points === 2 && !types.has('point without text'))
expect('audit: #### stripped from a point title', types.has('parser: #### in heading or title'))
expect('audit: flags dash, banned word, spelling, generic heading', ['dash', 'banned word', 'spelling', 'generic heading'].every((t) => types.has(t)), [...types].join(','))
expect('audit: markdown link in meta is parsed', a.meta.Client && a.meta.Client.href === 'http://labelly.io/')
expect('audit: archetype is thin text-only', a.archetype === 'thin text-only', a.archetype)

// case-audit on the full worked example (body block only)
const b = JSON.parse(run('case-audit.mjs', [join(root, 'examples/body-ntuc-u-care.md'), '--json']).out)
expect('audit: worked example has 9 claim chapters before the notes', b.sections.filter((s) => s.title.length <= 70).length >= 9, b.sections.length)
expect('audit: worked example plan uses rails, a pair and steps', ['rail "Member" (8)', 'pair "Styles" 50:50', 'steps (6)'].every((x) => b.blockPlan.join('|').includes(x)))

// gate on the two page fixtures
const pass = run('check-case-page.mjs', [join(root, 'examples/fixture-page-pass.html'), '--host', 'www.wugweb.com', '--no-media', '--json'])
const pj = JSON.parse(pass.out)
expect('gate: passing fixture passes every applicable check', pass.code === 0 && pj.passed === pj.applicable, `${pj.passed}/${pj.applicable}`)
const fail = run('check-case-page.mjs', [join(root, 'examples/fixture-page-fail.html'), '--host', 'www.wugweb.com', '--no-media', '--json'])
const fj = JSON.parse(fail.out)
const failedNames = fj.results.filter((r) => r.status === 'fail').map((r) => r.name).join('|')
expect('gate: failing fixture exits 1', fail.code === 1)
expect('gate: catches skipped heading, dash, missing sizes, author in JSON-LD, unnamed slides', ['Heading levels never skip', 'No em or en dash in visible text', 'Every img has width and height', 'JSON-LD has no HowTo', 'Rail slides are named groups'].every((n) => failedNames.includes(n)), failedNames)

console.log(`\n${failed ? `${failed} failed` : 'all passed'}`)
process.exit(failed ? 1 : 0)
