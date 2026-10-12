/**
 * Draggable service tags.
 *
 * A field of pill "tags" that fly in on load, can be dragged freely with
 * momentum, always come to the front while dragged, and expand in place to
 * reveal a description and a link.
 *
 * Rebuilt natively from the Framer "Draggable Tags" reference. Uses GSAP's
 * Draggable + InertiaPlugin, both already present in `gsap` 3.15 — no new
 * dependency, and no React.
 *
 * Expected markup (see `src/pages/index.astro`):
 *   [data-tag-field]
 *     └─ .tag[data-tag]              absolutely positioned, --tag-x/--tag-y/--tag-rot
 *        ├─ button.tag-face          the grab handle + expand toggle
 *        └─ .tag-body                description + link, height-animated
 */
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Draggable, InertiaPlugin, ScrollTrigger, Flip);

/** Base stacking order; a dragged or open tag is lifted above every sibling. */
const Z_BASE = 10;
const Z_FRONT = 999;

export function initDraggableTags(): () => void {
  if (typeof window === 'undefined') return () => {};
  const fields = document.querySelectorAll<HTMLElement>('[data-tag-field]');
  if (fields.length === 0) return () => {};

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cleanups: (() => void)[] = [];

  fields.forEach((field) => {
    const tags = Array.from(field.querySelectorAll<HTMLElement>('[data-tag]'));
    if (tags.length === 0) return;

    let top = Z_BASE + tags.length;
    const bringToFront = (el: HTMLElement) => {
      top += 1;
      el.style.zIndex = String(top);
    };

    // Resting rotation is authored per tag; drag and inertia only ever add
    // translation on top of it, so the tag never loses its tilt.
    tags.forEach((tag, i) => {
      tag.style.zIndex = String(Z_BASE + i);
      gsap.set(tag, { rotation: Number(tag.dataset.tagRot || 0) });
    });

    /**
     * Authored `%` positions are art-directed for a wide field; on a narrow one
     * a tag's own width pushes it past the right edge, which overflowed the
     * page horizontally at 375px. Clamp each resting position into the field
     * once real widths are known (after fonts settle), and again on resize.
     */
    const clampToField = () => {
      const fr = field.getBoundingClientRect();
      tags.forEach((tag) => {
        const r = tag.getBoundingClientRect();
        let dx = 0;
        let dy = 0;
        if (r.right > fr.right) dx = fr.right - r.right;
        if (r.left + dx < fr.left) dx = fr.left - r.left;
        if (r.bottom > fr.bottom) dy = fr.bottom - r.bottom;
        if (r.top + dy < fr.top) dy = fr.top - r.top;
        if (dx || dy) {
          tag.style.left = `${r.left - fr.left + dx}px`;
          tag.style.top = `${r.top - fr.top + dy}px`;
        }
      });
    };
    clampToField();
    if (document.fonts?.status !== 'loaded') document.fonts?.ready.then(clampToField);
    // GSAP 3.15 has no utils.debounce, so the old `gsap.utils.debounce?.(…)
    // ?? clampToField` always fell through and ran clampToField on EVERY resize
    // event, undebounced. A local 150 ms trailing debounce restores the intent.
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(clampToField, 150);
    };
    window.addEventListener('resize', onResize);
    cleanups.push(() => {
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
    });

    /**
     * ---- entry / exit ----
     *
     * Fly in: each tag starts outside the field, pushed away from the field's
     * centre along its own axis so they arrive from different directions, then
     * springs into place with a stagger. Measured off the reference, the settle
     * is a spring tail — still drifting at ~650ms, static by ~1.2s, with no
     * opacity or scale change during that tail — so the overshoot is in the
     * ease (`back.out`) rather than a separate tween.
     *
     * The reference page does not scroll, so it has no exit. Ours does: the
     * timeline reverses when the field leaves the viewport in either direction,
     * so tags fly back out the way they came.
     */
    if (!reduced) {
      const fieldRect = field.getBoundingClientRect();
      const origin = tags.map((tag) => {
        const r = tag.getBoundingClientRect();
        const dx = r.left + r.width / 2 - (fieldRect.left + fieldRect.width / 2);
        const dy = r.top + r.height / 2 - (fieldRect.top + fieldRect.height / 2);
        const len = Math.hypot(dx, dy) || 1;
        // Push clear of the field, so every tag genuinely enters from outside.
        const throwBy = Math.max(fieldRect.width, fieldRect.height) * 0.75;
        return { x: (dx / len) * throwBy, y: (dy / len) * throwBy };
      });

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: field,
          start: 'top 85%',
          // The field is shorter than the viewport, so the end has to stay well
          // inside the screen: at `bottom 15%` the range was already passed the
          // moment the field entered, firing onLeave and reversing immediately.
          // At 40% the tags are still visible as they fly back out.
          end: 'bottom 40%',
          toggleActions: 'play reverse play reverse',
        },
      });
      intro.from(tags, {
        x: (i: number) => origin[i].x,
        y: (i: number) => origin[i].y,
        rotation: (i: number) => Number(tags[i].dataset.tagRot || 0) + gsap.utils.random(-22, 22),
        scale: 0.7,
        opacity: 0,
        duration: 1.1,
        ease: 'back.out(1.5)',
        stagger: { each: 0.08, from: 'random' },
      });

      // Once the visitor has moved a tag themselves, stop replaying the intro
      // over their arrangement.
      field.addEventListener(
        'tagdragged',
        () => intro.scrollTrigger?.disable(false),
        { once: true }
      );
    }

    /* ---- expand / collapse ---- */
    const setOpen = (tag: HTMLElement, open: boolean) => {
      const body = tag.querySelector<HTMLElement>('.tag-body');
      const face = tag.querySelector<HTMLElement>('.tag-face');
      tag.classList.toggle('is-open', open);
      face?.setAttribute('aria-expanded', String(open));

      // The clip ships preload="none", so it only downloads once a tag is
      // actually opened — never on page load.
      const video = tag.querySelector<HTMLVideoElement>('[data-tag-video]');
      if (video) {
        if (open && !reduced) video.play().catch(() => {});
        else video.pause();
      }

      // Media sits above the title row and the copy panel below it, so both
      // collapse independently but animate as one.
      const media = tag.querySelector<HTMLElement>('.tag-media');
      const panels = [media, body].filter(Boolean) as HTMLElement[];
      if (panels.length === 0) return;

      if (reduced) {
        panels.forEach((p) => (p.style.height = open ? 'auto' : '0px'));
        return;
      }
      // Animate to the measured height, then release to `auto` so the panel
      // stays correct if the text reflows.
      panels.forEach((p) =>
        gsap.to(p, {
          height: open ? p.scrollHeight : 0,
          duration: 0.45,
          ease: 'power3.out',
          onComplete: () => {
            if (open) p.style.height = 'auto';
          },
        })
      );

      // The panel's contents (media, then copy, then link) rise in behind the
      // opening height so the reveal reads as one gesture rather than a box
      // that snaps open with everything already in it.
      const parts = tag.querySelectorAll('.tag-media > *, .tag-body-inner > *');
      if (open) {
        gsap.fromTo(
          parts,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.07, delay: 0.1, ease: 'power2.out' }
        );
      } else {
        gsap.to(parts, { y: 8, opacity: 0, duration: 0.2, ease: 'power2.in' });
      }
    };

    const closeAll = (except?: HTMLElement) =>
      tags.forEach((t) => t !== except && t.classList.contains('is-open') && setOpen(t, false));

    tags.forEach((tag) => {
      const face = tag.querySelector<HTMLElement>('.tag-face');
      const launch = tag.querySelector<HTMLAnchorElement>('[data-tag-launch]');

      /**
       * "Learn more" grows the card to fill the viewport, then navigates — so
       * the tag reads as opening into the service page rather than the page
       * simply cutting. FLIP handles the position swap to `fixed`; rotation is
       * eased out alongside so it lands square.
       */
      launch?.addEventListener('click', (e) => {
        const href = launch.getAttribute('href');
        // Modified clicks (new tab/window) and reduced motion navigate normally.
        if (!href || reduced || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();

        const state = Flip.getState(tag, { props: 'borderRadius,backgroundColor' });
        tag.classList.add('is-launching');

        gsap.to(
          tags.filter((t) => t !== tag),
          { opacity: 0, scale: 0.92, duration: 0.3, ease: 'power2.in' }
        );
        gsap.to(tag, { rotation: 0, duration: 0.55, ease: 'power3.inOut' });

        Flip.from(state, {
          duration: 0.55,
          ease: 'power3.inOut',
          absolute: true,
          onComplete: () => {
            window.location.href = href;
          },
        });
      });

      // The whole pill toggles; the round `+` chip inside it is the affordance
      // and rotates to a cross via CSS. Draggable suppresses the click after a
      // real drag, so a click here is always a genuine tap.
      face?.addEventListener('click', () => {
        const open = !tag.classList.contains('is-open');
        closeAll(tag);
        setOpen(tag, open);
        if (open) bringToFront(tag);
      });
    });

    /* ---- drag ---- */

    /**
     * Drag trail: a silhouette of the tag dropped at intervals behind it, which
     * fades and shrinks away. Cloned from the tag's own unrotated box plus its
     * live transform, so the echo carries the same tilt rather than an
     * axis-aligned rectangle. Each removes itself, so at a 55ms cadence and a
     * 0.5s life there are never more than ~9 in the DOM.
     */
    let lastEcho = 0;
    const spawnEcho = (tag: HTMLElement) => {
      const now = performance.now();
      if (now - lastEcho < 55) return;
      lastEcho = now;

      const echo = document.createElement('span');
      echo.className = 'tag-echo';
      echo.style.left = `${tag.offsetLeft}px`;
      echo.style.top = `${tag.offsetTop}px`;
      echo.style.width = `${tag.offsetWidth}px`;
      echo.style.height = `${tag.offsetHeight}px`;
      echo.style.background = getComputedStyle(tag).backgroundColor;
      echo.style.borderRadius = getComputedStyle(tag).borderRadius;
      field.appendChild(echo);

      gsap.set(echo, {
        x: gsap.getProperty(tag, 'x'),
        y: gsap.getProperty(tag, 'y'),
        rotation: gsap.getProperty(tag, 'rotation'),
      });
      gsap.to(echo, {
        opacity: 0,
        scale: 0.88,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => echo.remove(),
      });
    };

    const instances = Draggable.create(tags, {
      type: 'x,y',
      bounds: field,
      edgeResistance: 0.72,
      inertia: true,
      allowContextMenu: true,
      // Let the expand button and the link stay clickable, and let a vertical
      // page scroll win on touch until the pointer clearly moves sideways.
      dragClickables: true,
      minimumMovement: 3,
      onPressInit(this: Draggable) {
        bringToFront(this.target as HTMLElement);
      },
      onDragStart(this: Draggable) {
        (this.target as HTMLElement).classList.add('is-dragging');
        field.dispatchEvent(new CustomEvent('tagdragged'));
        if (!reduced) gsap.to(this.target, { scale: 1.05, duration: 0.2, ease: 'power2.out' });
      },
      onDrag(this: Draggable) {
        if (!reduced) spawnEcho(this.target as HTMLElement);
      },
      onDragEnd(this: Draggable) {
        (this.target as HTMLElement).classList.remove('is-dragging');
        if (!reduced) gsap.to(this.target, { scale: 1, duration: 0.35, ease: 'power2.out' });
      },
    });

    cleanups.push(() => instances.forEach((d) => d.kill()));
  });

  // The homepage loads lazy media and hero video below/above this section, so
  // the document height keeps changing after init and ScrollTrigger's cached
  // start/end positions go stale — the intro then never fires, or fires and
  // immediately reverses. Recompute once the page has actually settled.
  ScrollTrigger.refresh();
  if (document.readyState !== 'complete') {
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  }

  return () => cleanups.forEach((fn) => fn());
}
