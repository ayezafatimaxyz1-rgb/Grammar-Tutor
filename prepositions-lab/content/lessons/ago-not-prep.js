/* Lesson 1.36: time words that take no preposition, and AGO vs BEFORE. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "ago-not-prep",
    title: "AGO, and time words without prepositions",
    phase: 1,
    unit: "p1-time",
    level: "Intermediate",
    minutes: 8,
    summary:
      "Ago is not a preposition: it comes after the length and goes with the past simple. Two years ago counts from now; two years before counts from a past point. Plus words that need no preposition: home, abroad, upstairs, yesterday.",
    objectives: [
      "Use length + ago with the past simple, and avoid before two years and since two years ago.",
      "Tell ago (from now) from before (from a past point).",
      "Leave out the preposition with home, abroad, upstairs, downtown, yesterday and tomorrow.",
    ],
    steps: [
      {
        id: "ago",
        title: "Ago: counted back from now",
        alt: "A time line ending at now. A dot two years back with a bracket to now labelled two years ago. Sentence: I met him two years ago. Crossed out: before two years.",
        say: [
          { text: "**Ago** counts back from now. It comes **after** the length: _two years ago, a moment ago._", cue: "ago-l" },
          { text: "It goes with the **past simple**: _I met him two years ago._ Not _I have met him two years ago._", cue: "s1" },
          { text: "A common local error is _before two years_ for _two years ago._ Another is _since two years ago_: use _for two years_ or _two years ago_ instead.", cue: "bad" },
        ],
        actions: [
          ...K.timeline("tl", { y: 200 }),
          { do: "draw", id: "then", shape: "circle", cx: 420, cy: 200, r: 11, ink: "trouble", fill: "solid", dur: 400, gap: 300 },
          { do: "draw", id: "span", shape: "group", ink: "accent2", dur: 700, parts: [{ shape: "line", from: [420, 145], to: [780, 145], wobble: 0.6 }, { shape: "line", from: [420, 132], to: [420, 158] }, { shape: "line", from: [780, 132], to: [780, 158] }] },
          { do: "write", id: "ago-l", text: "two years ago", x: 600, y: 125, size: 30, ink: "accent2", anchor: "middle" },
          { do: "write", id: "s1", text: "I met him two years ago.", x: 480, y: 360, size: 40, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s1-h", target: "s1", word: "ago" },
          { do: "write", id: "bad", text: "✗ before two years · ✗ since two years ago", x: 480, y: 450, size: 32, ink: "trouble", anchor: "middle", gap: 500, dur: 2000 },
        ],
      },
      {
        id: "before",
        title: "Ago or before?",
        alt: "Two sentences: I met him two years ago (counted from now). When I met him in 2020, he had left the army two years before (counted from 2020).",
        say: [
          { text: "**Ago** counts back from **now**. **Before** (or _earlier_) counts back from **a past point** in a story: _When I met him in 2020, he had left the army two years before._", cue: "b2" },
        ],
        actions: [K.clear("clear-1"), ...K.lines("b", [["two years ago = from now", { hl: "ago" }], ["two years before = from a past point", { hl: "before" }]], { y: 200, gap: 130, size: 38 })],
      },
      {
        id: "none",
        title: "Words that take no preposition",
        alt: "List: go home, live abroad, go upstairs, go downtown, yesterday, tomorrow. Crossed out: go to home, live in abroad.",
        say: [
          { text: "Some words already contain the idea of place or time, so no preposition is used: _go home, live abroad, go upstairs, go downtown, yesterday, tomorrow, tonight._", cue: "n1" },
          { text: "So _go to home_ and _live in abroad_ are wrong. (But _at home_ for position, and _from abroad_ for origin, are correct.)", cue: "n2" },
        ],
        actions: [K.clear("clear-2"), ...K.lines("n", ["go home · live abroad · go upstairs · yesterday", ["✗ go to home · ✗ live in abroad", { ink: "trouble" }], ["✓ at home · ✓ from abroad", { ink: "accent2", size: 32 }]], { y: 170, gap: 115, size: 36 })],
      },
      {
        id: "check",
        title: "Check: sentence correction",
        alt: "The list of words without prepositions remains on the board.",
        say: [{ text: "An original practice item in CSS sentence-correction style." }],
        actions: [],
        check: {
          id: "ago-q1",
          source: "original",
          skill: "ago with past simple",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "The dam was completed five years ago.", correct: true, why: "Correct. Length + _ago_, with the past simple." },
            { text: "The dam was completed before five years.", misconception: "ago-errors", why: "_Before five years_ is a common local error. Counting back from now: _five years ago._" },
            { text: "The dam has been completed five years ago.", misconception: "ago-errors", why: "_Ago_ marks a finished past time, so the past simple: _was completed._" },
          ],
        },
      },
    ],
  });
})();
