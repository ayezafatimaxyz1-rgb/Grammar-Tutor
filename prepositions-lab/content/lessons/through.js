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
      alt: "A pipe-like channel from a dot labelled effort to a dot labelled success. Phrases: through hard work, through the media, through official channels.",
      say: [
        { text: "If you get somewhere by passing through something, that thing becomes the **means** or channel.", cue: "pipe" },
        { text: "_She succeeded through hard work. The news spread through social media. Apply through official channels._", cue: "m1" },
      ],
      actions: [
        { do: "erase", id: "clear-tunnel", targets: "all" },
        { do: "draw", id: "pipe", shape: "group", ink: "accent2", dur: 1100, gap: 400, parts: [{ shape: "line", from: [300, 160], to: [660, 160] }, { shape: "line", from: [300, 220], to: [660, 220] }] },
        { do: "draw", id: "flow", shape: "arrow", from: [180, 190], to: [780, 190], ink: "accent", dur: 1000 },
        { do: "write", id: "m1", text: "through hard work", x: 480, y: 320, size: 40, anchor: "middle", gap: 400 },
        { do: "write", id: "m2", text: "through social media · through official channels", x: 480, y: 410, size: 32, anchor: "middle", gap: 400, dur: 2200 },
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
      title: "Why not the other one?",
      alt: "Left: a road with an arrow across it, labelled She walked across the road. Right: an arrow passing inside something, labelled She walked through the road, which needs an inside.",
      say: [
        { text: "_She walked across the road_: from one side to the other over a flat surface.", cue: "wn1" },
        { text: "**Through** needs something with an inside, like a tunnel or a forest. A road has no inside to pass through.", cue: "wn2" },
        { text: "So: _across the road, across the field_; _through the tunnel, through the forest._", cue: "wn-r1" },
      ],
      actions: [
        PLAB.kit.clear("clear-why"),
        ...PLAB.kit.swap("wn", ["roadPass", "She walked across the road.", "over a surface", { hl: "across" }], ["passThrough", "\u2717 She walked through the road.", "a road has no inside", { ink: "trouble" }], ["across = over a surface, side to side", "through = in one side and out the other"]),
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
