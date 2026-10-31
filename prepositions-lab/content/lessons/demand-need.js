/* Lesson 2.19: demand for, need for, respect for, desire for. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "demand-need",
    title: "Demand for, need for, respect for",
    phase: 2,
    unit: "p2-noun",
    level: "Intermediate",
    minutes: 7,
    summary:
      "Nouns of wanting and feeling reach towards a target, and for names it: a demand for, a need for, a desire for, a request for, an appetite for, respect for, sympathy for, love for. The verbs behave differently: demand, need and request take no preposition.",
    objectives: [
      "Use for after demand, need, desire, request, respect, sympathy and love used as nouns.",
      "Drop the preposition after the verbs: demand an apology, need help, request information.",
    ],
    steps: [
      {
        id: "for",
        title: "Reaching FOR a target",
        alt: "People with arrows reaching towards a box. Rows: There is a growing demand for electricity. The need for reform is urgent. a desire for peace; a request for information.",
        say: [
          { text: "Picture people reaching towards something they want. **For** names the target, as in _look for, wait for, apply for._", cue: "f1" },
          { text: "_There is a growing demand for electricity. The need for reform is urgent._", cue: "f2" },
          { text: "_a desire for peace, a request for information, an appetite for risk._", cue: "f3" },
        ],
        actions: K.rows("f", [
          ["demandFor", "a growing demand for electricity", { hl: "demand for" }],
          ["arrowUp", "The need for reform is urgent.", { hl: "need for" }],
          ["heart", "a desire for peace · a request for information", { hl: "desire for", size: 30 }],
        ], { y: 110, gap: 140 }),
      },
      {
        id: "feelings",
        title: "Feelings towards someone: respect for",
        alt: "A person with an arrow to another person wearing a crown, labelled respect for elders. Notes: sympathy for, love for, admiration for, contempt for.",
        say: [
          { text: "Feelings directed at someone take **for** too: _We should show respect for our elders._", cue: "s1" },
          { text: "_sympathy for the victims, love for one's country, admiration for her courage, contempt for the rules._", cue: "s2" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.pic("pic", "respectFor", 340, 20, 2),
          { do: "write", id: "s1", text: "We should show respect for our elders.", x: 480, y: 290, size: 36, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s1-h", target: "s1", word: "respect for" },
          { do: "write", id: "s2", text: "sympathy for · love for · admiration for · contempt for", x: 480, y: 380, size: 30, ink: "accent2", anchor: "middle", gap: 400 },
        ],
      },
      {
        id: "verbs",
        title: "The verbs drop the preposition",
        alt: "Four pictures: people reaching for a box (demanded an apology; a demand for an apology), an arrow up (we need help; a need for help), a document (requested information; a request for information), a cross (demanded for an apology).",
        say: [
          { text: "The noun takes **for**, but the verb takes its object directly: _a demand for an apology_, but _They demanded an apology._", cue: "v1" },
          { text: "_a need for help_ but _We need help._ _a request for information_ but _She requested information._ Never _demanded for._", cue: "v2" },
        ],
        actions: [
          PLAB.kit.clear("clear-2"),
          ...PLAB.kit.grid("v", [
            ["demandFor", "They demanded an apology.", "noun: a demand for an apology", { hl: "demanded" }],
            ["arrowUp", "We need help.", "noun: a need for help", { hl: "need" }],
            ["doc", "She requested information.", "noun: a request for information", { hl: "requested" }],
            ["cross", "\u2717 They demanded for an apology.", "the verb takes no for", { ink: "trouble" }],
          ]),
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence There is a growing demand with a gap electricity., then the candidates with pictures: for (right: reaching for a target); of (wrong: of = belonging; demand is not part of electricity); to (wrong: to = arriving; demand is reaching for it). Rule: a demand for, a need for, respect for; the verbs take none: demand it.",
        say: [
          { text: "Fill the gap: There is a growing demand \u2026 electricity. What does the sentence want to say? The answer is **for**: reaching for a target.", cue: "why1" },
          { text: "Why not the others? **of**: of = belonging; demand is not part of electricity. **to**: to = arriving; demand is reaching for it.", cue: "why2" },
          { text: "The rule: a demand for, a need for, respect for; the verbs take none: demand it.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "There is a growing demand ____ electricity.", [["demandFor", "for", true, "reaching for | a target"], ["cross", "of", false, "of = belonging; demand | is not part of electricity"], ["arrowR", "to", false, "to = arriving; demand | is reaching for it"]], ["a demand for, a need for, respect for", "the verbs take none: demand it"]),
        ],
      },
      {
        id: "check",
        title: "Check: sentence correction",
        alt: "The two columns remain on the board.",
        say: [{ text: "An original practice question." }],
        actions: [],
        check: {
          id: "demand-q1",
          source: "original",
          skill: "demand (verb) / demand for (noun)",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "The protesters demanded the release of the detained students.", correct: true, why: "Correct. The verb _demand_ takes a direct object." },
            { text: "The protesters demanded for the release of the detained students.", misconception: "noun-verb-prep", why: "Only the noun takes _for_ (_a demand for their release_). The verb does not." },
            { text: "The protesters made a demand of the release of the detained students.", misconception: "noun-verb-prep", why: "The noun _demand_ takes _for_: _a demand for the release._" },
          ],
        },
      },
    ],
  });
})();
