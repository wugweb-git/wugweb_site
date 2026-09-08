/**
 * Ball field — social discs floating inside a bounded box, draggable.
 *
 * Modelled on the "Bouncy Swag Socials" reference. No gravity: the discs float
 * rather than fall. Everything else behaves the way a ball in a box should —
 * grab one and it follows the pointer, let go and it carries the velocity of
 * the throw, it reflects off the four walls, and it cannot pass through its
 * neighbours.
 *
 * Vanilla and self-contained; GSAP has no rigid-body solver and pulling one in
 * for five circles would be absurd.
 */

type Disc = { el: HTMLElement; x: number; y: number; vx: number; vy: number; r: number };

/** Idle drift — slow enough to read as float, not motion for its own sake. */
const DRIFT = 0.34;
/** Energy kept on a wall bounce. */
const WALL = 0.86;
/** Per-frame damping, so a hard throw settles back to a drift. */
const DAMP = 0.992;
/** A thrown disc decelerates to roughly this and keeps going. */
const FLOOR_SPEED = 0.18;
const MAX_SPEED = 26;
/** How hard a tilt pulls. Tuned so a comfortable hand-tilt drifts the discs
 *  rather than slamming them into a wall. */
const TILT_GAIN = 0.012;
/** Shake / slide impulse per unit of device acceleration. */
const SHAKE_GAIN = 0.11;

