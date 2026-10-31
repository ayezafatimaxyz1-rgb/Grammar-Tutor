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
        alt: "Four pictures: a path with a point along it (in the course of the investigation), a seesaw with one side up and one down (at the expense of), a target (for the purpose of), flowers given to a heart (by way of apology).",
        say: [
          { text: "**In the course of** = during, somewhere along the path of a process: _In the course of the investigation, new facts emerged._", cue: "f1" },
          { text: "**At the expense of** = one side rises while the other is paid away: _growth at the expense of the environment._", cue: "f2" },
          { text: "**For the purpose of** + -ing = aimed at a target: _for the purpose of verifying records._ **By way of** = as a form of: flowers given as an apology. _by way of apology._", cue: "f4" },
        ],
        actions: [
          PLAB.kit.clear("clear-rd-forms"),
          ...PLAB.kit.grid("f", [
            ["courseAlong", "in the course of the investigation", "= during", { hl: "in the course of" }],
            ["expense", "growth at the expense of the environment", "one gains, the other pays", { hl: "at the expense of" }],
            ["target", "for the purpose of verifying records", "aimed at a goal", { hl: "for the purpose of" }],
            ["flowersApology", "flowers by way of apology", "as a form of", { hl: "by way of" }],
          ]),
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence with a gap the inquiry, new facts emerged., then the candidates with pictures: In the course of (right: = during); At the expense of (correct English but a different meaning: harming the inquiry); By way of (wrong: = as a form of). Rule: in the course of = during; at the expense of = at the cost of.",
        say: [
          { text: "Fill the gap: \u2026 the inquiry, new facts emerged. What does the sentence want to say? The answer is **In the course of**: = during.", cue: "why1" },
          { text: "Why not the others? **At the expense of** is correct English, but it would mean harming the inquiry. That is not what this sentence says. **By way of**: = as a form of.", cue: "why2" },
          { text: "The rule: in the course of = during; at the expense of = at the cost of.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "____ the inquiry, new facts emerged.", [["courseAlong", "In the course of", true, "= during"], ["expense", "At the expense of", "diff", "harming | the inquiry"], ["flowersApology", "By way of", false, "= as a form of"]], ["in the course of = during", "at the expense of = at the cost of"]),
        ],
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
