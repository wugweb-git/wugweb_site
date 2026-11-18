#!/usr/bin/env node
// Checks one rendered HTML page against the audit checks in references/audit.md.
// Reads text only: no rendering, no scripts run, no network. Exit 1 on any blocker.
//
//   node check-page.mjs <page.html> [--kind work|blog|service] [--host wugweb.com] [--json]

import { readFileSync } from 'node:fs'
import { printFindings, totals } from './lib.mjs'

const args = process.argv.slice(2)
const file = args.find((a) => !a.startsWith('--') && args[args.indexOf(a) - 1] !== '--kind' && args[args.indexOf(a) - 1] !== '--host')
const opt = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined)
const kind = opt('--kind') ?? 'page'
const host = opt('--host')
const asJson = args.includes('--json')
if (!file) {
  console.error('Usage: node check-page.mjs <page.html> [--kind work|blog|service] [--host <host>] [--json]')
  process.exit(2)
}

const html = readFileSync(file, 'utf8')
const findings = []
const passed = []
const add = (severity, id, place, finding) => findings.push({ severity, id, place, finding })
const pass = (id) => passed.push(id)
const isWork = kind === 'work'
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
const attr = (tag, name) => decode(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i').exec(tag)?.slice(2).find((v) => v !== undefined) ?? '')
const hasAttr = (tag, name) => new RegExp(`\\s${name}(\\s*=|[\\s/>])`, 'i').test(tag)
const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0])
const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0])

// Title.
const titles = [...html.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)].map((m) => decode(m[1]).trim())
if (titles.length !== 1 || !titles[0]) add('BLOCKER', 'title-present', '<title>', `${titles.length} title elements`)
else {
  pass('title-present')
  const source = titles[0].replace(/\s*\|\s*Wugweb\s*$/, '')
  // House limit on wugweb.com: 51 for a case study. A blog post or service page follows the search standard, rendered 60 or fewer, checked below as title-rendered (owner, 2026-11-19).
  const sourceLimit = isWork ? 51 : null
  if (sourceLimit && source.length > sourceLimit) add('BLOCKER', 'title-length', '<title>', `source title ${source.length} characters, limit ${sourceLimit}`)
  else if (sourceLimit || kind === 'blog' || kind === 'service') pass('title-length')
  else add('LOW', 'title-length', '<title>', `source title ${source.length} characters; no limit set for kind "${kind}". Use --kind work (51); blog and service follow the rendered limit of 60`)
  if (titles[0].length > 60) add('HIGH', 'title-rendered', '<title>', `rendered title ${titles[0].length} characters, limit 60`)
  else pass('title-rendered')
}

