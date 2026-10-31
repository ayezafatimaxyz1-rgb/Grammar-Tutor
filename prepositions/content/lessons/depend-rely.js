/* Lesson 2.1: depend on, rely on, count on, insist on, focus on, comment on. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "depend-rely",
    title: "Depend on, rely on, insist on",
    phase: 2,
    unit: "p2-verb",
    level: "Intermediate",
    minutes: 8,
    summary:
      "These verbs take on because of the picture behind on: weight resting on a support (depend on, rely on, count on), or pressure and attention landing on a surface (insist on, focus on, comment on).",
    objectives: [
      "Use on after depend, rely, count, insist, focus and comment, and see the support or surface picture behind it.",
      "Avoid depend of, depend from and insist to, and use the -ing form after insist on.",
    ],
    steps: [
      {
        id: "support",
        title: "Resting on a support",
        alt: "A block resting on a pillar with an arrow pressing down. Sentences: Farmers depend on the rain. You can rely on her. We are counting on you.",
        say: [
          { text: "Draw a block resting on a pillar. Take the pillar away and the block falls. Its weight is **on** the support.", cue: "pic-0-0" },
          { text: "That is why English says **depend on**: what happens to the farmers rests on the rain. _Farmers depend on the rain._", cue: "s1" },
          { text: "**Rely on** and **count on** use the same picture: you put your weight on a person and trust them to hold it. _You can rely on her. We are counting on you._", cue: "s2" },
        ],
        actions: [
          ...K.pic("pic", "support", 340, 50, 2),
          { do: "write", id: "pic-l", text: "the support holds the weight", x: 480, y: 250, size: 26, ink: "muted", anchor: "middle" },
          { do: "write", id: "s1", text: "Farmers depend on the rain.", x: 480, y: 340, size: 40, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s1-h", target: "s1", word: "depend on" },
          { do: "write", id: "s2", text: "You can rely on her. · We are counting on you.", x: 480, y: 430, size: 34, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s2-h", target: "s2", word: "rely on" },
          { do: "highlight", id: "s2-h2", target: "s2", word: "counting on", style: "underline" },
        ],
      },
      {
        id: "surface",
        title: "Pressure and attention landing on a surface",
        alt: "Three pictures: arrows pressing down on a dot (insist on), a magnifier focused on a dot (focus on), a speech bubble with an arrow landing on a document (comment on).",
        say: [
          { text: "The second picture of **on** is contact: something lands on a surface and stays there.", cue: "p1p-0-0" },
          { text: "**Insist on** is pressure pushing down on one point and not letting go: _She insisted on a written reply._", cue: "p1" },
          { text: "**Focus on** is attention landing on one spot, like light through a lens. **Comment on** is words landing on a topic: _The minister commented on the report._", cue: "p2" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.panels("p", [
            ["pressOn", "insist on", "press on one point", { hl: "on" }],
            ["focusOn", "focus on", "attention lands on it", { hl: "on" }],
            ["commentOn", "comment on", "words land on a topic", { hl: "on" }],
          ], { y: 70 }),
          { do: "write", id: "ex", text: "The minister commented on the report.", x: 480, y: 470, size: 36, anchor: "middle", gap: 400 },
          { do: "highlight", id: "ex-h", target: "ex", word: "commented on" },
        ],
      },
      {
        id: "grammar",
        title: "What comes after on",
        alt: "Rows: depend on + noun (depends on the weather); insist on + -ing (insisted on paying); rely on someone to do (rely on him to help); crossed out: depend of, depend from, insist to pay.",
        say: [
          { text: "After **on** comes a noun, or a verb in the -ing form, because on is a preposition: _It depends on the weather. He insisted on paying._", cue: "g1" },
          { text: "With a person you can add what they will do: _We rely on him to help._ In formal writing, _depend upon_ and _rely upon_ mean the same.", cue: "g3" },
          { text: "Never _depend of_ or _depend from_, and never _insist to pay._ The support picture always needs **on**.", cue: "g4" },
        ],
        actions: [
          K.clear("clear-2"),
          ...K.rows("g", [
            ["support", "It depends on the weather.", { hl: "depends on" }],
            ["pressOn", "He insisted on paying the bill.", { hl: "paying" }],
            ["leanOn", "We rely on him to help. (formal: rely upon)", { hl: "rely on", size: 30 }],
            ["cross", "✗ depend of · ✗ depend from · ✗ insist to pay", { ink: "trouble" }],
          ], { y: 90, gap: 125 }),
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence It all depends with a gap the weather., then the candidates with pictures: on (right: rests on it like a support); of (wrong: of = belonging; depend means resting on); from (wrong: from = a starting point, not a support). Rule: depend on, rely on, count on, insist on; formal: depend upon.",
        say: [
          { text: "Fill the gap: It all depends \u2026 the weather. What does the sentence want to say? The answer is **on**: rests on it like a support.", cue: "why1" },
          { text: "Why not the others? **of**: of = belonging; depend means resting on. **from**: from = a starting point, not a support.", cue: "why2" },
          { text: "The rule: depend on, rely on, count on, insist on; formal: depend upon.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "It all depends ____ the weather.", [["support", "on", true, "rests on it like | a support"], ["cross", "of", false, "of = belonging; depend | means resting on"], ["origin", "from", false, "from = a starting | point, not a support"]], ["depend on, rely on, count on, insist on", "formal: depend upon"]),
        ],
      },
      {
        id: "check",
        title: "Check: choose the preposition",
        alt: "The rows remain on the board.",
        say: [{ text: "An original practice question in CSS sentence-completion style." }],
        actions: [],
        check: {
          id: "depend-rely-q1",
          source: "original",
          skill: "insist on + -ing",
          prompt: "The committee insisted ___ a full inquiry before any decision was taken.",
          options: [
            { text: "on holding", correct: true, why: "Correct. _Insist on_ + -ing: pressure lands on one demand." },
            { text: "to hold", misconception: "on-verbs", why: "_Insist_ does not take to + verb. Use _insist on holding_, or _insist that an inquiry be held._" },
            { text: "for holding", misconception: "on-verbs", why: "_Insist_ takes _on_, never _for._" },
          ],
        },
      },
      {
        id: "check-2",
        title: "Check: sentence correction",
        alt: "The rows remain on the board.",
        say: [{ text: "One more, in sentence-correction style." }],
        actions: [],
        check: {
          id: "depend-rely-q2",
          source: "original",
          skill: "depend on",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "The success of the plan depends on public support.", correct: true, why: "Correct. The plan's success rests on public support, like a block on a pillar." },
            { text: "The success of the plan depends of public support.", misconception: "on-verbs", why: "_Depend of_ is a common error. The support picture needs _on._" },
            { text: "The success of the plan depends from public support.", misconception: "on-verbs", why: "_Depend from_ is not used for this meaning. Use _depend on._" },
          ],
        },
      },
    ],
  });
})();
