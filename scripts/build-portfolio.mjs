import { copyFile, mkdir, rm } from 'node:fs/promises';

const source = new URL('../', import.meta.url);
const publish = new URL('dist/', source);
const entries = [
  'index.html',
  'internship-tracker.html',
  'sitemap.xml',
  'assets/images/agricultural-fields-nasa.jpg',
  'assets/images/drive2own-public-home.jpg',
  'assets/images/empire-tracker-dashboard.png',
  'assets/images/mymulenga.jpeg',
  'assets/images/uwc-zambia-public-home.jpg',
  'assets/toolkit-icons.svg',
  'css/datasilence-refresh.css',
  'css/index.css',
  'css/styles.css',
  'js/contact-form.js',
  'js/portfolio.js',
  'js/script.js',
  'public/favicon-16x16.png',
  'public/favicon.ico',
  'public/favicon.svg',
  'public/site.webmanifest',
];

await rm(publish, { recursive: true, force: true });
for (const entry of entries) {
  const destination = new URL(entry, publish);
  await mkdir(new URL('.', destination), { recursive: true });
  await copyFile(new URL(entry, source), destination);
}
