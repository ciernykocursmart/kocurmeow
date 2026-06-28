const CACHE_NAME = "kocurmeow-v1";
const ASSETS = [
  "./",
  "index.html",
  "styles.css",
  "script.js",
  "manifest.webmanifest",
  "assets/images/kocur.png",
  "assets/images/icon-192.png",
  "assets/images/icon-512.png",
  "assets/audio/meow1.wav",
  "assets/audio/meow2.wav",
  "assets/audio/meow3.wav",
  "assets/audio/meow4.wav",
  "assets/audio/meow5.wav",
  "assets/audio/meow6.wav",
  "assets/audio/meow7.wav",
  "assets/audio/meow8.wav",
  "assets/audio/meow9.wav"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
