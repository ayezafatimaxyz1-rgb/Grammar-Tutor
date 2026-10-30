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
          { text: "**Regardless of** and **irrespective of** = without being affected by: _Admission is open to all, regardless of income. Equal rights irrespective of caste or creed._", cue: "f2" },
          { text: "**In contrast to** (or _with_) and **as opposed to** set two things against each other: _In contrast to the cities, villages lack clinics. Urban, as opposed to rural, areas._", cue: "f4" },
          { text: "_Irregardless_ is non-standard. Never use it in writing.", cue: "f5" },
        ],
        actions: K.lines("f", [["open to all, regardless of income", { hl: "regardless of" }], ["irrespective of caste or creed", { hl: "irrespective of" }], ["In contrast to the cities, villages lack clinics.", { hl: "In contrast to", size: 32 }], ["urban as opposed to rural areas", { hl: "as opposed to" }], ["✗ irregardless", { ink: "trouble" }]], { y: 110, gap: 90, size: 34 }),
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
