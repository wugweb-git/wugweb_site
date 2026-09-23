/* Minimal service worker — network-first, cache fallback for static shell.
   Keeps the site installable/offline-capable without serving stale SSR pages. */
const CACHE = 'wugweb-shell-v2';
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
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  // Only handle GET, same-origin requests. Let everything else pass through.
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) return;

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
