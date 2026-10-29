// End-to-end walk through lesson 1 in a real browser (Playwright + Chromium).
// Run: node tests/e2e.cjs [screenshot-dir]
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const url = "file://" + path.resolve(__dirname, "../index.html");
const shots = process.argv[2];
if (shots) fs.mkdirSync(shots, { recursive: true });

let failures = 0;
function ok(cond, msg) {
  console.log(`${cond ? "PASS" : "FAIL"}  ${msg}`);
  if (!cond) failures++;
}

(async () => {
  const browser = await chromium.launch();
  const errors = [];

  async function newPage(opts) {
    const page = await browser.newPage(opts);
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && !/fonts\.g|ERR_|net::/.test(m.text()) && errors.push(m.text()));
    return page;
  }

  const page = await newPage({ viewport: { width: 1360, height: 900 } });
  await page.goto(url + "#library");
  ok(await page.locator(".row").count() > 90, "library lists the curriculum");
  await page.fill("#search", "between");
  const shown = await page.locator(".row:not([hidden])").count();
  ok(shown >= 1 && shown < 10, `search narrows the list (${shown} rows for "between")`);
  if (shots) await page.screenshot({ path: `${shots}/library.png`, fullPage: true });

  await page.click('a[href="#lesson-in-core"] >> nth=0');
  await page.waitForSelector("#board .board-item", { state: "attached" });
  const visibleStrokes = () => page.$$eval("#board-main path", (ps) => ps.filter((p) => p.style.visibility === "visible").length);

  // Drawing is progressive.
  await page.waitForTimeout(300);
  const early = await visibleStrokes();
  await page.waitForTimeout(1600);
  const later = await visibleStrokes();
  ok(later > early, `strokes appear progressively (${early} → ${later})`);

  // Pause stops the drawing.
  await page.click("#play");
  const pausedAt = await page.inputValue("#scrub");
  await page.waitForTimeout(600);
  ok((await page.inputValue("#scrub")) === pausedAt, "pause freezes the board");
  await page.click("#play");

  const toEnd = async () => {
    await page.$eval("#scrub", (s) => {
      s.value = 1000;
      s.dispatchEvent(new Event("input"));
    });
  };
  const next = async () => {
    await toEnd();
    await page.click("#next");
    await page.waitForTimeout(100);
  };

  await toEnd();
  ok(await page.$eval('[data-id="b-label"]', (g) => g.style.visibility === "visible"), "scrubbing to the end completes the step");
  ok((await page.locator(".say p.is-said").count()) === 3, "the explanation lines follow the board");
  if (shots) await page.screenshot({ path: `${shots}/step1.png` });

  await next(); // step 2
  await next(); // step 3
  await toEnd();
  ok(await page.$eval('[data-id="ball"]', (g) => /translate\(300/.test(g.getAttribute("transform"))), "the ball moves into the box");
  ok(await page.$eval(`[data-id="s-in"] .board-key`, (k) => k.classList.length > 1), "the word in is highlighted");
  if (shots) await page.screenshot({ path: `${shots}/step3.png` });

  // Back and forward.
  await page.click("#prev");
  ok((await page.textContent("#step-count")).startsWith("Step 2"), "previous step works");
  await next();

  await next(); // step 4: check
  await toEnd();
  ok(await page.isVisible("#check"), "the comprehension check appears after the drawing");
  ok(await page.isDisabled("#next"), "Next waits for an answer");
  await page.click('.option:has-text("touching the top")');
  ok(await page.isVisible(".fb-wrong"), "a wrong answer gets an explanation");
  ok((await page.textContent(".fb-wrong")).includes("on the box"), "the explanation names the right contrast");
  await page.click("#show-me");
  await page.waitForTimeout(2600);
  ok(await page.$eval("#board-overlay", (g) => g.querySelectorAll("path").length > 0), "Show me on the board draws a comparison");
  if (shots) await page.screenshot({ path: `${shots}/feedback.png` });
  await page.click('.option:has-text("crossed the boundary")');
  ok(await page.isVisible(".fb-right"), "the correct answer is confirmed with a reason");
  ok(!(await page.isDisabled("#next")), "Next unlocks after the correct answer");
  ok(await page.$eval("#board-overlay", (g) => g.children.length === 0), "the comparison drawing is cleared");

  // Walk the rest of the lesson, answering each check (one wrong first on the last).
  for (let guard = 0; guard < 20; guard++) {
    const label = await page.textContent("#next");
    if (label.includes("Finish")) break;
    await next();
    await toEnd();
    if (await page.isVisible("#check")) {
      if ((await page.textContent(".check-prompt")).includes("early stages")) await page.click('.option:text-is("at")');
      // Then pick the option the lesson marks correct.
      const correctText = await page.evaluate(() => {
        const step = PLAB.lessons["in-core"].steps.find((s) => s.title === document.querySelector("#step-title").textContent);
        return step.check.options.find((o) => o.correct).text;
      });
      await page.locator(".option").filter({ hasText: correctText }).first().click();
    }
    if (shots && (await page.textContent("#step-title")).includes("trouble")) await page.screenshot({ path: `${shots}/trouble.png` });
  }
  await toEnd();
  if (shots) await page.screenshot({ path: `${shots}/summary.png` });
  await page.click("#next");
  ok(await page.isVisible("#finish"), "the lesson can be finished");

  // Notebook
  await page.click('[data-nav="notebook"]');
  await page.waitForSelector(".mc-group");
  const groups = await page.$$eval(".mc-group h3", (hs) => hs.map((h) => h.textContent));
  ok(groups.length >= 2, `mistakes are grouped by misunderstanding (${groups.length} groups)`);
  await page.click("#review-all");
  await page.click("#review .option >> nth=0");
  ok(await page.isVisible("#review .fb"), "review questions give feedback");
  if (shots) await page.screenshot({ path: `${shots}/notebook.png`, fullPage: true });

  // Progress survives a reload.
  await page.reload();
  ok((await page.locator(".mc-group").count()) >= 2, "mistakes are saved across reloads");

  // Phone width, dark theme
  const phone = await newPage({ viewport: { width: 390, height: 844 }, colorScheme: "dark" });
  await phone.goto(url + "#lesson-in-core");
  await phone.waitForSelector("#board .board-item", { state: "attached" });
  await phone.$eval("#scrub", (s) => {
    s.value = 1000;
    s.dispatchEvent(new Event("input"));
  });
  const overflow = await phone.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  ok(overflow <= 0, `no sideways scroll at phone width (overflow ${overflow}px)`);
  if (shots) await phone.screenshot({ path: `${shots}/phone-dark.png`, fullPage: true });

  // Ask the board, with a stand-in for Claude that returns a canned (partly broken) answer.
  const answer = fs.readFileSync(path.join(__dirname, "fixtures-ask.json"), "utf8");
  const ask = await newPage({ viewport: { width: 1280, height: 860 } });
  await ask.addInitScript((json) => {
    const fake = async () => ({ text: json, truncated: false });
    fake.json = async (prompt, opts) => {
      window.__askPrompt = prompt;
      opts && opts.onText && opts.onText({ text: json, delta: json });
      return JSON.parse(json);
    };
    window.claude = { use: async (name) => (name === "sample" ? fake : null) };
  }, answer);
  await ask.goto(url + "#ask");
  await ask.fill("#ask-q", "between or among?");
  await ask.click("#ask-go");
  await ask.waitForFunction(() => location.hash.startsWith("#lesson-ask-"));
  await ask.waitForSelector("#board .board-item", { state: "attached" });
  ok((await ask.textContent("h1")).includes("BETWEEN"), "a drawn explanation opens in the player");
  ok(await ask.evaluate(() => window.__askPrompt.includes("between or among?")), "the question is sent to Claude");
  await ask.$eval("#scrub", (s) => { s.value = 1000; s.dispatchEvent(new Event("input")); });
  const fits = await ask.$eval('[data-id="s1"] text', (t) => { const b = t.getBBox(); return b.x >= 0 && b.x + b.width <= 960; });
  ok(fits, "a sentence that is too long is shrunk to fit the board");
  ok((await ask.locator("#steps button").count()) === 3, "broken actions are dropped, steps are kept");
  if (shots) await ask.screenshot({ path: `${shots}/ask.png` });
  await ask.click("#next");
  await ask.click("#next").catch(() => {});
  await ask.$eval("#scrub", (s) => { s.value = 1000; s.dispatchEvent(new Event("input")); });
  ok(await ask.isVisible("#check"), "the drawn explanation ends with a check");
  await ask.goto(url + "#ask");
  ok((await ask.locator(".asked-list li").count()) === 1, "asked explanations are kept for replay");

  ok(errors.length === 0, `no script errors${errors.length ? ": " + errors.join(" | ") : ""}`);
  await browser.close();
  console.log(failures ? `\n${failures} check(s) failed` : "\nAll browser checks passed");
  process.exit(failures ? 1 : 0);
})();
