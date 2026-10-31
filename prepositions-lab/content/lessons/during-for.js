/* Lesson 1.30: DURING vs FOR, and during vs while. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "during-for",
    title: "DURING vs FOR",
    phase: 1,
    unit: "p1-time",
    level: "Intermediate",
    minutes: 8,
    summary:
      "During answers when (inside which period); for answers how long. During takes a noun, while takes a clause. So: during the night, for eight hours, while I was sleeping.",
    objectives: [
      "Use during for when something happens within a period, and for for how long.",
      "Use during + noun and while + clause.",
    ],
    steps: [
      {
        id: "when-howlong",
        title: "When? or How long?",
        alt: "A bar labelled the night. A dot inside it marks when I woke up: during the night. A bracket across a stretch marks how long: I slept for eight hours.",
        say: [
          { text: "Here is one night, drawn as a stretch of time.", cue: "night" },
          { text: "Something happened at some point inside it: _I woke up twice during the night._ **During** answers **when?**", cue: "s-during" },
          { text: "_I slept for eight hours._ **For** answers **how long?**", cue: "s-for" },
        ],
        actions: [
          { do: "draw", id: "night", shape: "rect", x: 120, y: 170, w: 720, h: 80, ink: "muted", fill: "soft", dur: 1000 },
          { do: "write", id: "night-l", text: "the night", x: 480, y: 155, size: 28, ink: "muted", anchor: "middle" },
          { do: "draw", id: "wake", shape: "group", ink: "trouble", fill: "solid", dur: 500, gap: 400, parts: [{ shape: "circle", cx: 330, cy: 210, r: 10 }, { shape: "circle", cx: 610, cy: 210, r: 10 }] },
          { do: "write", id: "s-during", text: "I woke up twice during the night.", x: 480, y: 340, size: 36, ink: "trouble", anchor: "middle" },
          { do: "write", id: "s-for", text: "I slept for eight hours.", x: 480, y: 440, size: 36, ink: "accent2", anchor: "middle", gap: 600 },
          { do: "highlight", id: "h-during", target: "s-during", word: "during", sync: true },
          { do: "highlight", id: "h-for", target: "s-for", word: "for" },
        ],
      },
      {
        id: "while",
        title: "During + noun, while + clause",
        alt: "Correct: during the meeting; while we were meeting. Crossed out: during we were meeting.",
        say: [
          { text: "**During** is a preposition: it takes a noun, a named period, and the event sits inside it. _during the meeting, during the war._", cue: "w1" },
          { text: "**While** is a conjunction: it joins two events happening at the same time, each with its own verb. _while we were meeting._", cue: "w2" },
          { text: "_During we were meeting_ mixes them and is wrong.", cue: "w3" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.panels("w", [
            ["inPeriod", "during the meeting", "+ noun", { hl: "during" }],
            ["parallel", "while we were meeting", "+ clause", { hl: "while" }],
          ]),
          { do: "write", id: "w3", text: "✗ during we were meeting", x: 480, y: 470, size: 36, ink: "trouble", anchor: "middle", gap: 500 },
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence I woke up twice with a gap the night., then the candidates with pictures: during (right: when: inside that time); for (wrong: for = how long); while (wrong: while + a clause: while I slept). Rule: during + noun = when; for = how long \u00b7 while + clause.",
        say: [
          { text: "Fill the gap: I woke up twice \u2026 the night. What does the sentence want to say? The answer is **during**: when: inside that time.", cue: "why1" },
          { text: "Why not the others? **for**: for = how long. **while**: while + a clause: while I slept.", cue: "why2" },
          { text: "The rule: during + noun = when; for = how long \u00b7 while + clause.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "I woke up twice ____ the night.", [["inPeriod", "during", true, "when: inside | that time"], ["span", "for", false, "for = how long"], ["speak", "while", false, "while + a clause: | while I slept"]], ["during + noun = when", "for = how long \u00b7 while + clause"]),
        ],
      },
      {
        id: "check1",
        title: "Check: when or how long?",
        alt: "The during and while lines remain on the board.",
        say: [{ text: "Does the blank answer when, or how long?" }],
        actions: [],
        check: {
          id: "during-q1",
          source: "original",
          skill: "for vs during",
          prompt: "She was in hospital ___ three weeks after the accident.",
          options: [
            { text: "for", correct: true, why: "Correct. _Three weeks_ is how long: for." },
            { text: "during", misconception: "during-vs-for", why: "During needs a named period (_during the war_), not a length. How long takes for." },
            { text: "since", misconception: "for-vs-since", why: "Since needs a starting point. _Three weeks_ is a length: for." },
          ],
        },
      },
      {
        id: "check2",
        title: "Check: noun or clause?",
        alt: "The during and while lines remain on the board.",
        say: [{ text: "Look at what follows the blank." }],
        actions: [],
        check: {
          id: "during-q2",
          source: "original",
          skill: "during vs while",
          prompt: "The power failed ___ the Prime Minister was speaking.",
          options: [
            { text: "while", correct: true, why: "Correct. _The Prime Minister was speaking_ is a clause, so the conjunction while." },
            { text: "during", misconception: "prep-vs-conj", why: "During needs a noun (_during the speech_). Before a clause, use while." },
            { text: "for", misconception: "during-vs-for", why: "For gives a length. Here we need when, before a clause: while." },
          ],
        },
      },
    ],
  });
})();
