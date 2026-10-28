// End-to-end check of the simple talking app inside a fake Claude runtime (tools/test/mock-claude.js).
// Usage: node tools/test/run-claude-flow.cjs   (needs Playwright; uses /opt/pw-browsers/chromium when present)
// PDF checks run when PDFJS_DIR points at pdfjs-dist@3.11.174/build (npm pack pdfjs-dist@3.11.174).
const path = require("path");
const fs = require("fs");
let pw;
try { pw = require("playwright"); } catch { pw = require(require("child_process").execSync("npm root -g").toString().trim() + "/playwright"); }

const root = path.resolve(__dirname, "../..");
const page = fs.readFileSync(path.join(root, "bolo-english.html"), "utf8");
const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light}body{margin:0}[hidden]{display:none!important}</style></head><body>${page}</body></html>`;
const mock = fs.readFileSync(path.join(__dirname, "mock-claude.js"), "utf8");

(async () => {
  const exe = fs.existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;
  const b = await pw.chromium.launch(exe ? { executablePath: exe } : {});
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const pageErrors = [];
  p.on("pageerror", (e) => pageErrors.push(e.message));
  await p.route("**/*", (r) => {
    const u = r.request().url();
    if (u.startsWith("http://bolo.test/")) return r.fulfill({ contentType: "text/html", body: html });
    const pdfFile = u.match(/cdnjs\.cloudflare\.com\/ajax\/libs\/pdf\.js\/3\.11\.174\/(pdf(?:\.worker)?\.min\.js)$/);
    if (pdfFile && process.env.PDFJS_DIR) return r.fulfill({ contentType: "text/javascript", body: fs.readFileSync(path.join(process.env.PDFJS_DIR, pdfFile[1])) });
    return r.abort();
  });
  await p.addInitScript(mock);
  await p.goto("http://bolo.test/");
  await p.waitForTimeout(500);
  const results = [];
  const check = (name, ok, info) => { results.push(ok); console.log((ok ? "PASS " : "FAIL ") + name + (info && !ok ? " · " + info : "")); };
  const wait = (ms = 500) => p.waitForTimeout(ms);
  const store = () => p.evaluate(() => window.__store["data/users/u_test"]);
  const chats = async () => Object.entries(await store()).filter(([k]) => k.startsWith("chat_")).map(([, v]) => v);
  const say = async (text, ms = 700) => { await p.fill("#input", text); await p.click("#sendBtn"); await wait(ms); };
  const TABS = { "1-minute challenge": "minute", Newspaper: "news", "My words": "words" };
  const tab = async (k) => { await p.click(`#tabbar [data-tab="${k}"]`); await wait(300); };
  const topic = async (name) => { // the tools have their own tabs; conversation topics are in the Talk tab's list
    if (TABS[name]) return tab(TABS[name]);
    if (await p.isDisabled("#topicBtn")) await tab("talk");
    await p.click("#topicBtn"); await wait(150); await p.click(`#topicList .trow:has-text("${name}")`); await wait(300);
  };
  const msgs = () => p.textContent("#msgs");
  const lastTag = () => p.evaluate(() => [...document.querySelectorAll(".msg.me")].pop()?.querySelector(".verdict")?.textContent || "");

  // ---- opens straight into a conversation ----
  check("opens on Free talk with Mam's question", (await p.textContent("#topicName")).includes("Free talk") && (await msgs()).includes("What would you like to talk about today"));
  check("no fake mic button inside Claude (it cannot listen there)", await p.isHidden("#orb"));
  check("inside Claude: typing box and voice-version link", !(await p.isHidden("#typeRow")) && (await p.textContent("#hint")).includes("voice version"));
  check("five tabs at the bottom, Talk is open", (await p.$$("#tabbar button")).length === 5 && (await p.getAttribute('#tabbar [data-tab="talk"]', "aria-current")) === "page");
  await p.click("#topicBtn"); await wait(150);
  const tl = await p.textContent("#topicList");
  check("the topic list has only conversation topics", tl.includes("My city") && tl.includes("CSS interview") && !tl.includes("Newspaper") && !tl.includes("1-minute challenge") && !tl.includes("My words"));
  await p.click("#topicSheet [data-close]"); await wait(100);
  await p.click("#hint .x"); await wait(100);
  check("the long tip at the bottom can be closed", await p.isHidden("#hint"));

  // ---- talk + corrections on tap ----
  await say("I living in Lahore");
  let m = await msgs();
  check("my sentence stays", m.includes("I living in Lahore"));
  check("Mam replies", m.includes("What food do you like"), m.slice(-150));
  await wait(400);
  check("corrections are folded under my sentence", (await p.textContent(".msg.me .verdict")).includes("1 mistake") && await p.isHidden(".msg.me .fb"));
  await p.click(".msg.me .bubble"); await wait(150);
  check("tapping my sentence shows the mistake and better ways", !(await p.isHidden(".msg.me .fb")) && (await p.textContent(".msg.me .fb")).includes("I live in Lahore") && (await p.textContent(".msg.me .fb")).includes("CSS interview"));
  check("the corrected sentence and other ways to say it", (await p.textContent(".msg.me .fb")).includes("Your sentence, corrected") && (await p.textContent(".msg.me .fb")).includes("I live in Lahore.") && (await p.textContent(".msg.me .fb")).includes("Other ways to say it"));
  await say("I like biryani very much", 900);
  let cs = await chats();
  const free = cs.find((c) => c.topic?.id === "free");
  check("conversation saved to the account", free && free.turns.length >= 5, JSON.stringify(cs.map((c) => [c.topic?.id, c.turns?.length])));
  check("corrections saved with it", !!free?.turns?.[1]?.fb?.errors?.length);

  // ---- corrections that are slow or fail ----
  await p.evaluate(() => { window.__slowCheck = true; });
  await say("I am liking cricket", 300);
  check("while Mam checks, the sentence says Checking", (await lastTag()).includes("Checking"));
  await wait(1700);
  check("then the corrections arrive", (await lastTag()).includes("mistake"));
  await p.evaluate(() => { window.__failCheck = true; });
  await say("I go school daily", 700);
  check("a failed check offers to try again", (await lastTag()).includes("Couldn't check"));
  await p.evaluate(() => [...document.querySelectorAll(".msg.me")].pop().querySelector(".verdict").click()); await wait(500);
  check("trying again shows the corrections", (await lastTag()).includes("mistake"));

  // ---- errors ----
  await p.evaluate(() => { window.__failNext = "upstream_error"; });
  await say("My city is very old", 500);
  check("failed reply keeps sentence and offers retry", (await msgs()).includes("My city is very old") && !!(await p.$(".notsent")));
  await p.click(".notsent"); await wait(800);
  check("retry gets a reply", !(await p.$(".notsent")));
  await p.evaluate(() => { window.__failNext = "rate_limited"; });
  await say("Hello again", 500);
  check("usage limit is explained", (await msgs()).includes("usage limit"));
  await p.click(".notsent"); await wait(800);
  await p.evaluate(() => { window.__failNext = "not_granted"; });
  await say("The food is good", 500);
  const allow = await p.$("text=Allow Claude");
  check("not allowed shows Allow Claude", !!allow);
  if (allow) { await allow.click(); await wait(800); }
  check("Allow Claude opens Permissions and retries", (await p.evaluate(() => window.__managed)) === 1 && !(await p.$(".notsent")));
  await p.evaluate(() => { window.__hangNext = true; });
  await say("I like the beach", 7600);
  const stop = await p.$("text=■ Stop");
  check("slow reply offers Stop", !!stop);
  if (stop) { await stop.click(); await wait(300); }
  check("Stop leaves the sentence ready to retry", !!(await p.$(".notsent")));
  await p.evaluate(() => { window.__noJson = true; });
  await p.click(".notsent"); await wait(900);
  await p.evaluate(() => { window.__noJson = false; });
  check("corrections work without sample.json", (await p.$$(".msg.me .verdict")).length >= 5);

  // ---- topics keep their own conversation ----
  await topic("My city");
  m = await msgs();
  check("an older conversation reopens with its messages", m.includes("I live in Karachi"));
  check("after a break Mam says welcome back", m.includes("Welcome back"));
  await say("Karachi is famous for the sea", 1500);
  cs = await chats();
  check("continuing a conversation loaded from the store works", (cs.find((c) => c.id === "cold")?.turns.length || 0) >= 6, String(cs.find((c) => c.id === "cold")?.turns.length));
  await topic("Free talk");
  check("Free talk still has its messages", (await msgs()).includes("I like biryani"));
  await topic("My city");
  await p.reload(); await wait(800);
  check("reopening the app goes back into the last conversation", (await p.textContent("#topicName")).includes("My city") && (await msgs()).includes("Karachi is famous for the sea"));
  await p.click("#topicBtn"); await wait(150);
  await p.fill("#ownIn", "My favourite book"); await p.click("#ownForm .btn"); await wait(300);
  check("own topic starts a conversation", (await msgs()).includes("My favourite book"));

  // ---- CSS interview ----
  await topic("CSS interview");
  check("interview opens with the Chairman", (await msgs()).includes("Chairman"));
  await say("My name is Ali and I am from Lahore");
  check("board member asks a follow-up", (await msgs()).includes("Member 1"));
  await p.evaluate(() => { window.__forceOver = true; });
  await say("I want serve my country");
  await p.evaluate(() => { window.__forceOver = false; });
  await wait(500);
  let ivm = await msgs();
  const rp = await p.evaluate(() => window.__calls.filter((c) => /Judge ONE answer/.test(c.prompt)));
  const sp = await p.evaluate(() => window.__calls.filter((c) => /has been marked answer by answer/.test(c.prompt)));
  check("when the interview ends, the score comes by itself, with a new interview to start", ivm.includes("Start a new interview") && ivm.includes("out of 300 · Interview score") && !ivm.includes("Get my score"));
  check("each answer is marked on its own, strictly, by the quick model as the interview goes on", rp.length === 2 && rp.every((c) => c.tier === "quick" && c.prompt.includes("STRICTLY and REALISTICALLY")) && rp[1].prompt.includes('The candidate answered: "I want serve my country" (5 words)'));
  check("at the end the marks are added up, and one short call writes the board's view", sp.length === 1 && sp[0].tier === "quick" && sp[0].prompt.includes("90 out of 300 (not a pass; 100 needed)") && ivm.includes("The candidate is polite but needs longer answers.") && ivm.includes("Give one example in every answer."));
  check("two short answers cannot pass: 90 of 300, and it says why", ivm.includes("90out of 300") && ivm.includes("✗ A real board would not pass this: 100 needed") && ivm.includes("short answers cannot score high") && ivm.includes("Question by question") && ivm.includes("Reasoning"));
  const boardCalls = await p.evaluate(() => window.__calls.filter((c) => c.prompt.includes("interview board")).length);
  await say("One more thing", 400);
  check("a finished interview does not continue", (await msgs()).includes("This interview is over") && (await p.evaluate(() => window.__calls.filter((c) => c.prompt.includes("interview board")).length)) === boardCalls);
  if (process.env.SHOTS) { await p.evaluate(() => { const d = document.querySelector(".report details"); if (d) d.open = true; document.querySelector(".report")?.scrollIntoView(); }); await p.screenshot({ path: path.join(process.env.SHOTS, "bolo-score.png") }); }
  check("the score is kept with the interview", (await chats()).some((c) => c.report?.marks === 90 && c.report.pass === false && c.report.score === 3 && c.report.questions.length === 2 && c.turns.filter((t) => t.iv).length === 2));
  await p.click("text=Start a new interview"); await wait(300);
  check("a new interview starts fresh", !(await msgs()).includes("I want serve my country"));

  // ---- interview me on a topic: a book or anything I studied ----
  await topic("Interview me on a topic");
  check("Interview me on a topic: a page to name it or add pages and notes", (await p.textContent("#topicName")).includes("Interview me on a topic") && !!(await p.$("#ivTopic")) && !!(await p.$("label[for=ivFile]")) && !!(await p.$("#ivPasteBtn")) && (await p.isHidden("#dock")) && (await p.getAttribute('#tabbar [data-tab="talk"]', "aria-current")) === "page");
  await p.click("#ivGo"); await wait(200);
  check("starting with nothing asks for the topic first", (await p.textContent("#ivStatus")).includes("name of the book or topic"));
  await p.fill("#ivTopic", "Zzzz pamphlet"); await p.click("#ivGo"); await wait(500);
  check("a topic Mam doesn't know: she asks for pages or notes", (await p.textContent("#ivStatus")).includes("doesn't know enough") && !(await p.isDisabled("#ivGo")));
  await p.click('#ivIdeas .mini:has-text("Atomic Habits")');
  check("idea buttons fill in a topic", (await p.inputValue("#ivTopic")) === "Atomic Habits (book)");
  await p.click('#ivLen .tab:has-text("Short")'); await p.click("#ivGo"); await wait(700);
  check("Mam prepares questions on the topic from what she knows", await p.evaluate(() => window.__calls.some((c) => c.prompt.includes("preparing a practice interview") && c.prompt.includes('"Atomic Habits (book)"') && c.prompt.includes("exactly 5 interview questions") && c.prompt.includes("what you reliably know") && c.tier === "default")));
  m = await msgs();
  check("the board opens with the topic's first question", (await p.textContent("#topicName")).includes("Interview: Atomic Habits") && m.includes("Chairman") && m.includes("Today we will ask you about Atomic Habits") && m.includes("What is the book Atomic Habits about?") && !(await p.isHidden("#dock")));
  await say("It is about small habits what grow over time");
  check("the board asks about the topic, guided by Mam's notes", await p.evaluate(() => window.__calls.some((c) => c.prompt.includes("Write the board's next turn now") && c.prompt.includes('studied: "Atomic Habits"') && c.prompt.includes("1% better") && c.prompt.includes("the interview has 5"))));
  check("corrections work in the topic interview too", !!(await p.$(".msg.me .verdict")));
  await p.evaluate(() => { window.__forceOver = true; });
  await say("Identity based habits are the strongest");
  await p.evaluate(() => { window.__forceOver = false; });
  m = await msgs();
  await wait(500);
  check("the end gives the score, the same topic again, or another topic", m.includes("Interview me again") && m.includes("Another topic") && (await msgs()).includes("out of 300"));
  check("feedback knows the topic and says what to study again", (await msgs()).includes("📚 Study again") && (await msgs()).includes("The four laws of behaviour change") && await p.evaluate(() => window.__calls.some((c) => c.prompt.includes("interview examiner") && c.prompt.includes('studied: "Atomic Habits"') && c.prompt.includes('"study"'))));
  cs = await chats();
  check("the topic interview is saved with its plan", cs.some((c) => c.topic?.subject === "Atomic Habits" && c.topic.total === 5 && c.topic.panel === "board" && c.topic.extra.includes("1% better") && c.report?.study?.length === 1));
  await p.click("text=Interview me again"); await wait(300);
  check("Interview me again starts the same topic fresh", (await p.textContent("#topicName")).includes("Interview: Atomic Habits") && !(await msgs()).includes("Identity based habits"));
  await topic("Interview me on a topic");
  check("Your interviews lists it with its last score", (await p.textContent("#ivList")).includes("Atomic Habits") && (await p.textContent("#ivList")).includes("last score 3/10"));
  await p.click('#ivWho .tab:has-text("Mam")');
  await p.click("#ivPasteBtn"); await p.fill("#ivText", "Photosynthesis: plants use sunlight, water and carbon dioxide to make food and oxygen.");
  await p.click("#ivGo"); await wait(700);
  check("pasted notes go to Mam with the questions plan", await p.evaluate(() => window.__calls.some((c) => c.prompt.includes("preparing a practice interview") && c.prompt.includes("They did not write its name") && c.prompt.includes("TEXT:\nPhotosynthesis"))));
  m = await msgs();
  check("Mam can be the interviewer: no board, her own words", (await p.textContent("#topicName")).includes("Interview: Photosynthesis") && m.includes("Today I will interview you about Photosynthesis") && !m.includes("Chairman"));
  await say("Plants make food from sunlight");
  check("Mam interviews, reacts and asks the next question", (await msgs()).includes("And what is the main idea of it?") && await p.evaluate(() => window.__calls.some((c) => c.prompt.includes("Write Mam's next interview turn now") && c.prompt.includes("practice interview") && c.prompt.includes('studied: "Photosynthesis"') && !c.prompt.includes("[Member 1]"))));
  await p.reload(); await wait(900);
  check("reopening the app goes back into the topic interview", (await p.textContent("#topicName")).includes("Interview: Photosynthesis") && (await msgs()).includes("Plants make food from sunlight"));
  await topic("Interview me on a topic");
  check("both topics are in Your interviews", (await p.$$("#ivList .trow")).length === 2 && (await p.textContent("#ivList")).includes("Mam · 3 questions"));

  // ---- 1-minute challenge with brainstorming ----
  await topic("1-minute challenge"); await wait(500);
  check("challenge shows a question", (await p.textContent(".qcard .q")).length > 8);
  check("brainstorm offers 3 ideas, useful words and a plan", (await p.$$(".idea")).length === 3 && (await p.textContent("#brain")).includes("public service") && (await p.$$(".plan li")).length === 4);
  await p.click(".idea:nth-child(1)"); await wait(100);
  check("tapping an idea selects it", !!(await p.$(".idea.on")));
  check("the timer button is shown (Claude version too)", !(await p.isHidden("#orb")) && (await p.textContent("#orb")).includes("▶"));
  await p.click("#orb"); await wait(400);
  check("timer runs and the answer box opens", /^\d+$/.test((await p.textContent("#orb")).trim()) && !(await p.evaluate(() => document.getElementById("minIn").disabled)));
  await p.fill("#minIn", "um I am agree that I want to join the civil service because because I love my country");
  await p.click("#orb"); await wait(900);
  const mr = await p.textContent("#minResult");
  check("result: score, speed, fillers and a better answer", mr.includes("7/10") && mr.includes("words / min") && mr.includes("I agree") && mr.includes("Serving my country"));
  check("answer box closes when finished", await p.evaluate(() => document.getElementById("minIn").disabled));
  cs = await chats();
  check("challenge attempts are saved", cs.some((c) => c.kind === "minute" && c.attempts?.some((a) => a.result?.score === 7 && a.idea === "Serving my country")));
  await p.click("text=Next question →"); await wait(400);
  check("next question loads new ideas", (await p.$$(".idea")).length === 3 && !(await p.textContent("#minResult")).includes("7/10"));
  await topic("Free talk");
  check("back in Free talk the chat is still there", (await msgs()).includes("I like biryani") && (await p.isHidden("#orb")));
  check("Again and Slow only under Mam's newest message", await p.evaluate(() => { const t = [...document.querySelectorAll("#msgs .msg.tutor")]; return t.length > 2 && !!t[t.length - 1].querySelector(".say") && document.querySelectorAll("#msgs .say").length === 1; }));

  // ---- newspaper ----
  await topic("Newspaper"); await wait(300);
  check("newspaper page: add a story and daily, weekly, monthly papers", !!(await p.$("label[for=newsFile]")) && !!(await p.$('a[href*="dawn.com"]')) && !!(await p.$('a[href*="economist.com"]')) && !!(await p.$('a[href*="jworldtimes.com"]')));
  check("newspaper page has no talk button and no search inside Claude", (await p.isHidden("#dock")) && !(await p.$("#headlines")));
  const png = await p.screenshot({ clip: { x: 0, y: 0, width: 200, height: 200 } });
  await p.setInputFiles("#newsFile", { name: "dawn.png", mimeType: "image/png", buffer: png }); await wait(900);
  check("a screenshot becomes a story", (await p.textContent("#topicName")).includes("Floods in Sindh"));
  check("the screenshot goes to Mam as a picture", await p.evaluate(() => window.__calls.some((c) => c.prompt.includes("Below is a news story") && c.images === 1)));
  m = await msgs();
  check("story card: CSS link, and no chat or talk button while reading", m.includes("For CSS") && !m.includes("What happened in Sindh?") && (await p.isHidden("#dock")) && !!(await p.$("text=💬 Talk about it with Mam")));
  check("the News tab is lit while reading a story", (await p.getAttribute('#tabbar [data-tab="news"]', "aria-current")) === "page" && (await p.isDisabled("#topicBtn")));
  check("the story opens on its original text", (await p.textContent('.tab[aria-selected="true"]')).includes("Original"));
  check("every word of the original can be tapped, and Mam's picks stay hidden", (await p.$$(".tw")).length >= 45 && !(await p.$(".orig.picks")) && (await p.textContent(".orig")).includes("Show Mam's hard words"));
  await p.click('.tw:text-is("lashed")'); await wait(500);
  let pk = await p.textContent(".para >> nth=0 >> .vinfo");
  check("I tap a word I find hard and Mam explains it under the paragraph", pk.includes("“lashed”") && pk.includes("How to learn it") && (await p.evaluate(() => window.__calls.some((c) => c.prompt.includes('Explain the word or phrase "lashed"') && c.prompt.includes("Torrential rains lashed Sindh on Monday")))));
  check("the tapped word is highlighted", (await p.textContent(".tw.sel")) === "lashed");
  await p.click(".para >> nth=0 >> text=＋ Word after"); await wait(500);
  check("＋ Word after makes it a phrase", (await p.textContent(".para >> nth=0 >> .pickhead")).includes("“lashed Sindh”") && (await p.$$(".tw.sel")).length === 2 && (await p.evaluate(() => window.__calls.some((c) => c.prompt.includes('Explain the word or phrase "lashed Sindh"')))));
  await p.click('.tab[data-k="words"]'); await wait(100);
  check("my picks are kept in the Words tab, before Mam's list", (await msgs()).includes("Words you picked · 2") && (await p.textContent(".vrow >> nth=0")).includes("lashed") && (await p.textContent('.tab[data-k="words"]')).includes("Words · 8"));
  await p.click('.tab[data-k="orig"]'); await wait(100);
  await p.click("text=💡 Show Mam's hard words"); await wait(100);
  check("Mam's hard words show when I ask", !!(await p.$(".orig.picks")) && (await p.$$(".tw.mam")).length === 7);
  await p.click('.tw.mam:text-is("relief")'); await wait(500);
  check("tapping one of Mam's marked phrases picks the whole phrase", (await p.textContent(".para >> nth=1 >> .pickhead")).includes("“relief camps”"));
  await p.click("text=🙈 Hide Mam's hard words"); await wait(100);
  await p.click('.tab[data-k="words"]'); await wait(100);
  m = await msgs();
  check("Mam's list is still there in the Words tab", (await p.$$(".vrow")).length === 8 && m.includes("Mam's list of hard words · 6") && m.includes("easy to hurt"));
  const vrow = (w) => `.vrow:has(.vword > b:text-is("${w}"))`; // a row by its own word (a card's text can mention other words)
  await p.click(vrow("torrential") + " >> .vword"); await wait(500);
  let vi = await p.textContent(vrow("torrential") + " >> .vinfo");
  check("tapping a word: how to say it, meaning, the sentence in the story", vi.includes("tor-REN-shul") && vi.includes("very heavy") && vi.includes("Torrential rains lashed Sindh"));
  check("ways to learn it: examples, family, word partners, memory trick", vi.includes("How to learn it") && vi.includes("torrent (noun)") && vi.includes("torrential rain") && vi.includes("fast river"));
  const tor = vrow("torrential");
  await p.fill(tor + " >> textarea", "The torrential rain flooded my street"); await p.click(tor + ' >> text=Check my sentence'); await wait(500);
  check("practising the word in my own sentence", (await p.textContent(tor + " >> .vout")).includes("Nice try"));
  await p.fill(tor + " >> textarea", "Is it a formal word?"); await p.click(tor + ' >> text=Ask Mam'); await wait(500);
  check("asking Mam about the word", (await p.textContent(tor + " >> .vout")).includes("a little formal"));
  await p.click(vrow("submerging") + " >> .star"); await wait(200);
  check("☆ saves a word to My words", (await p.textContent(vrow("submerging") + " >> .star")) === "⭐" && (await p.textContent(".toast")).includes("Saved"));
  await p.click(tor + ' >> .vinfo >> text=Save to My words'); await wait(200);
  check("the word card can save it too (and the star follows)", (await p.textContent(tor + " >> .star")) === "⭐" && (await p.textContent(tor + " >> .vinfo")).includes("In My words"));
  await p.click('.tab[data-k="orig"]'); await wait(200);
  check("the original text divided into parts", (await p.$$(".sec")).length === 2 && (await p.$$(".para")).length === 3 && (await p.textContent(".sec >> nth=1")).includes("Part 2 of 2 · Help and worries"));
  check("my saved words are underlined in the original", (await p.$$(".tw.mine")).length === 2);
  const ol = await p.textContent(".outline");
  check("the headings are listed at the top of the original", ol.includes("📑 Headings") && ol.includes("1. What happened") && ol.includes("2. Help and worries") && ol.includes("Camps opened, but help was slow."));
  await p.click(".olink >> nth=1"); await wait(1200);
  check("tapping a heading jumps to that part", await p.evaluate(() => { const h = document.querySelectorAll(".sec")[1].getBoundingClientRect(), m = document.getElementById("main"), r = m.getBoundingClientRect(); return m.scrollTop > 0 && h.top >= r.top - 2 && h.bottom <= r.bottom; })); // as far up as the page can scroll
  await p.click('text=🔍 Analyse paragraph 1'); await wait(500);
  const an = await p.textContent(".para >> nth=0 >> .analysis");
  check("paragraph analysis: main idea, simple English, structure, hard sentence, tone, CSS tip", an.includes("Main idea") && an.includes("In simple English") && an.includes("Topic sentence") && an.includes("The hardest sentence") && an.includes("Tone:") && an.includes("For CSS"));
  await p.click(".orig .tipbox .x"); await wait(100);
  await p.click('.tab[data-k="words"]'); await p.click('.tab[data-k="orig"]'); await wait(100);
  check("a closed tip stays closed", !(await p.$(".orig .tipbox")) && (await p.evaluate(() => JSON.parse(localStorage.getItem("bolo.v1")).settings.tips.orig)) === true);
  await p.click('.tab[data-k="story"]'); await wait(100);
  check("the simple story is one tap away", (await msgs()).includes("Heavy rain caused floods"));
  await p.click('.tab[data-k="talk"]'); await wait(200);
  check("the story's Talk tab: Mam's first question and the talk bar", (await msgs()).includes("What happened in Sindh?") && !(await p.isHidden("#dock")) && !(await msgs()).includes("Heavy rain caused floods"));
  await say("Many people lost there homes in the flood", 900);
  check("talking about the story: Mam knows the story", await p.evaluate(() => window.__calls.some((c) => c.prompt.includes("Write Mam's next reply now") && c.prompt.includes("Heavy rain caused floods"))));
  check("corrections work in the news talk too", !!(await p.$(".msg.me .verdict")));
  cs = await chats();
  check("the story and the talk are saved", cs.some((c) => c.article?.title === "Floods in Sindh" && c.turns.length >= 3));
  check("word cards and analyses are saved with the story", cs.some((c) => c.article?.vocab?.[0]?.info?.say === "tor-REN-shul" && c.article.paras?.[0]?.an?.main));
  await p.reload(); await wait(900);
  check("reopening the app goes back to the story", (await p.textContent("#topicName")).includes("Floods in Sindh") && (await msgs()).includes("Words · 8") && (await p.textContent('.tab[aria-selected="true"]')).includes("Original"));
  check("a saved analysis is still there after reopening", (await p.textContent(".para >> nth=0 >> .analysis")).includes("Main idea"));
  await p.click("text=📰 All news"); await wait(300);
  check("All news lists the saved story", (await p.textContent("#newsList")).includes("Floods in Sindh"));
  await p.click('#newsList .trow:has-text("Harmful customs")'); await wait(300);
  await p.click('.tab[data-k="orig"]'); await wait(100);
  check("an older story explains how to get its parts and headings", (await msgs()).includes("added before Mam kept the original text") && !!(await p.$("text=📰 Add the story again")));
  await p.click("text=📰 Add the story again"); await wait(300);
  await p.click("#newsPasteBtn"); await p.fill("#newsText", "https://www.dawn.com/news/123"); await p.click("#newsGo"); await wait(200);
  check("a link alone is explained", (await p.textContent("#newsStatus")).includes("can't open links"));
  await p.evaluate(() => { window.__noStory = true; });
  await p.fill("#newsText", "Eggs, milk, bread, rice, sugar and tea for the whole week at home."); await p.click("#newsGo"); await wait(700);
  await p.evaluate(() => { window.__noStory = false; });
  check("no story found is explained", (await p.textContent("#newsStatus")).includes("could not find a news story"));
  await p.evaluate(() => { window.__noSections = true; });
  await p.fill("#newsText", "ISLAMABAD: The government announced a plan to plant ten million trees across the country this year."); await p.click("#newsGo"); await wait(800);
  check("pasted text becomes a story too", (await p.textContent("#topicName")).includes("Floods in Sindh") && await p.evaluate(() => window.__calls.some((c) => c.prompt.includes("Below is a news story") && c.prompt.includes("ten million trees"))));
  check("if Mam left out the headings, I can ask for them", !!(await p.$("text=📑 Make headings")) && !(await p.$(".sec")));
  await p.evaluate(() => { window.__noSections = false; });
  await p.click("text=📑 Make headings"); await wait(600);
  check("Make headings divides the story into parts", (await p.$$(".sec")).length === 2 && (await p.textContent(".outline")).includes("1. What happened") && (await p.textContent(".sec >> nth=0")).includes("Part 1 of 2"));
  const pdfDir = process.env.PDFJS_DIR;
  let pdfBuf = null;
  if (pdfDir && fs.existsSync(path.join(pdfDir, "pdf.min.js"))) {
    const pp = await b.newPage(); await pp.setContent("<h1>Budget for next year</h1><p>" + "The federal budget gives more money to schools and hospitals in every province of Pakistan. ".repeat(6) + "</p>");
    pdfBuf = await pp.pdf(); await pp.close();
    await p.click("text=📰 All news"); await wait(300);
    await p.setInputFiles("#newsFile", { name: "paper.pdf", mimeType: "application/pdf", buffer: pdfBuf }); await wait(2500);
    check("a PDF opens and asks which pages", !(await p.isHidden("#newsPages")) && (await p.textContent("#pOf")).includes("of 1"), await p.textContent("#newsStatus"));
    await p.click("#pdfGo"); await wait(1500);
    check("the PDF's words go to Mam", await p.evaluate(() => window.__calls.some((c) => c.prompt.includes("[Page 1]") && c.prompt.includes("schools and hospitals"))));
  } else console.log("SKIP PDF checks (set PDFJS_DIR to a pdfjs-dist 3.11.174 build folder)");
  await p.click("text=🎤 Interview me on this story"); await wait(300);
  check("a story I read: Interview me on this story fills in its title and text", (await p.textContent("#topicName")).includes("Interview me on a topic") && (await p.inputValue("#ivTopic")) === "Floods in Sindh" && (await p.inputValue("#ivText")).includes("Torrential rains lashed Sindh") && !(await p.isHidden("#ivPaste")));
  if (pdfBuf) {
    await p.setInputFiles("#ivFile", { name: "chapter.pdf", mimeType: "application/pdf", buffer: pdfBuf }); await wait(2000);
    check("a PDF for the interview asks which pages", !(await p.isHidden("#ivPages")) && (await p.textContent("#ivOf")).includes("of 1"));
    await p.click("#ivGo"); await wait(1500);
    check("the PDF's words go to Mam for the interview", await p.evaluate(() => window.__calls.some((c) => c.prompt.includes("preparing a practice interview") && c.prompt.includes("[Page 1]") && c.prompt.includes("schools and hospitals") && c.prompt.includes("Torrential rains"))));
  }
  // ---- My words ----
  check("the Words tab shows how many words to review", (await p.textContent("#wordsBadge")) === "2" && !(await p.isHidden("#wordsBadge")));
  await tab("words");
  let wl = await p.textContent("#wordList");
  check("My words lists the saved words with their meaning", (await p.$$("#wordList .vrow")).length === 2 && wl.includes("torrential") && wl.includes("covering with water") && wl.includes("review today"));
  await p.click('#wordList .vrow:has-text("torrential") .vword'); await wait(300);
  check("a saved word keeps its card and its sentence from the story", (await p.textContent('#wordList .vrow:has-text("torrential") .vinfo')).includes("tor-REN-shul") && (await p.textContent('#wordList .vrow:has-text("torrential") .vinfo')).includes("Torrential rains lashed"));
  await p.fill("#wordIn", "resilience"); await p.click('form:has(#wordIn) button'); await wait(600);
  check("I can add my own word and Mam explains it", (await p.$$("#wordList .vrow")).length === 3 && (await p.textContent('#wordList .vrow:has-text("resilience") .vinfo')).includes("How to learn it"));
  await p.click("text=▶ Review"); await wait(200);
  check("review shows one word at a time", (await msgs()).includes("Review · 1 of 3") && !!(await p.$("text=Show the meaning")));
  await p.click("text=Show the meaning"); await wait(100);
  check("then the meaning, and I say if I knew it", (await msgs()).includes("Meaning:") && !!(await p.$("text=I knew it")));
  await p.click("text=🙂 I knew it"); await wait(100);
  await p.click("text=Show the meaning"); await p.click("text=😕 I didn't know"); await wait(100);
  check("a word I didn't know comes again at the end", (await msgs()).includes("Review · 3 of 4"));
  for (let k = 0; k < 2; k++) { await p.click("text=Show the meaning"); await p.click("text=🙂 I knew it"); await wait(100); }
  check("the review ends with a summary", (await msgs()).includes("Well done") && (await msgs()).includes("You knew 2 of 3 words"));
  await wait(800);
  let words = Object.values(await store()).filter((d) => d?.word && d.id?.startsWith("w"));
  check("review results are saved: known words come back later", words.length === 3 && words.every((w) => w.box === 1 && w.due > Date.now() + 20 * 3600000));
  await p.click("text=Back to My words"); await wait(200);
  check("nothing due after the review", (await msgs()).includes("Next review tomorrow"));
  await p.click('#wordList .vrow:has-text("submerging") .vword'); await wait(300);
  await p.click("text=🗑 Remove from My words"); await wait(900);
  words = Object.values(await store()).filter((d) => d?.word && d.id?.startsWith("w"));
  check("a word can be removed", (await p.$$("#wordList .vrow")).length === 2 && words.find((w) => w.word === "submerging")?.removed === true);
  await p.click("text=💬 Practise them with Mam"); await wait(300);
  check("practise saved words in a talk with Mam", (await p.textContent("#topicName")).includes("Practise my words") && (await msgs()).includes("Let's use your words"));
  await say("The torrential rain was scary", 900);
  check("Mam knows which words to practise", await p.evaluate(() => window.__calls.some((c) => c.prompt.includes("practising these saved words") && c.prompt.includes("resilience") && !c.prompt.includes("submerging"))));
  await tab("news");
  check("the News tab comes back to the story I was reading", (await p.textContent("#topicName")).includes("Floods in Sindh"));
  await tab("news");
  check("tapping News again goes to the news page", !!(await p.$("label[for=newsFile]")));
  await topic("Free talk");
  check("leaving the newspaper brings the chat back", (await msgs()).includes("I like biryani") && !(await p.isHidden("#dock")));

  // ---- Structures ----
  await tab("learn");
  check("Structures tab: three levels, Basic first for a beginner", (await p.$$("#msgs .tabs .tab")).length === 3 && (await p.textContent('.tab[aria-selected="true"]')).includes("Basic") && (await p.$$("#structList .trow")).length === 29 && (await msgs()).includes("0 of 29 learned") && (await p.textContent("#structList")).includes("Time and tense"));
  await p.click('.tab:has-text("Intermediate")'); await wait(100);
  check("Intermediate has its own structures", (await p.$$("#structList .trow")).length === 30 && (await msgs()).includes("Giving your opinion"));
  await p.click('.tab:has-text("Advanced")'); await wait(100);
  check("Advanced: arguments, essays and interview answers", (await p.$$("#structList .trow")).length === 33 && (await msgs()).includes("PEEL paragraph") && (await msgs()).includes("STAR"));
  await p.click('.tab:has-text("Basic")'); await wait(100);
  await p.click('#structList .trow:has-text("Giving a reason")'); await wait(500);
  m = await msgs();
  check("a structure: pattern with slots, when to use it, examples, tip", (await p.$$(".formula .slot")).length === 2 && m.includes("When to use it") && m.includes("I like Lahore because the food is great.") && m.includes("💡"));
  check("Mam gives a practice question", (await p.textContent("#structTask")).includes("Why do you want to join the civil service?"));
  await p.fill("#structIn", "i want to join civil service because i want serve people"); await p.click("#structCheck"); await wait(500);
  const so = await p.textContent("#structOut");
  check("Mam checks my answer and shows a stronger one", so.includes("Well done") && so.includes("A stronger answer") && (await p.textContent("#structStatus")).includes("1 of 3"));
  check("the check knows the task and the pattern", await p.evaluate(() => window.__calls.some((c) => c.prompt.includes("Check this answer to a structure practice task") && c.prompt.includes("[Idea] because [reason]") && c.prompt.includes("Why do you want to join"))));
  await p.click("text=Next question →"); await wait(200);
  check("next question, with an empty answer box", (await p.textContent("#structTask")).includes("Why do you like your city?") && (await p.inputValue("#structIn")) === "");
  for (let k = 0; k < 2; k++) { await p.fill("#structIn", "I like my city because it is green"); await p.click("#structCheck"); await wait(400); }
  check("three correct answers: learned", (await p.textContent("#structStatus")).includes("Learned"));
  await p.click("text=← All structures"); await wait(200);
  check("the list shows it learned, and the level's progress", (await p.textContent('#structList .trow:has-text("Giving a reason")')).includes("learned") && (await msgs()).includes("1 of 29 learned"));
  await p.fill("#structAsk", "No sooner than"); await p.click("form:has(#structAsk) button"); await wait(500);
  check("Learn any structure: Mam makes a lesson from a pattern I type", (await p.textContent(".qcard .q")).includes("No sooner") && (await p.$$(".formula .slot")).length >= 2 && (await msgs()).includes("⭐ Mine"));
  await p.click("text=← All structures"); await wait(200);
  check("my structures are kept under ⭐ Mine", (await p.textContent('.tab[aria-selected="true"]')).includes("Mine · 1") && (await p.$$("#structList .trow")).length === 1);
  await p.click('.tab:has-text("Basic")'); await wait(100);
  await p.click('#structList .trow:has-text("Comparing two things")'); await wait(400);
  await tab("talk"); await tab("learn");
  check("the Structures tab comes back to the same page", (await p.textContent(".qcard .q")).includes("Comparing two things"));
  await p.click("text=💬 Use it with Mam"); await wait(300);
  check("practise a structure in a talk with Mam", (await p.textContent("#topicName")).includes("Practise: Comparing two things"));
  await say("Karachi is more big than Lahore", 900);
  check("Mam knows which structure to practise", await p.evaluate(() => window.__calls.some((c) => c.prompt.includes("Write Mam's next reply now") && c.prompt.includes("practise this sentence structure") && c.prompt.includes("Comparing two things"))));

  // ---- settings ----
  await topic("Free talk");
  // pull down to refresh (inside Claude: sync and redraw)
  const pull = (dy) => p.evaluate((dy) => { const m = document.getElementById("main"); m.scrollTop = 0; const ev = (type, y) => { const e = new Event(type); e.touches = y == null ? [] : [{ clientX: 100, clientY: y }]; m.dispatchEvent(e); }; ev("touchstart", 100); ev("touchmove", 100 + dy); return document.getElementById("ptr").textContent; }, dy);
  check("pulling the page down shows Pull down to refresh, then Let go", (await pull(60)).includes("Pull down to refresh") && (await pull(200)).includes("Let go to refresh"));
  await p.evaluate(() => document.getElementById("main").dispatchEvent(new Event("touchend"))); await wait(600);
  check("letting go refreshes the screen", (await p.textContent(".toast")).includes("Up to date") && (await msgs()).includes("I like biryani"));
  await p.click("#setBtn"); await wait(150);
  check("Likho English, the writing app, is one tap away in Settings", (await p.getAttribute("#likhoLink", "href")) === "https://claude.ai/artifact/LWTMTBXKvkTq7p9xcwrPpu");
  check("Mam's speaking speed has six choices, up to Very fast", (await p.$$("#rateSel option")).length === 6 && (await p.textContent("#rateSel")).includes("Very fast"));
  await p.selectOption("#lvSel", "A2"); await p.click("#setSheet [data-close].btn.primary"); await wait(700);
  check("a new level shows at once: Mam says her last message again at that level", (await msgs()).includes("Mam's English: Simple (A2)") && (await msgs()).includes("Okay, in simple words") && await p.evaluate(() => window.__calls.some((c) => c.prompt.includes("Say it again for a learner at level A2") && c.prompt.includes("CEFR A2"))));
  check("⚡ Fast beside 🐢 Slow under Mam's newest message", (await p.textContent("#msgs .say")).includes("⚡ Fast") && (await p.textContent("#msgs .say")).includes("🐢 Slow"));
  await say("I went to the market today");
  check("Mam's English follows the setting", await p.evaluate(() => window.__calls.some((c) => c.prompt.includes("CEFR A2"))));
  await p.click("#setBtn"); await p.click("#diagBtn"); await wait(900);
  const diag = await p.textContent("#diagOut");
  check("connection check passes", !/failed/i.test(diag) && diag.includes("2. Corrections ✓"), diag);
  await p.click("#setSheet [data-close].btn.primary");

  // ---- my progress ----
  await p.click("#progBtn"); await wait(400);
  const pg = await msgs();
  check("My progress: a fluency level and score", /^(A1|A2|B1|B2|C1)$/.test((await p.textContent(".hero")).trim()) && /Fluency score \d+ \/ 100/.test(pg) && pg.includes("of the way to"));
  check("a line chart of the fluency score, with the level lines", (await p.$$("#fluChart .pt")).length >= 1 && (await p.$$("#fluChart .grid")).length === 5 && (await p.textContent("#fluChart")).includes("B1"));
  const box = await p.$eval("#fluChart", (s) => { const r = s.getBoundingClientRect(); return { x: r.left + r.width - 20, y: r.top + r.height / 2 }; });
  await p.mouse.move(box.x, box.y); await wait(100);
  check("tapping the chart shows that day's score", !(await p.isHidden(".chartbox .tip")) && (await p.textContent(".chartbox .tip")).includes("Score"));
  check("this week: words, answers, accuracy, speed and streak", pg.includes("words spoken") && pg.includes("accuracy") && pg.includes("best words / min") && /🔥 \d+/.test(pg));
  check("what the score is made of, with a tip for the weakest part", pg.includes("Accuracy") && pg.includes("Answer length") && pg.includes("Speaking speed") && pg.includes("Mam's scores") && pg.includes("To level up"));
  check("words spoken each day as columns", (await p.$$("#wordChart .bar")).length >= 1);
  check("totals: structures learned, words saved, stories read", pg.includes("structures learned") && pg.includes("words saved") && pg.includes("stories read"));
  check("the numbers are also in a table", (await p.$$(".tbl tr")).length >= 2);
  check("the 📈 button shows the level, and the level is remembered", /📈 (A1|A2|B1|B2|C1)/.test(await p.textContent("#progBtn")) && /^(A1|A2|B1|B2|C1)$/.test(await p.evaluate(() => JSON.parse(localStorage.getItem("bolo.v1")).settings.fluencyBest)));
  check("no talk bar on the progress page", await p.isHidden("#dock"));
  await tab("talk");

  // ---- English only, layout, errors ----
  const txt = await p.evaluate(() => document.body.innerText);
  check("no Urdu on screen", !/[؀-ۿ]/.test(txt));
  check("no sideways scroll", !(await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)));
  const dbgDocs = await p.evaluate(() => Object.keys(window.__store.debug || {}).length);
  check("debug log is one document per visit", dbgDocs <= 2, String(dbgDocs));
  const errs = [...pageErrors, ...(await p.evaluate(() => window.__errors))];
  // an interview finished before the answers were marked one by one: its answers are marked at the end, three at a time
  const ivTopic = { id: "interview", em: "🏛️", name: "CSS interview", desc: "", open: "", extra: "", kind: "interview" }, t0 = Date.now() - 3600000;
  const oldIv = { id: "oldiv", kind: "interview", topic: ivTopic, started: t0, updated: t0 + 600000, words: 40, turns: [
    { role: "assistant", content: "[Chairman] Good morning. Please tell us about yourself.", at: t0 }, { role: "user", content: "I am Fatima from Lahore and I studied English literature", at: t0 + 60000 },
    { role: "assistant", content: "[Member 1] What is the biggest problem of Pakistan?", at: t0 + 120000 }, { role: "user", content: "I think the economy is the biggest problem because prices are very high", at: t0 + 180000 },
    { role: "assistant", content: "[Member 2] Why do you want to join the civil service?", at: t0 + 240000 }, { role: "user", content: "I want to serve my country and help poor people", at: t0 + 300000 },
    { role: "assistant", content: "[Member 1] What is CPEC?", at: t0 + 360000 }, { role: "user", content: "It is a road project with China", at: t0 + 420000 },
    { role: "assistant", content: "[Chairman] Thank you, Miss Fatima. The interview is over.", at: t0 + 480000 }] };
  const q2 = await b.newPage({ viewport: { width: 390, height: 844 } }); q2.on("pageerror", (e) => errs.push(e.message));
  await q2.route("**/*", (r) => (r.request().url().startsWith("http://bolo.test/") ? r.fulfill({ contentType: "text/html", body: html }) : r.abort()));
  await q2.addInitScript((d) => { window.__seed = { "data/users/u_test": { meta: { settings: { voice: false, lastTopic: "interview", lastTalk: "interview" } }, chat_oldiv: d }, library: {} }; }, oldIv);
  await q2.addInitScript(mock);
  await q2.goto("http://bolo.test/"); await q2.waitForTimeout(900);
  const before = await q2.textContent("#msgs");
  await q2.click("text=Get my score"); await q2.waitForTimeout(800);
  const om = await q2.textContent("#msgs"), oc = await q2.evaluate(() => window.__calls.filter((c) => /Judge ONE answer/.test(c.prompt)).length);
  check("an older interview: Get my score marks each of its answers, then adds them up", before.includes("Get my score") && oc === 4 && om.includes("out of 300 · Interview score") && om.includes("Question by question") && om.includes("The candidate is polite"));
  check("four answers of about 10 words, marked weak to adequate: 144 of 300, a narrow pass", om.includes("144out of 300") && om.includes("✓ A real board would pass this (100 needed)") && om.includes("short answers cannot score high"));
  await q2.close();

  check("no page errors", errs.length === 0, errs.join(" ; "));
  await b.close();
  const failed = results.filter((x) => !x).length;
  console.log(`\n${results.length - failed}/${results.length} passed`);
  process.exit(failed ? 1 : 0);
})();
