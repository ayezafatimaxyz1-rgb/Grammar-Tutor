/* Lesson 1.39: WITH (and WITHOUT): company, instrument, feature, manner, cause. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "with-without",
    title: "WITH: company, tool and manner",
    phase: 1,
    unit: "p1-relations",
    level: "Intermediate",
    minutes: 9,
    summary:
      "With puts two things together: people (with friends), a tool (cut with a knife), a feature (a girl with long hair), a manner (with care) and a cause of a feeling (shaking with fear). Without is its opposite, taught in its own lesson.",
    objectives: [
      "Use with for company, instrument, feature, manner and the cause of a physical reaction.",
      "Tell with (a tool you hold) from by (a means or method), ready for the next lesson.",
    ],
    steps: [
      {
        id: "together",
        title: "Together",
        alt: "Two stick figures side by side. Sentence: She came with her brother. Then a hand holding a knife cutting bread: cut the bread with a knife.",
        say: [
          { text: "**With** puts two things together. Two people side by side: _She came with her brother._", cue: "s1" },
          { text: "A tool in your hand goes together with the action: _Cut the bread with a knife. Write with a pen._", cue: "s2" },
        ],
        actions: [
          { do: "draw", id: "p1", shape: "person", x: 180, y: 120, scale: 0.9, ink: "accent", dur: 700 },
          { do: "draw", id: "p2", shape: "person", x: 250, y: 130, scale: 0.8, ink: "accent2", dur: 700 },
          { do: "write", id: "s1", text: "She came with her brother.", x: 220, y: 300, size: 30, anchor: "middle", gap: 300 },
          { do: "highlight", id: "s1-h", target: "s1", word: "with" },
          { do: "draw", id: "bread", shape: "ellipse", cx: 690, cy: 200, rx: 130, ry: 45, ink: "accent2", fill: "soft", dur: 700, gap: 500 },
          { do: "draw", id: "knife", shape: "group", ink: "main", width: 4, dur: 600, parts: [{ shape: "line", from: [640, 110], to: [700, 190] }, { shape: "line", from: [610, 70], to: [640, 110], width: 6 }] },
          { do: "write", id: "s2", text: "cut the bread with a knife", x: 690, y: 300, size: 30, anchor: "middle" },
          { do: "highlight", id: "s2-h", target: "s2", word: "with" },
        ],
      },
      {
        id: "more",
        title: "Feature, manner and cause",
        alt: "Three rows: a feature, a girl with long hair; a manner, handle with care; a cause, shaking with fear.",
        say: [
          { text: "**With** puts two things together. A **feature** goes together with a person: the long hair is part of her. _a girl with long hair._", cue: "m1" },
          { text: "A **manner** goes together with an action: the hands carry the box carefully. _Handle with care._", cue: "m2" },
          { text: "A **cause** of a physical reaction goes together with it: the fear and the shaking come together. _shaking with fear, red with anger._", cue: "m3" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.panels("m", [
            ["longHair", "a girl with long hair", "a feature", { hl: "with" }],
            ["careBox", "handle with care", "a manner", { hl: "with" }],
            ["shaking", "shaking with fear", "a cause", { hl: "with" }],
          ]),
        ],
      },
      {
        id: "with-by",
        title: "With a tool, by a means",
        alt: "Two columns: with a pen, with a key (a tool you hold). By hand, by email, by car (a means or method, no article).",
        say: [
          { text: "Both _with_ and _by_ answer _how?_ **With** names a physical tool you hold in your hand: _written with a pen, opened with a key._", cue: "w1" },
          { text: "**By** names a means or method, usually with no article: the letter travels by email. _sent by email, made by hand, by car._", cue: "w2" },
        ],
        actions: [
          PLAB.kit.clear("clear-2"),
          ...PLAB.kit.panels("w", [
            ["pen", "with a pen", "a tool you hold", { hl: "with" }],
            ["emailBy", "by email · by hand · by car", "a means (no article)", { hl: "by", size: 26 }],
          ]),
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence She cut the bread with a gap a knife., then the candidates with pictures: with (right: a tool you hold); by (wrong: by + a means: by hand, by email); from (wrong: from = origin). Rule: with + a tool; by + a means (no article).",
        say: [
          { text: "Fill the gap: She cut the bread \u2026 a knife. The answer is **with**: a tool you hold.", cue: "why1" },
          { text: "Why not the others? **by**: by + a means: by hand, by email. **from**: from = origin.", cue: "why2" },
          { text: "The rule: with + a tool; by + a means (no article).", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "She cut the bread ____ a knife.", [["bread", "with", true, "a tool you hold"], ["emailBy", "by", false, "by + a means: | by hand, by email"], ["origin", "from", false, "from = origin"]], ["with + a tool", "by + a means (no article)"]),
        ],
      },
      {
        id: "check",
        title: "Check: a tool",
        alt: "The with and by columns remain on the board.",
        say: [{ text: "Is it a tool held in the hand, or a method?" }],
        actions: [],
        check: {
          id: "with-q1",
          source: "original",
          skill: "with for an instrument",
          prompt: "The thief forced the lock open ___ a screwdriver.",
          options: [
            { text: "with", correct: true, why: "Correct. A screwdriver is a tool held in the hand: _with a screwdriver._" },
            { text: "by", misconception: "with-vs-by", why: "By names a means or method (_by force, by hand_). A specific tool takes with." },
            { text: "from", misconception: "with-vs-by", why: "From gives a source or starting point, not the tool used." },
          ],
        },
      },
    ],
  });
})();
