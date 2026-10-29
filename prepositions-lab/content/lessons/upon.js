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
        { text: "**Upon** means the same as on, but it is more formal. It is most natural after certain verbs.", cue: "h1" },
        { text: "_The outcome depends upon the evidence. The government calls upon citizens to cooperate._ Both on and upon are correct; upon adds a formal tone.", cue: "r2" },
      ],
      actions: [
        { do: "write", id: "h1", text: "everyday", x: 280, y: 110, size: 34, ink: "accent2", anchor: "middle" },
        { do: "write", id: "h2", text: "formal", x: 680, y: 110, size: 34, ink: "accent", anchor: "middle" },
        { do: "write", id: "r1", text: "depend on", x: 280, y: 190, size: 34, anchor: "middle", gap: 400 },
        { do: "write", id: "r1b", text: "depend upon", x: 680, y: 190, size: 34, anchor: "middle" },
        { do: "write", id: "r2", text: "rely on · insist on", x: 280, y: 260, size: 34, anchor: "middle" },
        { do: "write", id: "r2b", text: "rely upon · insist upon", x: 680, y: 260, size: 34, anchor: "middle" },
        { do: "write", id: "r3", text: "call on", x: 280, y: 330, size: 34, anchor: "middle" },
        { do: "write", id: "r3b", text: "call upon", x: 680, y: 330, size: 34, anchor: "middle" },
      ],
    },
    {
      id: "fixed",
      title: "Fixed phrases",
      alt: "Four fixed phrases: once upon a time; upon arrival, meaning as soon as you arrive; upon receipt of, meaning as soon as it is received; row upon row, meaning many rows.",
      say: [
        { text: "Some phrases are fixed with upon. _Once upon a time_ opens stories.", cue: "f1" },
        { text: "**Upon** + a noun of action means _as soon as_: _Upon arrival, report to the desk. Payment is due upon receipt of the invoice._ (_On arrival_ is also correct.)", cue: "f2" },
        { text: "Repetition: _row upon row of houses, mile upon mile_ means a great many. And _Eid is upon us_ means it is very near.", cue: "f4" },
      ],
      actions: [
        { do: "erase", id: "clear-formal", targets: "all" },
        { do: "write", id: "f1", text: "once upon a time", x: 480, y: 120, size: 38, anchor: "middle", gap: 400 },
        { do: "write", id: "f2", text: "upon arrival = as soon as you arrive", x: 480, y: 210, size: 36, anchor: "middle", gap: 400, dur: 2000 },
        { do: "write", id: "f3", text: "upon receipt of the invoice", x: 480, y: 290, size: 36, anchor: "middle", dur: 1700 },
        { do: "write", id: "f4", text: "row upon row · Eid is upon us", x: 480, y: 380, size: 36, anchor: "middle", gap: 400, dur: 1800 },
      ],
    },
    {
      id: "limits",
      title: "Where upon does not fit",
      alt: "Crossed out in red: upon Monday, upon the bus. Marked as sounding old: the book lay upon the table.",
      say: [
        { text: "Upon cannot replace on everywhere. With days and vehicles it is wrong in modern English: _on Monday, on the bus_, never _upon Monday._", cue: "x1" },
        { text: "For ordinary physical position it sounds literary or old: _The book lay upon the table._ In everyday and essay writing, use on.", cue: "x2" },
      ],
      actions: [
        { do: "erase", id: "clear-fixed", targets: "all" },
        { do: "write", id: "x1", text: "✗ upon Monday   ✗ upon the bus", x: 480, y: 170, size: 38, ink: "trouble", anchor: "middle", gap: 400, dur: 1800 },
        { do: "write", id: "x2", text: "The book lay upon the table. (literary)", x: 480, y: 300, size: 34, ink: "muted", anchor: "middle", gap: 500, dur: 2000 },
        { do: "write", id: "x3", text: "use: on Monday · on the bus · on the table", x: 480, y: 410, size: 34, ink: "accent", anchor: "middle", gap: 500, dur: 2000 },
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
