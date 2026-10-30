/* Lesson 2.6: look at, look for, look after, look into, look forward to. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "look-family",
    title: "Look at, for, after, into, forward to",
    phase: 2,
    unit: "p2-verb",
    level: "Beginner",
    minutes: 9,
    summary:
      "One verb, five prepositions, five meanings, and each one follows its picture: at a point (look at), for a target you want (look for), after someone you guard (look after), into a box (look into: investigate), and forward along time to a future event (look forward to + -ing).",
    objectives: [
      "Match look at, look for, look after and look into to their pictures and meanings.",
      "Use look forward to + noun or -ing, never look forward to meet.",
    ],
    steps: [
      {
        id: "at-for",
        title: "Look at, look for",
        alt: "Left: an eye with a line to a dot, labelled look at the board (eyes on a point). Right: a magnifier and a question mark, labelled look for my keys (searching for something you want).",
        say: [
          { text: "**Look at**: your eyes travel to one point and stop there. _Look at the board._", cue: "a1" },
          { text: "**Look for**: you do not have it yet; you search for the thing you want. _I am looking for my keys._ **For** names the target, as in _apply for, wait for._", cue: "a2" },
        ],
        actions: K.panels("a", [
          ["eyeLook", "look at the board", "eyes go to a point", { hl: "at" }],
          ["searchQ", "look for my keys", "search for what you want", { hl: "for" }],
        ], { y: 60 }),
      },
      {
        id: "after-into",
        title: "Look after, look into",
        alt: "Left: an adult standing over two children with protecting arms, labelled look after the children (take care of). Right: an eye with an arrow going into a box, labelled look into the matter (investigate).",
        say: [
          { text: "**Look after** someone: you stay behind them like a guardian and keep them safe. It means take care of. _She looks after her grandmother._", cue: "b1" },
          { text: "**Look into** something: your eyes go inside the box to see what is there. It means investigate. _The police will look into the complaint._", cue: "b2" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.panels("b", [
            ["careFor", "look after the children", "take care of them", { hl: "after" }],
            ["lookInto", "look into the matter", "investigate it", { hl: "into" }],
          ], { y: 60 }),
        ],
      },
      {
        id: "forward-to",
        title: "Look forward to + -ing",
        alt: "A time line with a person at now, an eye looking ahead with an arrow to a star in the future. Sentences: I look forward to meeting you. Crossed out: I look forward to meet you.",
        say: [
          { text: "**Look forward to**: from now, your eyes travel forward along time to a happy event. _We look forward to the holidays._", cue: "pic-0-0" },
          { text: "Here **to** is a preposition, not part of an infinitive. So a verb after it takes -ing: _I look forward to meeting you._", cue: "s1" },
          { text: "_I look forward to meet you_ is one of the most common errors in letters. The same rule applies to _object to, be used to, with a view to._", cue: "s2" },
        ],
        actions: [
          K.clear("clear-2"),
          ...K.pic("pic", "lookAhead", 340, 30, 2),
          { do: "write", id: "s1", text: "I look forward to meeting you.", x: 480, y: 310, size: 40, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s1-h", target: "s1", word: "meeting" },
          { do: "write", id: "s2", text: "✗ I look forward to meet you.", x: 480, y: 390, size: 34, ink: "trouble", anchor: "middle", gap: 400 },
          { do: "write", id: "s3", text: "also: object to doing · be used to doing · with a view to doing", x: 480, y: 470, size: 26, ink: "accent2", anchor: "middle", gap: 400 },
        ],
      },
      {
        id: "why-not",
        title: "Why not the other one?",
        alt: "Left: an adult protecting two children, labelled She looks after her mother (takes care of her). Right: a magnifier and a question mark, labelled She looks for her mother, which would mean her mother is lost.",
        say: [
          { text: "_She looks after her mother_: she takes care of her, like a guardian standing behind her.", cue: "lookw1" },
          { text: "Swap to _She looks for her mother_ and the meaning changes completely: now her mother is missing and she is searching.", cue: "lookw2" },
          { text: "Both are correct English, but they say different things. Ask: am I caring (after), searching (for), looking at a point (at), or investigating (into)?", cue: "lookw-r1" },
        ],
        actions: [
          K.clear("clear-why"),
          ...K.swap("lookw", ["careFor", "She looks after her mother.", "takes care of her", { hl: "after" }], ["searchQ", "She looks for her mother.", "would mean her mother is lost", { ink: "trouble", hl: "for" }], ["after = care · for = search", "at = eyes on a point · into = investigate"]),
        ],
      },
      {
        id: "check",
        title: "Check: choose the verb",
        alt: "The board remains.",
        say: [{ text: "An original practice question." }],
        actions: [],
        check: {
          id: "look-q1",
          source: "original",
          skill: "look into",
          prompt: "The minister promised to ___ the allegations of corruption.",
          options: [
            { text: "look into", correct: true, why: "Correct. To investigate is to look _into_ the box and see what is inside." },
            { text: "look after", misconception: "look-family", why: "_Look after_ means take care of, which does not fit allegations." },
            { text: "look for", misconception: "look-family", why: "_Look for_ means search for something you want to find, not investigate something you already have." },
          ],
        },
      },
      {
        id: "check-2",
        title: "Check: letter writing",
        alt: "The board remains.",
        say: [{ text: "One more, from letter writing." }],
        actions: [],
        check: {
          id: "look-q2",
          source: "original",
          skill: "look forward to + -ing",
          prompt: "Choose the correct closing line for a formal letter.",
          options: [
            { text: "I look forward to hearing from you.", correct: true, why: "Correct. _To_ is a preposition here, so the verb takes -ing." },
            { text: "I look forward to hear from you.", misconception: "to-plus-ing", why: "After the preposition _to_ in _look forward to_, use the -ing form: _hearing._" },
            { text: "I am looking forward for hearing from you.", misconception: "look-family", why: "The phrase is _look forward to_, not _forward for._" },
          ],
        },
      },
    ],
  });
})();
