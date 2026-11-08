/* Conjunctions Lab data pages: the atlas, pairs, linkers, punctuation, mistakes catalogue and practice. */
(function () {
  const P = window.PLAB;
  const C = (P.conj = P.conj || {});
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (s) => String(s).toLowerCase().trim();
  const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const split = (t, n) => t.trim().split("\n").map((l) => l.split("|").map((x) => x.trim())).filter((p) => p.length >= n);

  const atlas = split(C.atlasText, 6).map(([w, type, group, logic, pic, ex, careful]) => ({ w, type, group, logic, pic, ex: ex.split(";;").map((x) => x.trim()), careful: careful || "" }));
  const punct = split(C.punctText, 5).map(([when, rule, ok, bad, why]) => ({ when, rule, ok, bad, why }));
  const mistakes = split(C.mistakeText, 4).map(([bad, good, why, tag]) => ({ bad, good, why, tag }));
  const gaps = split(C.gapText, 6).map(([s, c, a, b, d, why]) => ({ s, c, o: [c, a, b, d], why }));
  const joins = split(C.joinText, 6).map(([s, c, a, b, d, why]) => ({ s, c, o: [c, a, b, d], why }));
  Object.assign(C, { atlas, punct, mistakes, gaps, joins });

  const GN = C.groupNames, TN = C.typeNames;
  const TAGS = { double: "Two conjunctions where one is enough", negative: "Double negatives", order: "Word order after not only, hardly", pair: "Pairs that must match", tense: "Tenses after conjunctions", noun: "That, whether and if", prep: "Conjunction or preposition", agree: "Agreement with both, either, neither", compare: "Comparisons", manner: "As and like", purpose: "So that", result: "So and such", splice: "Comma splice and linking adverbs", meaning: "Wrong meaning" };
  const hl = (sentence, word) => {
    const w = word.replace(/ \.\.\. /g, "|").split("|").map((x) => x.trim()).filter(Boolean);
    let out = esc(sentence);
    w.forEach((x) => { out = out.replace(new RegExp(`\\b(${x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\b`, "i"), "<mark>$1</mark>"); });
    return out;
  };
  const lessonOf = (e) => { const es = atlas.filter((x) => x.group === e.group), i = es.indexOf(e); return `at-${e.group}` + (es.length > 6 ? `-${Math.floor(i / 6) + 1}` : ""); };
  const WORDS = { and: "rice and lentils", but: "small but strong", or: "tea or coffee", nor: "not rice, nor wheat", yet: "rich yet simple", "both ... and": "both brave and kind", "either ... or": "either today or tomorrow", "neither ... nor": "neither rich nor poor", "not only ... but also": "not only clever but also kind", "not ... but": "not lazy but tired", "whether ... or": "whether rich or poor", "rather ... than": "tea rather than coffee", "as ... as": "as tall as", than: "taller than me" };
  const SHORTF = { although: "although tired", though: "though tired", while: "while walking", when: "when ready", if: "if possible", unless: "unless told", once: "once finished", "even though": "even though tired" };
  const joinsOf = (e) => (e.type === "adv" ? ["sentence", "Joins whole sentences only. It cannot join single words."] : WORDS[e.w] ? ["words", "Can join single words too: " + WORDS[e.w] + "."] : ["clause", "Needs a clause (subject + verb), not a single word." + (SHORTF[e.w] ? " Short form: " + SHORTF[e.w] + "." : "")]);
  const card = (e) => `<article class="cj-card g-${e.group}" id="c-${esc(norm(e.w).replace(/[^a-z]+/g, "-"))}-${e.group}">
      <header><h3>${esc(e.w)}</h3><span class="cj-tag t-${e.type}">${esc({ coord: "coordinating", sub: "subordinating", corr: "pair", adv: "linking adverb" }[e.type])}</span><span class="cj-tag">${esc(GN[e.group])}</span></header>
      <p class="cj-logic">${esc(e.logic)}</p>
      <p class="cj-joins j-${joinsOf(e)[0]}">${joinsOf(e)[0] === "words" ? "✓" : "✗"} ${esc(joinsOf(e)[1])}</p>
      <ul class="cj-ex">${e.ex.map((x) => `<li>${hl(x, e.w)}</li>`).join("")}</ul>
      ${e.careful ? `<p class="cj-care"><b>Be careful.</b> ${esc(e.careful)}</p>` : ""}
      <p class="cj-board"><a class="button small" href="#lesson-${lessonOf(e)}">See it drawn: why this, why not the others</a></p></article>`;

  /* ---------- the atlas ---------- */
  function renderAtlas(app, hash, { icon }) {
    const which = hash.startsWith("atlas-") ? hash.slice(6) : "";
    const groups = Object.keys(GN).filter((g) => atlas.some((e) => e.group === g));
    app.innerHTML = `<section class="page-head"><p class="eyebrow">Start here</p><h1>The conjunction atlas</h1>
      <p class="lede">${atlas.length} conjunctions and linkers, grouped by what they do. Each one says its logic, shows examples and names the usual trap. Tap a group.</p>
      <p><a class="button small" href="#lesson-sn-as">Senses: as, since, while, if, so</a> <a class="button small" href="#lesson-cp-1">Confusing pairs</a> <button type="button" class="pdf-mini" data-pdf="phase:ph-sense">${icon("pdf")}<span>PDF: senses and confusing pairs</span></button> <a class="button small" href="#pairs">Pairs</a> <a class="button small" href="#punctuation">Punctuation</a> <a class="button small" href="#mistakes">Common mistakes</a> <a class="button small" href="#linkers">Essay linkers</a> <button type="button" class="pdf-mini" data-pdf="phase:ph-atlas">${icon("pdf")}<span>PDF of the whole atlas: pictures, boards and why-not</span></button> ${which ? `<button type="button" class="pdf-mini" data-pdf="unit:u-at-${which}">${icon("pdf")}<span>PDF of this group</span></button>` : ""} <button type="button" class="pdf-mini" data-pdf="conjatlas:all">${icon("pdf")}<span>Text only</span></button></p>
      <label class="search"><span class="sr-only">Search</span><input id="cj-q" type="search" placeholder="Search: although, however, so that…" autocomplete="off"></label></section>
      <div class="cj-chips"><a class="cj-chip${which ? "" : " on"}" href="#atlas">All</a>${groups.map((g) => `<a class="cj-chip${which === g ? " on" : ""}" href="#atlas-${g}">${esc(GN[g])} (${atlas.filter((e) => e.group === g).length})</a>`).join("")}</div>
      <div id="cj-list"></div>`;
    const list = app.querySelector("#cj-list");
    const draw = (q) => {
      const es = atlas.filter((e) => (!which || e.group === which) && (!q || norm(e.w + " " + e.logic + " " + e.ex.join(" ")).includes(q)));
      const byG = (which ? [which] : groups).map((g) => [g, es.filter((e) => e.group === g)]).filter(([, a]) => a.length);
      list.innerHTML = byG.map(([g, a]) => `<h2 class="cj-h">${esc(GN[g])}</h2>${a.map(card).join("")}`).join("") || '<p class="muted">Nothing matches.</p>';
    };
    app.querySelector("#cj-q").addEventListener("input", (e) => draw(norm(e.target.value)));
    draw("");
  }

  function renderPairs(app, { icon }) {
    const pairs = atlas.filter((e) => e.type === "corr");
    app.innerHTML = `<p class="crumbs"><a href="#atlas">Atlas</a></p><section class="page-head"><h1>Pairs that work together</h1>
      <p class="lede">Some conjunctions come in two parts. If you use the first part, the second must follow. Keep both parts of the same grammar (parallel).</p><p><button type="button" class="pdf-mini" data-pdf="phase:ph-pairs">${icon("pdf")}<span>PDF: pairs, with boards</span></button></p></section>
      ${pairs.map(card).join("")}
      <div class="note-box"><b>Rule of balance.</b> After both, either, neither and not only, put the same kind of word on each side: both <em>in the village</em> and <em>in the city</em>; not only <em>clever</em> but also <em>kind</em>.</div>`;
  }

  function renderLinkers(app, { icon }) {
    const order = [["summary", "Opening and ending"], ["sequence", "Order of points"], ["add", "Adding a point"], ["contrast", "Showing contrast"], ["reason", "Giving the reason"], ["result", "Showing the result"], ["example", "Giving an example"], ["emphasis", "Stressing a point"]];
    app.innerHTML = `<p class="crumbs"><a href="#atlas">Atlas</a></p><section class="page-head"><h1>Linkers for essays and the précis</h1>
      <p class="lede">The words that hold an essay together. Use a different linker each time and keep them formal.</p><p><button type="button" class="pdf-mini" data-pdf="phase:ph-atlas">${icon("pdf")}<span>PDF: every linker drawn</span></button></p></section>
      ${order.map(([g, name]) => { const es = atlas.filter((e) => e.group === g && (e.type === "adv" || e.type === "coord")); return es.length ? `<section class="cj-link"><h2>${esc(name)}</h2><p class="chips">${es.map((e) => `<a class="wchip" href="#atlas-${g}">${esc(e.w)}</a>`).join("")}</p></section>` : ""; }).join("")}
      <div class="note-box"><b>Three habits for marks.</b> 1. Do not repeat the same linker twice in a paragraph. 2. Put a comma after a linker at the start of a sentence (However, ...). 3. Never join two sentences with only a comma and a linker; use a full stop or a semicolon.</div>`;
  }

  function renderPunct(app, { icon }) {
    app.innerHTML = `<p class="crumbs"><a href="#atlas">Atlas</a></p><section class="page-head"><h1>Punctuating conjunctions</h1><p class="lede">When to put a comma, a semicolon or nothing.</p><p><button type="button" class="pdf-mini" data-pdf="unit:u-comma-rules">${icon("pdf")}<span>PDF: comma rules as boards</span></button></p></section>
      ${punct.map((r) => `<article class="cj-card"><h3>${esc(r.when)}</h3><p class="cj-logic">${esc(r.rule)}</p><p class="cj-ok">✓ ${esc(r.ok)}</p><p class="cj-bad">✗ ${esc(r.bad)}</p><p class="muted small">${esc(r.why)}</p></article>`).join("")}`;
  }

  function renderMistakes(app, hash, { icon }) {
    const tag = hash.startsWith("mistakes-") ? hash.slice(9) : "";
    const tags = Object.keys(TAGS).filter((t) => mistakes.some((m) => m.tag === t));
    const ms = mistakes.filter((m) => !tag || m.tag === tag);
    app.innerHTML = `<p class="crumbs"><a href="#atlas">Atlas</a></p><section class="page-head"><h1>Common mistakes, solved</h1>
      <p class="lede">${mistakes.length} sentences that students get wrong, each with the right form and the rule. Read the rule, not just the answer.</p>
      <p><button type="button" class="pdf-mini" data-pdf="phase:ph-mist">${icon("pdf")}<span>PDF of all mistakes: boards, rules and tests</span></button> <button type="button" class="pdf-mini" data-pdf="conjmist:all">${icon("pdf")}<span>Text only</span></button></p></section>
      <div class="cj-chips"><a class="cj-chip${tag ? "" : " on"}" href="#mistakes">All</a>${tags.map((t) => `<a class="cj-chip${tag === t ? " on" : ""}" href="#mistakes-${t}">${esc(TAGS[t])}</a>`).join("")}</div>
      ${ms.map((m) => `<article class="cj-card"><p class="cj-bad">✗ ${esc(m.bad)}</p><p class="cj-ok">✓ ${esc(m.good)}</p><p class="muted">${esc(m.why)}</p></article>`).join("")}`;
  }

  /* ---------- practice ---------- */
  const KEY = "conjunctions-lab:practice";
  const miss = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const saveMiss = (m) => { try { localStorage.setItem(KEY, JSON.stringify(m)); } catch (e) {} };
  const qGap = (g) => ({ id: "g:" + g.s, prompt: g.s, sub: "Choose the conjunction or linker that fits.", opts: shuffle(g.o), ans: g.c, why: g.why });
  const qJoin = (g) => ({ id: "j:" + g.s, prompt: g.s, sub: "Join the two sentences with the best conjunction.", opts: shuffle(g.o), ans: g.c, why: g.why });
  const qErr = (m) => ({ id: "e:" + m.bad, prompt: "Which sentence is correct?", sub: "", opts: shuffle([m.good, m.bad]), ans: m.good, why: m.why });
  const SETS = {
    gap: { title: "Fill the gap", note: `${gaps.length} questions`, make: () => shuffle(gaps).map(qGap) },
    join: { title: "Join the sentences", note: `${joins.length} questions`, make: () => shuffle(joins).map(qJoin) },
    err: { title: "Spot the mistake", note: `${mistakes.length} questions`, make: () => shuffle(mistakes).map(qErr) },
    mix: { title: "Mixed test", note: "10 of everything, repeating what you missed", make: () => { const m = miss(), all = [...gaps.map(qGap), ...joins.map(qJoin), ...mistakes.map(qErr)]; const again = all.filter((q) => m[q.id] > 0); return shuffle([...shuffle(again).slice(0, 4), ...shuffle(all)]).filter((q, i, a) => a.findIndex((x) => x.id === q.id) === i); } },
  };
  function renderPractice(app, { icon }) {
    const m = miss(), n = Object.values(m).filter((v) => v > 0).length;
    app.innerHTML = `<section class="page-head"><p class="eyebrow">Exam lab</p><h1>Practice</h1><p class="lede">Ten questions at a time. Each answer shows why. What you miss comes back in the mixed test.${n ? ` <b>${n} to repeat.</b>` : ""}</p></section>
      <div class="start-cards">${Object.entries(SETS).map(([k, s]) => `<a class="start-card" href="#quiz-${k}"><span class="sc-title">${esc(s.title)}</span><span class="sc-text">${esc(s.note)}</span><span class="sc-go" aria-hidden="true">${icon("next")}</span></a>`).join("")}</div>
      <p><button type="button" class="pdf-mini" data-pdf="conjexam:all">${icon("pdf")}<span>PDF: the questions with an answer key</span></button></p>`;
  }
  function runQuiz(app, key, { icon }) {
    const set = SETS[key] || SETS.mix, qs = set.make().slice(0, 10);
    let i = 0, score = 0; const wrong = [];
    const step = () => {
      if (i >= qs.length) {
        app.innerHTML = `<p class="crumbs"><a href="#practice">Practice</a></p><h1>${score} of ${qs.length}</h1>
          ${wrong.length ? `<h2>To remember</h2>${wrong.map((q) => `<article class="cj-card"><b>${esc(q.prompt)}</b><p class="cj-ok">✓ ${esc(q.ans)}</p><p class="muted">${esc(q.why)}</p></article>`).join("")}` : "<p>Perfect.</p>"}
          <p><a class="button primary" href="#quiz-${key}">Another ten</a> <a class="button" href="#practice">Back</a></p>`;
        return;
      }
      const q = qs[i];
      app.innerHTML = `<p class="crumbs"><a href="#practice">Practice</a></p><p class="eyebrow">${esc(set.title)} · question ${i + 1} of ${qs.length}</p><h2 class="cj-q">${esc(q.prompt)}</h2>${q.sub ? `<p class="muted">${esc(q.sub)}</p>` : ""}
        <div class="cj-opts">${q.opts.map((o, k) => `<button type="button" class="cj-opt" data-k="${k}">${esc(o)}</button>`).join("")}</div><div id="cj-res"></div>`;
      app.querySelectorAll(".cj-opt").forEach((b) => (b.onclick = () => {
        const ok = q.opts[+b.dataset.k] === q.ans, m = miss();
        m[q.id] = ok ? Math.max(0, (m[q.id] || 0) - 1) : (m[q.id] || 0) + 1; saveMiss(m);
        app.querySelectorAll(".cj-opt").forEach((x) => { x.disabled = true; if (q.opts[+x.dataset.k] === q.ans) x.classList.add("ok"); });
        if (!ok) { b.classList.add("no"); wrong.push(q); } else score++;
        app.querySelector("#cj-res").innerHTML = `<div class="${ok ? "cj-right" : "cj-wrong"}"><b>${ok ? "Right." : "Not quite."}</b> ${esc(q.why)}</div><p><button class="button primary" id="cj-next">${i + 1 >= qs.length ? "See my score" : "Next"}</button></p>`;
        app.querySelector("#cj-next").onclick = () => { i++; step(); };
      }));
    };
    step();
  }

  /* ---------- PDF plans (text only, shareable) ---------- */
  const safe = (s) => String(s).replace(/→/g, "->").replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, "-").replace(/·/g, "-").replace(/✓/g, "(right)").replace(/✗/g, "(wrong)");
  function addPlans() {
    const plans = P.notesPdf && P.notesPdf.plans;
    if (!plans) return setTimeout(addPlans, 300);
    const base = (title, file, intro) => ({ title, subtitle: "Notes from the Conjunctions Lab", file, items: [], textOnly: true, noImages: true, intro });
    plans.conjatlas = () => base("The conjunction atlas", "Conjunctions-Lab-Atlas.pdf", (n) => {
      Object.keys(GN).filter((g) => atlas.some((e) => e.group === g)).forEach((g) => {
        n.text(GN[g], { size: 15, bold: true, gap: 1 });
        atlas.filter((e) => e.group === g).forEach((e) => {
          n.rich(safe(`**${e.w}** (${{ coord: "coordinating", sub: "subordinating", corr: "pair", adv: "linking adverb" }[e.type]}): ${e.logic}.`), { gap: 0.3 });
          e.ex.forEach((x) => n.text(safe(x), { size: 9.5, italic: true, indent: 4, gap: 0.3 }));
          if (e.careful) n.text(safe("Be careful: " + e.careful), { size: 9, indent: 4, gap: 1 });
        });
        n.rule();
      });
    });
    plans.conjmist = () => base("Common mistakes, solved", "Conjunctions-Lab-Mistakes.pdf", (n) => {
      mistakes.forEach((m, i) => { n.text(safe(`${i + 1}. (wrong) ${m.bad}`), { size: 10.5, gap: 0.2 }); n.text(safe(`(right) ${m.good}`), { size: 10.5, bold: true, gap: 0.2 }); n.text(safe(m.why), { size: 9, italic: true, gap: 1.5 }); });
    });
    plans.conjexam = () => base("Conjunctions: exam practice", "Conjunctions-Lab-Exam.pdf", (n) => {
      const qs = [...gaps.map((g) => ({ q: g.s, c: g.c, w: g.why })), ...joins.map((g) => ({ q: "Join: " + g.s, c: g.c, w: g.why }))];
      qs.forEach((q, i) => n.text(safe(`${i + 1}. ${q.q}`), { size: 10, gap: 0.6 }));
      n.rule(); n.text("Answer key", { size: 15, bold: true, gap: 1 });
      qs.forEach((q, i) => n.text(safe(`${i + 1}. ${q.c}. ${q.w}`), { size: 9, gap: 0.4 }));
    });
  }
  setTimeout(addPlans, 0);

  C.render = function (app, hash, ctx) {
    if (hash === "atlas" || hash.startsWith("atlas-")) { renderAtlas(app, hash, ctx); return "atlas"; }
    if (hash === "pairs") { renderPairs(app, ctx); return "atlas"; }
    if (hash === "linkers") { renderLinkers(app, ctx); return "atlas"; }
    if (hash === "punctuation") { renderPunct(app, ctx); return "atlas"; }
    if (hash === "mistakes" || hash.startsWith("mistakes-")) { renderMistakes(app, hash, ctx); return "atlas"; }
    if (hash === "practice") { renderPractice(app, ctx); return "tests"; }
    if (hash.startsWith("quiz-")) { runQuiz(app, hash.slice(5), ctx); return "tests"; }
    return null;
  };
})();
