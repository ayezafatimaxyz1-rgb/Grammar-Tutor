/* Lesson 1.34: IN, WITHIN, AFTER and LATER with a length of time. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "within-time",
    title: "IN, WITHIN, AFTER, LATER",
    phase: 1,
    unit: "p1-time",
    level: "Intermediate",
    minutes: 8,
    summary:
      "Four ways to place an event a length of time away. In two weeks (counted from now), within two weeks (no later than), after two weeks (a sequence, often past) and two weeks later (after a past event, word order matters).",
    objectives: [
      "Choose in, within, after or later for an event a length of time away.",
      "Place later after the length: two weeks later.",
    ],
    steps: [
      {
        id: "four",
        title: "Four ways to count",
        alt: "A time line. From now, a dot two weeks ahead labelled in two weeks. A shaded span up to that point labelled within two weeks. Below, a past event with a dot two weeks after it labelled two weeks later, after two weeks.",
        say: [
          { text: "**In two weeks**: counted from now, at the end of the period. _The results will be out in two weeks._", cue: "in-l" },
          { text: "**Within two weeks**: any time up to that limit. _You will hear from us within two weeks._", cue: "within-l" },
          { text: "**Two weeks later** and **after two weeks**: counted from an event in a story, usually in the past. _He fell ill in May; two weeks later he died._ Note the order: the length, then _later._", cue: "later-l" },
        ],
        actions: [
          ...K.timeline("tl", { y: 180, now: false }),
          { do: "draw", id: "now", shape: "circle", cx: 300, cy: 180, r: 11, ink: "accent", fill: "solid", dur: 400 },
          { do: "write", id: "now-l", text: "now", x: 300, y: 150, size: 28, ink: "accent", anchor: "middle" },
          { do: "draw", id: "span", shape: "rect", x: 300, y: 160, w: 380, h: 40, ink: "accent2", fill: "soft", dur: 800, gap: 300 },
          { do: "write", id: "within-l", text: "within two weeks", x: 490, y: 240, size: 30, ink: "accent2", anchor: "middle" },
          { do: "draw", id: "end", shape: "circle", cx: 680, cy: 180, r: 11, ink: "trouble", fill: "solid", dur: 400 },
          { do: "write", id: "in-l", text: "in two weeks", x: 680, y: 150, size: 30, ink: "trouble", anchor: "middle" },
          { do: "write", id: "later-l", text: "May: fell ill → two weeks later, died", x: 480, y: 380, size: 34, anchor: "middle", gap: 600, dur: 2000 },
          { do: "highlight", id: "later-h", target: "later-l", word: "later" },
          { do: "write", id: "after-l", text: "also: after two weeks, he died", x: 480, y: 450, size: 30, ink: "muted", anchor: "middle", gap: 400 },
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence The work will be finished with a gap two weeks, maybe sooner., then the candidates with pictures: within (right: any time inside the two weeks); in (wrong: in = at the end of two weeks); after (wrong: only once they are over). Rule: within = no later than; in = when the time has passed.",
        say: [
          { text: "Fill the gap: The work will be finished \u2026 two weeks, maybe sooner. The answer is **within**: any time inside the two weeks.", cue: "why1" },
          { text: "Why not the others? **in**: in = at the end of two weeks. **after**: only once they are over.", cue: "why2" },
          { text: "The rule: within = no later than; in = when the time has passed.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "The work will be finished ____ two weeks, maybe sooner.", [["inPeriod", "within", true, "any time inside | the two weeks"], ["pointFuture", "in", false, "in = at the end of | two weeks"], ["afterDot", "after", false, "only once they | are over"]], ["within = no later than", "in = when the time has passed"]),
        ],
      },
      {
        id: "check",
        title: "Check: a story in the past",
        alt: "The time line and the story remain on the board.",
        say: [{ text: "Is the time counted from now, or from an event in the story?" }],
        actions: [],
        check: {
          id: "within-time-q1",
          source: "original",
          skill: "later after a past event",
          prompt: "The treaty was signed in March. Three months ___, war broke out.",
          options: [
            { text: "later", correct: true, why: "Correct. Counting from a past event in a story: _three months later._" },
            { text: "in", misconception: "in-vs-after-duration", why: "_In three months_ counts from now, into the future. In a past story, use _three months later._" },
            { text: "within", misconception: "within-vs-in-time", why: "_Within_ sets a limit (no later than), and would need _of_ here. The story needs _later._" },
          ],
        },
      },
    ],
  });
})();
