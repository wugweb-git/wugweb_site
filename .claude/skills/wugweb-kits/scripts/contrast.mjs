#!/usr/bin/env node
/**
 * WCAG contrast ratio.   node scripts/contrast.mjs "#f4f4f4" "#191919"
 * Prints the computed ratio and AA / AAA results. Computed, never estimated.
 */
export function lum(hex) {
  let h = hex.replace('#', '')
  if (h.length === 3) h = [...h].map((c) => c + c).join('')
  if (!/^[0-9a-f]{6}$/i.test(h)) throw new Error(`not a hex colour: ${hex}`)
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
export function ratio(a, b) {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}
if (import.meta.url === `file://${process.argv[1]}`) {
  const [fg, bg] = process.argv.slice(2)
  if (!fg || !bg) {
    console.error('usage: node scripts/contrast.mjs <fg-hex> <bg-hex>')
    process.exit(2)
  }
  const r = ratio(fg, bg)
  console.log(`${fg} on ${bg}: ${r.toFixed(2)}:1  AA text ${r >= 4.5 ? 'pass' : 'FAIL'}  AA large ${r >= 3 ? 'pass' : 'FAIL'}  AAA text ${r >= 7 ? 'pass' : 'FAIL'}`)
  process.exit(r >= 4.5 ? 0 : 1)
}
