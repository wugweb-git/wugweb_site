#!/usr/bin/env node
/**
 * Check rendered HTML against the label rules.
 *   node scripts/kits-check-page.mjs page.html
 *   node scripts/kits-check-page.mjs https://wugweb.pages.dev/work
 * Checks: every section has an id and a name, no dangling aria-labelledby, no duplicate
 * ids, one h1, no skipped heading level, images have alt, a skip link and a main landmark.
 * Static HTML only. Layout measurements at 375, 768 and 1200 need a browser, by hand.
 */
import { readFile } from 'node:fs/promises'
const src = process.argv[2]
if (!src) { console.error('usage: node scripts/kits-check-page.mjs <file-or-url>'); process.exit(2) }
const html = /^https?:/.test(src) ? await (await fetch(src)).text() : await readFile(src, 'utf8')
const body = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/g, '')
const findings = []
const add = (sev, rule, msg) => findings.push(`${sev.padEnd(7)} ${rule}  ${msg}`)
const ids = [...body.matchAll(/\sid=["']([^"']+)["']/g)].map((m) => m[1])
const idSet = new Set(ids)
const dup = ids.filter((v, i) => ids.indexOf(v) !== i)
for (const d of new Set(dup)) add('HIGH', 'label-id-and-name', `duplicate id "${d}"`)
let n = 0
for (const m of body.matchAll(/<section\b([^>]*)>/gi)) {
  n++
  const a = m[1]
  const id = /\sid=["']([^"']+)["']/.exec(' ' + a)?.[1]
  const lb = /aria-labelledby=["']([^"']+)["']/.exec(a)?.[1]
  const al = /aria-label=["'][^"']+["']/.test(a)
  if (!id) add('BLOCKER', 'label-id-and-name', `section ${n} has no id`)
  if (!lb && !al) add('BLOCKER', 'label-id-and-name', `section ${n}${id ? ' #' + id : ''} has no accessible name`)
  if (lb && !lb.split(/\s+/).every((x) => idSet.has(x))) add('HIGH', 'label-labelledby-stable-heading', `section ${n}${id ? ' #' + id : ''} aria-labelledby points to a missing id`)
}
const heads = [...body.matchAll(/<h([1-6])\b/gi)].map((m) => +m[1])
const h1 = heads.filter((h) => h === 1).length
if (h1 !== 1) add('HIGH', 'label-heading-order', `${h1} h1 elements, expected 1`)
heads.forEach((h, i) => { if (i && h > heads[i - 1] + 1) add('HIGH', 'label-heading-order', `h${heads[i - 1]} followed by h${h}`) })
for (const m of body.matchAll(/<img\b([^>]*)>/gi)) if (!/\salt=/.test(' ' + m[1])) add('HIGH', 'label-alt-always', `img without alt: ${(/src=["']([^"']+)/.exec(m[1]) || [, '?'])[1]}`)
if (!/<main\b/i.test(body)) add('HIGH', 'label-skip-and-landmarks', 'no main landmark')
if (!/href=["']#(main|content|main-content)["']/i.test(body)) add('HIGH', 'label-skip-and-landmarks', 'no skip link')
console.log(`${n} sections, ${heads.length} headings, ${ids.length} ids`)
for (const f of findings) console.log(f)
console.log(`${findings.length} finding(s)`)
process.exit(findings.some((f) => f.startsWith('BLOCKER')) ? 1 : 0)
