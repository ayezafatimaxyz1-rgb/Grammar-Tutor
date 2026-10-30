/* Lesson 1.22: FROM: the starting point, source and separation. */
PLAB.registerLesson({
  id: "from",
  title: "FROM: the starting point",
  phase: 1,
  unit: "p1-movement",
  level: "Beginner to intermediate",
  minutes: 10,
  summary:
    "From is the mirror of to: where movement starts. It also gives origin (I'm from Multan), source and material (made from wood), separation (prevent from, protect from) and difference (different from). Includes the exam favourite made from vs made of.",
  objectives: [
    "Use from for a starting point in space and time.",
    "Tell made from (the material is changed) from made of (the material is still visible).",
    "Use from for separation: prevent from, protect from, different from.",
  ],
  steps: [
    {
      id: "start",
      title: "Where the journey begins",
      alt: "An arrow from a dot labelled Karachi to a dot labelled Peshawar. Sentences: We travelled from Karachi to Peshawar. The office is open from 9 to 5.",
      say: [
        { text: "Here is a journey. **From** marks where it starts; **to** marks where it ends.", cue: "path" },
        { text: "_We travelled from Karachi to Peshawar._", cue: "s1" },
        { text: "Time works the same: _The office is open from 9 to 5. From now on, arrive on time._", cue: "s2" },
      ],
      actions: [
        { do: "draw", id: "a", shape: "circle", cx: 160, cy: 200, r: 14, ink: "accent", fill: "solid", dur: 400 },
        { do: "write", id: "a-l", text: "Karachi", x: 160, y: 255, size: 28, ink: "accent", anchor: "middle" },
        { do: "draw", id: "b", shape: "circle", cx: 800, cy: 200, r: 14, ink: "trouble", fill: "solid", dur: 400 },
        { do: "write", id: "b-l", text: "Peshawar", x: 800, y: 255, size: 28, ink: "trouble", anchor: "middle" },
        { do: "draw", id: "path", shape: "arrow", from: [180, 195], to: [782, 195], bow: -40, ink: "accent2", dur: 1300, gap: 300 },
        { do: "write", id: "s1", text: "from Karachi to Peshawar", x: 480, y: 370, size: 42, anchor: "middle", gap: 400, dur: 1700 },
        { do: "highlight", id: "s1-h", target: "s1", word: "from" },
        { do: "write", id: "s2", text: "open from 9 to 5", x: 480, y: 460, size: 36, ink: "muted", anchor: "middle", gap: 500 },
      ],
    },
    {
      id: "origin",
      title: "Origin and source",
      alt: "Three phrases: I am from Multan; a letter from the minister; a quotation from Iqbal.",
      say: [
          { text: "**From** marks a starting point, so it also gives the **origin** or **source** of a person or thing.", cue: "o1" },
          { text: "A person comes out of a place: _I am from Multan._ A letter travels out from its writer: _a letter from the minister._ Words are taken out of a book: _a quotation from Iqbal._", cue: "o3" },
        ],
      actions: [
          PLAB.kit.clear("clear-start"),
          ...PLAB.kit.panels("o", [
            ["origin", "I am from Multan.", "origin", { hl: "from" }],
            ["letterFrom", "a letter from the minister", "sender", { hl: "from", size: 26 }],
            ["quoteFrom", "a quotation from Iqbal", "source", { hl: "from", size: 26 }],
          ]),
        ],
    },
    {
      id: "material",
      title: "Made from or made of?",
      alt: "Left: a tree, an arrow, and a sheet of paper. Paper is made from wood: the wood has been changed. Right: a wooden table with visible grain. The table is made of wood: you can still see the wood.",
      say: [
        { text: "A famous exam pair. Paper starts as wood, but you cannot see the wood any more. It has been changed: _Paper is made from wood._", cue: "s-from" },
        { text: "A table is still visibly wood: _The table is made of wood._ Use **of** when the material is still there to see, **from** when it has been transformed.", cue: "s-of" },
        { text: "This is a useful tendency rather than an absolute rule; _made of_ is sometimes used for both. But in an exam the distinction is what is tested.", cue: "note" },
      ],
      actions: [
        { do: "erase", id: "clear-origin", targets: "all" },
        { do: "draw", id: "tree", shape: "group", ink: "accent2", dur: 900, gap: 400, parts: [{ shape: "line", from: [120, 300], to: [120, 200] }, { shape: "circle", cx: 120, cy: 165, r: 40 }] },
        { do: "draw", id: "arrow", shape: "arrow", from: [180, 220], to: [270, 220], dur: 500 },
        { do: "draw", id: "paper", shape: "rect", x: 290, y: 150, w: 110, h: 140, ink: "muted", dur: 700 },
        { do: "write", id: "s-from", text: "Paper is made from wood.", x: 260, y: 380, size: 34, anchor: "middle", gap: 300, dur: 1600 },
        { do: "highlight", id: "h-from", target: "s-from", word: "from" },
        { do: "draw", id: "table", shape: "group", ink: "accent", width: 4, dur: 1000, gap: 500, parts: [{ shape: "rect", x: 580, y: 200, w: 280, h: 30 }, { shape: "line", from: [600, 230], to: [600, 310] }, { shape: "line", from: [840, 230], to: [840, 310] }, { shape: "line", from: [600, 212], to: [700, 216], wobble: 2 }, { shape: "line", from: [720, 214], to: [840, 210], wobble: 2 }] },
        { do: "write", id: "s-of", text: "The table is made of wood.", x: 720, y: 380, size: 34, anchor: "middle", dur: 1600 },
        { do: "highlight", id: "h-of", target: "s-of", word: "of" },
        { do: "write", id: "note", text: "from: changed · of: still visible", x: 480, y: 480, size: 32, ink: "accent2", anchor: "middle", gap: 500 },
      ],
    },
    {
      id: "check-made",
      title: "Check: made from or of?",
      alt: "The paper and table drawings remain on the board.",
      say: [{ text: "Can you still see the material in the finished product?" }],
      actions: [],
      check: {
        id: "from-q1",
        source: "original",
        skill: "made from vs made of",
        prompt: "Cheese is made ___ milk.",
        options: [
          { text: "from", correct: true, why: "Correct. The milk is transformed into cheese; you cannot see milk in it any more, so _made from._" },
          { text: "of", misconception: "made-from-of", why: "_Made of_ suits a material you can still see, like a table made of wood. Milk is changed into cheese: _made from._" },
          { text: "by", misconception: "made-from-of", why: "_Made by_ names who or what made it (_made by hand, made by a local firm_), not the material." },
        ],
      },
    },
    {
      id: "separation",
      title: "Separation and difference",
      alt: "A wall between a person and rain. Phrases: protect from, prevent someone from doing, different from, with notes that different to is British and different than is American.",
      say: [
          { text: "Moving away from something is close to being **kept apart** from it. The umbrella keeps the rain away from the person: _protect from the rain._", cue: "p1" },
          { text: "A wall stops the arrow from going on: _The law prevents companies from hiding profits._ Pattern: _prevent_ + object + _from_ + -ing.", cue: "p2" },
          { text: "Two things apart in kind: **different from** is standard everywhere. _Different to_ is British, _different than_ American; in the exam, write _different from._", cue: "p3" },
        ],
      actions: [
          PLAB.kit.clear("clear-material"),
          ...PLAB.kit.panels("p", [
            ["umbrellaRain", "protect from the rain", "kept apart", { hl: "from" }],
            ["barrierStop", "prevent them from hiding", "stopped before it", { hl: "from", size: 26 }],
            ["different", "different from ✓", "to (BrE) · than (AmE)", { hl: "from" }],
          ]),
        ],
    },
    {
      id: "check-prevent",
      title: "Check: exam style",
      alt: "The separation phrases remain on the board.",
      say: [{ text: "An original practice question in CSS style." }],
      actions: [],
      check: {
        id: "from-q2",
        source: "original",
        skill: "prevent from + -ing",
        prompt: "The new law will prevent landlords ___ evicting tenants without notice.",
        options: [
          { text: "from", correct: true, why: "Correct. The pattern is _prevent someone from doing something._" },
          { text: "to", misconception: "prevent-from", why: "_Prevent ... to evict_ is wrong. Prevent takes _from_ + -ing." },
          { text: "against", misconception: "prevent-from", why: "_Protect against_ exists, but _prevent_ takes _from_: _prevent landlords from evicting._" },
        ],
      },
    },
    {
      id: "why-not",
      title: "Why this one and not the others?",
      alt: "The sentence Paper is made with a gap wood., then the candidates with pictures: from (right: the wood has changed); of (wrong: of = the material still shows); by (wrong: by names the maker). Rule: made from = changed \u00b7 made of = still visible; made by = the maker.",
      say: [
        { text: "Fill the gap: Paper is made \u2026 wood. The answer is **from**: the wood has changed.", cue: "why1" },
        { text: "Why not the others? **of**: of = the material still shows. **by**: by names the maker.", cue: "why2" },
        { text: "The rule: made from = changed \u00b7 made of = still visible; made by = the maker.", cue: "why-r1" },
      ],
      actions: [
        PLAB.kit.clear("clear-why"),
        ...PLAB.kit.lineup("why", "Paper is made ____ wood.", [[[["tree", -40, 0, 0.8], ["arrowR", 0, 0, 0.5], ["doc", 40, 0, 0.8]], "from", true, "the wood has | changed"], ["table", "of", false, "of = the material | still shows"], ["writtenBy", "by", false, "by names the | maker"]], ["made from = changed \u00b7 made of = still visible", "made by = the maker"]),
      ],
    },
    {
      id: "summary",
      title: "The summary",
      alt: "From: starting point (from Karachi, from 9), origin (from Multan), material changed (made from), separation (protect from, prevent from), different from.",
      say: [{ text: "**From** = the starting point: in space, time, origin, transformed material, and separation. _Different from_, _prevent from + -ing._", cue: "c3" }],
      actions: [
        { do: "erase", id: "clear-separation", targets: "all" },
        { do: "write", id: "c1", text: "from Karachi · from 9 to 5 · from Multan", x: 480, y: 150, size: 34, anchor: "middle", gap: 400 },
        { do: "write", id: "c2", text: "made from milk · made of wood", x: 480, y: 240, size: 34, anchor: "middle" },
        { do: "write", id: "c3", text: "protect from · prevent from -ing · different from", x: 480, y: 330, size: 32, anchor: "middle" },
      ],
    },
  ],
});
