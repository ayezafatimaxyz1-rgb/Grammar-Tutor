/* Board sketches for Phase 2 (fixed combinations). Same 140 x 80 cell and layers as icons.js. */
(function () {
  const R = (x, y, w, h) => ({ shape: "rect", x, y, w, h });
  const C = (cx, cy, r) => ({ shape: "circle", cx, cy, r });
  const E = (cx, cy, rx, ry) => ({ shape: "ellipse", cx, cy, rx, ry });
  const L = (x1, y1, x2, y2, bow = 0) => ({ shape: "line", from: [x1, y1], to: [x2, y2], bow, wobble: 0.6 });
  const A = (x1, y1, x2, y2, bow = 0) => ({ shape: "arrow", from: [x1, y1], to: [x2, y2], bow, head: 11 });
  const P = (x, y, scale = 0.6) => ({ shape: "person", x, y, scale });
  const B = (points) => ({ shape: "blob", points, wobble: 1 });
  const poly = (pts) => pts.slice(1).map((p, i) => L(pts[i][0], pts[i][1], p[0], p[1]));
  const lay = (shapes, ink = "main", extra = {}) => ({ ink, shapes, ...extra });
  const heart = (cx, cy, k) => B([[0, 22], [-20, 4], [-18, -10], [-8, -13], [0, -4], [8, -13], [18, -10], [20, 4]].map(([x, y]) => [cx + x * k, cy + y * k]));
  const tick = (x, y, k = 1) => [L(x, y, x + 8 * k, y + 9 * k), L(x + 8 * k, y + 9 * k, x + 24 * k, y - 10 * k)];
  const star = (cx, cy, r) => {
    const pts = [];
    for (let i = 0; i <= 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const k = i % 2 ? r * 0.45 : r;
      pts.push([cx + Math.cos(a) * k, cy + Math.sin(a) * k]);
    }
    return poly(pts);
  };

  Object.assign(PLAB.icons, {
    // ON: weight resting on a support, attention or pressure landing on a surface
    support: [lay([R(56, 40, 28, 38)], "muted", { fill: "soft" }), lay([R(38, 12, 64, 28)], "accent", { fill: "soft" }), lay([A(70, -6, 70, 10)], "trouble")],
    leanOn: [lay([R(92, 4, 18, 74)], "muted", { fill: "soft" }), lay([L(60, 30, 60, 56), C(60, 20, 9), L(60, 36, 90, 30), L(60, 56, 46, 78), L(60, 56, 72, 78)], "accent")],
    focusOn: [lay([L(8, 72, 132, 72)], "muted"), lay([C(70, 66, 5)], "trouble", { fill: "solid" }), lay([C(70, 22, 16), L(82, 10, 100, -4)], "accent", { width: 3.6 }), lay([L(62, 40, 67, 58), L(78, 40, 73, 58)], "accent2")],
    commentOn: [lay([E(42, 20, 34, 15), L(30, 33, 22, 44)], "accent2"), lay([A(70, 30, 92, 46, 8)], "accent"), lay([R(96, 36, 34, 42), L(102, 50, 124, 50), L(102, 60, 124, 60)], "muted")],
    pressOn: [lay([L(10, 72, 130, 72)], "muted"), lay([A(40, 6, 62, 58), A(70, 0, 70, 58), A(100, 6, 78, 58)], "trouble"), lay([C(70, 64, 6)], "accent", { fill: "solid" })],

    // IN: trust or effort placed inside something
    beliefIn: [lay([R(30, 6, 80, 68)], "muted"), lay([heart(70, 40, 1.1)], "trouble", { fill: "soft" })],
    believeWords: [lay([P(26, 14, 0.5)], "accent"), lay([E(90, 24, 34, 18), L(66, 34, 52, 42)], "accent2"), lay(tick(80, 24, 0.8), "accent", { width: 3.6 })],
    confideIn: [lay([R(10, 26, 36, 24), L(10, 26, 28, 40), L(28, 40, 46, 26)], "accent2"), lay([A(52, 38, 86, 38)], "accent"), lay([P(108, 8, 0.6)], "accent"), lay([E(108, 46, 18, 22)], "muted")],
    succeedIn: [lay([E(66, 48, 60, 28)], "muted", { fill: "soft" }), lay([P(54, 14, 0.45)], "accent"), lay([L(96, 64, 96, 22)]), lay([R(96, 22, 22, 13)], "trouble", { fill: "soft" })],
    persistIn: [lay([R(24, 6, 92, 68)], "muted"), lay([A(92, 52, 86, 24, 26), A(48, 28, 54, 56, 26)], "accent")],

    // apply: the letter goes TO the place, FOR the thing you want
    applyTo: [lay([P(14, 18, 0.42)], "accent"), lay([R(34, 34, 26, 18), L(34, 34, 47, 44), L(47, 44, 60, 34)], "accent2"), lay([A(64, 43, 90, 43)], "accent"), lay([R(96, 30, 38, 44), L(90, 31, 115, 12), L(115, 12, 140, 31)])],
    wantStar: [lay(star(70, 40, 30), "hi", { width: 4 })],
    coverGroup: [lay([R(54, 0, 32, 26), L(60, 9, 80, 9), L(60, 17, 80, 17)], "muted"), lay([A(60, 30, 26, 46), A(70, 30, 70, 46), A(80, 30, 114, 46)], "accent2"), lay([P(24, 50, 0.3), P(70, 50, 0.3), P(116, 50, 0.3)], "accent")],
    paintOn: [lay([R(80, 4, 52, 72)], "muted"), lay([L(18, 70, 66, 26)], "main", { width: 4 }), lay([R(60, 14, 18, 26)], "accent2", { fill: "solid" }), lay([L(88, 20, 88, 60), L(98, 16, 98, 64), L(108, 20, 108, 60)], "accent2", { width: 5 })],

    // agree with / on / to
    agreeWith: [lay([P(42, 26, 0.5), P(98, 26, 0.5)], "accent"), lay([E(70, 6, 34, 12), L(56, 16, 46, 24), L(84, 16, 94, 24)], "accent2"), lay(tick(62, 4, 0.6), "accent")],
    agreeOn: [lay([P(12, 18, 0.45), P(128, 18, 0.45)], "accent"), lay([A(28, 30, 62, 54), A(112, 30, 78, 54)], "accent2"), lay([C(70, 60, 8)], "trouble", { fill: "solid" })],
    agreeTo: [lay([P(16, 14, 0.5)], "accent"), lay([A(36, 40, 74, 40)], "accent2"), lay([R(80, 6, 44, 66), L(88, 18, 116, 18), L(88, 28, 116, 28)], "muted"), lay(tick(90, 50, 0.9), "accent", { width: 4 })],

    // arrive at a point, arrive at a conclusion
    conclusion: [lay([A(8, 10, 84, 38, -10), A(8, 40, 84, 40), A(8, 70, 84, 42, 10)], "muted"), lay([C(108, 40, 20)], "accent2"), lay(tick(98, 40, 0.8), "accent2", { width: 4 })],
    airportDot: [lay([L(6, 70, 134, 70)], "muted"), lay([A(10, 40, 92, 40)], "accent"), lay([R(98, 26, 34, 44)]), lay([C(115, 40, 5)], "trouble", { fill: "solid" })],

    // look into, look forward to
    lookInto: [lay([E(22, 40, 15, 9)]), lay([C(22, 40, 4)], "accent", { fill: "solid" }), lay([R(70, 12, 60, 56)], "muted", { fill: "soft" }), lay([A(40, 40, 108, 40)], "accent2")],
    lookAhead: [lay([A(4, 64, 136, 64)], "muted"), lay([C(28, 64, 6)], "accent", { fill: "solid" }), lay([E(28, 34, 12, 7), C(28, 34, 3)]), lay([A(44, 34, 108, 46, -14)], "accent2"), lay(star(116, 54, 12), "hi", { width: 3.4 })],
    searchQ: [lay([C(46, 34, 20), L(60, 48, 84, 72)], "accent", { width: 4 }), lay([L(98, 20, 104, 14, -6), L(104, 14, 116, 18, -4), L(116, 18, 112, 32), L(112, 32, 106, 40), L(106, 40, 106, 48)], "trouble"), lay([C(106, 60, 2.5)], "trouble", { fill: "solid" })],

    // verb + object + preposition
    congratulate: [lay([P(28, 10, 0.55), P(112, 10, 0.55)], "accent"), lay([L(40, 36, 70, 42), L(100, 36, 70, 42)], "accent"), lay(star(70, 8, 10), "hi", { width: 3.2 })],
    accuseOf: [lay([P(18, 10, 0.55)], "accent"), lay([A(36, 34, 92, 34)], "trouble"), lay([P(112, 10, 0.55)], "muted"), lay([R(96, 58, 32, 16)], "trouble", { fill: "soft" })],

    // verbs with the preposition already inside them
    marry: [lay([P(36, 10, 0.55), P(104, 10, 0.55)], "accent"), lay([heart(70, 24, 0.55)], "trouble", { fill: "soft" })],
    discuss: [lay([P(22, 14, 0.5), P(118, 14, 0.5)], "accent"), lay([E(54, 10, 22, 10), E(88, 22, 22, 10)], "accent2"), lay([R(54, 52, 32, 24)], "muted", { fill: "soft" })],
    resemble: [lay([C(40, 34, 20), C(100, 34, 20)], "accent"), lay([L(32, 30, 34, 30), L(46, 30, 48, 30), L(92, 30, 94, 30), L(106, 30, 108, 30), L(34, 42, 46, 42, 4), L(94, 42, 106, 42, 4)], "accent"), lay([L(64, 30, 76, 30), L(64, 38, 76, 38)], "accent2")],

    // formal verbs
    holdBack: [lay([P(54, 8, 0.6)], "accent"), lay([A(40, 74, 6, 74)], "accent2"), lay(poly([[92, 22], [106, 16], [120, 22], [126, 36], [120, 50], [106, 56], [92, 50], [86, 36], [92, 22]]), "trouble", { fill: "soft" })],
    stickTo: [lay([L(6, 60, 134, 60)], "accent2", { width: 4 }), lay([P(40, 6, 0.45)], "accent"), lay([A(58, 40, 112, 40)], "muted")],
    fitMould: [lay([R(28, 14, 84, 58)], "muted", { fill: "soft" }), lay([R(46, 26, 48, 38)], "accent", { fill: "soft" }), lay(tick(102, 2, 0.7), "accent2", { width: 3.6 })],
    complyWith: [lay([R(18, 6, 44, 62), L(26, 20, 54, 20), L(26, 32, 54, 32), L(26, 44, 48, 44)], "muted"), lay([P(102, 8, 0.6)], "accent"), lay([L(66, 40, 84, 40)], "accent2", { width: 3 })],
    dispense: [lay([R(14, 30, 40, 40)], "muted"), lay([A(58, 50, 104, 24)], "muted"), lay([L(108, 4, 132, 28), L(132, 4, 108, 28)], "trouble", { width: 4 })],

    // illness, injury, cause and result
    germ: [lay([C(70, 40, 20)], "trouble", { fill: "soft" }), lay([L(70, 20, 70, 8), L(70, 60, 70, 72), L(50, 40, 38, 40), L(90, 40, 102, 40), L(56, 26, 47, 17), L(84, 54, 93, 63), L(84, 26, 93, 17), L(56, 54, 47, 63)], "trouble")],
    injury: [lay([B([[34, 30], [102, 30], [108, 50], [40, 50]])], "accent2", { fill: "soft" }), lay([L(66, 32, 72, 48), L(76, 32, 82, 48)], "accent2"), lay([A(10, 12, 40, 30)], "trouble")],
    sickPerson: [lay([B([[38, 18], [52, 6], [80, 4], [100, 12], [104, 26], [44, 28]])], "muted", { fill: "soft" }), lay([L(56, 32, 52, 42), L(74, 32, 70, 42), L(92, 32, 88, 42)], "accent2"), lay([P(70, 40, 0.42)], "accent")],
    recover: [lay([L(6, 72, 134, 72)], "muted"), lay([L(12, 30, 42, 64), L(42, 64, 60, 60)], "trouble"), lay([A(60, 60, 128, 12, 6)], "accent2")],
    causeEffect: [lay([C(24, 40, 14)], "accent", { fill: "solid" }), lay([A(42, 40, 92, 40)], "main"), lay([R(98, 22, 36, 36)], "trouble", { fill: "soft" })],

    // compare, contrast, distinguish
    likenTo: [lay([C(34, 40, 22)], "hi", { fill: "solid" }), lay([L(62, 36, 78, 36), L(62, 44, 78, 44)], "accent2"), lay([heart(108, 40, 0.9)], "trouble", { fill: "soft" })],
    sideBySide: [lay([R(14, 30, 34, 46)], "accent", { fill: "soft" }), lay([R(92, 12, 34, 64)], "accent2", { fill: "soft" }), lay([L(56, 38, 84, 38), L(56, 52, 84, 52)], "muted"), lay([E(70, 6, 12, 7), C(70, 6, 2.5)])],
    contrast: [lay([R(18, 16, 46, 50)], "main", { fill: "solid" }), lay([R(76, 16, 46, 50)], "main")],
    distinguish: [lay([C(34, 40, 16)], "accent", { fill: "soft" }), lay([C(106, 40, 16)], "accent2", { fill: "soft" }), lay([L(70, 4, 70, 76)], "trouble", { width: 4 })],

    // adjectives: feelings, ability, responsibility, knowledge
    absorbedIn: [lay([E(70, 44, 62, 32)], "muted", { fill: "soft" }), lay([R(76, 30, 34, 30), L(93, 30, 93, 60)], "accent2"), lay([P(46, 18, 0.45)], "accent"), lay([L(56, 34, 76, 40)], "accent")],
    angryFace: [lay([C(70, 40, 26)], "trouble"), lay([L(56, 28, 66, 33), L(84, 28, 74, 33), L(58, 54, 82, 54, 6)], "trouble"), lay([C(61, 38, 2.5), C(79, 38, 2.5)], "trouble", { fill: "solid" })],
    afraidOf: [lay([L(18, 26, 32, 36), L(14, 40, 30, 44), L(18, 56, 32, 50)], "muted"), lay([P(56, 8, 0.6)], "accent"), lay([A(118, 40, 82, 40)], "trouble"), lay([C(124, 40, 8)], "trouble", { fill: "solid" })],
    fondOf: [lay([P(30, 8, 0.6)], "accent"), lay([heart(72, 22, 0.55)], "trouble", { fill: "soft" }), lay([R(98, 40, 32, 36)], "accent2", { fill: "soft" })],
    lift: [lay([R(46, 0, 48, 20)], "main", { fill: "solid" }), lay([L(70, 34, 70, 58), C(70, 28, 6), L(70, 40, 52, 20), L(70, 40, 88, 20), L(70, 58, 58, 78), L(70, 58, 82, 78)], "accent")],
    expertIn: [lay([E(70, 44, 62, 32)], "muted", { fill: "soft" }), lay([P(48, 18, 0.45)], "accent"), lay(star(98, 40, 14), "hi", { width: 3.4 })],
    answerTo: [lay([L(60, 30, 132, 30), L(60, 30, 60, 78)], "muted"), lay([P(100, 0, 0.5)], "accent2"), lay([P(26, 28, 0.5)], "accent"), lay([A(36, 26, 84, 10, -10)], "trouble")],
    identical: [lay([R(18, 22, 38, 38)], "accent", { fill: "soft" }), lay([L(62, 36, 78, 36), L(62, 46, 78, 46)], "accent2"), lay([R(84, 22, 38, 38)], "accent", { fill: "soft" })],
    knowsWay: [lay([P(22, 10, 0.55)], "accent"), lay([L(46, 66, 76, 46), L(76, 46, 98, 62), L(98, 62, 130, 36)], "accent2", { width: 3.4 }), lay([C(130, 36, 5)], "trouble", { fill: "solid" }), lay(tick(48, 20, 0.7), "accent")],
    awareOf: [lay([P(30, 18, 0.55)], "accent"), lay([C(30, 4, 8)], "hi", { fill: "solid" }), lay([A(52, 42, 96, 42)], "muted"), lay([R(100, 26, 30, 32)], "trouble", { fill: "soft" })],
    bounceOff: [lay([B([[60, 6], [96, 16], [92, 54], [60, 76], [28, 54], [24, 16]])], "accent2", { fill: "soft" }), lay([A(130, 10, 104, 28), A(104, 34, 130, 50)], "trouble"), lay([A(4, 66, 22, 52), A(22, 46, 4, 32)], "trouble")],
    growTo: [lay([L(6, 74, 134, 74)], "muted"), lay([R(14, 52, 30, 22)], "muted", { fill: "soft" }), lay([A(50, 60, 84, 46)], "accent"), lay([L(108, 74, 108, 34), B([[108, 46], [94, 34], [104, 22]]), B([[108, 40], [124, 26], [116, 16]])], "accent2")],
    turnAway: [lay([P(36, 8, 0.6)], "accent"), lay([A(30, 74, 4, 74)], "accent2"), lay([B([[100, 30], [118, 22], [132, 40], [116, 58], [98, 50]])], "trouble", { fill: "soft" }), lay([L(64, 30, 90, 36)], "muted")],
    levelScale: [lay([L(70, 16, 70, 72), L(56, 74, 84, 74), L(24, 22, 116, 22)]), lay([L(24, 22, 14, 44), L(24, 22, 34, 44), L(10, 44, 38, 44)], "accent"), lay([L(116, 22, 106, 44), L(116, 22, 126, 44), L(102, 44, 130, 44)], "accent2"), lay([C(24, 40, 5)], "accent", { fill: "solid" }), lay([R(110, 34, 12, 10)], "accent2", { fill: "solid" })],
  });
})();
