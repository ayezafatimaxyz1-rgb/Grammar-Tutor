/* Lesson 2.3: apply for a job vs apply to an institution; apply to = be relevant to. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "apply-for-to",
    title: "Apply for, apply to",
    phase: 2,
    unit: "p2-verb",
    level: "Intermediate",
    minutes: 7,
    summary:
      "You apply to the place your application goes (a university, a commission, a company) and for the thing you want (a job, a visa, a scholarship). Apply to also means be relevant to, and apply something to a surface means put it on.",
    objectives: [
      "Use apply to for the destination and apply for for the thing wanted, together in one sentence.",
      "Recognise apply to meaning be relevant to, and apply X to Y meaning put X on Y.",
    ],
    steps: [
      {
        id: "to-and-for",
        title: "The letter goes TO a place, FOR a prize",
        alt: "A person sends an application with an arrow to a building (apply to the Commission); a star above for the post (apply for the post). Sentence: She applied to the Commission for the post of inspector.",
        say: [
          { text: "Picture the application travelling. It goes **to** a place: the arrow ends at the building. _apply to the Commission, apply to a university._", cue: "pic-0-0" },
          { text: "And you send it **for** something you want, the prize at the end: _apply for a job, apply for a visa, apply for a scholarship._", cue: "star-0-0" },
          { text: "Both fit in one sentence: _She applied to the Commission for the post of inspector._", cue: "s1" },
        ],
        actions: [
          ...K.pic("pic", "applyTo", 250, 50, 2),
          { do: "write", id: "pic-l", text: "to the Commission", x: 480, y: 250, size: 28, ink: "accent", anchor: "middle" },
          ...K.pic("star", "wantStar", 600, 10, 1.1),
          { do: "write", id: "star-l", text: "for the post", x: 680, y: 125, size: 28, ink: "trouble", anchor: "middle" },
          { do: "write", id: "s1", text: "She applied to the Commission for the post of inspector.", x: 480, y: 370, size: 34, anchor: "middle", gap: 400 },
          { do: "highlight", id: "s1-h", target: "s1", word: "to" },
          { do: "highlight", id: "s1-h2", target: "s1", word: "for", style: "underline", ink: "trouble" },
        ],
      },
      {
        id: "examples",
        title: "Which one goes where",
        alt: "Rows: apply for a visa (the thing wanted); apply to three universities (the places); apply for admission to a university; crossed out: apply a job, apply to a job.",
        say: [
          { text: "Ask: is it the place, or the thing I want? _apply for a visa_ (thing), _apply to three universities_ (places).", cue: "e1" },
          { text: "With a noun like admission, both appear again: _apply for admission to the university._", cue: "e3" },
          { text: "Never leave out the preposition (_apply a job_), and never send the job the letter (_apply to a job_).", cue: "e4" },
        ],
        actions: [
          K.clear("clear-1"),
          ...K.rows("e", [
            ["wantStar", "apply for a visa · for a scholarship", { hl: "for" }],
            ["applyTo", "apply to three universities", { hl: "to" }],
            ["school", "apply for admission to the university", { hl: "for", size: 30 }],
            ["cross", "✗ apply a job · ✗ apply to a job", { ink: "trouble" }],
          ], { y: 90, gap: 125 }),
        ],
      },
      {
        id: "other-meanings",
        title: "Two other meanings of apply to",
        alt: "Left: a rule document with arrows to three people, labelled The rules apply to everyone (cover them). Right: a brush painting a wall, labelled apply paint to the wall (put it on).",
        say: [
          { text: "**Apply to** can also mean cover or be relevant to: the rule reaches everyone it is aimed at. _The new rules apply to all employees._", cue: "o1" },
          { text: "And **apply X to Y** means put X onto a surface or use it on a problem: _apply paint to the wall, apply the formula to the data._", cue: "o2" },
        ],
        actions: [
          K.clear("clear-2"),
          ...K.panels("o", [
            ["coverGroup", "The rules apply to everyone.", "they reach and cover everyone", { hl: "apply to" }],
            ["paintOn", "apply paint to the wall", "put it on the surface", { hl: "to" }],
          ], { y: 60 }),
        ],
      },
      {
        id: "check",
        title: "Check: fill the gaps",
        alt: "The panels remain on the board.",
        say: [{ text: "An original practice question." }],
        actions: [],
        check: {
          id: "apply-q1",
          source: "original",
          skill: "apply to / apply for",
          prompt: "He applied ___ the Federal Public Service Commission ___ a post in the Foreign Service.",
          options: [
            { text: "to … for", correct: true, why: "Correct. The application goes _to_ the Commission, _for_ the post he wants." },
            { text: "for … to", misconception: "apply-for-to", why: "Reversed. The Commission is the place the application goes (_to_); the post is what he wants (_for_)." },
            { text: "to … to", misconception: "apply-for-to", why: "The post is not a destination; it is the thing wanted, so _for_." },
          ],
        },
      },
    ],
  });
})();
