/* ============================================
   COME ON CASINO — Sub-page animations
   Lightweight reveals · Shared nav · Brand consistency
   ============================================ */

;(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  /* ==============================
     NAVIGATION
     ============================== */
  const nav      = document.getElementById('nav');
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  /* Sub-pages: nav always has background */
  nav.classList.add('scrolled');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* Mobile toggle */
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* Active nav link */
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  navLinks.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/+$/, '');
    if (path === href || (href !== '/' && path.startsWith(href))) {
      a.classList.add('active');
    }
  });

  /* ==============================
     PAGE HERO ENTRANCE
     ============================== */
  window.addEventListener('load', () => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to('.page-hero-title', { opacity: 1, y: 0, duration: 1.2 })
      .to('.page-hero-sub',   { opacity: 1, duration: 1, ease: 'power2.out' }, '-=0.5');

    initPageAnimations();
  });

  /* ==============================
     SCROLL REVEAL — Gentle, not scrub
     ============================== */
  function initPageAnimations () {
    gsap.utils.toArray('.rv').forEach(el => {
      gsap.to(el, {
        opacity: 1, y: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });

    /* Stagger for grouped items */
    document.querySelectorAll('.rv-group').forEach(group => {
      const items = group.querySelectorAll('.rv-item');
      items.forEach((el, i) => {
        gsap.to(el, {
          opacity: 1, y: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      });
    });

    /* Footer */
    gsap.from('.footer-suits span', {
      opacity: 0, y: 20, rotation: -90,
      duration: 0.8, stagger: 0.1, ease: 'back.out(2)',
      scrollTrigger: { trigger: '#footer', start: 'top 92%' }
    });
  }

  /* Smooth scroll for anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    });
  });

})();
