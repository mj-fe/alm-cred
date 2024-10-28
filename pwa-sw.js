'use strict';

/**
 * PWA service worker of Red Cherry (https://redcherry.ir)
 * Code By : Ali Rahimi (https://alirahimi818.ir)
 * learn more in Github : https://github.com/alirahimi818/simple-PWA
 */

const cacheStorageName = `pwa-almcred-v1`;
const cacheUrls = [
	'/',
	'index.html',
	'home.html',
	'offline.html',
]
const never_cache_urls = [
	/\/private.html/,
	/\/navbar.html/,
	/\/sidebar.html/,
]

// Install
self.addEventListener('install', function (e) {
	console.log('PWA sw installation');
	e.waitUntil(caches.open(cacheStorageName).then(function (cache) {
		console.log('PWA sw caching first urls');
		cacheUrls.map(function (url) {
			return cache.add(url).catch(function (res) {
				return console.log('PWA: ' + String(res) + ' ' + url);
			});
		});
	}));
});

// Activate
self.addEventListener('activate', function (e) {
	console.log('PWA sw activation');
	e.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.map(function (cache) {
					if (cache !== cacheStorageName) {
						console.log(`PWA old cache removed: ${cache}`);
						return caches.delete(cache);
					}
				})
			);
		})
	);

	return self.clients.claim();
});

// Fetch
self.addEventListener('fetch', function (e) {
	if (!checkFetchRules(e)) return;

	// Strategy for online user
	if (e.request.mode === 'navigate' && navigator.onLine) {
		e.respondWith(fetch(e.request).then(function (response) {
			return caches.open(cacheStorageName).then(function (cache) {
				if (never_cache_urls.every(check_never_cache_urls, e.request.url)) {
					cache.put(e.request, response.clone());
				}

				return response;
			});
		}));

		return;
	}

	// Strategy for offline user
	e.respondWith(caches.match(e.request).then(function (response) {
		return response || fetch(e.request).then(function (response) {
			return caches.open(cacheStorageName).then(function (cache) {
				if (never_cache_urls.every(check_never_cache_urls, e.request.url)) {
					cache.put(e.request, response.clone());
				}
				return response;
			});
		});
	}).catch(function () {
		return caches.match(offline_page);
	}));
});

// Check never cache urls
function check_never_cache_urls(url) {
	if (this.match(url)) {
		return false;
	}

	return true;
}

// Fetch Rules
function checkFetchRules(e) {
	// Check request url from inside domain.
	if (new URL(e.request.url).origin !== location.origin) return;

	// Check request url http or https
	if (!e.request.url.match(/^(http|https):\/\//i)) return;

	// Show offline page for POST requests
	if (e.request.method !== 'GET') {
		return caches.match(offline_page);
	}

	return true;
}

importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js");
if (workbox.googleAnalytics) {
	try {
		workbox.googleAnalytics.initialize();
	} catch (e) {
		console.log(e.message);
	}
}
