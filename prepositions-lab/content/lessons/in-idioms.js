/* Lesson 2.27: expressions with in: in charge, in time vs on time, in the end vs at the end. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "in-idioms",
    title: "In time, on time, in the end",
    phase: 2,
    unit: "p2-idiom",
    level: "Intermediate",
    minutes: 9,
    summary:
      "Pairs that look alike but mean different things: on time (exactly at the planned point) vs in time (early enough, inside the time available); in the end (finally, after a long process) vs at the end of (the last part of something). Also in charge of, and fixed phrases such as in fact, in advance, in vain, in person, in brief.",
    objectives: [
      "Choose on time or in time, and in the end or at the end of, from their pictures.",
      "Use in charge of and the fixed phrases in advance, in vain, in person, in brief and in fact.",
    ],
    steps: [
      {
        id: "on-in-time",
        title: "On time, in time",
        alt: "Left: a time line with a dot exactly on the deadline mark and a tick, labelled The train left on time (at the planned moment). Right: a dot before the deadline with a bracket of spare time, labelled We arrived in time for the speech (early enough).",
        say: [
          { text: "**On time** puts you exactly on the planned point, neither early nor late: _The train left on time._", cue: "t1" },
          { text: "**In time** means inside the time available, before it runs out, early enough: _We arrived in time for the speech._ Often with _just_: _just in time._", cue: "t2" },
        ],
        actions: K.panels("t", [
          ["onTimeDot", "The train left on time.", "exactly at the planned point", { hl: "on time" }],
          ["inTimeBefore", "We arrived in time for the speech.", "early enough, before the limit", { hl: "in time" }],
        ], { y: 60 }),
      },
      {
        id: "end",
        title: "In the end, at the end of",
        alt: "Left: a path that zigzags and finally reaches a star, labelled In the end, she passed (finally, after difficulty). Right: a path with a dot at its last point, labelled at the end of the lecture (the last part).",
        say: [
          { text: "**In the end** means finally, after a long or difficult process: _She failed twice, but in the end she passed._ It stands alone, with no _of_.", cue: "e1" },
          { text: "**At the end of** points at the last part of something, like the end point of a path: _at the end of the lecture, at the end of the year._", cue: "e2" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.panels("e", [
            ["finally", "In the end, she passed.", "finally, after difficulty", { hl: "In the end" }],
            ["endOfPath", "at the end of the lecture", "the last part of it", { hl: "at the end of" }],
          ], { y: 60 }),
        ],
      },
      {
        id: "fixed",
        title: "In charge of and other fixed phrases",
        alt: "Rows: She is in charge of the department (a leader above a group). Pay in advance (before). He tried in vain (without success). Meet in person (face to face). In brief (in short).",
        say: [
          { text: "**In charge of** is being responsible for people or a task: _She is in charge of the department._", cue: "f1" },
          { text: "_Pay in advance_ (before), _He tried in vain_ (without success), _meet in person_ (face to face), _in brief_ (in short), _in fact_ (actually).", cue: "f2" },
        ],
        actions: [
          K.clear("clear-2"),
          ...K.rows("f", [
            ["leaderGroup", "She is in charge of the department.", { hl: "in charge of" }],
            ["coin", "pay in advance · tried in vain", { hl: "in advance" }],
            ["people", "meet in person · in brief · in fact", { hl: "in person" }],
          ], { y: 110, gap: 140 }),
        ],
      },
      {
        id: "why-not",
        title: "Why not the other one?",
        alt: "Left: a dot before the deadline with spare time, labelled The ambulance came just in time to save him (early enough). Right: a dot exactly on a planned mark, labelled on time to save him, which needs a timetable that did not exist.",
        say: [
          { text: "_The ambulance came just in time to save him_: early enough, before it was too late.", cue: "timew1" },
          { text: "**On time** means exactly at a planned moment, like a train that keeps its timetable. Nobody had planned a time for this emergency, so on time does not fit.", cue: "timew2" },
          { text: "**On time** is right for schedules: _The meeting started on time._ Ask: was there a planned time (on time), or a danger of being too late (in time)?", cue: "timew-r1" },
        ],
        actions: [
          K.clear("clear-why"),
          ...K.swap("timew", ["inTimeBefore", "just in time to save him", "early enough", { hl: "in time" }], ["onTimeDot", "✗ just on time to save him", "on time needs a planned moment", { ink: "trouble" }], ["on time = at the planned moment", "in time = early enough, not too late"]),
        ],
      },
      {
        id: "check",
        title: "Check: on time or in time?",
        alt: "The board remains.",
        say: [{ text: "An original practice question." }],
        actions: [],
        check: {
          id: "in-idioms-q1",
          source: "original",
          skill: "in time / on time",
          prompt: "The ambulance reached the hospital just ___ to save the patient's life.",
          options: [
            { text: "in time", correct: true, why: "Correct. Early enough, before it was too late: _just in time._" },
            { text: "on time", misconception: "idiom-pairs", why: "_On time_ means at the scheduled moment. Here the point is being early enough, so _in time._" },
            { text: "at time", misconception: "idiom-pairs", why: "_At time_ is not an English phrase." },
          ],
        },
      },
      {
        id: "check-2",
        title: "Check: in the end or at the end?",
        alt: "The board remains.",
        say: [{ text: "One more." }],
        actions: [],
        check: {
          id: "in-idioms-q2",
          source: "original",
          skill: "in the end / at the end of",
          prompt: "Questions will be taken ___ the session.",
          options: [
            { text: "at the end of", correct: true, why: "Correct. The last part of the session: _at the end of._" },
            { text: "in the end of", misconception: "idiom-pairs", why: "_In the end_ means finally and stands alone. With _of_, use _at the end of._" },
            { text: "in the end", misconception: "idiom-pairs", why: "_In the end_ means finally, after a long process; it cannot take an object." },
          ],
        },
      },
    ],
  });
})();
