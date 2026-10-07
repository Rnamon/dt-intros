/* Dice Throne Intros — service worker
 *
 * TO RELEASE A NEW VERSION: change the number below and upload this file
 * together with whatever else changed. Phones pick it up the next time the
 * app is opened (or right away with Settings → Check for updates), and the
 * number shows in Settings.
 */
const VERSION = '1.3';   // must match APP_VERSION in index.html; what changed is listed at the top of index.html

const CACHE = 'dti-' + VERSION;
/* the app itself, kept so it opens with no connection */
const CORE = [
  './',
  'index.html',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
  'app-logo.webp',
  'data/dice-throne-dialogues.json',
  'data/dice-throne-generic-lines.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE.map(u => new Request(u, { cache: 'reload' })))));
});

/* a new version clears everything the old one stored */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('dti-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') self.skipWaiting();
  if (e.data === 'version' && e.ports[0]) e.ports[0].postMessage(VERSION);
});

const keep = (req, res) => {
  if (res && (res.ok || res.type === 'opaque')) {
    const copy = res.clone();
    caches.open(CACHE).then(c => c.put(req, copy));
  }
  return res;
};

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  /* Google Fonts: they never change, so stored copies are used first */
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => keep(req, res))));
    return;
  }
  if (url.origin !== location.origin) return;
  if (url.pathname.endsWith('/sw.js')) return;

  /* pictures (art/, logos/, bkg/): show the stored copy at once and refresh
     it in the background, so a replaced picture appears on the next visit.
     A picture that isn't uploaded yet is never stored, so it shows up as
     soon as it is. */
  if (/\.(webp|png|jpe?g|gif|svg)$/i.test(url.pathname)) {
    e.respondWith(caches.match(req).then(hit => {
      const net = fetch(req.url, { cache: 'no-cache' }).then(res => keep(req, res)).catch(() => hit || Response.error());
      return hit || net;
    }));
    return;
  }

  /* the page and the dialogues: always the newest from the server when
     online, the stored copy when offline */
  e.respondWith(
    fetch(req.url, { cache: 'no-cache' })
      .then(res => keep(req, res))
      .catch(() => caches.match(req, { ignoreSearch: true })
        .then(hit => hit || (req.mode === 'navigate' ? caches.match('index.html') : Response.error())))
  );
});
