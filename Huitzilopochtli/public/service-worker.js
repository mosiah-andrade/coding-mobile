// Nome do cache. Mude este valor para forçar a atualização do service worker e do cache.
const CACHE_NAME = 'huitzilopochtli-v1';

// Ficheiros a serem colocados em cache na instalação.
// O Vite gera nomes de ficheiros com hashes, por isso não podemos listá-los aqui diretamente.
// Vamos adicioná-los dinamicamente durante o evento 'fetch'.
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/huitzilopochtli.ico',
  // Adicione aqui os caminhos para os seus ícones, se os tiver na pasta 'public'
  // '/icon-192.png',
  // '/icon-512.png',
];

// O 'self' refere-se ao próprio service worker.
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando...');
  // O 'waitUntil' espera que a Promise seja resolvida antes de terminar a instalação.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cache aberto. A adicionar ficheiros principais ao cache.');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: Ficheiros principais adicionados ao cache com sucesso.');
        // Força o novo service worker a tornar-se ativo imediatamente.
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Ativando...');
  event.waitUntil(
    // Percorre todas as chaves de cache existentes.
    caches.keys().then((cacheNames) => {
      return Promise.all(
        // Filtra e remove caches antigos que não correspondem ao CACHE_NAME atual.
        cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    }).then(() => {
      console.log('Service Worker: Caches antigos limpos.');
      // Assume o controlo de todas as páginas abertas.
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Estratégia: Cache first, then network para navegação e ficheiros estáticos
  // Ignora requisições que não são GET (como POST, etc.)
  if (request.method !== 'GET') {
    return;
  }

  // Para chamadas à API do iNaturalist, use sempre a rede (Network Only)
  if (request.url.includes('api.inaturalist.org')) {
    // Não faz nada, deixa o pedido seguir para a rede.
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((responseFromCache) => {
        // Se o recurso estiver no cache, retorna-o.
        if (responseFromCache) {
          return responseFromCache;
        }

        // Se não estiver no cache, busca na rede.
        return fetch(request).then((responseFromNetwork) => {
          // Clona a resposta para poder guardá-la no cache e enviá-la ao navegador.
          const responseToCache = responseFromNetwork.clone();

          caches.open(CACHE_NAME).then((cache) => {
            // Guarda a nova resposta no cache para futuras requisições.
            cache.put(request, responseToCache);
          });

          return responseFromNetwork;
        });
      })
      .catch((error) => {
        // Em caso de falha (offline), pode retornar uma página de fallback.
        console.error('Service Worker: Falha ao buscar recurso:', error);
        // Opcional: retornar uma página offline a partir do cache.
        // return caches.match('/offline.html');
      })
  );
});
