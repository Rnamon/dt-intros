/* Dice Throne Intros — service worker
 *
 * TO RELEASE A NEW VERSION: change the number below and upload this file
 * together with whatever else changed. Phones pick it up the next time the
 * app is opened (or right away with Settings → Check for updates), and the
 * number shows in Settings.
 */
const VERSION = '1.18';   // must match APP_VERSION in index.html; what changed is listed at the top of index.html

const CACHE = 'dti-' + VERSION;
/* the hero pictures and logos have a cache of their own that is NOT emptied
   when a new version arrives, so a new version never means downloading them again */
const IMG = 'dti-img';
const IMG_RE = /\.(webp|png|jpe?g|gif|svg)$/i;
const checked = new Set();   // pictures already re-checked against the server in this run
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
  'data/dice-throne-generic-lines.json',
  'data/hero-styles.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE.map(u => new Request(u, { cache: 'reload' })))));
});

/* a new version clears what the old one stored, but first moves the pictures
   it had stored into the picture cache */
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    const img = await caches.open(IMG);
    for (const k of keys) {
      if (!k.startsWith('dti-') || k === CACHE || k === IMG) continue;
      try {
        const old = await caches.open(k);
        for (const req of await old.keys()) {
          if (IMG_RE.test(new URL(req.url).pathname) && !(await img.match(req))) {
            const res = await old.match(req);
            if (res) await img.put(req, res);
          }
        }
      } catch (err) {}
      await caches.delete(k);
    }
    await self.clients.claim();
  })());
});

self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') self.skipWaiting();
  if (e.data === 'version' && e.ports[0]) e.ports[0].postMessage(VERSION);
});

const keep = (req, res, name = CACHE) => {
  if (res && (res.ok || res.type === 'opaque')) {
    const copy = res.clone();
    caches.open(name).then(c => c.put(req, copy));
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

  /* pictures (art/, logos/, bkg/): the stored copy is shown at once. Each
     picture is re-checked against the server once per run (not on every
     showing, which slowed fights on a weak signal), so a replaced picture
     appears on a later visit. A picture that isn't uploaded yet is never
     stored, so it shows up as soon as it is. */
  if (IMG_RE.test(url.pathname)) {
    e.respondWith(caches.match(req).then(hit => {
      if (hit) {
        if (!checked.has(req.url)) {
          checked.add(req.url);
          fetch(req.url, { cache: 'no-cache' }).then(res => keep(req, res, IMG)).catch(() => {});
        }
        return hit;
      }
      return fetch(req.url, { cache: 'no-cache' }).then(res => keep(req, res, IMG)).catch(() => Response.error());
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
