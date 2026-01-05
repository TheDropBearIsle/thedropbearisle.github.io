(function(){
  const btn = document.querySelector('[data-menu]');
  const mobile = document.querySelector('[data-mobile]');
  if(btn && mobile){
    btn.addEventListener('click', ()=> mobile.classList.toggle('open'));
  }

  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('a[data-nav]').forEach(a=>{
    const href = (a.getAttribute('href')||'').toLowerCase();
    if(href === path){
      a.classList.add('active');
      a.setAttribute('aria-current','page');
    }
  });
})();
