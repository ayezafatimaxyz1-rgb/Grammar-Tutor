/* The two vocabulary sections: "One word for many" (PLAB.oneWord) and "Synonyms and antonyms,
   by meaning" (PLAB.words). Both search, both make a notes PDF, and the first has a quick test. */
(function () {
  const P = (window.PLAB = window.PLAB || {});
  const $ = (sel, root = document) => root.querySelector(sel);
  const norm = (s) => String(s).toLowerCase().trim();
  const shuffle = (a) => a.map((x) => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map((p) => p[1]);
  const TONE = { positive: "good feeling", neutral: "neutral feeling", negative: "bad feeling" };
  const FORM = { informal: "informal", neutral: "standard", formal: "formal", literary: "literary" };

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

  function wordHtml(h, esc, icon) {
    return `<article class="word-card" id="w-${esc(norm(h.word))}">
        <header class="word-head"><h2>${esc(h.word)}</h2>
          <button type="button" class="pdf-mini" data-pdf="words:${esc(h.word)}">${icon("pdf")}<span>PDF</span></button></header>
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
      </article>`;
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
        <p class="row-buttons"><button type="button" class="button" data-pdf="words:all">${icon("pdf")} PDF of every word</button></p>
      </section>
      <label class="search">
        <span class="sr-only">Type a word</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5 5"/></svg>
        <input id="w-search" type="search" placeholder="Type a word: alone, happy, important…" autocomplete="off" value="${esc(focus || "")}">
      </label>
      <div id="w-found"></div>
      <section class="word-index"><h2 class="small muted">All words (${words.length})</h2>
        <p class="chips">${words.map((h) => `<a class="wchip" href="#word-${encodeURIComponent(h.word)}">${esc(h.word)}</a>`).join("")}</p>
      </section>`;
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
      const list = which === "all" ? P.words : P.words.filter((h) => h.word === which);
      if (!list.length) return null;
      return {
        title: which === "all" ? "Synonyms and antonyms, by meaning" : `${which}: synonyms and antonyms, by meaning`,
        subtitle: "Vocabulary 2 from the Precis Lab: each meaning with its own synonyms and antonyms",
        file: `Precis-Lab-Words-${which === "all" ? "all" : which}.pdf`,
        items: [], textOnly: true, noImages: true,
        intro(n) {
          n.text("Each word is tagged: its feeling (good / neutral / bad), its formality (informal / standard / formal / literary), and where it is used.", { size: 9.5, gap: 3 });
          list.forEach((h) => {
            n.text(h.word, { size: 17, bold: true, gap: 1.5 });
            h.senses.forEach((s, i) => {
              n.rich(safe(`**Meaning ${i + 1}: ${s.sense}.** _${s.ex}_`), { gap: 1 });
              const line = (x) => safe(`${x.w}  (${TONE[x.tone] || x.tone}, ${FORM[x.formality] || x.formality}, ${x.use})${x.note ? ": " + x.note : ""}`);
              n.text("Synonyms:", { size: 10, bold: true, gap: 0.4, indent: 3 });
              s.syn.forEach((x) => n.text("•  " + line(x), { size: 9.5, gap: 0.3, indent: 6 }));
              n.text("Antonyms:", { size: 10, bold: true, gap: 0.4, indent: 3 });
              s.ant.forEach((x) => n.text("•  " + line(x), { size: 9.5, gap: 0.3, indent: 6 }));
              n.text("", { gap: 1.5 });
            });
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
