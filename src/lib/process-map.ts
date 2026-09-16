/**
 * Behaviour for `ProcessMap.astro` — phase focus and the elastic edges.
 *
 * Extracted from the component's `<script>` so Storybook can run it: stories
 * render through Astro's Container API, which emits HTML and never executes a
 * script tag. Binding is guarded by `data-pm-bound`, so calling this twice
 * (site nav, story re-render) is safe.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Phase focus, driven from two places that must not fight each other:
 *
 *  - the pointer (or keyboard focus) on a hub or a chip, which wins while it
 *    is engaged;
 *  - scroll position through the section, which walks the phases in order so
 *    the map reads itself to someone who never touches it.
 *
 * The pointer takes precedence and scroll resumes on leave, so the two never
 * argue over the same frame.
 */
export function initProcessMap(): void {
  document.querySelectorAll<HTMLElement>('[data-process-map]').forEach((panel) => {
    const fig = panel.querySelector<HTMLElement>('.pm-figure');
    if (!fig || fig.dataset.pmBound === '1') return;
    fig.dataset.pmBound = '1';

    const marked = Array.from(fig.querySelectorAll<HTMLElement>('[data-pm-phase]'));
    const phaseCount = new Set(marked.map((el) => el.dataset.pmPhase)).size;
    if (phaseCount === 0) return;

    let scrollPhase = -1;
    let hoverPhase = -1;

    const paint = () => {
      const active = hoverPhase >= 0 ? hoverPhase : scrollPhase;
      fig.classList.toggle('is-focused', active >= 0);
      marked.forEach((el) => {
        el.classList.toggle('is-lit', Number(el.dataset.pmPhase) === active);
      });
      // An edge joins two hubs, so it lights for either of them.
      fig.querySelectorAll<SVGPathElement>('[data-pm-edge]').forEach((el) => {
        const i = Number((el as unknown as HTMLElement).dataset.pmOrder);
        el.classList.toggle('is-lit', active >= 0 && (i === active || i + 1 === active));
      });
    };

    const setHover = (p: number) => {
      if (hoverPhase === p) return;
      hoverPhase = p;
      paint();
    };

    marked.forEach((el) => {
      const p = Number(el.dataset.pmPhase);
      el.addEventListener('pointerenter', () => setHover(p));
      el.addEventListener('focusin', () => setHover(p));
    });
    fig.addEventListener('pointerleave', () => setHover(-1));
    fig.addEventListener('focusout', (e) => {
      if (!fig.contains(e.relatedTarget as Node)) setHover(-1);
    });

    /* ---- elastic connecting lines ----
     * Each edge is one quadratic; only its control point moves, so a frame
     * costs one string write per edge and no layout at all.
     *
     * The control point is a damped harmonic oscillator:
     *     a = (target - x) * k  -  v * c
     * `returnSpeed` is k (how hard it is pulled home) and `oscillation` maps
     * to c (how much it rings on the way). Integrated on rAF rather than
     * tweened, because the target changes every time the pointer moves and
     * a tween would have to be rebuilt each frame.
     *
     * The target is the pointer's vertical offset from the edge's resting
     * midpoint, falling off with horizontal distance, so a curve reacts to a
     * pointer passing over it and ignores one at the far end of the chain.
     */
    const edgeEls = Array.from(fig.querySelectorAll<SVGPathElement>('[data-pm-edge]'));
    const sensitivity = Number(fig.dataset.pmSensitivity ?? 0.55);
    const k = Number(fig.dataset.pmReturn ?? 0.1);
    /*
     * Damping is expressed relative to *critical* damping, 2·√k — the value
     * at which the spring returns in the shortest time without overshooting.
     * `oscillation: 0` sits exactly there (a clean settle) and 1 approaches
     * undamped (rings for a long time). A flat 0..1 coefficient does not
     * work here: at k = 0.1, critical is 0.63, so anything above that never
     * wobbles at all — which is what the first cut of this did.
     */
    const critical = 2 * Math.sqrt(k);
    const c = critical * (1 - Math.min(0.97, Math.max(0, Number(fig.dataset.pmOscillation ?? 0.78))) * 0.9);

    if (edgeEls.length > 0 && sensitivity > 0) {
      const svg = fig.querySelector('svg')!;
      const num = (el: Element, k2: string) => Number((el as HTMLElement).dataset[k2]);
      const springs = edgeEls.map((el) => ({
        el,
        x1: num(el, 'x1'), y1: num(el, 'y1'),
        x2: num(el, 'x2'), y2: num(el, 'y2'),
        cx: num(el, 'cx'), cy: num(el, 'cy'),
        offset: 0, vel: 0, target: 0,
      }));
      /** Falloff radius in field units — roughly one hub gap. */
      const REACH = 260;

      let pointerIn = false;
      let raf = 0;
      let idleFrames = 0;

      const toField = (e: PointerEvent) => {
        const r = svg.getBoundingClientRect();
        const vb = (svg as unknown as SVGSVGElement).viewBox.baseVal;
        return {
          x: ((e.clientX - r.left) / r.width) * vb.width,
          y: ((e.clientY - r.top) / r.height) * vb.height,
        };
      };

      const tick = () => {
        let moving = false;
        for (const sp of springs) {
          const a = (sp.target - sp.offset) * k - sp.vel * c;
          sp.vel += a;
          sp.offset += sp.vel;
          if (Math.abs(sp.vel) > 0.02 || Math.abs(sp.target - sp.offset) > 0.02) moving = true;
          sp.el.setAttribute(
            'd',
            `M ${sp.x1} ${sp.y1} Q ${sp.cx} ${(sp.cy + sp.offset).toFixed(2)}, ${sp.x2} ${sp.y2}`
          );
        }
        // Stop the loop once everything has settled and the pointer is gone,
        // so an off-screen map costs nothing.
        idleFrames = moving || pointerIn ? 0 : idleFrames + 1;
        if (idleFrames > 30) { raf = 0; return; }
        raf = requestAnimationFrame(tick);
      };
      const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };

      fig.addEventListener('pointermove', (e) => {
        pointerIn = true;
        const p = toField(e as PointerEvent);
        for (const sp of springs) {
          const mx = (sp.x1 + sp.x2) / 2;
          const falloff = Math.max(0, 1 - Math.abs(p.x - mx) / REACH);
          sp.target = (p.y - sp.cy) * sensitivity * falloff * falloff;
        }
        kick();
      });
      fig.addEventListener('pointerleave', () => {
        pointerIn = false;
        for (const sp of springs) sp.target = 0;
        kick();
      });
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Scroll walks the phases while the section holds the viewport. The
    // range is the section's own travel, so a taller section simply reads
    // more slowly rather than needing different numbers.
    const st = ScrollTrigger.create({
      trigger: panel,
      start: 'top 60%',
      end: 'bottom 40%',
      onUpdate: (self) => {
        const p = Math.min(phaseCount - 1, Math.floor(self.progress * phaseCount));
        if (p !== scrollPhase) {
          scrollPhase = p;
          paint();
        }
      },
      onLeave: () => { scrollPhase = -1; paint(); },
      onLeaveBack: () => { scrollPhase = -1; paint(); },
    });
    fig.addEventListener('pm:destroy', () => st.kill());
  });
}
