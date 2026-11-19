# Free, scriptable tools for automated screenshots and visual regression of responsive pages (as of 2026-11-19)

Research date: 2026-11-19. Every version, licence, size and publish date marked "npm registry" was read with `npm view <pkg>` on 2026-11-19; the linked npm page is the public view of the same record. Sizes are npm `unpackedSize` of the package itself, without its dependencies and without browser binaries.

Local facts observed on the developer Mac on 2026-11-19 (not web sources): the repo pins `.node-version` 22, the shell runs Node v24.18.0, `package.json` already lists `playwright ^1.63.0`, `~/Library/Caches/ms-playwright` already holds `chromium-1243`, `chromium_headless_shell-1243`, `webkit-2359` and `ffmpeg-1011`, `sharp` is present in `node_modules` as a transitive dependency (not a declared one), and ImageMagick (`magick`, `montage`, `convert`) is not installed.

## Playwright (page.screenshot, toHaveScreenshot, device emulation, reduced motion, JavaScript disabled): capabilities, licence, current version, browser install, flakiness sources and documented stabilisers

### Takeaway
Playwright (Apache-2.0, 1.65.1 published 2026-11-13) is the one free tool that covers capture, emulation and comparison with no account, and it is already a dependency of this repo with browsers cached locally. Its documented stabilisers handle CSS animations, the caret, masking and injected CSS, but lazy images, late web fonts and JavaScript-driven animation are not handled for you and baselines are only valid on the same OS that made them.

### Cited Findings

