const CACHE_NAME = "beauty-dualdevice-pwa-v23";
const CORE_ASSETS = [
  './',
  './index.html',
  './styles.css?v=23',
  './app.js?v=23',
  './media.js?v=23',
  './manifest.webmanifest?v=23',
  './icon-192.png',
  './icon-512.png',
  './assets/clean-cotton-1.jpg',
  './assets/clean-cotton-2.jpg',
  './assets/clean-cotton-install.jpg',
  './assets/clean-cotton-lotion.jpg',
  './assets/clean-cotton-ring.jpg',
  './assets/clean-dry.jpg',
  './assets/clean-rinse-ru.jpg',
  './assets/cleaning-01-head.jpg',
  './assets/cleaning-02-ring.jpg',
  './assets/cleaning-03-wipe.jpg',
  './assets/cleaning-04-dry.jpg',
  './assets/cleaning-05-ready.jpg',
  './assets/eye-care.jpg',
  './assets/moist-flow.png',
  './assets/nano-clean-1.svg',
  './assets/nano-clean-2.svg',
  './assets/nano-clean-3.svg',
  './assets/nano-face-1.svg',
  './assets/nano-face-2.svg',
  './assets/nano-face-3.svg',
  './assets/nano-face-4.svg',
  './assets/nano-face-5.svg',
  './assets/nano-face-6.svg',
  './assets/readyskin-nanoskin-hero.png',
  './assets/rf-1.png',
  './assets/rf-2.png',
  './assets/rf-3.png',
  './assets/rf-4.png',
];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => (key.startsWith("beauty-dualdevice-pwa-") || key.startsWith("ehsr90-pwa-")) && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).then(response => {
      if (response.ok) { const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put("./index.html", copy)); }
      return response;
    }).catch(async () => (await caches.match("./index.html")) || (await caches.match("./"))));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok) { const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)); }
    return response;
  })));
});
self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(clients => {
    for (const client of clients) if ("focus" in client) return client.focus();
    return self.clients.openWindow("./");
  }));
});
