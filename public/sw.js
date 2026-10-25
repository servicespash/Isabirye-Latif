// Cymatic Service Worker - PWA & Cache Management
const CACHE_NAME = 'cymatic-v4-clean';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Never intercept or cache development modules, Vite internals, or preview environments
  const url = new URL(event.request.url);
  if (
    url.hostname.includes('ais-dev') ||
    url.hostname.includes('localhost') ||
    url.pathname.startsWith('/src/') ||
    url.pathname.includes('/node_modules/') ||
    url.pathname.includes('/@vite/') ||
    url.pathname.includes('/@react-refresh')
  ) {
    return;
  }
});

