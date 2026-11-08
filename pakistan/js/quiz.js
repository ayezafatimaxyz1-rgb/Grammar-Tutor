/* Quizzes, ordering questions and flashcards. Mistakes are remembered on this phone and asked again. */
(function () {
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const KEY = "pak-story:v1";
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || { miss: {} }; } catch (e) { return { miss: {} }; } };
  const save = (s) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} };
  const Q = (PAK.quiz = {});
  const eid = (e) => e.date + "|" + e.title;
  const mid = (y, lane) => `${y}-07-01`;
  const inOffice = (lane, date) => PAK.leaders.filter((l) => l.lane === lane && l.start <= date && (l.end || "9999") >= date && !/Caretaker/.test(l.post));

  function qYear(e, evs) {
    const ys = new Set([e.y]);
    shuffle([-1, 1, -2, 2, -3, 3, -5, 5, 4, -4]).forEach((d) => { if (ys.size < 4 && e.y + d >= 1947 && e.y + d <= 2025) ys.add(e.y + d); });
    const opts = [...ys].sort((a, b) => a - b);
    return { id: "y:" + eid(e), text: `In which year did this happen?`, sub: e.title, opts: opts.map(String), ans: opts.indexOf(e.y), why: `${PAK.fmt(e)}. ${e.text}`, e };
  }
  function qWho(lane, y) {
    const who = inOffice(lane, mid(y)); if (who.length !== 1) return null;
    const pool = shuffle(PAK.leaders.filter((l) => l.lane === lane && l.name !== who[0].name && !/Caretaker/.test(l.post)).map((l) => l.name).filter((n, i, a) => a.indexOf(n) === i)).slice(0, 3);
    const opts = shuffle([who[0].name, ...pool]);
    const role = { pm: "Prime Minister", hs: "head of state (Governor-General or President)", army: "Army chief" }[lane];
    return { id: `w:${lane}:${y}`, text: `Who was the ${role} in ${y}?`, opts, ans: opts.indexOf(who[0].name), why: `${who[0].name}, ${who[0].post}, ${who[0].start.slice(0, 4)} to ${who[0].end ? who[0].end.slice(0, 4) : "now"}.` };
  }
  function qFirst(a, b) {
    if (a.date > b.date) [a, b] = [b, a];
    const flip = Math.random() < 0.5, opts = flip ? [b.title, a.title] : [a.title, b.title];
    return { id: `f:${eid(a)}|${eid(b)}`, text: "Which came first?", opts, ans: opts.indexOf(a.title), why: `${a.title}: ${PAK.fmt(a)}. ${b.title}: ${PAK.fmt(b)}.` };
  }
  function qOrder(evs) {
    const pick = shuffle(evs).slice(0, 4).sort((a, b) => (a.date < b.date ? -1 : 1));
    if (new Set(pick.map((e) => e.date.slice(0, 7))).size < 4) return null;
    return { id: "o:" + pick.map(eid).join("#"), order: true, text: "Tap the events in the order they happened, earliest first.", items: pick, why: pick.map((e) => `${PAK.fmt(e)}: ${e.title}`).join(". ") };
  }

  Q.build = function (evs, n, years) {
    const out = [];
    const st = load();
    // questions you got wrong come back first
    Object.keys(st.miss).filter((k) => st.miss[k] > 0).forEach((k) => {
      if (out.length >= Math.ceil(n * 0.4)) return;
      const [t, ...r] = k.split(":"); const rest = r.join(":");
      let q = null;
      if (t === "y") q = (evs.find((e) => eid(e) === rest) && qYear(evs.find((e) => eid(e) === rest)));
      else if (t === "w") { const [lane, y] = rest.split(":"); if (years.includes(+y)) q = qWho(lane, +y); }
      else if (t === "f") { const [a, b] = rest.split("|2").length ? [null, null] : [null, null]; }
      if (q) { q.again = true; out.push(q); }
    });
    const gens = [];
    shuffle(evs).forEach((e) => gens.push(() => qYear(e)));
    shuffle(years).forEach((y) => { gens.push(() => qWho("pm", y)); gens.push(() => qWho("hs", y)); });
    for (let i = 0; i < 8; i++) { const a = shuffle(evs).slice(0, 2); if (a.length === 2 && a[0].y !== a[1].y) gens.push(() => qFirst(a[0], a[1])); gens.push(() => qOrder(evs)); }
    const mix = shuffle(gens); let g = 0;
    while (out.length < n && g < mix.length) { const q = mix[g++](); if (q && !out.some((o) => o.id === q.id)) out.push(q); }
    return shuffle(out).slice(0, n);
  };

  Q.run = function (app, title, evs, years, back) {
    const qs = Q.build(evs, 10, years);
    let i = 0, score = 0; const wrong = [];
    const step = () => {
      if (i >= qs.length) {
        app.innerHTML = `<p class="crumbs"><a href="${back}">Back</a></p><h1>${score} of ${qs.length}</h1><p class="lede">${wrong.length ? "The ones you missed will come back next time." : "Perfect. Try another era."}</p>
          ${wrong.map((q) => `<div class="ev-lite"><b>${esc(q.sub || q.text)}</b><br><span class="muted">${esc(q.why)}</span></div>`).join("")}
          <p><a class="btn" href="#quiz">More practice</a></p>`;
        return;
      }
      const q = qs[i];
      app.innerHTML = `<p class="crumbs"><a href="${back}">Back</a></p><p class="eyebrow">${esc(title)} &middot; question ${i + 1} of ${qs.length}${q.again ? " &middot; you missed this before" : ""}</p><h2>${esc(q.text)}</h2>${q.sub ? `<p class="qsub">${esc(q.sub)}</p>` : ""}<div id="qa"></div><div id="qr"></div>`;
      const qa = app.querySelector("#qa"), qr = app.querySelector("#qr");
      const done = (ok) => {
        const st = load();
        st.miss[q.id] = ok ? Math.max(0, (st.miss[q.id] || 0) - 1) : (st.miss[q.id] || 0) + 1;
        save(st);
        if (ok) score++; else wrong.push(q);
        qr.innerHTML = `<div class="${ok ? "right" : "wrong"}"><b>${ok ? "Right." : "Not quite."}</b> ${esc(q.why)}</div><p><button class="btn primary" id="nx">${i + 1 >= qs.length ? "See my score" : "Next"}</button></p>`;
        qr.querySelector("#nx").onclick = () => { i++; step(); };
        qr.scrollIntoView({ behavior: "smooth", block: "nearest" });
      };
      if (q.order) {
        const items = shuffle(q.items); const picked = [];
        const draw = () => {
          qa.innerHTML = `<ol class="picked">${picked.map((e) => `<li>${esc(e.title)}</li>`).join("")}</ol><div class="opts">${items.filter((e) => !picked.includes(e)).map((e, k) => `<button class="opt" data-k="${items.indexOf(e)}">${esc(e.title)}</button>`).join("")}</div>`;
          qa.querySelectorAll(".opt").forEach((b) => (b.onclick = () => {
            picked.push(items[+b.dataset.k]);
            if (picked.length < items.length) return draw();
            const ok = picked.every((e, n) => e === q.items[n]);
            qa.innerHTML = `<ol class="picked">${picked.map((e, n) => `<li class="${e === q.items[n] ? "ok" : "no"}">${esc(e.title)}</li>`).join("")}</ol>`;
            done(ok);
          }));
        };
        draw();
      } else {
        qa.innerHTML = `<div class="opts">${q.opts.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join("")}</div>`;
        qa.querySelectorAll(".opt").forEach((b) => (b.onclick = () => {
          qa.querySelectorAll(".opt").forEach((x, k) => { x.disabled = true; if (k === q.ans) x.classList.add("ok"); });
          if (+b.dataset.k !== q.ans) b.classList.add("no");
          done(+b.dataset.k === q.ans);
        }));
      }
    };
    step();
  };

  Q.cards = function (app, evs, title, back, tricks) {
    const deck = shuffle(evs); let i = 0, flip = false;
    const draw = () => {
      const e = deck[i], era = PAK.eraOf(e.date), tr = tricks(e);
      app.innerHTML = `<p class="crumbs"><a href="${back}">Back</a></p><p class="eyebrow">${esc(title)} &middot; card ${i + 1} of ${deck.length}</p>
        <button class="flash" style="--ec:${era.c}" id="fc">${flip ? `<b>${esc(PAK.fmt(e))}</b><span>${esc(e.text)}</span>${tr ? `<em>Remember: ${esc(tr)}</em>` : ""}` : `<span class="fpic">${PAK.illus(PAK.illusKey(e), era.c)}</span><b>${esc(e.title)}</b><small>What year? Tap to turn over.</small>`}</button>
        <div class="pager"><button class="btn" id="pv">&larr; Back</button><button class="btn" id="nx">Next &rarr;</button></div>`;
      app.querySelector("#fc").onclick = () => { flip = !flip; draw(); };
      app.querySelector("#pv").onclick = () => { i = (i - 1 + deck.length) % deck.length; flip = false; draw(); };
      app.querySelector("#nx").onclick = () => { i = (i + 1) % deck.length; flip = false; draw(); };
    };
    draw();
  };

  Q.hub = function (app, ERAS) {
    const st = load(), nm = Object.values(st.miss).filter((v) => v > 0).length;
    app.innerHTML = `<p class="eyebrow">Practice</p><h1>Quiz and flashcards</h1>
      <p class="lede">Ten questions at a time. Anything you get wrong comes back until you get it right.</p>
      <div class="cards"><a class="card" href="#quiz-all"><span class="badge">Daily practice</span><b>10 mixed questions${nm ? ` (${nm} to repeat)` : ""}</b><span class="t">Years, who was in charge, which came first and ordering.</span></a>
      <a class="card" href="#cards-all"><span class="badge">Flashcards</span><b>All events</b><span class="t">A picture and a title. Say the year, then turn it over.</span></a></div>
      <h2>By era</h2><div class="cards">${ERAS.map((e, i) => `<div class="card" style="border-left:6px solid ${e.c}"><b>${esc(e.name)}</b><span class="t"><a href="#quiz-era-${i}">Quiz</a> &middot; <a href="#cards-${i}">Flashcards</a> &middot; <a href="#era-${i}">Story road</a></span></div>`).join("")}</div>`;
  };
})();
