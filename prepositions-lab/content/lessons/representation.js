/* Lesson 1.58: on behalf of, on the part of, in favour of, in charge of. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "representation",
    title: "On behalf of, in favour of, in charge of",
    phase: 1,
    unit: "p1-complex",
    level: "Advanced",
    minutes: 8,
    summary:
      "On behalf of (as the representative of), on the part of (by), in favour of (supporting, or to the benefit of), and the exam pair in charge of (responsible for) and in the charge of (looked after by). Plus the American in behalf of.",
    objectives: [
      "Use on behalf of for acting as someone's representative, and on the part of for by.",
      "Use in favour of (BrE spelling) for support or benefit.",
      "Tell in charge of (responsible) from in the charge of (under someone's care).",
    ],
    steps: [
      {
        id: "forms",
        title: "Four phrases",
        alt: "Rows: She spoke on behalf of the government; a mistake on the part of the officer; the court ruled in favour of the tenant; he is in charge of the project.",
        say: [
          { text: "**On behalf of** = as the representative of: one person speaks for the group behind her. _She spoke on behalf of the government._", cue: "f1" },
          { text: "**On the part of** = by: the finger points at who did it. _a serious mistake on the part of the officer._", cue: "f2" },
          { text: "**In favour of** = supporting: the scale tips one way. _The court ruled in favour of the tenant._ **In charge of** = responsible for: one person directs the group. _in charge of the project._", cue: "f4" },
        ],
        actions: PLAB.kit.rows("f", [
          ["spokes", "spoke on behalf of the government", { hl: "on behalf of" }],
          ["blame", "a mistake on the part of the officer", { hl: "on the part of" }],
          ["scaleTip", "ruled in favour of the tenant", { hl: "in favour of" }],
          ["leadGroup", "in charge of the project", { hl: "in charge of" }],
        ], { y: 90, gap: 118 }),
      },
      {
        id: "charge",
        title: "In charge of vs in the charge of",
        alt: "Two sentences: The nurse is in charge of the ward (she is responsible). The ward is in the charge of the nurse (it is under her care). Arrows show who is responsible.",
        say: [
          { text: "_The nurse is **in charge of** the ward_: the nurse directs it, responsibility goes down from her.", cue: "c1" },
          { text: "_The ward is **in the charge of** the nurse_: the ward is held in her care. Adding _the_ reverses the direction.", cue: "c2" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.panels("c", [
            ["leadGroup", "The nurse is in charge of the ward.", "she is responsible", { hl: "in charge of", size: 24 }],
            ["careFor", "The ward is in the charge of the nurse.", "it is in her care", { hl: "in the charge of", size: 24 }],
          ]),
        ],
      },
      {
        id: "why-not",
        title: "Why not the other one?",
        alt: "Left: a leader above a group, labelled The nurse is in charge of the ward (she is responsible). Right: an adult protecting children, labelled The ward is in the charge of the nurse (it is in her care).",
        say: [
          { text: "_The nurse is in charge of the ward_: she is the one responsible.", cue: "wn1" },
          { text: "Add **the** and the direction flips: _The ward is in the charge of the nurse_: the ward is in her care.", cue: "wn2" },
          { text: "One small word decides who is responsible for whom.", cue: "wn-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.swap("wn", ["leaderGroup", "The nurse is in charge of the ward.", "she is responsible", { hl: "in charge of" }], ["careFor", "The ward is in the charge of the nurse.", "different: the ward is in her care", { ink: "trouble" }], ["in charge of = responsible for", "in the charge of = in someone's care"]),
        ],
      },
      {
        id: "check",
        title: "Check: who is responsible?",
        alt: "The charge sentences remain on the board.",
        say: [{ text: "Who looks after whom?" }],
        actions: [],
        check: {
          id: "repr-q1",
          source: "original",
          skill: "in charge of vs in the charge of",
          prompt: "The prisoners were left ___ the deputy superintendent.",
          options: [
            { text: "in the charge of", correct: true, why: "Correct. The prisoners were under his care: _in the charge of the deputy superintendent._" },
            { text: "in charge of", misconception: "charge-direction", why: "_In charge of_ would make the prisoners responsible for the superintendent. Add _the_: _in the charge of._" },
            { text: "on behalf of", misconception: "charge-direction", why: "On behalf of means as his representative, which does not fit." },
          ],
        },
      },
    ],
  });
})();
