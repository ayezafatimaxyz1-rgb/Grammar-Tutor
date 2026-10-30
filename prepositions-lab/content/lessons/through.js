/* Lesson 1.23: THROUGH: in one side and out the other. */
PLAB.registerLesson({
  id: "through",
  title: "THROUGH: in one side, out the other",
  phase: 1,
  unit: "p1-movement",
  level: "Intermediate",
  minutes: 9,
  summary:
    "Through is movement into something and out of the other side: a tunnel, a forest, a window. From there: means (through hard work), a whole period (through the night) and American Monday through Friday.",
  objectives: [
    "Use through for movement into and out of the far side of something with depth.",
    "Use through for means and channels: through hard work, through the media.",
    "Understand through for a whole period, and American Monday through Friday (inclusive).",
  ],
  steps: [
    {
      id: "tunnel",
      title: "Through a tunnel",
      alt: "A hill with a tunnel. A train path enters on the left and comes out on the right. Sentence: The train went through the tunnel.",
      say: [
        { text: "Here is a hill with a tunnel cut into it.", cue: "hill" },
        { text: "The train goes in at one end and out of the other. That whole journey, inside something with depth, is **through**: _The train went through the tunnel._", cue: "s1" },
        { text: "The same for _through the forest, through the crowd, through the window_ (in one side of the glass and out the other).", cue: "h1" },
      ],
      actions: [
        { do: "draw", id: "hill", shape: "blob", points: [[260, 330], [340, 170], [480, 110], [620, 170], [700, 330]], ink: "accent2", fill: "soft", dur: 1300 },
        { do: "draw", id: "tunnel", shape: "rect", x: 300, y: 260, w: 360, h: 70, ink: "muted", dur: 700, gap: 300 },
        { do: "draw", id: "track", shape: "arrow", from: [100, 300], to: [860, 300], ink: "accent", width: 4, dur: 1500, gap: 300 },
        { do: "write", id: "s1", text: "The train went through the tunnel.", x: 480, y: 440, size: 40, anchor: "middle", gap: 400, dur: 2000 },
        { do: "highlight", id: "h1", target: "s1", word: "through" },
      ],
    },
    {
      id: "means",
      title: "Through as a channel or means",
      alt: "Three pictures: a person working towards a star (through hard work), speech travelling between people (through social media), an arrow passing through a gate (through official channels).",
      say: [
        { text: "If you get somewhere by passing through something, that thing becomes the **means** or channel.", cue: "m1" },
        { text: "_She succeeded through hard work. The news spread through social media. Apply through official channels._", cue: "m2" },
      ],
      actions: [
        PLAB.kit.clear("clear-rd-means"),
        ...PLAB.kit.grid("m", [
          ["workSuccess", "through hard work", "the road that led to success", { hl: "through" }],
          ["wordsMove", "through social media", "the channel the news passed along", { hl: "through" }],
          ["accessTo", "through official channels", "the route an application takes", { hl: "through" }],
        ]),
      ],
    },
    {
      id: "time",
      title: "Through for time",
      alt: "A dark bar labelled the night with an arrow running its full length. Phrases: worked through the night; Monday through Friday (AmE), meaning Monday to Friday inclusive.",
      say: [
        { text: "Time can be passed through like a tunnel: from start to end without stopping. _They worked through the night._", cue: "t1" },
        { text: "American English uses _Monday through Friday_ to mean Monday to Friday **inclusive**. British English says _Monday to Friday_ or _Monday to Friday inclusive._", cue: "t2" },
      ],
      actions: [
        { do: "erase", id: "clear-means", targets: "all" },
        { do: "draw", id: "night", shape: "rect", x: 160, y: 130, w: 640, h: 70, ink: "main", fill: "soft", dur: 900, gap: 400 },
        { do: "draw", id: "run", shape: "arrow", from: [120, 165], to: [840, 165], ink: "accent", dur: 1000 },
        { do: "write", id: "t1", text: "They worked through the night.", x: 480, y: 300, size: 40, anchor: "middle", gap: 400, dur: 1800 },
        { do: "highlight", id: "t1-h", target: "t1", word: "through" },
        { do: "write", id: "t2", text: "AmE: Monday through Friday = inclusive", x: 480, y: 410, size: 32, ink: "muted", anchor: "middle", gap: 500, dur: 2000 },
      ],
    },
    {
      id: "check-tunnel",
      title: "Check: means",
      alt: "The time bar and the two phrases remain on the board.",
      say: [{ text: "An original practice question in formal style." }],
      actions: [],
      check: {
        id: "through-q1",
        source: "original",
        skill: "through for means",
        prompt: "The reforms were achieved ___ years of patient negotiation.",
        options: [
          { text: "through", correct: true, why: "Correct. The negotiation was the channel by which the reforms came: _achieved through negotiation._" },
          { text: "across", misconception: "through-across-along", why: "Across is movement over a surface from side to side. A means or channel takes through." },
          { text: "along", misconception: "through-across-along", why: "Along follows the length of a line. A means takes through (or by)." },
        ],
      },
    },
    {
      id: "why-not",
      title: "Why this one and not the others?",
      alt: "The sentence The train went with a gap the tunnel., then the candidates with pictures: through (right: in one end, out the other); across (wrong: across = over a surface); along (wrong: along = following a line); in (wrong: in = inside, not passing through). Rule: through = in one side and out the other; across = over a surface \u00b7 along = following a line.",
      say: [
        { text: "Fill the gap: The train went \u2026 the tunnel. The answer is **through**: in one end, out the other.", cue: "why1" },
        { text: "Why not the others? **across**: across = over a surface. **along**: along = following a line. **in**: in = inside, not passing through.", cue: "why2" },
        { text: "The rule: through = in one side and out the other; across = over a surface \u00b7 along = following a line.", cue: "why-r1" },
      ],
      actions: [
        PLAB.kit.clear("clear-why"),
        ...PLAB.kit.lineup("why", "The train went ____ the tunnel.", [["passThrough", "through", true, "in one end, | out the other"], ["roadPass", "across", false, "across = over | a surface"], ["alongRiver", "along", false, "along = following | a line"], ["loop", "in", false, "in = inside, | not passing through"]], ["through = in one side and out the other", "across = over a surface \u00b7 along = following a line"]),
      ],
    },
    {
      id: "summary",
      title: "The summary",
      alt: "Through: in one side, out the other (tunnel, forest, window); means (through hard work); a whole period (through the night); AmE Monday through Friday.",
      say: [{ text: "**Through** = in one side and out the other, a means or channel, and a whole period.", cue: "c3" }],
      actions: [
        { do: "erase", id: "clear-time", targets: "all" },
        { do: "write", id: "c1", text: "through the tunnel · through the forest", x: 480, y: 150, size: 34, anchor: "middle", gap: 400 },
        { do: "write", id: "c2", text: "through hard work · through the media", x: 480, y: 240, size: 34, anchor: "middle" },
        { do: "write", id: "c3", text: "through the night · (AmE) Monday through Friday", x: 480, y: 330, size: 32, anchor: "middle" },
      ],
    },
  ],
});
