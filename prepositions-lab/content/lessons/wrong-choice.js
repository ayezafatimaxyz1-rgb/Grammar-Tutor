/* Lesson 2.32: wrong choice from the first language: married with, angry on, consist from. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "wrong-choice",
    title: "Wrong choices from the first language",
    phase: 2,
    unit: "p2-errors",
    level: "Intermediate",
    minutes: 9,
    summary:
      "Many errors come from translating a preposition word for word from Urdu or another first language: married with (married to), angry on (angry with), consist from or in (consist of), since two years (for two years), afraid from (afraid of), good in (good at), superior than (superior to), congratulate for (congratulate on), prefer than (prefer to). Learn the English pair as one unit.",
    objectives: [
      "Recognise the most frequent transfer errors and replace them with the English pair.",
      "Use consist of, for + a period of time, and prefer X to Y.",
    ],
    steps: [
      {
        id: "idea",
        title: "Word-for-word translation",
        alt: "A thought in one language with an arrow to English words. Rows: married with becomes married to; angry on becomes angry with; afraid from becomes afraid of.",
        say: [
          { text: "When we think in one language and write in another, the preposition is often carried across word for word. English does not always agree.", cue: "pic-0-0" },
          { text: "_married with_ becomes **married to**; _angry on him_ becomes **angry with him**; _afraid from_ becomes **afraid of.**", cue: "r1" },
        ],
        actions: [
          ...K.pic("pic", "translate", 340, 10, 1.8),
          ...K.rows("r", [
            ["marry", "✗ married with  =  married to", { hl: "married to" }],
            ["angryFace", "✗ angry on him  =  angry with him", { hl: "angry with" }],
            ["afraidOf", "✗ afraid from  =  afraid of", { hl: "afraid of" }],
          ], { y: 230, gap: 120 }),
        ],
      },
      {
        id: "consist-since",
        title: "Consist of, for two years",
        alt: "Left: a box made of three parts, labelled The team consists of five members (not consist from, consist in). Right: a time line with a bracket for a period, labelled I have lived here for two years (not since two years).",
        say: [
          { text: "**Consist of** names the parts a whole is made of: _The team consists of five members._ Not _consists from._ (_Consist in_ means has as its essence: _Happiness consists in contentment._)", cue: "c1" },
          { text: "A length of time takes **for**, a starting point takes **since**: _for two years_, _since 2020._ Never _since two years._", cue: "c2" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.panels("c", [
            ["stackAdd", "consists of five members", "the parts of a whole", { hl: "of" }],
            ["span", "for two years · since 2020", "a period · a starting point", { hl: "for" }],
          ], { y: 60 }),
          { do: "write", id: "w", text: "✗ consists from · ✗ since two years", x: 480, y: 470, size: 32, ink: "trouble", anchor: "middle", gap: 400 },
        ],
      },
      {
        id: "review",
        title: "Pairs you met in Phase 2",
        alt: "Rows: good at (not good in); superior to (not superior than); congratulate on (not congratulate for); prefer tea to coffee (not prefer than).",
        say: [
          { text: "A quick review of transfer errors from earlier lessons: _good at_, not _good in_; _superior to_, not _superior than_.", cue: "v1" },
          { text: "_congratulate on_, not _congratulate for_; and _prefer tea to coffee_, not _prefer tea than coffee._", cue: "v3" },
        ],
        actions: [
          K.clear("clear-2"),
          ...K.rows("v", [
            ["target", "good at maths  ✗ good in", { hl: "good at" }],
            ["taller", "superior to  ✗ superior than", { hl: "superior to" }],
            ["congratulate", "congratulate on  ✗ congratulate for", { hl: "congratulate on" }],
            ["preferTea", "prefer tea to coffee  ✗ prefer than", { hl: "to" }],
          ], { y: 90, gap: 125 }),
        ],
      },
      {
        id: "check",
        title: "Check: sentence correction",
        alt: "The board remains.",
        say: [{ text: "An original practice question in CSS sentence-correction style." }],
        actions: [],
        check: {
          id: "wrong-choice-q1",
          source: "original",
          skill: "consist of",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "The National Assembly consists of elected members and reserved seats.", correct: true, why: "Correct. _Consist of_ names the parts." },
            { text: "The National Assembly consists from elected members and reserved seats.", misconception: "l1-transfer", why: "_Consist from_ is a transfer error. Use _consist of._" },
            { text: "The National Assembly is consisted of elected members and reserved seats.", misconception: "l1-transfer", why: "_Consist_ is never passive. Use _consists of_ or _is composed of._" },
          ],
        },
      },
      {
        id: "check-2",
        title: "Check: one more",
        alt: "The board remains.",
        say: [{ text: "One more." }],
        actions: [],
        check: {
          id: "wrong-choice-q2",
          source: "original",
          skill: "for / since",
          prompt: "She has been preparing for the CSS examination ___ two years.",
          options: [
            { text: "for", correct: true, why: "Correct. A length of time takes _for._" },
            { text: "since", misconception: "l1-transfer", why: "_Since_ needs a starting point (_since 2023_), not a length of time." },
            { text: "from", misconception: "l1-transfer", why: "_From_ needs an end point too (_from 2023 to 2025_). For a length of time, use _for._" },
          ],
        },
      },
    ],
  });
})();
