/* Lesson 2.14: responsibility: responsible for, accountable to/for, liable for/to. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "responsibility",
    title: "Responsible for, accountable to",
    phase: 2,
    unit: "p2-adjective",
    level: "Advanced",
    minutes: 8,
    summary:
      "Responsibility has two directions. FOR points to the task or the people in your care (responsible for, accountable for, liable for). TO points up to the authority you must answer to (accountable to, responsible to, answerable to). Liable to also means likely to, usually of something bad.",
    objectives: [
      "Use for for the task and to for the authority: accountable to Parliament for public spending.",
      "Know the second meaning of liable to (likely to suffer or do something).",
    ],
    steps: [
      {
        id: "for",
        title: "Responsible FOR the task",
        alt: "An adult with protective arms over two children. Sentences: The deputy commissioner is responsible for law and order. Also: in charge of, take care of.",
        say: [
          { text: "Picture what you hold in your care: the task, the people, the outcome. **For** points to it, as in _care for, look after._", cue: "pic-0-0" },
          { text: "_The deputy commissioner is responsible for law and order._ A verb takes -ing: _responsible for collecting taxes._", cue: "s1" },
        ],
        actions: [
          ...K.pic("pic", "careFor", 340, 30, 2),
          { do: "write", id: "s1", text: "The DC is responsible for law and order.", x: 480, y: 300, size: 38, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s1-h", target: "s1", word: "responsible for" },
          { do: "write", id: "s2", text: "responsible for collecting taxes", x: 480, y: 380, size: 32, ink: "accent2", anchor: "middle", gap: 400 },
          { do: "write", id: "w", text: "✗ responsible of · ✗ responsible to collect", x: 480, y: 460, size: 30, ink: "trouble", anchor: "middle", gap: 400 },
        ],
      },
      {
        id: "to",
        title: "Accountable TO an authority",
        alt: "A person below with an arrow reaching up to a person standing higher. Sentence: Ministers are accountable to Parliament for public spending. TO = the authority above; FOR = the task.",
        say: [
          { text: "Now look up. There is someone above you whom you must answer to. **To** points up to that authority: _Ministers are accountable to Parliament._", cue: "pic2-0-0" },
          { text: "Both directions fit in one sentence: _accountable to Parliament for public spending._ The same with _answerable to_ and _responsible to._", cue: "ts1" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.pic("pic2", "answerTo", 330, 20, 2.1),
          { do: "write", id: "ts1", text: "Ministers are accountable to Parliament for public spending.", x: 480, y: 320, size: 32, anchor: "middle", gap: 400 },
          { do: "highlight", id: "ts1-h", target: "ts1", word: "to" },
          { do: "highlight", id: "ts1-h2", target: "ts1", word: "for", style: "underline", ink: "accent2" },
          { do: "write", id: "ts2", text: "to = the authority above · for = the task", x: 480, y: 400, size: 30, ink: "muted", anchor: "middle", gap: 400 },
        ],
      },
      {
        id: "liable",
        title: "Liable for, liable to",
        alt: "Rows: The company is liable for the damage (legally responsible for). Parents are liable to a fine (can be punished with). The road is liable to flooding (likely to suffer).",
        say: [
          { text: "**Liable for** is legal responsibility for a cost: _The company is liable for the damage._", cue: "l1" },
          { text: "**Liable to** has two senses: open to a penalty (_liable to a fine_) and likely to suffer or do something, usually bad: _This road is liable to flooding._", cue: "l2" },
        ],
        actions: [
          K.clear("clear-2"),
          ...K.rows("l", [
            ["gavel", "The company is liable for the damage.", { hl: "liable for" }],
            ["coin", "Offenders are liable to a fine.", { hl: "liable to" }],
            ["rain", "This road is liable to flooding.  (= likely to)", { hl: "liable to" }],
          ], { y: 110, gap: 140 }),
        ],
      },
      {
        id: "why-not",
        title: "Why not the other one?",
        alt: "Left: a person with an arrow up to a person above, labelled Ministers are accountable to Parliament (answer to it). Right: an adult caring for children, labelled accountable for Parliament, which would mean ministers look after Parliament.",
        say: [
          { text: "_Ministers are accountable to Parliament_: Parliament is above them, and they must answer to it.", cue: "accountw1" },
          { text: "_Accountable for Parliament_ would make Parliament the task in their care, as if ministers ran Parliament. The authority and the task have swapped places.", cue: "accountw2" },
          { text: "**For** is right for the task: _accountable for public spending._ Ask: is it the authority I answer to (to), or the job in my care (for)?", cue: "accountw-r1" },
        ],
        actions: [
          K.clear("clear-why"),
          ...K.swap("accountw", ["answerTo", "accountable to Parliament", "the authority above", { hl: "to" }], ["careFor", "✗ accountable for Parliament", "would mean they run Parliament", { ink: "trouble" }], ["to + the authority you answer to", "for + the task in your care"]),
        ],
      },
      {
        id: "check",
        title: "Check: fill the gaps",
        alt: "The board remains.",
        say: [{ text: "An original practice question in CSS style." }],
        actions: [],
        check: {
          id: "responsibility-q1",
          source: "original",
          skill: "accountable to / for",
          prompt: "In a democracy, the executive is accountable ___ the legislature ___ its decisions.",
          options: [
            { text: "to … for", correct: true, why: "Correct. _To_ points up to the authority; _for_ points to what is being answered for." },
            { text: "for … to", misconception: "responsibility-preps", why: "Reversed. The legislature is the authority (_to_); the decisions are the task (_for_)." },
            { text: "of … for", misconception: "responsibility-preps", why: "_Accountable of_ is not used. Use _accountable to._" },
          ],
        },
      },
    ],
  });
})();
