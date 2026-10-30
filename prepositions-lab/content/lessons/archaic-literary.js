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
        alt: "A table of old words and modern meanings: unto, to; betwixt, between; ere, before; athwart, across; amidst, amid.",
        say: [
          { text: "These appear in older texts and poetry. Read them, but do not use them in your own writing.", cue: "o1" },
          { text: "_unto_ = to, _betwixt_ = between, _ere_ = before, _athwart_ = across, _amidst_ = amid.", cue: "o5" },
        ],
        actions: K.lines("o", ["unto = to", "betwixt = between", "ere = before", "athwart = across", "amidst = amid"], { y: 110, gap: 85, size: 36 }),
      },
      {
        id: "useful",
        title: "Two that are still useful",
        alt: "Two rows: Pakistan's position vis-à-vis India, meaning in relation to. The state qua employer, meaning in its capacity as employer.",
        say: [
          { text: "**Vis-à-vis** (French, face to face) means _in relation to_ or _compared with_: _Pakistan's position vis-à-vis India._", cue: "u1" },
          { text: "**Qua** (Latin) means _in the capacity of_: _the state qua employer_, meaning the state in its role as an employer. It is academic; use it only when precise.", cue: "u2" },
        ],
        actions: [K.clear("clear-1"), ...K.lines("u", [["Pakistan's position vis-à-vis India", { hl: "vis-à-vis" }], ["the state qua employer", { hl: "qua" }]], { y: 200, gap: 130, size: 38 })],
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
