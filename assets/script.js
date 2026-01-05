(function(){
  const menuBtn = document.querySelector('[data-menu]');
  const mobile = document.querySelector('[data-mobile]');
  if(menuBtn && mobile){
    menuBtn.addEventListener('click', ()=> mobile.classList.toggle('open'));
  }

  // Active link on scroll
  const links = Array.from(document.querySelectorAll('a[data-scroll]'));
  const sections = links
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const setActive = () => {
    let current = sections[0];
    for(const s of sections){
      const r = s.getBoundingClientRect();
      if(r.top <= 120) current = s;
    }
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current.id));
  };

  document.addEventListener('scroll', setActive, {passive:true});
  setActive();

  // Smooth scroll
  links.forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href');
      if(id && id.startsWith('#')){
        e.preventDefault();
        document.querySelector(id)?.scrollIntoView({behavior:'smooth', block:'start'});
        if(mobile) mobile.classList.remove('open');
      }
    });
  });

  // Events template helpers (optional)
  const nowBox = document.querySelector('[data-current-event]');
  const pastBox = document.querySelector('[data-past-events]');
  if(nowBox && pastBox){
    // Edit these in assets/script.js if you want.
    const current = {
      title: "No event is running right now",
      date: "Check Discord for the next event announcement",
      desc: "When an event is live, this box can describe what’s happening and how to join."
    };
    const past = [
      // {title:"Example Event", date:"2026-01-01", desc:"Short recap…"},
    ];

    nowBox.innerHTML = `
      <h3>${current.title}</h3>
      <p><b>${current.date}</b></p>
      <p>${current.desc}</p>
    `;

    if(past.length === 0){
      pastBox.innerHTML = "<p class='muted'>No past events listed yet.</p>";
    } else {
      pastBox.innerHTML = past.map(e=>`
        <div class="card">
          <h3>${e.title}</h3>
          <p><b>${e.date}</b></p>
          <p>${e.desc}</p>
        </div>
      `).join("");
    }
  }
})();
