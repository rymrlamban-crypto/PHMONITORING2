// This allows the PWA to be installed
self.addEventListener('fetch', (event) => {
  // Basic fetch listener
});

// This listener allows the app to show notifications even in the background
self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : {};
    const title = data.title || "pH Monitor Alert";
    const options = {
        body: data.body || "Your pH levels are out of range!",
        icon: 'https://cdn-icons-png.flaticon.com/512/822/822143.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/822/822143.png',
        vibrate: [300, 100, 300],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '1'
        }
    };
    event.waitUntil(self.registration.showNotification(title, options));
});

// Forces the service worker to update immediately
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});
