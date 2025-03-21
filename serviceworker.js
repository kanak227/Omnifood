const CACHE_NAME = "app-cache-v1";
const urlsToCache = [
    '/',
    '/index.html',
    '/css/general.css',
    '/css/style.css',
    '/css/queries.css',
    '/js/script.js',
    '/img/omnifood-logo.avif',
    '/img/hero-min.webp',
    '/img/customers/customer-1.avif',
    '/img/customers/customer-2.avif',
    '/img/customers/customer-3.avif',
    '/img/customers/customer-4.avif',
    '/img/customers/customer-5.avif',
    '/img/customers/customer-6.avif',
    '/img/meals/meal-1.avif',
    '/img/meals/meal-2.avif',
    '/img/gallery/gallery-1.avif',
    '/img/gallery/gallery-2.avif',
    '/img/gallery/gallery-3.avif',
    '/img/gallery/gallery-4.avif',
    '/img/gallery/gallery-5.avif',
    '/img/gallery/gallery-6.avif',
    '/img/gallery/gallery-7.avif',
    '/img/gallery/gallery-8.avif',
    '/img/gallery/gallery-9.avif',
    '/img/gallery/gallery-10.avif',
    '/img/gallery/gallery-11.avif',
    '/img/gallery/gallery-12.avif',
    '/img/meals/meal-3.avif', 
    '/img/meals/meal-4.avif', 
    '/img/meals/meal-5.avif', 
    '/img/meals/meal-6.avif'  
];

//Install Service Worker and Cache Static Files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
        console.log("Caching assets");
        return cache.addAll(urlsToCache);
        })
    );
});

//Fetch and Serve Cached Files
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
        })
    );
});

//Activate and Clean Up Old Caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
        return Promise.all(
            cacheNames
            .filter((cache) => cache !== CACHE_NAME) 
            .map((cache) => caches.delete(cache))
        );
        })
    );
});
