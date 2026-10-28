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
  window.__heard = 0; window.__spoken = []; window.__langs = [];
  class FakeSR {
    start() { window.__langs.push(this.lang); if (window.__noPK && this.lang === "en-PK") { setTimeout(() => { this.onerror?.({ error: "language-not-supported" }); this.onend?.(); }, 20); return; } const phrase = window.__toSay.shift(); this._t = setTimeout(() => { if (phrase) { window.__heard++; this.onresult?.({ results: [[{ transcript: phrase }]] }); } }, 200); }
    stop() { clearTimeout(this._t); setTimeout(() => this.onend?.(), 10); }
    abort() { clearTimeout(this._t); setTimeout(() => this.onend?.(), 10); }
  }
  window.webkitSpeechRecognition = FakeSR; window.SpeechRecognition = FakeSR;
  const synth = { speaking: false, _u: null, getVoices: () => [], onvoiceschanged: null,
    speak(u) { this._u = u; if (u.text.trim()) window.__spoken.push(u.text); setTimeout(() => { if (this._u === u) { this._u = null; u.onend?.(); } }, 150); },
    cancel() { const u = this._u; this._u = null; if (u) u.onerror?.({ error: "interrupted" }); } };
  Object.defineProperty(window, "speechSynthesis", { value: synth, configurable: true });
  window.SpeechSynthesisUtterance = function (t) { this.text = t; };
  Object.defineProperty(document, "hidden", { configurable: true, get: () => !!window.__hidden });
  Object.defineProperty(document, "visibilityState", { configurable: true, get: () => (window.__hidden ? "hidden" : "visible") });
  window.__setHidden = (h) => { window.__hidden = h; document.dispatchEvent(new Event("visibilitychange")); };
  // a fake microphone: silence, then 1.2 seconds of "speech" (a tone), then silence
  if (!navigator.mediaDevices) Object.defineProperty(navigator, "mediaDevices", { value: {}, configurable: true });
  navigator.mediaDevices.getUserMedia = async () => {
    if (!window.__mic) throw new DOMException("No microphone in this test", "NotAllowedError");
    const ctx = new AudioContext(); await ctx.resume();
    const osc = ctx.createOscillator(), g = ctx.createGain(), dst = ctx.createMediaStreamDestination(), t = ctx.currentTime;
    osc.frequency.value = 220; osc.connect(g); g.connect(dst); osc.start();
    g.gain.setValueAtTime(0, t); g.gain.setValueAtTime(0.4, t + 0.4); g.gain.setValueAtTime(0, t + 1.6);
    window.__gum = (window.__gum || 0) + 1;
    return dst.stream;
  };
  Object.defineProperty(navigator, "clipboard", { value: { readText: async () => window.__clip || "" }, configurable: true });
};

