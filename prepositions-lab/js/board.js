/* The teaching board.
   A Scene turns a lesson's steps into SVG elements once, then render(step, t) shows the
   board exactly as it looks at time t (milliseconds) inside that step: earlier steps are
   complete, later steps are not drawn yet. Because every frame is computed from (step, t),
   pause, replay, scrubbing and moving backwards all come for free. */
(function () {
  const P = (window.PLAB = window.PLAB || {});
  const NS = "http://www.w3.org/2000/svg";

  const DURATION = { draw: 1100, write: 1500, highlight: 650, move: 1200, erase: 500, wait: 700 };
  const GAP = 260;
  const FILL = { soft: 0.14, solid: 0.9 };

  const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

  function make(name, attrs, parent) {
    const node = document.createElementNS(NS, name);
    for (const k in attrs) node.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(node);
    return node;
  }

  function ink(name) {
    return `var(--ink-${name || "main"})`;
  }

  class Scene {
    constructor(svg, root, steps, key) {
      this.svg = svg;
      this.root = root;
      this.steps = steps;
      this.key = key;
      this.items = new Map();
      this.timed = [];
      this.stepLength = [];
      this.defs = svg.querySelector("defs") || make("defs", {}, svg);
      this.under = make("g", { class: "layer-under" }, root);
      this.main = make("g", { class: "layer-main" }, root);
      this.build();
    }

    build() {
      // Which words of which sentence get highlighted later, so the sentence can be split around them.
      const keyWords = new Map();
      this.steps.forEach((step) =>
        (step.actions || []).forEach((a) => {
          if (a.do === "highlight") {
            if (!keyWords.has(a.target)) keyWords.set(a.target, []);
            keyWords.get(a.target).push(a);
          }
        })
      );

      this.steps.forEach((step, s) => {
        let t = 0;
        let lastStart = 0;
        (step.actions || []).forEach((a, i) => {
          const dur = a.dur ?? DURATION[a.do];
          if (dur === undefined) throw new Error(`Unknown board action "${a.do}"`);
          const start = a.sync ? lastStart + (a.offset || 0) : t + (a.gap ?? (i === 0 ? 150 : GAP));
          lastStart = start;
          t = Math.max(t, start + dur);
          const entry = { a, s, start, dur };
          if (a.do === "draw") this.makeDrawing(a);
          if (a.do === "write") this.makeText(a, keyWords.get(a.id) || []);
          if (a.do === "highlight") this.makeHighlight(a);
          if (a.do === "erase") {
            entry.targets = a.targets === "all" ? [...this.items.keys()] : a.targets;
            entry.targets = entry.targets.flatMap((id) => [id, ...((this.items.get(id) || {}).dependents || [])]);
          }
          this.timed.push(entry);
        });
        this.stepLength[s] = t + 250;
      });
    }

    addItem(id, item) {
      if (this.items.has(id)) throw new Error(`Board item "${id}" is defined twice`);
      item.id = id;
      item.dependents = [];
      this.items.set(id, item);
      return item;
    }

    makeStrokes(g, strokes, a) {
      return strokes.map((d) => {
        const path = make(
          "path",
          {
            d,
            fill: "none",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            style: `stroke:${ink(a.ink)};stroke-width:${a.width || 3.6}`,
          },
          g
        );
        const len = path.getTotalLength() || 1;
        path.style.strokeDasharray = `${len} ${len}`;
        path.style.strokeDashoffset = len;
        path.style.visibility = "hidden";
        return { path, len };
      });
    }

    makeDrawing(a) {
      const g = make("g", { class: "board-item", "data-id": a.id }, this.main);
      const strokes = P.sketch.strokes(a, `${this.key}:${a.id}`);
      let fill = null;
      if (a.fill) {
        fill = make("path", { d: strokes[0], style: `fill:${ink(a.fillInk || a.ink)};stroke:none`, opacity: 0 }, g);
      }
      const parts = this.makeStrokes(g, strokes, a);
      return this.addItem(a.id, { kind: "draw", g, parts, fill, fillTo: FILL[a.fill] ?? 0, total: parts.reduce((n, p) => n + p.len, 0) });
    }

    makeText(a, highlights) {
      const g = make("g", { class: "board-item", "data-id": a.id }, this.main);
      const text = make(
        "text",
        {
          x: a.x,
          y: a.y,
          class: `board-text${a.style ? " board-text--" + a.style : ""}`,
          "text-anchor": a.anchor || "start",
          style: `fill:${ink(a.ink)};font-size:${a.size || 38}px`,
        },
        g
      );
      // Split the sentence so each highlighted word sits in its own tspan.
      const marks = highlights
        .map((h) => {
          const at = findWord(a.text, h.word, h.nth || 1);
          if (at < 0) throw new Error(`"${h.word}" is not in "${a.text}"`);
          return { h, at, end: at + h.word.length };
        })
        .sort((m, n) => m.at - n.at);
      let pos = 0;
      for (const m of marks) {
        if (m.at > pos) text.appendChild(document.createTextNode(a.text.slice(pos, m.at)));
        m.tspan = make("tspan", { class: "board-key" }, text);
        m.tspan.textContent = a.text.slice(m.at, m.end);
        pos = m.end;
      }
      if (pos < a.text.length) text.appendChild(document.createTextNode(a.text.slice(pos)));

      const box = text.getBBox();
      const clipId = `${this.key}-${a.id}-clip`.replace(/[^\w-]/g, "_");
      const clip = make("clipPath", { id: clipId, clipPathUnits: "userSpaceOnUse" }, this.defs);
      const rect = make("rect", { x: box.x - 6, y: box.y - 10, width: 0, height: box.height + 20 }, clip);
      text.setAttribute("clip-path", `url(#${clipId})`);
      g.style.visibility = "hidden";
      return this.addItem(a.id, { kind: "write", g, text, rect, box, marks });
    }

    makeHighlight(a) {
      const target = this.items.get(a.target);
      if (!target || target.kind !== "write") throw new Error(`Highlight target "${a.target}" must be written first`);
      const mark = target.marks.find((m) => m.h === a);
      const t = target.text;
      const x1 = t.getStartPositionOfChar(mark.at).x;
      const x2 = t.getEndPositionOfChar(mark.end - 1).x;
      const b = target.box;
      const g = make("g", { class: "board-item", "data-id": a.id }, this.under);
      let shape;
      if (a.style === "ring") {
        g.parentNode.removeChild(g);
        this.main.appendChild(g);
        shape = { shape: "ellipse", cx: (x1 + x2) / 2, cy: b.y + b.height * 0.55, rx: (x2 - x1) / 2 + 16, ry: b.height * 0.62, ink: a.ink || "accent", width: 3 };
      } else if (a.style === "underline") {
        g.parentNode.removeChild(g);
        this.main.appendChild(g);
        shape = { shape: "line", from: [x1 - 2, b.y + b.height * 0.98], to: [x2 + 2, b.y + b.height * 0.98], ink: a.ink || "accent", width: 3.4 };
      } else {
        shape = { shape: "swipe", x1: x1 - 6, x2: x2 + 6, y: b.y + b.height * 0.6, ink: a.ink || "hi", width: b.height * 0.62 };
      }
      const strokes = P.sketch.strokes(shape, `${this.key}:${a.id}`);
      const parts = this.makeStrokes(g, strokes, shape);
      if (!a.style) g.setAttribute("class", "board-item board-swipe");
      target.dependents.push(a.id);
      return this.addItem(a.id, { kind: "highlight", g, parts, total: parts.reduce((n, p) => n + p.len, 0), tspan: mark.tspan, keyClass: `is-key-${a.ink || "accent"}` });
    }

    destroy() {
      this.root.textContent = "";
      for (const item of this.items.values()) if (item.rect) item.rect.parentNode.remove();
      this.items.clear();
    }

    length(step) {
      return this.stepLength[step] || 0;
    }

    // When does a board action start inside its step? Used to sync the written explanation.
    startOf(step, id) {
      const e = this.timed.find((x) => x.s === step && x.a.id === id);
      return e ? e.start : 0;
    }

    render(step, t) {
      for (const item of this.items.values()) {
        item.p = 0;
        item.dx = 0;
        item.dy = 0;
        item.opacity = 1;
      }
      for (const e of this.timed) {
        const p = e.s < step ? 1 : e.s > step ? 0 : clamp((t - e.start) / e.dur);
        const a = e.a;
        if (a.do === "draw" || a.do === "write" || a.do === "highlight") {
          this.items.get(a.id).p = p;
        } else if (a.do === "move") {
          const item = this.items.get(a.target);
          const k = ease(p);
          item.dx += a.by[0] * k;
          item.dy += a.by[1] * k - (a.arc || 0) * Math.sin(Math.PI * k);
        } else if (a.do === "erase") {
          for (const id of e.targets) this.items.get(id).opacity *= 1 - p;
        }
      }
      for (const item of this.items.values()) paint(item);
    }
  }

  function paint(item) {
    const shown = item.p > 0 && item.opacity > 0.001;
    item.g.style.visibility = shown ? "visible" : "hidden";
    item.g.style.opacity = item.opacity < 1 ? item.opacity.toFixed(3) : "";
    item.g.setAttribute("transform", item.dx || item.dy ? `translate(${item.dx.toFixed(1)} ${item.dy.toFixed(1)})` : "");
    if (item.kind === "write") {
      item.rect.setAttribute("width", ((item.box.width + 12) * item.p).toFixed(1));
      return;
    }
    let left = ease(item.p) * item.total;
    for (const part of item.parts) {
      const drawn = Math.max(0, Math.min(part.len, left));
      left -= part.len;
      part.path.style.strokeDashoffset = (part.len - drawn).toFixed(1);
      part.path.style.visibility = drawn > 0.5 ? "visible" : "hidden";
    }
    if (item.fill) item.fill.setAttribute("opacity", (item.fillTo * clamp((item.p - 0.8) / 0.2)).toFixed(3));
    if (item.kind === "highlight" && item.tspan) item.tspan.classList.toggle(item.keyClass, item.p > 0.35 && item.opacity > 0.001);
  }

  function findWord(text, word, nth) {
    const re = new RegExp(`(^|[^A-Za-z])(${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})(?![A-Za-z])`, "g");
    let m, n = 0;
    while ((m = re.exec(text))) {
      n++;
      if (n === nth) return m.index + m[1].length;
    }
    return -1;
  }

  P.Scene = Scene;
  P.boardActions = Object.keys(DURATION);
})();
