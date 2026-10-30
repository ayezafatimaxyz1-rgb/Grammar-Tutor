/* Lesson 1.51: cause: because of, due to, owing to, on account of, thanks to. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "cause",
    title: "Cause: because of, due to, owing to",
    phase: 1,
    unit: "p1-complex",
    level: "Intermediate",
    minutes: 9,
    summary:
      "Multiword prepositions that give a cause: because of, due to, owing to, on account of, thanks to. The old debate over due to at the start of a sentence, the safe choices, and thanks to for good results.",
    objectives: [
      "Use because of, owing to and on account of + noun to give a cause.",
      "Know the due to debate: always correct after be (was due to), disputed at the start of a sentence.",
      "Use thanks to for a cause with a good result.",
    ],
    steps: [
      {
        id: "arrow",
        title: "Cause and effect",
        alt: "A cloud labelled heavy rain with an arrow to a box labelled match cancelled. Sentence: The match was cancelled because of heavy rain.",
        say: [
          { text: "Here is a cause, heavy rain, and its effect, a cancelled match.", cue: "eff" },
          { text: "These prepositions all introduce the cause as a noun: _because of, owing to, on account of, due to._ _The match was cancelled because of heavy rain._", cue: "s1" },
        ],
        actions: [
          { do: "draw", id: "rain", shape: "blob", points: [[140, 180], [190, 120], [290, 110], [360, 160], [330, 230], [180, 235]], ink: "accent2", fill: "soft", dur: 900 },
          { do: "write", id: "rain-l", text: "heavy rain", x: 250, y: 185, size: 28, ink: "accent2", anchor: "middle" },
          { do: "draw", id: "arr", shape: "arrow", from: [380, 175], to: [560, 175], ink: "trouble", width: 4, dur: 600 },
          { do: "draw", id: "eff", shape: "rect", x: 580, y: 130, w: 260, h: 90, ink: "accent", dur: 700 },
          { do: "write", id: "eff-l", text: "match cancelled", x: 710, y: 185, size: 28, ink: "accent", anchor: "middle" },
          { do: "write", id: "s1", text: "cancelled because of heavy rain", x: 480, y: 340, size: 38, anchor: "middle", gap: 400, dur: 1900 },
          { do: "highlight", id: "s1-h", target: "s1", word: "because of" },
          { do: "write", id: "s2", text: "owing to · on account of · due to", x: 480, y: 430, size: 34, ink: "muted", anchor: "middle", gap: 400 },
        ],
      },
      {
        id: "due",
        title: "The due to debate",
        alt: "Always fine: The delay was due to fog. Disputed by traditional critics: Due to fog, the flight was delayed. Safest: Owing to fog, the flight was delayed.",
        say: [
          { text: "Fog causes the delay: the plane cannot fly through it. **Due to** is always correct after _be_: _The delay was due to fog._", cue: "d1" },
          { text: "At the start of a sentence (_Due to fog, the flight was delayed_), traditional critics objected. Most dictionaries accept it today, but some examiners still mark it down.", cue: "d2" },
          { text: "So the **safest** opener is _Owing to fog_ or _Because of fog._", cue: "d3" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.pic("fd", "fogDelay", 330, 20, 2.1),
          ...PLAB.kit.lines("d", [["✓ The delay was due to fog.", { hl: "due to" }], ["? Due to fog, the flight was delayed. (disputed)", { ink: "muted", size: 30 }], ["✓ Owing to fog, the flight was delayed.", { hl: "Owing to" }]], { y: 270, gap: 85, size: 34 }),
        ],
      },
      {
        id: "thanks",
        title: "Thanks to",
        alt: "Sentence: Thanks to the new canal, crops have doubled. Note: usually a good result; ironic with a bad one.",
        say: [
          { text: "**Thanks to** gives a cause, usually with a good result: the new canal brings water and the crops grow. _Thanks to the new canal, crop yields have doubled._", cue: "t1" },
          { text: "With a bad result it sounds ironic: _Thanks to the strike, we missed the flight._", cue: "t2" },
        ],
        actions: [
          PLAB.kit.clear("clear-2"),
          ...PLAB.kit.pic("cn", "canal", 330, 20, 2.1),
          ...PLAB.kit.lines("t", [["Thanks to the canal, yields doubled.", { hl: "Thanks to" }], ["Thanks to the strike, we missed it. (ironic)", { ink: "muted", size: 30 }]], { y: 300, gap: 100, size: 36 }),
        ],
      },
      {
        id: "why-not",
        title: "Why not the other one?",
        alt: "Left: a fog with a delayed plane, labelled The delay was due to fog (after be). Right: the same, labelled Due to fog, the flight was delayed (disputed at the start).",
        say: [
          { text: "_The delay was due to fog._ After **be**, due to is accepted by everyone.", cue: "wn1" },
          { text: "At the start of a sentence, _due to_ is disputed. Many examiners prefer **owing to** or **because of** there.", cue: "wn2" },
          { text: "Safest: _Owing to fog, the flight was delayed._", cue: "wn-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.swap("wn", ["fogDelay", "The delay was due to fog.", "safe after be", { hl: "due to" }], ["fogDelay", "? Due to fog, the flight was delayed.", "disputed at the start", { ink: "trouble" }], ["was due to fog", "Owing to fog, ... \u00b7 Because of fog, ..."]),
        ],
      },
      {
        id: "check",
        title: "Check: the safest opener",
        alt: "The thanks to examples remain on the board.",
        say: [{ text: "Which opener would no examiner question?" }],
        actions: [],
        check: {
          id: "cause-q1",
          source: "original",
          skill: "owing to at the start of a sentence",
          prompt: "Which is the safest choice for a formal essay?",
          options: [
            { text: "Owing to the shortage of funds, the project was abandoned.", correct: true, why: "Correct. _Owing to_ at the start of a sentence is accepted by everyone." },
            { text: "Due to the shortage of funds, the project was abandoned.", misconception: "due-to-debate", why: "Widely accepted today, but traditional critics object to sentence-initial _due to._ _Owing to_ is the safe choice." },
            { text: "Because the shortage of funds, the project was abandoned.", misconception: "prep-vs-conj", why: "_Because_ needs a clause. Before a noun, use _because of._" },
          ],
        },
      },
    ],
  });
})();
