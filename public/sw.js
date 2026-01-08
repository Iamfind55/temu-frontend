const CACHE_NAME = 'temu-cache-v1';
const urlsToCache = [
  '/',
  '/logo/icon.png',
  '/logo/temu-logo.webp'
];

// Check if caches API is available
const isCacheAvailable = typeof caches !== 'undefined';

// Install event
self.addEventListener('install', (event) => {
  if (!isCacheAvailable) {
    self.skipWaiting();
    return;
  }

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache).catch((err) => {
          console.log('Cache addAll failed:', err);
        });
      })
      .catch((err) => {
        console.log('Cache open failed:', err);
      })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  if (!isCacheAvailable) {
    self.clients.claim();
    return;
  }

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .catch((err) => {
        console.log('Cache cleanup failed:', err);
      })
  );
  self.clients.claim();
});

// Fetch event - Network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests and certain URLs
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) {
    return;
  }

  // Skip API requests, WebSocket, and chrome-extension URLs
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/_next/') ||
    url.protocol === 'chrome-extension:' ||
    url.protocol === 'ws:' ||
    url.protocol === 'wss:'
  ) {
    return;
  }

  // If caches API is not available, just fetch normally
  if (!isCacheAvailable) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response
        const responseClone = response.clone();

        // Cache successful responses (don't await, fire and forget)
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseClone);
          })
          .catch(() => {
            // Silently fail cache put
          });

        return response;
      })
      .catch(() => {
        // Network failed, try to get from cache
        return caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Return offline fallback if available
            return caches.match('/');
          })
          .catch(() => {
            // Cache also failed, return nothing
            return new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});
