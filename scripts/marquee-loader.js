// /scripts/marquee-loader.js
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    var el = document.getElementById('site-marquee');
    if (!el) return;
    var fallback = 'HG鉄道仮部へようこそ。';
    fetch('/includes/marquee.html')
      .then(function(res){ if (!res.ok) throw new Error(res.status); return res.text(); })
      .then(function(txt){ el.innerHTML = txt; })
      .catch(function(){ el.innerHTML = fallback; });
  });
})();
