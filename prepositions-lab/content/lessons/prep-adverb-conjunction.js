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
          { text: "Look at what comes after the word. **After lunch**: after is followed by a thing, a noun. Then it is a **preposition**. Same for _before the meeting, since 2015._", cue: "r1" },
          { text: "**After he left**: after is followed by a whole event with its own subject and verb (_he left_). Then it is a **conjunction**, joining two clauses.", cue: "r2" },
        ],
        actions: [
          ...PLAB.kit.panels("r", [
            ["afterLunch", "after lunch", "+ noun → preposition", { hl: "after" }],
            ["personLeft", "after he left", "+ clause → conjunction", { hl: "after" }],
          ]),
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
          { text: "**Because of** is a preposition: it needs a thing. The cloud is the thing that caused the cancellation: _cancelled because of the rain._", cue: "b1" },
          { text: "**Because** is a conjunction: it needs an event, a clause with its own verb. The cloud raining is the event: _cancelled because it rained._", cue: "b2" },
          { text: "Mixing them, _because of it rained_, is a very common error. The same pair: _despite_ + noun, _although_ + clause.", cue: "b3" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.panels("b", [
            ["cloud", "because of the rain", "+ noun", { hl: "because of" }],
            ["rain", "because it rained", "+ clause", { hl: "because" }],
          ]),
          { do: "write", id: "b3", text: "✗ because of it rained", x: 480, y: 440, size: 36, ink: "trouble", anchor: "middle", gap: 500 },
          { do: "write", id: "b4", text: "despite + noun · although + clause", x: 480, y: 510, size: 30, ink: "accent2", anchor: "middle", gap: 400 },
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
          { text: "The same little word can do three jobs. _Come in_: the arrow goes through the door, but no object is named. Adverb.", cue: "j1" },
          { text: "_In the room_: the dot is inside a named thing, the room. Preposition.", cue: "j2" },
          { text: "_Give in_: no direction at all. Raising a white flag means surrender, and _in_ is part of the phrasal verb. Particle.", cue: "j3" },
        ],
        actions: [
          PLAB.kit.clear("clear-2"),
          ...PLAB.kit.panels("j", [
            ["enterRoom", "Come in.", "adverb: no object", { hl: "in" }],
            ["dotIn", "in the room", "preposition + object", { hl: "in" }],
            ["flag", "give in (surrender)", "particle", { hl: "give in" }],
          ]),
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence We stayed at home with a gap the rain., then the candidates with pictures: because of (right: + a noun); because (wrong: + a clause: because it rained); although (wrong: shows contrast, not cause). Rule: because of + noun; because + clause.",
        say: [
          { text: "Fill the gap: We stayed at home \u2026 the rain. What does the sentence want to say? The answer is **because of**: + a noun.", cue: "why1" },
          { text: "Why not the others? **because**: + a clause: because it rained. **although**: shows contrast, not cause.", cue: "why2" },
          { text: "The rule: because of + noun; because + clause.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "We stayed at home ____ the rain.", [["cloud", "because of", true, "+ a noun"], ["rain", "because", false, "+ a clause: | because it rained"], ["different", "although", false, "shows contrast, | not cause"]], ["because of + noun", "because + clause"]),
        ],
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
