// Browser checks for Khulasa English, the précis app (docs/khulasa/index.html), on the website with a mock of Gemini.
// Usage: node tools/build-web.mjs && node tools/test/run-khulasa-web.cjs   (SHOTS=<folder> also saves screenshots)
const path = require("path");
const fs = require("fs");
let pw;
try { pw = require("playwright"); } catch { pw = require(require("child_process").execSync("npm root -g").toString().trim() + "/playwright"); }
const root = path.resolve(__dirname, "../..");
const url = "file://" + path.join(root, "docs/khulasa/index.html");
const KEY_TEXT = "AIzaSyTEST_0123456789abcdefghijklmnopqr";
const fakes = () => {
  window.__spoken = [];
  const synth = { getVoices: () => [], onvoiceschanged: null, speak(u) { window.__spoken.push(u.text); }, cancel() {} };
  Object.defineProperty(window, "speechSynthesis", { value: synth, configurable: true });
  window.SpeechSynthesisUtterance = function (t) { this.text = t; };
  Object.defineProperty(navigator, "clipboard", { value: { readText: async () => window.__clip || "" }, configurable: true });
};
const SENT = "Due to the fact that a large number of young people in Pakistan do not have jobs, the government has made a decision to start new training programmes in every province.";

(async () => {
  const exe = fs.existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;
  const b = await pw.chromium.launch(exe ? { executablePath: exe } : {});
  const results = [], errs = [], gem = [];
  const check = (name, ok, info) => { results.push(ok); console.log((ok ? "PASS " : "FAIL ") + name + (info && !ok ? " · " + info : "")); };
  const gemini = async (r) => {
    const u = r.request().url();
    if (u.includes("/models?")) return r.fulfill({ json: { models: ["gemini-flash-latest", "gemini-2.5-flash", "gemini-2.5-flash-lite"].map((n) => ({ name: "models/" + n, supportedGenerationMethods: ["generateContent"] })) } });
    const body = JSON.parse(r.request().postData()), prompt = body.contents.map((c) => c.parts.map((x) => x.text || "").join("")).join("\n");
    gem.push({ prompt, model: u.match(/models\/([^:]+):/)?.[1], think: body.generationConfig.thinkingConfig || null, mime: body.generationConfig.responseMimeType || "" });
    const ans = (prompt.match(/The learner wrote: "([^"]*)"/) || [])[1] || "";
    const text = JSON.stringify(/checking one answer from/.test(prompt) ? (/budget/.test(ans) ? { ok: true, note: "Yes: budget-friendly only talks about the price." } : { ok: false, note: "“" + ans + "” still sounds like low quality." })
      : /preparing a précis drill/.test(prompt) ? { sentence: SENT, key_terms: ["young people", "training programmes"], target: 15, model: "Because many young Pakistanis lack jobs, the government will start training programmes everywhere.", cuts: ["due to the fact that → because", "a large number of → many", "has made a decision to → has decided to"] }
      : /checking a précis drill/.test(prompt) ? { score: 7, meaning: "partly kept", verdict: "Good cuts, but you changed a key term.", changes: [{ from: "a large number of", to: "many", ok: true, kind: "good cut", note: "Many says it in one word." }, { from: "young people", to: "youth", ok: false, kind: "key term changed", note: "Young people is a key term: keep it." }], grammar: [], model: "Because many young people lack jobs, the government will start training programmes in every province.", tip: "Keep the key terms first, then cut." }
      : /wants ONE word for this phrase/.test(prompt) ? { found: true, word: "bibliophile", type: "noun", meaning: "a person who loves books", example: "The bibliophile owns a thousand books.", tone: "positive", formality: "formal", near: [{ word: "bookworm", why: "informal, and it means someone who reads a lot" }], phrase: "" }
      : /Explain the word "/.test(prompt) ? { word: "content", type: "adjective", say: "kun-TENT", senses: [{ meaning: "calm and satisfied", example: "She is content with her life.", synonyms: [{ word: "satisfied", tone: "positive", formality: "neutral", strength: "same", context: "with a result or a life", example: "He is satisfied with his job.", precis_safe: true }, { word: "pleased", tone: "positive", formality: "neutral", strength: "stronger", context: "about one thing", example: "She was pleased with the result.", precis_safe: false }], antonyms: ["dissatisfied", "restless"] }], mistakes: ["Content (kun-TENT) is not content (KON-tent), the things inside."] }
      : {});
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
  const shot = async (p, n) => { if (process.env.SHOTS) await p.screenshot({ path: path.join(process.env.SHOTS, "khulasa-" + n + ".png") }); };

  // the files that put it on the Home Screen
  const html = fs.readFileSync(path.join(root, "docs/khulasa/index.html"), "utf8"), man = JSON.parse(fs.readFileSync(path.join(root, "docs/khulasa/manifest.webmanifest"), "utf8"));
  check("Home Screen: its own name, manifest and icons", html.includes('content="Khulasa English"') && man.short_name === "Khulasa" && ["icon-192.png", "icon-512.png", "apple-touch-icon.png"].every((f) => fs.existsSync(path.join(root, "docs/khulasa", f))) && JSON.parse(fs.readFileSync(path.join(root, "docs/khulasa/manifest-ios.webmanifest"), "utf8")).display === "browser");

  let { ctx, p } = await open({ key: KEY_TEXT, model: "gemini-flash-latest", fast: "gemini-2.5-flash-lite" });
  const page = () => p.textContent("#page");
  check("four tabs: Today, One Word, Explorer, My Words", (await p.$$("#tabbar button")).length === 4 && (await p.textContent("#tabbar")).includes("Explorer"));
  check("first day: the level test, or Lesson 1", (await page()).includes("Find your level in 5 minutes") && !!(await p.$('button:has-text("Start from Lesson 1")')));
  await shot(p, "today-first");
  // the level test: right, right, right, then wrong
  const PLACE = ["solitude", "The court concluded that he was innocent.", "utilize"];
  await p.click('button:has-text("Take the level test")'); await p.click('button:has-text("Start")'); await p.waitForTimeout(100);
  for (let i = 0; i < 10; i++) {
    const want = PLACE[i];
    const opts = await p.$$(".opt");
    let target = null;
    for (const o of opts) { const t = await o.textContent(); if (want ? t === want : !["determined", "punishments", "thus", "We discussed the plan.", "inquire", "catastrophe", "her hypothesis"].includes(t)) { target = o; break; } }
    await target.click(); await p.waitForTimeout(50);
    await p.click('button:has-text("Next →"), button:has-text("See my result")'); await p.waitForTimeout(50);
  }
  let t = await page();
  check("the level test: the lessons I know are opened, and I start where I need to", t.includes("You already know the first 3 lessons") && t.includes("You start with Lesson 4") && !!(await p.$('button:has-text("Start Lesson 4")')), t.slice(0, 300));
  await p.click('button:has-text("Start Lesson 4")'); await p.waitForTimeout(150);
  t = await page();
  check("a lesson: the idea, an example and what to notice, and its words", t.includes("Positive and negative words") && t.includes("Denotation is the dictionary meaning") && t.includes("Example") && t.includes("Notice") && t.includes("Words of this lesson · 4") && t.includes("thrifty"));
  await shot(p, "lesson");
  // the questions: one wrong on purpose, to see the exact reason
  const RIGHT = [["The author admires the leader", "determined"], ["The author criticises the shopkeeper", "stingy"], ["The negative partner of", "arrogant"], ["calls the poet", "slender"], ["peaceful march", "The word is too negative and not true."], ["Which word praises?", "courageous"], ["\"Curious\" or \"nosy\"", "nosy"]];
  await p.click('button:has-text("Start the questions")'); await p.waitForTimeout(100);
  let wrongDone = false, aiSeen = false;
  for (let i = 0; i < 8; i++) {
    const q = await p.textContent(".q");
    if (await p.$("#ans" + i)) {
      await p.fill("#ans" + i, "budget-friendly"); await p.click('#page .card button:has-text("Check")'); await p.waitForTimeout(400);
      const fb = await p.textContent(".fb");
      aiSeen = fb.includes("✓ Right") && fb.includes("budget-friendly only talks about the price") && gem.some((g) => /checking one answer from/.test(g.prompt) && g.model === "gemini-2.5-flash-lite" && g.think?.thinkingBudget === 0);
    } else {
      const right = RIGHT.find(([k]) => q.includes(k))[1];
      const opts = await p.$$(".opt"); let target = null;
      for (const o of opts) { const ot = await o.textContent(); if (!wrongDone ? ot !== right : ot === right) { target = o; break; } }
      const chosen = await target.textContent(); await target.click(); await p.waitForTimeout(50);
      if (!wrongDone) { const fb = await p.textContent(".fb"); check("a wrong choice gets ITS own reason, then the answer and why", fb.includes("✗ Not quite") && fb.includes("“" + chosen + "”:") && fb.includes("The answer: “" + right + "”"), fb); wrongDone = true; }
    }
    await p.click('button:has-text("Next →"), button:has-text("See my result")'); await p.waitForTimeout(60);
  }
  check("a different right answer is judged by Mam on the fast model, and accepted", aiSeen);
  t = await page();
  check("7 of 8: the lesson is passed, and its words go to My Words", t.includes("7/8") && t.includes("✓ Passed") && (await p.evaluate(() => JSON.parse(localStorage.getItem("khulasa.v1")).words.map((w) => w.w).join())).includes("thrifty"));
  await p.click('button:has-text("Back to Today")'); await p.waitForTimeout(100);
  t = await page();
  check("Today: today's lesson is done, the next one is ready", t.includes("✓ Today's lesson is done") && t.includes("Context changes meaning"));
  // the daily sentence
  await p.click('button:has-text("Today\'s sentence")'); await p.click('button:has-text("Give me a sentence")'); await p.waitForTimeout(400);
  t = await page();
  const gen = gem.find((g) => /preparing a précis drill/.test(g.prompt));
  check("Shrink the sentence: Mam writes an original sentence on a CSS topic, on the fast model", !!gen && gen.model === "gemini-2.5-flash-lite" && t.includes(SENT) && t.includes("goal: about 15") && t.includes("Keep: “young people”"));
  await p.click('button:has-text("Hint")'); await p.waitForTimeout(50);
  check("a hint shows one cut at a time", (await page()).includes("due to the fact that → because") && !(await page()).includes("a large number of → many"));
  await p.fill("#drillAns", "Because many youth lack jobs, the government will start training programmes everywhere."); await p.waitForTimeout(50);
  check("the word count follows my sentence", (await page()).includes("12 words · goal about 15"));
  await p.click('button:has-text("Check")'); await p.waitForTimeout(400);
  t = await page();
  const mk = gem.find((g) => /checking a précis drill/.test(g.prompt));
  check("Mam checks every changed word on Flash, and says exactly which changes are wrong", !!mk && mk.model === "gemini-2.5-flash" && mk.prompt.includes("Key terms that must stay: young people, training programmes") && t.includes("7/10") && t.includes("Every change you made") && t.includes("✗ key term changed") && t.includes("Young people is a key term") && t.includes("Mam's version"));
  await shot(p, "drill");
  // One Word for Many
  await p.click('#tabbar [data-tab="one"]'); await p.waitForTimeout(100);
  t = await page();
  check("One Word: the phrases by topic, each with its word and an example", t.includes("a person who cannot be corrected") && t.includes("incorrigible") && /\d+ phrases/.test(t) && (await p.$$(".chips .chip")).length === 7);
  await p.fill("#oneAsk", "a person who loves books"); await p.click('button:has-text("Find")'); await p.waitForTimeout(300);
  t = await page();
  check("Ask Mam: any phrase gets its one word, with the close words that do not fit", t.includes("bibliophile") && t.includes("Close, but not right") && t.includes("bookworm"));
  const asks = gem.filter((g) => /wants ONE word/.test(g.prompt)).length;
  await p.click('button:has-text("Find")'); await p.waitForTimeout(150);
  check("asking again opens the saved answer at once", gem.filter((g) => /wants ONE word/.test(g.prompt)).length === asks && (await page()).includes("bibliophile"));
  await p.click('.chip:has-text("Test me")'); await p.waitForTimeout(100);
  check("Test me: ten questions from the list", (await page()).includes("Question 1 of 10"));
  // the Explorer
  await p.click('#tabbar [data-tab="explore"]'); await p.waitForTimeout(100);
  t = await page();
  check("the Explorer opens on \"alone\": each meaning with its real synonyms, tone, formality, strength and précis safety", t.includes("alone by choice") || t.includes("with no one else there, by choice"));
  check("…and the opposites and the common mistakes, without asking Google", t.includes("✓ safe in a précis") && t.includes("⚠ changes it in a précis") && t.includes("Opposites") && t.includes("an alone girl") && !gem.some((g) => /Explain the word "alone"/.test(g.prompt)));
  await shot(p, "explorer");
  await p.fill("#exploreIn", "content"); await p.click('button:has-text("Explore")'); await p.waitForTimeout(400);
  t = await page();
  const ex = gem.find((g) => /Explain the word "content"/.test(g.prompt));
  check("a new word: Mam explores it on Flash, and it is saved for next time", !!ex && ex.model === "gemini-2.5-flash" && t.includes("calm and satisfied") && t.includes("↑ stronger") && t.includes("dissatisfied") && (await p.evaluate(() => !!JSON.parse(localStorage.getItem("khulasa.v1")).explore.content)));
  const before = await p.evaluate(() => JSON.parse(localStorage.getItem("khulasa.v1")).words.length);
  await p.click('.syn:has-text("satisfied") .star'); await p.waitForTimeout(100);
  check("☆ saves a synonym to My Words, with its meaning", (await p.evaluate(() => JSON.parse(localStorage.getItem("khulasa.v1")).words)).length === before + 1 && (await p.evaluate(() => JSON.parse(localStorage.getItem("khulasa.v1")).words[0].w)) === "satisfied");
  // My Words and the review
  // a fresh page, so the old one's last save does not overwrite the change
  await p.close(); p = await ctx.newPage(); p.on("pageerror", (e) => errs.push(e.message));
  await p.route("https://fonts.googleapis.com/**", (r) => r.abort()); await p.route("https://generativelanguage.googleapis.com/**", gemini);
  await p.goto("file://" + path.join(root, "docs/khulasa/manifest.webmanifest"));
  await p.evaluate(() => { const s = JSON.parse(localStorage.getItem("khulasa.v1")); s.words.slice(0, 2).forEach((w) => { w.due = Date.now() - 1000; }); localStorage.setItem("khulasa.v1", JSON.stringify(s)); });
  await p.goto(url); await p.waitForTimeout(400);
  check("words due for review show on the My Words tab", (await p.textContent("#dueBadge")) === "2" && (await page()).includes("2 words to review today"));
  await p.click('#tabbar [data-tab="words"]'); await p.waitForTimeout(100);
  check("My Words lists every word, with where it came from", (await page()).includes("Lesson: Positive and negative words") && (await page()).includes("Explorer: content"));
  await p.click('button:has-text("Review now")'); await p.waitForTimeout(100);
  await p.click('button:has-text("Show the meaning")'); await p.click('button:has-text("I knew it")'); await p.waitForTimeout(50);
  await p.click('button:has-text("Show the meaning")'); await p.click('button:has-text("didn\'t know")'); await p.waitForTimeout(50);
  check("a word I didn't know comes again at the end", (await page()).includes("1 word left"));
  await p.click('button:has-text("Show the meaning")'); await p.click('button:has-text("I knew it")'); await p.waitForTimeout(50);
  t = await page();
  const ws = await p.evaluate(() => JSON.parse(localStorage.getItem("khulasa.v1")).words);
  check("the review ends, and each word gets its next date", t.includes("✓ Review done") && t.includes("You knew 1 of 2") && ws.filter((w) => w.due > Date.now()).length === ws.length && ws.some((w) => w.box === 1));
  // settings
  await p.click("#setBtn"); await p.waitForTimeout(100);
  const st = await p.textContent("#setSheet");
  check("Settings: the level, the shared key, the Home Screen steps and the other apps", st.includes("Your English level") && st.includes("Key saved ✓") && st.includes("Add to Home screen") && (await p.getAttribute('#appLinks a:has-text("Likho")', "href")) === "../likho/");
  check("the shared key gets the newest stable models", (await p.evaluate(() => JSON.parse(localStorage.getItem("bolo.gemini")).model)) === "gemini-2.5-flash");
  await ctx.close();

  // without a key
  ({ ctx, p } = await open(null));
  await p.click('#tabbar [data-tab="one"]'); await p.fill("#oneAsk", "a person who loves books"); await p.click('button:has-text("Find")'); await p.waitForTimeout(200);
  check("without a key, Mam says where to add it", (await p.textContent("#page")).includes("Add your free Gemini key in Settings"));
  await ctx.close();

  check("no page errors", errs.length === 0, errs.join(" ; "));
  await b.close();
  const failed = results.filter((x) => !x).length;
  console.log(`\n${results.length - failed}/${results.length} passed`);
  process.exit(failed ? 1 : 0);
})();
