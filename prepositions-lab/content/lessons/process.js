/* Lesson 1.61: process and cost: in the course of, at the expense of, for the purpose of, by way of. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "process",
    title: "In the course of, at the expense of",
    phase: 1,
    unit: "p1-complex",
    level: "Advanced",
    minutes: 7,
    summary:
      "Four formal phrases: in the course of (during), at the expense of (at the cost of, harming), for the purpose of + -ing (in order to), and by way of (as a form of, or via).",
    objectives: [
      "Use in the course of for during, and at the expense of for at the cost of.",
      "Use for the purpose of + -ing, and by way of for as a form of.",
    ],
    steps: [
      {
        id: "forms",
        title: "Four phrases",
        alt: "Rows: in the course of the investigation (during); growth at the expense of the environment (harming it); for the purpose of verifying records (in order to); by way of apology (as an apology).",
        say: [
          { text: "**In the course of** = during, somewhere along the path of a process: _In the course of the investigation, new facts emerged._", cue: "f1" },
          { text: "**At the expense of** = one side rises while the other is paid away: _growth at the expense of the environment._", cue: "f2" },
          { text: "**For the purpose of** + -ing = aimed at a target: _for the purpose of verifying records._ **By way of** = as a form of: flowers given as an apology. _by way of apology._", cue: "f4" },
        ],
        actions: PLAB.kit.rows("f", [
          ["courseAlong", "in the course of the investigation", { hl: "in the course of" }],
          ["expense", "growth at the expense of the environment", { hl: "at the expense of", size: 30 }],
          ["target", "for the purpose of verifying records", { hl: "for the purpose of" }],
          ["flowersApology", "flowers by way of apology", { hl: "by way of" }],
        ], { y: 90, gap: 118 }),
      },
      {
        id: "check",
        title: "Check: exam style",
        alt: "The four rows remain on the board.",
        say: [{ text: "An original practice question in CSS essay style." }],
        actions: [],
        check: {
          id: "process-q1",
          source: "original",
          skill: "at the expense of",
          prompt: "Rapid industrialisation has often come ___ public health.",
          options: [
            { text: "at the expense of", correct: true, why: "Correct. Industrialisation advanced while harming public health: _at the expense of._" },
            { text: "in the course of", misconception: "process-phrases", why: "In the course of means during, which does not show the cost to public health." },
            { text: "by way of", misconception: "process-phrases", why: "By way of means as a form of or via, which does not fit." },
          ],
        },
      },
    ],
  });
})();
