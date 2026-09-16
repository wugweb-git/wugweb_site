/**
 * Behaviour for `BentoBlock.astro`.
 *
 * Extracted from the component's `<script>` so Storybook can run it — the
 * Container API that renders stories emits HTML without executing script tags.
 * Both call sites are idempotent, guarded per element, so a re-render or a
 * second `astro:page-load` never double-binds a tile.
 */

/* Clips ship preload="none"; they only fetch once their tile is on screen,
   and pause again when it leaves. Never on page load. */
export function initBentoVideo(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const videos = Array.from(
    document.querySelectorAll<HTMLVideoElement>('[data-bento-video]')
  ).filter((v) => v.dataset.bentoVideoBound !== '1');
  if (!videos.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      });
    },
    { rootMargin: '10% 0px', threshold: 0.15 }
  );
  videos.forEach((v) => {
    v.dataset.bentoVideoBound = '1';
    io.observe(v);
  });
}

/* Cursor invert. Position is written on rAF so we never lay out per
   pointermove, and it only arms on devices that actually have a pointer. */
export function initBentoCursor(): void {
  if (!window.matchMedia('(hover: hover)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll<HTMLElement>('.bento-block').forEach((block) => {
    if (block.dataset.bentoCursorBound === '1') return;
    const dot = block.querySelector<HTMLElement>('[data-bento-cursor]');
    if (!dot) return;
    block.dataset.bentoCursorBound = '1';

    let x = 0;
    let y = 0;
    let queued = false;

    const paint = () => {
      queued = false;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1)`;
    };

    block.addEventListener('pointermove', (e) => {
      const r = block.getBoundingClientRect();
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      if (!queued) {
        queued = true;
        requestAnimationFrame(paint);
      }
    });
    block.addEventListener('pointerenter', () => block.classList.add('cursor-live'));
    block.addEventListener('pointerleave', () => block.classList.remove('cursor-live'));
  });
}

/** Both halves, for callers that just want the block wired up. */
export function initBentoBlock(): void {
  initBentoVideo();
  initBentoCursor();
}
