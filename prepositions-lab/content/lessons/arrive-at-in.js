/* Lesson 2.5: arrive at a building or point, arrive in a city or country; never arrive to. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "arrive-at-in",
    title: "Arrive at, arrive in",
    phase: 2,
    unit: "p2-verb",
    level: "Beginner",
    minutes: 7,
    summary:
      "Arrive at a point (a building, a station, an airport, a decision) and arrive in an area (a city, a country). Arrive never takes to, and arrive home or arrive here take no preposition at all.",
    objectives: [
      "Choose arrive at for a point and arrive in for an area, using the point and area pictures from Phase 1.",
      "Avoid arrive to and arrive at home, and use arrive at for a decision or conclusion.",
    ],
    steps: [
      {
        id: "point-area",
        title: "A point or an area",
        alt: "Left: an arrow ending at a building marked with a dot, labelled arrive at the airport. Right: a city area with a dot inside, labelled arrive in Lahore.",
        say: [
          { text: "Remember **at** and **in** from Phase 1. **At** pictures a place as a point on your route. A building or a station is the point where the journey ends: _We arrived at the airport._", cue: "a1" },
          { text: "**In** pictures a place as an area you are now inside. Cities and countries are areas: _We arrived in Lahore. She arrived in Pakistan last week._", cue: "a2" },
        ],
        actions: K.panels("a", [
          ["airportDot", "arrive at the airport", "a point where the trip ends", { hl: "at" }],
          ["inCity", "arrive in Lahore", "an area you are now inside", { hl: "in" }],
        ], { y: 60 }),
      },
      {
        id: "why-not-to",
        title: "Why not arrive to?",
        alt: "Left: go to school, an arrow moving towards a house. Right: arrived at school, a dot already at the house. Crossed out: arrived to school. Also: arrive home, arrive here (no preposition).",
        say: [
          { text: "**To** describes the movement towards a goal: _go to school._ But **arrive** describes the end, when you are already there, so it takes a place word: **at** or **in**.", cue: "r1" },
          { text: "So never _arrive to._ And with _home, here, there_ no preposition is used: _We arrived home late._", cue: "r3" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.rows("r", [
            ["goHome", "go to school  (moving towards it)", { hl: "to" }],
            ["arriveDoor", "arrived at school  (already there)", { hl: "at" }],
            ["house", "arrived home · arrived here  (no preposition)", { ink: "accent2", size: 30 }],
            ["cross", "✗ arrived to school · ✗ arrived at home", { ink: "trouble" }],
          ], { y: 90, gap: 125 }),
        ],
      },
      {
        id: "decision",
        title: "Arriving at a conclusion",
        alt: "Several lines of thought converging on a circled tick. Sentences: The committee arrived at a decision. Similar: reach a decision (no preposition), come to a conclusion.",
        say: [
          { text: "Thinking is pictured as a journey. Many lines of thought meet at one point, the decision: _The committee arrived at a decision._", cue: "pic-0-0" },
          { text: "A decision is a point, so it takes **at**. Compare: _reach a decision_ (no preposition) and _come to a conclusion._", cue: "s2" },
        ],
        actions: [
          K.clear("clear-2"),
          ...K.pic("pic", "conclusion", 340, 40, 2),
          { do: "write", id: "s1", text: "The committee arrived at a decision.", x: 480, y: 330, size: 40, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s1-h", target: "s1", word: "arrived at" },
          { do: "write", id: "s2", text: "reach a decision · come to a conclusion", x: 480, y: 420, size: 32, ink: "accent2", anchor: "middle", gap: 400 },
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence We arrived with a gap the airport at noon., then the candidates with pictures: at (right: a building is a point); in (wrong: in is for cities, countries); to (wrong: to = still moving). Rule: arrive at a point \u00b7 arrive in an area; never arrive to.",
        say: [
          { text: "Fill the gap: We arrived \u2026 the airport at noon. The answer is **at**: a building is a point.", cue: "why1" },
          { text: "Why not the others? **in**: in is for cities, countries. **to**: to = still moving.", cue: "why2" },
          { text: "The rule: arrive at a point \u00b7 arrive in an area; never arrive to.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "We arrived ____ the airport at noon.", [["airportDot", "at", true, "a building is | a point"], ["inCity", "in", false, "in is for cities, | countries"], ["goHome", "to", false, "to = still | moving"]], ["arrive at a point \u00b7 arrive in an area", "never arrive to"]),
        ],
      },
      {
        id: "check",
        title: "Check: sentence correction",
        alt: "The board remains.",
        say: [{ text: "An original practice question." }],
        actions: [],
        check: {
          id: "arrive-q1",
          source: "original",
          skill: "arrive at / in",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "The delegation arrived in Islamabad on Monday and at the ministry an hour later.", correct: true, why: "Correct. A city is an area (_in_); a building is a point (_at_)." },
            { text: "The delegation arrived to Islamabad on Monday and to the ministry an hour later.", misconception: "arrive-to", why: "_Arrive_ marks the end of the journey and never takes _to._" },
            { text: "The delegation arrived at Islamabad on Monday and in the ministry an hour later.", misconception: "arrive-to", why: "Reversed. A capital city is pictured as an area, and a building as a point." },
          ],
        },
      },
    ],
  });
})();
