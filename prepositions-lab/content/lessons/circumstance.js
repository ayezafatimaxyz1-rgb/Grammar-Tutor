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
        alt: "Five pictures: an eye seeing a warning sign (in view of the risks), light on a document (in the light of new evidence), a flame and stairs (in the event of fire), a person facing strong wind (in the face of opposition), a boat with waves behind it (in the wake of the floods).",
        say: [
          { text: "**In view of** = with this in sight, considering it: the eye sees the warning sign. **In (the) light of**: new evidence is lit up. _In view of the risks, the trip was cancelled._", cue: "f2" },
          { text: "**In the event of** = if it happens: if fire breaks out, take the stairs. _In the event of fire, use the stairs._", cue: "f3" },
          { text: "**In the face of** = facing a force, often despite it: _She stood firm in the face of opposition._ **In the wake of** = following, like the waves a boat leaves behind it: _Prices rose in the wake of the floods._", cue: "f5" },
        ],
        actions: [
          PLAB.kit.clear("clear-rd-forms"),
          ...PLAB.kit.grid("f", [
            ["viewRisk", "In view of the risks, ...", "considering them", { hl: "In view of" }],
            ["lightDoc", "in the light of new evidence", "seen in new light", { hl: "in the light of" }],
            ["fireStairs", "In the event of fire, ...", "if it happens", { hl: "In the event of" }],
            ["faceWind", "in the face of opposition", "facing a force", { hl: "in the face of" }],
            ["boat", "in the wake of the floods", "following after it", { hl: "in the wake of" }],
          ]),
        ],
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
