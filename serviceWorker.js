const assets = [
  "/car-game",
  "/car-game/icons/arrow.svg",
  "/car-game/icons/download.svg",
  "/car-game/icons/gas-pedal.svg",
  "/car-game/icons/stop-pedal.svg",
  "/car-game/icons/menu.svg",
  "/car-game/icons/reset.svg",
  "/car-game/icons/rotate.svg",
  "/car-game/icons/swap-camera.svg",
  "/car-game/models/car.glb",
  "/car-game/models/ramp.glb",
  "/car-game/models/track.glb",
  "/car-game/textures/alpha-map.png",
  "/car-game/textures/grid.png",
  "/car-game/textures/ground-ao.png",
  "/car-game/textures/track.png",
  "/car-game/textures/envmap.hdr",
  "/car-game/static/css/main.b09068b9.css",
  "/car-game/static/js/main.5a5da522.js",
  "/car-game/static/css/main.b09068b9.css.map",
  "/car-game/static/js/main.5a5da522.js.map",
];

// add index.js and index.css

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("assets").then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Even if the response is in the cache, we fetch it
      // and update the cache for future usage
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          return caches.open("assets").then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch((e) => {
          console.error(e);

          return new Response(
            "Network error and no cached data available. see the browser's console for more information",
            {
              status: 503,
              statusText: "Service Unavailable.",
            }
          );
        });
      // We use the currently cached version if it's there
      return response || fetchPromise; // cached or a network fetch
    })
  );
});
