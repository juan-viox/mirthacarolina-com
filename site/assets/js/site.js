/* =============================================================================
   MIRTHA CAROLINA · SHARED SITE SCRIPT
   - Bilingual toggle (EN/ES)
   - Nav scroll state + mobile overlay + smooth scroll + current-page highlight
   - Hero canvas engine (guarded — only runs if #hero-canvas exists)
   - Hover parallax (.property-card / [data-parallax])
   - Marquee velocity
   - Magnetic CTA (guarded)
   - Neighborhood crossfade (guarded)
   - IntersectionObserver reveals
   - Cross-page hash smooth-scroll on load
   ========================================================================== */

(function () {
  'use strict';

  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------------------------------------------------------------------------
  // BILINGUAL TOGGLE
  // ---------------------------------------------------------------------------
  function setLocale(loc) {
    document.documentElement.lang = loc;
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var val = el.dataset[loc];
      if (val !== undefined && val !== null) el.textContent = val;
    });
    try { localStorage.setItem('mc-locale', loc); } catch (e) {}
    document.querySelectorAll('.lang-pill').forEach(function (p) {
      p.classList.toggle('active', p.dataset.lang === loc);
    });
  }
  // expose globally so partials.js can re-run after injecting nav/footer
  window.MC_setLocale = setLocale;
  window.MC_getLocale = function () {
    try { return localStorage.getItem('mc-locale') || (document.documentElement.lang || 'en'); }
    catch (e) { return document.documentElement.lang || 'en'; }
  };

  function initLocale() {
    var loc;
    try { loc = localStorage.getItem('mc-locale'); } catch (e) {}
    if (!loc) {
      loc = (navigator.language && navigator.language.toLowerCase().startsWith('es')) ? 'es' : 'en';
    }
    setLocale(loc);
  }

  document.addEventListener('click', function (e) {
    var pill = e.target.closest('.lang-pill');
    if (pill && pill.dataset.lang) {
      setLocale(pill.dataset.lang);
    }
  });

  // ---------------------------------------------------------------------------
  // NAV: scrolled state, mobile overlay, smooth scroll, current-page highlight
  // ---------------------------------------------------------------------------
  function initNav() {
    var nav = document.getElementById('nav');
    if (nav) {
      var updateNav = function () {
        if (window.scrollY > 80) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
      };
      updateNav();
      window.addEventListener('scroll', updateNav, { passive: true });
    }

    var burger = document.getElementById('navBurger');
    var overlay = document.getElementById('navOverlay');
    // Idempotent: initNav() runs on boot, on mc:partials-ready, and on every
    // SPA-lite page swap. Without this guard each call stacks another click
    // handler, causing the menu to toggle open→close instantly (appears
    // broken on mobile after the first navigation).
    if (burger && overlay && !burger.dataset.mcBurgerBound) {
      burger.dataset.mcBurgerBound = '1';
      burger.addEventListener('click', function () {
        var isOpen = overlay.classList.toggle('open');
        burger.classList.toggle('open', isOpen);
        burger.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });
      overlay.addEventListener('click', function (e) {
        // Close on link click; ignore lang-toggle button clicks
        var t = e.target.closest('a');
        if (t) {
          overlay.classList.remove('open');
          burger.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    }

    // Current-page highlight
    var path = window.location.pathname.replace(/index\.html$/, '').replace(/\/+$/, '/');
    if (path === '') path = '/';
    document.querySelectorAll('.nav-links a, .nav-overlay a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (!href || href.charAt(0) === '#') return;
      // Normalize href path
      var hrefPath = href.replace(/index\.html$/, '').replace(/\/+$/, '/');
      if (hrefPath === path) a.classList.add('active');
      else if (hrefPath !== '/' && path.indexOf(hrefPath) === 0) a.classList.add('active');
    });

    // Smooth scroll (focus fix) for same-page hash links
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id && id.length > 1 && document.querySelector(id)) {
          e.preventDefault();
          document.querySelector(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ---------------------------------------------------------------------------
  // HERO CANVAS FRAME SEQUENCE (only runs on pages with #hero-canvas)
  // ---------------------------------------------------------------------------
  function initHero() {
    var canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var FRAME_COUNT = 121;
    var FRAME_PAD   = 4;
    var framePath = function (i) {
      var n = String(i).padStart(FRAME_PAD, '0');
      return '/assets/frames/frame_' + n + '.jpg';
    };
    var images = [];
    var framesLoaded = 0;
    var frameState = { i: 1 };

    function sizeCanvas() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = canvas.clientWidth  * dpr;
      canvas.height = canvas.clientHeight * dpr;
    }

    function drawFrame(i) {
      var idx = Math.max(1, Math.min(FRAME_COUNT, Math.round(i)));
      var img = images[idx - 1];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      var cw = canvas.width, ch = canvas.height;
      ctx.clearRect(0, 0, cw, ch);
      var iw = img.naturalWidth, ih = img.naturalHeight;
      var scale = Math.max(cw / iw, ch / ih);
      var w = iw * scale, h = ih * scale;
      var x = (cw - w) / 2, y = (ch - h) / 2;
      ctx.drawImage(img, x, y, w, h);
    }

    sizeCanvas();
    var first = new Image();
    first.onload = function () {
      images[0] = first;
      drawFrame(1);
      preloadRest();
    };
    first.src = framePath(1);

    function preloadRest() {
      for (var i = 2; i <= FRAME_COUNT; i++) {
        (function (n) {
          var im = new Image();
          im.onload = function () { images[n - 1] = im; framesLoaded++; };
          im.onerror = function () { framesLoaded++; };
          im.src = framePath(n);
        })(i);
      }
    }

    window.addEventListener('resize', function () {
      sizeCanvas();
      drawFrame(frameState.i);
    });

    if (window.gsap && window.ScrollTrigger && !prefersReduce) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(frameState, {
        i: FRAME_COUNT,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.4
        },
        onUpdate: function () { drawFrame(frameState.i); }
      });
    }

    // Hero safety check — hide canvas if it remains empty
    setTimeout(function () {
      if (ctx) {
        try {
          var d = ctx.getImageData(Math.floor(canvas.width/2), Math.floor(canvas.height/2), 1, 1).data;
          if (d[3] === 0) canvas.style.display = 'none';
        } catch (e) {}
      }
    }, 2500);
  }

  // ---------------------------------------------------------------------------
  // HERO ENTRANCE ANIMATIONS
  // ---------------------------------------------------------------------------
  function initHeroEntrance() {
    if (!window.gsap || prefersReduce) return;
    if (!document.querySelector('.hero-headline')) return;
    gsap.from('.hero-eyebrow', { autoAlpha: 0, y: 24, duration: 1.1, delay: 0.3, ease: 'power3.out' });
    gsap.from('.hero-headline', { autoAlpha: 0, y: 44, duration: 1.4, delay: 0.5, ease: 'power3.out' });
    gsap.from('.hero-subline',  { autoAlpha: 0, y: 28, duration: 1.2, delay: 0.85, ease: 'power3.out' });
    gsap.from('.hero-ctas .cta', { autoAlpha: 0, y: 20, duration: 1, delay: 1.05, stagger: 0.12, ease: 'power3.out' });
    gsap.from('.hero-scroll-cue', { autoAlpha: 0, duration: 1, delay: 1.4 });
  }

  // ---------------------------------------------------------------------------
  // REVEAL ON SCROLL
  // ---------------------------------------------------------------------------
  function initReveals() {
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      reveals.forEach(function (r) { io.observe(r); });
    } else {
      reveals.forEach(function (r) { r.classList.add('in'); });
    }
  }

  // ---------------------------------------------------------------------------
  // HOVER PARALLAX
  // ---------------------------------------------------------------------------
  function initParallax() {
    if (prefersReduce) return;
    document.querySelectorAll('[data-parallax]').forEach(function (card) {
      var layers = card.querySelectorAll('.layer');
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        layers.forEach(function (l) {
          var depth = parseFloat(l.dataset.depth || 0.25);
          var tx = x * depth * 40;
          var ty = y * depth * 40;
          l.style.transform = 'translate3d(' + (-tx) + 'px,' + (-ty) + 'px,0)';
        });
      });
      card.addEventListener('mouseleave', function () {
        layers.forEach(function (l) { l.style.transform = 'translate3d(0,0,0)'; });
      });
    });
  }

  // ---------------------------------------------------------------------------
  // NEIGHBORHOOD CROSSFADE
  // ---------------------------------------------------------------------------
  function initNeighborhoods() {
    var entries = document.querySelectorAll('.nbh-entry');
    var layers  = document.querySelectorAll('.nbh-layer');
    var badge   = document.getElementById('nbhBadge');
    if (!entries.length || !layers.length) return;

    var labels = {
      holmdel: { en: 'NOW FILMING · HOLMDEL',  es: 'RODANDO · HOLMDEL'  },
      redbank: { en: 'NOW FILMING · RED BANK', es: 'RODANDO · RED BANK' },
      rumson:  { en: 'NOW FILMING · RUMSON',   es: 'RODANDO · RUMSON'   },
      pier:    { en: 'NOW FILMING · PIER VILLAGE', es: 'RODANDO · PIER VILLAGE' }
    };

    function activate(key) {
      layers.forEach(function (l) { l.classList.toggle('active', l.dataset.nbh === key); });
      entries.forEach(function (ent) { ent.classList.toggle('active', ent.dataset.nbh === key); });
      if (badge && labels[key]) {
        var loc = document.documentElement.lang === 'es' ? 'es' : 'en';
        badge.textContent = labels[key][loc];
        badge.dataset.en = labels[key].en;
        badge.dataset.es = labels[key].es;
      }
    }

    if ('IntersectionObserver' in window) {
      var nbhIO = new IntersectionObserver(function (obs) {
        var best = null, bestRatio = 0;
        obs.forEach(function (o) {
          if (o.intersectionRatio > bestRatio) { best = o; bestRatio = o.intersectionRatio; }
        });
        if (best && best.target && best.isIntersecting) {
          activate(best.target.dataset.nbh);
        }
      }, { threshold: [0.35, 0.6, 0.85], rootMargin: '-20% 0px -20% 0px' });
      entries.forEach(function (e) { nbhIO.observe(e); });
    }
  }

  // ---------------------------------------------------------------------------
  // MAGNETIC CTA
  // ---------------------------------------------------------------------------
  function initMagneticCTA() {
    if (prefersReduce) return;
    var btn = document.getElementById('magneticCTA');
    if (!btn) return;
    var radius = 80;
    window.addEventListener('mousemove', function (e) {
      var r = btn.getBoundingClientRect();
      var cx = r.left + r.width / 2;
      var cy = r.top  + r.height / 2;
      var dx = e.clientX - cx;
      var dy = e.clientY - cy;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius * 2) {
        var strength = Math.max(0, 1 - dist / (radius * 2));
        btn.style.transform = 'translate(' + (dx * strength * 0.35) + 'px,' + (dy * strength * 0.35) + 'px)';
      } else {
        btn.style.transform = 'translate(0,0)';
      }
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform = 'translate(0,0)';
    });
  }

  // ---------------------------------------------------------------------------
  // MARQUEE VELOCITY
  // ---------------------------------------------------------------------------
  function initMarqueeVelocity() {
    if (prefersReduce) return;
    var lastY = window.scrollY;
    var lastT = performance.now();
    var baseDurPlaces = 48;
    var baseDurKeys   = 32;
    var baseDurStories = 60;
    var places = document.querySelector('.marquee-row.places');
    var keys   = document.querySelector('.marquee-row.keywords');
    var stories = document.getElementById('storiesMarquee');
    if (!places && !keys && !stories) return;

    var rafPending = false;
    function onScroll() {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        var t = performance.now();
        var dy = Math.abs(y - lastY);
        var dt = Math.max(1, t - lastT);
        var v  = dy / dt;
        var factor = Math.min(3, 1 + v * 6);
        if (places)  places.style.animationDuration  = (baseDurPlaces / factor).toFixed(2) + 's';
        if (keys)    keys.style.animationDuration    = (baseDurKeys   / factor).toFixed(2) + 's';
        if (stories) stories.style.animationDuration = (baseDurStories / factor).toFixed(2) + 's';
        lastY = y; lastT = t;
        rafPending = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---------------------------------------------------------------------------
  // CROSS-PAGE HASH SCROLL — on load, if URL has #hash, smooth-scroll to it
  // ---------------------------------------------------------------------------
  function initHashScroll() {
    var hash = window.location.hash;
    if (!hash || hash.length < 2) return;
    // Let layout settle (and partials inject) before scrolling
    setTimeout(function () {
      var el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 250);
  }

  // ---------------------------------------------------------------------------
  // LISTING PARAM — auto-populate ?listing=... into hidden field on contact page
  // ---------------------------------------------------------------------------
  function initListingParam() {
    var params = new URLSearchParams(window.location.search);
    var listing = params.get('listing');
    if (!listing) return;
    var field = document.getElementById('f-listing');
    if (field) field.value = listing;
  }

  // ---------------------------------------------------------------------------
  // BOOT
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // EDITORIAL SPREAD PARALLAX · gentle vertical drift on .ed-img elements
  // (used on /listings/30-melrose/ Lofts editorial). Idempotent — safe to
  // re-run after SPA-lite swaps.
  // ---------------------------------------------------------------------------
  function initEditorialParallax() {
    if (prefersReduce) return;
    var spreads = document.querySelectorAll('.ed-spread');
    if (!spreads.length) return;

    function update() {
      var vh = window.innerHeight || 800;
      spreads.forEach(function (s) {
        var img = s.querySelector('.ed-img');
        if (!img) return;
        var speed = parseFloat(s.getAttribute('data-parallax-speed') || '0.05');
        var rect = s.getBoundingClientRect();
        // Distance from viewport center (px). Negative = scrolled past.
        var dist = (rect.top + rect.height / 2) - vh / 2;
        // Translate the ed-img inversely so the image appears to drift slowly.
        var ty = -dist * speed;
        img.style.transform = 'translate3d(0, ' + ty.toFixed(1) + 'px, 0)';
      });
    }

    var ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(function () { update(); ticking = false; });
        ticking = true;
      }
    }

    // Cleanup previous listener if re-running (SPA nav)
    if (window.__mcEdScroll) {
      window.removeEventListener('scroll', window.__mcEdScroll);
      window.removeEventListener('resize', window.__mcEdScroll);
    }
    window.__mcEdScroll = onScroll;
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  function boot() {
    initLocale();
    initNav();
    initHero();
    initHeroEntrance();
    initReveals();
    initParallax();
    initNeighborhoods();
    initMagneticCTA();
    initMarqueeVelocity();
    initHashScroll();
    initListingParam();
    initEditorialParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // When partials.js finishes injecting the nav/footer, re-wire nav behaviors
  document.addEventListener('mc:partials-ready', function () {
    initNav();
  });

  // Expose for SPA-lite re-init after page swaps (see spa-nav.js)
  window.MC_boot = boot;
  window.MC_initNav = initNav;
})();
