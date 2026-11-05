/* The two vocabulary sections: "One word for many" (PLAB.oneWord) and "Synonyms and antonyms,
   by meaning" (PLAB.words). Both search, both make a notes PDF, and the first has a quick test. */
(function () {
  const P = (window.PLAB = window.PLAB || {});
  const $ = (sel, root = document) => root.querySelector(sel);
  const norm = (s) => String(s).toLowerCase().trim();
  const shuffle = (a) => a.map((x) => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map((p) => p[1]);
  const TONE = { positive: "good feeling", neutral: "neutral feeling", negative: "bad feeling" };
  const FORM = { informal: "informal", neutral: "standard", formal: "formal", literary: "literary" };
  const LEVEL = { core: "Everyday", S: "CSS standard", A: "CSS advanced" };
  const levelOf = (h) => h.level || "core";
  // The word class of a headword's first meaning, so a test's wrong options are the same kind of word.
  const NOUNS = new Set("aberration acrimony acumen adulation alacrity anathema animosity apathy avarice brevity chicanery dearth decorum deference disdain effrontery enigma equanimity paucity plethora propensity rancour rectitude remorse sycophant trepidation veracity zenith problem".split(" "));
  const posOf = (h) => {
    const m = h.senses[0].sense;
    if (/^to /.test(m)) return "verb";
    if (NOUNS.has(h.word) || /^(a|an|the) /.test(m)) return "noun";
    return "adj";
  };

  /* ---------------------------------------------------------------- one word for many */

  function renderOneWord(app, { esc, icon }) {
    const all = P.oneWord || [];
    const groups = [...new Set(all.map((e) => e.group))];
    app.innerHTML = `
      <section class="page-head">
        <p class="eyebrow">Vocabulary 1</p>
        <h1>One word for many</h1>
        <p class="lede">A long phrase on the left, and the one exact word that replaces it. This is how a precis saves words without losing meaning.</p>
        <p class="row-buttons">
          <button type="button" class="button primary" id="ow-test">${icon("play")} Test me (10 questions)</button>
          <button type="button" class="button" data-pdf="oneword:all">${icon("pdf")} PDF of the whole list</button>
        </p>
      </section>
      <div id="ow-quiz"></div>
      <label class="search">
        <span class="sr-only">Search the list</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5 5"/></svg>
        <input id="ow-search" type="search" placeholder="Search a phrase or a word: speech, imminent…" autocomplete="off">
      </label>
      <p id="ow-count" class="muted" aria-live="polite">${all.length} entries</p>
      ${groups
        .map(
          (g) => `
        <section class="vocab-group" data-group>
          <h2>${esc(g)}</h2>
          <ul class="ow-list">${all
            .filter((e) => e.group === g)
            .map(
              (e) => `<li class="ow-item" data-search="${esc(norm(e.phrase + " " + e.word + " " + (e.note || "") + " " + e.ex))}">
                <span class="ow-phrase">${esc(e.phrase)}</span>
                <span class="ow-arrow" aria-hidden="true">→</span>
                <span class="ow-word"><strong>${esc(e.word)}</strong> <span class="flag">${esc(e.type)}</span></span>
                <span class="ow-ex"><em>${esc(e.ex)}</em></span>
                ${e.note ? `<span class="ow-note">Careful: ${esc(e.note)}</span>` : ""}
              </li>`
            )
            .join("")}</ul>
        </section>`
        )
        .join("")}`;

    const input = $("#ow-search");
    input.addEventListener("input", () => {
      const q = norm(input.value);
      let n = 0;
      app.querySelectorAll(".ow-item").forEach((li) => {
        const hit = !q || li.dataset.search.includes(q);
        li.hidden = !hit;
        if (hit) n++;
      });
      app.querySelectorAll("[data-group]").forEach((g) => (g.hidden = !g.querySelector(".ow-item:not([hidden])")));
      $("#ow-count").textContent = q ? `${n} matching ${n === 1 ? "entry" : "entries"}` : `${all.length} entries`;
    });
    $("#ow-test").addEventListener("click", () => quiz($("#ow-quiz"), all, esc));
  }

  function quiz(box, all, esc) {
    const qs = shuffle(all).slice(0, 10);
    let i = 0, right = 0;
    const show = () => {
      if (i >= qs.length) {
        box.innerHTML = `<section class="quiz-card"><h2>${right} of ${qs.length} right</h2><p class="muted">Search the list for any word you missed, or test again.</p><p class="row-buttons"><button type="button" class="button primary" data-again>Test again</button><button type="button" class="button ghost" data-close>Close</button></p></section>`;
        box.querySelector("[data-again]").onclick = () => quiz(box, all, esc);
        box.querySelector("[data-close]").onclick = () => (box.innerHTML = "");
        return;
      }
      const e = qs[i];
      const others = shuffle(all.filter((x) => x.word !== e.word && x.type === e.type)).slice(0, 3);
      const opts = shuffle([e, ...others]);
      box.innerHTML = `<section class="quiz-card" aria-live="polite">
          <p class="eyebrow">Question ${i + 1} of ${qs.length}</p>
          <h2>One word for: <span class="ow-phrase">${esc(e.phrase)}</span></h2>
          <div class="quiz-opts">${opts.map((o) => `<button type="button" class="option" data-w="${esc(o.word)}">${esc(o.word)}</button>`).join("")}</div>
          <p class="quiz-why" hidden></p>
        </section>`;
      box.querySelectorAll(".option").forEach((b) =>
        b.addEventListener("click", () => {
          const ok = b.dataset.w === e.word;
          if (ok) right++;
          box.querySelectorAll(".option").forEach((x) => {
            x.disabled = true;
            if (x.dataset.w === e.word) x.classList.add("is-right");
          });
          if (!ok) b.classList.add("is-wrong");
          const picked = all.find((x) => x.word === b.dataset.w);
          const why = box.querySelector(".quiz-why");
          why.hidden = false;
          why.innerHTML = (ok ? "<strong>Right.</strong> " : `<strong>Not quite.</strong> <em>${esc(picked.word)}</em> means ${esc(picked.phrase)}. `) +
            `<strong>${esc(e.word)}</strong> = ${esc(e.phrase)}. <em>${esc(e.ex)}</em> <button type="button" class="button small" data-next>Next</button>`;
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

  /* ---------------------------------------------------------------- synonyms by meaning */

  // Every word that appears anywhere, pointing to the headword and sense it belongs to.
  function index() {
    const out = {};
    const add = (w, ref) => (out[norm(w)] = out[norm(w)] || []).push(ref);
    (P.words || []).forEach((h) => {
      add(h.word, { head: h.word, kind: "headword" });
      h.senses.forEach((s, si) => {
        s.syn.forEach((x) => add(x.w, { head: h.word, si, kind: "synonym" }));
        s.ant.forEach((x) => add(x.w, { head: h.word, si, kind: "antonym" }));
      });
    });
    return out;
  }

  const chip = (x, esc) => `<li class="syn tone-${esc(x.tone)}">
      <span class="syn-w">${esc(x.w)}</span>
      <span class="syn-tags"><span class="tag">${esc(TONE[x.tone] || x.tone)}</span><span class="tag">${esc(FORM[x.formality] || x.formality)}</span><span class="tag">${esc(x.use)}</span></span>
      ${x.note ? `<span class="syn-note">${esc(x.note)}</span>` : ""}
    </li>`;

  const dictOf = (h) => (P.dict && P.dict[h.word]) || { pos: "", labels: [], coll: [], usage: "" };
  const LABEL_NOTE = { formal: "used in formal writing and speech", informal: "used in everyday talk, not in formal writing", literary: "used in literature and poetry",
    approving: "shows that you like or admire something", disapproving: "shows that you do not like something", "often disapproving": "often shows dislike",
    law: "used in law", medical: "used in medicine", "old-fashioned": "no longer common", technical: "used by specialists" };

  function wordHtml(h, esc, icon) {
    const d = dictOf(h);
    return `<article class="word-card" id="w-${esc(norm(h.word))}">
        <header class="word-head"><h2>${esc(h.word)} <span class="lvl lvl-${esc(levelOf(h))}">${esc(LEVEL[levelOf(h)])}</span></h2>
          <button type="button" class="pdf-mini" data-pdf="words:${esc(h.word)}">${icon("pdf")}<span>PDF</span></button></header>
        <p class="dict-line"><span class="pos">${esc(d.pos)}</span>${d.labels.map((l) => `<span class="dlabel" title="${esc(LABEL_NOTE[l] || "")}">${esc(l)}</span>`).join("")}</p>
        ${d.labels.length ? `<p class="muted small">${d.labels.map((l) => `<b>${esc(l)}</b>: ${esc(LABEL_NOTE[l] || "")}`).join(" · ")}</p>` : ""}
        <p class="muted small">${h.senses.length} ${h.senses.length === 1 ? "meaning" : "meanings"}. Each meaning has its own synonyms: use only the ones under the meaning you need.</p>
        ${h.senses
          .map(
            (s, i) => `<section class="sense">
            <h3><span class="sense-no">${i + 1}</span> ${esc(s.sense)}</h3>
            <p class="sense-ex"><em>${esc(s.ex)}</em></p>
            <div class="sense-cols">
              <div><h4>Synonyms for this meaning</h4><ul class="syn-list">${s.syn.map((x) => chip(x, esc)).join("")}</ul></div>
              <div><h4>Antonyms for this meaning</h4><ul class="syn-list">${s.ant.map((x) => chip(x, esc)).join("")}</ul></div>
            </div>
          </section>`
          )
          .join("")}
        ${d.coll.length ? `<section class="dict-more"><h4>Goes with (collocations)</h4><p class="chips">${d.coll.map((c) => `<span class="coll">${esc(c)}</span>`).join("")}</p></section>` : ""}
        ${d.usage ? `<section class="dict-more"><h4>Usage</h4><p>${esc(d.usage)}</p></section>` : ""}
      </article>`;
  }

  // The CSS paper's wording: "most similar in meaning" / "most opposite in meaning".
  function wordQuiz(box, pool, all, kind, esc) {
    const items = shuffle(pool.filter((h) => h.senses[0][kind].length)).slice(0, 10);
    const others = (pos) => all.filter((h) => posOf(h) === pos).flatMap((h) => h.senses.slice(0, 1).flatMap((s) => s.syn.map((x) => x.w)));
    let i = 0, right = 0;
    const show = () => {
      if (i >= items.length) {
        box.innerHTML = `<section class="quiz-card"><h2>${right} of ${items.length} right</h2><p class="muted">Open any word you missed to see all its meanings.</p><p class="row-buttons"><button type="button" class="button primary" data-again>Test again</button><button type="button" class="button ghost" data-close>Close</button></p></section>`;
        box.querySelector("[data-again]").onclick = () => wordQuiz(box, pool, all, kind, esc);
        box.querySelector("[data-close]").onclick = () => (box.innerHTML = "");
        return;
      }
      const h = items[i], s = h.senses[0];
      const answer = shuffle(s[kind])[0];
      const own = new Set([h.word, ...h.senses.flatMap((x) => [...x.syn, ...x.ant].map((y) => y.w))].map(norm));
      const wrong = shuffle([...new Set(others(posOf(h)))].filter((w) => !own.has(norm(w)) && !w.includes(" "))).slice(0, 3);
      const opts = shuffle([answer.w, ...wrong]);
      box.innerHTML = `<section class="quiz-card" aria-live="polite">
          <p class="eyebrow">Question ${i + 1} of ${items.length} · ${esc(LEVEL[levelOf(h)])}</p>
          <h2>Choose the word most ${kind === "syn" ? "similar" : "opposite"} in meaning to <span class="caps">${esc(h.word.toUpperCase())}</span></h2>
          <div class="quiz-opts">${opts.map((o) => `<button type="button" class="option" data-w="${esc(o)}">${esc(o)}</button>`).join("")}</div>
          <p class="quiz-why" hidden></p>
        </section>`;
      box.querySelectorAll(".option").forEach((b) =>
        b.addEventListener("click", () => {
          const ok = b.dataset.w === answer.w;
          if (ok) right++;
          box.querySelectorAll(".option").forEach((x) => {
            x.disabled = true;
            if (x.dataset.w === answer.w) x.classList.add("is-right");
          });
          if (!ok) b.classList.add("is-wrong");
          const why = box.querySelector(".quiz-why");
          why.hidden = false;
          why.innerHTML = `${ok ? "<strong>Right.</strong>" : "<strong>Not quite.</strong>"} <strong>${esc(h.word)}</strong> <span class="pos">${esc(dictOf(h).pos)}</span> = ${esc(s.sense)}. <em>${esc(s.ex)}</em> ${kind === "syn" ? "Most similar" : "Most opposite"}: <strong>${esc(answer.w)}</strong>${answer.note ? ` (${esc(answer.note)})` : ""}. <a href="#word-${encodeURIComponent(h.word)}">See every meaning</a> <button type="button" class="button small" data-next>Next</button>`;
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

  function renderWords(app, { esc, icon, focus }) {
    const words = P.words || [];
    const idx = index();
    app.innerHTML = `
      <section class="page-head">
        <p class="eyebrow">Vocabulary 2</p>
        <h1>Synonyms and antonyms, by meaning</h1>
        <p class="lede">Type a word. Each of its meanings is shown separately, with only the real synonyms and antonyms for that meaning, and each word's tone, formality and where it is used.</p>
        <p class="legend"><span class="tag tone-positive">good feeling</span><span class="tag tone-neutral">neutral feeling</span><span class="tag tone-negative">bad feeling</span> · then formality (informal, standard, formal, literary) · then where it is used</p>
        <p class="row-buttons">
          <button type="button" class="button primary" id="w-test-sim">${icon("play")} Test: most similar in meaning</button>
          <button type="button" class="button" id="w-test-opp">${icon("play")} Test: most opposite in meaning</button>
        </p>
        <p class="row-buttons">
          <button type="button" class="button" data-pdf="words:all">${icon("pdf")} PDF of every word</button>
          <button type="button" class="button" data-pdf="words:level-A">${icon("pdf")} PDF: CSS advanced only</button>
        </p>
      </section>
      <div class="lvl-filter" role="group" aria-label="Level">
        ${["all", "core", "S", "A"].map((k) => `<button type="button" class="lvl-btn${k === "all" ? " is-on" : ""}" data-lvl="${k}">${k === "all" ? "All levels" : esc(LEVEL[k])} <small>${k === "all" ? words.length : words.filter((h) => levelOf(h) === k).length}</small></button>`).join("")}
      </div>
      <div id="w-quiz"></div>
      <label class="search">
        <span class="sr-only">Type a word</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5 5"/></svg>
        <input id="w-search" type="search" placeholder="Type a word: alone, ubiquitous, pernicious…" autocomplete="off" value="${esc(focus || "")}">
      </label>
      <div id="w-found"></div>
      <section class="word-index">${["core", "S", "A"].map((k) => {
        const list = words.filter((h) => levelOf(h) === k).sort((a, b) => a.word.localeCompare(b.word));
        return `<div class="lvl-group" data-lvlgroup="${k}"><h2 class="small">${esc(LEVEL[k])} <span class="muted">(${list.length})</span></h2>
          <p class="chips">${list.map((h) => `<a class="wchip lvl-${k}" href="#word-${encodeURIComponent(h.word)}">${esc(h.word)}</a>`).join("")}</p></div>`;
      }).join("")}
      </section>`;
    let level = "all";
    app.querySelectorAll(".lvl-btn").forEach((b) => b.addEventListener("click", () => {
      level = b.dataset.lvl;
      app.querySelectorAll(".lvl-btn").forEach((x) => x.classList.toggle("is-on", x === b));
      app.querySelectorAll("[data-lvlgroup]").forEach((g) => (g.hidden = level !== "all" && g.dataset.lvlgroup !== level));
    }));
    const pool = () => words.filter((h) => level === "all" || levelOf(h) === level);
    $("#w-test-sim").addEventListener("click", () => wordQuiz($("#w-quiz"), pool(), words, "syn", esc));
    $("#w-test-opp").addEventListener("click", () => wordQuiz($("#w-quiz"), pool(), words, "ant", esc));
    const found = $("#w-found");
    const show = (q) => {
      q = norm(q);
      if (!q) return (found.innerHTML = "");
      const head = words.find((h) => norm(h.word) === q);
      const refs = (idx[q] || []).filter((r) => r.kind !== "headword");
      const starts = !head && !refs.length ? words.filter((h) => norm(h.word).startsWith(q)) : [];
      let html = "";
      if (head) html += wordHtml(head, esc, icon);
      if (refs.length)
        html += `<section class="also"><h2>"${esc(q)}" also appears under</h2><ul>${refs
          .map((r) => {
            const h = words.find((x) => x.word === r.head);
            return `<li><a href="#word-${encodeURIComponent(h.word)}">${esc(h.word)}</a>, meaning ${r.si + 1} (${esc(h.senses[r.si].sense)}), as ${r.kind === "synonym" ? "a synonym" : "an antonym"}</li>`;
          })
          .join("")}</ul></section>`;
      if (starts.length) html += starts.map((h) => wordHtml(h, esc, icon)).join("");
      if (!html) html = `<p class="muted">"${esc(q)}" is not in the list yet. The list grows with every lesson; ask for it to be added.</p>`;
      found.innerHTML = html;
    };
    const input = $("#w-search");
    input.addEventListener("input", () => show(input.value));
    if (focus) show(focus);
  }

  /* ---------------------------------------------------------------- notes PDFs */

  const safe = (s) => String(s).replace(/→/g, "->").replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, "-").replace(/·/g, "-");

  function addPlans() {
    const plans = P.notesPdf && P.notesPdf.plans;
    if (!plans) return;
    plans.oneword = () => ({
      title: "One word for many",
      subtitle: "Vocabulary 1 from the Precis Lab: a long phrase and the one word that replaces it",
      file: "Precis-Lab-One-word-for-many.pdf",
      items: [], textOnly: true, noImages: true,
      intro(n) {
        const groups = [...new Set(P.oneWord.map((e) => e.group))];
        groups.forEach((g) => {
          n.text(g, { size: 15, bold: true, gap: 2 });
          P.oneWord.filter((e) => e.group === g).forEach((e) => {
            n.rich(safe(`**${e.word}** (${e.type}) = ${e.phrase}.`), { gap: 0.4 });
            n.text(safe(`   ${e.ex}${e.note ? "   Careful: " + e.note : ""}`), { size: 9.5, italic: true, gap: 1.6, indent: 3 });
          });
          n.rule();
        });
      },
    });
    plans.words = (which) => {
      const list = (which === "all" ? P.words : which.startsWith("level-") ? P.words.filter((h) => levelOf(h) === which.slice(6)) : P.words.filter((h) => h.word === which)).slice().sort((a, b) => a.word.localeCompare(b.word));
      if (!list.length) return null;
      return {
        title: which === "all" ? "Synonyms and antonyms, by meaning" : which.startsWith("level-") ? `${LEVEL[which.slice(6)]} words: synonyms and antonyms` : `${which}: synonyms and antonyms, by meaning`,
        subtitle: "Vocabulary 2 from the Precis Lab: each meaning with its own synonyms and antonyms",
        file: `Precis-Lab-Words-${which === "all" ? "all" : which}.pdf`,
        items: [], textOnly: true, noImages: true,
        intro(n) {
          n.text("Each word is tagged: its feeling (good / neutral / bad), its formality (informal / standard / formal / literary), and where it is used.", { size: 9.5, gap: 3 });
          list.forEach((h) => {
            const d = dictOf(h);
            n.text(`${h.word}   (${LEVEL[levelOf(h)]})`, { size: 17, bold: true, gap: 0.5 });
            n.text(safe([d.pos, ...d.labels].filter(Boolean).join("  ·  ")), { size: 9.5, italic: true, gap: 1.2 });
            h.senses.forEach((s, i) => {
              n.rich(safe(`**Meaning ${i + 1}: ${s.sense}.** _${s.ex}_`), { gap: 1 });
              const line = (x) => safe(`${x.w}  (${TONE[x.tone] || x.tone}, ${FORM[x.formality] || x.formality}, ${x.use})${x.note ? ": " + x.note : ""}`);
              n.text("Synonyms:", { size: 10, bold: true, gap: 0.4, indent: 3 });
              s.syn.forEach((x) => n.text("•  " + line(x), { size: 9.5, gap: 0.3, indent: 6 }));
              n.text("Antonyms:", { size: 10, bold: true, gap: 0.4, indent: 3 });
              s.ant.forEach((x) => n.text("•  " + line(x), { size: 9.5, gap: 0.3, indent: 6 }));
              n.text("", { gap: 1.5 });
            });
            if (d.coll.length) n.rich(safe(`**Goes with:** ${d.coll.join("  ·  ")}`), { gap: 0.8 });
            if (d.usage) n.rich(safe(`**Usage:** ${d.usage}`), { gap: 1.5 });
            n.rule();
          });
        },
      };
    };
  }

  P.vocab = { renderOneWord, renderWords, addPlans };
  document.addEventListener("DOMContentLoaded", addPlans);
  setTimeout(addPlans, 0);
})();
