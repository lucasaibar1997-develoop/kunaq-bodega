/* ============================================================
   animaciones.js — Kunaq NOA
   Scroll reveal, pájaros canvas, parallax montañas,
   cactus sway, partículas de polvo
   ============================================================ */

'use strict';

/* ─── 1. SCROLL REVEAL ────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll(
  '.about-preview__grid, .about-preview__text, .about-preview__img, ' +
  '.wine-feature__grid, .wine-feature__text, .wine-feature__img, ' +
  '.step-card, .gallery__item, .galeria-preview__item, ' +
  '.timeline__item, .bodega-card, .terroir__stat, ' +
  '.vino-ficha__grid, .comprar-step, .nosotros-historia__grid'
).forEach(el => {
  el.classList.add('reveal-ready');
  revealObserver.observe(el);
});


/* ─── 2. PARALLAX MONTAÑAS ────────────────────────────────── */
const mtnLayers = document.querySelectorAll('[data-parallax]');

function onScroll() {
  const scrollY = window.scrollY;
  mtnLayers.forEach(layer => {
    const speed = parseFloat(layer.dataset.parallax) || 0.2;
    layer.style.transform = `translateY(${scrollY * speed}px)`;
  });
}

if (mtnLayers.length) {
  window.addEventListener('scroll', onScroll, { passive: true });
}


/* ─── 3. PÁJAROS — Canvas animado ─────────────────────────── */
function initPajaros() {
  const canvas = document.getElementById('canvas-pajaros');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Pajaro {
    constructor(delay) {
      this.delay = delay || 0;
      this.reset(true);
    }

    reset(inicial) {
      this.x      = inicial ? Math.random() * canvas.width * 0.5 - canvas.width * 0.4 : -80;
      this.y      = canvas.height * (0.52 + Math.random() * 0.22);
      this.vx     = 0.55 + Math.random() * 1.1;
      this.vy     = -(0.12 + Math.random() * 0.30);
      this.size   = 3 + Math.random() * 5;
      this.alas   = Math.random() * Math.PI * 2;
      this.velAlas = 0.055 + Math.random() * 0.05;
      this.opacity = 0;
      this.fadeIn  = 0.007 + Math.random() * 0.006;
      this.onda    = Math.random() * Math.PI * 2;
    }

    update() {
      if (this.delay > 0) { this.delay--; return; }
      this.x    += this.vx;
      this.onda += 0.016;
      this.y    += this.vy + Math.sin(this.onda) * 0.22;
      this.alas += this.velAlas;
      if (this.opacity < 1) this.opacity = Math.min(1, this.opacity + this.fadeIn);
      if (this.x > canvas.width + 100) this.reset(false);
    }

    draw() {
      if (this.delay > 0) return;
      ctx.save();
      ctx.globalAlpha = this.opacity * 0.70;
      ctx.strokeStyle = '#C9A84C';
      ctx.lineWidth   = this.size * 0.32;
      ctx.lineCap     = 'round';

      const wb = Math.sin(this.alas) * this.size * 0.85;
      ctx.beginPath();
      ctx.moveTo(this.x - this.size, this.y + wb);
      ctx.quadraticCurveTo(this.x - this.size * 0.4, this.y - this.size * 0.2, this.x, this.y);
      ctx.moveTo(this.x, this.y);
      ctx.quadraticCurveTo(this.x + this.size * 0.4, this.y - this.size * 0.2, this.x + this.size, this.y + wb);
      ctx.stroke();
      ctx.restore();
    }
  }

  const bandada = Array.from({ length: 18 }, (_, i) =>
    new Pajaro(i * 22 + Math.floor(Math.random() * 28))
  );

  let animando = true;
  const hero = document.querySelector('.hero');
  if (hero) {
    new IntersectionObserver(([e]) => { animando = e.isIntersecting; }).observe(hero);
  }

  function loop() {
    requestAnimationFrame(loop);
    if (!animando) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bandada.forEach(p => { p.update(); p.draw(); });
  }
  loop();
}


/* ─── 4. CACTUS SWAY ──────────────────────────────────────── */
function initCactusSway() {
  document.querySelectorAll('.cactus-sway').forEach((el, i) => {
    let t = i * 0.8;
    function sway() {
      t += 0.007;
      el.style.transform = `rotate(${Math.sin(t) * 0.55}deg)`;
      el.style.transformOrigin = 'bottom center';
      requestAnimationFrame(sway);
    }
    sway();
  });
}


/* ─── 5. POLVO DEL VIENTO ─────────────────────────────────── */
function initPolvo() {
  const canvas = document.getElementById('canvas-polvo');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.parentElement.offsetWidth || window.innerWidth;
    canvas.height = 160;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particula {
    constructor() { this.reset(true); }
    reset(inicial) {
      this.x   = inicial ? Math.random() * canvas.width : -5;
      this.y   = 120 + Math.random() * 35;
      this.r   = 0.4 + Math.random() * 1.4;
      this.vx  = 0.25 + Math.random() * 0.75;
      this.vy  = -(Math.random() * 0.25);
      this.op  = 0;
      this.max = 0.10 + Math.random() * 0.16;
    }
    update() {
      this.x  += this.vx;
      this.y  += this.vy;
      this.op  = Math.min(this.max, this.op + 0.0025);
      if (this.x > canvas.width + 10) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(192, 180, 160, ${this.op})`;
      ctx.fill();
    }
  }

  const particulas = Array.from({ length: 55 }, () => new Particula());

  function loop() {
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particulas.forEach(p => { p.update(); p.draw(); });
  }
  loop();
}


/* ─── INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initPajaros();
  initCactusSway();
  initPolvo();
});
