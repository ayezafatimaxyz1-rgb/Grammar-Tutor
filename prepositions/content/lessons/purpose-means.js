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
          { text: "**For the sake of** = for the benefit of: the parent shelters the children. _He stayed for the sake of the children._", cue: "p1" },
          { text: "**With a view to** = with the aim of: the eye is fixed on a target. Here _to_ is a preposition, so -ing follows: _with a view to reducing costs_, not _to reduce._", cue: "p2" },
        ],
        actions: [
          ...PLAB.kit.panels("p", [
            ["protectKids", "for the sake of the children", "for their benefit", { hl: "for the sake of", size: 26 }],
            ["aimGoal", "with a view to reducing costs", "with that aim (+ -ing)", { hl: "reducing", size: 26 }],
          ]),
          { do: "write", id: "p3", text: "✗ with a view to reduce", x: 480, y: 470, size: 34, ink: "trouble", anchor: "middle", gap: 500 },
        ],
      },
      {
        id: "means",
        title: "Means and grounds",
        alt: "Rows: by means of a pulley (using); by virtue of his office (because of a quality or right); by dint of hard work (through great effort).",
        say: [
          { text: "**By means of** = using: the rope and wheel lift the load. _The stone was lifted by means of a pulley._", cue: "m1" },
          { text: "**By virtue of** = because of a quality or right: the crown of office gives the power. _By virtue of his office, the Speaker chairs the session._", cue: "m2" },
          { text: "**By dint of** = through great effort, a little literary: pushing a heavy rock. _She succeeded by dint of hard work._", cue: "m3" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.panels("m", [
            ["pulley", "by means of a pulley", "= using", { hl: "by means of", size: 26 }],
            ["crown", "by virtue of his office", "= because of a right", { hl: "by virtue of", size: 26 }],
            ["pushRock", "by dint of hard work", "= through effort", { hl: "by dint of", size: 26 }],
          ]),
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence They cut staff with a view to with a gap costs., then the candidates with pictures: reducing (right: to is a preposition: -ing); reduce (wrong: to + verb is the infinitive); reduced (wrong: a past form). Rule: with a view to + -ing; in order to + verb.",
        say: [
          { text: "Fill the gap: They cut staff with a view to \u2026 costs. What does the sentence want to say? The answer is **reducing**: to is a preposition: -ing.", cue: "why1" },
          { text: "Why not the others? **reduce**: to + verb is the infinitive. **reduced**: a past form.", cue: "why2" },
          { text: "The rule: with a view to + -ing; in order to + verb.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "They cut staff with a view to ____ costs.", [["aimGoal", "reducing", true, "to is a | preposition: -ing"], ["aimGoal", "reduce", false, "to + verb is | the infinitive"], ["pointPast", "reduced", false, "a past form"]], ["with a view to + -ing", "in order to + verb"]),
        ],
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
