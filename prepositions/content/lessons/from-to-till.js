/* Lesson 1.33: FROM ... TO / UNTIL / THROUGH, and BETWEEN ... AND. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "from-to-till",
    title: "FROM ... TO, BETWEEN ... AND",
    phase: 1,
    unit: "p1-time",
    level: "Intermediate",
    minutes: 7,
    summary:
      "Two ways to frame a span of time: from ... to (or until, till, and American through) and between ... and. Never mix them: between 9 to 5 is wrong. Inclusive in British English, through in American English.",
    objectives: [
      "Frame a period with from ... to/until or between ... and.",
      "Avoid mixed frames like between 9 to 5 and from 9 and 5.",
      "Express inclusive ranges: Monday to Friday inclusive (BrE), Monday through Friday (AmE).",
    ],
    steps: [
      {
        id: "frames",
        title: "Two frames",
        alt: "A time bar from 9 to 5. Above: from 9 to 5, from 9 until 5. Below: between 9 and 5.",
        say: [
          { text: "Here is a working day, from 9 in the morning to 5 in the afternoon.", cue: "bar" },
          { text: "Frame it with **from ... to** (or _until, till_): _The office is open from 9 to 5._", cue: "f1" },
          { text: "Or with **between ... and**: _Call between 9 and 5._", cue: "f2" },
        ],
        actions: [
          { do: "draw", id: "bar", shape: "rect", x: 200, y: 200, w: 560, h: 60, ink: "accent2", fill: "soft", dur: 900 },
          { do: "write", id: "nine", text: "9", x: 200, y: 185, size: 32, anchor: "middle" },
          { do: "write", id: "five", text: "5", x: 760, y: 185, size: 32, anchor: "middle", sync: true, offset: 200 },
          { do: "write", id: "f1", text: "from 9 to 5 · from 9 until 5", x: 480, y: 350, size: 38, anchor: "middle", gap: 400 },
          { do: "write", id: "f2", text: "between 9 and 5", x: 480, y: 440, size: 38, anchor: "middle", gap: 500 },
        ],
      },
      {
        id: "mixed",
        title: "Do not mix the frames",
        alt: "Three pictures: two ends joined (between 9 and 5), a stretch with a start and an end (from 9 to 5), a row of five shaded days (Monday to Friday inclusive).",
        say: [
          { text: "Each frame has its own partner. **Between** marks two ends joined by **and**; **from** starts a stretch that runs **to** or **until** an end.", cue: "m1" },
          { text: "So _between 9 to 5_ and _from 9 and 5_ are both wrong.", cue: "m2" },
          { text: "To include the last day clearly: all five days are shaded. _Monday to Friday inclusive_ (British) or _Monday through Friday_ (American).", cue: "m3" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.grid("m", [
            ["betweenTicks", "between 9 and 5", "\u2717 between 9 to 5", { hl: "and" }],
            ["span", "from 9 to 5", "\u2717 from 9 and 5", { hl: "to" }],
            ["weekRow", "Monday to Friday inclusive", "AmE: Monday through Friday", { hl: "inclusive" }],
          ]),
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence The shop is open from 9 with a gap 5., then the candidates with pictures: to (right: from ... to); and (wrong: and belongs to between); at (wrong: at = one point, not an end). Rule: from 9 to 5 (or until 5); between 9 and 5.",
        say: [
          { text: "Fill the gap: The shop is open from 9 \u2026 5. What does the sentence want to say? The answer is **to**: from ... to.", cue: "why1" },
          { text: "Why not the others? **and**: and belongs to between. **at**: at = one point, not an end.", cue: "why2" },
          { text: "The rule: from 9 to 5 (or until 5); between 9 and 5.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "The shop is open from 9 ____ 5.", [["span", "to", true, "from ... to"], ["betweenTicks", "and", false, "and belongs to | between"], ["clock", "at", false, "at = one point, | not an end"]], ["from 9 to 5 (or until 5)", "between 9 and 5"]),
        ],
      },
      {
        id: "check",
        title: "Check: sentence correction",
        alt: "The mixed frames remain on the board.",
        say: [{ text: "An original practice item in CSS sentence-correction style." }],
        actions: [],
        check: {
          id: "fromto-q1",
          source: "original",
          skill: "between ... and",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "The polling stations will remain open between 8 a.m. and 5 p.m.", correct: true, why: "Correct. _Between_ pairs with _and._" },
            { text: "The polling stations will remain open between 8 a.m. to 5 p.m.", misconception: "frame-mix", why: "_Between_ needs _and_, not _to._ Or use _from 8 a.m. to 5 p.m._" },
            { text: "The polling stations will remain open from 8 a.m. and 5 p.m.", misconception: "frame-mix", why: "_From_ needs _to_ or _until._" },
          ],
        },
      },
    ],
  });
})();
