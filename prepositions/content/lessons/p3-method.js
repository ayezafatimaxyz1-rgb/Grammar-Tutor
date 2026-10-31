/* Lesson 3.2: a four-step method for any preposition blank, shown on real CSS items. */
(function () {
  const K = PLAB.kit;
  const box = (id, x, title, sub, ink) => [
    { do: "draw", id: `${id}-b`, shape: "rect", x, y: 110, w: 200, h: 150, ink, dur: 700, gap: 300 },
    { do: "write", id, text: title, x: x + 100, y: 170, size: 30, anchor: "middle", ink, fit: 185 },
    { do: "write", id: `${id}-s`, text: sub, x: x + 100, y: 220, size: 21, anchor: "middle", ink: "muted", fit: 185 },
  ];
  const arrow = (id, x) => ({ do: "draw", id, shape: "arrow", from: [x, 185], to: [x + 36, 185], ink: "muted", dur: 400 });
  const walk = (prefix, sentence, lines, src) => [
    { do: "write", id: `${prefix}-s`, text: sentence, x: 480, y: 52, size: 34, anchor: "middle" },
    ...K.rows(prefix, lines, { y: 130, gap: 100 }),
    { do: "write", id: `${prefix}-src`, text: src, x: 480, y: 565, size: 22, ink: "accent2", anchor: "middle" },
  ];
  PLAB.registerLesson({
    id: "p3-method",
    title: "A four-step method for any blank",
    phase: 3,
    unit: "p3-css",
    level: "Intermediate",
    minutes: 10,
    summary:
      "One routine solves every preposition item in the papers: 1 look left for a partner word, 2 look right at what follows, 3 picture the scene or recall the phrase, 4 test every candidate. Shown here on three real items.",
    objectives: [
      "Use the four steps on any preposition blank.",
      "See the method work on a partner word, a phrasal verb and a literary sentence.",
    ],
    steps: [
      {
        id: "steps",
        title: "The four steps",
        alt: "A flowchart of four boxes joined by arrows: 1 Look left (a partner word?), 2 Look right (a noun, -ing, a place, a time?), 3 Picture it (or recall the phrase), 4 Test them all (swap each candidate in). Under them: responsible ___ my actions: left = responsible, right = a noun, picture = things in your care, test = for.",
        say: [
          { text: "**Step 1, look left.** Is there a partner word just before the blank, like _responsible, impervious, contingent_? Then recall its preposition.", cue: "b1" },
          { text: "**Step 2, look right.** What follows: a noun, an -ing form, a place, a time? A time point takes at, a deadline by, a length for.", cue: "b2" },
          { text: "**Step 3, picture it**, or recall the fixed phrase or phrasal verb. **Step 4, test them all**: put each candidate in and reject the ones whose picture is wrong.", cue: "b3" },
        ],
        actions: [
          ...box("b1", 20, "1 Look left", "a partner word?", "accent"),
          arrow("a1", 222),
          ...box("b2", 260, "2 Look right", "noun, -ing, place, time?", "accent2"),
          arrow("a2", 462),
          ...box("b3", 500, "3 Picture it", "or recall the phrase", "trouble"),
          arrow("a3", 702),
          ...box("b4", 740, "4 Test them all", "swap each one in", "main"),
          { do: "write", id: "ex", text: "responsible ___ my actions → left: responsible → for", x: 480, y: 360, size: 30, anchor: "middle", gap: 500 },
          { do: "highlight", id: "ex-h", target: "ex", word: "for" },
          { do: "write", id: "ex2", text: "put ___ by the Chairman → meaning: postponed → off", x: 480, y: 430, size: 30, anchor: "middle" },
          { do: "highlight", id: "ex2-h", target: "ex2", word: "off" },
        ],
      },
      {
        id: "demo-partner",
        title: "The method on CSS 2024 · Q.5(b)(vii)",
        alt: "The sentence His proposal hinges ___ securing adequate funding, then four rows: look left (hinges, a partner word: a door turns on its hinge), look right (securing, an -ing form, so a preposition fits), picture (the plan turns on one thing), test (on right; at, to wrong).",
        say: [
          { text: "A real item from CSS 2024. **Look left**: _hinges_. A door turns **on** its hinge, so the partner is _hinge on_.", cue: "d1" },
          { text: "**Look right**: _securing_, an -ing form, which is what follows a preposition. **Picture**: the whole plan turns on one thing.", cue: "d2" },
          { text: "**Test**: _hinges at_ is a point, _hinges to_ points away. Only **on** keeps the picture. Answer: _hinges on securing adequate funding._", cue: "d4" },
        ],
        actions: [
          K.clear("clear-1"),
          ...walk("d", "His proposal hinges ____ securing adequate funding.", [
            ["support", "1 Look left: hinges (partner word)", { hl: "hinges" }],
            ["feet", "2 Look right: securing (an -ing form)", { hl: "securing" }],
            ["pressOn", "3 Picture: the plan turns on one thing", { hl: "on" }],
            ["check", "4 Test: on ✓ · at ✗ (a point) · to ✗ (away)", { hl: "on ✓", ink: "accent2" }],
          ], "Source: CSS 2024, Q.5(b)(vii)"),
        ],
      },
      {
        id: "demo-phrasal",
        title: "The method on a phrasal verb",
        alt: "The sentence The meeting was put ___ by the Chairman, then four rows: look left (put, a verb whose meaning changes), look right (by the Chairman: no object, passive), meaning needed (postponed), test (off right; out, down wrong).",
        say: [
          { text: "From the paper with the Manto precis. **Look left**: _put_. Put alone does not fit, so the blank is a particle that changes its meaning.", cue: "e1" },
          { text: "**Look right**: _by the Chairman_: a passive sentence. **Meaning needed**: the meeting was postponed.", cue: "e2" },
          { text: "**Test**: put **off** = postpone ✓; put out = extinguish ✗; put down = write or crush ✗.", cue: "e4" },
        ],
        actions: [
          K.clear("clear-2"),
          ...walk("e", "The meeting was put ____ by the Chairman.", [
            ["arrowR", "1 Look left: put (meaning must change)", { hl: "put" }],
            ["writtenBy", "2 Look right: by the Chairman (passive)", { hl: "by the Chairman" }],
            ["calendar", "3 Meaning needed: postponed", { hl: "postponed" }],
            ["check", "4 Test: off ✓ · out ✗ · down ✗", { hl: "off ✓", ink: "accent2" }],
          ], "Source: CSS paper (year not confirmed), Q.5(b)(vii)"),
        ],
      },
      {
        id: "demo-literary",
        title: "The method on a literary sentence",
        alt: "The sentence Themes of love, loss, and longing wove ___ Ghalib's verses, then four rows: look left (wove, movement like a thread), look right (verses, a long space), picture (a thread running all along cloth), test (through right; into, over wrong).",
        say: [
          { text: "From the paper with the passage on wandering. **Look left**: _wove_, the movement of a thread.", cue: "g1" },
          { text: "**Look right**: _Ghalib's verses_, a long stretch of text. **Picture**: a thread running all along the cloth.", cue: "g2" },
          { text: "**Test**: **through** ✓ runs all along; _into_ ✗ is one entry; _over_ ✗ would cover the verses. Answer: _wove through Ghalib's verses._", cue: "g4" },
        ],
        actions: [
          K.clear("clear-3"),
          ...walk("g", "Themes of love, loss, and longing wove ____ Ghalib's verses.", [
            ["swap", "1 Look left: wove (like a thread)", { hl: "wove" }],
            ["storyBook", "2 Look right: verses (a long stretch)", { hl: "verses" }],
            ["passThrough", "3 Picture: a thread running all along", { hl: "all along" }],
            ["check", "4 Test: through ✓ · into ✗ · over ✗", { hl: "through ✓", ink: "accent2" }],
          ], "Source: CSS paper (year not confirmed), Q.5(b)(viii)"),
        ],
      },
      {
        id: "check",
        title: "Check: which step?",
        alt: "The last demonstration stays on the board.",
        say: [{ text: "An original question about the method." }],
        actions: [],
        check: {
          id: "p3-method-q1",
          source: "original",
          skill: "solving method",
          prompt: "In 'The solution is contingent ___ various factors', which step gives you the answer most directly?",
          options: [
            { text: "Look left: contingent is a partner word that takes on.", correct: true, why: "Correct. Contingent always pairs with on (upon)." },
            { text: "Look right: various factors is a time.", misconception: "p3-format", why: "Various factors is not a time. The partner word on the left decides." },
            { text: "Picture a movement into a container.", misconception: "p3-format", why: "Nothing moves here. The partner word contingent decides: on." },
          ],
        },
      },
    ],
  });
})();
