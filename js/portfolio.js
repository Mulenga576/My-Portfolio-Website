const navigation = document.querySelector('.nav-inner');
const menu = navigation.querySelector('.nav-toggle');
const links = navigation.querySelector('.nav-links');
const mobile = window.matchMedia('(max-width: 720px)');

function setMenu(open) {
  navigation.toggleAttribute('data-open', open);
  menu.setAttribute('aria-expanded', String(open));
}

function syncNavigation() {
  navigation.toggleAttribute('data-collapsible', mobile.matches);
  menu.hidden = !mobile.matches;
  setMenu(false);
}

syncNavigation();
mobile.addEventListener('change', syncNavigation);
menu.addEventListener('click', () => setMenu(!navigation.hasAttribute('data-open')));
links.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link || !navigation.hasAttribute('data-open')) return;

  setMenu(false);
  document.getElementById(link.hash.slice(1))?.focus({ preventScroll: true });
});
navigation.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !navigation.hasAttribute('data-open')) return;

  setMenu(false);
  menu.focus();
});

const gallery = document.querySelector('.work-gallery');
const galleryControls = gallery.querySelector('.gallery-controls');
const slides = [...gallery.querySelectorAll('.work-slide')];
const galleryStatus = gallery.querySelector('.gallery-status');
let currentSlide = 0;

function showSlide(index) {
  slides[currentSlide].hidden = true;
  currentSlide = (index + slides.length) % slides.length;
  const slide = slides[currentSlide];
  slide.hidden = false;
  galleryStatus.textContent = `${currentSlide + 1} of ${slides.length} · ${slide.dataset.slideTitle}`;
}

galleryControls.hidden = false;
galleryControls.addEventListener('click', (event) => {
  const button = event.target.closest('[data-gallery-step]');
  if (button) showSlide(currentSlide + Number(button.dataset.galleryStep));
});
galleryControls.addEventListener('keydown', (event) => {
  const destinations = {
    ArrowLeft: currentSlide - 1,
    ArrowRight: currentSlide + 1,
    Home: 0,
    End: slides.length - 1,
  };
  if (!Object.hasOwn(destinations, event.key)) return;

  event.preventDefault();
  showSlide(destinations[event.key]);
});

document.getElementById('year').textContent = new Date().getFullYear();
