/* Lesson 2.10: die of vs die from; suffer from, recover from; result in vs result from. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "die-of-from",
    title: "Die of, suffer from, result in",
    phase: 2,
    unit: "p2-verb",
    level: "Intermediate",
    minutes: 8,
    summary:
      "Die of is usual for an illness or condition (die of cancer, of hunger); die from is usual for an injury or an outside cause (die from wounds). Both are used, so this is a tendency, not a strict rule. Suffer from and recover from use from as the source. Result in points forward to the effect; result from points back to the cause.",
    objectives: [
      "Prefer die of for illnesses and die from for injuries and outside causes, knowing both occur.",
      "Never mix up result in (the effect) and result from (the cause).",
    ],
    steps: [
      {
        id: "die",
        title: "Die of, die from",
        alt: "Left: a germ, labelled die of cancer (the illness itself). Right: a bandage with an arrow striking it, labelled die from injuries (an outside cause).",
        say: [
          { text: "With an illness or a condition, English usually says **die of**: _He died of cancer. Thousands died of hunger._ The illness itself is the cause.", cue: "d1" },
          { text: "With an injury or something done from outside, **die from** is more common: _She died from her injuries._", cue: "d2" },
          { text: "Both forms occur, so this is a tendency, not a strict rule. But never _die with cancer_ or _die by cancer._", cue: "note" },
        ],
        actions: [
          ...K.panels("d", [
            ["germ", "died of cancer", "an illness or condition", { hl: "of" }],
            ["injury", "died from her injuries", "an outside cause", { hl: "from" }],
          ], { y: 60 }),
          { do: "write", id: "note", text: "a tendency, not a strict rule · ✗ died with cancer", x: 480, y: 470, size: 30, ink: "trouble", anchor: "middle", gap: 400 },
        ],
      },
      {
        id: "from-source",
        title: "Suffer from, recover from",
        alt: "Left: a person under a rain cloud, labelled suffer from asthma. Right: a line that dips and then rises away, labelled recover from an illness.",
        say: [
          { text: "**From** marks the source of the trouble. _She suffers from asthma._ The cloud is where the suffering comes from.", cue: "f1" },
          { text: "**Recover from** pictures moving up and away from the low point: _The economy is recovering from the crisis._", cue: "f2" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.panels("f", [
            ["sickPerson", "suffers from asthma", "the source of the trouble", { hl: "from" }],
            ["recover", "recover from the crisis", "rising away from the low point", { hl: "from" }],
          ], { y: 60 }),
        ],
      },
      {
        id: "result",
        title: "Result in, result from",
        alt: "A cause dot with an arrow to an effect box. Above the arrow: result in points forward to the effect. Below: result from points back to the cause. Sentences: The flood resulted in heavy losses. Heavy losses resulted from the flood.",
        say: [
          { text: "Draw the chain: cause, arrow, effect. Standing at the cause, you look forward: **result in** names the effect. _The flood resulted in heavy losses._", cue: "s1" },
          { text: "Standing at the effect, you look back: **result from** names the cause. _Heavy losses resulted from the flood._ Same facts, opposite direction.", cue: "s2" },
        ],
        actions: [
          K.clear("clear-2"),
          ...K.pic("pic", "causeEffect", 300, 40, 2.6),
          { do: "write", id: "c", text: "cause", x: 360, y: 265, size: 26, ink: "accent", anchor: "middle" },
          { do: "write", id: "e", text: "effect", x: 662, y: 265, size: 26, ink: "trouble", anchor: "middle" },
          { do: "write", id: "s1", text: "The flood resulted in heavy losses.", x: 480, y: 360, size: 36, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s1-h", target: "s1", word: "resulted in" },
          { do: "write", id: "s2", text: "Heavy losses resulted from the flood.", x: 480, y: 450, size: 36, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s2-h", target: "s2", word: "resulted from", style: "underline", ink: "trouble" },
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence The flood resulted with a gap heavy losses., then the candidates with pictures: in (right: cause first: looks to the effect); from (wrong: losses would have caused the flood); to (wrong: to = arriving; result points at the effect with in). Rule: subject = cause: result in; subject = effect: result from.",
        say: [
          { text: "Fill the gap: The flood resulted \u2026 heavy losses. The answer is **in**: cause first: looks to the effect.", cue: "why1" },
          { text: "Why not the others? **from**: losses would have caused the flood. **to**: to = arriving; result points at the effect with in.", cue: "why2" },
          { text: "The rule: subject = cause: result in; subject = effect: result from.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "The flood resulted ____ heavy losses.", [["causeEffect", "in", true, "cause first: | looks to the effect"], ["wrongWay", "from", false, "losses would have | caused the flood"], ["cross", "to", false, "to = arriving; | result points at the effect with in"]], ["subject = cause: result in", "subject = effect: result from"]),
        ],
      },
      {
        id: "check",
        title: "Check: direction",
        alt: "The cause and effect chain remains.",
        say: [{ text: "An original practice question." }],
        actions: [],
        check: {
          id: "result-q1",
          source: "original",
          skill: "result in / result from",
          prompt: "Poor planning ___ the failure of the project.",
          options: [
            { text: "resulted in", correct: true, why: "Correct. Poor planning is the cause; the failure is the effect, so look forward with _result in._" },
            { text: "resulted from", misconception: "result-direction", why: "Reversed. _Result from_ names the cause: _The failure resulted from poor planning._" },
            { text: "resulted to", misconception: "result-direction", why: "_Result to_ is not used. Use _result in_ or _result from._" },
          ],
        },
      },
      {
        id: "check-2",
        title: "Check: illness",
        alt: "The board remains.",
        say: [{ text: "One more." }],
        actions: [],
        check: {
          id: "die-q1",
          source: "original",
          skill: "die of / suffer from",
          prompt: "Choose the best sentence.",
          options: [
            { text: "Many children in the area suffer from malnutrition.", correct: true, why: "Correct. _Suffer from_: the condition is the source of the suffering." },
            { text: "Many children in the area suffer with malnutrition.", misconception: "die-of-from", why: "_Suffer with_ is informal and not standard in formal writing. Use _suffer from._" },
            { text: "Many children in the area suffer of malnutrition.", misconception: "die-of-from", why: "_Suffer of_ is not used. The source takes _from._" },
          ],
        },
      },
    ],
  });
})();
