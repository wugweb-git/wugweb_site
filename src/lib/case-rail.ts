// src/lib/case-rail.ts
//
// Rail (carousel) wiring. W3C APG pattern: buttons + counter + keyboard,
// no auto-advance. Scroll-snap is the scrolling mechanism; buttons and
// keys scroll one slide at a time. The counter and disabled state update
// from the scroll position via IntersectionObserver so a flick, a key
// and a button all stay consistent.

export function initCaseRail(root: Element): void {
  if (!(root instanceof HTMLElement)) return;
  const track = root.querySelector<HTMLElement>('[data-rail-track]');
  const prev = root.querySelector<HTMLButtonElement>('[data-rail-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-rail-next]');
  const counter = root.querySelector<HTMLElement>('[data-rail-counter]');
  if (!track || !prev || !next) return;

  const slides = Array.from(track.children) as HTMLElement[];
  const total = slides.length;
  if (total === 0) return;

  let currentIndex = 0;

  function update(i: number) {
    currentIndex = Math.max(0, Math.min(total - 1, i));
    if (counter) counter.textContent = `${currentIndex + 1} of ${total}`;
    if (prev) prev.disabled = currentIndex === 0;
    if (next) next.disabled = currentIndex === total - 1;
  }

  function scrollTo(i: number) {
    const target = slides[Math.max(0, Math.min(total - 1, i))];
    if (!target || !track) return;
    const left = target.offsetLeft - track.offsetLeft;
    track.scrollTo({ left, behavior: 'smooth' });
    update(i);
  }

  prev.addEventListener('click', () => scrollTo(currentIndex - 1));
  next.addEventListener('click', () => scrollTo(currentIndex + 1));

  root.addEventListener('keydown', (ev: Event) => {
    const e = ev as KeyboardEvent;
    if (e.key === 'ArrowLeft') { e.preventDefault(); scrollTo(currentIndex - 1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); scrollTo(currentIndex + 1); }
    else if (e.key === 'Home') { e.preventDefault(); scrollTo(0); }
    else if (e.key === 'End') { e.preventDefault(); scrollTo(total - 1); }
  });

  // Keep the counter in step with user scroll (flick on touch, scrollbar).
  const io = new IntersectionObserver(entries => {
    const visible = entries
      .filter(x => x.isIntersecting)
      .map(x => slides.indexOf(x.target as HTMLElement))
      .filter(x => x >= 0)
      .sort((a, b) => a - b);
    if (visible.length > 0) update(visible[0]);
  }, { root: track, threshold: 0.6 });

  slides.forEach(slide => io.observe(slide));

  // Make rail focusable so arrow keys work without clicking a button first.
  if (!root.hasAttribute('tabindex')) root.setAttribute('tabindex', '0');

  update(0);
}
