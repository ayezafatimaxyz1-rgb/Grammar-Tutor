import fs from 'fs';
const H = JSON.parse(fs.readFileSync('horn2.json','utf8'));
export const VB = '-34 -272 96 286';

function solid(id, k) {
  const sh=[], mn=[], hi=[];
  H.arcs.forEach(a => {
    const sw = Math.max(1.6, a.w * k);
    sh.push(`<path d="${a.d}" stroke-width="${(sw*1.06).toFixed(1)}" transform="translate(0,${(sw*0.30).toFixed(1)})"/>`);
    mn.push(`<path d="${a.d}" stroke-width="${sw.toFixed(1)}"/>`);
    hi.push(`<path d="${a.d}" stroke-width="${(sw*0.26).toFixed(1)}" transform="translate(0,${(-sw*0.30).toFixed(1)})"/>`);
  });
  return `<defs><linearGradient id="${id}c" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2E2113"/><stop offset="0.3" stop-color="#5E4526"/><stop offset="0.62" stop-color="#8A6C3F"/><stop offset="1" stop-color="#2A1E11"/></linearGradient>`
    + `<linearGradient id="${id}r" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6B5130"/><stop offset="0.26" stop-color="#B8975E"/><stop offset="0.46" stop-color="#F2E2C0"/><stop offset="0.62" stop-color="#C9A76A"/><stop offset="0.86" stop-color="#7A5C33"/><stop offset="1" stop-color="#43301A"/></linearGradient></defs>`
    + `<path d="${H.cone}" fill="url(#${id}c)"/>`
    + `<g fill="none" stroke="#1C1309" stroke-opacity="0.85" stroke-linecap="round">${sh.join('')}</g>`
    + `<g fill="none" stroke="url(#${id}r)" stroke-linecap="round">${mn.join('')}</g>`
    + `<g fill="none" stroke="#FBF0D8" stroke-opacity="0.75" stroke-linecap="round">${hi.join('')}</g>`;
}

function line(color, w) {
  const arcs = H.arcs.map(a => `<path d="${a.d}"/>`).join('');
  return `<g fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">`
    + `<path d="${H.cone}"/>${arcs}</g>`;
}

const expand = s => s
  .replace(/<!--HORN ([a-z0-9]+) ([\d.]+)-->/g, (_, id, k) => solid(id, parseFloat(k)))
  .replace(/<!--HORNLINE (\S+) ([\d.]+)-->/g, (_, c, w) => line(c, w));

let n = 0;
for (const f of fs.readdirSync('.')) {
  if (!f.endsWith('.tpl')) continue;
  const out = f.replace(/\.tpl$/, '.dc.html');
  fs.writeFileSync(out, expand(fs.readFileSync(f, 'utf8')));
  n++;
}
console.log('built ' + n + ' artboards');
