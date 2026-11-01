/* Start here: the sense atlas page. Every preposition's basic senses in one place, each with
   its drawn board, plus the confusing pairs side by side. Read from content/atlas.js. */
(function () {
  const P = (window.PLAB = window.PLAB || {});

  // Every board of the atlas (or of one lesson), in order, for the board-by-board lesson and the PDF.
  function items(lessonId) {
    const out = [];
    for (const u of P.atlas || [])
      for (const it of u.items) {
        if (lessonId && it.lesson !== lessonId) continue;
        const l = P.lessons[it.lesson];
        if (!l) continue;
        for (const s of l.steps) out.push({ l: l.id, s: s.id, label: it.title });
      }
    return out;
  }

  function startTour(lessonId) {
    const list = items(lessonId);
    if (!list.length) return;
    const it = lessonId && (P.atlas || []).flatMap((u) => u.items).find((x) => x.lesson === lessonId);
    P.tour.save({ prep: it ? it.title : "the sense atlas", slug: "", href: "#atlas" + (lessonId ? "-" + lessonId : ""), items: list, i: 0 });
    P.jump(list[0].l, list[0].s);
  }

  const PDF_ICON =
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3.5h7l4 4v13H7z"/><path d="M14 3.5v4h4M12.5 11v6m-2.5-2.5 2.5 2.5 2.5-2.5"/></svg>';

  P.atlasPage = {
    items,

    render(app, { esc, rich, focus }) {
      const units = P.atlas || [];
      const all = units.flatMap((u) => u.items);
      const nSenses = all.reduce((n, it) => n + (it.senses ? it.senses.length : 0), 0);
      const nPairs = all.filter((it) => it.kind === "pair").length;
      const hl = (ex, prep) => {
        const i = ex.toLowerCase().search(new RegExp(`(^|[^a-z])${prep.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![a-z])`));
        if (i < 0) return esc(ex);
        const at = ex[i].match(/[a-z]/i) ? i : i + 1;
        return `${esc(ex.slice(0, at))}<mark>${esc(ex.slice(at, at + prep.length))}</mark>${esc(ex.slice(at + prep.length))}`;
      };
      const card = (it) => {
        const actions = `<div class="row-buttons atlas-actions">
            <button type="button" class="button small primary" data-atlas-tour="${esc(it.lesson)}">▶ Learn it board by board</button>
            <button type="button" class="button small" data-pdf="atlas:${esc(it.lesson)}">${PDF_ICON} PDF</button></div>`;
        if (it.kind === "pair")
          return `<article class="atlas-card is-pair" id="${esc(it.lesson)}">
            <h3>${esc(it.title)}</h3>
            <div class="pair-grid">${it.panels
              .map((p) => `<div class="pair-cell"><b class="hand">${esc(p.prep)}</b><span>${esc(p.caption)}</span><em>${hl(p.example, p.prep)}</em></div>`)
              .join("")}</div>
            <ul class="atlas-rules">${it.rules.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>
            ${actions}</article>`;
        return `<article class="atlas-card" id="${esc(it.lesson)}">
          <h3><span class="hand">${esc(it.title.toLowerCase())}</span></h3>
          <p class="atlas-core">${esc(it.core)}</p>
          <p class="muted small">${esc(it.child)}</p>
          <ol class="atlas-senses">${it.senses
            .map(
              (s) => `<li>
                <button type="button" class="atlas-sense" data-jump="${esc(it.lesson)}|${esc(s.step)}" title="See it drawn">
                  <span class="as-head"><b>${esc(s.prep)}</b> = ${esc(s.name)}</span>
                  <span class="as-explain">${esc(s.explain)}</span>
                  ${s.examples.map((e) => `<span class="as-ex">${hl(e, s.prep)}</span>`).join("")}
                  ${s.vs ? `<span class="as-vs">≠ <b>${esc(s.vs[0])}</b>: ${esc(s.vs[1])}</span>` : ""}
                  <span class="as-go">See it drawn ›</span>
                </button></li>`
            )
            .join("")}</ol>
          ${actions}</article>`;
      };

      app.innerHTML = `<div class="atlas-page">
        <section class="prep-hero atlas-hero">
          <p class="eyebrow">Start here</p>
          <h1>The sense atlas</h1>
          <p class="lede">Every preposition's basic senses in one place. Each sense is drawn as a picture of its logic, explained from the very beginning, with the preposition it is most often confused with.</p>
          <p class="prep-facts">${all.length - nPairs} prepositions and families · ${nSenses} senses · ${nPairs} confusing pairs</p>
          <div class="row-buttons">
            <button type="button" class="button primary" data-atlas-tour="">▶ Learn it all, board by board</button>
            <button type="button" class="button" data-pdf="atlas">${PDF_ICON} Notes PDF of the whole atlas</button>
          </div>
        </section>
        <nav class="atlas-jump" aria-label="Jump to">${units
          .map((u) => `<div><h2>${esc(u.title)}</h2><p>${u.items.map((it) => `<a href="#atlas-${esc(it.lesson)}">${esc(it.kind === "pair" ? it.title : it.title.toLowerCase())}</a>`).join("")}</p></div>`)
          .join("")}</nav>
        ${units.map((u) => `<section class="atlas-unit"><h2>${esc(u.title)}</h2>${u.items.map(card).join("")}</section>`).join("")}
      </div>`;

      const page = app.querySelector(".atlas-page");
      page.addEventListener("click", (e) => {
        const t = e.target.closest("[data-atlas-tour]");
        if (t) return startTour(t.dataset.atlasTour || null);
        const j = e.target.closest("[data-jump]");
        if (j) {
          const [lid, step] = j.dataset.jump.split("|");
          P.tour.save(null);
          P.jump(lid, step);
        }
      });
      page.querySelectorAll(".atlas-jump a").forEach((a) =>
        a.addEventListener("click", (e) => {
          e.preventDefault();
          const el = document.getElementById(a.getAttribute("href").slice(7));
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        })
      );
      if (focus) {
        const el = document.getElementById(focus);
        if (el) requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
      }
    },
  };
})();
