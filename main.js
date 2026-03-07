/* ============================================
   COME ON CASINO — Premium Casino Experience v4
   GSAP 3.12.5 + ScrollTrigger
   Dense casino-themed animation system
   ============================================ */

;(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  const isMobile = window.innerWidth < 768;
  const isTouch  = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  /* ==============================
     LOADER -> HERO TRANSITION
     ============================== */
  const loader = document.getElementById('loader');

  window.addEventListener('load', () => {
    gsap.to(loader, {
      delay: 2.2,
      duration: 1.0,
      opacity: 0,
      ease: 'power2.inOut',
      onComplete () {
        loader.classList.add('done');
        document.body.style.overflow = '';
        initHero();
        initScrollAnimations();
        initCanvasBg();
      }
    });
  });

  /* ==============================
     NAVIGATION
     ============================== */
  const nav      = document.getElementById('nav');
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

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

  /* ==============================
     HERO — Cinematic entrance + casino effects
     ============================== */
  function initHero () {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    /* ── a) Roulette ring spin entrance ── */
    const rouletteSvg = document.querySelector('.roulette-svg');
    if (rouletteSvg) {
      gsap.set('#heroRoulette', { opacity: 0, scale: 0.7 });
      tl.to('#heroRoulette', {
        opacity: 1, scale: 1, rotation: 360,
        duration: 3, ease: 'power1.out'
      }, 0);

      /* Perpetual slow rotation */
      gsap.to(rouletteSvg, {
        rotation: '+=360',
        duration: 80,
        ease: 'none',
        repeat: -1,
        transformOrigin: '50% 50%'
      });
    }

    /* ── b) Card shuffle -> fan animation ── */
    const deckCards = gsap.utils.toArray('.deck-card');
    const dcShines  = gsap.utils.toArray('.dc-shine');

    /* Initial: stacked, invisible */
    gsap.set(deckCards, { opacity: 0, x: 0, y: 0, rotation: 0, scale: 0.95 });
    gsap.set(dcShines, { xPercent: -120 });

    /* Phase 1: Cards appear + riffle shuffle simulation */
    deckCards.forEach((card, i) => {
      tl.to(card, {
        opacity: 1,
        duration: 0.15,
        ease: 'power1.in'
      }, 0.4 + i * 0.06);

      /* Quick riffle — y oscillation */
      tl.to(card, {
        y: -5, duration: 0.08, ease: 'power1.inOut'
      }, 0.45 + i * 0.07);
      tl.to(card, {
        y: 5, duration: 0.08, ease: 'power1.inOut'
      }, 0.53 + i * 0.07);
      tl.to(card, {
        y: -3, duration: 0.06, ease: 'power1.inOut'
      }, 0.61 + i * 0.07);
      tl.to(card, {
        y: 0, duration: 0.06, ease: 'power1.out'
      }, 0.67 + i * 0.07);
    });

    /* Phase 2: Spread into fan formation */
    const fanPositions = [
      { x: isMobile ? -60 : -120, y: -10, rotation: -25 },
      { x: isMobile ? -30 : -60,  y: -30, rotation: -12 },
      { x: 0,                      y: -40, rotation: 0   },
      { x: isMobile ? 30  : 60,   y: -30, rotation: 12  },
      { x: isMobile ? 60  : 120,  y: -10, rotation: 25  }
    ];

    deckCards.forEach((card, i) => {
      tl.to(card, {
        x: fanPositions[i].x,
        y: fanPositions[i].y,
        rotation: fanPositions[i].rotation,
        scale: 1,
        duration: 1.2,
        ease: 'expo.out'
      }, 0.9 + i * 0.08);
    });

    /* Shine slides across each card during spread */
    dcShines.forEach((shine, i) => {
      tl.to(shine, {
        xPercent: 120,
        duration: 0.8,
        ease: 'power2.inOut'
      }, 1.1 + i * 0.1);
    });

    /* ── c) Text entrance — overlapping with cards ── */
    tl.to('.hero-label', {
      opacity: 1,
      duration: 1.6,
      ease: 'power2.out'
    }, 1.6);

    tl.to('.hw', {
      opacity: 1, y: 0,
      duration: 1.8,
      stagger: 0.22,
      ease: 'expo.out'
    }, 1.8);

    tl.to('.hero-rule', {
      opacity: 1,
      width: 'clamp(80px, 20vw, 200px)',
      duration: 1.4,
      ease: 'power3.inOut'
    }, 2.1);

    tl.to('.hc', {
      opacity: 1, y: 0,
      duration: 0.6,
      stagger: 0.06,
      ease: 'back.out(2.4)'
    }, 2.4);

    tl.to('.hero-sub', {
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out'
    }, 2.8);

    tl.to('.hero-btn', {
      opacity: 1, y: 0,
      duration: 0.9,
      ease: 'power3.out'
    }, 3.0);

    /* ── d) Chip cascade — drop with bounce ── */
    const chipsL = gsap.utils.toArray('.chipstack-l .chip-el');
    const chipsR = gsap.utils.toArray('.chipstack-r .chip-el');

    /* Initial: above viewport */
    gsap.set([...chipsL, ...chipsR], {
      y: -200, opacity: 0, rotation: () => gsap.utils.random(-30, 30)
    });

    /* Left stack drops */
    chipsL.forEach((chip, i) => {
      tl.to(chip, {
        y: 0,
        opacity: 1,
        rotation: gsap.utils.random(-5, 5),
        duration: 1.4,
        ease: 'elastic.out(1, 0.35)'
      }, 2.6 + i * 0.18);
    });

    /* Right stack drops */
    chipsR.forEach((chip, i) => {
      tl.to(chip, {
        y: 0,
        opacity: 1,
        rotation: gsap.utils.random(-5, 5),
        duration: 1.4,
        ease: 'elastic.out(1, 0.35)'
      }, 3.0 + i * 0.18);
    });

    /* ── e) Roulette ball orbit ── */
    orbitBall();

    /* ── f) Perpetual floating: deck cards + chips ── */
    deckCards.forEach((card, i) => {
      gsap.to(card, {
        y: '+=' + gsap.utils.random(-18, -8),
        rotation: '+=' + gsap.utils.random(-4, 4),
        duration: gsap.utils.random(3.5, 5.2),
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: i * 0.3
      });
    });

    chipsL.concat(chipsR).forEach((chip, i) => {
      gsap.to(chip, {
        y: '+=' + gsap.utils.random(-8, -3),
        rotation: '+=' + gsap.utils.random(-6, 6),
        duration: gsap.utils.random(3.0, 4.5),
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: i * 0.4 + 3.5
      });
    });

    /* Scroll indicator */
    tl.to('.hero-scroll', { opacity: 1, duration: 0.8 }, 3.6);

    /* ── g) Hero scroll exit — scrub parallax ── */
    gsap.to('.hero-content', {
      yPercent: -60, opacity: 0, scale: 0.88,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '80% top',
        scrub: 1
      }
    });

    gsap.to('#heroDeck', {
      yPercent: -80, opacity: 0, rotation: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '75% top',
        scrub: 1
      }
    });

    gsap.to('#heroChipstack', {
      y: 100, opacity: 0, scale: 0.5,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '70% top',
        scrub: 1
      }
    });

    gsap.to('#heroRoulette', {
      scale: 1.3, opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '80% top',
        scrub: 1.2
      }
    });

    gsap.to('#heroCanvas', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5
      }
    });

    gsap.to('.hero-vignette', {
      opacity: 1.5,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: '40% top',
        end: 'bottom top',
        scrub: 1
      }
    });

    gsap.to('.hero-scroll', {
      opacity: 0, y: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: '5% top',
        end: '15% top',
        scrub: 0.5
      }
    });
  }

  /* ==============================
     ROULETTE BALL ORBIT
     ============================== */
  function orbitBall () {
    const ball = document.getElementById('rouletteBall');
    if (!ball) return;

    let angle  = 0;
    const radius = isMobile ? 140 : 230;
    const speed  = 0.015;

    function tick () {
      angle += speed;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      ball.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      requestAnimationFrame(tick);
    }
    tick();
  }

  /* ==============================
     SCROLL ANIMATIONS — Dense casino-themed
     ============================== */
  function initScrollAnimations () {

    /* ── Section divider elements ── */
    gsap.utils.toArray('.div-suit, .div-chip').forEach(el => {
      gsap.from(el, {
        opacity: 0, scale: 0.5,
        duration: 0.7,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          end: 'top 65%',
          scrub: 1
        }
      });
    });

    /* ── Section heads: slide in with line growth ── */
    gsap.utils.toArray('.sec-head').forEach(el => {
      gsap.to(el, {
        opacity: 1, x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          end: 'top 60%',
          scrub: 1
        }
      });

      const ln = el.querySelector('.sec-ln');
      if (ln) {
        gsap.from(ln, {
          width: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 82%' }
        });
      }
    });

    /* ── Section entrance: smooth opacity ramp ── */
    gsap.utils.toArray('.sec').forEach(sec => {
      if (sec.classList.contains('sec-gallery') || sec.classList.contains('sec-ig')) return;
      gsap.from(sec, {
        opacity: 0.7,
        ease: 'none',
        scrollTrigger: {
          trigger: sec,
          start: 'top bottom',
          end: 'top 65%',
          scrub: 1
        }
      });
    });

    /* ── Generic reveals: scrub connected ── */
    gsap.utils.toArray('.rv').forEach(el => {
      gsap.to(el, {
        opacity: 1, y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          end: 'top 62%',
          scrub: 1
        }
      });
    });

    /* ────────────────────────────
       CONCEPT SECTION
       ──────────────────────────── */

    /* Heading lines: scrub reveal with card-peel feel */
    const chLines = gsap.utils.toArray('.ch-l');
    chLines.forEach((el, i) => {
      gsap.to(el, {
        opacity: 1, y: 0, rotateX: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#concept',
          start: () => 'top+=' + (i * 60 + 80) + 'px 75%',
          end:   () => 'top+=' + (i * 60 + 220) + 'px 75%',
          scrub: 1.2
        }
      });
    });

    /* Float chips: scrub fade + rotation */
    gsap.utils.toArray('#concept .float-chip').forEach((chip, i) => {
      gsap.set(chip, { opacity: 0, rotation: gsap.utils.random(-30, 30) });
      gsap.to(chip, {
        opacity: 0.6,
        rotation: '+=360',
        duration: 2,
        ease: 'none',
        scrollTrigger: {
          trigger: '#concept',
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 2
        }
      });
    });

    /* Concept card fan — scrub arc deployment (desktop) */
    if (!isMobile) {
      const cards  = gsap.utils.toArray('.cd');
      const count  = cards.length;
      const radius = 160;
      const arc    = 70;
      const startA = -arc / 2;

      cards.forEach(c => gsap.set(c, { opacity: 0, x: '-50%', y: '-50%' }));

      /* Phase 1: Fade in staggered */
      cards.forEach((card, i) => {
        gsap.to(card, {
          opacity: 0.92,
          ease: 'none',
          scrollTrigger: {
            trigger: '#concept',
            start: () => 'top+=' + (i * 30) + 'px 65%',
            end:   () => 'top+=' + (i * 30 + 100) + 'px 65%',
            scrub: 1
          }
        });
      });

      /* Phase 2: Fan out with rotation */
      cards.forEach((card, i) => {
        const angle = startA + (i / (count - 1)) * arc;
        const rad   = (angle * Math.PI) / 180;
        const tx    = Math.sin(rad) * radius;
        const ty    = (i - (count - 1) / 2) * 70;
        const tr    = angle * 0.55;

        gsap.to(card, {
          x: tx - 28, y: ty, rotation: tr,
          ease: 'none',
          scrollTrigger: {
            trigger: '#concept',
            start: 'top 55%',
            end: 'bottom 40%',
            scrub: 1.8
          }
        });
      });

      /* Card shine — shimmer on scroll */
      gsap.utils.toArray('.cd-shine').forEach(shine => {
        gsap.to(shine, {
          x: '60%',
          ease: 'none',
          scrollTrigger: {
            trigger: '#concept',
            start: 'top 50%',
            end: 'bottom 30%',
            scrub: 2
          }
        });
      });
    }

    /* ────────────────────────────
       EXPERIENCE SECTION
       ──────────────────────────── */

    /* Dealer zone: felt table edge grows */
    gsap.to('.dealer-zone', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#experience',
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1
      }
    });
    gsap.set('.dealer-zone', { scaleX: 0, transformOrigin: 'center center' });

    /* Exp deck: fade in */
    gsap.to('#expDeck', {
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#experience',
        start: 'top 75%',
        end: 'top 55%',
        scrub: 1
      }
    });
    gsap.set('#expDeck', { opacity: 0 });

    /* Game cards dealing animation */
    const expDeck   = document.getElementById('expDeck');
    const gameGrid  = document.getElementById('gameGrid');
    const gameCards = gsap.utils.toArray('.gc-rv');

    gameCards.forEach((el, i) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#gameGrid',
          start: 'top 85%',
          end: 'top 35%',
          scrub: 1.2
        }
      });

      /* Card deals: rises, unrotates, scales to full, flips from back */
      tl.to(el, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 1,
        delay: i * 0.15,
        ease: 'power2.out'
      });

      /* Chip decoration bounces in on arrival */
      const chipDeco = el.querySelector('.gc-chip-deco');
      if (chipDeco) {
        gsap.set(chipDeco, { scale: 0 });
        gsap.to(chipDeco, {
          scale: 1,
          duration: 0.8,
          ease: 'elastic.out(1, 0.3)',
          scrollTrigger: {
            trigger: '#gameGrid',
            start: 'top 55%',
            toggleActions: 'play none none none'
          },
          delay: i * 0.15 + 0.3
        });
      }
    });

    /* 3D card tilt on hover (desktop) */
    if (!isMobile) {
      document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('mousemove', e => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top)  / r.height - 0.5;
          gsap.to(card, {
            rotateY: x * 14,
            rotateX: -y * 14,
            duration: 0.4,
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateY: 0, rotateX: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.4)'
          });
        });

        /* Shine follows mouse */
        const shine = card.querySelector('.gc-front-shine');
        if (shine) {
          card.addEventListener('mousemove', e => {
            const r  = card.getBoundingClientRect();
            const px = ((e.clientX - r.left) / r.width) * 100;
            const py = ((e.clientY - r.top) / r.height) * 100;
            gsap.to(shine, {
              background: 'radial-gradient(circle at ' + px + '% ' + py + '%, rgba(255,255,255,.45) 0%, transparent 60%)',
              duration: 0.3
            });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(shine, {
              background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,.35) 50%, transparent 70%)',
              duration: 0.5
            });
          });
        }
      });
    }

    /* ────────────────────────────
       FOOD SECTION
       ──────────────────────────── */

    /* Image parallax (desktop) */
    if (!isMobile) {
      gsap.utils.toArray('.food-img').forEach((img, i) => {
        gsap.to(img, {
          yPercent: i === 0 ? -12 : 12,
          ease: 'none',
          scrollTrigger: {
            trigger: '.food-grid',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        });
      });
    }

    /* Food floating chips */
    gsap.utils.toArray('#food .float-chip').forEach(chip => {
      gsap.set(chip, { opacity: 0 });
      gsap.to(chip, {
        opacity: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: '#food',
          start: 'top 75%',
          end: 'top 45%',
          scrub: 1
        }
      });
    });

    /* ────────────────────────────
       GALLERY SECTION
       ──────────────────────────── */

    /* Gallery title scrub entrance */
    gsap.to('.gallery-h', {
      opacity: 1, y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#gallery',
        start: 'top 85%',
        end: 'top 55%',
        scrub: 1
      }
    });

    /* Gallery head entrance */
    gsap.to('.gallery-head', {
      opacity: 1, x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#gallery', start: 'top 80%' }
    });

    /* Gallery dramatic section fade */
    ScrollTrigger.create({
      trigger: '#gallery',
      start: 'top 85%',
      end: 'top 25%',
      scrub: 1,
      onUpdate: function (self) {
        var p = self.progress;
        gsap.set('#gallery', { opacity: 0.2 + p * 0.8 });
      }
    });

    /* Floating suit marks — perpetual float */
    gsap.utils.toArray('.gsf').forEach((suit, i) => {
      gsap.to(suit, {
        y: gsap.utils.random(-25, -10),
        x: gsap.utils.random(-8, 8),
        rotation: gsap.utils.random(-15, 15),
        duration: gsap.utils.random(3, 5),
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: i * 0.5
      });
    });

    /* Horizontal scroll pinned gallery */
    initGallery();

    /* ────────────────────────────
       SYSTEM SECTION — Card flip reveal
       ──────────────────────────── */
    gsap.utils.toArray('.sys-card').forEach((el, i) => {
      /* Start with card "face down" */
      gsap.set(el, { rotateY: 180, opacity: 0, y: 40 });

      gsap.to(el, {
        rotateY: 0,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        delay: i * 0.12
      });
    });

    /* System cards: subtle 3D tilt on hover (desktop) */
    if (!isMobile) {
      document.querySelectorAll('.sys-card').forEach(card => {
        card.addEventListener('mousemove', function (e) {
          var r = card.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - 0.5;
          var y = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(card, {
            rotateY: x * 8,
            rotateX: -y * 8,
            duration: 0.35,
            ease: 'power2.out'
          });
        });
        card.addEventListener('mouseleave', function () {
          gsap.to(card, {
            rotateY: 0, rotateX: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)'
          });
        });
      });
    }

    /* ────────────────────────────
       INSTAGRAM SECTION
       ──────────────────────────── */
    gsap.to('.ig-content', {
      opacity: 1, y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.sec-ig',
        start: 'top 80%',
        end: 'top 55%',
        scrub: 1
      }
    });

    /* ────────────────────────────
       FOOTER
       ──────────────────────────── */
    gsap.from('.footer-suits span', {
      opacity: 0,
      y: 24,
      rotation: -120,
      scale: 0.5,
      duration: 0.9,
      stagger: 0.12,
      ease: 'back.out(2.5)',
      scrollTrigger: { trigger: '#footer', start: 'top 90%' }
    });

    gsap.from('.footer-msg', {
      opacity: 0, y: 20,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#footer', start: 'top 85%' }
    });
  }

  /* ==============================
     GALLERY — Pinned horizontal scroll with roulette progress
     ============================== */
  function initGallery () {
    var track    = document.getElementById('galleryTrack');
    var carousel = document.getElementById('galleryCarousel');
    var wheelProgress = document.getElementById('galleryWheelProgress');
    var wheelDot      = document.getElementById('galleryWheelDot');
    if (!track || !carousel) return;

    var slides     = Array.from(track.children);
    var slideCount = slides.length;
    if (!slideCount) return;

    /* Clone sets for seamless infinite loop */
    for (var c = 0; c < 2; c++) {
      slides.forEach(function (s) { track.appendChild(s.cloneNode(true)); });
    }

    var all = Array.from(track.children);
    var gap = 28;

    function setWidth () {
      var w = 0;
      for (var i = 0; i < slideCount; i++) {
        w += all[i].offsetWidth + gap;
      }
      return w;
    }

    var sw = setWidth();
    gsap.set(track, { x: -sw });

    /* SVG progress constants */
    var circumference = 226.2; // 2 * PI * 36
    if (wheelProgress) {
      gsap.set(wheelProgress, { attr: { 'stroke-dashoffset': circumference } });
    }

    ScrollTrigger.create({
      trigger: '#gallery',
      start: 'top top',
      end: '+=' + (sw * 1.8),
      pin: true,
      scrub: 1.5,
      onUpdate: function (self) {
        var p = self.progress;

        /* Move track */
        var x = -sw - (p * sw * 1.5);
        if (x < -sw * 2) x += sw;
        gsap.set(track, { x: x });

        /* Roulette wheel progress — stroke-dashoffset */
        if (wheelProgress) {
          var offset = circumference * (1 - p);
          gsap.set(wheelProgress, { attr: { 'stroke-dashoffset': offset } });
        }

        /* Wheel dot — rotates around the circle */
        if (wheelDot) {
          var dotAngle = p * Math.PI * 2 - Math.PI / 2; // start from top
          var dotR     = 36;
          var cx       = 40 + Math.cos(dotAngle) * dotR;
          var cy       = 40 + Math.sin(dotAngle) * dotR;
          /* Position relative to parent (gallery-wheel-wrap) */
          gsap.set(wheelDot, {
            left: (cx / 80) * 100 + '%',
            top:  (cy / 80) * 100 + '%'
          });
        }

        /* Per-slide 3D perspective effect */
        var center = window.innerWidth / 2;
        all.forEach(function (slide) {
          var r    = slide.getBoundingClientRect();
          var sc   = r.left + r.width / 2;
          var dist = (sc - center) / window.innerWidth;
          var rot  = dist * 8;
          var scl  = 1 - Math.abs(dist) * 0.12;
          var opa  = 1 - Math.abs(dist) * 0.4;
          gsap.set(slide, {
            rotation: rot,
            scale: Math.max(scl, 0.85),
            opacity: Math.max(opa, 0.5)
          });
        });
      }
    });

    window.addEventListener('resize', function () {
      sw = setWidth();
      ScrollTrigger.refresh();
    });
  }

  /* ==============================
     CANVAS — Hero particle network
     ============================== */
  function initCanvasBg () {
    var canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var w, h;
    var dots  = [];
    var count = isMobile ? 28 : 60;
    var linkD = isMobile ? 90 : 120;

    function resize () {
      w = canvas.width  = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (var i = 0; i < count; i++) {
      dots.push({
        x:  Math.random() * w,
        y:  Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r:  0.8 + Math.random() * 1.4,
        a:  0.10 + Math.random() * 0.18
      });
    }

    /* Mouse interaction — subtle attraction */
    var mx = w / 2, my = h / 2;
    if (!isTouch) {
      window.addEventListener('mousemove', function (e) {
        var r = canvas.getBoundingClientRect();
        mx = e.clientX - r.left;
        my = e.clientY - r.top;
      }, { passive: true });
    }

    function draw () {
      ctx.clearRect(0, 0, w, h);

      for (var di = 0; di < dots.length; di++) {
        var d = dots[di];

        /* Gentle cursor attraction */
        if (!isTouch) {
          var dx   = mx - d.x;
          var dy   = my - d.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 260) {
            d.vx += dx * 0.000012;
            d.vy += dy * 0.000012;
          }
        }

        /* Damping */
        d.vx *= 0.9985;
        d.vy *= 0.9985;

        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0)  d.x = w;
        if (d.x > w)  d.x = 0;
        if (d.y < 0)  d.y = h;
        if (d.y > h)  d.y = 0;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(107, 159, 212, ' + d.a + ')';
        ctx.fill();
      }

      /* Link nearby dots */
      for (var i = 0; i < dots.length; i++) {
        for (var j = i + 1; j < dots.length; j++) {
          var dx2  = dots[i].x - dots[j].x;
          var dy2  = dots[i].y - dots[j].y;
          var dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist2 < linkD) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = 'rgba(107, 159, 212, ' + (0.07 * (1 - dist2 / linkD)) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ==============================
     MOBILE CARD FLIP
     ============================== */
  if (isTouch) {
    document.querySelectorAll('.game-card').forEach(function (card) {
      card.addEventListener('click', function () {
        document.querySelectorAll('.game-card.flipped').forEach(function (c) {
          if (c !== card) c.classList.remove('flipped');
        });
        card.classList.toggle('flipped');
      });
    });
  }

  /* ==============================
     SMOOTH SCROLL — Anchor links
     ============================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var offset = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

})();
