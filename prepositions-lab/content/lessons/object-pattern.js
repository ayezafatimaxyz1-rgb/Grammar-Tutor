/* Lesson 2.7: verb + object + preposition: prevent from, accuse of, congratulate on, blame for/on, provide with/for. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "object-pattern",
    title: "Prevent from, accuse of, blame for",
    phase: 2,
    unit: "p2-verb",
    level: "Intermediate",
    minutes: 9,
    summary:
      "Some verbs take a person and then a preposition: prevent someone from (kept away from an action), accuse someone of and charge someone with (the wrongdoing), blame someone for or blame something on someone, congratulate someone on (an occasion), and provide someone with or provide something for someone.",
    objectives: [
      "Use the pattern verb + person + preposition + noun or -ing for prevent, stop, protect, accuse, charge, blame, congratulate, thank and provide.",
      "Switch correctly between blame someone for it and blame it on someone, and between provide someone with it and provide it for someone.",
    ],
    steps: [
      {
        id: "from",
        title: "Kept away FROM an action",
        alt: "An arrow stopped by a barrier. Sentences: The rain prevented us from playing. Also: stop someone from, protect someone from, discourage someone from.",
        say: [
          { text: "The pattern is: verb, then the person, then a preposition. Start with a barrier: the action wants to go forward, but it is held back.", cue: "pic-0-0" },
          { text: "**From** is the point you are kept away from: _The rain prevented us from playing._ The -ing form follows, because from is a preposition.", cue: "s1" },
          { text: "The same picture: _stop someone from, protect someone from, discourage someone from._", cue: "s2" },
        ],
        actions: [
          ...K.pic("pic", "barrierStop", 340, 40, 2),
          { do: "write", id: "s1", text: "The rain prevented us from playing.", x: 480, y: 320, size: 40, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s1-h", target: "s1", word: "from playing" },
          { do: "write", id: "s2", text: "stop · protect · discourage + someone + from", x: 480, y: 410, size: 32, ink: "accent2", anchor: "middle", gap: 400 },
        ],
      },
      {
        id: "blame",
        title: "Accuse of, charge with, blame for",
        alt: "A person pointing an arrow at another person, with a box marking the wrongdoing. Rows: accused him of theft; charged him with theft; blamed the driver for the accident; blamed the accident on the driver.",
        say: [
          { text: "**Accuse** someone **of** a wrongdoing: _They accused him of theft._ In court, **charge** someone **with** a crime: _He was charged with theft._", cue: "c1" },
          { text: "**Blame** has two orders. Person first: _blame the driver for the accident._ Thing first: _blame the accident on the driver._ The blame lands **on** the person.", cue: "c3" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.rows("c", [
            ["accuseOf", "They accused him of theft.", { hl: "of" }],
            ["gavel", "He was charged with theft.", { hl: "with" }],
            ["blame", "They blamed the driver for the accident.", { hl: "for" }],
            ["blame", "They blamed the accident on the driver.", { hl: "on" }],
          ], { y: 90, gap: 125 }),
        ],
      },
      {
        id: "congratulate-provide",
        title: "Congratulate on, provide with",
        alt: "Rows: congratulated her on her success (on an occasion); thanked them for their help; provided the villagers with clean water; provided clean water for the villagers.",
        say: [
          { text: "**Congratulate** someone **on** an occasion: _We congratulated her on her success._ Compare _thank_ someone **for** a reason: _thank them for their help._", cue: "d1" },
          { text: "**Provide** has two orders too. Person first takes **with**: _provided the villagers with clean water._ Thing first takes **for**: _provided clean water for the villagers._", cue: "d3" },
        ],
        actions: [
          K.clear("clear-2"),
          ...K.rows("d", [
            ["congratulate", "We congratulated her on her success.", { hl: "on" }],
            ["gift", "We thanked them for their help.", { hl: "for" }],
            ["giveTo", "provided the villagers with clean water", { hl: "with" }],
            ["giveTo", "provided clean water for the villagers", { hl: "for" }],
          ], { y: 90, gap: 125 }),
        ],
      },
      {
        id: "check",
        title: "Check: sentence correction",
        alt: "The board remains.",
        say: [{ text: "An original practice question." }],
        actions: [],
        check: {
          id: "object-pattern-q1",
          source: "original",
          skill: "congratulate on",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "The President congratulated the team on their victory.", correct: true, why: "Correct. _Congratulate_ someone _on_ an occasion." },
            { text: "The President congratulated the team for their victory.", misconception: "object-preps", why: "_For_ belongs with _thank._ _Congratulate_ takes _on._" },
            { text: "The President congratulated the team at their victory.", misconception: "object-preps", why: "_Congratulate at_ is not used. Use _on._" },
          ],
        },
      },
      {
        id: "check-2",
        title: "Check: choose the preposition",
        alt: "The board remains.",
        say: [{ text: "One more." }],
        actions: [],
        check: {
          id: "object-pattern-q2",
          source: "original",
          skill: "accuse of",
          prompt: "The opposition accused the government ___ misusing public funds.",
          options: [
            { text: "of", correct: true, why: "Correct. _Accuse_ someone _of_ + noun or -ing." },
            { text: "for", misconception: "object-preps", why: "_For_ goes with _blame_ (blame someone for), not _accuse._" },
            { text: "with", misconception: "object-preps", why: "_With_ goes with _charge_ (charged with a crime), not _accuse._" },
          ],
        },
      },
    ],
  });
})();
