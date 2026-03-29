const CACHE_NAME = 'bill-crown-3-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
  'https://cdn-icons-png.flaticon.com/512/1152/1152912.png',
  'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3',
  'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
