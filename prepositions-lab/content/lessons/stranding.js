/* Lesson 0.4: ending a sentence with a preposition. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "stranding",
    title: "Ending a sentence with a preposition",
    phase: 1,
    unit: "p1-foundations",
    level: "Intermediate",
    minutes: 7,
    summary:
      "The so-called rule never end a sentence with a preposition is a myth that usage guides reject. Stranded prepositions are normal English. In very formal writing, moving the preposition forward (the committee to which...) can sound more polished, and phrasal verbs cannot be split.",
    objectives: [
      "Know that a preposition at the end of a sentence is grammatical.",
      "Choose the fronted pattern (to which, in which) in formal writing when it reads naturally.",
      "Never split a phrasal verb: the noise she put up with.",
    ],
    steps: [
      {
        id: "myth",
        title: "A rule that is not a rule",
        alt: "Natural sentences ending in a preposition: What are you looking at? This is the house I grew up in. Marked: correct English.",
        say: [
          { text: "Some teachers say you must never end a sentence with a preposition. Grammarians agree this is a **myth**, borrowed from Latin.", cue: "m1" },
          { text: "_What are you looking at?_ The eye looks at something, and _at_ simply stays at the end. _This is the house I grew up in._ Both are natural, correct English. A preposition left at the end is called **stranded**.", cue: "m2" },
        ],
        actions: PLAB.kit.panels("m", [
          ["eyeLook", "What are you looking at?", "correct", { hl: "at" }],
          ["house", "the house I grew up in", "correct", { hl: "in" }],
        ]),
      },
      {
        id: "formal",
        title: "The formal alternative",
        alt: "Two versions. Everyday: the committee the report was sent to. Formal: the committee to which the report was sent. Note: with whom, in which.",
        say: [
          { text: "In very formal writing you can move the preposition to the front, next to _which_ or _whom_. The picture shows the last word jumping forward.", cue: "f1" },
          { text: "_the committee the report was sent to_ → _the committee to which the report was sent._ Use it when it reads naturally; _At what are you looking?_ is too stiff.", cue: "f2" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.pic("move", "wordsMove", 330, 40, 2.1),
          ...PLAB.kit.lines("f", [["the committee the report was sent to", { size: 30, ink: "muted" }], ["the committee to which the report was sent", { size: 30, hl: "to which" }], ["✗ At what are you looking? (too stiff)", { size: 30, ink: "trouble" }]], { y: 290, gap: 80 }),
        ],
      },
      {
        id: "phrasal",
        title: "Never split a phrasal verb",
        alt: "Correct: the noise she put up with. Wrong: the noise up with which she put. Phrasal verbs move as a unit.",
        say: [
          { text: "With phrasal verbs, the words are chained together and move as one unit: _put up with._ So the preposition must stay at the end: _the noise she put up with._", cue: "x1" },
          { text: "_The noise up with which she put_ breaks the chain and is impossible.", cue: "x2" },
        ],
        actions: [
          PLAB.kit.clear("clear-2"),
          ...PLAB.kit.pic("chainpic", "chain", 330, 50, 2.1),
          { do: "write", id: "c1", text: "put", x: 393, y: 145, size: 26, anchor: "middle" },
          { do: "write", id: "c2", text: "up", x: 485, y: 145, size: 26, anchor: "middle", sync: true },
          { do: "write", id: "c3", text: "with", x: 577, y: 145, size: 26, anchor: "middle", sync: true },
          ...PLAB.kit.lines("x", [["the noise she put up with ✓", { hl: "put up with", hlStyle: "underline", hlInk: "accent2" }], ["✗ the noise up with which she put", { ink: "trouble" }]], { y: 330, gap: 100, size: 36 }),
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence This is the house I grew up with a gap., then the candidates with pictures: in (right: grow up in a place); at (wrong: at = a point, not a home); on (wrong: on = a surface). Rule: ending with a preposition is fine; formal: the house in which I grew up.",
        say: [
          { text: "Fill the gap: This is the house I grew up \u2026. The answer is **in**: grow up in a place.", cue: "why1" },
          { text: "Why not the others? **at**: at = a point, not a home. **on**: on = a surface.", cue: "why2" },
          { text: "The rule: ending with a preposition is fine; formal: the house in which I grew up.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "This is the house I grew up ____.", [["house", "in", true, "grow up in | a place"], ["reachDot", "at", false, "at = a point, | not a home"], ["onBase", "on", false, "on = a surface"]], ["ending with a preposition is fine", "formal: the house in which I grew up"]),
        ],
      },
      {
        id: "check",
        title: "Check: formal register",
        alt: "The phrasal verb examples remain on the board.",
        say: [{ text: "Which suits a formal official report best?" }],
        actions: [],
        check: {
          id: "strand-q1",
          source: "original",
          skill: "fronted prepositions in formal writing",
          prompt: "Which version best suits a formal government report?",
          options: [
            { text: "The province to which the funds were allocated has not submitted accounts.", correct: true, why: "Correct. Fronting _to which_ is natural and polished in formal writing." },
            { text: "The province the funds were allocated to hasn't submitted accounts.", misconception: "register-informal", why: "This is correct English, but the contraction and stranded preposition make it less formal than a report needs." },
            { text: "The province which to the funds were allocated has not submitted accounts.", misconception: "register-informal", why: "The preposition must come before _which_: _to which._" },
          ],
        },
      },
    ],
  });
})();
