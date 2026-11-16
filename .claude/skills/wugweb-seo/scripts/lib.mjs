// Shared helpers for the skill's own scripts. Zero dependencies. Node 18 or later.

import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export const SKILL_DIR = join(dirname(fileURLToPath(import.meta.url)), '..')
export const SEVERITIES = ['BLOCKER', 'HIGH', 'MEDIUM', 'LOW']

/** Markdown with fenced blocks and inline code removed, for prose checks. */
export function proseOf(md) {
  return md.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '')
}

/** Sort findings by severity, then print them in the house shape. */
export function printFindings(findings, place = 18, what = 42) {
  const sorted = [...findings].sort((a, b) => SEVERITIES.indexOf(a.severity) - SEVERITIES.indexOf(b.severity))
  for (const f of sorted) console.log(`${f.severity.padEnd(8)} ${f.place.padEnd(place)} ${f.finding.padEnd(what)} ${f.id}`)
  return sorted
}

/** "2 blockers, 1 high" from a list of findings. */
export function totals(findings) {
  const n = (s) => findings.filter((f) => f.severity === s).length
  const parts = []
  if (n('BLOCKER')) parts.push(`${n('BLOCKER')} ${n('BLOCKER') === 1 ? 'blocker' : 'blockers'}`)
  for (const s of ['HIGH', 'MEDIUM', 'LOW']) if (n(s)) parts.push(`${n(s)} ${s.toLowerCase()}`)
  return parts.length ? parts.join(', ') : 'no findings'
}
