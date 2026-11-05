/* Hand-drawn shape generator.
   Every shape comes back as a list of SVG path strings ("strokes"). The board draws the
   strokes one after another, so a rectangle is drawn side by side, the way a teacher
   draws it with a marker. A seeded random wobble keeps each drawing identical on replay. */
(function () {
  const P = (window.PLAB = window.PLAB || {});

  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function rng(seed) {
    let s = seed >>> 0 || 1;
    return () => {
      s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  const f = (n) => Math.round(n * 10) / 10;

  // Catmull-Rom through the points, written as cubic Bezier segments.
  function smooth(pts, closed) {
    if (pts.length < 2) return "";
    const p = closed ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]];
    let d = `M${f(p[1][0])},${f(p[1][1])}`;
    for (let i = 1; i < p.length - 2; i++) {
      const [x0, y0] = p[i - 1], [x1, y1] = p[i], [x2, y2] = p[i + 1], [x3, y3] = p[i + 2];
      d += ` C${f(x1 + (x2 - x0) / 6)},${f(y1 + (y2 - y0) / 6)} ${f(x2 - (x3 - x1) / 6)},${f(y2 - (y3 - y1) / 6)} ${f(x2)},${f(y2)}`;
    }
    return d;
  }

  // A slightly wavering line with a small overshoot at both ends.
  function wobblyLine(x1, y1, x2, y2, r, wob = 1.5, bow = 0) {
    const len = Math.hypot(x2 - x1, y2 - y1) || 1;
    const ux = (x2 - x1) / len, uy = (y2 - y1) / len;
    const nx = -uy, ny = ux;
    const over = Math.min(6, len * 0.04);
    const n = Math.max(3, Math.round(len / 55));
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const along = -over * (1 - t) * (r() * 0.8) + t * len + over * t * (r() * 0.6);
      const side = (r() - 0.5) * 2 * wob + Math.sin(Math.PI * t) * bow;
      pts.push([x1 + ux * along + nx * side, y1 + uy * along + ny * side]);
    }
    return smooth(pts, false);
  }

  function ellipse(cx, cy, rx, ry, r, wob = 1.2) {
    const start = r() * Math.PI * 2;
    const sweep = Math.PI * 2 + 0.35 + r() * 0.25; // overlaps its own start, like a real pen
    const n = Math.max(10, Math.round((rx + ry) / 6));
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const a = start + (sweep * i) / n;
      const k = 1 + ((r() - 0.5) * 2 * wob) / Math.max(rx, ry) + (i / n) * 0.03;
      pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
    }
    return smooth(pts, false);
  }

  // A closed outline through rough points (city borders, clouds of trouble).
  function blob(points, r, wob = 2.5) {
    const pts = points.map(([x, y]) => [x + (r() - 0.5) * wob * 2, y + (r() - 0.5) * wob * 2]);
    return smooth(pts, true);
  }

  function rect(s, r) {
    const { x, y, w, h } = s;
    const wob = s.wobble ?? 1.6;
    return [
      wobblyLine(x, y, x + w, y, r, wob),
      wobblyLine(x + w, y, x + w, y + h, r, wob),
      wobblyLine(x + w, y + h, x, y + h, r, wob),
      wobblyLine(x, y + h, x, y, r, wob),
    ];
  }

  function arrow(s, r) {
    const [x1, y1] = s.from, [x2, y2] = s.to;
    const bow = s.bow || 0;
    const shaft = wobblyLine(x1, y1, x2, y2, r, 1, bow);
    const a = Math.atan2(y2 - y1, x2 - x1);
    const head = s.head || 16;
    const h1 = [x2 - head * Math.cos(a - 0.45), y2 - head * Math.sin(a - 0.45)];
    const h2 = [x2 - head * Math.cos(a + 0.45), y2 - head * Math.sin(a + 0.45)];
    return [shaft, wobblyLine(h1[0], h1[1], x2, y2, r, 0.6), wobblyLine(x2, y2, h2[0], h2[1], r, 0.6)];
  }

  function person(s, r) {
    const { x, y } = s; // x, y = top of the head
    const k = s.scale || 1;
    const hr = 13 * k;
    const neck = y + hr * 2;
    const hip = neck + 42 * k;
    return [
      ellipse(x, y + hr, hr, hr, r, 0.8),
      wobblyLine(x, neck, x, hip, r, 0.8),
      wobblyLine(x, neck + 12 * k, x - 20 * k, neck + 32 * k, r, 0.6),
      wobblyLine(x, neck + 12 * k, x + 20 * k, neck + 30 * k, r, 0.6),
      wobblyLine(x, hip, x - 15 * k, hip + 38 * k, r, 0.6),
      wobblyLine(x, hip, x + 16 * k, hip + 38 * k, r, 0.6),
    ];
  }

  // A highlighter swipe: two overlapping passes along a line.
  function swipe(s, r) {
    const { x1, x2, y } = s;
    return [wobblyLine(x1, y, x2, y + 1, r, 1.2)];
  }

  const BUILDERS = {
    rect,
    arrow,
    person,
    swipe,
    line: (s, r) => [wobblyLine(s.from[0], s.from[1], s.to[0], s.to[1], r, s.wobble ?? 1.4, s.bow || 0)],
    circle: (s, r) => [ellipse(s.cx, s.cy, s.r, s.r, r, s.wobble ?? 1)],
    ellipse: (s, r) => [ellipse(s.cx, s.cy, s.rx, s.ry, r, s.wobble ?? 1.2)],
    blob: (s, r) => [blob(s.points, r, s.wobble ?? 2.5)],
    // A shape made of several shapes, drawn in order.
    group: (s, r) => s.parts.flatMap((part) => build(part, r)),
  };

  function build(shape, r) {
    const fn = BUILDERS[shape.shape];
    if (!fn) throw new Error(`Unknown shape "${shape.shape}"`);
    return fn(shape, r);
  }

  // How many strokes each shape produces, so fills can be matched to their strokes.
  const STROKES = { rect: 4, arrow: 3, person: 6, swipe: 1, line: 1, circle: 1, ellipse: 1, blob: 1 };
  const CLOSED = { circle: 1, ellipse: 1, blob: 1 };

  // Closed outlines to fill: a rectangle's exact box, or a closed shape's own stroke.
  function fills(shape, strokes) {
    const out = [];
    let i = 0;
    for (const part of shape.shape === "group" ? shape.parts : [shape]) {
      if (part.shape === "rect") out.push(`M${part.x},${part.y}h${part.w}v${part.h}h${-part.w}Z`);
      else if (CLOSED[part.shape]) out.push(strokes[i]);
      i += STROKES[part.shape] || 0;
    }
    return out;
  }

  P.sketch = {
    fills,
    shapes: Object.keys(BUILDERS),
    strokes(shape, seedKey) {
      return build(shape, rng(hash(seedKey)));
    },
  };
})();
