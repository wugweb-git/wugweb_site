#!/usr/bin/env node
// Resolves, for each named bot, whether robots.txt allows one path.
// Longest matching rule wins; Allow wins a tie. No network.
// Exit 1 only with --strict, when a search or citation bot is blocked.
//
//   node check-robots.mjs <robots.txt> [--path /work/slug] [--strict] [--json]

import { readFileSync } from 'node:fs'

const args = process.argv.slice(2)
const file = args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--path')
const path = args.includes('--path') ? args[args.indexOf('--path') + 1] : '/'
if (!file) {
  console.error('Usage: node check-robots.mjs <robots.txt> [--path <path>] [--strict] [--json]')
  process.exit(2)
}

export const BOTS = {
  search: ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Perplexity-User', 'Claude-SearchBot', 'Claude-User'],
  training: ['GPTBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Bytespider', 'meta-externalagent'],
}

// Parse into groups: { agents: [...], rules: [{ allow, pattern }] }.
const groups = []
const sitemaps = []
let current = null
let lastWasAgent = false
for (const raw of readFileSync(file, 'utf8').split(/\r?\n/)) {
  const line = raw.replace(/#.*$/, '').trim()
  const m = /^([A-Za-z-]+)\s*:\s*(.*)$/.exec(line)
  if (!m) continue
  const key = m[1].toLowerCase()
  const value = m[2].trim()
  if (key === 'user-agent') {
    if (!lastWasAgent) { current = { agents: [], rules: [] }; groups.push(current) }
    current.agents.push(value.toLowerCase())
    lastWasAgent = true
  } else {
    lastWasAgent = false
    if (key === 'sitemap') sitemaps.push(value)
    else if (current && (key === 'allow' || key === 'disallow')) current.rules.push({ allow: key === 'allow', pattern: value })
  }
}

const toRegex = (p) => new RegExp('^' + p.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\\\$$/, '$'))
function resolve(bot) {
  const name = bot.toLowerCase()
  let group = groups.find((g) => g.agents.includes(name))
  let via = bot
  if (!group) { group = groups.find((g) => g.agents.includes('*')); via = '*' }
  if (!group) return { allowed: true, via: 'no group', rule: 'none' }
  let best = null
  for (const r of group.rules) {
    if (r.pattern === '') continue
    if (!toRegex(r.pattern).test(path)) continue
    if (!best || r.pattern.length > best.pattern.length || (r.pattern.length === best.pattern.length && r.allow)) best = r
  }
  return { allowed: best ? best.allow : true, via, rule: best ? `${best.allow ? 'Allow' : 'Disallow'}: ${best.pattern}` : 'no matching rule' }
}

const rows = Object.entries(BOTS).flatMap(([group, bots]) => bots.map((bot) => ({ group, bot, ...resolve(bot) })))
const blockedSearch = rows.filter((r) => r.group === 'search' && !r.allowed)

if (args.includes('--json')) console.log(JSON.stringify({ file, path, sitemaps, rows }, null, 2))
else {
  console.log(`robots.txt for ${path}. ${blockedSearch.length} search or citation ${blockedSearch.length === 1 ? 'bot' : 'bots'} blocked. ${sitemaps.length} sitemap ${sitemaps.length === 1 ? 'line' : 'lines'}.\n`)
  for (const r of rows) console.log(`${(r.allowed ? 'allowed' : 'BLOCKED').padEnd(8)} ${r.group.padEnd(9)} ${r.bot.padEnd(19)} ${r.rule} (group ${r.via})`)
  if (!sitemaps.length) console.log('\nHIGH     robots.txt         no Sitemap line                          sitemap-listed')
  console.log('\nNot checked: firewall and bot settings that block crawlers before robots.txt is read; whether each bot obeys the file; bot names added since this list.')
  console.log('Training bots are the owner\'s choice. Report them; do not change them.')
}
process.exit(args.includes('--strict') && blockedSearch.length ? 1 : 0)
