#!/usr/bin/env node
/** Self test for the skill scripts. Plain Node, no dependencies.  node scripts/test.mjs */
import { ratio } from './contrast.mjs'
import { spawnSync } from 'node:child_process'
import { writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
const here = dirname(fileURLToPath(import.meta.url))
let fail = 0
const ok = (name, cond) => { console.log(`${cond ? 'pass' : 'FAIL'}  ${name}`); if (!cond) fail++ }
ok('contrast white on blue 5.17', ratio('#ffffff', '#2563eb').toFixed(2) === '5.17')
ok('contrast white on dark blue 6.70', ratio('#ffffff', '#1d4ed8').toFixed(2) === '6.70')
ok('contrast grey on near white 2.33', ratio('#a1a1aa', '#f4f4f5').toFixed(2) === '2.33')
ok('contrast live text on surface above 4.5', ratio('#f4f4f4', '#191919') > 4.5)
const dir = mkdtempSync(join(tmpdir(), 'kits-'))
const bad = join(dir, 'bad.html')
writeFileSync(bad, '<body><section><h1>A</h1><h4>B</h4><img src="x.png"></section></body>')
const r1 = spawnSync('node', [join(here, 'kits-check-page.mjs'), bad], { encoding: 'utf8' })
ok('page check fails a bad page', r1.status === 1 && /no id/.test(r1.stdout) && /h1 followed by h4/.test(r1.stdout) && /img without alt/.test(r1.stdout))
const good = join(dir, 'good.html')
writeFileSync(good, '<body><a href="#main">Skip</a><main id="main"><section id="a" aria-labelledby="a-h"><h1 id="a-h">A</h1><h2>B</h2><img src="x.png" alt="x"></section></main></body>')
const r2 = spawnSync('node', [join(here, 'kits-check-page.mjs'), good], { encoding: 'utf8' })
ok('page check passes a good page', r2.status === 0)
const css = join(dir, 's.css')
writeFileSync(css, '.card-section {\n  max-width: 900px;\n}\n.site-header {\n  z-index: 50;\n}\n')
const r3 = spawnSync('node', [join(here, 'kits-inventory.mjs'), dir], { encoding: 'utf8' })
ok('inventory flags section max-width and nav z-index 50', /shell-no-section-max-width/.test(r3.stdout) && /nav z-index 50/.test(r3.stdout))
process.exit(fail ? 1 : 0)
