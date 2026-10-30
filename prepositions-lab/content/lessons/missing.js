/* Lesson 2.31: missing prepositions: listen to, wait for, explain to someone. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "missing",
    title: "Missing prepositions",
    phase: 2,
    unit: "p2-errors",
    level: "Intermediate",
    minutes: 8,
    summary:
      "The opposite error: leaving out a preposition the verb needs. Listen to music, wait for the bus, explain the rule to someone (never explain me), reply to a letter, belong to, happen to, object to, apologise to someone for something, and say something to someone (but tell someone).",
    objectives: [
      "Keep the preposition after listen, wait, reply, belong, happen, object and apologise.",
      "Use explain it to me and say it to me, but tell me, never explain me or say me.",
    ],
    steps: [
      {
        id: "needed",
        title: "A gap where the preposition belongs",
        alt: "Two word boxes with a gap and a question mark between them. Rows: listen to the news (not listen the news); wait for the bus; reply to the letter; belong to the state.",
        say: [
          { text: "Some verbs cannot reach their object without a bridge. Leave the bridge out and the sentence has a gap.", cue: "pic-0-0" },
          { text: "_Listen to the news_ (not _listen the news_), _wait for the bus, reply to the letter, belong to the state._", cue: "r1" },
        ],
        actions: [
          ...K.pic("pic", "gapSlot", 340, 10, 1.8),
          ...K.rows("r", [
            ["speak", "listen to the news  ✗ listen the news", { hl: "listen to" }],
            ["bus", "wait for the bus · reply to the letter", { hl: "wait for" }],
            ["flag", "This land belongs to the state.", { hl: "belongs to" }],
          ], { y: 230, gap: 120 }),
        ],
      },
      {
        id: "explain",
        title: "Explain TO someone, say TO someone, tell someone",
        alt: "A person giving a document to another person with an arrow. Rows: Explain the rule to me (not explain me the rule). She said to me (not said me). She told me (no preposition with tell).",
        say: [
          { text: "**Explain** and **say** move information _to_ a listener, so the listener needs **to**: _Please explain the rule to me._ Never _explain me the rule._", cue: "e1" },
          { text: "_She said to me that..._ never _She said me._ But **tell** takes the person directly: _She told me the truth._", cue: "e2" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.rows("e", [
            ["giveTo", "Please explain the rule to me.  ✗ explain me", { hl: "to me" }],
            ["speak", "She said to me that ...  ✗ she said me", { hl: "said to me" }],
            ["speak", "She told me the truth.  (tell + person)", { hl: "told me" }],
          ], { y: 110, gap: 140 }),
        ],
      },
      {
        id: "more",
        title: "Apologise to, object to, happen to",
        alt: "Rows: He apologised to the court for the delay (to a person, for a reason). Many objected to the decision. What happened to the file?",
        say: [
          { text: "**Apologise** has two bridges: **to** the person, **for** the reason. _He apologised to the court for the delay._", cue: "m1" },
          { text: "_Many objected to the decision. What happened to the file?_ Leaving out **to** here is a frequent error.", cue: "m2" },
        ],
        actions: [
          K.clear("clear-2"),
          ...K.rows("m", [
            ["flowersApology", "He apologised to the court for the delay.", { hl: "to" }],
            ["cross", "Many objected to the decision.", { hl: "objected to" }],
            ["searchQ", "What happened to the file?", { hl: "happened to" }],
          ], { y: 110, gap: 140 }),
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence Please listen with a gap me carefully., then the candidates with pictures: to (right: listen needs to before its object); (no word) (wrong: listen cannot reach its object alone); at (wrong: at goes with look). Rule: listen to, wait for, reply to, belong to; explain it to me.",
        say: [
          { text: "Fill the gap: Please listen \u2026 me carefully. The answer is **to**: listen needs to before its object.", cue: "why1" },
          { text: "Why not the others? **(no word)**: listen cannot reach its object alone. **at**: at goes with look.", cue: "why2" },
          { text: "The rule: listen to, wait for, reply to, belong to; explain it to me.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "Please listen ____ me carefully.", [["speak", "to", true, "listen needs to | before its object"], ["cross", "(no word)", false, "listen cannot reach | its object alone"], ["eyeLook", "at", false, "at goes with look"]], ["listen to, wait for, reply to, belong to", "explain it to me"]),
        ],
      },
      {
        id: "check",
        title: "Check: sentence correction",
        alt: "The board remains.",
        say: [{ text: "An original practice question." }],
        actions: [],
        check: {
          id: "missing-q1",
          source: "original",
          skill: "explain to",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "The officer explained the new procedure to the applicants.", correct: true, why: "Correct. The listener takes _to_: explain something _to_ someone." },
            { text: "The officer explained the applicants the new procedure.", misconception: "missing-prep", why: "_Explain_ cannot take the listener directly. Use _explained the procedure to the applicants._" },
            { text: "The officer explained to the applicants about the new procedure.", misconception: "missing-prep", why: "_Explain_ takes the thing directly; _about_ is not needed: _explained the procedure._" },
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
          id: "missing-q2",
          source: "original",
          skill: "listen to / wait for",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "We waited for an hour and listened to the speeches.", correct: true, why: "Correct. _Wait for_ (here, for a length of time) and _listen to._" },
            { text: "We waited an hour and listened the speeches.", misconception: "missing-prep", why: "_Listen_ needs _to_ before its object: _listened to the speeches._" },
            { text: "We waited for an hour and listened at the speeches.", misconception: "missing-prep", why: "_Listen at_ is not used. Use _listen to._" },
          ],
        },
      },
    ],
  });
})();
