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

    let onScreen = false;

    /**
     * Loop rules (kits-gsap-owns-motion): a visible loop runs 15s or less, a
     * clip over 5s gets a pause control and is exposed to assistive tech, a
     * clip of 5s or less stays hidden with no control, and nothing autoplays
     * under reduced motion. Duration is read from each clip's own metadata,
     * so the rule holds for any clip without a list of lengths.
     */
    const MAX_LOOP_S = 15;
    const CONTROL_OVER_S = 5;
    // timeupdate fires roughly every 250ms, so wrap a beat early to keep the
    // visible loop at or under the cap.
    const WRAP_AT_S = MAX_LOOP_S - 0.25;

    // Per clip: the visitor's own choice, kept for as long as the page is open.
    // 'paused' wins over autoplay; 'playing' is how reduced motion opts in.
    const choice = new Map<HTMLVideoElement, 'paused' | 'playing'>();
    const wantsPlay = (v: HTMLVideoElement) => {
      const c = choice.get(v);
      return c ? c === 'playing' : !reduce;
    };

    const syncControl = (v: HTMLVideoElement) => {
      const ctl = v.parentElement?.querySelector<HTMLButtonElement>('[data-pause]');
      if (!ctl) return;
      const playing = !v.paused;
      ctl.dataset.state = playing ? 'playing' : 'paused';
      const label = playing ? ctl.dataset.labelPause : ctl.dataset.labelPlay;
      if (label) ctl.setAttribute('aria-label', label);
    };

    const syncVideos = () => {
      const key = String(active);
      cards.forEach((c) => {
        const video = c.querySelector<HTMLVideoElement>('[data-video]');
        if (!video) return;
        const isActive = c.dataset.card === key;
        if (isActive && reduce && video.readyState === 0 && video.preload === 'none') {
          // No autoplay here, but the control needs the duration to decide
          // whether it exists. Metadata only, and only for the active row.
          video.preload = 'metadata';
          video.load();
        }
        if (isActive && wantsPlay(video)) video.play().catch(() => {});
        else video.pause();
      });
    };

    const setActive = (i: number) => {
      if (active === i) return;
      active = i;
      const key = String(i);
      root.classList.toggle('is-active', !reduce && layers.some((l) => l.dataset.bg === key));
      layers.forEach((l) => l.classList.toggle('is-visible', !reduce && l.dataset.bg === key));
      syncVideos();
    };

    cards.forEach((c) => {
      const video = c.querySelector<HTMLVideoElement>('[data-video]');
      const ctl = c.querySelector<HTMLButtonElement>('[data-pause]');
      if (!video) return;

      const applyDuration = () => {
        const d = video.duration;
        if (!Number.isFinite(d) || d <= CONTROL_OVER_S || !ctl) return;
        video.removeAttribute('aria-hidden');
        if (video.dataset.label) video.setAttribute('aria-label', video.dataset.label);
        ctl.hidden = false;
        syncControl(video);
      };
      if (video.readyState >= 1) applyDuration();
      else video.addEventListener('loadedmetadata', applyDuration, { once: true });

      video.addEventListener('timeupdate', () => {
        if (video.currentTime >= WRAP_AT_S) video.currentTime = 0;
      });
      video.addEventListener('play', () => syncControl(video));
      video.addEventListener('pause', () => syncControl(video));

      if (!ctl) return;
      ctl.addEventListener('focus', () => { stopCycle(); setActive(Number(c.dataset.card)); });
      ctl.addEventListener('blur', () => { setActive(pinned); queueCycle(IDLE_MS); });
      ctl.addEventListener('click', (e) => {
        e.stopPropagation();
        const next = video.paused ? 'playing' : 'paused';
        choice.set(video, next);
        if (next === 'playing') video.play().catch(() => {});
        else video.pause();
      });
    });

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
