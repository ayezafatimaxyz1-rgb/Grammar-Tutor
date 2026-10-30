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
          { text: "**Ago** counts back from **now**: the arrow starts at the now dot. _I met him two years ago._", cue: "b1" },
          { text: "**Before** (or _earlier_) counts back from **a past point** in a story: the arrow starts at 2020. _When I met him in 2020, he had left the army two years before._", cue: "b2" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.panels("b", [
            ["pointPast", "two years ago", "from now", { hl: "ago" }],
            ["backFromPoint", "two years before", "from a past point", { hl: "before" }],
          ]),
        ],
      },
      {
        id: "none",
        title: "Words that take no preposition",
        alt: "Four pictures: an arrow into a house (go home), a plane (live abroad), stairs (go upstairs), a house (at home, from abroad).",
        say: [
          { text: "Some words already contain the place or time, so the arrow goes straight to them with no preposition: _go home, live abroad, go upstairs, go downtown, yesterday, tomorrow._", cue: "n1" },
          { text: "So _go to home_ and _live in abroad_ are wrong. (But _at home_ for position, and _from abroad_ for origin, are correct.)", cue: "n4" },
        ],
        actions: [
          PLAB.kit.clear("clear-2"),
          ...PLAB.kit.grid("n", [
            ["goHome", "go home (\u2717 go to home)", "home already means to that place", { hl: "home" }],
            ["plane", "live abroad (\u2717 live in abroad)", "abroad already holds the place", { hl: "abroad" }],
            ["stairs", "go upstairs \u00b7 go downtown", "no preposition", {  }],
            ["house", "\u2713 at home \u00b7 \u2713 from abroad", "position or origin: fine", { hl: "at home" }],
          ]),
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence I met him two years with a gap., then the candidates with pictures: ago (right: counted back from now); before (wrong: counts back from another past moment); since (wrong: since needs a point: since 2023). Rule: ago = back from now (past simple); before = back from a past point.",
        say: [
          { text: "Fill the gap: I met him two years \u2026. The answer is **ago**: counted back from now.", cue: "why1" },
          { text: "Why not the others? **before**: counts back from another past moment. **since**: since needs a point: since 2023.", cue: "why2" },
          { text: "The rule: ago = back from now (past simple); before = back from a past point.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "I met him two years ____.", [["pointPast", "ago", true, "counted back | from now"], ["backFromPoint", "before", false, "counts back from | another past moment"], ["sincePoint", "since", false, "since needs a | point: since 2023"]], ["ago = back from now (past simple)", "before = back from a past point"]),
        ],
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
