/**
 * Extract a poster frame for every referenced video.
 *
 * Why: with below-fold video now lazy-loaded (src/lib/lazy-video.ts), a card
 * shows nothing until it scrolls into view. A poster is what fills that gap.
 * 4 of 18 <video> elements had one before this.
 *
 * Output is WebP at 2x the largest CSS box a thumbnail occupies (~640px), so it
 * stays sharp on high-density phones — posters are where pixelation would
 * actually be visible, unlike the video itself.
 *
 * Frame is taken at 1s rather than 0s: the first frame of these clips is often
 * a fade-from-black, which makes a poster that looks broken.
 *
 * Idempotent — skips any poster already newer than its source.
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { existsSync, statSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import ffmpeg from 'ffmpeg-static';

const run = promisify(execFile);
const WIDTH = 1280;          // 2x a 640px card
const QUALITY = '72';
const AT_SECOND = '1';

const inputs = readFileSync(process.argv[2] || '/tmp/mp4s.txt', 'utf8')
  .split('\n').map(s => s.trim()).filter(Boolean);

let made = 0, skipped = 0, failed = [];
for (const sitePath of inputs) {
  const src = 'public' + sitePath;
  const out = src.replace(/\.mp4$/i, '-poster.webp');
  if (!existsSync(src)) { failed.push(`${sitePath} — source missing`); continue; }
  if (existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs) { skipped++; continue; }
  mkdirSync(dirname(out), { recursive: true });
  try {
    await run(ffmpeg, [
      '-loglevel', 'error', '-y',
      '-ss', AT_SECOND, '-i', src,
      '-frames:v', '1',
      '-vf', `scale=${WIDTH}:-2:flags=lanczos`,
      '-c:v', 'libwebp', '-quality', QUALITY,
      out,
    ]);
    made++;
  } catch (e) {
    // Clips shorter than AT_SECOND have no frame there — retry at the start.
    try {
      await run(ffmpeg, ['-loglevel','error','-y','-i',src,'-frames:v','1',
        '-vf',`scale=${WIDTH}:-2:flags=lanczos`,'-c:v','libwebp','-quality',QUALITY,out]);
      made++;
    } catch (e2) { failed.push(`${sitePath} — ${String(e2).slice(0,80)}`); }
  }
}
console.log(`posters written: ${made} | already current: ${skipped} | failed: ${failed.length}`);
failed.slice(0, 8).forEach(f => console.log('  ', f));
