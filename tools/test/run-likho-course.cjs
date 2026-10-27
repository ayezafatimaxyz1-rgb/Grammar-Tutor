// End-to-end check of the Likho course: the placement test, today's lesson in five steps, every kind of question,
// check-ups on later days, the weekly test and the monthly writing check. Runs in the fake Claude runtime (mock-claude.js).
// Usage: node tools/test/run-likho-course.cjs
const path = require("path");
const fs = require("fs");
let pw;
try { pw = require("playwright"); } catch { pw = require(require("child_process").execSync("npm root -g").toString().trim() + "/playwright"); }

const root = path.resolve(__dirname, "../..");
const page = fs.readFileSync(path.join(root, "likho-english.html"), "utf8");
const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light}body{margin:0}[hidden]{display:none!important}</style></head><body>${page}</body></html>`;
const mock = fs.readFileSync(path.join(__dirname, "mock-claude.js"), "utf8");
const STAGE1 = eval(page.slice(page.indexOf("const STAGE1 = [") + 15, page.indexOf("];\nconst SKILL = ") + 1));
const SKILL = Object.fromEntries(STAGE1.map((S) => [S.id, S]));
const now = Date.now(), DAY = 86400000, TODAY = new Date().toLocaleDateString("en-CA"), YESTERDAY = new Date(now - DAY).toLocaleDateString("en-CA");
const oldMistake = { id: "mseed", wrong: "I am agree", right: "I agree", why: "Agree is a verb, so do not use am.", type: "verb form", sentence: "I am agree with you.", from: "Old task", kind: "sent", box: 1, due: now - 1000, created: now - 3 * DAY, updated: now - 3 * DAY };

(async () => {
  const exe = fs.existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;
  const b = await pw.chromium.launch(exe ? { executablePath: exe } : {});
  const results = [], pageErrors = [];
  const check = (name, ok, info) => { results.push(ok); console.log((ok ? "PASS " : "FAIL ") + name + (info && !ok ? " · " + info : "")); };
  const openApp = async (docs) => {
    const q = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
    q.on("pageerror", (e) => pageErrors.push(e.message));
    await q.route("**/*", (r) => (r.request().url().startsWith("http://likho.test/") ? r.fulfill({ contentType: "text/html", body: html }) : r.abort()));
    await q.addInitScript((d) => { window.__seed = { "data/users/u_test": d, library: {} }; }, docs);
    await q.addInitScript(mock);
    await q.goto("http://likho.test/"); await q.waitForTimeout(900);
    return q;
  };
  let p = await openApp({ m_seed: oldMistake });
  const wait = (ms = 300) => p.waitForTimeout(ms);
  const txt = () => p.textContent("#page");
  const calls = (re) => p.evaluate((src) => window.__calls.filter((c) => new RegExp(src).test(c.prompt)), re.source);
  const course = () => p.evaluate(() => JSON.parse(localStorage.getItem("likho.v1")).settings.course);
  const store = () => p.evaluate(() => window.__store["data/users/u_test"]);
  const shot = (n) => p.screenshot({ path: path.join(process.env.SHOTS || "/tmp", "likho-course-" + n + ".png"), fullPage: false }).catch(() => {});
  const card = (n = 0) => `#page .card >> nth=${n}`;
  const next = async () => { await p.click('#page button:has-text("Next →")'); await wait(200); };

  // ---- a new learner: the placement test first ----
  let t = await txt();
  check("opens on Today, with a placement test first and three tabs", (await p.textContent("#pageTitle")).includes("Today") && t.includes("Find your starting point") && t.includes("Every day: a lesson of about 30 minutes") && (await p.$$("#tabbar button")).length === 3 && (await p.getAttribute('#tabbar [data-tab="write"]', "aria-current")) === "page");
  check("the earlier courses wait, closed, under More practice", !!(await p.$('summary:has-text("More practice")')) && !(await p.isVisible('.trow:has-text("1. Free writing")')));
  await shot("start");
  await p.click("text=▶ Start the placement test"); await wait();
  check("the placement test: 25 quick questions, then a few sentences", (await txt()).includes("Part 1: 25 quick questions") && (await txt()).includes("Part 2: write 6 to 10 sentences"));
  await p.click("text=▶ Start part 1"); await wait(200);
  check("one question at a time, the first one on capital letters", (await txt()).includes("Part 1 · question 1 of 25") && (await p.textContent(".q1")) === "Which sentence is correct?" && (await p.$$(".opts .btn")).length === 3);
  const PLACE = STAGE1.map((S) => [S.id, S.x.findIndex((x) => x[0] === "c")]);
  for (let i = 0; i < PLACE.length; i++) {
    const [id, xi] = PLACE[i], [, , a, k] = SKILL[id].x[xi], n = a.split("|").length;
    await p.click(`.opts .btn >> nth=${i < 10 ? k : (k + 1) % n}`); await p.waitForTimeout(40);
  }
  t = await txt();
  check("after 25 answers: part 2, writing about myself", t.includes("Part 2 · Write") && t.includes("Write 6 to 10 sentences about yourself and your day"));
  await p.click("text=✍️ Start writing"); await wait();
  check("the writing sample is a piece of writing, with a way back to the test", (await p.textContent("#pageTitle")).includes("Placement: about me") && (await p.textContent(".back")).includes("Placement test"));
  await p.fill("#draft", "every morning i wake up early. My mother make tea for us. I like my family very much."); await p.click("#checkBtn"); await wait(700);
  await p.click("text=See my placement result →"); await wait(300);
  t = await txt();
  check("the result: my level, my score and my most common mistakes", t.includes("Your level: A1 · Beginner") && t.includes("Part 1: 10 of 25 right") && t.includes("mistakes in every 100 words") && t.includes("Capital letters: 1") && t.includes("Subject and verb: 1"));
  check("skills answered right, with no mistakes of their kind in my writing, count as known", t.includes("You know already · 6 of 25 skills") && t.includes("Word order") && t.includes("do and does") && (await p.$$(".chip2")).length === 6 && t.includes("You start with: Capital letters and full stops."), t.slice(0, 600));
  let c = await course();
  check("known skills start with one pass, to be checked again later", c.skills.order.passes[0] === "placement" && !c.skills.caps && !c.skills.be && c.placed.known.length === 6);
  await shot("placed");
  await p.click("text=▶ Go to today's lesson"); await wait();

  // ---- today ----
  t = await txt();
  check("Today: day 1 of stage 1, with today's lesson in five steps", t.includes("Stage 1 of 4 · Correct sentences") && t.includes("Day 1") && t.includes("0 of 25 skills learned") && t.includes("1. Capital letters and full stops") && (await p.$$(".dsteps li")).length === 5 && t.includes("Review: 1 question on what you learned before"));
  check("the known skills are not checked again on the day of the test", !t.includes("Check-up"));
  await shot("today");
  await p.click("text=▶ Start today's lesson"); await wait();
  t = await txt();
  check("step 1, review: one of my own mistakes, to fix again", (await p.$$(".stepper span")).length === 5 && (await p.getAttribute(".stepper span >> nth=0", "class")) === "cur" && t.includes("Review · 1 of 1") && (await p.textContent("mark.mk")) === "I am agree" && (await p.inputValue("#page textarea")) === "I am agree with you.");
  await p.fill("#page textarea", "I agree with you."); await p.click('#page .card button:has-text("Check")'); await wait(200);
  await wait(1000);
  check("a right fix, and the mistake is moved to a later review", (await txt()).includes("✓ Right!") && (await store()).m_mseed?.box === 2 && (await store()).m_mseed.due > Date.now());
  await next();
  check("the review ends with my score", (await txt()).includes("Review done") && (await txt()).includes("1 of 1 right"));
  await p.click("text=Next: today's new skill →"); await wait();
  t = await txt();
  check("step 2, learn: the rules, the pattern, examples and a common mistake", t.includes("Skill 1 of 25") && t.includes("Write I as a capital letter, always.") && t.includes("The pattern") && (await p.$$(".ex b.hl")).length > 3 && t.includes("my brother and i live in karachi") && t.includes("The rule:"));
  await shot("learn");
  await p.click("text=Next: practise →"); await wait();
  // practice: the first "correct the sentence" question is answered wrong, the others right
  let wrongDone = false;
  for (let i = 0; i < 10; i++) {
    const ref = (await course()).day.pr.refs[i], [ty, q, a, k] = SKILL[ref.s].x[ref.x];
    if (i === 0) check("step 3, practise: 10 questions, one at a time", (await txt()).includes("Practise · 1 of 10"));
    if (ty === "c") await p.click(`.opts .btn >> nth=${k}`);
    else { const bad = ty === "f" && !wrongDone; await p.fill("#page .card textarea", bad ? q.charAt(0).toUpperCase() + q.slice(1) : a.split("|")[0]); await p.click('#page .card button:has-text("Check")'); await wait(150);
      if (bad) { wrongDone = true; const o = await p.textContent(".card .fout"); check("a wrong answer: the right answer and the rule, at once", o.includes("✗ Not quite.") && o.includes("Answer: " + a.split("|")[0]) && o.includes("Why: A capital letter at the start"), o); } }
    await wait(120); await next();
  }
  t = await txt();
  check("the practice result: 9 of 10 passes", (await p.textContent(".score")) === "9/10" && t.includes("✓ Practice passed"));
  await wait(1000);
  const pm = Object.values(await store()).filter((d) => d?.from === "Lesson: Capital letters and full stops");
  check("the wrong answer goes to my mistakes, with the rule", pm.length === 1 && pm[0].type === "capital" && pm[0].why.startsWith("A capital letter"));
  await p.click("text=Next: write →"); await wait();
  check("step 4, write: a task that uses the skill", (await txt()).includes("Use it in your own sentences") && (await txt()).includes("Write 5 sentences about yourself"));
  await p.click("text=✍️ Start writing"); await wait();
  check("the answer sheet keeps the pattern in view, and the goal in sentences", (await p.textContent(".back")).includes("Today's lesson") && !!(await p.$(".task .formula")) && (await p.textContent("#count")).includes("goal 5 to 7 sentences"));
  await p.fill("#draft", "every morning i wake up at six. My name is Sara. I live in Lahore. I like Fridays. My birthday is in June."); await p.click("#checkBtn"); await wait(700);
  const ck = (await calls(/checking writing by a learner/)).pop();
  check("Mam checks today's skill, and only 3 other mistakes", ck.prompt.includes("Task (Sentences practising Capital letters and full stops)") && ck.prompt.includes("Mark every mistake with Capital letters and full stops, and only the 3 other mistakes that matter most") && ck.prompt.includes('"structure": {"used"'));
  t = await txt();
  check("the marks show how well I used the skill", t.includes("✓ Capital letters and full stops: used correctly in 3 of 4 sentences.") && t.includes("Structure"));
  await p.fill("#fixIn0", "Every morning I"); await p.click('#fix0 button:has-text("Check")'); await wait(300);
  await p.click("text=Finish today's lesson →"); await wait();
  t = await txt();
  check("step 5, the result: day 1 of 2 passed, with the practice and the writing", t.includes("✓ Day 1 of 2 passed") && t.includes("✓ Practice: 9 of 10") && t.includes("✓ Writing: 6/10, the skill used correctly in 3 of 4 sentences"));
  check("my biggest mistakes today, and tomorrow's skill", t.includes("Your biggest mistakes today") && t.includes("every morning i") && t.includes("Tomorrow: am, is, are."));
  c = await course();
  check("the skill has its first pass, and today counts as a day practised", c.skills.caps.passes.join() === TODAY && c.days.join() === TODAY && !!c.day.done && c.day.passed === true);
  await shot("result");
  await p.click("text=Back to Today"); await wait();
  t = await txt();
  check("Today: done for today, then 30 minutes of extra practice", t.includes("✓ Done for today") && t.includes("You passed Capital letters and full stops today.") && t.includes("Extra practice · about 30 minutes") && t.includes("Read and copy the style") && t.includes("Diary"));
  await p.click(t.includes("📖 Read and copy the style▶ Start") ? "text=▶ Start" : 'button:has-text("📖 Read and copy the style")'); await wait(500);
  const mc = (await calls(/read and then copy the style/)).pop();
  t = await txt();
  check("read and copy the style: Mam's text, 5 words and 2 patterns, then my own text", !!mc && mc.tier === "quick" && mc.prompt.includes("Capital letters and full stops") && (await p.textContent("#pageTitle")).includes("Copy the style: My morning") && t.includes("📜 Mam's text") && t.includes("wake up") && t.includes("Patterns: First I …") && (await p.textContent(".back")).includes("Today"));
  await p.click("text=← Today"); await wait();
  await p.click("text=I have time: learn the next skill now"); await wait();
  t = await txt();
  check("with more time: the next skill now, without a second review", t.includes("Skill 3 of 25") && t.includes("am, is, are") && (await p.getAttribute(".stepper span >> nth=1", "class")) === "cur");
  await p.click('#tabbar [data-tab="progress"]'); await wait();
  t = await txt();
  check("Progress: stage 1, skills learned, days and the skills waiting for a check-up", t.includes("Stage 1 of 4 · Correct sentences") && (await p.textContent(".hero")).startsWith("0 / 25 skills learned") && t.includes("1days practised") && t.includes("7skills waiting for a check-up") && t.includes("Your road to the CSS exam"));
  check("the placement writing is my first monthly sample", t.includes("Your monthly writing checks") && t.includes("· placement"));
  await p.click('#tabbar [data-tab="write"]'); await wait(); await p.click('#tabbar [data-tab="write"]'); await wait();
  await p.click('summary:has-text("More practice")'); await wait(150);
  t = await txt();
  check("More practice keeps the courses, the exam practice, the tests and my writing", (await p.isVisible('.trow:has-text("1. Free writing")')) && t.includes("Précis") && !!(await p.$('.trow:has(strong:text-is("Tests"))')) && t.includes("Placement: about me"));
  const body = await p.evaluate(() => document.body.innerText);
  check("no Urdu on screen, and no sideways scroll", !/[؀-ۿ]/.test(body) && !(await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)));
  await p.context().close();

  // ---- every kind of question ----
  const ref = (s, x) => ({ s, x });
  const refs = [ref("wh", 4), ref("wh", 5), ref("wh", 0), ref("wh", 1), ref("wh", 7), ref("wh", 11), ref("order", 0), ref("be", 5), ref("be", 9), ref("wh", 8)];
  const dayAt = (step, pr, extra) => ({ key: TODAY, at: now, n: 1, skill: "wh", step, rv: { refs: [], i: 0, res: [] }, pr: { refs: pr, i: 0, res: [], best: 0, round: 1 }, piece: null, done: 0, ...extra });
  p = await openApp({ meta: { settings: { level: "A1", course: { placed: { at: now - 2 * DAY, skipped: true, known: [] }, skills: {}, day: dayAt(2, refs) }, view: { tab: "write", page: "day" } } } });
  t = await txt();
  check("a lesson left open comes back at the same step", (await p.textContent("#pageTitle")).includes("Questions with what, where, why, how") && t.includes("Practise · 1 of 10"));
  check("put the words in order: four words to tap, Check waits for all of them", t.includes("Put the words in order") && (await p.$$("div.tools > .chip")).length === 4 && (await p.isDisabled('#page .card button:has-text("Check")')));
  for (const w of ["where", "do", "you", "work"]) await p.click(`div.tools > .chip:text-is("${w}")`);
  check("the words I tap make the sentence", (await p.textContent(".built")) === "wheredoyouwork");
  await p.click('#page .card button:has-text("Check")'); await wait(200);
  check("the right order is checked on the phone at once", (await p.textContent(".card .fout")).includes("✓ Right!") && (await calls(/is practising one skill/)).length === 0);
  await next();
  for (const w of ["she", "why", "is", "sad"]) await p.click(`div.tools > .chip:text-is("${w}")`);
  await p.click('#page .card button:has-text("Check")'); await wait(300);
  let o = await p.textContent(".card .fout"), pc = (await calls(/is practising one skill/)).pop();
  check("a different answer goes to Mam, who says exactly what is wrong", !!pc && pc.tier === "quick" && pc.prompt.includes('The learner\'s answer: "she why is sad"') && o.includes("What is wrong: The verb comes right after the subject") && o.includes("Answer: Why is she sad?") && o.includes("Why: Question word + do, does, did or be"));
  await next();
  await p.click('.opts .btn:text-is("Where")'); await wait(100);
  check("choose: the right option turns green", (await p.getAttribute('.opts .btn:text-is("Where")', "class")).includes("ok") && (await p.textContent(".card .fout")).includes("✓ Right!"));
  await next();
  await p.click('.opts .btn:text-is("Where")'); await wait(100);
  check("a wrong choice: mine turns red and the right one green", (await p.getAttribute('.opts .btn:text-is("Where")', "class")).includes("bad") && (await p.getAttribute('.opts .btn:text-is("When")', "class")).includes("ok") && (await p.textContent(".card .fout")).includes("Answer: When is your birthday? In May."));
  await next();
  check("correct the sentence: the box starts with the wrong sentence", (await p.inputValue("#page .card textarea")) === "Where you are going?");
  await p.click('#page .card button:has-text("Check")'); await wait(100);
  check("Check needs a change first", (await p.textContent(".card .fout")).includes("Change the sentence first."));
  await p.fill("#page .card textarea", "Where are you going?"); await p.click('#page .card button:has-text("Check")'); await wait(150);
  check("a corrected sentence is right", (await p.textContent(".card .fout")).includes("✓ Right!"));
  await next();
  check("change it as asked: the task, and the sentence ready to change", (await p.textContent(".q1 b.hl")) === "Ask with why: " && (await p.inputValue("#page .card textarea")) === "She was late.");
  await p.fill("#page .card textarea", "Why was she late?"); await p.click('#page .card button:has-text("Check")'); await wait(150);
  await next();
  for (const w of ["every day", "I", "drink", "tea"]) await p.click(`div.tools > .chip:text-is("${w}")`);
  await p.click('#page .card button:has-text("Check")'); await wait(300);
  check("another correct order is accepted by Mam", (await p.textContent(".card .fout")).includes("✓ Right!") && (await calls(/is practising one skill/)).length === 2);
  await next();
  await p.fill("#page .card input", "are"); await p.press("#page .card input", "Enter"); await wait(150);
  check("fill the gap, with Enter", (await p.textContent(".card .fout")).includes("✓ Right!"));
  await next();
  await p.fill("#page .card textarea", "i'm happy today"); await p.click('#page .card button:has-text("Check")'); await wait(150);
  check("short forms, small letters and a missing full stop do not matter outside the capital letters lesson", (await p.textContent(".card .fout")).includes("✓ Right!") && (await calls(/is practising one skill/)).length === 2);
  await next();
  await p.evaluate(() => { window.__failNext = "upstream_error"; });
  await p.fill("#page .card textarea", "What she said to you?"); await p.click('#page .card button:has-text("Check")'); await wait(300);
  t = await txt();
  check("when Mam can't be reached, I compare my answer myself", t.includes("Mam could not check this one now") && t.includes("What did she say?") && !!(await p.$("text=✗ Mine is different")));
  await p.click("text=✗ Mine is different"); await wait(150);
  await next();
  t = await txt();
  check("7 of 10 does not pass: practise again, or go on", (await p.textContent(".score")) === "7/10" && t.includes("Not passed yet") && t.includes("You need 8 of 10") && !!(await p.$("text=Go on to the writing")));
  await p.click("text=↻ Practise again"); await wait(200);
  c = await course();
  const missed = ["wh:5", "wh:1", "wh:8"].every((k) => c.day.pr.refs.some((r) => r.s + ":" + r.x === k));
  check("a new round: the questions I missed come back", c.day.pr.round === 2 && c.day.pr.i === 0 && c.day.pr.refs.length === 10 && c.day.pr.best === 7 && missed);
  await wait(1000);
  const ms = Object.values(await store()).filter((d) => d?.kind === "lesson");
  check("each wrong answer is saved as a mistake to review", ms.length === 3 && ms.some((m) => m.wrong === "she why is sad" && m.right === "Why is she sad?" && m.problem.startsWith("The verb comes")) && ms.some((m) => m.wrong === "Where is your birthday? In May." && m.right === "When is your birthday? In May.") && ms.some((m) => m.wrong === "What she said?"), JSON.stringify(ms.map((m) => [m.wrong, m.right])));
  await p.context().close();

  // ---- the next day: check-ups ----
  const done = { ...dayAt(4, [], { key: YESTERDAY, at: now - DAY, skill: "caps", done: now - DAY + 3600000, passed: true }) };
  p = await openApp({ meta: { settings: { level: "A1", course: { placed: { at: now - 30 * DAY, right: 10, total: 25, known: ["order"], types: [], level: "A1" }, skills: { caps: { passes: [YESTERDAY] }, order: { passes: ["placement"] } }, days: [YESTERDAY], day: done } } }, m_seed: oldMistake });
  t = await txt();
  check("the next day: day 2, a new lesson, and a streak of 1", t.includes("Day 2") && t.includes("1 day in a row") && t.includes("2. Word order") === false && t.includes("am, is, are") && t.includes("Review: 5 questions"));
  check("no weekly test yet: fewer than 3 skills passed in lessons", !t.includes("Weekly test"));
  check("the monthly writing check is due after 4 weeks", t.includes("Monthly writing check") && t.includes(" Then you can see how much better you write."));
  await p.click("text=▶ Start today's lesson"); await wait();
  c = await course();
  check("the review: check-ups on yesterday's skill and a placement skill, then my mistake", c.day.rv.refs.length === 5 && c.day.rv.refs.slice(0, 2).every((r) => r.s === "caps" && r.k === "check") && c.day.rv.refs.slice(2, 4).every((r) => r.s === "order") && c.day.rv.refs[4].m === "mseed" && (await txt()).includes("Check-up · Capital letters and full stops"));
  for (let i = 0; i < 5; i++) {
    const r = c.day.rv.refs[i];
    if (r.m) { await p.fill("#page .card textarea", "I agree with you."); await p.click('#page .card button:has-text("Check")'); }
    else {
      const [ty, q, a, k] = SKILL[r.s].x[r.x], wrong = r.s === "order";
      if (ty === "c") await p.click(`.opts .btn >> nth=${wrong ? (k + 1) % a.split("|").length : k}`);
      else if (ty === "o") { const words = q.split(/\s*\/\s*/); for (const w of words) await p.click(`div.tools > .chip:text-is("${w}") >> nth=0`); await p.click('#page .card button:has-text("Check")'); }
      else { await p.fill("#page .card textarea", wrong ? "Wrong words here." : a.split("|")[0]); await p.click('#page .card button:has-text("Check")'); }
    }
    await wait(350); await next();
  }
  t = await txt();
  check("a check-up all right: the skill is learned", t.includes("Review done") && t.includes("🎉 Learned: Capital letters and full stops"));
  check("a missed check-up comes again tomorrow", t.includes("Word order: not yet. Its check-up comes again tomorrow."));
  c = await course();
  check("learned means passed on two different days", c.skills.caps.passes.join() === [YESTERDAY, TODAY].join() && c.skills.order.fails === 1 && c.skills.order.passes.length === 1);
  await p.click('#tabbar [data-tab="write"]'); await wait(); await p.click('#tabbar [data-tab="write"]'); await wait();
  check("Today counts the learned skill", (await txt()).includes("1 of 25 skills learned"));
  await p.click('.card:has-text("Monthly writing check") button:has-text("Start")'); await wait(400);
  check("the monthly check: the same task as the placement writing, back to Today", (await p.textContent("#pageTitle")).includes("Monthly check") && (await txt()).includes("Write 6 to 10 sentences about yourself and your day") && (await p.textContent(".back")).includes("Today"));
  await p.context().close();

  // ---- the weekly test ----
  const passed = Object.fromEntries(["caps", "order", "be", "have"].map((id) => [id, { passes: [new Date(now - 8 * DAY).toLocaleDateString("en-CA"), YESTERDAY] }]));
  p = await openApp({ meta: { settings: { level: "A1", course: { placed: { at: now - 10 * DAY, skipped: true, known: [] }, skills: passed, days: [YESTERDAY] } } } });
  t = await txt();
  check("after a week with 3 or more skills passed: the weekly test", t.includes("4 of 25 skills learned") && t.includes("🎯 Weekly test"));
  await p.click("text=Start the test"); await wait(600);
  const tc = (await calls(/making a short test for/)).pop();
  check("the weekly test is on the skills I learned", tc.prompt.includes("Capital letters and full stops: ") && tc.prompt.includes("have and has: ") && !tc.prompt.includes("Regrets") && (await p.textContent("#pageTitle")).includes("Weekly test: Stage 1") && (await p.getAttribute('#tabbar [data-tab="write"]', "aria-current")) === "page");
  await p.click('#tabbar [data-tab="write"]'); await wait();
  check("Today goes back to Today from a test", (await txt()).includes("Continue the test"));
  await p.context().close();

  check("no page errors", pageErrors.length === 0, pageErrors.join(" ; "));
  await b.close();
  const failed = results.filter((x) => !x).length;
  console.log(`\n${results.length - failed}/${results.length} passed`);
  process.exit(failed ? 1 : 0);
})();
