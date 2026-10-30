/* Lesson 1.9: INSIDE and OUTSIDE, and the difference between a preposition and an adverb. */
PLAB.registerLesson({
  id: "inside-outside",
  title: "INSIDE and OUTSIDE",
  phase: 1,
  unit: "p1-space-containers",
  level: "Intermediate",
  minutes: 9,
  summary:
    "How inside differs from in, outside for location and for limits (outside my control, outside the scope), inside of and outside of, and how the same word can be a preposition or an adverb.",
  objectives: [
    "Use inside to stress the interior, and outside for location beyond a boundary.",
    "Use outside for abstract limits: outside the scope, outside my control.",
    "Tell a preposition (outside the gate) from an adverb (go outside).",
  ],
  steps: [
    {
      id: "inside",
      title: "Inside: the interior, in contrast",
      alt: "A house with rain falling outside. Children are inside. Sentences: The children played inside the house. Compare: in the house.",
      say: [
        { text: "Here is a house, with rain falling all around it.", cue: "rain" },
        { text: "The children stay within its walls: _The children played inside the house._", cue: "s-inside" },
        {
          text: "**Inside** means the same basic relationship as in, but it stresses the interior, usually in contrast with outside. Here the rain makes that contrast important.",
          cue: "h-inside",
        },
        { text: "_In the house_ is also correct and more neutral. Use inside when the inside versus outside contrast matters.", cue: "s-in" },
      ],
      actions: [
        {
          do: "draw",
          id: "house",
          shape: "group",
          dur: 1800,
          parts: [
            { shape: "rect", x: 320, y: 170, w: 320, h: 200 },
            { shape: "line", from: [300, 172], to: [480, 80] },
            { shape: "line", from: [480, 80], to: [660, 172] },
          ],
        },
        { do: "draw", id: "rain", shape: "group", ink: "accent2", width: 2.4, dur: 1200, parts: [[120, 100], [180, 200], [100, 280], [200, 330], [760, 110], [840, 190], [780, 280], [870, 330]].map(([x, y]) => ({ shape: "line", from: [x, y], to: [x - 12, y + 34], wobble: 0.2 })) },
        { do: "draw", id: "kid1", shape: "person", x: 420, y: 230, scale: 0.75, ink: "accent", dur: 700 },
        { do: "draw", id: "kid2", shape: "person", x: 540, y: 240, scale: 0.65, ink: "accent", dur: 700 },
        { do: "write", id: "s-inside", text: "The children played inside the house.", x: 480, y: 460, size: 40, anchor: "middle", gap: 400, dur: 2100 },
        { do: "highlight", id: "h-inside", target: "s-inside", word: "inside" },
        { do: "write", id: "s-in", text: "also: in the house (more neutral)", x: 480, y: 535, size: 32, ink: "muted", anchor: "middle", gap: 500, dur: 1700 },
      ],
    },
    {
      id: "outside",
      title: "Outside: beyond the boundary",
      alt: "An office door with a person waiting beyond it. Sentence: Please wait outside the office. Below: outside the city, outside Pakistan.",
      say: [
        { text: "Now an office, and someone waiting beyond its door.", cue: "office" },
        { text: "**Outside** places something beyond a boundary, but usually close to it: _Please wait outside the office._", cue: "s-out" },
        { text: "It works for larger areas too: _a village outside the city, studying outside Pakistan._", cue: "more" },
      ],
      actions: [
        { do: "erase", id: "clear-inside", targets: "all" },
        { do: "draw", id: "office", shape: "group", dur: 1500, gap: 400, parts: [{ shape: "rect", x: 140, y: 100, w: 360, h: 260 }, { shape: "rect", x: 430, y: 230, w: 60, h: 130, wobble: 0.8 }] },
        { do: "write", id: "office-l", text: "OFFICE", x: 300, y: 150, size: 28, ink: "accent2", anchor: "middle", style: "caps" },
        { do: "draw", id: "waiter", shape: "person", x: 620, y: 250, scale: 0.95, ink: "accent", dur: 900 },
        { do: "write", id: "s-out", text: "Please wait outside the office.", x: 480, y: 450, size: 40, anchor: "middle", gap: 400, dur: 1900 },
        { do: "highlight", id: "h-out", target: "s-out", word: "outside" },
        { do: "write", id: "more", text: "outside the city · outside Pakistan", x: 480, y: 530, size: 32, ink: "muted", anchor: "middle", gap: 500, dur: 1800 },
      ],
    },
    {
      id: "limits",
      title: "Outside the limits",
      alt: "A circle labelled the scope of this essay. A question mark sits outside it. Sentences: This question falls outside the scope of this essay. Outside my control.",
      say: [
        { text: "In formal writing, outside often marks the edge of an abstract area: what something covers.", cue: "scope" },
        {
          text: "_This question falls outside the scope of this essay._ The scope is pictured as an area, and the question lies beyond its edge. _Beyond the scope_ means the same.",
          cue: "s-scope",
        },
        { text: "Likewise _outside my control, outside office hours, outside the law._", cue: "more2" },
      ],
      actions: [
        { do: "erase", id: "clear-outside", targets: "all" },
        { do: "draw", id: "scope", shape: "ellipse", cx: 360, cy: 230, rx: 230, ry: 130, ink: "accent2", fill: "soft", dur: 1400, gap: 400 },
        { do: "write", id: "scope-l", text: "the scope of this essay", x: 360, y: 240, size: 30, ink: "accent2", anchor: "middle" },
        { do: "write", id: "q", text: "?", x: 760, y: 260, size: 90, ink: "trouble", anchor: "middle", dur: 600, gap: 400 },
        { do: "write", id: "s-scope", text: "It falls outside the scope of this essay.", x: 480, y: 450, size: 38, anchor: "middle", gap: 400, dur: 2200 },
        { do: "highlight", id: "h-scope", target: "s-scope", word: "outside" },
        { do: "write", id: "more2", text: "outside my control · outside the law", x: 480, y: 530, size: 32, ink: "muted", anchor: "middle", gap: 500, dur: 1800 },
      ],
    },
    {
      id: "check-scope",
      title: "Check: formal limits",
      alt: "The scope circle and the question mark remain on the board.",
      say: [{ text: "An original practice question in the style of formal CSS writing." }],
      actions: [],
      check: {
        id: "inout-q1",
        source: "original",
        skill: "outside for limits",
        prompt: "A detailed history of the dispute falls ___ the scope of this précis.",
        options: [
          { text: "outside", correct: true, why: "Correct. The scope is pictured as an area with an edge, and the topic lies beyond it: _outside the scope._ (_Beyond the scope_ is also correct.)" },
          { text: "out", misconception: "scope-outside", why: "_Out_ alone is not used as a preposition this way in formal English (_out the window_ is informal American). Use outside or beyond." },
          { text: "off", misconception: "scope-outside", why: "Off is for leaving a surface (_off the table_). Limits of a topic take outside or beyond." },
        ],
      },
    },
    {
      id: "word-class",
      title: "Preposition or adverb?",
      alt: "Two sentences. Meet me outside the gate, with the gate underlined as the object, labelled preposition. Let's go outside, with nothing after it, labelled adverb.",
      say: [
          { text: "A **preposition** needs an object, the thing it relates to. _Meet me outside the gate_: outside relates you to the gate, which the picture names.", cue: "s1" },
          { text: "_Let's go outside_: the arrow leaves the door, but no object is named. Outside works alone, as an **adverb**.", cue: "s2" },
          { text: "Many words do both jobs: _inside, outside, in, on, up, down, before, after._ And in formal writing drop the _of_: _outside the city_, not _outside of the city._", cue: "note" },
        ],
      actions: [
          PLAB.kit.clear("clear-limits"),
          ...PLAB.kit.panels("s", [
            ["gatePerson", "Meet me outside the gate.", "preposition + object", { hl: "outside" }],
            ["goOut", "Let's go outside.", "adverb: nothing follows", { hl: "outside" }],
          ]),
          { do: "write", id: "note", text: "formal: outside the city (not outside of)", x: 480, y: 500, size: 30, ink: "muted", anchor: "middle", gap: 600 },
        ],
    },
    {
      id: "check-class",
      title: "Check: which job?",
      alt: "The two sentences with their labels remain on the board.",
      say: [{ text: "Look for an object after the word." }],
      actions: [],
      check: {
        id: "inout-q2",
        source: "original",
        skill: "preposition vs adverb",
        prompt: "In which sentence is inside a preposition?",
        options: [
          { text: "The keys are inside the drawer.", correct: true, why: "Yes. Inside is followed by its object, _the drawer_, and relates the keys to it." },
          { text: "Please come inside.", misconception: "adverb-vs-preposition", why: "Nothing follows inside here, so it works alone as an adverb of place." },
          { text: "It's warmer inside.", misconception: "adverb-vs-preposition", why: "Again, no object follows. Inside is an adverb here, meaning in the building." },
        ],
      },
    },
    {
      id: "why-not",
      title: "Why this one and not the others?",
      alt: "The sentence Please wait with a gap the office., then the candidates with pictures: outside (right: beyond its walls); out (wrong: out needs of: out of the office); outside of (wrong: of is informal (mostly AmE)). Rule: outside the office (formal); out of the office \u00b7 outside of (informal).",
      say: [
        { text: "Fill the gap: Please wait \u2026 the office. The answer is **outside**: beyond its walls.", cue: "why1" },
        { text: "Why not the others? **out**: out needs of: out of the office. **outside of**: of is informal (mostly AmE).", cue: "why2" },
        { text: "The rule: outside the office (formal); out of the office \u00b7 outside of (informal).", cue: "why-r1" },
      ],
      actions: [
        PLAB.kit.clear("clear-why"),
        ...PLAB.kit.lineup("why", "Please wait ____ the office.", [["gatePerson", "outside", true, "beyond its walls"], ["goOut", "out", false, "out needs of: | out of the office"], ["gatePerson", "outside of", false, "of is informal | (mostly AmE)"]], ["outside the office (formal)", "out of the office \u00b7 outside of (informal)"]),
      ],
    },
    {
      id: "summary",
      title: "The summary",
      alt: "A boundary circle. Inside, labelled the interior, in contrast with outside. Outside, labelled beyond the boundary, and for limits: outside the scope. Below: preposition takes an object; adverb stands alone.",
      say: [
        { text: "**Inside** stresses the interior; **outside** is beyond the boundary, including abstract limits like _outside the scope._", cue: "lab-out" },
        { text: "With an object they are prepositions; alone they are adverbs. In formal writing, drop _of_.", cue: "rule" },
      ],
      actions: [
        { do: "erase", id: "clear-class", targets: "all" },
        { do: "draw", id: "ring", shape: "ellipse", cx: 360, cy: 230, rx: 200, ry: 130, ink: "accent2", width: 4, dur: 1200, gap: 400 },
        { do: "write", id: "lab-in", text: "inside", x: 360, y: 230, size: 40, ink: "accent", anchor: "middle" },
        { do: "write", id: "lab-in2", text: "the interior", x: 360, y: 275, size: 28, ink: "accent", anchor: "middle" },
        { do: "write", id: "lab-out", text: "outside", x: 750, y: 200, size: 40, ink: "trouble", anchor: "middle" },
        { do: "write", id: "lab-out2", text: "beyond: outside the scope", x: 750, y: 245, size: 28, ink: "trouble", anchor: "middle" },
        { do: "write", id: "rule", text: "+ object = preposition · alone = adverb", x: 480, y: 470, size: 32, anchor: "middle", gap: 600, dur: 2000 },
      ],
    },
  ],
});
