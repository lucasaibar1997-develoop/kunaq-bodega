/* ============================================================
   KUNAQ · galeria.js
   Lightbox con navegación teclado y click
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const images   = Array.from(document.querySelectorAll('.gallery__item img'));
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lb-img');

  if (!lightbox || images.length === 0) return;

  let current = 0;

  function openLb(i) {
    current = i;
    lbImg.src = images[i].src;
    lbImg.alt = images[i].alt || 'Galería Kunaq';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  function prevImg() {
    openLb((current - 1 + images.length) % images.length);
  }

  function nextImg() {
    openLb((current + 1) % images.length);
  }

  // Abrir al click en imagen
  images.forEach((img, i) => {
    img.addEventListener('click', () => openLb(i));
  });

  // Controles
  document.getElementById('lb-close').addEventListener('click', closeLb);
  document.getElementById('lb-prev').addEventListener('click', prevImg);
  document.getElementById('lb-next').addEventListener('click', nextImg);

  // Cerrar al click en fondo
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLb();
  });

  // Teclado
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowLeft')  prevImg();
    if (e.key === 'ArrowRight') nextImg();
    if (e.key === 'Escape')     closeLb();
  });

});
