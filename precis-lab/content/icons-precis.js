/* Board sketches for the precis course. Same 140 x 80 cell and layers as icons.js. */
(function () {
  const R = (x, y, w, h) => ({ shape: "rect", x, y, w, h });
  const C = (cx, cy, r) => ({ shape: "circle", cx, cy, r });
  const L = (x1, y1, x2, y2, bow = 0) => ({ shape: "line", from: [x1, y1], to: [x2, y2], bow, wobble: 0.6 });
  const A = (x1, y1, x2, y2, bow = 0) => ({ shape: "arrow", from: [x1, y1], to: [x2, y2], bow, head: 11 });
  const lay = (shapes, ink = "main", extra = {}) => ({ ink, shapes, ...extra });
  const face = (cx, cy, mood, r = 30) => [C(cx, cy, r), C(cx - r * 0.38, cy - r * 0.25, r * 0.09), C(cx + r * 0.38, cy - r * 0.25, r * 0.09), L(cx - r * 0.45, cy + r * 0.42 - mood * r * 0.15, cx + r * 0.45, cy + r * 0.42 - mood * r * 0.15, mood * r * 0.3)];

  Object.assign(PLAB.icons, {
    // a long phrase (a long bar of words) shrinks to one word (a short box)
    longToShort: [lay([L(8, 30, 70, 30), L(8, 40, 64, 40), L(8, 50, 70, 50)], "muted"), lay([A(76, 40, 98, 40)], "accent"), lay([R(102, 28, 32, 24)], "accent2", { fill: "soft" })],
    // a funnel: many words in at the top, a few out at the bottom
    funnel: [lay([L(30, 10, 110, 10), L(30, 10, 62, 46), L(110, 10, 78, 46), L(62, 46, 62, 66), L(78, 46, 78, 66)], "main"), lay([A(70, 62, 70, 78)], "accent2")],
    // scissors cutting a line of extra words
    scissors: [lay([C(34, 26, 9), C(34, 56, 9), L(41, 30, 104, 52), L(41, 52, 104, 30)], "main"), lay([L(108, 41, 136, 41)], "trouble", { width: 3 })],
    // a dial from informal to formal, the needle pointing at one setting
    dial: [lay([L(20, 66, 120, 66), L(20, 66, 70, 16, -40), L(70, 16, 120, 66, -40)], "muted"), lay([A(70, 66, 100, 32)], "accent"), lay([C(70, 66, 4)], "accent", { fill: "solid" })],
    // strength: three bars, weak to strong
    strength: [lay([R(28, 52, 18, 18), R(61, 36, 18, 34), R(94, 14, 18, 56)], "accent2", { fill: "soft" })],
    // one meaning, two feelings: a smiling face and a frowning face
    twoFaces: [lay(face(38, 40, 1, 26), "accent2"), lay(face(102, 40, -1, 26), "trouble")],
    smile: [lay(face(70, 40, 1), "accent2")],
    frown: [lay(face(70, 40, -1), "trouble")],
    // a word grows from a root: a small tree with roots below the line
    root: [lay([L(70, 48, 70, 14), L(70, 26, 54, 14), L(70, 30, 88, 18)], "accent2"), lay([L(20, 48, 120, 48)], "muted"), lay([L(70, 48, 56, 70), L(70, 48, 70, 74), L(70, 48, 86, 70)], "accent")],
    // the same word in two places: one word, two arrows to two pictures
    twoPaths: [lay([R(52, 30, 36, 20)], "accent", { fill: "soft" }), lay([A(52, 40, 14, 14), A(88, 40, 126, 66)], "accent2")],
    // a bullseye hit: the exact word
    exact: [lay([C(70, 40, 28), C(70, 40, 17), C(70, 40, 6)], "muted"), lay([A(10, 72, 66, 44)], "accent")],
    // a near miss: close, but not on the mark
    nearMiss: [lay([C(70, 40, 28), C(70, 40, 17), C(70, 40, 6)], "muted"), lay([A(10, 72, 52, 30)], "trouble")],
    // a page with lines, and a short page next to it: the passage and its precis
    passagePrecis: [lay([R(14, 8, 46, 64), L(20, 20, 54, 20), L(20, 30, 54, 30), L(20, 40, 54, 40), L(20, 50, 54, 50), L(20, 60, 48, 60)], "muted"), lay([A(64, 40, 84, 40)], "accent"), lay([R(90, 24, 38, 32), L(96, 34, 122, 34), L(96, 44, 116, 44)], "accent2")],
  });
})();
