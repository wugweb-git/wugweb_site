/**
 * GSAP scroll-transform animations.
 *
 * Adds scroll-triggered section transforms (parallax rise, scale-in,
 * fade-up) to elements marked with [data-scroll]. Respects reduced
 * motion. Free-tier safe — no CDN dependency, bundled locally.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations(): () => void {
  if (typeof window === 'undefined') return () => {};
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return () => {};

  const sections = document.querySelectorAll('[data-scroll]');
  const cleanups: (() => void)[] = [];

  sections.forEach((el) => {
    const kind = (el as HTMLElement).dataset.scroll || 'fade-up';
    const delay = Number((el as HTMLElement).dataset.scrollDelay || 0);

    // Start hidden (prevent FOUC)
    gsap.set(el, { opacity: 0 });

    let vars: gsap.TweenVars = { opacity: 1, duration: 0.9, ease: 'power2.out', delay };
    if (kind === 'rise') {
      vars = { ...vars, y: 80 };
    } else if (kind === 'scale') {
      vars = { ...vars, scale: 0.92, transformOrigin: 'center center' };
    } else if (kind === 'fade-up') {
      vars = { ...vars, y: 40 };
    } else if (kind === 'parallax') {
      // Parallax: element moves at a different rate than the scroll
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

    const tween = gsap.to(el, {
      ...vars,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
    cleanups.push(() => tween.scrollTrigger?.kill());
  });

  return () => {
    cleanups.forEach((fn) => fn());
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}
