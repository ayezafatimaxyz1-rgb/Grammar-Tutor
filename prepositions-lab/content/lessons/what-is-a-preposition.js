/* Lesson 0.1: what a preposition is. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "what-is-a-preposition",
    title: "What a preposition is",
    phase: 1,
    unit: "p1-foundations",
    level: "Beginner",
    minutes: 8,
    summary:
      "Every preposition links two things: the thing we are talking about and a reference point. The preposition names the relationship. Together with its object it forms a prepositional phrase, which can describe a noun or a verb.",
    objectives: [
      "Find the thing, the reference point and the relationship in a sentence.",
      "Recognise a prepositional phrase: preposition + its object.",
      "See that relationships can be of place, time, direction, cause, means and more.",
    ],
    steps: [
      {
        id: "three-parts",
        title: "Three parts of every relationship",
        alt: "A cup resting on a table. Labels: the thing (the cup), the reference point (the table), and the relationship word on between them. Sentence: The cup is on the table.",
        say: [
          { text: "Here is a cup, and a table.", cue: "table" },
          { text: "The cup is **the thing** we are talking about. The table is **the reference point**: we describe where the cup is by comparing it with the table.", cue: "l-ref" },
          { text: "The small word that names the relationship between them is the **preposition**: _The cup is on the table._", cue: "s1" },
        ],
        actions: [
          { do: "draw", id: "table", shape: "group", width: 4, dur: 1200, parts: [{ shape: "line", from: [330, 280], to: [630, 280] }, { shape: "line", from: [355, 280], to: [355, 380] }, { shape: "line", from: [605, 280], to: [605, 380] }] },
          { do: "draw", id: "cup", shape: "group", ink: "accent", dur: 700, parts: [{ shape: "line", from: [455, 215], to: [462, 278] }, { shape: "line", from: [462, 278], to: [500, 278] }, { shape: "line", from: [500, 278], to: [507, 215] }, { shape: "line", from: [455, 215], to: [507, 215] }] },
          { do: "write", id: "l-thing", text: "the thing", x: 200, y: 220, size: 30, ink: "accent", anchor: "middle", gap: 400 },
          { do: "draw", id: "a-thing", shape: "arrow", from: [270, 225], to: [440, 240], ink: "accent", dur: 500 },
          { do: "write", id: "l-ref", text: "the reference point", x: 790, y: 330, size: 30, ink: "accent2", anchor: "middle", gap: 400 },
          { do: "draw", id: "a-ref", shape: "arrow", from: [700, 320], to: [640, 295], ink: "accent2", dur: 500 },
          { do: "write", id: "s1", text: "The cup is on the table.", x: 480, y: 480, size: 44, anchor: "middle", gap: 500, dur: 1600 },
          { do: "highlight", id: "s1-h", target: "s1", word: "on" },
        ],
      },
      {
        id: "kinds",
        title: "Not only place",
        alt: "Five example phrases, each labelled with the kind of relationship: in Lahore (place), after lunch (time), to Karachi (direction), because of the rain (cause), by train (means).",
        say: [
          { text: "Place is only the beginning. Prepositions name many kinds of relationship.", cue: "k1" },
          { text: "Place, time, direction, cause and means: _in Lahore, after lunch, to Karachi, because of the rain, by train._", cue: "k5" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.lines("k", [
            ["in Lahore · place", { hl: "in" }],
            ["after lunch · time", { hl: "after" }],
            ["to Karachi · direction", { hl: "to" }],
            ["because of the rain · cause", { hl: "because of" }],
            ["by train · means", { hl: "by" }],
          ], { y: 110, gap: 80 }),
        ],
      },
      {
        id: "phrase",
        title: "The prepositional phrase",
        alt: "The phrase on the table bracketed, labelled preposition plus object. Two sentences: The book on the table is mine, where the phrase describes the book. She lives in Lahore, where the phrase tells where she lives.",
        say: [
          { text: "A preposition always has an **object** after it: the noun or pronoun it relates to. Together they make a **prepositional phrase**: _on the table, in 2025, with my brother._", cue: "p1" },
          { text: "The phrase can describe a noun, like an adjective: _The book **on the table** is mine_ (which book?).", cue: "p2" },
          { text: "Or it can describe the action, like an adverb: _She lives **in Lahore**_ (where?).", cue: "p3" },
        ],
        actions: [
          K.clear("clear-2"),
          { do: "write", id: "p1", text: "on the table = preposition + object", x: 480, y: 140, size: 38, anchor: "middle", gap: 400, dur: 1800 },
          { do: "highlight", id: "p1-h", target: "p1", word: "the table", style: "underline", ink: "accent2" },
          { do: "write", id: "p2", text: "The book on the table is mine.", x: 480, y: 270, size: 38, anchor: "middle", gap: 500 },
          { do: "highlight", id: "p2-h", target: "p2", word: "on the table" },
          { do: "write", id: "p2l", text: "describes the book (which book?)", x: 480, y: 325, size: 28, ink: "muted", anchor: "middle" },
          { do: "write", id: "p3", text: "She lives in Lahore.", x: 480, y: 430, size: 38, anchor: "middle", gap: 500 },
          { do: "highlight", id: "p3-h", target: "p3", word: "in Lahore" },
          { do: "write", id: "p3l", text: "describes the action (where?)", x: 480, y: 485, size: 28, ink: "muted", anchor: "middle" },
        ],
      },
      {
        id: "check-find",
        title: "Check: find the preposition",
        alt: "The two example sentences remain on the board.",
        say: [{ text: "Look for the word that relates one thing to another." }],
        actions: [],
        check: {
          id: "what-q1",
          source: "original",
          skill: "finding the preposition",
          prompt: "In “The keys are under the old mat”, which word is the preposition?",
          options: [
            { text: "under", correct: true, why: "Correct. _Under_ relates the keys (the thing) to the mat (the reference point)." },
            { text: "old", misconception: "word-class", why: "_Old_ is an adjective describing the mat. The relationship word is _under._" },
            { text: "are", misconception: "word-class", why: "_Are_ is the verb. The word linking keys and mat is _under._" },
          ],
        },
      },
      {
        id: "check-phrase",
        title: "Check: the whole phrase",
        alt: "The two example sentences remain on the board.",
        say: [{ text: "A phrase is the preposition plus its object." }],
        actions: [],
        check: {
          id: "what-q2",
          source: "original",
          skill: "prepositional phrases",
          prompt: "Which is the prepositional phrase in “The man with the blue umbrella waved at us”?",
          options: [
            { text: "with the blue umbrella", correct: true, why: "Correct. _With_ + its object _the blue umbrella_. It describes the man, like an adjective. (_At us_ is a second one.)" },
            { text: "the blue umbrella waved", misconception: "word-class", why: "This mixes the object with the verb. A prepositional phrase starts with the preposition: _with the blue umbrella._" },
            { text: "The man with", misconception: "word-class", why: "A preposition comes before its object, not after a noun on its own: _with the blue umbrella._" },
          ],
        },
      },
      {
        id: "summary",
        title: "The summary",
        alt: "The thing, the preposition, the reference point. A prepositional phrase is the preposition plus its object, and can describe a noun or an action.",
        say: [{ text: "Every preposition links **a thing** to **a reference point** and names the relationship. With its object it makes a **phrase** that describes a noun or an action.", cue: "c2" }],
        actions: [K.clear("clear-3"), ...K.lines("c", ["thing + preposition + reference point", "preposition + object = phrase", "describes a noun or an action"], { y: 160, gap: 95, size: 36 })],
      },
    ],
  });
})();
