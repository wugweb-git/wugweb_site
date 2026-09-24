/**
 * Lazy looping video.
 *
 * The problem this solves, measured on the production homepage: 12.3 MB of
 * video downloaded on first load, 11 MB of it work-grid thumbnails that sit
 * below the fold. Every one of those carried `preload="none"`, which did
 * nothing — the HTML spec requires a browser to fetch and play an `autoplay`
 * video regardless of the preload hint, so `autoplay` silently defeats it.
 *
 * So the markup drops `autoplay` and puts the URL in `data-src`. Nothing is
 * fetched until the element is near the viewport, at which point the src is
 * attached and playback starts. The result is identical — every video still
 * loops automatically — it just happens when someone can actually see it.
 *
 * Quality is untouched. This changes WHEN a file downloads, never which file
 * or at what resolution, so nothing looks softer on a high-density screen.
 *
 * Videos that are genuinely above the fold (page heroes) keep plain `autoplay`
 * in the markup and are not handled here.
 */

const NEAR_VIEWPORT = '600px';

export function initLazyVideo(): () => void {
  if (typeof window === 'undefined') return () => {};

  const videos = Array.from(
    document.querySelectorAll<HTMLVideoElement>('video[data-src]')
  );
  if (!videos.length) return () => {};

  // No IntersectionObserver (or reduced data preference): attach everything
  // rather than leaving blank boxes. Correctness beats the optimisation.
  const saveData = (navigator as any)?.connection?.saveData === true;
  if (!('IntersectionObserver' in window)) {
    videos.forEach(attach);
    return () => {};
  }

  function attach(v: HTMLVideoElement) {
    if (v.dataset.src && !v.src) {
      v.src = v.dataset.src;
      // Only now is a network request worth making.
      v.preload = 'auto';
    }
  }

  // Whether IntersectionObserver has produced a single callback. If it never
  // does, the scroll fallback below takes over. See the note on `sweep`.
  let ioEverFired = false;

  const io = new IntersectionObserver(
    (entries) => {
      ioEverFired = true;
      for (const entry of entries) {
        const v = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          const wasAttached = Boolean(v.getAttribute('src'));
          attach(v);
          // play() on a src set moments earlier rejects — there are no frames
          // to show yet. Measured: calling it immediately started 1 of 7. So
          // wait for loadeddata on the first attach, and play directly only
          // when the source is already there (scrolling back to a seen card).
          if (wasAttached) {
            v.play?.().catch(() => {});
          } else {
            v.addEventListener('loadeddata', () => v.play?.().catch(() => {}), { once: true });
          }
        } else {
          // Pausing offscreen stops decoding work on long grids. The file is
          // already cached, so resuming is free.
          v.pause?.();
        }
      }
    },
    { rootMargin: `${NEAR_VIEWPORT} 0px`, threshold: 0.01 }
  );

  // saveData: attach on demand only, never speculatively.
  if (saveData) {
    videos.forEach((v) => {
      v.addEventListener('click', () => { attach(v); v.play?.().catch(() => {}); }, { once: true });
    });
    return () => {};
  }

  videos.forEach((v) => io.observe(v));

  /**
   * Safety net, for the same reason the `[data-reveal]` watchdog in BaseLayout
   * exists: when this mechanism silently fails, the failure mode is a
   * permanently blank box, which is worse than the download it was avoiding.
   *
   * IntersectionObserver does not run while a document is hidden. A page opened
   * in a background tab, restored from a session, or prerendered therefore
   * observes nothing until it is looked at. `visibilitychange` normally wakes it
   * up — but "normally" is exactly the word that earned this net. Verified the
   * hard way: an entire debugging pass of this file was spent chasing a
   * "sitewide broken lazy loader" that was only ever a hidden test viewport.
   *
   * So: on becoming visible, and once a few seconds after load regardless,
   * sweep for anything already inside the viewport and attach it directly.
   * Cheap (a handful of getBoundingClientRect calls), idempotent (attach() is
   * a no-op once src is set), and it only ever attaches what is genuinely on
   * screen — it never widens what gets downloaded.
   */
  const sweep = () => {
    for (const v of videos) {
      if (v.getAttribute('src')) continue;
      const r = v.getBoundingClientRect();
      const visible = r.bottom > 0 && r.top < (window.innerHeight || 0) && r.width > 0;
      if (!visible) continue;
      attach(v);
      v.addEventListener('loadeddata', () => v.play?.().catch(() => {}), { once: true });
    }
  };

  const onVisible = () => { if (document.visibilityState === 'visible') sweep(); };
  document.addEventListener('visibilitychange', onVisible);

  /**
   * A single sweep three seconds in only rescues what happens to be on screen
   * at that instant — it does nothing for someone who scrolls a minute later.
   * So if the observer has STILL not produced a single callback by then, treat
   * it as unavailable and fall back to watching scroll directly.
   *
   * The check is `ioEverFired`, not a feature test, because the ways this
   * breaks are environmental rather than absent-API: a hidden document, a
   * prerendered page, a zero-area viewport. IntersectionObserver exists in all
   * of them and simply never calls back.
   *
   * Cost when IO works, which is almost always: one timeout, no listener. The
   * fallback is rAF-throttled, so a scroll costs one rect read per video per
   * frame at worst, and each video drops out of the sweep the moment it is
   * attached.
   */
  let onScroll: (() => void) | null = null;
  const timer = window.setTimeout(() => {
    sweep();
    if (ioEverFired) return;
    // Throttled on a timer, NOT requestAnimationFrame. rAF is paused while a
    // document is hidden — which is one of the exact conditions that stops the
    // observer and brings us here, so throttling on it would make the fallback
    // unavailable in the case it exists for. Timers keep firing (throttled) in
    // a hidden document; rAF does not.
    let ticking = false;
    onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.setTimeout(() => { ticking = false; sweep(); }, 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }, 3000);

  return () => {
    io.disconnect();
    document.removeEventListener('visibilitychange', onVisible);
    if (onScroll) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }
    clearTimeout(timer);
  };
}
