// Service Worker for MoneyCal India - Disabled for module scripts compatibility
const CACHE_NAME = 'moneycal-v1.0.1';
const STATIC_CACHE = 'moneycal-static-v1.0.1';
const DYNAMIC_CACHE = 'moneycal-dynamic-v1.0.1';

// Minimal static assets to cache (avoid module scripts and images that don't exist)
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',
  '/favicon.svg'
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /^https:\/\/api\.moneycal\.in\/market-data/,
  /^https:\/\/api\.moneycal\.in\/news/,
  /^https:\/\/api\.moneycal\.in\/calculators/
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Failed to cache static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Skip module scripts, stylesheets and dynamic imports to avoid MIME type issues
  if (request.destination === 'script' || request.destination === 'style') {
    return; // Let browser handle scripts and styles natively
  }
  
  if (url.pathname.includes('/assets/')) {
    return; // Never cache bundled assets
  }

  // Handle different types of requests
  if (isStaticAsset(request)) {
    event.respondWith(handleStaticAsset(request));
  } else if (isAPIRequest(request)) {
    event.respondWith(handleAPIRequest(request));
  } else if (isPageRequest(request)) {
    event.respondWith(handlePageRequest(request));
  } else {
    event.respondWith(handleOtherRequest(request));
  }
});

// Check if request is for static asset
function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|ico)$/);
}

// Check if request is for API
function isAPIRequest(request) {
  const url = new URL(request.url);
  return API_CACHE_PATTERNS.some(pattern => pattern.test(url.href));
}

// Check if request is for page
function isPageRequest(request) {
  const url = new URL(request.url);
  return url.origin === location.origin && !isStaticAsset(request) && !isAPIRequest(request);
}

// Handle static assets - cache first strategy
async function handleStaticAsset(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request, { redirect: 'follow' });
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      // Only cache if it's a valid response
      const contentType = networkResponse.headers.get('content-type');
      if (contentType && !contentType.includes('text/html')) {
        cache.put(request, networkResponse.clone());
      }
    }
    return networkResponse;
  } catch (error) {
    console.error('Failed to handle static asset:', error);
    return new Response('Asset not available', { status: 404 });
  }
}

// Handle API requests - network first with cache fallback
async function handleAPIRequest(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache for API request');
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('API not available', { status: 503 });
  }
}

// Handle page requests - network first with cache fallback
async function handlePageRequest(request) {
  try {
    const networkResponse = await fetch(request, { redirect: 'follow' });
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache for page request');
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback to index.html for SPA routing
    if (request.mode === 'navigate') {
      const indexResponse = await caches.match('/index.html');
      if (indexResponse) {
        return indexResponse;
      }
    }
    
    return new Response('Page not available', { status: 404 });
  }
}

// Handle other requests - network only
async function handleOtherRequest(request) {
  try {
    return await fetch(request);
  } catch (error) {
    console.error('Failed to handle request:', error);
    return new Response('Request failed', { status: 503 });
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Sync offline data when connection is restored
    console.log('Performing background sync...');
    
    // Get offline data from IndexedDB
    const offlineData = await getOfflineData();
    
    // Sync with server
    for (const data of offlineData) {
      try {
        await fetch('/api/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
        
        // Remove from offline storage after successful sync
        await removeOfflineData(data.id);
      } catch (error) {
        console.error('Failed to sync data:', error);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
  const options = {
      body: data.body,
      icon: '/android-chrome-192x192.png',
      badge: '/android-chrome-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
    },
    actions: [
      {
        action: 'explore',
          title: 'View Details',
          icon: '/images/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
          icon: '/images/xmark.png'
      }
    ]
  };

  event.waitUntil(
      self.registration.showNotification(data.title, options)
  );
  }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/market-analysis')
    );
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Helper functions for offline data management
async function getOfflineData() {
  // Implementation would depend on your IndexedDB setup
  return [];
}

async function removeOfflineData(id) {
  // Implementation would depend on your IndexedDB setup
  console.log('Removing offline data:', id);
}