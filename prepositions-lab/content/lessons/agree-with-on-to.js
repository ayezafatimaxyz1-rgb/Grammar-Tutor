/* Lesson 2.4: agree with a person, agree on a subject, agree to a proposal. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "agree-with-on-to",
    title: "Agree with, agree on, agree to",
    phase: 2,
    unit: "p2-verb",
    level: "Intermediate",
    minutes: 8,
    summary:
      "Agree with a person or an opinion (you stand together with them), agree on a subject or decision (both sides land on the same point), and agree to a proposal or request (you move towards it and accept it).",
    objectives: [
      "Choose with, on or to after agree from what follows: a person or view, a shared decision, or a proposal.",
      "Know that agree + object (agree a budget) is a formal British use, and that agree about is also possible for a topic.",
    ],
    steps: [
      {
        id: "three",
        title: "Three pictures of agreeing",
        alt: "Three panels. Agree with: two people sharing one speech bubble with a tick. Agree on: two people with arrows landing on one point. Agree to: a person moving towards a document with a tick.",
        say: [
          { text: "**Agree with** means standing together, sharing the same view: _I agree with you. I agree with her opinion._", cue: "a1" },
          { text: "**Agree on** means two sides arrive at the same point, a decision or a detail: _They agreed on a date._", cue: "a2" },
          { text: "**Agree to** means moving towards a proposal and accepting it, often after being asked: _The minister agreed to the request._", cue: "a3" },
        ],
        actions: K.panels("a", [
          ["agreeWith", "agree with you", "same view, together", { hl: "with" }],
          ["agreeOn", "agree on a date", "both land on one point", { hl: "on" }],
          ["agreeTo", "agree to the plan", "accept what is proposed", { hl: "to" }],
        ], { y: 70 }),
      },
      {
        id: "examples",
        title: "Sentences you will write",
        alt: "Rows: I entirely agree with the author's view. Both parties agreed on a ceasefire. The union agreed to the new terms. She agreed to help (to + verb).",
        say: [
          { text: "_I entirely agree with the author's view._ A person or an opinion takes **with**.", cue: "e1" },
          { text: "_Both parties agreed on a ceasefire._ The shared decision takes **on**; _agree about_ is also used for a topic you discuss.", cue: "e2" },
          { text: "_The union agreed to the new terms._ And with a verb: _She agreed to help._ Here **to** is part of the infinitive.", cue: "e3" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.rows("e", [
            ["agreeWith", "I entirely agree with the author's view.", { hl: "agree with" }],
            ["agreeOn", "Both parties agreed on a ceasefire.", { hl: "agreed on" }],
            ["agreeTo", "The union agreed to the new terms.", { hl: "agreed to" }],
            ["person", "She agreed to help.  (to + verb)", { ink: "accent2" }],
          ], { y: 90, gap: 125 }),
        ],
      },
      {
        id: "traps",
        title: "Traps and a British use",
        alt: "Crossed out: I am agree with you; I agree to you (for a person). Note: The committee agreed the budget, formal British English, means agreed on it.",
        say: [
          { text: "_I am agree_ is wrong: agree is a verb, so _I agree._ And a person takes **with**, not **to**: not _I agree to you._", cue: "w1" },
          { text: "In formal British English, a plan can be agreed with no preposition: _The committee agreed the budget._ It means they agreed on it together.", cue: "w2" },
        ],
        actions: [
          K.clear("clear-2"),
          ...K.pic("x", "cross", 30, 60, 1),
          { do: "write", id: "w1", text: "✗ I am agree with you. · ✗ I agree to you.", x: 200, y: 110, size: 34, ink: "trouble" },
          ...K.pic("ok", "agreeOn", 30, 220, 1),
          { do: "write", id: "w2", text: "The committee agreed the budget. (BrE, formal)", x: 200, y: 270, size: 32 },
          { do: "write", id: "w2b", text: "= agreed on it together", x: 200, y: 320, size: 28, ink: "muted" },
        ],
      },
      {
        id: "check",
        title: "Check: choose the preposition",
        alt: "The traps remain on the board.",
        say: [{ text: "An original practice question." }],
        actions: [],
        check: {
          id: "agree-q1",
          source: "original",
          skill: "agree with / on / to",
          prompt: "After long talks, the two delegations agreed ___ a joint statement, and the prime minister agreed ___ sign it.",
          options: [
            { text: "on … to", correct: true, why: "Correct. Both sides landed on the same text (_agreed on_), and _agreed to_ + verb for accepting an action." },
            { text: "with … to", misconception: "agree-preps", why: "_Agree with_ is for a person or an opinion, not a decision both sides reach." },
            { text: "to … with", misconception: "agree-preps", why: "_Agree with sign_ is not possible; a verb after agree takes _to._" },
          ],
        },
      },
    ],
  });
})();
