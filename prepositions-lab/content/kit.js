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
  // Each row: [picSpec, text, { hl, hlStyle, hlInk, ink, size, sub }]; sub is a short meaning
  // written under the phrase. Pictures grow with the space between rows (up to 1.35 x).
  rows(prefix, rows, { y = 95, gap = 112, size = 32, k } = {}) {
    const kk = k ?? Math.max(1, Math.min(1.35, (gap - 12) / 80));
    const tx = Math.round(24 + 140 * kk + 22);
    const out = [];
    rows.forEach(([spec, text, o = {}], i) => {
      const id = `${prefix}${i + 1}`;
      const ry = y + i * gap;
      if (spec) out.push(...PLAB.kit.pic(`${id}p`, spec, 24, ry - 4 - 40 * kk, kk, { gap: i ? 350 : 400 }));
      out.push({ do: "write", id, text, x: tx, y: o.sub ? ry : ry + 10, size: o.size || size, ink: o.ink, gap: spec ? 150 : 350 });
      if (o.hl) out.push({ do: "highlight", id: `${id}-h`, target: id, word: o.hl, style: o.hlStyle, ink: o.hlInk });
      if (o.sub) out.push({ do: "write", id: `${id}s`, text: o.sub, x: tx, y: ry + 36, size: 22, ink: "muted", gap: 100 });
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

  // A grid of large pictures, each with a phrase and a short meaning under it: 2 columns for
  // up to 4 items, 3 columns for 5 or 6. Item ids match rows(), so say cues keep working.
  // Each item: [picSpec, text, sub, { hl, ink, size }].
  grid(prefix, items, { y = 34, size = 28 } = {}) {
    const cols = items.length > 4 ? 3 : 2;
    const centres = cols === 3 ? [165, 480, 795] : [250, 710];
    const k = cols === 3 ? 1.1 : 1.3;
    const fit = cols === 3 ? 290 : 430;
    const rowH = items.length > (cols === 3 ? 3 : 2) ? 278 : 0;
    const out = [];
    items.forEach(([spec, text, sub, o = {}], i) => {
      const id = `${prefix}${i + 1}`;
      const cx = centres[i % cols];
      const top = y + Math.floor(i / cols) * rowH;
      if (spec) out.push(...PLAB.kit.pic(`${id}p`, spec, cx - 70 * k, top, k, { gap: i ? 450 : 400 }));
      out.push({ do: "write", id, text, x: cx, y: top + 80 * k + 42, size: o.size || size, anchor: "middle", ink: o.ink, fit, gap: 200 });
      if (o.hl) out.push({ do: "highlight", id: `${id}-h`, target: id, word: o.hl, style: o.hlStyle, ink: o.hlInk });
      if (sub) out.push({ do: "write", id: `${id}s`, text: sub, x: cx, y: top + 80 * k + 80, size: 22, ink: "muted", anchor: "middle", fit });
    });
    return out;
  },

  // "Why this one and not the others?": a sentence with a gap, then every likely candidate with
  // a picture of what it would mean, a mark and a short reason ("|" breaks the line).
  // Each option: [picSpec, word, ok, reason]; for ok "diff" the reason is the other meaning.
  lineup(prefix, sentence, options, rules = [], source) {
    const n = options.length;
    const centres = n === 2 ? [250, 710] : n === 3 ? [165, 480, 795] : [120, 360, 600, 840];
    const fit = n === 4 ? 225 : 290;
    // A long sentence goes on two lines, broken at the space nearest the middle.
    const out = [];
    if (sentence.length > 50) {
      let cut = sentence.lastIndexOf(" ", Math.floor(sentence.length / 2));
      const after = sentence.indexOf(" ", Math.floor(sentence.length / 2));
      if (after > 0 && (cut < 0 || after - sentence.length / 2 < sentence.length / 2 - cut)) cut = after;
      out.push({ do: "write", id: `${prefix}-s`, text: sentence.slice(0, cut), x: 480, y: 40, size: 31, anchor: "middle" });
      out.push({ do: "write", id: `${prefix}-s2`, text: sentence.slice(cut + 1), x: 480, y: 80, size: 31, anchor: "middle", gap: 0 });
    } else {
      out.push({ do: "write", id: `${prefix}-s`, text: sentence, x: 480, y: 58, size: 36, anchor: "middle" });
    }
    options.forEach(([spec, word, ok, reason], i) => {
      const id = `${prefix}${i + 1}`;
      const cx = centres[i];
      out.push(...PLAB.kit.pic(`${id}p`, spec, cx - 63, 96, 0.9, { gap: i ? 450 : 500 }));
      // ok: true (fits), false (not used), or "diff" (correct English, but a different meaning).
      const mark = ok === "diff" ? "≈" : ok ? "✓" : "✗";
      const inkOf = ok === "diff" ? "accent" : ok ? "accent2" : "trouble";
      out.push({ do: "write", id, text: `${mark} ${word}`, x: cx, y: 222, size: 34, anchor: "middle", ink: inkOf, fit, gap: 150 });
      String(reason).split("|").forEach((line, j) => {
        out.push({ do: "write", id: `${id}s${j || ""}`, text: line.trim(), x: cx, y: 262 + j * 30, size: 22, ink: "muted", anchor: "middle", fit, gap: j ? 0 : 120 });
      });
    });
    if (options.some((o) => o[2] === "diff"))
      out.push({ do: "write", id: `${prefix}-key`, text: "✓ fits this sentence · ≈ correct English, different meaning · ✗ not used", x: 480, y: 345, size: 20, ink: "muted", anchor: "middle", gap: 300 });
    rules.forEach((r, i) => {
      out.push({ do: "write", id: `${prefix}-r${i + 1}`, text: r, x: 480, y: 400 + i * 56, size: 28, ink: "accent", anchor: "middle", gap: i ? 300 : 500 });
    });
    if (source) out.push({ do: "write", id: `${prefix}-src`, text: source, x: 480, y: 560, size: 22, ink: "accent2", anchor: "middle", gap: 200 });
    return out;
  },

  // "Why not the other one?": the right sentence with its picture, beside the swapped sentence
  // with a picture of what the swap would really mean, then a rule line for each choice.
  // right and wrong are panel items: [picSpec, text, sub, { hl, ink }].
  swap(prefix, right, wrong, rules = []) {
    const out = [
      { do: "write", id: `${prefix}-q`, text: "Why not the other one?", x: 480, y: 48, size: 28, ink: "muted", anchor: "middle" },
      { do: "draw", id: `${prefix}-bar`, shape: "line", from: [480, 80], to: [480, 320], ink: "muted", width: 2, dur: 500 },
      ...PLAB.kit.panels(prefix, [right, wrong], { y: 78, k: 1.5 }),
    ];
    rules.forEach((r, i) => {
      out.push({ do: "write", id: `${prefix}-r${i + 1}`, text: r, x: 480, y: 400 + i * 58, size: 28, ink: "accent2", anchor: "middle", gap: i ? 300 : 500 });
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
