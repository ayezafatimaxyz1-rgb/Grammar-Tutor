// Draws the Home Screen icons for the web version (docs/icon-192.png, icon-512.png, apple-touch-icon.png).
// Usage: node tools/make-icons.cjs   (needs Playwright; uses /opt/pw-browsers/chromium when present)
const path = require("path");
const fs = require("fs");
let pw;
try { pw = require("playwright"); } catch { pw = require(require("child_process").execSync("npm root -g").toString().trim() + "/playwright"); }

// A speech bubble with sound bars, kept inside the middle 80% so Android can crop it to any shape.
const bars = [[168, 40], [212, 90], [256, 130], [300, 90], [344, 40]]
  .map(([x, h], i) => `<rect x="${x - 13}" y="${250 - h / 2}" width="26" height="${h}" rx="13" fill="${i === 2 ? "#e39a2d" : "#0d7a4c"}"/>`).join("");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
<rect width="512" height="512" fill="#0d7a4c"/>
<path d="M136 150h240a40 40 0 0 1 40 40v120a40 40 0 0 1-40 40H256l-70 56v-56h-50a40 40 0 0 1-40-40V190a40 40 0 0 1 40-40z" fill="#fff"/>
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
