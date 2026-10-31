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
        alt: "Four pictures: a dot in a box (a noun: in the room), two people (a pronoun: between you and me), feet walking (an -ing form: before leaving), a question mark (a wh-clause: on what you mean).",
        say: [
          { text: "Picture a preposition as a **hook**: something must hang on it, its object.", cue: "f1" },
          { text: "A **noun**: _in the room._ An **object pronoun**: _for him, between you and me._", cue: "f2" },
          { text: "An **-ing form**, an action used as a noun: _before leaving, without saying._", cue: "f3" },
          { text: "A **wh-clause**, a question-shaped object: _It depends on what you mean._", cue: "f4" },
        ],
        actions: [
          PLAB.kit.clear("clear-rd-forms"),
          ...PLAB.kit.grid("f", [
            ["dotIn", "a noun: in the room", "a thing", { hl: "in" }],
            ["people", "a pronoun: between you and me", "object form: me, him, us", { hl: "me" }],
            ["feet", "-ing: before leaving", "an action used as a noun", { hl: "leaving" }],
            ["question", "a wh-clause: on what you mean", "a question-shaped object", { hl: "what you mean" }],
          ]),
        ],
      },
      {
        id: "not",
        title: "Two things that cannot",
        alt: "Four pictures: a hook with a cross (without to say), a tick (without saying), a cross (insisted on that he resign), a tick (insisted that he resign; insisted on his resignation).",
        say: [
          { text: "Two things cannot hang on the hook. A **to-infinitive**: _without to say_ is wrong; _without saying_ is right.", cue: "n1" },
          { text: "A **that-clause**: _They insisted on that he resign_ is wrong. Drop the preposition (_insisted that he resign_) or give it a noun (_insisted on his resignation_).", cue: "n3" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.grid("n", [
            ["hookNo", "\u2717 without to say", "no to + verb after a preposition", { ink: "trouble" }],
            ["check", "\u2713 without saying", "-ing instead", { hl: "saying" }],
            ["cross", "\u2717 insisted on that he resign", "no that-clause after a preposition", { ink: "trouble" }],
            ["check", "\u2713 insisted that he resign", "or: insisted on his resignation", {  }],
          ]),
        ],
      },
      {
        id: "to",
        title: "The great trap: to as a preposition",
        alt: "Four pictures: an arrow (I want to meet you: infinitive), an eye looking ahead to a star (I look forward to meeting you), a calendar (test: look forward to the meeting), a person on a line (committed to, used to, object to).",
        say: [
          { text: "Usually _to_ before a verb is just the infinitive marker, an arrow towards an action: _I want to meet you._", cue: "t1" },
          { text: "But in some expressions _to_ is a **preposition**, a hook, so it needs -ing: _I look forward to meeting you._", cue: "t2" },
          { text: "Test: can a noun hang on it? _I look forward to the meeting_ ✓. If yes, use -ing for a verb. Learn: _look forward to, committed to, used to, object to, with a view to._", cue: "t3" },
        ],
        actions: [
          PLAB.kit.clear("clear-2"),
          ...PLAB.kit.grid("t", [
            ["arrowR", "I want to meet you.", "to + verb: infinitive", {  }],
            ["lookAhead", "I look forward to meeting you.", "to is a preposition: -ing", { hl: "meeting" }],
            ["calendar", "test: look forward to the meeting \u2713", "a noun fits, so use -ing", { hl: "the meeting" }],
            ["stickTo", "committed to \u00b7 used to \u00b7 object to", "the same trap", { ink: "accent2" }],
          ]),
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
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence I look forward to with a gap you., then the candidates with pictures: meeting (right: to is a preposition: -ing); meet (wrong: to meet is the infinitive); met (wrong: a past form). Rule: look forward to, committed to, used to + -ing; test: a noun fits (to the meeting).",
        say: [
          { text: "Fill the gap: I look forward to \u2026 you. What does the sentence want to say? The answer is **meeting**: to is a preposition: -ing.", cue: "why1" },
          { text: "Why not the others? **meet**: to meet is the infinitive. **met**: a past form.", cue: "why2" },
          { text: "The rule: look forward to, committed to, used to + -ing; test: a noun fits (to the meeting).", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "I look forward to ____ you.", [["lookAhead", "meeting", true, "to is a | preposition: -ing"], ["arrowR", "meet", false, "to meet is the | infinitive"], ["pointPast", "met", false, "a past form"]], ["look forward to, committed to, used to + -ing", "test: a noun fits (to the meeting)"]),
        ],
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
