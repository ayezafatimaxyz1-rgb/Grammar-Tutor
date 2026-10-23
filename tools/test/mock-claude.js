// Fake claude.ai runtime for local tests. It mimics the real one where it matters:
// namespaces are frozen and documents from the store come back deep-frozen.
(() => {
  const deepFreeze = (o) => { if (o && typeof o === "object") { Object.values(o).forEach(deepFreeze); Object.freeze(o); } return o; };
  const today = new Date().toLocaleDateString("en-CA");
  const now = Date.now();
  const seed = window.__seed || {
    "data/users/u_test": {
      meta: { sessions: [{ id: "s1", date: now - 86400000, topic: "My city", em: "🏙️", min: 3, words: 40, newCards: 1, score: 6 }], days: { [today]: { min: 2, words: 30 } }, settings: { voice: true, goal: 10 } },
      chat_cold: { id: "cold", kind: "talk", topic: { id: "city", em: "🏙️", name: "My city", desc: "Places and food", open: "Which city do you live in?", extra: "", css: false, kind: "talk" }, started: now - 2 * 86400000, updated: now - 2 * 86400000, turns: [{ role: "assistant", content: "Which city do you live in?" }, { role: "user", content: "I live in Karachi", fb: { verdict: "great", errors: [], better: [{ label: "More natural", text: "I live in Karachi." }] } }, { role: "assistant", content: "Nice! What is Karachi famous for?" }], words: 4, min: 0.5, newCards: 0 },
      card_a1: { id: "a1", type: "word", word: "economy", ur: "معیشت", example: "The economy is growing.", emoji: "💰", box: 0, due: now - 1000, created: now - 5000, topic: "Word of the day" },
    },
    library: {},
  };
  const store = {};
  for (const [col, docs] of Object.entries(seed)) store[col] = Object.fromEntries(Object.entries(docs).map(([k, v]) => [k, JSON.parse(JSON.stringify(v))]));
  window.__store = store; window.__calls = []; window.__errors = [];
  const snapDoc = (id, data) => ({ id, exists: data !== undefined, data: () => (data === undefined ? undefined : deepFreeze(JSON.parse(JSON.stringify(data)))), metadata: { fromCache: false, hasPendingWrites: false } });
  const listeners = {};
  const fire = (col) => (listeners[col] || []).forEach((fn) => fn(snapOf(col)));
  const snapOf = (col) => { const docs = Object.entries(store[col] || {}).map(([id, d]) => snapDoc(id, d)); return { docs, size: docs.length, empty: !docs.length, docChanges: () => [], metadata: { fromCache: false, hasPendingWrites: false } }; };
  let autoId = 0;
  const collection = (col) => Object.freeze({
    path: col,
    get: async () => snapOf(col),
    onSnapshot: (fn) => { (listeners[col] = listeners[col] || []).push(fn); setTimeout(() => fn(snapOf(col)), 0); return () => {}; },
    doc: (id) => Object.freeze({
      id, path: col + "/" + id,
      get: async () => snapDoc(id, store[col]?.[id]),
      set: async (data) => { (store[col] = store[col] || {})[id] = JSON.parse(JSON.stringify(data)); fire(col); },
      update: async (data) => { (store[col] = store[col] || {})[id] = { ...(store[col][id] || {}), ...JSON.parse(JSON.stringify(data)) }; fire(col); },
      delete: async () => { if (store[col]) delete store[col][id]; fire(col); },
    }),
    add: async (data) => { const id = "auto" + ++autoId; (store[col] = store[col] || {})[id] = JSON.parse(JSON.stringify(data)); fire(col); return { id }; },
  });
  const db = Object.freeze({ collection, doc: (p) => { const i = p.lastIndexOf("/"); return collection(p.slice(0, i)).doc(p.slice(i + 1)); } });
  const user = Object.freeze({ id: async () => "u_test", me: async () => ({ id: "u_test", name: "" }), isOwner: async () => true, canEdit: async () => true, can: () => true, profiles: async () => ({}) });
  const permissions = Object.freeze({ state: async () => "granted", request: async () => ({}), manage: async () => { window.__managed = (window.__managed || 0) + 1; } });

  const replyFor = (prompt) => {
    if (/exactly the word OK/.test(prompt)) return "OK";
    if (/Write the board's next turn now/.test(prompt)) return /This is the last turn/.test(prompt) || window.__forceOver ? "[Chairman] Thank you very much. The interview is over." : "[Member 1] Why do you want to join the civil service?";
    if (/senior CSS \(FPSC\) interview examiner/.test(prompt)) return JSON.stringify({ score: 5, level: "A2", areas: { communication: 6, confidence: 5, knowledge: 4, english: 5 }, board_view: "The candidate is polite but needs longer answers.", did_well: ["Polite", "Clear"], work_on: [{ wrong: "I want serve", right: "I want to serve" }], tip: "Give one example in every answer.", useful_line: "I want to serve the people of Pakistan." });
    if (/Help them brainstorm/.test(prompt)) return JSON.stringify({ ideas: [{ title: "Serving my country", points: ["Help poor people", "Fight corruption"] }, { title: "My family's dream", points: ["My father wanted it", "Respect in society"] }, { title: "A good career", points: ["Job security", "Chance to lead"] }], words: ["public service", "responsibility", "honest", "opportunity", "improve"], plan: ["Start: I want to join the civil service because …", "Reason: The main reason is …", "Example: For example, …", "End: So, I believe …"] });
    if (/The (student|learner) spoke for/.test(prompt)) return JSON.stringify({ score: 7, comment: "Good flow with few pauses.", errors: [{ wrong: "I am agree", right: "I agree", why: "Agree is already a verb." }], better: "I want to join the civil service because I want to serve my country. As an officer, I can help people.", tip: "Use one example." });
    if (/wants to say something in English/.test(prompt)) return JSON.stringify({ meaning: "You are afraid of the interview.", ways: [{ label: "Simple", text: "I am afraid of the interview." }, { label: "Natural", text: "I feel nervous about the interview." }, { label: "Formal", text: "I am somewhat anxious about the interview." }], words: [{ word: "anxious", say: "ANK-shus" }], tip: "Use nervous in daily talk." });
    if (/is practising the (word|phrasal verb|idiom) "/.test(prompt) && /"used": true if they used/.test(prompt)) return JSON.stringify({ used: true, correct: false, fixed: "I think it is important for Pakistan.", note: "Nice try!" });
    if (/is practising the word/.test(prompt)) return JSON.stringify({ used_word: true, correct: false, fixed: "The economy of Pakistan is growing.", note: "Good try!" });
    if (/Write Mam's next reply now/.test(prompt)) return window.__reply || "Nice! Lahore is a big city. What food do you like there?";
    if (/Rewrite this in very simple English/.test(prompt)) return "Lahore is big. What food do you like?";
    if (/checking one spoken answer/.test(prompt)) return JSON.stringify({ verdict: "fix", fixed: "I live in Lahore.", errors: [{ wrong: "I living in Lahore", right: "I live in Lahore", why: 'Use "live" for where you stay.' }], better: [{ label: "More natural", text: "I live in Lahore with my family." }, { label: "CSS interview", text: "I am from Lahore, where I live with my family." }], new_words: [{ word: "capital", meaning: "the main city of a place", example: "Lahore is the capital of Punjab.", emoji: "🏛️" }] });
    if (/Score the student's speaking|score their speaking fairly/.test(prompt)) return JSON.stringify({ score: 6, level: "A2", did_well: ["Clear answers", "Good effort"], work_on: [{ wrong: "I living in Lahore", right: "I live in Lahore" }], tip: "Speak for ten minutes every day.", useful_line: "I am from Lahore." });
    if (/Below is a news story/.test(prompt)) return window.__noStory ? JSON.stringify({ title: "" }) : JSON.stringify({ title: "Floods in Sindh", emoji: "🌊", source: "Dawn", story: "Heavy rain caused floods in Sindh. Many people lost their homes. The government is sending food and tents.", css: "Pakistan Affairs: climate change and disasters.", words: [{ word: "flood", meaning: "too much water on dry land", example: "The flood damaged many homes." }, { word: "relief", meaning: "help for people in trouble", example: "Relief camps give food." }], questions: ["What happened in Sindh?", "How can Pakistan prepare for floods?", "Who should help the people?"] });
    if (/Reply with ONLY this JSON: \{"right"/.test(prompt)) return JSON.stringify({ right: "I live in Lahore" });
    return "OK";
  };
  const flat = (input) => (typeof input === "string" ? input : input.map((t) => t.content).join("\n"));
  const validate = (input, opts) => {
    if (typeof input !== "string") {
      if (!Array.isArray(input) || !input.length || input[0].role !== "user" || input[input.length - 1].role !== "user") throw { code: "invalid_request", message: "turns must start and end with user" };
      for (const t of input) if (!t.content) throw { code: "invalid_request", message: "empty turn" };
    }
    if (opts && (typeof opts !== "object" || Array.isArray(opts))) throw { code: "invalid_request", message: "options must be a plain object" };
    if (opts?.signal && !(opts.signal instanceof AbortSignal)) throw { code: "invalid_request", message: "signal must be an AbortSignal" };
  };
  const run = async (input, opts = {}) => {
    validate(input, opts);
    const prompt = flat(input);
    window.__calls.push({ prompt: prompt.slice(0, 2000), tier: opts.modelTier, images: opts.images ? [].concat(opts.images).length : 0 });
    if (window.__failNext) { const c = window.__failNext; window.__failNext = null; throw { code: c, message: "forced " + c }; }
    if (/checking one spoken answer/.test(prompt)) {
      if (window.__failCheck) { window.__failCheck = false; throw { code: "upstream_error", message: "forced check failure" }; }
      if (window.__slowCheck) { window.__slowCheck = false; await new Promise((r) => setTimeout(r, 1500)); }
    }
    if (window.__hangNext) { window.__hangNext = false; await new Promise((_, rej) => opts.signal?.addEventListener("abort", () => rej({ code: "cancelled", message: "aborted" }))); }
    await new Promise((r) => setTimeout(r, 30));
    if (opts.signal?.aborted) throw { code: "cancelled", message: "aborted" };
    const text = replyFor(prompt);
    opts.onText?.({ text, delta: text });
    return text;
  };
  const sample = async (input, opts) => ({ text: await run(input, opts), truncated: false });
  sample.json = async (input, opts) => { if (window.__noJson) throw { code: "capability_removed", message: "no json" }; const t = await run(input, opts); try { return JSON.parse(t); } catch { throw { code: "invalid_json", message: "no json", text: t }; } };
  sample.limits = async () => ({ maxPromptBytes: 262144, images: { maxCount: 20, maxInputBytes: 5e6, mediaTypes: ["image/jpeg", "image/png"] } });
  Object.freeze(sample);
  const caps = { sample, db, user, permissions };
  window.claude = Object.freeze({ use: async (name) => caps[name] || null });
  window.addEventListener("error", (e) => window.__errors.push("error: " + e.message));
  window.addEventListener("unhandledrejection", (e) => window.__errors.push("unhandled: " + (e.reason?.message || e.reason?.code || e.reason)));
})();
