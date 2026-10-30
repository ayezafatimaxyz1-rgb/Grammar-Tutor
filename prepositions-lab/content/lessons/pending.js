/* Lesson 1.35: PENDING and other -ing / -ed prepositions. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "pending",
    title: "PENDING, FOLLOWING, GIVEN, CONSIDERING",
    phase: 1,
    unit: "p1-time",
    level: "Advanced",
    minutes: 8,
    summary:
      "Some prepositions look like verb forms. Pending means until or while waiting for; following means after; given and considering mean taking into account. They are common in official and legal English.",
    objectives: [
      "Use pending for while waiting for a decision or event.",
      "Use following for after, and given or considering for taking into account.",
      "Recognise these as prepositions, not verbs, in formal sentences.",
    ],
    steps: [
      {
        id: "pending",
        title: "Pending: while waiting for",
        alt: "A time line with a shaded waiting period ending at a box labelled inquiry result. Sentence: The officer was suspended pending an inquiry.",
        say: [
          { text: "Here is a period of waiting, which ends when an inquiry reports.", cue: "wait" },
          { text: "**Pending** means _until_ or _while waiting for_: _The officer was suspended pending an inquiry._ The suspension lasts until the inquiry decides.", cue: "s1" },
        ],
        actions: [
          ...K.timeline("tl", { y: 200, now: false }),
          { do: "draw", id: "wait", shape: "rect", x: 160, y: 180, w: 460, h: 40, ink: "accent2", fill: "soft", dur: 800, gap: 300 },
          { do: "draw", id: "res", shape: "rect", x: 630, y: 110, w: 160, h: 70, ink: "trouble", dur: 600 },
          { do: "write", id: "res-l", text: "inquiry", x: 710, y: 155, size: 28, ink: "trouble", anchor: "middle" },
          { do: "write", id: "s1", text: "suspended pending an inquiry", x: 480, y: 360, size: 40, anchor: "middle", gap: 400, dur: 1700 },
          { do: "highlight", id: "s1-h", target: "s1", word: "pending" },
        ],
      },
      {
        id: "others",
        title: "Following, given, considering",
        alt: "Three formal examples: Following the verdict, protests broke out. Given the cost, the plan was dropped. Considering his age, he did well.",
        say: [
          { text: "**Following** = after. The verdict comes first, then the crowd reacts: _Following the verdict, protests broke out._", cue: "o1" },
          { text: "**Given** = taking into account. The cost is put on the scales and decides the result: _Given the cost, the plan was dropped._", cue: "o2" },
          { text: "**Considering** = taking into account, often with surprise: _Considering his age, he played very well._", cue: "o3" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.panels("o", [
            ["followEvent", "Following the verdict, ...", "= after", { hl: "Following", size: 26 }],
            ["weighCost", "Given the cost, ...", "= taking into account", { hl: "Given", size: 26 }],
            ["scaleTip", "Considering his age, ...", "= taking into account", { hl: "Considering", size: 26 }],
          ]),
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence The decision was postponed with a gap an inquiry., then the candidates with pictures: pending (right: while waiting for it); following (wrong: = after it is over); despite (wrong: = although there is an inquiry). Rule: pending = until something happens; following = after.",
        say: [
          { text: "Fill the gap: The decision was postponed \u2026 an inquiry. The answer is **pending**: while waiting for it.", cue: "why1" },
          { text: "Why not the others? **following**: = after it is over. **despite**: = although there is an inquiry.", cue: "why2" },
          { text: "The rule: pending = until something happens; following = after.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "The decision was postponed ____ an inquiry.", [["notWait", "pending", true, "while waiting | for it"], ["followEvent", "following", false, "= after it | is over"], ["overRock", "despite", false, "= although there | is an inquiry"]], ["pending = until something happens", "following = after"]),
        ],
      },
      {
        id: "check",
        title: "Check: exam style",
        alt: "The three formal examples remain on the board.",
        say: [{ text: "An original practice question in the style of an official notice." }],
        actions: [],
        check: {
          id: "pending-q1",
          source: "original",
          skill: "pending",
          prompt: "The project has been put on hold ___ approval from the Planning Commission.",
          options: [
            { text: "pending", correct: true, why: "Correct. The project waits until approval comes: _pending approval._" },
            { text: "following", misconception: "participle-preps", why: "_Following approval_ would mean after approval has come, but the project is on hold, still waiting." },
            { text: "given", misconception: "participle-preps", why: "_Given approval_ would mean taking approval into account as a fact. The project is waiting for it: pending." },
          ],
        },
      },
    ],
  });
})();
