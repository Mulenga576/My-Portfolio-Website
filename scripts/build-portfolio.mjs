import { copyFile, mkdir, rm } from 'node:fs/promises';

const source = new URL('../', import.meta.url);
const publish = new URL('dist/', source);
const entries = [
  'index.html',
  'internship-tracker.html',
  'sitemap.xml',
  'assets/images/arthur-hinton-YbgLm_O7mGQ-unsplash.jpg',
  'assets/images/atlas-green-hVdZBDs2an0-unsplash.jpg',
  'assets/images/empire-tracker-dashboard.png',
  'assets/images/henning-borgersen-4Uxu8wnjYOY-unsplash.jpg',
  'assets/images/myport.jpeg',
  'assets/images/nikita-kachanovsky-OVbeSXRk_9E-unsplash.jpg',
  'assets/images/nima-sarram-ABlp76_JnH4-unsplash.jpg',
  'assets/images/octavian-dan-craciun-b21Ty33CqVs-unsplash.jpg',
  'assets/images/van-tay-media--S2-AKdWQoQ-unsplash.jpg',
  'assets/images/vitor-paladini-NfdrYl4u6_I-unsplash.jpg',
  'css/datasilence-refresh.css',
  'css/index.css',
  'css/styles.css',
  'js/contact-form.js',
  'js/portfolio.js',
  'js/script.js',
  'public/downloads/Mulenga Mpikula Silence CV.pdf',
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
