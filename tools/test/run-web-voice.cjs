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
  Object.defineProperty(navigator, "clipboard", { value: { readText: async () => window.__clip || "" }, configurable: true });
};

(async () => {
  const exe = fs.existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;
  const b = await pw.chromium.launch(exe ? { executablePath: exe } : {});
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = []; p.on("pageerror", (e) => errs.push(e.message));
  const gem = []; // what the page sent to Gemini
  let failSearch = 1; // the first search is refused, as when the newest model has no free search
  let rejectThinking = 1; // the first "thinking off" setting is refused, as some models do
  await p.addInitScript(fakes);
  await p.route("https://fonts.googleapis.com/**", (r) => r.abort());
  await p.route("https://generativelanguage.googleapis.com/**", async (r) => {
    const u = r.request().url();
    if (u.includes("/models?")) return r.fulfill({ json: { models: ["gemini-flash-latest", "gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-3.1-flash-lite-preview", "gemini-flash-lite-latest", "gemini-2.5-flash-preview-tts"].map((n) => ({ name: "models/" + n, supportedGenerationMethods: ["generateContent"] })) } });
    const body = JSON.parse(r.request().postData());
    const json = body.generationConfig.responseMimeType === "application/json";
    const prompt = body.contents.map((c) => c.parts.map((x) => x.text || "").join("")).join("\n");
    gem.push({ prompt, model: u.match(/models\/([^:]+):/)?.[1], search: !!body.tools?.some((t) => t.google_search), mime: body.generationConfig.responseMimeType || "", think: body.generationConfig.thinkingConfig || null, imgs: body.contents.flatMap((c) => c.parts).filter((x) => x.inline_data).map((x) => x.inline_data.mime_type) });
    if (body.generationConfig.thinkingConfig && rejectThinking > 0) { rejectThinking--; return r.fulfill({ status: 400, json: { error: { message: "Thinking budget is not supported for this model." } } }); }
    const check = { verdict: "fix", fixed: "I went to the market yesterday.", errors: [{ wrong: "I go to market yesterday", right: "I went to the market yesterday", why: "Use the past tense for yesterday." }], better: [{ label: "More natural", text: "Yesterday I went to the market." }, { label: "CSS interview", text: "Yesterday, I visited the local market." }] };
    if (/Use Google Search to find today/.test(prompt) && failSearch > 0) { failSearch--; return r.fulfill({ status: 429, json: { error: { message: "Quota exceeded, limit: 0, PerDay" } } }); }
    const text = /Use Google Search to find today/.test(prompt) ? "Here is the news:\n```json\n" + JSON.stringify({ items: [{ title: "New dam opens in KPK", emoji: "💧", source: "Dawn", where: "Pakistan", story: "A new dam opened today. It will give water and electricity." }, { title: "Peace talks in Geneva", emoji: "🕊️", source: "BBC", where: "World", story: "Leaders met in Geneva to talk about peace." }, { title: "Cricket team wins", emoji: "🏏", source: "The News", where: "Pakistan", story: "Pakistan won the match by five wickets." }] }) + "\n```"
      : /Below is a news story/.test(prompt) ? JSON.stringify({ title: "A new dam for Pakistan", emoji: "💧", source: "Dawn", story: "A new dam opened in KPK. It will store water for farmers and make electricity.", css: "Pakistan Affairs: water and energy.", words: [{ word: "dam", meaning: "a wall that holds back water", example: "The dam stores water." }], questions: ["Why do we need dams?", "How can we save water?"] })
      : /Help them brainstorm/.test(prompt) ? JSON.stringify({ ideas: [{ title: "Serving my country", points: ["Help people", "Fight corruption"] }, { title: "Family dream", points: ["Father's wish", "Respect"] }, { title: "Good career", points: ["Security", "Leadership"] }], words: ["public service"], plan: ["Start: …", "Reason: …", "Example: …", "End: …"] })
      : /spoke for/.test(prompt) ? JSON.stringify({ score: 6, comment: "Good start.", errors: [], better: "I want to join the civil service to serve my country.", tip: "Give an example." })
      : json && /"reply":/.test(prompt) ? JSON.stringify({ reply: "That sounds nice! What did you buy at the market?", check })
      : json
      ? JSON.stringify(check)
      : "That sounds nice! What did you buy at the market?";
    r.fulfill({ json: { candidates: [{ content: { parts: [{ text }] } }] } });
  });
  await p.goto("file://" + path.join(root, "docs/index.html")); await p.waitForTimeout(500);
  const results = [];
  const check = (name, ok, info) => { results.push(ok); console.log((ok ? "PASS " : "FAIL ") + name + (info && !ok ? " · " + info : "")); };

  check("asks for the free key on first use", (await p.textContent("#msgs")).includes("add your free Gemini key"));
  await p.click("text=Open Settings");
  check("settings show how to keep Bolo on the phone", (await p.textContent("#installSteps")).includes("Add to Home screen"));
  await p.evaluate(() => { window.__clip = " Your key: AIzaSyTEST_0123456789abcdefghijklmnopqr "; });
  await p.click("#keyPaste"); await p.waitForTimeout(400);
  const saved = await p.evaluate(() => JSON.parse(localStorage.getItem("bolo.gemini")));
  check("one tap pastes and saves the key", (await p.textContent("#keyStatus")).includes("Mam is ready") && saved.key === "AIzaSyTEST_0123456789abcdefghijklmnopqr");
  check("talking uses the fast stable Flash-Lite model; harder jobs use Flash", saved.fast === "gemini-2.5-flash-lite" && saved.model === "gemini-flash-latest", JSON.stringify(saved));
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
  const talk = gem.filter((g) => /Write Mam's next reply now/.test(g.prompt));
  check("one request per answer brings the reply and the corrections together", talk.length >= 2 && talk.every((g) => /"reply":/.test(g.prompt) && g.mime === "application/json") && !gem.some((g) => /checking one spoken answer/.test(g.prompt)));
  check("talking uses Flash-Lite with thinking off", talk.every((g) => g.model === "gemini-2.5-flash-lite") && talk[0].think?.thinkingBudget === 0);
  check("a model that refuses the thinking setting is asked again without it", talk[1].think === null && talk[talk.length - 1].think === null && (await p.evaluate(() => JSON.parse(localStorage.getItem("bolo.gemini")).think["gemini-2.5-flash-lite"])) === "none");
  await p.click(".msg.me .bubble"); await p.waitForTimeout(150);
  check("tapping my sentence: corrected sentence and other ways", (await p.textContent(".msg.me .fb")).includes("I went to the market yesterday.") && (await p.textContent(".msg.me .fb")).includes("Other ways to say it"));
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
  // newspaper: today's headlines from Google Search, then talk about one by voice
  await p.click("#topicBtn"); await p.click('#topicList .trow:has-text("Newspaper")'); await p.waitForTimeout(300);
  await p.click("text=Get today's news"); await p.waitForTimeout(600);
  check("today's headlines arrive", (await p.$$(".hl")).length === 3 && (await p.textContent("#headlines")).includes("New dam opens in KPK"));
  const hs = gem.find((g) => /Use Google Search/.test(g.prompt));
  check("headlines use Google Search (without JSON mode)", !!hs && hs.search && !hs.mime);
  check("if search is refused, it tries the older free model", gem.filter((g) => g.search).map((g) => g.model).join() === "gemini-flash-latest,gemini-2.5-flash");
  await p.click(".hl >> nth=0"); await p.waitForTimeout(700);
  check("a headline becomes a story to talk about", (await p.textContent("#topicName")).includes("A new dam for Pakistan") && (await p.textContent("#msgs")).includes("store water for farmers"));
  check("the story is made from the headline's facts", gem.some((g) => /Below is a news story/.test(g.prompt) && g.prompt.includes("A new dam opened today")));
  await p.evaluate(() => { window.__toSay.push("We need dams for water"); });
  await p.click("#orb"); await p.waitForTimeout(3600);
  check("Mam asks about the story out loud", (await p.evaluate(() => window.__spoken.join("|"))).includes("Why do we need dams?"));
  check("my spoken answer about the story is sent", (await p.textContent("#msgs")).includes("We need dams for water") && gem.some((g) => /Write Mam's next reply now/.test(g.prompt) && g.prompt.includes("store water for farmers")));
  await p.click("#orb"); await p.waitForTimeout(200);
  const before = gem.length;
  await p.click("text=📰 All news"); await p.waitForTimeout(300);
  check("headlines are kept for the day (no new search)", (await p.$$(".hl")).length === 3 && (await p.textContent("#headlines")).includes("✓ read") && !gem.slice(before).some((g) => g.search));
  await p.setInputFiles("#newsFile", { name: "shot.png", mimeType: "image/png", buffer: await p.screenshot() }); await p.waitForTimeout(1200);
  check("a screenshot goes to Gemini as a smaller picture", gem.some((g) => /Below is a news story/.test(g.prompt) && g.imgs.length === 1 && g.imgs[0] === "image/jpeg"));
  await p.evaluate(() => localStorage.setItem("bolo.gemini", JSON.stringify({ key: "AIzaSyTEST_0123456789abcdefghijklmnopqr", model: "gemini-flash-latest" })));
  await p.reload(); await p.waitForTimeout(800);
  check("a key saved by the old version gets the fast model too", (await p.evaluate(() => JSON.parse(localStorage.getItem("bolo.gemini")).fast)) === "gemini-2.5-flash-lite");
  check("no page errors", errs.length === 0, errs.join(";"));
  await b.close();
  const failed = results.filter((x) => !x).length;
  console.log(`\n${results.length - failed}/${results.length} passed`);
  process.exit(failed ? 1 : 0);
})();
