/**
 * GSAP scroll-transform animations.
 *
 * Single animation system for the site. Handles:
 *  - `[data-scroll]` section transforms (rise / scale / fade-up / parallax)
 *  - `[data-reveal]` entrances (fade + rise on scroll, `data-reveal-delay` for stagger)
 * Respects reduced motion. Free-tier safe — no CDN dependency, bundled locally.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations(): () => void {
  if (typeof window === 'undefined') return () => {};
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cleanups: (() => void)[] = [];

  // [data-reveal] — entrances. Reduced motion: just show.
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    if (prefersReduced) {
      gsap.set(el, { opacity: 1 });
      return;
    }
    const delay = Number((el as HTMLElement).dataset.revealDelay || 0);
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    );
    cleanups.push(() => tween.scrollTrigger?.kill());
  });

  if (prefersReduced) return () => {};

  // [data-scroll] — section transforms
  const sections = document.querySelectorAll('[data-scroll]');
  sections.forEach((el) => {
    const kind = (el as HTMLElement).dataset.scroll || 'fade-up';
    const delay = Number((el as HTMLElement).dataset.scrollDelay || 0);

    let fromVars: gsap.TweenVars = { opacity: 0 };
    let toVars: gsap.TweenVars = { 
      opacity: 1, 
      duration: 0.85, 
      ease: 'power3.out', 
      delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      }
    };

    if (kind === 'rise') {
      fromVars = { ...fromVars, y: 50 };
      toVars = { ...toVars, y: 0 };
    } else if (kind === 'scale') {
      fromVars = { ...fromVars, scale: 0.95 };
      toVars = { ...toVars, scale: 1 };
    } else if (kind === 'fade-up') {
      fromVars = { ...fromVars, y: 30 };
      toVars = { ...toVars, y: 0 };
    } else if (kind === 'bento') {
      /**
       * BentoBlock enter / exit.
       *
       * Tiles rise and settle in a column-aware stagger — left column first,
       * each column's tiles a beat behind the last — so the block builds rather
       * than appearing all at once. It reverses on the way back out, matching
       * how the Client Assembly Grid disperses.
       *
       * `end` deliberately stays inside the viewport: this section is shorter
       * than the screen on a laptop, and a ratio-based end would already be
       * passed on entry, firing onLeave and reversing immediately.
       */
      const tiles = Array.from(el.querySelectorAll<HTMLElement>('.bento-tile'));
      if (tiles.length === 0) return;

      const tween = gsap.from(tiles, {
        y: 48,
        scale: 0.96,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: { each: 0.07, from: 'start' },
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          end: 'bottom 35%',
          toggleActions: 'play reverse play reverse',
        },
      });
      cleanups.push(() => tween.scrollTrigger?.kill());
      return;
    } else if (kind === 'cardstack') {
      /**
       * Card stack reveal — the cards begin as a deck and are dealt into the
       * list as the section passes.
       *
       * Deck geometry is taken from the reference: each card behind the front
       * sits 45px further back in Z under a 500px perspective, blurs by another
       * 1.5px and drops 0.12 of opacity. The reference *auto-cycles* that deck;
       * this does not — these are five steps somebody has to read, not a
       * carousel. Scrubbed to scroll so the reader deals the deck themselves.
       *
       * The collapse offset is measured from each card's own layout position,
       * so it holds whatever the card height, the gap or the count.
       */
      const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-stack-card]'));
      if (cards.length < 2) return;

      const base = cards[0].offsetTop;
      // A sequential deal needs a longer range than a simultaneous one: each
      // card gets its own slice, so the range has to cover the whole list.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'bottom 65%',
          scrub: 0.5,
        },
      });

      /**
       * Sequential, not simultaneous. Every card animating on the same beat
       * moved the whole column at once and read as a curtain rising. Each card
       * now lands on its own slice of the scrub, in order, so the pile builds
       * downwards — card two settles under card one, three under two.
       *
       * `stagger` would not do it: these are separate fromTo tweens with
       * per-card start values, so the offsets are timeline positions.
       */
      const n = cards.length - 1;
      const SETTLE = 0.55;              // how long one card takes, in timeline units
      const STEP = n > 1 ? (1 - SETTLE) / (n - 1) : 0;

      cards.forEach((card, i) => {
        if (i === 0) return;
        // Collapse onto the card above, plus a few px of peek so the deck
        // reads as a stack rather than one card.
        const collapse = base - card.offsetTop - i * 12;
        tl.fromTo(
          card,
          {
            y: collapse,
            z: -45 * i,
            // Deeper falloff than the reference's. Its deck is only ever seen
            // at rest; ours is watched mid-deal, and at 0.12 per card the one
            // behind was still legible through the gap.
            filter: `blur(${Math.min(2.2 * i, 8)}px)`,
            opacity: Math.max(0.22, 1 - 0.26 * i),
          },
          { y: 0, z: 0, filter: 'blur(0px)', opacity: 1, ease: 'power1.out', duration: SETTLE },
          (i - 1) * STEP
        );
      });

      cleanups.push(() => tl.scrollTrigger?.kill());
      return;
    } else if (kind === 'banner') {
      /**
       * Final CTA banner — enter, exit, and a scroll-scrubbed drift.
       *
       * The panel rises and settles, then its heading, supporting line and
       * button follow in order. It reverses on the way out, so scrolling back
       * up re-plays it rather than leaving a block that only ever arrives.
       *
       * GSAP owns `transform` and `opacity` on the panel and the sheen here,
       * which is why the hover state in CSS is `filter` and `box-shadow` only.
       */
      const sheen = el.querySelector<HTMLElement>('.cta-sheen');
      const heading = el.querySelector('h2');
      const inner = el.querySelector('.final-cta-inner');
      const copy = el.querySelector('.final-cta-copy');
      const btn = el.querySelector('.btn');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse',
        },
      });
      tl.from(el, { y: 44, scale: 0.975, opacity: 0, duration: 0.75, ease: 'power3.out' }, 0);
      if (heading) tl.from(heading, { y: 18, opacity: 0, duration: 0.55, ease: 'power2.out' }, 0.16);
      if (copy) tl.from(copy, { y: 14, opacity: 0, duration: 0.5, ease: 'power2.out' }, 0.26);
      if (btn) tl.from(btn, { y: 14, opacity: 0, duration: 0.5, ease: 'power2.out' }, 0.34);
      cleanups.push(() => tl.scrollTrigger?.kill());

      // The light band crosses the panel once over the section's own travel,
      // so the surface reads as lit rather than printed. Scrubbed, not timed —
      // it should track the reader, not run on its own clock.
      if (sheen) {
        const drift = gsap.fromTo(
          sheen,
          { xPercent: -40 },
          {
            xPercent: 240,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          }
        );
        cleanups.push(() => drift.scrollTrigger?.kill());
      }
      return;
    } else if (kind === 'processmap') {
      /**
       * Deliberately no entrance tween here.
       *
       * The ProcessMap owns its own motion in the component: a scroll-driven
       * phase walk, spring-loaded connecting lines, and hover focus. An
       * entrance timeline on top of that put three owners on `opacity` and two
       * on `transform` — the chips position themselves with a CSS translate,
       * which a GSAP x/y tween silently clobbers — and the result was a
       * timeline frozen mid-flight with most of the map invisible.
       *
       * Same rule as the BentoBlock: never give one property two owners.
       */
      return;
    } else if (kind === 'assemble') {
      /**
       * Scroll-scrubbed assemble / hold / disperse, for a grid of children.
       *
       * Each child starts small, rotated, and pushed out to its own scattered
       * position; scrolling in pulls them together into the grid at full size;
       * they hold through the middle of the pass; then they scatter back out
       * the way they came as the section leaves. Offsets are derived from each
       * child's own position (pushed outward from the grid's centre, plus
       * deterministic jitter), so every item travels a different distance and
       * direction rather than the whole grid scaling as one.
       *
       * All `transform` — no layout work per frame, and nothing can alter a
       * child's aspect ratio (governance.md §8).
       *
       * The parent must clip: scattered children sit outside its box.
       */
      // Children marked `data-assemble-static` stay put — e.g. a heading
      // sitting inside the grid rather than above it.
      const items = (Array.from(el.children) as HTMLElement[]).filter(
        (c) => !('assembleStatic' in c.dataset)
      );
      if (items.length === 0) return;

      // Deterministic 0..1 from an index — same scatter on every load.
      const rand = (n: number) => {
        const s = Math.sin(n * 12.9898) * 43758.5453;
        return s - Math.floor(s);
      };

      const cx = el.offsetWidth / 2;
      const cy = el.offsetHeight / 2;
      const scatter = items.map((it, i) => {
        const dx = it.offsetLeft + it.offsetWidth / 2 - cx;
        const dy = it.offsetTop + it.offsetHeight / 2 - cy;
        const spread = 1.1 + rand(i + 1) * 1.5;
        return {
          x: dx * spread + (rand(i * 2 + 7) - 0.5) * 260,
          y: dy * spread + (rand(i * 3 + 13) - 0.5) * 220,
          rot: (rand(i * 5 + 21) - 0.5) * 30,
        };
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
      });
      tl.fromTo(
        items,
        {
          x: (i: number) => scatter[i].x,
          y: (i: number) => scatter[i].y,
          rotate: (i: number) => scatter[i].rot,
          scale: 0.45,
        },
        { x: 0, y: 0, rotate: 0, scale: 1, ease: 'none', duration: 0.42 },
        0
      );
      tl.to(
        items,
        {
          x: (i: number) => scatter[i].x,
          y: (i: number) => scatter[i].y,
          rotate: (i: number) => scatter[i].rot,
          scale: 0.45,
          ease: 'none',
          duration: 0.42,
        },
        0.58
      );
      cleanups.push(() => tl.scrollTrigger?.kill());
      return;
    } else if (kind === 'parallax') {
      const tween = gsap.to(el, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
      cleanups.push(() => tween.scrollTrigger?.kill());
      return;
    }

    // Set starting state
    gsap.set(el, fromVars);

    // Animate to base state
    const tween = gsap.to(el, toVars);
    cleanups.push(() => tween.scrollTrigger?.kill());
  });

  // Pages keep growing after init as lazy images and video load, which leaves
  // every trigger's cached start/end behind the real layout — a block then
  // never fires, or fires and immediately reverses. Recompute once the page has
  // actually settled.
  ScrollTrigger.refresh();
  if (document.readyState !== 'complete') {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad, { once: true });
    cleanups.push(() => window.removeEventListener('load', onLoad));
  }

  return () => {
    cleanups.forEach((fn) => fn());
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}
