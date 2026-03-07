/* ============================================
   COME ON CASINO — Main JavaScript
   GSAP + ScrollTrigger driven experience
   ============================================ */

;(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  /* ── Loader ── */
  const loader = document.getElementById('loader');

  window.addEventListener('load', () => {
    gsap.to(loader, {
      delay: 2,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete () {
        loader.classList.add('is-hidden');
        startHero();
        startScrollAnimations();
        startParticles();
      }
    });
  });

  /* ── Navigation ── */
  const nav       = document.getElementById('nav');
  const toggle    = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 60);
    lastScroll = y;
  }, { passive: true });

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('is-active');
    navLinks.classList.toggle('is-open');
    document.body.style.overflow = navLinks.classList.contains('is-open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('is-active');
      navLinks.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  /* ── Hero entrance animation ── */
  function startHero () {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl
      .to('.hero-label', { opacity: 1, duration: 0.9 })
      .to('.hero-title-word', {
        opacity: 1, y: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power4.out'
      }, '-=0.5')
      .to('.hero-catch', { opacity: 1, duration: 0.8 }, '-=0.5')
      .to('.hero-cta', { opacity: 1, duration: 0.7 }, '-=0.4')
      .to(['.hf-card', '.hf-chip'], {
        opacity: function (i) { return i < 2 ? 0.85 : 0.5; },
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.4)'
      }, '-=0.6')
      .to('.hero-scroll-indicator', { opacity: 1, duration: 0.6 }, '-=0.3');

    /* Floating cards gentle motion */
    gsap.to('.hf-card-1', {
      y: -18, rotation: -15, duration: 3.5,
      ease: 'sine.inOut', yoyo: true, repeat: -1
    });
    gsap.to('.hf-card-2', {
      y: 14, rotation: 11, duration: 3,
      ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.6
    });
    gsap.to('.hf-chip-1', {
      y: -12, x: 6, duration: 4,
      ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.3
    });
    gsap.to('.hf-chip-2', {
      y: 10, x: -8, duration: 3.2,
      ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.8
    });

    /* Hero parallax on scroll */
    gsap.to('.hero-bg', {
      yPercent: 18, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.2 }
    });
    gsap.to(['.hero-glow-1', '.hero-glow-2'], {
      yPercent: 30, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
    });
    gsap.to('.hero-content', {
      yPercent: 35, opacity: 0, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: '55% top', scrub: 1 }
    });
    gsap.to('.hero-floating', {
      yPercent: 20, opacity: 0, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: '50% top', scrub: 1 }
    });
  }

  /* ── Scroll Animations ── */
  function startScrollAnimations () {

    /* -- Concept heading lines -- */
    gsap.utils.toArray('.ch-line').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1, y: 0,
        duration: 1, delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 82%' }
      });
    });

    /* -- Concept spade -- */
    gsap.to('.concept-spade', {
      rotation: 8, y: -20,
      ease: 'none',
      scrollTrigger: { trigger: '#concept', start: 'top bottom', end: 'bottom top', scrub: 2 }
    });

    /* -- Fade reveals -- */
    gsap.utils.toArray('.reveal-fade').forEach(el => {
      gsap.to(el, {
        opacity: 1, y: 0,
        duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 84%' }
      });
    });

    /* -- Game cards stagger -- */
    gsap.utils.toArray('.gc-reveal').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1, y: 0, rotateX: 0,
        duration: 0.9,
        delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.game-grid', start: 'top 80%' }
      });
    });

    /* -- Gallery items -- */
    gsap.utils.toArray('.reveal-gallery').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.8,
        delay: i * 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 86%' }
      });
    });

    /* -- System cards -- */
    gsap.utils.toArray('.reveal-card').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1, y: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 84%' }
      });
    });

    /* -- Section label lines -- */
    gsap.utils.toArray('.sec-line').forEach(el => {
      gsap.from(el, {
        width: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    /* -- Divider lines -- */
    gsap.utils.toArray('.divider-line').forEach(el => {
      gsap.from(el, {
        height: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%' }
      });
    });
  }

  /* ── Particles ── */
  function startParticles () {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    const symbols = ['♠', '♥', '♦', '♣', '♤', '♡'];
    const count = window.innerWidth < 768 ? 8 : 14;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.textContent = symbols[i % symbols.length];
      p.style.left = (5 + Math.random() * 90) + '%';
      p.style.top = (5 + Math.random() * 90) + '%';
      p.style.fontSize = (10 + Math.random() * 12) + 'px';
      container.appendChild(p);

      gsap.to(p, {
        opacity: 0.07 + Math.random() * 0.06,
        duration: 2.5 + Math.random() * 2,
        ease: 'sine.inOut', yoyo: true, repeat: -1,
        delay: Math.random() * 3
      });
      gsap.to(p, {
        y: -25 - Math.random() * 35,
        x: -15 + Math.random() * 30,
        duration: 5 + Math.random() * 5,
        ease: 'sine.inOut', yoyo: true, repeat: -1,
        delay: Math.random() * 2
      });
    }
  }

  /* ── Mobile card flip (touch) ── */
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.querySelectorAll('.game-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.game-card.is-flipped').forEach(c => {
          if (c !== card) c.classList.remove('is-flipped');
        });
        card.classList.toggle('is-flipped');
      });
    });
  }

})();
