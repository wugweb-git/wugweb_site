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

  /**
   * Scroll lock (UI audit §7.4). `body { overflow: hidden }` is ignored by
   * iOS Safari, so the page kept scrolling behind the open menu — visible in
   * the audit's 02-new-menu-open-390.png. `position: fixed` is the technique
   * that actually holds there, but it collapses the page to the top, so the
   * scroll offset is saved on lock and restored on release.
   *
   * `locked` guards the restore: setOpen(false) also fires on resize and on
   * every link click, and an unguarded scrollTo would yank the page to a
   * stale offset when nothing had been locked.
   */
  let locked = false;
  let lockedScrollY = 0;

  const setScrollLock = (lock: boolean) => {
    const body = document.body;
    if (lock === locked) return;
    if (lock) {
      lockedScrollY = window.scrollY;
      body.style.position = 'fixed';
      body.style.top = `-${lockedScrollY}px`;
      body.style.insetInline = '0';
      body.style.width = '100%';
      locked = true;
    } else {
      body.style.position = '';
      body.style.top = '';
      body.style.insetInline = '';
      body.style.width = '';
      locked = false;
      window.scrollTo(0, lockedScrollY);
    }
  };

  const setOpen = (open: boolean) => {
    nav.dataset.open = open ? 'true' : 'false';
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    setScrollLock(open && window.matchMedia('(max-width: 767px)').matches);
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
