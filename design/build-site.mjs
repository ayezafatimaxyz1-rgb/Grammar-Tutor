// Inlines the markhor artwork as data URIs and writes the file that gets published.
import fs from 'fs';
import path from 'path';

const SRC = 'markhoor-site.src.html';
const OUT = 'markhoor-site.html';
const DIR = 'assets';

function dataUri(file) {
  const ext = path.extname(file).slice(1).toLowerCase();
  const type = ext === 'webp' ? 'image/webp' : ext === 'png' ? 'image/png' : 'image/jpeg';
  return 'data:' + type + ';base64,' + fs.readFileSync(path.join(DIR, file)).toString('base64');
}

const frames = [0, 1, 2, 3, 4].map((i) => dataUri(`markhor_${i}.webp`));
const logo = dataUri('markhor_logo.webp');

const photos = {};
for (const f of fs.readdirSync(DIR)) {
  const m = /^p_(.+)\.webp$/.exec(f);
  if (m) photos[m[1]] = dataUri(f);
}

let html = fs.readFileSync(SRC, 'utf8');
html = html.replace('"__MARKHOR_FRAMES__"', JSON.stringify(frames));
html = html.replace('"__PRODUCT_PHOTOS__"', JSON.stringify(photos));
html = html.replace(/__MARKHOR_LOGO__/g, logo);

if (html.includes('__MARKHOR_')) throw new Error('a placeholder was left unreplaced');
fs.writeFileSync(OUT, html);
console.log(`wrote ${OUT} — ${(html.length / 1024 / 1024).toFixed(2)} MB, ${frames.length} markhor frames + ${Object.keys(photos).length} product photos inlined`);
