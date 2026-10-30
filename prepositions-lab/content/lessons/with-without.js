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
          { text: "A **feature** someone or something has: _a girl with long hair, a house with a garden._", cue: "m1" },
          { text: "A **manner** of doing something: _Handle with care. She spoke with confidence._", cue: "m2" },
          { text: "The **cause** of a physical reaction: _shaking with fear, red with anger._", cue: "m3" },
        ],
        actions: [K.clear("clear-1"), ...K.lines("m", [["feature: a girl with long hair", { hl: "with" }], ["manner: handle with care", { hl: "with" }], ["cause: shaking with fear", { hl: "with" }]], { y: 160, gap: 115, size: 38 })],
      },
      {
        id: "with-by",
        title: "With a tool, by a means",
        alt: "Two columns: with a pen, with a key (a tool you hold). By hand, by email, by car (a means or method, no article).",
        say: [
          { text: "Both _with_ and _by_ can answer _how?_ **With** names a physical tool you hold: _opened with a key._", cue: "w1" },
          { text: "**By** names a means or method, usually with no article: _sent by email, made by hand, travelled by car._ The next lesson covers by in full.", cue: "w2" },
        ],
        actions: [K.clear("clear-2"), ...K.lines("w", [["with a tool: with a pen · with a key", { hl: "with" }], ["by a means: by hand · by email · by car", { hl: "by" }]], { y: 200, gap: 130, size: 36 })],
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
