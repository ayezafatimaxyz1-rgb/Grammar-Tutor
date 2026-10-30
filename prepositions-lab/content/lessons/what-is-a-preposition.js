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
          { do: "write", id: "l-ref", text: "the reference point", x: 780, y: 400, size: 30, ink: "accent2", anchor: "middle", gap: 400 },
          { do: "draw", id: "a-ref", shape: "arrow", from: [740, 370], to: [645, 300], ink: "accent2", dur: 500 },
          { do: "write", id: "s1", text: "The cup is on the table.", x: 480, y: 480, size: 44, anchor: "middle", gap: 500, dur: 1600 },
          { do: "highlight", id: "s1-h", target: "s1", word: "on" },
        ],
      },
      {
        id: "kinds",
        title: "Not only place",
        alt: "Five example phrases, each labelled with the kind of relationship: in Lahore (place), after lunch (time), to Karachi (direction), because of the rain (cause), by train (means).",
        say: [
          { text: "Place is only the beginning. Each picture shows a different kind of relationship a preposition can name.", cue: "k1" },
          { text: "**Place**: a dot inside an area, _in Lahore._ **Time**: an event after another on a time line, _after lunch._ **Direction**: an arrow heading to a point, _to Karachi._", cue: "k3" },
          { text: "**Cause**: the rain leads to the cancellation, _because of the rain._ **Means**: the thing you travel with, _by train._", cue: "k5" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.rows("k", [
            ["inCity", "in Lahore · place", { hl: "in" }],
            ["afterLunch", "after lunch · time", { hl: "after" }],
            ["reachDot", "to Karachi · direction", { hl: "to" }],
            ["rainCancel", "because of the rain · cause", { hl: "because of" }],
            ["train", "by train · means", { hl: "by" }],
          ], { y: 70, gap: 102, size: 32 }),
        ],
      },
      {
        id: "phrase",
        title: "The prepositional phrase",
        alt: "The phrase on the table bracketed, labelled preposition plus object. Two sentences: The book on the table is mine, where the phrase describes the book. She lives in Lahore, where the phrase tells where she lives.",
        say: [
          { text: "A preposition always has an **object** after it: the noun or pronoun it relates to. Together they make a **prepositional phrase**: _on the table._", cue: "p1" },
          { text: "The phrase can describe a noun, like an adjective. The book is the one lying on the table: _The book on the table is mine_ (which book?).", cue: "q1" },
          { text: "Or it can describe the action, like an adverb. The house sits inside the city: _She lives in Lahore_ (where?).", cue: "q2" },
        ],
        actions: [
          PLAB.kit.clear("clear-2"),
          { do: "write", id: "p1", text: "on the table = preposition + object", x: 480, y: 80, size: 34, anchor: "middle", gap: 400 },
          { do: "highlight", id: "p1-h", target: "p1", word: "the table", style: "underline", ink: "accent2" },
          ...PLAB.kit.panels("q", [
            ["bookTable", "The book on the table is mine.", "describes the book: which?", { hl: "on the table", size: 26 }],
            ["liveIn", "She lives in Lahore.", "describes the action: where?", { hl: "in Lahore", size: 26 }],
          ], { y: 130, k: 1.6 }),
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
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence The cup is with a gap the table., then the candidates with pictures: on (right: resting on its surface); in (wrong: inside the table); under (wrong: beneath it). Rule: the preposition shows how the thing sits; against the reference point.",
        say: [
          { text: "Fill the gap: The cup is \u2026 the table. The answer is **on**: resting on its surface.", cue: "why1" },
          { text: "Why not the others? **in**: inside the table. **under**: beneath it.", cue: "why2" },
          { text: "The rule: the preposition shows how the thing sits; against the reference point.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "The cup is ____ the table.", [["cupOnTable", "on", true, "resting on its | surface"], ["inDrawer", "in", false, "inside the table"], ["underTable", "under", false, "beneath it"]], ["the preposition shows how the thing sits", "against the reference point"]),
        ],
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
