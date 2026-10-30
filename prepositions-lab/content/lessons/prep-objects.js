/* Lesson 0.3: what can follow a preposition. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "prep-objects",
    title: "What follows a preposition",
    phase: 1,
    unit: "p1-foundations",
    level: "Intermediate",
    minutes: 10,
    summary:
      "A preposition takes a noun, an object pronoun, an -ing form or a wh-clause, but not a to-infinitive or a that-clause. The big trap: when to is a preposition (look forward to meeting, committed to improving), it too takes -ing.",
    objectives: [
      "Use the right form after a preposition: noun, object pronoun, -ing or wh-clause.",
      "Avoid a that-clause after a preposition (insist on that).",
      "Recognise to as a preposition in look forward to, committed to, used to, object to, and use -ing after it.",
    ],
    steps: [
      {
        id: "forms",
        title: "Four things that can follow",
        alt: "Four rows: a noun (in the room), an object pronoun (for him), an -ing form (before leaving), a wh-clause (it depends on what you mean).",
        say: [
          { text: "Picture a preposition as a **hook**: something must hang on it, its object.", cue: "f1" },
          { text: "A **noun**: _in the room._ An **object pronoun**: _for him, between you and me._", cue: "f2" },
          { text: "An **-ing form**, an action used as a noun: _before leaving, without saying._", cue: "f3" },
          { text: "A **wh-clause**, a question-shaped object: _It depends on what you mean._", cue: "f4" },
        ],
        actions: PLAB.kit.rows("f", [
          ["hookBox", "noun: in the room", { hl: "the room", hlStyle: "underline", hlInk: "accent2" }],
          ["hookPerson", "pronoun: for him · between you and me", { hl: "him", hlStyle: "underline", hlInk: "accent2" }],
          ["hookRun", "-ing: before leaving", { hl: "leaving", hlStyle: "underline", hlInk: "accent2" }],
          ["hookQ", "wh-clause: depends on what you mean", { hl: "what you mean", hlStyle: "underline", hlInk: "accent2" }],
        ], { y: 100, gap: 118 }),
      },
      {
        id: "not",
        title: "Two things that cannot",
        alt: "Crossed out: without to say, insist on that he resigns. Correct: without saying; insist that he resign, or insist on his resigning.",
        say: [
          { text: "Two things cannot hang on the hook. A **to-infinitive**: _without to say_ is wrong; _without saying_ is right.", cue: "n1" },
          { text: "A **that-clause**: _They insisted on that he resign_ is wrong. Drop the preposition (_insisted that he resign_) or give it a noun (_insisted on his resignation_).", cue: "n2" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.rows("n", [
            ["hookNo", "✗ without to say → without saying", { ink: "trouble" }],
            ["hookNo", "✗ insisted on that he resign", { ink: "trouble" }],
            ["check", "✓ insisted that he resign", { ink: "accent" }],
            ["hookBox", "✓ insisted on his resignation", { ink: "accent" }],
          ], { y: 100, gap: 118 }),
        ],
      },
      {
        id: "to",
        title: "The great trap: to as a preposition",
        alt: "Two kinds of to. To meet: to before a verb, infinitive marker. Look forward to meeting: to is a preposition, so -ing. List: look forward to, committed to, used to, object to, with a view to.",
        say: [
          { text: "Usually _to_ before a verb is just the infinitive marker, an arrow towards an action: _I want to meet you._", cue: "t1" },
          { text: "But in some expressions _to_ is a **preposition**, a hook, so it needs -ing: _I look forward to meeting you._", cue: "t2" },
          { text: "Test: can a noun hang on it? _I look forward to the meeting_ ✓. If yes, use -ing for a verb. Learn: _look forward to, committed to, used to, object to, with a view to._", cue: "t3" },
        ],
        actions: [
          PLAB.kit.clear("clear-2"),
          ...PLAB.kit.rows("t", [
            ["arrowR", "I want to meet you. (infinitive)", { ink: "muted" }],
            ["hookRun", "I look forward to meeting you.", { hl: "meeting" }],
            ["hookBox", "test: look forward to the meeting ✓", {}],
            [null, "committed to · used to · object to · with a view to", { ink: "accent2", size: 28 }],
          ], { y: 100, gap: 115 }),
        ],
      },
      {
        id: "check-forward",
        title: "Check: exam style",
        alt: "The to examples remain on the board.",
        say: [{ text: "An original practice question on one of the most tested points." }],
        actions: [],
        check: {
          id: "objects-q1",
          source: "original",
          skill: "to as a preposition + -ing",
          prompt: "The government is committed to ___ literacy in rural areas.",
          options: [
            { text: "improving", correct: true, why: "Correct. In _committed to_, _to_ is a preposition (_committed to the cause_), so the verb takes -ing." },
            { text: "improve", misconception: "to-preposition", why: "_To improve_ treats _to_ as an infinitive marker. In _committed to_, it is a preposition: _committed to improving._" },
            { text: "be improving", misconception: "to-preposition", why: "This is not a form a preposition can take. Use -ing: _committed to improving._" },
          ],
        },
      },
      {
        id: "check-used",
        title: "Check: used to",
        alt: "The to examples remain on the board.",
        say: [{ text: "Careful: two different _used to_ patterns." }],
        actions: [],
        check: {
          id: "objects-q2",
          source: "original",
          skill: "be used to + -ing",
          prompt: "After ten years in Quetta, she is used to ___ in the cold.",
          options: [
            { text: "living", correct: true, why: "Correct. _Be used to_ means accustomed to, and _to_ is a preposition: _used to living._ (Compare _She used to live there_, a past habit, with the bare verb.)" },
            { text: "live", misconception: "to-preposition", why: "_Used to live_ is the past-habit pattern, without _is_. With _is used to_ (accustomed), use -ing." },
            { text: "lived", misconception: "to-preposition", why: "A preposition cannot be followed by a past form. Use -ing: _is used to living._" },
          ],
        },
      },
      {
        id: "summary",
        title: "The summary",
        alt: "After a preposition: noun, object pronoun, -ing, wh-clause. Not: to-infinitive, that-clause. To as a preposition takes -ing: look forward to meeting.",
        say: [{ text: "After a preposition: noun, object pronoun, -ing, wh-clause. Never a to-infinitive or a that-clause. And when **to** is a preposition, -ing follows.", cue: "c3" }],
        actions: [K.clear("clear-3"), ...K.lines("c", ["noun · object pronoun · -ing · wh-clause", ["not: to + verb · that-clause", { ink: "trouble" }], ["look forward to meeting · committed to improving", { size: 32, ink: "accent2" }]], { y: 160, gap: 100 })],
      },
    ],
  });
})();
