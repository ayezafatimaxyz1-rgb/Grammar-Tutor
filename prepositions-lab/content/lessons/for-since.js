/* Lesson 1.29: FOR vs SINCE. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "for-since",
    title: "FOR vs SINCE",
    phase: 1,
    unit: "p1-time",
    level: "Beginner to intermediate",
    minutes: 9,
    summary:
      "For + a length of time; since + the starting point. Both often go with the present perfect for something that continues up to now. The very common South Asian error since ten years.",
    objectives: [
      "Use for with a length of time and since with a starting point.",
      "Use the present perfect with since and with for when the situation continues to now.",
      "Correct since ten years to for ten years.",
    ],
    steps: [
      {
        id: "line",
        title: "A length, or a starting point",
        alt: "A time line ending at now. A dot at 2015 with an arrow running to now, labelled since 2015. A bracket over the same stretch labelled for ten years.",
        say: [
          { text: "Here is a time line up to now. You moved to Lahore at this point, and you still live there.", cue: "start" },
          { text: "**Since** names the **starting point**: _I have lived here since 2015._", cue: "s-since" },
          { text: "**For** names the **length** of the stretch: _I have lived here for ten years._ Same picture, two ways to measure it.", cue: "s-for" },
        ],
        actions: [
          ...K.timeline("tl", { y: 230 }),
          { do: "draw", id: "start", shape: "circle", cx: 240, cy: 230, r: 12, ink: "trouble", fill: "solid", dur: 400, gap: 400 },
          { do: "write", id: "start-l", text: "2015", x: 240, y: 280, size: 28, ink: "trouble", anchor: "middle" },
          { do: "draw", id: "run", shape: "arrow", from: [255, 230], to: [768, 230], ink: "trouble", width: 4, dur: 900 },
          { do: "write", id: "s-since", text: "since 2015", x: 240, y: 340, size: 36, ink: "trouble", anchor: "middle" },
          { do: "draw", id: "span", shape: "group", ink: "accent2", dur: 900, gap: 500, parts: [{ shape: "line", from: [240, 170], to: [780, 170], wobble: 0.8 }, { shape: "line", from: [240, 155], to: [240, 185], wobble: 0.3 }, { shape: "line", from: [780, 155], to: [780, 185], wobble: 0.3 }] },
          { do: "write", id: "s-for", text: "for ten years", x: 510, y: 150, size: 34, ink: "accent2", anchor: "middle" },
          { do: "write", id: "s1", text: "I have lived here since 2015 / for ten years.", x: 480, y: 470, size: 34, anchor: "middle", gap: 500, dur: 2300 },
        ],
      },
      {
        id: "lists",
        title: "What goes with each",
        alt: "Three pictures: a bracket of time (for ten years), an arrow from a starting point to now (since 2015), a time line (for with any tense, since with the present perfect).",
        say: [
          { text: "**For** measures the length of the stretch, the bracket: _for ten years, for three days, for a long time._", cue: "c1" },
          { text: "**Since** names the point where it started, and the arrow runs from there to now: _since 2015, since Monday, since I was a child._", cue: "c2" },
          { text: "For can go with any tense (_I lived there for two years, then left_). Since, meaning from that point, normally takes the present perfect.", cue: "c3" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.grid("c", [
            ["span", "for ten years \u00b7 for ages", "the length of the stretch", { hl: "for" }],
            ["sincePoint", "since 2015 \u00b7 since Monday", "the point where it started", { hl: "since" }],
            ["now", "for: any tense", "since: usually present perfect", { ink: "accent2" }],
          ]),
        ],
      },
      {
        id: "error",
        title: "Since ten years",
        alt: "Crossed out: I am living here since ten years. Correct: I have lived here for ten years.",
        say: [
          { text: "_I am living here since ten years_ mixes two pictures. _Ten years_ is a length (a bracket), but _since_ needs a starting point (a dot).", cue: "e1" },
          { text: "Fix both errors: use **for** with a length, and the **present perfect** for a situation that runs up to now: _I have lived here for ten years._", cue: "e2" },
        ],
        actions: [
          PLAB.kit.clear("clear-2"),
          ...PLAB.kit.panels("e", [
            [[["span", 0, 0], ["cross", 0, 0]], "✗ I am living here since ten years.", "since needs a point", { ink: "trouble", size: 24 }],
            ["span", "✓ I have lived here for ten years.", "a length takes for", { hl: "for", size: 24 }],
          ]),
        ],
      },
      {
        id: "why-not",
        title: "Why not the other one?",
        alt: "Left: a bracket of time, labelled for ten years (a length). Right: a dot on a time line, labelled since ten years, which needs a starting point.",
        say: [
          { text: "_I have lived here for ten years_: **for** gives the length.", cue: "wn1" },
          { text: "**Since** needs a starting point on the time line: _since 2015, since Monday._ Ten years is a length, not a point.", cue: "wn2" },
          { text: "Ask: how long (for), or from when (since)?", cue: "wn-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.swap("wn", ["span", "for ten years", "a length", { hl: "for" }], ["sincePoint", "\u2717 since ten years", "since needs a starting point", { ink: "trouble" }], ["for + a length: for ten years", "since + a starting point: since 2015"]),
        ],
      },
      {
        id: "check1",
        title: "Check: length or point?",
        alt: "The correction remains on the board.",
        say: [{ text: "Is it a length of time, or a starting point?" }],
        actions: [],
        check: {
          id: "forsince-q1",
          source: "original",
          skill: "for vs since",
          prompt: "The bridge has been closed ___ the floods of 2022.",
          options: [
            { text: "since", correct: true, why: "Correct. _The floods of 2022_ is the starting point of a situation that continues now." },
            { text: "for", misconception: "for-vs-since", why: "For needs a length (_for two years_). _The floods of 2022_ is a point in time, so since." },
            { text: "from", misconception: "for-vs-since", why: "_From_ needs an end too (_from 2022 to 2024_), or a different tense. With the present perfect and a starting point, use since." },
          ],
        },
      },
      {
        id: "check2",
        title: "Check: sentence correction",
        alt: "The correction remains on the board.",
        say: [{ text: "An original practice item in CSS sentence-correction style." }],
        actions: [],
        check: {
          id: "forsince-q2",
          source: "original",
          skill: "for + length with present perfect",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "He has been working in the ministry for six years.", correct: true, why: "Correct. A length takes for, and the present perfect continuous shows it continues now." },
            { text: "He is working in the ministry since six years.", misconception: "for-vs-since", why: "Two errors: six years is a length (for), and a situation up to now needs the present perfect." },
            { text: "He has been working in the ministry since six years.", misconception: "for-vs-since", why: "The tense is right, but six years is a length: _for six years._" },
          ],
        },
      },
    ],
  });
})();
