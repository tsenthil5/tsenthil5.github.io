/* ═══════════════════════════════════════════════════════
   PORTFOLIO SCRIPT — Senthil Thanneermalai
═══════════════════════════════════════════════════════ */

/* ─── CUSTOM CURSOR ─── */
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
  let ringX = 0, ringY = 0;
  let curX = 0, curY = 0;

  document.addEventListener('mousemove', e => {
    curX = e.clientX;
    curY = e.clientY;
    dot.style.left = curX + 'px';
    dot.style.top  = curY + 'px';
  });

  // Ring follows with lag
  (function animateRing() {
    ringX += (curX - ringX) * 0.14;
    ringY += (curY - ringY) * 0.14;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  // Hover state
  const hoverEls = document.querySelectorAll('a, button, .btn, .proj-card, .exp-card, .stat-box, .social-btn');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hovered'); ring.classList.add('hovered'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hovered'); ring.classList.remove('hovered'); });
  });
}

/* ─── NAV SCROLL ─── */
const nav = document.getElementById('nav');
const navLinks = document.getElementById('navLinks');
const burger = document.getElementById('burger');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close menu on link click
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ─── ACTIVE NAV LINK ─── */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link');

new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navAnchors.forEach(a => {
        const matches = a.getAttribute('href') === `#${id}`;
        a.classList.toggle('active', matches);
      });
    }
  });
}, { threshold: 0.45 }).observe
  ? sections.forEach(s =>
      new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            navAnchors.forEach(a =>
              a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`)
            );
          }
        });
      }, { threshold: 0.45 }).observe(s)
    )
  : null;

/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.reveal, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Stagger children in the same group
      const parent = entry.target.closest('.stats-row, .skills-layout, .exp-list, .projects-grid, .edu-cards, .hero-left, .about-layout');
      if (parent) {
        const siblings = [...parent.querySelectorAll('.reveal, .reveal-right')];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = (idx * 0.06) + 's';
      }
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ─── HERO IMMEDIATE REVEALS ─── */
document.querySelectorAll('.hero .reveal, .hero .reveal-right').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.1 + 0.15) + 's';
  setTimeout(() => el.classList.add('visible'), 50);
});

/* ─── TERMINAL TYPING ANIMATION ─── */
(function initTerminal() {
  const lines = document.querySelectorAll('.t-block .t-json, .t-output div');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateX(-6px)';
    line.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateX(0)';
    }, 600 + i * 110);
  });
})();

/* ─── STAT COUNTER ─── */
function runCounter(el) {
  if (el._done) return;
  el._done = true;
  const raw = el.getAttribute('data-count');
  if (!raw) return;
  const target  = parseFloat(raw);
  const suffix  = el.getAttribute('data-suffix') || '';
  const decimal = raw.includes('.');
  let cur = 0;
  const step = target / 55;
  const tick = () => {
    cur = Math.min(cur + step, target);
    el.textContent = (decimal ? cur.toFixed(2) : Math.floor(cur)) + suffix;
    if (cur < target) requestAnimationFrame(tick);
  };
  tick();
}

new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const numEl = e.target.querySelector('.stat-box-num[data-count]');
      if (numEl) runCounter(numEl);
    }
  });
}, { threshold: 0.6 }).observe
  ? document.querySelectorAll('.stat-box').forEach(box =>
      new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { const n = e.target.querySelector('.stat-box-num[data-count]'); if(n) runCounter(n); } });
      }, { threshold: 0.6 }).observe(box)
    )
  : null;

/* ─── SMOOTH HOVER FOR EXP CARDS (left border accent) ─── */
document.querySelectorAll('.exp-card').forEach(card => {
  const color = card.getAttribute('data-color') || '#1D4ED8';
  card.addEventListener('mouseenter', () => {
    card.style.borderColor = color + '55';
    card.style.boxShadow   = `0 8px 32px ${color}1A`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.borderColor = '';
    card.style.boxShadow   = '';
  });
});

/* ─── TILT ON PROJECT CARDS ─── */
if (window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.proj-card, .project-featured').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - 0.5) * 5;
      const y = ((e.clientY - r.top)  / r.height - 0.5) * -3;
      card.style.transform = `translateY(-4px) rotateY(${x}deg) rotateX(${y}deg)`;
      card.style.transition = 'box-shadow 0.25s, border-color 0.25s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'all 0.4s cubic-bezier(0.22,1,0.36,1)';
    });
  });
}

console.log('%c 👨‍💻 Senthil Thanneermalai ', 'background:#1D4ED8;color:#fff;font-size:18px;font-weight:800;padding:8px 16px;border-radius:8px;');
console.log('%c tsenthil5@gmail.com | github.com/tsenthil5', 'color:#2563EB;font-size:12px;');
