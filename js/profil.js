// ===== PROFIL PAGE — Scroll Animations & Modal =====
document.addEventListener('DOMContentLoaded', () => {
  // ===== SCROLL ANIMATIONS =====
  const observerOptions = { threshold: 0.1 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card-lift').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.7s ease';
    observer.observe(card);
  });

  // ===== MODAL — Struktur Lengkap =====
  const modal = document.getElementById('strukturModal');
  const openBtn = document.getElementById('lihatTimLengkap');
  const closeBtn = document.getElementById('closeModal');

  // Function to open modal
  function openModal() {
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  // Function to close modal
  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Open modal when button is clicked
  if (openBtn) {
    openBtn.addEventListener('click', openModal);
  }

  // Close modal when close button is clicked
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close modal when clicking outside content
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // ===== STATS TABS (Optional) =====
  const statsTabs = document.querySelectorAll('.stats-tab');
  
  statsTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      statsTabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Here you can add functionality to switch between tabs
      // For example: show different stats data
      console.log('Tab clicked:', this.textContent);
    });
  });
});