#!/usr/bin/env node
/**
 * Evals for wugweb-kits. Run from the repo root: node .claude/skills/wugweb-kits/evals/run.mjs
 * Each case is pass, fail or blocked (blocked = a precondition is missing, such as the
 * repo docs or the network). Live cases read https://wugweb.pages.dev (staging).
 */
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
const S = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts')
const run = (f, a = []) => spawnSync('node', [join(S, f), ...a], { encoding: 'utf8' })
const BASE = process.env.KITS_BASE || 'https://wugweb.pages.dev'
const repo = existsSync('src/styles/global.css')
const online = await fetch(BASE, { method: 'HEAD' }).then((r) => r.ok, () => false)
const CS = BASE + '/work/accelerating-loyalty-designing-kias-intuitive-customer-dashboard'
const csUp = online && (await fetch(CS).then((r) => r.status === 200, () => false))
const res = { pass: 0, fail: 0, blocked: 0 }
const c = (name, need, fn) => {
  let r = 'blocked'
  if (need) { try { r = fn() ? 'pass' : 'fail' } catch { r = 'fail' } }
  res[r]++; console.log(`${r.padEnd(8)} ${name}`)
}
c('validate passes', true, () => run('validate.mjs').status === 0)
c('AGENTS.md export is current', true, () => run('build.mjs', ['--check']).status === 0)
c('self test passes', true, () => run('test.mjs').status === 0)
c('doc and global.css agree (drift 0)', repo, () => run('kits-doc-drift.mjs').status === 0)
c('inventory runs on src and reports, not blocks', repo, () => run('kits-inventory.mjs', ['src/', '--findings']).status === 0)
c('inventory --block exits 1 while warnings remain', repo, () => run('kits-inventory.mjs', ['src/', '--findings', '--block']).status === 1)
for (const p of ['/', '/work', '/blog', '/services', '/about', '/contact-us', '/faq', '/footer/reviews']) {
  c(`live ${p}: labels, headings, alt, landmarks clean`, online, () => run('kits-check-page.mjs', [BASE + p]).status === 0)
}
c('live case study: every section has an id and a name (blocked if the page is not 200)', csUp, () => {
  const r = run('kits-check-page.mjs', [CS])
  return r.status === 0 && !/has no id/.test(r.stdout)
})
c('contrast: live text #f4f4f4 on #191919 passes AA', true, () => run('contrast.mjs', ['#f4f4f4', '#191919']).status === 0)
c('contrast: muted #bababa on #191919 passes AA', true, () => run('contrast.mjs', ['#bababa', '#191919']).status === 0)
console.log(`\n${res.pass} pass, ${res.fail} fail, ${res.blocked} blocked`)
process.exit(res.fail ? 1 : 0)
