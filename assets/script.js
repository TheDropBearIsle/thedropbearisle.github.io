// The Drop Bear Isle — small UX helpers
(function(){
  const btn = document.querySelector('[data-menu-btn]');
  const panel = document.querySelector('[data-mobile-panel]');
  if(btn && panel){
    btn.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Highlight active nav based on path
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('a[data-nav]').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if(href === path){
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  // If hash is set, open matching details element (FAQ deep links)
  if(location.hash){
    const el = document.querySelector(location.hash);
    if(el && el.tagName === 'DETAILS'){ el.open = true; }
  }
})();
