// Draws the Home Screen icons for the web versions: Bolo in docs/, Likho in docs/likho/ (icon-192.png, icon-512.png, apple-touch-icon.png).
// Usage: node tools/make-icons.cjs   (needs Playwright; uses /opt/pw-browsers/chromium when present)
const path = require("path");
const fs = require("fs");
let pw;
try { pw = require("playwright"); } catch { pw = require(require("child_process").execSync("npm root -g").toString().trim() + "/playwright"); }

// The glass look: a soft background with a speech bubble and sound bars for Bolo (speaking),
// and an ink-blue answer sheet with ruled lines and a gold pen for Likho (writing).
// Everything sits inside the middle 80%, so Android can crop it to any shape.
const glass = (c1, c2, c3) => `<defs>
<radialGradient id="m" cx="40" cy="30" r="420" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
<radialGradient id="b" cx="500" cy="160" r="330" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${c2}"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></radialGradient>
<radialGradient id="g" cx="120" cy="520" r="360" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${c3}"/><stop offset="1" stop-color="${c3}" stop-opacity="0"/></radialGradient>`;
const bars = [[168, 40], [212, 90], [256, 130], [300, 90], [344, 40]]
  .map(([x, h], i) => `<rect x="${x - 13}" y="${250 - h / 2}" width="26" height="${h}" rx="13" fill="${i === 2 ? "#ffcd82" : "#ffffff"}"/>`).join("");
const bolo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
${glass("#7ddcae", "#9cc6ff", "#ffd08c")}
<linearGradient id="gb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0d7a4c"/><stop offset="1" stop-color="#17a56c"/></linearGradient>
<filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#0b5235" flood-opacity=".35"/></filter>
</defs>
<rect width="512" height="512" fill="#e9f3ee"/><rect width="512" height="512" fill="url(#m)"/><rect width="512" height="512" fill="url(#b)"/><rect width="512" height="512" fill="url(#g)"/>
<path d="M136 150h240a40 40 0 0 1 40 40v120a40 40 0 0 1-40 40H256l-70 56v-56h-50a40 40 0 0 1-40-40V190a40 40 0 0 1 40-40z" fill="url(#gb)" filter="url(#sh)"/>
${bars}</svg>`;
const lines = [196, 240, 284, 328].map((y, i) => `<rect x="170" y="${y}" width="${i === 3 ? 110 : 168}" height="12" rx="6" fill="#ffffff" fill-opacity=".92"/>`).join("");
const likho = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
${glass("#9db8ff", "#86e0c8", "#ffd08c")}
<linearGradient id="gb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2449a8"/><stop offset="1" stop-color="#3f6bd6"/></linearGradient>
<linearGradient id="pen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd58f"/><stop offset="1" stop-color="#f0a83a"/></linearGradient>
<filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#14286b" flood-opacity=".35"/></filter>
</defs>
<rect width="512" height="512" fill="#e9eef8"/><rect width="512" height="512" fill="url(#m)"/><rect width="512" height="512" fill="url(#b)"/><rect width="512" height="512" fill="url(#g)"/>
<rect x="120" y="120" width="250" height="290" rx="36" fill="url(#gb)" filter="url(#sh)"/>
<rect x="150" y="160" width="4" height="210" rx="2" fill="#ff8a76" fill-opacity=".9"/>
${lines}
<g transform="rotate(40 330 330)"><rect x="312" y="190" width="36" height="170" rx="10" fill="url(#pen)" filter="url(#sh)"/><path d="M312 360h36l-18 40z" fill="#fff1d6"/><path d="M324 386h12l-6 14z" fill="#14286b"/></g>
</svg>`;
const SETS = [["docs", bolo], ["docs/likho", likho]];

(async () => {
  const exe = fs.existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;
  const b = await pw.chromium.launch(exe ? { executablePath: exe } : {});
  for (const [dir, svg] of SETS) {
    const out = path.resolve(__dirname, "..", dir);
    fs.mkdirSync(out, { recursive: true });
    for (const [name, size] of [["icon-192.png", 192], ["icon-512.png", 512], ["apple-touch-icon.png", 180]]) {
      const p = await b.newPage({ viewport: { width: size, height: size } });
      await p.setContent(`<html><body style="margin:0;width:${size}px;height:${size}px">${svg}</body></html>`);
      await p.screenshot({ path: path.join(out, name) });
      await p.close();
      console.log("Wrote " + dir + "/" + name);
    }
  }
  await b.close();
})();
