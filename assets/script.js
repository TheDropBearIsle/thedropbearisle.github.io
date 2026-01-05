function positionHotspots(){
  const img = document.getElementById('homeArt');
  if(!img) return;
  const rect = img.getBoundingClientRect();
  const nW = img.naturalWidth || 1;
  const nH = img.naturalHeight || 1;

  document.querySelectorAll('[data-hotspot]').forEach(el=>{
    const x = parseFloat(el.getAttribute('data-x')||'0');
    const y = parseFloat(el.getAttribute('data-y')||'0');
    const w = parseFloat(el.getAttribute('data-w')||'0');
    const h = parseFloat(el.getAttribute('data-h')||'0');

    // coords are normalized to the artwork (0..1)
    const left = rect.left + x * rect.width;
    const top  = rect.top  + y * rect.height;
    const width  = w * rect.width;
    const height = h * rect.height;

    el.style.left = left + 'px';
    el.style.top = top + 'px';
    el.style.width = width + 'px';
    el.style.height = height + 'px';
  });
}

(function(){
  const btn = document.querySelector('[data-menu]');
  const mobile = document.querySelector('[data-mobile]');
  if(btn && mobile){
    btn.addEventListener('click', ()=> mobile.classList.toggle('open'));
  }

  // Active nav highlight on multipage
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('a[data-nav]').forEach(a=>{
    const href = (a.getAttribute('href')||'').toLowerCase();
    if(href === path){
      a.classList.add('active');
      a.setAttribute('aria-current','page');
    }
  });

  // Home hotspots
  const img = document.getElementById('homeArt');
  if(img){
    const ready = () => { positionHotspots(); };
    if(img.complete) ready();
    img.addEventListener('load', ready);
    window.addEventListener('resize', positionHotspots);
  }
})();
