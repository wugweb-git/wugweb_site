// src/lib/case-lightbox.ts
//
// Image lightbox for case-study rails and the All screens block. Uses
// <dialog> + showModal(): Esc and focus trap are native. Swipe and
// buttons for prev/next; native pinch-zoom on touch. Back-button close
// via pushState / popstate.
//
// Call initCaseLightbox() once per page. It scans the page for
// [data-case-lightbox-src] triggers and wires one dialog they share.

export interface LightboxItem {
  src: string;
  caption?: string;
  alt?: string;
}

const DIALOG_ID = 'case-lightbox-dialog';

export function initCaseLightbox(): void {
  if (typeof document === 'undefined') return;
  const triggers = Array.from(document.querySelectorAll<HTMLElement>('[data-case-lightbox-src]'));
  if (triggers.length === 0) return;

  const items: LightboxItem[] = triggers.map(el => ({
    src: el.dataset.caseLightboxSrc || '',
    caption: el.dataset.caseLightboxCaption,
    alt: el.dataset.caseLightboxAlt || el.getAttribute('aria-label') || ''
  }));

  let current = 0;
  let dialog = document.getElementById(DIALOG_ID) as HTMLDialogElement | null;
  if (!dialog) {
    dialog = document.createElement('dialog');
    dialog.id = DIALOG_ID;
    dialog.className = 'case-lightbox';
    dialog.innerHTML = `
      <button type="button" class="case-lightbox-close" aria-label="Close">&times;</button>
      <button type="button" class="case-lightbox-prev" aria-label="Previous">&larr;</button>
      <button type="button" class="case-lightbox-next" aria-label="Next">&rarr;</button>
      <figure class="case-lightbox-stage">
        <img class="case-lightbox-image" alt="" />
        <figcaption class="case-lightbox-caption"></figcaption>
      </figure>
      <p class="case-lightbox-counter" aria-live="polite" aria-atomic="true"></p>
    `;
    document.body.appendChild(dialog);
  }

  const img = dialog.querySelector<HTMLImageElement>('.case-lightbox-image')!;
  const cap = dialog.querySelector<HTMLElement>('.case-lightbox-caption')!;
  const counter = dialog.querySelector<HTMLElement>('.case-lightbox-counter')!;
  const closeBtn = dialog.querySelector<HTMLButtonElement>('.case-lightbox-close')!;
  const prevBtn = dialog.querySelector<HTMLButtonElement>('.case-lightbox-prev')!;
  const nextBtn = dialog.querySelector<HTMLButtonElement>('.case-lightbox-next')!;

  function render(i: number) {
    current = Math.max(0, Math.min(items.length - 1, i));
    const it = items[current];
    img.src = it.src;
    img.alt = it.alt || '';
    cap.textContent = it.caption || '';
    counter.textContent = `${current + 1} of ${items.length}`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === items.length - 1;
  }

  function open(i: number) {
    render(i);
    if (!dialog!.open) {
      dialog!.showModal();
      history.pushState({ lightbox: true }, '');
    }
  }
  function close() {
    if (dialog!.open) {
      dialog!.close();
      if (history.state && (history.state as { lightbox?: boolean }).lightbox) history.back();
    }
  }

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => render(current - 1));
  nextBtn.addEventListener('click', () => render(current + 1));
  dialog.addEventListener('cancel', ev => { ev.preventDefault(); close(); });
  dialog.addEventListener('click', ev => {
    if (ev.target === dialog) close();
  });
  window.addEventListener('popstate', () => {
    if (dialog!.open) dialog!.close();
  });

  dialog.addEventListener('keydown', (ev: Event) => {
    const e = ev as KeyboardEvent;
    if (e.key === 'ArrowLeft') { e.preventDefault(); render(current - 1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); render(current + 1); }
  });

  // Swipe handling.
  let startX: number | null = null;
  dialog.addEventListener('touchstart', (ev: Event) => {
    const te = ev as TouchEvent;
    if (te.touches.length === 1) startX = te.touches[0].clientX;
  }, { passive: true });
  dialog.addEventListener('touchend', (ev: Event) => {
    const te = ev as TouchEvent;
    if (startX == null) return;
    const dx = (te.changedTouches[0]?.clientX ?? startX) - startX;
    startX = null;
    if (Math.abs(dx) < 40) return;
    if (dx > 0) render(current - 1);
    else render(current + 1);
  }, { passive: true });

  triggers.forEach((el, i) => {
    el.addEventListener('click', ev => {
      ev.preventDefault();
      open(i);
    });
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    el.addEventListener('keydown', ev => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        open(i);
      }
    });
  });
}
