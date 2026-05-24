/* ═══════════════════════════════════════════════
   PORTFOLIO SCRIPT — Senthil Thanneermalai
═══════════════════════════════════════════════ */

/* ─── CURSOR GLOW ─── */
const glow = document.getElementById('cursorGlow');
if (glow && window.innerWidth > 480) {
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

/* ─── NAV SCROLL EFFECT ─── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─── MOBILE NAV TOGGLE ─── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

/* ─── TYPEWRITER EFFECT ─── */
const phrases = [
  'scalable web apps.',
  'AI/ML systems.',
  'cloud infrastructure.',
  'real-time pipelines.',
  'things that matter.',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function typeLoop() {
  const phrase = phrases[phraseIdx];
  if (!deleting) {
    typeEl.textContent = phrase.slice(0, ++charIdx);
    if (charIdx === phrase.length) {
      deleting = true;
      return setTimeout(typeLoop, 1800);
    }
  } else {
    typeEl.textContent = phrase.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      return setTimeout(typeLoop, 400);
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 70);
}
setTimeout(typeLoop, 1200);

/* ─── HERO CANVAS — PARTICLE NETWORK ─── */
(function initCanvas() {
  const canvas  = document.getElementById('heroCanvas');
  const ctx     = canvas.getContext('2d');
  let particles = [];
  const PARTICLE_COUNT = 70;
  const CONNECTION_DIST = 160;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * canvas.width;
      this.y  = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r  = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124,58,237,${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.3;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124,58,237,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Stagger siblings within the same parent
      const siblings = entry.target.parentElement.querySelectorAll(
        '.reveal-up, .reveal-left, .reveal-right'
      );
      siblings.forEach((el, i) => {
        if (!el.classList.contains('revealed')) {
          el.style.transitionDelay = (i * 0.08) + 's';
        }
      });
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

/* ─── HERO INITIAL ANIMATIONS ─── */
document.querySelectorAll('.hero .reveal-up').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.12 + 0.3) + 's';
  setTimeout(() => el.classList.add('revealed'), 50);
});

/* ─── SMOOTH ACTIVE NAV LINK ─── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ─── STAT COUNTER ANIMATION ─── */
function animateCounter(el, target, suffix = '') {
  const isDecimal = target.toString().includes('.');
  const numTarget = parseFloat(target);
  let current = 0;
  const step  = numTarget / 60;
  const tick  = () => {
    current = Math.min(current + step, numTarget);
    el.textContent = (isDecimal ? current.toFixed(2) : Math.floor(current)) + suffix;
    if (current < numTarget) requestAnimationFrame(tick);
  };
  tick();
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const numEl = card.querySelector('.stat-number');
      if (!numEl || card._counted) return;
      card._counted = true;
      const text = numEl.textContent.trim();
      if (text === '3.96') animateCounter(numEl, 3.96);
      else if (text === '4+') animateCounter(numEl, 4, '+');
      else if (text === '3') animateCounter(numEl, 3);
      else if (text === '1M+') { numEl.textContent = '0'; animateCounter(numEl, 1, 'M+'); }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(c => statsObserver.observe(c));

/* ─── TILT EFFECT ON PROJECT CARDS ─── */
if (window.innerWidth > 768) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

console.log(
  '%c Senthil Thanneermalai ',
  'background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff;font-size:20px;font-weight:800;padding:8px 16px;border-radius:8px;'
);
console.log('%c tsenthil5@gmail.com', 'color:#a855f7;font-size:13px;');
