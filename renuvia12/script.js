/* ═══════════════════════════════════════════════
   RENUVIA — SHARED JAVASCRIPT
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── PAGE ENTER ANIMATION ── */
  const overlay = document.getElementById('page-transition');
  if (overlay) {
    overlay.classList.add('in');
    requestAnimationFrame(() => {
      setTimeout(() => overlay.classList.remove('in'), 50);
    });
  }

  /* ── PAGE TRANSITION LINKS ── */
  document.querySelectorAll('a[data-page]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const ov = document.getElementById('page-transition');
      if (ov) {
        ov.classList.add('out');
        setTimeout(() => { window.location.href = href; }, 480);
      } else {
        window.location.href = href;
      }
    });
  });

  /* ── STICKY NAV ── */
  const nav = document.getElementById('navbar');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── MOBILE MENU ── */
  const ham = document.getElementById('ham');
  const mobMenu = document.getElementById('mob-menu');
  if (ham && mobMenu) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      mobMenu.classList.toggle('open');
      document.body.style.overflow = mobMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        ham.classList.remove('open');
        mobMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── ACTIVE NAV LINK ── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  /* ── CUSTOM CURSOR (desktop only) ── */
  if (window.matchMedia('(pointer: fine)').matches) {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (dot && ring) {
      let mx = 0, my = 0, rx = 0, ry = 0;
      document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
      const animate = () => {
        dot.style.left = mx + 'px'; dot.style.top = my + 'px';
        rx += (mx - rx) * .12; ry += (my - ry) * .12;
        ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
        requestAnimationFrame(animate);
      };
      animate();
      document.querySelectorAll('a, button, .service-card, .step-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
          dot.style.width = '14px'; dot.style.height = '14px';
          ring.style.width = '56px'; ring.style.height = '56px';
          ring.style.borderColor = 'rgba(200,242,64,.7)';
        });
        el.addEventListener('mouseleave', () => {
          dot.style.width = ''; dot.style.height = '';
          ring.style.width = ''; ring.style.height = '';
          ring.style.borderColor = '';
        });
      });
    }
  }

  /* ── NUMBER COUNTER ANIMATION ── */
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const io2 = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        let start = 0; const dur = 1800;
        const startTime = performance.now();
        const step = (now) => {
          const p = Math.min((now - startTime) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          const val = Math.round(ease * target * 10) / 10;
          el.textContent = prefix + (Number.isInteger(target) ? Math.round(val) : val) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io2.unobserve(el);
      }
    }, { threshold: .5 });
    io2.observe(el);
  });

});