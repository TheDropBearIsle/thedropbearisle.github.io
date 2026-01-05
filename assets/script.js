function positionHotspots(){
  const img = document.getElementById('homeArt');
  if(!img) return;

  const rect = img.getBoundingClientRect();
  const nW = img.naturalWidth || 1;
  const nH = img.naturalHeight || 1;

  // object-fit: contain => image is scaled to fit container width (or height), with letterboxing
  // We compute the drawn image box inside the container.
  const containerW = rect.width;
  const containerH = rect.height;

  const scale = Math.min(containerW / nW, containerH / nH);
  const drawnW = nW * scale;
  const drawnH = nH * scale;

  const xOffset = (containerW - drawnW) / 2;
  const yOffset = (containerH - drawnH) / 2;

  document.querySelectorAll('[data-hotspot]').forEach(el=>{
    const x = parseFloat(el.getAttribute('data-x')||'0');
    const y = parseFloat(el.getAttribute('data-y')||'0');
    const w = parseFloat(el.getAttribute('data-w')||'0');
    const h = parseFloat(el.getAttribute('data-h')||'0');

    // coords are normalized to the ARTWORK (0..1), applied to drawn image box
    const left = rect.left + xOffset + x * drawnW;
    const top  = rect.top  + yOffset + y * drawnH;
    const width  = w * drawnW;
    const height = h * drawnH;

    el.style.left = left + 'px';
    el.style.top = top + 'px';
    el.style.width = width + 'px';
    el.style.height = height + 'px';
  });
}

(function(){
  // Multipage nav highlight (non-home pages)
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
    const ready = () => positionHotspots();
    if(img.complete) ready();
    img.addEventListener('load', ready);
    window.addEventListener('resize', positionHotspots);
  }
})();
