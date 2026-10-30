/* Lesson 1.42: AS vs LIKE. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "as-like",
    title: "AS vs LIKE",
    phase: 1,
    unit: "p1-relations",
    level: "Intermediate",
    minutes: 9,
    summary:
      "As + noun gives a real role or function: she works as a teacher. Like + noun gives a similarity: she sings like a professional (she isn't one). Like before a clause (like I said) is informal; formal writing uses as.",
    objectives: [
      "Use as for a real role and like for a similarity.",
      "Use as, not like, before a clause in formal writing.",
    ],
    steps: [
      {
        id: "role",
        title: "A role or a resemblance",
        alt: "Two rows. She works as a teacher: she really is a teacher. He talks like a teacher: he is not one, but sounds similar.",
        say: [
          { text: "**As** + noun = in the **role** of, really being it: _She works as a teacher. He spoke as the Chief Justice_ (in his official role).", cue: "r1" },
          { text: "**Like** + noun = **similar to**, without being it: _He talks like a teacher_ (he isn't one). _She sings like a professional._", cue: "r2" },
        ],
        actions: K.lines("r", [["She works as a teacher. (she is one)", { hl: "as" }], ["He talks like a teacher. (he isn't)", { hl: "like" }]], { y: 200, gap: 130, size: 38 }),
      },
      {
        id: "clause",
        title: "Before a clause",
        alt: "Formal: As I said, the plan failed. Informal: Like I said, the plan failed. Also: Do as I do.",
        say: [
          { text: "Before a clause (subject + verb), formal English uses **as**: _As I said, the plan failed. Do as I say._", cue: "c1" },
          { text: "_Like I said_ is common in speech, especially American English, but avoid it in an exam essay.", cue: "c2" },
        ],
        actions: [K.clear("clear-1"), ...K.lines("c", [["formal: As I said, the plan failed.", { hl: "As" }], ["informal: Like I said, ...", { ink: "muted" }]], { y: 200, gap: 130, size: 38 })],
      },
      {
        id: "check1",
        title: "Check: a real role",
        alt: "The as and like examples remain on the board.",
        say: [{ text: "Did he really hold this job?" }],
        actions: [],
        check: {
          id: "aslike-q1",
          source: "original",
          skill: "as for a role",
          prompt: "Before joining the civil service, he worked ___ a translator for the United Nations.",
          options: [
            { text: "as", correct: true, why: "Correct. He really was a translator: a role takes as." },
            { text: "like", misconception: "as-vs-like", why: "_Like a translator_ would mean similar to one, not actually being one." },
            { text: "for", misconception: "as-vs-like", why: "_Worked for_ names the employer (_for the United Nations_), not the role." },
          ],
        },
      },
      {
        id: "check2",
        title: "Check: a resemblance",
        alt: "The as and like examples remain on the board.",
        say: [{ text: "Is this about similarity?" }],
        actions: [],
        check: {
          id: "aslike-q2",
          source: "original",
          skill: "like for similarity",
          prompt: "___ his father, he chose a career in medicine.",
          options: [
            { text: "Like", correct: true, why: "Correct. The son resembles his father in this choice: similarity takes like." },
            { text: "As", misconception: "as-vs-like", why: "_As his father_ would mean in the role of his father, which is not the meaning." },
            { text: "Unlike", misconception: "as-vs-like", why: "Unlike would mean he did something different, but both chose medicine." },
          ],
        },
      },
    ],
  });
})();
