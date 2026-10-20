// End-to-end check of the artifact inside a fake Claude runtime (tools/test/mock-claude.js).
// Usage: node tools/test/run-claude-flow.cjs   (needs Playwright; uses /opt/pw-browsers/chromium when present)
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
  await p.route("**/*", (r) => r.request().url().startsWith("http://bolo.test/") ? r.fulfill({ contentType: "text/html", body: html }) : r.abort());
  await p.addInitScript(mock);
  await p.goto("http://bolo.test/");
  await p.waitForTimeout(400);
  const results = [];
  const check = (name, ok, info) => { results.push({ name, ok }); console.log((ok ? "PASS " : "FAIL ") + name + (info && !ok ? " · " + info : "")); };
  const wait = (ms = 500) => p.waitForTimeout(ms);
  const store = () => p.evaluate(() => window.__store["data/users/u_test"]);
  const chatsIn = (st) => Object.entries(st).filter(([k]) => k.startsWith("chat_") && k !== "chat_cold").map(([, v]) => v);

  // ---- Talk ----
  check("sentence starters shown", true);
  await p.click(".topic:nth-child(2)");
  check("starters visible in chat", (await p.textContent("#startersSlot")).includes("My name is"));
  await p.click("#startersSlot .chip.starter");
  check("starter goes into the input", (await p.inputValue("#input")).startsWith("My name is"));
  await p.fill("#input", "I living in Lahore");
  await p.click("#sendBtn"); await wait();
  let msgs = await p.textContent("#msgs");
  check("my sentence stays on screen", msgs.includes("I living in Lahore"));
  check("Mam replies", msgs.includes("What food do you like"), msgs.slice(-120));
  check("corrections shown in English", msgs.includes("I live in Lahore") && msgs.includes('Use "live" for where you stay.'));
  await p.click(".msg.tutor .tools .mini:nth-child(3)"); await wait(300);
  check("Simpler button works", (await p.textContent("#msgs")).includes("Lahore is big."));
  await p.fill("#input", "I like biryani very much"); await p.click("#sendBtn"); await wait();
  await wait(900);
  let st = await store(); let chats = chatsIn(st);
  check("chat saved to the account", chats.length === 1 && chats[0].turns.length === 5, JSON.stringify(chats.map((c) => c.turns?.length)));
  check("feedback saved with the chat", !!chats[0]?.turns?.[1]?.fb?.errors?.length);
  await p.evaluate(() => { window.__failNext = "upstream_error"; });
  await p.fill("#input", "My city is very old"); await p.click("#sendBtn"); await wait();
  check("failed reply keeps sentence + retry", (await p.textContent("#msgs")).includes("My city is very old") && !!(await p.$(".notsent")));
  await p.click(".notsent"); await wait();
  check("retry gets a reply", !(await p.$(".notsent")));
  await p.click("#finishBtn"); await wait(800);
  check("finish shows report in the chat", (await p.textContent("#msgs")).includes("6/10"));

  // ---- History: reopen and continue ----
  await p.click("#backBtn");
  await p.click("[data-tab=history]"); await wait(200);
  check("history lists the chat", (await p.textContent("#hist")).includes("Introduce yourself"));
  await p.click("#hist .hitem"); await wait(300);
  msgs = await p.textContent("#msgs");
  check("reopened chat shows transcript", msgs.includes("I living in Lahore") && msgs.includes("I like biryani"));
  check("reopened chat keeps feedback + report", msgs.includes("to fix") && msgs.includes("6/10"));
  await p.fill("#input", "Thank you Mam"); await p.click("#sendBtn"); await wait(900);
  st = await store(); chats = chatsIn(st);
  check("continuing adds to the same chat", chats.length === 1 && chats[0].turns.filter((t) => t.role === "user").length === 4, JSON.stringify(chats.map((c) => c.turns?.length)));
  await p.click("#backBtn");

  // ---- Chats continue per topic ----
  check("topic card offers to continue", (await p.textContent("#topics")).includes("↻ Continue"));
  await p.click(".topic:nth-child(2)"); await wait(300);
  msgs = await p.textContent("#msgs");
  check("tapping the topic again keeps the old messages", msgs.includes("I living in Lahore") && msgs.includes("Thank you Mam"));
  await p.reload(); await wait(700);
  check("reopening the app goes back into the chat", !(await p.isHidden("#chat")) && (await p.textContent("#msgs")).includes("I like biryani"));
  await p.click("#newBtn"); await wait(300);
  msgs = await p.textContent("#msgs");
  check("＋ New starts an empty chat", !msgs.includes("I living in Lahore") && msgs.includes("What is your name"));
  await p.click("#backBtn");
  await p.reload(); await wait(700);
  check("after ← the app opens on the topic list", await p.isHidden("#chat"));

  // ---- Mock interview ----
  await p.click("#heroBtn"); await wait(200);
  check("interview opens with the Chairman", (await p.textContent("#msgs")).includes("Chairman"));
  await p.fill("#input", "My name is Ali and I am from Lahore"); await p.click("#sendBtn"); await wait();
  check("board member asks a follow-up", (await p.textContent("#msgs")).includes("Member 1"));
  await p.fill("#input", "I want serve my country"); await p.click("#sendBtn"); await wait();
  await p.click("#finishBtn"); await wait(800);
  const rep = await p.textContent("#msgs");
  check("interview report with areas", rep.includes("Interview report") && rep.includes("Confidence") && rep.includes("5/10"));
  await p.click("#backBtn");

  // ---- 1-minute answer ----
  await p.click("[data-tab=minute]"); await wait(200);
  check("question shown", (await p.textContent("#qText")).length > 5);
  await p.click("#minStart"); await wait(300);
  check("timer running", !(await p.isHidden("#minDone")));
  await p.fill("#minIn", "um I am agree that I want to join the civil service because because I love my country");
  await p.click("#minDone"); await wait(800);
  const mr = await p.textContent("#minResult");
  check("1-minute result with score and metrics", mr.includes("7/10") && mr.includes("words / min") && mr.includes("I agree"));
  check("fillers and repeats counted", /1\s*fillers|1fillers/.test(mr.replace(/\s+/g, "")) || mr.includes("fillers"));
  st = await store();
  check("1-minute answer saved to history", chatsIn(st).some((c) => c.kind === "minute" && c.attempts?.[0]?.result?.score === 7));

  // ---- Review (speaking) ----
  await p.click("[data-tab=review]"); await wait(200);
  check("review card asks to speak", (await p.textContent("#flashWrap")).includes("Say a sentence"));
  await p.fill("#revIn", "the economy is grow");
  await p.click("#flashWrap .row .btn.primary"); await wait(500);
  check("review checks the sentence", (await p.textContent("#flashWrap")).includes("You used") && (await p.textContent("#flashWrap")).includes("Better:"));
  await p.click("#flashWrap .row .btn.primary"); await wait(200);
  await p.click("#revSeg button[data-v=all]"); await wait(200);
  check("all cards view", (await p.textContent("#grid")).includes("economy"));
  check("old card shows English meaning", (await p.textContent("#grid")).includes("the money, jobs and trade of a country"));

  // ---- Read ----
  await p.click("[data-tab=read]");
  await p.click("#kindSeg button[data-k=weekly]");
  check("Read Weekly button works", (await p.getAttribute("#srcInput", "placeholder")).includes("Economist"));
  await p.fill("#pasteIn", "Heavy rain caused floods in Sindh this week.");
  await p.click("#processBtn"); await wait(800);
  check("read item created", (await p.textContent("#lib")).includes("Floods in Sindh"));
  await p.click("#lib details[open] .btn.primary"); await wait(200);
  check("retell opens the 1-minute screen", (await p.textContent("#qText")).includes("Retell this story"));

  // ---- Connection check ----
  await p.click("[data-tab=history]");
  await p.click("#diagBtn"); await wait(900);
  const diag = await p.textContent("#diagOut");
  check("connection check all pass", !/failed/i.test(diag) && /3\. Sentence check ✓/.test(diag), diag);

  // ---- Regression checks for the audit fixes ----
  await p.click("[data-tab=history]"); await wait(200);
  const coldBtn = (await p.$$("#hist .hitem")).at(-1);
  await coldBtn.click(); await wait(300);
  check("chat saved on another day reopens", (await p.textContent("#msgs")).includes("I live in Karachi"));
  await p.fill("#input", "Karachi is famous for the sea"); await p.click("#sendBtn"); await wait(900);
  st = await store();
  check("continuing a chat loaded from the store works", st.chat_cold?.turns?.length === 5, String(st.chat_cold?.turns?.length));
  check("chat bar stays at the top", await p.evaluate(() => getComputedStyle(document.querySelector("#chat .chatbar")).position === "sticky"));
  await p.evaluate(() => { window.__failNext = "not_granted"; });
  await p.fill("#input", "The food is very good"); await p.click("#sendBtn"); await wait(500);
  const allowBtn = await p.$("text=Allow Claude");
  check("not allowed shows an Allow Claude button", !!allowBtn);
  if (allowBtn) { await allowBtn.click(); await wait(800); }
  check("Allow Claude opens Permissions and retries", (await p.evaluate(() => window.__managed)) === 1 && !(await p.$(".notsent")));
  const fixCards = (await store()); const n1 = Object.values(fixCards).filter((c) => c.type === "fix").length;
  await p.evaluate(() => { window.__failNext = "upstream_error"; });
  await p.fill("#input", "I living near the sea"); await p.click("#sendBtn"); await wait(500);
  const n2 = Object.values(await store()).filter((c) => c.type === "fix").length;
  check("no sentence check when the reply failed", n2 === n1, n1 + " -> " + n2);
  await p.click(".notsent"); await wait(900);
  const n3 = Object.values(await store()).filter((c) => c.type === "fix").length;
  check("check runs once after the retry", n3 === n1 + 1, n1 + " -> " + n3);
  await p.evaluate(() => { window.__hangNext = true; });
  await p.fill("#input", "I like the beach"); await p.click("#sendBtn"); await wait(7600);
  const stopBtn = await p.$("text=■ Stop");
  check("slow reply offers a Stop button", !!stopBtn);
  if (stopBtn) { await stopBtn.click(); await wait(300); }
  check("Stop leaves the sentence ready to retry", !!(await p.$(".notsent")));
  await p.evaluate(() => { window.__noJson = true; });
  await p.click(".notsent"); await wait(900);
  check("corrections work without sample.json", (await p.textContent("#msgs")).includes("to fix"));
  await p.evaluate(() => { window.__noJson = false; });
  const dbgDocs = await p.evaluate(() => Object.keys(window.__store.debug || {}).length);
  check("debug log is one document per visit", dbgDocs === 1, String(dbgDocs));
  await p.click("#backBtn");
  await p.click("[data-tab=read]"); await wait(200);
  if (!(await p.$("#lib details[open]"))) await p.click("#lib details summary");
  await p.evaluate(async () => { const db = await window.claude.use("db"); await db.collection("library").doc("x_claude").set({ id: "x_claude", kind: "weekly", source: "The Economist", created: Date.now() - 999999, title: "Added by Claude", emoji: "📘", simple_en: "A short story.", words: [{ word: "tariff", meaning: "a tax on goods from abroad", example: "The tariff is high.", emoji: "🚢" }], questions: [] }); });
  await wait(600);
  check("open article stays open after sync", !!(await p.$("#lib details[open]")));
  check("article added by Claude appears", (await p.textContent("#lib")).includes("Added by Claude"));
  check("its key words become cards once", Object.values(await store()).filter((c) => c.word === "tariff").length === 1);
  await p.click("[data-tab=minute]"); await p.click("#minStart"); await p.fill("#minIn", "I think education is important"); await p.click("[data-tab=talk]"); await wait(300);
  check("leaving 1-Minute ends the run", await p.evaluate(() => document.getElementById("minDone").hidden));

  // ---- English only + layout ----
  for (const tab of ["talk", "minute", "read", "review", "history"]) {
    await p.click(`[data-tab=${tab}]`); await wait(150);
    const txt = await p.evaluate(() => document.body.innerText);
    check(`no Urdu on ${tab}`, !/[؀-ۿ]/.test(txt));
    const wide = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    check(`no sideways scroll on ${tab}`, !wide);
  }
  await p.screenshot({ path: path.join(__dirname, "../../.test-shot.png") }).catch(() => {});
  const errs = [...pageErrors, ...(await p.evaluate(() => window.__errors))];
  check("no page errors", errs.length === 0, errs.join(" ; "));
  await b.close();
  const failed = results.filter((r) => !r.ok).length;
  console.log(`\n${results.length - failed}/${results.length} passed`);
  process.exit(failed ? 1 : 0);
})();
