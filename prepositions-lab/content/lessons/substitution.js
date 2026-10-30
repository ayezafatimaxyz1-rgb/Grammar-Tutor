/* Lesson 1.55: substitution: instead of, in place of, in lieu of, rather than. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "substitution",
    title: "Instead of, in place of, in lieu of",
    phase: 1,
    unit: "p1-complex",
    level: "Advanced",
    minutes: 7,
    summary:
      "Four ways to put one thing in the place of another. Instead of + noun or -ing; in place of; in lieu of (formal, legal); rather than + bare verb, noun or -ing. The error instead of to go.",
    objectives: [
      "Use instead of and in place of + noun or -ing.",
      "Recognise in lieu of in formal and legal English.",
      "Use rather than with a bare verb, and never instead of to + verb.",
    ],
    steps: [
      {
        id: "swap",
        title: "One in place of another",
        alt: "Two boxes: tea crossed out, coffee taking its place, with a curved arrow. Rows: instead of tea; in place of the old law; in lieu of notice (formal); rather than wait.",
        say: [
          { text: "All four put one thing in the place of another. **Instead of** + noun or -ing: one is swapped out, the other in. _She drank coffee instead of tea. He walked instead of taking the bus._", cue: "s1" },
          { text: "**In place of**: the old document is crossed out, the new one takes its place. _The new law was passed in place of the old one._", cue: "s2" },
          { text: "**In lieu of** (formal, legal): money given in place of something: _a month's pay in lieu of notice._", cue: "s3" },
          { text: "**Rather than** can take a bare verb: no waiting, we walk away. _Rather than wait, we left._ _Instead of to wait_ is wrong.", cue: "s4" },
        ],
        actions: PLAB.kit.rows("s", [
          ["swap", "coffee instead of tea · instead of taking", { hl: "instead of", size: 30 }],
          ["replaceDoc", "in place of the old law", { hl: "in place of" }],
          ["inLieu", "a month's pay in lieu of notice", { hl: "in lieu of" }],
          ["notWait", "Rather than wait, we left.", { hl: "Rather than" }],
        ], { y: 90, gap: 118 }),
      },
      {
        id: "why-not",
        title: "Why not the other one?",
        alt: "Left: two arrows swapping, labelled coffee instead of tea. Right: the same, labelled coffee instead tea, missing of.",
        say: [
          { text: "_coffee instead of tea_: before a noun, **instead** needs **of**.", cue: "wn1" },
          { text: "_instead tea_ leaves out the of.", cue: "wn2" },
          { text: "Alone, at the end, instead takes no of: _I had coffee instead._", cue: "wn-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.swap("wn", ["swap", "I had coffee instead of tea.", "instead of + noun", { hl: "instead of" }], ["swap", "\u2717 I had coffee instead tea.", "of is missing", { ink: "trouble" }], ["instead of + noun", "at the end: I had coffee instead."]),
        ],
      },
      {
        id: "check",
        title: "Check: sentence correction",
        alt: "The four substitution rows remain on the board.",
        say: [{ text: "An original practice item in CSS sentence-correction style." }],
        actions: [],
        check: {
          id: "subst-q1",
          source: "original",
          skill: "instead of + -ing",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "Instead of raising taxes, the government cut spending.", correct: true, why: "Correct. _Instead of_ + -ing." },
            { text: "Instead of to raise taxes, the government cut spending.", misconception: "prep-plus-ing", why: "A preposition cannot take _to_ + verb. Use _instead of raising._" },
            { text: "Instead to raise taxes, the government cut spending.", misconception: "prep-plus-ing", why: "_Instead_ needs _of_ before a noun or -ing: _instead of raising._" },
          ],
        },
      },
    ],
  });
})();
