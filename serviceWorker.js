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
  "/car-game/static/css/main.d007a91b.css",
  "/car-game/static/js/main.bb5785d0.js",
  "/car-game/static/css/main.d007a91b.css.map",
  "/car-game/static/js/main.bb5785d0.js.map",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("car-game").then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request) // searching in the cache
      .then((response) => {
        if (response) {
          // The request is in the cache
          return response; // cache hit
        } else {
          // We need to go to the network
          const fetchPromise = fetch(event.request)
            .then((networkResponse) => {
              return caches.open("car-game").then((cache) => {
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

          return fetchPromise; // cache miss
        }
      })
  );
});
