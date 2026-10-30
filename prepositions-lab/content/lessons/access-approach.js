/* Lesson 2.20: access to, approach to, attitude to/towards, reaction to. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "access-approach",
    title: "Access to, approach to, attitude towards",
    phase: 2,
    unit: "p2-noun",
    level: "Intermediate",
    minutes: 7,
    summary:
      "These nouns describe a path or a direction towards something, so they take to: access to (a way in), approach to (a way of dealing with), attitude to or towards, reaction to, response to, contribution to, commitment to. The verb approach takes no preposition, and commitment to takes -ing.",
    objectives: [
      "Use access to, approach to, attitude to or towards, reaction to and response to.",
      "Remember approach the problem (verb) but an approach to the problem (noun), and commitment to + -ing.",
    ],
    steps: [
      {
        id: "path",
        title: "A path TO something",
        alt: "Left: an arrow passing through a gate to a box, labelled access to clean water (a way in). Right: a person on a curved path towards a problem, labelled an approach to the problem (a way of dealing with it).",
        say: [
          { text: "**Access** is a way in: the arrow passes through the gate and reaches the thing. _Millions lack access to clean water._", cue: "a1" },
          { text: "**Approach** is the path you take towards a problem: _We need a new approach to the energy crisis._", cue: "a2" },
          { text: "Remember: the noun takes **to**, but the verb does not: _approach the problem._", cue: "w" },
        ],
        actions: [
          ...K.panels("a", [
            ["accessTo", "access to clean water", "a way in", { hl: "to" }],
            ["approachTo", "an approach to the problem", "a way of dealing with it", { hl: "to" }],
          ], { y: 60 }),
          { do: "write", id: "w", text: "noun: an approach to it · verb: approach it", x: 480, y: 470, size: 30, ink: "accent2", anchor: "middle", gap: 400 },
        ],
      },
      {
        id: "towards",
        title: "Attitude, reaction, response, commitment",
        alt: "Rows: attitude to (or towards) women's education; the public reaction to the budget; a quick response to the crisis; commitment to improving schools (+ -ing).",
        say: [
          { text: "Feelings and responses aimed in a direction also take **to**: _attitude to_ (or **towards**) _women's education, the public reaction to the budget, a quick response to the crisis._", cue: "t1" },
          { text: "_Commitment to_ and _contribution to_ take a noun or -ing: _commitment to improving schools._", cue: "t4" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.rows("t", [
            ["attitude", "attitude to (towards) women's education", { hl: "attitude to", size: 30 }],
            ["faces", "the public reaction to the budget", { hl: "reaction to" }],
            ["qToA", "a quick response to the crisis", { hl: "response to" }],
            ["stickTo", "commitment to improving schools", { hl: "improving" }],
          ], { y: 90, gap: 125 }),
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence Millions lack access with a gap clean water., then the candidates with pictures: to (right: a way in, reaching it); of (wrong: of = a part of; access is a way in); for (wrong: for = who benefits). Rule: access to, approach to, response to; commitment to + -ing.",
        say: [
          { text: "Fill the gap: Millions lack access \u2026 clean water. The answer is **to**: a way in, reaching it.", cue: "why1" },
          { text: "Why not the others? **of**: of = a part of; access is a way in. **for**: for = who benefits.", cue: "why2" },
          { text: "The rule: access to, approach to, response to; commitment to + -ing.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "Millions lack access ____ clean water.", [["accessTo", "to", true, "a way in, | reaching it"], ["cross", "of", false, "of = a part of; access | is a way in"], ["giveTo", "for", false, "for = who | benefits"]], ["access to, approach to, response to", "commitment to + -ing"]),
        ],
      },
      {
        id: "check",
        title: "Check: choose the preposition",
        alt: "The board remains.",
        say: [{ text: "An original practice question." }],
        actions: [],
        check: {
          id: "access-q1",
          source: "original",
          skill: "access to",
          prompt: "Every citizen should have equal access ___ justice.",
          options: [
            { text: "to", correct: true, why: "Correct. Access is a way in, reaching _to_ the thing." },
            { text: "of", misconception: "noun-preps", why: "_Access of_ is not used. Use _access to._" },
            { text: "for", misconception: "noun-preps", why: "_For_ names who benefits (_access for disabled people_), but the thing reached takes _to._" },
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
          id: "access-q2",
          source: "original",
          skill: "commitment to + -ing",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "The government reaffirmed its commitment to eradicating polio.", correct: true, why: "Correct. _To_ is a preposition here, so the verb takes -ing." },
            { text: "The government reaffirmed its commitment to eradicate polio.", misconception: "to-plus-ing", why: "You will see this in newspapers, but careful formal usage treats _to_ here as a preposition: _commitment to eradicating._ In an exam, use -ing." },
            { text: "The government reaffirmed its commitment for eradicating polio.", misconception: "noun-preps", why: "_Commitment_ takes _to._" },
          ],
        },
      },
    ],
  });
})();
