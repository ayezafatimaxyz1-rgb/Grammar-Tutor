/* Lesson 1.49: INCLUDING, EXCLUDING, NOTWITHSTANDING. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "including-excluding",
    title: "INCLUDING, EXCLUDING, NOTWITHSTANDING",
    phase: 1,
    unit: "p1-relations",
    level: "Advanced",
    minutes: 7,
    summary:
      "Including marks part of a total; excluding leaves it out. Notwithstanding is a formal, often legal, despite, and it can even follow its noun: these objections notwithstanding.",
    objectives: [
      "Use including and excluding to show what a total contains.",
      "Use notwithstanding before or after its noun in formal and legal writing.",
    ],
    steps: [
      {
        id: "total",
        title: "Inside the total or outside",
        alt: "A circle labelled total cost with items inside: fees, books. Outside: hostel. Sentences: Rs 50,000, including books. Rs 50,000, excluding hostel charges.",
        say: [
          { text: "Here is a total. **Including** marks items that are part of it: _The fee is Rs 50,000, including books._", cue: "s1" },
          { text: "**Excluding** marks items left out: _Rs 50,000, excluding hostel charges._", cue: "s2" },
        ],
        actions: [
          { do: "draw", id: "tot", shape: "ellipse", cx: 330, cy: 190, rx: 220, ry: 110, ink: "accent2", fill: "soft", dur: 900 },
          { do: "write", id: "in1", text: "fees · books", x: 330, y: 200, size: 32, ink: "accent", anchor: "middle" },
          { do: "write", id: "out1", text: "hostel", x: 720, y: 200, size: 32, ink: "trouble", anchor: "middle" },
          { do: "write", id: "s1", text: "Rs 50,000, including books", x: 480, y: 380, size: 36, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s1-h", target: "s1", word: "including" },
          { do: "write", id: "s2", text: "Rs 50,000, excluding hostel charges", x: 480, y: 460, size: 36, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s2-h", target: "s2", word: "excluding" },
        ],
      },
      {
        id: "notwith",
        title: "Notwithstanding",
        alt: "Two positions: Notwithstanding these objections, the bill was passed. These objections notwithstanding, the bill was passed. Meaning: despite.",
        say: [
          { text: "**Notwithstanding** means _despite_, in formal and legal English: the objections stood in the way, but the bill went over them. _Notwithstanding these objections, the bill was passed._", cue: "n1" },
          { text: "Unusually, it can also come **after** its noun: _These objections notwithstanding, the bill was passed._", cue: "n2" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.pic("or", "overRock", 330, 20, 2.1),
          ...PLAB.kit.lines("n", [["Notwithstanding these objections, ...", { hl: "Notwithstanding" }], ["These objections notwithstanding, ...", { hl: "notwithstanding" }], ["= despite (formal, legal)", { ink: "accent2", size: 30 }]], { y: 270, gap: 85, size: 36 }),
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence The fee is Rs 50,000, with a gap hostel charges. (They are not in it.), then the candidates with pictures: excluding (right: left out of the total); including (correct English but a different meaning: the charges are inside the total); besides (correct English but a different meaning: in addition to the charges). Rule: including = part of the total; excluding = left out.",
        say: [
          { text: "Fill the gap: The fee is Rs 50,000, \u2026 hostel charges. (They are not in it.) What does the sentence want to say? The answer is **excluding**: left out of the total.", cue: "why1" },
          { text: "Why not the others? **including** is correct English, but it would mean the charges are inside the total. That is not what this sentence says. **besides** is correct English, but it would mean in addition to the charges. That is not what this sentence says.", cue: "why2" },
          { text: "The rule: including = part of the total; excluding = left out.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "The fee is Rs 50,000, ____ hostel charges. (They are not in it.)", [["groupOut", "excluding", true, "left out of | the total"], ["plus", "including", "diff", "the charges are | inside the total"], ["addMore", "besides", "diff", "in addition | to the charges"]], ["including = part of the total", "excluding = left out"]),
        ],
      },
      {
        id: "check",
        title: "Check: formal register",
        alt: "The notwithstanding rows remain on the board.",
        say: [{ text: "An original practice question in legal style." }],
        actions: [],
        check: {
          id: "incl-q1",
          source: "original",
          skill: "notwithstanding",
          prompt: "___ anything contained in any other law, this Act shall prevail.",
          options: [
            { text: "Notwithstanding", correct: true, why: "Correct. This is the standard legal formula: _notwithstanding anything contained in any other law._" },
            { text: "Including", misconception: "including-family", why: "Including would add the other laws to this Act, the opposite of the intended meaning." },
            { text: "Despite of", misconception: "despite-of", why: "_Despite_ never takes _of_, and legal drafting uses _notwithstanding_ here." },
          ],
        },
      },
    ],
  });
})();
