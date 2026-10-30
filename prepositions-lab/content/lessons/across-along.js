/* Lesson 1.24: ACROSS and ALONG, and how they differ from through. */
PLAB.registerLesson({
  id: "across-along",
  title: "ACROSS and ALONG",
  phase: 1,
  unit: "p1-movement",
  level: "Intermediate",
  minutes: 9,
  summary:
    "Across goes from one side of a surface or line to the other; along follows its length. Through needs depth, across needs only a surface. Also across the country (everywhere in it) and along with.",
  objectives: [
    "Use across for side to side and along for following the length of something.",
    "Choose through for things with depth (a forest) and across for surfaces (a field).",
    "Use across for everywhere in an area, and along with for together with.",
  ],
  steps: [
    {
      id: "river",
      title: "Across the river, along the river",
      alt: "A river drawn as two long parallel lines. One arrow goes straight from one bank to the other: across. Another arrow runs beside the river, following its length: along.",
      say: [
        { text: "Here is a river, a long strip with two banks.", cue: "river" },
        { text: "Going from one bank to the other side is **across**: _They swam across the river._", cue: "s-across" },
        { text: "Following its length is **along**: _We walked along the river._", cue: "s-along" },
      ],
      actions: [
        { do: "draw", id: "river", shape: "group", ink: "accent2", dur: 1300, parts: [{ shape: "line", from: [80, 180], to: [880, 180], bow: 8 }, { shape: "line", from: [80, 280], to: [880, 280], bow: 8 }] },
        { do: "draw", id: "a-across", shape: "arrow", from: [300, 130], to: [300, 330], ink: "accent", width: 4, dur: 900, gap: 400 },
        { do: "write", id: "s-across", text: "swam across the river", x: 300, y: 400, size: 32, ink: "accent", anchor: "middle" },
        { do: "draw", id: "a-along", shape: "arrow", from: [480, 330], to: [860, 330], ink: "trouble", width: 4, dur: 1000, gap: 500 },
        { do: "write", id: "s-along", text: "walked along the river", x: 680, y: 400, size: 32, ink: "trouble", anchor: "middle" },
      ],
    },
    {
      id: "through-across",
      title: "Through or across?",
      alt: "Left: a forest of trees with an arrow going in among them and out the far side: through the forest. Right: a flat field with an arrow over its surface: across the field.",
      say: [
        { text: "A forest has depth: you are surrounded by trees as you go. **Through** the forest.", cue: "forest" },
        { text: "A field is a flat surface: you move over it. **Across** the field.", cue: "field" },
        { text: "So _through_ for depth (a crowd, a tunnel, the jungle), _across_ for a surface or line (a road, a field, a border).", cue: "rule" },
      ],
      actions: [
        { do: "erase", id: "clear-river", targets: "all" },
        { do: "draw", id: "forest", shape: "group", ink: "accent2", width: 2.6, dur: 1400, gap: 400, parts: [[150, 150], [230, 130], [310, 155], [170, 240], [260, 250], [340, 235]].map(([cx, cy]) => ({ shape: "circle", cx, cy, r: 28 })) },
        { do: "draw", id: "f-arrow", shape: "arrow", from: [70, 200], to: [420, 195], ink: "accent", dur: 900 },
        { do: "write", id: "f-l", text: "through the forest", x: 245, y: 340, size: 32, ink: "accent", anchor: "middle" },
        { do: "draw", id: "field", shape: "rect", x: 540, y: 150, w: 330, h: 120, ink: "muted", dur: 900, gap: 400 },
        { do: "draw", id: "fl-arrow", shape: "arrow", from: [550, 210], to: [860, 210], ink: "trouble", dur: 800 },
        { do: "write", id: "field-l", text: "across the field", x: 705, y: 340, size: 32, ink: "trouble", anchor: "middle" },
        { do: "write", id: "rule", text: "through: depth · across: a surface", x: 480, y: 460, size: 34, anchor: "middle", gap: 500 },
      ],
    },
    {
      id: "check-road",
      title: "Check: side to side",
      alt: "The forest and the field remain on the board.",
      say: [{ text: "Does the movement go side to side, or follow the length?" }],
      actions: [],
      check: {
        id: "across-q1",
        source: "original",
        skill: "across vs along",
        prompt: "Look both ways before you walk ___ the road.",
        options: [
          { text: "across", correct: true, why: "Correct. Crossing from one side of the road to the other is _across_." },
          { text: "along", misconception: "through-across-along", why: "Along would mean walking down the length of the road, not crossing it." },
          { text: "through", misconception: "through-across-along", why: "A road is a surface without depth. You cross it: across." },
        ],
      },
    },
    {
      id: "everywhere",
      title: "Across the country, along with",
      alt: "An outline of a country with dots spread all over it. Phrase: across the country, meaning in every part of it. Below: along with, meaning together with.",
      say: [
        { text: "**Across** can also mean **in every part of** an area: _Protests were held across the country._", cue: "c1" },
        { text: "**Along with** means _together with_: _The minister, along with his advisers, attended the meeting._ The verb agrees with the first subject: _the minister ... attended._", cue: "c2" },
      ],
      actions: [
        { do: "erase", id: "clear-through", targets: "all" },
        { do: "draw", id: "country", shape: "blob", points: [[200, 100], [420, 80], [560, 140], [580, 270], [430, 340], [230, 320], [150, 210]], ink: "accent2", dur: 1200, gap: 400 },
        { do: "draw", id: "dots", shape: "group", ink: "trouble", fill: "solid", dur: 900, parts: [[250, 150], [380, 130], [490, 190], [300, 250], [450, 280], [220, 230], [520, 250]].map(([cx, cy]) => ({ shape: "circle", cx, cy, r: 8 })) },
        { do: "write", id: "c1", text: "across the country", x: 760, y: 220, size: 34, anchor: "middle" },
        { do: "write", id: "c1b", text: "= in every part", x: 760, y: 270, size: 28, ink: "muted", anchor: "middle" },
        { do: "write", id: "c2", text: "The minister, along with his advisers, attended.", x: 480, y: 450, size: 32, anchor: "middle", gap: 600, dur: 2400 },
        { do: "highlight", id: "c2-h", target: "c2", word: "along with" },
      ],
    },
    {
      id: "why-not",
      title: "Why this one and not the others?",
      alt: "The sentence We swam with a gap the river to the other bank., then the candidates with pictures: across (right: from one bank to the other); along (wrong: following its length); above (wrong: above the water, not in it). Rule: across = side to side; along = following the length.",
      say: [
        { text: "Fill the gap: We swam \u2026 the river to the other bank. The answer is **across**: from one bank to the other.", cue: "why1" },
        { text: "Why not the others? **along**: following its length. **above**: above the water, not in it.", cue: "why2" },
        { text: "The rule: across = side to side; along = following the length.", cue: "why-r1" },
      ],
      actions: [
        PLAB.kit.clear("clear-why"),
        ...PLAB.kit.lineup("why", "We swam ____ the river to the other bank.", [["crossRiver", "across", true, "from one bank | to the other"], ["alongRiver", "along", false, "following its | length"], ["floatAbove", "above", false, "above the water, | not in it"]], ["across = side to side", "along = following the length"]),
      ],
    },
    {
      id: "summary",
      title: "The summary",
      alt: "Across: side to side, over a surface, in every part. Along: following the length; along with means together with. Through: depth.",
      say: [{ text: "**Across**: side to side over a surface, or everywhere in an area. **Along**: following the length; _along with_ = together with. **Through** when there is depth.", cue: "c3" }],
      actions: [
        { do: "erase", id: "clear-everywhere", targets: "all" },
        { do: "write", id: "s1", text: "across: side to side · across the country", x: 480, y: 150, size: 34, anchor: "middle", gap: 400 },
        { do: "write", id: "s2", text: "along: the length · along with", x: 480, y: 240, size: 34, anchor: "middle" },
        { do: "write", id: "c3", text: "through: with depth", x: 480, y: 330, size: 34, anchor: "middle" },
      ],
    },
  ],
});
