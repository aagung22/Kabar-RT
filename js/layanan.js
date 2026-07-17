// ===== LAYANAN PAGE — Form Handling =====

function scrollToForm(serviceName) {
  const select = document.getElementById('serviceSelect');
  const formContainer = document.getElementById('application-form');

  if (select) {
    select.value = serviceName;
  }

  if (formContainer) {
    formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Highlight effect
    formContainer.style.boxShadow = '0 0 0 4px rgba(0, 77, 64, 0.3)';
    setTimeout(() => {
      formContainer.style.boxShadow = '';
    }, 1500);
  }
}

// Form Submission Interaction
document.addEventListener('DOMContentLoaded', () => {
  const layananForm = document.getElementById('layananForm');

  if (layananForm) {
    layananForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (this.checkValidity()) {
        const btn = e.submitter;
        const originalText = btn.innerHTML;

        btn.disabled = true;
        btn.innerHTML = '<span class="material-symbols-outlined" style="animation: spin 1s linear infinite">progress_activity</span> Memproses...';

        setTimeout(() => {
          alert('Terima kasih! Pengajuan berkas Anda telah berhasil dikirim ke sistem Kabar RT Portal. Anda akan menerima notifikasi status pengajuan melalui profil Anda.');
          btn.disabled = false;
          btn.innerHTML = originalText;
          this.reset();
        }, 1500);
      } else {
        const firstInvalid = this.querySelector(':invalid');
        if (firstInvalid) firstInvalid.focus();
      }
    });
  }
});

// Spin animation for loading indicator
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);
