// Checks the voice version (docs/index.html): Gemini key setup and the hands-free talk loop,
// with a fake microphone (speech recognition) and a fake voice (speech synthesis).
// Usage: node tools/build-web.mjs && node tools/test/run-web-voice.cjs
const path = require("path");
const fs = require("fs");
let pw;
try { pw = require("playwright"); } catch { pw = require(require("child_process").execSync("npm root -g").toString().trim() + "/playwright"); }
const root = path.resolve(__dirname, "../..");

const fakes = () => {
  // Each recogniser "hears" the next phrase in window.__toSay, then goes quiet (the app sends after a pause).
  window.__toSay = ["I go to market yesterday", "I bought some mangoes"];
  window.__heard = 0; window.__spoken = [];
  class FakeSR {
    start() { const phrase = window.__toSay.shift(); this._t = setTimeout(() => { if (phrase) { window.__heard++; this.onresult?.({ results: [[{ transcript: phrase }]] }); } }, 200); }
    stop() { clearTimeout(this._t); setTimeout(() => this.onend?.(), 10); }
    abort() { clearTimeout(this._t); setTimeout(() => this.onend?.(), 10); }
  }
  window.webkitSpeechRecognition = FakeSR; window.SpeechRecognition = FakeSR;
  const synth = { speaking: false, _u: null, getVoices: () => [], onvoiceschanged: null,
    speak(u) { this._u = u; if (u.text.trim()) window.__spoken.push(u.text); setTimeout(() => { if (this._u === u) { this._u = null; u.onend?.(); } }, 150); },
    cancel() { const u = this._u; this._u = null; if (u) u.onerror?.({ error: "interrupted" }); } };
  Object.defineProperty(window, "speechSynthesis", { value: synth, configurable: true });
  window.SpeechSynthesisUtterance = function (t) { this.text = t; };
};

(async () => {
  const exe = fs.existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;
  const b = await pw.chromium.launch(exe ? { executablePath: exe } : {});
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = []; p.on("pageerror", (e) => errs.push(e.message));
  await p.addInitScript(fakes);
  await p.route("https://fonts.googleapis.com/**", (r) => r.abort());
  await p.route("https://generativelanguage.googleapis.com/**", async (r) => {
    const u = r.request().url();
    if (u.includes("/models?")) return r.fulfill({ json: { models: [{ name: "models/gemini-flash-latest", supportedGenerationMethods: ["generateContent"] }] } });
    const body = JSON.parse(r.request().postData());
    const json = body.generationConfig.responseMimeType === "application/json";
    const prompt = body.contents.map((c) => c.parts.map((x) => x.text || "").join("")).join("\n");
    const text = /Help them brainstorm/.test(prompt) ? JSON.stringify({ ideas: [{ title: "Serving my country", points: ["Help people", "Fight corruption"] }, { title: "Family dream", points: ["Father's wish", "Respect"] }, { title: "Good career", points: ["Security", "Leadership"] }], words: ["public service"], plan: ["Start: …", "Reason: …", "Example: …", "End: …"] })
      : /spoke for/.test(prompt) ? JSON.stringify({ score: 6, comment: "Good start.", errors: [], better: "I want to join the civil service to serve my country.", tip: "Give an example." })
      : json
      ? JSON.stringify({ verdict: "fix", errors: [{ wrong: "I go to market yesterday", right: "I went to the market yesterday", why: "Use the past tense for yesterday." }], better: [{ label: "More natural", text: "Yesterday I went to the market." }, { label: "CSS interview", text: "Yesterday, I visited the local market." }] })
      : "That sounds nice! What did you buy at the market?";
    r.fulfill({ json: { candidates: [{ content: { parts: [{ text }] } }] } });
  });
  await p.goto("file://" + path.join(root, "docs/index.html")); await p.waitForTimeout(500);
  const results = [];
  const check = (name, ok, info) => { results.push(ok); console.log((ok ? "PASS " : "FAIL ") + name + (info && !ok ? " · " + info : "")); };

  check("asks for the free key on first use", (await p.textContent("#msgs")).includes("add your free Gemini key"));
  await p.click("text=Open Settings"); await p.fill("#keyIn", "AIzaTEST"); await p.click("#keySave"); await p.waitForTimeout(400);
  check("key saved", (await p.textContent("#keyStatus")).includes("Mam is ready"));
  await p.click("#setSheet [data-close].btn.primary");
  check("voice version: big talk button, no typing box", !(await p.isHidden("#orb")) && (await p.isHidden("#typeRow")));

  await p.click("#orb"); await p.waitForTimeout(3600);
  const m1 = await p.textContent("#msgs");
  check("Mam asks her question out loud first", (await p.evaluate(() => window.__spoken[0] || "")).includes("What would you like to talk about"));
  check("what I said is sent after a pause", m1.includes("I go to market yesterday"));
  check("Mam answers", m1.includes("What did you buy at the market"));
  check("Mam's answer is spoken", (await p.evaluate(() => window.__spoken.join("|"))).includes("What did you buy"));
  await p.waitForTimeout(3000);
  const m2 = await p.textContent("#msgs");
  check("it listens again by itself (second answer sent)", m2.includes("I bought some mangoes"));
  check("corrections folded under my sentence", (await p.textContent(".msg.me .verdict")).includes("mistake"));
  await p.click("#orb"); await p.waitForTimeout(300); // pause
  const st = await p.textContent("#state");
  check("tapping the button pauses", /Tap the button|Mam is/.test(st), st);
  await p.click("#typeBtn");
  check("typing is one tap away", !(await p.isHidden("#typeRow")));
  // 1-minute challenge by voice
  await p.evaluate(() => { window.__toSay.push("I want to join the civil service because I love my country"); });
  await p.click("#topicBtn"); await p.click('#topicList .trow:has-text("1-minute challenge")'); await p.waitForTimeout(600);
  check("challenge: brainstorm ideas shown", (await p.$$(".idea")).length === 3);
  await p.click("#orb"); await p.waitForTimeout(800);
  check("challenge: my spoken words fill the answer", (await p.inputValue("#minIn")).includes("civil service"));
  await p.click("#orb"); await p.waitForTimeout(900);
  check("challenge: result after finishing", (await p.textContent("#minResult")).includes("words / min"));
  check("no page errors", errs.length === 0, errs.join(";"));
  await b.close();
  const failed = results.filter((x) => !x).length;
  console.log(`\n${results.length - failed}/${results.length} passed`);
  process.exit(failed ? 1 : 0);
})();
