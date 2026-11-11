/* 離線快取：第一次開啟後，沒有網路也能用 */
const C='shuke-mwcd0ubx';
const FILES=['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png','q/100-1.jpg','q/100-2.jpg','q/101-1.jpg','q/101-2.jpg','q/101-3.jpg','q/101-4.jpg','q/102-1.jpg','q/102-2.jpg','q/102-3.jpg','q/103-1.jpg','q/103-2.jpg','q/103-3.jpg','q/103-4.jpg','q/103-5.jpg','q/103-6.jpg','q/103-7.jpg','q/104-1.jpg','q/104-2.jpg','q/104-3.jpg','q/104-4.jpg','q/105-1.jpg','q/105-2.jpg','q/105-3.jpg','q/106-1.jpg','q/106-2.jpg','q/106-3.jpg','q/107-1.jpg','q/107-2.jpg','q/107-3.jpg','q/108-1.jpg','q/108-2.jpg','q/108-3.jpg','q/109-1.jpg','q/109-2.jpg','q/109-3.jpg','q/110-1.jpg','q/110-2.jpg','q/110-3.jpg','q/111-1.jpg','q/111-2.jpg','q/111-3.jpg','q/112-1.jpg','q/112-2.jpg','q/112-3.jpg','q/113-1.jpg','q/113-2.jpg','q/113-3.jpg','q/113-4.jpg','q/113-5.jpg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==C).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 const nav=e.request.mode==='navigate';
 e.respondWith(nav?fetch(e.request).then(r=>{const k=r.clone();caches.open(C).then(c=>c.put('index.html',k));return r}).catch(()=>caches.match('index.html'))
  :caches.match(e.request).then(r=>r||fetch(e.request)))});
