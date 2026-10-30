/* Lesson 1.21: TO and TOWARD(S). */
PLAB.registerLesson({
  id: "to-towards",
  title: "TO and TOWARDS",
  phase: 1,
  unit: "p1-movement",
  level: "Beginner to intermediate",
  minutes: 10,
  summary:
    "To marks a destination that is reached; towards marks only a direction. Then to for receivers, ranges and comparisons, towards for attitudes and approximate times, and the classic errors reach to, go to home and return back.",
  objectives: [
    "Use to for a destination reached and towards for a direction.",
    "Use to for receivers (give it to), ranges (from 9 to 5) and comparisons (prefer tea to coffee).",
    "Avoid reach to, go to home and return back, and use towards for attitudes.",
  ],
  steps: [
    {
      id: "dest",
      title: "To: arriving at a destination",
      alt: "Two dots, Islamabad and Lahore, with an arrow from one that ends exactly at the other. Sentence: We drove to Lahore.",
      say: [
        { text: "Here are two cities. A car leaves Islamabad.", cue: "start" },
        { text: "The arrow ends exactly at Lahore. **To** marks the **destination**, the end point that is reached: _We drove to Lahore._", cue: "s-to" },
      ],
      actions: [
        { do: "draw", id: "start", shape: "circle", cx: 160, cy: 220, r: 14, ink: "accent", fill: "solid", dur: 400 },
        { do: "write", id: "start-l", text: "Islamabad", x: 160, y: 275, size: 28, anchor: "middle" },
        { do: "draw", id: "end", shape: "circle", cx: 800, cy: 220, r: 14, ink: "trouble", fill: "solid", dur: 400 },
        { do: "write", id: "end-l", text: "Lahore", x: 800, y: 275, size: 28, anchor: "middle" },
        { do: "draw", id: "path", shape: "arrow", from: [180, 215], to: [782, 215], bow: -40, ink: "accent2", dur: 1400, gap: 400 },
        { do: "write", id: "s-to", text: "We drove to Lahore.", x: 480, y: 420, size: 44, anchor: "middle", gap: 400, dur: 1500 },
        { do: "highlight", id: "h-to", target: "s-to", word: "to" },
      ],
    },
    {
      id: "towards",
      title: "Towards: only a direction",
      alt: "A person walking with an arrow pointing at a gate, stopping well short of it. Sentence: She walked towards the gate. Note: toward in American English.",
      say: [
        { text: "Now a person walking in the direction of a gate. The arrow points at it but stops before it.", cue: "walk" },
        { text: "**Towards** gives the direction of movement, not the arrival: _She walked towards the gate._ We do not know if she reached it.", cue: "s-tw" },
        { text: "British English prefers _towards_; American English prefers _toward._ Both are correct.", cue: "note" },
      ],
      actions: [
        { do: "erase", id: "clear-dest", targets: "all" },
        { do: "draw", id: "gate", shape: "group", ink: "accent2", dur: 900, gap: 400, parts: [{ shape: "line", from: [760, 340], to: [760, 160] }, { shape: "line", from: [860, 340], to: [860, 160] }, { shape: "line", from: [760, 180], to: [860, 180] }] },
        { do: "draw", id: "her", shape: "person", x: 180, y: 220, scale: 1, ink: "accent", dur: 800 },
        { do: "draw", id: "walk", shape: "arrow", from: [230, 280], to: [560, 280], ink: "accent", dur: 1000 },
        { do: "write", id: "s-tw", text: "She walked towards the gate.", x: 480, y: 440, size: 42, anchor: "middle", gap: 400, dur: 1800 },
        { do: "highlight", id: "h-tw", target: "s-tw", word: "towards" },
        { do: "write", id: "note", text: "AmE: toward", x: 480, y: 520, size: 30, ink: "muted", anchor: "middle", gap: 400 },
      ],
    },
    {
      id: "more-to",
      title: "More uses of to",
      alt: "Three rows. Receiver: give it to Ali. Range: from 9 to 5. Comparison: prefer tea to coffee, superior to.",
      say: [
          { text: "The destination picture of _to_ extends. A **receiver** is where something ends up: the file travels from one person to the other. _Give the file to Ali._", cue: "r1" },
          { text: "A **range** has an end point: _from 9 to 5._", cue: "r2" },
          { text: "In some **comparisons**, to marks what the first thing is set against: the scale tips towards tea. _I prefer tea to coffee. This plan is superior to that one._ Never _superior than._", cue: "r3" },
        ],
      actions: [
          PLAB.kit.clear("clear-towards"),
          ...PLAB.kit.panels("r", [
            ["giveTo", "give the file to Ali", "a receiver", { hl: "to" }],
            ["betweenTicks", "from 9 to 5", "a range with an end", { hl: "to" }],
            ["preferTea", "prefer tea to coffee", "superior to (not than)", { hl: "to" }],
          ]),
        ],
    },
    {
      id: "errors",
      title: "Classic errors",
      alt: "Three crossed-out errors with corrections: reach to Lahore, reach Lahore; go to home, go home; return back, return.",
      say: [
          { text: "**Reach** already means arrive, so the arrow ends at the city with nothing in between: _We reached Lahore_, not _reached to Lahore._", cue: "e1" },
          { text: "**Home** after movement verbs needs no to: _go home, come home._ (But _at home_ for position.)", cue: "e2" },
          { text: "**Return** already means go back: the arrow goes out and comes back by itself. _Return back_ is redundant.", cue: "e3" },
        ],
      actions: [
          PLAB.kit.clear("clear-more"),
          ...PLAB.kit.panels("e", [
            ["reachDot", "reached Lahore", "✗ reached to Lahore", { hl: "reached" }],
            ["goHome", "went home", "✗ went to home", { hl: "home" }],
            ["returnArc", "returned", "✗ returned back", { hl: "returned" }],
          ]),
        ],
    },
    {
      id: "check-reach",
      title: "Check: sentence correction",
      alt: "The three errors and corrections remain on the board.",
      say: [{ text: "An original practice item in CSS sentence-correction style." }],
      actions: [],
      check: {
        id: "to-q1",
        source: "original",
        skill: "reach takes no preposition",
        prompt: "Choose the correct sentence.",
        options: [
          { text: "The delegation reached Islamabad late at night.", correct: true, why: "Correct. Reach takes a direct object with no preposition." },
          { text: "The delegation reached to Islamabad late at night.", misconception: "no-prep-verbs", why: "Reach already means arrive at, so _to_ is not used." },
          { text: "The delegation reached at Islamabad late at night.", misconception: "no-prep-verbs", why: "_Arrive at_ takes at, but _reach_ takes no preposition: _reached Islamabad._" },
        ],
      },
    },
    {
      id: "abstract-towards",
      title: "Towards in abstract uses",
      alt: "Three pictures: a person with an arrow towards others (attitude towards others), a box partly filled from above (a grant towards the cost), a bar with a dot near its end (towards the end of the year).",
      say: [
          { text: "Towards points at someone or something without necessarily arriving. A feeling pointed at people: _his attitude towards his colleagues, sympathy towards the victims._", cue: "t1" },
          { text: "Help pointed at a cost fills part of it: _a grant towards the cost of books._", cue: "t2" },
          { text: "A time close to a point: _towards the end of the year._", cue: "t3" },
        ],
      actions: [
        PLAB.kit.clear("clear-errors"),
        ...PLAB.kit.grid("t", [
          ["attitude", "his attitude towards others", "a feeling pointed at them", { hl: "towards" }],
          ["grantPart", "a grant towards the cost", "pays part of it", { hl: "towards" }],
          ["nearEnd", "towards the end of the year", "close to the end", { hl: "towards" }],
        ]),
      ],
    },
    {
      id: "check-attitude",
      title: "Check: an attitude",
      alt: "The three towards phrases remain on the board.",
      say: [{ text: "Which word points a feeling at someone?" }],
      actions: [],
      check: {
        id: "to-q2",
        source: "original",
        skill: "towards for attitudes",
        prompt: "The officer's attitude ___ the public was courteous and helpful.",
        options: [
          { text: "towards", correct: true, why: "Correct. An attitude is directed at people: _attitude towards_ (also _to_)." },
          { text: "with", misconception: "towards-uses", why: "_Attitude with_ is not used. An attitude is pointed at someone: towards." },
          { text: "for", misconception: "towards-uses", why: "_Respect for_ is right, but _attitude_ takes towards or to." },
        ],
      },
    },
    {
      id: "why-not",
      title: "Why not the other one?",
      alt: "Left: an arrow ending at a dot, labelled We drove to Lahore (we got there). Right: an arrow pointing in a direction, labelled We drove towards Lahore (in its direction, maybe not arriving).",
      say: [
        { text: "_We drove to Lahore_: the journey ends there; we arrived.", cue: "wn1" },
        { text: "_We drove towards Lahore_ only gives the direction. We may have stopped on the way.", cue: "wn2" },
        { text: "Use **to** for the destination reached. Use **towards** for direction only.", cue: "wn-r1" },
      ],
      actions: [
        PLAB.kit.clear("clear-why"),
        ...PLAB.kit.swap("wn", ["goHome", "We drove to Lahore.", "we got there", { hl: "to" }], ["arrowR", "We drove towards Lahore.", "different: only the direction", { ink: "trouble" }], ["to = the destination", "towards = the direction"]),
      ],
    },
    {
      id: "summary",
      title: "The summary",
      alt: "To: destination reached; receiver; range; comparison. Towards: direction only; attitude; partial help; approximate time. Errors: reach Lahore, go home, return.",
      say: [{ text: "**To** = destination reached, receiver, range, comparison. **Towards** = direction, attitude, partial help, near a time. No preposition after reach; go home; return.", cue: "c3" }],
      actions: [
        { do: "erase", id: "clear-abstract", targets: "all" },
        { do: "write", id: "c1", text: "to: arrive · give to · from 9 to 5 · prefer to", x: 480, y: 150, size: 34, anchor: "middle", gap: 400 },
        { do: "write", id: "c2", text: "towards: direction · attitude · near a time", x: 480, y: 240, size: 34, anchor: "middle" },
        { do: "write", id: "c3", text: "reach Lahore · go home · return", x: 480, y: 340, size: 34, ink: "trouble", anchor: "middle" },
      ],
    },
  ],
});
