/**
 * Sri Vinayaka Group - Service Worker
 * Progressive browser caching for fast loads and offline resilience.
 */

const CACHE_NAME = 'svg-cache-v1.0.0';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/sleeper-services.html',
  '/logistics.html',
  '/tours.html',
  '/contact.html',
  '/404.html',
  '/assets/css/style.css',
  '/assets/js/components.js',
  '/assets/js/main.js',
  '/assets/images/logo.webp',
  '/favicon.ico'
];

// Install Event - Pre-cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('SW: Pre-caching non-blocking item failure', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up stale caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Stale-while-revalidate for static assets, Network-first for HTML
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip cross-origin non-GET requests
  if (request.method !== 'GET') return;

  // For HTML documents: Network first, fallback to Cache, then 404
  if (request.headers.get('accept')?.includes('text/html') || request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
            return response;
          }
          if (response && response.status === 404) {
            return caches.match('/404.html').then((cached404) => cached404 || response);
          }
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/404.html')))
    );
    return;
  }

  // For static assets (CSS, JS, WebP, Fonts): Cache first, fallback to Network
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch in background to update cache
        fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }

      return fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && url.origin === location.origin) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        }
        return networkResponse;
      });
    })
  );
});
