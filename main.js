/* ============================================
   COME ON CASINO — White Resort Edition
   Immersive scroll · Meaningful motion · Casino elegance
   ============================================ */

;(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  const isMobile = window.innerWidth < 768;

  /* ==============================
     LOADER → HERO TRANSITION
     ============================== */
  const loader = document.getElementById('loader');

  window.addEventListener('load', () => {
    gsap.to(loader, {
      delay: 2.4,
      duration: 0.9,
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
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
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
     HERO — Cinematic entrance
     ============================== */
  function initHero () {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    /* Title words rise from below */
    tl.to('.hero-label', { opacity: 1, duration: 1.4 })
      .to('.hw', {
        opacity: 1, y: 0,
        duration: 1.6,
        stagger: 0.2,
        ease: 'expo.out'
      }, '-=0.8')

      /* Expanding rule line */
      .to('.hero-rule', {
        opacity: 1, width: 'clamp(80px, 20vw, 200px)',
        duration: 1.2, ease: 'power3.inOut'
      }, '-=0.6')

      /* Catch characters stagger */
      .to('.hc', {
        opacity: 1, y: 0,
        duration: 0.5,
        stagger: 0.055,
        ease: 'back.out(2)'
      }, '-=0.5')

      /* Subtitle */
      .to('.hero-sub', { opacity: 1, duration: 1, ease: 'power2.out' }, '-=0.2')

      /* CTA button */
      .to('.hero-btn', {
        opacity: 1, y: 0,
        duration: 0.8, ease: 'power3.out'
      }, '-=0.5')

      /* Floating cards appear */
      .to('.hf-card', {
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.8')

      /* Chips appear */
      .to('.hf-chip', {
        opacity: 0.6,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'elastic.out(1, 0.5)'
      }, '-=0.8')

      /* Scroll indicator */
      .to('.hero-scroll', { opacity: 1, duration: 0.8 }, '-=0.4');

    /* Initial states for floating elements */
    gsap.set('.hf-c1', { rotation: -12 });
    gsap.set('.hf-c2', { rotation: 10 });
    gsap.set('.hf-c3', { rotation: -6 });
    gsap.set('.hf-chip', { scale: 0 });

    /* Perpetual floating */
    gsap.to('.hf-c1', {
      y: -18, rotation: '-=5', duration: 4,
      ease: 'sine.inOut', yoyo: true, repeat: -1
    });
    gsap.to('.hf-c2', {
      y: 14, rotation: '+=4', duration: 3.5,
      ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.5
    });
    gsap.to('.hf-c3', {
      y: -12, rotation: '-=3', duration: 4.5,
      ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1
    });
    gsap.to('.hf-ch1', {
      y: -12, x: 6, duration: 4,
      ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.3
    });
    gsap.to('.hf-ch2', {
      y: 10, x: -8, duration: 3.5,
      ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.7
    });

    /* Hero parallax — multi-layer depth */
    gsap.to('.hero-content', {
      yPercent: 50, opacity: 0, scale: 0.92,
      ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: '60% top', scrub: 0.8 }
    });
    gsap.to('.hero-float', {
      yPercent: 35, opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: '50% top', scrub: 0.8 }
    });
    gsap.to('#heroCanvas', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.2 }
    });
  }

  /* ==============================
     SCROLL ANIMATIONS — Immersive pacing
     ============================== */
  function initScrollAnimations () {

    /* ── Section heads slide in ── */
    gsap.utils.toArray('.sec-head').forEach(el => {
      gsap.to(el, {
        opacity: 1, x: 0,
        duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    /* ── Section lines grow ── */
    gsap.utils.toArray('.sec-line').forEach(el => {
      gsap.from(el, {
        width: 0, duration: 1.2, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    /* ── Concept heading — lines stagger (scrub-based for "connected to scroll" feel) ── */
    const chLines = gsap.utils.toArray('.ch-l');
    chLines.forEach((el, i) => {
      gsap.to(el, {
        opacity: 1, y: 0,
        duration: 1.2, delay: i * 0.18,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 82%' }
      });
    });

    /* ── Concept card deco — arc fan on scroll ── */
    if (!isMobile) {
      const cards = gsap.utils.toArray('.cd');
      const count = cards.length;
      const radius = 150;
      const arc = 65;
      const startA = -arc / 2;

      cards.forEach(c => gsap.set(c, { opacity: 0, x: '-50%', y: '-50%' }));

      cards.forEach((card, i) => {
        const angle = startA + (i / (count - 1)) * arc;
        const rad = (angle * Math.PI) / 180;
        const tx = Math.sin(rad) * radius;
        const ty = (i - (count - 1) / 2) * 65;
        const tr = angle * 0.5;

        /* Fade in staggered */
        gsap.to(card, {
          opacity: 0.9, duration: 0.6, delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: '#concept', start: 'top 70%' }
        });

        /* Slit arc on scroll */
        gsap.to(card, {
          x: tx - 28, y: ty, rotation: tr,
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

    /* ── Generic reveals ── */
    gsap.utils.toArray('.rv').forEach(el => {
      gsap.to(el, {
        opacity: 1, y: 0,
        duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 84%' }
      });
    });

    /* ── Game cards — deal-in stagger ── */
    const gameCards = gsap.utils.toArray('.gc-rv');
    gameCards.forEach((el, i) => {
      gsap.to(el, {
        opacity: 1, y: 0, rotateX: 0, scale: 1,
        duration: 1.4,
        delay: i * 0.15,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.game-grid', start: 'top 82%' }
      });
    });

    /* ── Game cards — 3D tilt on hover (desktop) ── */
    if (!isMobile) {
      document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('mousemove', e => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(card, {
            rotateY: x * 10, rotateX: -y * 10,
            duration: 0.3, ease: 'power2.out'
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

    /* ── Food images parallax ── */
    if (!isMobile) {
      gsap.utils.toArray('.food-img').forEach((img, i) => {
        gsap.to(img, {
          yPercent: i === 0 ? -8 : 8,
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

    /* ── Gallery carousel ── */
    initGallery();

    /* ── System cards stagger ── */
    gsap.utils.toArray('.sys-card').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1, y: 0,
        duration: 1,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 86%' }
      });
    });

    /* ── Smooth section entrance ── */
    gsap.utils.toArray('.sec').forEach(sec => {
      if (sec.classList.contains('sec-gallery')) return;
      gsap.from(sec, {
        opacity: 0.85,
        ease: 'none',
        scrollTrigger: {
          trigger: sec,
          start: 'top bottom',
          end: 'top 70%',
          scrub: 1
        }
      });
    });

    /* ── Gallery section dramatic entrance ── */
    ScrollTrigger.create({
      trigger: '#gallery',
      start: 'top 80%',
      end: 'top 20%',
      scrub: 1,
      onUpdate: self => {
        const p = self.progress;
        gsap.set('#gallery', {
          opacity: 0.3 + p * 0.7
        });
      }
    });

    /* ── Footer suits animation ── */
    gsap.from('.footer-suits span', {
      opacity: 0, y: 20, rotation: -90,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(2)',
      scrollTrigger: { trigger: '#footer', start: 'top 90%' }
    });
  }

  /* ==============================
     CANVAS — Hero particle background
     ============================== */
  function initCanvasBg () {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h;
    const dots = [];
    const count = isMobile ? 25 : 55;

    function resize () {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < count; i++) {
      dots.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 1 + Math.random() * 1.5,
        a: 0.12 + Math.random() * 0.2
      });
    }

    function draw () {
      ctx.clearRect(0, 0, w, h);

      dots.forEach(d => {
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
      });

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = 'rgba(107, 159, 212, ' + (0.08 * (1 - dist / 110)) + ')';
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
     GALLERY — Horizontal infinite carousel
     ============================== */
  function initGallery () {
    const track = document.getElementById('galleryTrack');
    const carousel = document.getElementById('galleryCarousel');
    if (!track || !carousel) return;

    const slides = Array.from(track.children);
    const slideCount = slides.length;
    if (!slideCount) return;

    /* Clone 2x for infinite loop */
    for (let c = 0; c < 2; c++) {
      slides.forEach(s => track.appendChild(s.cloneNode(true)));
    }

    const all = Array.from(track.children);
    const gap = 24;

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
      end: '+=' + (sw * 1.6),
      pin: true,
      scrub: 1.2,
      onUpdate (self) {
        let x = -sw - (self.progress * sw * 1.4);
        if (x < -sw * 2) x += sw;
        gsap.set(track, { x });

        /* Per-slide depth effect */
        const center = window.innerWidth / 2;
        all.forEach(slide => {
          const r = slide.getBoundingClientRect();
          const sc = r.left + r.width / 2;
          const dist = (sc - center) / window.innerWidth;
          const rot = dist * 12;
          const scale = 1 - Math.abs(dist) * 0.1;
          gsap.set(slide, {
            rotation: rot,
            scale: Math.max(scale, 0.88)
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
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.querySelectorAll('.game-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.game-card.flipped').forEach(c => {
          if (c !== card) c.classList.remove('flipped');
        });
        card.classList.toggle('flipped');
      });
    });
  }

})();
