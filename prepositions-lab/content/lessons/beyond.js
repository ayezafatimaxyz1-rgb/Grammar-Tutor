/* Lesson 1.27: BEYOND: further than a limit. */
PLAB.registerLesson({
  id: "beyond",
  title: "BEYOND: further than a limit",
  phase: 1,
  unit: "p1-movement",
  level: "Intermediate",
  minutes: 7,
  summary:
    "Beyond places something on the far side of a line or limit: beyond the river. In formal writing it marks limits of possibility, knowledge and control: beyond doubt, beyond repair, beyond my understanding, beyond the scope.",
  objectives: [
    "Use beyond for the far side of something: beyond the river, beyond the hills.",
    "Use beyond for abstract limits: beyond doubt, beyond control, beyond repair, beyond the scope.",
    "Use beyond for time after a limit: beyond 2030.",
  ],
  steps: [
    {
      id: "far",
      title: "The far side",
      alt: "A person on the near side of a river. On the far side, past the river, a village. Sentence: The village lies beyond the river.",
      say: [
        { text: "You stand here. A river runs across your view.", cue: "river" },
        { text: "On the far side of it is a village. **Beyond** = on the far side of, further than: _The village lies beyond the river._", cue: "s1" },
      ],
      actions: [
        { do: "draw", id: "me", shape: "person", x: 150, y: 220, scale: 1, ink: "accent", dur: 800 },
        { do: "draw", id: "river", shape: "group", ink: "accent2", dur: 1000, gap: 300, parts: [{ shape: "line", from: [380, 80], to: [420, 380], bow: 10 }, { shape: "line", from: [460, 80], to: [500, 380], bow: 10 }] },
        { do: "draw", id: "village", shape: "group", ink: "trouble", dur: 900, gap: 300, parts: [{ shape: "rect", x: 650, y: 230, w: 50, h: 46 }, { shape: "rect", x: 720, y: 220, w: 60, h: 56 }] },
        { do: "write", id: "s1", text: "The village lies beyond the river.", x: 480, y: 470, size: 40, anchor: "middle", gap: 400, dur: 1900 },
        { do: "highlight", id: "s1-h", target: "s1", word: "beyond" },
      ],
    },
    {
      id: "limits",
      title: "Beyond a limit",
      alt: "A circle labelled what is possible, with a point outside it. Phrases: beyond doubt, beyond repair, beyond control, beyond my understanding, beyond the scope of this essay.",
      say: [
        { text: "Picture what is possible as an area with a limit. Beyond it is everything that is not possible.", cue: "area" },
        { text: "_His guilt was proved beyond doubt_ (no doubt can reach it). _The car was damaged beyond repair_ (cannot be repaired).", cue: "l1" },
        { text: "_beyond our control, beyond my understanding, beyond the scope of this essay._ Very useful in CSS essays and précis.", cue: "l2" },
      ],
      actions: [
        { do: "erase", id: "clear-far", targets: "all" },
        { do: "draw", id: "area", shape: "ellipse", cx: 280, cy: 200, rx: 190, ry: 110, ink: "accent2", fill: "soft", dur: 1100, gap: 400 },
        { do: "write", id: "area-l", text: "possible", x: 280, y: 210, size: 30, ink: "accent2", anchor: "middle" },
        { do: "draw", id: "pt", shape: "circle", cx: 600, cy: 200, r: 13, ink: "trouble", fill: "solid", dur: 400 },
        { do: "write", id: "l1", text: "beyond doubt · beyond repair", x: 760, y: 170, size: 30, ink: "trouble", anchor: "middle" },
        { do: "write", id: "l2", text: "beyond our control · beyond the scope", x: 480, y: 420, size: 34, anchor: "middle", gap: 500, dur: 2100 },
      ],
    },
    {
      id: "check-repair",
      title: "Check: exam style",
      alt: "The possible area and the phrases remain on the board.",
      say: [{ text: "An original practice question in CSS style." }],
      actions: [],
      check: {
        id: "beyond-q1",
        source: "original",
        skill: "beyond for limits",
        prompt: "After the earthquake, many old buildings were damaged ___ repair.",
        options: [
          { text: "beyond", correct: true, why: "Correct. _Beyond repair_ means past the limit where repair is possible." },
          { text: "without", misconception: "beyond-limits", why: "_Without repair_ would mean not repaired, which says nothing about whether repair is possible." },
          { text: "over", misconception: "beyond-limits", why: "Over is for covering, crossing or more than. The fixed phrase is _beyond repair._" },
        ],
      },
    },
    {
      id: "why-not",
      title: "Why not the other one?",
      alt: "Left: a dot outside a circle, labelled beyond our control (past the limit). Right: a broken car shape, labelled out of control (nobody is controlling it).",
      say: [
        { text: "_The matter is beyond our control_: it lies past the limit of what we can do.", cue: "wn1" },
        { text: "_out of control_ means something else: nobody is controlling it at all, like a car rushing downhill.", cue: "wn2" },
        { text: "Use **beyond** for limits of ability: _beyond repair, beyond doubt._", cue: "wn-r1" },
      ],
      actions: [
        PLAB.kit.clear("clear-why"),
        ...PLAB.kit.swap("wn", ["groupOut", "beyond our control", "past our limit", { hl: "beyond" }], ["car", "out of control", "different: nobody controls it", { ink: "trouble" }], ["beyond control = past what we can do", "out of control = no control at all"]),
      ],
    },
    {
      id: "summary",
      title: "The summary",
      alt: "Beyond: the far side (beyond the river), past a limit (beyond doubt, beyond repair, beyond control, beyond the scope), later than (beyond 2030).",
      say: [{ text: "**Beyond** = on the far side of a line, past a limit of possibility, or later than a time: _beyond 2030._", cue: "c3" }],
      actions: [
        { do: "erase", id: "clear-limits", targets: "all" },
        { do: "write", id: "c1", text: "beyond the river", x: 480, y: 150, size: 36, anchor: "middle", gap: 400 },
        { do: "write", id: "c2", text: "beyond doubt · beyond repair · beyond control", x: 480, y: 240, size: 32, anchor: "middle" },
        { do: "write", id: "c3", text: "beyond 2030 (later than)", x: 480, y: 330, size: 34, anchor: "middle" },
      ],
    },
  ],
});
