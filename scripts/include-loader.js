// /scripts/include-loader.js
(function(){
  async function loadEl(el){
    var path = el.getAttribute('data-include');
    var fallback = el.getAttribute('data-fallback') || '';
    if (!path) return;
    try {
      var res = await fetch(path);
      if (!res.ok) throw new Error(res.status);
      var txt = await res.text();
      el.innerHTML = txt;
    } catch (e) {
      el.innerHTML = fallback;
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    var els = document.querySelectorAll('[data-include]');
    els.forEach(function(el){ loadEl(el); });
  });
})();
