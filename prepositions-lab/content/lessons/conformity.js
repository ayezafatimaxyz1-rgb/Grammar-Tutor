/* Lesson 1.56: conformity and basis: according to, in accordance with, in line with, on the basis of, pursuant to. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "conformity",
    title: "According to, in accordance with",
    phase: 1,
    unit: "p1-complex",
    level: "Advanced",
    minutes: 8,
    summary:
      "According to reports what a source says; in accordance with and in line with mean following a rule; on the basis of names the grounds; pursuant to is legal. And the classic error according to me: for your own opinion, write in my opinion.",
    objectives: [
      "Use according to for what a source says, and never according to me.",
      "Use in accordance with and in line with for following rules or policy.",
      "Use on the basis of for grounds, and recognise pursuant to in legal texts.",
    ],
    steps: [
      {
        id: "forms",
        title: "Source, rule, grounds",
        alt: "Four pictures: a document speaking (according to the report), an arrow along a ruler (in accordance with Article 10), an arrow staying on a line (in line with policy), a block resting on a base (on the basis of merit).",
        say: [
          { text: "**According to** reports what a source says: the report speaks. _According to the report, poverty has fallen._", cue: "f1" },
          { text: "**In accordance with** and **in line with** mean following a rule: the arrow runs along the ruler. _in accordance with Article 10, in line with government policy._", cue: "f2" },
          { text: "**On the basis of** names the grounds a decision rests on: _selected on the basis of merit._ **Pursuant to** is legal: _pursuant to the court's order._", cue: "f4" },
        ],
        actions: [
          PLAB.kit.clear("clear-rd-forms"),
          ...PLAB.kit.grid("f", [
            ["docSays", "According to the report, ...", "what a source says", { hl: "According to" }],
            ["followRule", "in accordance with Article 10", "following a rule", { hl: "in accordance with" }],
            ["stickTo", "in line with government policy", "staying on the same line", { hl: "in line with" }],
            ["onBase", "on the basis of merit", "the grounds it rests on", { hl: "on the basis of" }],
          ]),
        ],
      },
      {
        id: "me",
        title: "Not according to me",
        alt: "Crossed out: According to me, the policy failed. Correct: In my opinion, the policy failed. I believe the policy failed.",
        say: [
          { text: "_According to_ points at **someone else** who speaks. Using it for your own view, _according to me_, is a well-known error in South Asian English.", cue: "m1" },
          { text: "For a thought in your own head, write _In my opinion_, _In my view_ or _I believe._", cue: "m2" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.panels("m", [
            [[["thinkSelf", 0, 0], ["cross", 0, 0]], "✗ According to me, ...", "", { ink: "trouble" }],
            ["thinkSelf", "✓ In my opinion, ...", "your own view", { hl: "In my opinion" }],
          ]),
        ],
      },
      {
        id: "why-not",
        title: "Why not the other one?",
        alt: "Left: a document with a speech bubble, labelled According to the report, ... (a source). Right: a person with a crossed bubble, labelled According to me, ..., using a source phrase for yourself.",
        say: [
          { text: "_According to the report, poverty fell._ **According to** reports what a source says.", cue: "wn1" },
          { text: "You are not a source you quote. _According to me_ sounds odd in formal English.", cue: "wn2" },
          { text: "For your own view: _In my opinion, In my view, I believe._", cue: "wn-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.swap("wn", ["docSays", "According to the report, ...", "a source", { hl: "According to" }], ["thinkSelf", "\u2717 According to me, ...", "use: In my opinion, ...", { ink: "trouble" }], ["according to + a source", "In my opinion + your own view"]),
        ],
      },
      {
        id: "check",
        title: "Check: sentence correction",
        alt: "The according to me correction remains on the board.",
        say: [{ text: "An original practice item in CSS sentence-correction style." }],
        actions: [],
        check: {
          id: "conform-q1",
          source: "original",
          skill: "according to vs in my opinion",
          prompt: "Choose the most appropriate opening for your own argument in an essay.",
          options: [
            { text: "In my view, the reforms were introduced too late.", correct: true, why: "Correct. Your own opinion: _in my view_ or _in my opinion._" },
            { text: "According to me, the reforms were introduced too late.", misconception: "according-to-me", why: "_According to_ reports a source, not your own view. Use _in my view._" },
            { text: "As per me, the reforms were introduced too late.", misconception: "according-to-me", why: "_As per_ is jargon and _as per me_ is not standard. Use _in my view._" },
          ],
        },
      },
    ],
  });
})();
