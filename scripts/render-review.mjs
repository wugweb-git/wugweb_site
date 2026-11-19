#!/usr/bin/env node
// Render review for one page (wugweb-work, Layout and Ship modes). Read-only.
//
//   node scripts/render-review.mjs <url> [--slug <name>] [--out scripts/data/renders]
//                                        [--widths 375,767,768,769,1199,1200,1201]
//   node scripts/render-review.mjs --contact [--out scripts/data/renders] [--width 1200]
//
// What it does, per width: opens the page in a real browser, scrolls it end to
// end so lazy media and reveals run, saves a full-page screenshot, and measures
// the layout faults that cannot be seen in the HTML: sideways overflow, images
// that are broken, cropped, reshaped or shown above their natural size, videos
// that can make sound, targets under 44 px, content still hidden after the
// scroll, and lines that run too long. It then loads the page with JavaScript
// off and with reduced motion on.
//
// Writes, under <out>/<slug>/: <width>.png, sheet.png (375, 768 and 1200 side
// by side), review.json and review.md. The folder is gitignored: screenshots
// show client work and are derived files. Nothing is written to Sanity, Notion
// or R2, and no media file is copied.
//
// --contact builds one image of every reviewed page at one width, side by side.
// That is the test for "adaptive": pages that differ only by their pictures
// look alike at a glance.
//
// Exit code 1 when a hard check fails; 2 when the page could not be rendered.
// A check that could not run is reported as "not run", never as passed.

import { chromium } from 'playwright';
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync, readdirSync, existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const has = (k) => args.includes(k);
const OUT = resolve(opt('--out', 'scripts/data/renders'));
const GATE_WIDTHS = [375, 767, 768, 769, 1199, 1200, 1201];
const SHEET_WIDTHS = [375, 768, 1200];
const TARGET = 44;

const slugOf = (url) => {
  const p = new URL(url).pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  return (p.pop() || 'home').replace(/[^a-z0-9-]+/gi, '-').toLowerCase();
};

