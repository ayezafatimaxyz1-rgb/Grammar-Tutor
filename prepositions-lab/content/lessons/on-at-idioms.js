/* Lesson 2.28: expressions with on and at: on purpose, at random, at large, on the whole. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "on-at-idioms",
    title: "On purpose, at random, at large",
    phase: 2,
    unit: "p2-idiom",
    level: "Intermediate",
    minutes: 8,
    summary:
      "Fixed phrases with on and at that essays use often: on purpose (deliberately) vs by accident or by chance; at random (without a plan); at large (free, not caught; or the public as a whole); on the whole (generally); on duty, on foot, on fire; at once, at least, at stake, at all costs.",
    objectives: [
      "Use on purpose, at random, at large and on the whole with their correct meanings.",
      "Recognise on duty, on foot, on fire, at once, at stake and at all costs.",
    ],
    steps: [
      {
        id: "purpose-random",
        title: "On purpose, at random",
        alt: "Left: an eye aiming at a target, labelled He broke it on purpose (deliberately). Right: two dice, labelled names chosen at random (without a plan). Note: by accident, by chance are the opposites of on purpose.",
        say: [
          { text: "**On purpose** is aiming at the target: deliberately. _He broke the window on purpose._ The opposite is _by accident_ or _by mistake._", cue: "p1" },
          { text: "**At random** is a throw of the dice: no plan, no pattern. _Ten names were chosen at random._", cue: "p2" },
          { text: "Never _by purpose_ or _in random._", cue: "w" },
        ],
        actions: [
          ...K.panels("p", [
            ["aimGoal", "He did it on purpose.", "deliberately", { hl: "on purpose" }],
            ["dice", "chosen at random", "without a plan", { hl: "at random" }],
          ], { y: 60 }),
          { do: "write", id: "w", text: "opposite: by accident · ✗ by purpose · ✗ in random", x: 480, y: 470, size: 30, ink: "trouble", anchor: "middle", gap: 400 },
        ],
      },
      {
        id: "large-whole",
        title: "At large, on the whole",
        alt: "Left: a figure running away from a cage, labelled The killer is still at large (free, not caught). Right: a group of people, labelled society at large (as a whole). Below: On the whole, the plan worked (generally).",
        say: [
          { text: "**At large** first means free, escaped from the cage: _The killer is still at large._ It also means as a whole: _society at large, the public at large._", cue: "l1" },
          { text: "**On the whole** means generally, taking everything together: _On the whole, the reforms were successful._", cue: "s1" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.panels("l", [
            ["escaped", "still at large", "free, not caught", { hl: "at large" }],
            ["crowd", "society at large", "as a whole", { hl: "at large" }],
          ], { y: 50 }),
          { do: "write", id: "s1", text: "On the whole, the reforms were successful.", x: 480, y: 470, size: 34, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s1-h", target: "s1", word: "On the whole" },
        ],
      },
      {
        id: "more",
        title: "More phrases with on and at",
        alt: "Rows: on duty (a person with a badge); on foot (footprints); on fire (a flame); at once (= immediately); at stake (coins on a scale: what can be lost); at all costs.",
        say: [
          { text: "**On** for a state you are in: _on duty, on fire, on leave_, and **on foot** for how you travel.", cue: "m1" },
          { text: "**At** for a point: _at once_ (immediately), _at least, at stake_ (what can be lost), _at all costs_ (whatever happens).", cue: "m3" },
        ],
        actions: [
          K.clear("clear-2"),
          ...K.rows("m", [
            ["badge", "on duty · on leave", { hl: "on duty" }],
            ["feet", "on foot · on fire", { hl: "on foot" }],
            ["weighCost", "at stake · at all costs", { hl: "at stake" }],
            ["clock", "at once (= immediately) · at least", { hl: "at once" }],
          ], { y: 90, gap: 125 }),
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence He broke the window with a gap purpose., then the candidates with pictures: on (right: on purpose = deliberately); by (wrong: by goes with accident, chance); with (wrong: with = a tool or company; purpose is neither). Rule: on purpose \u00b7 by accident \u00b7 by chance; at random \u00b7 at large \u00b7 on the whole.",
        say: [
          { text: "Fill the gap: He broke the window \u2026 purpose. What does the sentence want to say? The answer is **on**: on purpose = deliberately.", cue: "why1" },
          { text: "Why not the others? **by**: by goes with accident, chance. **with**: with = a tool or company; purpose is neither.", cue: "why2" },
          { text: "The rule: on purpose \u00b7 by accident \u00b7 by chance; at random \u00b7 at large \u00b7 on the whole.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "He broke the window ____ purpose.", [["aimGoal", "on", true, "on purpose = | deliberately"], ["dice", "by", false, "by goes with | accident, chance"], ["cross", "with", false, "with = a tool or company; | purpose is neither"]], ["on purpose \u00b7 by accident \u00b7 by chance", "at random \u00b7 at large \u00b7 on the whole"]),
        ],
      },
      {
        id: "check",
        title: "Check: meaning",
        alt: "The board remains.",
        say: [{ text: "An original practice question." }],
        actions: [],
        check: {
          id: "on-at-idioms-q1",
          source: "original",
          skill: "at large",
          prompt: "Two of the escaped prisoners are still ___.",
          options: [
            { text: "at large", correct: true, why: "Correct. _At large_ = free, not yet caught." },
            { text: "on the whole", misconception: "idiom-pairs", why: "_On the whole_ means generally, which does not fit." },
            { text: "at random", misconception: "idiom-pairs", why: "_At random_ means without a plan or pattern." },
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
          id: "on-at-idioms-q2",
          source: "original",
          skill: "on purpose",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "The file was not lost by accident; it was destroyed on purpose.", correct: true, why: "Correct. _By accident_ vs _on purpose._" },
            { text: "The file was not lost on accident; it was destroyed by purpose.", misconception: "idiom-pairs", why: "The prepositions are swapped: _by accident_, _on purpose._" },
            { text: "The file was not lost in accident; it was destroyed in purpose.", misconception: "idiom-pairs", why: "Neither phrase takes _in._" },
          ],
        },
      },
    ],
  });
})();
