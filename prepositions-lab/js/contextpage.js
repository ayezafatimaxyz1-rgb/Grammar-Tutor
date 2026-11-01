/* Prepositions in context: the whole course organised by situation (time, place, transport,
   directions ... verbs, adjectives, nouns, phrases). Each chapter has a quick-reference table, its
   boards from across the course to learn one after another, and a PDF. Data: content/context.js. */
(function () {
  const P = (window.PLAB = window.PLAB || {});

  const chapters = () => (P.context || []).flatMap((s) => s.chapters.map((c) => ({ ...c, section: s.title })));
  const find = (id) => chapters().find((c) => c.id === id);

  // Every board of a chapter, in order. A word item takes that word's boards from its lesson.
  function items(id) {
    const ch = find(id);
    if (!ch) return [];
    const out = [];
    const seen = new Set();
    const add = (l, s, label) => {
      const k = `${l}|${s}`;
      if (seen.has(k)) return;
      seen.add(k);
      out.push({ l, s, label });
    };
    for (const it of ch.items) {
      const l = P.lessons[it.lesson];
      if (!l) continue;
      if (it.word) {
        const w = it.word;
        l.steps.forEach((s) => {
          if (s.id.startsWith(w + "-") || s.title === `Practice: ${w.replace(/-/g, " ")}`) add(l.id, s.id, l.title);
        });
      } else l.steps.forEach((s) => add(l.id, s.id, l.title));
    }
    return out;
  }

  function startTour(id) {
    const ch = find(id);
    const list = items(id);
    if (!ch || !list.length) return;
    P.tour.save({ prep: ch.title, slug: "", href: "#context-" + id, items: list, i: 0 });
    P.jump(list[0].l, list[0].s);
  }

  const PDF_ICON =
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3.5h7l4 4v13H7z"/><path d="M14 3.5v4h4M12.5 11v6m-2.5-2.5 2.5 2.5 2.5-2.5"/></svg>';

  P.contextPage = {
    items,
    find,

    render(app, { esc, focus }) {
      const secs = P.context || [];
      let n = 0;
      const card = (c) => {
        n++;
        const list = items(c.id);
        const rows = c.table || [];
        const lessons = [...new Map(c.items.filter((x) => P.lessons[x.lesson]).map((x) => [x.lesson, P.lessons[x.lesson]])).values()];
        const words = c.items.filter((x) => x.word).map((x) => x.word.replace(/-/g, " "));
        return `<details class="ctx-card" id="${esc(c.id)}"${focus === c.id ? " open" : ""}>
          <summary><span class="ctx-n">${n}</span><span class="ctx-head"><span class="ctx-kicker">Chapter ${n}</span><span class="ctx-title">${esc(c.title)}</span>
            <span class="ctx-meta">${list.length} boards · ${rows.length} rules${words.length ? ` · ${words.length} words` : ""}</span></span><span class="chev" aria-hidden="true">›</span></summary>
          <div class="ctx-body">
            <p class="ctx-intro">${esc(c.intro)}</p>
            <div class="row-buttons atlas-actions">
              <button type="button" class="button small primary" data-ctx-tour="${esc(c.id)}">▶ Learn this chapter board by board</button>
              <button type="button" class="button small" data-pdf="context:${esc(c.id)}">${PDF_ICON} PDF</button>
            </div>
            <div class="ctx-table-wrap"><table class="ctx-table"><thead><tr><th>Preposition</th><th>Use</th><th>Example</th></tr></thead><tbody>
              ${rows.map((r, i) => `<tr${i >= 14 ? ' class="ctx-more" hidden' : ""}><th scope="row">${esc(r[0])}</th><td>${esc(r[1])}</td><td><em>${esc(r[2])}</em></td></tr>`).join("")}
            </tbody></table></div>
            ${rows.length > 14 ? `<button type="button" class="linkish small" data-ctx-more>Show all ${rows.length} rows</button>` : ""}
            <h4>Lessons in this chapter</h4>
            <ul class="ctx-lessons">${lessons
              .filter((l) => !words.length || !/^p4-/.test(l.id))
              .map((l) => `<li><a href="#lesson-${esc(l.id)}">${esc(l.title)}</a></li>`)
              .join("")}</ul>
            ${words.length ? `<h4>Words in this chapter</h4><p class="ctx-words">${c.items
              .filter((x) => x.word)
              .map((x) => `<button type="button" class="chip-btn" data-jump="${esc(x.lesson)}|${esc(x.word)}-senses">${esc(x.word.replace(/-/g, " "))}</button>`)
              .join("")}</p>` : ""}
          </div>
        </details>`;
      };
      app.innerHTML = `<div class="atlas-page ctx-page">
        <section class="prep-hero atlas-hero">
          <p class="eyebrow">By situation</p>
          <h1>Prepositions in context</h1>
          <p class="lede">The whole course organised by situation: time, place, travelling, directions, causes, feelings, numbers, and the prepositions that follow verbs, adjectives and nouns. Each chapter has a quick table, every board that belongs to it, and a PDF.</p>
          <p class="prep-facts">${secs.length} sections · ${chapters().length} chapters</p>
        </section>
        ${secs.map((s) => `<section class="atlas-unit"><h2>${esc(s.title)}</h2>${s.chapters.map(card).join("")}</section>`).join("")}
      </div>`;
      const page = app.querySelector(".ctx-page");
      page.addEventListener("click", (e) => {
        const t = e.target.closest("[data-ctx-tour]");
        if (t) return startTour(t.dataset.ctxTour);
        const m = e.target.closest("[data-ctx-more]");
        if (m) {
          m.closest(".ctx-body").querySelectorAll(".ctx-more").forEach((r) => (r.hidden = false));
          return m.remove();
        }
        const j = e.target.closest("[data-jump]");
        if (j) {
          const [lid, step] = j.dataset.jump.split("|");
          P.tour.save(null);
          P.jump(lid, step);
        }
      });
      if (focus) {
        const el = document.getElementById(focus);
        if (el) requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
      }
    },
  };
})();
