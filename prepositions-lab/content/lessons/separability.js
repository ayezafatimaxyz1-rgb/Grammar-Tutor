/* Lesson 2.24: where the object goes: turn it off, look after it. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "separability",
    title: "Turn it off, look after it",
    phase: 2,
    unit: "p2-phrasal",
    level: "Intermediate",
    minutes: 8,
    summary:
      "Separable phrasal verbs (turn off, put off, call off, give up) let a noun object go before or after the particle, but a pronoun must go in the middle: turn it off. Prepositional verbs (look after, look into, deal with) never split: look after it. A long object usually goes after the particle.",
    objectives: [
      "Put a pronoun between the verb and the particle of a separable phrasal verb: turn it off, never turn off it.",
      "Keep prepositional verbs together: look after them, deal with it, and place long objects at the end.",
    ],
    steps: [
      {
        id: "pronoun",
        title: "A pronoun goes in the middle",
        alt: "A switch being turned off. Rows: Turn off the light. Turn the light off. Turn it off. Crossed out: Turn off it.",
        say: [
          { text: "With a separable phrasal verb, a noun can stand on either side of the particle: _Turn off the light. Turn the light off._", cue: "r1" },
          { text: "But a pronoun must slot into the middle: _Turn it off._ Never _Turn off it._", cue: "r3" },
        ],
        actions: K.rows("r", [
          ["switchOff", "Turn off the light. · Turn the light off.", { hl: "off" }],
          ["slotIn", "Turn it off.", { hl: "it" }],
          ["cross", "✗ Turn off it.", { ink: "trouble" }],
        ], { y: 110, gap: 140 }),
      },
      {
        id: "together",
        title: "Prepositional verbs stay together",
        alt: "Left: an adult caring for children, labelled look after them (never look them after). Right: an eye looking into a box, labelled look into it (never look it into). Also: deal with it, call on her, get over it.",
        say: [
          { text: "In a prepositional verb, the small word is a preposition and must stay before its object: _She looks after them._ Never _looks them after._", cue: "t1" },
          { text: "_The police will look into it. We will deal with it. He got over it._ The pronoun goes at the end.", cue: "t2" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.panels("t", [
            ["careFor", "She looks after them.", "never: looks them after", { hl: "after them" }],
            ["lookInto", "They will look into it.", "never: look it into", { hl: "into it" }],
          ], { y: 60 }),
          { do: "write", id: "more", text: "deal with it · get over it · call on her", x: 480, y: 470, size: 32, ink: "accent2", anchor: "middle", gap: 400 },
        ],
      },
      {
        id: "long",
        title: "Long objects go to the end",
        alt: "Three pictures: a calendar with a short object (They called the meeting off), a calendar with a long object after the particle (called off the meeting that had been planned for Friday), a list of separable verbs.",
        say: [
          { text: "When the object is long, put it after the particle so the particle is not lost: _They called off the meeting that had been planned for Friday._", cue: "l2" },
          { text: "Common separable verbs for writing: _call off, put off, give up, set up, bring up, turn down, carry out, point out._", cue: "l3" },
        ],
        actions: [
          PLAB.kit.clear("clear-2"),
          ...PLAB.kit.grid("l", [
            ["calendar", "They called the meeting off.", "short object: either side", { hl: "off" }],
            ["calendar", "called off the meeting planned for Friday", "long object: after the particle", { hl: "called off" }],
            ["doc", "call off \u00b7 put off \u00b7 give up \u00b7 carry out", "common separable verbs", { ink: "accent2" }],
          ]),
        ],
      },
      {
        id: "check",
        title: "Check: word order",
        alt: "The board remains.",
        say: [{ text: "An original practice question." }],
        actions: [],
        check: {
          id: "separability-q1",
          source: "original",
          skill: "pronoun position",
          prompt: "The committee received the proposal but turned ___.",
          options: [
            { text: "it down", correct: true, why: "Correct. _Turn down_ is a separable phrasal verb, so the pronoun goes in the middle." },
            { text: "down it", misconception: "particle-preposition", why: "With a separable phrasal verb, a pronoun cannot follow the particle: _turned it down._" },
            { text: "it off", misconception: "particle-preposition", why: "_Turn off_ means switch off. To refuse a proposal is to _turn it down._" },
          ],
        },
      },
      {
        id: "check-2",
        title: "Check: one more",
        alt: "The board remains.",
        say: [{ text: "One more." }],
        actions: [],
        check: {
          id: "separability-q2",
          source: "original",
          skill: "prepositional verb order",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "The complaint is serious, and the inspector will look into it.", correct: true, why: "Correct. _Look into_ is a prepositional verb, so it stays together and the pronoun follows." },
            { text: "The complaint is serious, and the inspector will look it into.", misconception: "particle-preposition", why: "_Into_ is a preposition here and must come before its object: _look into it._" },
            { text: "The complaint is serious, and the inspector will look into.", misconception: "particle-preposition", why: "A preposition needs its object: _look into it._" },
          ],
        },
      },
    ],
  });
})();
