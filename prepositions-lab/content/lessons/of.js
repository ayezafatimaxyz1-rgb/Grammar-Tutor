/* Lesson 1.37: OF. */
(function () {
  const K = PLAB.kit;
  PLAB.registerLesson({
    id: "of",
    title: "OF: belonging, part and content",
    phase: 1,
    unit: "p1-relations",
    level: "Intermediate",
    minutes: 10,
    summary:
      "Of links a part to its whole, a thing to its owner or a container to its content. When to use of and when to use 's, quantities (a cup of tea, some of the students), the city of Lahore, and the exam favourite one of the best students.",
    objectives: [
      "Use of for part of a whole, belonging, content and quantity.",
      "Choose 's for people and animals, of for things, and know both work for organisations and places.",
      "Write one of the + plural noun, and use a friend of mine.",
    ],
    steps: [
      {
        id: "part",
        title: "A part of a whole",
        alt: "A house with its roof highlighted. Sentence: the roof of the house. Beside it a cup filled with tea: a cup of tea.",
        say: [
          { text: "The roof is one part of a larger whole, the house. **Of** links the part to its whole: _the roof of the house._", cue: "s1" },
          { text: "It also links a container or measure to what fills it: _a cup of tea, a bag of rice, a kilo of sugar._", cue: "s2" },
          { text: "And a part of a group: _some of the students, one of my friends, most of the time._", cue: "s3" },
        ],
        actions: [
          { do: "draw", id: "house", shape: "group", dur: 1200, parts: [{ shape: "rect", x: 140, y: 170, w: 220, h: 150 }] },
          { do: "draw", id: "roof", shape: "group", ink: "accent", width: 5, dur: 700, parts: [{ shape: "line", from: [125, 172], to: [250, 90] }, { shape: "line", from: [250, 90], to: [375, 172] }] },
          { do: "write", id: "s1", text: "the roof of the house", x: 250, y: 380, size: 32, anchor: "middle" },
          { do: "highlight", id: "s1-h", target: "s1", word: "of" },
          { do: "draw", id: "cup", shape: "group", ink: "accent2", dur: 800, gap: 500, parts: [{ shape: "line", from: [600, 160], to: [615, 300] }, { shape: "line", from: [615, 300], to: [725, 300] }, { shape: "line", from: [725, 300], to: [740, 160] }, { shape: "rect", x: 612, y: 200, w: 116, h: 95 }] },
          { do: "write", id: "s2", text: "a cup of tea", x: 670, y: 380, size: 32, anchor: "middle" },
          { do: "highlight", id: "s2-h", target: "s2", word: "of" },
          { do: "write", id: "s3", text: "some of the students · one of my friends", x: 480, y: 490, size: 32, ink: "muted", anchor: "middle", gap: 500, dur: 2000 },
        ],
      },
      {
        id: "possessive",
        title: "Of or 's?",
        alt: "Three rows: people and animals take 's (Ali's book, the dog's tail); things take of (the roof of the house, the end of the film); organisations and places take either (Pakistan's economy, the economy of Pakistan).",
        say: [
          { text: "People and animals usually take **'s**: _Ali's book, the minister's speech, the dog's tail._", cue: "p1" },
          { text: "Things usually take **of**: _the roof of the house, the end of the film_ (not _the film's end_ in neutral style, though it is possible).", cue: "p2" },
          { text: "Organisations, countries and time phrases can take either: _Pakistan's economy / the economy of Pakistan; today's paper._", cue: "p3" },
        ],
        actions: [K.clear("clear-1"), ...K.lines("p", ["people, animals: Ali's book · the dog's tail", "things: the roof of the house · the end of the film", ["places, groups: Pakistan's economy = the economy of Pakistan", { size: 30 }]], { y: 160, gap: 115, size: 34 })],
      },
      {
        id: "naming",
        title: "Naming and the double genitive",
        alt: "Two rows: the city of Lahore, the month of June, the name of the place. A friend of mine, a colleague of my father's.",
        say: [
          { text: "Of can name a member of a category: _the city of Lahore, the month of June, the University of the Punjab._", cue: "n1" },
          { text: "_A friend of mine_ means one of my friends. It combines of with a possessive (_mine, my father's_), and it is correct English.", cue: "n2" },
        ],
        actions: [K.clear("clear-2"), ...K.lines("n", [["the city of Lahore · the month of June", { hl: "of" }], ["a friend of mine · a colleague of my father's", { hl: "of" }]], { y: 200, gap: 130, size: 36 })],
      },
      {
        id: "check1",
        title: "Check: one of the ...",
        alt: "The naming examples remain on the board.",
        say: [{ text: "An original practice item on a very common error." }],
        actions: [],
        check: {
          id: "of-q1",
          source: "original",
          skill: "one of the + plural",
          prompt: "Unemployment is one of the most serious ___ facing the country.",
          options: [
            { text: "problems", correct: true, why: "Correct. _One of_ picks one member from a group, so the group is plural: _one of the most serious problems._" },
            { text: "problem", misconception: "of-quantity", why: "_One of_ means one out of many, so the noun after it is plural: _problems._" },
            { text: "problem's", misconception: "of-quantity", why: "No possessive is needed. The group is plural: _problems._ (The verb then agrees with _one_: _one of them is ..._)" },
          ],
        },
      },
      {
        id: "check2",
        title: "Check: of or 's?",
        alt: "The naming examples remain on the board.",
        say: [{ text: "Is the owner a person, or a thing?" }],
        actions: [],
        check: {
          id: "of-q2",
          source: "original",
          skill: "of vs 's",
          prompt: "Which phrase is the most natural in a formal report?",
          options: [
            { text: "the legs of the table", correct: true, why: "Correct. For things, of is the natural choice: _the legs of the table._" },
            { text: "the table's legs", misconception: "of-vs-possessive", why: "Possible, but with things of is more natural and neutral. 's is usual for people and animals." },
            { text: "the table of legs", misconception: "of-vs-possessive", why: "This reverses the relationship. The legs are part of the table: _the legs of the table._" },
          ],
        },
      },
    ],
  });
})();
