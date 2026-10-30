/* Lesson 2.8: verbs that take no preposition: discuss, enter, reach, marry, resemble, approach. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "no-preposition",
    title: "Discuss, enter, reach: no preposition",
    phase: 2,
    unit: "p2-verb",
    level: "Intermediate",
    minutes: 8,
    summary:
      "Some verbs already contain the meaning a preposition would add, so they take their object directly: discuss (talk about), enter (go into), reach (arrive at), marry (get married to), resemble (look like), approach (come towards), answer, attend, lack. Their nouns usually do take a preposition: a discussion about, entry into, marriage to.",
    objectives: [
      "Use discuss, enter, reach, marry, resemble, approach, attend, answer and lack with a direct object.",
      "Keep the preposition with the related nouns and phrases: a discussion about, an approach to, married to.",
    ],
    steps: [
      {
        id: "built-in",
        title: "The preposition is already inside the verb",
        alt: "An arrow going into a room. enter = go into, so: enter the room. Crossed out: enter into the room.",
        say: [
          { text: "Look at this arrow going into a room. In English we can say _go into the room_, or use one verb that already means go into: **enter**.", cue: "pic-0-0" },
          { text: "Because the **into** is already inside _enter_, adding it again says it twice: _enter the room_, not _enter into the room._", cue: "s2" },
          { text: "(_Enter into_ exists only with agreements and talks: _enter into negotiations_, meaning begin them.)", cue: "s3" },
        ],
        actions: [
          ...K.pic("pic", "enterRoom", 340, 30, 2),
          { do: "write", id: "s1", text: "enter = go into", x: 480, y: 290, size: 38, anchor: "middle", ink: "accent2", gap: 400 },
          { do: "write", id: "s2", text: "She entered the room.  ✗ entered into the room", x: 480, y: 370, size: 34, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s2-h", target: "s2", word: "entered" },
          { do: "write", id: "s3", text: "but: enter into negotiations (begin them)", x: 480, y: 450, size: 28, anchor: "middle", ink: "muted" },
        ],
      },
      {
        id: "list",
        title: "Verbs to learn as a set",
        alt: "Rows with pictures: discuss the issue (= talk about); reach the station (= arrive at); marry someone (= get married to); resemble her mother (= look like).",
        say: [
          { text: "**Discuss** already means talk about: _We discussed the issue_, never _discussed about._", cue: "l1" },
          { text: "**Reach** means arrive at: _We reached the station._ **Marry** means get married to: _She married a doctor._", cue: "l2" },
          { text: "**Resemble** means look like: _He resembles his father._ Also _approach the city, attend the meeting, answer the question, lack experience._", cue: "l4" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.rows("l", [
            ["discuss", "discuss the issue  (= talk about)", { hl: "discuss" }],
            ["reachDot", "reach the station  (= arrive at)", { hl: "reach" }],
            ["marry", "marry a doctor  (= get married to)", { hl: "marry" }],
            ["resemble", "resemble his father  (= look like)", { hl: "resemble" }],
          ], { y: 90, gap: 125 }),
        ],
      },
      {
        id: "nouns",
        title: "The nouns keep their preposition",
        alt: "Two columns, each row with a small sketch (two people talking, an arrow, an arrow into a room, two people with a heart). Verb, no preposition: discuss the plan, approach the problem, marry her, enter the market. Noun or phrase with preposition: a discussion about the plan, an approach to the problem, married to her, entry into the market.",
        say: [
          { text: "Here is the twist. The verb takes no preposition, but its noun usually does: _discuss the plan_, but _a discussion about the plan._", cue: "n1" },
          { text: "_approach the problem_, but _an approach to the problem._ _enter the market_, but _entry into the market._ And _marry her_, but _be married to her._", cue: "n2" },
        ],
        actions: [
          K.clear("clear-2"),
          { do: "write", id: "h1", text: "verb", x: 250, y: 80, size: 30, ink: "muted", anchor: "middle" },
          { do: "write", id: "h2", text: "noun or phrase", x: 700, y: 80, size: 30, ink: "muted", anchor: "middle" },
          { do: "draw", id: "rule", shape: "line", from: [480, 60], to: [480, 520], ink: "muted", width: 2 },
          ...K.pic("n1p", "discuss", 8, 128, 0.62, { gap: 300 }),
          { do: "write", id: "n1", text: "discuss the plan", x: 250, y: 170, size: 32, anchor: "middle", gap: 300 },
          { do: "write", id: "n1b", text: "a discussion about the plan", x: 700, y: 170, size: 30, anchor: "middle", fit: 440 },
          { do: "highlight", id: "n1b-h", target: "n1b", word: "about" },
          ...K.pic("n2p", "arrowR", 8, 218, 0.62, { gap: 300 }),
          { do: "write", id: "n2", text: "approach the problem", x: 250, y: 260, size: 32, anchor: "middle", gap: 300 },
          { do: "write", id: "n2b", text: "an approach to the problem", x: 700, y: 260, size: 30, anchor: "middle", fit: 440 },
          { do: "highlight", id: "n2b-h", target: "n2b", word: "to" },
          ...K.pic("n3p", "enterRoom", 8, 308, 0.62, { gap: 300 }),
          { do: "write", id: "n3", text: "enter the market", x: 250, y: 350, size: 32, anchor: "middle", gap: 300 },
          { do: "write", id: "n3b", text: "entry into the market", x: 700, y: 350, size: 30, anchor: "middle", fit: 440 },
          { do: "highlight", id: "n3b-h", target: "n3b", word: "into" },
          ...K.pic("n4p", "marry", 8, 398, 0.62, { gap: 300 }),
          { do: "write", id: "n4", text: "marry her", x: 250, y: 440, size: 32, anchor: "middle", gap: 300 },
          { do: "write", id: "n4b", text: "be married to her", x: 700, y: 440, size: 30, anchor: "middle", fit: 440 },
          { do: "highlight", id: "n4b-h", target: "n4b", word: "to" },
        ],
      },
      {
        id: "check",
        title: "Check: sentence correction",
        alt: "The two columns remain on the board.",
        say: [{ text: "An original practice question in CSS sentence-correction style." }],
        actions: [],
        check: {
          id: "no-prep-q1",
          source: "original",
          skill: "discuss (no preposition)",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "The cabinet discussed the budget at length.", correct: true, why: "Correct. _Discuss_ already means talk about, so it takes a direct object." },
            { text: "The cabinet discussed about the budget at length.", misconception: "extra-prep", why: "_Discuss about_ says about twice. Use _discussed the budget_, or _had a discussion about the budget._" },
            { text: "The cabinet discussed on the budget at length.", misconception: "extra-prep", why: "_Discuss_ takes no preposition." },
          ],
        },
      },
      {
        id: "check-2",
        title: "Check: one more",
        alt: "The two columns remain on the board.",
        say: [{ text: "One more." }],
        actions: [],
        check: {
          id: "no-prep-q2",
          source: "original",
          skill: "marry / married to",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "She is married to a civil servant.", correct: true, why: "Correct. The verb takes no preposition (_she married him_), but the phrase _be married_ takes _to._" },
            { text: "She is married with a civil servant.", misconception: "extra-prep", why: "_Married with_ is a common transfer error. Use _married to._" },
            { text: "She married with a civil servant.", misconception: "extra-prep", why: "_Marry_ takes a direct object: _she married a civil servant._" },
          ],
        },
      },
    ],
  });
})();
