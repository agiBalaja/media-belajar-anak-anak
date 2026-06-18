const CACHE_NAME = 'belajar-ceria-v1';

// Daftar file yang wajib disimpan (di-cache) untuk penggunaan offline
const urlsToCache = [
  './',
  './index.html',
  // Jika kamu memisahkan CSS, tambahkan path-nya: './css/style.css',
  // Nanti kamu bisa menambahkan link game/halaman lain di sini
];

// Tahap 1: Install Service Worker dan simpan file ke cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache berhasil dibuat, siap mode offline!');
        return cache.addAll(urlsToCache);
      })
  );
});

// Tahap 2: Mencegat permintaan jaringan, berikan dari cache jika sedang offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika file ada di cache, gunakan itu. Jika tidak, ambil dari internet.
        return response || fetch(event.request);
      })
  );
});

// Tahap 3: Membersihkan cache lama jika ada update versi baru
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
