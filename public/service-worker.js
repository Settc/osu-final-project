/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-globals */
console.log("Hi from your service-worker.js file!");

var urlsToCache = [
  "/",
  "/index.html",
  "/index.js",
  "/db.js",
  "/favicon.ico",
  "/manifest.webmanifest",
];

const CACHE_NAME = "static-cache-v1";
//const DATA_CACHE_NAME = "data-cache-v1";

// self.addEventListener("install", (evt) => {
//     evt.waitUntil(
//         caches
//         .open(DATA_CACHE_NAME)
//         .then((cache) => cache.add("/api/transaction"))
//     );
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }

      return fetch(event.request).then(function (response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        var responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
self.addEventListener('activate', function(event) {

    var cacheAllowlist = ['static-cache-v1', 'data-cache-v1'];

    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheAllowlist.indexOf(cacheName) === -1) {
                console.log("Removing old cache data", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
    self.clients.claim();
  });
