/* Lesson 1.20: UPON: a formal on, and its fixed phrases. */
PLAB.registerLesson({
  id: "upon",
  title: "UPON",
  phase: 1,
  unit: "p1-position",
  level: "Intermediate",
  minutes: 7,
  summary:
    "Upon is a more formal on. It is natural with verbs like depend upon and rely upon and in fixed phrases (once upon a time, upon arrival, upon receipt), but it cannot replace on everywhere.",
  objectives: [
    "Use upon as a formal alternative to on after verbs such as depend, rely, insist and call.",
    "Use the fixed phrases upon arrival, upon receipt of, once upon a time, row upon row.",
    "Know where upon sounds wrong or archaic: upon Monday, the book is upon the table.",
  ],
  steps: [
    {
      id: "formal-on",
      title: "A formal on",
      alt: "Two columns: everyday on and formal upon. Depend on, depend upon. Rely on, rely upon. Insist on, insist upon. Call on, call upon.",
      say: [
          { text: "**Upon** keeps the picture of on: something resting on a support. _The outcome depends upon the evidence_: take the support away and the outcome falls.", cue: "h1" },
          { text: "Upon is simply a more formal on, natural after verbs like _depend, rely, insist, call_: _The government calls upon citizens to cooperate._", cue: "r2" },
        ],
      actions: [
          ...PLAB.kit.pic("rest", "restOn", 380, 30, 1.45),
          { do: "write", id: "h1", text: "depend on = depend upon (formal)", x: 480, y: 210, size: 34, anchor: "middle", gap: 300 },
          ...PLAB.kit.lines("r", [["rely on → rely upon", { hl: "upon" }], ["insist on → insist upon", { hl: "upon" }], ["call on → call upon", { hl: "upon" }]], { y: 300, gap: 70, size: 32 }),
        ],
    },
    {
      id: "fixed",
      title: "Fixed phrases",
      alt: "Four fixed phrases: once upon a time; upon arrival, meaning as soon as you arrive; upon receipt of, meaning as soon as it is received; row upon row, meaning many rows.",
      say: [
          { text: "Some phrases are fixed with upon. _Once upon a time_ opens a story book.", cue: "f1" },
          { text: "**Upon** + an action noun means _as soon as_: the moment you reach the door, something happens. _Upon arrival, report to the desk. Payment is due upon receipt._", cue: "f2" },
          { text: "Repetition, one row on another: _row upon row of houses_ = a great many. And _Eid is upon us_ = very near.", cue: "f3" },
        ],
      actions: [
          PLAB.kit.clear("clear-formal"),
          ...PLAB.kit.panels("f", [
            ["storyBook", "once upon a time", "opens a story", { hl: "upon" }],
            ["arriveDoor", "upon arrival", "= as soon as you arrive", { hl: "upon" }],
            ["rowsHouses", "row upon row", "= very many", { hl: "upon" }],
          ]),
        ],
    },
    {
      id: "limits",
      title: "Where upon does not fit",
      alt: "Crossed out in red: upon Monday, upon the bus. Marked as sounding old: the book lay upon the table.",
      say: [
          { text: "Upon cannot replace on everywhere. A calendar day takes on, never upon: _on Monday_, not _upon Monday._ Vehicles too: _on the bus._", cue: "x1" },
          { text: "For plain physical position, upon sounds literary or old: _The book lay upon the table._ In essays, write _on._", cue: "x2" },
        ],
      actions: [
          PLAB.kit.clear("clear-fixed"),
          ...PLAB.kit.panels("x", [
            [[["calendar", 0, 0], ["cross", 0, 0]], "✗ upon Monday", "use: on Monday", {}],
            [[["bus", 0, 0], ["cross", 0, 0]], "✗ upon the bus", "use: on the bus", {}],
            ["cupOnTable", "lay upon the table", "literary: use on", { hl: "upon" }],
          ]),
        ],
    },
    {
      id: "check-receipt",
      title: "Check: formal notice",
      alt: "The limits of upon remain on the board.",
      say: [{ text: "An original practice question in the style of an official letter." }],
      actions: [],
      check: {
        id: "upon-q1",
        source: "original",
        skill: "upon + action noun",
        prompt: "___ receipt of your application, the office will send an acknowledgement.",
        options: [
          { text: "Upon", correct: true, why: "Correct. _Upon receipt of_ means as soon as it is received. (_On receipt of_ is also correct.)" },
          { text: "At", misconception: "upon-limits", why: "_At receipt_ is not used. The fixed phrase is _upon_ (or _on_) _receipt of._" },
          { text: "In", misconception: "upon-limits", why: "_In receipt of_ exists, but means having received something (_We are in receipt of your letter_). It does not fit the start of this sentence." },
        ],
      },
    },
    {
      id: "why-not",
      title: "Why this one and not the others?",
      alt: "The sentence The film starts with a gap Monday., then the candidates with pictures: on (right: days take on); upon (wrong: upon is never used for days); at (wrong: at is for clock times). Rule: upon: depend upon, upon arrival (formal); days: on Monday.",
      say: [
        { text: "Fill the gap: The film starts \u2026 Monday. The answer is **on**: days take on.", cue: "why1" },
        { text: "Why not the others? **upon**: upon is never used for days. **at**: at is for clock times.", cue: "why2" },
        { text: "The rule: upon: depend upon, upon arrival (formal); days: on Monday.", cue: "why-r1" },
      ],
      actions: [
        PLAB.kit.clear("clear-why"),
        ...PLAB.kit.lineup("why", "The film starts ____ Monday.", [["calendar", "on", true, "days take on"], ["calendar", "upon", false, "upon is never used | for days"], ["clock", "at", false, "at is for | clock times"]], ["upon: depend upon, upon arrival (formal)", "days: on Monday"]),
      ],
    },
    {
      id: "summary",
      title: "The summary",
      alt: "Upon = formal on. Good: depend upon, call upon, upon arrival, upon receipt of, once upon a time. Avoid: upon Monday, upon the bus.",
      say: [{ text: "**Upon** = a formal on, best after verbs and in fixed phrases. Do not use it for days, vehicles or plain physical position.", cue: "s2" }],
      actions: [
        { do: "erase", id: "clear-limits", targets: "all" },
        { do: "write", id: "s1", text: "upon = formal on", x: 480, y: 140, size: 42, ink: "accent", anchor: "middle", gap: 400 },
        { do: "write", id: "s2", text: "depend upon · upon arrival · upon receipt", x: 480, y: 240, size: 34, anchor: "middle" },
        { do: "write", id: "s3", text: "not: upon Monday · upon the bus", x: 480, y: 330, size: 34, ink: "trouble", anchor: "middle" },
      ],
    },
  ],
});
