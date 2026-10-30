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
          { text: "**On behalf of** = as the representative of: _She spoke on behalf of the government._ (American English also has _in behalf of_, meaning in the interest of; it is rare.)", cue: "f1" },
          { text: "**On the part of** = by: _a serious mistake on the part of the officer._", cue: "f2" },
          { text: "**In favour of** (American _favor_) = supporting, or to the benefit of: _The court ruled in favour of the tenant._", cue: "f3" },
          { text: "**In charge of** = responsible for: _He is in charge of the project._", cue: "f4" },
        ],
        actions: K.lines("f", [["spoke on behalf of the government", { hl: "on behalf of" }], ["a mistake on the part of the officer", { hl: "on the part of" }], ["ruled in favour of the tenant", { hl: "in favour of" }], ["in charge of the project", { hl: "in charge of" }]], { y: 130, gap: 100, size: 36 }),
      },
      {
        id: "charge",
        title: "In charge of vs in the charge of",
        alt: "Two sentences: The nurse is in charge of the ward (she is responsible). The ward is in the charge of the nurse (it is under her care). Arrows show who is responsible.",
        say: [
          { text: "_The nurse is **in charge of** the ward_: the nurse is responsible.", cue: "c1" },
          { text: "_The ward is **in the charge of** the nurse_: the ward is under her care. Adding _the_ reverses the direction.", cue: "c2" },
        ],
        actions: [K.clear("clear-1"), ...K.lines("c", [["The nurse is in charge of the ward.", { hl: "in charge of" }], ["The ward is in the charge of the nurse.", { hl: "in the charge of" }]], { y: 200, gap: 130, size: 38 })],
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
