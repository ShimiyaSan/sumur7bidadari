// Interaksi website Desa Teteaji
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
    document.querySelectorAll('.nav-link').forEach(item => item.classList.remove('active'));
    link.classList.add('active');
  });
});

// Tahun dan tanggal otomatis
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('today').textContent = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
}).format(new Date());

// Animasi angka ketika bagian statistik terlihat
const counters = document.querySelectorAll('.counter');
const numberObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.target);
    const duration = 1100;
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString('id-ID');
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
    numberObserver.unobserve(el);
  });
}, { threshold: 0.4 });
counters.forEach(counter => numberObserver.observe(counter));

// Galeri foto dengan tampilan lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = item.querySelector('img').alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});
document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeLightbox();
});

// Tombol kembali ke atas
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 450);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Form demo: siapkan pesan untuk disalin, belum terhubung ke server.
document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  const text = `Pesan untuk Pemerintah Desa Teteaji\nNama: ${name}\nEmail: ${email || '-'}\nPesan: ${message}`;
  const status = document.getElementById('formStatus');
  status.textContent = 'Pesan sudah disiapkan. Fitur ini belum mengirim ke server; salin teks berikut untuk dikirim secara manual.';
  let preview = document.getElementById('messagePreview');
  if (!preview) {
    preview = document.createElement('textarea');
    preview.id = 'messagePreview';
    preview.readOnly = true;
    preview.rows = 5;
    preview.style.cssText = 'margin-top:10px;width:100%;padding:10px;border:1px solid #dfe6dd;border-radius:4px;font-size:11px;';
    status.insertAdjacentElement('afterend', preview);
  }
  preview.value = text;
  preview.focus();
  preview.select();
});
