/* Lesson 2.12: feelings: interested in, afraid of, fond of, keen on, angry with/at/about. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "feelings",
    title: "Interested in, afraid of, angry with",
    phase: 2,
    unit: "p2-adjective",
    level: "Intermediate",
    minutes: 9,
    summary:
      "Adjectives of feeling choose a preposition that shows how the feeling meets its object: interested in (drawn inside a subject), afraid of, fond of, proud of, tired of (of marks the source of the feeling), keen on (eager, leaning on a goal), and angry with a person but angry at or about a situation.",
    objectives: [
      "Use interested in, afraid of, fond of, proud of, tired of and keen on.",
      "Choose angry with (or at) a person and angry about (or at) a situation.",
    ],
    steps: [
      {
        id: "in",
        title: "Interested IN: drawn inside a subject",
        alt: "A person inside an area, reading a book. Sentences: She is interested in history. Also: involved in, absorbed in, engaged in.",
        say: [
          { text: "When something interests you, your attention goes inside it, like walking into a field and staying there. So **interested in**: _She is interested in history._", cue: "pic-0-0" },
          { text: "The same picture gives _involved in, absorbed in, engaged in_: you are inside the activity. A verb after **in** takes -ing: _interested in joining the civil service._", cue: "s2" },
        ],
        actions: [
          ...K.pic("pic", "absorbedIn", 340, 30, 2),
          { do: "write", id: "s1", text: "She is interested in history.", x: 480, y: 300, size: 40, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s1-h", target: "s1", word: "interested in" },
          { do: "write", id: "s2", text: "involved in · absorbed in · interested in joining", x: 480, y: 390, size: 32, ink: "accent2", anchor: "middle", gap: 400 },
        ],
      },
      {
        id: "of",
        title: "OF: where the feeling comes from",
        alt: "Rows: afraid of the dark (a person backing away from a threat); fond of books (a heart and a book); proud of her son; tired of waiting.",
        say: [
          { text: "Many feeling adjectives take **of**, which names the source the feeling comes from. _He is afraid of the dark:_ the fear comes from the dark.", cue: "o1" },
          { text: "_She is fond of books. They are proud of their son. I am tired of waiting._ Also _ashamed of, jealous of, sure of, aware of._", cue: "o2" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.rows("o", [
            ["afraidOf", "He is afraid of the dark.", { hl: "afraid of" }],
            ["fondOf", "She is fond of books.", { hl: "fond of" }],
            ["congratulate", "They are proud of their son.", { hl: "proud of" }],
            ["clock", "I am tired of waiting.", { hl: "tired of" }],
          ], { y: 90, gap: 125 }),
        ],
      },
      {
        id: "keen-angry",
        title: "Keen on, angry with, angry about",
        alt: "Left: an eye aiming at a target, labelled keen on cricket. Right: an angry face, labelled angry with him (a person), angry about the delay (a situation).",
        say: [
          { text: "**Keen on** is eagerness leaning on its goal, the same **on** as _intent on, bent on_: _He is keen on cricket._ (_keen to_ + verb also works: _keen to help._)", cue: "k1" },
          { text: "**Angry** depends on what follows. A person: _angry with him_ (or _at him_). A situation: _angry about the delay_ (or _at the delay_).", cue: "k2" },
          { text: "Never _angry on him._ The same split works for _annoyed with_ someone and _annoyed about_ something.", cue: "w" },
        ],
        actions: [
          K.clear("clear-2"),
          ...K.panels("k", [
            ["aimGoal", "keen on cricket", "eager, leaning on a goal", { hl: "on" }],
            ["angryFace", "angry with him · about the delay", "person: with · situation: about", { hl: "with" }],
          ], { y: 60 }),
          { do: "write", id: "w", text: "✗ angry on him · ✗ interested about history", x: 480, y: 470, size: 32, ink: "trouble", anchor: "middle", gap: 400 },
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence She is interested with a gap history., then the candidates with pictures: in (right: attention goes inside the subject); on (wrong: on = a surface or topic: a book on history); about (wrong: about goes with worried, angry). Rule: interested in \u00b7 afraid of \u00b7 keen on; angry with a person, about a situation.",
        say: [
          { text: "Fill the gap: She is interested \u2026 history. What does the sentence want to say? The answer is **in**: attention goes inside the subject.", cue: "why1" },
          { text: "Why not the others? **on**: on = a surface or topic: a book on history. **about**: about goes with worried, angry.", cue: "why2" },
          { text: "The rule: interested in \u00b7 afraid of \u00b7 keen on; angry with a person, about a situation.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "She is interested ____ history.", [["absorbedIn", "in", true, "attention goes | inside the subject"], ["pressOn", "on", false, "on = a surface or topic: | a book on history"], ["aboutCircle", "about", false, "about goes with | worried, angry"]], ["interested in \u00b7 afraid of \u00b7 keen on", "angry with a person, about a situation"]),
        ],
      },
      {
        id: "check",
        title: "Check: choose the preposition",
        alt: "The board remains.",
        say: [{ text: "An original practice question." }],
        actions: [],
        check: {
          id: "feelings-q1",
          source: "original",
          skill: "angry with / about",
          prompt: "The citizens were angry ___ the officials and angry ___ the shortage of water.",
          options: [
            { text: "with … about", correct: true, why: "Correct. A person takes _with_ (or _at_); a situation takes _about_ (or _at_)." },
            { text: "on … on", misconception: "feeling-adjectives", why: "_Angry on_ is a common transfer error. Use _with_ for people and _about_ for situations." },
            { text: "about … with", misconception: "feeling-adjectives", why: "Reversed. People take _with_; the situation takes _about._" },
          ],
        },
      },
      {
        id: "check-2",
        title: "Check: sentence correction",
        alt: "The board remains.",
        say: [{ text: "One more." }],
        actions: [],
        check: {
          id: "feelings-q2",
          source: "original",
          skill: "interested in + -ing",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "Many young graduates are interested in joining the civil service.", correct: true, why: "Correct. _Interested in_ + -ing." },
            { text: "Many young graduates are interested to join in the civil service.", misconception: "feeling-adjectives", why: "_Interested to_ + verb is used only for learning something (_interested to hear_). For a career goal, use _interested in joining._" },
            { text: "Many young graduates are interested for joining the civil service.", misconception: "feeling-adjectives", why: "_Interested_ takes _in_: your attention goes inside the subject." },
          ],
        },
      },
    ],
  });
})();
