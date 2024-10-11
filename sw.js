const CACHE_NAME = 'meu-app-cache-v1';
const urlsToCache = [
    '/index.html',
    '/styles.css',
    '/scripts.js',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// Instalando o Service Worker e adicionando arquivos ao cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Arquivos em cache adicionados');
                return cache.addAll(urlsToCache);
            })
    );
});

// Gerenciando as solicitações da rede
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retorna o cache se disponível, ou faz a solicitação para a rede
                return response || fetch(event.request);
            })
    );
});

// Atualizando o Service Worker e removendo caches antigos
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
