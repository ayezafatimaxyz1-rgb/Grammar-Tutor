/* Lesson 1.46: PER, PLUS, MINUS, VERSUS, RE. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "per-plus-minus-versus",
    title: "PER, PLUS, MINUS, VERSUS, RE",
    phase: 1,
    unit: "p1-relations",
    level: "Intermediate",
    minutes: 7,
    summary:
      "Short Latin and arithmetic prepositions. Per means for each (Rs 200 per kilo, per capita); plus and minus add and subtract; versus sets two sides against each other; re means about in business letters. Avoid as per in essays.",
    objectives: [
      "Use per for each, and per capita, per annum.",
      "Use versus for opposing sides, and plus and minus for adding and subtracting.",
      "Replace as per with according to or as requested in formal essays.",
    ],
    steps: [
      {
        id: "per",
        title: "Per: for each",
        alt: "Three rows: Rs 200 per kilo; 120 km per hour; income per capita, meaning per person. Also per annum, per cent.",
        say: [
          { text: "**Per** means _for each_: _Rs 200 per kilo, 120 km per hour, one per person._", cue: "p1" },
          { text: "Latin phrases with per: _per capita_ (per person), _per annum_ (per year), _per cent._ _Income per capita has risen._", cue: "p3" },
        ],
        actions: K.lines("p", [["Rs 200 per kilo · 120 km per hour", { hl: "per" }], ["per capita · per annum · per cent", { ink: "accent2" }], ["Income per capita has risen.", { hl: "per capita", size: 34 }]], { y: 170, gap: 115, size: 36 }),
      },
      {
        id: "others",
        title: "Plus, minus, versus, re",
        alt: "Rows: two plus two; ten minus three; Pakistan versus India (vs.); re: your letter of 5 May.",
        say: [
          { text: "**Plus** and **minus** add and subtract: _two plus two; the price minus tax._", cue: "o1" },
          { text: "**Versus** (written _v._ or _vs._) sets two sides against each other in a match or a court case: _Pakistan versus India._", cue: "o2" },
          { text: "**Re** means _about_ in business correspondence: _Re: your letter of 5 May._", cue: "o3" },
        ],
        actions: [K.clear("clear-1"), ...K.lines("o", ["the price plus tax · minus discount", ["Pakistan versus India (vs.)", { hl: "versus" }], ["Re: your letter of 5 May", { hl: "Re" }]], { y: 170, gap: 115, size: 36 })],
      },
      {
        id: "asper",
        title: "As per",
        alt: "As per your instructions: commercial jargon. Better: as you instructed; according to your instructions.",
        say: [
          { text: "_As per_ is common in office English in Pakistan: _as per your instructions, as per rules._ Style guides treat it as jargon.", cue: "a1" },
          { text: "In essays and précis, write _according to your instructions, as you instructed, under the rules._", cue: "a2" },
        ],
        actions: [K.clear("clear-2"), ...K.lines("a", [["as per your instructions (jargon)", { ink: "muted" }], ["according to your instructions · as you instructed", { ink: "accent", size: 32 }]], { y: 200, gap: 130, size: 36 })],
      },
      {
        id: "check",
        title: "Check: formal style",
        alt: "The as per rows remain on the board.",
        say: [{ text: "Which suits a formal essay?" }],
        actions: [],
        check: {
          id: "per-q1",
          source: "original",
          skill: "avoiding as per",
          prompt: "Which is the best choice for a formal essay?",
          options: [
            { text: "According to the Constitution, education is a fundamental right.", correct: true, why: "Correct. _According to_ is the clear, formal choice." },
            { text: "As per the Constitution, education is a fundamental right.", misconception: "register-informal", why: "_As per_ is office jargon. Use _according to_ or _under the Constitution_ in an essay." },
            { text: "Per the Constitution, education is a fundamental right.", misconception: "register-informal", why: "_Per_ meaning according to is informal American usage. Use _according to._" },
          ],
        },
      },
    ],
  });
})();
