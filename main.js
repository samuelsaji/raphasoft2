// Raphasoft — site interactions
document.addEventListener('DOMContentLoaded', () => {

  // Header border on scroll
  const header = document.querySelector('.header');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }));
  }

  // Practice switcher (home)
  const tabs = Array.from(document.querySelectorAll('.ptab'));
  const select = (tab) => {
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if (!panel) return;
      panel.hidden = !on;
      panel.classList.toggle('show', on);
    });
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      let n = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (n) { e.preventDefault(); select(n); n.focus(); }
    });
  });

  // Services page: highlight the section in view
  const navLinks = Array.from(document.querySelectorAll('.svc-nav a'));
  if (navLinks.length && 'IntersectionObserver' in window) {
    const map = new Map(navLinks.map(a => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navLinks.forEach(a => a.classList.remove('active'));
          const a = map.get(e.target.id);
          if (a) a.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  // Consultation form
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = document.getElementById('form-msg');
      const btn = form.querySelector('button[type="submit"]');
      const label = btn.textContent;
      btn.textContent = 'Sending request';
      btn.disabled = true;
      setTimeout(() => {
        msg.textContent = 'Request sent. A Raphasoft consultant will reply within one business day.';
        msg.classList.add('show');
        btn.textContent = label;
        btn.disabled = false;
        form.reset();
      }, 900);
    });
  }
});
