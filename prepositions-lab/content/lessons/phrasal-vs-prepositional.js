/* Lesson 2.23: phrasal verb or prepositional verb? (look up a word vs look up the chimney) */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "phrasal-vs-prepositional",
    title: "Phrasal verb or prepositional verb?",
    phase: 2,
    unit: "p2-phrasal",
    level: "Advanced",
    minutes: 9,
    summary:
      "In look up the chimney, up is a preposition: it shows the path and stays before its noun. In look up a word, up is a particle (an adverb) joined to the verb to make a new meaning (search in a book), and it can move: look the word up. Two tests tell them apart: can the small word move after the object, and does a pronoun go in the middle?",
    objectives: [
      "Tell a preposition (part of a phrase with its noun) from a particle (part of the verb).",
      "Apply the movement test and the pronoun test: look it up (particle) vs look up it (preposition: up the chimney).",
    ],
    steps: [
      {
        id: "two-ups",
        title: "Two kinds of up",
        alt: "Left: an eye looking up a chimney, labelled She looked up the chimney (up = the path). Right: a dictionary and a magnifier, labelled She looked up the word (up + look = search for).",
        say: [
          { text: "Here, **up** shows the real path of the eyes: up the chimney. It is a preposition, and _up the chimney_ is a phrase that answers _where?_", cue: "a1" },
          { text: "Here, nothing moves upward. **Look up** together means search for in a book: a new meaning made of verb + particle. This is a **phrasal verb**.", cue: "a2" },
        ],
        actions: K.panels("a", [
          ["upChimney", "She looked up the chimney.", "up = the path (preposition)", { hl: "up" }],
          ["dictionary", "She looked up the word.", "look up = search for (phrasal)", { hl: "looked up" }],
        ], { y: 60 }),
      },
      {
        id: "tests",
        title: "Two tests",
        alt: "Movement test: She looked the word up (works: phrasal); She looked the chimney up (fails: preposition). Pronoun test: She looked it up (phrasal); She looked up it (preposition).",
        say: [
          { text: "**Movement test**: try moving the small word after the object. _She looked the word up_ works, so up is a particle. _She looked the chimney up_ is nonsense, so there up is a preposition.", cue: "t1" },
          { text: "**Pronoun test**: a phrasal verb puts the pronoun in the middle: _She looked it up._ A preposition keeps its pronoun after it: _She looked up it_ (up the chimney).", cue: "t3" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.rows("t", [
            ["slotIn", "She looked the word up.  ✓ particle moves", { hl: "up", ink: "accent2" }],
            ["upChimney", "✗ She looked the chimney up.  (preposition)", { ink: "trouble" }],
            ["dictionary", "She looked it up.  (pronoun in the middle)", { hl: "it" }],
            ["upChimney", "She looked up it.  (= up the chimney)", { hl: "up it" }],
          ], { y: 90, gap: 125 }),
        ],
      },
      {
        id: "pairs",
        title: "More pairs",
        alt: "Rows: She ran up a huge bill (phrasal: ran it up) vs She ran up the hill (preposition: ran up it). He turned down the offer (phrasal: refused) vs He turned down the lane (preposition).",
        say: [
          { text: "_She ran up a huge bill_ (phrasal: she ran it up, meaning she built up debt) versus _She ran up the hill_ (preposition: the path).", cue: "p1" },
          { text: "_He turned down the offer_ (phrasal: refused it, turned it down) versus _He turned down the lane_ (preposition: the direction he went).", cue: "p3" },
        ],
        actions: [
          K.clear("clear-2"),
          ...K.rows("p", [
            ["coin", "She ran up a huge bill.  (ran it up)", { hl: "ran up" }],
            ["hillUp", "She ran up the hill.  (the path)", { hl: "up the hill" }],
            ["cross", "He turned down the offer.  (refused it)", { hl: "turned down" }],
            ["turnOnto", "He turned down the lane.  (the direction)", { hl: "down the lane" }],
          ], { y: 90, gap: 125 }),
        ],
      },
      {
        id: "check",
        title: "Check: which is phrasal?",
        alt: "The pairs remain on the board.",
        say: [{ text: "An original practice question." }],
        actions: [],
        check: {
          id: "phrasal-q1",
          source: "original",
          skill: "particle vs preposition",
          prompt: "In which sentence is the bold small word a particle (part of a phrasal verb), not a preposition? (1) He got **over** the wall. (2) He got **over** his illness. (3) She took **off** her coat.",
          options: [
            { text: "Only (3)", correct: true, why: "Correct. _She took her coat off_ works, so _off_ is a particle. In (2), _get over_ means recover, but _over_ stays before its object (_got over it_, not _got it over_): it is a prepositional verb. In (1) _over the wall_ is a plain path." },
            { text: "(2) and (3)", misconception: "particle-preposition", why: "Apply the pronoun test to (2): _He got over it,_ never _He got it over._ The small word stays before its object, so it is a preposition, even though the meaning is idiomatic." },
            { text: "Only (1)", misconception: "particle-preposition", why: "In (1), _over the wall_ shows a real path: a preposition and its noun." },
          ],
        },
      },
    ],
  });
})();
