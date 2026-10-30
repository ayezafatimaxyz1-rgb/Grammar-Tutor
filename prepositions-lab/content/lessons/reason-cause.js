/* Lesson 2.18: reason for, cause of, solution to, answer to, key to. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "reason-cause",
    title: "Reason for, cause of, solution to",
    phase: 2,
    unit: "p2-noun",
    level: "Intermediate",
    minutes: 8,
    summary:
      "A reason is given for an event (it explains it), but a cause belongs to the event that it produced: the cause of the flood. Solution, answer, key and alternative fit onto a problem, so they take to: the solution to the problem, the key to success.",
    objectives: [
      "Use the reason for and the cause of, and avoid the reason of.",
      "Use solution to, answer to, key to and alternative to.",
    ],
    steps: [
      {
        id: "reason-cause",
        title: "Reason FOR, cause OF",
        alt: "A cause dot with an arrow to an event marked with an exclamation sign. Sentences: The heavy rain was the cause of the flood. What was the reason for the delay?",
        say: [
          { text: "A **cause** produces an event, and belongs to it: the event has a cause. So **of**: _Heavy rain was the cause of the flood._", cue: "s1" },
          { text: "A **reason** is what we give to explain an event, standing for it. So **for**: _What was the reason for the delay?_", cue: "s2" },
          { text: "_The reason of_ is a common error. Also _grounds for, excuse for, explanation for._", cue: "w" },
        ],
        actions: [
          ...K.pic("pic", "reasonFor", 340, 20, 2),
          { do: "write", id: "s1", text: "Heavy rain was the cause of the flood.", x: 480, y: 290, size: 36, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s1-h", target: "s1", word: "cause of" },
          { do: "write", id: "s2", text: "What was the reason for the delay?", x: 480, y: 370, size: 36, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s2-h", target: "s2", word: "reason for" },
          { do: "write", id: "w", text: "✗ the reason of · also: grounds for, excuse for", x: 480, y: 450, size: 30, ink: "trouble", anchor: "middle", gap: 400 },
        ],
      },
      {
        id: "to",
        title: "Solution TO a problem",
        alt: "Left: a key next to a lock, labelled the key to success (fits onto it). Right: a question mark with an arrow to a tick, labelled the answer to the question.",
        say: [
          { text: "A key moves **to** a lock and fits it. Words that fit onto a problem take **to**: _the key to success, the solution to the problem._", cue: "k1" },
          { text: "_the answer to the question, an alternative to war, a threat to peace, an exception to the rule._ (_Solution of_ is old-fashioned except in mathematics.)", cue: "k2" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.panels("k", [
            ["keyLock", "the key to success", "it fits the lock", { hl: "to" }],
            ["qToA", "the answer to the question", "it fits the question", { hl: "to" }],
          ], { y: 60 }),
          { do: "write", id: "more", text: "solution to · alternative to · threat to · exception to", x: 480, y: 470, size: 30, ink: "accent2", anchor: "middle", gap: 400 },
        ],
      },
      {
        id: "check",
        title: "Check: essay sentence",
        alt: "The board remains.",
        say: [{ text: "An original practice question in CSS essay style." }],
        actions: [],
        check: {
          id: "reason-cause-q1",
          source: "original",
          skill: "solution to / cause of",
          prompt: "Education is the only lasting solution ___ the problem of poverty, which is the root cause ___ many social evils.",
          options: [
            { text: "to … of", correct: true, why: "Correct. A solution fits _to_ a problem; a cause belongs to what it produces: _the cause of._" },
            { text: "of … for", misconception: "noun-preps", why: "_Solution_ takes _to,_ and _cause_ takes _of._ It is _reason_ that takes _for._" },
            { text: "for … of", misconception: "noun-preps", why: "_Solution for_ appears informally, but formal English says _solution to._" },
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
          id: "reason-cause-q2",
          source: "original",
          skill: "reason for",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "The minister gave no reason for his resignation.", correct: true, why: "Correct. A reason is given _for_ an event." },
            { text: "The minister gave no reason of his resignation.", misconception: "noun-preps", why: "_The reason of_ is a common error. Use _reason for._" },
            { text: "The minister gave no reason to his resignation.", misconception: "noun-preps", why: "_Reason to_ + verb exists (_no reason to worry_), but before a noun use _reason for._" },
          ],
        },
      },
    ],
  });
})();
