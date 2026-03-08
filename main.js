/* ============================================
   COME ON CASINO — Dramatic Casino Experience
   GSAP 3.12.5 + ScrollTrigger
   EVERY animation is BOLD, VISIBLE, DRAMATIC.
   ============================================ */

;(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  var isMobile = window.innerWidth < 768;
  var isTouch  = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  /* ==============================
     LOADER -> HERO TRANSITION
     ============================== */
  var loader = document.getElementById('loader');

  window.addEventListener('load', function () {
    gsap.to(loader, {
      delay: 2,
      duration: 0.8,
      opacity: 0,
      ease: 'power2.inOut',
      onComplete: function () {
        loader.classList.add('done');
        loader.style.display = 'none';
        document.body.style.overflow = '';
        initHero();
        initScrollAnimations();
        initCanvasBg();
        initAmbientFloaters();
        initGameMicroAnims();
      }
    });
  });

  /* ==============================
     NAVIGATION
     ============================== */
  var nav      = document.getElementById('nav');
  var toggle   = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  toggle.addEventListener('click', function () {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ==============================
     HERO — Cinematic Casino Entrance
     ============================== */
  function initHero() {
    var tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    var flyCards  = gsap.utils.toArray('.fly-card');
    var fallChips = gsap.utils.toArray('.fall-chip');
    var mob = isMobile ? 0.5 : 1;

    /* ── a) Roulette wheel entrance (t=0) ── */
    gsap.set('#heroRoulette', { opacity: 0, scale: 0.5 });
    tl.to('#heroRoulette', {
      opacity: 1,
      scale: 1,
      duration: 2,
      ease: 'power1.out'
    }, 0);

    /* ── b) Cards FLY in from WAY off-screen (t=0.3) ── */

    /* Starting positions — far outside viewport */
    var cardStarts = [
      { x: -1200, y: -800, rotation: -720 },
      { x:  1200, y: -600, rotation:  540 },
      { x: -900,  y:  800, rotation: -540 },
      { x:  1100, y:  700, rotation:  720 },
      { x: -600,  y: -1000, rotation: -360 },
      { x:  900,  y: -900, rotation:  540 }
    ];

    /* Landing positions — around edges, clear of center text */
    var cardEnds = [
      { x: -38 * mob, y: -22 * mob, rotation: -15 },
      { x:  36 * mob, y: -18 * mob, rotation:  12 },
      { x: -42 * mob, y:   8 * mob, rotation:  -8 },
      { x:  40 * mob, y:  12 * mob, rotation:  10 },
      { x: -30 * mob, y:  28 * mob, rotation: -20 },
      { x:  32 * mob, y:  25 * mob, rotation:  18 }
    ];

    /* Set initial state for all cards */
    flyCards.forEach(function (card, i) {
      gsap.set(card, {
        x: cardStarts[i].x,
        y: cardStarts[i].y,
        rotation: cardStarts[i].rotation,
        opacity: 0,
        scale: 0.6
      });
    });

    /* Animate each card from off-screen to landing position */
    flyCards.forEach(function (card, i) {
      /* Convert vw/vh to pixels for landing */
      var endX = (cardEnds[i].x / 100) * window.innerWidth;
      var endY = (cardEnds[i].y / 100) * window.innerHeight;

      tl.to(card, {
        x: endX,
        y: endY,
        rotation: cardEnds[i].rotation,
        opacity: 1,
        scale: 1,
        duration: 1.8,
        ease: 'power2.out'
      }, 0.3 + i * 0.15);
    });

    /* After landing: gentle perpetual float */
    flyCards.forEach(function (card, i) {
      gsap.to(card, {
        y: '+=' + gsap.utils.random(-10, 10),
        rotation: '+=' + gsap.utils.random(-3, 3),
        duration: gsap.utils.random(3, 5),
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2.5 + i * 0.3
      });
    });

    /* ── c) Chips FALL from above with BOUNCE (t=1.5) ── */

    var chipEnds = [
      { x: -34 * mob, y: -10 * mob },
      { x: -28 * mob, y:  15 * mob },
      { x: -36 * mob, y:  32 * mob },
      { x:  34 * mob, y:  -8 * mob },
      { x:  28 * mob, y:  18 * mob },
      { x:  36 * mob, y:  34 * mob }
    ];

    fallChips.forEach(function (chip, i) {
      var startRot = gsap.utils.random(-180, 180);
      var endRot   = gsap.utils.random(-10, 10);
      var endX = (chipEnds[i].x / 100) * window.innerWidth;
      var endY = (chipEnds[i].y / 100) * window.innerHeight;

      gsap.set(chip, {
        y: -600,
        x: endX,
        rotation: startRot,
        opacity: 0,
        scale: 0.8
      });

      tl.to(chip, {
        y: endY,
        rotation: endRot,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'bounce.out'
      }, 1.5 + i * 0.2);
    });

    /* ── d) Text appears AFTER cards and chips (t=2.5) ── */

    /* Set initial states for all hero text elements */
    gsap.set('.hero-label', { opacity: 0, y: 20 });
    gsap.set('.ht-line',    { opacity: 0, y: 40 });
    gsap.set('.hero-rule',  { opacity: 0, width: 0 });
    gsap.set('.hero-catch', { opacity: 0, y: 15 });
    gsap.set('.hero-sub',   { opacity: 0 });
    gsap.set('.hero-btn',   { opacity: 0, y: 20 });
    gsap.set('.hero-scroll',{ opacity: 0 });

    tl.to('.hero-label', {
      opacity: 1, y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, 2.5);

    tl.to('.ht-line', {
      opacity: 1, y: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'back.out(1.5)'
    }, 2.6);

    tl.to('.hero-rule', {
      opacity: 1,
      width: 'clamp(80px, 20vw, 200px)',
      duration: 0.8,
      ease: 'power3.inOut'
    }, 2.9);

    tl.to('.hero-catch', {
      opacity: 1, y: 0,
      duration: 0.7,
      ease: 'power2.out'
    }, 3.1);

    tl.to('.hero-sub', {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out'
    }, 3.3);

    tl.to('.hero-btn', {
      opacity: 1, y: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, 3.5);

    tl.to('.hero-scroll', {
      opacity: 1,
      duration: 0.8
    }, 3.5);

    /* ── e) Hero scroll exit — shrink + scatter ── */
    initHeroScrollExit(flyCards, fallChips);
  }

  /* ==============================
     HERO SCROLL EXIT — Shrink & Scatter
     ============================== */
  function initHeroScrollExit(flyCards, fallChips) {

    /* The entire hero scales down gently — the "shrinking" effect */
    gsap.to('#hero', {
      scale: 0.96,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: '60% top',
        end: 'bottom top',
        scrub: 1.5
      }
    });

    /* Hero content fades — MUCH later so store name stays visible */
    gsap.to('#heroContent', {
      scale: 0.92,
      y: -60,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: '55% top',
        end: '100% top',
        scrub: 1.5
      }
    });

    /* Cards scatter OUTWARD — delayed so they persist with the name */
    var cardScatterTargets = [
      { x: -800, y: -500, rotation: -360 },
      { x:  800, y: -400, rotation:  300 },
      { x: -600, y:  500, rotation: -300 },
      { x:  700, y:  450, rotation:  360 },
      { x: -400, y: -650, rotation: -200 },
      { x:  600, y: -580, rotation:  300 }
    ];

    flyCards.forEach(function (card, i) {
      gsap.to(card, {
        x: cardScatterTargets[i].x,
        y: cardScatterTargets[i].y,
        rotation: cardScatterTargets[i].rotation,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: '50% top',
          end: '100% top',
          scrub: 1.5
        }
      });
    });

    /* Chips drift and fade — also delayed */
    fallChips.forEach(function (chip) {
      gsap.to(chip, {
        y: '+=300',
        opacity: 0,
        rotation: '+=' + gsap.utils.random(-180, 180),
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: '50% top',
          end: '100% top',
          scrub: 1.5
        }
      });
    });

    /* Roulette expands and fades */
    gsap.to('#heroRoulette', {
      scale: 1.3,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: '55% top',
        end: '100% top',
        scrub: 1.5
      }
    });

    /* Canvas parallax */
    gsap.to('#heroCanvas', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 2
      }
    });

    /* Scroll indicator fades first */
    gsap.to('.hero-scroll', {
      opacity: 0,
      y: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: '15% top',
        end: '35% top',
        scrub: 0.8
      }
    });
  }

  /* ==============================
     SCROLL ANIMATIONS — All sections below hero
     ============================== */
  function initScrollAnimations() {

    /* ── Section heads: slide in + line growth ── */
    gsap.utils.toArray('.sec-head').forEach(function (el) {
      gsap.set(el, { opacity: 0, x: -30 });
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });

      var ln = el.querySelector('.sec-ln');
      if (ln) {
        gsap.set(ln, { width: 0 });
        gsap.to(ln, {
          width: '100%',
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        });
      }
    });

    /* ── Generic .anim-up reveals ── */
    gsap.utils.toArray('.anim-up').forEach(function (el) {
      gsap.set(el, { opacity: 0, y: 30 });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    /* ────────────────────────────
       CONCEPT SECTION
       ──────────────────────────── */

    /* Concept heading — slides up as single block */
    var conceptH = document.querySelector('.concept-h');
    if (conceptH) {
      gsap.set(conceptH, { opacity: 0, y: 40 });
      gsap.to(conceptH, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: conceptH,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }

    /* Concept cards — fan out in arc on scroll */
    var cdCards = gsap.utils.toArray('#conceptCards .cd');
    if (cdCards.length) {
      var arcCount  = cdCards.length;
      var arcTotal  = 70; /* degrees */
      var arcRadius = 160;
      var arcStart  = -arcTotal / 2;

      /* Initial: all stacked at center, invisible */
      cdCards.forEach(function (card) {
        gsap.set(card, { opacity: 0, x: 0, y: 0, rotation: 0 });
      });

      cdCards.forEach(function (card, i) {
        var angle = arcStart + (i / (arcCount - 1)) * arcTotal;
        var rad   = (angle * Math.PI) / 180;
        var tx    = Math.sin(rad) * arcRadius;
        var ty    = -Math.cos(rad) * arcRadius + arcRadius; /* shift so bottom anchored */
        var tr    = angle * 0.6;

        gsap.to(card, {
          opacity: 0.95,
          x: tx,
          y: ty * 0.3,
          rotation: tr,
          ease: 'none',
          scrollTrigger: {
            trigger: '#conceptCards',
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1.5
          }
        });
      });
    }

    /* ────────────────────────────
       EXPERIENCE SECTION — Game Cards Deal In
       ──────────────────────────── */
    var gameCards = gsap.utils.toArray('#gameGrid .game-card');

    /* Initial: all cards at central "deck" position */
    gameCards.forEach(function (card) {
      gsap.set(card, {
        opacity: 0,
        y: -100,
        rotateY: 90,
        scale: 0.8,
        transformPerspective: 800
      });
    });

    gameCards.forEach(function (card, i) {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        rotateY: 0,
        scale: 1,
        duration: 1,
        delay: i * 0.2,
        ease: 'back.out(1.3)',
        scrollTrigger: {
          trigger: '#gameGrid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });

    /* 3D tilt on hover (desktop) */
    if (!isMobile) {
      document.querySelectorAll('.game-card').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
          var r = card.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - 0.5;
          var y = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(card, {
            rotateY: x * 12,
            rotateX: -y * 12,
            duration: 0.4,
            ease: 'power2.out',
            transformPerspective: 800
          });
        });

        card.addEventListener('mouseleave', function () {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.4)'
          });
        });
      });
    }

    /* Click/tap to flip game cards */
    document.querySelectorAll('.game-card').forEach(function (card) {
      card.addEventListener('click', function () {
        /* On mobile, close other flipped cards */
        if (isTouch) {
          document.querySelectorAll('.game-card.flipped').forEach(function (c) {
            if (c !== card) c.classList.remove('flipped');
          });
        }
        card.classList.toggle('flipped');
      });
    });

    /* ────────────────────────────
       FOOD SECTION — Parallax images
       ──────────────────────────── */
    if (!isMobile) {
      gsap.utils.toArray('.food-img').forEach(function (img, i) {
        gsap.to(img, {
          yPercent: i === 0 ? -15 : 15,
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

    /* ────────────────────────────
       GALLERY — Horizontal Scroll Card Dealing
       ──────────────────────────── */
    initGallery();

    /* ────────────────────────────
       SYSTEM SECTION — Card flip reveal
       ──────────────────────────── */
    gsap.utils.toArray('.sys-card').forEach(function (el, i) {
      gsap.set(el, {
        rotateY: 180,
        opacity: 0,
        y: 40,
        transformPerspective: 800
      });

      gsap.to(el, {
        rotateY: 0,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: i * 0.15,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });

    /* System cards: 3D tilt on hover (desktop, subtler) */
    if (!isMobile) {
      document.querySelectorAll('.sys-card').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
          var r = card.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - 0.5;
          var y = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(card, {
            rotateY: x * 8,
            rotateX: -y * 8,
            duration: 0.35,
            ease: 'power2.out',
            transformPerspective: 800
          });
        });
        card.addEventListener('mouseleave', function () {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)'
          });
        });
      });
    }

    /* ────────────────────────────
       INSTAGRAM SECTION
       ──────────────────────────── */
    var igContent = document.querySelector('.ig-content');
    if (igContent) {
      gsap.set(igContent, { opacity: 0, y: 30 });
      gsap.to(igContent, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.sec-ig',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    }

    /* ────────────────────────────
       FOOTER — Suit symbols bounce in
       ──────────────────────────── */
    gsap.from('.footer-suits span', {
      opacity: 0,
      y: 24,
      rotation: -120,
      scale: 0.5,
      duration: 0.9,
      stagger: 0.12,
      ease: 'back.out(2.5)',
      scrollTrigger: {
        trigger: '#footer',
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    });

    gsap.from('.footer-msg', {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#footer',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }

  /* ==============================
     GALLERY — Forced Horizontal Scroll (right → left, all cards must pass)
     ============================== */
  function initGallery() {
    var track    = document.getElementById('galleryTrack');
    var viewport = document.getElementById('galleryViewport');
    var section  = document.getElementById('gallery');
    var counter  = document.querySelector('.gc-current');
    if (!track || !viewport || !section) return;

    var cards     = gsap.utils.toArray('.gallery-card');
    var cardCount = cards.length;
    if (!cardCount) return;

    /* Total width of the track */
    var totalWidth = track.scrollWidth;
    var vw = window.innerWidth;

    /* Start: all cards off-screen to the right */
    gsap.set(track, { x: vw });

    /* Total travel distance: from right edge → all cards pass left edge */
    var totalTravel = vw + totalWidth;

    /* Pin the section and scrub the track from right to left */
    ScrollTrigger.create({
      trigger: '#gallery',
      start: 'top top',
      end: '+=' + totalTravel * 1.8,
      pin: true,
      scrub: 1.2,
      onUpdate: function (self) {
        var progress = self.progress;

        /* Move track from right to left */
        var currentX = vw - (totalTravel * progress);
        gsap.set(track, { x: currentX });

        /* Update counter */
        if (counter) {
          var cardProgress = Math.max(0, (vw - currentX) / totalWidth);
          var currentCard = Math.min(
            Math.floor(cardProgress * cardCount) + 1,
            cardCount
          );
          counter.textContent = currentCard;
        }

        /* 3D perspective on each card based on center distance */
        var center = vw / 2;
        cards.forEach(function (card) {
          var r    = card.getBoundingClientRect();
          var sc   = r.left + r.width / 2;
          var dist = (sc - center) / vw;
          var rot  = dist * 10;
          var scl  = 1 - Math.abs(dist) * 0.12;
          gsap.set(card, {
            rotateY: rot,
            scale: Math.max(scl, 0.88),
            transformPerspective: 1000
          });
        });
      }
    });

    /* Resize handler */
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        ScrollTrigger.refresh();
      }, 200);
    });
  }

  /* ==============================
     GAME MICRO-ANIMATIONS — Continuous casino life
     ============================== */
  function initGameMicroAnims() {

    /* ── POKER: Two cards oscillate ── */
    var pk1 = document.querySelector('.pk-1');
    var pk2 = document.querySelector('.pk-2');
    if (pk1) {
      gsap.to(pk1, {
        rotation: -5,
        y: -3,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
      gsap.set(pk1, { rotation: -12 });
    }
    if (pk2) {
      gsap.to(pk2, {
        rotation: 12,
        y: 3,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
      gsap.set(pk2, { rotation: 5 });
    }

    /* ── BLACKJACK: Face-down card periodically flips to reveal K♥ then flips back ── */
    var bjDownInner = document.querySelector('.bj-down-inner');
    if (bjDownInner) {
      var bjFlipTl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
      bjFlipTl
        .to(bjDownInner, {
          rotateY: 180,
          duration: 0.8,
          ease: 'power2.inOut',
          transformPerspective: 600
        })
        .to({}, { duration: 1.5 }) /* hold revealed */
        .to(bjDownInner, {
          rotateY: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          transformPerspective: 600
        });
    }

    /* ── BACCARAT: Squeeze with suit peeking + 9 reveal ── */
    var bcCover = document.querySelector('.bc-cover');
    var bcPeek  = document.querySelector('.bc-peek-suit');
    if (bcCover && bcPeek) {
      gsap.set(bcCover, { transformOrigin: 'center bottom' });

      var bcSqueezeTl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
      bcSqueezeTl
        /* Phase 1: Slight lift — tease */
        .to(bcCover, {
          rotateX: 12,
          duration: 1.5,
          ease: 'sine.inOut'
        })
        /* Peek suit appears */
        .to(bcPeek, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out'
        }, '-=0.8')
        /* Phase 2: More lift — see more pips */
        .to(bcCover, {
          rotateX: 30,
          duration: 1.2,
          ease: 'sine.inOut'
        })
        /* Phase 3: Full reveal — cover lifts away */
        .to(bcCover, {
          rotateX: 90,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.in'
        })
        .to(bcPeek, {
          opacity: 0,
          duration: 0.3
        }, '-=0.6')
        /* Hold revealed card */
        .to({}, { duration: 1.5 })
        /* Reset: cover snaps back */
        .set(bcCover, {
          rotateX: 0,
          opacity: 1
        })
        .set(bcPeek, { opacity: 0 });
    }

    /* ── RING GAME: Cards oscillate + chips bounce ── */
    var rg1 = document.querySelector('.rg-1');
    var rg2 = document.querySelector('.rg-2');
    if (rg1) {
      gsap.to(rg1, {
        rotation: -10,
        y: -4,
        duration: 2.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    }
    if (rg2) {
      gsap.to(rg2, {
        rotation: 10,
        y: 4,
        duration: 2.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    }

    var rgChips = gsap.utils.toArray('.rg-chip');
    rgChips.forEach(function (chip, i) {
      gsap.to(chip, {
        y: -4,
        duration: 1.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: i * 0.3
      });
    });
  }

  /* ==============================
     AMBIENT FLOATING SUIT MARKS
     ============================== */
  function initAmbientFloaters() {
    var suits  = ['\u2660', '\u2665', '\u2666', '\u2663']; /* spade heart diamond club */
    var colors = [
      'rgba(107, 159, 212, 0.12)',
      'rgba(212, 107, 107, 0.10)',
      'rgba(212, 180, 107, 0.10)',
      'rgba(107, 159, 212, 0.10)'
    ];
    var count  = 15;
    var pageH  = document.documentElement.scrollHeight;

    for (var i = 0; i < count; i++) {
      var span = document.createElement('span');
      var suitIdx = i % 4;
      span.textContent = suits[suitIdx];
      span.style.cssText =
        'position:absolute;' +
        'left:' + gsap.utils.random(3, 97) + '%;' +
        'top:' + gsap.utils.random(10, 90) + '%;' +
        'font-size:' + gsap.utils.random(18, 42) + 'px;' +
        'color:' + colors[suitIdx] + ';' +
        'pointer-events:none;' +
        'z-index:0;' +
        'user-select:none;' +
        'opacity:0;';
      span.className = 'ambient-suit';
      document.body.appendChild(span);

      /* Fade in when scrolled near */
      gsap.to(span, {
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: span,
          start: 'top 95%',
          toggleActions: 'play none none reverse'
        }
      });

      /* Perpetual floating animation */
      gsap.to(span, {
        y: gsap.utils.random(-30, 30),
        x: gsap.utils.random(-15, 15),
        rotation: gsap.utils.random(-25, 25),
        duration: gsap.utils.random(4, 7),
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: i * 0.4
      });
    }
  }

  /* ==============================
     CANVAS — Hero Particle Network
     ============================== */
  function initCanvasBg() {
    var canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var w, h;
    var dots  = [];
    var count = isMobile ? 20 : 45;
    var linkD = 120;

    function resize() {
      w = canvas.width  = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (var i = 0; i < count; i++) {
      dots.push({
        x:  Math.random() * w,
        y:  Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r:  0.8 + Math.random() * 1.5,
        a:  0.10 + Math.random() * 0.20
      });
    }

    /* Mouse attracts nearby dots (desktop only) */
    var mx = w / 2, my = h / 2;
    if (!isTouch) {
      window.addEventListener('mousemove', function (e) {
        var r = canvas.getBoundingClientRect();
        mx = e.clientX - r.left;
        my = e.clientY - r.top;
      }, { passive: true });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      for (var di = 0; di < dots.length; di++) {
        var d = dots[di];

        /* Mouse attraction (desktop) */
        if (!isTouch) {
          var dx   = mx - d.x;
          var dy   = my - d.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            d.vx += dx * 0.000015;
            d.vy += dy * 0.000015;
          }
        }

        /* Damping */
        d.vx *= 0.998;
        d.vy *= 0.998;

        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = w;
        if (d.x > w) d.x = 0;
        if (d.y < 0) d.y = h;
        if (d.y > h) d.y = 0;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(107, 159, 212, ' + d.a + ')';
        ctx.fill();
      }

      /* Connect nearby dots with faint lines */
      for (var i = 0; i < dots.length; i++) {
        for (var j = i + 1; j < dots.length; j++) {
          var dx2   = dots[i].x - dots[j].x;
          var dy2   = dots[i].y - dots[j].y;
          var dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist2 < linkD) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = 'rgba(107, 159, 212, ' + (0.08 * (1 - dist2 / linkD)) + ')';
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
     SMOOTH SCROLL — Anchor links
     ============================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var offset = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

})();
