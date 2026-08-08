const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

function syncHeader() {
  header.classList.toggle('scrolled', window.scrollY > 24);
}

syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.classList.toggle('open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

document.getElementById('year').textContent = new Date().getFullYear();

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.image;
    lightbox.showModal();
  });
});

lightboxClose.addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.close();
});

function initializeReviewsCarousel() {
  const reviewCards = document.querySelectorAll(".review-card");

  if (!reviewCards.length) {
    return;
  }

  const reviewDots = document.querySelectorAll(".review-dot");
  const previousButton = document.querySelector(".review-prev");
  const nextButton = document.querySelector(".review-next");
  const carousel = document.querySelector(".reviews-carousel");

  let currentReview = 0;
  let rotationInterval;

  function showReview(index) {
    reviewCards.forEach(card => card.classList.remove("active"));
    reviewDots.forEach(dot => dot.classList.remove("active"));

    currentReview = (index + reviewCards.length) % reviewCards.length;

    reviewCards[currentReview].classList.add("active");
    reviewDots[currentReview].classList.add("active");
  }

  function nextReview() {
    showReview(currentReview + 1);
  }

  function startRotation() {
    rotationInterval = setInterval(nextReview, 5000);
  }

  function restartRotation() {
    clearInterval(rotationInterval);
    startRotation();
  }

  previousButton.addEventListener("click", () => {
    showReview(currentReview - 1);
    restartRotation();
  });

  nextButton.addEventListener("click", () => {
    nextReview();
    restartRotation();
  });

  reviewDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showReview(index);
      restartRotation();
    });
  });

  carousel.addEventListener("mouseenter", () => clearInterval(rotationInterval));
  carousel.addEventListener("mouseleave", startRotation);

  startRotation();
}

initializeReviewsCarousel();