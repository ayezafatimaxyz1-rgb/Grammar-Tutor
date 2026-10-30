/* Lesson 1.48: REGARDING, CONCERNING, WITH REGARD TO, AS REGARDS. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "regarding-concerning",
    title: "REGARDING, CONCERNING, WITH REGARD TO",
    phase: 1,
    unit: "p1-relations",
    level: "Intermediate",
    minutes: 7,
    summary:
      "Formal ways of saying about: regarding, concerning, with regard to, in regard to, as regards. The famous error with regards to (regards means greetings). Respecting is legal; touching is archaic.",
    objectives: [
      "Use regarding, concerning, with regard to and as regards correctly.",
      "Avoid with regards to and in regards to.",
      "Recognise respecting (legal) and touching (archaic) as meaning about.",
    ],
    steps: [
      {
        id: "forms",
        title: "Formal ways to say about",
        alt: "Rows: regarding your letter; concerning the delay; with regard to the budget; as regards salaries.",
        say: [
          { text: "All these phrases point at a topic, like an arrow pointing at a document: _regarding your letter, concerning the delay, with regard to the budget, as regards salaries._", cue: "f1" },
          { text: "Use them sparingly; plain _about_ or _on_ often reads better. Legal texts also use _respecting_ (about), and old texts _touching_ (about).", cue: "f4" },
        ],
        actions: PLAB.kit.rows("f", [
          ["pointDoc", "regarding your letter", { hl: "regarding" }],
          ["pointDoc", "concerning the delay", { hl: "concerning" }],
          ["pointDoc", "with regard to the budget", { hl: "with regard to" }],
          ["pointDoc", "as regards salaries", { hl: "as regards" }],
        ], { y: 90, gap: 118, size: 34 }),
      },
      {
        id: "regards",
        title: "Regard, not regards",
        alt: "Crossed out: with regards to; in regards to. Correct: with regard to; in regard to; as regards. Note: regards means greetings, as in Kind regards.",
        say: [
          { text: "**Regard** without s points at a topic: _with regard to, in regard to._ _With regards to_ is a very common error.", cue: "r1" },
          { text: "**Regards** with an s means greetings, a wave to someone: _Kind regards; give my regards to your family._ The only correct s-form for a topic is _as regards._", cue: "r2" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.panels("r", [
            ["pointDoc", "with regard to", "pointing at a topic", { hl: "regard" }],
            ["wave", "Kind regards", "greetings", { hl: "regards" }],
          ]),
          { do: "write", id: "r3", text: "✗ with regards to · ✗ in regards to", x: 480, y: 470, size: 32, ink: "trouble", anchor: "middle", gap: 500 },
        ],
      },
      {
        id: "why-not",
        title: "Why not the other one?",
        alt: "Left: an arrow pointing at a document, labelled with regard to your letter. Right: a waving person, labelled with regards to your letter; regards means greetings.",
        say: [
          { text: "_with regard to your letter_ = about your letter.", cue: "wn1" },
          { text: "**Regards** with an s means greetings: _Kind regards._ _With regards to_ mixes the two.", cue: "wn2" },
          { text: "So: _with regard to, in regard to, as regards._", cue: "wn-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.swap("wn", ["pointDoc", "with regard to your letter", "= about it", { hl: "regard" }], ["wave", "\u2717 with regards to your letter", "regards = greetings", { ink: "trouble" }], ["with regard to \u00b7 as regards", "Kind regards (greetings)"]),
        ],
      },
      {
        id: "check",
        title: "Check: sentence correction",
        alt: "The regard rows remain on the board.",
        say: [{ text: "An original practice item in CSS sentence-correction style." }],
        actions: [],
        check: {
          id: "regard-q1",
          source: "original",
          skill: "with regard to",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "With regard to your complaint, an inquiry has been ordered.", correct: true, why: "Correct. _With regard to_, with singular _regard._" },
            { text: "With regards to your complaint, an inquiry has been ordered.", misconception: "regards-error", why: "_Regards_ means greetings. The phrase is _with regard to._" },
            { text: "In regards of your complaint, an inquiry has been ordered.", misconception: "regards-error", why: "Two errors: _regards_ and _of_. Use _in regard to_ or _with regard to._" },
          ],
        },
      },
    ],
  });
})();
