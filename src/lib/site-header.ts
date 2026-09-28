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
      /* Read a layout property first. Clearing `position: fixed` does not
         restore the document's scroll height until layout is recalculated, so
         an immediate scrollTo clamps against the collapsed height and lands
         near the top before the browser corrects it - a visible flash. */
      void body.offsetHeight;
      /* `behavior: 'instant'` is required, not cosmetic: global.css sets
         `html { scroll-behavior: smooth }`, which a plain scrollTo obeys - so
         restoring the offset ANIMATED the page from the top back down to it,
         measured climbing 0 -> 1 -> 4.5 -> 11 -> 21.5 across successive frames.
         Closing the menu visibly flew the page back. This restores in one
         frame, which is what a scroll lock is supposed to look like. */
      window.scrollTo({ top: lockedScrollY, left: 0, behavior: 'instant' });
    }
  };

  const setOpen = (open: boolean) => {
    nav.dataset.open = open ? 'true' : 'false';
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    setScrollLock(open && window.matchMedia('(max-width: 767.98px)').matches);
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
