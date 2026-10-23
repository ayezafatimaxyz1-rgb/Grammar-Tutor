// Draws the Home Screen icons for the web version (docs/icon-192.png, icon-512.png, apple-touch-icon.png).
// Usage: node tools/make-icons.cjs   (needs Playwright; uses /opt/pw-browsers/chromium when present)
const path = require("path");
const fs = require("fs");
let pw;
try { pw = require("playwright"); } catch { pw = require(require("child_process").execSync("npm root -g").toString().trim() + "/playwright"); }

// The app's glass look: a soft green, blue and gold background with a green speech bubble and sound bars.
// Everything sits inside the middle 80%, so Android can crop it to any shape.
const bars = [[168, 40], [212, 90], [256, 130], [300, 90], [344, 40]]
  .map(([x, h], i) => `<rect x="${x - 13}" y="${250 - h / 2}" width="26" height="${h}" rx="13" fill="${i === 2 ? "#ffcd82" : "#ffffff"}"/>`).join("");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
<defs>
<radialGradient id="m" cx="40" cy="30" r="420" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#7ddcae"/><stop offset="1" stop-color="#7ddcae" stop-opacity="0"/></radialGradient>
<radialGradient id="b" cx="500" cy="160" r="330" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#9cc6ff"/><stop offset="1" stop-color="#9cc6ff" stop-opacity="0"/></radialGradient>
<radialGradient id="g" cx="120" cy="520" r="360" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffd08c"/><stop offset="1" stop-color="#ffd08c" stop-opacity="0"/></radialGradient>
<linearGradient id="gb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0d7a4c"/><stop offset="1" stop-color="#17a56c"/></linearGradient>
<filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#0b5235" flood-opacity=".35"/></filter>
</defs>
<rect width="512" height="512" fill="#e9f3ee"/><rect width="512" height="512" fill="url(#m)"/><rect width="512" height="512" fill="url(#b)"/><rect width="512" height="512" fill="url(#g)"/>
<path d="M136 150h240a40 40 0 0 1 40 40v120a40 40 0 0 1-40 40H256l-70 56v-56h-50a40 40 0 0 1-40-40V190a40 40 0 0 1 40-40z" fill="url(#gb)" filter="url(#sh)"/>
${bars}</svg>`;

(async () => {
  const exe = fs.existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;
  const b = await pw.chromium.launch(exe ? { executablePath: exe } : {});
  const out = path.resolve(__dirname, "../docs");
  for (const [name, size] of [["icon-192.png", 192], ["icon-512.png", 512], ["apple-touch-icon.png", 180]]) {
    const p = await b.newPage({ viewport: { width: size, height: size } });
    await p.setContent(`<html><body style="margin:0;width:${size}px;height:${size}px">${svg}</body></html>`);
    await p.screenshot({ path: path.join(out, name) });
    await p.close();
    console.log("Wrote docs/" + name);
  }
  await b.close();
})();
