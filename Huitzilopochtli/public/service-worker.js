// Nome do cache. Mude este valor para forçar a atualização do service worker e do cache.
const CACHE_NAME = 'huitzilopochtli-v2'; // Mudei a versão para forçar a atualização

// Ficheiros a serem colocados em cache na instalação.
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/huitzilopochtli.ico',
  '/android/android-launchericon-192-192.png',
  '/android/android-launchericon-512-512.png'
];

// O 'self' refere-se ao próprio service worker.
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cache aberto. A adicionar ficheiros principais ao cache.');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: Ficheiros principais adicionados ao cache com sucesso.');
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Ativando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    }).then(() => {
      console.log('Service Worker: Caches antigos limpos.');
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  if (request.url.includes('api.inaturalist.org')) {
    return; // Sempre busca da rede para a API
  }

  event.respondWith(
    caches.match(request)
      .then((responseFromCache) => {
        if (responseFromCache) {
          return responseFromCache;
        }
        return fetch(request).then((responseFromNetwork) => {
          const responseToCache = responseFromNetwork.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return responseFromNetwork;
        });
      })
      .catch((error) => {
        console.error('Service Worker: Falha ao buscar recurso:', error);
        // Pode retornar uma página de fallback offline aqui se desejar
      })
  );
});
