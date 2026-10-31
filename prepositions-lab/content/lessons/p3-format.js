/* Lesson 3.1: how the CSS paper asks about prepositions, from ten real papers. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "p3-format",
    title: "How the CSS paper asks about prepositions",
    phase: 3,
    unit: "p3-css",
    level: "Intermediate",
    minutes: 8,
    summary:
      "From ten English (Precis & Composition) papers: prepositions come as a fill-in-the-blanks question (eight sentences, attempt any five, 5 marks), as four-option items in older papers, as two blanks per sentence in CSS 2026, and hidden inside the sentence-correction question.",
    objectives: [
      "Recognise the four ways the paper asks about prepositions.",
      "Know what each pattern tests and how to plan your five answers.",
    ],
    steps: [
      {
        id: "formats",
        title: "Four ways the paper asks",
        alt: "Four pictures: a page with blanks (fill in the blanks, any five of eight, Q.5(b), CSS 2019 to 2024), a page of ticks (four options a to d, older papers), two blanks in one line (CSS 2026), a crossed-out extra word (preposition errors inside Correct only FIVE).",
        say: [
          { text: "In the papers you shared, prepositions appear in four ways. Most often: **Re-write the following sentences (ONLY FIVE) after filling in the blanks with appropriate prepositions.** Eight sentences, five marks.", cue: "f1" },
          { text: "Older papers gave **four options** for each blank, (a) to (d). CSS 2026 put **two blanks** in each sentence.", cue: "f2" },
          { text: "And the **Correct only FIVE** question often hides a preposition error: an extra one, a missing one, or a wrong one.", cue: "f4" },
        ],
        actions: K.grid("f", [
          ["doc", "Fill in the blanks: any 5 of 8", "Q.5(b), 5 marks · CSS 2019 to 2024", { hl: "Fill in the blanks" }],
          ["exceptOne", "Four options (a) to (d)", "older papers", { hl: "Four options" }],
          ["gapSlot", "Two blanks in one sentence", "CSS 2026", { hl: "Two blanks" }],
          ["extraWord", "Errors inside Correct only FIVE", "extra, missing or wrong", { hl: "Errors" }],
        ]),
      },
      {
        id: "tested",
        title: "What the items test",
        alt: "Six pictures with counts from the ten papers: partner words (17 items), phrasal verbs (10), fixed phrases (8), place and movement (9), literary sentences (8), time, means and small words (12). Two-blank sentences (8) and correction items (8) come on top.",
        say: [
          { text: "Sorting every item from the ten papers gives six families. The biggest is **partner words**: _responsible for, impervious to, contingent on._", cue: "t1" },
          { text: "Then **phrasal verbs** (_put off, went off_), **fixed phrases** (_by heart, under the weather_), and **place and movement** (_over the wall, into my parlour_).", cue: "t2" },
          { text: "Recent papers add **literary sentences** (_wove through Ghalib's verses_), and every paper has short **time, means and small words** (_by noon, with a hatchet_). Each family has its own lesson next.", cue: "t5" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.grid("t", [
            ["support", "partner words", "17 items: responsible for", { hl: "partner words" }],
            ["calendar", "phrasal verbs", "10 items: put off", { hl: "phrasal verbs" }],
            ["learnHeart", "fixed phrases", "8 items: by heart", { hl: "fixed phrases" }],
            ["overRock", "place and movement", "9 items: over the wall", { hl: "place and movement" }],
            ["passThrough", "literary sentences", "8 items: wove through", { hl: "literary sentences" }],
            ["priorDot", "time, means, small words", "12 items: by noon", { hl: "time, means, small words" }],
          ]),
        ],
      },
      {
        id: "plan",
        title: "Plan your five answers",
        alt: "Four rows with pictures: a cross (attempt only five: extra attempts are not marked), a tick (choose the five you are surest of), a pen (write the whole sentence and underline the preposition), two blanks (two-blank sentences: solve each blank alone).",
        say: [
          { text: "The paper's own instructions say an extra attempt will not be considered. So **attempt exactly five**.", cue: "s1" },
          { text: "Read all eight first, and **choose the five you are surest of**. Rewrite the **whole sentence**, with the preposition clear.", cue: "s2" },
          { text: "In a two-blank sentence, **solve each blank alone**: each has its own partner word.", cue: "s4" },
        ],
        actions: [
          K.clear("clear-2"),
          ...K.rows("s", [
            ["cross", "Attempt exactly five: extra attempts are not marked.", { hl: "exactly five" }],
            ["check", "Read all eight; choose the five you are surest of.", { hl: "surest" }],
            ["pen", "Rewrite the whole sentence; underline the preposition.", { hl: "whole sentence" }],
            ["gapSlot", "Two blanks: solve each blank on its own.", { hl: "each blank" }],
          ], { y: 90, gap: 125 }),
        ],
      },
      {
        id: "check",
        title: "Check: the instructions",
        alt: "The plan stays on the board.",
        say: [{ text: "An original question about the exam instructions." }],
        actions: [],
        check: {
          id: "p3-format-q1",
          source: "original",
          skill: "exam format",
          prompt: "The preposition question has eight sentences and says ONLY FIVE. What is the best plan?",
          options: [
            { text: "Read all eight, then answer the five you are surest of.", correct: true, why: "Correct. Only five are marked, so choose the five you can answer best." },
            { text: "Answer all eight in case some are wrong.", misconception: "p3-format", why: "The paper says extra attempts are not considered; only the first five may be read." },
            { text: "Answer the first five in order.", misconception: "p3-format", why: "You may choose any five. Pick the ones you are surest of." },
          ],
        },
      },
    ],
  });
})();
