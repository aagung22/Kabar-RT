

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

// ===== TYPING EFFECT =====
function typeWriter(element, text, speed = 80, callback) {
  let i = 0;
  element.textContent = '';
  element.style.display = 'inline-block';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Selesai mengetik, jalankan callback jika ada
      if (callback) callback();
    }
  }
  
  type();
}

// ===== TYPING EFFECT WITH LOOP (Opsional) =====
function typeWriterLoop(element, texts, speed = 70, delayBetween = 3000) {
  let currentIndex = 0;
  let isDeleting = false;
  let i = 0;
  
  function type() {
    const currentText = texts[currentIndex];
    
    if (!isDeleting && i < currentText.length) {
      // Mengetik
      element.textContent = currentText.substring(0, i + 1);
      i++;
      setTimeout(type, speed);
    } else if (!isDeleting && i === currentText.length) {
      // Selesai mengetik, tunggu sebentar lalu hapus
      isDeleting = true;
      setTimeout(type, delayBetween);
    } else if (isDeleting && i > 0) {
      // Menghapus
      element.textContent = currentText.substring(0, i - 1);
      i--;
      setTimeout(type, speed / 2);
    } else if (isDeleting && i === 0) {
      // Selesai menghapus, pindah ke teks berikutnya
      isDeleting = false;
      currentIndex = (currentIndex + 1) % texts.length;
      setTimeout(type, 300);
    }
  }
  
  type();
}

// ===== INITIALIZE TYPING EFFECT =====
document.addEventListener('DOMContentLoaded', function() {
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    // Opsi 1: Hanya mengetik sekali (tanpa loop)
    // const textToType = 'Portal Resmi Warga RT 03';
    // setTimeout(() => {
    //   typeWriter(typingElement, textToType, 70);
    // }, 800);
    
    // Opsi 2: Mengetik dengan efek loop (mengetik, menghapus, mengulang)
    const texts = [
      'Portal Resmi Warga RT 03',
      'Rumah Digital Warga',
      'Komunitas Guyub & Profesional'
    ];
    
    // Delay agar greeting text terlihat dulu
    setTimeout(() => {
      typeWriterLoop(typingElement, texts, 70, 3000);
    }, 800);
  }
});




// ===== SMOOTH SCROLL =====
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});