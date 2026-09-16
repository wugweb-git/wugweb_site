/**
 * Behaviour for `SiteHeader.astro` — the mobile menu toggle.
 *
 * Extracted from the component's `<script>` so Storybook can run it; stories
 * are Container-rendered HTML with no script execution. Guarded per nav so a
 * repeat call cannot bind the toggle twice and cancel itself out.
 */
export function initSiteHeader(): void {
  const nav = document.getElementById('site-nav');
  const toggle = document.getElementById('nav-toggle');
  if (!nav || !toggle || nav.dataset.navBound === '1') return;
  nav.dataset.navBound = '1';

  const setOpen = (open: boolean) => {
    nav.dataset.open = open ? 'true' : 'false';
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow =
      open && window.matchMedia('(max-width: 767px)').matches ? 'hidden' : '';
  };

  toggle.addEventListener('click', () => {
    setOpen(nav.dataset.open !== 'true');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 768px)').matches) setOpen(false);
  });
}
