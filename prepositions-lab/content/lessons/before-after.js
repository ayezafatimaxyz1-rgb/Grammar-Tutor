/* Lesson 1.32: BEFORE, AFTER, PRIOR TO, SUBSEQUENT TO, FOLLOWING. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "before-after",
    title: "BEFORE, AFTER, PRIOR TO, SUBSEQUENT TO",
    phase: 1,
    unit: "p1-time",
    level: "Intermediate",
    minutes: 8,
    summary:
      "Before and after place one event earlier or later than another. Formal writing uses prior to, subsequent to and following. Each takes a noun or -ing, and prior to is never prior than.",
    objectives: [
      "Use before and after + noun or -ing.",
      "Use the formal equivalents prior to, subsequent to and following correctly.",
      "Avoid prior than, previous than and after + to-infinitive.",
    ],
    steps: [
      {
        id: "order",
        title: "Earlier and later",
        alt: "A time line with an event box in the middle labelled the meeting. An arrow on the left labelled before the meeting, and one on the right labelled after the meeting.",
        say: [
          { text: "Here is an event on a time line: a meeting.", cue: "ev" },
          { text: "Anything earlier is **before** it: _Read the agenda before the meeting._", cue: "s-before" },
          { text: "Anything later is **after** it: _Lunch will be served after the meeting._ Both also take -ing: _before leaving, after signing._", cue: "s-after" },
        ],
        actions: [
          ...K.timeline("tl", { y: 230, now: false }),
          { do: "draw", id: "ev", shape: "rect", x: 400, y: 150, w: 160, h: 60, ink: "accent", fill: "soft", dur: 700, gap: 300 },
          { do: "write", id: "ev-l", text: "meeting", x: 480, y: 190, size: 28, ink: "accent", anchor: "middle" },
          { do: "write", id: "s-before", text: "before the meeting", x: 220, y: 330, size: 32, ink: "accent2", anchor: "middle", gap: 400 },
          { do: "write", id: "s-after", text: "after the meeting", x: 740, y: 330, size: 32, ink: "trouble", anchor: "middle", gap: 400 },
          { do: "write", id: "s3", text: "before leaving · after signing", x: 480, y: 450, size: 32, ink: "muted", anchor: "middle", gap: 500 },
        ],
      },
      {
        id: "formal",
        title: "Formal equivalents",
        alt: "Two columns. Before: prior to. After: subsequent to, following. Example: Prior to the elections, the cabinet resigned. Following the verdict, protests broke out.",
        say: [
          { text: "Formal and official writing often uses **prior to** for before, and **subsequent to** or **following** for after.", cue: "f1" },
          { text: "_Prior to the elections, the cabinet resigned. Following the verdict, protests broke out._ Don't overuse them; plain _before_ and _after_ are often clearer.", cue: "f3" },
        ],
        actions: [K.clear("clear-1"), ...K.lines("f", [["before → prior to", { hl: "prior to" }], ["after → subsequent to · following", { hl: "following" }], ["Prior to the elections, the cabinet resigned.", { size: 32, ink: "muted" }]], { y: 160, gap: 110, size: 38 })],
      },
      {
        id: "errors",
        title: "Errors to avoid",
        alt: "Crossed out: prior than the meeting; after to sign. Correct: prior to the meeting; after signing.",
        say: [
          { text: "_Prior_ and _subsequent_ always take **to**: never _prior than_ or _subsequent of._", cue: "e1" },
          { text: "And like every preposition, before and after take -ing, never a to-infinitive: _after signing_, not _after to sign._", cue: "e2" },
        ],
        actions: [K.clear("clear-2"), ...K.lines("e", [["✗ prior than → ✓ prior to", { ink: "trouble" }], ["✗ after to sign → ✓ after signing", { ink: "trouble" }]], { y: 200, gap: 130, size: 38 })],
      },
      {
        id: "check",
        title: "Check: exam style",
        alt: "The errors remain on the board.",
        say: [{ text: "An original practice question in CSS style." }],
        actions: [],
        check: {
          id: "before-q1",
          source: "original",
          skill: "prior to",
          prompt: "All members received the agenda ___ the meeting.",
          options: [
            { text: "prior to", correct: true, why: "Correct. _Prior to_ is the formal equivalent of _before._" },
            { text: "prior than", misconception: "prior-to", why: "_Prior_ always takes to: _prior to the meeting._" },
            { text: "previous than", misconception: "prior-to", why: "_Previous than_ is not English. Use _prior to_ or _before._" },
          ],
        },
      },
    ],
  });
})();
