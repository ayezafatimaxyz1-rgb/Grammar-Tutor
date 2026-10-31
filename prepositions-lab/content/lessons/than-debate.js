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
          { text: "She is taller than he is. If **than** is a preposition, it takes the object form: _She is taller than me._ Standard in everyday English.", cue: "v1" },
          { text: "If than is a conjunction, a clause follows, perhaps shortened: _She is taller than I._ Traditional grammars prefer this, but it can sound stiff.", cue: "v2" },
          { text: "The safest formal choice adds the verb: _She is taller than I am._", cue: "v3" },
        ],
        actions: [
          ...PLAB.kit.pic("tl", "taller", 360, 20, 1.7),
          ...PLAB.kit.lines("v", [["She is taller than me. (everyday)", { hl: "me" }], ["She is taller than I. (formal, stiff)", { hl: "I" }], ["She is taller than I am. (safest)", { hl: "I am" }]], { y: 250, gap: 90, size: 36 }),
        ],
      },
      {
        id: "meaning",
        title: "When the pronoun changes the meaning",
        alt: "Two sentences: She likes him more than me, meaning more than she likes me. She likes him more than I do, meaning more than I like him.",
        say: [
          { text: "With some verbs, the pronoun changes the meaning. She loves him a lot and me a little: the thick arrow goes to him. _She likes him more than me_ = more than she likes me.", cue: "m1" },
          { text: "_She likes him more than I do_ = she and I both like him, and she likes him more. Adding the verb removes the doubt.", cue: "m2" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.pic("lm", "likesMore", 330, 20, 2.1),
          ...PLAB.kit.lines("m", ["She likes him more than me. = than she likes me", "She likes him more than I do. = than I like him"], { y: 290, gap: 100, size: 32 }),
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence She is taller with a gap me., then the candidates with pictures: than (right: comparison after -er); then (wrong: then = next, at that time); from (wrong: taller from is wrong). Rule: taller than, better than; then = time.",
        say: [
          { text: "Fill the gap: She is taller \u2026 me. What does the sentence want to say? The answer is **than**: comparison after -er.", cue: "why1" },
          { text: "Why not the others? **then**: then = next, at that time. **from**: taller from is wrong.", cue: "why2" },
          { text: "The rule: taller than, better than; then = time.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "She is taller ____ me.", [["taller", "than", true, "comparison after | -er"], ["timeline", "then", false, "then = next, | at that time"], ["origin", "from", false, "taller from | is wrong"]], ["taller than, better than", "then = time"]),
        ],
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
