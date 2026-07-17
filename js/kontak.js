// ===== KONTAK PAGE — Form Interactivity =====
document.addEventListener('DOMContentLoaded', () => {
  const anonCheckbox = document.getElementById('anonymousCheck');
  const nameInput = document.getElementById('nameInput');
  const houseNo = document.getElementById('houseNo');
  const form = document.getElementById('aspirationForm');

  if (anonCheckbox && nameInput && houseNo) {
    anonCheckbox.addEventListener('change', (e) => {
      const isAnon = e.target.checked;
      nameInput.disabled = isAnon;
      houseNo.disabled = isAnon;

      if (isAnon) {
        nameInput.value = 'Anonim';
        houseNo.value = '-';
        nameInput.classList.add('disabled');
        houseNo.classList.add('disabled');
      } else {
        nameInput.value = '';
        houseNo.value = '';
        nameInput.classList.remove('disabled');
        houseNo.classList.remove('disabled');
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Terima kasih! Aspirasi Anda telah terkirim dan akan segera diproses oleh pengurus.');
      form.reset();
      if (nameInput && houseNo) {
        nameInput.disabled = false;
        houseNo.disabled = false;
        nameInput.classList.remove('disabled');
        houseNo.classList.remove('disabled');
      }
    });
  }
});
