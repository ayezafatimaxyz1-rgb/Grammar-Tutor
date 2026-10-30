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
        alt: "Five rows: purpose, a knife for cutting bread; benefit, a gift for you; exchange, I paid Rs 500 for it; support, vote for the bill; destination, the train leaves for Karachi.",
        say: [
          { text: "**For** points at what something is aimed at. Its **purpose**: _a knife for cutting bread, a room for meetings._", cue: "u1" },
          { text: "Who **benefits**: _a gift for you, a school for girls._", cue: "u2" },
          { text: "What you get in **exchange**: _I paid Rs 500 for this book._", cue: "u3" },
          { text: "What you **support**: _Forty members voted for the bill._ (The opposite is _against_.)", cue: "u4" },
          { text: "Where a departure is heading: _The train leaves for Karachi at six._ Compare _leaves Lahore_ (the starting point, no preposition).", cue: "u5" },
        ],
        actions: K.lines("u", [["purpose: a knife for cutting bread", { hl: "for" }], ["benefit: a gift for you", { hl: "for" }], ["exchange: paid Rs 500 for it", { hl: "for" }], ["support: voted for the bill", { hl: "for" }], ["destination: leaves for Karachi", { hl: "for" }]], { y: 110, gap: 85, size: 34 }),
      },
      {
        id: "purpose",
        title: "Purpose: to + verb, for + noun",
        alt: "Correct: She went to the market to buy vegetables; She went to the market for vegetables. Crossed out: for to buy, for buy.",
        say: [
          { text: "To give the purpose of an action, use **to + verb**: _She went to the market to buy vegetables._", cue: "p1" },
          { text: "Or **for + noun**: _She went to the market for vegetables._ (_For + -ing_ usually describes what a thing is used for: _a machine for making ice._)", cue: "p2" },
          { text: "_For to buy_ and _for buy_ are both wrong.", cue: "p3" },
        ],
        actions: [K.clear("clear-1"), ...K.lines("p", [["went to the market to buy vegetables ✓", { size: 34 }], ["went to the market for vegetables ✓", { size: 34 }], ["✗ for to buy · ✗ for buy", { ink: "trouble" }]], { y: 170, gap: 110, size: 36 })],
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
