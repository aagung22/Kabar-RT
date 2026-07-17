// ===== PROFIL PAGE — Scroll Animations =====
document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for card animations
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
});
