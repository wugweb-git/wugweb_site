#!/usr/bin/env node
// On-page keyphrase score, modelled on Rank Math's client-side engine
// (seo-by-rank-math 1.0.280, analyzer.js). Weights and grade bands are extracted
// from it, not invented. Scores one page against one focus keyphrase and returns
// a 0 to 100 number with a per-test breakdown. It scores; it writes no copy.
//
//   node score-page.mjs <page.html> --keyword "<phrase>" [--host <host>] [--lang en] [--json]
//
// Grade bands (the engine's own): bad <=50, ok 51 to 80, great >80.
// Node 18 or later, no packages, no network.

import { readFileSync } from 'node:fs'

const args = process.argv.slice(2)
const opt = (n) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined)
const file = args.find((a, i) => !a.startsWith('--') && !['--keyword', '--host', '--lang'].includes(args[i - 1]))
const keyword = (opt('--keyword') ?? '').trim()
const host = opt('--host')
const lang = (opt('--lang') ?? 'en').toLowerCase()
const asJson = args.includes('--json')
if (!file) {
  console.error('Usage: node score-page.mjs <page.html> --keyword "<phrase>" [--host <host>] [--lang en] [--json]')
  process.exit(2)
}

const html = readFileSync(file, 'utf8')
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
const attr = (tag, name) => decode(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i').exec(tag)?.slice(2).find((v) => v !== undefined) ?? '')

// Parse the pieces.
const title = decode((/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? '')).trim()
const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0])
const metaDesc = (() => { const m = metas.find((t) => /name\s*=\s*["']description["']/i.test(t)); return m ? attr(m, 'content') : '' })()
const canon = (() => { const l = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]).find((t) => /rel\s*=\s*["']canonical["']/i.test(t)); return l ? attr(l, 'href') : '' })()
let permPath = ''
try { permPath = canon ? new URL(canon).pathname : '' } catch { permPath = canon }

const bodyHtml = /<body\b[^>]*>([\s\S]*)<\/body>/i.exec(html)?.[1] ?? html
const stripped = bodyHtml.replace(/<(script|style|noscript|template)\b[\s\S]*?<\/\1>/gi, ' ')
const text = decode(stripped.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()
const words = text.match(/[A-Za-z0-9][\w''.-]*/g) || []
const total = words.length
const headings = [...bodyHtml.matchAll(/<h[2-6]\b[^>]*>([\s\S]*?)<\/h[2-6]>/gi)].map((m) => decode(m[1].replace(/<[^>]+>/g, ' ')).trim())
const imgs = [...bodyHtml.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0])
const alts = imgs.map((t) => attr(t, 'alt'))
const videoCount = (bodyHtml.match(/<video\b|<iframe\b[^>]*(youtube|vimeo|wistia)/gi) || []).length
const anchors = [...bodyHtml.matchAll(/<a\b[^>]*href\s*=\s*("([^"]*)"|'([^']*)')[^>]*>/gi)].map((m) => decode(m.slice(2).find((v) => v !== undefined) ?? ''))
const paras = [...bodyHtml.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => (decode(m[1].replace(/<[^>]+>/g, ' ')).match(/[A-Za-z0-9][\w''.-]*/g) || []).length)
const hasToc = /\b(id|class)\s*=\s*["'][^"']*(toc|table-of-contents)[^"']*["']/i.test(bodyHtml) || anchors.filter((h) => h.startsWith('#')).length >= 3

const linkKind = (href) => {
  if (!href) return 'none'
  if (/^#/.test(href) || /^(mailto|tel):/i.test(href)) return 'none'
  if (/^\/(?!\/)/.test(href) || !/^[a-z]+:\/\//i.test(href)) return 'internal'
  try { const u = new URL(href); return host && u.hostname === host ? 'internal' : 'external' } catch { return 'external' }
}
const kinds = anchors.map(linkKind)
const internalLinks = kinds.filter((k) => k === 'internal').length
const externalLinks = kinds.filter((k) => k === 'external').length

// Keyphrase matching.
const kw = keyword.toLowerCase()
const lc = (s) => s.toLowerCase()
const firstTenth = words.slice(0, Math.max(1, Math.ceil(total * 0.1))).join(' ').toLowerCase()
const kwWordCount = kw ? (kw.match(/\S+/g) || []).length : 0
const occurrences = kw ? (lc(text).match(new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length : 0
const density = kw && total ? (occurrences * kwWordCount / total) * 100 : 0

// Title readability word lists (public; no plugin file copied).
const POWER = ['free','instantly','new','proven','ultimate','essential','powerful','guaranteed','exclusive','secret','effortless','remarkable','stunning','simple','fast','bold','honest','real','complete','definitive','smart','clear','sharp']
const SENTIMENT = ['best','better','good','great','love','win','gain','boost','improve','trust','clear','strong','worst','bad','lose','fail','risk','drop','slow','broken','fix','save']
const titleLc = lc(title)
const hasPower = POWER.some((w) => new RegExp(`\\b${w}\\b`).test(titleLc))
const hasSentiment = lang === 'en' ? SENTIMENT.some((w) => new RegExp(`\\b${w}\\b`).test(titleLc)) : null
const hasNumber = /\d/.test(title)

const tests = []
const add = (id, points, max, pass, note = '') => tests.push({ id, points, max, pass, note })

if (kw) {
  const titlePts = lang === 'en' ? 36 : 38
  add('keyword-in-title', titleLc.includes(kw) ? titlePts : 0, titlePts, titleLc.includes(kw))
  add('keyword-in-permalink', lc(permPath).includes(kw.replace(/\s+/g, '-')) || lc(permPath).includes(kw) ? 5 : 0, 5, lc(permPath).includes(kw.replace(/\s+/g, '-')) || lc(permPath).includes(kw))
  add('keyword-in-first-10pct', firstTenth.includes(kw) ? 3 : 0, 3, firstTenth.includes(kw))
  add('keyword-in-content', occurrences > 0 ? 3 : 0, 3, occurrences > 0)
  add('keyword-in-subheading', headings.some((h) => lc(h).includes(kw)) ? 3 : 0, 3, headings.some((h) => lc(h).includes(kw)))
  add('keyword-in-image-alt', alts.some((a) => lc(a).includes(kw)) ? 2 : 0, 2, alts.some((a) => lc(a).includes(kw)))
  add('keyword-in-description', lc(metaDesc).includes(kw) ? 2 : 0, 2, lc(metaDesc).includes(kw))
  add('title-starts-with-keyword', titleLc.startsWith(kw) ? 3 : 0, 3, titleLc.startsWith(kw))
  const dPts = density >= 1 ? 6 : density >= 0.76 ? 3 : density >= 0.5 ? 2 : 0
  add('keyword-density', dPts, 6, dPts > 0, `${density.toFixed(2)}%`)
  add('keyword-not-used-before', 0, 0, null, 'warning: needs a site-wide phrase map; not scored')
}

const lenPts = total >= 2500 ? 8 : total >= 2000 ? 5 : total >= 1500 ? 4 : total >= 1000 ? 3 : total >= 600 ? 2 : 0
add('content-length', lenPts, 8, lenPts > 0, `${total} words`)
const imgPts = imgs.length >= 4 ? 6 : imgs.length === 3 ? 4 : imgs.length === 2 ? 2 : imgs.length === 1 ? 1 : 0
const vidPts = videoCount >= 2 ? 2 : videoCount === 1 ? 1 : 0
add('has-image-or-video', Math.min(6, imgPts + vidPts), 6, imgPts + vidPts > 0, `${imgs.length} images, ${videoCount} videos`)
const shortParas = paras.length > 0 && paras.every((n) => n <= 120)
add('short-paragraphs', shortParas ? 3 : 0, 3, shortParas)
add('table-of-contents', hasToc ? 2 : 0, 2, hasToc)
add('internal-link', internalLinks > 0 ? 5 : 0, 5, internalLinks > 0)
add('external-link', externalLinks > 0 ? 4 : 0, 4, externalLinks > 0)
add('not-all-links-external', (internalLinks + externalLinks) === 0 ? 0 : (internalLinks > 0 ? 2 : 0), 2, internalLinks > 0)
add('permalink-length', permPath && permPath.length <= 75 ? 4 : 0, 4, !!permPath && permPath.length <= 75, `${permPath.length} chars`)
add('title-sentiment', hasSentiment ? 1 : 0, 1, hasSentiment, lang === 'en' ? '' : 'null for non-English')
add('title-power-word', hasPower ? 1 : 0, 1, hasPower)
add('title-number', hasNumber ? 1 : 0, 1, hasNumber)

const scored = tests.filter((t) => t.max > 0)
const earned = scored.reduce((s, t) => s + t.points, 0)
const max = scored.reduce((s, t) => s + t.max, 0)
const score = max ? Math.round((earned / max) * 100) : 0
const grade = score <= 50 ? 'bad' : score <= 80 ? 'ok' : 'great'

if (asJson) {
  console.log(JSON.stringify({ file, keyword: keyword || null, score, grade, earned, max, tests }, null, 2))
} else {
  console.log(`On-page keyphrase score: ${score}/100 (${grade}).${keyword ? ` Focus keyphrase: "${keyword}".` : ' No --keyword given; keyphrase tests skipped.'}\n`)
  for (const t of tests) {
    const mark = t.pass === null ? 'warn' : t.pass ? 'ok  ' : 'FAIL'
    console.log(`${mark}  ${String(t.points)}/${t.max}  ${t.id}${t.note ? `  (${t.note})` : ''}`)
  }
  console.log(`\nEarned ${earned} of ${max} applicable points. Bands: bad <=50, ok 51 to 80, great >80.`)
  console.log('This score reports; it writes no copy. Fixes go to wugweb-work (wording) or a developer (markup).')
}
