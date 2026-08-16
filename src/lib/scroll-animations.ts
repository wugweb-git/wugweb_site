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

  return () => {
    cleanups.forEach((fn) => fn());
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}
