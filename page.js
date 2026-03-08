/* ============================================
   COME ON CASINO — Sub-page Casino Experience
   Card-deal reveals · Floating suits · 3D tilt
   ============================================ */

;(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  const isMobile = window.innerWidth < 768;

  /* ==============================
     NAVIGATION
     ============================== */
  const nav      = document.getElementById('nav');
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

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
     FLOATING SUIT MARKS — Hero background
     ============================== */
  function createFloatingSuits () {
    const hero = document.querySelector('.page-hero');
    if (!hero) return;

    const suits = ['\u2660', '\u2665', '\u2666', '\u2663'];
    const count = isMobile ? 6 : 10;
    const container = document.createElement('div');
    container.className = 'ph-suit-float';
    container.style.cssText = 'position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;';

    for (let i = 0; i < count; i++) {
      const span = document.createElement('span');
      span.textContent = suits[i % 4];
      span.style.cssText = `
        position:absolute;
        font-size:${18 + Math.random() * 24}px;
        color:rgba(74,138,191,${0.06 + Math.random() * 0.06});
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        transform:rotate(${Math.random() * 360}deg);
      `;
      container.appendChild(span);

      /* Gentle float animation */
      gsap.to(span, {
        y: -30 - Math.random() * 40,
        x: -15 + Math.random() * 30,
        rotation: `+=${-30 + Math.random() * 60}`,
        duration: 4 + Math.random() * 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 3
      });
    }

    hero.style.position = 'relative';
    hero.appendChild(container);
  }

  /* ==============================
     PAGE HERO ENTRANCE
     ============================== */
  window.addEventListener('load', () => {
    createFloatingSuits();

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    /* Breadcrumb first */
    tl.from('.breadcrumb', {
      opacity: 0, y: -15,
      duration: 0.6,
      ease: 'power2.out'
    });

    /* Title — card deal style entrance */
    tl.to('.page-hero-title', {
      opacity: 1, y: 0,
      duration: 1.0,
      ease: 'back.out(1.4)'
    }, '-=0.2');

    /* Subtitle */
    tl.to('.page-hero-sub', {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.4');

    /* Decorative line under title — if present */
    const heroLine = document.querySelector('.page-hero-line');
    if (heroLine) {
      tl.from(heroLine, {
        scaleX: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5');
    }

    initPageAnimations();
  });

  /* ==============================
     SCROLL REVEAL — Card-deal style
     ============================== */
  function initPageAnimations () {

    /* ------ Generic reveals (.rv) — card-deal entrance ------ */
    gsap.utils.toArray('.rv').forEach(el => {
      gsap.to(el, {
        opacity: 1, y: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });

    /* ------ Stagger groups (.rv-group) — card dealing stagger ------ */
    document.querySelectorAll('.rv-group').forEach(group => {
      const items = group.querySelectorAll('.rv-item');
      items.forEach((el, i) => {
        gsap.to(el, {
          opacity: 1, y: 0,
          duration: 0.75,
          delay: i * 0.12,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: group,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      });
    });

    /* ------ Section headings — clip reveal + subtle rotateX ------ */
    gsap.utils.toArray('.page-content h2, .page-content h3').forEach(h => {
      gsap.from(h, {
        opacity: 0,
        y: 30,
        rotateX: 8,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: h,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });
    });

    /* ------ Paragraphs — word-level fade ------ */
    gsap.utils.toArray('.page-content > p, .page-content .concept-text > p').forEach(p => {
      gsap.from(p, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: p,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });
    });

    /* ------ Game link cards — 3D deal entrance ------ */
    initGameCards();

    /* ------ Info tables — row stagger ------ */
    initInfoTables();

    /* ------ Rules list — stagger reveal ------ */
    initRulesLists();

    /* ------ FAQ accordion ------ */
    initFAQ();

    /* ------ Step flow items ------ */
    initStepFlow();

    /* ------ Menu list items ------ */
    initMenuList();

    /* ------ Images — zoom entrance ------ */
    initImages();

    /* ------ Page CTA section ------ */
    initPageCTA();

    /* ------ Footer ------ */
    gsap.from('.footer-suits span', {
      opacity: 0, y: 20, rotation: -90,
      duration: 0.8, stagger: 0.1, ease: 'back.out(2)',
      scrollTrigger: { trigger: '#footer', start: 'top 92%' }
    });
  }

  /* ==============================
     GAME LINK CARDS — 3D tilt + deal entrance
     ============================== */
  function initGameCards () {
    const cards = document.querySelectorAll('.game-link-card');
    if (!cards.length) return;

    /* Deal entrance */
    cards.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 60,
        rotateX: 15,
        rotateY: -5 + i * 3,
        scale: 0.9,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: card.parentElement || card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    /* 3D tilt on hover (desktop only) */
    if (isMobile) return;

    cards.forEach(card => {
      card.style.transformStyle = 'preserve-3d';
      card.style.transition = 'transform 0.15s ease-out, box-shadow 0.3s ease';

      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
        card.style.boxShadow = `${-x * 15}px ${y * 15}px 30px rgba(12,29,58,0.12)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });
  }

  /* ==============================
     INFO TABLES — chip-rolling row stagger
     ============================== */
  function initInfoTables () {
    document.querySelectorAll('.info-table').forEach(table => {
      const rows = table.querySelectorAll('tr');
      rows.forEach((row, i) => {
        gsap.from(row, {
          opacity: 0,
          x: i % 2 === 0 ? -30 : 30,
          duration: 0.6,
          delay: i * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: table,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      });
    });
  }

  /* ==============================
     RULES LIST — stagger reveal
     ============================== */
  function initRulesLists () {
    document.querySelectorAll('.rules-list').forEach(list => {
      const items = list.querySelectorAll('li');
      items.forEach((li, i) => {
        gsap.from(li, {
          opacity: 0,
          x: -25,
          rotateY: -5,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: list,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      });
    });
  }

  /* ==============================
     FAQ — Card-flip accordion
     ============================== */
  function initFAQ () {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach((item, i) => {
      const question = item.querySelector('.faq-q');
      const answer   = item.querySelector('.faq-a');
      if (!question || !answer) return;

      /* Initial state — hidden */
      gsap.set(answer, { height: 0, opacity: 0, overflow: 'hidden' });

      /* Entrance animation */
      gsap.from(item, {
        opacity: 0,
        y: 30,
        rotateX: 10,
        duration: 0.7,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });

      /* Click toggle — card-flip easing */
      question.style.cursor = 'pointer';
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('faq-open');

        if (isOpen) {
          gsap.to(answer, {
            height: 0, opacity: 0,
            duration: 0.4,
            ease: 'power2.inOut',
            onComplete: () => item.classList.remove('faq-open')
          });
        } else {
          item.classList.add('faq-open');
          gsap.set(answer, { height: 'auto' });
          const h = answer.offsetHeight;
          gsap.fromTo(answer,
            { height: 0, opacity: 0 },
            { height: h, opacity: 1, duration: 0.5, ease: 'back.out(1.2)' }
          );
        }
      });
    });
  }

  /* ==============================
     STEP FLOW — Card dealing sequence
     ============================== */
  function initStepFlow () {
    document.querySelectorAll('.step-flow .step').forEach((step, i) => {
      gsap.from(step, {
        opacity: 0,
        y: 50,
        rotateX: 12,
        scale: 0.92,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'back.out(1.3)',
        scrollTrigger: {
          trigger: step,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });
  }

  /* ==============================
     MENU LIST — Stagger with alternating direction
     ============================== */
  function initMenuList () {
    document.querySelectorAll('.menu-list .menu-item, .menu-list li').forEach((item, i) => {
      gsap.from(item, {
        opacity: 0,
        x: i % 2 === 0 ? -20 : 20,
        y: 15,
        duration: 0.6,
        delay: i * 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item.parentElement,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });
  }

  /* ==============================
     IMAGES — Zoom entrance + parallax
     ============================== */
  function initImages () {
    gsap.utils.toArray('.page-content img, .page-ph img').forEach(img => {
      /* Zoom-in reveal */
      gsap.from(img, {
        scale: 1.08,
        opacity: 0,
        duration: 1.0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: img,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });

      /* Subtle parallax */
      if (!isMobile) {
        gsap.to(img, {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      }
    });
  }

  /* ==============================
     PAGE CTA — Emphasis entrance
     ============================== */
  function initPageCTA () {
    const cta = document.querySelector('.page-cta');
    if (!cta) return;

    gsap.from(cta, {
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cta,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });

    const ctaBtn = cta.querySelector('a, button');
    if (ctaBtn && !isMobile) {
      ctaBtn.addEventListener('mouseenter', () => {
        gsap.to(ctaBtn, { scale: 1.05, duration: 0.3, ease: 'back.out(2)' });
      });
      ctaBtn.addEventListener('mouseleave', () => {
        gsap.to(ctaBtn, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    }
  }

  /* ==============================
     3D TILT — All card-like elements on sub-pages
     ============================== */
  if (!isMobile) {
    document.querySelectorAll('.page-card, .sys-card, .food-card').forEach(card => {
      card.style.transition = 'transform 0.15s ease-out, box-shadow 0.3s ease';

      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
        card.style.boxShadow = `${-x * 12}px ${y * 12}px 25px rgba(12,29,58,0.1)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });
  }

  /* ==============================
     SMOOTH SCROLL for anchor links
     ============================== */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    });
  });

})();
