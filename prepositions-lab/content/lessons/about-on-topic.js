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
          { text: "**About** is the everyday choice for any topic: _a book about dogs, a chat about cricket._", cue: "t1" },
          { text: "**On** sounds more formal and suits serious or specialised subjects: _a treatise on constitutional law, a lecture on economics, a report on poverty._", cue: "t2" },
          { text: "Some words have a fixed partner: _comment on, speak on_ (formal) but _worry about, talk about, think about._", cue: "t3" },
        ],
        actions: K.lines("t", [["about: a book about dogs · a chat about cricket", { hl: "about", size: 32 }], ["on: a lecture on economics · a report on poverty", { hl: "on", size: 32 }], ["comment on · worry about · talk about", { ink: "accent2", size: 32 }]], { y: 170, gap: 115 }),
      },
      {
        id: "discuss",
        title: "Discuss takes no preposition",
        alt: "Crossed out: discussed about the budget. Correct: discussed the budget; had a discussion about the budget.",
        say: [
          { text: "The verb **discuss** takes its object directly. _The committee discussed the budget._", cue: "d2" },
          { text: "_Discussed about the budget_ is a very common error. The noun _discussion_, however, does take _about_ or _on_: _a discussion about the budget._", cue: "d3" },
        ],
        actions: [K.clear("clear-1"), ...K.lines("d", [["✗ discussed about the budget", { ink: "trouble" }], ["✓ discussed the budget", { ink: "accent" }], ["✓ a discussion about / on the budget", { ink: "accent2", size: 32 }]], { y: 170, gap: 110, size: 38 })],
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