// Description.
const desc = metas.filter((m) => /name\s*=\s*["']description["']/i.test(m)).map((m) => attr(m, 'content'))
if (desc.length !== 1) add('HIGH', 'description-length', 'meta description', `${desc.length} description tags`)
else if (desc[0].length < 140 || desc[0].length > 160) add('HIGH', 'description-length', 'meta description', `${desc[0].length} characters, range 140 to 160`)
else pass('description-length')

// H1.
const h1 = (html.match(/<h1\b/gi) || []).length
if (h1 !== 1) add('HIGH', 'h1-single', '<h1>', `${h1} h1 elements`)
else pass('h1-single')

// Canonical.
const canon = links.filter((l) => /rel\s*=\s*["']canonical["']/i.test(l)).map((l) => attr(l, 'href'))
if (canon.length !== 1) add('BLOCKER', 'canonical', 'link canonical', `${canon.length} canonical tags`)
else {
  let u = null
  try { u = new URL(canon[0]) } catch { /* reported below */ }
  if (!u || u.protocol !== 'https:') add('BLOCKER', 'canonical', 'link canonical', `not an absolute https address: ${canon[0]}`)
  else if (host && u.hostname !== host) add('BLOCKER', 'canonical', 'link canonical', `host ${u.hostname}, expected ${host}`)
  else pass('canonical')
}

// Share tags.
const metaBy = (key) => metas.find((m) => new RegExp(`(property|name)\\s*=\\s*["']${key.replace(/[.:]/g, '\\$&')}["']`, 'i').test(m))
const SHARE = ['og:title', 'og:type', 'og:description', 'og:url', 'og:site_name', 'og:image', 'og:image:alt', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt']
const missingShare = SHARE.filter((k) => !metaBy(k) || !attr(metaBy(k), 'content'))
if (missingShare.length) add('MEDIUM', 'share-tags', 'meta og and twitter', `${SHARE.length - missingShare.length} of ${SHARE.length}; missing ${missingShare.join(', ')}`)
else pass('share-tags')
const ogUrl = metaBy('og:url') ? attr(metaBy('og:url'), 'content') : ''
if (ogUrl && canon.length === 1 && ogUrl !== canon[0]) add('MEDIUM', 'share-url', 'og:url', `differs from the canonical`)
else if (ogUrl) pass('share-url')

// Robots meta.
const robots = metas.filter((m) => /name\s*=\s*["'](robots|googlebot)["']/i.test(m)).map((m) => attr(m, 'content').toLowerCase())
if (robots.some((r) => /noindex/.test(r))) add('BLOCKER', 'robots-meta', 'meta robots', 'noindex')
else pass('robots-meta')

// JSON-LD.
const blocks = [...html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1])
const nodes = []
let parseFail = 0
const collect = (v) => {
  if (Array.isArray(v)) return v.forEach(collect)
  if (v && typeof v === 'object') {
    if (v['@type']) nodes.push(v)
    for (const k of Object.keys(v)) if (k !== '@context') collect(v[k])
  }
}
let badContext = 0
for (const b of blocks) {
  try {
    const j = JSON.parse(b)
    if ([].concat(j).some((x) => x && x['@context'] !== 'https://schema.org')) badContext++
    collect(j)
  } catch { parseFail++ }
}
if (parseFail) add('BLOCKER', 'schema-parses', 'JSON-LD', `${parseFail} of ${blocks.length} blocks do not parse`)
else pass('schema-parses')
if (badContext) add('LOW', 'schema-context', 'JSON-LD', `${badContext} ${badContext === 1 ? 'block does' : 'blocks do'} not use @context https://schema.org`)
else if (blocks.length) pass('schema-context')
const typesOf = (n) => [].concat(n['@type'])
const types = new Set(nodes.flatMap(typesOf))
const banned = ['HowTo', 'Review', 'AggregateRating'].filter((t) => types.has(t))
if (banned.length) add('BLOCKER', 'schema-banned-type', 'JSON-LD', `${banned.join(', ')} present`)
else pass('schema-banned-type')
const emptyFaq = nodes.filter((n) => typesOf(n).includes('FAQPage') && !(Array.isArray(n.mainEntity) ? n.mainEntity.length : n.mainEntity))
if (emptyFaq.length) add('HIGH', 'schema-faq-content', 'FAQPage', 'no questions in mainEntity')
else pass('schema-faq-content')
if (isWork) {
  const missing = ['WebPage', 'CreativeWork', 'BreadcrumbList'].filter((t) => !types.has(t))
  if (missing.length) add('HIGH', 'schema-required-types', 'JSON-LD', `missing ${missing.join(', ')}`)
  else pass('schema-required-types')
  const works = nodes.filter((n) => typesOf(n).includes('CreativeWork'))
  const bad = works.filter((n) => !n.creator || !n.publisher || n.author)
  if (works.length && bad.length) add('HIGH', 'schema-no-author', 'CreativeWork', 'needs creator and publisher, and no author')
  else if (works.length) pass('schema-no-author')
}

// Images.
const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0])
const noAlt = imgs.filter((t) => !hasAttr(t, 'alt')).length
const noDim = imgs.filter((t) => !hasAttr(t, 'width') || !hasAttr(t, 'height')).length
if (noAlt) add('HIGH', 'img-alt', `<img> ${noAlt} of ${imgs.length}`, 'no alt attribute')
else pass('img-alt')
if (noDim) add('MEDIUM', 'img-dimensions', `<img> ${noDim} of ${imgs.length}`, 'no width and height')
else pass('img-dimensions')

// Text present in the server HTML.
const bodyHtml = (/<body\b[^>]*>([\s\S]*)<\/body>/i.exec(html)?.[1] ?? html)
const text = decode(bodyHtml.replace(/<(script|style|noscript|template)\b[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' '))
const words = (text.match(/[A-Za-z0-9][\w'’.-]*/g) || []).length
if (words < 150) add('MEDIUM', 'server-html-text', 'body', `${words} words in server HTML`)
else pass('server-html-text')

const notChecked = [
  'anything added by scripts after load',
  'redirects, firewall and bot settings, sitemap',
  'Core Web Vitals',
  'whether schema values, FAQPage questions included, match what the page shows',
  'whether alt text describes the image',
  'the X-Robots-Tag header',
  'uniqueness of title and description across the site',
  'citability of each section',
]

const sorted = findings
if (asJson) console.log(JSON.stringify({ file, kind, words, images: imgs.length, schemaTypes: [...types], findings, passed, notChecked }, null, 2))
else {
  console.log(`1 page (${kind}). ${totals(findings)}. ${passed.length} ${passed.length === 1 ? 'check' : 'checks'} passed.\n`)
  printFindings(sorted)
  console.log(`\nNot checked: ${notChecked.join('; ')}.`)
}
process.exit(findings.some((f) => f.severity === 'BLOCKER') ? 1 : 0)
