const assets = [
  "/car-game/",
  "/car-game/models/car.glb",
  "/car-game/models/ramp.glb",
  "/car-game/models/track.glb",
  "/car-game/textures/alpha-map.png",
  "/car-game/textures/grid.png",
  "/car-game/textures/ground-ao.png",
  "/car-game/textures/track.png",
  "/car-game/textures/envmap.hdr",
];

// add index.js and index.css

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("car-game").then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open("car-game");

      const cachedResponse = await cache.match(event.request);

      if (cachedResponse) return cachedResponse;

      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })
        .catch(() => {
          return new Response(
            "Network error and no cached data available. see the browser's console for more information",
            {
              status: 503,
              statusText: "Service Unavailable.",
            }
          );
        });

      return fetchPromise; // cache miss
    })()
  );
});
