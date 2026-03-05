const CACHE_NAME = 'combustivel-pro-v30'; // Mude para v31 na próxima alteração
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './maps.png',
  './waze.png',
  './ipiranga.png',
  './shell.png',
  './br.png',
  './ceara.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // Força o novo SW a assumir o controle imediatamente
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim(); // Assume o controle das abas abertas na hora
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
