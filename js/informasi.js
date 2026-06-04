// ===== AGENDA NAVIGATION =====
const agendaCards = document.querySelectorAll('.card-agenda');
const navBtns = document.querySelectorAll('.agenda-nav .nav-btn');
let currentPage = 0;
const perPage = 2;
const totalPages = Math.ceil(agendaCards.length / perPage);

function showAgendaPage() {
  agendaCards.forEach((card, i) => {
    if (i >= currentPage * perPage && i < (currentPage + 1) * perPage) {
      card.style.display = 'flex';
      card.style.animation = 'fadeInUp 0.4s ease forwards';
    } else {
      card.style.display = 'none';
    }
  });
}

// Tombol Sebelumnya
navBtns[0].addEventListener('click', () => {
  currentPage = currentPage > 0 ? currentPage - 1 : totalPages - 1;
  showAgendaPage();
});

// Tombol Selanjutnya
navBtns[1].addEventListener('click', () => {
  currentPage = currentPage < totalPages - 1 ? currentPage + 1 : 0;
  showAgendaPage();
});

showAgendaPage();