/** Scroll the page end to end so lazy media loads and scroll reveals run, then wait for images. */
async function settle(page) {
  await page.evaluate(async () => {
    const step = Math.max(200, Math.floor(innerHeight * 0.8));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((r) => setTimeout(r, 300));
    await Promise.all(Array.from(document.images).map((img) => {
      if (img.complete) return null;
      return new Promise((r) => { img.addEventListener('load', r, { once: true }); img.addEventListener('error', r, { once: true }); setTimeout(r, 15000); });
    }));
    scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
}

/** Everything measured in the page. Runs in the browser. */
function measureInPage(TARGET) {
  const root = document.querySelector('main') || document.body;
  const vw = document.documentElement.clientWidth;
  const dpr = window.devicePixelRatio || 1;
  const name = (el) => {
    const id = el.id ? `#${el.id}` : '';
    const cls = typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '';
    return `${el.tagName.toLowerCase()}${id}${cls}`.slice(0, 90);
  };
  const shown = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return false;
    const cs = getComputedStyle(el);
    return cs.display !== 'none' && cs.visibility !== 'hidden';
  };
  /** True when an ancestor scrolls sideways by design (a rail, a chip row). */
  const inScroller = (el) => {
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      const ox = getComputedStyle(p).overflowX;
      if ((ox === 'auto' || ox === 'scroll' || ox === 'hidden' || ox === 'clip') && p.scrollWidth > p.clientWidth + 1) return true;
      if (ox === 'hidden' || ox === 'clip') return true;
    }
    return false;
  };

  // 1. Sideways overflow of the page.
  const pageOverflow = document.documentElement.scrollWidth - vw;
  const offenders = [];
  if (pageOverflow > 1) {
    for (const el of root.querySelectorAll('*')) {
      if (!shown(el) || inScroller(el)) continue;
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 || r.left < -1) offenders.push(`${name(el)} right ${Math.round(r.right)}`);
      if (offenders.length >= 8) break;
    }
  }

  // 2. Images.
  const images = { total: 0, broken: [], cropped: [], reshaped: [], upscaled: [], noSize: 0 };
  for (const img of root.querySelectorAll('img')) {
    if (!shown(img)) continue;
    images.total++;
    const file = (img.currentSrc || img.src || '').split('/').pop().split('?')[0].slice(0, 60);
    if (!img.getAttribute('width') || !img.getAttribute('height')) images.noSize++;
    if (img.complete && img.naturalWidth === 0) { images.broken.push(file); continue; }
    if (!img.naturalWidth) continue;
    const r = img.getBoundingClientRect();
    const fit = getComputedStyle(img).objectFit;
    const natural = img.naturalWidth / img.naturalHeight;
    const drawn = r.width / r.height;
    const off = Math.abs(drawn - natural) / natural;
    if (off > 0.02) {
      if (fit === 'cover' || fit === 'none') images.cropped.push(`${file} (${fit}, box ${Math.round(r.width)}x${Math.round(r.height)}, file ${img.naturalWidth}x${img.naturalHeight})`);
      else if (fit === 'fill') images.reshaped.push(`${file} (box ${Math.round(r.width)}x${Math.round(r.height)}, file ${img.naturalWidth}x${img.naturalHeight})`);
    }
    // Shown above natural size: the box needs more pixels than the file has.
    const isVector = /\.svg($|\?)/i.test(img.currentSrc || img.src || '');
    const shownW = fit === 'contain' && drawn > natural ? r.height * natural : r.width;
    if (!isVector && shownW * dpr > img.naturalWidth * 1.02) images.upscaled.push(`${file} (needs ${Math.round(shownW * dpr)} px, file ${img.naturalWidth} px)`);
  }

  // 3. Videos: none may make sound; a reshaped or cropped video is a fault too.
  const videos = { total: 0, canSound: [], nativeControls: [], cropped: [] };
  for (const v of root.querySelectorAll('video')) {
    if (!shown(v)) continue;
    videos.total++;
    const file = (v.currentSrc || v.src || v.dataset.src || '').split('/').pop().split('#')[0].slice(0, 60);
    if (!v.muted) videos.canSound.push(file);
    if (v.controls) videos.nativeControls.push(file);
    if (v.videoWidth) {
      const r = v.getBoundingClientRect();
      const fit = getComputedStyle(v).objectFit;
      const off = Math.abs(r.width / r.height - v.videoWidth / v.videoHeight) / (v.videoWidth / v.videoHeight);
      if (off > 0.02 && (fit === 'cover' || fit === 'none' || fit === 'fill')) videos.cropped.push(`${file} (${fit})`);
    }
  }

  // 4. Targets under 44 px. A link inside a line of text is not a target of its own.
  const small = [];
  let targets = 0;
  for (const el of root.querySelectorAll('button, [role="button"], summary, input:not([type="hidden"]), select, textarea, a[href]')) {
    if (!shown(el) || el.disabled) continue;
    if (el.tagName === 'A' && getComputedStyle(el).display === 'inline' && el.parentElement && el.parentElement.innerText.trim().length > el.innerText.trim().length + 12) continue;
    targets++;
    const r = el.getBoundingClientRect();
    if (r.width < TARGET - 0.5 || r.height < TARGET - 0.5) small.push(`${name(el)} ${Math.round(r.width)}x${Math.round(r.height)}`);
  }

  // 5. Content still hidden after the whole page was scrolled.
  const hidden = [];
  for (const el of root.querySelectorAll('[data-reveal], [data-scroll], section, article, figure, h1, h2, h3, p, li')) {
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    let o = 1;
    for (let p = el; p && p !== document.body; p = p.parentElement) o *= parseFloat(getComputedStyle(p).opacity || '1');
    if (o < 0.2 && (el.innerText || '').trim().length + el.querySelectorAll('img,video').length > 0) {
      hidden.push(`${name(el)} opacity ${o.toFixed(2)}`);
      if (hidden.length >= 8) break;
    }
  }

  // 6. Line length of running text, in characters per line.
  const canvas = document.createElement('canvas').getContext('2d');
  const longLines = [];
  let maxMeasure = 0;
  let tinyText = 0;
  for (const p of root.querySelectorAll('p')) {
    if (!shown(p)) continue;
    const text = (p.innerText || '').trim();
    const cs = getComputedStyle(p);
    const size = parseFloat(cs.fontSize);
    if (text.length > 0 && size < 12) tinyText++;
    if (text.length < 120) continue;
    canvas.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    const sample = text.slice(0, 400);
    const perChar = canvas.measureText(sample).width / sample.length;
    const chars = Math.round(p.getBoundingClientRect().width / perChar);
    maxMeasure = Math.max(maxMeasure, chars);
    if (chars > 85) longLines.push(`${name(p)} ${chars} characters`);
  }

  // 7. What the page is made of, for the "adaptive" comparison.
  const blocks = {};
  for (const el of root.querySelectorAll('[class*="case-"]')) {
    const m = String(el.className).match(/(?:^|\s)(case-[a-z]+)(?=\s|$)/);
    if (m) blocks[m[1]] = (blocks[m[1]] || 0) + 1;
  }
  const headings = Array.from(root.querySelectorAll('h1, h2')).filter(shown).map((h) => `${h.tagName.toLowerCase()} ${h.innerText.trim().slice(0, 70)}`);

  return {
    viewport: [vw, innerHeight], dpr, pageHeight: document.documentElement.scrollHeight,
    pageOverflow: Math.max(0, Math.round(pageOverflow)), offenders, images, videos,
    targets: { total: targets, small: small.slice(0, 20), smallCount: small.length },
    hidden, text: { maxMeasure, longLines: longLines.slice(0, 8), tinyText },
    blocks, headings, textLength: (root.innerText || '').replace(/\s+/g, ' ').trim().length,
  };
}

