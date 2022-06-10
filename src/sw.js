import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('message', (event) => {
if (event.data && event.data.type === 'SKIP_WAITING')
    self.skipWaiting()
})
// self.__precacheManifest = [].concat(self.__precacheManifest || []);
// workbox.precaching.suppressWarnings();
// workbox.precaching.precacheAndRoute(self.__precacheManifest,{});

// self.addEventListener("message",msg=>{
//     if (msg.data.action == 'skipWaiting') {
//         self.skipWaiting()
//     }
// })