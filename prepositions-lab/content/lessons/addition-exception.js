/* Lesson 1.54: addition and exception: in addition to, as well as, along with, apart from, with the exception of. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "addition-exception",
    title: "In addition to, as well as, apart from",
    phase: 1,
    unit: "p1-complex",
    level: "Advanced",
    minutes: 9,
    summary:
      "In addition to, as well as, along with and together with add something; with the exception of removes it; apart from can do either. A key exam point: the verb agrees with the first subject, not with what as well as adds.",
    objectives: [
      "Use in addition to and as well as + noun or -ing.",
      "Make the verb agree with the first subject: The President, as well as the ministers, was present.",
      "Know that apart from can mean except or in addition to, and with the exception of means except.",
    ],
    steps: [
      {
        id: "add",
        title: "Adding",
        alt: "Three pictures: a book plus a pen (in addition to teaching, she writes; as well as), and a leader with companions (along with, together with).",
        say: [
          { text: "**In addition to** and **as well as** add something, like a plus sign: _In addition to teaching, she writes novels. As well as teaching, she writes._", cue: "a1" },
          { text: "**Along with** and **together with** add a companion beside the main person: _The minister, along with his aides, visited the site._", cue: "a3" },
        ],
        actions: [
          PLAB.kit.clear("clear-rd-add"),
          ...PLAB.kit.grid("a", [
            ["addMore", "In addition to teaching, ...", "adds a second thing: + noun or -ing", { hl: "In addition to" }],
            ["addMore", "As well as teaching, ...", "the same, a little less formal", { hl: "As well as" }],
            ["leaderGroup", "along with his aides", "a companion beside the main person", { hl: "along with" }],
          ]),
        ],
      },
      {
        id: "agree",
        title: "The verb agrees with the first subject",
        alt: "The President, as well as the ministers, was present. An arrow joins President to was. The added phrase is bracketed off.",
        say: [
          { text: "The President is the subject; the ministers are only added alongside, inside brackets. A phrase added with _as well as, along with, together with_ does not change the subject.", cue: "g1" },
          { text: "So the verb agrees with the first noun: _The President, as well as the ministers, **was** present._ Not _were._", cue: "g2" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.pic("lg", "leaderGroup", 330, 20, 2.1),
          ...PLAB.kit.lines("g", [["The President, as well as the ministers, was present.", { hl: "was", size: 30 }], ["subject = The President (singular)", { ink: "accent2", size: 30 }]], { y: 300, gap: 100 }),
        ],
      },
      {
        id: "except",
        title: "Apart from: either way",
        alt: "Two meanings of apart from: Apart from Ali, everyone came (except). Apart from Urdu, she speaks Pashto (in addition). With the exception of always means except.",
        say: [
          { text: "**Apart from** can take one out of a group: _Apart from Ali, everyone came_ (= except).", cue: "e1" },
          { text: "Or add one more: _Apart from Urdu, she speaks Pashto_ (= in addition). The context decides. **With the exception of** always means except.", cue: "e2" },
        ],
        actions: [
          PLAB.kit.clear("clear-2"),
          ...PLAB.kit.panels("e", [
            ["groupOut", "Apart from Ali, everyone came.", "= except", { hl: "Apart from", size: 26 }],
            ["plus", "Apart from Urdu, she speaks Pashto.", "= in addition", { hl: "Apart from", size: 26 }],
          ]),
          { do: "write", id: "e3", text: "with the exception of = except", x: 480, y: 470, size: 32, ink: "accent2", anchor: "middle", gap: 500 },
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence with a gap teaching, she writes novels., then the candidates with pictures: In addition to (right: adds a second thing); Except (correct English but a different meaning: teaching taken away); Instead of (correct English but a different meaning: teaching replaced). Rule: in addition to, as well as = adding; except = taking away \u00b7 instead of = replacing.",
        say: [
          { text: "Fill the gap: \u2026 teaching, she writes novels. What does the sentence want to say? The answer is **In addition to**: adds a second thing.", cue: "why1" },
          { text: "Why not the others? **Except** is correct English, but it would mean teaching taken away. That is not what this sentence says. **Instead of** is correct English, but it would mean teaching replaced. That is not what this sentence says.", cue: "why2" },
          { text: "The rule: in addition to, as well as = adding; except = taking away \u00b7 instead of = replacing.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "____ teaching, she writes novels.", [["addMore", "In addition to", true, "adds a second | thing"], ["groupOut", "Except", "diff", "teaching taken | away"], ["swap", "Instead of", "diff", "teaching | replaced"]], ["in addition to, as well as = adding", "except = taking away \u00b7 instead of = replacing"]),
        ],
      },
      {
        id: "check",
        title: "Check: agreement",
        alt: "The apart from rows remain on the board.",
        say: [{ text: "An original practice item: find the real subject." }],
        actions: [],
        check: {
          id: "addition-q1",
          source: "original",
          skill: "agreement with as well as",
          prompt: "The Governor, along with his advisers, ___ expected at the ceremony.",
          options: [
            { text: "is", correct: true, why: "Correct. The subject is _the Governor_; _along with his advisers_ is extra. Singular: _is._" },
            { text: "are", misconception: "agreement-addition", why: "The added phrase does not make the subject plural. _The Governor ... is._" },
            { text: "were", misconception: "agreement-addition", why: "Plural and past. The subject is singular and the sentence is present: _is._" },
          ],
        },
      },
    ],
  });
})();