function judge(m) {
  const rows = [];
  const row = (check, hard, ok, detail) => rows.push({ check, hard, status: ok ? 'pass' : hard ? 'fail' : 'flag', detail: detail || '' });
  row('No sideways page scroll', true, m.pageOverflow <= 1, m.pageOverflow > 1 ? `${m.pageOverflow} px over; ${m.offenders.join('; ')}` : '');
  row('No broken image', true, m.images.broken.length === 0, m.images.broken.join('; '));
  row('No image cropped', true, m.images.cropped.length === 0, m.images.cropped.slice(0, 6).join('; '));
  row('No image reshaped (aspect ratio kept)', true, m.images.reshaped.length === 0, m.images.reshaped.slice(0, 6).join('; '));
  row('No video can make sound', true, m.videos.canSound.length === 0, m.videos.canSound.join('; '));
  row('No video shows native controls', true, m.videos.nativeControls.length === 0, m.videos.nativeControls.join('; '));
  row('No video cropped or reshaped', true, m.videos.cropped.length === 0, m.videos.cropped.join('; '));
  row('All content visible after scrolling', true, m.hidden.length === 0, m.hidden.join('; '));
  row('Images shown above natural size (flag, not a ban)', false, m.images.upscaled.length === 0, `${m.images.upscaled.length} of ${m.images.total}: ${m.images.upscaled.slice(0, 5).join('; ')}`);
  row(`Targets ${TARGET} px or more`, false, m.targets.smallCount === 0, `${m.targets.smallCount} of ${m.targets.total}: ${m.targets.small.slice(0, 6).join('; ')}`);
  row('Line length 85 characters or fewer', false, m.text.longLines.length === 0, `longest ${m.text.maxMeasure}; ${m.text.longLines.slice(0, 4).join('; ')}`);
  row('No text under 12 px', false, m.text.tinyText === 0, `${m.text.tinyText} paragraphs`);
  row('Every image has width and height', false, m.images.noSize === 0, `${m.images.noSize} of ${m.images.total} missing`);
  return rows;
}

async function contact() {
  const width = +opt('--width', 1200);
  const slugs = readdirSync(OUT, { withFileTypes: true }).filter((d) => d.isDirectory() && existsSync(join(OUT, d.name, `${width}.png`))).map((d) => d.name).sort();
  if (!slugs.length) { console.error(`No ${width}.png found under ${OUT}`); process.exit(2); }
  const cell = width < 768 ? 220 : 380;
  const html = `<!doctype html><meta charset="utf-8"><style>
    body{margin:0;padding:24px;background:#111;color:#eee;font:14px system-ui}
    .row{display:flex;gap:24px;align-items:flex-start}
    figure{margin:0;width:${cell}px;flex:none} img{width:100%;display:block;border:1px solid #333}
    figcaption{padding:8px 0 12px;word-break:break-word}
  </style><div class="row">${slugs.map((s) => `<figure><figcaption>${s}</figcaption><img src="${pathToFileURL(join(OUT, s, `${width}.png`)).href}"></figure>`).join('')}</div>`;
  const file = join(OUT, `_contact-${width}.html`);
  writeFileSync(file, html);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: Math.min(8000, slugs.length * (cell + 24) + 48), height: 900 } });
  await page.goto(pathToFileURL(file).href);
  await page.waitForLoadState('networkidle');
  const out = join(OUT, `_contact-${width}.png`);
  await page.screenshot({ path: out, fullPage: true });
  await browser.close();
  console.log(`Contact sheet of ${slugs.length} pages at ${width}: ${out}`);
}

