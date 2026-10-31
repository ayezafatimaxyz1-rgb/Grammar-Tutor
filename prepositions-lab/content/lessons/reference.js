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
        title: "Why this one and not the others?",
        alt: "The sentence with a gap me, I agree with the plan., then the candidates with pictures: As for (right: turning to a new person); As to (wrong: as to = about: doubts as to whether); About (wrong: about me = a topic about me). Rule: as for = turning to someone new; as to = about.",
        say: [
          { text: "Fill the gap: \u2026 me, I agree with the plan. What does the sentence want to say? The answer is **As for**: turning to a new person.", cue: "why1" },
          { text: "Why not the others? **As to**: as to = about: doubts as to whether. **About**: about me = a topic about me.", cue: "why2" },
          { text: "The rule: as for = turning to someone new; as to = about.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "____ me, I agree with the plan.", [["turnTo", "As for", true, "turning to | a new person"], ["question", "As to", false, "as to = about: | doubts as to whether"], ["aboutCircle", "About", false, "about me = | a topic about me"]], ["as for = turning to someone new", "as to = about"]),
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
