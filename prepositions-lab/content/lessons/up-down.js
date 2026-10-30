/* Lesson 1.26: UP and DOWN as prepositions. */
PLAB.registerLesson({
  id: "up-down",
  title: "UP and DOWN",
  phase: 1,
  unit: "p1-movement",
  level: "Intermediate",
  minutes: 7,
  summary:
    "Up and down as prepositions: movement to a higher or lower point along something (up the hill, down the stairs), the informal along sense (down the road), and how the same words become particles in phrasal verbs.",
  objectives: [
    "Use up and down with an object for movement along a slope, stairs or a river.",
    "Recognise the informal use of up and down for along (just down the road).",
    "Tell the preposition (ran up the hill) from the particle in a phrasal verb (gave up smoking).",
  ],
  steps: [
    {
      id: "hill",
      title: "Up the hill, down the stairs",
      alt: "A slope with an arrow going up it and another coming down. Sentences: She climbed up the hill. He ran down the stairs.",
      say: [
        { text: "Here is a slope. Moving along it to a higher point is **up**; to a lower point is **down**.", cue: "slope" },
        { text: "_She climbed up the hill. He ran down the stairs. The boat drifted down the river_ (with the current, towards the sea).", cue: "s2" },
      ],
      actions: [
        { do: "draw", id: "slope", shape: "line", from: [120, 380], to: [760, 120], width: 4, dur: 1000 },
        { do: "draw", id: "a-up", shape: "arrow", from: [220, 300], to: [600, 145], ink: "accent", dur: 900, gap: 300 },
        { do: "draw", id: "a-down", shape: "arrow", from: [700, 200], to: [330, 350], ink: "trouble", dur: 900, gap: 300 },
        { do: "write", id: "s1", text: "climbed up the hill", x: 250, y: 200, size: 32, ink: "accent", anchor: "middle" },
        { do: "write", id: "s2", text: "ran down the stairs", x: 660, y: 330, size: 32, ink: "trouble", anchor: "middle" },
        { do: "write", id: "s3", text: "drifted down the river (with the current)", x: 480, y: 480, size: 30, ink: "muted", anchor: "middle", gap: 500, dur: 2000 },
      ],
    },
    {
      id: "along",
      title: "Up and down meaning along",
      alt: "A road with a house and a shop a little way along it. Sentence: The shop is just down the road. Marked informal.",
      say: [
        { text: "In everyday speech, up and down can simply mean _along_, with no slope at all: _The shop is just down the road. She lives up the street._", cue: "al-s1" },
        { text: "This is informal. In formal writing, say _further along the road_ or give the distance.", cue: "al-s2" },
      ],
      actions: [
        { do: "erase", id: "clear-hill", targets: "all" },
        { do: "draw", id: "road", shape: "line", from: [80, 260], to: [880, 260], ink: "muted", width: 3, dur: 800, gap: 400 },
        { do: "draw", id: "house", shape: "rect", x: 140, y: 170, w: 80, h: 80, dur: 600 },
        { do: "draw", id: "shop", shape: "rect", x: 660, y: 170, w: 100, h: 80, ink: "accent", dur: 600 },
        { do: "draw", id: "a", shape: "arrow", from: [240, 230], to: [640, 230], ink: "accent2", dur: 800 },
        { do: "write", id: "al-s1", text: "The shop is just down the road.", x: 480, y: 380, size: 40, anchor: "middle", gap: 400, dur: 1800 },
        { do: "write", id: "al-s2", text: "informal · formal: further along the road", x: 480, y: 460, size: 30, ink: "muted", anchor: "middle", gap: 500, dur: 2000 },
      ],
    },
    {
      id: "particle",
      title: "Preposition or particle?",
      alt: "Two sentences. He ran up the hill: up is a preposition with the object the hill. He gave up smoking: up is part of the phrasal verb give up, meaning stop.",
      say: [
          { text: "_He ran up the hill_: the arrow climbs the slope. **Up** relates the running to _the hill_, its object: a preposition.", cue: "p1" },
          { text: "_He gave up smoking_: no slope, no direction. **Give up** together means _stop_; up is a **particle** of a phrasal verb.", cue: "p2" },
          { text: "Test: can the word move after the object? _He gave smoking up_ ✓ (particle). _He ran the hill up_ ✗ (preposition).", cue: "p3" },
        ],
      actions: [
          PLAB.kit.clear("clear-along"),
          ...PLAB.kit.panels("p", [
            ["hillUp", "He ran up the hill.", "preposition: direction", { hl: "up" }],
            ["cigarette", "He gave up smoking.", "phrasal verb: = stop", { hl: "gave up" }],
          ]),
          { do: "write", id: "p3", text: "gave smoking up ✓ · ran the hill up ✗", x: 480, y: 470, size: 32, ink: "muted", anchor: "middle", gap: 500 },
        ],
    },
    {
      id: "check-particle",
      title: "Check: which job?",
      alt: "The two sentences and the test remain on the board.",
      say: [{ text: "Use the moving test." }],
      actions: [],
      check: {
        id: "up-q1",
        source: "original",
        skill: "preposition vs particle",
        prompt: "In which sentence is down a preposition?",
        options: [
          { text: "The children ran down the corridor.", correct: true, why: "Correct. _Down_ relates the running to _the corridor_; you cannot say _ran the corridor down._" },
          { text: "The committee turned down the proposal.", misconception: "adverb-vs-preposition", why: "_Turn down_ means reject. You can say _turned the proposal down_, so down is a particle of a phrasal verb." },
          { text: "Please write down your name.", misconception: "adverb-vs-preposition", why: "_Write down_ is a phrasal verb: _write your name down_ also works." },
        ],
      },
    },
    {
      id: "why-not",
      title: "Why not the other one?",
      alt: "Left: an arrow up a hill, labelled He ran up the hill. Right: the same, labelled He ran the hill up, which moves a preposition like a particle.",
      say: [
        { text: "_He ran up the hill._ **Up the hill** is a phrase showing the path.", cue: "wn1" },
        { text: "A preposition stays before its noun, so it cannot move to the end: _ran the hill up_ is wrong.", cue: "wn2" },
        { text: "A particle can move: _He gave up smoking_, _He gave it up._", cue: "wn-r1" },
      ],
      actions: [
        PLAB.kit.clear("clear-why"),
        ...PLAB.kit.swap("wn", ["hillUp", "He ran up the hill.", "up the hill = the path", { hl: "up" }], ["hillUp", "\u2717 He ran the hill up.", "a preposition cannot move", { ink: "trouble" }], ["preposition: up the hill (fixed)", "particle: gave it up (moves)"]),
      ],
    },
    {
      id: "summary",
      title: "The summary",
      alt: "Up and down with an object: up the hill, down the stairs, down the river. Informal: down the road. Phrasal verbs: give up, turn down; the particle can move after the object.",
      say: [{ text: "**Up/down** + object = movement along to a higher or lower point. Informally, along. In phrasal verbs they are particles, not prepositions.", cue: "c3" }],
      actions: [
        { do: "erase", id: "clear-particle", targets: "all" },
        { do: "write", id: "c1", text: "up the hill · down the stairs", x: 480, y: 150, size: 36, anchor: "middle", gap: 400 },
        { do: "write", id: "c2", text: "down the road (informal: along)", x: 480, y: 240, size: 34, anchor: "middle" },
        { do: "write", id: "c3", text: "give up · turn down = phrasal verbs", x: 480, y: 330, size: 34, ink: "accent2", anchor: "middle" },
      ],
    },
  ],
});
