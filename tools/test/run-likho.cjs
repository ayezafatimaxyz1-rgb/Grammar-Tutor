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
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
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
  const kind = async (name) => { await p.click('#tabbar [data-tab="write"]'); await wait(150); if (!(await p.$('.trow:has-text("' + name + '")'))) { await p.click('#tabbar [data-tab="write"]'); await wait(150); } await p.click('.list .trow:has-text("' + name + '")'); await wait(250); };
  const shot = (n) => p.screenshot({ path: path.join(process.env.SHOTS || "/tmp", "likho-" + n + ".png") }).catch(() => {});

  // ---- home: the path ----
  let t = await txt();
  check("opens on Write: the next step is free writing, then the 4-step path and exam practice", (await p.textContent("#pageTitle")).includes("Write") && t.includes("Next step · 1. Free writing") && t.includes("1. Free writing") && t.includes("2. Sentences") && t.includes("0 of 32 done") && t.includes("3. Paragraphs") && t.includes("0 of 12 done") && t.includes("4. Essays") && t.includes("0 of 9 done") && t.includes("Exam practice") && (await p.$$(".list .trow")).length === 6);
  check("four tabs (Write, Tests, Mistakes, Progress), Write is open, and 1 mistake waits for review", (await p.$$("#tabbar button")).length === 4 && (await p.getAttribute('#tabbar [data-tab="write"]', "aria-current")) === "page" && (await p.textContent("#mistBadge")) === "1");

  // ---- 1. free writing: grammar corrections first ----
  await p.click(".next >> text=✍️ Start writing"); await wait(300);
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
  check("the corrected writing and Mam's version stay locked until I try", t.includes("Fix every mistake above") && !(await p.$(".corrected")) && !(await p.$("p.better")));
  await shot("check");
  await p.fill("#fixIn0", "Every morning I"); await p.click('#fix0 button:has-text("Check")'); await wait(300);
  check("I fix a mistake myself: it turns green", (await p.textContent("#fix0")).includes("✓ You fixed it: Every morning I") && (await txt()).includes("1 of 3 done") && (await p.getAttribute("mark.mk >> nth=0", "class")).includes("done"));
  await p.fill("#fixIn1", "I gone to college by bus yesterday"); await p.click('#fix1 button:has-text("Check")'); await wait(400);
  check("a wrong fix: Mam says not yet, with a reason", (await p.textContent("#fix1 .fout")).includes("Not yet. Use the past tense here.") && (await calls(/is correcting one mistake/)).length === 1);
  await p.click('#fix1 button:has-text("Show the answer")'); await wait(200);
  check("Show the answer: the correction and why", (await p.textContent("#fix1")).includes("Answer: I went to college by bus yesterday") && (await p.textContent("#fix1")).includes("Why: Use the past tense for yesterday."));
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

  // ---- 2. sentences: every kind and every tense ----
  await p.click('#tabbar [data-tab="write"]'); await wait(200);
  t = await txt();
  check("after free writing, the next step is the first sentence lesson", t.includes("Next step · 2. Sentences") && t.includes("A simple sentence") && t.includes("1 checked"));
  await kind("2. Sentences");
  t = await txt();
  check("Sentences: 32 lessons in 4 units (kinds of sentences, present, past, future)", (await p.$$(".list .trow")).length === 32 && t.includes("Kinds of sentences · 0 of 8 done") && t.includes("Present · 0 of 9 done") && t.includes("Past · 0 of 8 done") && t.includes("Future · 0 of 7 done") && t.includes("Compound-complex sentences") && t.includes("Wishes about now") && t.includes("Future perfect"));
  await p.click('.list .trow:has-text("Regrets (I wish I had")'); await wait(300);
  t = await txt();
  check("a lesson: when to use it, the pattern, examples, a common mistake, a task", t.includes("Past · level B1") && t.includes("I wish / If only + had + past participle") && (await p.$$(".ex b.hl")).length === 3 && (await p.textContent(".ex b.hl >> nth=0")) === "wish I had studied" && t.includes("I wish I studied harder last year.") && t.includes("Write 4 regrets about your past."));
  await p.click("text=✍️ Start writing"); await wait(300);
  check("the practice keeps the pattern in view and goes back to the lesson", (await p.textContent(".task .formula")).includes("I wish / If only") && (await p.textContent(".back")).includes("Regrets (I wish I had") && (await p.textContent("#count")).includes("goal 4 to 5 sentences"));
  await p.fill("#draft", "I wish I had studied harder. I wish I hadn't wasted so much time. If only I had listened to my father. I wish I go to Lahore last year.");
  await p.click("#checkBtn"); await wait(700);
  const rc = (await calls(/checking writing by a learner/)).pop();
  check("Mam checks the structure too", rc.prompt.includes("Task (Sentences practising Regrets (I wish I had …))") && rc.prompt.includes("Pattern: I wish / If only + had") && rc.prompt.includes('"structure": {"used"'));
  check("the marks say how many sentences used the structure correctly", (await txt()).includes("✓ Regrets (I wish I had …): used correctly in 3 of 4 sentences.") && (await txt()).includes("You used I wish I had well"));
  await p.click(".back"); await wait(200);
  check("a lesson with a good mark is done", (await txt()).includes("✓ Done. Your best mark: 6/10"));
  await p.click(".back"); await wait(200);
  check("the unit shows it as done", (await txt()).includes("Past · 1 of 8 done") && (await p.textContent('.list .trow:has-text("Regrets (I wish I had")')).includes("✅"));
  await p.click('.list .trow:has-text("Past simple")'); await wait(200);
  await p.click("text=✨ A different task"); await wait(500);
  const gt = (await calls(/Give ONE new practice task/))[0];
  check("Mam gives a different task for the same structure", gt.prompt.includes('structure "Past simple"') && gt.tier === "quick" && (await txt()).includes("Write 5 sentences about your weekend.") && (await p.textContent("#count")).includes("goal 5 to 6 sentences"));

  // ---- a photo of handwriting ----
  const png = await p.screenshot({ clip: { x: 0, y: 0, width: 120, height: 120 } });
  await p.setInputFiles("#photoIn", { name: "page.png", mimeType: "image/png", buffer: png }); await wait(700);
  const hw = (await calls(/These are photos of handwriting/))[0];
  check("a photo of my handwriting goes to Mam as a picture", !!hw && hw.images === 1 && hw.prompt.includes("never correct anything"));
  check("Mam types what I wrote, keeping my mistakes, and says how readable it is", (await p.inputValue("#draft")) === "My name is Ali. i live in lahore." && (await p.textContent("#pieceStatus")).includes("Mam read your handwriting") && (await p.textContent("#pieceStatus")).includes("Hard to read: lahore") && (await p.$$("#photoThumbs img")).length === 1);

  // ---- 3. paragraphs: every kind, objective and subjective ----
  await kind("3. Paragraphs");
  t = await txt();
  check("Paragraphs: 12 kinds, objective and subjective too", (await p.$$(".list .trow")).length === 12 && t.includes("Narrative paragraph") && t.includes("Cause and effect paragraph") && t.includes("Objective paragraph") && t.includes("Subjective paragraph"));
  await p.click('.list .trow:has-text("Objective paragraph")'); await wait(300);
  t = await txt();
  check("the objective paragraph lesson: its plan, useful words, an example and the same topic two ways", t.includes("avoid I, we and you") && t.includes("According to") && t.includes("According to the 2023 census") && t.includes("The same topic, two ways") && t.includes("Subjective: The Badshahi Mosque is the most beautiful building"));
  await p.fill("#ownTopic", "The rivers of my province"); await p.click("#page form .btn"); await wait(300);
  t = await txt();
  check("a paragraph on my own topic, with its plan and a word goal", t.includes('Write an objective paragraph about "The rivers of my province".') && t.includes("Objective paragraph · goal 50 to 80 words") && t.includes("The plan of an objective paragraph"));
  await p.fill("#draft", "I think the Indus is the most amazing river. It comes from Tibet and flows through all of Pakistan. It gives water to farms in Punjab and Sindh. I feel it is very important for us.");
  await p.click("#checkBtn"); await wait(700);
  const pc = (await calls(/checking writing by a learner/)).pop();
  check("Mam checks the plan and the style of the paragraph", pc.prompt.includes("What an objective paragraph needs") && pc.prompt.includes('"structure": {"ok"') && (await txt()).includes("⚠ It does not yet follow the plan of an objective paragraph.") && (await txt()).includes("should not use I think"));

  // ---- 4. essays: every kind, with an outline first ----
  await kind("4. Essays");
  check("Essays: 9 kinds, the CSS essay too", (await p.$$(".list .trow")).length === 9 && (await txt()).includes("Argumentative essay") && (await txt()).includes("CSS essay"));
  await p.click('.list .trow:has-text("Argumentative essay")'); await wait(300);
  check("the essay lesson: how to plan it and the outline plan", (await txt()).includes("Counter arguments: give the other side fairly") && (await txt()).includes("Thesis (my position)"));
  await p.click('.list .trow:has-text("Social media does more harm than good")'); await wait(300);
  check("an essay starts with the outline, using the plan for its kind", (await p.getAttribute('.tab:has-text("1 · Outline")', "aria-selected")) === "true" && (await p.getAttribute("#draft", "placeholder")).startsWith("Thesis (my position)") && (await p.textContent("#checkBtn")).includes("Check my outline"));
  await p.fill("#draft", "Thesis: Social media harms young people more than it helps them.\nI. It wastes time\nII. Fake news\nIII. Less sleep\nIV. Some say it connects people, but real friendships suffer\nConclusion: Use it carefully.");
  await p.click("#checkBtn"); await wait(600);
  const oc = (await calls(/Check their essay OUTLINE/)).pop();
  t = await txt();
  check("Mam checks the outline for an argumentative essay", oc.prompt.includes("is planning an argumentative essay") && oc.prompt.includes("A good outline follows this plan") && (await p.textContent(".score")) === "6/10" && t.includes("Mam's outline for this topic"));
  await p.click("text=Next: write the essay →"); await wait(300);
  check("then the essay: Introduction first, with a word goal for my level", (await p.getAttribute('.tab:has-text("2 · Essay")', "aria-selected")) === "true" && (await p.getAttribute('.tab:has-text("Introduction")', "aria-selected")) === "true" && (await p.textContent("#count")).includes("goal 80 to 150 words"));
  await p.fill("#draft", "Today almost every young person in Pakistan has a smartphone and spends hours on social media every day. It helps people share news and stay in touch with family. However, in this essay I will argue that social media does more harm than good to young people.");
  await p.click("#checkBtn"); await wait(600);
  const ec = (await calls(/checking writing by a learner/)).pop();
  check("Mam checks the introduction against the outline and the kind of essay", ec.prompt.includes("Task (Argumentative essay, introduction)") && ec.prompt.includes("only the introduction") && ec.prompt.includes("Thesis: Social media harms") && ec.prompt.includes("for the part they wrote"));
  await p.click('.tab:has-text("Whole essay")'); await wait(200);
  check("the whole essay has a bigger goal", (await p.textContent("#count")).includes("goal 300 to 600 words"));
  await kind("4. Essays");
  await p.click('.list .trow:has-text("CSS essay")'); await wait(300);
  check("the CSS essay: 12 topics, or my own", (await p.$$(".list .trow")).length === 12 && !!(await p.$("#ownTopic")));
  await p.click('.list .trow:has-text("Climate change: a threat to Pakistan")'); await wait(300);
  check("a CSS essay task, with the CSS outline plan", (await p.textContent("#pageTitle")).includes("Climate change: a threat to Pakistan") && (await p.getAttribute("#draft", "placeholder")).startsWith("Thesis statement:") && await p.evaluate(() => JSON.parse(localStorage.getItem("likho.v1")).pieces[0].task.prompt === 'Write a CSS essay on "Climate change: a threat to Pakistan". Make an outline first, then write the essay.'));

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
  check("a chart of Mam's marks and of the words I wrote each day", (await p.$$("#scoreChart .pt")).length === 6 && (await p.$$("#wordChart .bar")).length >= 1);
  check("this week: words, pieces, mistakes per 100 words, mistakes fixed alone", t.includes("words written") && t.includes("pieces checked") && t.includes("mistakes per 100 words") && t.includes("67%") && t.includes("mistakes you fixed alone"));
  check("marks by area, with what to improve", (await p.$$(".part")).length === 8 && t.includes("Task and ideas") && t.includes("To improve:"));
  await p.click(".tbl summary"); await wait(100);
  check("the numbers in a table", (await p.$$(".tbl tbody tr")).length === 7);
  await shot("progress");

  // ---- settings and level ----
  await p.click('#tabbar [data-tab="write"]'); await wait(200);
  await p.click('#tabbar [data-tab="write"]'); await wait(200); // the tab first opens where I left it, a second tap goes to its first page
  await p.click("#setBtn"); await p.selectOption("#lvSel", "B1"); await p.click("#setSheet [data-close].btn.primary"); await wait(300);
  t = await txt();
  check("the level is saved, and the path still starts with the next lesson", t.includes("Next step · 2. Sentences") && await p.evaluate(() => JSON.parse(localStorage.getItem("likho.v1")).settings.level === "B1"));
  check("my writing list shows each piece with its last mark", t.includes("Free writing · last mark 8/10") && t.includes("Regrets (I wish I had …) · last mark 6/10"));
  check("Bolo English is one tap away in Settings", (await p.getAttribute("#boloLink", "href")).includes("claude.ai/artifact/"));


  // ---- the précis course: lessons, a guided précis ----
  await kind("Précis");
  t = await txt();
  check("Précis: the CSS marks, 12 lessons, a guided précis and practice", t.includes("worth 20 marks: 15 for the précis and 5 for the title") && t.includes("Learn précis, step by step · 0 of 12 done") && (await p.$$(".list .trow")).filter ? (await p.$$('.list .trow:has-text("1. What is a précis?")')).length === 1 && t.includes("12. The CSS précis question") && t.includes("Guided précis") : false);
  await p.click('.list .trow:has-text("4. Find the central idea")'); await wait(300);
  t = await txt();
  check("a précis lesson: the idea, how to do it, and an exercise on a passage", t.includes("Précis lesson 4 of 12") && t.includes("Look at the first and the last sentences") && t.includes("In the age of mobile phones") && t.includes("Write the central idea of this passage in one sentence"));
  await p.fill("#exIn", "Mobile phones"); await p.click("text=✓ Check my answer"); await wait(400);
  check("a weak answer: Mam explains, and shows a good answer", (await p.textContent("#exOut")).includes("Not quite yet.") && (await p.textContent("#exOut")).includes("A good answer:"));
  await p.fill("#exIn", "Reading books is being forgotten, but it makes us think deeply and helps our language."); await p.click("text=✓ Check my answer"); await wait(400);
  const xc = (await calls(/précis writing\. Lesson:/)).pop();
  check("a good answer passes the lesson", (await p.textContent("#exOut")).includes("✓ Right!") && xc.prompt.includes("Lesson: Find the central idea") && xc.prompt.includes("A good answer: Reading books, now neglected"));
  await p.click("text=Next lesson →"); await wait(200);
  check("lessons follow one another", (await txt()).includes("Précis lesson 5 of 12") && (await txt()).includes("Key points and details"));
  await kind("Précis");
  check("the done lesson is ticked", (await txt()).includes("1 of 12 done") && (await p.textContent('.list .trow:has-text("4. Find the central idea")')).includes("✅"));
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
  await p.click('.list .trow:has-text("Regrets (I wish I had")'); await wait(300);
  await p.click("text=👀 See an example answer"); await wait(500);
  check("a lesson shows an example answer when I ask, with the structure highlighted", (await p.$$("#lessonEx b.hl")).length === 2 && (await p.textContent("#lessonEx")).includes("Why it is good") && (await calls(/Write a model answer to show/)).length === 1);
  await p.click("text=✍️ Start writing"); await wait(300);
  await p.click("text=👀 Show me an example"); await wait(500);
  const exc = (await calls(/Write a model answer to show/)).pop();
  check("so does a task, for exactly this task", (await p.textContent("#exampleBox")).includes("I wish I had studied") && exc.prompt.includes("Write 4 regrets about your past.") && exc.prompt.includes("[square brackets]"));
  await p.click("text=Hide the example"); await wait(100);
  check("the example can be hidden, to write my own", (await p.textContent("#exampleBox")) === "");

  // ---- tests ----
  await p.click('#tabbar [data-tab="tests"]'); await wait(300);
  t = await txt();
  check("Tests: five sentence tests and four writing tests", (await p.$$(".list .trow")).length === 9 && t.includes("Past test") && t.includes("All tenses test") && t.includes("Précis test") && t.includes("marked out of 20"));
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
  await p.click('#tabbar [data-tab="tests"]'); await wait(200);
  if (!(await p.$(".list .trow"))) { await p.click('#tabbar [data-tab="tests"]'); await wait(200); }
  t = await txt();
  check("the result is kept, with my best score", t.includes("Past test") && t.includes("best 75%") && t.includes("75% · passed"));
  await p.click('.list .trow:has-text("Paragraph test")'); await wait(400);
  t = await txt();
  check("a paragraph test: Mam chooses the kind and topic, with a timer and no hints", (await p.textContent("#pageTitle")).startsWith("🎯") && t.includes("Test · ") && t.includes("⏱ 0 min so far · suggested time 20 min") && !t.includes("The plan of") && !t.includes("Show me an example"));
  await p.fill("#draft", "This is my test paragraph. It has several sentences about the topic. I wrote it in a short time. It is the end of my paragraph.");
  await p.click("#checkBtn"); await wait(700);
  check("the first check gives the test result", (await txt()).includes("🎯 Test result: 60% · ✓ Passed"));

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
