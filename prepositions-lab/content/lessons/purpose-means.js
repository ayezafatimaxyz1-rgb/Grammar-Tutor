/* Lesson 1.52: purpose and means: for the sake of, with a view to, by means of, by virtue of, by dint of. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "purpose-means",
    title: "Purpose and means",
    phase: 1,
    unit: "p1-complex",
    level: "Advanced",
    minutes: 9,
    summary:
      "For the sake of (for the benefit of), with a view to + -ing (with the aim of), by means of (using), by virtue of (because of a quality or right), by dint of (through sheer effort). The trap: with a view to reduce.",
    objectives: [
      "Use for the sake of and with a view to for purpose, with -ing after with a view to.",
      "Use by means of, by virtue of and by dint of for means and grounds.",
    ],
    steps: [
      {
        id: "purpose",
        title: "Purpose",
        alt: "Rows: for the sake of the children (for their benefit); with a view to reducing costs (with that aim); note: with a view to + -ing.",
        say: [
          { text: "**For the sake of** = for the benefit of, or in order to keep: _He stayed for the sake of the children. For the sake of peace._", cue: "p1" },
          { text: "**With a view to** = with the aim of. Here _to_ is a preposition, so -ing follows: _with a view to reducing costs_, not _to reduce._", cue: "p2" },
        ],
        actions: K.lines("p", [["for the sake of the children", { hl: "for the sake of" }], ["with a view to reducing costs", { hl: "reducing" }], ["✗ with a view to reduce", { ink: "trouble" }]], { y: 170, gap: 115, size: 38 }),
      },
      {
        id: "means",
        title: "Means and grounds",
        alt: "Rows: by means of a pulley (using); by virtue of his office (because of a quality or right); by dint of hard work (through great effort).",
        say: [
          { text: "**By means of** = using: _The stone was lifted by means of a pulley._", cue: "m1" },
          { text: "**By virtue of** = because of a quality or right: _By virtue of his office, the Speaker chairs the session._", cue: "m2" },
          { text: "**By dint of** = through great effort, a little literary: _She succeeded by dint of hard work._", cue: "m3" },
        ],
        actions: [K.clear("clear-1"), ...K.lines("m", [["by means of a pulley = using", { hl: "by means of" }], ["by virtue of his office = because of", { hl: "by virtue of" }], ["by dint of hard work = through effort", { hl: "by dint of" }]], { y: 170, gap: 115, size: 36 })],
      },
      {
        id: "check1",
        title: "Check: with a view to",
        alt: "The means rows remain on the board.",
        say: [{ text: "An original practice item on a classic trap." }],
        actions: [],
        check: {
          id: "purpose-q1",
          source: "original",
          skill: "with a view to + -ing",
          prompt: "The policy was introduced with a view to ___ the trade deficit.",
          options: [
            { text: "reducing", correct: true, why: "Correct. In _with a view to_, _to_ is a preposition, so -ing follows." },
            { text: "reduce", misconception: "to-preposition", why: "_To reduce_ treats _to_ as an infinitive marker. In _with a view to_, it is a preposition: _reducing._" },
            { text: "reduction", misconception: "to-preposition", why: "A noun is possible (_with a view to the reduction of_), but _reduction the trade deficit_ is not. Use _reducing._" },
          ],
        },
      },
      {
        id: "check2",
        title: "Check: by virtue of",
        alt: "The means rows remain on the board.",
        say: [{ text: "Which phrase gives a right that comes from a position?" }],
        actions: [],
        check: {
          id: "purpose-q2",
          source: "original",
          skill: "by virtue of",
          prompt: "___ his position as Chief Justice, he administered the oath.",
          options: [
            { text: "By virtue of", correct: true, why: "Correct. The right comes from his position: _by virtue of._" },
            { text: "By dint of", misconception: "means-phrases", why: "By dint of means through great effort, not because of a position." },
            { text: "For the sake of", misconception: "means-phrases", why: "For the sake of gives a benefit or aim, not the ground of a right." },
          ],
        },
      },
    ],
  });
})();
