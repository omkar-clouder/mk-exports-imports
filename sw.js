const CACHE_NAME = 'mk-enterprises-v1';
const ASSETS = [
  './',
  './index.html',
  './about.html',
  './products.html',
  './perishable.html',
  './contact.html',
  './assets/css/styles.css',
  './assets/js/main.js',
  './farm.jpg',
  './farm-2.jpg',
  './rice.jpg',
  './rice 2.avif',
  './onion.webp',
  './millets.webp',
  './toor-dal.jpg',
  './conatiner 2.jpg',
  './conatinerss.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((key) => {
      if (key !== CACHE_NAME) return caches.delete(key);
    })))
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  // Network-first for HTML, cache-first for assets
  if (request.destination === 'document' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      }).catch(() => caches.match(request))
    );
  } else {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      }))
    );
  }
});


