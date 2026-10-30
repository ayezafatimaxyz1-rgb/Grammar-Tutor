/* Lesson 1.59: circumstance: in view of, in (the) light of, in the event of, in case of, in the face of, in the wake of. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "circumstance",
    title: "In view of, in the wake of, in the event of",
    phase: 1,
    unit: "p1-complex",
    level: "Advanced",
    minutes: 8,
    summary:
      "Phrases that set the circumstances: in view of and in (the) light of (considering), in the event of and in case of (if it happens), in the face of (confronted by, despite), in the wake of (following, as a result of).",
    objectives: [
      "Use in view of and in light of (BrE in the light of) for considering.",
      "Use in the event of and in case of for if something happens.",
      "Use in the face of and in the wake of in formal writing.",
    ],
    steps: [
      {
        id: "forms",
        title: "Setting the circumstances",
        alt: "Rows: in view of the risks (considering); in the light of new evidence; in the event of fire (if there is a fire); in the face of opposition (confronted by); in the wake of the floods (following).",
        say: [
          { text: "**In view of** and **in (the) light of** = considering: _In view of the risks, the trip was cancelled. In the light of new evidence, the case was reopened._ (American English usually drops _the_.)", cue: "f2" },
          { text: "**In the event of** and **in case of** = if it happens, common in notices: _In the event of fire, use the stairs._", cue: "f3" },
          { text: "**In the face of** = confronted by, often despite: _She stood firm in the face of opposition._", cue: "f4" },
          { text: "**In the wake of** = following, usually as a result of: _Prices rose in the wake of the floods._", cue: "f5" },
        ],
        actions: K.lines("f", [["In view of the risks, ...", { hl: "In view of" }], ["in the light of new evidence", { hl: "in the light of" }], ["In the event of fire, use the stairs.", { hl: "In the event of" }], ["in the face of opposition", { hl: "in the face of" }], ["in the wake of the floods", { hl: "in the wake of" }]], { y: 110, gap: 90, size: 34 }),
      },
      {
        id: "check",
        title: "Check: following an event",
        alt: "The five rows remain on the board.",
        say: [{ text: "An original practice question in the style of formal reporting." }],
        actions: [],
        check: {
          id: "circ-q1",
          source: "original",
          skill: "in the wake of",
          prompt: "Food prices soared ___ the devastating floods of 2022.",
          options: [
            { text: "in the wake of", correct: true, why: "Correct. The rise followed the floods and was caused by them." },
            { text: "in the event of", misconception: "circumstance-phrases", why: "In the event of means if it happens, for a possible future event. The floods already happened." },
            { text: "in the face of", misconception: "circumstance-phrases", why: "In the face of means confronted by, often despite. Prices did not resist the floods; they rose because of them." },
          ],
        },
      },
    ],
  });
})();
