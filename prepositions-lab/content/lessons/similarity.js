/* Lesson 2.15: similarity and difference: similar to, identical to/with, different from/to/than. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "similarity",
    title: "Similar to, different from",
    phase: 2,
    unit: "p2-adjective",
    level: "Intermediate",
    minutes: 8,
    summary:
      "Likeness moves towards: similar to, equal to, identical to (or with), superior to, inferior to, senior to, junior to. Difference moves away: different from is accepted everywhere; different to is British, different than is American. In an exam, write different from.",
    objectives: [
      "Use similar to, identical to or with, and superior to / inferior to (never superior than).",
      "Prefer different from in formal writing, and know that different to (BrE) and different than (AmE) also occur.",
    ],
    steps: [
      {
        id: "towards",
        title: "Likeness: TO",
        alt: "Two people side by side with a wavy similarity sign, and two identical squares joined by an equals sign. Sentences: Your answer is similar to mine. This copy is identical to (or with) the original.",
        say: [
          { text: "When we say two things are alike, we bring one up close to the other and hold them together. **To** points from one to the other: _Your answer is similar to mine._", cue: "a1" },
          { text: "_identical to_ (also _identical with_), _equal to, equivalent to._ _This copy is identical to the original._", cue: "a2" },
        ],
        actions: K.panels("a", [
          ["likeSim", "similar to mine", "close, alike", { hl: "to" }],
          ["identical", "identical to the original", "also: identical with", { hl: "to" }],
        ], { y: 60 }),
      },
      {
        id: "superior",
        title: "Superior to, not superior than",
        alt: "Two bars of different heights. Rows: superior to, inferior to, senior to, junior to, prior to, preferable to. Crossed out: superior than, senior than.",
        say: [
          { text: "Some Latin comparatives look like _better than_ but take **to**: _superior to, inferior to, senior to, junior to, prior to, preferable to._", cue: "r1" },
          { text: "So never _superior than_ or _senior than._ _This plan is preferable to that one._", cue: "r2" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.rows("r", [
            ["taller", "superior to · inferior to · senior to · junior to", { hl: "superior to", size: 30 }],
            ["compareBars", "This plan is preferable to that one.", { hl: "preferable to" }],
            ["cross", "✗ superior than · ✗ senior than · ✗ prefer than", { ink: "trouble" }],
          ], { y: 110, gap: 140 }),
        ],
      },
      {
        id: "different",
        title: "Different from, to, than",
        alt: "A circle and a square with a not-equal sign, labelled different from (everywhere). Notes: different to (British), different than (American, and before a clause).",
        say: [
          { text: "Difference moves the two things apart, so the standard form is **different from**: _City life is different from village life._", cue: "s1" },
          { text: "_Different to_ is common in British speech, and _different than_ in American English, especially before a clause. Both are disputed in formal writing, so write **different from** in an exam.", cue: "s2" },
        ],
        actions: [
          K.clear("clear-2"),
          ...K.pic("pic", "different", 340, 20, 2),
          { do: "write", id: "s1", text: "City life is different from village life.", x: 480, y: 300, size: 38, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s1-h", target: "s1", word: "different from" },
          { do: "write", id: "s2", text: "different to (BrE) · different than (AmE) · exam: different from", x: 480, y: 390, size: 28, ink: "muted", anchor: "middle", gap: 400 },
        ],
      },
      {
        id: "check",
        title: "Check: sentence correction",
        alt: "The board remains.",
        say: [{ text: "An original practice question." }],
        actions: [],
        check: {
          id: "similarity-q1",
          source: "original",
          skill: "superior to",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "In rank, a secretary is senior to an additional secretary.", correct: true, why: "Correct. _Senior, junior, superior, inferior_ take _to._" },
            { text: "In rank, a secretary is senior than an additional secretary.", misconception: "comparison-to", why: "_Senior_ is a Latin comparative that takes _to_, never _than._" },
            { text: "In rank, a secretary is senior from an additional secretary.", misconception: "comparison-to", why: "_Senior from_ is not used. Use _senior to._" },
          ],
        },
      },
      {
        id: "check-2",
        title: "Check: formal writing",
        alt: "The board remains.",
        say: [{ text: "One more." }],
        actions: [],
        check: {
          id: "similarity-q2",
          source: "original",
          skill: "different from",
          prompt: "Which form is safest in a formal CSS essay?",
          options: [
            { text: "The problems of rural areas are different from those of cities.", correct: true, why: "Correct. _Different from_ is accepted in every variety of English." },
            { text: "The problems of rural areas are different than those of cities.", misconception: "comparison-to", why: "_Different than_ is American and disputed in formal British usage. Write _different from._" },
            { text: "The problems of rural areas are different with those of cities.", misconception: "comparison-to", why: "_Different with_ is not used." },
          ],
        },
      },
    ],
  });
})();
