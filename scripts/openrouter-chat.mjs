#!/usr/bin/env node
// scripts/openrouter-chat.mjs
//
// One-shot chat completion against a free OpenRouter model.
// Reads OPENROUTER_API_KEY and OPENROUTER_MODEL from the environment.
// Prints the model's reply on stdout. Prints errors on stderr.
// See docs/skills/SECRETS.md. Paid routes are blocked.
//
// Usage:
//   OPENROUTER_API_KEY=... OPENROUTER_MODEL=nvidia/nemotron-3.5-lightning:free \
//     node scripts/openrouter-chat.mjs "Your prompt goes here"
//
//   echo "Your prompt" | node scripts/openrouter-chat.mjs
//
// Exit codes: 0 ok, 1 model or network error, 2 missing or wrong environment.

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

const args = process.argv.slice(2)
let prompt = args.join(' ').trim()
if (!prompt) {
  // Fall back to stdin.
  const chunks = []
  for await (const chunk of process.stdin) chunks.push(chunk)
  prompt = Buffer.concat(chunks).toString('utf8').trim()
}
if (!prompt) {
  console.error('Usage: node scripts/openrouter-chat.mjs <prompt>   (or pipe the prompt on stdin)')
  process.exit(2)
}

const system = [
  'You are a careful assistant that reads a brief and answers it.',
  'Reply in short, plain English, result first. British English.',
  'No em dashes or en dashes in visible output.',
  'Never invent a number, quote or fact.'
].join(' ')

const body = {
  model,
  messages: [
    { role: 'system', content: system },
    { role: 'user', content: prompt }
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
      'X-Title': 'wugweb-work'
    },
    body: JSON.stringify(body)
  })
} catch (err) {
  console.error('OpenRouter request failed:', err.message)
  process.exit(1)
}

if (!r.ok) {
  const text = await r.text().catch(() => '')
  console.error(`OpenRouter error ${r.status}: ${text.slice(0, 500)}`)
  process.exit(1)
}

const data = await r.json()
const out = data.choices?.[0]?.message?.content ?? ''
if (!out) {
  console.error('OpenRouter returned no content. Full response:')
  console.error(JSON.stringify(data, null, 2).slice(0, 2000))
  process.exit(1)
}
process.stdout.write(out)
if (!out.endsWith('\n')) process.stdout.write('\n')
