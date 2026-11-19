// src/lib/case-lightbox.ts
//
// One-screen viewer for the case-study page. Opens from any element that
// carries [data-case-lightbox-src]; the All screens block is the main user.
//
// - Native <dialog> + showModal(): Esc and the focus trap come from the browser.
// - One screen at a time, with its caption and its position in its set,
//   written as "3 of 8, Member". Previous and next stay inside the set.
// - Previous, next and close are real buttons. Swipe and the arrow keys are
//   extra ways to move, never the only way.
// - The back action closes the viewer. Each screen has a deep link (the id of
//   its thumbnail as the URL hash) that opens the viewer at that screen.
// - Focus returns to the thumbnail that opened the viewer.
// - Nothing plays sound: the viewer shows images only.
//
// Call initCaseLightbox() once per page. Calling it again is safe.

export interface LightboxItem {
  el: HTMLElement;
  src: string;
  caption: string;
  alt: string;
  set: string;
}

const DIALOG_ID = 'case-lightbox-dialog';
let wired = false;

/** "3 of 8, Member", or "3 of 8" when the screen belongs to no named set. */
export function positionLabel(position: number, total: number, set: string): string {
  return set ? `${position} of ${total}, ${set}` : `${position} of ${total}`;
}

export function initCaseLightbox(): void {
  if (typeof document === 'undefined' || wired) return;
  const triggers = Array.from(document.querySelectorAll<HTMLElement>('[data-case-lightbox-src]'));
  if (triggers.length === 0) return;
  wired = true;

  const items: LightboxItem[] = triggers.map(el => ({
    el,
    src: el.dataset.caseLightboxSrc || '',
    caption: el.dataset.caseLightboxCaption || '',
    alt: el.dataset.caseLightboxAlt || el.getAttribute('aria-label') || '',
    set: el.dataset.caseLightboxSet || ''
  }));

  const dialog = document.createElement('dialog');
  dialog.id = DIALOG_ID;
  dialog.className = 'case-lightbox';
  dialog.setAttribute('aria-label', 'Screen viewer');
  dialog.innerHTML = `
    <button type="button" class="case-lightbox-btn case-lightbox-close" aria-label="Close viewer">&times;</button>
    <button type="button" class="case-lightbox-btn case-lightbox-prev" aria-label="Previous screen">&larr;</button>
    <button type="button" class="case-lightbox-btn case-lightbox-next" aria-label="Next screen">&rarr;</button>
    <figure class="case-lightbox-stage">
      <img class="case-lightbox-image" alt="" />
      <figcaption class="case-lightbox-caption"></figcaption>
    </figure>
    <p class="case-lightbox-counter" aria-live="polite" aria-atomic="true"></p>
  `;
  document.body.appendChild(dialog);

  const img = dialog.querySelector<HTMLImageElement>('.case-lightbox-image')!;
  const cap = dialog.querySelector<HTMLElement>('.case-lightbox-caption')!;
  const counter = dialog.querySelector<HTMLElement>('.case-lightbox-counter')!;
  const closeBtn = dialog.querySelector<HTMLButtonElement>('.case-lightbox-close')!;
  const prevBtn = dialog.querySelector<HTMLButtonElement>('.case-lightbox-prev')!;
  const nextBtn = dialog.querySelector<HTMLButtonElement>('.case-lightbox-next')!;

  /** The screens of one set, in page order. */
  let group: LightboxItem[] = [];
  let current = 0;
  let opener: HTMLElement | null = null;
  /** True when this viewer added a history entry that the back action can remove. */
  let pushed = false;

  function setHash(it: LightboxItem, push: boolean) {
    const url = it.el.id ? `#${it.el.id}` : location.pathname + location.search;
    if (push) history.pushState({ lightbox: true }, '', url);
    else history.replaceState(history.state, '', url);
  }

  function render(i: number) {
    current = Math.max(0, Math.min(group.length - 1, i));
    const it = group[current];
    img.src = it.src;
    img.alt = it.alt;
    cap.textContent = it.caption;
    cap.hidden = !it.caption;
    counter.textContent = positionLabel(current + 1, group.length, it.set);
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === group.length - 1;
  }

  function go(i: number) {
    render(i);
    setHash(group[current], false);
  }

  function open(item: LightboxItem, fromDeepLink = false) {
    group = items.filter(x => x.set === item.set);
    opener = item.el;
    render(group.indexOf(item));
    if (dialog.open) return;
    dialog.showModal();
    if (fromDeepLink) {
      pushed = false;
    } else {
      setHash(item, true);
      pushed = true;
    }
  }

  function finish() {
    if (dialog.open) dialog.close();
    img.removeAttribute('src');
    if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
    opener = null;
  }

  function close() {
    if (!dialog.open) return;
    if (pushed) {
      // The popstate handler below finishes the close.
      pushed = false;
      history.back();
      return;
    }
    // Opened from a deep link: there is no entry to go back to, so drop the hash.
    history.replaceState(history.state, '', location.pathname + location.search);
    finish();
  }

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => go(current - 1));
  nextBtn.addEventListener('click', () => go(current + 1));
  dialog.addEventListener('cancel', ev => { ev.preventDefault(); close(); });
  dialog.addEventListener('click', ev => { if (ev.target === dialog) close(); });
  window.addEventListener('popstate', () => { pushed = false; if (dialog.open) finish(); });

  dialog.addEventListener('keydown', (ev: Event) => {
    const e = ev as KeyboardEvent;
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); }
  });

  // Swipe: one finger, mostly sideways. Two fingers are left to pinch zoom.
  let startX: number | null = null;
  dialog.addEventListener('touchstart', (ev: Event) => {
    const te = ev as TouchEvent;
    startX = te.touches.length === 1 ? te.touches[0].clientX : null;
  }, { passive: true });
  dialog.addEventListener('touchend', (ev: Event) => {
    const te = ev as TouchEvent;
    if (startX == null) return;
    const dx = (te.changedTouches[0]?.clientX ?? startX) - startX;
    startX = null;
    if (Math.abs(dx) < 40) return;
    go(dx > 0 ? current - 1 : current + 1);
  }, { passive: true });

  for (const item of items) {
    item.el.addEventListener('click', ev => {
      // A modified click keeps the browser's own behaviour (new tab, download).
      const me = ev as MouseEvent;
      if (me.metaKey || me.ctrlKey || me.shiftKey || me.altKey || me.button !== 0) return;
      ev.preventDefault();
      open(item);
    });
  }

  // Deep link: /work/<slug>#<thumbnail id> opens the viewer at that screen,
  // on load and when the hash changes while the page is open.
  function openFromHash() {
    const wanted = location.hash.slice(1);
    if (!wanted || dialog.open) return;
    const hit = items.find(x => x.el.id === wanted);
    if (!hit) return;
    hit.el.dispatchEvent(new CustomEvent('case-screens:reveal', { bubbles: true }));
    open(hit, true);
  }
  window.addEventListener('hashchange', openFromHash);
  openFromHash();
}
