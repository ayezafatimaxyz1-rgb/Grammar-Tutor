/* Lesson 1.60: comparison and measure: compared with, in relation to, in excess of, up to, close to, far from. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "comparison-measure",
    title: "Compared with, in excess of, far from",
    phase: 1,
    unit: "p1-complex",
    level: "Advanced",
    minutes: 8,
    summary:
      "Comparing and measuring: in comparison with/to and compared with/to, in relation to, in excess of (more than), up to (as many as), close to (nearly) and far from (not at all).",
    objectives: [
      "Use compared with and in comparison with for comparisons.",
      "Use in excess of, up to and close to with amounts.",
      "Understand far from + adjective: far from perfect means not at all perfect.",
    ],
    steps: [
      {
        id: "compare",
        title: "Comparing",
        alt: "Rows: Compared with last year, exports rose; In comparison with India, our tax base is narrow; costs in relation to income.",
        say: [
          { text: "**Compared with** and **in comparison with** stand two things side by side to measure them: _Compared with last year, exports rose._ (_Compared to_ is also common.)", cue: "c1" },
          { text: "**In relation to** = one measured against the other, like a fraction: _costs in relation to income._", cue: "c3" },
        ],
        actions: PLAB.kit.panels("c", [
          ["compareBars", "compared with last year", "side by side", { hl: "compared with" }],
          ["compareBars", "in comparison with India", "side by side", { hl: "in comparison with", size: 26 }],
          ["ratio", "costs in relation to income", "one against the other", { hl: "in relation to", size: 26 }],
        ]),
      },
      {
        id: "measure",
        title: "Measuring amounts",
        alt: "A scale with marks: close to 3 million (just under), up to 50 people (maximum), in excess of Rs 1 billion (more than). Note: far from perfect = not at all perfect.",
        say: [
          { text: "**In excess of** = the bar goes past the line: more than (formal). _losses in excess of Rs 1 billion._", cue: "m1" },
          { text: "**Up to** = the line is a ceiling, a maximum: _The hall holds up to 500 people._", cue: "m2" },
          { text: "**Close to** = just short of the mark: nearly. _close to 3 million refugees._", cue: "m3" },
          { text: "**Far from** = a long way from the mark: not at all. _The situation is far from perfect._", cue: "m4" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.rows("m", [
            ["excess", "losses in excess of Rs 1 billion", { hl: "in excess of" }],
            ["upTo", "holds up to 500 people", { hl: "up to" }],
            ["closeTo", "close to 3 million refugees", { hl: "close to" }],
            ["farFrom", "far from perfect = not at all perfect", { hl: "far from" }],
          ], { y: 90, gap: 118 }),
        ],
      },
      {
        id: "check",
        title: "Check: far from",
        alt: "The measure rows remain on the board.",
        say: [{ text: "What does far from mean here?" }],
        actions: [],
        check: {
          id: "compare-q1",
          source: "original",
          skill: "far from",
          prompt: "“The new policy is far from satisfactory.” What does the writer mean?",
          options: [
            { text: "The policy is not at all satisfactory.", correct: true, why: "Correct. _Far from_ + adjective means the opposite: not at all." },
            { text: "The policy is satisfactory in the long term.", misconception: "measure-phrases", why: "Far from is not about time or distance here; it means not at all." },
            { text: "The policy is nearly satisfactory.", misconception: "measure-phrases", why: "That would be _close to satisfactory._ Far from means not at all." },
          ],
        },
      },
    ],
  });
})();
