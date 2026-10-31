/* Lesson 1.31: BY vs UNTIL / TILL. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "by-until",
    title: "BY vs UNTIL",
    phase: 1,
    unit: "p1-time",
    level: "Intermediate",
    minutes: 8,
    summary:
      "By is a deadline: one action done at or before that time. Until (or till) is a continuing state that stops at that time. Plus not ... until, meaning only at that time.",
    objectives: [
      "Use by for a deadline and until for something that continues up to a time.",
      "Use not ... until to say something happened no earlier than a time.",
      "Know that till is a correct, slightly informal form of until.",
    ],
    steps: [
      {
        id: "line",
        title: "A deadline or a continuing state",
        alt: "A time line with Friday marked. Above it: a single dot before Friday labelled submit by Friday. Below it: a long bar running up to Friday labelled closed until Friday.",
        say: [
          { text: "Here is a week, with Friday marked.", cue: "fri" },
          { text: "**By Friday** is a **deadline**: one action, done at any point no later than Friday. _Submit the form by Friday._", cue: "s-by" },
          { text: "**Until Friday** is a **state that continues** and stops at Friday. _The office is closed until Friday._", cue: "s-until" },
        ],
        actions: [
          ...K.timeline("tl", { y: 250, now: false }),
          { do: "draw", id: "fri", shape: "line", from: [700, 150], to: [700, 350], ink: "trouble", width: 3, dur: 500, gap: 300 },
          { do: "write", id: "fri-l", text: "Friday", x: 700, y: 135, size: 30, ink: "trouble", anchor: "middle" },
          { do: "draw", id: "dot", shape: "circle", cx: 520, cy: 210, r: 11, ink: "accent", fill: "solid", dur: 400, gap: 400 },
          { do: "write", id: "s-by", text: "submit by Friday", x: 360, y: 200, size: 32, ink: "accent", anchor: "middle" },
          { do: "draw", id: "bar", shape: "rect", x: 140, y: 270, w: 560, h: 30, ink: "accent2", fill: "soft", dur: 900, gap: 500 },
          { do: "write", id: "s-until", text: "closed until Friday", x: 420, y: 345, size: 32, ink: "accent2", anchor: "middle" },
        ],
      },
      {
        id: "not-until",
        title: "Not ... until",
        alt: "Sentence: He did not arrive until 10 p.m., meaning he arrived at 10, no earlier. Note: till equals until, a little informal.",
        say: [
          { text: "**Not ... until** says nothing happened before the time, and then it happened. The early dot is crossed out; the arrival is at 10. _He did not arrive until 10 p.m._", cue: "n1" },
          { text: "**Till** means the same as until and is correct, a little informal. Avoid _'til_ and _upto_ in formal writing.", cue: "n2" },
        ],
        actions: [
          PLAB.kit.clear("clear-1"),
          ...PLAB.kit.pic("nu", "notUntil", 270, 40, 3),
          { do: "write", id: "ten", text: "10 p.m.", x: 570, y: 112, size: 28, ink: "accent", anchor: "middle" },
          ...PLAB.kit.lines("n", [["He did not arrive until 10 p.m.", { hl: "until" }], ["till = until (a little informal)", { ink: "muted", size: 30 }]], { y: 360, gap: 90, size: 38 }),
        ],
      },
      {
        id: "why-not",
        title: "Why this one and not the others?",
        alt: "The sentence Submit the form with a gap Friday., then the candidates with pictures: by (right: a deadline: no later than); until (wrong: until = keep doing it up to Friday); since (wrong: since looks back from now). Rule: by = a deadline for one action; until = a state that lasts up to then.",
        say: [
          { text: "Fill the gap: Submit the form \u2026 Friday. What does the sentence want to say? The answer is **by**: a deadline: no later than.", cue: "why1" },
          { text: "Why not the others? **until**: until = keep doing it up to Friday. **since**: since looks back from now.", cue: "why2" },
          { text: "The rule: by = a deadline for one action; until = a state that lasts up to then.", cue: "why-r1" },
        ],
        actions: [
          PLAB.kit.clear("clear-why"),
          ...PLAB.kit.lineup("why", "Submit the form ____ Friday.", [["priorDot", "by", true, "a deadline: | no later than"], ["notUntil", "until", false, "until = keep doing | it up to Friday"], ["sincePoint", "since", false, "since looks back | from now"]], ["by = a deadline for one action", "until = a state that lasts up to then"]),
        ],
      },
      {
        id: "check1",
        title: "Check: a deadline",
        alt: "The not until line remains on the board.",
        say: [{ text: "One action by a time, or a state that lasts?" }],
        actions: [],
        check: {
          id: "byuntil-q1",
          source: "original",
          skill: "by vs until",
          prompt: "Candidates must submit their applications ___ 30 November.",
          options: [
            { text: "by", correct: true, why: "Correct. Submitting is one action with a deadline: _by 30 November_ (no later than)." },
            { text: "until", misconception: "by-vs-until", why: "Until is for a continuing state (_open until 30 November_). A single action with a deadline takes by." },
            { text: "since", misconception: "for-vs-since", why: "Since points back to a start. A deadline takes by." },
          ],
        },
      },
      {
        id: "check2",
        title: "Check: a continuing state",
        alt: "The not until line remains on the board.",
        say: [{ text: "Does the action continue up to the time?" }],
        actions: [],
        check: {
          id: "byuntil-q2",
          source: "original",
          skill: "until for a continuing state",
          prompt: "The rescue teams worked ___ midnight.",
          options: [
            { text: "until", correct: true, why: "Correct. The work continued and stopped at midnight." },
            { text: "by", misconception: "by-vs-until", why: "_By midnight_ suits a single completed action (_finished by midnight_). Continuing work takes until." },
            { text: "at", misconception: "time-size", why: "At gives one point. The work lasted up to that point: until." },
          ],
        },
      },
    ],
  });
})();
