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
  "/car-game/images/car-game_first.png",
  "/car-game/images/car-game_responsive.png",
  "/car-game/models/car.glb",
  "/car-game/models/ramp.glb",
  "/car-game/models/track.glb",
  "/car-game/textures/alpha-map.png",
  "/car-game/textures/grid.png",
  "/car-game/textures/ground-ao.png",
  "/car-game/textures/track.png",
  "/car-game/textures/envmap.hdr",
  "/car-game/static/css/main.1229279b.css",
  "/car-game/static/js/main.5a5da522.js",
  "/car-game/static/css/main.1229279b.css.map",
  "/car-game/static/js/main.5a5da522.js.map",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("assets").then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      const fetchPromise = fetch(e.request).then((networkResponse) => {
        caches.open("assets").then((cache) => {
          cache.put(e.request, networkResponse.clone());

          return networkResponse;
        });
      });

      return response || fetchPromise;
    })
  );
});
