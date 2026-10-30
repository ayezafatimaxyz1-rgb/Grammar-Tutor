/* Lesson 1.41: ABOUT vs ON for topics, and discuss with no preposition. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "about-on-topic",
    title: "ABOUT vs ON for topics",
    phase: 1,
    unit: "p1-relations",
    level: "Intermediate",
    minutes: 7,
    summary:
      "Both introduce a topic. About is general and everyday; on is more formal, specialised or academic. Some words prefer one: comment on, lecture on, worry about. And discuss takes no preposition at all.",
    objectives: [
      "Use about for general topics and on for formal or specialised ones.",
      "Use the fixed partners comment on, lecture on, worry about, talk about.",
      "Never write discuss about.",
    ],
    steps: [
      {
        id: "two",
        title: "General or specialised",
        alt: "Two rows: a book about dogs, a chat about cricket (general). A treatise on constitutional law, a lecture on economics (formal, specialised).",
        say: [
          { text: "**About** pictures talk moving around a topic, touching many sides of it: the everyday choice. _a book about dogs, a chat about cricket._", cue: "t1" },
          { text: "**On** pictures a work resting on its subject as a foundation: more formal and specialised. _a lecture on economics, a report on poverty._", cue: "t2" },
          { text: "Some words have fixed partners: _comment on, speak on_ (formal), but _worry about, talk about, think about._", cue: "t3" },
        ],
        actions: [
          ...PLAB.kit.panels("t", [
            ["aboutCircle", "a book about dogs", "around the topic: everyday", { hl: "about" }],
            ["onBase", "a lecture on economics", "resting on it: formal", { hl: "on" }],
          ]),
          { do: "write", id: "t3", text: "comment on · worry about · talk about", x: 480, y: 470, size: 32, ink: "accent2", anchor: "middle", gap: 500 },
        ],
      },
      {
        id: "discuss",
        title: "Discuss takes no preposition",
        alt: "Crossed out: discussed about the budget. Correct: discussed the budget; had a discussion about the budget.",
        say: [
          { text: "The verb **discuss** goes straight to its object, like an arrow hitting the box. _The committee discussed the budget._", cue: "d2" },
          { text: "_Discussed about the budget_ adds a word that is not needed and is a very common error. The noun **discussion**, though, does take _about_ or _on_: _a discussion about the budget._", cue: "d3" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.panels("d", [
            ["directHit", "discussed the budget ✓", "no preposition", {}],
            [[["directHit", 0, 0], ["cross", 0, 0]], "✗ discussed about the budget", "", { ink: "trouble", size: 26 }],
          ]),
          { do: "write", id: "d3", text: "✓ a discussion about / on the budget", x: 480, y: 470, size: 32, ink: "accent2", anchor: "middle", gap: 500 },
        ],
      },
      {
        id: "why-not",
        title: "Why not the other one?",
        alt: "Left: a circle round a topic, labelled a chat about cricket (everyday). Right: a block resting on a base, labelled a lecture on economics (formal, focused).",
        say: [
          { text: "_a chat about cricket_: **about** is the everyday word for a topic.", cue: "wn1" },
          { text: "_a lecture on economics_: **on** is more formal and focused, for serious study.", cue: "wn2" },
          { text: "Both are correct; choose by tone. But never _discuss about_: discuss already means talk about.", cue: "wn-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.swap("wn", ["aboutCircle", "a chat about cricket", "everyday", { hl: "about" }], ["onBase", "a lecture on economics", "more formal, focused", { ink: "trouble" }], ["about = everyday topic", "on = formal topic \u00b7 never discuss about"]),
        ],
      },
      {
        id: "check",
        title: "Check: sentence correction",
        alt: "The discuss examples remain on the board.",
        say: [{ text: "An original practice item in CSS sentence-correction style." }],
        actions: [],
        check: {
          id: "about-q1",
          source: "original",
          skill: "discuss without a preposition",
          prompt: "Choose the correct sentence.",
          options: [
            { text: "The cabinet discussed the energy crisis at length.", correct: true, why: "Correct. _Discuss_ takes a direct object." },
            { text: "The cabinet discussed about the energy crisis at length.", misconception: "no-prep-verbs", why: "_Discuss_ never takes _about._ The noun _discussion_ does." },
            { text: "The cabinet discussed on the energy crisis at length.", misconception: "no-prep-verbs", why: "_Discuss_ takes no preposition at all." },
          ],
        },
      },
    ],
  });
})();
