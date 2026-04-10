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
            renotify: true,  // Vibrates again for new alerts even with same tag
            requireInteraction: true, // Notification stays until user taps it
            data: {
                url: self.location.origin // Stores the app URL to open it later
            }
        };
        
        // Wrap in waitUntil to prevent Android from killing the process early
        event.waitUntil(
            self.registration.showNotification(event.data.title, options)
        );
    }
});

// New: This allows the user to tap the notification to open your pH app
self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // Close the notification popup
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            // If the app is already open, focus it; otherwise, open a new window
            for (const client of clientList) {
                if (client.url === '/' && 'focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow('/');
        })
    );
});

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
