/* Lesson 1.13: ON TOP OF, and its two figurative uses. */
PLAB.registerLesson({
  id: "on-top-of",
  title: "ON TOP OF",
  phase: 1,
  unit: "p1-position",
  level: "Intermediate",
  minutes: 7,
  summary:
    "On top of stresses the highest surface, often of a pile. It also means in addition to (on top of that) and in control of (on top of your work). Knowing which uses are informal.",
  objectives: [
    "Use on top of for the highest surface, and on for ordinary contact.",
    "Understand on top of meaning in addition to, and stay on top of meaning in control.",
    "Know that on top of that is informal and choose formal alternatives in essays.",
  ],
  steps: [
    {
      id: "pile",
      title: "The highest surface",
      alt: "A pile of three books with a cup on the highest book. Sentences: The cup is on top of the books. The cup is on the books.",
      say: [
        { text: "Here is a pile of books.", cue: "pile" },
        { text: "A cup sits on the very top one. **On top of** stresses the highest surface: _The cup is on top of the pile._", cue: "s-top" },
        { text: "Plain _on_ is also correct: _The cup is on the books._ Use on top of when the highest point matters, or to avoid confusion with something lower down.", cue: "s-on" },
      ],
      actions: [
        { do: "draw", id: "pile", shape: "group", ink: "accent2", dur: 1500, parts: [{ shape: "rect", x: 360, y: 300, w: 240, h: 44 }, { shape: "rect", x: 375, y: 256, w: 210, h: 44 }, { shape: "rect", x: 390, y: 212, w: 180, h: 44 }] },
        { do: "draw", id: "cup", shape: "group", ink: "accent", dur: 800, gap: 300, parts: [{ shape: "line", from: [455, 160], to: [462, 210] }, { shape: "line", from: [462, 210], to: [498, 210] }, { shape: "line", from: [498, 210], to: [505, 160] }, { shape: "line", from: [455, 160], to: [505, 160] }] },
        { do: "write", id: "s-top", text: "The cup is on top of the pile.", x: 480, y: 430, size: 42, anchor: "middle", gap: 400, dur: 1900 },
        { do: "highlight", id: "h-top", target: "s-top", word: "on top of" },
        { do: "write", id: "s-on", text: "also: The cup is on the books.", x: 480, y: 510, size: 32, ink: "muted", anchor: "middle", gap: 500, dur: 1700 },
      ],
    },
    {
      id: "figurative",
      title: "In addition, and in control",
      alt: "Two phrases. On top of that, meaning in addition, marked informal, with formal alternatives in addition and moreover. Stay on top of your work, meaning in control.",
      say: [
          { text: "Picture a pile that keeps growing: one more block lands **on top of** the others. So _on top of_ can mean _in addition to_: _On top of the fine, he lost his licence._", cue: "f1" },
          { text: "That use is informal. In a CSS essay write _in addition to, besides_ or _moreover._", cue: "f1s" },
          { text: "Standing on top of a pile of work means it is under you, under your control: _She stays on top of her work._", cue: "f2" },
        ],
      actions: [
          PLAB.kit.clear("clear-pile"),
          ...PLAB.kit.panels("f", [
            ["stackAdd", "On top of that, ...", "= and also (informal)", { hl: "On top of" }],
            ["onTopPile", "on top of her work", "= in control of it", { hl: "on top of" }],
          ]),
          { do: "write", id: "f3", text: "essay: in addition to · moreover", x: 480, y: 470, size: 30, ink: "accent2", anchor: "middle", gap: 500 },
        ],
    },
    {
      id: "why-not",
      title: "Why this one and not the others?",
      alt: "The sentence The cup is with a gap the pile of books., then the candidates with pictures: on top of (right: on the highest surface); above (wrong: higher, not touching); over (wrong: covering or crossing it). Rule: on top of = on the highest surface; on top of that = in addition (informal).",
      say: [
        { text: "Fill the gap: The cup is \u2026 the pile of books. The answer is **on top of**: on the highest surface.", cue: "why1" },
        { text: "Why not the others? **above**: higher, not touching. **over**: covering or crossing it.", cue: "why2" },
        { text: "The rule: on top of = on the highest surface; on top of that = in addition (informal).", cue: "why-r1" },
      ],
      actions: [
        PLAB.kit.clear("clear-why"),
        ...PLAB.kit.lineup("why", "The cup is ____ the pile of books.", [["onTopPile", "on top of", true, "on the highest | surface"], ["floatAbove", "above", false, "higher, | not touching"], ["overRock", "over", false, "covering or | crossing it"]], ["on top of = on the highest surface", "on top of that = in addition (informal)"]),
      ],
    },
    {
      id: "check-formal",
      title: "Check: formal register",
      alt: "The two figurative phrases remain on the board.",
      say: [{ text: "Which choice suits a formal essay?" }],
      actions: [],
      check: {
        id: "ontop-q1",
        source: "original",
        skill: "register of on top of",
        prompt: "Which sentence is the best choice for a formal CSS essay?",
        options: [
          { text: "In addition to rising prices, families face growing unemployment.", correct: true, why: "Yes. _In addition to_ is the neutral, formal way to add a point." },
          { text: "On top of rising prices, families face growing unemployment.", misconception: "register-informal", why: "This is correct English, but _on top of_ meaning in addition is informal. Prefer _in addition to_ in an essay." },
          { text: "Over the top of rising prices, families face growing unemployment.", misconception: "register-informal", why: "_Over the top_ is a different informal idiom meaning excessive. It does not mean in addition." },
        ],
      },
    },
  ],
});
