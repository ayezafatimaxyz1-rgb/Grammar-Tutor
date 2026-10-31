/* Lesson 2.11: compare to vs compare with; contrast with; distinguish between / from. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "compare-to-with",
    title: "Compare to, compare with, distinguish",
    phase: 2,
    unit: "p2-verb",
    level: "Advanced",
    minutes: 8,
    summary:
      "Traditional usage: compare X to Y means say X is like Y, often as a figure of speech; compare X with Y means examine the two side by side for likenesses and differences. Many writers now use them interchangeably, so this is a disputed point; in an exam, follow the traditional rule. Contrast X with Y; distinguish between X and Y, or distinguish X from Y.",
    objectives: [
      "Use compare to for likening and compare with for close examination, and know the rule is disputed.",
      "Use contrast with, distinguish between (two things together) and distinguish X from Y.",
    ],
    steps: [
      {
        id: "two",
        title: "Liken TO, examine WITH",
        alt: "Left: a sun equals a heart, labelled compare her smile to the sun (say it is like). Right: two bars side by side with an eye above, labelled compare this year's results with last year's (examine both).",
        say: [
          { text: "**Compare to** says that one thing is like another, often in a striking image: _The poet compares her smile to the sun._", cue: "c1" },
          { text: "**Compare with** puts two things side by side and examines them closely, the way an analyst does: _Compare this year's results with last year's._", cue: "c2" },
          { text: "Many writers now use them interchangeably, so it is a disputed point. In an exam, keep the traditional difference.", cue: "note" },
        ],
        actions: [
          ...K.panels("c", [
            ["likenTo", "compare her smile to the sun", "say it is like", { hl: "to" }],
            ["sideBySide", "compare this year with last year", "examine both, side by side", { hl: "with" }],
          ], { y: 60 }),
          { do: "write", id: "note", text: "disputed: many writers mix them · exams: keep the difference", x: 480, y: 470, size: 28, ink: "muted", anchor: "middle", gap: 400 },
        ],
      },
      {
        id: "compared",
        title: "Compared with, in comparison with",
        alt: "Rows: Compared with Karachi, Quetta is quiet (both acceptable: compared to). In comparison with. By comparison.",
        say: [
          { text: "At the start of a sentence, both _compared with_ and _compared to_ are accepted: _Compared with Karachi, Quetta is quiet._", cue: "r1" },
          { text: "The noun forms are _in comparison with_ (or _to_) and _by comparison._ You met these in Phase 1.", cue: "r2" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.rows("r", [
            ["compareBars", "Compared with Karachi, Quetta is quiet.", { hl: "Compared with" }],
            ["compareBars", "in comparison with · by comparison", { hl: "in comparison with", size: 30 }],
          ], { y: 120, gap: 140 }),
        ],
      },
      {
        id: "contrast-distinguish",
        title: "Contrast with, distinguish between, from",
        alt: "Left: a dark square and a light square, labelled contrast X with Y. Right: two shapes separated by a line, labelled distinguish between X and Y, distinguish X from Y.",
        say: [
          { text: "**Contrast** shows the differences: _contrast the city with the village._ The noun is _in contrast to_ or _in contrast with._", cue: "x1" },
          { text: "**Distinguish** draws a line between two things. Both together: _distinguish between right and wrong._ One from the other: _distinguish right from wrong._", cue: "x2" },
          { text: "Never _distinguish between right from wrong._ _Between_ needs _and._", cue: "w" },
        ],
        actions: [
          K.clear("clear-2"),
          ...K.panels("x", [
            ["contrast", "contrast the city with the village", "show the differences", { hl: "with" }],
            ["distinguish", "distinguish right from wrong", "draw a line between them", { hl: "from" }],
          ], { y: 60 }),
          { do: "write", id: "w", text: "between right and wrong · ✗ between right from wrong", x: 480, y: 470, size: 30, ink: "trouble", anchor: "middle", gap: 400 },
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence The poet compared her smile with a gap the sun., then the candidates with pictures: to (right: says one is like the other); with (correct English but a different meaning: examining both, like an analyst); from (wrong: from = apart: distinguish from). Rule: compare to = liken; compare with = examine side by side.",
        say: [
          { text: "Fill the gap: The poet compared her smile \u2026 the sun. What does the sentence want to say? The answer is **to**: says one is like the other.", cue: "why1" },
          { text: "Why not the others? **with** is correct English, but it would mean examining both, like an analyst. That is not what this sentence says. **from**: from = apart: distinguish from.", cue: "why2" },
          { text: "The rule: compare to = liken; compare with = examine side by side.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "The poet compared her smile ____ the sun.", [["likenTo", "to", true, "says one is | like the other"], ["sideBySide", "with", "diff", "examining both, | like an analyst"], ["origin", "from", false, "from = apart: | distinguish from"]], ["compare to = liken", "compare with = examine side by side"]),
        ],
      },
      {
        id: "check",
        title: "Check: precise usage",
        alt: "The board remains.",
        say: [{ text: "An original practice question." }],
        actions: [],
        check: {
          id: "compare-with-q1",
          source: "original",
          skill: "compare to / with",
          prompt: "In traditional usage, which sentence is best for a statistical analysis?",
          options: [
            { text: "The report compares literacy rates in 2023 with those in 2013.", correct: true, why: "Correct. Examining two sets of figures side by side takes _compare with._" },
            { text: "The report compares literacy rates in 2023 to those in 2013.", misconception: "compare-to-with", why: "Many writers accept this, but traditionally _compare to_ means liken, not examine." },
            { text: "The report compares literacy rates in 2023 from those in 2013.", misconception: "compare-to-with", why: "_Compare from_ is not used. _From_ goes with _distinguish._" },
          ],
        },
      },
      {
        id: "check-2",
        title: "Check: distinguish",
        alt: "The board remains.",
        say: [{ text: "One more." }],
        actions: [],
        check: {
          id: "distinguish-q1",
          source: "original",
          skill: "distinguish between / from",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "A judge must distinguish between fact and opinion.", correct: true, why: "Correct. _Between_ takes both things joined by _and._" },
            { text: "A judge must distinguish between fact from opinion.", misconception: "compare-to-with", why: "_Between_ needs _and._ Use _between fact and opinion_ or _fact from opinion._" },
            { text: "A judge must distinguish fact with opinion.", misconception: "compare-to-with", why: "_Distinguish_ X _from_ Y, not _with._" },
          ],
        },
      },
    ],
  });
})();
