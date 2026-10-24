// Checks the web version of Likho English (docs/likho/index.html) with Gemini: the key shared with Bolo English,
// checking, a fix judged by the fast model, a photo of handwriting and dictation (fake microphone).
// Usage: node tools/build-web.mjs && node tools/test/run-likho-web.cjs
const path = require("path");
const fs = require("fs");
let pw;
try { pw = require("playwright"); } catch { pw = require(require("child_process").execSync("npm root -g").toString().trim() + "/playwright"); }
const root = path.resolve(__dirname, "../..");
const KEY = { key: "AIzaSyTEST_0123456789abcdefghijklmnopqr", model: "gemini-flash-latest", fast: "gemini-2.5-flash-lite" };

const fakes = () => {
  window.__toSay = ["I went to the market with my brother"];
  class FakeSR {
    start() { const phrase = window.__toSay.shift(); this._t = setTimeout(() => { if (phrase) this.onresult?.({ results: [[{ transcript: phrase }]] }); }, 150); }
    stop() { clearTimeout(this._t); setTimeout(() => this.onend?.(), 10); }
    abort() { this.stop(); }
  }
  window.webkitSpeechRecognition = FakeSR; window.SpeechRecognition = FakeSR;
};

(async () => {
  const exe = fs.existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;
  const b = await pw.chromium.launch(exe ? { executablePath: exe } : {});
  const results = [];
  const check = (name, ok, info) => { results.push(ok); console.log((ok ? "PASS " : "FAIL ") + name + (info && !ok ? " · " + info : "")); };
  const url = "file://" + path.join(root, "docs/likho/index.html");
  const errs = [];

  // without a key
  const ctx0 = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p0 = await ctx0.newPage(); p0.on("pageerror", (e) => errs.push(e.message));
  await p0.route("https://fonts.googleapis.com/**", (r) => r.abort());
  await p0.goto(url); await p0.waitForTimeout(500);
  check("without a key: Mam asks for the free key once", (await p0.textContent("#homeStatus")).includes("add your free Gemini key"));
  await p0.click("text=Open Settings");
  check("settings: the key (shared with Bolo) and how to keep Likho on the phone", (await p0.textContent("#keyBox")).includes("If you added it in Bolo English") && (await p0.textContent("#installSteps")).includes("Likho") && (await p0.getAttribute("#boloLink", "href")) === "../");
  await ctx0.close();

  // with the key Bolo English saved on this phone
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage(); p.on("pageerror", (e) => errs.push(e.message));
  await p.addInitScript((k) => { if (!localStorage.getItem("bolo.gemini")) localStorage.setItem("bolo.gemini", JSON.stringify(k)); }, KEY);
  await p.addInitScript(fakes);
  await p.route("https://fonts.googleapis.com/**", (r) => r.abort());
  const gem = [];
  await p.route("https://generativelanguage.googleapis.com/**", async (r) => {
    const u = r.request().url(), body = JSON.parse(r.request().postData());
    const prompt = body.contents.map((c) => c.parts.map((x) => x.text || "").join("")).join("\n");
    gem.push({ prompt, model: u.match(/models\/([^:]+):/)?.[1], mime: body.generationConfig.responseMimeType || "", think: body.generationConfig.thinkingConfig || null, imgs: body.contents.flatMap((c) => c.parts).filter((x) => x.inline_data).map((x) => x.inline_data.mime_type) });
    const text = /checking writing by a learner/.test(prompt) ? JSON.stringify({ score: 5, areas: { task: 6, organisation: 5, grammar: 4, vocabulary: 5 }, mistakes: [{ wrong: "I go to market", right: "I went to the market", hint: "When did it happen?", why: "Use the past tense.", type: "tense" }], good: ["Clear ideas."], next: ["Add an example."], better: "Yesterday I went to the market with my brother." })
      : /is correcting one mistake/.test(prompt) ? JSON.stringify({ ok: false, note: "Use the past tense." })
      : /These are photos of handwriting/.test(prompt) ? JSON.stringify({ text: "I like my city.", unclear: [], handwriting: "Your handwriting is easy to read." })
      : "{}";
    r.fulfill({ json: { candidates: [{ content: { parts: [{ text }] } }] } });
  });
  await p.goto(url); await p.waitForTimeout(500);
  check("the key saved in Bolo English works here too: no key needed", !(await p.textContent("#homeStatus")).includes("Gemini key"));
  await p.click('.list .trow:has-text("2. Sentences")'); await p.waitForTimeout(200);
  await p.click('.list .trow:has-text("Past simple")'); await p.waitForTimeout(200);
  await p.click("text=✍️ Start writing"); await p.waitForTimeout(300);
  await p.click("#dictBtn"); await p.waitForTimeout(500);
  check("🎙️ Speak writes what I say into the answer sheet", (await p.inputValue("#draft")) === "I went to the market with my brother");
  await p.click("#dictBtn"); await p.waitForTimeout(100);
  await p.fill("#draft", "Yesterday I go to market. I buy some mangoes. Then I come back home. It was a nice day.");
  await p.click("#checkBtn"); await p.waitForTimeout(700);
  const ck = gem.find((g) => /checking writing by a learner/.test(g.prompt));
  check("checking uses Flash with JSON answers", !!ck && ck.model === "gemini-flash-latest" && ck.mime === "application/json" && !ck.think);
  check("the marks and the mistake to fix arrive", (await p.textContent(".score")) === "5/10" && (await p.$$("mark.mk")).length === 1);
  await p.fill("#fixIn0", "I goed to market"); await p.click('#fix0 button:has-text("Check")'); await p.waitForTimeout(500);
  const jd = gem.find((g) => /is correcting one mistake/.test(g.prompt));
  check("a fix is judged by the fast Flash-Lite model with thinking off", !!jd && jd.model === "gemini-2.5-flash-lite" && jd.think?.thinkingBudget === 0 && (await p.textContent("#fix0 .fout")).includes("Not yet. Use the past tense."));
  const png = await p.screenshot({ clip: { x: 0, y: 0, width: 120, height: 120 } });
  await p.setInputFiles("#photoIn", { name: "page.png", mimeType: "image/png", buffer: png }); await p.waitForTimeout(800);
  const hw = gem.find((g) => /These are photos of handwriting/.test(g.prompt));
  check("a photo of handwriting goes to Gemini as a smaller JPEG", !!hw && hw.imgs.length === 1 && hw.imgs[0] === "image/jpeg" && (await p.inputValue("#draft")).endsWith("I like my city."));
  check("everything is kept on this phone", await p.evaluate(() => JSON.parse(localStorage.getItem("likho.v1")).pieces.some((x) => x.task.title === "Past simple" && x.lesson === "past-simple" && x.drafts.length === 1)));
  check("no page errors", errs.length === 0, errs.join(" ; "));
  await b.close();
  const failed = results.filter((x) => !x).length;
  console.log(`\n${results.length - failed}/${results.length} passed`);
  process.exit(failed ? 1 : 0);
})();
