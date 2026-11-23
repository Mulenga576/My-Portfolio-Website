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

document.getElementById('year').textContent = new Date().getFullYear();
