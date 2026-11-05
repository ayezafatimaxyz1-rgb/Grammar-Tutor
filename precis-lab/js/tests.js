/* The Tests section (#tests).
   1. Write synonyms: type as many synonyms of a word, in one meaning, as you can.
   2. Recall a shade: type as many words as you can of one theme shade or context group.
   3. Best word: four synonyms, pick the one that fits the sentence's tone and setting.
   Answers are checked against the app's own lists, which are not complete: a word we do not list
   may still be right, so the feedback says so instead of marking it wrong. */
(function () {
  const P = (window.PLAB = window.PLAB || {});
  const $ = (sel, root = document) => root.querySelector(sel);
  const norm = (s) => String(s).toLowerCase().trim();
  const clean = (s) => norm(s).replace(/[^a-z' -]/g, "").replace(/\s+/g, " ").trim();
  const shuffle = (a) => a.map((x) => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map((p) => p[1]);
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const FEEL = { positive: "good feeling", neutral: "neutral feeling", negative: "bad feeling" };
  const FORM = { informal: "informal", neutral: "standard", formal: "formal", literary: "literary" };
  const FEELC = { "+": "positive", "0": "neutral", "-": "negative" };
  const FORMC = { i: "informal", n: "neutral", f: "formal", l: "literary" };
  const tags = (x) => `<span class="tag tone-${x.tone}">${FEEL[x.tone] || x.tone}</span><span class="tag">${FORM[x.formality] || x.formality}</span>`;
  let timer = 0;

  /* ---------- shared index of theme shades and context groups ---------- */

  let idx = null;
  function shades() {
    if (idx) return idx;
    idx = { groups: [], byWord: new Map() };
    [["theme", P.themesPage], ["context", P.contextsPage]].forEach(([kind, page]) => {
      if (!page) return;
      const byKey = new Map();
      page.entries().forEach((e) => {
        const k = kind + "|" + e.theme.id + "|" + e.gi;
        if (!byKey.has(k)) byKey.set(k, { kind, theme: e.theme, name: e.group, gi: e.gi, words: [] });
        byKey.get(k).words.push(e);
      });
      byKey.forEach((g) => {
        idx.groups.push(g);
        g.words.forEach((e) => {
          const key = clean(e.w);
          if (!idx.byWord.has(key)) idx.byWord.set(key, []);
          idx.byWord.get(key).push(g);
        });
      });
    });
    return idx;
  }
  const where = (g) => `${g.theme.title} · ${g.name}`;
  const toEntryTag = (e) => ({ tone: FEELC[e.feel], formality: FORMC[e.form] });

  /* ---------- the write-as-many test ---------- */

  function wordTask(esc) {
    const pool = (P.words || []).filter((h) => h.senses.some((s) => s.syn.length >= 4));
    const h = pick(pool);
    const sis = h.senses.map((s, i) => (s.syn.length >= 4 ? i : -1)).filter((i) => i >= 0);
    const si = pick(sis), s = h.senses[si];
    const exact = new Map(s.syn.map((x) => [clean(x.w), x]));
    const opp = new Map(s.ant.map((x) => [clean(x.w), x]));
    const other = new Map();
    h.senses.forEach((t, k) => k !== si && t.syn.forEach((x) => other.set(clean(x.w), { x, k })));
    const near = new Map();
    [h.word, ...s.syn.map((x) => x.w)].forEach((w) => (shades().byWord.get(clean(w)) || []).forEach((g) => g.words.forEach((e) => near.set(clean(e.w), { e, g }))));
    return {
      eyebrow: "Write synonyms",
      head: `<h2>Write as many synonyms as you can for <span class="caps">${esc(h.word.toUpperCase())}</span></h2>
        <p><b>Meaning:</b> ${esc(s.sense)}</p><p class="muted"><em>${esc(s.ex)}</em></p>`,
      total: s.syn.length,
      grade(t) {
        const c = clean(t);
        if (c === clean(h.word)) return { k: "none", html: `<b>${esc(t)}</b>: that is the word itself.` };
        if (exact.has(c)) { const x = exact.get(c); return { k: "ok", key: c, html: `<b>${esc(x.w)}</b> ${tags(x)}${x.note ? ` <span class="muted">${esc(x.note)}</span>` : ""}` }; }
        if (near.has(c) && !opp.has(c)) { const { e, g } = near.get(c); return { k: "near", key: c, html: `<b>${esc(e.w)}</b> is close: it shares the shade "${esc(g.name)}" in <a href="#${g.kind}-${esc(g.theme.id)}">${esc(g.theme.title)}</a> (${esc(e.best)}).` }; }
        if (opp.has(c)) return { k: "no", html: `<b>${esc(opp.get(c).w)}</b> is an <i>antonym</i> for this meaning.` };
        if (other.has(c)) { const { x, k } = other.get(c); return { k: "no", html: `<b>${esc(x.w)}</b> is a synonym of ${esc(h.word)} in another meaning (${k + 1}: ${esc(h.senses[k].sense)}).` }; }
        return { k: "none", html: `<b>${esc(t)}</b> is not in our list. It may still be right: check a dictionary.` };
      },
      missed: s.syn.map((x) => ({ key: clean(x.w), html: `<b>${esc(x.w)}</b> ${tags(x)}${x.note ? ` <span class="muted">${esc(x.note)}</span>` : ""}` })),
      link: `#word-${encodeURIComponent(h.word)}`,
      linkText: `See every meaning of ${h.word}`,
    };
  }

  function shadeTask(esc) {
    const sh = shades();
    const g = pick(sh.groups.filter((x) => x.words.length >= 5));
    const exact = new Map(g.words.map((e) => [clean(e.w), e]));
    const same = new Map();
    sh.groups.filter((x) => x.kind === g.kind && x.theme === g.theme && x !== g).forEach((x) => x.words.forEach((e) => same.set(clean(e.w), { e, x })));
    return {
      eyebrow: "Recall a shade",
      head: `<h2>Write as many words as you can for this shade</h2>
        <p><b>${esc(g.theme.title)}</b> · ${esc(g.name)}</p><p class="muted">${esc(g.theme.intro)}</p>`,
      total: g.words.length,
      grade(t) {
        const c = clean(t);
        if (exact.has(c)) { const e = exact.get(c); return { k: "ok", key: c, html: `<b>${esc(e.w)}</b> ${tags(toEntryTag(e))} <span class="muted">${esc(e.best)}</span>` }; }
        if (same.has(c)) { const { e, x } = same.get(c); return { k: "no", html: `<b>${esc(e.w)}</b> is in this theme, but in another shade: "${esc(x.name)}" (${esc(e.best)}).` }; }
        const elsewhere = sh.byWord.get(c);
        if (elsewhere) return { k: "no", html: `<b>${esc(t)}</b> belongs to ${esc(where(elsewhere[0]))}.` };
        return { k: "none", html: `<b>${esc(t)}</b> is not in our list for this shade. It may still be right: check a dictionary.` };
      },
      missed: g.words.map((e) => ({ key: clean(e.w), html: `<b>${esc(e.w)}</b> ${tags(toEntryTag(e))} <span class="muted">${esc(e.best)}</span>` })),
      link: `#${g.kind}-${g.theme.id}`,
      linkText: `Open ${g.theme.title}`,
    };
  }

  function runWrite(box, make, esc, icon) {
    clearInterval(timer);
    const task = make(esc);
    const terms = [];
    box.innerHTML = `<section class="quiz-card wt">
        <p class="eyebrow">${esc(task.eyebrow)}</p>
        ${task.head}
        <div class="wt-chips" aria-live="polite"></div>
        <div class="wt-row"><input id="wt-in" type="text" autocomplete="off" autocapitalize="none" placeholder="Type a word, then press Enter"><button type="button" class="button" id="wt-add">Add</button></div>
        <p class="row-buttons"><button type="button" class="button primary" id="wt-check">Check my answers</button><button type="button" class="button" id="wt-new">Another one</button></p>
        <p class="wt-clock"><label><input type="checkbox" id="wt-race"> Race the clock (90 seconds)</label> <b id="wt-time"></b></p>
        <div id="wt-result"></div>
      </section>`;
    const chips = $(".wt-chips", box), input = $("#wt-in", box);
    const paint = () => (chips.innerHTML = terms.map((t, i) => `<button type="button" class="wt-chip" data-i="${i}" title="Remove">${esc(t)} ×</button>`).join(""));
    const add = () => {
      input.value.split(/[,\n;]/).map((x) => x.trim()).filter(Boolean).forEach((x) => !terms.some((t) => clean(t) === clean(x)) && terms.push(x));
      input.value = "";
      paint();
      input.focus();
    };
    chips.addEventListener("click", (e) => {
      const b = e.target.closest(".wt-chip");
      if (b && !input.disabled) (terms.splice(+b.dataset.i, 1), paint());
    });
    input.addEventListener("keydown", (e) => e.key === "Enter" && (e.preventDefault(), add()));
    $("#wt-add", box).onclick = add;
    $("#wt-new", box).onclick = () => runWrite(box, make, esc, icon);
    const check = () => {
      clearInterval(timer);
      add();
      input.disabled = true;
      $("#wt-check", box).disabled = true;
      const found = new Set();
      let good = 0, close = 0;
      const rows = terms.map((t) => {
        const r = task.grade(t);
        if ((r.k === "ok" || r.k === "near") && r.key && !found.has(r.key)) (found.add(r.key), r.k === "ok" ? good++ : close++);
        return `<li class="wt-${r.k}"><span class="wt-mark">${r.k === "ok" ? "✓" : r.k === "near" ? "≈" : r.k === "no" ? "✗" : "?"}</span> ${r.html}</li>`;
      });
      const miss = task.missed.filter((m) => !found.has(m.key));
      $("#wt-result", box).innerHTML = `<h3>${good + close} of ${task.total}${close ? ` (${good} exact, ${close} close)` : ""}</h3>
        <ul class="wt-list">${rows.join("") || "<li>You did not type any words.</li>"}</ul>
        ${miss.length ? `<h4>Words you did not write</h4><ul class="wt-list">${miss.map((m) => `<li class="wt-miss"><span class="wt-mark">·</span> ${m.html}</li>`).join("")}</ul>` : "<p><b>You found them all.</b></p>"}
        <p class="muted small">Our lists are not complete. A "?" means we do not have the word, not that it is wrong.</p>
        <p class="row-buttons"><a class="button" href="${task.link}">${esc(task.linkText)}</a><button type="button" class="button primary" id="wt-again">Another one</button></p>`;
      $("#wt-again", box).onclick = () => runWrite(box, make, esc, icon);
    };
    $("#wt-check", box).onclick = check;
    $("#wt-race", box).addEventListener("change", (e) => {
      clearInterval(timer);
      const out = $("#wt-time", box);
      if (!e.target.checked) return (out.textContent = "");
      let left = 90;
      out.textContent = `${left}s`;
      input.focus();
      timer = setInterval(() => {
        if (!document.body.contains(box) || input.disabled) return clearInterval(timer);
        out.textContent = `${--left}s`;
        if (left <= 0) check();
      }, 1000);
    });
    box.scrollIntoView({ behavior: "smooth", block: "start" });
    input.focus();
  }

  /* ---------- the substitute test ---------- */

  const posOf = (h) => ((P.dict && P.dict[h.word] && P.dict[h.word].pos) || "").split(",")[0].trim();
  const re = (w) => new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
  const single = (list) => list.filter((x) => !x.w.includes(" "));

  function subPool() {
    const out = [];
    (P.words || []).forEach((h) => {
      if (h.word.includes(" ")) return;
      h.senses.forEach((s, si) => {
        if (re(h.word).test(s.ex) && single(s.syn).length >= 3) out.push({ h, s, si });
      });
    });
    return out;
  }

  const modeOf = (a) => {
    const m = {};
    a.forEach((x) => (m[x] = (m[x] || 0) + 1));
    return Object.entries(m).sort((x, y) => y[1] - x[1])[0][0];
  };
  // What tone and formality the sentence's own word has.
  function keyProfile(h, s) {
    const labels = (P.dict && P.dict[h.word] && P.dict[h.word].labels) || [];
    const syn = single(s.syn);
    const tone = labels.includes("approving") ? "positive" : labels.includes("disapproving") ? "negative" : modeOf(syn.map((x) => x.tone));
    const form = labels.includes("informal") ? "informal" : labels.includes("literary") ? "literary" : labels.includes("formal") || h.level === "A" ? "formal" : modeOf(syn.map((x) => x.formality));
    return { tone, form };
  }

  const fixArticle = (before, w) => before.replace(/\b(a|an)(\s+)$/i, (m, a, sp) => (/^[aeiou]/i.test(w) ? (a[0] === "A" ? "An" : "an") : a[0] === "A" ? "A" : "a") + sp);
  const withWord = (ex, head, w) => {
    const m = ex.match(re(head));
    const lead = m[0][0] === m[0][0].toUpperCase() && m.index === 0 ? w[0].toUpperCase() + w.slice(1) : w;
    return fixArticle(ex.slice(0, m.index), lead) + lead + ex.slice(m.index + m[0].length);
  };

  // Four words that all mean roughly the same; one is the word the sentence really uses.
  function subQuestion(q) {
    const { h, s } = q;
    const key = keyProfile(h, s);
    const clash = (x) => (x.tone !== key.tone ? 2 : 0) + (x.formality !== key.form ? 1 : 0);
    const others = shuffle(single(s.syn).filter((x) => clean(x.w) !== clean(h.word)));
    others.sort((x, y) => clash(y) - clash(x));
    const chosen = others.slice(0, 3);
    const opts = [{ w: h.word, tone: key.tone, formality: key.form, note: "", right: true }, ...chosen.map((x) => ({ ...x, right: false }))];
    return { opts: shuffle(opts), key };
  }

  function whyNot(o, key, head) {
    if (o.tone !== key.tone) return `it carries a ${o.tone} feeling, but this sentence is ${key.tone}`;
    if (o.formality !== key.form) return `it is ${FORM[o.formality] || o.formality}, but the sentence calls for ${FORM[key.form] || key.form} wording`;
    if (o.note) return o.note;
    return `it has the same meaning, but ${head} is the more exact and more usual choice for this setting`;
  }

  function runSub(box, esc, icon, state) {
    const all = subPool();
    state = state || { items: shuffle(all).slice(0, 8), i: 0, score: 0, max: 0 };
    if (state.i >= state.items.length) {
      box.innerHTML = `<section class="quiz-card"><p class="eyebrow">Best word</p><h2>${state.score} of ${state.items.length}</h2>
        <p class="muted">One point each time you chose the word that best matches the tone and setting.</p>
        <p class="row-buttons"><button type="button" class="button primary" id="sb-again">Another round</button><a class="button" href="#tests">Back to tests</a></p></section>`;
      $("#sb-again", box).onclick = () => runSub(box, esc, icon);
      return;
    }
    const q = state.items[state.i];
    const { opts, key } = subQuestion(q);
    const m = q.s.ex.match(re(q.h.word));
    const sentence = `${esc(q.s.ex.slice(0, m.index))}<mark class="th-blank">______</mark>${esc(q.s.ex.slice(m.index + m[0].length))}`;
    box.innerHTML = `<section class="quiz-card" aria-live="polite">
        <p class="eyebrow">Best word · question ${state.i + 1} of ${state.items.length}</p>
        <h2>Which word best fits this sentence?</h2>
        <p class="th-gap">${sentence}</p>
        <p class="muted small">All four words mean about: <b>${esc(q.s.sense)}</b>. Only one suits the tone, formality and setting.</p>
        <div class="sb-opts">${opts.map((o, i) => `<button type="button" class="sb-opt" data-i="${i}">${esc(o.w)}</button>`).join("")}</div>
        <div id="sb-result"></div></section>`;
    box.querySelectorAll(".sb-opt").forEach((b) =>
      b.addEventListener("click", () => {
        if (b.disabled) return;
        const picked = opts[+b.dataset.i];
        if (picked.right) state.score++;
        const lines = opts.map((o) => {
          const sent = withWord(q.s.ex, q.h.word, o.w);
          if (o.right) return `<li class="wt-ok"><span class="wt-mark">✓</span> <b>${esc(o.w)}</b>: <em>${esc(sent)}</em> ${tags(o)} <span class="muted">This is the word that fits the tone and setting.</span></li>`;
          return `<li class="${o === picked ? "wt-no" : "wt-miss"}"><span class="wt-mark">${o === picked ? "✗" : "·"}</span> <b>${esc(o.w)}</b>: ${tags(o)} It means nearly the same, but ${esc(whyNot(o, key, q.h.word))}.</li>`;
        });
        box.querySelectorAll(".sb-opt").forEach((x, i) => {
          x.disabled = true;
          x.classList.add(opts[i].right ? "is-right" : "is-no");
        });
        $("#sb-result", box).innerHTML = `<h3>${picked.right ? "Right" : "Not quite"}</h3><ul class="wt-list">${lines.join("")}</ul>
          <p class="muted small">In a precis, near-synonyms are not equal. Match the tone and formality of the passage.</p>
          <p class="row-buttons"><button type="button" class="button primary" id="sb-next">${state.i + 1 >= state.items.length ? "See my score" : "Next"}</button></p>`;
        $("#sb-next", box).onclick = () => ((state.i += 1), runSub(box, esc, icon, state));
      })
    );
    box.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ---------- pages ---------- */

  function render(app, hash, { esc, icon }) {
    clearInterval(timer);
    if (hash === "test-write" || hash === "test-shade" || hash === "test-sub") {
      const title = { "test-write": "Write synonyms", "test-shade": "Recall a shade", "test-sub": "Best word for the sentence" }[hash];
      const lede = {
        "test-write": "You see a word and one meaning. Type every synonym you can think of for that meaning. Answers are checked against the Words list, and close words from the same shade count as close.",
        "test-shade": "You see one shade of a theme or context, such as \"Strong: very happy\". Type every word you can that belongs there. This builds recall, not just recognition.",
        "test-sub": "You see a sentence with a gap and four words that all mean nearly the same. Pick the one that best fits the tone, formality and setting. Eight questions a round.",
      }[hash];
      app.innerHTML = `<p class="crumbs"><a href="#tests">Tests</a></p><section class="page-head"><h1>${esc(title)}</h1><p class="lede">${esc(lede)}</p></section><div id="t-box"></div>`;
      const box = $("#t-box");
      if (hash === "test-write") runWrite(box, wordTask, esc, icon);
      else if (hash === "test-shade") runWrite(box, shadeTask, esc, icon);
      else runSub(box, esc, icon);
      return;
    }
    const nShades = shades().groups.length;
    app.innerHTML = `
      <section class="page-head">
        <p class="eyebrow">Tests</p>
        <h1>Test yourself</h1>
        <p class="lede">Recognise, recall and use. Each test checks you against the app's own word lists and tells you why an answer fits or does not.</p>
      </section>
      <div class="test-grid">
        <a class="test-card" href="#test-write"><b>Write synonyms</b><span>See a word and one meaning. Type as many synonyms as you can. Race the clock if you like.</span></a>
        <a class="test-card" href="#test-shade"><b>Recall a shade</b><span>See "Strong: very happy" or "Court actions". Type every word you know for it. ${nShades} shades to try.</span></a>
        <a class="test-card" href="#test-sub"><b>Best word for the sentence</b><span>Four synonyms, one gap. Choose the word that fits the tone and setting. Each wrong choice is explained.</span></a>
        <a class="test-card" href="#words"><b>Most similar or opposite</b><span>The CSS wording: choose the word most similar or most opposite in meaning. Open Words, then pick a level.</span></a>
        <a class="test-card" href="#themes"><b>Best word for the context</b><span>A sentence with a gap and four near words. Pick the exact one. Open any theme, or test them all.</span></a>
        <a class="test-card" href="#contexts"><b>Context words</b><span>The same gap test for politics, law, economy, environment and more.</span></a>
        <a class="test-card" href="#oneword"><b>One word for many</b><span>A long phrase and four single words. Pick the one that replaces it.</span></a>
        <a class="test-card" href="#notebook"><b>Mistake notebook</b><span>The preposition-style lesson checks you got wrong, to review.</span></a>
      </div>`;
  }

  P.tests = { render };
})();
