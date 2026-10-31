/* Ask the board: the learner types anything about prepositions, Claude writes a short
   board lesson in the same format as the course lessons, and the player draws it.
   Everything Claude sends back is checked and cleaned here before the board sees it,
   so a malformed answer can never break the page. */
(function () {
  const P = (window.PLAB = window.PLAB || {});
  const SAVED_KEY = "prepositions-lab:asked";
  const MAX_SAVED = 25;
  const W = 960, H = 600;
  const INKS = ["main", "accent", "accent2", "muted", "trouble", "hi"];
  const DRAWABLE = ["rect", "circle", "ellipse", "line", "arrow", "person", "blob", "group"];

  /* ---------- saved explanations (this browser only) ---------- */

  function readSaved() {
    try {
      const list = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function writeSaved(list) {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(list.slice(0, MAX_SAVED)));
    } catch (e) {}
  }

  function register(lesson) {
    Object.assign(P.misconceptions, lesson.misconceptions || {});
    P.registerLesson(lesson);
  }

  // Saved explanations were cleaned before they were saved.
  readSaved().forEach((l) => {
    if (l && l.id && Array.isArray(l.steps)) register(l);
  });

  /* ---------- cleaning what comes back ---------- */

  const num = (v, lo, hi, def) => {
    const n = Number(v);
    return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : def;
  };
  const str = (v, max) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");
  const point = (p) => (Array.isArray(p) && p.length === 2 ? [num(p[0], 0, W, NaN), num(p[1], 0, H, NaN)] : null);
  const okPoint = (p) => p && Number.isFinite(p[0]) && Number.isFinite(p[1]);
  const slug = (v) => str(String(v ?? ""), 40).replace(/[^\w-]/g, "_");

  function cleanShape(s, depth = 0) {
    if (!s || !DRAWABLE.includes(s.shape)) return null;
    const out = { shape: s.shape };
    if (s.wobble !== undefined) out.wobble = num(s.wobble, 0, 6, 1.5);
    switch (s.shape) {
      case "rect":
        Object.assign(out, { x: num(s.x, 0, W - 10, NaN), y: num(s.y, 0, H - 10, NaN), w: num(s.w, 6, W, NaN), h: num(s.h, 6, H, NaN) });
        return [out.x, out.y, out.w, out.h].every(Number.isFinite) ? out : null;
      case "circle":
        Object.assign(out, { cx: num(s.cx, 0, W, NaN), cy: num(s.cy, 0, H, NaN), r: num(s.r, 3, 280, NaN) });
        return [out.cx, out.cy, out.r].every(Number.isFinite) ? out : null;
      case "ellipse":
        Object.assign(out, { cx: num(s.cx, 0, W, NaN), cy: num(s.cy, 0, H, NaN), rx: num(s.rx, 3, 460, NaN), ry: num(s.ry, 3, 290, NaN) });
        return [out.cx, out.cy, out.rx, out.ry].every(Number.isFinite) ? out : null;
      case "line":
      case "arrow":
        out.from = point(s.from);
        out.to = point(s.to);
        if (s.bow !== undefined) out.bow = num(s.bow, -120, 120, 0);
        return okPoint(out.from) && okPoint(out.to) ? out : null;
      case "person":
        Object.assign(out, { x: num(s.x, 20, W - 20, NaN), y: num(s.y, 0, H - 120, NaN), scale: num(s.scale ?? 1, 0.4, 1.6, 1) });
        return Number.isFinite(out.x) && Number.isFinite(out.y) ? out : null;
      case "blob":
        out.points = (Array.isArray(s.points) ? s.points : []).map(point).filter(okPoint).slice(0, 18);
        return out.points.length >= 3 ? out : null;
      case "group":
        if (depth) return null;
        out.parts = (Array.isArray(s.parts) ? s.parts : []).slice(0, 14).map((p) => cleanShape(p, 1)).filter(Boolean);
        return out.parts.length ? out : null;
    }
    return null;
  }

  function wordIn(text, word) {
    const esc = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^A-Za-z])${esc}(?![A-Za-z])`).test(text);
  }

  function clean(raw, question) {
    if (!raw || typeof raw !== "object" || !Array.isArray(raw.steps)) throw new Error("The answer had no steps.");
    const id = raw.id && String(raw.id).startsWith("ask-") ? slug(raw.id) : `ask-${Date.now().toString(36)}`;
    const items = new Map(); // id -> the cleaned action that made it
    const used = new Set();
    const misconceptions = {};
    const uniq = (base) => {
      let k = slug(base) || "item", n = 2;
      while (used.has(k)) k = `${slug(base)}-${n++}`;
      used.add(k);
      return k;
    };

    const timing = (a, o) => {
      if (a.dur !== undefined) o.dur = num(a.dur, 150, 5000, undefined);
      if (a.gap !== undefined) o.gap = num(a.gap, 0, 3000, undefined);
      if (a.sync) o.sync = true;
      if (a.offset !== undefined) o.offset = num(a.offset, 0, 3000, 0);
      return o;
    };

    const steps = raw.steps.slice(0, 12).map((s, si) => {
      const step = { id: uniq(s.id || `step${si + 1}`), title: str(s.title, 80) || `Step ${si + 1}`, actions: [] };
      step.alt = str(s.alt, 400) || step.title;
      const actionIds = new Set();
      for (const a of (Array.isArray(s.actions) ? s.actions : []).slice(0, 40)) {
        if (!a || typeof a !== "object") continue;
        let o = null;
        if (a.do === "draw") {
          const shape = cleanShape(a);
          if (shape) {
            o = { do: "draw", id: uniq(a.id), ...shape };
            if (INKS.includes(a.ink)) o.ink = a.ink;
            if (a.fill === "soft" || a.fill === "solid") o.fill = a.fill;
            if (a.width !== undefined) o.width = num(a.width, 1.5, 6, 3.6);
          }
        } else if (a.do === "write") {
          let text = str(a.text, 200);
          if (text.length > 70) text = text.slice(0, 70).replace(/\s+\S*$/, "") + "…";
          if (text) {
            o = { do: "write", id: uniq(a.id), text, x: num(a.x, 0, W, W / 2), y: num(a.y, 24, H - 6, H / 2), size: num(a.size ?? 36, 18, 64, 36) };
            if (["start", "middle", "end"].includes(a.anchor)) o.anchor = a.anchor;
            if (INKS.includes(a.ink)) o.ink = a.ink;
            if (a.style === "caps") o.style = "caps";
          }
        } else if (a.do === "highlight") {
          const t = items.get(slug(a.target));
          const word = str(a.word, 40);
          if (t && t.do === "write" && word && wordIn(t.text, word)) {
            o = { do: "highlight", id: uniq(a.id || `hl-${t.id}`), target: t.id, word };
            if (a.style === "underline" || a.style === "ring") o.style = a.style;
            if (INKS.includes(a.ink)) o.ink = a.ink;
          }
        } else if (a.do === "move") {
          const t = items.get(slug(a.target));
          if (t && Array.isArray(a.by)) {
            o = { do: "move", id: uniq(a.id || `mv-${t.id}`), target: t.id, by: [num(a.by[0], -W, W, 0), num(a.by[1], -H, H, 0)] };
            if (a.arc !== undefined) o.arc = num(a.arc, 0, 200, 0);
          }
        } else if (a.do === "erase") {
          const targets = a.targets === "all" ? "all" : (Array.isArray(a.targets) ? a.targets : []).map(slug).filter((t) => items.has(t));
          if (targets === "all" || targets.length) o = { do: "erase", id: uniq(a.id || "erase"), targets };
        } else if (a.do === "wait") {
          o = { do: "wait", id: uniq(a.id || "wait"), dur: num(a.dur, 100, 4000, 700) };
        }
        if (!o) continue;
        timing(a, o);
        if (o.do === "draw" || o.do === "write" || o.do === "highlight") items.set(o.id, o);
        // Remember the id the model used too, so later references still resolve.
        if (a.id && slug(a.id) !== o.id && (o.do === "draw" || o.do === "write")) items.set(slug(a.id), o);
        actionIds.add(o.id);
        if (a.id) actionIds.add(slug(a.id));
        step.actions.push(o);
      }
      step.say = (Array.isArray(s.say) ? s.say : []).slice(0, 8).map((l) => {
        const line = { text: str(typeof l === "string" ? l : l && l.text, 700) };
        const cue = l && slug(l.cue);
        if (cue && actionIds.has(cue)) line.cue = items.has(cue) ? items.get(cue).id : cue;
        return line;
      }).filter((l) => l.text);
      if (!step.say.length) step.say = [{ text: step.title }];

      const c = s.check;
      if (c && Array.isArray(c.options)) {
        const options = c.options.slice(0, 5).map((op) => {
          const opt = { text: str(op && op.text, 200), why: str(op && op.why, 700) };
          if (op && op.correct === true) opt.correct = true;
          else {
            const label = str(op && (op.mistake || op.misconception), 90) || "Choosing by guesswork";
            const tag = "ask-" + label.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);
            misconceptions[tag] = { label, explain: str(op && op.mistakeExplain, 300) };
            opt.misconception = tag;
          }
          if (!opt.why) opt.why = opt.correct ? "This is the answer that fits the relationship." : "This option does not fit the relationship described.";
          return opt;
        }).filter((op) => op.text);
        if (options.length >= 2 && options.filter((op) => op.correct).length === 1 && str(c.prompt, 400)) {
          step.check = { id: `${id}-q${si + 1}`, source: "original", skill: str(c.skill, 80) || step.title, prompt: str(c.prompt, 400), options };
        }
      }
      return step;
    }).filter((s) => s.actions.length || s.check || s.say.length);

    if (!steps.length) throw new Error("The answer had no usable steps.");
    return {
      id,
      generated: true,
      question: str(question, 300),
      title: str(raw.title, 90) || str(question, 90),
      level: "Drawn on request",
      minutes: Math.max(2, Math.round(steps.length * 1.2)),
      summary: str(raw.summary, 500) || `An explanation drawn in answer to: ${str(question, 200)}`,
      objectives: (Array.isArray(raw.objectives) ? raw.objectives : []).map((o) => str(o, 200)).filter(Boolean).slice(0, 4),
      misconceptions,
      steps,
    };
  }

  /* ---------- the prompt ---------- */

  const EXAMPLE = {
    title: "IN: inside a boundary",
    summary: "What in means and why it works for boxes and rooms.",
    objectives: ["Explain the core sense of in."],
    steps: [
      {
        id: "inside",
        title: "The ball moves in",
        alt: "A ball hops across the left edge of a box and lands inside it. The sentence reads: The ball is in the box.",
        say: [
          { text: "Here is a box. Its edges are a **boundary**.", cue: "box" },
          { text: "Watch the ball. It crosses the boundary.", cue: "move-ball" },
          { text: "Now we say: _The ball is in the box._ **In** means within the boundaries of something.", cue: "s-in" },
        ],
        actions: [
          { do: "draw", id: "box", shape: "rect", x: 330, y: 170, w: 300, h: 220, dur: 1800 },
          { do: "draw", id: "ball", shape: "circle", cx: 180, cy: 330, r: 26, ink: "accent", fill: "solid" },
          { do: "move", id: "move-ball", target: "ball", by: [300, 0], arc: 90, dur: 1500 },
          { do: "write", id: "s-in", text: "The ball is in the box.", x: 480, y: 525, size: 44, anchor: "middle" },
          { do: "highlight", id: "h-in", target: "s-in", word: "in" },
        ],
      },
      {
        id: "check",
        title: "Check",
        alt: "The ball inside the box.",
        say: [{ text: "Your turn." }],
        actions: [],
        check: {
          prompt: "Complete: The keys are ___ the drawer.",
          skill: "in for containers",
          options: [
            { text: "in", correct: true, why: "A drawer is a container with boundaries, so the keys are _in_ it." },
            { text: "on", why: "_On the drawer_ would mean resting on its top surface, not inside it.", mistake: "Inside (in) or on a surface (on)?", mistakeExplain: "In means surrounded by boundaries; on means touching a surface." },
          ],
        },
      },
    ],
  };

  function buildPrompt(question, context) {
    return `You are a patient English teacher drawing on a classroom whiteboard for a learner preparing for Pakistan's CSS English Precis and Composition exam. The learner has asked:

"""${question}"""
${context ? `\nThey asked this while studying the lesson "${context}".\n` : ""}
Teach the answer as a short board lesson of 3 to 7 steps. Teaching rules:
- Start from the simplest idea. Explain any grammar term in plain words before using it.
- Build understanding: concrete picture first, then the relationship, then other situations, then harder or abstract uses, then contrasts and common mistakes.
- Be accurate. Never invent a rule, a history or a "logic" for a conventional combination. If a usage is simply fixed by convention, say so plainly. Mark British/American or formal/informal differences when they matter. Say when two choices are both correct.
- Never claim anything is from a CSS past paper. Every question you write is original practice.
- Include at least one check step with 2 to 4 options, exactly one correct, and a clear "why" for every option.
- If the question is not about English grammar or usage, answer with one step that politely says this board explains English prepositions and grammar, and suggests a related question.

The board is a 960 x 600 canvas (x right, y down). Keep everything inside it with a 30 px margin. Board actions, drawn in order:
- {"do":"draw","id":..,"shape":"rect","x","y","w","h"} | "circle" {cx,cy,r} | "ellipse" {cx,cy,rx,ry} | "line" {from:[x,y],to:[x,y],bow} | "arrow" {from,to,bow} (bow = curve in px, optional) | "person" {x,y,scale} (a stick figure about 110*scale tall, x,y = top of head) | "blob" {points:[[x,y],...]} (a closed irregular outline, 5-12 points, for areas, cities, clouds, situations) | "group" {parts:[shapes]} (several shapes drawn as one item). Optional: "ink", "fill" ("soft" tint or "solid"), "width" (stroke, default 3.6), "dur" (ms).
- {"do":"write","id":..,"text":..,"x","y","size","anchor":"start"|"middle"|"end","ink"} handwriting. y is the baseline. Keep sentences under 34 characters at size 40-46, labels 24-34. Text never overlaps drawings or other text.
- {"do":"highlight","id":..,"target":<write id>,"word":<exact word or phrase in that text>,"style":"underline"|"ring" or omit for a yellow marker}
- {"do":"move","id":..,"target":<draw id>,"by":[dx,dy],"arc":<hop height px>}
- {"do":"erase","id":..,"targets":[ids] or "all"} to clear the board before a new picture (usually the first action of a step that changes picture).
- {"do":"wait","id":..,"dur":ms}
Any action may have "gap" (pause before it, ms) or "sync":true (start together with the previous action).
Inks: "main" (dark), "accent" (blue, the key thing), "accent2" (teal, labels and boundaries), "muted" (grey), "trouble" (red, contrasts and wrong forms), "hi".
Ids are unique across the whole lesson. Items stay on the board into later steps until erased.

Each step: {"id","title","alt" (one sentence describing the finished board for screen readers),"say":[{"text","cue":<id of the action this line goes with>}],"actions":[...],"check"?}
In "say" text, **word** marks a key term and _text_ marks an example. Each say line is 1-3 short sentences.
A check: {"prompt","skill","options":[{"text","correct":true,"why"} or {"text","why","mistake":<short name of the misunderstanding>,"mistakeExplain":<one sentence>}]}

Plan the layout before writing coordinates. Every step except a check must draw at least one picture that shows the logic of the meaning: inside, on a surface, a point, a path, between two, among many, before/after on a time line, cause to effect, control from above, a limit, a swap, and so on. Even abstract and fixed uses get a picture of the idea behind them (for example control over = a hand above holding strings; under review = a document under a magnifying glass). Never leave a board with only text, and explain in the say lines how the picture shows the meaning.

Reply with only one JSON object: {"title","summary","objectives":[..],"steps":[..]}. Here is a short example of the format:
${JSON.stringify(EXAMPLE)}`;
  }

  /* ---------- every question the learner asks, saved in this browser ---------- */

  const QUESTIONS_KEY = "prepositions-lab:questions";
  function readQuestions() {
    try {
      const list = JSON.parse(localStorage.getItem(QUESTIONS_KEY) || "[]");
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }
  function saveQuestion(q, found) {
    const item = {
      q,
      at: Date.now(),
      found: found.slice(0, 4).map((r) => ({ lesson: r.lesson.id, step: r.step, label: r.kind === "word" ? r.word : r.stepTitle })),
    };
    const list = [item, ...readQuestions().filter((x) => x.q.toLowerCase() !== q.toLowerCase())].slice(0, 200);
    try {
      localStorage.setItem(QUESTIONS_KEY, JSON.stringify(list));
    } catch (e) {}
  }
  function questionsHtml(esc) {
    const list = readQuestions();
    if (!list.length) return '<p class="muted">Nothing yet. Every question you ask is kept here, in this browser, with what it found.</p>';
    return `<ul class="asked-q">${list
      .map((x, i) => `<li><strong>${esc(x.q)}</strong> <span class="muted small">· ${esc(new Date(x.at).toLocaleDateString())}</span>
        <div class="row-buttons">${x.found
          .map((f) => `<button type="button" class="button small ghost" data-jump="${esc(f.lesson)}|${esc(f.step)}">${esc(f.label)}</button>`)
          .join("")}<button type="button" class="button small" data-again="${i}">Ask again</button></div></li>`)
      .join("")}</ul><p><button type="button" class="linkish" id="ask-clear">Clear my questions</button></p>`;
  }

  /* ---------- free lookup in the course itself ---------- */

  // The claude.ai copy of the app, where Ask can use Claude through the learner's own subscription.
  const CLAUDE_COPY = "https://claude.ai/artifact/PYRbToXAwNXUihTyz4EAkb";
  const PREPS = new Set("about above across after against along among around as at before behind below beneath beside besides between beyond by despite down during except for from in inside into like near of off on onto out outside over past per since than through throughout till to towards under until up upon via with within without".split(" "));
  const STOP = new Set("a an the is are was were be do does did i you we it this that what which why how when or and vs versus not no to say use used say difference between meaning mean means word words sentence correct right wrong".split(" "));

  let index = null;
  function buildIndex() {
    index = [];
    for (const l of Object.values(P.lessons)) {
      if (l.generated) continue;
      l.steps.forEach((st) => {
        if (/-senses$/.test(st.id)) {
          const word = st.id.replace(/-senses$/, "").replace(/-/g, " ");
          const why = l.steps.find((x) => x.id === st.id.replace(/-senses$/, "-why"));
          index.push({ kind: "word", word, lesson: l, step: st.id, why: why && why.id, text: (st.alt || "").toLowerCase() });
        }
      });
      // Every teaching step is searchable, so a question can land on the exact board.
      l.steps.forEach((st) => {
        if (st.check || /-senses$|-why$/.test(st.id)) return;
        const text = [st.title, st.alt, ...(st.say || []).map((x) => x.text)].join(" ").toLowerCase().replace(/[*_]/g, "");
        index.push({ kind: "step", lesson: l, step: st.id, stepTitle: st.title, title: l.title.toLowerCase(), text });
      });
    }
  }

  function lookup(question) {
    if (!index) buildIndex();
    const tokens = (question.toLowerCase().match(/[a-z]+/g) || []).filter((t) => t.length > 1);
    const preps = tokens.filter((t) => PREPS.has(t));
    const content = tokens.filter((t) => !PREPS.has(t) && !STOP.has(t));
    const stem = (t) => t.replace(/(ing|ed|es|s)$/, "");
    const results = [];
    for (const e of index) {
      let score = 0;
      if (e.kind === "word") {
        const w = e.word;
        if (content.some((t) => t === w || stem(t) === stem(w) || (t.length > 4 && (w.startsWith(stem(t)) || t.startsWith(stem(w)))))) {
          score = 10 + preps.filter((p) => e.text.includes(`${w} ${p} `) || e.text.includes(`${w} ${p} =`)).length * 2;
        }
      } else {
        const has = (t) => new RegExp(`\\b${t}`).test(e.text);
        const hits = content.filter((t) => t.length > 2 && has(stem(t)));
        score = hits.length * 2 + hits.filter((t) => new RegExp(`\\b${stem(t)}`).test(e.title)).length;
        const st = (e.stepTitle || "").toLowerCase();
        score += hits.filter((t) => new RegExp(`\\b${stem(t)}`).test(st)).length * 2;
        if (content.length && hits.length === content.length) score += 3;
        const word = (p) => new RegExp(`\\b${p}\\b`, "i");
        const pText = preps.filter((p) => word(p).test(e.text)).length;
        const pTitle = preps.filter((p) => word(p).test(e.title)).length;
        const pStep = preps.filter((p) => word(p).test(st)).length;
        if (!content.length) score = pTitle * 3 + pStep * 2 + (pText === preps.length ? 1 : 0);
        else if (hits.length) score += pText;
        else score = 0;
        if (/why this one/i.test(st)) score -= 1;
        if (score < 3) score = 0;
      }
      if (score) results.push({ ...e, score });
    }
    // Keep the best match per lesson, so a lesson is not listed twice.
    const seen = new Set();
    return results.sort((a, b) => b.score - a.score).filter((r) => (seen.has(r.lesson.id) ? false : seen.add(r.lesson.id))).slice(0, 6);
  }

  function resultsHtml(found, esc) {
    if (!found.length) return "";
    return `<p class="eyebrow">Already in the course</p><ul class="found-list">${found
      .map((r) =>
        r.kind === "word"
          ? `<li><strong>${esc(r.word)}</strong> <span class="muted">· ${esc(r.lesson.title)}</span>
               <span class="row-buttons"><button type="button" class="button small" data-jump="${esc(r.lesson.id)}|${esc(r.step)}">See its meanings</button>${
                 r.why ? `<button type="button" class="button small ghost" data-jump="${esc(r.lesson.id)}|${esc(r.why)}">Why this one?</button>` : ""}</span></li>`
          : `<li><strong>${esc(r.stepTitle)}</strong> <span class="muted">· ${esc(r.lesson.title)}</span>
               <span class="row-buttons"><button type="button" class="button small" data-jump="${esc(r.lesson.id)}|${esc(r.step)}">Show on the board</button></span></li>`
      )
      .join("")}</ul>`;
  }

  /* ---------- the view ---------- */

  let sampleFn; // undefined: not asked yet; null: unavailable
  async function getSample() {
    if (sampleFn !== undefined) return sampleFn;
    try {
      sampleFn = window.claude && window.claude.use ? await window.claude.use("sample") : null;
    } catch (e) {
      sampleFn = null;
    }
    return sampleFn;
  }

  const ERRORS = {
    not_granted: "Claude was not allowed for this page, so the board cannot draw new explanations here.",
    sampling_disabled: "Claude is not available for this account.",
    rate_limited: "Too many requests just now. Wait a little and try again.",
    session_expired: "Your Claude session has expired. Sign in again, then try once more.",
    refused: "Claude would not answer that request. Try asking it differently.",
    invalid_json: "The drawing came back in a form the board could not read. Try again.",
    empty_completion: "Nothing came back. Try asking in a different way.",
  };

  P.ask = {
    clean,
    buildPrompt,

    render(app, { esc, prefill = "", context = "" }) {
      const saved = readSaved();
      app.innerHTML = `
        <section class="intro compact">
          <p class="eyebrow">Ask the board</p>
          <h1>What should the board explain?</h1>
          <p class="lede">Ask about any preposition, phrase or confusing pair. The board will sketch the explanation step by step and end with a question to check your understanding.</p>
        </section>
        <section class="ask-box">
          <form id="ask-form" class="ask-form">
            <label for="ask-q" class="sr-only">Your question</label>
            <textarea id="ask-q" rows="3" maxlength="300" placeholder="e.g. What is the difference between between and among?">${esc(prefill)}</textarea>
            <div class="row-buttons">
              <button id="ask-go" class="button primary" type="submit">Draw the explanation</button>
              <button id="ask-stop" class="button ghost" type="button" hidden>Stop</button>
            </div>
          </form>
          <div class="ask-try">
            <span class="muted">Try:</span>
            ${["between or among?", "arrive at or arrive in?", "why do we say on the bus but in the car?", "for or since?", "apply for vs apply to", "prevent someone from"]
              .map((q) => `<button type="button" class="chip-btn" data-q="${esc(q)}">${esc(q)}</button>`)
              .join("")}
          </div>
          <p id="ask-status" class="ask-status" aria-live="polite"></p>
          <div id="ask-found" class="ask-found" aria-live="polite"></div>
          <div id="ask-handoff" class="ask-handoff" hidden>
            <p>Not in the course yet? Ask Claude in the claude.ai version of this app. It is covered by your Claude subscription, with no extra cost. Your question is copied, so you only paste it there.</p>
            <a id="ask-claude" class="button primary" href="${CLAUDE_COPY}#ask" target="_blank" rel="noopener">Ask Claude on claude.ai</a>
          </div>
          <p class="muted small">Explanations drawn here are written by Claude on request. They are not part of the reviewed course, so compare them with the lessons and a good dictionary when it matters.</p>
        </section>
        <section aria-labelledby="myq-h">
          <h2 id="myq-h">Your questions</h2>
          <div id="ask-history">${questionsHtml(esc)}</div>
        </section>
        <section aria-labelledby="asked-h">
          <h2 id="asked-h">Explanations Claude drew for you</h2>
          ${
            saved.length
              ? `<ul class="asked-list">${saved
                  .map((l) => `<li><a href="#lesson-${esc(l.id)}">${esc(l.title)}</a><span class="muted"> · ${esc(l.question)}</span></li>`)
                  .join("")}</ul>`
              : '<p class="muted">Nothing yet. Your drawn explanations are kept here, in this browser, so you can replay them.</p>'
          }
        </section>`;

      const form = app.querySelector("#ask-form");
      const q = app.querySelector("#ask-q");
      const go = app.querySelector("#ask-go");
      const stop = app.querySelector("#ask-stop");
      const status = app.querySelector("#ask-status");
      let ctl = null;

      app.querySelectorAll(".chip-btn").forEach((b) =>
        b.addEventListener("click", () => {
          q.value = b.dataset.q;
          q.focus();
        })
      );
      stop.addEventListener("click", () => ctl && ctl.abort());

      const found = app.querySelector("#ask-found");
      const handoff = app.querySelector("#ask-handoff");
      let offline = false;
      const showFound = () => {
        const list = q.value.trim().length > 2 ? lookup(q.value) : [];
        found.innerHTML = resultsHtml(list, esc);
        return list;
      };
      let timer = null;
      q.addEventListener("input", () => {
        clearTimeout(timer);
        timer = setTimeout(showFound, 250);
      });
      found.addEventListener("click", (e) => {
        const b = e.target.closest("[data-jump]");
        if (!b) return;
        const [lid, step] = b.dataset.jump.split("|");
        try { sessionStorage.setItem("prepositions-lab:jump", JSON.stringify({ lesson: lid, step })); } catch (err) {}
        location.hash = `lesson-${lid}`;
      });
      const history = app.querySelector("#ask-history");
      history.addEventListener("click", (e) => {
        const j = e.target.closest("[data-jump]");
        if (j) {
          const [lid, step] = j.dataset.jump.split("|");
          return P.jump ? P.jump(lid, step) : (location.hash = `lesson-${lid}`);
        }
        const again = e.target.closest("[data-again]");
        if (again) {
          q.value = readQuestions()[+again.dataset.again].q;
          showFound();
          q.focus();
          window.scrollTo(0, 0);
        }
        if (e.target.id === "ask-clear") {
          try { localStorage.removeItem(QUESTIONS_KEY); } catch (err) {}
          history.innerHTML = questionsHtml(esc);
        }
      });
      app.querySelector("#ask-claude").addEventListener("click", () => {
        try { navigator.clipboard.writeText(q.value.trim()).catch(() => {}); } catch (err) {}
      });

      getSample().then((s) => {
        if (!s) {
          offline = true;
          go.textContent = "Find it in the course";
          status.textContent = "This copy of the app finds answers in its own lessons, free. For anything else, Ask Claude opens the claude.ai version, covered by your subscription.";
        }
      });

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const question = q.value.trim();
        if (!question) return q.focus();
        const list = showFound();
        saveQuestion(question, list);
        history.innerHTML = questionsHtml(esc);
        const sample = await getSample();
        if (!sample) {
          handoff.hidden = false;
          status.textContent = list.length ? "Here is what the course already teaches about this. Tap one to see it on the board." : "This is not in the course yet.";
          return;
        }
        ctl = new AbortController();
        go.disabled = true;
        stop.hidden = false;
        status.textContent = "Thinking about how to draw this... it usually takes under a minute.";
        let chars = 0;
        try {
          const raw = await sample.json(buildPrompt(question, context), {
            signal: ctl.signal,
            onText: ({ text }) => {
              chars = text.length;
              status.textContent = `Planning the board... (${Math.round(chars / 100) / 10}k characters written)`;
            },
          });
          const lesson = clean(raw, question);
          register(lesson);
          writeSaved([lesson, ...readSaved().filter((l) => l.id !== lesson.id)]);
          location.hash = `lesson-${lesson.id}`;
        } catch (err) {
          if (err && err.code === "cancelled") status.textContent = "Stopped.";
          else status.textContent = (err && ERRORS[err.code]) || (err && err.message && !err.code ? err.message + " Try again." : "Something went wrong while drawing. Try again.");
        } finally {
          go.disabled = false;
          stop.hidden = true;
          ctl = null;
        }
      });
      if (prefill) showFound();
      else q.focus();
    },

    forget(id) {
      writeSaved(readSaved().filter((l) => l.id !== id));
      delete P.lessons[id];
    },
  };
})();
