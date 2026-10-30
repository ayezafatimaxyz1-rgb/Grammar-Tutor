/* Lesson 2.30: redundant prepositions: discuss about, reach at, return back, emphasise on. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "redundant",
    title: "Redundant prepositions",
    phase: 2,
    unit: "p2-errors",
    level: "Intermediate",
    minutes: 8,
    summary:
      "The commonest correction in CSS papers: removing a preposition the verb does not need. Discuss about, reach at, emphasise on, stress on, mention about, order for, enter into the room, return back, comprise of. The noun often keeps the preposition (an emphasis on, a discussion about), which is why the verb gets it by mistake.",
    objectives: [
      "Spot and remove redundant prepositions after discuss, reach, emphasise, stress, mention, order, enter, comprise and return.",
      "Explain the mix-up: the related noun takes a preposition, the verb does not.",
    ],
    steps: [
      {
        id: "idea",
        title: "Saying it twice",
        alt: "Two word boxes, the second one crossed out. Sentence: We discussed about the issue becomes We discussed the issue. Discuss already means talk about.",
        say: [
          { text: "A redundant preposition says the same thing twice. **Discuss** already means _talk about_, so _discuss about_ repeats the _about._", cue: "pic-0-0" },
          { text: "Cross it out: _We discussed the issue._ This is the most frequent sentence-correction item in exams.", cue: "s2" },
        ],
        actions: [
          ...K.pic("pic", "extraWord", 340, 30, 2),
          { do: "write", id: "s1", text: "✗ We discussed about the issue.", x: 480, y: 300, size: 36, ink: "trouble", anchor: "middle", gap: 400 },
          { do: "write", id: "s2", text: "We discussed the issue.", x: 480, y: 380, size: 40, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s2-h", target: "s2", word: "discussed" },
        ],
      },
      {
        id: "list",
        title: "The usual suspects",
        alt: "Rows: reach the station (not reach at); emphasise the point, stress the need (not emphasise on, stress on); mention the problem (not mention about); order a book (not order for).",
        say: [
          { text: "_reach the station_, not _reach at_ (reach already means arrive at). _emphasise the point_ and _stress the need_, not _emphasise on, stress on._", cue: "l1" },
          { text: "_mention the problem_, not _mention about._ _order a book_, not _order for a book._", cue: "l3" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.rows("l", [
            ["reachDot", "reach the station  ✗ reach at", { hl: "reach" }],
            ["pressOn", "emphasise the point · stress the need  ✗ emphasise on", { hl: "emphasise", size: 28 }],
            ["speak", "mention the problem  ✗ mention about", { hl: "mention" }],
            ["book", "order a book  ✗ order for a book", { hl: "order" }],
          ], { y: 90, gap: 125 }),
        ],
      },
      {
        id: "noun-trap",
        title: "Why it happens, and two more",
        alt: "Four pictures: arrows pressing on a point (an emphasis on, but emphasise), two people talking (a discussion about, but discuss), an arrow going back (return, not return back), a box of parts (comprise, not comprise of).",
        say: [
          { text: "The mistake comes from the noun. The noun takes a preposition: _an emphasis on, a discussion about, an order for._ The verb does not.", cue: "n1" },
          { text: "Two more: _return_ already means go back, so not _return back._ And _comprise_ means consist of: _The board comprises five members_, not _comprises of._ (_is composed of_ and _consists of_ are fine.)", cue: "n3" },
        ],
        actions: [
          PLAB.kit.clear("clear-2"),
          ...PLAB.kit.grid("n", [
            ["pressOn", "an emphasis on \u00b7 emphasise it", "the noun takes on, the verb does not", { hl: "on" }],
            ["discuss", "a discussion about \u00b7 discuss it", "the noun takes about, the verb does not", { hl: "about" }],
            ["returnArc", "return (\u2717 return back)", "return already means go back", { hl: "return" }],
            ["stackAdd", "comprises five members (\u2717 of)", "or: consists of \u00b7 is composed of", { hl: "comprises" }],
          ]),
        ],
      },
      {
        id: "check",
        title: "Check: sentence correction",
        alt: "The board remains.",
        say: [{ text: "An original practice question in CSS sentence-correction style." }],
        actions: [],
        check: {
          id: "redundant-q1",
          source: "original",
          skill: "redundant preposition",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "The speaker emphasised the need for tolerance.", correct: true, why: "Correct. The verb _emphasise_ takes a direct object. (The noun says _an emphasis on._)" },
            { text: "The speaker emphasised on the need for tolerance.", misconception: "redundant-prep", why: "_Emphasise on_ mixes the verb with the noun pattern (_emphasis on_). Remove _on._" },
            { text: "The speaker emphasised upon the need of tolerance.", misconception: "redundant-prep", why: "No preposition after _emphasise_, and _need_ takes _for._" },
          ],
        },
      },
      {
        id: "check-2",
        title: "Check: one more",
        alt: "The board remains.",
        say: [{ text: "One more." }],
        actions: [],
        check: {
          id: "redundant-q2",
          source: "original",
          skill: "reach / return",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "When we reached Multan, we decided to return home.", correct: true, why: "Correct. _Reach_ and _return_ need nothing extra; _home_ takes no preposition." },
            { text: "When we reached at Multan, we decided to return back home.", misconception: "redundant-prep", why: "_Reach at_ and _return back_ both say something twice." },
            { text: "When we reached to Multan, we decided to return back to home.", misconception: "redundant-prep", why: "_Reach_ takes no preposition, _return back_ is redundant, and _home_ takes no _to._" },
          ],
        },
      },
    ],
  });
})();
