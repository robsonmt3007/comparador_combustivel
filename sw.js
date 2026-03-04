const CACHE_NAME = 'combustivel-pro-v28';
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

// Instalação e Cache dos arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Intercepta as requisições para funcionar Offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
