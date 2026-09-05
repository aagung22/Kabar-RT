// ===== LOAD SHARED LAYOUTS (Navbar & Footer) =====
async function loadLayout() {
  // Load Navbar
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  if (navbarPlaceholder) {
    try {
      const navRes = await fetch('layouts/navbar.html');
      if (navRes.ok) {
        navbarPlaceholder.innerHTML = await navRes.text();
      }
    } catch (e) {
      console.warn('Navbar layout gagal dimuat:', e);
    }
  }

  // Load Footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    try {
      const footRes = await fetch('layouts/footer.html');
      if (footRes.ok) {
        footerPlaceholder.innerHTML = await footRes.text();
      }
    } catch (e) {
      console.warn('Footer layout gagal dimuat:', e);
    }
  }

  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.remove('active');
    if (href === currentPage ||
      (currentPage === 'index.html' && href === 'beranda.html') ||
      (currentPage === '' && href === 'beranda.html')) {
      link.classList.add('active');
    }
  });

  // Re-initialize hamburger menu after layout is loaded
  initHamburgerMenu();

  // Initialize date & countdown (top-bar elements loaded from navbar)
  initTopBar();
}

// ===== TANGGAL HARI INI =====
function updateCurrentDate() {
  const now = new Date();
  const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  const namaHari = hari[now.getDay()];
  const tgl = now.getDate();
  const namaBulan = bulan[now.getMonth()];
  const tahun = now.getFullYear();

  const el = document.getElementById('current-date');
  if (el) {
    el.textContent = `${namaHari}, ${tgl} ${namaBulan} ${tahun}`;
  }
}

// ===== COUNTDOWN TIMER KE 17 AGUSTUS =====
function updateCountdown() {
  const now = new Date();
  let targetYear = now.getFullYear();
  let target = new Date(targetYear, 7, 17); // Agustus = index 7
  if (now > target) {
    targetYear += 1;
    target = new Date(targetYear, 7, 17);
  }

  const keN = targetYear - 1945;
  const diff = target - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  const pad = (n) => String(n).padStart(2, '0');

  const el = document.getElementById('countdown-text');
  if (el) {
    if (diff <= 0) {
      el.textContent = `🇮🇩 Selamat Hari Kemerdekaan RI ke-${keN}! 🇮🇩`;
    } else {
      el.textContent = `Countdown Hari Kemerdekaan RI ke-${keN}: ${days} Hari ${pad(hours)}:${pad(mins)}:${pad(secs)}`;
    }
  }
}

// ===== INIT TOP BAR (Date & Countdown) =====
function initTopBar() {
  updateCurrentDate();
  setInterval(updateCurrentDate, 60000);

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ===== HAMBURGER MENU =====
function initHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-links') || document.querySelector('.nav-menu') || document.querySelector('nav');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
}

// Initialize layout loading on DOM ready
document.addEventListener('DOMContentLoaded', loadLayout);

// ===== SCROLL ANIMATION =====
document.querySelectorAll('section:not(.hero):not(.hero-portal)').forEach(s => {
  s.classList.add('fade-in');
});

const scrollObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => scrollObs.observe(el));
