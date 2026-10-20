// Fake claude.ai runtime for local tests. It mimics the real one where it matters:
// namespaces are frozen and documents from the store come back deep-frozen.
(() => {
  const deepFreeze = (o) => { if (o && typeof o === "object") { Object.values(o).forEach(deepFreeze); Object.freeze(o); } return o; };
  const today = new Date().toLocaleDateString("en-CA");
  const now = Date.now();
  const seed = window.__seed || {
    "data/users/u_test": {
      meta: { sessions: [{ id: "s1", date: now - 86400000, topic: "My city", em: "🏙️", min: 3, words: 40, newCards: 1, score: 6 }], days: { [today]: { min: 2, words: 30 } }, settings: { voice: true, goal: 10 } },
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
  const permissions = Object.freeze({ state: async () => "granted", request: async () => ({}), manage: async () => {} });

  const replyFor = (prompt) => {
    if (/exactly the word OK/.test(prompt)) return "OK";
    if (/Write Mam's next reply now/.test(prompt)) return window.__reply || "Nice! Lahore is a big city. What food do you like there?";
    if (/Translate this English sentence/.test(prompt)) return "لاہور ایک بڑا شہر ہے۔";
    if (/checking one spoken answer/.test(prompt)) return JSON.stringify({ verdict: "fix", errors: [{ wrong: "I living in Lahore", right: "I live in Lahore", why_ur: "یہاں live آئے گا" }], better: [{ label: "More natural", text: "I live in Lahore with my family." }, { label: "CSS interview", text: "I am from Lahore, where I live with my family." }], new_words: [{ word: "capital", ur: "دارالحکومت", example: "Lahore is the capital of Punjab.", emoji: "🏛️" }] });
    if (/Score the student's speaking/.test(prompt)) return JSON.stringify({ score: 6, level: "A2", did_well: ["Clear answers", "Good effort"], work_on: [{ wrong: "I living in Lahore", right: "I live in Lahore" }], tip_ur: "روزانہ بولیں", useful_line: "I am from Lahore." });
    if (/reading material from/.test(prompt)) return JSON.stringify({ title: "Floods in Sindh", emoji: "🌊", simple_en: "Heavy rain caused floods.", ur: "سیلاب آیا۔", css_angle: "Current Affairs.", words: [{ word: "flood", ur: "سیلاب", example: "The flood was big.", emoji: "🌊" }], questions: ["Why do floods happen?"], other_headlines: [] });
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
    window.__calls.push({ prompt: prompt.slice(0, 200), tier: opts.modelTier, images: opts.images ? [].concat(opts.images).length : 0 });
    if (window.__failNext) { const c = window.__failNext; window.__failNext = null; throw { code: c, message: "forced " + c }; }
    await new Promise((r) => setTimeout(r, 30));
    if (opts.signal?.aborted) throw { code: "cancelled", message: "aborted" };
    const text = replyFor(prompt);
    opts.onText?.({ text, delta: text });
    return text;
  };
  const sample = async (input, opts) => ({ text: await run(input, opts), truncated: false });
  sample.json = async (input, opts) => { const t = await run(input, opts); try { return JSON.parse(t); } catch { throw { code: "invalid_json", message: "no json", text: t }; } };
  sample.limits = async () => ({ maxPromptBytes: 262144, images: { maxCount: 20, maxInputBytes: 5e6, mediaTypes: ["image/jpeg", "image/png"] } });
  Object.freeze(sample);
  const caps = { sample, db, user, permissions };
  window.claude = Object.freeze({ use: async (name) => caps[name] || null });
  window.addEventListener("error", (e) => window.__errors.push("error: " + e.message));
  window.addEventListener("unhandledrejection", (e) => window.__errors.push("unhandled: " + (e.reason?.message || e.reason?.code || e.reason)));
})();
