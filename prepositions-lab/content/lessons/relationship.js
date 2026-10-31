/* Lesson 2.22: relationship with/between, connection with/between, link to/with/between. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "relationship",
    title: "Relationship with, link between",
    phase: 2,
    unit: "p2-noun",
    level: "Intermediate",
    minutes: 7,
    summary:
      "Nouns of connection take with when you stand at one side and look at the other (Pakistan's relationship with China) and between when you stand outside and name both sides (the relationship between Pakistan and China). Link and connection also take to: a link to terrorism.",
    objectives: [
      "Use relationship with (one side) and relationship between X and Y (both sides).",
      "Use connection with or between, link to, with or between, and contact with.",
    ],
    steps: [
      {
        id: "with-between",
        title: "One side, or both sides?",
        alt: "Left: two people joined by a line with a heart, labelled Pakistan's relationship with China (from one side). Right: two shapes joined by a chain, labelled the relationship between Pakistan and China (both sides named).",
        say: [
          { text: "Stand at one side and look across: **with** names the partner. _Pakistan's relationship with China._", cue: "r1" },
          { text: "Stand outside and name both partners: **between** X **and** Y. _The relationship between Pakistan and China._", cue: "r2" },
          { text: "Never _the relationship between Pakistan with China._ _Between_ always pairs with _and._", cue: "w" },
        ],
        actions: [
          ...K.panels("r", [
            ["linkWith", "its relationship with China", "from one side: with", { hl: "with" }],
            ["linkBetween", "between Pakistan and China", "both sides: between ... and", { hl: "between" }],
          ], { y: 60 }),
          { do: "write", id: "w", text: "✗ the relationship between Pakistan with China", x: 480, y: 470, size: 30, ink: "trouble", anchor: "middle", gap: 400 },
        ],
      },
      {
        id: "link",
        title: "Connection, link, contact",
        alt: "Rows: a connection between poverty and crime; his links to (with) the party; the link between smoking and cancer; in contact with the embassy.",
        say: [
          { text: "The same rule: _a connection between poverty and crime._ **Link** can also take **to** for being attached: _his links to the party._", cue: "l1" },
          { text: "_the link between smoking and cancer. We are in contact with the embassy._", cue: "l3" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.rows("l", [
            ["linkBetween", "a connection between poverty and crime", { hl: "between", size: 30 }],
            ["chain", "his links to (with) the party", { hl: "links to" }],
            ["linkBetween", "the link between smoking and cancer", { hl: "between" }],
            ["speak", "We are in contact with the embassy.", { hl: "contact with" }],
          ], { y: 90, gap: 125 }),
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence Doctors found a link with a gap smoking and cancer., then the candidates with pictures: between (right: both sides named); with (wrong: with = from one side: its link with); of (wrong: of names one side; a link needs both). Rule: between X and Y; X's link with Y.",
        say: [
          { text: "Fill the gap: Doctors found a link \u2026 smoking and cancer. What does the sentence want to say? The answer is **between**: both sides named.", cue: "why1" },
          { text: "Why not the others? **with**: with = from one side: its link with. **of**: of names one side; a link needs both.", cue: "why2" },
          { text: "The rule: between X and Y; X's link with Y.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "Doctors found a link ____ smoking and cancer.", [["linkBetween", "between", true, "both sides | named"], ["linkWith", "with", false, "with = from one | side: its link with"], ["cross", "of", false, "of names one side; | a link needs both"]], ["between X and Y", "X's link with Y"]),
        ],
      },
      {
        id: "check",
        title: "Check: sentence correction",
        alt: "The board remains.",
        say: [{ text: "An original practice question." }],
        actions: [],
        check: {
          id: "relationship-q1",
          source: "original",
          skill: "between ... and",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "There is a close link between education and economic growth.", correct: true, why: "Correct. Both sides named: _between_ X _and_ Y." },
            { text: "There is a close link between education with economic growth.", misconception: "between-and", why: "_Between_ pairs with _and_, never with _with._" },
            { text: "There is a close link of education and economic growth.", misconception: "between-and", why: "_Link of_ is not used. Use _link between_ X _and_ Y." },
          ],
        },
      },
    ],
  });
})();