export function initBallField(): () => void {
  if (typeof window === 'undefined') return () => {};
  const fields = Array.from(document.querySelectorAll<HTMLElement>('[data-ball-field]'));
  if (fields.length === 0) return () => {};

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cleanups: (() => void)[] = [];

  fields.forEach((field) => {
    if (field.dataset.ballsBound === '1') return;
    field.dataset.ballsBound = '1';

    const els = Array.from(field.querySelectorAll<HTMLElement>('[data-ball]'));
    if (els.length === 0) return;

    let W = 0;
    let H = 0;
    let discs: Disc[] = [];
    let raf = 0;
    let held: Disc | null = null;
    let heldId = -1;
    let last = { x: 0, y: 0 };
    let dragged = false;

    /** Deterministic 0..1 — the same arrangement every load, so it reads as a
     *  designed composition rather than a different one on every visit. */
    const rand = (n: number) => {
      const s = Math.sin(n * 12.9898) * 43758.5453;
      return s - Math.floor(s);
    };

    const layout = () => {
      const box = field.getBoundingClientRect();
      W = box.width;
      H = box.height;
      const r = els[0].offsetWidth / 2;
      const step = W / (els.length + 1);
      discs = els.map((el, i) => {
        const a = rand(i + 1) * Math.PI * 2;
        return {
          el,
          r,
          x: Math.min(W - r, Math.max(r, step * (i + 1))),
          y: Math.min(H - r, Math.max(r, H * (0.55 + rand(i * 3 + 5) * 0.32))),
          vx: Math.cos(a) * DRIFT,
          vy: Math.sin(a) * DRIFT * 0.7,
        };
      });
    };

    const draw = () => {
      for (const d of discs) {
        d.el.style.transform = `translate(${(d.x - d.r).toFixed(1)}px, ${(d.y - d.r).toFixed(1)}px)`;
      }
    };

    const step = () => {
      for (const d of discs) {
        if (d === held) continue;

        // Tilt leans the whole box.
        d.vx += tiltX;
        d.vy += tiltY;

        d.x += d.vx;
        d.y += d.vy;
        d.vx *= DAMP;
        d.vy *= DAMP;

        // Keep a floor under the speed so a disc never stalls dead — it should
        // always be drifting, just more slowly after a throw decays.
        const sp = Math.hypot(d.vx, d.vy);
        if (sp < FLOOR_SPEED && sp > 0.0001) {
          d.vx = (d.vx / sp) * FLOOR_SPEED;
          d.vy = (d.vy / sp) * FLOOR_SPEED;
        }

        // Reflect and clamp on the same frame: without the clamp a disc left
        // outside the box by a resize can never get back in.
        let hitX = false;
        let hitY = false;
        if (d.x - d.r <= 0) { d.x = d.r; d.vx = Math.abs(d.vx) * WALL; hitX = true; }
        else if (d.x + d.r >= W) { d.x = W - d.r; d.vx = -Math.abs(d.vx) * WALL; hitX = true; }
        if (d.y - d.r <= 0) { d.y = d.r; d.vy = Math.abs(d.vy) * WALL; hitY = true; }
        else if (d.y + d.r >= H) { d.y = H - d.r; d.vy = -Math.abs(d.vy) * WALL; hitY = true; }

        // Squash against the wall it hit, but only on a real impact — at drift
        // speed a disc touches the wall every few seconds and a squash there
        // would look like a twitch.
        if ((hitX || hitY) && Math.hypot(d.vx, d.vy) > 1.6) squash(d, hitX ? 'x' : 'y');
      }

      // Disc-to-disc. Equal masses, so a hit swaps the velocity components
      // along the line joining the centres. Separate before responding, or
      // they sink into one another and stick.
      for (let i = 0; i < discs.length; i++) {
        for (let j = i + 1; j < discs.length; j++) {
          const a = discs[i];
          const b = discs[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 1;
          const overlap = a.r + b.r - dist;
          if (overlap <= 0) continue;

          const nx = dx / dist;
          const ny = dy / dist;
          const shift = overlap / (a === held || b === held ? 1 : 2);
          if (a !== held) { a.x -= nx * shift; a.y -= ny * shift; }
          if (b !== held) { b.x += nx * shift; b.y += ny * shift; }

          const rel = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
          if (rel > 0) continue;
          const imp = -rel;
          if (a !== held) { a.vx -= imp * nx; a.vy -= imp * ny; }
          if (b !== held) { b.vx += imp * nx; b.vy += imp * ny; }
        }
      }

      draw();
      raf = requestAnimationFrame(step);
    };

    /** Brief squash on impact. The class is removed on animationend so a disc
     *  hitting two walls in quick succession still gets both. */
    const squash = (d: Disc, axis: 'x' | 'y') => {
      const cls = axis === 'x' ? 'is-squash-x' : 'is-squash-y';
      if (d.el.classList.contains(cls)) return;
      d.el.classList.add(cls);
      d.el.addEventListener('animationend', () => d.el.classList.remove(cls), { once: true });
    };

    const toLocal = (e: PointerEvent) => {
      const box = field.getBoundingClientRect();
      return { x: e.clientX - box.left, y: e.clientY - box.top };
    };

    const onDown = (e: PointerEvent) => {
      const p = toLocal(e);
      const hit = discs.find((d) => Math.hypot(d.x - p.x, d.y - p.y) <= d.r);
      if (!hit) return;
      held = hit;
      heldId = e.pointerId;
      dragged = false;
      last = p;
      hit.el.classList.add('is-held');
      field.setPointerCapture(e.pointerId);
    };

    const onMove = (e: PointerEvent) => {
      if (!held || e.pointerId !== heldId) return;
      const p = toLocal(e);
      if (Math.hypot(p.x - last.x, p.y - last.y) > 2) dragged = true;
      // Velocity is the pointer's own movement, so the throw matches the
      // gesture rather than being a guess at its force.
      held.vx = p.x - last.x;
      held.vy = p.y - last.y;
      held.x = Math.min(W - held.r, Math.max(held.r, p.x));
      held.y = Math.min(H - held.r, Math.max(held.r, p.y));
      last = p;
    };

    const release = () => {
      if (!held) return;
      const sp = Math.hypot(held.vx, held.vy);
      if (sp > MAX_SPEED) {
        held.vx = (held.vx / sp) * MAX_SPEED;
        held.vy = (held.vy / sp) * MAX_SPEED;
      }
      held.el.classList.remove('is-held');
      held = null;
      heldId = -1;
    };

    // A drag must not also follow the link. `dragged` is set once the pointer
    // has actually moved, so a plain click still opens the profile.
    const onClick = (e: MouseEvent) => { if (dragged) { e.preventDefault(); dragged = false; } };

    /* ---- device tilt and slide ----
     * Tilt is a steady pull, the way a tray of marbles behaves when you lean
     * it. Slide/shake is an impulse, so a flick of the phone scatters them.
     *
     * iOS gates both behind a permission prompt that only a user gesture may
     * request, so it is asked for on the first touch of the field — a real
     * interaction with the toy — and never on load. Denial is silent: the
     * discs still drift and drag, they just do not answer the device.
     */
    let tiltX = 0;
    let tiltY = 0;

    const onTilt = (e: DeviceOrientationEvent) => {
      // gamma: left/right, beta: front/back. Clamped — past ~45° the reading
      // is unstable and the intent is not "harder" anyway.
      const g = Math.max(-45, Math.min(45, e.gamma ?? 0));
      const b = Math.max(-45, Math.min(45, (e.beta ?? 0) - 35));
      tiltX = g * TILT_GAIN;
      tiltY = b * TILT_GAIN;
    };

    const onShake = (e: DeviceMotionEvent) => {
      const a = e.acceleration;
      if (!a) return;
      const ax = a.x ?? 0;
      const ay = a.y ?? 0;
      if (Math.hypot(ax, ay) < 2.5) return;
      for (const d of discs) {
        if (d === held) continue;
        d.vx += -ax * SHAKE_GAIN;
        d.vy += ay * SHAKE_GAIN;
      }
    };

    let motionBound = false;
    const bindMotion = () => {
      if (motionBound) return;
      motionBound = true;
      window.addEventListener('deviceorientation', onTilt);
      window.addEventListener('devicemotion', onShake);
      cleanups.push(() => {
        window.removeEventListener('deviceorientation', onTilt);
        window.removeEventListener('devicemotion', onShake);
      });
    };

    const askMotion = () => {
      const DOE = (window as any).DeviceOrientationEvent;
      const DME = (window as any).DeviceMotionEvent;
      const needsAsk = DOE && typeof DOE.requestPermission === 'function';
      if (!needsAsk) { bindMotion(); return; }
      Promise.all([
        DOE.requestPermission().catch(() => 'denied'),
        DME && typeof DME.requestPermission === 'function'
          ? DME.requestPermission().catch(() => 'denied')
          : Promise.resolve('granted'),
      ]).then(([o, m]) => { if (o === 'granted' || m === 'granted') bindMotion(); });
    };

    layout();
    draw();

    if (reduced) return;

    field.addEventListener('pointerdown', askMotion, { once: true });
    field.addEventListener('pointerdown', onDown);
    field.addEventListener('pointermove', onMove);
    field.addEventListener('pointerup', release);
    field.addEventListener('pointercancel', release);
    field.addEventListener('click', onClick, true);

    // Only run while the panel is on screen — an off-screen banner should not
    // hold a rAF loop open.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting && !raf) raf = requestAnimationFrame(step);
          else if (!en.isIntersecting && raf) { cancelAnimationFrame(raf); raf = 0; }
        });
      },
      { threshold: 0 }
    );
    io.observe(field);

    const onResize = () => { layout(); draw(); };
    window.addEventListener('resize', onResize);

    cleanups.push(() => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      field.removeEventListener('pointerdown', askMotion);
      field.removeEventListener('pointerdown', onDown);
      field.removeEventListener('pointermove', onMove);
      field.removeEventListener('pointerup', release);
      field.removeEventListener('pointercancel', release);
      field.removeEventListener('click', onClick, true);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}
