#!/usr/bin/env node
// scripts/openrouter-audit-case.mjs
//
// Audit a published /work/<slug> page against a short, stable subset of
// the wugweb-work eval expectations. Fetches the page, strips tags,
// feeds the visible text to a free OpenRouter model, and prints the
// findings as JSON lines: one line per check.
//
// This is a helper, not the publish gate. It flags obvious misses that
// the eval set keeps complaining about: dashes in body copy, generic
// chapter heads, overlong headings, bare metrics, banned words, and
// the "nothing was written to Notion or Sanity" statement when the
// page copy claims a write.
//
// Reads OPENROUTER_API_KEY and OPENROUTER_MODEL. See
// docs/skills/SECRETS.md. Paid routes are blocked.
//
// Usage:
//   OPENROUTER_API_KEY=... OPENROUTER_MODEL=nvidia/nemotron-3.5-lightning:free \
//     node scripts/openrouter-audit-case.mjs https://www.wugweb.com/work/cartier
//
// Exit codes: 0 ok (whether pass or fail per check), 1 model or
// network error, 2 missing env or arguments.

const key = process.env.OPENROUTER_API_KEY
if (!key) {
  console.error('Set OPENROUTER_API_KEY in your environment. See docs/skills/SECRETS.md.')
  process.exit(2)
}

const model = process.env.OPENROUTER_MODEL
if (!model) {
  console.error('Set OPENROUTER_MODEL to a verified free model, for example nvidia/nemotron-3.5-lightning:free.')
  process.exit(2)
}

if (!model.endsWith(':free')) {
  console.error(`OPENROUTER_MODEL must end with :free. Got "${model}". Paid routes are blocked by docs/skills/SECRETS.md.`)
  process.exit(2)
}

const [url] = process.argv.slice(2)
if (!url || !/^https?:\/\//i.test(url)) {
  console.error('Usage: node scripts/openrouter-audit-case.mjs <https://.../work/<slug>>')
  process.exit(2)
}

let pageText
try {
  const r = await fetch(url, { redirect: 'follow' })
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  const html = await r.text()
  pageText = stripHtml(html).slice(0, 18000)
} catch (err) {
  console.error(`Fetch failed for ${url}: ${err.message}`)
  process.exit(1)
}

const checks = [
  { id: 'no_dashes', q: 'Does the body contain any em dash (—) or en dash (–)? Answer yes or no, then quote the offending sentence if yes.' },
  { id: 'no_generic_chapters', q: 'Does any chapter heading use one of the generic labels About, Challenges, Solutions, Design Philosophy, Conclusion? Answer yes or no, then list the offending heading(s) if yes.' },
  { id: 'heading_length', q: 'Is every chapter heading 70 characters or fewer? Answer yes or no, then list any heading over 70 characters.' },
  { id: 'metrics_complete', q: 'Does every numeric claim have a value, a unit, a period and a source, or is marked as unvalidated? Answer yes or no, then quote the first incomplete claim if any.' },
  { id: 'no_banned_words', q: 'Does the body use any of these words: pivotal, robust, seamless, holistic, leverage, empower, cutting-edge? Answer yes or no, then quote the first occurrence if any.' },
  { id: 'no_placeholders', q: 'Does the body contain TBD, [INSERT, lorem or any other placeholder? Answer yes or no, then quote the first placeholder if any.' }
]

const system = [
  'You audit one case-study page against one question at a time.',
  'Reply as one short JSON object: {"id": "<id>", "pass": true|false, "evidence": "<short quote or empty>"}.',
  'Never invent a quote. If the evidence is not in the text, pass is true and evidence is empty.',
  'British English. No em or en dashes in evidence quotes.'
].join(' ')

const findings = []
for (const check of checks) {
  const user = [
    `Case-study URL: ${url}`,
    '',
    'Visible text (truncated):',
    pageText,
    '',
    `Question (id: ${check.id}): ${check.q}`,
    '',
    'Answer as one JSON object. No prose around it.'
  ].join('\n')

  const body = {
    model,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user }
    ]
  }

  let r
  try {
    r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://wugweb.com',
        'X-Title': 'wugweb-work audit'
      },
      body: JSON.stringify(body)
    })
  } catch (err) {
    console.error(`OpenRouter request failed for ${check.id}: ${err.message}`)
    process.exit(1)
  }

  if (!r.ok) {
    const text = await r.text().catch(() => '')
    console.error(`OpenRouter error ${r.status} for ${check.id}: ${text.slice(0, 300)}`)
    process.exit(1)
  }

  const data = await r.json()
  const raw = data.choices?.[0]?.message?.content ?? ''
  const parsed = parseJsonLoose(raw)
  const finding = parsed && typeof parsed === 'object'
    ? { id: check.id, pass: parsed.pass === true, evidence: String(parsed.evidence ?? '') }
    : { id: check.id, pass: false, evidence: `Model returned unparseable output: ${raw.slice(0, 200)}` }
  findings.push(finding)
  process.stdout.write(JSON.stringify(finding) + '\n')
}

const failed = findings.filter(f => !f.pass).length
process.stderr.write(`\nwugweb-work audit summary: ${findings.length - failed} pass, ${failed} fail of ${findings.length} checks\n`)
if (failed > 0) process.exitCode = 0

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function parseJsonLoose(s) {
  const match = s.match(/\{[\s\S]*\}/)
  if (!match) return null
  try { return JSON.parse(match[0]) } catch { return null }
}
