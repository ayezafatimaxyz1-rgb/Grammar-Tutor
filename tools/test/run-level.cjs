// Level-up and fluency graph checks with seeded practice history.
// Usage: node tools/test/run-level.cjs
const path = require("path");
const fs = require("fs");
let pw;
try { pw = require("playwright"); } catch { pw = require(require("child_process").execSync("npm root -g").toString().trim() + "/playwright"); }
const root = path.resolve(__dirname, "../..");
const page = fs.readFileSync(path.join(root, "bolo-english.html"), "utf8");
const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light}body{margin:0}[hidden]{display:none!important}</style></head><body>${page}</body></html>`;
const mock = fs.readFileSync(path.join(__dirname, "mock-claude.js"), "utf8");

function seed(qualify) {
  const now = Date.now(), D = 86400000;
  const turns = [{ role: "assistant", content: "Tell me about your city.", at: now - 6 * D }];
  for (let i = 0; i < 15; i++) {
    turns.push({ role: "user", content: qualify ? "My city is very old and it has many beautiful places to visit" : "Yes good", at: now - (6 - Math.floor(i / 3)) * D, fb: { verdict: "great", errors: [], better: [] } });
    turns.push({ role: "assistant", content: "Nice. Why do you like it?", at: now - (6 - Math.floor(i / 3)) * D });
  }
  const attempts = [60, 70, 80, 95].map((w, i) => ({ at: now - (4 - i) * D, text: "x", secs: 60, words: w, wpm: w, fillers: 2, repeats: 0, result: { score: 6 + i * 0.5, comment: "", errors: [], better: "", tip: "" } }));
  return {
    "data/users/u_test": {
      meta: { sessions: [], days: {}, settings: { voice: true, goal: 10 } },
      chat_t1: { id: "t1", kind: "talk", topic: { id: "city", em: "🏙️", name: "My city", desc: "", open: "Tell me about your city.", kind: "talk" }, started: now - 6 * D, updated: now - 2 * D, turns, words: 150, min: 10, newCards: 0, report: { score: 7, date: now - 3 * D } },
      chat_t2: { id: "t2", kind: "talk", topic: { id: "family", em: "👨‍👩‍👧", name: "My family", desc: "", open: "Tell me about your family.", kind: "talk" }, started: now - 2 * D, updated: now - 2 * D, turns: [{ role: "assistant", content: "Tell me about your family." }], words: 0, min: 0, newCards: 0, report: { score: 7, date: now - 2 * D } },
      chat_m1: { id: "m1", kind: "minute", topic: { em: "⏱️", name: "Tell us about yourself." }, started: now - 4 * D, updated: now - D, attempts, words: 305, min: 4 },
    },
    library: {},
  };
}
(async () => {
  const exe = fs.existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;
  const b = await pw.chromium.launch(exe ? { executablePath: exe } : {});
  const results = [];
  const check = (name, ok, info) => { results.push(ok); console.log((ok ? "PASS " : "FAIL ") + name + (info && !ok ? " · " + info : "")); };
  async function open(qualify) {
    const p = await b.newPage({ viewport: { width: 390, height: 844 } });
    const errs = []; p.on("pageerror", (e) => errs.push(e.message));
    await p.route("**/*", (r) => r.request().url().startsWith("http://bolo.test/") ? r.fulfill({ contentType: "text/html", body: html }) : r.abort());
    await p.addInitScript(`window.__seed = ${JSON.stringify(seed(qualify))};`);
    await p.addInitScript(mock);
    await p.goto("http://bolo.test/"); await p.waitForTimeout(700);
    return { p, errs };
  }
  // 1. Not ready: stays A1, card shows what is missing, graph draws
  let { p, errs } = await open(false);
  check("starts at A1", (await p.textContent("#lvChip")) === "A1");
  await p.click("[data-tab=history]"); await p.waitForTimeout(300);
  const card = await p.textContent("#levelCard");
  check("level card shows goals for A2", card.includes("Next: A2") && card.includes("Words per answer") && card.includes("Answers with no mistakes"));
  check("speed chart drawn with 4 days", (await p.$$("#fluChart circle")).length === 4);
  check("speed tile shows improvement", (await p.textContent("#fluTiles")).includes("since you started"));
  await p.click("#fluSeg button[data-m=length]"); await p.waitForTimeout(200);
  check("answer length chart drawn", (await p.$$("#fluChart circle")).length >= 2);
  await p.click("#fluSeg button[data-m=score]"); await p.waitForTimeout(200);
  check("score chart drawn", (await p.$$("#fluChart circle")).length >= 2);
  const box = await p.$("#fluChart svg"); await box.scrollIntoViewIfNeeded(); const bb = await box.boundingBox();
  await p.mouse.move(bb.x + bb.width * 0.6, bb.y + 60); await p.waitForTimeout(100);
  check("hover shows a tooltip", !(await p.isHidden(".ctip")));
  check("table view lists days", (await p.$$("#fluTable tr")).length >= 3);
  await p.screenshot({ path: path.join(root, ".test-level.png"), fullPage: false }).catch(() => {});
  check("no page errors (A1)", errs.length === 0, errs.join(";"));
  await p.close();
  // 2. Ready: moves up to A2 and Mam's prompt changes
  ({ p, errs } = await open(true));
  await p.waitForTimeout(300);
  check("levels up to A2 when every goal is met", (await p.textContent("#lvChip")) === "A2");
  check("level-up message shown", (await p.textContent("#toast")).includes("Level up"));
  await p.click(".topic:nth-child(2)"); await p.fill("#input", "My name is Ali"); await p.click("#sendBtn"); await p.waitForTimeout(800);
  const calls = await p.evaluate(() => window.__calls.map((c) => c.prompt));
  check("Mam now speaks at A2", calls.some((c) => c.includes("CEFR A2")), calls[0]?.slice(0, 200));
  await p.click("[data-tab=history]"); await p.waitForTimeout(300);
  check("A2 card shows the B1 goals including speed", (await p.textContent("#levelCard")).includes("Speaking speed"));
  await p.selectOption("#lvSel", "B1"); await p.waitForTimeout(200);
  check("level can be set by hand", (await p.textContent("#lvChip")) === "B1");
  check("no page errors (A2)", errs.length === 0, errs.join(";"));
  await b.close();
  const failed = results.filter((x) => !x).length;
  console.log(`\n${results.length - failed}/${results.length} passed`);
  process.exit(failed ? 1 : 0);
})();
