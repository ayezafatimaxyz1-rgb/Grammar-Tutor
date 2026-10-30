/* Lesson 1.53: reference: in terms of, as to, as for, with respect to. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "reference",
    title: "Reference: in terms of, as to, as for",
    phase: 1,
    unit: "p1-complex",
    level: "Advanced",
    minutes: 8,
    summary:
      "More ways to point at a topic. In terms of (from the point of view of), with respect to (about), as to (about, often before whether), and as for (turning to a new topic). Regarding and with regard to have their own lesson.",
    objectives: [
      "Use in terms of for a point of view or measure.",
      "Tell as to (about) from as for (turning to a new topic).",
    ],
    steps: [
      {
        id: "forms",
        title: "Four reference phrases",
        alt: "Four pictures: a magnifier over a bar chart (in terms of population), a document (with respect to salaries), a question mark (doubt as to whether), a person turning to another (as for me).",
        say: [
          { text: "**In terms of** = seen through one measure, like a lens over a chart: _In terms of population, Punjab is the largest province._", cue: "f1" },
          { text: "**With respect to** = about, formal: _With respect to salaries, there is no change._", cue: "f2" },
          { text: "**As to** = about, often before _whether_: a question hangs over it. _There is doubt as to whether he will come._", cue: "f3" },
          { text: "**As for** = turning to a new person or topic: the arrow swings round to someone new. _As for me, I agree._", cue: "f4" },
        ],
        actions: [
          PLAB.kit.clear("clear-rd-forms"),
          ...PLAB.kit.grid("f", [
            ["lensBars", "In terms of population, ...", "seen through one measure", { hl: "In terms of" }],
            ["doc", "With respect to salaries, ...", "= about (formal)", { hl: "With respect to" }],
            ["question", "doubt as to whether he will come", "= about, before whether", { hl: "as to" }],
            ["turnTo", "As for me, I agree.", "turning to someone new", { hl: "As for" }],
          ]),
        ],
      },
      {
        id: "why-not",
        title: "Why not the other one?",
        alt: "Left: a person turning to another, labelled As for me, I agree (turning to a new person). Right: a question mark, labelled As to me, I agree; as to means about.",
        say: [
          { text: "_As for me, I agree._ **As for** turns to a new person or topic.", cue: "wn1" },
          { text: "**As to** means about: _doubts as to whether he will come._ It does not introduce yourself.", cue: "wn2" },
          { text: "So: as for = turning to; as to = about.", cue: "wn-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.swap("wn", ["turnTo", "As for me, I agree.", "turning to a new person", { hl: "As for" }], ["question", "\u2717 As to me, I agree.", "as to = about", { ink: "trouble" }], ["as for = turning to a new topic", "as to = about: doubts as to whether"]),
        ],
      },
      {
        id: "check",
        title: "Check: as to or as for?",
        alt: "The four reference phrases remain on the board.",
        say: [{ text: "Is the speaker turning to a new topic?" }],
        actions: [],
        check: {
          id: "reference-q1",
          source: "original",
          skill: "as for vs as to",
          prompt: "The ministers have agreed. ___ the opposition, it has not yet decided.",
          options: [
            { text: "As for", correct: true, why: "Correct. The speaker turns to a new party: _as for the opposition._" },
            { text: "As to", misconception: "reference-phrases", why: "As to means about, usually inside a sentence (_doubts as to whether_). To turn to a new topic, use as for." },
            { text: "In terms of", misconception: "reference-phrases", why: "In terms of means from the point of view of a measure, which does not fit here." },
          ],
        },
      },
    ],
  });
})();
