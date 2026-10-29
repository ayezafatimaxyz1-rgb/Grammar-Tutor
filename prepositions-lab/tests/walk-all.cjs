// Plays every step of every lesson to its end and checks the finished board:
// every written line stays on the board and no two visible lines overlap.
// Run: node tests/walk-all.cjs [screenshot-dir]   (saves one board image per step)
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const url = "file://" + path.resolve(__dirname, "../index.html");
const shots = process.argv[2];
if (shots) fs.mkdirSync(shots, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(url + "#library");
  const ids = await page.evaluate(() => Object.keys(PLAB.lessons).filter((id) => !PLAB.lessons[id].generated));
  const problems = [];

  for (const id of ids) {
    await page.evaluate(() => localStorage.clear());
    await page.goto(url + "#lesson-" + id);
    await page.waitForSelector("#board .board-item", { state: "attached" });
    const n = await page.evaluate((id) => PLAB.lessons[id].steps.length, id);
    // Unlock every step so we can jump straight to it.
    await page.evaluate(({ id, n }) => {
      const s = JSON.parse(localStorage.getItem("prepositions-lab:v1") || '{"v":1,"lessons":{},"mistakes":{},"bookmarks":{},"notes":{}}');
      const answered = {};
      PLAB.lessons[id].steps.forEach((st) => st.check && (answered[st.check.id] = true));
      s.lessons[id] = { furthest: n - 1, done: false, answered };
      localStorage.setItem("prepositions-lab:v1", JSON.stringify(s));
    }, { id, n });
    await page.reload();
    const built = await page.waitForSelector("#steps button", { state: "attached", timeout: 8000 }).catch(() => null);
    if (!built) {
      problems.push(`${id}: the board could not be built (${(await page.textContent("#say")).trim()})`);
      continue;
    }
    for (let i = 0; i < n; i++) {
      await page.click(`#steps button[data-step="${i}"]`);
      await page.$eval("#scrub", (s) => {
        s.value = 1000;
        s.dispatchEvent(new Event("input"));
      });
      const found = await page.evaluate(() => {
        const out = [];
        const boxes = [...document.querySelectorAll("#board-main .board-item")]
          .filter((g) => g.style.visibility === "visible" && !(+g.style.opacity < 0.05) && g.querySelector("text"))
          .map((g) => {
            const t = g.querySelector("text");
            const b = t.getBBox();
            const m = (g.getAttribute("transform") || "").match(/translate\(([-\d.]+) ([-\d.]+)\)/);
            const dx = m ? +m[1] : 0, dy = m ? +m[2] : 0;
            return { id: g.dataset.id, text: t.textContent, x: b.x + dx, y: b.y + dy, w: b.width, h: b.height };
          });
        for (const b of boxes) if (b.x < 4 || b.y < 4 || b.x + b.w > 956 || b.y + b.h > 600) out.push(`"${b.text}" runs off the board`);
        for (let i = 0; i < boxes.length; i++)
          for (let j = i + 1; j < boxes.length; j++) {
            const a = boxes[i], c = boxes[j];
            // Handwriting boxes include generous ascender space, so allow a small vertical touch.
            const ox = Math.min(a.x + a.w, c.x + c.w) - Math.max(a.x, c.x);
            const oy = Math.min(a.y + a.h, c.y + c.h) - Math.max(a.y, c.y);
            if (ox > 4 && oy > 0.3 * Math.min(a.h, c.h)) out.push(`"${a.text}" overlaps "${c.text}"`);
          }
        return out;
      });
      found.forEach((f) => problems.push(`${id} step ${i + 1}: ${f}`));
      if (shots) await page.locator("#board").screenshot({ path: `${shots}/${id}-${String(i + 1).padStart(2, "0")}.png` });
    }
    console.log(`checked ${id} (${n} steps)`);
  }
  await browser.close();
  if (errors.length) problems.push(...errors.map((e) => "script error: " + e));
  if (problems.length) {
    console.log(`\n${problems.length} problem(s):\n- ` + problems.join("\n- "));
    process.exit(1);
  }
  console.log("\nEvery board fits and no written lines overlap.");
})();
