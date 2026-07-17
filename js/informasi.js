// ===== INFORMASI PAGE — Card Interactions =====
document.addEventListener('DOMContentLoaded', () => {
  // Card border color on hover
  document.querySelectorAll('.card-lift').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'var(--primary)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = 'var(--border)';
    });
  });
});
