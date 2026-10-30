/* Lesson 2.2: believe vs believe in; trust in, confide in, succeed in, persist in. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "believe-in",
    title: "Believe in, succeed in, persist in",
    phase: 2,
    unit: "p2-verb",
    level: "Intermediate",
    minutes: 8,
    summary:
      "Believe someone means you accept what they say. Believe in something means you place your trust inside it: its existence, its value or its future. Trust in, confide in, succeed in and persist in use the same picture of being placed inside.",
    objectives: [
      "Tell believe someone (their words are true) from believe in someone or something (trust in its value or existence).",
      "Use succeed in + -ing and persist in + -ing, never succeed to do.",
    ],
    steps: [
      {
        id: "two-meanings",
        title: "Believe him or believe in him?",
        alt: "Two panels. Left: a person with a speech bubble and a tick, labelled believe him: his words are true. Right: a heart inside a box, labelled believe in him: trust placed inside.",
        say: [
          { text: "**Believe** with no preposition is about words: you accept that what someone says is true. _I believe him; he is telling the truth._", cue: "b1" },
          { text: "**Believe in** puts your trust inside something: you trust that it exists, or that it is good, or that it will succeed. _I believe in him; he will do well._", cue: "b2" },
          { text: "So _believe in God, believe in democracy, believe in hard work._ The box is the thing, and your trust is placed in it.", cue: "ex" },
        ],
        actions: [
          ...K.panels("b", [
            ["believeWords", "I believe him.", "his words are true"],
            ["beliefIn", "I believe in him.", "my trust is placed in him", { hl: "in" }],
          ], { y: 60 }),
          { do: "write", id: "ex", text: "believe in democracy · believe in hard work", x: 480, y: 470, size: 34, anchor: "middle", ink: "accent2", gap: 400 },
        ],
      },
      {
        id: "trust-confide",
        title: "Trust in, confide in",
        alt: "An envelope of secrets with an arrow going into a person. Sentences: She confided in her sister. Trust in God, and do your best.",
        say: [
          { text: "When you **confide in** someone, you place your secrets inside them for safe keeping.", cue: "pic-0-0" },
          { text: "_She confided in her sister._ Note: you confide **in** a person, but you confide a secret **to** them: _She confided her fears to her sister._", cue: "s1" },
          { text: "**Trust** usually needs no preposition: _I trust you._ **Trust in** is more formal or religious, trust placed inside: _Trust in God._", cue: "s2" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.pic("pic", "confideIn", 340, 40, 2),
          { do: "write", id: "s1", text: "She confided in her sister.", x: 480, y: 300, size: 40, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s1-h", target: "s1", word: "confided in" },
          { do: "write", id: "s1b", text: "She confided her fears to her sister.", x: 480, y: 370, size: 30, anchor: "middle", ink: "muted" },
          { do: "write", id: "s2", text: "I trust you. · Trust in God.", x: 480, y: 470, size: 36, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s2-h", target: "s2", word: "Trust in" },
        ],
      },
      {
        id: "succeed-persist",
        title: "Succeed in, persist in",
        alt: "Left: a person inside an area with a flag, labelled succeed in passing. Right: a looping arrow inside a box, labelled persist in asking. Crossed out: succeed to pass.",
        say: [
          { text: "**Succeed in** sees the task as an area you work inside until you reach the flag: _She succeeded in passing the CSS exam._", cue: "p1" },
          { text: "**Persist in** is going round and round inside the same activity, not giving up: _He persisted in asking questions._", cue: "p2" },
          { text: "Both take the -ing form, because **in** is a preposition. _Succeed to pass_ is wrong.", cue: "wrong" },
        ],
        actions: [
          K.clear("clear-2"),
          ...K.panels("p", [
            ["succeedIn", "succeeded in passing", "inside the task, to the flag", { hl: "passing" }],
            ["persistIn", "persisted in asking", "round and round, not stopping", { hl: "asking" }],
          ], { y: 60 }),
          { do: "write", id: "wrong", text: "✗ She succeeded to pass the exam.", x: 480, y: 470, size: 34, anchor: "middle", ink: "trouble", gap: 400 },
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence I believe with a gap democracy., then the candidates with pictures: in (right: trust placed in an idea); on (wrong: on = resting on a surface; belief goes inside); (no word) (wrong: believe + a person = accept their words). Rule: believe in = trust its value or existence; believe someone = accept their words.",
        say: [
          { text: "Fill the gap: I believe \u2026 democracy. The answer is **in**: trust placed in an idea.", cue: "why1" },
          { text: "Why not the others? **on**: on = resting on a surface; belief goes inside. **(no word)**: believe + a person = accept their words.", cue: "why2" },
          { text: "The rule: believe in = trust its value or existence; believe someone = accept their words.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "I believe ____ democracy.", [["beliefIn", "in", true, "trust placed | in an idea"], ["pressOn", "on", false, "on = resting on a | surface; belief goes inside"], ["believeWords", "(no word)", false, "believe + a person | = accept their words"]], ["believe in = trust its value or existence", "believe someone = accept their words"]),
        ],
      },
      {
        id: "check",
        title: "Check: meaning",
        alt: "The panels remain on the board.",
        say: [{ text: "An original practice question." }],
        actions: [],
        check: {
          id: "believe-in-q1",
          source: "original",
          skill: "believe vs believe in",
          prompt: "Which sentence means that the speaker trusts the value of democracy?",
          options: [
            { text: "I believe in democracy.", correct: true, why: "Correct. _Believe in_ places your trust inside the idea: you trust that it is good." },
            { text: "I believe democracy.", misconception: "believe-in", why: "_Believe_ with no preposition takes a person or a statement whose words you accept, not an idea whose value you trust." },
            { text: "I believe on democracy.", misconception: "believe-in", why: "_Believe on_ is not used. Trust is placed _in_ something." },
          ],
        },
      },
      {
        id: "check-2",
        title: "Check: sentence correction",
        alt: "The panels remain on the board.",
        say: [{ text: "One more, in sentence-correction style." }],
        actions: [],
        check: {
          id: "believe-in-q2",
          source: "original",
          skill: "succeed in + -ing",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "The government succeeded in reducing inflation.", correct: true, why: "Correct. _Succeed in_ + -ing." },
            { text: "The government succeeded to reduce inflation.", misconception: "succeed-in", why: "_Succeed_ does not take to + verb. Use _succeeded in reducing._" },
            { text: "The government succeeded on reducing inflation.", misconception: "succeed-in", why: "The task is pictured as an area you work inside, so _succeed in._" },
          ],
        },
      },
    ],
  });
})();
