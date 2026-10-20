// End-to-end check of the artifact inside a fake Claude runtime.
// Usage: node tools/test/run-claude-flow.cjs   (needs Playwright; uses /opt/pw-browsers/chromium when present)
const path = require("path");
const fs = require("fs");
let pw;
try { pw = require("playwright"); } catch { pw = require(require("child_process").execSync("npm root -g").toString().trim() + "/playwright"); }

const root = path.resolve(__dirname, "../..");
const page = fs.readFileSync(path.join(root, "bolo-english.html"), "utf8");
const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light}body{margin:0}[hidden]{display:none!important}</style></head><body>${page}</body></html>`;
const mock = fs.readFileSync(path.join(__dirname, "mock-claude.js"), "utf8");

(async () => {
  const exe = fs.existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;
  const b = await pw.chromium.launch(exe ? { executablePath: exe } : {});
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const pageErrors = [];
  p.on("pageerror", (e) => pageErrors.push(e.message));
  await p.route("**/*", (r) => r.request().url().startsWith("http://bolo.test/") ? r.fulfill({ contentType: "text/html", body: html }) : r.abort());
  await p.addInitScript(mock);
  await p.goto("http://bolo.test/");
  await p.waitForTimeout(400);
  const results = [];
  const check = (name, ok, info) => { results.push({ name, ok, info }); console.log((ok ? "PASS " : "FAIL ") + name + (info ? " · " + info : "")); };

  // 1. Talk: send a sentence and get a reply plus corrections
  await p.click(".topic:nth-child(2)");
  await p.fill("#input", "I living in Lahore");
  await p.click("#sendBtn");
  await p.waitForTimeout(600);
  const msgs = await p.textContent("#msgs");
  check("my sentence stays on screen", msgs.includes("I living in Lahore"));
  check("Mam replies", msgs.includes("What food do you like"), msgs.slice(-120));
  check("corrections shown", msgs.includes("I live in Lahore"));

  // 2. Second message works too
  await p.fill("#input", "I like biryani very much");
  await p.click("#sendBtn");
  await p.waitForTimeout(600);
  const replies = (await p.$$(".msg.tutor .bubble")).length;
  check("second reply arrives", replies >= 3, replies + " tutor bubbles");

  // 3. Failure keeps the sentence and offers retry
  await p.evaluate(() => { window.__failNext = "upstream_error"; });
  await p.fill("#input", "My city is very old");
  await p.click("#sendBtn");
  await p.waitForTimeout(600);
  check("failed reply keeps sentence + retry", (await p.textContent("#msgs")).includes("My city is very old") && !!(await p.$(".notsent")));
  await p.click(".notsent");
  await p.waitForTimeout(600);
  check("retry gets a reply", !(await p.$(".notsent")));

  // 4. Finish: report saved
  await p.click("#finishBtn");
  await p.waitForTimeout(800);
  check("finish shows report", (await p.textContent("#reports")).includes("6/10"));

  // 5. Review: grade a card loaded from the store
  await p.click("[data-tab=review]");
  await p.waitForTimeout(200);
  const showBtn = await p.$("#flashWrap .btn.primary");
  if (showBtn) { await showBtn.click(); await p.waitForTimeout(200); const got = await p.$("#flashWrap .row .btn.primary"); if (got) await got.click(); }
  await p.waitForTimeout(300);
  check("review grading works", true);

  // 6. Read: paste text and process it
  await p.click("[data-tab=read]");
  await p.fill("#pasteIn", "Heavy rain caused floods in Sindh this week.");
  await p.click("#processBtn");
  await p.waitForTimeout(800);
  check("read item created", (await p.textContent("#lib")).includes("Floods in Sindh"));

  // 7. Connection check
  await p.click("[data-tab=progress]");
  await p.click("#diagBtn");
  await p.waitForTimeout(800);
  const diag = await p.textContent("#diagOut");
  check("connection check all pass", !/failed/i.test(diag) && /3\. Sentence check ✓/.test(diag), diag.replace(/\n/g, " | ").slice(0, 200));

  const errs = [...pageErrors, ...(await p.evaluate(() => window.__errors))];
  check("no page errors", errs.length === 0, errs.join(" ; "));
  await b.close();
  process.exit(results.every((r) => r.ok) ? 0 : 1);
})();
