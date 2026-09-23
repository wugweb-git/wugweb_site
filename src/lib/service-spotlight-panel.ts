/**
 * Behaviour for `ServiceSpotlightPanel.astro`.
 *
 * Lives here (not the component's `<script>`) so Storybook can run it —
 * stories render through Astro's Container API, which emits HTML without
 * executing script tags, but a component's own script (a thin import + call)
 * still ships as part of the real page document and runs normally once
 * loaded in a browser, on the live site or in Storybook alike.
 *
 * CSS owns the expand/collapse; this only drives the two things CSS cannot:
 * starting/stopping video playback (clips ship `preload="none"` and no
 * autoplay, so nothing downloads until a row is actually active) and
 * crossfading the full-bleed backdrop layer.
 */
export function initServiceSpotlightPanel(): void {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover)');

  document.querySelectorAll<HTMLElement>('[data-showcase]').forEach((root) => {
    if (root.dataset.showcaseBound === '1') return;
    root.dataset.showcaseBound = '1';

    const cards = Array.from(root.querySelectorAll<HTMLElement>('.showcase-card'));
    const layers = Array.from(root.querySelectorAll<HTMLElement>('.showcase-bg-img'));
    let active = -1;
    let pinned = -1;

    const setActive = (i: number) => {
      if (active === i) return;
      active = i;
      const key = String(i);
      root.classList.toggle('is-active', !reduce && layers.some((l) => l.dataset.bg === key));
      layers.forEach((l) => l.classList.toggle('is-visible', !reduce && l.dataset.bg === key));
      cards.forEach((c) => {
        const video = c.querySelector<HTMLVideoElement>('[data-video]');
        if (!video) return;
        if (!reduce && c.dataset.card === key) video.play().catch(() => {});
        else video.pause();
      });
    };

    /**
     * Idle auto-advance. After the pointer leaves, the showcase waits out the
     * idle delay and then walks itself through the rows, one per dwell, with
     * the progress hairline counting each one down. Any interaction stops it;
     * leaving restarts the wait. It only runs on hover-capable devices (phones
     * are already driven by scroll), only while the panel is on screen, and
     * never under prefers-reduced-motion.
     */
    const IDLE_MS = 2500;
    const DWELL_MS = 4000;
    root.style.setProperty('--showcase-dwell', `${DWELL_MS}ms`);
    let timer = 0;
    let onScreen = false;

    const open = (i: number) => {
      pinned = i;
      cards.forEach((c) => {
        const on = Number(c.dataset.card) === i;
        c.classList.toggle('is-open', on);
        c.querySelector('.showcase-toggle')?.setAttribute('aria-expanded', String(on));
      });
      setActive(i);
    };

    const stopCycle = () => {
      window.clearTimeout(timer);
      timer = 0;
      root.classList.remove('is-cycling');
    };

    // Stop after one full lap instead of cycling forever — left running, the
    // idle auto-advance pulls every clip in the row (~40s of dwell = the
    // full clip library, ~11.5MB on the brand pillar) for a visitor who
    // walked away. One lap shows everything once, which is the point of an
    // idle preview; a visitor who's still there can keep hovering/clicking.
    let stepsThisLap = 0;

    const queueCycle = (delay: number) => {
      stopCycle();
      if (reduce || !canHover.matches || !onScreen || cards.length < 2) return;
      timer = window.setTimeout(() => {
        root.classList.add('is-cycling');
        stepsThisLap = 0;
        const step = () => {
          open((pinned + 1) % cards.length);
          stepsThisLap += 1;
          if (stepsThisLap >= cards.length) {
            stopCycle();
            return;
          }
          timer = window.setTimeout(step, DWELL_MS);
        };
        step();
      }, delay);
    };

    new IntersectionObserver(
      ([e]) => {
        onScreen = e.isIntersecting;
        if (onScreen) queueCycle(IDLE_MS);
        else stopCycle();
      },
      // threshold 0, deliberately: the panel is taller than the viewport on
      // long pillars (Engineering has 20 rows), so any ratio-based threshold
      // could never be met and cycling would never start.
      { threshold: 0 }
    ).observe(root);

    cards.forEach((card) => {
      const i = Number(card.dataset.card);
      const btn = card.querySelector<HTMLButtonElement>('.showcase-toggle');
      if (!btn) return;

      card.addEventListener('pointerenter', () => {
        if (!canHover.matches) return;
        stopCycle();
        setActive(i);
      });
      card.addEventListener('pointerleave', () => {
        if (!canHover.matches) return;
        setActive(pinned);
        queueCycle(IDLE_MS);
      });
      btn.addEventListener('focus', () => { stopCycle(); setActive(i); });
      btn.addEventListener('blur', () => { setActive(pinned); queueCycle(IDLE_MS); });

      // Click pins a card open — this is the explicit touch path and the
      // keyboard path (Enter/Space fire click natively).
      btn.addEventListener('click', () => {
        stopCycle();
        if (pinned === i) {
          pinned = -1;
          card.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
          setActive(-1);
        } else {
          open(i);
        }
      });
    });

    /**
     * Phones have no hover, so scrolling drives the showcase instead: the row
     * crossing the middle of the screen becomes the active one, expanding its
     * thumbnail and crossfading the backdrop as you scroll. The rootMargin
     * collapses the viewport to a thin band at its centre, so exactly one row
     * is "intersecting" at a time — no scroll listener, no rAF loop.
     */
    if (!canHover.matches && !reduce && 'IntersectionObserver' in window) {
      const spotlight = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const i = Number((entry.target as HTMLElement).dataset.card);
            pinned = i;
            cards.forEach((c) => {
              const on = c === entry.target;
              c.classList.toggle('is-open', on);
              c.querySelector('.showcase-toggle')?.setAttribute('aria-expanded', String(on));
            });
            setActive(i);
          }
        },
        { rootMargin: '-48% 0px -48% 0px', threshold: 0 }
      );
      cards.forEach((c) => spotlight.observe(c));
    }
  });
}
