(function () {
  'use strict';

  var HOURS = [
    { day: 'Sunday', open: 6 * 60 + 30, close: 21 * 60 },
    { day: 'Monday', open: 7 * 60 + 30, close: 21 * 60 },
    { day: 'Tuesday', open: 9 * 60 + 30, close: 21 * 60 },
    { day: 'Wednesday', open: 7 * 60 + 30, close: 21 * 60 },
    { day: 'Thursday', open: 7 * 60 + 30, close: 21 * 60 },
    { day: 'Friday', open: 7 * 60, close: 21 * 60 },
    { day: 'Saturday', open: 7 * 60 + 30, close: 21 * 60 },
  ];

  var DAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  function prefersReducedMotion() {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  function toTimeLabel(value) {
    var h24 = Math.floor(value / 60);
    var min = value % 60;
    var suffix = h24 >= 12 ? 'pm' : 'am';
    var h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    return h12 + ':' + String(min).padStart(2, '0') + ' ' + suffix;
  }

  function getOpenState(now) {
    var date = now || new Date();
    var parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(date);

    var weekdayPart = parts.find(function (p) { return p.type === 'weekday'; });
    var hourPart = parts.find(function (p) { return p.type === 'hour'; });
    var minutePart = parts.find(function (p) { return p.type === 'minute'; });

    var weekday = weekdayPart ? weekdayPart.value : 'Mon';
    var hh = Number(hourPart ? hourPart.value : '0');
    var mm = Number(minutePart ? minutePart.value : '0');
    var todayIndex = Object.prototype.hasOwnProperty.call(DAY_INDEX, weekday) ? DAY_INDEX[weekday] : 1;
    var minutes = hh * 60 + mm;
    var today = HOURS[todayIndex];
    var isOpen = minutes >= today.open && minutes < today.close;

    return {
      isOpen: isOpen,
      todayIndex: todayIndex,
      label: isOpen
        ? 'Open now · closes ' + toTimeLabel(today.close)
        : 'Closed · opens ' + toTimeLabel(today.open),
    };
  }

  function updateOpenStatus() {
    var state = getOpenState();
    var heroPulse = document.getElementById('hero-status-pulse');
    var heroText = document.getElementById('hero-status-text');
    var visitStatus = document.getElementById('visit-status');
    var visitText = document.getElementById('visit-status-text');
    var rows = document.querySelectorAll('.visit__hours tbody tr');

    if (heroPulse) {
      heroPulse.classList.toggle('is-live', state.isOpen);
    }
    if (heroText) {
      heroText.textContent = state.label;
    }
    if (visitStatus) {
      visitStatus.classList.toggle('is-live', state.isOpen);
    }
    if (visitText) {
      visitText.textContent = state.label;
    }

    rows.forEach(function (row) {
      var dayAttr = Number(row.getAttribute('data-day'));
      row.classList.toggle('is-today', dayAttr === state.todayIndex);
    });
  }

  function splitWords(el) {
    if (!el) return [];
    var source = el.dataset.split || el.textContent || '';
    el.textContent = '';
    var words = source.trim().replace(/\s+/g, ' ').split(' ');
    var out = [];
    words.forEach(function (word, i) {
      var mask = document.createElement('span');
      mask.className = 'split-word';
      var inner = document.createElement('span');
      inner.className = 'split-word__in';
      inner.textContent = word;
      mask.appendChild(inner);
      el.appendChild(mask);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
      out.push(inner);
    });
    return out;
  }

  function initStaticDetails() {
    var yearEl = document.getElementById('footer-year');
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
    updateOpenStatus();
    window.setInterval(updateOpenStatus, 60000);
  }

  function init() {
    initStaticDetails();

    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;
    var Lenis = window.Lenis;
    var reduced = prefersReducedMotion();

    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    /* ---------- Lenis smooth scroll ---------- */
    var lenis = null;
    if (!reduced && typeof Lenis === 'function' && gsap && ScrollTrigger) {
      lenis = new Lenis({
        lerp: 0.085,
        wheelMultiplier: 1.05,
        touchMultiplier: 1.4,
      });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    /* ---------- Navigation + Mobile Drawer ---------- */
    var nav = document.getElementById('nav');
    var navBurger = document.getElementById('nav-burger');
    var menuPanel = document.getElementById('menu-panel');
    var navProgressBar = document.getElementById('nav-progress-bar');
    var menuOpen = false;

    function setMenuOpen(next) {
      menuOpen = Boolean(next);
      if (nav) nav.classList.toggle('is-open', menuOpen);
      if (menuPanel) {
        menuPanel.classList.toggle('is-open', menuOpen);
        menuPanel.setAttribute('aria-hidden', String(!menuOpen));
      }
      if (navBurger) {
        navBurger.setAttribute('aria-expanded', String(menuOpen));
        navBurger.setAttribute('aria-label', menuOpen ? 'Close menu' : 'Open menu');
      }
      document.body.style.overflow = menuOpen ? 'hidden' : '';
      if (lenis) {
        if (menuOpen) lenis.stop();
        else lenis.start();
      }
    }

    if (navBurger) {
      navBurger.addEventListener('click', function () {
        setMenuOpen(!menuOpen);
      });
    }

    if (menuPanel) {
      menuPanel.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function () {
          setMenuOpen(false);
        });
      });
    }

    function onNavScroll() {
      if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 40);
      if (navProgressBar) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        navProgressBar.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
      }
    }
    onNavScroll();
    window.addEventListener('scroll', onNavScroll, { passive: true });

    /* ---------- Smooth Anchor Links ---------- */
    document.addEventListener('click', function (event) {
      var targetEl = event.target;
      var anchor = targetEl && targetEl.closest ? targetEl.closest('a[href^="#"]') : null;
      if (!anchor) return;
      var hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      var target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: -70, duration: 1.4 });
      } else {
        target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      }
    });

    /* ---------- Price Menu Tabs ---------- */
    var tabButtons = document.querySelectorAll('.menu__tab[data-tab]');
    var panelFemale = document.getElementById('menu-panel-female');
    var panelMale = document.getElementById('menu-panel-male');

    function switchTab(nextTab) {
      var isFemale = nextTab === 'female';
      tabButtons.forEach(function (btn) {
        var active = btn.getAttribute('data-tab') === nextTab;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', String(active));
      });
      if (panelFemale) panelFemale.hidden = !isFemale;
      if (panelMale) panelMale.hidden = isFemale;

      var activePanel = isFemale ? panelFemale : panelMale;
      if (activePanel && gsap && !reduced) {
        var rows = activePanel.querySelectorAll('.menu-group');
        gsap.fromTo(
          rows,
          { y: 26, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.04, ease: 'power2.out', overwrite: true }
        );
      }
      if (ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    }

    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tabName = btn.getAttribute('data-tab');
        if (tabName) switchTab(tabName);
      });
    });

    /* ---------- Hero Reveal + Preloader ---------- */
    var preloader = document.getElementById('preloader');
    var preloaderBar = document.getElementById('preloader-bar');
    var preloaderCount = document.getElementById('preloader-count');

    function revealHero() {
      var heroSection = document.getElementById('top');
      if (!gsap || !heroSection) return;

      if (reduced) {
        gsap.set(['.hero__line', '.hero__fade'], { yPercent: 0, autoAlpha: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        '.hero__img',
        { scale: 1.22, filter: 'brightness(0.5)' },
        { scale: 1.02, filter: 'brightness(1)', duration: 2.6, ease: 'power3.out' }
      );

      gsap.set('.hero__line', { yPercent: 112 });
      var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.to('.hero__line', { yPercent: 0, duration: 1.5, stagger: 0.12 }, 0.1)
        .fromTo('.hero__fade', { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2, stagger: 0.09 }, 0.55);

      if (ScrollTrigger) {
        gsap.to('.hero__media', {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: { trigger: heroSection, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to('.hero__copy', {
          yPercent: -14,
          autoAlpha: 0.15,
          ease: 'none',
          scrollTrigger: { trigger: heroSection, start: 'top top', end: 'bottom top', scrub: true },
        });
      }
    }

    if (!gsap || reduced) {
      if (preloader) preloader.style.display = 'none';
      revealHero();
    } else {
      var counterState = { n: 0 };
      var preTl = gsap.timeline({ onComplete: revealHero });
      preTl
        .from('.preloader__mark', { yPercent: 18, autoAlpha: 0, duration: 1, ease: 'expo.out' })
        .to(
          counterState,
          {
            n: 100,
            duration: 1.5,
            ease: 'power2.inOut',
            onUpdate: function () {
              if (preloaderCount) {
                preloaderCount.textContent = String(Math.round(counterState.n)).padStart(3, '0');
              }
            },
          },
          0.15
        )
        .to(preloaderBar, { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0.15)
        .to('.preloader__inner', { autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, '+=0.1')
        .to(preloader, { yPercent: -100, duration: 1.15, ease: 'expo.inOut' }, '-=0.1')
        .set(preloader, { display: 'none' });
    }

    if (!gsap) return;

    /* ---------- Custom Cursor ---------- */
    var dotEl = document.getElementById('cursor-dot');
    var ringEl = document.getElementById('cursor-ring');
    if (
      dotEl &&
      ringEl &&
      window.matchMedia &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      gsap.set([dotEl, ringEl], { xPercent: -50, yPercent: -50, autoAlpha: 0 });
      var dotX = gsap.quickTo(dotEl, 'x', { duration: 0.12, ease: 'power3' });
      var dotY = gsap.quickTo(dotEl, 'y', { duration: 0.12, ease: 'power3' });
      var ringX = gsap.quickTo(ringEl, 'x', { duration: 0.5, ease: 'power3' });
      var ringY = gsap.quickTo(ringEl, 'y', { duration: 0.5, ease: 'power3' });

      window.addEventListener('mousemove', function (e) {
        gsap.to([dotEl, ringEl], { autoAlpha: 1, duration: 0.3, overwrite: 'auto' });
        dotX(e.clientX);
        dotY(e.clientY);
        ringX(e.clientX);
        ringY(e.clientY);
      });

      window.addEventListener('mouseover', function (e) {
        var target = e.target && e.target.closest ? e.target.closest('a, button, [data-cursor]') : null;
        gsap.to(ringEl, {
          scale: target ? 2.1 : 1,
          borderColor: target ? 'rgba(226,193,133,0.9)' : 'rgba(244,239,230,0.35)',
          duration: 0.35,
          ease: 'power3',
        });
        gsap.to(dotEl, { scale: target ? 0.4 : 1, duration: 0.35 });
      });

      document.addEventListener('mouseleave', function () {
        gsap.to([dotEl, ringEl], { autoAlpha: 0, duration: 0.25 });
      });
    }

    if (reduced || !ScrollTrigger) return;

    /* ---------- Marquee ---------- */
    var marqueeTrack = document.getElementById('marquee-track');
    if (marqueeTrack) {
      gsap.set(marqueeTrack, { xPercent: 0 });
      var marqueeTween = gsap.to(marqueeTrack, {
        xPercent: -50,
        duration: 38,
        ease: 'none',
        repeat: -1,
      });

      var lastScroll = window.scrollY;
      var marqueeTimer = 0;
      window.addEventListener(
        'scroll',
        function () {
          var now = window.scrollY;
          var delta = now - lastScroll;
          lastScroll = now;
          var boost = gsap.utils.clamp(1, 5, 1 + Math.abs(delta) * 0.06);
          marqueeTween.timeScale(delta === 0 ? 1 : delta > 0 ? boost : -boost);
          window.clearTimeout(marqueeTimer);
          marqueeTimer = window.setTimeout(function () {
            marqueeTween.timeScale(1);
          }, 260);
        },
        { passive: true }
      );
    }

    /* ---------- About ---------- */
    var aboutLead = document.querySelector('.about__lead');
    if (aboutLead) {
      var words = splitWords(aboutLead);
      gsap.fromTo(
        words,
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about__lead',
            start: 'top 82%',
            end: 'bottom 55%',
            scrub: 0.6,
          },
        }
      );
    }

    gsap.from('.about__frame', {
      clipPath: 'inset(18% 18% 18% 18%)',
      duration: 1.6,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.about__frame', start: 'top 85%' },
    });

    gsap.to('.about__img', {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: { trigger: '.about__visual', start: 'top bottom', end: 'bottom top', scrub: true },
    });

    gsap.utils.toArray('.stat__value').forEach(function (el) {
      var target = Number(el.dataset.value || 0);
      var decimals = Number(el.dataset.decimals || 0);
      var counter = { n: 0 };
      gsap.to(counter, {
        n: target,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        onUpdate: function () {
          el.textContent = counter.n.toFixed(decimals) + (el.dataset.suffix || '');
        },
      });
    });

    gsap.utils.toArray('[data-rise]').forEach(function (el) {
      gsap.from(el, {
        y: 40,
        autoAlpha: 0,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
      });
    });

    /* ---------- Services Rail ---------- */
    var servicesSection = document.getElementById('services');
    var servicesPin = document.querySelector('.services__pin');
    var railTrack = document.querySelector('.rail');

    if (servicesSection) {
      gsap.from('.service-card', {
        y: 60,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: servicesSection, start: 'top 70%' },
      });

      var servicesMM = gsap.matchMedia();
      servicesMM.add('(min-width: 900px)', function () {
        if (!railTrack || !servicesPin) return;
        var getDistance = function () {
          return Math.max(0, railTrack.scrollWidth - window.innerWidth);
        };

        var railTween = gsap.to(railTrack, {
          x: function () {
            return -getDistance();
          },
          ease: 'none',
          scrollTrigger: {
            trigger: servicesSection,
            start: 'top top',
            end: function () {
              return '+=' + (getDistance() + window.innerHeight * 0.35);
            },
            pin: servicesPin,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.to('.rail__progress-bar', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: servicesSection,
            start: 'top top',
            end: function () {
              return '+=' + (getDistance() + window.innerHeight * 0.35);
            },
            scrub: true,
          },
        });

        return function () {
          railTween.kill();
        };
      });
    }

    /* ---------- Bridal ---------- */
    var bridalSection = document.getElementById('bridal');
    if (bridalSection) {
      var bridalMM = gsap.matchMedia();
      bridalMM.add('(min-width: 900px)', function () {
        var tl = gsap.timeline({
          scrollTrigger: {
            trigger: bridalSection,
            start: 'top top',
            end: '+=140%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });
        tl.fromTo('.bridal__img', { scale: 1.34 }, { scale: 1, ease: 'none' }).fromTo(
          '.bridal__panel > *',
          { y: 46, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
          0.05
        );
      });

      bridalMM.add('(max-width: 899px)', function () {
        gsap.from('.bridal__panel > *', {
          y: 36,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.07,
          ease: 'expo.out',
          scrollTrigger: { trigger: bridalSection, start: 'top 65%' },
        });
      });
    }

    /* ---------- Menu Header Reveal ---------- */
    var menuSection = document.getElementById('menu');
    if (menuSection) {
      gsap.from('.menu__head > *', {
        y: 34,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: menuSection, start: 'top 78%' },
      });
    }

    /* ---------- Reviews ---------- */
    var rowA = document.getElementById('review-row-a');
    var rowB = document.getElementById('review-row-b');
    var bandTrack = document.getElementById('reviews-band-track');

    if (rowA) {
      gsap.to(rowA, { xPercent: -50, duration: 74, ease: 'none', repeat: -1 });
    }
    if (rowB) {
      gsap.set(rowB, { xPercent: -50 });
      gsap.to(rowB, { xPercent: 0, duration: 88, ease: 'none', repeat: -1 });
    }
    if (bandTrack) {
      gsap.fromTo(
        bandTrack,
        { xPercent: 0 },
        {
          xPercent: -18,
          ease: 'none',
          scrollTrigger: { trigger: '.reviews__band', start: 'top bottom', end: 'bottom top', scrub: 1 },
        }
      );
    }
    gsap.from('.reviews__head > *', {
      y: 40,
      autoAlpha: 0,
      duration: 1.1,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.reviews__head', start: 'top 85%' },
    });

    /* ---------- Gallery ---------- */
    gsap.utils.toArray('.gallery__item').forEach(function (item) {
      var depth = Number(item.dataset.depth || 0);
      if (!depth) return;
      gsap.fromTo(
        item,
        { yPercent: depth },
        {
          yPercent: -depth,
          ease: 'none',
          scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    });
    gsap.from('.gallery__item', {
      autoAlpha: 0,
      y: 50,
      duration: 1.2,
      stagger: 0.09,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.gallery__grid', start: 'top 82%' },
    });

    /* ---------- Visit ---------- */
    gsap.from('.visit__panel > *', {
      y: 36,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.07,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.visit__panel', start: 'top 82%' },
    });
    gsap.from('.visit__map', {
      clipPath: 'inset(0 0 100% 0)',
      duration: 1.5,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.visit__map', start: 'top 85%' },
    });

    /* ---------- Refresh ScrollTrigger after fonts/images settle ---------- */
    var refresh = function () {
      ScrollTrigger.refresh();
    };
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh).catch(function () {});
    }
    window.addEventListener('load', refresh);
    window.setTimeout(refresh, 1200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
