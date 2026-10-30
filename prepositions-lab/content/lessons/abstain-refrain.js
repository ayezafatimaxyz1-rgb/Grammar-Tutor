/* Lesson 2.9: formal verbs: abstain from, refrain from, adhere to, comply with, conform to, dispense with. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "abstain-refrain",
    title: "Refrain from, adhere to, comply with",
    phase: 2,
    unit: "p2-verb",
    level: "Advanced",
    minutes: 8,
    summary:
      "Formal verbs that CSS essays and precis often need. Holding back takes from (abstain from, refrain from). Sticking to a line takes to (adhere to, conform to). Acting together with a rule takes with (comply with). Doing without takes with too (dispense with).",
    objectives: [
      "Use abstain from, refrain from + -ing, adhere to, conform to and comply with correctly in formal writing.",
      "Understand dispense with as do without or get rid of.",
    ],
    steps: [
      {
        id: "from",
        title: "Holding back FROM",
        alt: "A person stepping back, with an arrow pointing away from a stop sign. Sentences: Please refrain from smoking. Three members abstained from voting.",
        say: [
          { text: "Picture a person who could go forward but chooses to step back. **From** marks the thing they keep away from.", cue: "pic-0-0" },
          { text: "**Refrain from** + -ing is a polite formal request: _Passengers are requested to refrain from smoking._", cue: "s1" },
          { text: "**Abstain from** is choosing not to take part, especially in a vote: _Three members abstained from voting._", cue: "s2" },
        ],
        actions: [
          ...K.pic("pic", "holdBack", 340, 40, 2),
          { do: "write", id: "s1", text: "Please refrain from smoking.", x: 480, y: 320, size: 40, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s1-h", target: "s1", word: "refrain from" },
          { do: "write", id: "s2", text: "Three members abstained from voting.", x: 480, y: 410, size: 36, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s2-h", target: "s2", word: "abstained from" },
        ],
      },
      {
        id: "to-with",
        title: "Sticking TO a line, acting WITH a rule",
        alt: "Three panels. Adhere to: a person walking along a thick line. Conform to: a shape fitting a mould. Comply with: a person standing beside a rule document.",
        say: [
          { text: "**Adhere** first meant stick, like glue. You stick **to** a line and do not leave it: _adhere to the principles of the Constitution._", cue: "t1" },
          { text: "**Conform to** is fitting the shape of a mould, a standard or a norm: _The building does not conform to safety standards._", cue: "t2" },
          { text: "**Comply with** is acting together with a rule or an order, doing what it says: _All banks must comply with the new regulations._", cue: "t3" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.panels("t", [
            ["stickTo", "adhere to principles", "stick to the line", { hl: "to" }],
            ["fitMould", "conform to standards", "fit the mould", { hl: "to" }],
            ["complyWith", "comply with rules", "act together with them", { hl: "with" }],
          ], { y: 70 }),
        ],
      },
      {
        id: "dispense",
        title: "Dispense with",
        alt: "An item thrown out of a box with a cross. Sentence: Let us dispense with the formalities (do without them). Note: comply with, never comply to.",
        say: [
          { text: "**Dispense with** means do without something, or get rid of it because it is not needed: _Let us dispense with the formalities._", cue: "d1" },
          { text: "Watch the pairs: _comply with_ (never _comply to_), _adhere to_ (never _adhere with_), _refrain from_ (never _refrain to_).", cue: "d2" },
        ],
        actions: [
          K.clear("clear-2"),
          ...K.pic("dp", "dispense", 340, 30, 2),
          { do: "write", id: "d1", text: "Let us dispense with the formalities.", x: 480, y: 300, size: 38, anchor: "middle", gap: 400 },
          { do: "highlight", id: "d1-h", target: "d1", word: "dispense with" },
          { do: "write", id: "d1b", text: "= do without them", x: 480, y: 360, size: 28, ink: "muted", anchor: "middle" },
          { do: "write", id: "d2", text: "✗ comply to · ✗ adhere with · ✗ refrain to smoke", x: 480, y: 460, size: 32, ink: "trouble", anchor: "middle", gap: 400 },
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence Please refrain with a gap smoking., then the candidates with pictures: from (right: holding back from it); to (wrong: to = moving towards; refrain is moving away); of (wrong: of = belonging; nothing belongs here). Rule: refrain from, abstain from + -ing; comply with \u00b7 adhere to.",
        say: [
          { text: "Fill the gap: Please refrain \u2026 smoking. The answer is **from**: holding back from it.", cue: "why1" },
          { text: "Why not the others? **to**: to = moving towards; refrain is moving away. **of**: of = belonging; nothing belongs here.", cue: "why2" },
          { text: "The rule: refrain from, abstain from + -ing; comply with \u00b7 adhere to.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "Please refrain ____ smoking.", [["holdBack", "from", true, "holding back | from it"], ["arrowR", "to", false, "to = moving towards; | refrain is moving away"], ["cross", "of", false, "of = belonging; nothing | belongs here"]], ["refrain from, abstain from + -ing", "comply with \u00b7 adhere to"]),
        ],
      },
      {
        id: "check",
        title: "Check: formal writing",
        alt: "The board remains.",
        say: [{ text: "An original practice question in formal style." }],
        actions: [],
        check: {
          id: "formal-verbs-q1",
          source: "original",
          skill: "comply with",
          prompt: "Every department is required to ___ the instructions issued by the Establishment Division.",
          options: [
            { text: "comply with", correct: true, why: "Correct. You act together _with_ a rule or an instruction." },
            { text: "comply to", misconception: "formal-verb-preps", why: "_Comply to_ is a common error, perhaps from _conform to._ Use _comply with._" },
            { text: "adhere with", misconception: "formal-verb-preps", why: "_Adhere_ takes _to_: you stick _to_ something." },
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
          id: "formal-verbs-q2",
          source: "original",
          skill: "refrain from + -ing",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "Members should refrain from making personal remarks.", correct: true, why: "Correct. _Refrain from_ + -ing." },
            { text: "Members should refrain to make personal remarks.", misconception: "formal-verb-preps", why: "_Refrain_ takes _from_ + -ing: holding back _from_ an action." },
            { text: "Members should refrain making personal remarks.", misconception: "formal-verb-preps", why: "The preposition _from_ cannot be dropped." },
          ],
        },
      },
    ],
  });
})();
