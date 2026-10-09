/* ============================================================
   sw.js — Service Worker: cache-first para funcionar offline.
   Cacha el "app shell" (HTML, CSS, JS, íconos, manifest).
   ============================================================ */
const CACHE = 'educakids-v1';
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/store.js',
  './js/audio.js',
  './js/voz.js',
  './js/engine.js',
  './js/mundos.js',
  './js/geografia.js',
  './js/lengua-sociales.js',
  './js/minijuegos.js',
  './js/juegos-nuevos.js',
  './js/dibujo.js',
  './js/mascota.js',
  './js/escuelas.js',
  './js/app.js',
  './manifest.json',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

/* Instalación: precarga el app shell */
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

/* Activación: borra cachés viejas */
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* Fetch: cache-first, con respaldo en red; si falla y es navegación, sirve index.html offline */
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((res) => {
        // cachea nuevas respuestas exitosas de origen propio
        if (res && res.status === 200 && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
        }
        return res;
      }).catch(() => {
        if (e.request.mode === 'navigate') return caches.match('./index.html');
      });
    })
  );
});
