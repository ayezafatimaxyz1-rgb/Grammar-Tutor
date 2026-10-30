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
        alt: "Four pictures: different people passing one gate (regardless of income; irrespective of caste or creed), two different shapes side by side (in contrast to), arrows in opposite directions (as opposed to).",
        say: [
          { text: "**Regardless of** and **irrespective of** = without being affected by: very different people all pass through the same gate. _open to all, regardless of income; equal rights irrespective of caste or creed._", cue: "f1" },
          { text: "**In contrast to** (or _with_) sets two different things side by side: _In contrast to the cities, villages lack clinics._", cue: "f3" },
          { text: "**As opposed to** points the two in opposite directions: _urban, as opposed to rural, areas._ And never write _irregardless._", cue: "f4" },
        ],
        actions: [
          PLAB.kit.clear("clear-rd-forms"),
          ...PLAB.kit.grid("f", [
            [[["crowd", -30, 0, 0.8], ["gate", 40, 0, 0.9]], "open to all, regardless of income", "income makes no difference", { hl: "regardless of" }],
            [[["crowd", -30, 0, 0.8], ["gate", 40, 0, 0.9]], "irrespective of caste or creed", "= regardless of", { hl: "irrespective of" }],
            ["different", "In contrast to the cities, ...", "two set side by side", { hl: "In contrast to" }],
            ["opposite", "urban as opposed to rural", "pointing opposite ways \u00b7 \u2717 irregardless", { hl: "as opposed to" }],
          ]),
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence The school is open to all, with a gap income., then the candidates with pictures: regardless of (right: income makes no difference); irregardless of (wrong: not standard English); despite (wrong: despite = a real obstacle overcome). Rule: regardless of, irrespective of; despite + an obstacle.",
        say: [
          { text: "Fill the gap: The school is open to all, \u2026 income. The answer is **regardless of**: income makes no difference.", cue: "why1" },
          { text: "Why not the others? **irregardless of**: not standard English. **despite**: despite = a real obstacle overcome.", cue: "why2" },
          { text: "The rule: regardless of, irrespective of; despite + an obstacle.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "The school is open to all, ____ income.", [[[["crowd", -30, 0, 0.8], ["gate", 40, 0, 0.9]], "regardless of", true, "income makes | no difference"], ["cross", "irregardless of", false, "not standard | English"], ["overRock", "despite", false, "despite = a real | obstacle overcome"]], ["regardless of, irrespective of", "despite + an obstacle"]),
        ],
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
