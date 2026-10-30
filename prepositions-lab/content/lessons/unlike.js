/* Lesson 1.43: UNLIKE, and comparing like with like. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "unlike",
    title: "UNLIKE: comparing like with like",
    phase: 1,
    unit: "p1-relations",
    level: "Advanced",
    minutes: 7,
    summary:
      "Unlike introduces a contrast. The thing after unlike must be the same kind of thing as the subject it is compared with. Unlike Karachi, Lahore has cold winters is right; unlike Karachi's weather, Lahore has cold winters is a faulty comparison.",
    objectives: [
      "Use unlike to contrast two things of the same kind.",
      "Spot and correct faulty comparisons in sentence-correction questions.",
    ],
    steps: [
      {
        id: "contrast",
        title: "A contrast",
        alt: "Two boxes: Karachi and Lahore, joined by a not-equal sign. Sentence: Unlike Karachi, Lahore has cold winters.",
        say: [
          { text: "**Unlike** means _different from_, and introduces a contrast: _Unlike Karachi, Lahore has cold winters._", cue: "s1" },
          { text: "The two things compared must be the same kind: a city with a city. _Karachi_ is compared with the subject _Lahore._", cue: "ne" },
        ],
        actions: [
          { do: "draw", id: "k", shape: "rect", x: 160, y: 120, w: 220, h: 90, ink: "accent2", fill: "soft", dur: 700 },
          { do: "write", id: "k-l", text: "Karachi", x: 270, y: 175, size: 30, ink: "accent2", anchor: "middle" },
          { do: "write", id: "ne", text: "≠", x: 480, y: 185, size: 60, ink: "trouble", anchor: "middle" },
          { do: "draw", id: "l", shape: "rect", x: 580, y: 120, w: 220, h: 90, ink: "accent", fill: "soft", dur: 700 },
          { do: "write", id: "l-l", text: "Lahore", x: 690, y: 175, size: 30, ink: "accent", anchor: "middle" },
          { do: "write", id: "s1", text: "Unlike Karachi, Lahore has cold winters.", x: 480, y: 340, size: 38, anchor: "middle", gap: 500, dur: 2100 },
          { do: "highlight", id: "s1-h", target: "s1", word: "Unlike" },
        ],
      },
      {
        id: "faulty",
        title: "A faulty comparison",
        alt: "Crossed out: Unlike Karachi's weather, Lahore has cold winters, which compares weather with a city. Correct: Unlike Karachi's weather, Lahore's is cold in winter.",
        say: [
          { text: "_Unlike Karachi's weather, Lahore has cold winters_ compares **weather** with **a city**. That is a faulty comparison.", cue: "f1" },
          { text: "Fix it by matching the two: _Unlike Karachi's weather, Lahore's is cold in winter_, or _Unlike Karachi, Lahore has cold winters._", cue: "f2" },
        ],
        actions: [K.clear("clear-1"), ...K.lines("f", [["✗ Unlike Karachi's weather, Lahore has cold winters.", { ink: "trouble", size: 32 }], ["✓ Unlike Karachi's weather, Lahore's is cold in winter.", { ink: "accent", size: 32 }]], { y: 200, gap: 130 })],
      },
      {
        id: "check",
        title: "Check: like with like",
        alt: "The faulty and correct comparisons remain on the board.",
        say: [{ text: "An original practice item in CSS sentence-correction style. Check what is compared with what." }],
        actions: [],
        check: {
          id: "unlike-q1",
          source: "original",
          skill: "parallel comparison with unlike",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "Unlike his predecessor, the new governor favours tight monetary policy.", correct: true, why: "Correct. A person (the predecessor) is compared with a person (the new governor)." },
            { text: "Unlike his predecessor's policy, the new governor favours tight money.", misconception: "faulty-comparison", why: "This compares a policy with a governor. Compare like with like." },
            { text: "Unlike with his predecessor, the new governor favours tight money.", misconception: "faulty-comparison", why: "_Unlike_ takes its object directly, never _unlike with._" },
          ],
        },
      },
    ],
  });
})();
