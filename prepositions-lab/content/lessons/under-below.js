/* Lesson 1.12: UNDER, BELOW, BENEATH, UNDERNEATH. */
PLAB.registerLesson({
  id: "under-below",
  title: "UNDER, BELOW, BENEATH, UNDERNEATH",
  phase: 1,
  unit: "p1-position",
  level: "Intermediate",
  minutes: 11,
  summary:
    "The mirror of over and above. Below is a lower level; under is directly lower, often covered or touching. Beneath is formal, underneath stresses being hidden. Then levels (below average), amounts (under 18) and the abstract under: under pressure, under review, under Article 25.",
  objectives: [
    "Use below for a lower level and under for directly beneath, often covered.",
    "Recognise beneath as formal or literary and underneath as stressing hidden or covered.",
    "Use under for control, process and law: under pressure, under review, under Article 25.",
  ],
  steps: [
    {
      id: "below",
      title: "Below: a lower level",
      alt: "A hill with a village lower down at its foot. Sentence: The village lies below the hill.",
      say: [
        { text: "Here is a hill, and a village lower down.", cue: "hill" },
        { text: "The village is at a lower level, with no contact: **below**. _The village lies below the hill._", cue: "s-below" },
        { text: "Below is the mirror image of above. _Above the clouds / below the clouds._", cue: "h-below" },
      ],
      actions: [
        { do: "draw", id: "hill", shape: "blob", points: [[260, 330], [380, 160], [470, 110], [580, 170], [700, 330]], ink: "accent2", fill: "soft", dur: 1300 },
        { do: "draw", id: "village", shape: "group", ink: "accent", width: 2.8, dur: 1100, gap: 400, parts: [{ shape: "rect", x: 730, y: 380, w: 40, h: 34, wobble: 0.6 }, { shape: "rect", x: 790, y: 372, w: 46, h: 42, wobble: 0.6 }, { shape: "line", from: [700, 416], to: [880, 416], wobble: 0.6 }] },
        { do: "write", id: "v-label", text: "village", x: 790, y: 455, size: 28, ink: "accent", anchor: "middle" },
        { do: "write", id: "s-below", text: "The village lies below the hill.", x: 400, y: 530, size: 40, anchor: "middle", gap: 400, dur: 1900 },
        { do: "highlight", id: "h-below", target: "s-below", word: "below" },
      ],
    },
    {
      id: "under",
      title: "Under: directly below, often covered",
      alt: "A table with a cat underneath it. Beside it, a blanket with a shape hidden under it. Sentences: The cat is under the table. The letter was under the carpet.",
      say: [
        { text: "**Under** means directly lower than something, usually covered or touching it.", cue: "table" },
        { text: "_The cat is sleeping under the table._ The table is right over it.", cue: "s-cat" },
        { text: "_The letter was under the carpet._ Here it is covered and touching: under, not below.", cue: "s-carpet" },
      ],
      actions: [
        { do: "erase", id: "clear-below", targets: "all" },
        { do: "draw", id: "table", shape: "group", width: 4, dur: 1200, gap: 400, parts: [{ shape: "line", from: [100, 240], to: [420, 240] }, { shape: "line", from: [130, 240], to: [130, 360] }, { shape: "line", from: [390, 240], to: [390, 360] }] },
        { do: "draw", id: "cat", shape: "group", ink: "accent", dur: 800, parts: [{ shape: "ellipse", cx: 250, cy: 340, rx: 40, ry: 18 }, { shape: "circle", cx: 298, cy: 328, r: 13 }] },
        { do: "write", id: "s-cat", text: "The cat is under the table.", x: 260, y: 440, size: 34, anchor: "middle", dur: 1700 },
        { do: "highlight", id: "h-cat", target: "s-cat", word: "under" },
        { do: "draw", id: "carpet", shape: "group", ink: "accent2", dur: 1000, gap: 600, parts: [{ shape: "line", from: [540, 340], to: [880, 340] }, { shape: "line", from: [540, 340], to: [880, 340], bow: -16 }] },
        { do: "draw", id: "letter", shape: "rect", x: 680, y: 328, w: 60, h: 12, ink: "accent", fill: "soft", wobble: 0.4, dur: 500 },
        { do: "write", id: "s-carpet", text: "The letter was under the carpet.", x: 710, y: 440, size: 32, anchor: "middle", dur: 1800 },
        { do: "highlight", id: "h-carpet", target: "s-carpet", word: "under" },
      ],
    },
    {
      id: "beneath",
      title: "Beneath and underneath",
      alt: "Two lines. Beneath the surface, labelled formal or literary. Underneath the mat, labelled hidden or covered.",
      say: [
          { text: "**Beneath** means under or below, but it is formal or literary. The fish swims beneath the surface of the water: _beneath the surface, beneath the stars._", cue: "b1" },
          { text: "**Underneath** stresses being hidden or covered. The key cannot be seen: it is underneath the mat. It also works alone: _Lift the mat; the key is underneath._", cue: "b2" },
        ],
      actions: [
          PLAB.kit.clear("clear-under"),
          ...PLAB.kit.panels("b", [
            ["fish", "beneath the surface", "formal, literary", { hl: "beneath" }],
            ["mat", "underneath the mat", "hidden, covered", { hl: "underneath" }],
          ]),
        ],
    },
    {
      id: "check-hidden",
      title: "Check: hidden under",
      alt: "The beneath and underneath phrases remain on the board.",
      say: [{ text: "Is the thing covered, or simply at a lower level?" }],
      actions: [],
      check: {
        id: "under-q1",
        source: "original",
        skill: "under vs below",
        prompt: "The spare key is hidden ___ the doormat.",
        options: [
          { text: "under", correct: true, why: "Correct. The key is covered by the mat and touching it: _under_ (or _underneath_) the doormat." },
          { text: "below", misconception: "under-vs-below", why: "Below means at a lower level, usually with a gap. Something covered by a mat is under it." },
          { text: "above", misconception: "under-vs-below", why: "Above would put the key higher than the mat. It is covered by the mat: under." },
        ],
      },
    },
    {
      id: "scale",
      title: "Levels and amounts",
      alt: "A scale with a line marked zero. Below it: below zero, below average, below the poverty line. To the side: under 18, under Rs 1,000, meaning less than.",
      say: [
        { text: "On a scale, **below** means at a lower level: _below zero, below average, below the poverty line._", cue: "line" },
        { text: "**Under** often means less than an amount or age: _children under five, under Rs 1,000._ It is the mirror of over.", cue: "s-under" },
      ],
      actions: [
        { do: "erase", id: "clear-beneath", targets: "all" },
        { do: "draw", id: "scale", shape: "arrow", from: [160, 460], to: [160, 80], dur: 1000, gap: 400 },
        { do: "draw", id: "line", shape: "line", from: [140, 220], to: [440, 220], ink: "accent2", width: 3, dur: 700 },
        { do: "write", id: "zero", text: "the poverty line", x: 200, y: 205, size: 26, ink: "accent2" },
        { do: "draw", id: "dot", shape: "circle", cx: 300, cy: 330, r: 11, ink: "trouble", fill: "solid", dur: 400 },
        { do: "write", id: "sc-below", text: "below the line", x: 320, y: 320, size: 34, ink: "trouble" },
        { do: "write", id: "more", text: "below zero · below average", x: 330, y: 380, size: 26, ink: "muted" },
        { do: "write", id: "s-under", text: "children under five", x: 730, y: 220, size: 36, anchor: "middle", gap: 600 },
        { do: "write", id: "u2", text: "= younger than / less than", x: 730, y: 280, size: 26, ink: "muted", anchor: "middle" },
      ],
    },
    {
      id: "abstract",
      title: "Under for control, process and law",
      alt: "Four phrases: under pressure, under review, under construction, under Article 25 of the Constitution.",
      say: [
          { text: "The abstract under keeps the picture of something **above you**, pressing, watching or covering.", cue: "ua1" },
          { text: "**Pressure or control**: a weight presses down from above. _Under pressure, under British rule, under the leadership of._", cue: "ua1" },
          { text: "**A process**: the document lies under the magnifying glass while someone examines it. _Under review, under consideration, under construction._", cue: "ua2" },
          { text: "**Law and rules**: the law is like a roof over the people it governs. _Under Article 25 of the Constitution, under the new law._", cue: "ua3" },
        ],
      actions: [
          PLAB.kit.clear("clear-scale"),
          ...PLAB.kit.panels("ua", [
            ["pressed", "under pressure", "a weight from above", { hl: "under" }],
            ["review", "under review", "examined from above", { hl: "under" }],
            ["lawRoof", "under Article 25", "the law covers them", { hl: "under" }],
          ]),
        ],
    },
    {
      id: "check-consider",
      title: "Check: a trap with beneath",
      alt: "The under phrases remain on the board.",
      say: [{ text: "An original practice question. One wrong option is real English with a very different meaning." }],
      actions: [],
      check: {
        id: "under-q2",
        source: "original",
        skill: "under for a process",
        prompt: "The proposal is currently ___ consideration by the committee.",
        options: [
          { text: "under", correct: true, why: "Correct. _Under consideration_ means the process of considering is happening to it." },
          { text: "beneath", misconception: "under-abstract", why: "_Beneath consideration_ means not worth considering, an insult. The process is _under consideration._" },
          { text: "below", misconception: "under-abstract", why: "Below is for levels on a scale. A process acting on something takes under." },
        ],
      },
    },
    {
      id: "why-not",
      title: "Why this one and not the others?",
      alt: "The sentence The cat is sleeping with a gap the table., then the candidates with pictures: under (right: directly beneath, covered by it); below (wrong: for levels and scales: below zero); on (wrong: on top of it); in (wrong: inside it, in a drawer). Rule: under = directly beneath, covered; below = lower on a level or scale.",
      say: [
        { text: "Fill the gap: The cat is sleeping \u2026 the table. The answer is **under**: directly beneath, covered by it.", cue: "why1" },
        { text: "Why not the others? **below**: for levels and scales: below zero. **on**: on top of it. **in**: inside it, in a drawer.", cue: "why2" },
        { text: "The rule: under = directly beneath, covered; below = lower on a level or scale.", cue: "why-r1" },
      ],
      actions: [
        PLAB.kit.clear("clear-why"),
        ...PLAB.kit.lineup("why", "The cat is sleeping ____ the table.", [["underTable", "under", true, "directly beneath, | covered by it"], ["belowLine", "below", false, "for levels and | scales: below zero"], ["cupOnTable", "on", false, "on top of it"], ["inDrawer", "in", false, "inside it, | in a drawer"]], ["under = directly beneath, covered", "below = lower on a level or scale"]),
      ],
    },
    {
      id: "summary",
      title: "The summary",
      alt: "Four words with notes. Below: lower level, below average. Under: directly beneath, covered, under five, under pressure, under review. Beneath: formal. Underneath: hidden.",
      say: [
        { text: "**Below**: a lower level, also on a scale. **Under**: directly beneath, covered; less than; and control, process, law.", cue: "c2" },
        { text: "**Beneath** is formal; **underneath** stresses hidden. And watch _beneath contempt_ or _beneath consideration_: not worthy of it.", cue: "c3" },
      ],
      actions: [
        { do: "erase", id: "clear-abstract", targets: "all" },
        { do: "write", id: "c1", text: "below: a lower level · below average", x: 480, y: 120, size: 34, anchor: "middle", gap: 400, dur: 1800 },
        { do: "write", id: "c2", text: "under: covered · under five · under review", x: 480, y: 220, size: 34, anchor: "middle", dur: 2000 },
        { do: "write", id: "c3", text: "beneath: formal · underneath: hidden", x: 480, y: 320, size: 34, anchor: "middle", dur: 1800 },
        { do: "write", id: "c4", text: "beneath contempt = not worthy", x: 480, y: 430, size: 32, ink: "trouble", anchor: "middle", gap: 500, dur: 1600 },
      ],
    },
  ],
});
