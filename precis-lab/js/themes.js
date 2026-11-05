/* Vocabulary 3: words by theme (PLAB.themes). A theme is split into shades; each word shows its
   part of speech, feeling and formality, when it is the best choice, and an example in context.
   Search finds a word in any theme; the test blanks a word in its own example sentence. */
(function () {
  const P = (window.PLAB = window.PLAB || {});
  const $ = (sel, root = document) => root.querySelector(sel);
  const norm = (s) => String(s).toLowerCase().trim();
  const shuffle = (a) => a.map((x) => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map((p) => p[1]);
  const FEEL = { "+": "good feeling", "0": "neutral feeling", "-": "bad feeling" };
  const FEELK = { "+": "positive", "0": "neutral", "-": "negative" };
  const FORM = { i: "informal", n: "standard", f: "formal", l: "literary" };
  const POS = { adj: "adjective", n: "noun", v: "verb", adv: "adverb", phr: "phrase" };

  const CFG = {
    themes: { key: "themes", list: "themes", item: "theme", eyebrow: "Vocabulary 3", title: "Words by theme", best: "Best when:", bestLower: "is best when:", fileBase: "Themes", pdfSub: "words grouped by meaning, each with when it is the best choice",
      placeholder: "Find a word or a theme: elated, anger, honest…",
      lede: (n, k) => `${n.toLocaleString("en")} words in ${k} themes, grouped by meaning so you can learn them together: happiness, anger, shock, honesty, power… Each theme is split into shades, from mild to strong, and every word says when it is the best choice, with an example in context.` },
    contexts: { key: "contexts", list: "contexts", item: "context", eyebrow: "Vocabulary 4", title: "Words by context", best: "In this context:", bestLower: "means here:", fileBase: "Contexts", pdfSub: "the words of politics, law, the economy, the environment, thinking, solutions and more",
      placeholder: "Find a word or a context: sanction, climate, solution…",
      lede: (n, k) => `${n.toLocaleString("en")} words in ${k} contexts: the vocabulary of politics, diplomacy, law, the economy, the environment, education, health, technology, media, society, ethics, thinking, solutions and more. Each word says what it means in that context and shows it in a sentence, so you can use it in a precis or an essay.` },
  };
  function make(cfg) {
  let cache = null;
  function entries() {
    if (cache) return cache;
    cache = [];
    (P[cfg.key] || []).forEach((t) =>
      t.groups.forEach((g, gi) =>
        g.words.forEach((line) => {
          const [w, pos, code, best, ex] = line.split("|").map((x) => x.trim());
          cache.push({ w, pos, posLabel: pos.split(",").map((p) => POS[p.trim()] || p.trim()).join(", "), feel: code[0], form: code[1], best, ex, theme: t, group: g.name, gi });
        })
      )
    );
    return cache;
  }

  // Find the word (or its inflected form) inside its example sentence.
  const IRR = { say: "said", cry: "cried", give: "gave", be: "are", rise: "rose", grow: "grew", fall: "fell", shrink: "shrunk", get: "got", break: "broke", hold: "held", uphold: "upheld", undo: "undid", make: "made", bring: "brought", go: "went", run: "ran", take: "took", see: "saw", think: "thought", buy: "bought", sell: "sold", tell: "told", find: "found", build: "built", lead: "led", win: "won", lose: "lost", catch: "caught", seek: "sought", fight: "fought", teach: "taught", stand: "stood", forget: "forgot", choose: "chose", begin: "began", withstand: "withstood", withhold: "withheld", mislead: "misled", forbid: "forbade", foresee: "foresaw", overcome: "overcame", undergo: "underwent", strike: "struck", spread: "spread", set: "set", put: "put", cut: "cut", quit: "quit", shed: "shed", slay: "slew", swear: "swore", tear: "tore", wear: "wore", bear: "bore", lie: "lied", sink: "sank", drink: "drank", speak: "spoke", wake: "woke", freeze: "froze", steal: "stole", drive: "drove", ride: "rode", write: "wrote", eat: "ate", fly: "flew", draw: "drew", throw: "threw", know: "knew", blow: "blew", show: "showed", sweep: "swept", keep: "kept", sleep: "slept", feel: "felt", deal: "dealt", mean: "meant", leave: "left", send: "sent", spend: "spent", lend: "lent", bend: "bent", hide: "hid", bite: "bit", shake: "shook", stick: "stuck", swing: "swung", hang: "hung", dig: "dug", flee: "fled", bleed: "bled", feed: "fed", breed: "bred", hear: "heard", pay: "paid", lay: "laid" };
  function findIn(e) {
    const words = e.w.split(" ");
    const first = words[0].toLowerCase();
    const alt = IRR[first] ? [IRR[first], ...words.slice(1)].join(" ") : null;
    const stems = words.length > 1 ? [e.w, alt].filter(Boolean) : [e.w, alt, e.w.replace(/(e|y|ed|s)$/i, ""), e.w.slice(0, Math.max(4, e.w.length - 2))].filter(Boolean);
    if (words.length > 1) {
      // A phrase: the first word may be inflected or irregular, an object may sit between the parts.
      const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const head = first === "be" ? "(?:is|are|am|was|were|be|been)" : `(?:${esc(IRR[first] || "\u0000")}|${esc(first.replace(/(e|y)$/i, ""))}\\w*)`;
      const rest = words.slice(1).map((x) => (x === "one's" ? "\\w+" : esc(x))).map((x) => `(?:\\s+\\S+){0,2}?\\s+${x}\\w*`).join("");
      const m = e.ex.match(new RegExp(`\\b${head}${rest}`, "i"));
      if (m) return { at: m.index, text: m[0] };
    }
    for (const st of stems) {
      const re = words.length > 1 ? new RegExp(st.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") : new RegExp(`\\b${st.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\w*`, "i");
      const m = e.ex.match(re);
      if (m) return { at: m.index, text: m[0] };
    }
    return null;
  }

  const exHtml = (e, esc) => {
    const f = findIn(e);
    if (!f) return `<em>${esc(e.ex)}</em>`;
    return `<em>${esc(e.ex.slice(0, f.at))}<strong>${esc(f.text)}</strong>${esc(e.ex.slice(f.at + f.text.length))}</em>`;
  };

  const row = (e, esc) => `<li class="th-word tone-${FEELK[e.feel]}" data-s="${esc(norm(e.w + " " + e.best))}">
      <div class="th-top"><button type="button" class="th-w rootlink" data-root="${esc(e.w)}">${esc(e.w)}</button><span class="pos">${esc(e.posLabel)}</span>
        <span class="tag tone-${FEELK[e.feel]}">${esc(FEEL[e.feel])}</span><span class="tag">${esc(FORM[e.form])}</span></div>
      <div class="th-best"><b>${cfg.best}</b> ${esc(e.best)}</div>
      <div class="th-ex">${exHtml(e, esc)}</div>
    </li>`;

  function renderList(app, { esc, icon }) {
    const ts = P[cfg.key] || [];
    const n = new Set(entries().map((e) => norm(e.w))).size;
    const cats = [...new Set(ts.map((t) => t.cat))];
    app.innerHTML = `
      <section class="page-head">
        <p class="eyebrow">${cfg.eyebrow}</p>
        <h1>${cfg.title}</h1>
        <p class="lede">${cfg.lede(n, ts.length)}</p>
        <p class="row-buttons">
          <button type="button" class="button primary" id="th-test-all">${icon("play")} Test: best word for the context</button>
          <button type="button" class="button" data-pdf="${cfg.key}:all">${icon("pdf")} PDF of every theme</button>
        </p>
      </section>
      <div id="th-quiz"></div>
      <label class="search">
        <span class="sr-only">Find a word in any theme</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5 5"/></svg>
        <input id="th-search" type="search" placeholder="${cfg.placeholder}" autocomplete="off">
      </label>
      <div id="th-found"></div>
      ${cats
        .map(
          (c) => `<section class="th-cat"><h2>${esc(c)}</h2><div class="th-grid">${ts
            .filter((t) => t.cat === c)
            .map((t) => `<a class="th-card" href="#${cfg.item}-${esc(t.id)}"><b>${esc(t.title)}</b><span>${t.groups.reduce((a, g) => a + g.words.length, 0)} words · ${t.groups.length} shades</span></a>`)
            .join("")}</div></section>`
        )
        .join("")}`;
    const found = $("#th-found");
    $("#th-search").addEventListener("input", (ev) => {
      const q = norm(ev.target.value);
      if (q.length < 2) return (found.innerHTML = "");
      const themes = ts.filter((t) => norm(t.title).includes(q));
      const hits = entries().filter((e) => norm(e.w).startsWith(q)).slice(0, 30);
      found.innerHTML =
        (themes.length ? `<p class="chips">${themes.map((t) => `<a class="wchip" href="#${cfg.item}-${esc(t.id)}">${esc(t.title)}</a>`).join("")}</p>` : "") +
        (hits.length
          ? `<ul class="th-list">${hits.map((e) => row(e, esc).replace('<div class="th-best">', `<div class="th-in">in <a href="#${cfg.item}-${esc(e.theme.id)}">${esc(e.theme.title)}</a> · ${esc(e.group)}</div><div class="th-best">`)).join("")}</ul>`
          : themes.length ? "" : `<p class="muted">No word or theme starts with "${esc(q)}" yet.</p>`);
    });
    $("#th-test-all").addEventListener("click", () => quiz($("#th-quiz"), entries(), esc));
  }

  function renderTheme(app, id, { esc, icon }) {
    const t = (P[cfg.key] || []).find((x) => x.id === id);
    if (!t) return renderList(app, { esc, icon });
    const es = entries().filter((e) => e.theme === t);
    const i = P[cfg.key].indexOf(t);
    const prev = P[cfg.key][i - 1], next = P[cfg.key][i + 1];
    app.innerHTML = `
      <p class="crumbs"><a href="#${cfg.list}">${cfg.title}</a> · ${esc(t.cat)}</p>
      <section class="page-head">
        <h1>${esc(t.title)}</h1>
        <p class="lede">${esc(t.intro)}</p>
        <p class="row-buttons">
          <button type="button" class="button primary" id="th-test">${icon("play")} Test this theme</button>
          <button type="button" class="button" data-pdf="${cfg.key}:${esc(t.id)}">${icon("pdf")} PDF of this theme</button>
        </p>
      </section>
      <div id="th-quiz"></div>
      <nav class="th-shades" aria-label="Shades">${t.groups.map((g, gi) => `<a href="#" data-go="${gi}">${esc(g.name)}</a>`).join("")}</nav>
      ${t.groups
        .map((g, gi) => `<section class="th-group" id="shade-${gi}"><h2>${esc(g.name)}</h2><ul class="th-list">${es.filter((e) => e.gi === gi).map((e) => row(e, esc)).join("")}</ul></section>`)
        .join("")}
      <p class="row-buttons th-pager">${prev ? `<a class="button" href="#${cfg.item}-${esc(prev.id)}">← ${esc(prev.title)}</a>` : ""}${next ? `<a class="button" href="#${cfg.item}-${esc(next.id)}">${esc(next.title)} →</a>` : ""}</p>`;
    app.querySelectorAll("[data-go]").forEach((a) =>
      a.addEventListener("click", (ev) => {
        ev.preventDefault();
        $(`#shade-${a.dataset.go}`).scrollIntoView({ behavior: "smooth", block: "start" });
      })
    );
    $("#th-test").addEventListener("click", () => quiz($("#th-quiz"), es, esc));
  }

  // Blank the word in its own example; the wrong options are the same word class, from other themes.
  function quiz(box, pool, esc) {
    const all = entries();
    const items = shuffle(pool.filter((e) => findIn(e))).slice(0, 10);
    let i = 0, right = 0;
    const show = () => {
      if (i >= items.length) {
        box.innerHTML = `<section class="quiz-card"><h2>${right} of ${items.length} right</h2><p class="muted">Read the "best when" line of any word you missed.</p><p class="row-buttons"><button type="button" class="button primary" data-again>Test again</button><button type="button" class="button ghost" data-close>Close</button></p></section>`;
        box.querySelector("[data-again]").onclick = () => quiz(box, pool, esc);
        box.querySelector("[data-close]").onclick = () => (box.innerHTML = "");
        return;
      }
      const e = items[i], f = findIn(e);
      const gap = esc(e.ex.slice(0, f.at)) + '<span class="blank">    </span>' + esc(e.ex.slice(f.at + f.text.length));
      const same = all.filter((x) => x.theme !== e.theme && x.pos === e.pos && x.w.split(" ").length === e.w.split(" ").length && norm(x.w) !== norm(e.w));
      const wrong = shuffle(same.filter((x) => x.theme.cat === e.theme.cat)).slice(0, 3);
      while (wrong.length < 3 && same.length) wrong.push(shuffle(same)[0]);
      const opts = shuffle([e, ...wrong]);
      box.innerHTML = `<section class="quiz-card" aria-live="polite">
          <p class="eyebrow">Question ${i + 1} of ${items.length} · ${esc(e.theme.title)}</p>
          <h2>Choose the best word for this context</h2>
          <p class="th-gap">${gap}</p>
          <div class="quiz-opts">${opts.map((o) => `<button type="button" class="option" data-w="${esc(o.w)}">${esc(o.w)}</button>`).join("")}</div>
          <p class="quiz-why" hidden></p>
        </section>`;
      box.querySelectorAll(".option").forEach((b) =>
        b.addEventListener("click", () => {
          const ok = b.dataset.w === e.w;
          if (ok) right++;
          box.querySelectorAll(".option").forEach((x) => {
            x.disabled = true;
            if (x.dataset.w === e.w) x.classList.add("is-right");
          });
          if (!ok) b.classList.add("is-wrong");
          const picked = opts.find((o) => o.w === b.dataset.w);
          const why = box.querySelector(".quiz-why");
          why.hidden = false;
          why.innerHTML = `${ok ? "<strong>Right.</strong>" : `<strong>Not quite.</strong> <em>${esc(picked.w)}</em> = ${esc(picked.best)}.`} <strong>${esc(e.w)}</strong> ${cfg.bestLower} ${esc(e.best)}. <button type="button" class="button small" data-next>Next</button>`;
          why.querySelector("[data-next]").onclick = () => {
            i++;
            show();
          };
        })
      );
    };
    show();
    box.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Notes PDF: one theme, or all of them.
  const safe = (s) => String(s).replace(/→/g, "->").replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, "-").replace(/·/g, "-");
  function addPlans() {
    const plans = P.notesPdf && P.notesPdf.plans;
    if (!plans || plans[cfg.key]) return;
    plans[cfg.key] = (which) => {
      const list = which === "all" ? P[cfg.key] : P[cfg.key].filter((t) => t.id === which);
      if (!list.length) return null;
      return {
        title: which === "all" ? cfg.title : `${cfg.title}: ${list[0].title}`,
        subtitle: `${cfg.eyebrow} from the Precis Lab: ${cfg.pdfSub}`,
        file: `Precis-Lab-${cfg.fileBase}-${which}.pdf`,
        items: [], textOnly: true, noImages: true,
        intro(n) {
          n.text("Each word: part of speech, feeling, formality, what it means or when it is best, and an example in context.", { size: 9.5, gap: 3 });
          list.forEach((t) => {
            n.text(t.title, { size: 17, bold: true, gap: 0.6 });
            n.text(safe(t.intro), { size: 9.5, italic: true, gap: 1.6 });
            t.groups.forEach((g) => {
              n.text(g.name, { size: 12, bold: true, gap: 0.8 });
              entries().filter((e) => e.theme === t && e.group === g.name).forEach((e) => {
                n.rich(safe(`**${e.w}** (${e.posLabel}; ${FEEL[e.feel]}, ${FORM[e.form]}): ${e.best}.`), { gap: 0.2, indent: 3 });
                n.text(safe(e.ex), { size: 9.5, italic: true, gap: 1, indent: 6 });
              });
            });
            n.rule();
          });
        },
      };
    };
  }

    setTimeout(addPlans, 0);
    return { renderList, renderTheme, entries, addPlans, find: findIn };
  }
  P.themesPage = make(CFG.themes);
  P.contextsPage = make(CFG.contexts);
  P.vocabKinds = CFG;
})();
