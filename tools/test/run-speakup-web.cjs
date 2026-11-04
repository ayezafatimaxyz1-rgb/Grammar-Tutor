// Browser checks for the web version of Speak Up Daily (docs/speakup/index.html): Home Screen files, the microphone
// (Pakistani English first), and the coach and the test grading on the Gemini key shared with Bolo and Likho.
// Usage: node tools/build-web.mjs && node tools/test/run-speakup-web.cjs
const path = require("path");
const fs = require("fs");
let pw;
try { pw = require("playwright"); } catch { pw = require(require("child_process").execSync("npm root -g").toString().trim() + "/playwright"); }
const root = path.resolve(__dirname, "../..");
const url = "file://" + path.join(root, "docs/speakup/index.html");
const KEY_TEXT = "AIzaSyTEST_0123456789abcdefghijklmnopqr";

const fakes = () => {
  // each recogniser "hears" the next phrase in window.__toSay, then ends; en-PK can be refused, as on some phones
  window.__toSay = []; window.__langs = []; window.__spoken = [];
  class FakeSR {
    start() {
      window.__langs.push(this.lang);
      if (window.__noPK && this.lang === "en-PK") { setTimeout(() => { this.onerror?.({ error: "language-not-supported" }); this.onend?.(); }, 20); return; }
      const phrase = window.__toSay.shift();
      this._t = setTimeout(() => { if (phrase) this.onresult?.({ resultIndex: 0, results: [Object.assign([{ transcript: phrase }], { isFinal: true })] }); setTimeout(() => this.onend?.(), 30); }, 120);
    }
    stop() { clearTimeout(this._t); setTimeout(() => this.onend?.(), 10); }
    abort() { this.stop(); }
  }
  window.SpeechRecognition = window.webkitSpeechRecognition = FakeSR;
  const synth = { getVoices: () => [], onvoiceschanged: null, speak(u) { window.__spoken.push(u.text); }, cancel() {} };
  Object.defineProperty(window, "speechSynthesis", { value: synth, configurable: true });
  window.SpeechSynthesisUtterance = function (t) { this.text = t; };
  Object.defineProperty(navigator, "clipboard", { value: { readText: async () => window.__clip || "" }, configurable: true });
};

