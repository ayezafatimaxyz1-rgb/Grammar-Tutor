/* Small builders for common board layouts, so lesson files stay short.
   They return ordinary board actions; nothing here is special to the engine. */
PLAB.kit = {
  // Lines of centred text, top to bottom. Each item is a string or
  // [text, { ink, size, hl, hlStyle, hlInk }] where hl is a word to highlight.
  lines(prefix, items, { y = 140, gap = 85, size = 36, first = 400 } = {}) {
    const out = [];
    items.forEach((item, i) => {
      const [text, o = {}] = Array.isArray(item) ? item : [item];
      const id = `${prefix}${i + 1}`;
      out.push({ do: "write", id, text, x: 480, y: y + i * gap, size: o.size || size, anchor: "middle", ink: o.ink, gap: i ? 350 : first });
      if (o.hl) out.push({ do: "highlight", id: `${id}-h`, target: id, word: o.hl, style: o.hlStyle, ink: o.hlInk });
    });
    return out;
  },

  // Draw a picture made of icons (content/icons.js). spec is an icon name, or a list of
  // [name, dx, dy, scale?, ink?] placed inside the 140 x 80 cell. (x, y) is the cell's
  // top-left corner on the board and k scales the whole cell.
  pic(id, spec, x, y, k = 1, { gap = 300 } = {}) {
    const parts = typeof spec === "string" ? [[spec, 0, 0]] : spec;
    const out = [];
    parts.forEach(([name, dx = 0, dy = 0, s = 1, inkOver], i) => {
      const icon = PLAB.icons[name];
      if (!icon) throw new Error(`Unknown icon "${name}"`);
      icon.forEach((layer, j) => {
        const f = s * k;
        const ox = x + dx * k, oy = y + dy * k;
        out.push({
          do: "draw",
          id: `${id}-${i}-${j}`,
          shape: "group",
          parts: layer.shapes.map((sh) => PLAB.kit.place(sh, ox, oy, f)),
          ink: inkOver || layer.ink,
          fill: layer.fill,
          width: (layer.width || 3.2) * Math.min(1.2, Math.max(0.7, k)),
          dur: 650,
          ...(i || j ? { sync: true, offset: 120 * (i + j) } : { gap }),
        });
      });
    });
    return out;
  },

  place(sh, ox, oy, f) {
    const P = ([px, py]) => [ox + px * f, oy + py * f];
    const s = { ...sh };
    if ("x" in s) s.x = ox + s.x * f;
    if ("y" in s) s.y = oy + s.y * f;
    if ("w" in s) s.w *= f;
    if ("h" in s) s.h *= f;
    if ("cx" in s) [s.cx, s.cy] = P([s.cx, s.cy]);
    if ("r" in s) s.r *= f;
    if ("rx" in s) (s.rx *= f), (s.ry *= f);
    if (s.from) (s.from = P(s.from)), (s.to = P(s.to));
    if (s.bow) s.bow *= f;
    if (s.head) s.head *= f;
    if (s.scale) s.scale *= f;
    if (s.points) s.points = s.points.map(P);
    return s;
  },

  // Rows of "picture + phrase", for four or five related phrases.
  // Each row: [picSpec, text, { hl, hlStyle, hlInk, ink, size }].
  rows(prefix, rows, { y = 95, gap = 112, size = 32, k = 1 } = {}) {
    const out = [];
    rows.forEach(([spec, text, o = {}], i) => {
      const id = `${prefix}${i + 1}`;
      const ry = y + i * gap;
      if (spec) out.push(...PLAB.kit.pic(`${id}p`, spec, 24, ry - 44, k, { gap: i ? 350 : 400 }));
      out.push({ do: "write", id, text, x: 196, y: ry + 10, size: o.size || size, ink: o.ink, gap: spec ? 150 : 350 });
      if (o.hl) out.push({ do: "highlight", id: `${id}-h`, target: id, word: o.hl, style: o.hlStyle, ink: o.hlInk });
    });
    return out;
  },

  // Two or three large pictures side by side, each with a phrase and a short meaning.
  // Each item: [picSpec, text, sub, { hl }].
  panels(prefix, items, { y = 60, k = 1.8, size = 30 } = {}) {
    const n = items.length;
    const centres = n === 1 ? [480] : n === 2 ? [250, 710] : [165, 480, 795];
    const out = [];
    items.forEach(([spec, text, sub, o = {}], i) => {
      const id = `${prefix}${i + 1}`;
      const cx = centres[i];
      out.push(...PLAB.kit.pic(`${id}p`, spec, cx - 70 * k, y, k, { gap: i ? 500 : 400 }));
      const fit = n === 3 ? 290 : n === 2 ? 430 : 880;
      out.push({ do: "write", id, text, x: cx, y: y + 80 * k + 55, size: o.size || size, anchor: "middle", ink: o.ink, fit, gap: 200 });
      if (o.hl) out.push({ do: "highlight", id: `${id}-h`, target: id, word: o.hl, style: o.hlStyle, ink: o.hlInk });
      if (sub) out.push({ do: "write", id: `${id}s`, text: sub, x: cx, y: y + 80 * k + 100, size: 24, ink: "muted", anchor: "middle", fit });
    });
    return out;
  },

  clear(id) {
    return { do: "erase", id, targets: "all" };
  },

  // A horizontal time line with an optional "now" marker on the right.
  timeline(id, { y = 220, now = true } = {}) {
    const acts = [{ do: "draw", id, shape: "arrow", from: [70, y], to: [890, y], dur: 1000 }];
    if (now) {
      acts.push({ do: "draw", id: `${id}-now`, shape: "circle", cx: 780, cy: y, r: 11, ink: "accent", fill: "solid", dur: 400 });
      acts.push({ do: "write", id: `${id}-now-l`, text: "now", x: 780, y: y + 50, size: 28, ink: "accent", anchor: "middle" });
    }
    return acts;
  },
};
