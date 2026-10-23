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
  const topic = async (name) => { await p.click("#topicBtn"); await wait(150); await p.click(`#topicList .trow:has-text("${name}")`); await wait(300); };
  const msgs = () => p.textContent("#msgs");

  // ---- opens straight into a conversation ----
  check("opens on Free talk with Mam's question", (await p.textContent("#topicName")).includes("Free talk") && (await msgs()).includes("What would you like to talk about today"));
  check("no fake mic button inside Claude (it cannot listen there)", await p.isHidden("#orb"));
  check("inside Claude: typing box and voice-version link", !(await p.isHidden("#typeRow")) && (await p.textContent("#hint")).includes("voice version"));
  check("only the simple screen (no tabs)", !(await p.$("nav")));

  // ---- talk + corrections on tap ----
  await say("I living in Lahore");
  let m = await msgs();
  check("my sentence stays", m.includes("I living in Lahore"));
  check("Mam replies", m.includes("What food do you like"), m.slice(-150));
  await wait(400);
  check("corrections are folded under my sentence", (await p.textContent(".msg.me .verdict")).includes("1 mistake") && await p.isHidden(".msg.me .fb"));
  await p.click(".msg.me .bubble"); await wait(150);
  check("tapping my sentence shows the mistake and better ways", !(await p.isHidden(".msg.me .fb")) && (await p.textContent(".msg.me .fb")).includes("I live in Lahore") && (await p.textContent(".msg.me .fb")).includes("CSS interview"));
  await say("I like biryani very much", 900);
  let cs = await chats();
  const free = cs.find((c) => c.topic?.id === "free");
  check("conversation saved to the account", free && free.turns.length === 5, JSON.stringify(cs.map((c) => [c.topic?.id, c.turns?.length])));
  check("corrections saved with it", !!free?.turns?.[1]?.fb?.errors?.length);

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
  check("interview end offers feedback and a new interview", (await msgs()).includes("Get my feedback") && (await msgs()).includes("Start a new interview"));
  const boardCalls = await p.evaluate(() => window.__calls.filter((c) => c.prompt.includes("interview board")).length);
  await say("One more thing", 400);
  check("a finished interview does not continue", (await msgs()).includes("This interview is over") && (await p.evaluate(() => window.__calls.filter((c) => c.prompt.includes("interview board")).length)) === boardCalls);
  await p.click("text=Get my feedback"); await wait(800);
  check("interview feedback with scores", (await msgs()).includes("Interview feedback") && (await msgs()).includes("Confidence"));
  await p.click("text=Start a new interview"); await wait(300);
  check("a new interview starts fresh", !(await msgs()).includes("I want serve my country"));

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

  // ---- newspaper ----
  await topic("Newspaper"); await wait(300);
  check("newspaper page: add a story and daily, weekly, monthly papers", !!(await p.$("label[for=newsFile]")) && !!(await p.$('a[href*="dawn.com"]')) && !!(await p.$('a[href*="economist.com"]')) && !!(await p.$('a[href*="jworldtimes.com"]')));
  check("newspaper page has no talk button and no search inside Claude", (await p.isHidden("#dock")) && !(await p.$("#headlines")));
  const png = await p.screenshot({ clip: { x: 0, y: 0, width: 200, height: 200 } });
  await p.setInputFiles("#newsFile", { name: "dawn.png", mimeType: "image/png", buffer: png }); await wait(900);
  check("a screenshot becomes a simple story", (await p.textContent("#topicName")).includes("Floods in Sindh") && (await msgs()).includes("Heavy rain caused floods"));
  check("the screenshot goes to Mam as a picture", await p.evaluate(() => window.__calls.some((c) => c.prompt.includes("Below is a news story") && c.images === 1)));
  m = await msgs();
  check("story card: new words, CSS link and Mam's first question", m.includes("relief") && m.includes("For CSS") && m.includes("What happened in Sindh?"));
  await say("Many people lost there homes in the flood", 900);
  check("talking about the story: Mam knows the story", await p.evaluate(() => window.__calls.some((c) => c.prompt.includes("Write Mam's next reply now") && c.prompt.includes("Heavy rain caused floods"))));
  check("corrections work in the news talk too", !!(await p.$(".msg.me .verdict")));
  cs = await chats();
  check("the story and the talk are saved", cs.some((c) => c.article?.title === "Floods in Sindh" && c.turns.length >= 3));
  await p.reload(); await wait(900);
  check("reopening the app goes back to the story", (await p.textContent("#topicName")).includes("Floods in Sindh") && (await msgs()).includes("Heavy rain caused floods"));
  await p.click("text=📰 All news"); await wait(300);
  check("All news lists the saved story", (await p.textContent("#newsList")).includes("Floods in Sindh"));
  await p.click("#newsPasteBtn"); await p.fill("#newsText", "https://www.dawn.com/news/123"); await p.click("#newsGo"); await wait(200);
  check("a link alone is explained", (await p.textContent("#newsStatus")).includes("can't open links"));
  await p.evaluate(() => { window.__noStory = true; });
  await p.fill("#newsText", "Eggs, milk, bread, rice, sugar and tea for the whole week at home."); await p.click("#newsGo"); await wait(700);
  await p.evaluate(() => { window.__noStory = false; });
  check("no story found is explained", (await p.textContent("#newsStatus")).includes("could not find a news story"));
  await p.fill("#newsText", "ISLAMABAD: The government announced a plan to plant ten million trees across the country this year."); await p.click("#newsGo"); await wait(800);
  check("pasted text becomes a story too", (await msgs()).includes("Heavy rain caused floods") && await p.evaluate(() => window.__calls.some((c) => c.prompt.includes("Below is a news story") && c.prompt.includes("ten million trees"))));
  const pdfDir = process.env.PDFJS_DIR;
  if (pdfDir && fs.existsSync(path.join(pdfDir, "pdf.min.js"))) {
    const pp = await b.newPage(); await pp.setContent("<h1>Budget for next year</h1><p>" + "The federal budget gives more money to schools and hospitals in every province of Pakistan. ".repeat(6) + "</p>");
    const pdfBuf = await pp.pdf(); await pp.close();
    await p.click("text=📰 All news"); await wait(300);
    await p.setInputFiles("#newsFile", { name: "paper.pdf", mimeType: "application/pdf", buffer: pdfBuf }); await wait(2500);
    check("a PDF opens and asks which pages", !(await p.isHidden("#newsPages")) && (await p.textContent("#pOf")).includes("of 1"), await p.textContent("#newsStatus"));
    await p.click("#pdfGo"); await wait(1500);
    check("the PDF's words go to Mam", await p.evaluate(() => window.__calls.some((c) => c.prompt.includes("[Page 1]") && c.prompt.includes("schools and hospitals"))));
  } else console.log("SKIP PDF checks (set PDFJS_DIR to a pdfjs-dist 3.11.174 build folder)");
  await topic("Free talk");
  check("leaving the newspaper brings the chat back", (await msgs()).includes("I like biryani") && !(await p.isHidden("#dock")));

  // ---- settings ----
  await p.click("#setBtn"); await wait(150);
  await p.selectOption("#lvSel", "A2"); await p.click("#setSheet [data-close].btn.primary"); await wait(150);
  await topic("Free talk");
  await say("I went to the market today");
  check("Mam's English follows the setting", await p.evaluate(() => window.__calls.some((c) => c.prompt.includes("CEFR A2"))));
  await p.click("#setBtn"); await p.click("#diagBtn"); await wait(900);
  const diag = await p.textContent("#diagOut");
  check("connection check passes", !/failed/i.test(diag) && diag.includes("2. Corrections ✓"), diag);
  await p.click("#setSheet [data-close].btn.primary");

  // ---- English only, layout, errors ----
  const txt = await p.evaluate(() => document.body.innerText);
  check("no Urdu on screen", !/[؀-ۿ]/.test(txt));
  check("no sideways scroll", !(await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)));
  const dbgDocs = await p.evaluate(() => Object.keys(window.__store.debug || {}).length);
  check("debug log is one document per visit", dbgDocs <= 2, String(dbgDocs));
  const errs = [...pageErrors, ...(await p.evaluate(() => window.__errors))];
  check("no page errors", errs.length === 0, errs.join(" ; "));
  await b.close();
  const failed = results.filter((x) => !x).length;
  console.log(`\n${results.length - failed}/${results.length} passed`);
  process.exit(failed ? 1 : 0);
})();
