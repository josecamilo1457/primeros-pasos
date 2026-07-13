/* =============================================
   PRIMEROS PASOS – Sprint 1 – main.js
============================================= */

'use strict';

// -----------------------------------------------
// 1. STICKY CTA – aparece al bajar 300px
// -----------------------------------------------
(function initStickyCTA() {
  const cta = document.querySelector('.sticky-cta');
  if (!cta) return;

  const THRESHOLD = 300;

  function onScroll() {
    if (window.scrollY > THRESHOLD) {
      cta.classList.add('visible');
    } else {
      cta.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();

// -----------------------------------------------
// 2. SMOOTH SCROLL para anclas internas
// -----------------------------------------------
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

// -----------------------------------------------
// 3. NAVBAR – sombra al hacer scroll
// -----------------------------------------------
(function initNavbarShadow() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,.12)';
    } else {
      navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,.08)';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

// -----------------------------------------------
// 4. WHATSAPP UTM – agrega utm_source al link
// -----------------------------------------------
(function initWALinks() {
  const WA_BASE = 'https://wa.me/5491130011050';
  const MSG = encodeURIComponent(
    'Hola! Quisiera más información sobre el Jardín Maternal Primeros Pasos.'
  );

  document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]').forEach(function(a) {
    // solo modificar links propios
    if (!a.href.includes('5491130011050')) return;
    const src = a.dataset.utmSource || 'landing';
    a.href = WA_BASE + '?text=' + MSG + '&utm_source=' + src;
    a.setAttribute('rel', 'noopener noreferrer');
    a.setAttribute('target', '_blank');
  });
})();

// -----------------------------------------------
// 5. INTERSECTION OBSERVER – fade-in sections
// -----------------------------------------------
(function initFadeIn() {
  if (!('IntersectionObserver' in window)) return;

  const style = document.createElement('style');
  style.textContent = [
    '.js-fade { opacity: 0; transform: translateY(24px); transition: opacity .5s ease, transform .5s ease; }',
    '.js-fade.is-visible { opacity: 1; transform: none; }'
  ].join('');
  document.head.appendChild(style);

  const targets = document.querySelectorAll('.hero__trust-item, .footer__inner > *');
  targets.forEach(function(el) { el.classList.add('js-fade'); });

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(function(el) { observer.observe(el); });
})();

// -----------------------------------------------
// 6. AX: skip link focus management
// -----------------------------------------------
(function initSkipLink() {
  const skip = document.querySelector('.skip-link');
  if (!skip) return;
  skip.addEventListener('click', function(e) {
    const main = document.querySelector('#main-content');
    if (!main) return;
    e.preventDefault();
    main.setAttribute('tabindex', '-1');
    main.focus();
  });
})();