(async () => {
  const exe = fs.existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;
  const b = await pw.chromium.launch({ ...(exe ? { executablePath: exe } : {}), args: ["--autoplay-policy=no-user-gesture-required"] });
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = []; p.on("pageerror", (e) => errs.push(e.message));
  const gem = []; // what the page sent to Gemini
  let failSearch = 1; // the first search is refused, as when the newest model has no free search
  let rejectThinking = 1; // the first "thinking off" setting is refused, as some models do
  const heardQueue = ["I like reading books about history", ""]; // what Mam's ears write down from each recording (then no words)
  let reciteNext = 0; // Google refuses to copy the next story word for word ("recitation")
  let hold = null; // while set, Mam's reply waits (to test a reply that arrives while the learner is in another app)
  await p.addInitScript(fakes);
  await p.route("https://fonts.googleapis.com/**", (r) => r.abort());
  // what the news robot saves (news.json on the gh-pages branch)
  const robot = { updated: Date.now() - 2 * 3600000, sources: ["Dawn", "BBC News"], items: [
    { t: "Senate passes new water bill", s: "The bill aims to build small dams in every province.", u: "https://www.dawn.com/news/111", src: "Dawn", w: "Pakistan", at: Date.now() - 3600000 },
    { t: "Wheat prices fall in Punjab", s: "A good harvest has lowered flour prices.", u: "https://www.dawn.com/news/112", src: "Dawn", w: "Pakistan", at: Date.now() - 7200000 },
    { t: "Climate talks open in Geneva", s: "Leaders discuss funding for poor countries.", u: "https://www.bbc.com/news/1", src: "BBC News", w: "World", at: Date.now() - 5400000 },
  ] };
  let robotCalls = 0;
  await p.route("https://raw.githubusercontent.com/**", (r) => { robotCalls++; return r.fulfill({ json: robot, headers: { "access-control-allow-origin": "*" } }); });
  await p.route("https://generativelanguage.googleapis.com/**", async (r) => {
    const u = r.request().url();
    if (u.includes("/models?")) return r.fulfill({ json: { models: ["gemini-flash-latest", "gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-3.1-flash-lite-preview", "gemini-flash-lite-latest", "gemini-2.5-flash-preview-tts"].map((n) => ({ name: "models/" + n, supportedGenerationMethods: ["generateContent"] })) } });
    const body = JSON.parse(r.request().postData());
    const json = body.generationConfig.responseMimeType === "application/json";
    const prompt = body.contents.map((c) => c.parts.map((x) => x.text || "").join("")).join("\n");
    gem.push({ prompt, model: u.match(/models\/([^:]+):/)?.[1], search: !!body.tools?.some((t) => t.google_search), mime: body.generationConfig.responseMimeType || "", think: body.generationConfig.thinkingConfig || null, temp: body.generationConfig.temperature, wav: body.contents.flatMap((c) => c.parts).filter((x) => x.inline_data?.mime_type === "audio/wav").map((x) => Buffer.from(x.inline_data.data, "base64"))[0] || null, imgs: body.contents.flatMap((c) => c.parts).filter((x) => x.inline_data).map((x) => x.inline_data.mime_type) });
    if (body.generationConfig.thinkingConfig && rejectThinking > 0) { rejectThinking--; return r.fulfill({ status: 400, json: { error: { message: "Thinking budget is not supported for this model." } } }); }
    const check = { verdict: "fix", fixed: "I went to the market yesterday.", errors: [{ wrong: "I go to market yesterday", right: "I went to the market yesterday", why: "Use the past tense for yesterday." }], better: [{ label: "More natural", text: "Yesterday I went to the market." }, { label: "CSS interview", text: "Yesterday, I visited the local market." }] };
    if (/Use Google Search to find today/.test(prompt) && failSearch > 0) { failSearch--; return r.fulfill({ status: 429, json: { error: { message: "Quota exceeded, limit: 0, PerDay" } } }); }
    if (/Below is a news story/.test(prompt) && /"paragraphs":/.test(prompt) && reciteNext > 0) { reciteNext--; return r.fulfill({ json: { candidates: [{ finishReason: "RECITATION", content: { parts: [{ text: '{"title": "A new dam' }] } }] } }); }
    const lines = (prompt.split("\n\nTEXT:\n")[1] || "").split("\n").map((x) => x.trim()).filter(Boolean), first = (x, n) => x.split(/\s+/).slice(0, n).join(" "), story = lines.length > 1 ? lines.slice(1) : lines;
    const anchors = { start: first(story[0] || "", 8), end: story.join(" ").split(/\s+/).slice(-8).join(" "), breaks: [], sections: [{ title: "The new dam", gist: "A dam opened.", start: first(story[0] || "", 5) }] };
    const heardNow = /is in the attached recording/.test(prompt) ? heardQueue.shift() ?? "" : "";
    const text = /is in the attached recording/.test(prompt) ? JSON.stringify({ heard: heardNow, reply: heardNow ? "That is interesting! Which history book do you like most?" : "" })
      : /is a recording of a learner of English/.test(prompt) ? JSON.stringify({ text: "I like reading books about history" })
      : /preparing a practice interview/.test(prompt) ? JSON.stringify({ known: true, title: "The 18th Amendment", emoji: "📜", summary: "A 2010 change to the constitution.", points: ["It gave more powers to the provinces."], questions: ["What is the 18th Amendment?", "Which powers did it give to the provinces?", "Was it good for Pakistan?"] })
      : /practise this English structure/.test(prompt) ? JSON.stringify({ tasks: ["Why do you study English?", "Why do you like your city?"] })
      : /Check this answer to a structure practice task/.test(prompt) ? JSON.stringify({ used: true, correct: true, fixed: "", better: "I study English because I want to pass the CSS exam.", note: "Good!" })
      : /Use Google Search to find today/.test(prompt) ? "Here is the news:\n```json\n" + JSON.stringify({ items: [{ title: "New dam opens in KPK", emoji: "💧", source: "Dawn", where: "Pakistan", story: "A new dam opened today. It will give water and electricity." }, { title: "Peace talks in Geneva", emoji: "🕊️", source: "BBC", where: "World", story: "Leaders met in Geneva to talk about peace." }, { title: "Cricket team wins", emoji: "🏏", source: "The News", where: "Pakistan", story: "Pakistan won the match by five wickets." }] }) + "\n```"
      : /Below is a news story/.test(prompt) ? JSON.stringify({ title: "A new dam for Pakistan", emoji: "💧", source: "Dawn", story: "A new dam opened in KPK. It will store water for farmers and make electricity.", css: "Pakistan Affairs: water and energy.", questions: ["Why do we need dams?", "How can we save water?"], vocab: [{ word: "electricity", type: "noun", meaning: "power for lights and machines" }],
        ...(/"paragraphs":/.test(prompt) ? { paragraphs: ["A new dam opened today. It will give water and electricity."], sections: [{ title: "The new dam", gist: "A dam opened.", from: 1, to: 1 }] } : /"start": "the first 8 words/.test(prompt) ? anchors : {}) })
      : /Help them brainstorm/.test(prompt) ? JSON.stringify({ ideas: [{ title: "Serving my country", points: ["Help people", "Fight corruption"] }, { title: "Family dream", points: ["Father's wish", "Respect"] }, { title: "Good career", points: ["Security", "Leadership"] }], words: ["public service"], plan: ["Start: …", "Reason: …", "Example: …", "End: …"] })
      : /spoke for/.test(prompt) ? JSON.stringify({ score: 6, comment: "Good start.", errors: [], better: "I want to join the civil service to serve my country.", tip: "Give an example." })
      : json && /"reply":/.test(prompt) ? JSON.stringify({ reply: "That sounds nice! What did you buy at the market?", check })
      : json
      ? JSON.stringify(check)
      : "That sounds nice! What did you buy at the market?";
    if (hold && /Write Mam's next reply now/.test(prompt) && prompt.includes(hold.after)) await hold.promise;
    r.fulfill({ json: { candidates: [{ content: { parts: [{ text }] } }] } });
  });
  await p.goto("file://" + path.join(root, "docs/index.html")); await p.waitForTimeout(500);
  const results = [];
  const check = (name, ok, info) => { results.push(ok); console.log((ok ? "PASS " : "FAIL ") + name + (info && !ok ? " · " + info : "")); };

  check("asks for the free key on first use", (await p.textContent("#msgs")).includes("add your free Gemini key"));
  await p.click("text=Open Settings");
  check("settings show how to keep Bolo on the phone", (await p.textContent("#installSteps")).includes("Add to Home screen"));
  check("settings link to Likho English, the writing app on the same site", (await p.getAttribute("#likhoLink", "href")) === "likho/");
  await p.evaluate(() => { window.__clip = " Your key: AIzaSyTEST_0123456789abcdefghijklmnopqr "; });
  await p.click("#keyPaste"); await p.waitForTimeout(400);
  const saved = await p.evaluate(() => JSON.parse(localStorage.getItem("bolo.gemini")));
  check("one tap pastes and saves the key", (await p.textContent("#keyStatus")).includes("Mam is ready") && saved.key === "AIzaSyTEST_0123456789abcdefghijklmnopqr");
  check("talking uses the fast stable Flash-Lite model; harder jobs use Flash", saved.fast === "gemini-2.5-flash-lite" && saved.model === "gemini-flash-latest", JSON.stringify(saved));
  check("settings: Mam writes down what I say, and the phone listens for Pakistani English", !(await p.isHidden("#earsBox")) && (await p.inputValue("#earsSel")) === "mam" && (await p.inputValue("#accentSel")) === "en-PK");
  await p.selectOption("#earsSel", "phone"); // the talk loop below uses the phone's listening (the fake recogniser)
  await p.click("#setSheet [data-close].btn.primary");
  check("voice version: big talk button, no typing box", !(await p.isHidden("#orb")) && (await p.isHidden("#typeRow")));

  await p.evaluate(() => { window.__noPK = true; }); // this phone does not offer Pakistani English
  await p.click("#orb"); await p.waitForTimeout(3600);
  const m1 = await p.textContent("#msgs");
  check("Mam asks her question out loud first", (await p.evaluate(() => window.__spoken[0] || "")).includes("What would you like to talk about"));
  check("what I said is sent after a pause", m1.includes("I go to market yesterday"));
  check("Mam answers", m1.includes("What did you buy at the market"));
  check("Mam's answer is spoken", (await p.evaluate(() => window.__spoken.join("|"))).includes("What did you buy"));
  await p.waitForTimeout(3000);
  const m2 = await p.textContent("#msgs");
  check("it listens again by itself (second answer sent)", m2.includes("I bought some mangoes"));
  check("the phone tries Pakistani English first; where it is missing, it goes on with Indian English and remembers", (await p.evaluate(() => window.__langs[0] === "en-PK" && window.__langs.slice(1).every((l) => l === "en-IN") && window.__langs.length > 2)));
  await p.click("#setBtn");
  check("settings say why the phone uses Indian English", (await p.inputValue("#accentSel")) === "en-PK" && !(await p.isHidden("#pkNote")));
  await p.click("#setSheet [data-close].btn.primary");
  check("corrections folded under my sentence", (await p.textContent(".msg.me .verdict")).includes("mistake"));
  const talk = gem.filter((g) => /Write Mam's next reply now/.test(g.prompt));
  check("one request per answer brings the reply and the corrections together", talk.length >= 2 && talk.every((g) => /"reply":/.test(g.prompt) && g.mime === "application/json") && !gem.some((g) => /checking one spoken answer/.test(g.prompt)));
  check("talking uses Flash-Lite with thinking off", talk.every((g) => g.model === "gemini-2.5-flash-lite") && talk[0].think?.thinkingBudget === 0);
  check("a model that refuses the thinking setting is asked again without it", talk[1].think === null && talk[talk.length - 1].think === null && (await p.evaluate(() => JSON.parse(localStorage.getItem("bolo.gemini")).think["gemini-2.5-flash-lite"])) === "none");
  await p.click(".msg.me .bubble"); await p.waitForTimeout(150);
  check("tapping my sentence: corrected sentence and other ways", (await p.textContent(".msg.me .fb")).includes("I went to the market yesterday.") && (await p.textContent(".msg.me .fb")).includes("Other ways to say it"));
  // another app for a moment: Mam pauses, then goes on by herself
  await p.evaluate(() => window.__setHidden(true)); await p.waitForTimeout(200);
  check("in another app, Mam stops listening", (await p.textContent("#state")).includes("Tap the button"));
  let ready; hold = { after: "We ate them at home", promise: new Promise((ok) => { ready = ok; }) };
  await p.evaluate(() => { window.__toSay.push("I like mangoes very much", "We ate them at home"); window.__setHidden(false); }); await p.waitForTimeout(3200);
  check("back in the app, she listens again by herself", (await p.textContent("#msgs")).includes("I like mangoes very much"));
  for (let i = 0; i < 40 && !gem.some((g) => /Write Mam's next reply now/.test(g.prompt) && g.prompt.includes("We ate them at home")); i++) await p.waitForTimeout(200);
  await p.evaluate(() => window.__setHidden(true));
  const spokeBefore = await p.evaluate(() => window.__spoken.length);
  ready(); hold = null; await p.waitForTimeout(500);
  check("a reply that comes while I am away waits for me", (await p.evaluate(() => window.__spoken.length)) === spokeBefore && (await p.textContent("#msgs")).includes("We ate them at home"));
  await p.evaluate(() => window.__setHidden(false)); await p.waitForTimeout(400);
  check("back in the app, Mam says it", (await p.evaluate(() => window.__spoken.length)) === spokeBefore + 1);
  await p.waitForTimeout(600);
  await p.click("#orb"); await p.waitForTimeout(300); // pause
  const st = await p.textContent("#state");
  check("tapping the button pauses", /Tap the button|Mam is/.test(st), st);
  await p.click("#typeBtn");
  check("typing is one tap away", !(await p.isHidden("#typeRow")));
  // 1-minute challenge by voice
  await p.evaluate(() => { window.__toSay.push("I want to join the civil service because I love my country"); });
  await p.click('#tabbar [data-tab="minute"]'); await p.waitForTimeout(600);
  check("challenge: brainstorm ideas shown", (await p.$$(".idea")).length === 3);
  await p.click("#orb"); await p.waitForTimeout(800);
  check("challenge: my spoken words fill the answer", (await p.inputValue("#minIn")).includes("civil service"));
  await p.click("#orb"); await p.waitForTimeout(900);
  check("challenge: result after finishing", (await p.textContent("#minResult")).includes("words / min"));
  // newspaper: today's headlines from Google Search, then talk about one by voice
  await p.click('#tabbar [data-tab="news"]'); await p.waitForTimeout(500);
  const fd = await p.textContent("#feed");
  check("free headlines from the news robot, no key needed", robotCalls === 1 && fd.includes("From the newspapers") && fd.includes("🇵🇰 Pakistani papers") && fd.includes("Senate passes new water bill") && fd.includes("🌍 International papers") && fd.includes("Climate talks open in Geneva") && fd.includes("Updated 2 hours ago"));
  await p.click('#feed .hl:has-text("Senate passes new water bill")'); await p.waitForTimeout(800);
  check("a robot headline becomes a story, made from its summary", gem.some((g) => /Below is a news story from "Dawn"/.test(g.prompt) && g.prompt.includes("small dams in every province")));
  check("the story links to the full article on the newspaper's site", (await p.getAttribute('a:has-text("Full story on Dawn")', "href")) === "https://www.dawn.com/news/111");
  await p.click('#tabbar [data-tab="news"]'); await p.waitForTimeout(300);
  check("a headline already read is marked", (await p.textContent('#feed .hl:has-text("Senate passes")')).includes("✓ read") && robotCalls === 1);
  await p.click("text=Get today's news"); await p.waitForTimeout(600);
  check("today's headlines arrive", (await p.$$("#headlines .hl")).length === 3 && (await p.textContent("#headlines")).includes("New dam opens in KPK"));
  const hs = gem.find((g) => /Use Google Search/.test(g.prompt));
  check("headlines use Google Search (without JSON mode)", !!hs && hs.search && !hs.mime);
  check("if search is refused, it tries the older free model", gem.filter((g) => g.search).map((g) => g.model).join() === "gemini-flash-latest,gemini-2.5-flash");
  await p.click("#headlines .hl >> nth=0"); await p.waitForTimeout(700);
  check("a headline becomes a story to talk about", (await p.textContent("#topicName")).includes("A new dam for Pakistan") && (await p.textContent("#msgs")).includes("Words · 1"));
  await p.click('.tab[data-k="orig"]'); await p.waitForTimeout(100);
  check("a headline's original tab says it is a short report", (await p.textContent("#msgs")).includes("not the full article"));
  check("the story is made from the headline's facts", gem.some((g) => /Below is a news story/.test(g.prompt) && g.prompt.includes("A new dam opened today")));
  check("while reading a story, the talk button is out of the way", await p.isHidden("#dock"));
  await p.click('.tab[data-k="talk"]'); await p.waitForTimeout(200);
  await p.evaluate(() => { window.__toSay.push("We need dams for water"); });
  await p.click("#orb"); await p.waitForTimeout(3600);
  check("Mam asks about the story out loud", (await p.evaluate(() => window.__spoken.join("|"))).includes("Why do we need dams?"));
  check("my spoken answer about the story is sent", (await p.textContent("#msgs")).includes("We need dams for water") && gem.some((g) => /Write Mam's next reply now/.test(g.prompt) && g.prompt.includes("store water for farmers")));
  await p.click("#orb"); await p.waitForTimeout(200);
  const before = gem.length;
  await p.click('#tabbar [data-tab="news"]'); await p.waitForTimeout(300); // from a story, the News tab goes back to the news page
  check("headlines are kept for the day (no new search)", (await p.$$("#headlines .hl")).length === 3 && (await p.textContent("#headlines")).includes("✓ read") && !gem.slice(before).some((g) => g.search));
  await p.setInputFiles("#newsFile", { name: "shot.png", mimeType: "image/png", buffer: await p.screenshot() }); await p.waitForTimeout(1200);
  check("a screenshot goes to Gemini as a smaller picture", gem.some((g) => /Below is a news story/.test(g.prompt) && g.imgs.length === 1 && g.imgs[0] === "image/jpeg"));
  check("a headline's story is cut from its own words, not copied back by Mam", gem.some((g) => /Below is a news story/.test(g.prompt) && g.prompt.includes("A new dam opened today") && /"start": "the first 8 words/.test(g.prompt) && !/"paragraphs":/.test(g.prompt)));
  await p.click('#tabbar [data-tab="news"]'); await p.waitForTimeout(300);
  reciteNext = 1; const nBefore = gem.length;
  await p.setInputFiles("#newsFile", { name: "shot2.png", mimeType: "image/png", buffer: await p.screenshot() }); await p.waitForTimeout(1500);
  const tries = gem.slice(nBefore).filter((g) => /Below is a news story/.test(g.prompt));
  check("when Google will not copy a story, Mam asks again for the simple story and still makes the session", tries.length === 2 && /"paragraphs":/.test(tries[0].prompt) && !/"paragraphs":/.test(tries[1].prompt) && (await p.textContent("#topicName")).includes("A new dam for Pakistan") && (await p.textContent("#msgs")).includes("Words · 1"));
  await p.click('#tabbar [data-tab="words"]'); await p.waitForTimeout(200);
  await p.fill("#wordIn", "resilience"); await p.click('form:has(#wordIn) button'); await p.waitForTimeout(600);
  check("My words works in the voice version too (kept on this phone)", (await p.evaluate(() => JSON.parse(localStorage.getItem("bolo.v1")).words.map((w) => w.word).join())) === "resilience");
  await p.click('#tabbar [data-tab="learn"]'); await p.waitForTimeout(300);
  await p.click('#structList .trow:has-text("Giving a reason")'); await p.waitForTimeout(600);
  await p.evaluate(() => { window.__toSay.push("I study English because I want to pass CSS"); });
  await p.click("#structMic"); await p.waitForTimeout(700);
  check("Structures: I say my answer and it fills the box", (await p.inputValue("#structIn")).includes("because I want to pass CSS"));
  await p.click("#structCheck"); await p.waitForTimeout(600);
  check("Structures: Mam checks the spoken answer", (await p.textContent("#structOut")).includes("Well done"));
  // interview me on a topic, by voice
  await p.click('#tabbar [data-tab="talk"]'); await p.waitForTimeout(300);
  await p.click("#topicBtn"); await p.click('#topicList .trow:has-text("Interview me on a topic")'); await p.waitForTimeout(300);
  await p.fill("#ivTopic", "The 18th Amendment"); await p.click('#ivWho .tab:has-text("Mam")'); await p.click("#ivGo"); await p.waitForTimeout(800);
  check("topic interview: Mam prepares the questions with Flash, thinking a little to be quicker", gem.some((g) => /preparing a practice interview/.test(g.prompt) && g.model === "gemini-flash-latest" && g.mime === "application/json" && g.think?.thinkingLevel === "low") && (await p.textContent("#topicName")).includes("Interview: The 18th Amendment"));
  await p.evaluate(() => { window.__toSay.push("It gave more power to the provinces"); });
  await p.click("#orb"); await p.waitForTimeout(3600);
  check("topic interview by voice: the first question is spoken and my answer goes with the check", (await p.evaluate(() => window.__spoken.join("|"))).includes("What is the 18th Amendment?") && gem.some((g) => /Write Mam's next interview turn now/.test(g.prompt) && /"reply":/.test(g.prompt) && g.model === "gemini-2.5-flash-lite" && g.prompt.includes("It gave more power to the provinces")));
  await p.click("#orb"); await p.waitForTimeout(200);
  await p.evaluate(() => { window.__before = true; const m = document.getElementById("main"); m.scrollTop = 0; const ev = (type, y) => { const e = new Event(type); e.touches = y == null ? [] : [{ clientX: 100, clientY: y }]; m.dispatchEvent(e); }; ev("touchstart", 100); ev("touchmove", 300); ev("touchend"); });
  await p.waitForTimeout(1200);
  check("pulling the page down reloads the app (to get updates)", (await p.evaluate(() => window.__before)) === undefined && !!(await p.$("#tabbar")));
  await p.evaluate(() => localStorage.setItem("bolo.gemini", JSON.stringify({ key: "AIzaSyTEST_0123456789abcdefghijklmnopqr", model: "gemini-flash-latest" })));
  await p.reload(); await p.waitForTimeout(800);
  check("a key saved by the old version gets the fast model too", (await p.evaluate(() => JSON.parse(localStorage.getItem("bolo.gemini")).fast)) === "gemini-2.5-flash-lite");
  // Mam's ears: the answer is recorded, and Gemini writes down exactly what was said
  await p.click("#setBtn"); await p.selectOption("#earsSel", "mam"); await p.click("#setSheet [data-close].btn.primary");
  await p.evaluate(() => { window.__mic = true; });
  await p.click("#orb"); await p.waitForTimeout(1800);
  check("Mam listens: my answer is being recorded", (await p.evaluate(() => window.__gum)) === 1 && (await p.textContent("#msgs")).includes("Listening… pause when you finish"));
  await p.waitForTimeout(5000);
  const hr = gem.find((g) => /is in the attached recording/.test(g.prompt));
  check("after a pause, the recording goes to Flash-Lite as a WAV with the conversation: written down exactly and answered in ONE call", !!hr && hr.model === "gemini-2.5-flash-lite" && hr.imgs[0] === "audio/wav" && hr.prompt.includes("never correct or improve anything") && /Write Mam's next/.test(hr.prompt) && hr.prompt.includes("(the answer is in the attached recording)"));
  check("no separate call to write the answer down first", !gem.some((g) => /is a recording of a learner of English/.test(g.prompt)));
  const w = hr?.wav, secs = w ? (w.length - 44) / 32000 : 0;
  check("the recording is a real 16 kHz WAV: the answer with a little silence around it", !!w && w.toString("ascii", 0, 4) === "RIFF" && w.toString("ascii", 8, 12) === "WAVE" && w.readUInt32LE(24) === 16000 && secs > 2.5 && secs < 6, w ? secs.toFixed(2) + " s" : "no audio");
  check("what Mam heard shows as my answer, with her reply to it", (await p.textContent("#msgs")).includes("I like reading books about history") && (await p.textContent("#msgs")).includes("Which history book do you like most?"));
  check("the corrections come afterwards, in the background", gem.some((g) => /checking one spoken answer/.test(g.prompt) && g.prompt.includes("I like reading books about history")) && !!(await p.$(".msg.me .verdict")));
  check("the heard answer is saved in the conversation", (await p.evaluate(() => JSON.parse(localStorage.getItem("bolo.v1")).chats.some((c) => c.turns.some((t) => t.role === "user" && t.content === "I like reading books about history")))));
  await p.waitForTimeout(5000); // Mam spoke her reply and listened again: this time the recording has no words
  check("a recording with no words: Mam says she could not hear, and nothing is added", (await p.textContent("#msgs")).includes("could not hear any words") && !(await p.$(".msg.me.voice")));
  await p.click("#orb"); await p.waitForTimeout(300);
  check("no page errors", errs.length === 0, errs.join(";"));
  await b.close();
  const failed = results.filter((x) => !x).length;
  console.log(`\n${results.length - failed}/${results.length} passed`);
  process.exit(failed ? 1 : 0);
})();
