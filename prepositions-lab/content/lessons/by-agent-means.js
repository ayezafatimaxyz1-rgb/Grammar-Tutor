/* Lesson 1.40: BY: agent, means, method, difference. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "by-agent-means",
    title: "BY: who did it and how",
    phase: 1,
    unit: "p1-relations",
    level: "Intermediate",
    minutes: 10,
    summary:
      "By names the doer in the passive (written by Iqbal), the means of transport or communication (by train, by email, with no article), the method (by working hard), and the size of a change (rose by 10 per cent, to 110). Plus on foot and in my car.",
    objectives: [
      "Use by for the agent of a passive verb.",
      "Use by + bare noun for transport and communication, and on foot, in my car, on the 7 o'clock train.",
      "Tell rose by (the difference) from rose to (the new level), a frequent exam point.",
    ],
    steps: [
      {
        id: "agent",
        title: "The doer",
        alt: "Sentence: The poem was written by Iqbal, with by Iqbal labelled the agent, the doer of the action.",
        say: [
          { text: "In a passive sentence, **by** names the doer, the **agent**: the poet produces the page. _The poem was written by Iqbal._", cue: "a1" },
          { text: "It also names the creator of a work: _a novel by Bano Qudsia, a painting by Sadequain._", cue: "a2" },
        ],
        actions: [
          ...PLAB.kit.pic("ag", "writtenBy", 300, 40, 2.6),
          ...PLAB.kit.lines("a", [["The poem was written by Iqbal.", { hl: "by" }], ["a novel by Bano Qudsia · a painting by Sadequain", { size: 30, ink: "muted" }]], { y: 330, gap: 100, size: 40 }),
        ],
      },
      {
        id: "means",
        title: "Means: by + bare noun",
        alt: "Rows: by train, by bus, by car, by air; by email, by post, by phone; by hand, by cheque. Note: on foot; in my car; on the 7 o'clock train.",
        say: [
          { text: "**By** + a bare noun (no _the_, no _my_) names the means: _by train, by car, by air, by email, by hand._", cue: "m1" },
          { text: "As soon as you add _the_ or _my_, the vehicle becomes a real place again, so use the place prepositions: _in my car, on the 7 o'clock train._", cue: "m2" },
          { text: "Walking is _on foot_: the feet are the surface you travel on. Not _by foot_ or _by walk._", cue: "m3" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.rows("m", [
            ["train", "by train · by air · by email · by hand", { hl: "by" }],
            ["car", "in my car · on the 7 o'clock train", { ink: "accent2" }],
            ["feet", "on foot (✗ by walk)", { hl: "on foot" }],
          ], { y: 120, gap: 130, size: 34 }),
        ],
      },
      {
        id: "method",
        title: "Method: by + -ing",
        alt: "Sentence: She passed by working hard every day. Note: by + -ing answers how.",
        say: [
          { text: "**By + -ing** gives the method, answering _how?_: hard work is the road that leads to success. _She passed by working hard every day._", cue: "h1" },
          { text: "_You can save energy by switching off lights._", cue: "h2" },
        ],
        actions: [
          PLAB.kit.clear("clear-2"),
          ...PLAB.kit.pic("ws", "workSuccess", 300, 40, 2.6),
          ...PLAB.kit.lines("h", [["She passed by working hard.", { hl: "by" }], ["by + -ing = how?", { ink: "accent2", size: 30 }]], { y: 330, gap: 100, size: 40 }),
        ],
      },
      {
        id: "change",
        title: "Rose by, rose to",
        alt: "A bar chart: one bar at 100, a taller bar at 110. The gap between them is labelled by 10 per cent; the top of the new bar is labelled to 110.",
        say: [
          { text: "A price was 100 rupees and is now 110.", cue: "b2" },
          { text: "**By** gives the size of the change: _The price rose by 10 per cent._", cue: "by-l" },
          { text: "**To** gives the new level: _It rose to 110 rupees._ Charts and data questions test this often.", cue: "to-l" },
        ],
        actions: [
          K.clear("clear-3"),
          { do: "draw", id: "base", shape: "line", from: [200, 420], to: [600, 420], ink: "muted", width: 2.4, dur: 500, gap: 400 },
          { do: "draw", id: "b1", shape: "rect", x: 260, y: 220, w: 100, h: 200, ink: "accent2", fill: "soft", dur: 700 },
          { do: "write", id: "b1-l", text: "100", x: 310, y: 205, size: 28, anchor: "middle" },
          { do: "draw", id: "b2", shape: "rect", x: 440, y: 180, w: 100, h: 240, ink: "accent", fill: "soft", dur: 700 },
          { do: "draw", id: "gap", shape: "group", ink: "trouble", width: 3, dur: 500, parts: [{ shape: "line", from: [430, 220], to: [380, 220], wobble: 0.3 }, { shape: "line", from: [400, 180], to: [400, 220], wobble: 0.3 }] },
          { do: "write", id: "by-l", text: "by 10%", x: 700, y: 210, size: 34, ink: "trouble", anchor: "middle", gap: 400 },
          { do: "write", id: "to-l", text: "to 110", x: 490, y: 160, size: 30, ink: "accent", anchor: "middle", gap: 400 },
        ],
      },
      {
        id: "check1",
        title: "Check: data language",
        alt: "The bar chart remains on the board.",
        say: [{ text: "An original practice question in the style of a data description." }],
        actions: [],
        check: {
          id: "by-q1",
          source: "original",
          skill: "by vs to for change",
          prompt: "Exports fell ___ 8 per cent, ___ $25 billion.",
          options: [
            { text: "by / to", correct: true, why: "Correct. By gives the size of the fall; to gives the new level." },
            { text: "to / by", misconception: "by-vs-to-change", why: "This reverses them: 8 per cent is the size of the change (by), $25 billion is the new level (to)." },
            { text: "with / at", misconception: "by-vs-to-change", why: "_Fell with_ is not used for amounts. Use _fell by_ (the change) and _to_ (the new level)." },
          ],
        },
      },
      {
        id: "check2",
        title: "Check: on foot",
        alt: "The bar chart remains on the board.",
        say: [{ text: "Walking is the exception." }],
        actions: [],
        check: {
          id: "by-q2",
          source: "original",
          skill: "on foot",
          prompt: "The students walked to the museum. They went there ___.",
          options: [
            { text: "on foot", correct: true, why: "Correct. The fixed phrase for walking is _on foot._" },
            { text: "by foot", misconception: "by-means", why: "_By foot_ is heard, but the standard phrase is _on foot._" },
            { text: "by walk", misconception: "by-means", why: "_By walk_ is not English. Use _on foot_ or just _They walked there._" },
          ],
        },
      },
    ],
  });
})();
