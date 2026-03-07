/* ============================================
   COME ON CASINO — v2 10x Animations
   GSAP + ScrollTrigger + Canvas particles
   ============================================ */

;(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  const isMobile = window.innerWidth < 768;

  /* ==============================
     LOADER
     ============================== */
  const loader = document.getElementById('loader');

  window.addEventListener('load', () => {
    gsap.to(loader, {
      delay: 2.2,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete () {
        loader.classList.add('is-hidden');
        runHeroEntrance();
        runScrollAnimations();
        runParticles();
        runCanvasBg();
      }
    });
  });

  /* ==============================
     NAVIGATION
     ============================== */
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 60);
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

  /* ==============================
     HERO ENTRANCE — 10x epic
     ============================== */
  function runHeroEntrance () {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Label slides in
    tl.to('.hero-label', { opacity: 1, duration: 1.2 })

    // Title words burst up from below
    .to('.hero-title-word', {
      opacity: 1, y: 0,
      duration: 1.4,
      stagger: 0.15,
      ease: 'expo.out'
    }, '-=0.7')

    // Catch text — character by character
    .to('.hc-char', {
      opacity: 1, y: 0,
      duration: 0.6,
      stagger: 0.06,
      ease: 'back.out(2)'
    }, '-=0.5')

    // Welcome warm message
    .to('.hero-welcome', {
      opacity: 1,
      duration: 1,
      ease: 'power2.out'
    }, '-=0.2')

    // CTA button
    .to('.hero-cta', {
      opacity: 1, y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5')

    // Floating cards fly in from edges
    .to('.hf-card-1', {
      opacity: 0.9, x: 0, rotation: -12,
      duration: 1, ease: 'back.out(1.8)'
    }, '-=0.8')
    .to('.hf-card-2', {
      opacity: 0.9, x: 0, rotation: 10,
      duration: 1, ease: 'back.out(1.8)'
    }, '-=0.85')
    .to('.hf-card-3', {
      opacity: 0.7, x: 0, rotation: -6,
      duration: 1, ease: 'back.out(1.8)'
    }, '-=0.85')

    // Chips pop in
    .to('.hf-chip', {
      opacity: function (i) { return 0.3 + i * 0.15; },
      scale: 1,
      duration: 0.7,
      stagger: 0.08,
      ease: 'elastic.out(1, 0.5)'
    }, '-=0.7')

    // Scroll indicator
    .to('.hero-scroll-indicator', { opacity: 1, duration: 0.8 }, '-=0.3');

    // Set initial off-screen positions for cards
    gsap.set('.hf-card-1', { x: -80 });
    gsap.set('.hf-card-2', { x: 80 });
    gsap.set('.hf-card-3', { x: -60 });
    gsap.set('.hf-chip', { scale: 0 });

    /* --- Perpetual floating --- */
    gsap.to('.hf-card-1', {
      y: -22, rotation: '-=6', duration: 3.5,
      ease: 'sine.inOut', yoyo: true, repeat: -1
    });
    gsap.to('.hf-card-2', {
      y: 18, rotation: '+=5', duration: 3,
      ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.4
    });
    gsap.to('.hf-card-3', {
      y: -14, rotation: '-=4', duration: 4,
      ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.8
    });
    gsap.to('.hf-chip-1', {
      y: -14, x: 8, duration: 3.5,
      ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.3
    });
    gsap.to('.hf-chip-2', {
      y: 12, x: -10, duration: 3,
      ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.7
    });
    gsap.to('.hf-chip-3', {
      y: -10, x: 6, duration: 4,
      ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.5
    });

    /* --- Hero glow breathing --- */
    gsap.to('.hero-glow-1', {
      scale: 1.15, opacity: 0.18, duration: 5,
      ease: 'sine.inOut', yoyo: true, repeat: -1
    });
    gsap.to('.hero-glow-2', {
      scale: 1.2, opacity: 0.1, duration: 6,
      ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1
    });
    gsap.to('.hero-glow-3', {
      scale: 1.3, opacity: 0.06, duration: 7,
      ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2
    });

    /* --- Hero parallax on scroll (multi-layer) --- */
    gsap.to('.hero-bg', {
      yPercent: 25, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
    gsap.to('.hero-glow-1', {
      yPercent: 40, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
    });
    gsap.to('.hero-glow-2', {
      yPercent: 55, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 2 }
    });
    gsap.to('.hero-content', {
      yPercent: 40, opacity: 0, scale: 0.95, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: '50% top', scrub: 0.8 }
    });
    gsap.to('.hero-floating', {
      yPercent: 30, opacity: 0, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: '45% top', scrub: 0.8 }
    });
    gsap.to('#heroCanvas', {
      yPercent: 20, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.2 }
    });
  }

  /* ==============================
     SCROLL ANIMATIONS — 10x everything
     ============================== */
  function runScrollAnimations () {

    /* --- Section labels slide in --- */
    gsap.utils.toArray('.sec-label').forEach(el => {
      gsap.to(el, {
        opacity: 1, x: 0,
        duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    /* --- Section line grows --- */
    gsap.utils.toArray('.sec-line').forEach(el => {
      gsap.from(el, {
        width: 0, duration: 1.2, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    /* --- Divider lines grow --- */
    gsap.utils.toArray('.divider-line').forEach(el => {
      gsap.from(el, {
        height: 0, duration: 1.2, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 92%' }
      });
    });

    /* --- Concept heading — lines stagger with scale --- */
    gsap.utils.toArray('.ch-line').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1, y: 0,
        duration: 1.2, delay: i * 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 82%' }
      });
    });

    /* --- Concept deco — card slit arc animation --- */
    if (!isMobile) {
      const cards = gsap.utils.toArray('.cd-card');
      const cardCount = cards.length;
      // Arc parameters: cards fan out in a semi-circle arc curving to the right
      const arcRadius = 160; // radius of the arc
      const totalArc = 70; // total arc degrees spread
      const startAngle = -totalArc / 2; // center the arc

      // Initial state: all cards stacked at center, hidden
      cards.forEach(card => {
        gsap.set(card, { opacity: 0, x: '-50%', y: '-50%' });
      });

      // Scroll-driven slit animation
      cards.forEach((card, i) => {
        const angle = startAngle + (i / (cardCount - 1)) * totalArc;
        const rad = (angle * Math.PI) / 180;
        // Arc curves to the right: x from center of arc, y spreads vertically
        const targetX = Math.sin(rad) * arcRadius;
        const targetY = (i - (cardCount - 1) / 2) * 70; // vertical spread
        const targetRotation = angle * 0.6; // subtle rotation matching arc

        // Fade in staggered
        gsap.to(card, {
          opacity: 0.85,
          duration: 0.6,
          delay: i * 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: '#concept', start: 'top 70%' }
        });

        // Slit apart on scroll — cards spread from stacked to arc
        gsap.to(card, {
          x: targetX - 28, // offset from the center (css translate -50%)
          y: targetY,
          rotation: targetRotation,
          ease: 'none',
          scrollTrigger: {
            trigger: '#concept',
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1.5
          }
        });
      });
    }

    /* --- Generic fade reveals --- */
    gsap.utils.toArray('.reveal-fade').forEach(el => {
      gsap.to(el, {
        opacity: 1, y: 0,
        duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 84%' }
      });
    });

    /* --- Game cards — dramatic stagger entrance --- */
    const gameCards = gsap.utils.toArray('.gc-reveal');
    gameCards.forEach((el, i) => {
      gsap.to(el, {
        opacity: 1, y: 0, rotateX: 0, scale: 1,
        duration: 1.2,
        delay: i * 0.15,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.game-grid', start: 'top 82%' }
      });
    });

    /* --- Game cards subtle hover tilt (desktop) --- */
    if (!isMobile) {
      document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, {
            rotateY: x * 8,
            rotateX: -y * 8,
            duration: 0.4, ease: 'power2.out'
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateY: 0, rotateX: 0,
            duration: 0.6, ease: 'elastic.out(1, 0.4)'
          });
        });
      });
    }

    /* --- Gallery infinite horizontal carousel --- */
    initGalleryCarousel();

    /* --- System cards — dramatic entrance --- */
    gsap.utils.toArray('.reveal-card').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1, y: 0, scale: 1,
        duration: 1,
        delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 84%' }
      });
    });

    /* --- Background color shift on sections --- */
    const sections = ['#concept', '#experience', '#gallery', '#system', '#access'];
    sections.forEach(sec => {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
          gsap.to('body', {
            backgroundColor: sec === '#experience' ? '#0b1a30' :
                             sec === '#gallery' ? '#0d1e38' :
                             sec === '#system' ? '#0a1626' :
                             '#0a1628',
            duration: 1.5, ease: 'power2.out'
          });
        },
        onLeaveBack: () => {
          gsap.to('body', { backgroundColor: '#0a1628', duration: 1.5 });
        }
      });
    });

    /* --- Smooth section entrance scale --- */
    gsap.utils.toArray('.sec').forEach(sec => {
      gsap.from(sec, {
        scale: 0.98, opacity: 0.8,
        ease: 'none',
        scrollTrigger: {
          trigger: sec,
          start: 'top bottom',
          end: 'top 60%',
          scrub: 1
        }
      });
    });
  }

  /* ==============================
     PARTICLES — enhanced
     ============================== */
  function runParticles () {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    const symbols = ['♠', '♥', '♦', '♣', '♤', '♡', '♢', '♧', '✦', '◆'];
    const count = isMobile ? 16 : 30;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.textContent = symbols[i % symbols.length];
      p.style.left = (3 + Math.random() * 94) + '%';
      p.style.top = (3 + Math.random() * 94) + '%';
      p.style.fontSize = (8 + Math.random() * 16) + 'px';
      container.appendChild(p);

      // Fade in/out
      gsap.to(p, {
        opacity: 0.06 + Math.random() * 0.12,
        duration: 2 + Math.random() * 3,
        ease: 'sine.inOut', yoyo: true, repeat: -1,
        delay: Math.random() * 4
      });

      // Drift
      gsap.to(p, {
        y: -20 - Math.random() * 40,
        x: -15 + Math.random() * 30,
        rotation: -30 + Math.random() * 60,
        duration: 5 + Math.random() * 7,
        ease: 'sine.inOut', yoyo: true, repeat: -1,
        delay: Math.random() * 3
      });
    }
  }

  /* ==============================
     CANVAS BACKGROUND — flowing dots
     ============================== */
  function runCanvasBg () {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h;
    const dots = [];
    const dotCount = isMobile ? 30 : 60;

    function resize () {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Create dots
    for (let i = 0; i < dotCount; i++) {
      dots.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 1 + Math.random() * 1.5,
        alpha: 0.15 + Math.random() * 0.25
      });
    }

    function draw () {
      ctx.clearRect(0, 0, w, h);

      // Draw dots
      dots.forEach(d => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = w;
        if (d.x > w) d.x = 0;
        if (d.y < 0) d.y = h;
        if (d.y > h) d.y = 0;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(107, 159, 212, ' + d.alpha + ')';
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = 'rgba(107, 159, 212, ' + (0.10 * (1 - dist / 120)) + ')';
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
     GALLERY CAROUSEL — infinite circular scroll
     ============================== */
  function initGalleryCarousel () {
    const track = document.getElementById('galleryTrack');
    const carousel = document.getElementById('galleryCarousel');
    if (!track || !carousel) return;

    const slides = Array.from(track.children);
    const slideCount = slides.length;
    if (slideCount === 0) return;

    // Clone slides 2x for seamless infinite loop
    for (let c = 0; c < 2; c++) {
      slides.forEach(slide => {
        track.appendChild(slide.cloneNode(true));
      });
    }

    const allSlides = Array.from(track.children);
    const gap = 20;

    // Calculate total width of one set
    function getSetWidth () {
      let w = 0;
      for (let i = 0; i < slideCount; i++) {
        w += allSlides[i].offsetWidth + gap;
      }
      return w;
    }

    let setWidth = getSetWidth();
    let currentX = 0;

    // Start from middle set for seamless looping
    currentX = -setWidth;
    gsap.set(track, { x: currentX });

    // Pin gallery and scroll horizontally
    ScrollTrigger.create({
      trigger: '#gallery',
      start: 'top top',
      end: '+=' + (setWidth * 1.5),
      pin: true,
      scrub: 1,
      onUpdate: function (self) {
        const progress = self.progress;
        let x = -setWidth - (progress * setWidth * 1.2);

        // Wrap around for infinite loop
        if (x < -setWidth * 2) {
          x += setWidth;
        }

        gsap.set(track, { x: x });

        // Rotate each visible slide based on its position
        allSlides.forEach(slide => {
          const rect = slide.getBoundingClientRect();
          const center = window.innerWidth / 2;
          const slideCenter = rect.left + rect.width / 2;
          const dist = (slideCenter - center) / window.innerWidth;
          const rotation = dist * 15; // Max 15deg rotation
          const scale = 1 - Math.abs(dist) * 0.12; // Slight scale down at edges
          gsap.set(slide, {
            rotation: rotation,
            scale: Math.max(scale, 0.85)
          });
        });
      }
    });

    // Recalculate on resize
    window.addEventListener('resize', () => {
      setWidth = getSetWidth();
      ScrollTrigger.refresh();
    });
  }

  /* ==============================
     MOBILE CARD FLIP
     ============================== */
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
