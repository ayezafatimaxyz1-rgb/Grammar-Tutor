/* Extra board sketches for conjunctions. Same 140 x 80 cell and layers as icons.js. */
(function () {
  const R = (x, y, w, h) => ({ shape: "rect", x, y, w, h });
  const C = (cx, cy, r) => ({ shape: "circle", cx, cy, r });
  const L = (x1, y1, x2, y2, bow = 0) => ({ shape: "line", from: [x1, y1], to: [x2, y2], bow, wobble: 0.6 });
  const A = (x1, y1, x2, y2, bow = 0) => ({ shape: "arrow", from: [x1, y1], to: [x2, y2], bow, head: 11 });
  const lay = (shapes, ink = "main", extra = {}) => ({ ink, shapes, ...extra });
  Object.assign(PLAB.icons, {
    // two equal blocks joined by a line: a coordinating conjunction
    equalTwo: [lay([R(10, 24, 42, 32), R(88, 24, 42, 32)], "accent2", { fill: "soft" }), lay([L(52, 40, 88, 40)], "accent", { width: 4 })],
    // a big block with a small block hanging from it: a subordinating conjunction
    depend: [lay([R(34, 8, 72, 30)], "accent2", { fill: "soft" }), lay([L(70, 38, 70, 50)], "accent", { width: 4 }), lay([R(50, 50, 40, 22)], "muted")],
    // a road that splits into two: or
    fork: [lay([L(8, 40, 56, 40)], "main"), lay([A(56, 40, 122, 14), A(56, 40, 122, 66)], "accent")],
    // both blocks with a plus between them
    bothTwo: [lay([R(8, 26, 42, 28), R(90, 26, 42, 28)], "accent2", { fill: "soft" }), lay([L(62, 40, 78, 40), L(70, 32, 70, 48)], "accent", { width: 4 })],
    // neither: two circles, both crossed out
    neitherTwo: [lay([C(38, 40, 22), C(102, 40, 22)], "muted"), lay([L(22, 24, 54, 56), L(54, 24, 22, 56), L(86, 24, 118, 56), L(118, 24, 86, 56)], "trouble", { width: 4 })],
    // a long chain of equal blocks: do not chain too many
    longChain: [lay([R(4, 30, 22, 20), R(32, 30, 22, 20), R(60, 30, 22, 20), R(88, 30, 22, 20), R(114, 30, 22, 20)], "muted"), lay([L(26, 40, 32, 40), L(54, 40, 60, 40), L(82, 40, 88, 40), L(110, 40, 114, 40)], "accent")],
    // a cause block then an effect block: so
    thenResult: [lay([R(8, 26, 40, 28)], "accent2", { fill: "soft" }), lay([A(52, 40, 86, 40)], "accent", { width: 4 }), lay([R(92, 26, 40, 28)], "accent", { fill: "soft" })],
  });
})();
