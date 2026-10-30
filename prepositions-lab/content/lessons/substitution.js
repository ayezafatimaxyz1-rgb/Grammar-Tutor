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
        alt: "Four pictures: two arrows swapping (coffee instead of tea), a crossed document replaced by a new one (in place of the old law), a crossed notice and coins (pay in lieu of notice), a crossed clock and an arrow away (rather than wait).",
        say: [
          { text: "All four put one thing in the place of another. **Instead of** + noun or -ing: one is swapped out, the other in. _She drank coffee instead of tea. He walked instead of taking the bus._", cue: "s1" },
          { text: "**In place of**: the old document is crossed out, the new one takes its place. _The new law was passed in place of the old one._", cue: "s2" },
          { text: "**In lieu of** (formal, legal): money given in place of something: _a month's pay in lieu of notice._", cue: "s3" },
          { text: "**Rather than** can take a bare verb: no waiting, we walk away. _Rather than wait, we left._ _Instead of to wait_ is wrong.", cue: "s4" },
        ],
        actions: [
          PLAB.kit.clear("clear-rd-swap"),
          ...PLAB.kit.grid("s", [
            ["swap", "coffee instead of tea", "one swapped for the other", { hl: "instead of" }],
            ["replaceDoc", "in place of the old law", "the new takes the old one's place", { hl: "in place of" }],
            ["inLieu", "pay in lieu of notice", "money instead of notice (formal)", { hl: "in lieu of" }],
            ["notWait", "Rather than wait, we left.", "+ a bare verb", { hl: "Rather than" }],
          ]),
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence I had coffee with a gap tea., then the candidates with pictures: instead of (right: one in place of the other); instead (wrong: alone it ends a sentence: I had coffee instead); except (wrong: except = not including). Rule: instead of + noun or -ing; rather than + bare verb.",
        say: [
          { text: "Fill the gap: I had coffee \u2026 tea. The answer is **instead of**: one in place of the other.", cue: "why1" },
          { text: "Why not the others? **instead**: alone it ends a sentence: I had coffee instead. **except**: except = not including.", cue: "why2" },
          { text: "The rule: instead of + noun or -ing; rather than + bare verb.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "I had coffee ____ tea.", [["swap", "instead of", true, "one in place | of the other"], ["cross", "instead", false, "alone it ends a sentence: | I had coffee instead"], ["groupOut", "except", false, "except = not | including"]], ["instead of + noun or -ing", "rather than + bare verb"]),
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
