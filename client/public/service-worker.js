/* JIBON offline shell: keeps the interface reachable without attempting to cache large external book PDFs. */
const CACHE_NAME = "jibon-app-shell-v4-hard-truth";
const BASE_PATH = new URL("./", self.registration.scope).pathname;
const APP_SHELL = [BASE_PATH, `${BASE_PATH}index.html`, `${BASE_PATH}manifest.webmanifest`];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith("jibon-") && key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.pathname.endsWith(".pdf") || requestUrl.hostname !== self.location.hostname) return;
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).then((response) => {
      const contentType = response.headers.get("content-type") || "";
      if (response.ok && contentType.includes("text/html")) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(BASE_PATH, copy));
      }
      return response;
    }).catch(() => caches.match(BASE_PATH)));
    return;
  }
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    if (response.ok && /\.(?:js|css|png|svg|webp|woff2?)$/i.test(requestUrl.pathname)) {
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()));
    }
    return response;
  })));
});
