#!/usr/bin/env node
// Self-test of the check scripts on the fixtures in examples/. Exit 1 on any failure.
//
//   node test.mjs

import { execFileSync } from 'node:child_process'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { SKILL_DIR as root } from './lib.mjs'

let failed = 0
const ok = (name, cond) => { console.log(`${cond ? 'ok  ' : 'FAIL'}  ${name}`); if (!cond) failed++ }
function run(script, args) {
  try {
    return { code: 0, out: execFileSync(process.execPath, [join(root, 'scripts', script), ...args], { encoding: 'utf8' }) }
  } catch (e) {
    return { code: e.status, out: String(e.stdout) }
  }
}

const pass = run('check-page.mjs', [join(root, 'examples/page-pass.html'), '--kind', 'work', '--host', 'wugweb.com', '--json'])
const p = JSON.parse(pass.out)
ok('page-pass exits 0', pass.code === 0)
ok('page-pass has no findings', p.findings.length === 0)
ok('page-pass passes 18 checks', p.passed.length === 18)
ok('page-pass reads the three required schema types', ['WebPage', 'CreativeWork', 'BreadcrumbList'].every((t) => p.schemaTypes.includes(t)))

const fail = run('check-page.mjs', [join(root, 'examples/page-fail.html'), '--kind', 'work', '--host', 'wugweb.com', '--json'])
const f = JSON.parse(fail.out)
const ids = (sev) => f.findings.filter((x) => x.severity === sev).map((x) => x.id).sort()
ok('page-fail exits 1', fail.code === 1)
ok('page-fail has 5 blockers', ids('BLOCKER').join() === 'canonical,robots-meta,schema-banned-type,schema-parses,title-length')
ok('page-fail has 7 high', ids('HIGH').join() === 'description-length,h1-single,img-alt,schema-faq-content,schema-no-author,schema-required-types,title-rendered')
ok('page-fail has 4 medium', ids('MEDIUM').join() === 'img-dimensions,server-html-text,share-tags,share-url')
ok('page-fail has 1 low', ids('LOW').join() === 'schema-context')
ok('page-fail reports HowTo as banned', f.findings.some((x) => x.id === 'schema-banned-type' && /HowTo/.test(x.finding)))
ok('page-fail does not ban FAQPage', !f.findings.some((x) => x.id === 'schema-banned-type' && /FAQPage/.test(x.finding)))

const other = run('check-page.mjs', [join(root, 'examples/page-fail.html'), '--json'])
const o = JSON.parse(other.out)
ok('a page with no kind gets title length as LOW only', o.findings.some((x) => x.id === 'title-length' && x.severity === 'LOW'))
const blog = JSON.parse(run('check-page.mjs', [join(root, 'examples/page-fail.html'), '--kind', 'blog', '--json']).out)
ok('a blog post has no source title limit', !blog.findings.some((x) => x.id === 'title-length'))
const service = JSON.parse(run('check-page.mjs', [join(root, 'examples/page-pass.html'), '--kind', 'service', '--json']).out)
ok('a service page within the source limit passes title length', service.passed.includes('title-length'))

const robots = run('check-robots.mjs', [join(root, 'examples/robots.txt'), '--path', '/work/care-booking', '--json'])
const r = JSON.parse(robots.out)
const state = (bot) => r.rows.find((x) => x.bot === bot)?.allowed
ok('Googlebot is allowed', state('Googlebot') === true)
ok('PerplexityBot is blocked on /work/', state('PerplexityBot') === false)
ok('GPTBot and CCBot are blocked by a shared group', state('GPTBot') === false && state('CCBot') === false)
ok('ClaudeBot falls back to the * group', r.rows.find((x) => x.bot === 'ClaudeBot')?.via === '*')
ok('the sitemap line is read', r.sitemaps.length === 1)
const strict = run('check-robots.mjs', [join(root, 'examples/robots.txt'), '--path', '/work/care-booking', '--strict'])
ok('--strict exits 1 when a search bot is blocked', strict.code === 1)
const home = run('check-robots.mjs', [join(root, 'examples/robots.txt'), '--path', '/', '--strict'])
ok('--strict exits 0 for / where every search bot is allowed', home.code === 0)

const scoreGood = run('score-page.mjs', [join(root, 'examples/score-good.html'), '--keyword', 'care booking', '--host', 'wugweb.com', '--json'])
const sg = JSON.parse(scoreGood.out)
ok('score-good scores great (>80)', sg.score > 80 && sg.grade === 'great')
ok('score-good puts the keyword in the title', sg.tests.find((t) => t.id === 'keyword-in-title')?.pass === true)
const scoreBad = run('score-page.mjs', [join(root, 'examples/page-pass.html'), '--keyword', 'care booking', '--host', 'wugweb.com', '--json'])
const sb = JSON.parse(scoreBad.out)
ok('a thin page off-keyword scores bad (<=50)', sb.score <= 50 && sb.grade === 'bad')
ok('keyword-not-used-before is a warning, not scored', sg.tests.find((t) => t.id === 'keyword-not-used-before')?.max === 0)

// Standing rules: the marked copy matches the home file, and the export carries it.
{
  const home = join(root, '..', '..', '..', 'docs', 'skills', 'STANDING-RULES.md')
  const copy = readFileSync(join(root, 'references', 'standing-rules.md'), 'utf8')
  const marked = (f) => /marked copy/i.test(readFileSync(join(root, f), 'utf8'))
  ok('export carries the marked copy of the standing rules', marked('AGENTS.md') && marked(join('export', 'wugweb-seo.md')))
  const exported = readFileSync(join(root, 'export', 'wugweb-seo.md'), 'utf8')
  ok('export is AGENTS.md under its header', exported.endsWith(readFileSync(join(root, 'AGENTS.md'), 'utf8')))
  if (existsSync(home)) ok('standing-rules copy matches the home file', copy.endsWith(readFileSync(home, 'utf8')))
}

console.log(`\n${failed ? `${failed} failed` : 'All passed'}.`)
process.exit(failed ? 1 : 0)
