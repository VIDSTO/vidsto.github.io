const CACHE_NAME = 'vidsto-v1';
const ASSETS = [
  '/VIDSTO/',
  '/VIDSTO/index.html',
  '/VIDSTO/manifest.json',
  '/VIDSTO/favicon-96x96.png',
  '/VIDSTO/web-app-manifest-192x192.png',
  '/VIDSTO/web-app-manifest-512x512.png',
  '/VIDSTO/apple-touch-icon.png'
];

// Install — cache all assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — serve from cache, fallback to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
