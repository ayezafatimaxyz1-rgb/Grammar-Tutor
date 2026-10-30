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
          { text: "After a preposition you can have a **noun**: _in the room._", cue: "f1" },
          { text: "An **object pronoun**: _for him, with them, between you and me._", cue: "f2" },
          { text: "An **-ing form**, the noun form of a verb: _before leaving, without saying._", cue: "f3" },
          { text: "A **wh-clause**: _It depends on what you mean. We talked about where to go._", cue: "f4" },
        ],
        actions: K.lines("f", [["noun: in the room", { hl: "the room", hlStyle: "underline", hlInk: "accent2" }], ["pronoun: for him · between you and me", { hl: "him", hlStyle: "underline", hlInk: "accent2" }], ["-ing: before leaving", { hl: "leaving", hlStyle: "underline", hlInk: "accent2" }], ["wh-clause: depends on what you mean", { hl: "what you mean", hlStyle: "underline", hlInk: "accent2" }]], { y: 130, gap: 100, size: 36 }),
      },
      {
        id: "not",
        title: "Two things that cannot",
        alt: "Crossed out: without to say, insist on that he resigns. Correct: without saying; insist that he resign, or insist on his resigning.",
        say: [
          { text: "Not a **to-infinitive**: _without to say_ is wrong; _without saying_ is right.", cue: "n1" },
          { text: "Not a **that-clause**: _They insisted on that he resign_ is wrong. Drop the preposition (_insisted that he resign_), or use a noun or -ing (_insisted on his resignation_).", cue: "n2" },
        ],
        actions: [K.clear("clear-1"), ...K.lines("n", [["✗ without to say → without saying", { ink: "trouble" }], ["✗ insisted on that he resign", { ink: "trouble" }], ["✓ insisted that he resign", { ink: "accent" }], ["✓ insisted on his resignation", { ink: "accent" }]], { y: 140, gap: 95, size: 36 })],
      },
      {
        id: "to",
        title: "The great trap: to as a preposition",
        alt: "Two kinds of to. To meet: to before a verb, infinitive marker. Look forward to meeting: to is a preposition, so -ing. List: look forward to, committed to, used to, object to, with a view to.",
        say: [
          { text: "Usually _to_ before a verb is just the infinitive marker: _I want to meet you._", cue: "t1" },
          { text: "But in some expressions _to_ is a **preposition**, so it needs -ing: _I look forward to meeting you._ Not _to meet._", cue: "t2" },
          { text: "Learn the list: _look forward to, be committed to, be used to (accustomed), object to, with a view to, devoted to, contribute to._", cue: "t3" },
          { text: "A test: can you put a noun after it? _I look forward to the meeting_ ✓. If yes, _to_ is a preposition, and a verb after it takes -ing.", cue: "t4" },
        ],
        actions: [
          K.clear("clear-2"),
          ...K.lines("t", [["I want to meet you. (infinitive)", { ink: "muted" }], ["I look forward to meeting you.", { hl: "meeting" }], ["committed to · used to · object to · with a view to", { size: 30, ink: "accent2" }], ["test: look forward to the meeting ✓", { size: 32 }]], { y: 130, gap: 100, size: 36 }),
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
