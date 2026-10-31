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
        alt: "Four pictures each pointing at a topic: an envelope (regarding your letter), fog and a plane (concerning the delay), coins (with regard to the budget), a coin and a person (as regards salaries).",
        say: [
          { text: "All these phrases point at a topic, like an arrow pointing at a document: _regarding your letter, concerning the delay, with regard to the budget, as regards salaries._", cue: "f1" },
          { text: "Use them sparingly; plain _about_ or _on_ often reads better. Legal texts also use _respecting_ (about), and old texts _touching_ (about).", cue: "f4" },
        ],
        actions: [
          PLAB.kit.clear("clear-rd-forms"),
          ...PLAB.kit.grid("f", [
            ["envelope", "regarding your letter", "= about your letter", { hl: "regarding" }],
            ["fogDelay", "concerning the delay", "= about the delay", { hl: "concerning" }],
            ["coin", "with regard to the budget", "= about the budget", { hl: "with regard to" }],
            [[["coin", -30, 0, 0.8], ["person", 35, 0, 0.8]], "as regards salaries", "= about salaries", { hl: "as regards" }],
          ]),
        ],
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
        title: "Why this one and not the others?",
        alt: "The sentence I am writing with a gap the delay., then the candidates with pictures: regarding (right: = about it); regards (wrong: regards = greetings); regard (wrong: needs with ... to: with regard to). Rule: regarding, concerning, with regard to; never with regards to.",
        say: [
          { text: "Fill the gap: I am writing \u2026 the delay. What does the sentence want to say? The answer is **regarding**: = about it.", cue: "why1" },
          { text: "Why not the others? **regards**: regards = greetings. **regard**: needs with ... to: with regard to.", cue: "why2" },
          { text: "The rule: regarding, concerning, with regard to; never with regards to.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "I am writing ____ the delay.", [["pointDoc", "regarding", true, "= about it"], ["wave", "regards", false, "regards = | greetings"], ["cross", "regard", false, "needs with ... to: | with regard to"]], ["regarding, concerning, with regard to", "never with regards to"]),
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
