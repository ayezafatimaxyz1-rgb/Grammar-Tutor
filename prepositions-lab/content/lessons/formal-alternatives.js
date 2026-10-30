/* Lesson 2.26: formal one-word alternatives for CSS writing (investigate for look into). */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "formal-alternatives",
    title: "Formal one-word alternatives",
    phase: 2,
    unit: "p2-phrasal",
    level: "Advanced",
    minutes: 8,
    summary:
      "Phrasal verbs are natural in speech, but formal essays and precis often prefer a single Latin-based verb: investigate (look into), tolerate (put up with), postpone (put off), cancel (call off), abolish (do away with), devise (come up with), discover (find out), establish (set up), reduce (cut down on). Use them for a formal tone, without sounding stiff.",
    objectives: [
      "Replace common phrasal verbs with one-word formal equivalents in essays and precis.",
      "Know that the formal verb takes no particle: investigate the matter, not investigate into the matter.",
    ],
    steps: [
      {
        id: "idea",
        title: "Spoken phrasal, written formal",
        alt: "A speech bubble with an arrow to a formal document. Sentence: The police will look into the matter becomes The police will investigate the matter.",
        say: [
          { text: "Speech loves phrasal verbs. Formal writing often swaps them for one precise verb.", cue: "pic-0-0" },
          { text: "_The police will look into the matter_ becomes _The police will investigate the matter._ The particle disappears: never _investigate into._", cue: "s2" },
        ],
        actions: [
          ...K.pic("pic", "casualToFormal", 340, 30, 2),
          { do: "write", id: "s1", text: "The police will look into the matter.", x: 480, y: 290, size: 34, anchor: "middle", ink: "muted", gap: 400 },
          { do: "write", id: "s2", text: "The police will investigate the matter.", x: 480, y: 370, size: 36, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s2-h", target: "s2", word: "investigate" },
          { do: "write", id: "w", text: "✗ investigate into the matter", x: 480, y: 450, size: 30, ink: "trouble", anchor: "middle", gap: 400 },
        ],
      },
      {
        id: "list-1",
        title: "Eight swaps",
        alt: "Rows with pictures: put up with = tolerate; put off = postpone; call off = cancel; do away with = abolish.",
        say: [
          { text: "_put up with_ becomes **tolerate**; _put off_ becomes **postpone**: _The exam was postponed._", cue: "a1" },
          { text: "_call off_ becomes **cancel**; _do away with_ becomes **abolish**: _Slavery was abolished._", cue: "a3" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.rows("a", [
            ["pressed", "put up with = tolerate", { hl: "tolerate" }],
            ["clock", "put off = postpone", { hl: "postpone" }],
            ["cross", "call off = cancel", { hl: "cancel" }],
            ["dispense", "do away with = abolish", { hl: "abolish" }],
          ], { y: 90, gap: 125 }),
        ],
      },
      {
        id: "list-2",
        title: "Four more",
        alt: "Rows with pictures: come up with = devise; find out = discover; set up = establish; cut down on = reduce.",
        say: [
          { text: "_come up with_ becomes **devise**; _find out_ becomes **discover** or **ascertain**.", cue: "b1" },
          { text: "_set up_ becomes **establish**; _cut down on_ becomes **reduce**: _The commission was established in 1947._", cue: "b3" },
        ],
        actions: [
          K.clear("clear-2"),
          ...K.rows("b", [
            ["lamp", "come up with = devise", { hl: "devise" }],
            ["searchQ", "find out = discover, ascertain", { hl: "discover" }],
            ["house", "set up = establish", { hl: "establish" }],
            ["fallIn", "cut down on = reduce", { hl: "reduce" }],
          ], { y: 90, gap: 125 }),
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence The police will investigate with a gap the matter., then the candidates with pictures: (no word) (right: investigate takes no particle); into (wrong: into belongs to look into); about (wrong: investigate already holds the topic). Rule: investigate the matter (formal); look into the matter (spoken).",
        say: [
          { text: "Fill the gap: The police will investigate \u2026 the matter. The answer is **(no word)**: investigate takes no particle.", cue: "why1" },
          { text: "Why not the others? **into**: into belongs to look into. **about**: investigate already holds the topic.", cue: "why2" },
          { text: "The rule: investigate the matter (formal); look into the matter (spoken).", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "The police will investigate ____ the matter.", [["magnifier", "(no word)", true, "investigate | takes no particle"], ["lookInto", "into", false, "into belongs to | look into"], ["aboutCircle", "about", false, "investigate already | holds the topic"]], ["investigate the matter (formal)", "look into the matter (spoken)"]),
        ],
      },
      {
        id: "check",
        title: "Check: formal tone",
        alt: "The board remains.",
        say: [{ text: "An original practice question." }],
        actions: [],
        check: {
          id: "formal-alt-q1",
          source: "original",
          skill: "formal one-word verbs",
          prompt: "Which version is best for a formal report? \"The ministry has put off the decision because it wants to find out the facts.\"",
          options: [
            { text: "The ministry has postponed the decision in order to ascertain the facts.", correct: true, why: "Correct. _Postpone_ replaces _put off_ and _ascertain_ replaces _find out._" },
            { text: "The ministry has postponed off the decision in order to ascertain about the facts.", misconception: "formal-swap", why: "The one-word verbs take no particle or preposition: _postpone the decision, ascertain the facts._" },
            { text: "The ministry has cancelled the decision in order to discover into the facts.", misconception: "formal-swap", why: "_Cancel_ means call off, not put off, and _discover_ takes a direct object." },
          ],
        },
      },
    ],
  });
})();
