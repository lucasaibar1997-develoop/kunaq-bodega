/* ============================================================
   KUNAQ · main.js
   Age Gate · Navbar scroll · Hamburger menu
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Age Gate ─────────────────────────────────────────── */
  const gate   = document.getElementById('age-gate');
  const btnYes = document.getElementById('age-yes');
  const btnNo  = document.getElementById('age-no');

  if (gate && sessionStorage.getItem('kunaq-age') !== 'yes') {
    gate.style.display = 'flex';
  }

  if (btnYes) {
    btnYes.addEventListener('click', () => {
      sessionStorage.setItem('kunaq-age', 'yes');
      gate.style.display = 'none';
    });
  }

  if (btnNo) {
    btnNo.addEventListener('click', () => {
      window.location.href = 'https://www.google.com';
    });
  }

  /* ── Navbar scroll ────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const handleScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // estado inicial
  }

  /* ── Hamburger mobile ─────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });

    // Cerrar al hacer click en un link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });

    // Cerrar al hacer click fuera del menú
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      }
    });
  }

});
