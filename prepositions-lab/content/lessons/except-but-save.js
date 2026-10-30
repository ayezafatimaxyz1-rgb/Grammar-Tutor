/* Lesson 1.44: EXCEPT, EXCEPT FOR, BUT, SAVE, BARRING. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "except-but-save",
    title: "EXCEPT, BUT, SAVE, BARRING",
    phase: 1,
    unit: "p1-relations",
    level: "Intermediate",
    minutes: 8,
    summary:
      "Except removes something from a group. Except for often begins a sentence or qualifies a whole statement. But means except after all, every, no and nothing. Save is formal or literary. Barring means unless something happens. Pronouns take the object form: except me.",
    objectives: [
      "Use except and except for to remove an item from a group.",
      "Use but after all, every, no, nothing, and recognise save and barring.",
      "Use object pronouns: everyone except me.",
    ],
    steps: [
      {
        id: "remove",
        title: "One taken out of the group",
        alt: "Six stick figures in a group; one is outside the group circle. Sentence: Everyone attended except Ali.",
        say: [
          { text: "Here is a group, with one person taken out of it.", cue: "out" },
          { text: "**Except** = not including: _Everyone attended except Ali._ After except, pronouns take the object form: _everyone except me._", cue: "s1" },
        ],
        actions: [
          { do: "draw", id: "ring", shape: "ellipse", cx: 360, cy: 200, rx: 220, ry: 110, ink: "accent2", dur: 900 },
          { do: "draw", id: "group", shape: "group", ink: "accent", dur: 1200, parts: [{ shape: "person", x: 230, y: 140, scale: 0.6 }, { shape: "person", x: 310, y: 140, scale: 0.6 }, { shape: "person", x: 390, y: 140, scale: 0.6 }, { shape: "person", x: 470, y: 140, scale: 0.6 }] },
          { do: "draw", id: "out", shape: "person", x: 720, y: 140, scale: 0.6, ink: "trouble", dur: 500, gap: 400 },
          { do: "write", id: "out-l", text: "Ali", x: 720, y: 130, size: 28, ink: "trouble", anchor: "middle" },
          { do: "write", id: "s1", text: "Everyone attended except Ali.", x: 480, y: 410, size: 40, anchor: "middle", gap: 400, dur: 1700 },
          { do: "highlight", id: "s1-h", target: "s1", word: "except" },
        ],
      },
      {
        id: "family",
        title: "Except for, but, save, barring",
        alt: "Four rows. Except for one mistake, the essay is excellent. Nobody but me knew. Save one, all were rescued (formal). Barring accidents, we will arrive by six.",
        say: [
          { text: "**Except for** qualifies a whole statement: the page is all ticks except one cross. _Except for one mistake, the essay is excellent._", cue: "e1" },
          { text: "**But** means except after _no, nobody, all, every_: the circle is empty but for one person. _Nobody but me knew._", cue: "e2" },
          { text: "**Save** is formal or literary: all are inside save one. **Barring** = unless something happens: if nothing blocks the road. _Barring accidents, we arrive by six._", cue: "e3" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.rows("e", [
            ["exceptOne", "Except for one mistake, it is excellent.", { hl: "Except for" }],
            ["onlyOne", "Nobody but me knew.", { hl: "but" }],
            ["groupOut", "All were rescued save one. (formal)", { hl: "save" }],
            ["roadBarrier", "Barring accidents, we arrive by six.", { hl: "Barring" }],
          ], { y: 90, gap: 118 }),
        ],
      },
      {
        id: "why-not",
        title: "Why not the other one?",
        alt: "Left: a group with one person outside, labelled Everyone came except Ali (Ali did not come). Right: a plus sign, labelled Everyone came besides Ali (Ali came too).",
        say: [
          { text: "_Everyone came except Ali_: Ali is taken out of the group. He did not come.", cue: "wn1" },
          { text: "_Besides Ali_ means in addition to Ali: he came, and others came too. The fact flips.", cue: "wn2" },
          { text: "Except subtracts; besides adds.", cue: "wn-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.swap("wn", ["groupOut", "Everyone came except Ali.", "Ali did not come", { hl: "except" }], ["plus", "Others came besides Ali.", "different: Ali came too", { ink: "trouble" }], ["except = not including", "besides = in addition to"]),
        ],
      },
      {
        id: "check",
        title: "Check: removing one",
        alt: "The four rows remain on the board.",
        say: [{ text: "Which word removes Ali from the group?" }],
        actions: [],
        check: {
          id: "except-q1",
          source: "original",
          skill: "except vs besides",
          prompt: "All the members signed the resolution ___ Ali, who was abroad.",
          options: [
            { text: "except", correct: true, why: "Correct. Ali is removed from the group of signers: except." },
            { text: "besides", misconception: "beside-vs-besides", why: "In a positive sentence besides means in addition to, which would make Ali an extra signer. The meaning is except." },
            { text: "barring", misconception: "except-family", why: "Barring means unless something happens (_barring accidents_), not excluding a person from a group." },
          ],
        },
      },
    ],
  });
})();
