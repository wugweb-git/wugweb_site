import { readFile, readdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export const SKILL_DIR = join(dirname(fileURLToPath(import.meta.url)), '..')
export const RULES_DIR = join(SKILL_DIR, 'rules')

export const VALID_IMPACTS = [
  'CRITICAL',
  'HIGH',
  'MEDIUM-HIGH',
  'MEDIUM',
  'LOW-MEDIUM',
  'LOW',
]

/** Minimal frontmatter parser — flat `key: value` pairs only, no YAML dependency. */
export function parseFrontmatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(text)
  if (!m) return { data: null, body: text }
  const data = {}
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line)
    if (!kv) continue
    data[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '')
  }
  return { data, body: m[2] }
}

/** Labelled fenced code blocks: `**Incorrect:**` … ```lang … ``` */
export function parseExamples(body) {
  const out = []
  const re = /^\*\*([^*\n]+)\*\*[^\n]*\n+```(\w*)\n([\s\S]*?)^```/gm
  let m
  while ((m = re.exec(body))) {
    out.push({ label: m[1].trim(), lang: m[2], code: m[3].trim() })
  }
  return out
}

/** Section ids and titles, in declaration order, from rules/_sections.md */
export async function readSections() {
  const text = await readFile(join(RULES_DIR, '_sections.md'), 'utf8')
  const re = /^##\s*\d+\.\s*(.+?)\s*\(([a-z0-9-]+)\)\s*$/gm
  const sections = []
  let m
  while ((m = re.exec(text))) {
    const after = text.slice(m.index)
    const impact = /\*\*Impact:\*\*\s*([A-Z-]+)/.exec(after)
    const desc = /\*\*Description:\*\*\s*([\s\S]*?)(?=\n##\s|\n*$)/.exec(after)
    sections.push({
      id: m[2],
      title: m[1],
      order: sections.length + 1,
      impact: impact ? impact[1] : 'MEDIUM',
      description: desc ? desc[1].trim().replace(/\s*\n\s*/g, ' ') : '',
    })
  }
  return sections
}

export async function readRules() {
  const files = (await readdir(RULES_DIR))
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .sort()

  return Promise.all(
    files.map(async (file) => {
      const text = await readFile(join(RULES_DIR, file), 'utf8')
      const { data, body } = parseFrontmatter(text)
      const id = file.replace(/\.md$/, '')
      return {
        id,
        file,
        section: id.split('-')[0],
        data: data ?? {},
        body: body ?? '',
        examples: parseExamples(body ?? ''),
        explanation: (body ?? '')
          .replace(/^##\s+.*$/m, '')
          .split(/\n\*\*/)[0]
          .trim(),
      }
    }),
  )
}

/** Standing rules: the skill's marked copy against the home file. Returns a list of problems. */
export const STANDING_MARK = /^<!-- Marked copy of docs\/skills\/STANDING-RULES\.md[^\n]*-->\n\n/
export function standingDrift(home, copy, skillText = '') {
  const out = []
  if (!STANDING_MARK.test(copy)) out.push('references/standing-rules.md lacks the marked-copy line')
  if (copy.replace(STANDING_MARK, '') !== home) out.push('references/standing-rules.md differs from docs/skills/STANDING-RULES.md')
  const block = /<!-- copied from docs\/skills\/STANDING-RULES\.md -->([\s\S]*?)<!-- end copied block -->/.exec(skillText)
  if (skillText && !block) out.push('SKILL.md lacks the copied standing-rules block')
  if (block) for (const l of block[1].split('\n').map((x) => x.trim()).filter(Boolean)) if (!home.includes(l)) out.push(`SKILL.md copied line not in the home file: ${l}`)
  return out
}
