/* JIBON offline shell: keeps the interface reachable without attempting to cache large external book PDFs. */
const CACHE_NAME = "jibon-app-shell-v6-local-covers";
const BASE_PATH = new URL("./", self.registration.scope).pathname;
const LOCAL_COVERS = [
  "jibon-cover.webp",
  "dark-psychology-cover.webp",
  "the-art-of-thinking-cover.webp",
  "presence-code-cover.png",
  "habit-architect-cover.png",
  "brain-boost-cover.png",
  "the-wealth-code-cover.webp",
  "kothar-shilpo-cover.png",
  "the-future-cover.png",
  "return-to-allah-cover.png",
  "mistakes-cost-lives-cover.png",
  "intelligence-code-cover.png",
  "winning-mind-cover.png",
  "ai-mastery-wealth-cover.png",
  "house-that-remembered-cover.png",
  "hard-truth-cover.png",
  "law-everyone-should-know-cover.png",
  "last-words-cover.png",
  "second-timer-cover.png",
];
const APP_SHELL = [BASE_PATH, `${BASE_PATH}index.html`, `${BASE_PATH}manifest.webmanifest`, ...LOCAL_COVERS.map((cover) => `${BASE_PATH}${cover}`)];

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