async function main() {
  if (has('--contact')) return contact();
  const url = args.find((a) => /^https?:\/\//.test(a));
  if (!url) { console.error('Usage: node scripts/render-review.mjs <url> [--slug name] [--out dir] [--widths a,b,c]'); process.exit(2); }
  const slug = opt('--slug', slugOf(url));
  const widths = opt('--widths', GATE_WIDTHS.join(',')).split(',').map(Number).filter(Boolean);
  const dir = join(OUT, slug);
  mkdirSync(dir, { recursive: true });

  const browser = await chromium.launch();
  const result = { url, slug, date: new Date().toISOString(), tool: 'render-review', widths: {}, extra: {}, notRun: [] };
  let html = '';
  try {
    for (const w of widths) {
      const ctx = await browser.newContext({ viewport: { width: w, height: w < 768 ? 812 : 900 }, deviceScaleFactor: w < 768 ? 2 : 1 });
      const page = await ctx.newPage();
      const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      if (!res || res.status() !== 200) throw new Error(`page returned ${res ? res.status() : 'no response'} at ${w}`);
      if (!html) html = await res.text();
      await settle(page);
      const m = await page.evaluate(measureInPage, TARGET);
      // A full-page capture stretches the viewport, which throws fixed chrome (the site header,
      // the cookie notice) into the middle of the picture. Pin it to the document for the capture.
      await page.evaluate(() => {
        for (const el of document.querySelectorAll('body *')) {
          if (getComputedStyle(el).position === 'fixed' && !el.closest('dialog')) el.style.setProperty('position', 'absolute', 'important');
        }
      });
      await page.screenshot({ path: join(dir, `${w}.png`), fullPage: true, scale: 'css' });
      result.widths[w] = { measured: m, checks: judge(m) };
      await ctx.close();
      console.error(`rendered ${w}`);
    }

    // JavaScript off: the content must still be there.
    for (const w of [375, 1200].filter((x) => widths.includes(x))) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, javaScriptEnabled: false });
      const page = await ctx.newPage();
      await page.goto(url, { waitUntil: 'load', timeout: 60000 });
      const off = await page.evaluate(() => {
        const root = document.querySelector('main') || document.body;
        const visible = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && parseFloat(cs.opacity) > 0.2; };
        const media = Array.from(root.querySelectorAll('img, video'));
        return {
          textLength: (root.innerText || '').replace(/\s+/g, ' ').trim().length,
          media: media.length,
          mediaWithSource: media.filter((el) => el.getAttribute('src') || el.getAttribute('data-src') || el.querySelector('source')).length,
          hiddenBlocks: Array.from(root.querySelectorAll('section, article, figure')).filter((el) => el.getBoundingClientRect().height > 0 && !visible(el)).length,
        };
      });
      const on = result.widths[w].measured.textLength;
      const ok = off.textLength >= on * 0.95 && off.hiddenBlocks === 0;
      result.extra[`nojs-${w}`] = { ...off, textWithScript: on };
      result.widths[w].checks.push({ check: 'All content present with JavaScript off', hard: true, status: ok ? 'pass' : 'fail', detail: `text ${off.textLength} of ${on} characters; ${off.hiddenBlocks} blocks hidden; ${off.mediaWithSource} of ${off.media} media with a source` });
      await ctx.close();
    }

    // Reduced motion: nothing may keep moving.
    if (widths.includes(1200)) {
      const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 }, reducedMotion: 'reduce' });
      const page = await ctx.newPage();
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      await settle(page);
      const rm = await page.evaluate(() => ({
        running: document.getAnimations().filter((a) => a.playState === 'running' && a.effect && a.effect.getTiming().iterations === Infinity).length,
        playing: Array.from(document.querySelectorAll('main video')).filter((v) => !v.paused).length,
      }));
      result.extra['reduced-motion'] = rm;
      result.widths[1200].checks.push({ check: 'Reduced motion stops loops and endless animation', hard: true, status: rm.running === 0 && rm.playing === 0 ? 'pass' : 'fail', detail: `${rm.playing} videos playing, ${rm.running} endless animations running` });
      await ctx.close();
    }

    // Side by side at the three main widths.
    const have = SHEET_WIDTHS.filter((w) => existsSync(join(dir, `${w}.png`)));
    if (have.length) {
      const sheet = join(dir, 'sheet.html');
      writeFileSync(sheet, `<!doctype html><meta charset="utf-8"><style>body{margin:0;padding:24px;background:#111;color:#eee;font:14px system-ui}.row{display:flex;gap:24px;align-items:flex-start}figure{margin:0;flex:none}img{display:block;border:1px solid #333}figcaption{padding:0 0 8px}</style><div class="row">${have.map((w) => `<figure><figcaption>${w}</figcaption><img style="width:${w < 768 ? 260 : w < 1200 ? 420 : 640}px" src="${pathToFileURL(join(dir, `${w}.png`)).href}"></figure>`).join('')}</div>`);
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(pathToFileURL(sheet).href);
      await page.waitForLoadState('networkidle');
      await page.screenshot({ path: join(dir, 'sheet.png'), fullPage: true });
      await page.close();
    }
  } catch (e) {
    await browser.close();
    result.error = String(e && e.message || e);
    writeFileSync(join(dir, 'review.json'), JSON.stringify(result, null, 1));
    console.error(`Render failed: ${result.error}. Nothing after this step was checked; do not treat the page as reviewed.`);
    process.exit(2);
  }
  await browser.close();

  result.htmlSha = createHash('sha1').update(html).digest('hex');
  const all = Object.entries(result.widths).flatMap(([w, v]) => v.checks.map((c) => ({ w, ...c })));
  result.summary = {
    hardFails: all.filter((c) => c.status === 'fail').length,
    flags: all.filter((c) => c.status === 'flag').length,
    passes: all.filter((c) => c.status === 'pass').length,
  };
  // Always-manual rows: a script cannot judge these. They stay "not run" until a person or a model looks at the screenshots.
  result.notRun = ['Design critique at 375 and 1200 (look at the screenshots)', 'A mask or crop hides the proof on a screen (look at each screen)', 'AA contrast including the client accent (run the contrast check)'];
  writeFileSync(join(dir, 'review.json'), JSON.stringify(result, null, 1));

  const first = result.widths[widths.includes(1200) ? 1200 : widths[0]].measured;
  const lines = [`# Render review: ${slug}`, '', `${url}`, `${result.date}. Page HTML ${result.htmlSha.slice(0, 12)}.`, '',
    `Blocks at ${widths.includes(1200) ? 1200 : widths[0]}: ${Object.entries(first.blocks).map(([k, v]) => `${k} ${v}`).join(', ') || 'none'}.`,
    `Headings: ${first.headings.join(' | ')}`, '',
    '| Width | Check | Result | Detail |', '|---|---|---|---|'];
  for (const c of all) if (c.status !== 'pass') lines.push(`| ${c.w} | ${c.check} | ${c.status} | ${c.detail.replace(/\|/g, '/')} |`);
  lines.push('', `Result: ${result.summary.hardFails} hard fails, ${result.summary.flags} flags, ${result.summary.passes} passes across ${widths.length} widths.`,
    '', 'Not run by this script, and not passed:', ...result.notRun.map((x) => `- ${x}`),
    '', `Screenshots: ${widths.map((w) => `${w}.png`).join(', ')}, sheet.png.`);
  writeFileSync(join(dir, 'review.md'), lines.join('\n') + '\n');
  console.log(lines.join('\n'));
  process.exit(result.summary.hardFails ? 1 : 0);
}

main().catch((e) => { console.error(`Render review could not run: ${e && e.message || e}`); process.exit(2); });
