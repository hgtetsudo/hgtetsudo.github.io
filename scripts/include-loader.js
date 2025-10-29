// /scripts/include-loader.js
(function(){
  // Simple version check + cache-busting include loader
  async function checkVersionAndMaybeReload(){
    try {
      var res = await fetch('/version.json', { cache: 'no-store' });
      if (!res.ok) return null;
      var json = await res.json();
      if (!json || !json.version) return null;
      var current = localStorage.getItem('site_version');
      if (current !== json.version) {
        // store the fresh version
        localStorage.setItem('site_version', json.version);
        // If the URL already has the version param, avoid loop
        var url = new URL(location.href);
        if (url.searchParams.get('_v') !== json.version) {
          url.searchParams.set('_v', json.version);
          // replace so history isn't cluttered
          location.replace(url.toString());
          // stop further processing on this page load
          return json.version;
        }
      }
      return json.version;
    } catch (e) {
      return null;
    }
  }

  function appendCacheBusterToLinks(el, ver){
    try {
      var links = el.querySelectorAll('link[rel="stylesheet"]');
      links.forEach(function(ln){
        try {
          var href = ln.getAttribute('href') || '';
          if (!href) return;
          var sep = href.indexOf('?') === -1 ? '?' : '&';
          // keep existing _v if present
          if (href.indexOf('_v=') !== -1) return;
          ln.setAttribute('href', href + sep + '_v=' + encodeURIComponent(ver || Date.now()));
        } catch (e){}
      });
    } catch (e){}
  }

  async function loadEl(el, ver){
    var path = el.getAttribute('data-include');
    var fallback = el.getAttribute('data-fallback') || '';
    if (!path) return;
    try {
      // Fetch without caching so updates appear immediately for users
      var res = await fetch(path, { cache: 'no-store' });
      if (!res.ok) throw new Error(res.status);
      var txt = await res.text();
      el.innerHTML = txt;
      // add cache-busters to any stylesheets inside the injected fragment
      appendCacheBusterToLinks(el, ver);
    } catch (e) {
      el.innerHTML = fallback;
    }
  }

  document.addEventListener('DOMContentLoaded', async function(){
    var ver = await checkVersionAndMaybeReload();
    // if checkVersionAndMaybeReload redirected the page, this execution will stop;
    // otherwise proceed to load includes using the retrieved version (or timestamp fallback)
    var els = document.querySelectorAll('[data-include]');
    els.forEach(function(el){ loadEl(el, ver || Date.now()); });
  });
})();
