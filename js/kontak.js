// ===== TOAST NOTIFICATION =====
function showToast(message, type) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.4s ease forwards';
    setTimeout(() => toast.remove(), 400);
  }, 2600);
}

// ===== FORM VALIDATION =====
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputs = form.querySelectorAll('input[type="text"]');
  const nama = inputs[0].value.trim();
  const hp = inputs[1].value.trim();
  const pesan = form.querySelector('textarea').value.trim();

  if (!nama) {
    showToast('Mohon isi nama lengkap Anda.', 'error');
    inputs[0].focus();
    return;
  }
  if (!hp) {
    showToast('Mohon isi nomor HP Anda.', 'error');
    inputs[1].focus();
    return;
  }
  if (!/^[0-9]{10,15}$/.test(hp)) {
    showToast('Format nomor HP tidak valid. Gunakan angka saja (10-15 digit).', 'error');
    inputs[1].focus();
    return;
  }
  if (!pesan) {
    showToast('Mohon isi pesan atau aduan Anda.', 'error');
    form.querySelector('textarea').focus();
    return;
  }

  showToast('Pesan Anda berhasil dikirim! Pengurus RT akan segera menghubungi.', 'success');
  form.reset();
});
