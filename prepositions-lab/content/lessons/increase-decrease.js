/* Lesson 2.21: an increase in vs an increase of; a rise in, a fall in. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "increase-decrease",
    title: "An increase in, an increase of",
    phase: 2,
    unit: "p2-noun",
    level: "Intermediate",
    minutes: 7,
    summary:
      "Nouns of change take in for the thing that changes (an increase in prices, a fall in exports) and of for the amount (an increase of 10 per cent). With the verbs, by gives the amount (prices rose by 10 per cent). This is essential for describing data in essays and reports.",
    objectives: [
      "Use in for the thing that changes and of for the size of the change: a rise of 5 per cent in inflation.",
      "Use by for the amount after the verbs rise, fall, increase and decrease.",
    ],
    steps: [
      {
        id: "in",
        title: "IN: the thing that changes",
        alt: "Rising bars with an arrow going up, labelled an increase in prices. Falling bars with an arrow going down, labelled a fall in exports. Also: a rise in, a drop in, a decline in, a change in.",
        say: [
          { text: "Where does the change happen? Inside one quantity: prices, exports, crime. So **in** names the thing: _an increase in prices._", cue: "i1" },
          { text: "_a fall in exports, a rise in inflation, a decline in standards, a change in policy._", cue: "i2" },
        ],
        actions: K.panels("i", [
          ["riseIn", "an increase in prices", "the thing that rises", { hl: "in" }],
          ["fallIn", "a fall in exports", "the thing that falls", { hl: "in" }],
        ], { y: 60 }),
      },
      {
        id: "of-by",
        title: "OF and BY: the amount",
        alt: "Two bars with a bracket marking the difference. Sentences: an increase of 10 per cent (noun + of + amount). Prices rose by 10 per cent (verb + by + amount). Both: a rise of 5 per cent in inflation.",
        say: [
          { text: "Now measure the gap between the bars. After the noun, **of** gives the amount: _an increase of 10 per cent._", cue: "s1" },
          { text: "After the verb, **by** gives the amount: _Prices rose by 10 per cent._ (To give the end point, use **to**: _rose to Rs 300._)", cue: "s2" },
          { text: "All together: _a rise of 5 per cent in inflation._ Of for the amount, in for the thing.", cue: "s3" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.pic("pic", "riseBy", 340, 10, 2),
          { do: "write", id: "s1", text: "an increase of 10 per cent", x: 480, y: 270, size: 36, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s1-h", target: "s1", word: "of" },
          { do: "write", id: "s2", text: "Prices rose by 10 per cent (to Rs 300).", x: 480, y: 350, size: 36, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s2-h", target: "s2", word: "by" },
          { do: "write", id: "s3", text: "a rise of 5 per cent in inflation", x: 480, y: 440, size: 36, anchor: "middle", ink: "accent2", gap: 400 },
          { do: "highlight", id: "s3-h", target: "s3", word: "in", style: "underline" },
        ],
      },
      {
        id: "why-not",
        title: "Why not the other one?",
        alt: "Left: two bars with a bracket for the gap, labelled an increase of 10 per cent (the size of the change). Right: rising bars, labelled an increase in 10 per cent, which treats the number as the thing that grows.",
        say: [
          { text: "_an increase of 10 per cent_: **of** gives the size of the change, the gap between the bars.", cue: "increasew1" },
          { text: "_an increase in 10 per cent_ would treat the number as the thing that is growing. A percentage is a size, not a thing like prices.", cue: "increasew2" },
          { text: "**In** is right for the thing that changes: _an increase in prices._ Together: _an increase of 10 per cent in prices._", cue: "increasew-r1" },
        ],
        actions: [
          K.clear("clear-why"),
          ...K.swap("increasew", ["riseBy", "an increase of 10 per cent", "the size of the change", { hl: "of" }], ["riseIn", "✗ an increase in 10 per cent", "10 per cent is not a thing", { ink: "trouble" }], ["in + what changes (prices) · of + how much", "an increase of 10 per cent in prices"]),
        ],
      },
      {
        id: "check",
        title: "Check: describing data",
        alt: "The board remains.",
        say: [{ text: "An original practice question in report style." }],
        actions: [],
        check: {
          id: "increase-q1",
          source: "original",
          skill: "increase of / in",
          prompt: "The survey shows an increase ___ 12 per cent ___ the literacy rate.",
          options: [
            { text: "of … in", correct: true, why: "Correct. _Of_ gives the amount; _in_ names the thing that changes." },
            { text: "in … of", misconception: "change-in-of", why: "Reversed. The amount takes _of_; the literacy rate is where the change happens, so _in._" },
            { text: "by … of", misconception: "change-in-of", why: "_By_ gives the amount after a verb (_rose by 12 per cent_), not after the noun _increase._" },
          ],
        },
      },
      {
        id: "check-2",
        title: "Check: verb + by",
        alt: "The board remains.",
        say: [{ text: "One more." }],
        actions: [],
        check: {
          id: "increase-q2",
          source: "original",
          skill: "rise by",
          prompt: "Exports fell ___ 8 per cent last year.",
          options: [
            { text: "by", correct: true, why: "Correct. After the verb, _by_ gives the size of the change." },
            { text: "of", misconception: "change-in-of", why: "_Of_ gives the amount after a noun (_a fall of 8 per cent_), not after the verb." },
            { text: "in", misconception: "change-in-of", why: "_In_ names the thing that changes, not the amount." },
          ],
        },
      },
    ],
  });
})();
