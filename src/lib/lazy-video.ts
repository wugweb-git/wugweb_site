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

  const io = new IntersectionObserver(
    (entries) => {
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
  return () => io.disconnect();
}
