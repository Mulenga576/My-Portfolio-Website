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

const filters = document.querySelector('.filters');
const filterButtons = [...filters.querySelectorAll('button')];
const work = document.querySelectorAll('#work-grid [data-categories]');
filters.hidden = false;
filters.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  const category = button.dataset.filter;
  filterButtons.forEach((filter) => filter.setAttribute('aria-pressed', String(filter === button)));
  work.forEach((card) => {
    card.hidden = category !== 'all' && !card.dataset.categories.split(' ').includes(category);
  });
});

document.querySelectorAll('.gallery').forEach((gallery) => {
  const slides = [...gallery.querySelectorAll('img')];
  const controls = gallery.querySelector('.gallery-controls');
  const position = controls.querySelector('.gallery-position');
  let current = 0;

  controls.hidden = false;
  controls.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-step]');
    if (!button) return;

    slides[current].hidden = true;
    current = (current + Number(button.dataset.step) + slides.length) % slides.length;
    slides[current].hidden = false;
    position.textContent = (current + 1) + ' / ' + slides.length;
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
