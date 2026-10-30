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
          { text: "Some teachers say you must never end a sentence with a preposition. Grammarians and usage guides agree this is a **myth**, borrowed from Latin and never true of English.", cue: "m1" },
          { text: "_What are you looking at? This is the house I grew up in._ Both are correct, natural English. When a preposition is left at the end like this, grammarians say it is **stranded**.", cue: "m2" },
        ],
        actions: K.lines("m", [["What are you looking at?", { hl: "at" }], ["This is the house I grew up in.", { hl: "in" }], ["correct, natural English", { ink: "accent2", size: 30 }]], { y: 160, gap: 110, size: 40 }),
      },
      {
        id: "formal",
        title: "The formal alternative",
        alt: "Two versions. Everyday: the committee the report was sent to. Formal: the committee to which the report was sent. Note: with whom, in which.",
        say: [
          { text: "In very formal writing, such as a CSS essay or an official letter, you can move the preposition to the front with _which_ or _whom_: _the committee to which the report was sent._", cue: "f2" },
          { text: "Use it when it reads naturally. Forcing it can sound stiff: _What are you looking at?_ should never become _At what are you looking?_", cue: "f3" },
        ],
        actions: [K.clear("clear-1"), ...K.lines("f", [["everyday: the committee the report was sent to", { size: 32, ink: "muted" }], ["formal: the committee to which the report was sent", { size: 32, hl: "to which" }], ["✗ At what are you looking? (too stiff)", { size: 32, ink: "trouble" }]], { y: 160, gap: 110 })],
      },
      {
        id: "phrasal",
        title: "Never split a phrasal verb",
        alt: "Correct: the noise she put up with. Wrong: the noise up with which she put. Phrasal verbs move as a unit.",
        say: [
          { text: "With phrasal verbs the preposition belongs to the verb, so it must stay at the end: _the noise she put up with._", cue: "x1" },
          { text: "_The noise up with which she put_ is impossible. (Churchill is often said to have mocked the false rule this way, though the story is probably invented.)", cue: "x2" },
        ],
        actions: [K.clear("clear-2"), ...K.lines("x", [["the noise she put up with ✓", { hl: "put up with", hlStyle: "underline", hlInk: "accent2" }], ["✗ the noise up with which she put", { ink: "trouble" }]], { y: 200, gap: 130, size: 38 })],
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
