#!/usr/bin/env node
// Self-test of the two working scripts on the synthetic fixtures. No network.
//
//   node test.mjs

import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseBody, flagsFor, blockPlan } from './case-audit.mjs'

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
expect('audit: worked example plan uses rails, a pair and a timeline for the numbered steps', ['rail "Member" (8)', 'pair "Styles" 50:50', 'timeline (6 steps)'].every((x) => b.blockPlan.join('|').includes(x)))
const CATALOGUE = ['hero', 'summary', 'stats', 'chapter', 'points', 'figure', 'split', 'pair', 'rail', 'mosaic', 'wall', 'scrollshot', 'loop', 'video', 'quote', 'table', 'timeline', 'results', 'screens', 'credits', 'presence', 'related', 'next']
const planTypes = b.blockPlan.flatMap((l) => l.split(' + ')).map((p) => p.trim().split(/[ :(]/)[0])
expect('audit: every block in the worked example plan is one of the 23 catalogue types', CATALOGUE.length === 23 && planTypes.every((t) => CATALOGUE.includes(t)), planTypes.filter((t) => !CATALOGUE.includes(t)).join(','))

// case-audit parser cases, on inline bodies
const body = (copy) => ['## Example', '**Subtitle:** A booking app', '### About', 'Short copy.', `## ${copy} site copy`, '### Members apply in one guided flow', 'The long copy wins.', '### Staff run every programme', 'Second chapter.', '## Media',
  '![Section: Members apply | Screens: Apply 1](https://x.test/work/a/1.png)', '![Section: Staff run](https://x.test/work/a/2.png)', '![Section: No such chapter | Mark: logo](https://x.test/work/a/3.png)', '![Marketing site](https://x.test/work/a/4.png)', '![Mark 2](https://x.test/work/a/5.png)'].join('\n')
for (const copy of ['Sanity', 'Framer']) {
  const p = parseBody(body(copy))
  expect(`audit: "${copy} site copy" is read as the long copy and wins`, p.hasSiteCopy && p.sections.length === 2 && p.sections[0].title === 'Members apply in one guided flow', p.sections.map((s) => s.title).join('|'))
}
const sp = parseBody(body('Framer')); const sf = flagsFor(body('Framer'), sp)
expect('audit: Section: prefix routes media to the named chapter, with the label kept', sp.sections[0].media.length === 1 && sp.sections[0].media[0].kind === 'screen' && sp.sections[0].media[0].label === 'Screens: Apply 1')
expect('audit: Section: prefix with no label is accepted and not flagged', sp.sections[1].media.length === 1 && !sf.some((f) => /label/.test(f.type) && f.line === sp.sections[1].media[0].line))
expect('audit: Section: prefix with no matching chapter goes to the closing media', sp.closing.some((m) => m.sectionHint === 'No such chapter' && m.kind === 'logo'))
const kinds = Object.fromEntries(sp.closing.map((m) => [m.label, m.kind]))
expect('audit: a label is typed only on a whole kind word', kinds['Marketing site'] === 'unknown' && kinds['Mark 2'] === 'logo', JSON.stringify(kinds))
const long = ['## T', '### A long chapter with no media', Array(170).fill('word').join(' ') + '.'].join('\n')
const lf = flagsFor(long, parseBody(long)).filter((f) => f.type === 'length')
expect('audit: a long chapter with no media is flagged once', lf.length === 1, lf.length)
const numbered = ['## T', '### Every application carries its own audit trail', 'Lead.', '1. Applied', '2. Checked', '3. Awarded'].join('\n')
expect('audit: numbered steps plan as a timeline, never as a steps block', blockPlan(parseBody(numbered)).join('|').includes('timeline (3 steps)') && !blockPlan(parseBody(numbered)).join('|').includes('+ steps'))

// gate on the two page fixtures
const pass = run('check-case-page.mjs', [join(root, 'examples/fixture-page-pass.html'), '--host', 'www.wugweb.com', '--no-media', '--json'])
const pj = JSON.parse(pass.out)
expect('gate: passing fixture passes every applicable check', pass.code === 0 && pj.passed === pj.applicable, `${pj.passed}/${pj.applicable}`)
const fail = run('check-case-page.mjs', [join(root, 'examples/fixture-page-fail.html'), '--host', 'www.wugweb.com', '--no-media', '--json'])
const fj = JSON.parse(fail.out)
const failedNames = fj.results.filter((r) => r.status === 'fail').map((r) => r.name).join('|')
expect('gate: failing fixture exits 1', fail.code === 1)
const stat = (j, name) => (j.results.find((r) => r.name.startsWith(name)) || {}).status
expect('gate: chapter check applies on a case-study page', stat(pj, 'Every chapter article') === 'pass')
const nb = JSON.parse(run('check-case-page.mjs', [join(root, 'examples/fixture-page-pass.html'), '--host', 'www.wugweb.com', '--no-media', '--no-body', '--json']).out)
expect('gate: chapter check is not applicable with --no-body', stat(nb, 'Every chapter article') === 'n/a')
const t2 = JSON.parse(run('check-case-page.mjs', [join(root, 'examples/fixture-page-own-content.html'), '--host', 'www.wugweb.com', '--no-media', '--json']).out)
expect('gate: chapter check is not applicable on a track 2 page', stat(t2, 'Every chapter article') === 'n/a', stat(t2, 'Every chapter article'))
// the hero is the first image inside the hero block, not the first image in main
{
  const dir = mkdtempSync(join(tmpdir(), 'work-gate-'))
  const src = readFileSync(join(root, 'examples/fixture-page-pass.html'), 'utf8')
  const cover = src.match(/<img src="cover\.png"[^>]*>/)[0]
  const withLogo = src.replace(cover, `<img src="logo.png" alt="Example Co logo" width="120" height="40" loading="lazy"><header class="case-hero">${cover}</header>`)
  const file = join(dir, 'hero.html'); writeFileSync(file, withLogo)
  const hj = JSON.parse(run('check-case-page.mjs', [file, '--host', 'www.wugweb.com', '--no-media', '--json']).out)
  expect('gate: hero is the image in the hero block, not the first image', stat(hj, 'Hero image is high priority') === 'pass' && stat(hj, 'Other images lazy') === 'pass', `${stat(hj, 'Hero image is high priority')}/${stat(hj, 'Other images lazy')}`)
  rmSync(dir, { recursive: true, force: true })
}
expect('gate: canonical on the canonical host passes', stat(pj, 'Canonical points to this page') === 'pass')
const wrongHost = JSON.parse(run('check-case-page.mjs', [join(root, 'examples/fixture-page-pass.html'), '--host', 'preview.example.test', '--canonical-host', 'canonical.example.test', '--no-media', '--json']).out)
expect('gate: canonical on another host fails', stat(wrongHost, 'Canonical points to this page') === 'fail', stat(wrongHost, 'Canonical points to this page'))
expect('gate: catches skipped heading, dash, missing sizes, author in JSON-LD, unnamed slides', ['Heading levels never skip', 'No em or en dash in visible text', 'Every img has width and height', 'JSON-LD has no HowTo', 'Rail slides are named groups'].every((n) => failedNames.includes(n)), failedNames)

// standing rules: the marked copy matches the home file (the home file wins); skipped outside the repo
const home = join(root, '..', '..', '..', 'docs', 'skills', 'STANDING-RULES.md')
if (existsSync(home)) {
  const copy = readFileSync(join(root, 'references', 'standing-rules.md'), 'utf8')
  const marked = /^<!-- Copied from docs\/skills\/STANDING-RULES\.md\./.test(copy)
  const body = copy.replace(/^<!--[\s\S]*?-->\s*/, '').trim()
  expect('standing rules: copy is marked and matches docs/skills/STANDING-RULES.md', marked && body === readFileSync(home, 'utf8').trim(), 'copy again from the home file')
  expect('standing rules: built into AGENTS.md', readFileSync(join(root, 'AGENTS.md'), 'utf8').includes('<!-- references/standing-rules.md -->'))
} else console.log('skip  standing rules: home file not present (outside the repo)')

console.log(`\n${failed ? `${failed} failed` : 'all passed'}`)
process.exit(failed ? 1 : 0)
