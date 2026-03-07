/* ============================================
   COME ON CASINO — Brand Experience v3
   Scrub-based · Pinned · Immersive motion
   ============================================ */

;(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  const isMobile = window.innerWidth < 768;
  const isTouch  = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  /* ==============================
     LOADER → HERO TRANSITION
     ============================== */
  const loader = document.getElementById('loader');

  window.addEventListener('load', () => {
    /* Wait for loader bar to fill, then dissolve */
    gsap.to(loader, {
      delay: 2.6,
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete () {
        loader.classList.add('done');
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
     HERO — Cinematic entrance + scrub exit
     ============================== */
  function initHero () {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    /* ── Staggered entrance sequence ── */

    /* Label: fade in */
    tl.to('.hero-label', { opacity: 1, duration: 1.6 })

    /* Title words: rise from below with elastic overshoot */
      .to('.hw', {
        opacity: 1, y: 0,
        duration: 1.8,
        stagger: 0.22,
        ease: 'expo.out'
      }, '-=0.9')

    /* Expanding rule line */
      .to('.hero-rule', {
        opacity: 1, width: 'clamp(80px, 20vw, 200px)',
        duration: 1.4, ease: 'power3.inOut'
      }, '-=0.7')

    /* Catch characters: stagger with spring */
      .to('.hc', {
        opacity: 1, y: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: 'back.out(2.4)'
      }, '-=0.5')

    /* Subtitle: warm text */
      .to('.hero-sub', { opacity: 1, duration: 1.2, ease: 'power2.out' }, '-=0.3')

    /* CTA button */
      .to('.hero-btn', {
        opacity: 1, y: 0,
        duration: 0.9, ease: 'power3.out'
      }, '-=0.6')

    /* Cards: fade in with rotation settle */
      .to('.hf-card', {
        opacity: 1,
        duration: 1.4,
        stagger: 0.12,
        ease: 'power2.out'
      }, '-=0.9')

    /* Chips: pop in with elastic */
      .to('.hf-chip', {
        opacity: 0.7,
        scale: 1,
        duration: 1,
        stagger: 0.12,
        ease: 'elastic.out(1, 0.45)'
      }, '-=1.0')

    /* Scroll indicator */
      .to('.hero-scroll', { opacity: 1, duration: 0.8 }, '-=0.4');

    /* ── Initial card states ── */
    gsap.set('.hf-c1', { rotation: -14 });
    gsap.set('.hf-c2', { rotation: 12 });
    gsap.set('.hf-c3', { rotation: -8 });
    gsap.set('.hf-chip', { scale: 0 });

    /* ── Perpetual floating: multi-axis for realism ── */
    gsap.to('.hf-c1', {
      y: -20, rotation: '-=6', duration: 4.2,
      ease: 'sine.inOut', yoyo: true, repeat: -1
    });
    gsap.to('.hf-c2', {
      y: 16, rotation: '+=5', duration: 3.7,
      ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.4
    });
    gsap.to('.hf-c3', {
      y: -14, rotation: '-=4', duration: 4.8,
      ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.9
    });
    gsap.to('.hf-ch1', {
      y: -14, x: 8, rotation: 15, duration: 4.2,
      ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.3
    });
    gsap.to('.hf-ch2', {
      y: 12, x: -10, rotation: -12, duration: 3.6,
      ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.6
    });
    gsap.to('.hf-ch3', {
      y: -10, x: 6, rotation: 10, duration: 4.0,
      ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.0
    });

    /* ── Hero SCRUB exit: multi-layer parallax depth ── */
    /* Content layer: moves up faster, fades, scales down */
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

    /* Floating elements: separate parallax rate for depth */
    gsap.to('.hero-float', {
      yPercent: -40, opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '70% top',
        scrub: 1
      }
    });

    /* Canvas: slowest parallax (farthest layer) */
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

    /* Vignette: darken as we leave */
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

    /* Scroll indicator: hide quickly */
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
     SCROLL ANIMATIONS — Scrub-based immersive pacing
     ============================== */
  function initScrollAnimations () {

    /* ── Section heads: slide in with line growth ── */
    gsap.utils.toArray('.sec-head').forEach(el => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          end: 'top 60%',
          scrub: 1
        }
      });
      tl.to(el, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' });

      /* Animate the line inside sec-head */
      const ln = el.querySelector('.sec-ln');
      if (ln) {
        gsap.from(ln, {
          width: 0, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 82%' }
        });
      }
    });

    /* ── CONCEPT: Heading lines scrub-reveal ── */
    const chLines = gsap.utils.toArray('.ch-l');
    chLines.forEach((el, i) => {
      gsap.to(el, {
        opacity: 1, y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#concept',
          start: () => `top+=${i * 60 + 80}px 75%`,
          end: () => `top+=${i * 60 + 220}px 75%`,
          scrub: 1.2
        }
      });
    });

    /* ── CONCEPT: Card fan — scrub arc deployment ── */
    if (!isMobile) {
      const cards = gsap.utils.toArray('.cd');
      const count = cards.length;
      const radius = 160;
      const arc = 70;
      const startA = -arc / 2;

      /* Initial: stacked in center */
      cards.forEach(c => gsap.set(c, { opacity: 0, x: '-50%', y: '-50%' }));

      /* Phase 1: Fade in staggered */
      cards.forEach((card, i) => {
        gsap.to(card, {
          opacity: 0.92,
          ease: 'none',
          scrollTrigger: {
            trigger: '#concept',
            start: () => `top+=${i * 30}px 65%`,
            end: () => `top+=${i * 30 + 100}px 65%`,
            scrub: 1
          }
        });
      });

      /* Phase 2: Fan out with rotation — scrub */
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

      /* Card shine — subtle shimmer on scroll */
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

    /* ── Generic reveals: scrub-connected for smooth feel ── */
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

    /* ── EXPERIENCE: Game cards — dealing animation ── */
    const gameCards = gsap.utils.toArray('.gc-rv');
    gameCards.forEach((el, i) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#gameGrid',
          start: 'top 82%',
          end: 'top 40%',
          scrub: 1.2
        }
      });

      /* Card rises, unrotates, scales to full */
      tl.to(el, {
        opacity: 1, y: 0, rotateX: 0, scale: 1,
        duration: 1,
        delay: i * 0.2,
        ease: 'power2.out'
      });
    });

    /* ── EXPERIENCE: 3D card tilt on hover (desktop) ── */
    if (!isMobile) {
      document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('mousemove', e => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top)  / r.height - 0.5;
          gsap.to(card, {
            rotateY: x * 14, rotateX: -y * 14,
            duration: 0.4, ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateY: 0, rotateX: 0,
            duration: 0.7, ease: 'elastic.out(1, 0.4)'
          });
        });

        /* Shine follows mouse */
        const shine = card.querySelector('.gc-front-shine');
        if (shine) {
          card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const px = ((e.clientX - r.left) / r.width) * 100;
            const py = ((e.clientY - r.top) / r.height) * 100;
            gsap.to(shine, {
              background: `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,.45) 0%, transparent 60%)`,
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

    /* ── FOOD: Image parallax ── */
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

    /* ── GALLERY: Cinematic title entrance ── */
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

    /* ── GALLERY: Horizontal scroll pinned ── */
    initGallery();

    /* ── SYSTEM: Cards stagger with scrub ── */
    gsap.utils.toArray('.sys-card').forEach((el, i) => {
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

    /* ── Section entrance: smooth opacity ramp ── */
    gsap.utils.toArray('.sec').forEach(sec => {
      if (sec.classList.contains('sec-gallery') || sec.classList.contains('sec-ig')) return;
      gsap.from(sec, {
        opacity: 0.8,
        ease: 'none',
        scrollTrigger: {
          trigger: sec,
          start: 'top bottom',
          end: 'top 65%',
          scrub: 1
        }
      });
    });

    /* ── Gallery section: dramatic fade in ── */
    ScrollTrigger.create({
      trigger: '#gallery',
      start: 'top 85%',
      end: 'top 25%',
      scrub: 1,
      onUpdate: self => {
        const p = self.progress;
        gsap.set('#gallery', { opacity: 0.2 + p * 0.8 });
      }
    });

    /* ── INSTAGRAM section: subtle entrance ── */
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

    /* ── Footer: suits spin in ── */
    gsap.from('.footer-suits span', {
      opacity: 0, y: 24, rotation: -120, scale: 0.5,
      duration: 0.9,
      stagger: 0.12,
      ease: 'back.out(2.5)',
      scrollTrigger: { trigger: '#footer', start: 'top 90%' }
    });

    /* Footer message */
    gsap.from('.footer-msg', {
      opacity: 0, y: 20,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#footer', start: 'top 85%' }
    });
  }

  /* ==============================
     CANVAS — Hero particle network
     ============================== */
  function initCanvasBg () {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h;
    const dots   = [];
    const count  = isMobile ? 28 : 60;
    const linkD  = isMobile ? 90 : 120;

    function resize () {
      w = canvas.width  = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < count; i++) {
      dots.push({
        x:  Math.random() * w,
        y:  Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r:  0.8 + Math.random() * 1.4,
        a:  0.10 + Math.random() * 0.18
      });
    }

    /* Mouse interaction — dots subtly attract toward cursor */
    let mx = w / 2, my = h / 2;
    if (!isTouch) {
      window.addEventListener('mousemove', e => {
        const r = canvas.getBoundingClientRect();
        mx = e.clientX - r.left;
        my = e.clientY - r.top;
      }, { passive: true });
    }

    function draw () {
      ctx.clearRect(0, 0, w, h);

      dots.forEach(d => {
        /* Gentle cursor attraction */
        if (!isTouch) {
          const dx = mx - d.x;
          const dy = my - d.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
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
      });

      /* Link nearby dots */
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx   = dots[i].x - dots[j].x;
          const dy   = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkD) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = 'rgba(107, 159, 212, ' + (0.07 * (1 - dist / linkD)) + ')';
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
     GALLERY — Pinned horizontal scroll with progress
     ============================== */
  function initGallery () {
    const track    = document.getElementById('galleryTrack');
    const carousel = document.getElementById('galleryCarousel');
    const progress = document.getElementById('galleryProgress');
    if (!track || !carousel) return;

    const slides     = Array.from(track.children);
    const slideCount = slides.length;
    if (!slideCount) return;

    /* Clone sets for seamless infinite loop */
    for (let c = 0; c < 2; c++) {
      slides.forEach(s => track.appendChild(s.cloneNode(true)));
    }

    const all = Array.from(track.children);
    const gap = 28;

    function setWidth () {
      let w = 0;
      for (let i = 0; i < slideCount; i++) {
        w += all[i].offsetWidth + gap;
      }
      return w;
    }

    let sw = setWidth();
    gsap.set(track, { x: -sw });

    ScrollTrigger.create({
      trigger: '#gallery',
      start: 'top top',
      end: '+=' + (sw * 1.8),
      pin: true,
      scrub: 1.5,
      onUpdate (self) {
        const p = self.progress;

        /* Move track */
        let x = -sw - (p * sw * 1.5);
        if (x < -sw * 2) x += sw;
        gsap.set(track, { x });

        /* Progress bar */
        if (progress) {
          gsap.set(progress, { width: (p * 100) + '%' });
        }

        /* Per-slide depth/perspective effect */
        const center = window.innerWidth / 2;
        all.forEach(slide => {
          const r    = slide.getBoundingClientRect();
          const sc   = r.left + r.width / 2;
          const dist = (sc - center) / window.innerWidth;
          const rot  = dist * 8;
          const scl  = 1 - Math.abs(dist) * 0.12;
          const opa  = 1 - Math.abs(dist) * 0.4;
          gsap.set(slide, {
            rotation: rot,
            scale: Math.max(scl, 0.85),
            opacity: Math.max(opa, 0.5)
          });
        });
      }
    });

    window.addEventListener('resize', () => {
      sw = setWidth();
      ScrollTrigger.refresh();
    });
  }

  /* ==============================
     MOBILE CARD FLIP
     ============================== */
  if (isTouch) {
    document.querySelectorAll('.game-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.game-card.flipped').forEach(c => {
          if (c !== card) c.classList.remove('flipped');
        });
        card.classList.toggle('flipped');
      });
    });
  }

  /* ==============================
     SMOOTH SCROLL — anchor links
     ============================== */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

})();