(async () => {
  const exe = fs.existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;
  const b = await pw.chromium.launch(exe ? { executablePath: exe } : {});
  const results = [], errs = [];
  const check = (name, ok, info) => { results.push(ok); console.log((ok ? "PASS " : "FAIL ") + name + (info && !ok ? " · " + info : "")); };
  const gem = [];
  const gemini = async (r) => {
    const u = r.request().url();
    if (u.includes("/models?")) return r.fulfill({ json: { models: ["gemini-flash-latest", "gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-3-flash-preview"].map((n) => ({ name: "models/" + n, supportedGenerationMethods: ["generateContent"] })) } });
    const body = JSON.parse(r.request().postData());
    const prompt = body.contents.map((c) => c.parts.map((x) => x.text || "").join("")).join("\n");
    gem.push({ prompt, model: u.match(/models\/([^:]+):/)?.[1], mime: body.generationConfig.responseMimeType || "", think: body.generationConfig.thinkingConfig || null, roles: body.contents.map((c) => c.role).join(","), key: r.request().headers()["x-goog-api-key"] });
    const text = /speaking examiner/.test(prompt) ? JSON.stringify({ fluency: 7, grammar: 6, vocabulary: 7, task: 8, good: "You gave clear facts about yourself.", fix: "I am living in Multan → I live in Multan", better: "I'm Aiza, and I live in Multan.", next: "Add one interesting fact." })
      : "Reply: Nice to meet you, Aiza! Where are you from?\nBetter way to say it: Hi, I'm Aiza.\nTip: Say I'm instead of I am in friendly talk.";
    r.fulfill({ json: { candidates: [{ content: { parts: [{ text }] } }] } });
  };
  const open = async (key) => {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
    const p = await ctx.newPage(); p.on("pageerror", (e) => errs.push(e.message));
    if (key) await p.addInitScript((k) => { if (!localStorage.getItem("bolo.gemini")) localStorage.setItem("bolo.gemini", JSON.stringify(k)); }, key);
    await p.addInitScript(fakes);
    await p.route("https://fonts.googleapis.com/**", (r) => r.abort());
    await p.route("https://generativelanguage.googleapis.com/**", gemini);
    await p.goto(url); await p.waitForTimeout(500);
    return { ctx, p };
  };

  // the files that put it on the Home Screen
  const html = fs.readFileSync(path.join(root, "docs/speakup/index.html"), "utf8");
  const man = JSON.parse(fs.readFileSync(path.join(root, "docs/speakup/manifest.webmanifest"), "utf8"));
  const manIOS = JSON.parse(fs.readFileSync(path.join(root, "docs/speakup/manifest-ios.webmanifest"), "utf8"));
  check("Home Screen: a manifest, an icon for iPhone and the app's name", html.includes('rel="manifest"') && html.includes('rel="apple-touch-icon"') && html.includes('content="Speak Up Daily"') && man.name === "Speak Up Daily" && man.short_name === "Speak Up" && man.display === "standalone" && ["icon-192.png", "icon-512.png", "apple-touch-icon.png"].every((f) => fs.existsSync(path.join(root, "docs/speakup", f))));
  check("on iPhone the icon opens in Safari, where the microphone works", manIOS.display === "browser" && html.includes("manifest-ios.webmanifest"));

  // with the key Bolo or Likho saved on this phone (an older choice of models)
  let { ctx, p } = await open({ key: KEY_TEXT, model: "gemini-flash-latest", fast: "gemini-2.5-flash-lite" });
  await p.waitForTimeout(300);
  const kept = await p.evaluate(() => JSON.parse(localStorage.getItem("bolo.gemini")));
  check("the shared key gets the newest stable models, like in Bolo and Likho", kept.key === KEY_TEXT && kept.model === "gemini-2.5-flash" && kept.v === 2);
  // practice: say a phrase
  await p.click('nav.tabs [data-tab="practice"]'); await p.waitForTimeout(200);
  const phrase = await p.textContent("#phText");
  await p.evaluate((t) => window.__toSay.push(t), phrase);
  await p.click("#phRec"); await p.waitForTimeout(600);
  check("Speak: the phone listens for Pakistani English and scores the phrase", (await p.evaluate(() => window.__langs.join())) === "en-PK" && (await p.textContent("#phScore")) === "100%", await p.evaluate(() => window.__langs.join()));
  // a phone without Pakistani English
  await p.evaluate((t) => { window.__noPK = true; window.__langs = []; window.__toSay.push(t); }, phrase);
  await p.click("#phRec"); await p.waitForTimeout(700);
  check("a phone without Pakistani English listens with Indian English at once, and remembers it", (await p.evaluate(() => window.__langs.join())) === "en-PK,en-IN" && (await p.textContent("#phScore")) === "100%" && (await p.evaluate(() => JSON.parse(localStorage.getItem("su_set")).noPK)) === true);
  await p.evaluate(() => { window.__noPK = false; });
  // the coach: speak a reply, send it
  await p.click('nav.tabs [data-tab="coach"]'); await p.waitForTimeout(200);
  await p.evaluate(() => { window.__langs = []; window.__toSay.push("Hi I am Aiza"); });
  await p.click("#freeChat [data-r]"); await p.waitForTimeout(600);
  check("the coach's Speak writes what I said into the box", (await p.inputValue("#freeChat [data-m]")) === "Hi I am Aiza" && (await p.evaluate(() => window.__langs.join())) === "en-IN");
  await p.click("#freeChat [data-s]"); await p.waitForTimeout(500);
  const cc = gem.find((g) => /English speaking coach/.test(g.prompt));
  check("the coach answers with the fast Flash-Lite model on my own key", !!cc && cc.model === "gemini-2.5-flash-lite" && cc.key === KEY_TEXT && cc.think?.thinkingBudget === 0 && cc.roles.split(",").at(-1) === "user" && (await p.textContent("#freeChat [data-c]")).includes("Where are you from?"));
  check("and the coach's reply is spoken aloud", (await p.evaluate(() => window.__spoken.join("|"))).includes("Nice to meet you, Aiza! Where are you from?"));
  // the weekly test, graded by Flash
  await p.evaluate(() => { const pr = JSON.parse(localStorage.getItem("su_prog") || "{}"); pr.done = { w1learn: 1, w1words: 1, w1sounds: 1, w1speak: 1, w1talk: 1 }; pr.placed = true; localStorage.setItem("su_prog", JSON.stringify(pr)); });
  await p.reload(); await p.waitForTimeout(500);
  await p.click('nav.tabs [data-tab="tests"]'); await p.waitForTimeout(200);
  await p.click('#testList [data-start="5"]'); await p.waitForTimeout(300);
  await p.fill("[data-ans]", "Hello everyone, my name is Aiza and I am living in Multan. I studied English literature and I love reading novels in my free time.");
  await p.click("[data-g]"); await p.waitForTimeout(700);
  const gr = gem.find((g) => /speaking examiner/.test(g.prompt));
  check("the weekly test is graded by Flash, thinking a little, with JSON", !!gr && gr.model === "gemini-2.5-flash" && gr.mime === "application/json" && gr.think?.thinkingBudget === 1024 && (await p.textContent("#lessonBody")).includes("Passed!") && (await p.textContent("#lessonBody")).includes("I live in Multan"));
  // settings
  await p.click("#setBtn"); await p.waitForTimeout(200);
  const st = await p.textContent("#v-settings");
  check("⚙ Settings: Home Screen steps, the accent, the key and the other apps", st.includes("Keep Speak Up on your Home Screen") && st.includes("Add to Home screen") && (await p.inputValue("#accentSel")) === "en-PK" && st.includes("does not offer Pakistani English") && st.includes("Key saved ✓") && (await p.getAttribute("#boloLink", "href")) === "../" && (await p.getAttribute("#likhoLink", "href")) === "../likho/" && await p.isHidden("#setClaude"));
  await p.evaluate(() => { window.__langs = []; window.__toSay.push("testing one two three"); });
  await p.click("#micTest"); await p.waitForTimeout(600);
  check("Test the microphone shows what the phone heard", (await p.textContent("#micHeard")).includes("testing one two three"));
  await p.selectOption("#accentSel", "en-GB"); await p.waitForTimeout(100);
  await p.evaluate((t) => { window.__langs = []; window.__toSay.push(t); }, phrase);
  await p.click('nav.tabs [data-tab="practice"]'); await p.click("#phRec"); await p.waitForTimeout(600);
  check("the accent I choose is used", (await p.evaluate(() => window.__langs.join())) === "en-GB");
  await ctx.close();

  // without a key
  ({ ctx, p } = await open(null));
  await p.click('nav.tabs [data-tab="coach"]'); await p.waitForTimeout(100);
  await p.fill("#freeChat [data-m]", "Hello"); await p.click("#freeChat [data-s]"); await p.waitForTimeout(200);
  check("without a key, the coach says where to add it", (await p.textContent("#freeChat [data-c]")).includes("add your free Gemini key in ⚙ Settings"));
  await p.click("#setBtn"); await p.waitForTimeout(100);
  check("Settings says there is no key yet", (await p.textContent("#keyStatus")).includes("No key yet"));
  await p.evaluate((k) => { window.__clip = " my key: " + k + " "; }, KEY_TEXT);
  await p.click("#keyPaste"); await p.waitForTimeout(500);
  const saved = await p.evaluate(() => JSON.parse(localStorage.getItem("bolo.gemini")));
  check("Paste my key checks it with Google and saves it on this phone only", saved?.key === KEY_TEXT && saved.fast === "gemini-2.5-flash-lite" && (await p.textContent("#keyStatus")).includes("Key saved ✓"));
  await p.click('nav.tabs [data-tab="coach"]'); await p.fill("#freeChat [data-m]", "Hello again"); await p.click("#freeChat [data-s]"); await p.waitForTimeout(500);
  check("then the coach works at once", (await p.textContent("#freeChat [data-c]")).includes("Where are you from?"));
  await ctx.close();

  check("no page errors", errs.length === 0, errs.join(" ; "));
  await b.close();
  const failed = results.filter((x) => !x).length;
  console.log(`\n${results.length - failed}/${results.length} passed`);
  process.exit(failed ? 1 : 0);
})();
