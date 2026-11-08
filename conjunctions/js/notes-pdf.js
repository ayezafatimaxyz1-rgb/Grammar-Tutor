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

  // Full boards are 1440 x 900; the whole-course PDF uses smaller, lighter pictures to stay manageable.
  function rasterize(svg, style, { w = 1440, h = 900, quality = 0.82 } = {}) {
    const copy = svg.cloneNode(true);
    copy.setAttribute("xmlns", NS);
    copy.setAttribute("width", w);
    copy.setAttribute("height", h);
    const st = document.createElementNS(NS, "style");
    st.textContent = style;
    copy.insertBefore(st, copy.firstChild);
    const xml = new XMLSerializer().serializeToString(copy);
    return new Promise((ok, fail) => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        const x = c.getContext("2d");
        x.fillStyle = "#fff";
        x.fillRect(0, 0, c.width, c.height);
        x.drawImage(img, 0, 0, c.width, c.height);
        ok(c.toDataURL("image/jpeg", quality));
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
      this.top = this.M;
      this.y = this.M;
      this.title = title;
      this.answers = [];
      this.toc = [];
      this.heads = {};
      this.running = "";
      this.noHeader = { 1: true };
    }
    pageNo() {
      return this.doc.getNumberOfPages();
    }
    page() {
      this.doc.addPage();
      this.heads[this.pageNo()] = this.running;
      this.y = this.running ? this.M + 8 : this.M;
    }
    ensure(h) {
      if (this.y + h > this.H - this.M - 6) this.page();
    }
    font(size, bold, italic, color) {
      const d = this.doc;
      d.setFont("helvetica", bold ? (italic ? "bolditalic" : "bold") : italic ? "italic" : "normal");
      d.setFontSize(size);
      d.setTextColor(...color);
    }
    text(str, { size = 10.5, bold = false, color = C.ink, gap = 1.6, indent = 0, italic = false, width } = {}) {
      const d = this.doc;
      this.font(size, bold, italic, color);
      const lh = size * 0.3528 * 1.38;
      for (const ln of d.splitTextToSize(clean(str), (width || this.W) - indent)) {
        this.ensure(lh);
        d.text(ln, this.M + indent, this.y + lh * 0.78);
        this.y += lh;
      }
      this.y += gap;
    }
    // Text with **bold** key words and _italic_ examples kept, wrapped by hand.
    rich(str, { size = 10.5, color = C.ink, indent = 0, gap = 1.6, bullet } = {}) {
      const d = this.doc;
      const runs = [];
      String(str || "")
        .replace(/_{3,}/g, "________")
        .split(/(\*\*.+?\*\*)/)
        .forEach((part) => {
          if (/^\*\*.+\*\*$/.test(part)) return runs.push({ t: part.slice(2, -2), b: true });
          part.split(/((?:^|(?<=[\s(]))_.+?_(?=[\s.,;:)!?]|$))/).forEach((q) => {
            if (/^_.+_$/.test(q)) runs.push({ t: q.slice(1, -1), i: true });
            else if (q) runs.push({ t: q });
          });
        });
      const words = [];
      runs.forEach((r) => clean(r.t).split(/(\s+)/).forEach((w) => w && words.push({ w, b: r.b, i: r.i })));
      const lh = size * 0.3528 * 1.38;
      const x0 = this.M + indent;
      const maxW = this.W - indent;
      let line = [], lw = 0;
      const width = (wd) => {
        this.font(size, wd.b, wd.i, color);
        return d.getTextWidth(wd.w);
      };
      const flush = (first) => {
        while (line.length && /^\s+$/.test(line[line.length - 1].w)) line.pop();
        this.ensure(lh);
        if (first && bullet) {
          this.font(size, true, false, C.accent);
          d.text(bullet, x0 - 5, this.y + lh * 0.78);
        }
        let x = x0;
        for (const wd of line) {
          this.font(size, wd.b, wd.i, wd.b ? C.accent : color);
          d.text(wd.w, x, this.y + lh * 0.78);
          x += d.getTextWidth(wd.w);
        }
        this.y += lh;
        line = [];
        lw = 0;
      };
      let first = true;
      for (const wd of words) {
        const ww = width(wd);
        if (lw + ww > maxW && line.length && !/^\s+$/.test(wd.w)) {
          flush(first);
          first = false;
        }
        if (!line.length && /^\s+$/.test(wd.w)) continue;
        line.push(wd);
        lw += ww;
      }
      if (line.length) flush(first);
      this.y += gap;
    }
    rule(color = C.line) {
      this.doc.setDrawColor(...color);
      this.doc.setLineWidth(0.3);
      this.doc.line(this.M, this.y, this.M + this.W, this.y);
      this.y += 3;
    }
    // Boards are drawn 152 mm wide, centred, so two steps fit on a page.
    image(url) {
      const w = 152, h = (w * 600) / 960, x = this.M + (this.W - w) / 2;
      this.ensure(h + 3);
      this.doc.addImage(url, "JPEG", x, this.y, w, h, undefined, "FAST");
      this.doc.setDrawColor(...C.line);
      this.doc.setLineWidth(0.3);
      this.doc.roundedRect(x, this.y, w, h, 2, 2);
      this.y += h + 3;
    }
    mark(level, title) {
      this.toc.push({ level, title: clean(title), page: this.pageNo() });
    }

    /* chapters */
    cover(plan, contents) {
      const d = this.doc;
      d.setFillColor(...C.accent);
      d.rect(0, 0, 210, 92, "F");
      this.font(11, true, false, [255, 255, 255]);
      d.text("CONJUNCTIONS LAB  ·  CSS ENGLISH PRECIS AND COMPOSITION", this.M, 22);
      this.font(30, true, false, [255, 255, 255]);
      d.text(d.splitTextToSize(clean(plan.title), this.W), this.M, 44);
      this.font(12, false, false, [225, 233, 245]);
      d.text(d.splitTextToSize(clean(plan.subtitle || ""), this.W), this.M, 76);
      this.y = 106;
      if (plan.intro) plan.intro(this, clean);
      if (contents) {
        this.text("What is inside", { size: 13, bold: true, gap: 1.5 });
        contents.forEach((c) => this.text(`•  ${c}`, { indent: 3, gap: 0.6 }));
        this.y += 3;
      }
      this.text("How to use these notes: read each step's explanation under its board, try the test questions before you look at the answer key at the end, and use the contents pages to find any preposition.", { size: 9.5, color: C.muted });
    }
    reserveToc(n) {
      this.tocStart = this.pageNo() + 1;
      this.tocPages = Math.max(1, Math.ceil(n / 42));
      for (let i = 0; i < this.tocPages; i++) {
        this.doc.addPage();
        this.noHeader[this.pageNo()] = true;
      }
    }
    writeToc() {
      if (!this.tocStart) return;
      const d = this.doc;
      let p = this.tocStart;
      d.setPage(p);
      let y = this.M;
      this.font(20, true, false, C.accent);
      d.text("Contents", this.M, y + 8);
      y += 18;
      for (const e of this.toc) {
        if (y > this.H - this.M - 10) {
          if (p >= this.tocStart + this.tocPages - 1) break;
          p++;
          d.setPage(p);
          y = this.M + 4;
        }
        const ind = [0, 5, 10][e.level] || 10;
        const size = [11.5, 10, 9.5][e.level] || 9.5;
        this.font(size, e.level < 2, false, e.level === 0 ? C.accent : e.level === 1 ? C.green : C.ink);
        const t = d.splitTextToSize(e.title, this.W - ind - 16)[0];
        d.text(t, this.M + ind, y);
        d.text(String(e.page), this.M + this.W, y, { align: "right" });
        d.link(this.M, y - 4, this.W, 5.5, { pageNumber: e.page });
        y += e.level === 0 ? 8 : 6;
      }
    }
    phasePage(ph, colour) {
      this.running = ph.title;
      this.doc.addPage();
      this.noHeader[this.pageNo()] = true;
      const d = this.doc;
      d.setFillColor(...colour);
      d.rect(0, 0, 210, 120, "F");
      const [num, name] = ph.title.includes(":") ? [ph.title.split(":")[0], ph.title.split(":").slice(1).join(":").trim()] : ["", ph.title];
      this.font(14, true, false, [255, 255, 255]);
      if (num) d.text(clean(num.toUpperCase()), this.M, 50);
      this.font(30, true, false, [255, 255, 255]);
      d.text(d.splitTextToSize(clean(name), this.W), this.M, 68);
      this.y = 134;
      this.mark(0, ph.title);
      this.text(ph.intro || "", { size: 12, gap: 6 });
      this.text("Parts in this phase", { size: 13, bold: true, gap: 2 });
      ph.units.forEach((u, i) => {
        const n = u.lessons.filter((x) => x.lessonId && P.lessons[x.lessonId]).length;
        if (n) this.text(`${i + 1}.  ${u.title}  (${n} ${n === 1 ? "lesson" : "lessons"})`, { indent: 3, gap: 1 });
      });
    }
    lessonPage(lesson, unitTitle, newUnit, colour) {
      this.page();
      const d = this.doc;
      if (newUnit && unitTitle) {
        this.mark(1, unitTitle);
        this.font(9, true, false, colour);
        d.text(clean(unitTitle.toUpperCase()), this.M, this.y + 3);
        this.y += 7;
      }
      this.mark(2, lesson.title);
      d.setFillColor(...colour);
      d.rect(this.M, this.y, 2.2, 12, "F");
      this.font(17, true, false, C.ink);
      const lines = d.splitTextToSize(clean(lesson.title), this.W - 6);
      d.text(lines, this.M + 5, this.y + 6.5);
      this.y += 6.5 * lines.length + 6;
      const n = lesson.steps.length;
      this.text(`${lesson.level || ""}  ·  about ${lesson.minutes || n * 2} minutes  ·  ${n} steps`, { size: 9, color: C.muted, gap: 3 });
      if (lesson.summary) {
        const top = this.y;
        this.y += 3;
        this.text(lesson.summary, { size: 10, indent: 4, width: this.W - 4, gap: 1 });
        if ((lesson.objectives || []).length) {
          this.text("You will learn:", { size: 10, bold: true, indent: 4, gap: 0.5 });
          lesson.objectives.forEach((o) => this.text(`•  ${o}`, { size: 9.5, indent: 7, width: this.W - 4, gap: 0.3 }));
        }
        this.y += 2;
        d.setDrawColor(...C.line);
        d.setLineWidth(0.3);
        if (this.pageNo() === this.heads.__last || true) d.roundedRect(this.M, top, this.W, this.y - top, 2, 2);
        this.y += 5;
      }
    }
    stepHeading(i, n, title, colour) {
      const d = this.doc;
      d.setFillColor(...colour);
      d.circle(this.M + 3.6, this.y + 3.4, 3.6, "F");
      this.font(9, true, false, [255, 255, 255]);
      d.text(String(i), this.M + 3.6, this.y + 4.6, { align: "center" });
      this.font(12, true, false, C.ink);
      d.text(d.splitTextToSize(clean(title), this.W - 40)[0], this.M + 10, this.y + 4.8);
      this.font(8.5, false, false, C.muted);
      d.text(`step ${i} of ${n}`, this.M + this.W, this.y + 4.8, { align: "right" });
      this.y += 10;
    }

    check(c, where) {
      const n = this.answers.length + 1;
      this.ensure(30);
      this.y += 1;
      const top = this.y;
      this.text(`Test yourself  ·  Q${n}`, { size: 9, bold: true, color: C.green, gap: 1, indent: 3 });
      this.text(c.prompt, { size: 10.5, bold: true, indent: 3 });
      c.options.forEach((o, i) => this.text(`[   ]  ${"ABCDEFG"[i]}.  ${o.text}`, { indent: 6, gap: 0.8 }));
      if (c.source === "past-paper") this.text(`CSS past paper${c.year ? " " + c.year : " (2016 onward)"}${c.question ? ", " + c.question : ""}`, { size: 8.5, color: C.muted, italic: true, indent: 3 });
      this.doc.setDrawColor(...C.green);
      this.doc.setLineWidth(0.6);
      this.doc.line(this.M, Math.min(top, this.y), this.M, this.y);
      this.y += 2;
      const right = c.options.findIndex((o) => o.correct);
      this.answers.push({ n, where, letter: "ABCDEFG"[right], text: right >= 0 ? c.options[right].text : "", why: right >= 0 ? c.options[right].why : "" });
    }
    answerKey() {
      if (!this.answers.length) return;
      this.running = "Answer key";
      this.page();
      this.mark(0, "Answer key");
      this.text("Answer key", { size: 20, bold: true, color: C.accent, gap: 1 });
      this.text("Cover this page while you attempt the questions.", { size: 9.5, color: C.muted, gap: 4 });
      let group = null;
      for (const a of this.answers) {
        const g = a.where.replace(/, step \d+$/, "");
        if (g !== group) {
          group = g;
          this.ensure(16);
          this.y += 1;
          this.text(g, { size: 10.5, bold: true, color: C.green, gap: 1.5 });
        }
        this.ensure(12);
        this.text(`Q${a.n}.  ${a.letter}:  ${a.text}`, { bold: true, gap: 0.5, indent: 2 });
        if (a.why) this.rich(a.why, { size: 9.5, color: C.muted, indent: 7, gap: 2 });
      }
    }
    footer() {
      const d = this.doc;
      const n = d.getNumberOfPages();
      for (let i = 1; i <= n; i++) {
        d.setPage(i);
        if (!this.noHeader[i] && this.heads[i]) {
          this.font(8, false, false, C.muted);
          d.text(d.splitTextToSize(clean(this.heads[i]), this.W)[0], this.M, this.M + 1);
          d.setDrawColor(...C.line);
          d.setLineWidth(0.2);
          d.line(this.M, this.M + 3, this.M + this.W, this.M + 3);
        }
        if (i === 1) continue;
        this.font(8, false, false, C.muted);
        d.text(clean(`Conjunctions Lab  ·  ${this.title}`), this.M, this.H - 8);
        d.text(`${i} / ${n}`, this.M + this.W, this.H - 8, { align: "right" });
      }
    }
    outline() {
      const o = this.doc.outline;
      if (!o || !o.add) return;
      let p0 = null, p1 = null;
      for (const e of this.toc) {
        if (e.level === 0) p1 = p0 = o.add(null, e.title, { pageNumber: e.page });
        else if (e.level === 1) p1 = o.add(p0, e.title, { pageNumber: e.page });
        else o.add(p1 || p0, e.title, { pageNumber: e.page });
      }
    }
  }

  /* ---------- building a PDF from a list of boards ---------- */

  const PH_RGB = [[36, 87, 197], [13, 138, 122], [194, 65, 12], [124, 58, 237], [21, 128, 61], [190, 24, 93]];

  // Where each lesson sits in the course: its phase (with its colour) and its part.
  function placeOf() {
    const out = {};
    P.curriculum.phases.forEach((ph, pi) =>
      ph.units.forEach((u) => u.lessons.forEach((x) => x.lessonId && (out[x.lessonId] = { ph, u, colour: PH_RGB[pi % PH_RGB.length] })))
    );
    return out;
  }

  // plan: { title, file, intro(notes), items: [{ l: lessonId, s: stepId, label }], chapters? }
  async function make(plan, progress) {
    await ready();
    if (document.fonts && document.fonts.load) await Promise.all([document.fonts.load('400 38px "Kalam"'), document.fonts.load('700 38px "Kalam"')]).catch(() => {});
    const style = boardStyle();
    const notes = new Notes(plan.title);
    const items = plan.items.filter((it) => P.lessons[it.l] && P.lessons[it.l].steps.some((s) => s.id === it.s));
    const where = placeOf();
    const lessonIds = [...new Set(items.map((it) => it.l))];
    const chapters = plan.chapters && lessonIds.length > 1;
    const quality = plan.compact ? { w: 1120, h: 700, quality: 0.68 } : undefined;

    if (chapters) {
      const phases = [...new Set(lessonIds.map((id) => where[id] && where[id].ph))].filter(Boolean);
      notes.cover(plan, plan.contents);
      const units = new Set(lessonIds.map((id) => where[id] && where[id].u));
      notes.reserveToc(lessonIds.length + units.size + phases.length + 1);
    } else {
      notes.text(plan.title, { size: 22, bold: true, color: C.accent, gap: 1 });
      notes.text(plan.subtitle || "Notes from the Conjunctions Lab teaching board", { size: 10, color: C.muted, gap: 4 });
      if (plan.intro) plan.intro(notes, clean);
      notes.rule();
    }

    let open = null, label = null, prev = null, curPhase = null, curUnit = null;
    for (let k = 0; k < items.length; k++) {
      if (progress.cancelled) throw new Error("cancelled");
      const it = items[k];
      const lesson = P.lessons[it.l];
      const place = where[it.l] || { colour: C.accent };
      const colour = place.colour || C.accent;
      if (!plan.noImages && (!open || open.lesson !== lesson)) {
        if (open) open.board.done();
        open = { lesson, board: offscreenScene(lesson) };
      }
      const si = lesson.steps.findIndex((s) => s.id === it.s);
      const step = lesson.steps[si];
      const ownDrawing = (step.actions || []).length > 0;
      const followsOn = prev && prev.l === it.l && prev.si === si - 1;
      const drawNow = !plan.noImages && (ownDrawing || !followsOn);
      const need = drawNow ? 16 + (152 * 600) / 960 : 24;

      if (chapters) {
        if (place.ph && place.ph !== curPhase && plan.phasePages !== false) {
          curPhase = place.ph;
          curUnit = null;
          notes.phasePage(place.ph, colour);
        }
        if (!prev || prev.l !== it.l) {
          notes.running = `${place.ph ? place.ph.title + "  ·  " : ""}${lesson.title}`;
          const newUnit = place.u && place.u !== curUnit;
          curUnit = place.u || curUnit;
          notes.lessonPage(lesson, place.u && place.u.title, newUnit, colour);
        }
        notes.ensure(need);
        notes.stepHeading(si + 1, lesson.steps.length, step.title, colour);
      } else {
        if (it.label && it.label !== label) {
          label = it.label;
          notes.ensure(need + 10);
          notes.y += 2;
          notes.text(it.label, { size: 15, bold: true, color: C.accent, gap: 2 });
        }
        notes.ensure(need);
        notes.stepHeading(si + 1, lesson.steps.length, `${plan.showLesson ? lesson.title + "  ·  " : ""}${step.title}`, colour);
      }
      if (drawNow) {
        open.board.scene.render(si, open.board.scene.length(si));
        notes.image(await rasterize(open.board.svg, style, quality));
      }
      (step.say || []).forEach((line, j) => notes.rich(line.text, { indent: 6, gap: 1.4, bullet: `${j + 1}.` }));
      if (step.check) notes.check(step.check, `${lesson.title}, step ${si + 1}`);
      notes.y += 4;
      prev = { l: it.l, si };
      progress.tick(k + 1, items.length);
      if (plan.noImages && k % 40 === 0) await new Promise((r) => setTimeout(r));
    }
    if (open) open.board.done();
    notes.answerKey();
    notes.writeToc();
    notes.footer();
    notes.outline();
    return { blob: notes.doc.output("blob"), pages: notes.doc.getNumberOfPages() };
  }

  /* ---------- what each button turns into a PDF ---------- */

  const fileName = (s) => `Conjunctions-Lab-${String(s).replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "")}.pdf`;
  const lessonItems = (l, label) => l.steps.map((s) => ({ l: l.id, s: s.id, label }));
  function unitOf(id) {
    for (const ph of P.curriculum.phases) for (const u of ph.units) if (u.id === id) return { ph, u };
    return null;
  }

  // Every step of every built lesson in a phase (or in all phases), in course order.
  function phaseItems(ph, withPhase) {
    const out = [];
    const name = ph.title;
    for (const u of ph.units)
      for (const x of u.lessons) {
        const l = x.lessonId && P.lessons[x.lessonId];
        if (!l) continue;
        for (const st of l.steps) out.push({ l: l.id, s: st.id, label: l.title, phase: withPhase ? name : undefined });
      }
    return out;
  }

  const plans = {
    phase(id) {
      const ph = P.curriculum.phases.find((x) => x.id === id);
      if (!ph) return null;
      return {
        title: ph.title,
        subtitle: "Every board drawn step by step, with its explanation and tests",
        file: fileName(ph.title),
        chapters: true,
        items: phaseItems(ph, false),
        intro(n) {
          n.text(ph.intro, { size: 11, gap: 4 });
        },
        contents: ph.units.filter((u) => u.lessons.some((x) => x.lessonId && P.lessons[x.lessonId])).map((u) => u.title),
      };
    },
    // The whole course, sense atlas to the end: "boards" = every board drawn, as a book with chapters;
    // "text" = the same book without the pictures (small file).
    course(mode) {
      const text = mode === "text";
      const phases = P.curriculum.phases.filter((ph) => ph.units.some((u) => u.lessons.some((x) => x.lessonId && P.lessons[x.lessonId])));
      return {
        title: text ? "The whole course: text notes" : "The whole course",
        subtitle: text ? "Every explanation, example and test, from the first lesson to the last, without the board pictures" : "Every board drawn step by step, with its explanation and tests, from the first lesson to the last",
        file: fileName(text ? "whole-course-text-notes" : "whole-course"),
        chapters: true,
        noImages: text,
        compact: !text,
        items: phases.flatMap((ph) => phaseItems(ph, false)),
        contents: phases.map((ph) => {
          const k = ph.units.reduce((a, u) => a + u.lessons.filter((x) => x.lessonId && P.lessons[x.lessonId]).length, 0);
          return `${ph.title}  (${k} lessons)`;
        }),
      };
    },
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
        chapters: true,
        phasePages: false,
        items: lessons.flatMap((l) => lessonItems(l, l.title)),
        intro(n) {
          n.text("Lessons in this part:", { bold: true, gap: 1 });
          lessons.forEach((l, i) => n.text(`${i + 1}.  ${l.title}`, { indent: 3, gap: 0.6 }));
          n.y += 3;
        },
      };
    },
    prep(arg) {
      const m = /^(.+?)(?::(\d+|other))?$/.exec(arg);
      const prep = m[1];
      const plan = P.prepbook && P.prepbook.plan(prep);
      if (!plan) return null;
      if (m[2] !== undefined) {
        // One sense: its picture, its boards, each word with its meanings and why.
        const k = m[2];
        const s = k === "other" ? { name: "Other uses", note: "words whose sense is their own", words: plan.rest } : plan.senses[Number(k)];
        if (!s) return null;
        const title = `${prep}: ${s.name}`;
        return {
          title,
          subtitle: k === "other" ? `Other uses of ${prep}` : `Sense ${Number(k) + 1} of ${plan.senses.length} that ${prep} can convey`,
          file: fileName(`notes-${prep}-${s.name}`),
          showLesson: true,
          items: plan.senseItems(k).map((x) => ({ ...x, label: null })),
          intro(n) {
            n.text(s.note, { color: C.muted, gap: 2 });
            s.words.forEach((w) => n.text(`${w.word} ${prep}: ${w.meaning}.  ${w.example}`, { size: 9.5, indent: 3, gap: 0.3 }));
            (s.phrases || []).forEach((x) => n.text(`${x.phrase}: ${x.meaning}.  ${x.example}`, { size: 9.5, indent: 3, gap: 0.3 }));
            n.y += 3;
          },
        };
      }
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
            (s.phrases || []).forEach((x) => n.text(`${x.phrase}: ${x.meaning}.  ${x.example}`, { size: 9.5, indent: 6, gap: 0.3 }));
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
    context(id) {
      const ch = P.contextPage && P.contextPage.find(id);
      if (!ch) return null;
      return {
        title: ch.title,
        subtitle: `${ch.section}. Every board of this chapter, drawn step by step, with its explanation and tests`,
        file: fileName(`context-${ch.title}`),
        chapters: true,
        phasePages: false,
        items: P.contextPage.items(id),
        intro(n) {
          n.text(ch.intro, { size: 11, gap: 3 });
          n.text("Quick reference", { size: 13, bold: true, gap: 1.5 });
          (ch.table || []).forEach((r) => n.text(`${r[0]}: ${r[1]}.  ${r[2]}`, { size: 9.5, indent: 3, gap: 0.4 }));
          n.y += 3;
        },
      };
    },
    atlas(lessonId) {
      if (!P.atlasPage) return null;
      const it = lessonId && (P.atlas || []).flatMap((u) => u.items).find((x) => x.lesson === lessonId);
      const list = P.atlasPage.items(lessonId || null);
      if (lessonId && !it) return null;
      return {
        title: it ? `${it.title}: the senses` : "The sense atlas",
        subtitle: "Every sense drawn as its logic, explained simply, with what it is confused with",
        file: fileName(it ? `atlas-${it.title}` : "sense-atlas"),
        chapters: true,
        phasePages: false,
        items: list,
        intro(n) {
          // A one-page summary first: each preposition and its senses, then the pairs.
          for (const u of P.atlas || []) {
            const xs = u.items.filter((x) => !lessonId || x.lesson === lessonId);
            if (!xs.length) continue;
            if (!lessonId) n.text(u.title, { size: 14, bold: true, color: C.accent, gap: 1 });
            for (const x of xs) {
              if (x.kind === "pair") {
                n.text(x.title, { bold: true, gap: 0.3 });
                x.rules.forEach((r) => n.text(r, { size: 9.5, indent: 4, gap: 0.3 }));
              } else {
                n.text(`${x.title}: ${x.core}`, { bold: true, gap: 0.3 });
                x.senses.forEach((s, i) => n.text(`${i + 1}. ${s.prep} = ${s.name}. ${s.examples[0]}${s.vs ? `  (not ${s.vs[0]}: ${s.vs[1]})` : ""}`, { size: 9.5, indent: 4, gap: 0.3 }));
              }
              n.y += 1.5;
            }
          }
          n.y += 2;
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

  async function save(blob, name) {
    // Inside the Claude app the page may not download directly; its downloads capability asks the viewer instead.
    try {
      if (window.claude && window.claude.use) {
        const d = await window.claude.use("downloads");
        if (d) { await d.save({ filename: name, data: blob }); return; }
      }
    } catch (e) {}
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
    if (!plan || (!plan.items.length && !plan.textOnly)) {
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
      <p>${esc(plan.title)}: ${out.pages} pages, ${mb} MB. ${plan.textOnly ? "Every entry, ready to read and share." : plan.noImages ? "Every explanation, example and test, with an answer key at the end." : "Boards, explanations, tests and an answer key at the end."}</p>
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
