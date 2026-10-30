/* Lesson 2.25: three-part verbs: put up with, look down on, do away with, come up with. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "three-part",
    title: "Put up with, look down on, do away with",
    phase: 2,
    unit: "p2-phrasal",
    level: "Advanced",
    minutes: 8,
    summary:
      "Three-part verbs are verb + particle + preposition: put up with (tolerate), look down on (feel superior to), look up to (admire), do away with (abolish), come up with (think of), run out of (have none left), catch up with, get along with. They never split, and the object always comes last: put up with it.",
    objectives: [
      "Learn the meanings of eight common three-part verbs from their pictures.",
      "Keep all three parts together with the object at the end: we cannot put up with it.",
    ],
    steps: [
      {
        id: "feelings",
        title: "Put up with, look down on, look up to",
        alt: "Rows: a person under a heavy weight, labelled I cannot put up with this noise (tolerate). A person on a step looking down at a smaller person, labelled look down on the poor (feel superior). Reversed, look up to your teachers (admire).",
        say: [
          { text: "**Put up with** is holding up a weight you do not like: tolerate. _I cannot put up with this noise._", cue: "f1" },
          { text: "**Look down on** someone is standing higher and looking down: feeling superior. **Look up to** is the reverse: admire. _Never look down on the poor; look up to your teachers._", cue: "f2" },
        ],
        actions: K.rows("f", [
          ["pressed", "I cannot put up with this noise.  (= tolerate)", { hl: "put up with" }],
          ["lookDown", "Never look down on the poor.  (= feel superior to)", { hl: "look down on", size: 30 }],
          ["arrowUp", "Look up to your teachers.  (= admire)", { hl: "Look up to" }],
        ], { y: 110, gap: 140 }),
      },
      {
        id: "actions",
        title: "Do away with, come up with, run out of",
        alt: "Rows: an item thrown out with a cross, labelled do away with the old law (abolish). A light bulb, labelled come up with a plan (think of). An empty jar, labelled We have run out of time (none left). Two figures, labelled catch up with, get along with.",
        say: [
          { text: "**Do away with** is throwing something out: abolish. _The government did away with the old law._", cue: "a1" },
          { text: "**Come up with** is an idea rising into your head: think of. _She came up with a plan._ **Run out of** is reaching the empty bottom of the jar: _We have run out of time._", cue: "a2" },
          { text: "And two more: _catch up with_ (reach someone ahead), _get along with_ (have a friendly relationship).", cue: "a4" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.rows("a", [
            ["dispense", "do away with the old law  (= abolish)", { hl: "do away with" }],
            ["lamp", "come up with a plan  (= think of)", { hl: "come up with" }],
            ["emptyJar", "We have run out of time.  (= none left)", { hl: "run out of" }],
            ["people", "catch up with · get along with", { hl: "catch up with" }],
          ], { y: 90, gap: 125 }),
        ],
      },
      {
        id: "order",
        title: "The object comes last",
        alt: "Correct: We cannot put up with it. Crossed out: We cannot put it up with. Correct: They did away with it. Crossed out: They did it away with.",
        say: [
          { text: "All three parts stay together, and the object, even a pronoun, comes at the end: _We cannot put up with it._", cue: "o1" },
          { text: "Never _put it up with_ or _did it away with._", cue: "o2" },
        ],
        actions: [
          K.clear("clear-2"),
          ...K.pic("op", "pressed", 30, 90, 1),
          { do: "write", id: "o1", text: "We cannot put up with it. · They did away with it.", x: 200, y: 140, size: 32 },
          { do: "highlight", id: "o1-h", target: "o1", word: "it" },
          ...K.pic("ox", "cross", 30, 230, 1),
          { do: "write", id: "o2", text: "✗ put it up with · ✗ did it away with", x: 200, y: 280, size: 32, ink: "trouble" },
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence I cannot put up with a gap this noise any longer., then the candidates with pictures: with (right: put up with = tolerate); to (wrong: to = a goal; you are not moving to the noise); for (wrong: for = what you want; you do not want noise). Rule: put up with, do away with, come up with; look down on, look up to, run out of.",
        say: [
          { text: "Fill the gap: I cannot put up \u2026 this noise any longer. The answer is **with**: put up with = tolerate.", cue: "why1" },
          { text: "Why not the others? **to**: to = a goal; you are not moving to the noise. **for**: for = what you want; you do not want noise.", cue: "why2" },
          { text: "The rule: put up with, do away with, come up with; look down on, look up to, run out of.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "I cannot put up ____ this noise any longer.", [["pressed", "with", true, "put up with | = tolerate"], ["arrowR", "to", false, "to = a goal; you are | not moving to the noise"], ["target", "for", false, "for = what you want; | you do not want noise"]], ["put up with, do away with, come up with", "look down on, look up to, run out of"]),
        ],
      },
      {
        id: "check",
        title: "Check: meaning",
        alt: "The board remains.",
        say: [{ text: "An original practice question." }],
        actions: [],
        check: {
          id: "three-part-q1",
          source: "original",
          skill: "do away with",
          prompt: "The new government promised to ___ the feudal system. (= abolish)",
          options: [
            { text: "do away with", correct: true, why: "Correct. _Do away with_ = abolish: throw it out." },
            { text: "put up with", misconception: "three-part-verbs", why: "_Put up with_ means tolerate, the opposite of abolishing." },
            { text: "come up with", misconception: "three-part-verbs", why: "_Come up with_ means think of an idea or a plan." },
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
          id: "three-part-q2",
          source: "original",
          skill: "look down on",
          prompt: "A true leader never ___ junior colleagues.",
          options: [
            { text: "looks down on", correct: true, why: "Correct. _Look down on_ = feel superior to." },
            { text: "looks down", misconception: "three-part-verbs", why: "Without _on_ there is no object: _looks down on_ someone." },
            { text: "looks up to", misconception: "three-part-verbs", why: "_Look up to_ means admire, which does not fit _never_ here." },
          ],
        },
      },
    ],
  });
})();
