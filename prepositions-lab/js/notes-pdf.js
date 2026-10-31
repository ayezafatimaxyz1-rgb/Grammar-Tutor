/* Notes PDF: any lesson, unit, preposition or the mistake notebook as one printable, shareable PDF.
   Every board is drawn complete, then the explanation under it, then the checks as a test with
   blank answer boxes and an answer key at the end. Everything runs on the device: the PDF library
   and the board's handwriting font load only when a PDF is asked for. Free, nothing is uploaded. */
(function () {
  const P = (window.PLAB = window.PLAB || {});
  const NS = "http://www.w3.org/2000/svg";

  /* ---------- loading the PDF library and the board font ---------- */

  function loadScript(src) {
    return new Promise((ok, fail) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = ok;
      s.onerror = () => fail(new Error(`Could not load ${src}`));
      document.head.appendChild(s);
    });
  }
  async function ready() {
    if (!window.jspdf) await loadScript("js/vendor/jspdf.umd.min.js");
    if (!P.kalamFont) await loadScript("js/vendor/kalam-font.js");
  }

  /* ---------- text for the PDF's built-in font ---------- */

  const clean = (s) =>
    String(s || "")
      .replace(/_{3,}/g, "________")
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/(^|[\s(])_(.+?)_(?=[\s.,;:)!?]|$)/g, "$1$2")
      .replace(/✓/g, "(right)")
      .replace(/✗/g, "(wrong)")
      .replace(/≈/g, "(different meaning)")
      .replace(/→/g, "->")
      .replace(/[–—]/g, ", ")
      .replace(/[^\x00-\xff‘’“”…•]/g, "");

  /* ---------- drawing one board as a picture ---------- */

  function boardStyle() {
    const cs = getComputedStyle(document.documentElement);
    const v = (n, d) => cs.getPropertyValue(`--${n}`).trim() || d;
    return `
      :root{--ink-main:${v("ink-main", "#1f2a3a")};--ink-accent:${v("ink-accent", "#1d4f9c")};--ink-accent2:${v("ink-accent2", "#0d7366")};
        --ink-muted:${v("ink-muted", "#7b8594")};--ink-trouble:${v("ink-trouble", "#b8402f")};--ink-hi:${v("ink-hi", "#ffd84a")};--swipe-opacity:${v("swipe-opacity", "0.6")}}
      @font-face{font-family:"Kalam";font-weight:400;src:url(${P.kalamFont[400]}) format("woff2")}
      @font-face{font-family:"Kalam";font-weight:700;src:url(${P.kalamFont[700]}) format("woff2")}
      .board-text{font-family:"Kalam",cursive;font-weight:400}
      .board-text--caps{letter-spacing:5px;font-weight:700}
      .board-key.is-key-hi,.board-key.is-key-accent{fill:var(--ink-accent);font-weight:700}
      .board-key.is-key-accent2{fill:var(--ink-accent2);font-weight:700}
      .board-key.is-key-trouble{fill:var(--ink-trouble);font-weight:700}
      .board-swipe path{opacity:var(--swipe-opacity)}`;
  }

  function rasterize(svg, style) {
    const copy = svg.cloneNode(true);
    copy.setAttribute("xmlns", NS);
    copy.setAttribute("width", 1440);
    copy.setAttribute("height", 900);
    const st = document.createElementNS(NS, "style");
    st.textContent = style;
    copy.insertBefore(st, copy.firstChild);
    const xml = new XMLSerializer().serializeToString(copy);
    return new Promise((ok, fail) => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement("canvas");
        c.width = 1440;
        c.height = 900;
        const x = c.getContext("2d");
        x.fillStyle = "#fff";
        x.fillRect(0, 0, c.width, c.height);
        x.drawImage(img, 0, 0, c.width, c.height);
        ok(c.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = () => fail(new Error("A board could not be drawn"));
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(xml);
    });
  }

  // One hidden board per lesson, drawn with the same strokes the learner sees.
  function offscreenScene(lesson) {
    const host = document.createElement("div");
    host.setAttribute("aria-hidden", "true");
    host.style.cssText = "position:fixed;left:-20000px;top:0;width:960px;height:600px;pointer-events:none;";
    host.innerHTML = `<svg xmlns="${NS}" viewBox="0 0 960 600" width="960" height="600"><defs></defs><g></g></svg>`;
    document.body.appendChild(host);
    const svg = host.firstChild;
    const scene = new P.Scene(svg, svg.querySelector("g"), lesson.steps, lesson.id);
    // The live board may hold clip paths with the same names; give these their own.
    svg.querySelectorAll("clipPath").forEach((c) => (c.id = "pdf-" + c.id));
    svg.querySelectorAll("[clip-path]").forEach((el) => el.setAttribute("clip-path", el.getAttribute("clip-path").replace("url(#", "url(#pdf-")));
    return {
      svg,
      scene,
      done() {
        scene.destroy();
        host.remove();
      },
    };
  }

  /* ---------- the page layout ---------- */

  const C = { ink: [27, 35, 48], muted: [90, 101, 119], accent: [29, 79, 156], green: [13, 115, 102], line: [207, 214, 223], soft: [241, 244, 248] };

  class Notes {
    constructor(title) {
      this.doc = new window.jspdf.jsPDF({ unit: "mm", format: "a4", compress: true });
      this.M = 14;
      this.W = 210 - 2 * this.M;
      this.H = 297;
      this.y = this.M;
      this.title = title;
      this.answers = [];
    }
    page() {
      this.doc.addPage();
      this.y = this.M;
    }
    ensure(h) {
      if (this.y + h > this.H - this.M - 6) this.page();
    }
    text(str, { size = 10.5, bold = false, color = C.ink, gap = 1.6, indent = 0, italic = false } = {}) {
      const d = this.doc;
      d.setFont("helvetica", bold ? (italic ? "bolditalic" : "bold") : italic ? "italic" : "normal");
      d.setFontSize(size);
      d.setTextColor(...color);
      const lh = size * 0.3528 * 1.38;
      for (const ln of d.splitTextToSize(clean(str), this.W - indent)) {
        this.ensure(lh);
        d.text(ln, this.M + indent, this.y + lh * 0.78);
        this.y += lh;
      }
      this.y += gap;
    }
    rule(color = C.line) {
      this.doc.setDrawColor(...color);
      this.doc.setLineWidth(0.3);
      this.doc.line(this.M, this.y, this.M + this.W, this.y);
      this.y += 3;
    }
    image(url) {
      const h = (this.W * 600) / 960;
      this.ensure(h + 3);
      this.doc.addImage(url, "JPEG", this.M, this.y, this.W, h, undefined, "FAST");
      this.doc.setDrawColor(...C.line);
      this.doc.setLineWidth(0.3);
      this.doc.roundedRect(this.M, this.y, this.W, h, 2, 2);
      this.y += h + 3;
    }
    check(c, where) {
      const n = this.answers.length + 1;
      this.ensure(30);
      this.y += 1;
      const top = this.y;
      this.text(`Test yourself  ·  Q${n}`, { size: 9, bold: true, color: C.green, gap: 1, indent: 3 });
      this.text(c.prompt, { size: 10.5, bold: true, indent: 3 });
      c.options.forEach((o, i) => this.text(`[   ]  ${"ABCDEFG"[i]}.  ${o.text}`, { indent: 6, gap: 0.8 }));
      if (c.source === "past-paper") this.text(`CSS past paper${c.year ? " " + c.year : " (year not confirmed)"}${c.question ? ", " + c.question : ""}`, { size: 8.5, color: C.muted, italic: true, indent: 3 });
      this.doc.setDrawColor(...C.green);
      this.doc.setLineWidth(0.6);
      this.doc.line(this.M, Math.min(top, this.y), this.M, this.y);
      this.y += 2;
      const right = c.options.findIndex((o) => o.correct);
      this.answers.push({ n, where, letter: "ABCDEFG"[right], text: right >= 0 ? c.options[right].text : "", why: right >= 0 ? c.options[right].why : "" });
    }
    answerKey() {
      if (!this.answers.length) return;
      this.page();
      this.text("Answer key", { size: 18, bold: true, color: C.accent, gap: 1 });
      this.text("Cover this page while you attempt the questions.", { size: 9.5, color: C.muted, gap: 4 });
      for (const a of this.answers) {
        this.ensure(14);
        this.text(`Q${a.n}.  ${a.letter}:  ${a.text}`, { bold: true, gap: 0.5 });
        if (a.why) this.text(a.why, { size: 9.5, color: C.muted, indent: 6, gap: 0.5 });
        this.text(a.where, { size: 8, color: C.muted, indent: 6, gap: 3, italic: true });
      }
    }
    footer() {
      const d = this.doc;
      const n = d.getNumberOfPages();
      for (let i = 1; i <= n; i++) {
        d.setPage(i);
        d.setFont("helvetica", "normal");
        d.setFontSize(8);
        d.setTextColor(...C.muted);
        d.text(clean(`Prepositions Lab  ·  ${this.title}`), this.M, this.H - 8);
        d.text(`${i} / ${n}`, this.M + this.W, this.H - 8, { align: "right" });
      }
    }
  }

  /* ---------- building a PDF from a list of boards ---------- */

  // plan: { title, file, intro(notes), items: [{ l: lessonId, s: stepId, label }] }
  async function make(plan, progress) {
    await ready();
    if (document.fonts && document.fonts.load) await Promise.all([document.fonts.load('400 38px "Kalam"'), document.fonts.load('700 38px "Kalam"')]).catch(() => {});
    const style = boardStyle();
    const notes = new Notes(plan.title);
    notes.text(plan.title, { size: 22, bold: true, color: C.accent, gap: 1 });
    notes.text(plan.subtitle || "Notes from the Prepositions Lab teaching board", { size: 10, color: C.muted, gap: 4 });
    if (plan.intro) plan.intro(notes, clean);
    notes.rule();

    const items = plan.items.filter((it) => P.lessons[it.l] && P.lessons[it.l].steps.some((s) => s.id === it.s));
    let open = null;
    let label = null;
    let prev = null;
    for (let k = 0; k < items.length; k++) {
      if (progress.cancelled) throw new Error("cancelled");
      const it = items[k];
      const lesson = P.lessons[it.l];
      if (!open || open.lesson !== lesson) {
        if (open) open.board.done();
        open = { lesson, board: offscreenScene(lesson) };
      }
      const si = lesson.steps.findIndex((s) => s.id === it.s);
      const step = lesson.steps[si];
      // Draw the board when this step adds to it, or when the step before it is not already on the page.
      const ownDrawing = (step.actions || []).length > 0;
      const followsOn = prev && prev.l === it.l && prev.si === si - 1;
      const drawNow = ownDrawing || !followsOn;
      // Keep headings on the same page as the board under them.
      const need = drawNow ? 12 + (notes.W * 600) / 960 : 20;
      if (it.label && it.label !== label) {
        label = it.label;
        notes.ensure(need + 10);
        notes.y += 2;
        notes.text(it.label, { size: 15, bold: true, color: C.accent, gap: 2 });
      }
      notes.ensure(need);
      notes.text(`${plan.showLesson ? lesson.title + "  ·  " : ""}Step ${si + 1}: ${step.title}`, { size: 11.5, bold: true, gap: 1.5 });
      if (drawNow) {
        open.board.scene.render(si, open.board.scene.length(si));
        notes.image(await rasterize(open.board.svg, style));
      }
      for (const line of step.say || []) notes.text(line.text, { gap: 1.2 });
      if (step.check) notes.check(step.check, `${lesson.title}, step ${si + 1}`);
      notes.y += 3;
      prev = { l: it.l, si };
      progress.tick(k + 1, items.length);
    }
    if (open) open.board.done();
    notes.answerKey();
    notes.footer();
    return { blob: notes.doc.output("blob"), pages: notes.doc.getNumberOfPages() };
  }

  /* ---------- what each button turns into a PDF ---------- */

  const fileName = (s) => `Prepositions-Lab-${String(s).replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "")}.pdf`;
  const lessonItems = (l, label) => l.steps.map((s) => ({ l: l.id, s: s.id, label }));
  function unitOf(id) {
    for (const ph of P.curriculum.phases) for (const u of ph.units) if (u.id === id) return { ph, u };
    return null;
  }

  const plans = {
    lesson(id) {
      const l = P.lessons[id];
      if (!l) return null;
      return {
        title: l.title,
        file: fileName(l.title),
        items: lessonItems(l, null),
        intro(n) {
          if (l.summary) n.text(l.summary, { gap: 2 });
          (l.objectives || []).forEach((o) => n.text(`•  ${o}`, { indent: 3, gap: 0.6 }));
          n.y += 3;
        },
      };
    },
    unit(id) {
      const f = unitOf(id);
      if (!f) return null;
      const lessons = f.u.lessons.map((x) => x.lessonId && P.lessons[x.lessonId]).filter(Boolean);
      return {
        title: f.u.title,
        subtitle: f.ph.title,
        file: fileName(f.u.title),
        items: lessons.flatMap((l) => lessonItems(l, l.title)),
        intro(n) {
          n.text("Lessons in this part:", { bold: true, gap: 1 });
          lessons.forEach((l, i) => n.text(`${i + 1}.  ${l.title}`, { indent: 3, gap: 0.6 }));
          n.y += 3;
        },
      };
    },
    prep(prep) {
      const plan = P.prepbook && P.prepbook.plan(prep);
      if (!plan) return null;
      return {
        title: `Everything about ${prep}`,
        subtitle: "Every sense it can convey, the words that take it, why this one and not the others",
        file: fileName(`notes-${prep}`),
        showLesson: true,
        items: plan.items.map((x) => ({ ...x, label: x.label.split(" · ")[0] })),
        intro(n) {
          if (!plan.senses.length) return;
          n.text(`What ${prep} can mean`, { size: 14, bold: true, gap: 1.5 });
          plan.senses.forEach((s, i) => {
            n.text(`${i + 1}.  ${s.name}`, { bold: true, gap: 0.3 });
            n.text(s.note, { size: 9.5, color: C.muted, indent: 6, gap: 0.5 });
            s.words.forEach((w) => n.text(`${w.word} ${prep}: ${w.meaning}.  ${w.example}`, { size: 9.5, indent: 6, gap: 0.3 }));
            n.y += 1.5;
          });
          if (plan.rest.length) {
            n.text("Other uses", { bold: true, gap: 0.3 });
            plan.rest.forEach((w) => n.text(`${w.word} ${prep}: ${w.meaning}.  ${w.example}`, { size: 9.5, indent: 6, gap: 0.3 }));
          }
          n.y += 3;
        },
      };
    },
    notebook() {
      const seen = new Set();
      const items = [];
      for (const m of P.store.mistakes()) {
        for (const l of Object.values(P.lessons)) {
          const s = l.steps.find((x) => x.check && x.check.id === m.qid);
          if (s && !seen.has(m.qid)) {
            seen.add(m.qid);
            items.push({ l: l.id, s: s.id, label: null });
          }
        }
      }
      if (!items.length) return null;
      return { title: "My mistakes: a practice test", file: fileName("my-mistakes"), showLesson: true, items };
    },
  };

  /* ---------- the panel: progress, then share or download ---------- */

  let panel = null;
  function showPanel(html) {
    if (!panel) {
      panel = document.createElement("div");
      panel.className = "pdf-panel";
      panel.setAttribute("role", "dialog");
      panel.setAttribute("aria-modal", "true");
      panel.setAttribute("aria-label", "Notes PDF");
      document.body.appendChild(panel);
    }
    panel.innerHTML = `<div class="pdf-box">${html}</div>`;
    panel.hidden = false;
    return panel;
  }
  const closePanel = () => panel && (panel.hidden = true);

  function save(blob, name) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }

  async function start(kind, arg) {
    const plan = plans[kind] && plans[kind](arg);
    const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
    if (!plan || !plan.items.length) {
      showPanel(`<p>There is nothing to put in a PDF here yet.</p><p class="row-buttons"><button type="button" class="button" data-pdf-close>Close</button></p>`);
      return;
    }
    const progress = { cancelled: false, tick() {} };
    const p = showPanel(`
      <p class="eyebrow">Notes PDF</p>
      <h2>${esc(plan.title)}</h2>
      <p class="pdf-status" aria-live="polite">Getting the pen ready…</p>
      <div class="tour-meter"><span style="width:0%"></span></div>
      <p class="row-buttons"><button type="button" class="button ghost" data-pdf-cancel>Cancel</button></p>`);
    const status = p.querySelector(".pdf-status");
    const bar = p.querySelector(".tour-meter span");
    progress.tick = (i, n) => {
      status.textContent = `Drawing board ${i} of ${n}…`;
      bar.style.width = `${((i / n) * 100).toFixed(1)}%`;
    };
    p.querySelector("[data-pdf-cancel]").onclick = () => {
      progress.cancelled = true;
      closePanel();
    };
    let out;
    try {
      out = await make(plan, progress);
    } catch (e) {
      if (progress.cancelled) return;
      showPanel(`<p>The PDF could not be made: ${esc(e.message)}.</p><p class="row-buttons"><button type="button" class="button" data-pdf-close>Close</button></p>`);
      return;
    }
    const file = typeof File === "function" ? new File([out.blob], plan.file, { type: "application/pdf" }) : null;
    const canShare = !!(file && navigator.canShare && navigator.canShare({ files: [file] }));
    const mb = (out.blob.size / 1048576).toFixed(1);
    const done = showPanel(`
      <p class="eyebrow">Notes PDF</p>
      <h2>Your notes are ready</h2>
      <p>${esc(plan.title)}: ${out.pages} pages, ${mb} MB. Boards, explanations, tests and an answer key at the end.</p>
      <p class="row-buttons">
        ${canShare ? '<button type="button" class="button primary" data-pdf-share>Share (WhatsApp, Files…)</button>' : ""}
        <button type="button" class="button${canShare ? "" : " primary"}" data-pdf-save>Download PDF</button>
        <button type="button" class="button ghost" data-pdf-close>Close</button>
      </p>`);
    done.querySelector("[data-pdf-save]").onclick = () => save(out.blob, plan.file);
    const sh = done.querySelector("[data-pdf-share]");
    if (sh)
      sh.onclick = () =>
        navigator.share({ files: [file], title: plan.title }).catch((e) => {
          if (e && e.name !== "AbortError") save(out.blob, plan.file);
        });
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-pdf-close]")) return closePanel();
    const b = e.target.closest("[data-pdf]");
    if (!b) return;
    e.preventDefault();
    const [kind, ...rest] = b.dataset.pdf.split(":");
    start(kind, rest.join(":"));
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel && !panel.hidden && !panel.querySelector("[data-pdf-cancel]")) closePanel();
  });

  P.notesPdf = { start, plans, make };
})();
