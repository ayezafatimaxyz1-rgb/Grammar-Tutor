/* Lesson 2.13: ability: good at, bad at, capable of, skilled in/at, proficient in. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "ability",
    title: "Good at, capable of, proficient in",
    phase: 2,
    unit: "p2-adjective",
    level: "Intermediate",
    minutes: 8,
    summary:
      "Good at and bad at picture a skill as a target you hit (at a point). Capable of names what your power can produce (of + -ing). Skilled in, proficient in and experienced in picture a field you work inside; skilled at is also used for a specific activity.",
    objectives: [
      "Use good at, bad at and clever at for an activity, and capable of + -ing for what someone can do.",
      "Use proficient in, skilled in or at, and experienced in for a field.",
    ],
    steps: [
      {
        id: "at",
        title: "Good AT: hitting the target",
        alt: "A target with an arrow in the centre. Sentences: She is good at mathematics. He is bad at spelling. Also: clever at, quick at, hopeless at.",
        say: [
          { text: "A skill is pictured as a target. When you are good, you hit the point every time. **At** marks that point: _She is good at mathematics._", cue: "pic-0-0" },
          { text: "_He is bad at spelling._ The same: _clever at, quick at, hopeless at._ A verb takes -ing: _good at solving problems._", cue: "s2" },
        ],
        actions: [
          ...K.pic("pic", [["arrowR", -40, 0], ["target", 30, 0]], 340, 30, 2),
          { do: "write", id: "s1", text: "She is good at mathematics.", x: 480, y: 300, size: 40, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s1-h", target: "s1", word: "good at" },
          { do: "write", id: "s2", text: "bad at spelling · good at solving problems", x: 480, y: 390, size: 32, ink: "accent2", anchor: "middle", gap: 400 },
          { do: "write", id: "w", text: "good in maths is informal · in writing use good at", x: 480, y: 470, size: 28, ink: "muted", anchor: "middle" },
        ],
      },
      {
        id: "capable",
        title: "Capable OF: what your power can produce",
        alt: "A person lifting a heavy block. Sentences: She is capable of leading the team. Crossed out: capable to lead. Compare: able to lead.",
        say: [
          { text: "**Capable of** looks at power and what it can produce. **Of** names the thing: _She is capable of leading the team._", cue: "cs1" },
          { text: "The trap: _able_ takes **to** + verb (_able to lead_), but _capable_ takes **of** + -ing. Never _capable to lead._", cue: "cs2" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.pic("cp", "lift", 340, 20, 2),
          { do: "write", id: "cs1", text: "She is capable of leading the team.", x: 480, y: 300, size: 38, anchor: "middle", gap: 400 },
          { do: "highlight", id: "cs1-h", target: "cs1", word: "capable of" },
          { do: "write", id: "cs2", text: "able to lead · capable of leading · ✗ capable to lead", x: 480, y: 390, size: 32, anchor: "middle", gap: 400 },
          { do: "highlight", id: "cs2-h", target: "cs2", word: "capable of leading", style: "underline" },
        ],
      },
      {
        id: "in",
        title: "Proficient IN a field",
        alt: "A person inside an area with a star. Rows: proficient in English; skilled in negotiation, skilled at chess; experienced in administration.",
        say: [
          { text: "A field of knowledge is an area you work inside. **Proficient in** and **experienced in**: _proficient in English, experienced in administration._", cue: "f1" },
          { text: "**Skilled** takes **in** for a field and also **at** for a specific activity: _skilled in negotiation, skilled at chess._", cue: "f2" },
        ],
        actions: [
          K.clear("clear-2"),
          ...K.rows("f", [
            ["expertIn", "proficient in English", { hl: "proficient in" }],
            ["expertIn", "skilled in negotiation · skilled at chess", { hl: "skilled in" }],
            ["doc", "experienced in administration", { hl: "experienced in" }],
          ], { y: 110, gap: 140 }),
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence She is good with a gap mathematics., then the candidates with pictures: at (right: hitting the target); in (wrong: informal; in is for fields: proficient in); on (wrong: on = a topic: a book on maths). Rule: good at, bad at \u00b7 capable of; proficient in, experienced in.",
        say: [
          { text: "Fill the gap: She is good \u2026 mathematics. The answer is **at**: hitting the target.", cue: "why1" },
          { text: "Why not the others? **in**: informal; in is for fields: proficient in. **on**: on = a topic: a book on maths.", cue: "why2" },
          { text: "The rule: good at, bad at \u00b7 capable of; proficient in, experienced in.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "She is good ____ mathematics.", [[[["arrowR", -40, 0], ["target", 30, 0]], "at", true, "hitting the | target"], ["expertIn", "in", false, "informal; in | is for fields: proficient in"], ["onBase", "on", false, "on = a topic: | a book on maths"]], ["good at, bad at \u00b7 capable of", "proficient in, experienced in"]),
        ],
      },
      {
        id: "check",
        title: "Check: sentence correction",
        alt: "The board remains.",
        say: [{ text: "An original practice question." }],
        actions: [],
        check: {
          id: "ability-q1",
          source: "original",
          skill: "capable of + -ing",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "The new system is capable of processing a million records a day.", correct: true, why: "Correct. _Capable of_ + -ing." },
            { text: "The new system is capable to process a million records a day.", misconception: "ability-adjectives", why: "_Capable_ takes _of_ + -ing. It is _able_ that takes _to_ + verb." },
            { text: "The new system is capable for processing a million records a day.", misconception: "ability-adjectives", why: "_Capable for_ is not used. Use _capable of._" },
          ],
        },
      },
      {
        id: "check-2",
        title: "Check: choose the preposition",
        alt: "The board remains.",
        say: [{ text: "One more." }],
        actions: [],
        check: {
          id: "ability-q2",
          source: "original",
          skill: "proficient in",
          prompt: "Candidates must be proficient ___ Urdu and English.",
          options: [
            { text: "in", correct: true, why: "Correct. A language is a field you work inside: _proficient in._" },
            { text: "at", misconception: "ability-adjectives", why: "_At_ goes with _good at, skilled at_ for activities. _Proficient_ takes _in._" },
            { text: "with", misconception: "ability-adjectives", why: "_Proficient with_ is used only for tools (_proficient with a rifle_). For a language, use _in._" },
          ],
        },
      },
    ],
  });
})();
