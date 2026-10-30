/* Lesson 1.28: THROUGHOUT: every part, the whole time. */
PLAB.registerLesson({
  id: "throughout",
  title: "THROUGHOUT",
  phase: 1,
  unit: "p1-movement",
  level: "Intermediate",
  minutes: 6,
  summary:
    "Throughout means in every part of a place or during the whole of a period. How it differs from through (passing through), and two errors: throughout of and throughout the whole.",
  objectives: [
    "Use throughout for every part of a place and the whole of a period.",
    "Tell throughout from through.",
    "Avoid throughout of and the redundant throughout the whole.",
  ],
  steps: [
    {
      id: "every",
      title: "Every part, the whole time",
      alt: "An outline of Sindh with marks spread over all of it. Sentence: Floods caused damage throughout Sindh. Below: a time bar fully shaded: throughout the year.",
      say: [
        { text: "Here is a province, with damage marked in every part of it.", cue: "marks" },
        { text: "**Throughout** = in every part of: _Floods caused damage throughout Sindh._", cue: "s1" },
        { text: "With time it means during the whole period: _It rained throughout the night. Throughout his life, he served the poor._", cue: "s2" },
      ],
      actions: [
        { do: "draw", id: "area", shape: "blob", points: [[260, 70], [480, 60], [600, 140], [560, 280], [420, 330], [260, 300], [200, 180]], ink: "accent2", dur: 1100 },
        { do: "draw", id: "marks", shape: "group", ink: "trouble", width: 3, dur: 1000, parts: [[300, 120], [420, 110], [520, 170], [280, 220], [400, 200], [500, 250], [350, 280]].map(([x, y]) => ({ shape: "line", from: [x - 9, y - 9], to: [x + 9, y + 9], wobble: 0.3 })) },
        { do: "write", id: "s1", text: "damage throughout Sindh", x: 480, y: 410, size: 40, anchor: "middle", gap: 400, dur: 1600 },
        { do: "highlight", id: "s1-h", target: "s1", word: "throughout" },
        { do: "write", id: "s2", text: "throughout the night · throughout his life", x: 480, y: 500, size: 32, ink: "muted", anchor: "middle", gap: 500, dur: 2000 },
      ],
    },
    {
      id: "through-vs",
      title: "Through or throughout?",
      alt: "Three lines: travelled through Sindh means passing; throughout Sindh means everywhere in it; crossed out, throughout of and throughout the whole.",
      say: [
        { text: "**Through** = passing in one side and out the other: _We travelled through Sindh on our way to Karachi._", cue: "t1" },
        { text: "**Throughout** = everywhere in it, or all the time: _The festival is celebrated throughout Sindh._", cue: "t2" },
        { text: "Two errors to avoid: _throughout of the country_ (no _of_), and _throughout the whole year_ (_throughout_ already means the whole).", cue: "t3" },
      ],
      actions: [
        { do: "erase", id: "clear-every", targets: "all" },
        { do: "write", id: "t1", text: "travelled through Sindh = passing", x: 480, y: 150, size: 36, anchor: "middle", gap: 400, dur: 1900 },
        { do: "write", id: "t2", text: "throughout Sindh = everywhere in it", x: 480, y: 250, size: 36, anchor: "middle", gap: 400, dur: 1900 },
        { do: "write", id: "t3", text: "✗ throughout of · ✗ throughout the whole", x: 480, y: 380, size: 34, ink: "trouble", anchor: "middle", gap: 500, dur: 2000 },
      ],
    },
    {
      id: "check",
      title: "Check: sentence correction",
      alt: "The through and throughout lines remain on the board.",
      say: [{ text: "An original practice item in CSS sentence-correction style." }],
      actions: [],
      check: {
        id: "throughout-q1",
        source: "original",
        skill: "throughout without of or whole",
        prompt: "Choose the correct sentence.",
        options: [
          { text: "The campaign was run throughout the country.", correct: true, why: "Correct. _Throughout_ takes its object directly and already means every part." },
          { text: "The campaign was run throughout of the country.", misconception: "throughout-errors", why: "_Throughout_ is not followed by _of._" },
          { text: "The campaign was run throughout the whole country.", misconception: "throughout-errors", why: "_Throughout_ already means in the whole of it, so _whole_ is redundant. Many editors would cut it." },
        ],
      },
    },
  ],
});
