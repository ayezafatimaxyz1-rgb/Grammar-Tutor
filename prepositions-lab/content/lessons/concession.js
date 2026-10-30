/* Lesson 1.57: concession and contrast: regardless of, irrespective of, in contrast to, as opposed to. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "concession",
    title: "Regardless of, in contrast to",
    phase: 1,
    unit: "p1-complex",
    level: "Advanced",
    minutes: 7,
    summary:
      "Regardless of and irrespective of mean without being affected by. In contrast to/with and as opposed to set two things against each other. Irregardless is non-standard. Despite and notwithstanding have their own lessons.",
    objectives: [
      "Use regardless of and irrespective of, and avoid irregardless.",
      "Use in contrast to (or with) and as opposed to for contrasts.",
    ],
    steps: [
      {
        id: "forms",
        title: "Unaffected, and contrasted",
        alt: "Rows: open to all, regardless of income; irrespective of caste or creed; in contrast to the cities, villages lack clinics; urban as opposed to rural areas. Crossed out: irregardless.",
        say: [
          { text: "**Regardless of** and **irrespective of** = without being affected by: very different people all pass through the same gate. _open to all, regardless of income; equal rights irrespective of caste or creed._", cue: "f1" },
          { text: "**In contrast to** (or _with_) sets two different things side by side: _In contrast to the cities, villages lack clinics._", cue: "f3" },
          { text: "**As opposed to** points the two in opposite directions: _urban, as opposed to rural, areas._ And never write _irregardless._", cue: "f4" },
        ],
        actions: PLAB.kit.rows("f", [
          ["allThrough", "open to all, regardless of income", { hl: "regardless of" }],
          ["allThrough", "irrespective of caste or creed", { hl: "irrespective of" }],
          ["different", "In contrast to the cities, villages ...", { hl: "In contrast to", size: 30 }],
          ["opposite", "urban as opposed to rural · ✗ irregardless", { hl: "as opposed to", size: 30 }],
        ], { y: 90, gap: 118 }),
      },
      {
        id: "check",
        title: "Check: a standard form",
        alt: "The rows remain on the board.",
        say: [{ text: "Which is standard in formal writing?" }],
        actions: [],
        check: {
          id: "concession-q1",
          source: "original",
          skill: "irrespective of",
          prompt: "The law applies to every citizen ___ religion or gender.",
          options: [
            { text: "irrespective of", correct: true, why: "Correct. _Irrespective of_ (or _regardless of_) = without being affected by." },
            { text: "irregardless of", misconception: "concession-phrases", why: "_Irregardless_ is non-standard. Use _irrespective of_ or _regardless of._" },
            { text: "in contrast to", misconception: "concession-phrases", why: "In contrast to compares two things. Here the law applies whatever the religion: irrespective of." },
          ],
        },
      },
    ],
  });
})();
