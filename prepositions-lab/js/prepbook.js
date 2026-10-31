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
    location.hash = `lesson-${lessonId}`;
  };

  function build() {
    const entries = {}; // prep -> { core: [], words: [], other: [] }
    const at = (prep) => (entries[prep] = entries[prep] || { prep, core: [], words: [], other: [] });
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
          at(prep).words.push({ word, meaning: m[2], example: m[3], lesson: l, step: st.id, why: why && why.id });
        }
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
    return e.core.length + e.words.length + e.other.length;
  }

  P.prepbook = {
    slug,

    render(app, { esc, rich, prep }) {
      if (!book) build();
      const list = Object.values(book)
        .filter((e) => !NOT_PREPS.has(e.prep))
        .sort((a, b) => a.prep.localeCompare(b.prep));
      const current = prep ? list.find((e) => slug(e.prep) === prep) : null;
      const chip = (e) =>
        `<a class="prep-chip${current === e ? " is-current" : ""}" href="#prep-${slug(e.prep)}">${esc(e.prep)}<span>${count(e)}</span></a>`;

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
        body = `
          <section class="prep-section"><h2>${esc(p)}: its picture and its uses</h2>${core}</section>
          <section class="prep-section"><h2>Words that take ${esc(p)} <span class="muted">(${current.words.length})</span></h2>
            <label class="sr-only" for="prep-filter">Filter words</label>
            <input id="prep-filter" class="prep-filter" type="search" placeholder="Filter these words">
            ${words}</section>
          <section class="prep-section"><h2>Other boards that use ${esc(p)} <span class="muted">(${current.other.length})</span></h2>${other}</section>`;
      } else {
        body = '<p class="muted">Choose a preposition above to see its core picture, every word that takes it, and every other board that uses it.</p>';
      }

      app.innerHTML = `<div class="prep-page">
        <section class="intro compact">
          <p class="eyebrow">Prepositions</p>
          <h1>${current ? `Everything about <em>${esc(current.prep)}</em>` : "One preposition, every use"}</h1>
          <p class="lede">Pick a preposition. You see what it pictures, the words that take it and what each one means, and every board in the app that uses it. Tap any item to open it on the board.</p>
        </section>
        ${current
          ? `<details class="prep-pick"><summary>Choose another preposition</summary><nav class="prep-chips" aria-label="Prepositions">${list.map(chip).join("")}</nav></details>`
          : `<nav class="prep-chips" aria-label="Prepositions">${list.map(chip).join("")}</nav>`}
        ${body}</div>`;

      app.querySelector(".prep-page").addEventListener("click", (e) => {
        const b = e.target.closest("[data-jump]");
        if (!b) return;
        const [lid, step] = b.dataset.jump.split("|");
        P.jump(lid, step);
      });
      const filter = app.querySelector("#prep-filter");
      if (filter)
        filter.addEventListener("input", () => {
          const q = filter.value.trim().toLowerCase();
          app.querySelectorAll(".prep-words li").forEach((li) => (li.hidden = q && !li.textContent.toLowerCase().includes(q)));
        });
    },
  };
})();
