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
        alt: "Rows: In addition to teaching, she writes novels. As well as teaching, she writes novels. Along with / together with.",
        say: [
          { text: "**In addition to** and **as well as** add something. Both take a noun or -ing: _In addition to teaching, she writes novels. As well as teaching, she writes._", cue: "a2" },
          { text: "**Along with** and **together with** add a companion: _The minister, along with his aides, visited the site._", cue: "a3" },
        ],
        actions: K.lines("a", [["In addition to teaching, she writes.", { hl: "In addition to" }], ["As well as teaching, she writes.", { hl: "As well as" }], ["along with · together with", { ink: "accent2" }]], { y: 170, gap: 115, size: 38 }),
      },
      {
        id: "agree",
        title: "The verb agrees with the first subject",
        alt: "The President, as well as the ministers, was present. An arrow joins President to was. The added phrase is bracketed off.",
        say: [
          { text: "A phrase added with _as well as, along with, together with, in addition to_ does not change the subject.", cue: "g1" },
          { text: "So the verb agrees with the first noun: _The President, as well as the ministers, **was** present._ Not _were._", cue: "g2" },
        ],
        actions: [K.clear("clear-1"), ...K.lines("g", [["The President, as well as the ministers, was present.", { hl: "was", size: 32 }], ["subject = The President (singular)", { ink: "accent2", size: 30 }]], { y: 220, gap: 110 })],
      },
      {
        id: "except",
        title: "Apart from: either way",
        alt: "Two meanings of apart from: Apart from Ali, everyone came (except). Apart from Urdu, she speaks Pashto (in addition). With the exception of always means except.",
        say: [
          { text: "**Apart from** (American also _aside from_) can mean _except_: _Apart from Ali, everyone came._", cue: "e1" },
          { text: "Or _in addition to_: _Apart from Urdu, she speaks Pashto._ The context decides. **With the exception of** always means except.", cue: "e2" },
        ],
        actions: [K.clear("clear-2"), ...K.lines("e", [["Apart from Ali, everyone came. = except", { hl: "Apart from", size: 34 }], ["Apart from Urdu, she speaks Pashto. = in addition", { hl: "Apart from", size: 34 }], ["with the exception of = except", { ink: "accent2" }]], { y: 170, gap: 115, size: 36 })],
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
