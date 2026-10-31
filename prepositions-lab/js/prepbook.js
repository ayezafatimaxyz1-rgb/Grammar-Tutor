/* The preposition book: pick one preposition and see everything the app teaches about it,
   from its core picture (Phase 1) to every word that takes it (Phase 4) and every other board
   that uses it. Built from the lessons themselves, so it grows as lessons are added. */
(function () {
  const P = (window.PLAB = window.PLAB || {});

  let book = null;

  // Capital words in lesson titles that are not prepositions (AGO is taught as "looks like one but is not").
  const NOT_PREPS = new Set(["and", "ago", "later", "(no word)"]);
  const slug = (prep) => prep.replace(/[^a-z]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
  const wordRe = (w) => new RegExp(`(^|[^A-Za-z])${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![A-Za-z])`);

  // Send the learner to one step of a lesson (the lesson player reads this on open).
  P.jump = (lessonId, stepId) => {
    try {
      sessionStorage.setItem("prepositions-lab:jump", JSON.stringify({ lesson: lessonId, step: stepId }));
    } catch (e) {}
    // Already on that lesson: open it again so the chosen step shows.
    if (location.hash === `#lesson-${lessonId}`) window.dispatchEvent(new HashChangeEvent("hashchange"));
    else location.hash = `lesson-${lessonId}`;
  };

  function build() {
    const entries = {}; // prep -> { core: [], words: [], other: [] }
    const at = (prep) => (entries[prep] = entries[prep] || { prep, core: [], words: [], other: [], phrases: [], verbs: [] });
    const lessons = Object.values(P.lessons).filter((l) => !l.generated);

    // Phase 4: every word's senses, read from its senses board.
    for (const l of lessons.filter((x) => x.phase === 4)) {
      l.steps.forEach((st) => {
        if (!/-senses$/.test(st.id)) return;
        const word = st.title.split(" · ")[0];
        const why = l.steps.find((x) => x.id === st.id.replace(/-senses$/, "-why"));
        for (const line of st.say || []) {
          const m = /^\*\*(.+?)\*\* means (.+?): _(.+)_$/.exec(line.text);
          if (!m) continue;
          const prep = m[1] === word ? "(no word)" : m[1].slice(word.length).trim();
          const built = l.steps.find((x) => x.id === st.id.replace(/-senses$/, "-build"));
          at(prep).words.push({ word, meaning: m[2], example: m[3], lesson: l, step: st.id, why: why && why.id, build: built && built.id });
        }
      });
    }

    // Phase 5: fixed phrases, filed under the preposition each one tests (in lieu of under in).
    for (const l of lessons.filter((x) => x.phase === 5 || x.phase === 6)) {
      l.steps.forEach((st) => {
        if (!/-meaning$/.test(st.id)) return;
        const m = /^\*\*(.+?)\*\* means (.+?): _(.+)_$/.exec((st.say[0] || {}).text || "");
        const k = /^Why \*\*(.+?)\*\*\?/.exec((st.say[1] || {}).text || "");
        if (!m || !k) return;
        const why = l.steps.find((x) => x.id === st.id.replace(/-meaning$/, "-why"));
        const ctx = l.steps.find((x) => x.id === st.id.replace(/-meaning$/, "-context"));
        const item = { phrase: m[1], meaning: m[2], example: m[3], lesson: l, step: st.id, why: why && why.id, ctx: ctx && ctx.id };
        // Phase 6 phrasal verbs also name the sense of their particle: "Sense: **up** = completely."
        const sense = /^Sense: \*\*.+?\*\* = (.+?)\.$/.exec((st.say[2] || {}).text || "");
        if (l.phase === 6) at(k[1]).verbs.push({ ...item, sense: sense ? sense[1] : "other uses" });
        else at(k[1]).phrases.push(item);
      });
    }

    // Phase 1: the lessons about a preposition name it in capitals in their title (IN, ON TOP OF ...).
    const phase1 = lessons.filter((x) => x.phase === 1);
    const caps = new Set();
    for (const l of phase1) for (const m of l.title.match(/\b[A-Z]{2,}(?: [A-Z]{2,})*\b/g) || []) caps.add(m.toLowerCase());
    for (const prep of caps) {
      for (const l of phase1) {
        if (!wordRe(prep.toUpperCase()).test(l.title)) continue;
        at(prep).core.push({ lesson: l, steps: l.steps.filter((s) => !s.check && s.id !== "summary").map((s) => ({ id: s.id, title: s.title })) });
      }
    }

    // Everywhere else: boards in Phases 2 and 3 whose explanation puts the preposition in bold.
    const preps = Object.keys(entries);
    for (const l of lessons.filter((x) => x.phase === 2 || x.phase === 3)) {
      l.steps.forEach((st) => {
        if (st.check) return;
        const text = (st.say || []).map((x) => x.text).join(" ");
        for (const prep of preps) {
          if (prep === "(no word)") continue;
          if (text.includes(`**${prep}**`) || new RegExp(`\\*\\*[a-z ]*\\b${prep}\\*\\*`, "i").test(text))
            at(prep).other.push({ lesson: l, step: st.id, title: st.title });
        }
      });
    }

    for (const e of Object.values(entries)) e.words.sort((a, b) => a.word.localeCompare(b.word));
    book = entries;
  }

  function count(e) {
    return e.core.length + e.words.length + e.other.length + e.phrases.length + e.verbs.length;
  }

  // The senses map for one preposition: each sense with the boards that teach it and the words
  // that really take this preposition in that sense. Words the map does not place go to "Other uses".
  function sensesOf(e) {
    const defs = (P.senses && P.senses[e.prep]) || [];
    const placed = new Set();
    const senses = defs.map((d) => {
      const boards = (d.boards || [])
        .map((ref) => {
          const [lid, sid] = ref.split("/");
          const l = P.lessons[lid];
          const st = l && l.steps.find((x) => x.id === sid);
          return st ? { lesson: l, step: sid, title: st.title } : null;
        })
        .filter(Boolean);
      const words = (d.words || [])
        .map((w) => e.words.find((x) => x.word === w && !placed.has(x)))
        .filter(Boolean);
      words.forEach((w) => placed.add(w));
      return { name: d.name, note: d.note, boards, words };
    }).filter((x) => x.boards.length || x.words.length);
    if (e.phrases.length)
      senses.push({
        name: "Fixed phrases",
        note: e.phrases.slice(0, 3).map((x) => x.phrase).join(", ") + (e.phrases.length > 3 ? " …" : ""),
        boards: e.phrases.flatMap((x) => [
          { lesson: x.lesson, step: x.step, title: x.phrase },
          ...(x.ctx ? [{ lesson: x.lesson, step: x.ctx, title: `${x.phrase}: another context` }] : []),
          ...(x.why ? [{ lesson: x.lesson, step: x.why, title: `why ${x.phrase}` }] : []),
        ]),
        words: [],
        phrases: e.phrases,
      });
    // Phrasal verbs, one sense of the particle at a time (up = completely: give up, wind up ...).
    const bySense = new Map();
    for (const v of e.verbs) bySense.set(v.sense, [...(bySense.get(v.sense) || []), v]);
    for (const [sense, vs] of bySense)
      senses.push({
        name: `Phrasal verbs: ${e.prep} = ${sense}`,
        note: vs.slice(0, 3).map((x) => x.phrase).join(", ") + (vs.length > 3 ? " …" : ""),
        boards: vs.flatMap((x) => [
          { lesson: x.lesson, step: x.step, title: x.phrase },
          ...(x.ctx ? [{ lesson: x.lesson, step: x.ctx, title: `${x.phrase}: another context` }] : []),
          ...(x.why ? [{ lesson: x.lesson, step: x.why, title: `why ${x.phrase}` }] : []),
        ]),
        words: [],
        phrases: vs,
      });
    const rest = e.words.filter((w) => !placed.has(w));
    return { senses, rest };
  }

  // The step-by-step tour: the core picture first, then sense by sense, each board followed by
  // every word's meanings and its "why this one" board.
  const TOUR = "prepositions-lab:tour";
  function tourItems(e) {
    const items = [];
    const seen = new Set();
    const add = (l, s, label) => {
      const k = `${l}|${s}`;
      if (seen.has(k)) return;
      seen.add(k);
      items.push({ l, s, label });
    };
    const { senses, rest } = sensesOf(e);
    // A lesson about this preposition alone ("ON") is its picture; lessons that set it beside
    // others ("IN, ON, AT for place") come after the senses, as comparisons.
    const own = e.core.filter((c) => (c.lesson.title.match(/\b[A-Z]{2,}(?: [A-Z]{2,})*\b/g) || []).every((m) => m.toLowerCase() === e.prep));
    const compared = e.core.filter((c) => !own.includes(c));
    const inSense = new Set(senses.flatMap((s) => s.boards.map((b) => `${b.lesson.id}|${b.step}`)));
    for (const c of own) {
      const first = c.steps[0];
      if (first && !inSense.has(`${c.lesson.id}|${first.id}`)) add(c.lesson.id, first.id, `The picture of ${e.prep}`);
    }
    const words = (list, label) =>
      list.forEach((w) => {
        add(w.lesson.id, w.step, `${label} · ${w.word} ${e.prep}`);
        if (w.build) add(w.lesson.id, w.build, `${label} · how ${w.word} ${e.prep} is built`);
        if (w.why) add(w.lesson.id, w.why, `${label} · why ${w.word} ${e.prep}`);
      });
    senses.forEach((s, i) => {
      const label = `Sense ${i + 1} of ${senses.length}: ${s.name}`;
      s.boards.forEach((b) => add(b.lesson.id, b.step, label));
      words(s.words, label);
    });
    words(rest, "Other uses");
    for (const c of own) for (const st of c.steps) add(c.lesson.id, st.id, `More about ${e.prep}`);
    for (const c of compared) for (const st of c.steps) add(c.lesson.id, st.id, `Compared: ${c.lesson.title}`);
    return items;
  }
  // Only the boards of one sense (k = its number from 0, or "other" for Other uses).
  function senseItems(e, k) {
    const { senses } = sensesOf(e);
    const prefix = k === "other" ? "Other uses" : senses[k] ? `Sense ${Number(k) + 1} of ${senses.length}:` : null;
    return prefix ? tourItems(e).filter((x) => x.label.startsWith(prefix)) : [];
  }

  P.tour = {
    read() {
      try {
        return JSON.parse(localStorage.getItem(TOUR) || "null");
      } catch (e) {
        return null;
      }
    },
    save(t) {
      try {
        if (t) localStorage.setItem(TOUR, JSON.stringify(t));
        else localStorage.removeItem(TOUR);
      } catch (e) {}
    },
    start(prep, i = 0, sense = null) {
      if (!book) build();
      const e = book[prep];
      if (!e) return;
      const items = sense === null ? tourItems(e) : senseItems(e, sense);
      if (!items.length) return;
      const t = { prep, slug: slug(prep), items, i: Math.max(0, Math.min(items.length - 1, i)) };
      if (sense !== null) {
        // A one-sense lesson ends by offering the next sense.
        const { senses, rest } = sensesOf(e);
        const k = sense === "other" ? senses.length : Number(sense);
        t.sense = sense === "other" ? "Other uses" : `Sense ${k + 1}: ${senses[k].name}`;
        if (k + 1 < senses.length) t.next = { sense: k + 1, name: `Sense ${k + 2}: ${senses[k + 1].name}` };
        else if (k + 1 === senses.length && rest.length) t.next = { sense: "other", name: "Other uses" };
      }
      P.tour.save(t);
      P.jump(items[t.i].l, items[t.i].s);
    },
  };

  P.prepbook = {
    slug,

    // Everything the notes PDF needs for one preposition.
    plan(prep) {
      if (!book) build();
      const e = book[prep];
      if (!e) return null;
      return { ...sensesOf(e), items: tourItems(e), senseItems: (k) => senseItems(e, k) };
    },

    // "depend on" -> "on", "in time" -> "in", "against" -> "against"; null when no preposition is named.
    find(text) {
      if (!book) build();
      const t = String(text).toLowerCase().replace(/[^a-z' ]+/g, " ").trim().replace(/\s+/g, " ");
      if (!t) return null;
      const ok = (p) => p && book[p] && !NOT_PREPS.has(p) && p !== "(no word)";
      if (ok(t)) return t;
      const w = t.split(" ");
      for (let n = Math.min(3, w.length - 1); n >= 1; n--) {
        const tail = w.slice(-n).join(" ");
        if (ok(tail)) return tail;
        const head = w.slice(0, n).join(" ");
        if (ok(head)) return head;
      }
      return null;
    },

    render(app, { esc, rich, prep }) {
      if (!book) build();
      const list = Object.values(book)
        .filter((e) => !NOT_PREPS.has(e.prep))
        .sort((a, b) => a.prep.localeCompare(b.prep));
      const current = prep ? list.find((e) => slug(e.prep) === prep) : null;
      const chip = (e) =>
        `<a class="prep-chip" href="#prep-${slug(e.prep)}" data-name="${esc(e.prep)}"><b>${esc(e.prep)}</b><span>${count(e)} ${count(e) === 1 ? "use" : "uses"}</span></a>`;

      let body = "";
      if (current) {
        const p = current.prep;
        const core = current.core.length
          ? current.core
              .map(
                (c) => `<div class="prep-card"><h3><a href="#lesson-${esc(c.lesson.id)}">${esc(c.lesson.title)}</a></h3>
                  <div class="prep-steps">${c.steps.map((s) => `<button type="button" class="button small ghost" data-jump="${esc(c.lesson.id)}|${esc(s.id)}">${esc(s.title)}</button>`).join("")}</div></div>`
              )
              .join("")
          : `<p class="muted">No Phase 1 lesson is about <strong>${esc(p)}</strong> on its own; see its words below.</p>`;
        const words = current.words.length
          ? `<ul class="prep-words">${current.words
              .map(
                (w) => `<li><p><strong>${esc(w.word)} ${esc(p)}</strong> <span class="muted">= ${esc(w.meaning)}</span></p>
                  <p class="ex">${rich("_" + w.example + "_")}</p>
                  <p class="row-buttons"><button type="button" class="button small" data-jump="${esc(w.lesson.id)}|${esc(w.step)}">See its meanings</button>${
                    w.why ? `<button type="button" class="button small ghost" data-jump="${esc(w.lesson.id)}|${esc(w.why)}">Why this one?</button>` : ""
                  }</p></li>`
              )
              .join("")}</ul>`
          : '<p class="muted">No word in the A to Z list takes it yet.</p>';
        const other = current.other.length
          ? `<ul class="prep-other">${current.other
              .map((o) => `<li><button type="button" class="linkish" data-jump="${esc(o.lesson.id)}|${esc(o.step)}">${esc(o.title)}</button> <span class="muted">· ${esc(o.lesson.title)}</span></li>`)
              .join("")}</ul>`
          : '<p class="muted">Nothing else yet.</p>';
        const { senses, rest } = sensesOf(current);
        const wordItem = (w) => `<li><p><strong>${esc(w.word)} ${esc(p)}</strong> <span class="muted">= ${esc(w.meaning)}</span></p>
                  <p class="ex">${rich("_" + w.example + "_")}</p>
                  <p class="row-buttons"><button type="button" class="button small" data-jump="${esc(w.lesson.id)}|${esc(w.step)}">See its meanings</button>${
                    w.why ? `<button type="button" class="button small ghost" data-jump="${esc(w.lesson.id)}|${esc(w.why)}">Why this one?</button>` : ""
                  }</p></li>`;
        const phraseItem = (x) => `<li><p><strong>${esc(x.phrase)}</strong> <span class="muted">= ${esc(x.meaning)}</span></p>
                  <p class="ex">${rich("_" + x.example + "_")}</p>
                  <p class="row-buttons"><button type="button" class="button small" data-jump="${esc(x.lesson.id)}|${esc(x.step)}">See it drawn</button>${
                    x.why ? `<button type="button" class="button small ghost" data-jump="${esc(x.lesson.id)}|${esc(x.why)}">Why this one?</button>` : ""
                  }</p></li>`;
        const senseButtons = (k, name) => {
          const n = senseItems(current, k).length;
          return n
            ? `<p class="sense-actions"><button type="button" class="button small primary" data-tour="${esc(p)}" data-tour-sense="${k}">\u25B6 Learn this sense (${n} boards)</button><button type="button" class="button small ghost" data-pdf="prep:${esc(p)}:${k}" title="${esc(name)}">PDF</button></p>`
            : "";
        };
        const map = senses.length
          ? `<section class="prep-section"><h2>What <span class="hand">${esc(p)}</span> can mean <span class="muted">· ${senses.length} senses</span></h2>
            <p class="muted small">Tap a sense to see its boards and words, or learn it board by board.</p>
            <ol class="sense-map">${senses
              .map(
                (s, i) => `<li class="sense-card"><details${i === 0 ? " open" : ""}><summary><span class="sense-n">${i + 1}</span><span><strong>${esc(s.name)}</strong><br><span class="muted">${esc(s.note)}</span></span><span class="sense-count">${s.phrases ? `${s.phrases.length} phrase${s.phrases.length > 1 ? "s" : ""}` : s.words.length ? `${s.words.length} word${s.words.length > 1 ? "s" : ""}` : "board"}</span></summary>
                  ${s.phrases ? `<ul class="prep-words">${s.phrases.map(phraseItem).join("")}</ul>` : s.boards.length ? `<p class="prep-steps">${s.boards.map((b) => `<button type="button" class="button small ghost" data-jump="${esc(b.lesson.id)}|${esc(b.step)}">Board: ${esc(b.title)}</button>`).join("")}</p>` : ""}
                  ${s.words.length ? `<ul class="prep-words">${s.words.map(wordItem).join("")}</ul>` : ""}
                </details>${senseButtons(i, s.name)}</li>`
              )
              .join("")}${
              rest.length
                ? `<li class="sense-card"><details><summary><span class="sense-n">+</span><span><strong>Other uses</strong><br><span class="muted">words whose sense is their own</span></span><span class="sense-count">${rest.length}</span></summary><ul class="prep-words">${rest.map(wordItem).join("")}</ul></details>${senseButtons("other", "Other uses")}</li>`
                : ""
            }</ol></section>`
          : "";
        const tourN = tourItems(current).length;
        const saved = P.tour.read();
        const resume = saved && saved.prep === p && saved.i > 0 && saved.i < tourN ? saved.i : 0;
        const nWords = current.words.length + current.phrases.length + current.verbs.length;
        const tour = `<section class="prep-hero">
            <a class="back-link" href="#prepositions">${"\u2039"} All prepositions</a>
            <h1 class="prep-word">${esc(p)}</h1>
            <p class="prep-facts">${senses.length} senses · ${nWords} words and phrases · ${tourN} boards</p>
            ${
              tourN
                ? `<div class="row-buttons">${
                    resume
                      ? `<button type="button" class="button primary" data-tour="${esc(p)}" data-tour-at="${resume}">\u25B6 Continue · board ${resume + 1} of ${tourN}</button><button type="button" class="button" data-tour="${esc(p)}">Start again</button>`
                      : `<button type="button" class="button primary" data-tour="${esc(p)}">\u25B6 Learn it all, board by board</button>`
                  }<button type="button" class="button" data-pdf="prep:${esc(p)}"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3.5h7l4 4v13H7z"/><path d="M14 3.5v4h4M12.5 11v6m-2.5-2.5 2.5 2.5 2.5-2.5"/></svg> Notes PDF</button></div>`
                : ""
            }
          </section>`;
        body = `${tour}${map}
          <section class="prep-section"><h2>${esc(p)}: its picture and its uses</h2>${core}</section>
          <section class="prep-section prep-all"><h2>Words that take ${esc(p)}, A to Z <span class="muted">(${current.words.length})</span></h2>
            <label class="sr-only" for="prep-filter">Filter words</label>
            <input id="prep-filter" class="prep-filter" type="search" placeholder="Filter these words">
            ${words}</section>
          <section class="prep-section"><h2>Other boards that use ${esc(p)} <span class="muted">(${current.other.length})</span></h2>${other}</section>`;
      } else {
        body = "";
      }

      app.innerHTML = current
        ? `<div class="prep-page">${body}</div>`
        : `<div class="prep-page">
        <section class="intro compact">
          <h1>Prepositions</h1>
          <p class="lede">Pick one to see every sense it can convey, with its words, phrases and boards. Anywhere in the app, a dotted preposition brings you here.</p>
        </section>
        <label class="search">
          <span class="sr-only">Find a preposition</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5 5"/></svg>
          <input id="prep-search" type="search" placeholder="Find a preposition" autocomplete="off">
        </label>
        <nav class="prep-chips" aria-label="Prepositions">${list.map(chip).join("")}</nav>
      </div>`;

      app.querySelector(".prep-page").addEventListener("click", (e) => {
        const t = e.target.closest("[data-tour]");
        if (t) return P.tour.start(t.dataset.tour, Number(t.dataset.tourAt || 0), t.dataset.tourSense ?? null);
        const b = e.target.closest("[data-jump]");
        if (!b) return;
        const [lid, step] = b.dataset.jump.split("|");
        P.tour.save(null);
        P.jump(lid, step);
      });
      const find = app.querySelector("#prep-search");
      if (find)
        find.addEventListener("input", () => {
          const q = find.value.trim().toLowerCase();
          app.querySelectorAll(".prep-chip").forEach((c) => (c.hidden = q && !c.dataset.name.toLowerCase().includes(q)));
        });
      const filter = app.querySelector("#prep-filter");
      if (filter)
        filter.addEventListener("input", () => {
          const q = filter.value.trim().toLowerCase();
          app.querySelectorAll(".prep-all .prep-words li").forEach((li) => (li.hidden = q && !li.textContent.toLowerCase().includes(q)));
        });
    },
  };
})();
