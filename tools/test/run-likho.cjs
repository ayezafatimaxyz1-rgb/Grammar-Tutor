// End-to-end check of Likho English (the writing app) inside a fake Claude runtime (tools/test/mock-claude.js).
// Usage: node tools/test/run-likho.cjs   (needs Playwright; uses /opt/pw-browsers/chromium when present)
const path = require("path");
const fs = require("fs");
let pw;
try { pw = require("playwright"); } catch { pw = require(require("child_process").execSync("npm root -g").toString().trim() + "/playwright"); }

const root = path.resolve(__dirname, "../..");
const page = fs.readFileSync(path.join(root, "likho-english.html"), "utf8");
const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light}body{margin:0}[hidden]{display:none!important}</style></head><body>${page}</body></html>`;
const mock = fs.readFileSync(path.join(__dirname, "mock-claude.js"), "utf8");
const now = Date.now();
const seed = { "data/users/u_test": { m_seed: { id: "mseed", wrong: "I am agree", right: "I agree", why: "Agree is a verb, so do not use am.", type: "verb form", sentence: "I am agree with you.", from: "Old task", kind: "sent", box: 1, due: now - 1000, created: now - 3 * 86400000, updated: now - 3 * 86400000 } }, library: {} };

(async () => {
  const exe = fs.existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;
  const b = await pw.chromium.launch(exe ? { executablePath: exe } : {});
  const p = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  const pageErrors = [];
  p.on("pageerror", (e) => pageErrors.push(e.message));
  await p.route("**/*", (r) => (r.request().url().startsWith("http://likho.test/") ? r.fulfill({ contentType: "text/html", body: html }) : r.abort()));
  await p.addInitScript((s) => { if (!sessionStorage.getItem("seeded")) { window.__seed = s; } }, seed);
  await p.addInitScript(mock);
  await p.goto("http://likho.test/"); await p.waitForTimeout(600);
  const results = [];
  const check = (name, ok, info) => { results.push(ok); console.log((ok ? "PASS " : "FAIL ") + name + (info && !ok ? " · " + info : "")); };
  const wait = (ms = 400) => p.waitForTimeout(ms);
  const txt = () => p.textContent("#page");
  const calls = (re) => p.evaluate((src) => window.__calls.filter((c) => new RegExp(src).test(c.prompt)), re.source);
  const store = () => p.evaluate(() => window.__store["data/users/u_test"]);
  // the courses are under More practice on the Today page
  const more = async (q = p) => { await q.click('#tabbar [data-tab="write"]'); await q.waitForTimeout(150); if (!(await q.$('summary:has-text("More practice")'))) { await q.click('#tabbar [data-tab="write"]'); await q.waitForTimeout(150); } if (!(await q.$('details[open] > summary:has-text("More practice")'))) await q.click('summary:has-text("More practice")'); await q.waitForTimeout(100); };
  const kind = async (name) => { await more(); await p.click('.list .trow:has-text("' + name + '")'); await wait(250); };
  const tests = async () => { await more(); await p.click('.trow:has(strong:text-is("Tests"))'); await wait(300); };
  const shot = (n) => p.screenshot({ path: path.join(process.env.SHOTS || "/tmp", "likho-" + n + ".png") }).catch(() => {});

  // ---- Today, and More practice: the courses ----
  check("three tabs (Today, Mistakes, Progress), Today is open, and 1 mistake waits for review", (await p.$$("#tabbar button")).length === 3 && (await p.textContent("#pageTitle")).includes("Today") && (await p.getAttribute('#tabbar [data-tab="write"]', "aria-current")) === "page" && (await p.textContent("#mistBadge")) === "1");
  await more();
  let t = await txt();
  check("More practice: the 4-step path, exam practice and the tests", t.includes("1. Free writing") && t.includes("2. Sentences") && t.includes("3. Paragraphs") && t.includes("4. Essays") && t.includes("Exam practice") && (await p.$$(".list .trow")).length === 7);
  check("the later steps are locked until the one before is finished", t.includes("🔒 opens after free writing") && t.includes("🔒 opens after sentences") && t.includes("🔒 opens after paragraphs"));

  await kind("2. Sentences");
  check("Sentences open only after the first free writing", (await txt()).includes("🔒 Not open yet") && (await txt()).includes("First write one free writing piece") && (await p.$$(".list .trow")).length === 0);

  // ---- 1. free writing: grammar corrections first ----
  await kind("1. Free writing"); await p.click("text=✍️ Start writing"); await wait(300);
  check("free writing opens a ruled answer sheet, with no goal", (await p.textContent("#pageTitle")).includes("Free writing") && !!(await p.$("textarea.ruled#draft")) && (await p.textContent("#count")) === "0 words · 0 sentences");
  const S1 = "every morning i wake up at 7. I go to college by bus yesterday. My mother make breakfast for me. I like it very much.";
  await p.fill("#draft", S1); await wait(100);
  check("the counter follows my writing", (await p.textContent("#count")).startsWith("25 words · 4 sentences"), await p.textContent("#count"));
  await p.reload(); await wait(900);
  check("my writing is kept: reopening goes back to it", (await p.inputValue("#draft")) === S1 && (await p.textContent("#pageTitle")).includes("Free writing"));

  // ---- Mam checks: marks, the marked text, fix it yourself first ----
  await p.click("#checkBtn"); await wait(700);
  const ck = (await calls(/checking writing by a learner/))[0];
  check("Mam checks free writing for grammar, with my exact words", !!ck && ck.prompt.includes("Task (Free writing)") && ck.prompt.includes("Focus on grammar, spelling, punctuation") && ck.prompt.includes(S1) && ck.prompt.includes("English level A1") && ck.tier === "default");
  t = await txt();
  check("marks out of 10 for ideas, organisation, grammar and vocabulary", (await p.textContent(".score")) === "6/10" && t.includes("Draft 1 · 25 words · 3 mistakes") && (await p.$$(".area")).length === 4 && t.includes("Ideas"));
  check("my own text with the examiner's red marks, numbered", (await p.$$("mark.mk")).length === 3 && (await p.textContent("mark.mk >> nth=1")).includes("I go to college by bus yesterday"));
  check("each mistake: its kind and a hint, but not the answer", t.includes("Fix your mistakes · 0 of 3 done") && t.includes("Capital letters") && t.includes("Verb tense") && t.includes("Subject and verb") && t.includes("Which tense do you need?") && !t.includes("I went to college"));
  check("each mistake says exactly what is wrong (the word and the rule) before I fix it", (await p.textContent("#fix1")).includes("What is wrong: go is the present tense, but yesterday shows the action is finished in the past.") && (await p.textContent("#fix1")).includes("💡 Hint:") && !(await p.textContent("#fix1")).includes("Why:") && ck.prompt.includes('"problem" says EXACTLY what is wrong') && ck.prompt.includes("Never write a vague reason"));
  check("the corrected writing and Mam's version stay locked until I try", t.includes("Fix every mistake above") && !(await p.$(".corrected")) && !(await p.$("p.better")));
  await shot("check");
  await p.fill("#fixIn0", "Every morning I"); await p.click('#fix0 button:has-text("Check")'); await wait(300);
  check("I fix a mistake myself: it turns green", (await p.textContent("#fix0")).includes("✓ You fixed it: Every morning I") && (await txt()).includes("1 of 3 done") && (await p.getAttribute("mark.mk >> nth=0", "class")).includes("done"));
  await p.fill("#fixIn1", "I gone to college by bus yesterday"); await p.click('#fix1 button:has-text("Check")'); await wait(400);
  check("a wrong fix: Mam says not yet, with a reason", (await p.textContent("#fix1 .fout")).includes("Not yet. Use the past tense here.") && (await calls(/is correcting one mistake/)).length === 1);
  await p.click('#fix1 button:has-text("Show the answer")'); await wait(200);
  check("Show the answer: the correction and the full rule", (await p.textContent("#fix1")).includes("Answer: I went to college by bus yesterday") && (await p.textContent("#fix1")).includes("Why: Use the past tense for yesterday."));
  await p.fill("#fixIn2", "My mother cooks"); await p.click('#fix2 button:has-text("Check")'); await wait(400);
  check("another correct way is accepted too, and Mam's version is shown beside it", (await p.textContent("#fix2")).includes("✓ You fixed it: My mother cooks") && (await p.textContent("#fix2")).includes("Mam's version: My mother makes"));
  t = await txt();
  check("then: my corrected writing (with my own fixes) and Mam's better version", (await p.$$(".corrected ins")).length === 3 && (await p.textContent(".corrected")).includes("My mother cooks breakfast") && t.includes("Mam's better version") && t.includes("Every morning, I wake up at seven."));
  await wait(1200);
  let st = await store();
  const saved = Object.values(st).filter((d) => d?.id?.startsWith("m") && d.wrong && d.id !== "mseed");
  check("the mistakes go to my review list (one I fixed alone comes back later)", saved.length === 3 && saved.find((m) => m.type === "capital")?.box === 2 && saved.find((m) => m.type === "agreement")?.box === 2 && saved.find((m) => m.type === "tense")?.box === 1 && saved.find((m) => m.type === "tense").sentence === "I go to college by bus yesterday.", JSON.stringify(saved.map((m) => [m.type, m.box, m.sentence])));
  check("the piece is saved to my account with the draft and my fixes", Object.values(st).some((d) => d?.kind === "free" && d.drafts?.[0]?.fixes?.length === 3 && d.drafts[0].check.score === 6));
  await p.click("text=✍️ Write it again"); await wait(300);
  check("Write it again starts from my corrected writing", (await p.inputValue("#draft")).startsWith("Every morning I wake up at 7. I went to college by bus yesterday. My mother cooks breakfast"));
  await p.fill("#draft", (await p.inputValue("#draft")) + " Then I study English."); await wait(100);
  check("Mam notices the writing changed since her check", (await p.textContent("#changed")).includes("You changed your writing"));
  await p.click("#checkBtn"); await wait(700);
  t = await txt();
  check("the second draft gets new marks, shown beside the first", (await p.textContent(".score")) === "8/10" && t.includes("Draft 1: 6") && t.includes("Draft 2: 8") && t.includes("↑ 2 better") && t.includes("Mam found no mistakes"));

  // ---- 2. sentences: one lesson at a time, from basic to advanced ----
  await more();
  t = await txt();
  check("after free writing, the sentence lessons open", t.includes("1 checked") && t.includes("0 of 32 done") && !t.includes("🔒 opens after free writing"));
  await kind("2. Sentences");
  t = await txt();
  check("Sentences shows only the lesson for now and the name of the next one", t.includes("Your lesson now · 1 of 32 · stage 1, Basic") && t.includes("A simple sentence") && t.includes("🔒 Next: Present simple. It opens when you pass this lesson.") && t.includes("After that, 30 more, one by one.") && !t.includes("Regrets") && (await p.$$(".list .trow")).length === 0);
  await p.click("text=📖 Open the lesson"); await wait(300);
  t = await txt();
  check("a lesson: when to use it, the pattern, examples, a common mistake, a task", t.includes("Kinds of sentences · level A1") && t.includes("Subject + verb (+ object or place)") && (await p.$$(".ex b.hl")).length === 3 && (await p.textContent(".ex b.hl >> nth=0")) === "I live" && t.includes("my brother work in bank") && t.includes("Write 4 simple sentences about yourself"));
  await wait(1000);
  await p.evaluate(() => { const d = JSON.parse(localStorage.getItem("likho.v1")); d.settings.view = { tab: "write", page: "lesson", kind: "sent", id: "regret" }; localStorage.setItem("likho.v1", JSON.stringify(d)); });
  const p2 = await p.context().newPage(); p2.on("pageerror", (e) => pageErrors.push(e.message));
  await p2.route("**/*", (r) => (r.request().url().startsWith("http://likho.test/") ? r.fulfill({ contentType: "text/html", body: html }) : r.abort()));
  await p2.addInitScript((sd) => { window.__seed = sd; }, seed); await p2.addInitScript(mock);
  await p2.goto("http://likho.test/"); await p2.waitForTimeout(900);
  check("a lesson further up the ladder stays locked", (await p2.textContent("#page")).includes("🔒 Regrets (I wish I had …)") && (await p2.textContent("#page")).includes("This lesson opens after you pass: A simple sentence.") && !!(await p2.$("text=Go to your lesson: A simple sentence")));
  await p2.close();
  await p.click("text=✍️ Start writing"); await wait(300);
  check("the practice keeps the pattern in view and goes back to the lesson", (await p.textContent(".task .formula")).includes("Subject + verb") && (await p.textContent(".back")).includes("A simple sentence") && (await p.textContent("#count")).includes("goal 4 to 5 sentences"));
  await p.fill("#draft", "My name is Sara. I live in Lahore. I have two brothers. I studies at a college.");
  await p.click("#checkBtn"); await wait(700);
  const rc = (await calls(/checking writing by a learner/)).pop();
  check("Mam checks the structure too", rc.prompt.includes("Task (Sentences practising A simple sentence)") && rc.prompt.includes("Pattern: Subject + verb") && rc.prompt.includes('"structure": {"used"'));
  t = await txt();
  check("the marks say how many sentences used the structure correctly", t.includes("✓ A simple sentence: used correctly in 3 of 4 sentences."));
  check("a good mark passes the lesson and opens the next one", t.includes("🎉 Lesson passed! The next lesson is open: Present simple.") && !!(await p.$("text=Go to the next lesson →")));
  await p.click("text=Go to the next lesson →"); await wait(300);
  check("the next lesson opens", (await txt()).includes("Present simple") && (await txt()).includes("Write 5 sentences about your daily routine."));
  await kind("2. Sentences");
  t = await txt();
  check("the course moves up one step, and keeps the finished lesson", t.includes("1 of 32 done") && t.includes("Your lesson now · 2 of 32") && t.includes("🔒 Next: Negative sentences") && t.includes("✅ Lessons you finished · 1"));
  await p.click("text=📖 Open the lesson"); await wait(300);
  await p.click("text=✨ A different task"); await wait(500);
  const gt = (await calls(/Give ONE new practice task/))[0];
  check("Mam gives a different task for the same structure", gt.prompt.includes('structure "Present simple"') && gt.tier === "quick" && (await txt()).includes("Write 5 sentences about your weekend.") && (await p.textContent("#count")).includes("goal 5 to 6 sentences"));

  // ---- a photo of handwriting ----
  const png = await p.screenshot({ clip: { x: 0, y: 0, width: 120, height: 120 } });
  await p.setInputFiles("#photoIn", { name: "page.png", mimeType: "image/png", buffer: png }); await wait(700);
  const hw = (await calls(/These are photos of handwriting/))[0];
  check("a photo of my handwriting goes to Mam as a picture", !!hw && hw.images === 1 && hw.prompt.includes("never correct anything"));
  check("Mam types what I wrote, keeping my mistakes, and says how readable it is", (await p.inputValue("#draft")) === "My name is Ali. i live in lahore." && (await p.textContent("#pieceStatus")).includes("Mam read your handwriting") && (await p.textContent("#pieceStatus")).includes("Hard to read: lahore") && (await p.$$("#photoThumbs img")).length === 1);

  // ---- 3. and 4. stay locked until the step before is finished ----
  await kind("3. Paragraphs");
  t = await txt();
  check("Paragraphs open only after every sentence lesson", t.includes("🔒 Not open yet") && t.includes("You have finished 1 of 32.") && !!(await p.$("text=Go to your lesson: Present simple")));
  await kind("4. Essays");
  check("Essays open only after every paragraph lesson", (await txt()).includes("Essays open after you finish all the paragraph lessons. You have finished 0 of 12."));

  // ---- précis ----
  await kind("Précis");
  await p.click("text=✨ Write me a passage"); await wait(600);
  t = await txt();
  check("Précis: Mam writes a passage and sets one third as the goal", (await calls(/Write an original passage/)).length === 1 && t.includes("📜 The passage · 89 words") && t.includes("goal about 30 words") && t.includes("Forests are very important"), t.slice(0, 300));
  await p.fill("#draft", "Forest is important for Pakistan because they give clean air and stop floods. People cut trees, so the land becomes dry and floods become more dangerous. Everyone must plant trees.");
  check("the précis counter: words without the title, the goal and its range", (await p.textContent("#count")) === "30 words (title not counted) · goal about 30, 27 to 33 · no title yet");
  await p.click("#checkBtn"); await wait(600);
  t = await txt();
  const pk = (await calls(/checking writing by a learner/)).pop();
  check("Mam marks the précis carefully, like a CSS examiner", pk.prompt.includes("Task (Précis)") && pk.prompt.includes('The learner\'s title: "(no title)"') && pk.prompt.includes("15 marks for the précis, 5 for the title") && pk.prompt.includes('"key_points"'));
  check("marks out of 20: the précis out of 15 and the title out of 5", (await p.textContent(".score")) === "10/20" && t.includes("Précis 10/15 · Title 0/5") && t.includes("Main ideas") && t.includes("5/7") && t.includes("Own words and style"));
  check("the length is measured on the phone, without the title", t.includes("✓ Length: 30 words (the title is not counted). The passage has 89 words, so the goal is about 30 (27 to 33)."));
  check("no title found: 0 of 5, and good titles suggested", t.includes("⚠ No title. Write a short title on the first line.") && t.includes("Saving Pakistan's Forests"));
  check("every key point: kept or missed", t.includes("Key points · you kept 3 of 4") && t.includes("✗ Tree planting needs ordinary people's help"));
  check("phrases copied from the passage are found", t.includes("Copied from the passage: 30% of your words") && t.includes("“the land becomes dry and floods become more dangerous”") && (await p.$$("mark.mk")).length === 1, t.slice(0, 900));

  // ---- comprehension from a pasted passage ----
  await kind("Comprehension");
  await p.click("#passPasteBtn");
  await p.fill("#passText", "Clean water is a big problem in Pakistan. Many people in villages and cities do not have safe water to drink. Dirty water causes many diseases, especially in children. The government and the people must work together to clean rivers and build water plants.");
  await p.click("#passGo"); await wait(600);
  t = await txt();
  check("a pasted passage: Mam adds questions, and the answer sheet is numbered", (await calls(/will use for comprehension practice/)).length === 1 && (await p.$$(".qs li")).length === 3 && (await p.inputValue("#draft")) === "1. \n\n2. \n\n3. ");
  await p.fill("#draft", "1. The main problem is no clean water.\n\n2. Because it is important.\n\n3. The government can build water plants.");
  await p.click("#checkBtn"); await wait(600);
  t = await txt();
  check("each answer marked right or wrong, with a model answer", t.includes("✓ Question 1: Correct.") && t.includes("✗ Question 2: You did not say why.") && (await p.$$("summary:has-text('A model answer')")).length === 2);
  await kind("Précis");
  await p.setInputFiles("#passPhoto", { name: "book.png", mimeType: "image/png", buffer: png }); await wait(600);
  check("a photo of a passage from my book becomes a précis task", (await calls(/This is a photo of a passage/))[0]?.images === 1 && (await p.textContent("#pageTitle")).includes("Forests"));

  // ---- My mistakes: review and lessons ----
  await p.click('#tabbar [data-tab="mistakes"]'); await wait(300);
  t = await txt();
  check("Mistakes: what to review today, my most common kinds, and all my mistakes", t.includes("1 mistake to fix again today") && (await p.$$(".trbar")).length === 4 && t.includes("All your mistakes · 4") && t.includes("I am agree"));
  await p.click("text=▶ Review"); await wait(250);
  check("review: one sentence at a time, with the mistake marked", (await txt()).includes("Review · 1 of 1") && (await p.textContent("mark.mk")) === "I am agree" && (await p.inputValue("#rvIn")) === "I am agree with you.");
  await p.fill("#rvIn", "I agree with you."); await p.click("text=Check"); await wait(250);
  check("a right fix in the review", (await p.textContent("#rvOut")).includes("✓ Right!"));
  await p.click("text=Next →"); await wait(200);
  check("the review ends with a summary, and the mistake comes back later", (await txt()).includes("You fixed 1 of 1 at the first try.") && (await p.textContent("#mistBadge").catch(() => "")) !== "1" && await p.isHidden("#mistBadge"));
  await p.click("text=Back to my mistakes"); await wait(200);
  await p.click('.trbar:has-text("Verb tense")'); await wait(700);
  t = await txt();
  const lc = (await calls(/Write a short lesson about this kind of mistake/))[0];
  check("a lesson on my most common kind of mistake, using my own mistakes", (await p.textContent("#pageTitle")) === "Verb tense" && t.includes("Use the past tense for things that happened") && t.includes("In Urdu the time word") && lc.prompt.includes("I go to college by bus yesterday"));
  await p.fill("#lp0", "Yesterday I ate rice."); await p.click("#lesson .fix >> nth=0 >> text=Check"); await wait(200);
  check("practice sentences in the lesson", (await p.textContent("#lesson .fix >> nth=0")).includes("✓ Right!"));

  // ---- progress ----
  await p.click('#tabbar [data-tab="progress"]'); await wait(300);
  t = await txt();
  check("Progress: my path, and my writing score from first drafts", (await p.textContent(".hero")).startsWith("5.8") && t.includes("first drafts") && t.includes("2. Sentences1 of 32") && t.includes("3. Paragraphs0 of 12"));
  check("a chart of Mam's marks and of the words I wrote each day", (await p.$$("#scoreChart .pt")).length === 4 && (await p.$$("#wordChart .bar")).length >= 1);
  check("this week: words, pieces, mistakes per 100 words, mistakes fixed alone", t.includes("words written") && t.includes("pieces checked") && t.includes("mistakes per 100 words") && t.includes("67%") && t.includes("mistakes you fixed alone"));
  check("marks by area, with what to improve", (await p.$$(".part")).length === 8 && t.includes("Task and ideas") && t.includes("To improve:"));
  await p.click(".tbl summary"); await wait(100);
  check("the numbers in a table", (await p.$$(".tbl tbody tr")).length === 5);
  await shot("progress");

  // ---- settings and level ----
  await p.click('#tabbar [data-tab="write"]'); await wait(200);
  await p.click('#tabbar [data-tab="write"]'); await wait(200); // the tab first opens where I left it, a second tap goes to its first page
  await p.click("#setBtn"); await p.selectOption("#lvSel", "B1"); await p.click("#setSheet [data-close].btn.primary"); await wait(300);
  await more(); t = await txt();
  check("the level is saved, and the sentence course keeps its place", t.includes("1 of 32 done") && await p.evaluate(() => JSON.parse(localStorage.getItem("likho.v1")).settings.level === "B1"));
  check("my writing list shows each piece with its last mark", t.includes("Free writing · last mark 8/10") && t.includes("A simple sentence · last mark 6/10"));
  check("Bolo English is one tap away in Settings", (await p.getAttribute("#boloLink", "href")).includes("claude.ai/artifact/"));


  // ---- the précis course: lessons, a guided précis ----
  await kind("Précis");
  t = await txt();
  check("Précis: the CSS marks, the lesson for now, a guided précis and practice", t.includes("worth 20 marks: 15 for the précis and 5 for the title") && t.includes("Learn précis, one lesson at a time · 0 of 12 done") && t.includes("1. What is a précis?") && t.includes("🔒 Next: Six qualities of a good précis") && !t.includes("12. The CSS précis question") && t.includes("Guided précis"));
  await p.click('.list .trow:has-text("1. What is a précis?")'); await wait(300);
  t = await txt();
  check("a précis lesson: the idea, the rules, how it differs, and an exercise", t.includes("Précis lesson 1 of 12") && t.includes("It is about one third of the length") && t.includes("Paraphrase:") && t.includes("write two differences between a précis and a paraphrase") && t.includes("Pass the exercise to open the next lesson."));
  await p.fill("#exIn", "Shorter text"); await p.click("text=✓ Check my answer"); await wait(400);
  check("a weak answer: Mam explains, shows a good answer, and the next lesson stays closed", (await p.textContent("#exOut")).includes("Not quite yet.") && (await p.textContent("#exOut")).includes("A good answer:") && !(await p.$("text=Next lesson →")));
  await p.fill("#exIn", "A précis is much shorter and keeps only the main ideas, but a paraphrase keeps every detail."); await p.click("text=✓ Check my answer"); await wait(400);
  const xc = (await calls(/précis writing\. Lesson:/)).pop();
  check("a good answer passes the lesson", (await p.textContent("#exOut")).includes("✓ Right!") && xc.prompt.includes("Lesson: What is a précis?") && xc.prompt.includes("A good answer: A précis is much shorter"));
  await p.click("text=Next lesson →"); await wait(200);
  check("then the next lesson opens", (await txt()).includes("Précis lesson 2 of 12") && (await txt()).includes("Six qualities of a good précis"));
  await kind("Précis");
  check("the finished lesson is kept, and the next one is the lesson for now", (await txt()).includes("1 of 12 done") && (await txt()).includes("✅ Lessons you finished · 1") && (await txt()).includes("2. Six qualities of a good précis"));
  await p.click("text=🧭 Start"); await wait(600);
  t = await txt();
  check("a guided précis starts with step 1, the central idea", t.includes("Step 1 · The central idea") && t.includes("Forests are very important") && !(await p.$("#draft")));
  await p.fill("#gIn", "Forests are important for Pakistan, but we are losing them, so we must plant trees."); await p.click("text=✓ Check"); await wait(400);
  check("step 1 is checked, with Mam's central idea", (await txt()).includes("✓ You found the central idea.") && (await txt()).includes("Mam's central idea: Forests are vital"));
  await p.click("text=Next step →"); await wait(200);
  await p.fill("#gIn", "1. Forests give clean air and wood\n2. Trees stop floods\n3. Every family can plant one tree\n4. People must help to plant trees"); await p.click("text=✓ Check"); await wait(400);
  t = await txt();
  check("step 2: the key points found and missed, and details that are not key points", t.includes("Key points · you found 3 of 4") && t.includes("✗ Pakistan has few forests and cuts many trees") && t.includes("These are details, not key points"));
  await p.click("text=Next step →"); await wait(200);
  await p.fill("#gIn", "Saving Our Forests"); await p.click("text=✓ Check"); await wait(400);
  check("step 3: the title, with good titles", (await txt()).includes("✓ A good title.") && (await txt()).includes("Forests in Danger"));
  await p.click("text=Next: write the précis →"); await wait(300);
  check("step 4: the précis, with my plan beside it and my title already on the first line", (await p.inputValue("#draft")) === "Title: Saving Our Forests\n\n" && (await txt()).includes("Your plan") && (await txt()).includes("🏷️ Saving Our Forests") && (await p.textContent("#count")).includes("title ✓"));
  await p.fill("#draft", "Title: Saving Our Forests\n\nForests give Pakistan clean air and wood and protect it from floods. However, they are few and people keep cutting them, which makes floods worse. Therefore, ordinary people must help to plant trees.");
  await p.click("#checkBtn"); await wait(600);
  t = await txt();
  check("the guided précis is marked out of 20, with the title counted", (await p.textContent(".score")) === "14/20" && t.includes("Title 4/5") && t.includes("✓ Title: “Saving Our Forests”") && t.includes("✓ In your own words"));

  // ---- examples, when I ask ----
  await kind("2. Sentences");
  await p.click("text=📖 Open the lesson"); await wait(300);
  await p.click("text=👀 See an example answer"); await wait(500);
  check("a lesson shows an example answer when I ask, with the structure highlighted", (await p.$$("#lessonEx b.hl")).length === 2 && (await p.textContent("#lessonEx")).includes("Why it is good") && (await calls(/Write a model answer to show/)).length === 1);
  await p.click("text=✍️ Start writing"); await wait(300);
  await p.click("text=👀 Show me an example"); await wait(500);
  const exc = (await calls(/Write a model answer to show/)).pop();
  check("so does a task, for exactly this task", (await p.textContent("#exampleBox")).includes("I wish I had studied") && exc.prompt.includes("Write 5 sentences about your daily routine.") && exc.prompt.includes("[square brackets]"));
  await p.click("text=Hide the example"); await wait(100);
  check("the example can be hidden, to write my own", (await p.textContent("#exampleBox")) === "");

  // ---- tests ----
  await tests();
  t = await txt();
  check("Tests: six sentence tests (the weekly Stage 1 test too) and four writing tests", (await p.$$(".list .trow")).length === 10 && t.includes("Weekly test: Stage 1") && t.includes("Past test") && t.includes("All tenses test") && t.includes("Précis test") && t.includes("marked out of 20"));
  await p.click('.list .trow:has-text("Past test")'); await wait(600);
  const tg2 = (await calls(/making a short test for/)).pop();
  t = await txt();
  check("a past test: 5 mistakes to fix, 5 sentences to rewrite and a writing task", tg2.prompt.includes("Regrets (I wish I had …)") && (await p.$$('input[id^="t-fix-"]')).length === 5 && (await p.$$('input[id^="t-rewrite-"]')).length === 5 && !!(await p.$("#testWrite")) && t.includes("⏱ 0 min so far · suggested time 20 min"));
  await p.fill("#t-fix-0", "Yesterday I went to the market."); await p.fill("#t-fix-1", "I was cooking when he came."); await p.fill("#t-fix-2", "I used to live in Multan."); await p.fill("#t-fix-3", "When I reached, the train had already left."); await p.fill("#t-fix-4", "I wish I studied harder.");
  await p.fill("#t-rewrite-0", "I used to live in Multan."); await p.fill("#t-rewrite-1", "I wish I had studied hard."); await p.fill("#t-rewrite-2", "I should have called you."); await p.fill("#t-rewrite-3", "I cooked when the phone rang."); await p.fill("#t-rewrite-4", "The train had left when I arrived.");
  await p.fill("#testWrite", "When I was a child, I use to play cricket. We lived in Multan. I wish I had studied more.");
  await p.click("#testSubmit"); await wait(700);
  t = await txt();
  check("the test is marked: 8 of 10 answers right plus 7 for the writing, 75%", (await p.textContent(".score")) === "15/20" && t.includes("75% · ✓ Passed") && t.includes("✗ Check the tense here.") && t.includes("Answer: I wish I had studied harder last year.") && t.includes("Writing: 7/10") && t.includes("I used to"));
  await wait(1000);
  const tm = Object.values(await store()).filter((d) => d?.kind === "test" && d.wrong);
  check("the wrong answers go to my mistakes for review", tm.length === 3 && tm.some((m) => m.wrong === "I wish I studied harder last year." && m.right === "I wish I had studied harder last year."));
  await tests();
  t = await txt();
  check("the result is kept, with my best score", t.includes("Past test") && t.includes("best 75%") && t.includes("75% · passed"));
  await p.click('.list .trow:has-text("Paragraph test")'); await wait(400);
  t = await txt();
  check("a paragraph test: Mam chooses the kind and topic, with a timer and no hints", (await p.textContent("#pageTitle")).startsWith("🎯") && t.includes("Test · ") && t.includes("⏱ 0 min so far · suggested time 20 min") && !t.includes("The plan of") && !t.includes("Show me an example"));
  await p.fill("#draft", "This is my test paragraph. It has several sentences about the topic. I wrote it in a short time. It is the end of my paragraph.");
  await p.click("#checkBtn"); await wait(700);
  check("the first check gives the test result", (await txt()).includes("🎯 Test result: 60% · ✓ Passed"));


  // ---- later on the ladder: paragraphs (after every sentence lesson), then essays ----
  const SENT_IDS = ["basic", "pres-simple", "neg", "questions", "pres-cont", "past-simple", "will", "going-to", "commands", "compound", "complex", "past-cont", "used-to", "pres-perf", "modals", "cond0", "cond1", "pres-future", "pres-perf-cont", "past-perf", "relative", "passive", "pres-wish", "cond2", "regret", "should-have", "fut-cont", "fut-perf", "hopes", "cc", "past-perf-cont", "cond3"];
  const PARA_IDS = ["narrative", "descriptive", "process", "subjective", "objective", "expository", "definition", "compare", "cause", "problem", "persuasive", "argumentative"];
  const finished = (kind, ids) => Object.fromEntries(ids.map((id, i) => ["p_d" + kind + i, { id: "d" + kind + i, kind, lesson: id, task: { title: id }, text: "Done.", created: now - 86400000, updated: now - 86400000 + i,
    drafts: [{ text: "Done before.", at: now - 86400000 + i, words: 2, fixes: [], check: { score: 7, areas: { task: 7, organisation: 7, grammar: 7, vocabulary: 7 }, mistakes: [], good: [], next: [], better: "", structure: kind === "sent" ? { used: 4, total: 4, ok: true, note: "" } : { ok: true, note: "" } } }] }]));
  const freeDone = { p_dfree: { id: "dfree", kind: "free", task: { title: "Free writing" }, text: "x", created: now - 86400000, updated: now - 86400000, drafts: [{ text: "My day.", at: now - 86400000, words: 2, fixes: [], check: { score: 6, areas: { task: 6, organisation: 6, grammar: 6, vocabulary: 6 }, mistakes: [], good: [], next: [], better: "" } }] } };
  const openApp = async (docs) => {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 } }), q = await ctx.newPage();
    q.on("pageerror", (e) => pageErrors.push(e.message));
    await q.route("**/*", (r) => (r.request().url().startsWith("http://likho.test/") ? r.fulfill({ contentType: "text/html", body: html }) : r.abort()));
    await q.addInitScript((d) => { window.__seed = { "data/users/u_test": d, library: {} }; }, docs);
    await q.addInitScript(mock);
    await q.goto("http://likho.test/"); await q.waitForTimeout(900);
    return q;
  };
  const qt = (q) => q.textContent("#page");
  const qkind = async (q, name) => { await more(q); await q.click('.list .trow:has-text("' + name + '")'); await q.waitForTimeout(250); };
  const qcalls = (q, re) => q.evaluate((src) => window.__calls.filter((c) => new RegExp(src).test(c.prompt)), re.source);

  let q = await openApp({ ...freeDone, ...finished("sent", SENT_IDS), ...finished("para", PARA_IDS.slice(0, 4)) });
  await more(q); t = await qt(q);
  check("after every sentence lesson, the paragraph lessons open", t.includes("32 of 32 done") && t.includes("4 of 12 done") && t.includes("🔒 opens after paragraphs"));
  await qkind(q, "3. Paragraphs");
  t = await qt(q);
  check("Paragraphs: one kind at a time, from narrative to argumentative", t.includes("Your lesson now · 5 of 12") && t.includes("Objective paragraph") && t.includes("🔒 Next: Expository paragraph") && t.includes("✅ Lessons you finished · 4") && !t.includes("Argumentative paragraph"));
  await q.click("text=📖 Open the lesson"); await q.waitForTimeout(300);
  t = await qt(q);
  check("the objective paragraph lesson: its plan, useful words, an example and the same topic two ways", t.includes("avoid I, we and you") && t.includes("According to") && t.includes("According to the 2023 census") && t.includes("The same topic, two ways") && t.includes("Subjective: The Badshahi Mosque is the most beautiful building"));
  await q.fill("#ownTopic", "The rivers of my province"); await q.click("#page form .btn"); await q.waitForTimeout(300);
  t = await qt(q);
  check("a paragraph on my own topic, with its plan and a word goal", t.includes('Write an objective paragraph about "The rivers of my province".') && t.includes("Objective paragraph · goal 50 to 80 words") && t.includes("The plan of an objective paragraph"));
  await q.fill("#draft", "I think the Indus is the most amazing river. It comes from Tibet and flows through all of Pakistan. It gives water to farms in Punjab and Sindh. I feel it is very important for us.");
  await q.click("#checkBtn"); await q.waitForTimeout(700);
  const pc = (await qcalls(q, /checking writing by a learner/)).pop();
  t = await qt(q);
  check("Mam checks the plan and the style of the paragraph", pc.prompt.includes("What an objective paragraph needs") && pc.prompt.includes('"structure": {"ok"') && t.includes("⚠ It does not yet follow the plan of an objective paragraph.") && t.includes("should not use I think"));
  check("without the right plan the lesson is not passed yet", !t.includes("Lesson passed"));
  await qkind(q, "4. Essays");
  check("Essays stay locked until every paragraph lesson is done", (await qt(q)).includes("You have finished 4 of 12."));
  await q.context().close();

  q = await openApp({ ...freeDone, ...finished("sent", SENT_IDS), ...finished("para", PARA_IDS) });
  await qkind(q, "4. Essays");
  t = await qt(q);
  check("Essays: one kind at a time, the CSS essay last", t.includes("Your lesson now · 1 of 9") && t.includes("Narrative essay") && t.includes("🔒 Next: Descriptive essay") && t.includes("After that, 7 more") && (await q.$$('.trow:has-text("CSS essay")')).length === 0);
  await q.click("text=📖 Open the lesson"); await q.waitForTimeout(300);
  check("the essay lesson: how to plan it and the outline plan", (await qt(q)).includes("The most important moment (the climax)") && (await qt(q)).includes("The lesson of the story"));
  await q.click('.list .trow:has-text("A day that changed my life")'); await q.waitForTimeout(300);
  check("an essay starts with the outline, using the plan for its kind", (await q.getAttribute('.tab:has-text("1 · Outline")', "aria-selected")) === "true" && (await q.getAttribute("#draft", "placeholder")).startsWith("The lesson of the story") && (await q.textContent("#checkBtn")).includes("Check my outline"));
  await q.fill("#draft", "The lesson: never give up.\nI. I failed my first exam\nII. I studied every night\nIII. I passed with good marks\nConclusion: hard work pays.");
  await q.click("#checkBtn"); await q.waitForTimeout(600);
  const oc = (await qcalls(q, /Check their essay OUTLINE/)).pop();
  check("Mam checks the outline for a narrative essay", oc.prompt.includes("is planning a narrative essay") && oc.prompt.includes("A good outline follows this plan") && (await q.textContent(".score")) === "6/10" && (await qt(q)).includes("Mam's outline for this topic"));
  await q.click("text=Next: write the essay →"); await q.waitForTimeout(300);
  check("then the essay: Introduction first, with a word goal for my level", (await q.getAttribute('.tab:has-text("2 · Essay")', "aria-selected")) === "true" && (await q.getAttribute('.tab:has-text("Introduction")', "aria-selected")) === "true" && (await q.textContent("#count")).includes("goal 80 to 150 words"));
  await q.fill("#draft", "Two years ago, I failed my first university exam, and I felt that my dream was over. My family was worried, and I did not know what to do. That day changed my life, because it taught me that I should never give up.");
  await q.click("#checkBtn"); await q.waitForTimeout(600);
  const ec = (await qcalls(q, /checking writing by a learner/)).pop();
  check("Mam checks the introduction against the outline and the kind of essay", ec.prompt.includes("Task (Narrative essay, introduction)") && ec.prompt.includes("only the introduction") && ec.prompt.includes("The lesson: never give up.") && ec.prompt.includes("for the part they wrote"));
  check("a good introduction passes the narrative essay lesson", (await qt(q)).includes("🎉 Lesson passed! The next lesson is open: Descriptive essay."));
  await q.click('.tab:has-text("Whole essay")'); await q.waitForTimeout(200);
  check("the whole essay has a bigger goal", (await q.textContent("#count")).includes("goal 300 to 600 words"));
  await q.context().close();

  // ---- layout and errors ----
  const body = await p.evaluate(() => document.body.innerText);
  check("no Urdu on screen", !/[؀-ۿ]/.test(body));
  check("no sideways scroll", !(await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)));
  const errs = [...pageErrors, ...(await p.evaluate(() => window.__errors))];
  check("no page errors", errs.length === 0, errs.join(" ; "));
  await b.close();
  const failed = results.filter((x) => !x).length;
  console.log(`\n${results.length - failed}/${results.length} passed`);
  process.exit(failed ? 1 : 0);
})();
