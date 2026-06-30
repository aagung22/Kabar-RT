// ===== COUNTDOWN TIMER KE 17 AGUSTUS 2026 =====
function updateCountdown() {
  const targetDate = new Date('2026-08-17T00:00:00+07:00');
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent = '0';
    document.getElementById('cd-hours').textContent = '0';
    document.getElementById('cd-minutes').textContent = '0';
    document.getElementById('cd-seconds').textContent = '0';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-days').textContent = days;
  document.getElementById('cd-hours').textContent = hours;
  document.getElementById('cd-minutes').textContent = minutes;
  document.getElementById('cd-seconds').textContent = seconds;
}

// Jalankan segera dan update setiap detik
updateCountdown();
setInterval(updateCountdown, 1000);

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

updateCurrentDate();

// ===== COUNTER ANIMATION (CTA STATS) =====
function animateCounter(el, target, suffix) {
  let current = 0;
  const duration = 2000;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-item h3').forEach(item => {
        const text = item.textContent;
        const num = parseInt(text);
        const suffix = text.replace(num, '');
        item.textContent = '0' + suffix;
        animateCounter(item, num, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsWrapper = document.querySelector('.stats-wrapper');
if (statsWrapper) statsObserver.observe(statsWrapper);
