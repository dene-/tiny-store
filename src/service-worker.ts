/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { version } from '$service-worker';

const CACHE_NAME = `images-${version}`;
const IMAGE_DOMAIN = 'https://8585.terminaldogma.win/';

const sw = self as unknown as ServiceWorkerGlobalScope;

sw.addEventListener('install', event => {
  event.waitUntil(sw.skipWaiting());
});

sw.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(async keys => {
      for (const key of keys) {
        if (key !== CACHE_NAME) {
          await caches.delete(key);
        }
      }
      await sw.clients.claim();
    }),
  );
});

sw.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (event.request.method === 'GET' && (url.href.startsWith(IMAGE_DOMAIN) || (url.origin === location.origin && event.request.destination === 'image'))) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async cache => {
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }

        const networkResponse = await fetch(event.request);
        cache.put(event.request, networkResponse.clone());
        return networkResponse;
      }),
    );
  }
});
