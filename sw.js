// This allows the PWA to be installed
self.addEventListener('fetch', (event) => {
    // Keeps the app installable
});

// The "Listener" that waits for the main app to send a notification command
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        const options = {
            body: event.data.body,
            icon: 'https://cdn-icons-png.flaticon.com/512/822/822143.png',
            badge: 'https://cdn-icons-png.flaticon.com/512/822/822143.png',
            vibrate: [300, 100, 300],
            tag: 'ph-alert', // Prevents notification stacking
            renotify: true
        };
        
        self.registration.showNotification(event.data.title, options);
    }
});

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
