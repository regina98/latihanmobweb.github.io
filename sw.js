self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('first-app')
      .then(function(cache) {
        cache.addAll([
          '/',
          '/index.html',
          '/src/css/app.css',
          '/src/js/app.js',
          '/offline.html'
        ])
      })
  );
  return self.clients.claim();
});

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(res) {
//         return res;
//       })
//   );
// });

// kalo pake offline.html
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          //offline
          return fetch(event.request)
            .then(function(res) {
              return caches.open('static')
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                })
            })
            .catch(function(err) {
              return caches.open('first-app')
                .then(function(cache) {
                  return cache.match('/offline.html');
                });
            });
        }
      })
  );
});
