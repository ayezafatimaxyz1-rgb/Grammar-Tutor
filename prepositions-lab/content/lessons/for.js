/* Lesson 1.38: FOR: purpose, benefit, exchange, support, destination. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "for",
    title: "FOR: purpose, benefit and exchange",
    phase: 1,
    unit: "p1-relations",
    level: "Intermediate",
    minutes: 10,
    summary:
      "For points at a goal or beneficiary. Purpose (a knife for cutting), benefit (a gift for you), exchange (paid Rs 500 for it), support (vote for), destination of departure (leave for Karachi), and duration (for ten years). The error for to buy.",
    objectives: [
      "Use for for purpose, beneficiary, exchange, support and the destination of a departure.",
      "Express purpose with to + verb or for + noun/-ing, never for to + verb.",
      "Use leave for and set off for, and leave + place for the starting point.",
    ],
    steps: [
      {
        id: "uses",
        title: "Pointing at a goal or a receiver",
        alt: "Five pictures: a knife cutting bread (purpose), a gift (benefit), money and goods exchanged (exchange), a raised hand and a tick (support), a train leaving (destination).",
        say: [
          { text: "**For** points at what something is aimed at. **Purpose**: a knife is aimed at cutting: _a knife for cutting bread._", cue: "u1" },
          { text: "**Benefit**: the gift is aimed at you: _a gift for you._ **Exchange**: money goes one way, the book the other: _paid Rs 500 for it._", cue: "u2" },
          { text: "**Support**: a hand raised for the bill: _voted for the bill._ **Destination** of a departure: the train sets off aimed at Karachi: _leaves for Karachi._", cue: "u4" },
        ],
        actions: [
          PLAB.kit.clear("clear-rd-uses"),
          ...PLAB.kit.grid("u", [
            ["bread", "a knife for cutting bread", "purpose", { hl: "for" }],
            ["gift", "a gift for you", "benefit", { hl: "for" }],
            ["exchange", "paid Rs 500 for it", "exchange", { hl: "for" }],
            ["voteFor", "voted for the bill", "support", { hl: "for" }],
            ["leaveFor", "leaves for Karachi", "destination of a departure", { hl: "for" }],
          ]),
        ],
      },
      {
        id: "purpose",
        title: "Purpose: to + verb, for + noun",
        alt: "Correct: She went to the market to buy vegetables; She went to the market for vegetables. Crossed out: for to buy, for buy.",
        say: [
          { text: "To give the purpose of an action, use **to + verb**: she walks to the shop in order to buy. _She went to the market to buy vegetables._", cue: "p1" },
          { text: "Or **for + noun**: _She went to the market for vegetables._ (_For + -ing_ usually describes what a thing is used for: _a machine for making ice._)", cue: "p2" },
          { text: "_For to buy_ and _for buy_ are both wrong.", cue: "p3" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.panels("p", [
            ["toShop", "went to the market to buy vegetables", "to + verb", { hl: "to buy", size: 24 }],
            ["toShop", "went to the market for vegetables", "for + noun", { hl: "for", size: 24 }],
          ]),
          { do: "write", id: "p3", text: "✗ for to buy · ✗ for buy", x: 480, y: 470, size: 36, ink: "trouble", anchor: "middle", gap: 500 },
        ],
      },
      {
        id: "why-not",
        title: "Why not the other one?",
        alt: "Left: a person going to a shop, labelled She went to buy bread (to + verb). Right: the same, labelled She went for to buy bread, which adds for.",
        say: [
          { text: "_She went to buy bread_: purpose with a verb uses **to**.", cue: "wn1" },
          { text: "**For** takes a noun: _She went for bread._ _For to buy_ puts both together.", cue: "wn2" },
          { text: "So: _to + verb_ or _for + noun_, never both.", cue: "wn-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.swap("wn", ["toShop", "She went to buy bread.", "to + verb", { hl: "to" }], ["toShop", "\u2717 She went for to buy bread.", "for takes a noun: for bread", { ink: "trouble" }], ["to + verb: to buy bread", "for + noun: for bread"]),
        ],
      },
      {
        id: "check1",
        title: "Check: purpose",
        alt: "The purpose examples remain on the board.",
        say: [{ text: "An original practice item in CSS sentence-correction style." }],
        actions: [],
        check: {
          id: "for-q1",
          source: "original",
          skill: "purpose: to + verb",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "He went to Islamabad to attend the conference.", correct: true, why: "Correct. Purpose of an action: _to_ + verb." },
            { text: "He went to Islamabad for attending the conference.", misconception: "for-purpose", why: "For + -ing usually describes what a thing is used for. For the purpose of an action, use _to attend_ (or _for the conference_)." },
            { text: "He went to Islamabad for to attend the conference.", misconception: "for-purpose", why: "_For to_ + verb is never correct in standard English." },
          ],
        },
      },
      {
        id: "check2",
        title: "Check: setting off",
        alt: "The purpose examples remain on the board.",
        say: [{ text: "The sentence is about setting off, not arriving." }],
        actions: [],
        check: {
          id: "for-q2",
          source: "original",
          skill: "leave for",
          prompt: "The delegation left ___ Beijing early this morning.",
          options: [
            { text: "for", correct: true, why: "Correct. _Leave for_ a place means set off towards it as the destination." },
            { text: "to", misconception: "for-uses", why: "_Leave to Beijing_ is not used. A departure towards a destination is _leave for._" },
            { text: "at", misconception: "for-uses", why: "_At_ would give the place where they left from or were. Setting off towards a place is _leave for._" },
          ],
        },
      },
    ],
  });
})();
