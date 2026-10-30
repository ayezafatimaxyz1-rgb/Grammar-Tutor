/* Lesson 2.16: familiar with vs familiar to; aware of, conscious of, ignorant of. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "familiarity",
    title: "Familiar with, familiar to, aware of",
    phase: 2,
    unit: "p2-adjective",
    level: "Intermediate",
    minutes: 7,
    summary:
      "Familiar with puts the person first: the person knows the thing (I am familiar with the rules). Familiar to puts the thing first: the thing is known to the person (The rules are familiar to me). Aware of, conscious of and ignorant of take of, which names what the knowledge is about.",
    objectives: [
      "Switch between familiar with (person knows thing) and familiar to (thing known to person).",
      "Use aware of, conscious of, ignorant of and unaware of with of.",
    ],
    steps: [
      {
        id: "with-to",
        title: "Who comes first?",
        alt: "Left: a person who knows the way, labelled I am familiar with the route (person first: with). Right: the same route with an arrow to the person, labelled The route is familiar to me (thing first: to).",
        say: [
          { text: "Ask who is the subject. If the **person** comes first, the person moves with the thing they know well: _I am familiar with the route._", cue: "f1" },
          { text: "If the **thing** comes first, it is known **to** the person: _The route is familiar to me._ Same fact, different starting point.", cue: "f2" },
        ],
        actions: K.panels("f", [
          ["knowsWay", "I am familiar with the route.", "person first: with", { hl: "with" }],
          ["eyeLook", "The route is familiar to me.", "thing first: to", { hl: "to" }],
        ], { y: 60 }),
      },
      {
        id: "of",
        title: "Aware of, conscious of, ignorant of",
        alt: "A person with a light above the head, an arrow towards a problem. Rows: aware of the risks; conscious of her duties; ignorant of the law; unaware of the change.",
        say: [
          { text: "Knowledge needs something it is about. **Of** names that thing: _She is aware of the risks. He is conscious of his duties._", cue: "a1" },
          { text: "The negatives keep **of**: _unaware of the change, ignorant of the law._ A clause takes _that_: _aware that the risks are high._", cue: "a3" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.rows("a", [
            ["awareOf", "She is aware of the risks.", { hl: "aware of" }],
            ["person", "He is conscious of his duties.", { hl: "conscious of" }],
            ["gavel", "ignorant of the law · unaware of the change", { hl: "ignorant of" }],
            ["doc", "aware that the risks are high  (+ clause)", { ink: "accent2", size: 30 }],
          ], { y: 90, gap: 125 }),
        ],
      },
      {
        id: "why-not",
        title: "Why not the other one?",
        alt: "Left: a person who knows the route, labelled I am familiar with the city. Right: a house with an arrow to a person, labelled I am familiar to the city, which would mean the city knows me.",
        say: [
          { text: "_I am familiar with the city_: I know the city well. The person comes first, so **with**.", cue: "familiarw1" },
          { text: "_I am familiar to the city_ turns the picture round: now the city knows me, as if I were a famous face in its streets.", cue: "familiarw2" },
          { text: "**To** is right when the thing comes first: _The city is familiar to me._ Ask who knows whom: person first, with; thing first, to.", cue: "familiarw-r1" },
        ],
        actions: [
          K.clear("clear-why"),
          ...K.swap("familiarw", ["knowsWay", "I am familiar with the city.", "I know the city", { hl: "with" }], [[["house", -38, 0, 0.8], ["arrowR", 0, 0, 0.5], ["person", 40, 0, 0.8]], "✗ I am familiar to the city.", "would mean the city knows me", { ink: "trouble" }], ["person first: familiar with the thing", "thing first: familiar to the person"]),
        ],
      },
      {
        id: "check",
        title: "Check: choose the preposition",
        alt: "The board remains.",
        say: [{ text: "An original practice question." }],
        actions: [],
        check: {
          id: "familiarity-q1",
          source: "original",
          skill: "familiar with / to",
          prompt: "These procedures are familiar ___ every officer, and every officer is familiar ___ them.",
          options: [
            { text: "to … with", correct: true, why: "Correct. Thing first: known _to_ the person. Person first: familiar _with_ the thing." },
            { text: "with … to", misconception: "familiar-with-to", why: "Reversed. Ask who comes first: the procedures are known _to_ officers; officers are familiar _with_ procedures." },
            { text: "of … of", misconception: "familiar-with-to", why: "_Familiar of_ is not used. _Of_ belongs with _aware_ and _conscious._" },
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
          id: "familiarity-q2",
          source: "original",
          skill: "aware of",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "The public is not fully aware of its rights.", correct: true, why: "Correct. _Aware of_: of names what the knowledge is about." },
            { text: "The public is not fully aware about its rights.", misconception: "familiar-with-to", why: "_Aware about_ is common in speech, but formal English uses _aware of._" },
            { text: "The public is not fully aware with its rights.", misconception: "familiar-with-to", why: "_With_ goes with _familiar._ _Aware_ takes _of._" },
          ],
        },
      },
    ],
  });
})();
