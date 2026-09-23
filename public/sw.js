/* Service worker — network-first for pages/scripts (shell), cache-first
   for images/fonts (runtime). Keeps the site installable/offline-capable
   without serving stale SSR pages, while avoiding a re-fetch of every
   cover image and web font on every visit. */
const CACHE = 'wugweb-shell-v2';
const RUNTIME_IMG_CACHE = 'wugweb-runtime-img-v1';
const PRECACHE = [
  '/',
  '/offline',
  '/manifest.webmanifest',
  '/brand/logo-large.svg',
  '/brand/logo-small.svg',
  '/brand/favicon-32.png',
  '/brand/pwa-192.png',
  '/brand/pwa-512.png',
  '/brand/og-default.png',
];
// R2 (assets/images) and the Sanity CDN (cover images, when not
// path-mapped) are the two origins whose images are worth caching beyond
// the app shell itself — cross-origin, so the same-origin check below
// doesn't apply to them.
const RUNTIME_IMAGE_ORIGINS = ['wugweb.online', 'cdn.sanity.io'];
// Cap the runtime image cache so it can't grow unbounded over a long
// session — oldest entries drop first. Pure client-side Cache Storage,
// doesn't touch R2/Cloudflare quotas (Rule 2), but no reason to be
// unbounded either.
const RUNTIME_IMG_CACHE_LIMIT = 120;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE && k !== RUNTIME_IMG_CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= maxEntries) return;
  await Promise.all(keys.slice(0, keys.length - maxEntries).map((k) => cache.delete(k)));
}

function isRuntimeImageRequest(request) {
  if (request.destination === 'font') return true;
  if (request.destination !== 'image') return false;
  const url = new URL(request.url);
  return url.origin === self.location.origin || RUNTIME_IMAGE_ORIGINS.includes(url.hostname);
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // Cache-first for images/fonts: covers, thumbnails, logos, webfonts —
  // content that's expensive to refetch and rarely changes once loaded.
  if (isRuntimeImageRequest(request)) {
    event.respondWith(
      caches.match(request).then(
        (hit) =>
          hit ||
          fetch(request).then((response) => {
            if (response && response.status === 200) {
              const copy = response.clone();
              caches.open(RUNTIME_IMG_CACHE).then((cache) => {
                cache.put(request, copy);
                trimCache(RUNTIME_IMG_CACHE, RUNTIME_IMG_CACHE_LIMIT);
              });
            }
            return response;
          })
      )
    );
    return;
  }

  // Everything else (pages, scripts, styles, API calls): only same-origin,
  // let cross-origin requests pass through untouched.
  if (!request.url.startsWith(self.location.origin)) return;

  // Network-first: try the network, fall back to cache (offline shell).
  // A navigation (loading a page, not a fetch for an asset/API call) that
  // isn't in the cache falls back to a real "you're offline" page instead
  // of silently serving the homepage as if that's what was asked for.
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() =>
        caches.match(request).then((hit) => {
          if (hit) return hit;
          return request.mode === 'navigate' ? caches.match('/offline') : undefined;
        })
      )
  );
});
