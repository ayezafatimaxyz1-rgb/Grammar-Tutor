/* Lesson 1.45: DESPITE and IN SPITE OF. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "despite",
    title: "DESPITE and IN SPITE OF",
    phase: 1,
    unit: "p1-relations",
    level: "Intermediate",
    minutes: 8,
    summary:
      "Despite and in spite of mean the same: something happened although there was an obstacle. Both take a noun or -ing, never a clause. Never despite of. For a clause use although, or despite the fact that.",
    objectives: [
      "Use despite or in spite of + noun or -ing.",
      "Avoid despite of, and use although or despite the fact that before a clause.",
    ],
    steps: [
      {
        id: "obstacle",
        title: "Going on despite an obstacle",
        alt: "A rock in a path, with an arrow going over it and continuing. Sentence: The match continued despite the rain.",
        say: [
          { text: "Here is a path with an obstacle in it. Something continues anyway.", cue: "rock" },
          { text: "**Despite** (or **in spite of**) names the obstacle that did not stop it: _The match continued despite the rain._", cue: "s1" },
        ],
        actions: [
          { do: "draw", id: "path", shape: "line", from: [80, 300], to: [880, 300], ink: "muted", width: 2.4, dur: 700 },
          { do: "draw", id: "rock", shape: "blob", points: [[400, 300], [430, 240], [500, 225], [560, 255], [570, 300]], ink: "trouble", fill: "soft", dur: 800 },
          { do: "draw", id: "go", shape: "arrow", from: [150, 285], to: [820, 285], bow: -120, ink: "accent", width: 4, dur: 1200 },
          { do: "write", id: "rock-l", text: "the rain", x: 485, y: 340, size: 28, ink: "trouble", anchor: "middle" },
          { do: "write", id: "s1", text: "The match continued despite the rain.", x: 480, y: 450, size: 40, anchor: "middle", gap: 400, dur: 2000 },
          { do: "highlight", id: "s1-h", target: "s1", word: "despite" },
        ],
      },
      {
        id: "grammar",
        title: "Noun, not clause; never despite of",
        alt: "Correct: despite the rain; in spite of the rain; despite feeling ill. Crossed out: despite of the rain; despite it rained. Correct alternatives: although it rained; despite the fact that it rained.",
        say: [
          { text: "Both _despite_ and _in spite of_ need a thing, the obstacle the arrow passes over: _despite the rain, in spite of the rain, despite feeling ill._", cue: "g1" },
          { text: "_Despite of_ is always wrong; the _of_ belongs only to _in spite of._", cue: "g2" },
          { text: "Before a whole event with its own verb, use **although**: _although it rained_, or the longer _despite the fact that it rained._", cue: "g3" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.rows("g", [
            ["overRock", "despite the rain · in spite of the rain", { hl: "despite" }],
            ["cross", "✗ despite of the rain · ✗ despite it rained", { ink: "trouble" }],
            ["rain", "although it rained · despite the fact that ...", { ink: "accent2", size: 30 }],
          ], { y: 120, gap: 130 }),
        ],
      },
      {
        id: "check",
        title: "Check: sentence correction",
        alt: "The grammar rows remain on the board.",
        say: [{ text: "An original practice item in CSS sentence-correction style." }],
        actions: [],
        check: {
          id: "despite-q1",
          source: "original",
          skill: "despite + noun",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "Despite his illness, he attended the session.", correct: true, why: "Correct. _Despite_ + a noun phrase." },
            { text: "Despite of his illness, he attended the session.", misconception: "despite-of", why: "_Despite_ never takes _of._ Use _despite his illness_ or _in spite of his illness._" },
            { text: "Despite he was ill, he attended the session.", misconception: "prep-vs-conj", why: "_He was ill_ is a clause. Use _although he was ill._" },
          ],
        },
      },
    ],
  });
})();
