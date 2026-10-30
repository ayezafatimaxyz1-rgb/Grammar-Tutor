/* Lesson 1.47: THAN: preposition or conjunction? */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "than-debate",
    title: "THAN: me or I?",
    phase: 1,
    unit: "p1-relations",
    level: "Advanced",
    minutes: 7,
    summary:
      "Taller than me or taller than I? Grammarians disagree on whether than is a preposition. Taller than me is standard in speech; taller than I am is the safest formal choice. With some verbs the pronoun changes the meaning.",
    objectives: [
      "Know that than me is widely accepted, and than I am is safest in formal writing.",
      "See how the pronoun can change the meaning: likes him more than me / than I.",
    ],
    steps: [
      {
        id: "two",
        title: "Two views",
        alt: "Three rows: She is taller than me (everyday, widely accepted). She is taller than I (formal, can sound stiff). She is taller than I am (safest, natural and formal).",
        say: [
          { text: "If than is a **preposition**, it takes the object form: _She is taller than me._ This is standard in everyday English.", cue: "v1" },
          { text: "If than is a **conjunction**, a clause follows, perhaps shortened: _She is taller than I (am)._ Traditional grammars prefer this.", cue: "v2" },
          { text: "The safest formal choice adds the verb: _She is taller than I am._ It is correct for everyone and never sounds stiff.", cue: "v3" },
        ],
        actions: K.lines("v", [["She is taller than me. (everyday)", { hl: "me" }], ["She is taller than I. (formal, stiff)", { hl: "I" }], ["She is taller than I am. (safest)", { hl: "I am" }]], { y: 160, gap: 115, size: 38 }),
      },
      {
        id: "meaning",
        title: "When the pronoun changes the meaning",
        alt: "Two sentences: She likes him more than me, meaning more than she likes me. She likes him more than I do, meaning more than I like him.",
        say: [
          { text: "With some verbs, the choice changes the meaning. _She likes him more than me_ = more than she likes me.", cue: "m1" },
          { text: "_She likes him more than I do_ = more than I like him. Adding the verb removes the doubt.", cue: "m2" },
        ],
        actions: [K.clear("clear-1"), ...K.lines("m", ["She likes him more than me. = than she likes me", "She likes him more than I do. = than I like him"], { y: 200, gap: 130, size: 34 })],
      },
      {
        id: "check",
        title: "Check: the safest form",
        alt: "The meaning examples remain on the board.",
        say: [{ text: "Which version is correct and natural in a formal essay?" }],
        actions: [],
        check: {
          id: "than-q1",
          source: "original",
          skill: "than + pronoun in formal writing",
          prompt: "Which is the safest choice for a formal essay?",
          options: [
            { text: "My opponent has more experience than I have.", correct: true, why: "Correct. Adding the verb is formal, natural and clear." },
            { text: "My opponent has more experience than me.", misconception: "than-pronoun", why: "Acceptable in speech and much writing, but some examiners prefer the full clause in formal style." },
            { text: "My opponent has more experience than myself.", misconception: "than-pronoun", why: "_Myself_ is a reflexive pronoun and is not used here. Use _than I have_ (or _than me_ informally)." },
          ],
        },
      },
    ],
  });
})();
