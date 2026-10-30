/* Lesson 0.2: the same word as preposition, adverb particle or conjunction. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "prep-adverb-conjunction",
    title: "Same word, different job",
    phase: 1,
    unit: "p1-foundations",
    level: "Beginner to intermediate",
    minutes: 9,
    summary:
      "After, before, since and until are prepositions before a noun and conjunctions before a clause. Because of is a preposition, because is a conjunction. Words like up and in can also be adverbs or particles. The job decides the grammar.",
    objectives: [
      "Tell a preposition (+ noun) from a conjunction (+ clause): after lunch, after he left.",
      "Use because of + noun and because + clause, and avoid because of it rained.",
      "Recall the adverb and particle jobs from earlier lessons.",
    ],
    steps: [
      {
        id: "noun-clause",
        title: "A noun or a clause after it?",
        alt: "Two rows. After lunch: after plus a noun, labelled preposition. After he left: after plus a clause with its own verb, labelled conjunction.",
        say: [
          { text: "Look at what comes after the word. A **noun** (or pronoun, or -ing form) means it is a **preposition**: _after lunch, before the meeting, since 2015._", cue: "r1" },
          { text: "A **clause** (a subject and its own verb) means it is a **conjunction**, joining two clauses: _after he left, before the meeting started, since we moved here._", cue: "r2" },
        ],
        actions: [
          { do: "write", id: "r1", text: "after lunch → preposition", x: 480, y: 160, size: 40, anchor: "middle", gap: 400 },
          { do: "highlight", id: "r1-h", target: "r1", word: "lunch", style: "underline", ink: "accent2" },
          { do: "write", id: "r1l", text: "+ noun", x: 480, y: 215, size: 28, ink: "accent2", anchor: "middle" },
          { do: "write", id: "r2", text: "after he left → conjunction", x: 480, y: 330, size: 40, anchor: "middle", gap: 600 },
          { do: "highlight", id: "r2-h", target: "r2", word: "he left", style: "underline", ink: "trouble" },
          { do: "write", id: "r2l", text: "+ clause (subject + verb)", x: 480, y: 385, size: 28, ink: "trouble", anchor: "middle" },
        ],
      },
      {
        id: "check-before",
        title: "Check: which job?",
        alt: "The two rows remain on the board.",
        say: [{ text: "Is there a subject and verb after the word?" }],
        actions: [],
        check: {
          id: "pac-q1",
          source: "original",
          skill: "preposition vs conjunction",
          prompt: "In which sentence is before a conjunction?",
          options: [
            { text: "Before the session began, the Speaker called for silence.", correct: true, why: "Correct. _The session began_ has a subject and verb, so before joins two clauses: a conjunction." },
            { text: "Before the session, the Speaker called for silence.", misconception: "prep-vs-conj", why: "_The session_ is just a noun phrase, so before is a preposition here." },
            { text: "Before voting, members read the bill.", misconception: "prep-vs-conj", why: "_Voting_ is an -ing form, which a preposition can take. Before is a preposition here." },
          ],
        },
      },
      {
        id: "because",
        title: "Because of and because",
        alt: "Two correct sentences: The match was cancelled because of the rain; The match was cancelled because it rained. Crossed out: because of it rained.",
        say: [
          { text: "**Because of** is a preposition: it needs a noun. _The match was cancelled because of the rain._", cue: "b1" },
          { text: "**Because** is a conjunction: it needs a clause. _The match was cancelled because it rained._", cue: "b2" },
          { text: "Mixing them, _because of it rained_, is a very common error. The same goes for _despite_ (+ noun) and _although_ (+ clause).", cue: "b3" },
        ],
        actions: [
          K.clear("clear-1"),
          { do: "write", id: "b1", text: "because of the rain ✓ (+ noun)", x: 480, y: 150, size: 38, anchor: "middle", gap: 400 },
          { do: "write", id: "b2", text: "because it rained ✓ (+ clause)", x: 480, y: 250, size: 38, anchor: "middle", gap: 400 },
          { do: "write", id: "b3", text: "✗ because of it rained", x: 480, y: 370, size: 38, ink: "trouble", anchor: "middle", gap: 500 },
          { do: "write", id: "b4", text: "despite + noun · although + clause", x: 480, y: 470, size: 32, ink: "accent2", anchor: "middle", gap: 500 },
        ],
      },
      {
        id: "check-because",
        title: "Check: sentence correction",
        alt: "The because examples remain on the board.",
        say: [{ text: "An original practice item in CSS sentence-correction style." }],
        actions: [],
        check: {
          id: "pac-q2",
          source: "original",
          skill: "because of + noun",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "Exports fell because of the strong rupee.", correct: true, why: "Correct. _Because of_ + a noun phrase." },
            { text: "Exports fell because of the rupee was strong.", misconception: "prep-vs-conj", why: "_The rupee was strong_ is a clause, which needs _because_, not _because of._" },
            { text: "Exports fell despite of the strong rupee.", misconception: "prep-vs-conj", why: "_Despite_ never takes _of_ (that is _in spite of_), and the meaning is wrong here too." },
          ],
        },
      },
      {
        id: "particle",
        title: "Adverb and particle jobs",
        alt: "Three sentences: Come in (adverb, no object); in the room (preposition); give in, meaning surrender (particle of a phrasal verb).",
        say: [
          { text: "From earlier lessons: a word with no object is working as an **adverb**: _Come in. Let's go outside._", cue: "j1" },
          { text: "With an object it is a **preposition**: _in the room._", cue: "j2" },
          { text: "As part of a phrasal verb with its own meaning it is a **particle**: _give in_ means surrender.", cue: "j3" },
        ],
        actions: [K.clear("clear-2"), ...K.lines("j", [["Come in. → adverb", { hl: "in" }], ["in the room → preposition", { hl: "in" }], ["give in (surrender) → particle", { hl: "give in", hlStyle: "underline", hlInk: "accent2" }]], { y: 160, gap: 110, size: 38 })],
      },
      {
        id: "summary",
        title: "The summary",
        alt: "Preposition + noun; conjunction + clause; adverb with nothing after it; particle inside a phrasal verb.",
        say: [{ text: "The job decides: **preposition** + noun, **conjunction** + clause, **adverb** alone, **particle** inside a phrasal verb.", cue: "c4" }],
        actions: [K.clear("clear-3"), ...K.lines("c", ["preposition + noun: after lunch", "conjunction + clause: after he left", "adverb alone: come in", "particle: give in"], { y: 140, gap: 90 })],
      },
    ],
  });
})();
