/* Lesson 2.17: formal adjectives: impervious to, contingent on/upon, conducive to, averse to, tantamount to, commensurate with. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "formal-adjectives",
    title: "Conducive to, contingent on, tantamount to",
    phase: 2,
    unit: "p2-adjective",
    level: "Advanced",
    minutes: 9,
    summary:
      "Six formal adjectives for essays and precis. Conducive to (leading towards a result), averse to (turned away from), impervious to (things bounce off), tantamount to (equal in effect to) all take to. Contingent on or upon rests on a condition, like depend on. Commensurate with goes together with something in size.",
    objectives: [
      "Use conducive to, averse to, impervious to and tantamount to, and know the picture behind each.",
      "Use contingent on (upon) for a condition and commensurate with for matching size or level.",
    ],
    steps: [
      {
        id: "to-group",
        title: "Four that take TO",
        alt: "Rows: conducive to growth (a box with an arrow leading to a growing plant); averse to risk (a person turning away); impervious to criticism (a shield with arrows bouncing off); tantamount to a confession (an equals sign).",
        say: [
          { text: "**Conducive to** leads towards a good result: _Peace is conducive to economic growth._", cue: "t1" },
          { text: "**Averse to** is turned away from something: _The bank is averse to risk._ **Impervious to**: nothing gets through, it bounces off. _He seemed impervious to criticism._", cue: "t2" },
          { text: "**Tantamount to** means equal in effect to: _His silence was tantamount to a confession._", cue: "t4" },
        ],
        actions: K.rows("t", [
          ["growTo", "Peace is conducive to economic growth.", { hl: "conducive to" }],
          ["turnAway", "The bank is averse to risk.", { hl: "averse to" }],
          ["bounceOff", "He seemed impervious to criticism.", { hl: "impervious to" }],
          ["likenTo", "His silence was tantamount to a confession.", { hl: "tantamount to", size: 30 }],
        ], { y: 90, gap: 125 }),
      },
      {
        id: "on-with",
        title: "Contingent on, commensurate with",
        alt: "Left: a block resting on a pillar, labelled contingent on approval (rests on a condition). Right: a level balance, labelled pay commensurate with experience (matching in size).",
        say: [
          { text: "**Contingent on** (or **upon**) uses the support picture from _depend on_: the plan rests on a condition. _The loan is contingent on approval by the board._", cue: "c1" },
          { text: "**Commensurate with** means matching in size or level, the two sides of the balance going together: _a salary commensurate with experience._", cue: "c2" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.panels("c", [
            ["support", "contingent on approval", "rests on a condition", { hl: "on" }],
            ["levelScale", "commensurate with experience", "matching in size", { hl: "with" }],
          ], { y: 60 }),
        ],
      },
      {
        id: "traps",
        title: "Traps",
        alt: "Four pictures with the right partner: an arrow to a growing plant (conducive to, not for), a block on a pillar (contingent on, not to), an equals sign (tantamount to, not with), a level balance (commensurate with).",
        say: [
          { text: "The common errors come from guessing: _conducive for, contingent to, tantamount with._ Each of these words has one partner.", cue: "w1" },
          { text: "Remember the pictures: towards the result, turned away, bouncing off, equal to, resting on, matching with.", cue: "w2" },
        ],
        actions: [
          PLAB.kit.clear("clear-2"),
          ...PLAB.kit.grid("w", [
            ["growTo", "conducive to (\u2717 for)", "leading towards a result", { hl: "conducive to" }],
            ["support", "contingent on (\u2717 to)", "resting on a condition", { hl: "contingent on" }],
            ["likenTo", "tantamount to (\u2717 with)", "equal in effect to", { hl: "tantamount to" }],
            ["levelScale", "commensurate with", "matching in size", { hl: "commensurate with" }],
          ]),
        ],
      },
      {
        id: "check",
        title: "Check: essay style",
        alt: "The board remains.",
        say: [{ text: "An original practice question in CSS essay style." }],
        actions: [],
        check: {
          id: "formal-adj-q1",
          source: "original",
          skill: "conducive to",
          prompt: "Political stability is conducive ___ foreign investment.",
          options: [
            { text: "to", correct: true, why: "Correct. _Conducive to_: leading towards a result." },
            { text: "for", misconception: "formal-adjectives", why: "_Conducive for_ is a frequent error. The word takes _to._" },
            { text: "with", misconception: "formal-adjectives", why: "_With_ belongs to _commensurate with,_ not _conducive._" },
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
          id: "formal-adj-q2",
          source: "original",
          skill: "commensurate with",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "Punishment should be commensurate with the crime.", correct: true, why: "Correct. _Commensurate with_: matching in size." },
            { text: "Punishment should be commensurate on the crime.", misconception: "formal-adjectives", why: "_On_ belongs to _contingent on._ _Commensurate_ takes _with._" },
            { text: "Punishment should be commensurate for the crime.", misconception: "formal-adjectives", why: "_Commensurate for_ is not used." },
          ],
        },
      },
    ],
  });
})();
