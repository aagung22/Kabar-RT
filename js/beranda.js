// ===== COUNTER ANIMATION =====
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
