/* Master curriculum and coverage tracker.
   status: planned → drafted → implemented → tested → complete
     planned      listed in the curriculum, no lesson content yet
     drafted      explanations written, not yet built into the app
     implemented  playable in the app
     tested       passes the automated checks
     complete     reviewed and approved by the learner
   flags: formal, literary, archaic, regional (BrE/AmE), disputed. These mark usage notes the
   lesson must cover, not reasons to skip the item.

   This inventory was drafted from general grammar knowledge. It has NOT yet been checked
   item by item against dictionaries, grammar references or CSS past papers; that research is a
   later stage, and "gaps" below lists what is known to be missing. */
(function () {
  const L = (id, title, o = {}) => ({ id, title, status: "planned", flags: [], ...o });

  PLAB.curriculum = {
    phases: [
      {
        id: "p1",
        title: "Phase 1: Individual prepositions",
        intro: "One preposition at a time: its core sense, a drawn picture, its meaning map, contrasts, mistakes and practice.",
        units: [
          {
            id: "p1-foundations",
            title: "Foundations",
            lessons: [
              L("what-is-a-preposition", "What a preposition is: the thing, the reference point, the relationship", { status: "tested", lessonId: "what-is-a-preposition" }),
              L("prep-adverb-conjunction", "Same word, different job: preposition, adverb particle or conjunction (after, before, since, up)", { status: "tested", lessonId: "prep-adverb-conjunction" }),
              L("prep-objects", "What follows a preposition: nouns, pronouns (between you and me), -ing forms, clauses", { status: "tested", lessonId: "prep-objects" }),
              L("stranding", "Ending a sentence with a preposition: myth and real usage", { status: "tested", lessonId: "stranding", flags: ["disputed"] }),
            ],
          },
          {
            id: "p1-space-containers",
            title: "Space: containers, surfaces and points",
            lessons: [
              L("in-core", "IN: inside a boundary", { status: "tested", lessonId: "in-core" }),
              L("in-time", "IN for time: in June, in 2025, in the morning, in ten minutes", { status: "tested", lessonId: "in-time" }),
              L("on-core", "ON: contact with a surface, and its extensions", { status: "tested", lessonId: "on-core" }),
              L("at-core", "AT: a place pictured as a point", { status: "tested", lessonId: "at-core" }),
              L("in-on-at-place", "Comparison: in / on / at for places (in the car, on the bus, at the station)", { status: "tested", lessonId: "in-on-at-place" }),
              L("in-on-at-time", "Comparison: in / on / at for time", { status: "tested", lessonId: "in-on-at-time" }),
              L("into-onto", "INTO and ONTO: movement that ends inside or on", { status: "tested", lessonId: "into-onto" }),
              L("out-of-off", "OUT OF and OFF: leaving a container or a surface", { status: "tested", lessonId: "out-of-off" }),
              L("inside-outside", "INSIDE and OUTSIDE (and inside of, outside of)", { status: "tested", lessonId: "inside-outside", flags: ["regional"] }),
              L("within-without", "WITHIN, and the old sense of WITHOUT (outside)", { status: "tested", lessonId: "within-without", flags: ["formal", "archaic"] }),
            ],
          },
          {
            id: "p1-position",
            title: "Space: position and arrangement",
            lessons: [
              L("over-above", "OVER and ABOVE", { status: "tested", lessonId: "over-above" }),
              L("under-below", "UNDER, BELOW, BENEATH, UNDERNEATH", { status: "tested", lessonId: "under-below", flags: ["formal"] }),
              L("on-top-of", "ON TOP OF", { status: "tested", lessonId: "on-top-of" }),
              L("beside-besides", "BESIDE vs BESIDES", { status: "tested", lessonId: "beside-besides" }),
              L("near-by-next-to", "NEAR, NEAR TO, BY, NEXT TO, CLOSE TO, ALONGSIDE", { status: "tested", lessonId: "near-by-next-to" }),
              L("front-behind", "IN FRONT OF, BEHIND, OPPOSITE, AHEAD OF, BEFORE (place)", { status: "tested", lessonId: "front-behind", flags: ["formal"] }),
              L("between-among", "BETWEEN, AMONG, AMONGST, AMID, AMIDST", { status: "tested", lessonId: "between-among", flags: ["regional", "literary"] }),
              L("around-round-about", "AROUND, ROUND, ABOUT (place)", { status: "tested", lessonId: "around-round-about", flags: ["regional"] }),
              L("against", "AGAINST: contact, opposition, contrast", { status: "tested", lessonId: "against" }),
              L("upon", "UPON: formal on, and fixed phrases (once upon a time, upon arrival)", { status: "tested", lessonId: "upon", flags: ["formal"] }),
            ],
          },
          {
            id: "p1-movement",
            title: "Space: movement and path",
            lessons: [
              L("to-towards", "TO and TOWARD(S)", { status: "tested", lessonId: "to-towards", flags: ["regional"] }),
              L("from", "FROM: source and starting point", { status: "tested", lessonId: "from" }),
              L("through", "THROUGH (and AmE through = until)", { status: "tested", lessonId: "through", flags: ["regional"] }),
              L("across-along", "ACROSS and ALONG", { status: "tested", lessonId: "across-along" }),
              L("past-by-via", "PAST, BY, VIA", { status: "tested", lessonId: "past-by-via" }),
              L("up-down", "UP and DOWN as prepositions", { status: "tested", lessonId: "up-down" }),
              L("beyond", "BEYOND: further than, and beyond doubt / beyond control", { status: "tested", lessonId: "beyond" }),
              L("throughout", "THROUGHOUT", { status: "tested", lessonId: "throughout" }),
            ],
          },
          {
            id: "p1-time",
            title: "Time",
            lessons: [
              L("for-since", "FOR vs SINCE", { status: "tested", lessonId: "for-since" }),
              L("during-for", "DURING vs FOR", { status: "tested", lessonId: "during-for" }),
              L("by-until", "BY vs UNTIL / TILL", { status: "tested", lessonId: "by-until", flags: ["regional"] }),
              L("before-after", "BEFORE, AFTER, PRIOR TO, SUBSEQUENT TO", { status: "tested", lessonId: "before-after", flags: ["formal"] }),
              L("from-to-till", "FROM ... TO / UNTIL / THROUGH", { status: "tested", lessonId: "from-to-till", flags: ["regional"] }),
              L("within-time", "WITHIN and IN for time limits", { status: "tested", lessonId: "within-time" }),
              L("pending", "PENDING and other participle prepositions (following, considering, given)", { status: "tested", lessonId: "pending", flags: ["formal"] }),
              L("ago-not-prep", "Words that look like time prepositions but are not (ago, last week, home)", { status: "tested", lessonId: "ago-not-prep" }),
            ],
          },
          {
            id: "p1-relations",
            title: "Relations, means and attitude",
            lessons: [
              L("of", "OF: belonging, part, material, content, and of vs 's", { status: "tested", lessonId: "of" }),
              L("for", "FOR: purpose, benefit, exchange, support, duration", { status: "tested", lessonId: "for" }),
              L("with-without", "WITH and WITHOUT: company, instrument, manner, possession", { status: "tested", lessonId: "with-without" }),
              L("by-agent-means", "BY: agent, means, method, and by vs with", { status: "tested", lessonId: "by-agent-means" }),
              L("about-on-topic", "ABOUT vs ON for topics", { status: "tested", lessonId: "about-on-topic" }),
              L("as-like", "AS vs LIKE", { status: "tested", lessonId: "as-like", flags: ["disputed"] }),
              L("unlike", "UNLIKE", { status: "tested", lessonId: "unlike" }),
              L("except-but-save", "EXCEPT, EXCEPT FOR, BUT, SAVE, BARRING", { status: "tested", lessonId: "except-but-save", flags: ["formal"] }),
              L("despite", "DESPITE and IN SPITE OF", { status: "tested", lessonId: "despite" }),
              L("per-plus-minus-versus", "PER, PLUS, MINUS, VERSUS, RE", { status: "tested", lessonId: "per-plus-minus-versus", flags: ["formal"] }),
              L("than-debate", "THAN: preposition or conjunction? (taller than me / than I am)", { status: "tested", lessonId: "than-debate", flags: ["disputed"] }),
              L("regarding-concerning", "REGARDING, CONCERNING, RESPECTING, TOUCHING", { status: "tested", lessonId: "regarding-concerning", flags: ["formal", "archaic"] }),
              L("including-excluding", "INCLUDING, EXCLUDING, NOTWITHSTANDING", { status: "tested", lessonId: "including-excluding", flags: ["formal"] }),
              L("archaic-literary", "Archaic and literary prepositions: unto, betwixt, ere, athwart, anent, qua, vis-à-vis", { status: "tested", lessonId: "archaic-literary", flags: ["archaic", "literary"] }),
            ],
          },
          {
            id: "p1-complex",
            title: "Multiword (complex) prepositions",
            lessons: [
              L("cause", "Cause: because of, due to, owing to, on account of, thanks to", { status: "tested", lessonId: "cause", flags: ["disputed"] }),
              L("purpose-means", "Purpose and means: for the sake of, with a view to, by means of, by virtue of, by dint of", { status: "tested", lessonId: "purpose-means", flags: ["formal"] }),
              L("reference", "Reference: with regard to, in regard to, as regards, with respect to, in terms of, as to, as for", { status: "tested", lessonId: "reference", flags: ["formal"] }),
              L("addition-exception", "Addition and exception: in addition to, as well as, along with, together with, apart from, aside from, with the exception of", { status: "tested", lessonId: "addition-exception", flags: ["regional"] }),
              L("substitution", "Substitution: instead of, in place of, in lieu of, rather than", { status: "tested", lessonId: "substitution", flags: ["formal"] }),
              L("conformity", "Conformity and basis: according to, in accordance with, in line with, on the basis of, pursuant to", { status: "tested", lessonId: "conformity", flags: ["formal"] }),
              L("concession", "Concession and contrast: in spite of, regardless of, irrespective of, in contrast to/with, as opposed to", { status: "tested", lessonId: "concession" }),
              L("representation", "On behalf of (and AmE in behalf of), on the part of, in favour of, in charge of", { status: "tested", lessonId: "representation", flags: ["regional"] }),
              L("circumstance", "Circumstance: in view of, in (the) light of, in the event of, in case of, in the face of, in the wake of", { status: "tested", lessonId: "circumstance", flags: ["regional"] }),
              L("comparison-measure", "Comparison and measure: in comparison with/to, in relation to, in excess of, up to, close to, far from", { status: "tested", lessonId: "comparison-measure" }),
              L("process", "Process and cost: in the course of, at the expense of, for the purpose of, by way of", { status: "tested", lessonId: "process" }),
            ],
          },
        ],
      },
      {
        id: "p2",
        title: "Phase 2: Fixed combinations",
        intro: "Words that choose a particular preposition, why they do when a reason exists, and how to learn them when the reason is simply usage.",
        units: [
          {
            id: "p2-verb",
            title: "Verb + preposition (prepositional verbs)",
            lessons: [
              L("depend-rely", "depend on, rely on, count on, insist on, focus on, comment on", { status: "tested", lessonId: "depend-rely" }),
              L("believe-in", "believe in vs believe someone; trust in, confide in, succeed in, persist in", { status: "tested", lessonId: "believe-in" }),
              L("apply-for-to", "apply for a job vs apply to an institution", { status: "tested", lessonId: "apply-for-to" }),
              L("agree-with-on-to", "agree with a person, agree on a subject, agree to a proposal", { status: "tested", lessonId: "agree-with-on-to" }),
              L("arrive-at-in", "arrive at a building or point, arrive in a city or country", { status: "tested", lessonId: "arrive-at-in" }),
              L("look-family", "look at, look for, look after, look into, look forward to", { status: "tested", lessonId: "look-family" }),
              L("object-pattern", "Verb + object + preposition: prevent from, accuse of, congratulate on, blame for, provide with", { status: "tested", lessonId: "object-pattern" }),
              L("no-preposition", "Verbs that take no preposition: discuss, enter, reach, marry, resemble, approach", { status: "tested", lessonId: "no-preposition" }),
              L("abstain-refrain", "Formal verbs: abstain from, refrain from, adhere to, comply with, conform to, dispense with", { status: "tested", lessonId: "abstain-refrain", flags: ["formal"] }),
              L("die-of-from", "die of vs die from; suffer from, recover from, result in vs result from", { status: "tested", lessonId: "die-of-from" }),
              L("compare-to-with", "compare to vs compare with; contrast with, distinguish between/from", { status: "tested", lessonId: "compare-to-with", flags: ["disputed"] }),
            ],
          },
          {
            id: "p2-adjective",
            title: "Adjective + preposition",
            lessons: [
              L("feelings", "Feelings: interested in, afraid of, fond of, keen on, angry with/at/about", { status: "tested", lessonId: "feelings", flags: ["regional"] }),
              L("ability", "Ability: good at, bad at, capable of, skilled in/at, proficient in", { status: "tested", lessonId: "ability" }),
              L("responsibility", "Responsibility: responsible for, accountable to/for, liable for/to", { status: "tested", lessonId: "responsibility" }),
              L("similarity", "Similarity and difference: similar to, identical to/with, different from/to/than", { status: "tested", lessonId: "similarity", flags: ["regional", "disputed"] }),
              L("familiarity", "familiar with vs familiar to; aware of, conscious of, ignorant of", { status: "tested", lessonId: "familiarity" }),
              L("formal-adjectives", "Formal: impervious to, contingent on/upon, conducive to, averse to, tantamount to, commensurate with", { status: "tested", lessonId: "formal-adjectives", flags: ["formal"] }),
            ],
          },
          {
            id: "p2-noun",
            title: "Noun + preposition",
            lessons: [
              L("reason-cause", "reason for, cause of, solution to, answer to, key to", { status: "tested", lessonId: "reason-cause" }),
              L("demand-need", "demand for, need for, respect for, desire for", { status: "tested", lessonId: "demand-need" }),
              L("access-approach", "access to, approach to, attitude to/towards, reaction to", { status: "tested", lessonId: "access-approach" }),
              L("increase-decrease", "an increase in vs an increase of; a rise in, a fall in", { status: "tested", lessonId: "increase-decrease" }),
              L("relationship", "relationship with/between, connection with/between, link to/with/between", { status: "tested", lessonId: "relationship" }),
            ],
          },
          {
            id: "p2-phrasal",
            title: "Phrasal verbs and prepositional verbs",
            lessons: [
              L("phrasal-vs-prepositional", "Phrasal verb or prepositional verb? (look up a word vs look up the chimney)", { status: "tested", lessonId: "phrasal-vs-prepositional" }),
              L("separability", "Where the object goes: turn it off, look after it", { status: "tested", lessonId: "separability" }),
              L("three-part", "Three-part verbs: put up with, look down on, do away with, come up with", { status: "tested", lessonId: "three-part" }),
              L("formal-alternatives", "Formal one-word alternatives for CSS writing (investigate for look into)", { status: "tested", lessonId: "formal-alternatives", flags: ["formal"] }),
            ],
          },
          {
            id: "p2-idiom",
            title: "Idioms and fixed expressions",
            lessons: [
              L("in-idioms", "Expressions with in: in charge, in time vs on time, in the end vs at the end", { status: "tested", lessonId: "in-idioms" }),
              L("on-at-idioms", "Expressions with on and at: on purpose, at random, at large, on the whole", { status: "tested", lessonId: "on-at-idioms" }),
              L("by-out-of-idioms", "Expressions with by, out of, under: by heart, out of order, under way", { status: "tested", lessonId: "by-out-of-idioms" }),
            ],
          },
          {
            id: "p2-errors",
            title: "Common errors and corrections",
            lessons: [
              L("redundant", "Redundant prepositions: discuss about, reach at, return back, emphasise on", { status: "tested", lessonId: "redundant" }),
              L("missing", "Missing prepositions: listen to, wait for, explain to someone", { status: "tested", lessonId: "missing" }),
              L("wrong-choice", "Wrong choice from the first language: married with, angry on, consist from", { status: "tested", lessonId: "wrong-choice" }),
            ],
          },
        ],
      },
      {
        id: "p3",
        title: "Phase 3: CSS examination lab",
        intro: "Authentic past-paper questions with verified sources, kept separate from original practice questions.",
        units: [
          {
            id: "p3-css",
            title: "CSS English Precis and Composition",
            lessons: [
              L("p3-format", "How the paper asks: fill in five of eight, four options, two blanks, errors in correction", { status: "tested", lessonId: "p3-format" }),
              L("p3-method", "A four-step method for any blank (look left, look right, picture it, test them all)", { status: "tested", lessonId: "p3-method" }),
              L("p3-partners", "Partner words from the papers: responsible for, impervious to, contingent on", { status: "tested", lessonId: "p3-partners" }),
              L("p3-phrasal", "Phrasal verbs from the papers: put off, went off, kept on, looked up", { status: "tested", lessonId: "p3-phrasal" }),
              L("p3-idioms", "Fixed phrases from the papers: by heart, of his own accord, under the weather", { status: "tested", lessonId: "p3-idioms" }),
              L("p3-space", "Place and movement from the papers: over the wall, into my parlour, at our destination", { status: "tested", lessonId: "p3-space" }),
              L("p3-figurative", "Literary sentences from the papers: wove through, within the elite, beneath the surface", { status: "tested", lessonId: "p3-figurative" }),
              L("p3-small", "Time, means and small words from the papers: by noon, with a hatchet, at this price", { status: "tested", lessonId: "p3-small" }),
              L("p3-double", "Two blanks in one sentence (CSS 2026)", { status: "tested", lessonId: "p3-double" }),
              L("p3-errors", "Preposition errors in the correction question", { status: "tested", lessonId: "p3-errors" }),
              L("p3-mock", "Mock question in the CSS format: eight blanks, attempt five", { status: "tested", lessonId: "p3-mock" }),
              L("syllabus", "What the FPSC syllabus asks for, verified against the official document"),
            ],
          },
        ],
      },
      {
        id: "p4",
        title: "Phase 4: Fixed prepositions A to Z",
        intro: "Every common and CSS-level word with the prepositions it takes, in alphabetical order. Each sense is drawn, and each choice is tested against the meaning the sentence wants.",
        units: [
          {
            id: "p4-a",
            title: "Letter A",
            lessons: [
              L("p4-a1", "A 1: abide \u2026 accompanied", { status: "tested", lessonId: "p4-a1" }),
              L("p4-a2", "A 2: accord \u2026 acquit", { status: "tested", lessonId: "p4-a2" }),
              L("p4-a3", "A 3: adapt \u2026 admit", { status: "tested", lessonId: "p4-a3" }),
              L("p4-a4", "A 4: advantage \u2026 alternative", { status: "tested", lessonId: "p4-a4" }),
              L("p4-a5", "A 5: amazed \u2026 apply", { status: "tested", lessonId: "p4-a5" }),
              L("p4-a6", "A 6: approve \u2026 attach", { status: "tested", lessonId: "p4-a6" }),
              L("p4-a7", "A 7: attend \u2026 aware", { status: "tested", lessonId: "p4-a7" }),
            ],
          },
          {
            id: "p4-b",
            title: "Letter B",
            lessons: [
              L("p4-b1", "B 1: based \u2026 blessed", { status: "tested", lessonId: "p4-b1" }),
              L("p4-b2", "B 2: blind \u2026 busy", { status: "tested", lessonId: "p4-b2" }),
            ],
          },
          {
            id: "p4-c",
            title: "Letter C",
            lessons: [
              L("p4-c1", "C 1: call \u2026 charge", { status: "tested", lessonId: "p4-c1" }),
              L("p4-c2", "C 2: close \u2026 complain", { status: "tested", lessonId: "p4-c2" }),
              L("p4-c3", "C 3: comply \u2026 confident", { status: "tested", lessonId: "p4-c3" }),
              L("p4-c4", "C 4: conform \u2026 content", { status: "tested", lessonId: "p4-c4" }),
              L("p4-c5", "C 5: contingent \u2026 correspond", { status: "tested", lessonId: "p4-c5" }),
              L("p4-c6", "C 6: count \u2026 cure", { status: "tested", lessonId: "p4-c6" }),
            ],
          },
          {
            id: "p4-d",
            title: "Letter D",
            lessons: [
              L("p4-d1", "D 1: deal \u2026 derive", { status: "tested", lessonId: "p4-d1" }),
              L("p4-d2", "D 2: descended \u2026 devote", { status: "tested", lessonId: "p4-d2" }),
              L("p4-d3", "D 3: die \u2026 dispense", { status: "tested", lessonId: "p4-d3" }),
              L("p4-d4", "D 4: dispose \u2026 dwell", { status: "tested", lessonId: "p4-d4" }),
            ],
          },
          {
            id: "p4-e",
            title: "Letter E",
            lessons: [
              L("p4-e1", "E 1: eager \u2026 empty", { status: "tested", lessonId: "p4-e1" }),
              L("p4-e2", "E 2: encroach \u2026 essential", { status: "tested", lessonId: "p4-e2" }),
              L("p4-e3", "E 3: excel \u2026 exposed", { status: "tested", lessonId: "p4-e3" }),
            ],
          },
          {
            id: "p4-f",
            title: "Letter F",
            lessons: [
              L("p4-f1", "F 1: faith \u2026 fond", { status: "tested", lessonId: "p4-f1" }),
              L("p4-f2", "F 2: fraught \u2026 furious", { status: "tested", lessonId: "p4-f2" }),
            ],
          },
          {
            id: "p4-g",
            title: "Letter G",
            lessons: [
              L("p4-g1", "G 1: generous \u2026 guard", { status: "tested", lessonId: "p4-g1" }),
              L("p4-g2", "G 2: guilty \u2026 guilty", { status: "tested", lessonId: "p4-g2" }),
            ],
          },
          {
            id: "p4-h",
            title: "Letter H",
            lessons: [
              L("p4-h1", "H 1: habituated \u2026 hope", { status: "tested", lessonId: "p4-h1" }),
              L("p4-h2", "H 2: hostile \u2026 hungry", { status: "tested", lessonId: "p4-h2" }),
            ],
          },
          {
            id: "p4-i",
            title: "Letter I",
            lessons: [
              L("p4-i1", "I 1: identical \u2026 incapable", { status: "tested", lessonId: "p4-i1" }),
              L("p4-i2", "I 2: inconsistent \u2026 inferior", { status: "tested", lessonId: "p4-i2" }),
              L("p4-i3", "I 3: inform \u2026 interfere", { status: "tested", lessonId: "p4-i3" }),
              L("p4-i4", "I 4: intrude \u2026 irrelevant", { status: "tested", lessonId: "p4-i4" }),
            ],
          },
          {
            id: "p4-j",
            title: "Letter J",
            lessons: [
              L("p4-j1", "J 1: jealous \u2026 judge", { status: "tested", lessonId: "p4-j1" }),
            ],
          },
          {
            id: "p4-k",
            title: "Letter K",
            lessons: [
              L("p4-k1", "K 1: keen \u2026 knowledge", { status: "tested", lessonId: "p4-k1" }),
            ],
          },
          {
            id: "p4-l",
            title: "Letter L",
            lessons: [
              L("p4-l1", "L 1: lack \u2026 live", { status: "tested", lessonId: "p4-l1" }),
              L("p4-l2", "L 2: lose \u2026 loyal", { status: "tested", lessonId: "p4-l2" }),
            ],
          },
          {
            id: "p4-m",
            title: "Letter M",
            lessons: [
              L("p4-m1", "M 1: mad \u2026 modelled", { status: "tested", lessonId: "p4-m1" }),
              L("p4-m2", "M 2: mourn \u2026 moved", { status: "tested", lessonId: "p4-m2" }),
            ],
          },
          {
            id: "p4-n",
            title: "Letter N",
            lessons: [
              L("p4-n1", "N 1: necessary \u2026 notorious", { status: "tested", lessonId: "p4-n1" }),
            ],
          },
          {
            id: "p4-o",
            title: "Letter O",
            lessons: [
              L("p4-o1", "O 1: object \u2026 originate", { status: "tested", lessonId: "p4-o1" }),
            ],
          },
          {
            id: "p4-p",
            title: "Letter P",
            lessons: [
              L("p4-p1", "P 1: part \u2026 popular", { status: "tested", lessonId: "p4-p1" }),
              L("p4-p2", "P 2: prefer \u2026 proficient", { status: "tested", lessonId: "p4-p2" }),
              L("p4-p3", "P 3: prohibit \u2026 punish", { status: "tested", lessonId: "p4-p3" }),
            ],
          },
          {
            id: "p4-q",
            title: "Letter Q",
            lessons: [
              L("p4-q1", "Q 1: qualified \u2026 quarrel", { status: "tested", lessonId: "p4-q1" }),
            ],
          },
          {
            id: "p4-r",
            title: "Letter R",
            lessons: [
              L("p4-r1", "R 1: react \u2026 relevant", { status: "tested", lessonId: "p4-r1" }),
              L("p4-r2", "R 2: reliant \u2026 rich", { status: "tested", lessonId: "p4-r2" }),
              L("p4-r3", "R 3: rid \u2026 rude", { status: "tested", lessonId: "p4-r3" }),
            ],
          },
          {
            id: "p4-s",
            title: "Letter S",
            lessons: [
              L("p4-s1", "S 1: safe \u2026 similar", { status: "tested", lessonId: "p4-s1" }),
              L("p4-s2", "S 2: sorry \u2026 suffer", { status: "tested", lessonId: "p4-s2" }),
              L("p4-s3", "S 3: superior \u2026 sympathy", { status: "tested", lessonId: "p4-s3" }),
            ],
          },
          {
            id: "p4-t",
            title: "Letter T",
            lessons: [
              L("p4-t1", "T 1: take \u2026 trust", { status: "tested", lessonId: "p4-t1" }),
            ],
          },
          {
            id: "p4-u",
            title: "Letter U",
            lessons: [
              L("p4-u1", "U 1: unaware \u2026 useful", { status: "tested", lessonId: "p4-u1" }),
            ],
          },
          {
            id: "p4-v",
            title: "Letter V",
            lessons: [
              L("p4-v1", "V 1: vain \u2026 vote", { status: "tested", lessonId: "p4-v1" }),
            ],
          },
          {
            id: "p4-w",
            title: "Letter W",
            lessons: [
              L("p4-w1", "W 1: wait \u2026 write", { status: "tested", lessonId: "p4-w1" }),
            ],
          },
          {
            id: "p4-y",
            title: "Letter Y",
            lessons: [
              L("p4-y1", "Y 1: yearn \u2026 yearn", { status: "tested", lessonId: "p4-y1" }),
            ],
          },
          {
            id: "p4-z",
            title: "Letter Z",
            lessons: [
              L("p4-z1", "Z 1: zeal \u2026 zeal", { status: "tested", lessonId: "p4-z1" }),
            ],
          },
        ],
      },
      {
        id: "p5",
        title: "Phase 5: Prepositional phrases",
        intro: "Fixed phrases such as in lieu of, by dint of and at the behest of, grouped by the preposition that carries their sense. Each phrase is drawn with what it means, why it takes its preposition, and the near misses that mean something else.",
        units: [
          {
            id: "p5-in",
            title: "Phrases with IN",
            lessons: [
              L("p5-in1", "Phrases with IN 1: in lieu of \u2026 in accordance with", { status: "tested", lessonId: "p5-in1" }),
              L("p5-in2", "Phrases with IN 2: in addition to \u2026 in the face of", { status: "tested", lessonId: "p5-in2" }),
              L("p5-in3", "Phrases with IN 3: in the event of \u2026 in the absence of", { status: "tested", lessonId: "p5-in3" }),
              L("p5-in4", "Phrases with IN 4: in keeping with \u2026 in defiance of", { status: "tested", lessonId: "p5-in4" }),
              L("p5-in5", "Phrases with IN 5: in response to \u2026 in contrast to", { status: "tested", lessonId: "p5-in5" }),
              L("p5-in6", "Phrases with IN 6: in the hope of \u2026 in proportion to", { status: "tested", lessonId: "p5-in6" }),
            ],
          },
          {
            id: "p5-on",
            title: "Phrases with ON",
            lessons: [
              L("p5-on1", "Phrases with ON 1: on behalf of \u2026 on the part of", { status: "tested", lessonId: "p5-on1" }),
              L("p5-on2", "Phrases with ON 2: on the grounds of \u2026 on the brink of", { status: "tested", lessonId: "p5-on2" }),
              L("p5-on3", "Phrases with ON 3: on the spot \u2026 on no account", { status: "tested", lessonId: "p5-on3" }),
            ],
          },
          {
            id: "p5-at",
            title: "Phrases with AT",
            lessons: [
              L("p5-at1", "Phrases with AT 1: at the behest of \u2026 at odds with", { status: "tested", lessonId: "p5-at1" }),
              L("p5-at2", "Phrases with AT 2: at the helm of \u2026 at the instance of", { status: "tested", lessonId: "p5-at2" }),
              L("p5-at3", "Phrases with AT 3: at stake \u2026 at the rate of", { status: "tested", lessonId: "p5-at3" }),
            ],
          },
          {
            id: "p5-by",
            title: "Phrases with BY",
            lessons: [
              L("p5-by1", "Phrases with BY 1: by dint of \u2026 by heart", { status: "tested", lessonId: "p5-by1" }),
              L("p5-by2", "Phrases with BY 2: by chance \u2026 by force of", { status: "tested", lessonId: "p5-by2" }),
            ],
          },
          {
            id: "p5-with",
            title: "Phrases with WITH and WITHOUT",
            lessons: [
              L("p5-with1", "Phrases with WITH and WITHOUT 1: with regard to \u2026 without fail", { status: "tested", lessonId: "p5-with1" }),
              L("p5-with2", "Phrases with WITH and WITHOUT 2: without regard to \u2026 with effect from", { status: "tested", lessonId: "p5-with2" }),
            ],
          },
          {
            id: "p5-for",
            title: "Phrases with FOR",
            lessons: [
              L("p5-for1", "Phrases with FOR 1: for the sake of \u2026 for instance", { status: "tested", lessonId: "p5-for1" }),
            ],
          },
          {
            id: "p5-under",
            title: "Phrases with UNDER",
            lessons: [
              L("p5-under1", "Phrases with UNDER 1: under the auspices of \u2026 under no circumstances", { status: "tested", lessonId: "p5-under1" }),
            ],
          },
          {
            id: "p5-more",
            title: "More phrases: out of, beyond, within, from, to, of, against",
            lessons: [
              L("p5-more1", "More phrases 1: out of order \u2026 within reach", { status: "tested", lessonId: "p5-more1" }),
              L("p5-more2", "More phrases 2: from scratch \u2026 owing to", { status: "tested", lessonId: "p5-more2" }),
              L("p5-more3", "More phrases 3: prior to \u2026 apart from", { status: "tested", lessonId: "p5-more3" }),
            ],
          },
        ],
      },
    ],
    gaps: [
      "The inventory has not yet been checked item by item against dictionaries or grammar references.",
      "Past-paper items come from ten papers supplied by the learner. Six years are confirmed (2019, 2021, 2022, 2023, 2024, 2026); four papers are labelled year not confirmed until checked against the official FPSC copies.",
      "The Phase 2 lists are starting sets, not complete inventories. They need a research pass to expand.",
      "Senses of each preposition (e.g. the many uses of of, for, by) will be listed inside each lesson once researched.",
    ],
  };
})();