Version, licence, size
- `playwright` latest is 1.65.1, licence Apache-2.0, `engines.node >=20`, unpacked 5.06 MB; `playwright-core` 1.65.1 is 13.97 MB; `@playwright/test` 1.65.1 is 28.5 kB (a thin wrapper). Version 1.65.1 was published 2026-11-13. (Source: [npm registry, playwright](https://www.npmjs.com/package/playwright), queried 2026-11-19)
- System requirements: Node.js latest 22.x, 24.x or 26.x; macOS 14 (Sonoma) or later; Windows 11+, Windows Server 2019+ or WSL; Debian 12 or 13 and Ubuntu 22.04, 24.04 or 26.04, on x86-64 or arm64. (Source: [Playwright docs, Installation](https://playwright.dev/docs/intro), read 2026-11-19)

Browser installation
- `npx playwright install` with no arguments installs the default browsers; one browser can be named (`npx playwright install webkit`); OS libraries are installed with `npx playwright install-deps` or together with `npx playwright install --with-deps chromium`. (Source: [Playwright docs, Browsers](https://playwright.dev/docs/browsers))
- Headless runs use a separate "chromium headless shell" by default; `--only-shell` skips the full Chromium download for headless-only CI; setting the `chromium` channel opts into the new headless mode ("the real Chrome browser") and `--no-shell` then skips the shell. (Source: [Playwright docs, Browsers](https://playwright.dev/docs/browsers))
- Browsers are cached outside `node_modules`: macOS `~/Library/Caches/ms-playwright`, Linux `~/.cache/ms-playwright`, Windows `%USERPROFILE%\AppData\Local\ms-playwright`. The docs' macOS example shows chromium 281M, firefox 187M, webkit 180M, and says browsers "will take a few hundred megabytes of disk space." (Source: [Playwright docs, Browsers](https://playwright.dev/docs/browsers))
- `PLAYWRIGHT_BROWSERS_PATH` moves the cache; `PLAYWRIGHT_BROWSERS_PATH=0` does a hermetic install into `node_modules/playwright-core/.local-browsers`. (Source: [Playwright docs, Browsers](https://playwright.dev/docs/browsers))

Capture (`page.screenshot`)
- `await page.screenshot({ path, fullPage: true })` captures "a full scrollable page"; omitting `path` returns a buffer that the docs say can be post-processed or passed "to a third party pixel diff facility"; `page.locator('.header').screenshot()` captures one element. (Source: [Playwright docs, Screenshots](https://playwright.dev/docs/screenshots))

Comparison (`expect(page).toHaveScreenshot()`)
- "This function will wait until two consecutive page screenshots yield the same result, and then compare the last screenshot with the expectation." (Source: [Playwright docs, PageAssertions](https://playwright.dev/docs/api/class-pageassertions))
- Options and defaults: `animations` default `"disabled"`; `caret` default `"hide"`; `fullPage` default `false`; `mask` (locators to cover), `maskColor` default pink `#FF00FF`; `maxDiffPixels` and `maxDiffPixelRatio` (0 to 1) default from `TestConfig.expect`; `threshold` default `0.2`, "between zero (strict) and one (lax)"; `stylePath` (a stylesheet applied while taking the screenshot); `scale` default `"css"` (one image pixel per CSS pixel); `omitBackground` default `false`; `clip`; `timeout`. Named snapshots must end in `.png` or `.webp`. (Source: [Playwright docs, PageAssertions](https://playwright.dev/docs/api/class-pageassertions))
- What `animations: "disabled"` does: it "stops CSS animations, CSS transitions and Web Animations"; finite animations are "fast-forwarded to completion, so they'll fire transitionend event"; infinite animations are "canceled to initial state, and then played over after the screenshot." (Source: [Playwright docs, PageAssertions](https://playwright.dev/docs/api/class-pageassertions))
- "Playwright Test uses the pixelmatch library" for the comparison. (Source: [Playwright docs, Visual comparisons](https://playwright.dev/docs/test-snapshots))
- Baseline names carry browser and platform, for example `example-test-1-chromium-darwin.png`, because "Screenshots differ between browsers and platforms due to different rendering, fonts and more." Baselines are refreshed with `npx playwright test --update-snapshots`. (Source: [Playwright docs, Visual comparisons](https://playwright.dev/docs/test-snapshots))
- `stylePath` "allows filtering out dynamic or volatile elements, hence improving the screenshot determinism"; the docs' example hides iframes with `visibility: hidden`. Defaults can be set globally or per project under `expect.toHaveScreenshot` in the config. (Source: [Playwright docs, Visual comparisons](https://playwright.dev/docs/test-snapshots))

Emulation
- `playwright.devices` is a registry of device descriptors that set "userAgent", "screenSize", "viewport" and "hasTouch"; spread one into the context or config (`...devices['Desktop Chrome']`) and put any custom `viewport` after the spread, since the device also defines one. (Source: [Playwright docs, Emulation](https://playwright.dev/docs/emulation))
- Arbitrary widths: `viewport: { width, height }` on `browser.newContext()` or in `use`, or `page.setViewportSize()` per page. `isMobile` controls "Whether the meta viewport tag is taken into account and touch events are enabled." (Source: [Playwright docs, Emulation](https://playwright.dev/docs/emulation))
- Media features: `colorScheme` (`'light'`, `'dark'`), `reducedMotion` (`'reduce'`, `'no-preference'`), `forcedColors` (`'active'`, `'none'`), `contrast` (`'more'`, `'no-preference'`), set in `use`, on the context, or per page with `page.emulateMedia({ reducedMotion: 'reduce' })`. `media` can be `'screen'` or `'print'`. (Sources: [Playwright docs, Emulation](https://playwright.dev/docs/emulation); [Playwright docs, Page.emulateMedia](https://playwright.dev/docs/api/class-page))
- JavaScript off: `javaScriptEnabled: false` on the context or `test.use({ javaScriptEnabled: false })`. Also `locale`, `timezoneId`, and `offline: true`. (Source: [Playwright docs, Emulation](https://playwright.dev/docs/emulation))

Flakiness sources and stabilisers
- Environment drift is documented by Playwright itself: "Browser rendering can vary based on the host OS, version, settings, hardware, power source", and "For consistent screenshots, run tests in the same environment where the baseline screenshots were generated." (Source: [Playwright docs, Visual comparisons](https://playwright.dev/docs/test-snapshots))
- Documented stabilisers in Playwright: the two-consecutive-identical-screenshots wait, `animations: "disabled"`, `caret: "hide"`, `mask`, `stylePath`, `maxDiffPixels` / `maxDiffPixelRatio` / `threshold`. (Source: [Playwright docs, PageAssertions](https://playwright.dev/docs/api/class-pageassertions))
- Fonts (third-party guidance, not Playwright docs): a late web font makes the browser paint the fallback and shifts every text node by a few pixels; the suggested fix is `document.fonts.load()` followed by `await document.fonts.ready`, because `ready` alone does not force fonts that have not been requested yet. (Source: [search summary of htmlcsstoimage.com, "How to Wait for a Page to Finish Rendering Before Taking a Screenshot"](https://htmlcsstoimage.com/blog/wait-for-page-before-screenshot); vendor blog, low authority)
- Lazy images (third-party guidance, sources disagree): one guide says `fullPage: true` scrolls internally while measuring height and may trigger some lazy images; another says a full-page capture does not necessarily scroll. The common recipe is to scroll through the document once, wait for the newly requested images, return to the top, then capture; or, when you control the page, switch `loading="lazy"` to eager for screenshot runs. (Sources: [screenshotone.com guide](https://screenshotone.com/blog/a-complete-guide-on-how-to-take-full-page-screenshots-with-puppeteer-playwright-or-selenium); [dev.to, "The scrollHeight lie"](https://dev.to/knallhartdev/the-scrollheight-lie-how-i-finally-got-full-page-screenshots-right-with-playwright-4emn); both low authority and seen only as search summaries)
- `networkidle` waits work for most sites but can hang on pages with long-poll connections. (Source: [search summary of htmlcsstoimage.com](https://htmlcsstoimage.com/blog/wait-for-page-before-screenshot); low authority)
- The Argos Playwright helper `argosScreenshot` is described as waiting for fonts to load, images to decode, network idle and `[aria-busy]` loaders to disappear before capture, which is a useful checklist of what plain `page.screenshot` does not wait for. (Source: [Argos blog, screenshot stabilization](https://argos-ci.com/blog/screenshot-stabilization); seen as a search summary; vendor source)

### Inferences
- GSAP tweens are driven by JavaScript on `requestAnimationFrame`, not by CSS animations, CSS transitions or the Web Animations API, which are the only three things the docs say `animations: "disabled"` stops. So on this site `[data-reveal]` / `[data-scroll]` content can be captured mid-tween or still hidden unless the script honours `prefers-reduced-motion` (emulate `reducedMotion: 'reduce'`) or a `stylePath` stylesheet forces the final state. This needs a test on the real pages; it is not stated in any source.
- ScrollTrigger reveals below the fold are a second form of the lazy-content problem: a `fullPage` capture without a prior scroll pass may show unrevealed sections. Same remedy: scroll pass, reduced motion, or a forcing stylesheet.
- `javaScriptEnabled: false` gives a cheap "does the server-rendered Astro HTML stand on its own" screenshot; anything that is invisible until GSAP runs will show as blank, which is a real finding rather than flake.
- For an agent that only needs before/after images, `page.screenshot()` in a plain Node script is enough and avoids the test runner; `toHaveScreenshot` is only needed for the stable-frame retry loop and baseline bookkeeping. Note that `page.screenshot` itself does not do the two-identical-frames wait (the docs attach that wording to `toHaveScreenshot` only).
- Baselines made on the Mac (`-darwin` suffix) will not match a Linux CI run. Either compare only like with like (both sides captured in the same run on the same machine), or keep baselines per platform.
- No new download is needed to start: Playwright and Chromium/WebKit builds are already on this Mac (local observation above). The cached build number 1243 belongs to whatever Playwright version is installed; upgrading to 1.65.x triggers a fresh browser download of a few hundred MB.

### Gaps
- The `page.screenshot` option table (including its `style` option and whether it waits for fonts) was not retrieved: the API page is 315k characters and the fetch stopped before that section. Option list here is taken from `toHaveScreenshot`, which the docs say shares most options.
- A Playwright GitHub issue about lazy images and IntersectionObserver content missing from full-page captures (reported in search summaries as #40941, opened 2026-05-21) could not be confirmed directly; treat the number and date as unverified.
- No official Playwright statement was found on whether `fullPage` scrolls the page before capture; third-party sources conflict.
- Playwright has an experimental non-default comparator that I recall from memory (an SSIM-based option) but found no current documentation for; not cited.
- The Argos post "How to Fix Flaky Visual Tests: Every Root Cause, Solved" returned HTTP 404 on fetch, so its full root-cause list is not included.

## Pixel diff engines: pixelmatch, odiff, looks-same, resemble.js, and Playwright's built-in comparator: accuracy, speed, anti-aliasing handling, licence, last release

### Takeaway
pixelmatch 8 (ISC, 2026-10-06) and odiff 4.5 (MIT, 2026-07-23) are the two actively maintained free choices: pixelmatch is tiny pure JavaScript with a new perceptual metric, odiff is a native binary about 6.7 times faster on large screenshots and reports size mismatches as a distinct "layout-diff". looks-same is alive but slower-moving, and Resemble.js is in declared low-maintenance mode with a native canvas dependency.

### Cited Findings

Summary table (all rows from the npm registry, queried 2026-11-19, plus the linked READMEs)

| Engine | Latest | Published | Licence | Unpacked | Runtime |
|---|---|---|---|---|---|
| pixelmatch | 8.0.0 | 2026-10-06 | ISC | 36.8 kB | Pure JS, ES module only, dependency `pngjs` for the CLI |
| odiff-bin | 4.5.0 | 2026-07-23 | MIT | 42 kB wrapper + one platform binary | Native (Zig) binary via optional per-platform packages |
| looks-same | 10.0.1 | 2025-08-18 | MIT | 98 kB | Node >= 18, deps `@jsquash/png`, `color-diff` |
| resemblejs | 5.0.0 | 2023-06-06 | MIT | 50.8 kB | Needs `canvas` 2.11.2 (native) in Node |
| Playwright built-in | 1.65.1 | 2026-11-13 | Apache-2.0 | part of Playwright | Uses pixelmatch |

Sources for the table: [pixelmatch](https://www.npmjs.com/package/pixelmatch), [odiff-bin](https://www.npmjs.com/package/odiff-bin), [looks-same](https://www.npmjs.com/package/looks-same), [resemblejs](https://www.npmjs.com/package/resemblejs), [playwright](https://www.npmjs.com/package/playwright).

pixelmatch
- Self-description: "The smallest, simplest and fastest JavaScript pixel-level image comparison library", with "accurate anti-aliased pixel detection" and a "perceptual color difference" metric; "a few hundred lines of code" and "no dependencies" for the library itself. (Source: [pixelmatch README](https://github.com/mapbox/pixelmatch))
- Options: `threshold` default 0.1 (0 to 1), `includeAA` default `false` (anti-aliased pixels are ignored unless set true), `alpha` 0.1, `aaColor` yellow, `diffColor` red, `diffColorAlt`, `diffMask`. Returns the number of mismatched pixels. CLI: `pixelmatch image1.png image2.png [diff.png] [threshold] [includeAA]`, exit code 0 match, 66 different, 65 dimension mismatch, 64 bad usage. (Source: [pixelmatch README](https://github.com/mapbox/pixelmatch))
- v8.0.0 (released 6 Oct; npm dates it 2026-10-06): colours are now compared in OKLab with HyAB distance instead of YIQ, described as more accurate to human perception with fewer false positives and missed changes, "nearly as fast as before"; new `windowSize` option returns the largest count of differing pixels in any N by N square so scattered noise stays low and compact real changes stand out; new `ignoreMask` per-pixel mask; better anti-aliasing detection with transparency. API unchanged but diff counts differ, so tuned thresholds need rechecking. (Source: [pixelmatch releases](https://github.com/mapbox/pixelmatch/releases))
- v6.0.0 made the package ES-module only ("Use the older v5.3.0 if you need to support CommonJS environments"); v7.x added TypeScript types and performance gains of about 6%, 22% and 8% across releases. (Source: [pixelmatch releases](https://github.com/mapbox/pixelmatch/releases))
- Images must be the same size: a dimension mismatch is an error (exit code 65), not a diff. (Source: [pixelmatch README](https://github.com/mapbox/pixelmatch))

odiff
- "A very fast SIMD-first image comparison library (with nodejs API)"; "Originally written in OCaml, currently in Zig with SIMD optimizations for SSE2, AVX2, AVX512, and NEON." (Source: [odiff README](https://github.com/dmtrKovalenko/odiff))
- Maintainer benchmark on full-size cypress.io screenshots: pixelmatch 7.712 s, ImageMagick `compare` 8.881 s, odiff 1.168 s (pixelmatch 6.67 times slower, ImageMagick 7.65 times slower). This is the maintainer's own benchmark and the README does not say which pixelmatch version was used. (Source: [odiff README](https://github.com/dmtrKovalenko/odiff))
- Features: anti-aliasing detection, ignore regions, "Supports comparison of images with different layouts", inputs PNG, JPEG, WebP, TIFF (API list also has BMP), and a server mode that keeps one process alive instead of spawning per call. (Source: [odiff README](https://github.com/dmtrKovalenko/odiff))
- Node options: `threshold` (0 to 1), `antialiasing`, `failOnLayoutDiff`, `ignoreRegions` (x1, y1, x2, y2), `outputDiffMask`, `diffColor`, `captureDiffLines` (returns the row indexes that differ), `reduceRamUsage`. Result: `match`, and `reason` of `"layout-diff"`, `"pixel-diff"` (with `diffCount`, `diffPercentage`) or `"file-not-exists"`. (Source: [odiff README](https://github.com/dmtrKovalenko/odiff))
- Install is `npm install odiff-bin`; the registry lists per-platform optional packages `@odiff/darwin-arm64`, `darwin-x64`, `linux-arm64`, `linux-riscv64`, `linux-x64`, `win32-arm64`, `win32-x64`. A Playwright matcher exists as `playwright-odiff` (`toHaveScreenshotOdiff`). (Sources: [odiff README](https://github.com/dmtrKovalenko/odiff); [npm registry, odiff-bin](https://www.npmjs.com/package/odiff-bin))

looks-same
- "Pure node.js library for comparing png images, taking into account human color perception", built for the testplane runner. Tolerance is a ΔE value, default 2.3 in non-strict mode; `strict: true` is exact and faster. (Source: [looks-same README](https://github.com/gemini-testing/looks-same))
- Ignores anti-aliased pixels by default (`ignoreAntialiasing`), `antialiasingTolerance` default 0 with the advice "We recommend that you don't increase this value above 10"; ignores the text caret by default; `pixelRatio` option. (Source: [looks-same README](https://github.com/gemini-testing/looks-same))
- Unique among these: returns `diffBounds` (bounding box of the change) and, with `shouldCluster: true`, `diffClusters` (the change split into rectangles), plus `differentPixels` and `totalPixels`. (Source: [looks-same README](https://github.com/gemini-testing/looks-same))
- Version 10.0.1 depends on `@jsquash/png`, `buffer-crc32`, `color-diff`, `nested-error-stacks`, `parse-color`; no `sharp` in the dependency list. (Source: [npm registry, looks-same](https://www.npmjs.com/package/looks-same), queried 2026-11-19)

Resemble.js
- "Analyse and compare images with Javascript and HTML5." The README states the repository is in "Ultra low-maintenance mode", with the author spending time on it "one or two times a year". (Source: [Resemble.js README](https://github.com/rsmbl/Resemble.js))
- "Resemble.js uses node-canvas for Node.js support. This is a pre-built dependency that may fail in certain environments." (Source: [Resemble.js README](https://github.com/rsmbl/Resemble.js))
- Options include `ignore: "antialiasing"`, `scaleToSameSize`, `ignoredBox` / `ignoredBoxes`, `returnEarlyThreshold`, and `largeImageThreshold`: by default pixels are skipped when width or height exceeds 1200 px (set 0 to turn off). (Source: [Resemble.js README](https://github.com/rsmbl/Resemble.js))
- Last npm release 5.0.0 on 2023-06-06; dependency `canvas` 2.11.2. (Source: [npm registry, resemblejs](https://www.npmjs.com/package/resemblejs), queried 2026-11-19)

Playwright's built-in comparator
- It is pixelmatch: "Playwright Test uses the pixelmatch library." Playwright's own default `threshold` is 0.2, against pixelmatch's library default 0.1; `maxDiffPixels` is unset by default. (Sources: [Playwright docs, Visual comparisons](https://playwright.dev/docs/test-snapshots); [pixelmatch README](https://github.com/mapbox/pixelmatch))

Other engines seen in passing
- `reg-cli` 0.19.0-rc3 (MIT, published 2026-09-07, Node >= 20): diff logic "written in Rust and compiled to WebAssembly" with a thread pool, replacing the earlier pure-JavaScript version. (Sources: [reg-cli README](https://github.com/reg-viz/reg-cli); [npm registry, reg-cli](https://www.npmjs.com/package/reg-cli))
- `@blazediff/core` 2.0.1 (MIT, published 2026-11-13, 92.6 kB) exists on npm as a newer pixelmatch-style engine; not evaluated. (Source: [npm registry, @blazediff/core](https://www.npmjs.com/package/@blazediff/core))
- `ssim.js` 3.5.0 (MIT) was last published 2020-10-12, so a structural-similarity score in pure JS is available but unmaintained. (Source: [npm registry, ssim.js](https://www.npmjs.com/package/ssim.js))

### Inferences
- Full-page screenshots at different page heights are the normal case when a layout changes (a section grows, the page gets taller). pixelmatch treats that as an error and Playwright fails the size check, while odiff reports `layout-diff` and Resemble.js can scale. For a responsive audit, a height change is itself the most useful signal, so the script should record width and height per viewport before any pixel diff, and pad or crop to a common size if a pixel diff is still wanted.
- Resemble.js's 1200 px large-image default means it silently subsamples full-page screenshots unless `largeImageThreshold: 0` is set. Combined with the native `canvas` dependency and no release since 2023, it is the weakest choice here.
- Whether the Playwright version in use bundles pixelmatch 8 (OKLab) or an older vendored copy (YIQ) is not stated in the docs read; results from a standalone `pixelmatch@8` and from `toHaveScreenshot` may therefore differ for the same image pair.
- For a few dozen screenshots per run, pixelmatch's speed is not a constraint; odiff's advantage matters at hundreds of large full-page images or when the `layout-diff` reason and `captureDiffLines` (which rows changed) are wanted as machine-readable hints for an agent.
- looks-same's `diffClusters` gives an agent rectangles to crop and inspect, which is closer to "where did it change" than a raw pixel count.

### Gaps
- No independent, current benchmark comparing pixelmatch 8, odiff 4.x and looks-same 10 was found; the only numbers are odiff's own README table.
- No accuracy study (false positive / false negative rates on real web screenshots) was found for any of these engines.
- looks-same's README links ΔE generally; the exact formula (CIEDE2000 or other) was not confirmed on the page.
- GitHub release dates for odiff and looks-same were not read; dates given are npm publish dates.

## Wrappers and services: BackstopJS, Lost Pixel (open source mode), reg-suit, Argos, Percy, Chromatic: which are truly free and self-hostable with no account, and which need a paid plan or cloud account

### Takeaway
Only BackstopJS and reg-cli (the local core under reg-suit) run fully offline with no account, and both carry caveats: BackstopJS has had no npm release since 2024-09-07 and is asking for a new maintainer, and reg-cli compares folders but does not capture. Lost Pixel was archived on 2026-04-22. Argos, Percy and Chromatic are hosted services with a free tier of 5,000 screenshots or snapshots per month each and all need an account.

### Cited Findings

Summary table

| Tool | Latest (npm, 2026-11-19) | Licence | Captures? | Account needed | Free limit | Status |
|---|---|---|---|---|---|---|
| BackstopJS | 6.3.25, published 2024-09-07 | MIT | Yes (Puppeteer default, Playwright optional) | No | None, local | README says it "needs a new maintainer/owner" |
| Lost Pixel | 3.22.0, published 2024-11-14 | MIT | Yes (Storybook, pages, custom) | No in OSS mode | None, local | Repo archived 2026-04-22 |
| reg-suit | 0.14.5, published 2025-08-26 | MIT | No | No for compare; bucket for publish | None | Active (reg-cli rc 2026-09-07) |
| reg-cli | 0.19.0-rc3, published 2026-09-07 | MIT | No | No | None, local | Active |
| Argos | @argos-ci/cli 6.13.0, published 2026-11-17 | MIT | Via Playwright SDK | Yes (hosted) | 5,000 screenshots/month | Active |
| Percy | @percy/cli 1.32.12, published 2026-10-21 | MIT (CLI) | Yes, renders in cloud | Yes | 5,000 screenshots/month | Active |
| Chromatic | chromatic 18.15.0, published 2026-11-18 | MIT (CLI) | Yes, renders in cloud | Yes | 5,000 snapshots/month, Chrome only | Active |

Sources for versions and licences: npm registry pages for [backstopjs](https://www.npmjs.com/package/backstopjs), [lost-pixel](https://www.npmjs.com/package/lost-pixel), [reg-suit](https://www.npmjs.com/package/reg-suit), [reg-cli](https://www.npmjs.com/package/reg-cli), [@argos-ci/cli](https://www.npmjs.com/package/@argos-ci/cli), [@percy/cli](https://www.npmjs.com/package/@percy/cli), [chromatic](https://www.npmjs.com/package/chromatic), queried 2026-11-19.

BackstopJS
- Visual regression tool that runs locally; engines are Puppeteer (default) and Playwright (Chromium, Firefox or WebKit via `engineOptions.browser`). Commands: `backstop init`, `backstop test`, `backstop approve`, `backstop reference`. (Source: [BackstopJS README](https://github.com/garris/BackstopJS))
- Responsive config: `viewports` (root or per scenario), `scenarios` with `url`, `delay`, `readySelector`, `hideSelectors`, `removeSelectors`, `selectors` including the magic `document` and `viewport`, `misMatchThreshold`, `requireSameDimensions`, `postInteractionWait`, `onReadyScript`. Reports: interactive HTML, JUnit, JSON, CLI. `--docker` renders in a BackstopJS container to reduce cross-environment differences such as text anti-aliasing. Comparison is Resemble.js. (Source: [BackstopJS README](https://github.com/garris/BackstopJS))
- Maintenance: README says BackstopJS "needs a new maintainer/owner"; repo shows 517 open issues and 60 open pull requests (read 2026-11-19). (Source: [BackstopJS README](https://github.com/garris/BackstopJS))
- Install weight: package unpacked 20.1 MB, and it declares `puppeteer ^22.1.0`, `playwright ^1.40.1` and `@mirzazeyrek/node-resemble-js` as dependencies, so it pulls its own browser toolchains (Puppeteer is at 25.18.1 as of 2026-11-17, three majors ahead of what BackstopJS pins). (Sources: [npm registry, backstopjs](https://www.npmjs.com/package/backstopjs); [npm registry, puppeteer](https://www.npmjs.com/package/puppeteer))

Lost Pixel
- "Open source alternative to Percy, Chromatic, Applitools." Modes: Storybook, Ladle, Histoire, page shots (base URL plus paths), and custom shots (you supply images). OSS mode uses `generateOnly: true` and `failOnDifference: true`; the review UI, approval flow and team features are Platform-only; parallel execution is "limited in OSS version". (Source: [Lost Pixel README](https://github.com/lost-pixel/lost-pixel))
- The repository "was archived by the owner on Apr 22, 2026" and is read-only; the banner says "We are sunsetting the product and building what's next." (Source: [Lost Pixel README](https://github.com/lost-pixel/lost-pixel), read 2026-11-19)
- Last npm release 3.22.0 on 2024-11-14; it pins `playwright-core` 1.47.2, `odiff-bin` 2.6.1 and `pixelmatch` 5.3.0, and includes `posthog-node`. (Source: [npm registry, lost-pixel](https://www.npmjs.com/package/lost-pixel), queried 2026-11-19)

reg-suit and reg-cli
- reg-suit is "a command line interface for visual regression testing" that compares current images with previous ones and builds an HTML report. It does not capture screenshots; you supply them. Storage plugins are S3 and Google Cloud Storage only; notify plugins cover GitHub, GitLab, Slack, Chatwork. (Source: [reg-suit README](https://github.com/reg-viz/reg-suit))
- Thresholds: `thresholdRate` (ratio, default 0), `thresholdPixel` (count, default 0), `matchingThreshold` (0 to 1), `enableAntialias` (default false). (Source: [reg-suit README](https://github.com/reg-viz/reg-suit))
- reg-cli is the local piece: `reg-cli /actual-dir /expected-dir /diff-dir -R ./report.html`, JSON at `./reg.json` (`-J`), `-U` copies actual over expected, `-I` suppresses the error exit, `-C` concurrency default 4. Node 20+. (Source: [reg-cli README](https://github.com/reg-viz/reg-cli))

Argos
- Repository licence is MIT and it describes itself as "The open source visual testing platform for teams and AI agents." (Source: [argos-ci/argos](https://github.com/argos-ci/argos))
- Pricing: Hobby is free with up to 5,000 screenshots per month, commercial use and private organisation repositories allowed, 30-day retention on shared media; when the limit is hit, uploads pause until the billing period renews. Pro is $100/month for 35,000 screenshots, extra at $0.004 each ($0.0015 for Storybook). (Source: [Argos pricing](https://argos-ci.com/pricing), read 2026-11-19)
- `@argos-ci/cli` and `@argos-ci/playwright` require Node >= 22. (Source: [npm registry, @argos-ci/cli](https://www.npmjs.com/package/@argos-ci/cli))

Percy (BrowserStack)
- Free plan: 5,000 screenshots per month, unlimited users, unlimited projects. A screenshot is one page or component in one browser at one width: "two pages rendered across two browsers and three widths" is 12 screenshots. (Source: [BrowserStack docs, Percy plans and billing](https://www.browserstack.com/docs/percy/overview/plans-and-billing), read 2026-11-19)
- Paid pricing as reported by a competitor: Desktop $199/month billed annually ($249 monthly) for 10,000 screenshots, $0.036 per extra screenshot. (Source: [Argos blog, "Visual testing pricing in 2026"](https://argos-ci.com/blog/visual-testing-pricing); competitor source seen as a search summary, not verified on BrowserStack's page; other third-party sites give $149 and $399 figures that conflict)
- The GitHub Marketplace listing is reported to show the same 5,000 allowance with a 10 team member cap, which conflicts with "unlimited users" in BrowserStack's docs. (Source: [GitHub Marketplace, Percy](https://github.com/marketplace/percy), via search summary; contradicted by [BrowserStack docs](https://www.browserstack.com/docs/percy/overview/plans-and-billing))

Chromatic
- Free: $0, 5,000 billed snapshots per month (25,000 "turbosnaps"), Chrome only, unlimited projects, users and collaborators, "No credit card required." Starter $179/month for 35,000 snapshots with Chrome, Safari, Firefox, Edge, extra at $0.008 each; Pro $399/month for 85,000. (Source: [Chromatic pricing](https://www.chromatic.com/pricing), read 2026-11-19)
- The `chromatic` CLI requires Node >= 22. (Source: [npm registry, chromatic](https://www.npmjs.com/package/chromatic))

### Inferences
- "Truly free, no account, self-hosted" in practice means a small script on Playwright plus a diff engine, or reg-cli for the folder comparison and HTML report. BackstopJS technically qualifies but brings a stale Puppeteer 22 pin, a Resemble.js comparator and an unowned repo; adopting it in late 2026 is a maintenance risk.
- Lost Pixel should be treated as end-of-life: archived repo, last release 2024, pinned to Playwright 1.47 against 1.65 current. It still runs in OSS mode but will not track new browsers.
- Free-tier arithmetic for a responsive sweep: Percy counts each page at each width in each browser as one screenshot. With the site's roughly 22 page routes plus 82 case studies and 124 posts, a sweep of every URL at, say, 6 widths is about (22 + 82 + 124) × 6 = 1,368 screenshots per run, so a 5,000 per month free tier covers about 3 full runs. The hosted free tiers do not fit an agent that iterates many times a day. (Route and content counts are from the project's own CLAUDE.md, not a web source; the 6 widths are an assumed example.)
- Chromatic is built around Storybook stories; the repo has 19 component stories, so Chromatic could cover components but not full responsive pages without extra setup, and it still needs an account.
- Argos's server code is MIT and the repo carries Docker files, but no self-hosting guide was found, so "open source" there does not currently translate to a documented no-account path.
- Hosted services also send page renders to a third party; for unreleased client case-study media that is a governance question separate from price.

### Gaps
- Percy's own pricing page did not yield its plan table (content truncated), so paid prices are second-hand and conflicting; what happens when the free 5,000 is exceeded is not stated in the docs page read.
- Whether Argos can be self-hosted, and whether its SDK works with no token for purely local comparison, was not confirmed.
- BackstopJS and reg-suit GitHub release pages showed no entries in the fetch; dates given are npm publish dates.
- Whether Lost Pixel's hosted Platform is still accepting sign-ups after the sunset notice was not checked.
- Chromatic's page does not say outright that an account is required; it is implied by the sign-up flow and the project token model.

## How to make a contact sheet or montage of many screenshots in Node without native paid tools (sharp, Playwright rendering an HTML grid, ImageMagick)

### Takeaway
Two free routes need nothing beyond what is already on the Mac: `sharp.composite()` onto a blank canvas (sharp 0.35.5, Apache-2.0, prebuilt binaries, no system install), or an HTML grid of `<img>` tags that Playwright itself screenshots. ImageMagick's `montage` would also do it but is not installed on this machine and is an extra system dependency.

### Cited Findings
- sharp latest is 0.35.5, published 2026-09-27, licence Apache-2.0, `engines.node >=20.9.0`, unpacked 962 kB plus one prebuilt platform package; the registry lists prebuilt optional packages for darwin-arm64, darwin-x64, linux-x64, linux-arm64, linuxmusl and others, with bundled libvips. (Source: [npm registry, sharp](https://www.npmjs.com/package/sharp), queried 2026-11-19)
- `composite(images)` takes a list of overlays, each with `input` (Buffer, file path, or a `create` object), `top` and `left` pixel offsets, `gravity` (default `'centre'`), `tile`, `blend` (default `'over'`). "If both `top` and `left` options are provided, they take precedence over `gravity`." (Source: [sharp docs, composite](https://sharp.pixelplumbing.com/api-composite/))
- "The images to composite must be the same size or smaller than the processed image." Resize, rotate, flip, flop and extract on the base "will always be applied to the input image before composition." (Source: [sharp docs, composite](https://sharp.pixelplumbing.com/api-composite/))
- A blank canvas is made with `create: { width, height, channels: 3 or 4, background }`. `limitInputPixels` defaults to 268402689. (Source: [sharp docs, composite](https://sharp.pixelplumbing.com/api-composite/))
- Playwright can return a screenshot as a buffer or write it to a path, and can screenshot any page it loads, including a local HTML file. (Source: [Playwright docs, Screenshots](https://playwright.dev/docs/screenshots))
- `pngjs` 7.0.0 (MIT, last published 2023-02-20) is the pure-JS PNG codec that pixelmatch's CLI depends on; `jimp` 1.6.1 (MIT, published 2026-04-07, 3.3 MB, Node >= 18) is a pure-JS image library. (Sources: [npm registry, pngjs](https://www.npmjs.com/package/pngjs); [npm registry, jimp](https://www.npmjs.com/package/jimp))
- odiff's README benchmarks ImageMagick `compare` at 8.881 s against odiff 1.168 s on the same images, which confirms ImageMagick is usable for diffs from the command line but slow. (Source: [odiff README](https://github.com/dmtrKovalenko/odiff))

### Inferences
- sharp recipe: read each screenshot's metadata, resize each to a fixed thumbnail width (each overlay must be resized in its own `sharp()` pipeline first, because `composite` does not resize overlays), compute a grid, create one blank canvas, and call `composite()` once with a `top`/`left` per tile. Labels can be added as SVG text overlays since `input` accepts buffers.
- 268402689 pixels is 16383 × 16383, so a contact sheet (and any single full-page screenshot fed to sharp) must stay under that area or the limit must be raised deliberately. A 1440 px wide page can be up to about 186,000 px tall before hitting it, so the limit matters for the montage canvas rather than individual captures.
- HTML grid recipe: write a temporary HTML file with a CSS grid of `<img src="file://...">` plus a caption per tile (route, width, height), open it with the same Playwright browser, and take one `fullPage` screenshot. This needs no extra dependency, gives real text labels for free, and lets the sheet show full-height pages scaled by CSS. Its weakness is very tall sheets, where browsers cap the capture surface; splitting into one sheet per route or per width avoids that.
- For an AI agent reviewing layout, a sheet of one route across all widths (same scale, aligned at the top) is more useful than one giant sheet: the agent can compare how each section reflows. Keep the originals; a downscaled sheet hides 1 px overflow and hairline strokes.
- sharp is present in `node_modules` here only as a transitive dependency (likely via Astro's image service); a script should declare it as a dev dependency before relying on it.
- ImageMagick: `montage` is the classic tool, but it is absent on this Mac and would need Homebrew locally and a package install in CI; nothing found here justifies adding it when sharp or the HTML grid covers the need.

### Gaps
- ImageMagick's current version, licence text and `montage` options were not fetched; no source is cited for them.
- The maximum screenshot height Chromium will capture in one `fullPage` call was not found in the docs read.
- No source was read on sharp's behaviour or memory use when compositing hundreds of tiles in one call.

## What pixel-diff visual regression fundamentally cannot tell you

### Takeaway
A pixel diff answers one question: did these two images differ, and where. It cannot say whether either image is good, cannot see anything that was not captured (states, widths, interactions, browsers), and treats a harmless rendering wobble and a missing section as the same kind of event.

### Cited Findings
- A pixel diff cannot separate a harmless change from a failure: there is no threshold that separates "shadow rounded differently" from a component that failed to render, because to a pixel diff both are just pixels that changed. (Source: [DZone, "Visual regression anti-aliasing"](https://dzone.com/articles/visual-regression-anti-aliasing); practitioner article seen as a search summary)
- Raising tolerance to quiet noise hides real breaks: it "just trades false positives for false negatives", since a genuinely moved button has to clear the same bar as carousel noise. (Source: [dev.to, "Stop trusting screenshots"](https://dev.to/mihail_147bfaf4bbb8ec9949/stop-trusting-screenshots-why-visual-regression-monitoring-cries-wolf-and-how-to-fix-it-25j1); practitioner post seen as a search summary)
- Full-page captures are broad but noisy, because any dynamic content such as timestamps, advertisements or animation frames produces false positives. (Source: [BrowserStack guide, visual regression testing](https://www.browserstack.com/guide/test-ui-components); vendor source seen as a search summary)
- Visual testing "does not catch interaction bugs, logic errors, accessibility issues, or performance regressions"; a button that renders perfectly but does not respond to clicks passes. (Source: [testwithpinpoint.com, visual regression testing guide](https://testwithpinpoint.com/blog/visual-regression-testing-guide); practitioner blog seen as a search summary, attribution among the summarised sources is approximate)
- Baselines need ownership or they go stale and generate false positives for months; teams that make noisy visual checks a hard CI gate tend to bypass or disable the gate within a quarter. (Source: [vegastack.com, baseline management](https://vegastack.com/blog/how-to-fix-visual-testing-baseline-management-issues); experience report seen as a search summary, not a study)
- The result is only valid within one rendering environment: "Browser rendering can vary based on the host OS, version, settings, hardware, power source." (Source: [Playwright docs, Visual comparisons](https://playwright.dev/docs/test-snapshots))
- Same-size requirement: pixelmatch errors on mismatched dimensions (exit code 65) and odiff returns a separate `layout-diff` reason, so a page that grew taller gives "different size", not a localised diff. (Sources: [pixelmatch README](https://github.com/mapbox/pixelmatch); [odiff README](https://github.com/dmtrKovalenko/odiff))
- Anything masked or hidden to stabilise the capture is by construction not tested: Playwright's `mask` covers elements with a pink box and `stylePath` is described as "filtering out dynamic or volatile elements". (Sources: [Playwright docs, PageAssertions](https://playwright.dev/docs/api/class-pageassertions); [Playwright docs, Visual comparisons](https://playwright.dev/docs/test-snapshots))
- `animations: "disabled"` fast-forwards finite animations to their end and resets infinite ones to their initial state, so the screenshot shows an end or start frame, never the motion. (Source: [Playwright docs, PageAssertions](https://playwright.dev/docs/api/class-pageassertions))
- AI or semantic comparison is offered as a mitigation but brings its own false negatives (misses a subtle defect) and false positives (reports a defect that is not there). (Source: [contextqa.com](https://contextqa.com/?p=30296); vendor source seen as a search summary, attribution approximate)

### Inferences
- No baseline, no verdict. A first capture of a new page or a redesigned template has nothing to compare against, so pixel diff contributes nothing to "is this layout good"; it only guards a state someone already approved. If the baseline was bad, the tool faithfully defends the bad layout.
- It measures change, not quality: hierarchy, spacing rhythm, alignment to a grid, whether text is readable, whether a crop cuts off a face, whether a tablet layout is just a stretched phone layout. None of these produce a diff unless they changed, and a change in them is not labelled as better or worse.
- It only sees the sampled widths. A layout that breaks at 820 px passes if the sweep captured 768 and 1024. Overflow and breakpoint bugs between sampled widths need a denser sweep or DOM measurements (for example comparing `scrollWidth` with `clientWidth`), which are a different kind of check.
- It only sees the captured state: no hover, focus, open menu, expanded accordion, lightbox, error state, or slow-network state unless each is scripted. Content below unrevealed scroll animations may be captured as blank and then baselined as blank.
- It only sees the captured engine and device profile. Chromium emulating an iPhone viewport is not Safari on iOS; font rasterisation, safe areas and dynamic toolbars differ.
- A global shift floods the diff: one extra line of text near the top moves everything below it, so the diff lights up the whole page and says little about cause. Element-level or section-level captures localise this better than full-page ones.
- Counts and ratios are weak severity signals: a 1 px border colour change across a tall page can exceed a ratio that a missing call-to-action button does not. pixelmatch 8's `windowSize` (largest cluster rather than total) is a partial answer.
- For an AI agent the practical split is: pixel diff as a cheap tripwire that says which routes and widths changed and where, then a separate judgement step (a vision model or a human reading the contact sheet, plus DOM and accessibility checks) to decide whether the change is acceptable. The first never substitutes for the second.

### Gaps
- No rigorous study quantifying false-positive rates of pixel diffing on responsive pages was found; the limitation claims above are from vendor and practitioner posts, most read only as search summaries.
- No primary source was found that states "visual regression only tells you something changed, not that it is right" in those words; the closest is the DZone argument cited above.

## Can these tools run in a Cloudflare Pages build (constraint check)

### Takeaway
Nothing in Cloudflare's build documentation says a browser is available, and reports from comparable managed build hosts show Playwright's dependency install failing without root. Plan to run captures on the Mac or in a separate CI runner against the deployed `*.pages.dev` preview, not inside the Pages build.

### Cited Findings
- The current Pages build system is v3 on Ubuntu 22.04.2 x86_64 with Node.js 22.23.4 by default (set with `NODE_VERSION`); "Cloudflare Pages builds are run in a gVisor container." The page lists languages and tools (Go, Node, Bun, Python, Ruby, npm, pnpm, Yarn, Hugo and others) and makes no mention of browsers, Chromium, Playwright, Puppeteer, apt or root access. (Source: [Cloudflare Pages docs, Build image](https://developers.cloudflare.com/pages/configuration/build-image/), read 2026-11-19)
- Free plan limits: 500 builds per month, 1 concurrent build, "Builds will timeout after 20 minutes", up to 20,000 files per site, 25 MiB per asset. (Source: [Cloudflare Pages docs, Limits](https://developers.cloudflare.com/pages/platform/limits/), read 2026-11-19)
- On Netlify, `playwright install --with-deps chromium` failed at the dependency step and a user reported `playwright-core install chromium` (no `--with-deps`) working; on Render the flag tried to run apt-get, which the platform blocked, and setting `PLAYWRIGHT_BROWSERS_PATH` to a project folder was part of the fix. These are other hosts, not Cloudflare. (Sources: [Netlify forum, "Build fails because of Playwright install"](https://answers.netlify.com/t/build-fails-because-of-playwright-install/123506/); [dev.to, Playwright build errors on Render](https://dev.to/ttibbs/fixing-playwright-build-errors-on-render-when-browsers-are-missing-276g); both seen as search summaries)
- Playwright officially supports Ubuntu 22.04 x86-64, which matches the Pages v3 image's OS and architecture. (Sources: [Playwright docs, Installation](https://playwright.dev/docs/intro); [Cloudflare Pages docs, Build image](https://developers.cloudflare.com/pages/configuration/build-image/))

### Inferences
- The OS matches, so a browser download might work in a Pages build, but the shared libraries Chromium needs are not documented as present and there is no documented way to install them; whether it runs is unverified and should be assumed "no" until a test build proves otherwise.
- Even if it ran, it would be a poor fit: every screenshot run would spend one of 500 monthly builds and part of a 20-minute limit, downloads a few hundred MB of browser per build, and the build has no running copy of the SSR site (a Workers runtime) to point the browser at.
- Pure-JS or prebuilt-binary pieces (pixelmatch, reg-cli's WASM, odiff's linux-x64 binary, sharp's linux-x64 binary) should run in the Pages build since they need no system packages, so comparing two folders of already-captured images there is plausible; capturing is the part that is not.
- Baselines captured on macOS and compared against Linux captures will differ in font rendering. Capture both sides on the same machine: for an agent on the Mac, that means before and after both on the Mac (for example production or main preview URL against the branch preview URL in the same run).

### Gaps
- No Cloudflare source or community thread was found that confirms or denies Playwright or Chromium running inside a Pages build; this is the main open question and needs a direct test.
- Memory and CPU limits of the Pages build container were not on the pages read.
- Cloudflare's separate Browser Rendering product (a hosted headless browser with its own free allowance) was not researched here; it is a cloud service with an account, outside the "no account" constraint.
