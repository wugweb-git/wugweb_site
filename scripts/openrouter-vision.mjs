#!/usr/bin/env node
// scripts/openrouter-vision.mjs
//
// One-shot vision call against a free OpenRouter vision model. Looks
// at an image and answers a prompt about it. The owner's typical use:
// read a screen from R2 and describe what the manifest should say.
//
// Reads OPENROUTER_API_KEY and OPENROUTER_VISION_MODEL from the
// environment. See docs/skills/SECRETS.md. Paid routes are blocked.
//
// Usage:
//   OPENROUTER_API_KEY=... OPENROUTER_VISION_MODEL=nvidia/nemotron-3.5-super-vl:free \
//     node scripts/openrouter-vision.mjs <image-url-or-path> "What is in this image?"
//
// The image argument can be:
//   - an https URL the model can fetch directly (preferred for R2 assets)
//   - a local file path, which the script reads and sends as a data URL
//
// Exit codes: 0 ok, 1 model or network error, 2 missing env or arguments.

import { readFile } from 'node:fs/promises'
import { extname } from 'node:path'

const key = process.env.OPENROUTER_API_KEY
if (!key) {
  console.error('Set OPENROUTER_API_KEY in your environment. See docs/skills/SECRETS.md.')
  process.exit(2)
}

const model = process.env.OPENROUTER_VISION_MODEL
if (!model) {
  console.error('Set OPENROUTER_VISION_MODEL to a verified free vision model, for example nvidia/nemotron-3.5-super-vl:free.')
  process.exit(2)
}

if (!model.endsWith(':free')) {
  console.error(`OPENROUTER_VISION_MODEL must end with :free. Got "${model}". Paid routes are blocked by docs/skills/SECRETS.md.`)
  process.exit(2)
}

const [imgArg, ...promptParts] = process.argv.slice(2)
if (!imgArg) {
  console.error('Usage: node scripts/openrouter-vision.mjs <image-url-or-path> [prompt]')
  process.exit(2)
}

const prompt = promptParts.join(' ').trim() ||
  'Describe this image in one or two sentences: subject, visible text, one notable detail. British English.'

const MIME = {
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml'
}

let imageUrl
if (/^https?:\/\//i.test(imgArg)) {
  imageUrl = imgArg
} else {
  const buf = await readFile(imgArg).catch(err => {
    console.error(`Cannot read image file "${imgArg}": ${err.message}`)
    process.exit(2)
  })
  const mime = MIME[extname(imgArg).toLowerCase()] || 'application/octet-stream'
  imageUrl = `data:${mime};base64,${buf.toString('base64')}`
}

const body = {
  model,
  messages: [
    {
      role: 'user',
      content: [
        { type: 'text', text: prompt },
        { type: 'image_url', image_url: { url: imageUrl } }
      ]
    }
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
      'X-Title': 'wugweb-work vision'
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
