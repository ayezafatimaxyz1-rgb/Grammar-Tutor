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
          { text: "These all mean _about_ in formal writing: _regarding your letter, concerning the delay, with regard to the budget, as regards salaries._", cue: "f4" },
          { text: "Use them sparingly. Often plain _about_ or _on_ reads better. In legal texts you may also meet _respecting_ (about), and in old texts _touching_ (about).", cue: "f4" },
        ],
        actions: K.lines("f", [["regarding your letter", { hl: "regarding" }], ["concerning the delay", { hl: "concerning" }], ["with regard to the budget", { hl: "with regard to" }], ["as regards salaries", { hl: "as regards" }]], { y: 130, gap: 100, size: 38 }),
      },
      {
        id: "regards",
        title: "Regard, not regards",
        alt: "Crossed out: with regards to; in regards to. Correct: with regard to; in regard to; as regards. Note: regards means greetings, as in Kind regards.",
        say: [
          { text: "In _with regard to_ and _in regard to_, **regard** is singular. _With regards to_ is a very common error.", cue: "r1" },
          { text: "_Regards_ with an s means greetings: _Kind regards; give my regards to your family._ The only correct s-form is _as regards._", cue: "r3" },
        ],
        actions: [K.clear("clear-1"), ...K.lines("r", [["✗ with regards to · ✗ in regards to", { ink: "trouble" }], ["✓ with regard to · in regard to · as regards", { ink: "accent" }], ["regards = greetings: Kind regards", { ink: "muted", size: 32 }]], { y: 170, gap: 115, size: 36 })],
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
