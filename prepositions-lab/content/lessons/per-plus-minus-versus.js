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
          { text: "**Per** means _for each_: for each kilo you pay this coin. _Rs 200 per kilo, 120 km per hour._", cue: "p1" },
          { text: "_Per capita_ = for each person: every person gets a share. Also _per annum_ (per year), _per cent._ _Income per capita has risen._", cue: "p2" },
        ],
        actions: PLAB.kit.panels("p", [
          ["perKilo", "Rs 200 per kilo", "for each kilo", { hl: "per" }],
          ["perCapita", "income per capita", "for each person", { hl: "per capita" }],
          ["clock", "120 km per hour", "for each hour", { hl: "per" }],
        ]),
      },
      {
        id: "others",
        title: "Plus, minus, versus, re",
        alt: "Rows: two plus two; ten minus three; Pakistan versus India (vs.); re: your letter of 5 May.",
        say: [
          { text: "**Plus** and **minus** add and subtract: _the price plus tax, minus discount._", cue: "o1" },
          { text: "**Versus** (_v._ or _vs._) sets two sides against each other in a contest or a court case: _Pakistan versus India._", cue: "o2" },
          { text: "**Re** means _about_ in business letters: the envelope points at its subject. _Re: your letter of 5 May._", cue: "o3" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.panels("o", [
            [[["plus", -30, 0, 0.8], ["minus", 40, 0, 0.8]], "plus tax · minus 10%", "add · take away", {}],
            ["versus", "Pakistan versus India", "two sides against", { hl: "versus" }],
            ["envelope", "Re: your letter", "= about (business)", { hl: "Re" }],
          ]),
        ],
      },
      {
        id: "asper",
        title: "As per",
        alt: "As per your instructions: commercial jargon. Better: as you instructed; according to your instructions.",
        say: [
          { text: "_As per_ is common in office English in Pakistan: _as per your instructions, as per rules._ Style guides treat it as jargon.", cue: "a1" },
          { text: "In essays and précis, point straight at the source: _according to your instructions, as you instructed, under the rules._", cue: "a2" },
        ],
        actions: [
          PLAB.kit.clear("clear-2"),
          ...PLAB.kit.panels("a", [
            [[["doc", 0, 0], ["cross", 0, 0]], "as per your instructions", "office jargon", { ink: "muted" }],
            ["docSays", "according to your instructions", "formal and clear", { hl: "according to", size: 26 }],
          ]),
        ],
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
