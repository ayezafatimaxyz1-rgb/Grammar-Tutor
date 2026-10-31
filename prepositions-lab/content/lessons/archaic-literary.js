/* Lesson 1.50: archaic and literary prepositions to recognise. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "archaic-literary",
    title: "Old and literary prepositions",
    phase: 1,
    unit: "p1-relations",
    level: "Advanced",
    minutes: 7,
    summary:
      "Words you will meet in older texts, poetry and some formal prose: unto, betwixt, ere, athwart, amidst. Two are still useful in academic writing: qua and vis-à-vis. Recognise the old ones; use only the useful two, and only when they fit.",
    objectives: [
      "Recognise unto, betwixt, ere, athwart and amidst in reading.",
      "Use vis-à-vis (in relation to) and qua (in the capacity of) correctly, sparingly.",
    ],
    steps: [
      {
        id: "old",
        title: "Recognise, do not use",
        alt: "Five pictures, each showing the modern meaning: an arrow (unto = to), a dot between two marks (betwixt = between), a dot before an event (ere = before), an arrow across a road (athwart = across), a dot in a crowd (amidst = amid).",
        say: [
          { text: "These come from old texts and poetry, like words on a scroll. Read them, but do not use them in your own writing.", cue: "o1" },
          { text: "_unto_ = to, _betwixt_ = between, _ere_ = before, _athwart_ = across, _amidst_ = amid.", cue: "o5" },
        ],
        actions: [
          PLAB.kit.clear("clear-rd-old"),
          ...PLAB.kit.grid("o", [
            ["arrowR", "unto = to", "old word: recognise only", { hl: "unto" }],
            ["betweenTicks", "betwixt = between", "old word: recognise only", { hl: "betwixt" }],
            ["priorDot", "ere = before", "old word: recognise only", { hl: "ere" }],
            ["roadPass", "athwart = across", "old word: recognise only", { hl: "athwart" }],
            ["crowdDot", "amidst = amid", "old in AmE, formal in BrE", { hl: "amidst" }],
          ]),
        ],
      },
      {
        id: "useful",
        title: "Two that are still useful",
        alt: "Two rows: Pakistan's position vis-à-vis India, meaning in relation to. The state qua employer, meaning in its capacity as employer.",
        say: [
          { text: "**Vis-à-vis** is French for _face to face_: two things set facing each other to compare them. It means _in relation to_: _Pakistan's position vis-à-vis India._", cue: "u1" },
          { text: "**Qua** (Latin) means _in the capacity of_: the same person wearing a particular badge. _the state qua employer_ = the state in its role as employer.", cue: "u2" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.panels("u", [
            ["faces", "position vis-à-vis India", "= in relation to", { hl: "vis-à-vis" }],
            ["badge", "the state qua employer", "= in its role as", { hl: "qua" }],
          ]),
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence In modern English: Come with a gap me., then the candidates with pictures: to (right: modern English); unto (wrong: old, Bible English). Rule: read old words, but write modern ones; unto = to \u00b7 ere = before.",
        say: [
          { text: "Fill the gap: In modern English: Come \u2026 me. What does the sentence want to say? The answer is **to**: modern English.", cue: "why1" },
          { text: "Why not the others? **unto**: old, Bible English.", cue: "why2" },
          { text: "The rule: read old words, but write modern ones; unto = to \u00b7 ere = before.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "In modern English: Come ____ me.", [["arrowR", "to", true, "modern English"], ["scroll", "unto", false, "old, Bible | English"]], ["read old words, but write modern ones", "unto = to \u00b7 ere = before"]),
        ],
      },
      {
        id: "check",
        title: "Check: meaning",
        alt: "The two useful words remain on the board.",
        say: [{ text: "What does vis-à-vis mean?" }],
        actions: [],
        check: {
          id: "archaic-q1",
          source: "original",
          skill: "vis-à-vis",
          prompt: "“The rupee weakened vis-à-vis the dollar.” What does vis-à-vis mean here?",
          options: [
            { text: "in relation to", correct: true, why: "Correct. The rupee weakened when compared with the dollar." },
            { text: "because of", misconception: "literary-preps", why: "Vis-à-vis does not give a cause. It means in relation to or compared with." },
            { text: "together with", misconception: "literary-preps", why: "Vis-à-vis compares two things; it does not join them." },
          ],
        },
      },
    ],
  });
})();
