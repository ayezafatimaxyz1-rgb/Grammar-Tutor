/* Lesson 1.25: PAST, BY, VIA. */
PLAB.registerLesson({
  id: "past-by-via",
  title: "PAST, BY, VIA",
  phase: 1,
  unit: "p1-movement",
  level: "Intermediate",
  minutes: 8,
  summary:
    "Past means moving beside something and beyond it; by can mean the same when passing. Via means by way of a place or a channel. Past is also used for time (half past six) and passed is the verb, a common spelling trap.",
  objectives: [
    "Use past (and by) for going beside something and continuing beyond it.",
    "Use via for a route through a place, or a channel such as email.",
    "Tell the preposition past from the verb passed, and use past for clock times.",
  ],
  steps: [
    {
      id: "past",
      title: "Past: beside and beyond",
      alt: "A bank building beside a road. An arrow goes along the road, beside the bank and on beyond it. Sentence: She walked past the bank.",
      say: [
        { text: "Here is a bank beside a road.", cue: "bank" },
        { text: "Someone walks along the road, comes level with the bank and continues beyond it without stopping: **past**. _She walked past the bank._", cue: "s-past" },
        { text: "**By** can say the same when passing: _She drove by the school every day._", cue: "s-by" },
      ],
      actions: [
        { do: "draw", id: "bank", shape: "rect", x: 400, y: 100, w: 160, h: 110, ink: "accent2", dur: 900 },
        { do: "write", id: "bank-l", text: "BANK", x: 480, y: 165, size: 26, ink: "accent2", anchor: "middle", style: "caps" },
        { do: "draw", id: "road", shape: "line", from: [80, 290], to: [880, 290], ink: "muted", width: 2.4, dur: 700 },
        { do: "draw", id: "walk", shape: "arrow", from: [120, 255], to: [840, 255], ink: "accent", width: 4, dur: 1400, gap: 300 },
        { do: "write", id: "s-past", text: "She walked past the bank.", x: 480, y: 400, size: 42, anchor: "middle", gap: 400, dur: 1700 },
        { do: "highlight", id: "h-past", target: "s-past", word: "past" },
        { do: "write", id: "s-by", text: "also: She drove by the school.", x: 480, y: 480, size: 32, ink: "muted", anchor: "middle", gap: 500 },
      ],
    },
    {
      id: "passed",
      title: "Past or passed?",
      alt: "Two sentences. She walked past the bank: past is a preposition. She passed the bank: passed is a verb. Also half past six.",
      say: [
          { text: "**Past** is the preposition: the arrow goes beside the bank and on beyond it. _She walked past the bank_: _walked_ is the verb.", cue: "p1" },
          { text: "**Passed** is the past tense of the verb _pass_: _She passed the bank._ If the sentence already has a verb, you need _past._", cue: "p2" },
          { text: "On a clock, the minute hand has gone past the hour: _half past six, ten past nine._", cue: "p3" },
        ],
      actions: [
          PLAB.kit.clear("clear-past"),
          ...PLAB.kit.panels("p", [
            ["pastBank", "walked past the bank", "past = preposition", { hl: "past" }],
            ["pastBank", "She passed the bank.", "passed = verb", { hl: "passed" }],
            ["halfPast", "half past six", "the hand has gone past", { hl: "past" }],
          ]),
        ],
    },
    {
      id: "check-passed",
      title: "Check: spelling",
      alt: "The past and passed sentences remain on the board.",
      say: [{ text: "Find the verb first." }],
      actions: [],
      check: {
        id: "past-q1",
        source: "original",
        skill: "past vs passed",
        prompt: "Which sentence is correct?",
        options: [
          { text: "The procession moved slowly past the Assembly building.", correct: true, why: "Correct. _Moved_ is the verb, so the preposition _past_ follows." },
          { text: "The procession moved slowly passed the Assembly building.", misconception: "past-passed", why: "_Passed_ is a verb. The sentence already has a verb (_moved_), so it needs the preposition _past._" },
          { text: "The procession past the Assembly building slowly.", misconception: "past-passed", why: "Here a verb is needed: _The procession passed the Assembly building slowly._" },
        ],
      },
    },
    {
      id: "via",
      title: "Via: by way of",
      alt: "Three dots: Lahore, Doha and Toronto, with an arrow from Lahore bending through Doha to Toronto. Sentence: We flew to Toronto via Doha. Below: via email.",
      say: [
        { text: "**Via** (from Latin, _by way of_) names a place you pass through on the route: _We flew to Toronto via Doha._", cue: "route" },
        { text: "It also names a channel: _The documents were sent via email._ In formal writing, _by email_ or _through the embassy_ are also good choices.", cue: "s2" },
      ],
      actions: [
        { do: "erase", id: "clear-passed", targets: "all" },
        { do: "draw", id: "l", shape: "circle", cx: 140, cy: 260, r: 13, ink: "accent", fill: "solid", dur: 400, gap: 400 },
        { do: "write", id: "l-l", text: "Lahore", x: 140, y: 310, size: 28, anchor: "middle" },
        { do: "draw", id: "d", shape: "circle", cx: 480, cy: 140, r: 13, ink: "accent2", fill: "solid", dur: 400 },
        { do: "write", id: "d-l", text: "Doha", x: 480, y: 110, size: 28, ink: "accent2", anchor: "middle" },
        { do: "draw", id: "t", shape: "circle", cx: 820, cy: 260, r: 13, ink: "trouble", fill: "solid", dur: 400 },
        { do: "write", id: "t-l", text: "Toronto", x: 820, y: 310, size: 28, anchor: "middle" },
        { do: "draw", id: "route", shape: "group", ink: "accent", dur: 1300, parts: [{ shape: "line", from: [155, 250], to: [465, 150] }, { shape: "arrow", from: [495, 150], to: [805, 250] }] },
        { do: "write", id: "s1", text: "We flew to Toronto via Doha.", x: 480, y: 420, size: 40, anchor: "middle", gap: 400, dur: 1800 },
        { do: "highlight", id: "s1-h", target: "s1", word: "via" },
        { do: "write", id: "s2", text: "sent via email", x: 480, y: 500, size: 32, ink: "muted", anchor: "middle", gap: 500 },
      ],
    },
    {
      id: "check-via",
      title: "Check: a route",
      alt: "The Lahore, Doha and Toronto route remains on the board.",
      say: [{ text: "Which word names a stop on the way?" }],
      actions: [],
      check: {
        id: "past-q2",
        source: "original",
        skill: "via for a route",
        prompt: "The pilgrims travelled to Madinah ___ Jeddah.",
        options: [
          { text: "via", correct: true, why: "Correct. Jeddah is a place on the route, passed through on the way: _via Jeddah._" },
          { text: "past", misconception: "past-passed", why: "Past means going beside and beyond without stopping there. _Via_ names a place on the route." },
          { text: "across", misconception: "through-across-along", why: "Across is side to side over a surface. A stop on a route takes via." },
        ],
      },
    },
    {
      id: "why-not",
      title: "Why this one and not the others?",
      alt: "The sentence She walked with a gap the bank., then the candidates with pictures: past (right: beside it and beyond it); passed (wrong: a verb; walked is already the verb); through (wrong: into it and out again). Rule: walked past (preposition); passed it (verb).",
      say: [
        { text: "Fill the gap: She walked \u2026 the bank. The answer is **past**: beside it and beyond it.", cue: "why1" },
        { text: "Why not the others? **passed**: a verb; walked is already the verb. **through**: into it and out again.", cue: "why2" },
        { text: "The rule: walked past (preposition); passed it (verb).", cue: "why-r1" },
      ],
      actions: [
        PLAB.kit.clear("clear-why"),
        ...PLAB.kit.lineup("why", "She walked ____ the bank.", [["pastBank", "past", true, "beside it and | beyond it"], ["pastBank", "passed", false, "a verb; walked is | already the verb"], ["passThrough", "through", false, "into it and | out again"]], ["walked past (preposition)", "passed it (verb)"]),
      ],
    },
    {
      id: "summary",
      title: "The summary",
      alt: "Past: beside and beyond (walked past the bank), half past six; passed is the verb. By: passing (drove by). Via: by way of a place or channel.",
      say: [{ text: "**Past**: beside and beyond, and clock times. **Passed** is the verb. **Via**: by way of a place or a channel.", cue: "c3" }],
      actions: [
        { do: "erase", id: "clear-via", targets: "all" },
        { do: "write", id: "c1", text: "past: beside and beyond · half past six", x: 480, y: 150, size: 34, anchor: "middle", gap: 400 },
        { do: "write", id: "c2", text: "passed = the verb", x: 480, y: 240, size: 34, ink: "trouble", anchor: "middle" },
        { do: "write", id: "c3", text: "via Doha · via email", x: 480, y: 330, size: 34, anchor: "middle" },
      ],
    },
  ],
});
