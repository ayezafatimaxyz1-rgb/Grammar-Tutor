/* Lesson 2.29: expressions with by, out of, under: by heart, out of order, under way. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "by-out-of-idioms",
    title: "By heart, out of order, under way",
    phase: 2,
    unit: "p2-idiom",
    level: "Intermediate",
    minutes: 8,
    summary:
      "By marks the way something happens: by heart (from memory), by chance, by mistake, by and large (generally). Out of marks leaving a normal state: out of order, out of date, out of stock, out of the question (impossible). Under marks being inside a process or a force: under way, under control, under pressure, under consideration.",
    objectives: [
      "Use by heart, by chance, by mistake and by and large.",
      "Use out of order, out of date, out of the question, and under way, under control, under consideration.",
    ],
    steps: [
      {
        id: "by",
        title: "BY: the way it happens",
        alt: "Rows: learn a poem by heart (a book going into a heart); met by chance (dice); sent by mistake (a cross); by and large (= generally).",
        say: [
          { text: "**By** names the way something happens. **By heart** is learning so well that it lives in your memory: _She learnt the poem by heart._", cue: "b1" },
          { text: "_We met by chance. The letter was sent by mistake._ And **by and large** means generally, on the whole.", cue: "b2" },
        ],
        actions: K.rows("b", [
          ["learnHeart", "She learnt the poem by heart.", { hl: "by heart" }],
          ["dice", "We met by chance.", { hl: "by chance" }],
          ["cross", "The letter was sent by mistake.", { hl: "by mistake" }],
          ["crowd", "By and large, the public agreed.  (= generally)", { hl: "By and large", size: 30 }],
        ], { y: 90, gap: 125 }),
      },
      {
        id: "out-of",
        title: "OUT OF a normal state",
        alt: "Rows: The lift is out of order (a broken machine). This law is out of date (a crossed calendar). The book is out of stock (an empty jar). A strike is out of the question (impossible).",
        say: [
          { text: "**Out of** pictures leaving the normal state. A machine that has left working order is _out of order_: _The lift is out of order._", cue: "o1" },
          { text: "_out of date_ (no longer current), _out of stock_ (none left), and _out of the question_ (impossible): _A pay rise is out of the question this year._", cue: "o2" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.rows("o", [
            ["brokenBox", "The lift is out of order.", { hl: "out of order" }],
            ["oldCalendar", "This law is out of date.", { hl: "out of date" }],
            ["emptyJar", "The book is out of stock.", { hl: "out of stock" }],
            ["cross", "A pay rise is out of the question.", { hl: "out of the question" }],
          ], { y: 90, gap: 125 }),
        ],
      },
      {
        id: "under",
        title: "UNDER a process or a force",
        alt: "Rows: Work is under way (a boat moving). The fire is under control. She works under pressure (a weight pressing down). The proposal is under consideration (a magnifier over a document).",
        say: [
          { text: "**Under** pictures being inside a process, or below a force. _Work on the dam is under way_: already moving, like a ship.", cue: "u1" },
          { text: "_The fire is under control. She works well under pressure. The proposal is under consideration._", cue: "u2" },
        ],
        actions: [
          K.clear("clear-2"),
          ...K.rows("u", [
            ["boat", "Work on the dam is under way.", { hl: "under way" }],
            ["shield", "The fire is under control.", { hl: "under control" }],
            ["pressed", "She works well under pressure.", { hl: "under pressure" }],
            ["review", "The proposal is under consideration.", { hl: "under consideration" }],
          ], { y: 90, gap: 125 }),
        ],
      },
      {
        id: "check",
        title: "Check: meaning",
        alt: "The board remains.",
        say: [{ text: "An original practice question." }],
        actions: [],
        check: {
          id: "by-out-idioms-q1",
          source: "original",
          skill: "out of the question",
          prompt: "Given the budget deficit, new hiring is ___ this year. (= impossible)",
          options: [
            { text: "out of the question", correct: true, why: "Correct. _Out of the question_ = impossible." },
            { text: "out of question", misconception: "idiom-pairs", why: "The fixed phrase keeps _the_: _out of the question._ (_Without question_ means certainly.)" },
            { text: "under question", misconception: "idiom-pairs", why: "_Under question_ is not the fixed phrase. Use _out of the question._" },
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
          id: "by-out-idioms-q2",
          source: "original",
          skill: "under way",
          prompt: "Construction of the new motorway is already ___.",
          options: [
            { text: "under way", correct: true, why: "Correct. _Under way_ = already in progress." },
            { text: "on way", misconception: "idiom-pairs", why: "_On the way_ means travelling towards somewhere. A project in progress is _under way._" },
            { text: "by way", misconception: "idiom-pairs", why: "_By way of_ means as a form of or via. A project in progress is _under way._" },
          ],
        },
      },
    ],
  });
})();
