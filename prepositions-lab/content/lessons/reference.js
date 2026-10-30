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
        alt: "Rows: In terms of population, Punjab is the largest province. With respect to salaries, no change. There is doubt as to whether he will come. As for me, I agree.",
        say: [
          { text: "**In terms of** = measured or seen from this point of view: _In terms of population, Punjab is the largest province._", cue: "f1" },
          { text: "**With respect to** = about, formal: _With respect to salaries, there is no change._", cue: "f2" },
          { text: "**As to** = about, often before _whether_ or _how_: _There is doubt as to whether he will come._", cue: "f3" },
          { text: "**As for** = turning to a new person or topic: _As for me, I agree._", cue: "f4" },
        ],
        actions: K.lines("f", [["In terms of population, Punjab is largest.", { hl: "In terms of", size: 34 }], ["With respect to salaries, no change.", { hl: "With respect to", size: 34 }], ["doubt as to whether he will come", { hl: "as to", size: 34 }], ["As for me, I agree.", { hl: "As for", size: 34 }]], { y: 130, gap: 105 }),
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
